# -*- coding: utf-8 -*-
"""Publica el motor YLE en espejo en Cohasset: copia yle-practice.html sin el
bloque NIS-ONLY (Supabase, config, nis-nav, activity-save), y sincroniza el
paquete yle/ (specs, lista, validador, dibujos, tests) y el audio yle-audio/.
Las laminas van por yle/tools/build_img.py.

    python yle/tools/build_engine.py
"""
import io, os, re, shutil, glob

NIS = r"C:\Projects\nis-portal"
DEST = [r"C:\Projects\cohasset-community\repo", r"C:\Projects\cohasset-final\cohasset-language-center"]

def engine():
    s = io.open(os.path.join(NIS, 'yle-practice.html'), encoding='utf-8').read()
    c = re.sub(r'<!-- NIS-ONLY -->.*?<!-- /NIS-ONLY -->\n?', '', s, flags=re.S)
    c = c.replace('Nordic International School', 'Cohasset Language Center')
    c = c.replace('<link rel="icon" type="image/svg+xml" href="assets/favicon.svg">', '<link rel="icon" href="favicon.ico">')
    c = c.replace('<link rel="stylesheet" href="brand.css?v=21">', '')
    c = c.replace('<img src="assets/logo-white-h.svg" alt="" onerror="this.remove()">', '')
    c = c.replace('<a href="index.html" class="btn sec" style="text-decoration:none">◀ Portal</a>', '<a href="cambridge-portal.html" class="btn sec" style="text-decoration:none">◀ Cambridge</a>')
    c = c.replace('padding:10px 18px 10px 118px', 'padding:10px 18px')
    for d in DEST:
        io.open(os.path.join(d, 'yle-practice.html'), 'w', encoding='utf-8').write(c)
    print('yle-practice.html -> Cohasset (%d -> %d bytes)' % (len(s), len(c)))

def sync(sub, patrones):
    for d in DEST:
        for pat in patrones:
            for f in glob.glob(os.path.join(NIS, sub, pat), recursive=True):
                rel = os.path.relpath(f, NIS); out = os.path.join(d, rel)
                os.makedirs(os.path.dirname(out), exist_ok=True)
                if not os.path.exists(out) or os.path.getsize(out) != os.path.getsize(f): shutil.copy(f, out)
    print(sub, 'sincronizado')

if __name__ == '__main__':
    engine()
    sync('yle', ['*.json', '*.js', '*.py', '*/*.json'])
    sync('yle-audio', ['*/*.mp3'])
    for d in DEST: shutil.copy(os.path.join(NIS, 'paint-layer.js'), os.path.join(d, 'paint-layer.js'))
    print('listo')
