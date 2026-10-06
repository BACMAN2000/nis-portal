# -*- coding: utf-8 -*-
"""Lleva Reading and Use of English (B1 · B2 · C1) de nis-portal a cohasset.pe.

    python tools/ruoe_cohasset.py            # copia y genera
    python tools/ruoe_cohasset.py --check    # solo dice si la copia está al día

Los datos (reading-use-of-english.*.js) van byte a byte; el HTML se genera desde
el de NIS cambiando SOLO la cabecera: fuentes, tokens y tema de cohasset.pe, el
logo de Cohasset, un enlace de vuelta al hub Cambridge y sin los scripts del
portal NIS (sesión, anticheat, guardado en la cuenta, presencia, idioma). Sin
NIS_WORK el motor guarda el progreso en el navegador (ruoe_store_v1). Los ?v=
de lo copiado se resellan con md5[:8], la convención de ese repositorio."""
import hashlib, io, os, re, sys
NIS = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
COH = r'C:/Projects/cohasset-community/repo'
DATA = ['reading-use-of-english.data.js', 'reading-use-of-english.b1.js', 'reading-use-of-english.b2.js',
        'reading-use-of-english.b2x.js', 'reading-use-of-english.c1.js', 'reading-use-of-english.why.js']
PAGE = 'reading-use-of-english.html'

def md5(b): return hashlib.md5(b).hexdigest()[:8]
def rd(p): return io.open(p, 'rb').read()

def build_html():
    s = rd(os.path.join(NIS, PAGE)).decode('utf-8')
    def rep(old, new, req=True):
        nonlocal s
        if old not in s:
            if req: raise SystemExit('No encuentro en el HTML de NIS: ' + old[:80])
            return
        s = s.replace(old, new)
    # cabecera: fuentes, tema y tokens de cohasset.pe
    s = re.sub(r'<link href="vendor/fonts/montserrat-[^"]+" rel="stylesheet">\n', '', s)
    s = re.sub(r'<link rel="preload" href="fonts/GothamBook\.woff2[^>]*>\n', '', s)
    s = re.sub(r'<link rel="stylesheet" href="nis-fonts\.css[^"]*">', '<link href="fonts/fonts.css?v=%s" rel="stylesheet">' % md5(rd(os.path.join(COH, 'fonts/fonts.css'))), s)
    rep('localStorage.getItem("nis-tema")', 'localStorage.getItem("coh-tema")')
    s = re.sub(r'<link rel="stylesheet" href="nis-tokens\.css[^"]*">', '<link rel="stylesheet" href="coh-tokens.css?v=%s">' % md5(rd(os.path.join(COH, 'coh-tokens.css'))), s)
    # fuera los scripts del portal NIS
    for name in ('school.js', 'config.js', 'anticheat.js', 'nis-nav.js', 'activity-save.js', 'nis-presence.js', 'nis-i18n.js', 'nis-tema.js'):
        s = re.sub(r'[ \t]*<script src="%s\?v=[^"]*"[^>]*></script>\n' % re.escape(name), '', s)
    # tema de cohasset.pe
    s = s.replace('</body>', '<script src="js/coh-tema.js?v=%s" defer></script>\n</body>' % md5(rd(os.path.join(COH, 'js/coh-tema.js'))), 1)
    # marca
    rep('<span id="schoolName">Nordic International School</span>', '<span id="schoolName">Cohasset Language Center</span>')
    rep('title="Nordic International School"><img data-school-logo="light" src="mocks-cambridge/nordic-logo-h.svg" alt="Nordic International School">',
        'title="Cohasset"><img src="cohasset-logo.svg" alt="Cohasset" style="height:30px">')
    # vuelta al hub Cambridge (en NIS la pone nis-nav.js)
    rep('    <h1>📘 Reading and Use of English</h1>',
        '    <a href="cambridge-portal.html" style="display:inline-block;margin-bottom:8px;font-weight:700;text-decoration:none;color:inherit;opacity:.85">← Cambridge</a>\n    <h1>📘 Reading and Use of English</h1>')
    # ?v= de los datos con la convención del repo de cohasset
    for f in DATA:
        s = re.sub(r'%s\?v=[0-9a-f]+' % re.escape(f), '%s?v=%s' % (f, md5(rd(os.path.join(NIS, f)))), s)
    s = s.replace('<html lang="en">', '<html lang="en">\n<!-- Generado por nis-portal/tools/ruoe_cohasset.py desde el motor de nis.cohasset.pe: no editar a mano. -->', 1)
    return s.encode('utf-8')

def main():
    try: sys.stdout.reconfigure(encoding='utf-8')
    except Exception: pass
    check = '--check' in sys.argv
    if not os.path.isdir(COH):
        print('No está el clon de cohasset.pe en', COH); return 0
    diff = []
    for f in DATA:
        if not os.path.exists(os.path.join(COH, f)) or rd(os.path.join(COH, f)) != rd(os.path.join(NIS, f)): diff.append(f)
    html = build_html()
    if not os.path.exists(os.path.join(COH, PAGE)) or rd(os.path.join(COH, PAGE)) != html: diff.append(PAGE)
    if check:
        print('✓ R&UoE: cohasset.pe al día' if not diff else '✗ R&UoE: cohasset.pe desviado: ' + ', '.join(diff))
        return 1 if diff else 0
    for f in DATA:
        if f in diff: io.open(os.path.join(COH, f), 'wb').write(rd(os.path.join(NIS, f)))
    if PAGE in diff: io.open(os.path.join(COH, PAGE), 'wb').write(html)
    print('copiados:', ', '.join(diff) or 'nada (ya estaba al día)')
    return 0

if __name__ == '__main__':
    sys.exit(main())
