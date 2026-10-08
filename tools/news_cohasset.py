"""Copia el periódico por niveles (newspaper/) del portal NIS a cohasset.pe.

NIS lo publica como «The Nordic Times» (y cada colegio de Cohasset Schools con su
nombre, vía school.js). cohasset.pe recibe la misma página y los mismos números
con la cabecera «The Cohasset Times», sin school.js y con vuelta a /portal.

    python tools/news_cohasset.py            # copia
    python tools/news_cohasset.py --check    # solo dice si las copias difieren
"""
import pathlib
import shutil
import sys

NIS = pathlib.Path(__file__).resolve().parent.parent / 'newspaper'
COH = pathlib.Path(r'C:\Projects\cohasset-community\repo\newspaper')


def pagina_cohasset(html):
    cambios = [
        ('<script src="../school.js?v=', None),            # se quita la línea entera
        ("'The Nordic Times'", "'The Cohasset Times'"),
        ('<title>The Nordic Times</title>', '<title>The Cohasset Times</title>'),
        ('<h1 id="mast">The Nordic Times</h1>', '<h1 id="mast">The Cohasset Times</h1>'),
        ('<a href="../" id="home">← Portal</a>', '<a href="/portal" id="home">← Mi portal</a>'),
    ]
    for viejo, nuevo in cambios:
        if viejo not in html:
            raise SystemExit('news_cohasset: no encuentro %r en newspaper/index.html' % viejo)
        if nuevo is None:
            html = '\n'.join(l for l in html.split('\n') if viejo not in l)
        else:
            html = html.replace(viejo, nuevo)
    return html


def main():
    check = '--check' in sys.argv
    distintos = []
    objetivo = {COH / 'index.html': pagina_cohasset((NIS / 'index.html').read_text(encoding='utf-8')).encode('utf-8')}
    for f in sorted((NIS / 'issues').glob('*.json')):
        objetivo[COH / 'issues' / f.name] = f.read_bytes()
    for destino, contenido in objetivo.items():
        if destino.exists() and destino.read_bytes() == contenido:
            continue
        distintos.append(destino.relative_to(COH.parent).as_posix())
        if not check:
            destino.parent.mkdir(parents=True, exist_ok=True)
            destino.write_bytes(contenido)
    print(('difieren: ' if check else 'copiados: ') + (', '.join(distintos) or 'nada'))
    return 1 if (check and distintos) else 0


if __name__ == '__main__':
    sys.exit(main())
