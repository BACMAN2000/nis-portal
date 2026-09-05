# -*- coding: utf-8 -*-
"""Publica el motor YLE en espejo en Cohasset: copia las paginas compartidas
(yle-practice.html, yle-vocab.html, yle-guia-familia.html) sin el bloque NIS-ONLY
(Supabase, config, nis-nav, activity-save), y sincroniza el paquete yle/ (specs,
lista, validador, dibujos, tests, vocabulario) y el audio yle-audio/ (tests y
vocabulario). Las laminas van por yle/tools/build_img.py. yle-boletin.html NO se
copia: es de las familias del colegio y depende de la base de NIS.

    python yle/tools/build_engine.py
"""
import io, os, re, shutil, glob, hashlib

NIS = r"C:\Projects\nis-portal"
DEST = [r"C:\Projects\cohasset-community\repo", r"C:\Projects\cohasset-final\cohasset-language-center"]
PAGINAS = ['yle-practice.html', 'yle-vocab.html', 'yle-guia-familia.html']

def engine(nombre):
    s = io.open(os.path.join(NIS, nombre), encoding='utf-8').read()
    c = re.sub(r'<!-- NIS-ONLY -->.*?<!-- /NIS-ONLY -->\n?', '', s, flags=re.S)
    c = c.replace('Nordic International School', 'Cohasset Language Center')
    c = c.replace('<link rel="icon" type="image/svg+xml" href="assets/favicon.svg">', '<link rel="icon" href="favicon.ico">')
    c = c.replace('<link rel="stylesheet" href="brand.css?v=21">', '')
    c = c.replace('<img src="assets/logo-white-h.svg" alt="" onerror="this.remove()">', '')
    c = c.replace('<a href="index.html" class="btn sec" style="text-decoration:none">◀ Portal</a>', '<a href="cambridge-portal.html" class="btn sec" style="text-decoration:none">◀ Cambridge</a>')
    c = c.replace('<a href="index.html" class="btn sec">◀ Portal</a>', '<a href="cambridge-portal.html" class="btn sec">◀ Cambridge</a>')
    c = c.replace('padding:10px 18px 10px 118px', 'padding:10px 18px')
    for d in DEST:
        io.open(os.path.join(d, nombre), 'w', encoding='utf-8').write(c)
    print('%s -> Cohasset (%d -> %d bytes)' % (nombre, len(s), len(c)))

def igual(a, b):
    """Mismo tamano no basta: al regenerar el audio con otra voz, pick_up_ex.mp3
    pesaba exactamente lo mismo que el viejo y se quedaba sin copiar (5-sep-2026).
    Si el tamano coincide, se compara el contenido."""
    if os.path.getsize(a) != os.path.getsize(b): return False
    return hashlib.md5(io.open(a, 'rb').read()).digest() == hashlib.md5(io.open(b, 'rb').read()).digest()


def sync(sub, patrones):
    for d in DEST:
        for pat in patrones:
            for f in glob.glob(os.path.join(NIS, sub, pat), recursive=True):
                rel = os.path.relpath(f, NIS); out = os.path.join(d, rel)
                os.makedirs(os.path.dirname(out), exist_ok=True)
                if not os.path.exists(out) or not igual(f, out): shutil.copy(f, out)
    print(sub, 'sincronizado')

if __name__ == '__main__':
    for pg in PAGINAS: engine(pg)
    sync('yle', ['*.json', '*.js', '*.py', '*/*.json'])
    sync('yle-audio', ['*/*.mp3', 'vocab/*/*.mp3'])
    for d in DEST: shutil.copy(os.path.join(NIS, 'paint-layer.js'), os.path.join(d, 'paint-layer.js'))
    print('listo')
