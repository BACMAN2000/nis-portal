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
        ('<script src="../config.js?v=', None),            # la Supabase de NIS no va en cohasset.pe
        ("window.NEWS_BACKEND = 'nis';", "window.NEWS_BACKEND = 'cohasset';"),   # guarda en el backend /news
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
    objetivo[COH / 'marks.js'] = (NIS / 'marks.js').read_bytes()     # tachaduras del Writing
    objetivo[COH / 'results.js'] = (NIS / 'results.js').read_bytes() # resultados para el staff (results.html)
    objetivo[COH / 'progress.js'] = (NIS / 'progress.js').read_bytes() # progreso: «My progress» y alumnos del staff
    for f in sorted((NIS / 'issues').glob('*.json')):
        objetivo[COH / 'issues' / f.name] = f.read_bytes()
    for f in sorted((NIS / 'img').rglob('*')):        # imágenes de Commons de cada número
        if f.is_file():
            objetivo[COH / f.relative_to(NIS)] = f.read_bytes()
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
