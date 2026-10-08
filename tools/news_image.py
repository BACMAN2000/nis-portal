"""Pone una imagen de licencia libre (Wikimedia Commons) en un artículo del periódico.

Las fotos de las noticias son de agencias (Getty, AFP, Reuters…) y no se copian:
se busca en Commons una imagen relacionada con la noticia (fotos con CC BY /
CC BY-SA, o de dominio público como las de NASA y NOAA), se baja a 1200 px y
el artículo lleva su crédito y su licencia, como piden esas licencias.

    python tools/news_image.py buscar "Machu Picchu"
    python tools/news_image.py poner 2026-10-07 2026-10-07-machu-picchu-tickets \
        "File:Machu Picchu, Perú, 2015-07-30, DD 47.JPG" "alt text" "caption"

`poner` baja la imagen a newspaper/img/<fecha>/<slug>.<ext> y escribe en el
JSON del número: image = {src, alt, caption, credit, license, link}.
"""
import json
import pathlib
import re
import sys
import urllib.parse
import urllib.request

RAIZ = pathlib.Path(__file__).resolve().parent.parent / 'newspaper'
UA = {'User-Agent': 'NIS-newspaper/1.0 (paolobaca2000@gmail.com)'}
LIBRES = re.compile(r'^(CC0|CC BY(-SA)? [0-9.]+|Public domain|PD.*)$', re.I)


def api(params):
    url = 'https://commons.wikimedia.org/w/api.php?' + urllib.parse.urlencode(dict(params, format='json'))
    return json.load(urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=30))


def meta(ii):
    m = ii.get('extmetadata', {})
    g = lambda k: re.sub(r'\s+', ' ', re.sub('<[^>]+>', '', m.get(k, {}).get('value', ''))).strip()
    return g('LicenseShortName'), g('Artist') or 'Unknown author', g('ImageDescription')


def buscar(q, n=8):
    d = api({'action': 'query', 'generator': 'search', 'gsrsearch': 'filetype:bitmap ' + q, 'gsrnamespace': 6,
             'gsrlimit': n, 'prop': 'imageinfo', 'iiprop': 'url|extmetadata|size'})
    for p in sorted(d.get('query', {}).get('pages', {}).values(), key=lambda p: p.get('index', 0)):
        ii = p['imageinfo'][0]
        lic, autor, desc = meta(ii)
        ok = 'OK ' if LIBRES.match(lic) else 'NO '
        linea = f"{ok}{lic:<14} {ii['width']}x{ii['height']}  {p['title']} | {autor[:40]} | {desc[:80]}"
        sys.stdout.buffer.write((linea + '\n').encode('utf-8'))


def poner(fecha, art_id, titulo, alt, caption):
    d = api({'action': 'query', 'titles': titulo, 'prop': 'imageinfo', 'iiprop': 'url|extmetadata', 'iiurlwidth': 1200})
    p = next(iter(d['query']['pages'].values()))
    if 'imageinfo' not in p:
        raise SystemExit('No existe en Commons: ' + titulo)
    ii = p['imageinfo'][0]
    lic, autor, _ = meta(ii)
    if not LIBRES.match(lic):
        raise SystemExit('Licencia no libre (%s): no se usa.' % lic)
    thumb = ii.get('thumburl') or ii['url']
    ext = pathlib.Path(urllib.parse.urlparse(thumb).path).suffix.lower() or '.jpg'
    slug = art_id[len(fecha) + 1:] if art_id.startswith(fecha + '-') else art_id
    destino = RAIZ / 'img' / fecha / (slug + ext)
    destino.parent.mkdir(parents=True, exist_ok=True)
    destino.write_bytes(urllib.request.urlopen(urllib.request.Request(thumb, headers=UA), timeout=60).read())

    f = RAIZ / 'issues' / (fecha + '.json')
    issue = json.loads(f.read_text(encoding='utf-8'))
    art = next((a for a in issue['articles'] if a['id'] == art_id), None)
    if art is None:
        raise SystemExit('No hay artículo ' + art_id)
    art['image'] = {'src': destino.relative_to(RAIZ).as_posix(), 'alt': alt, 'caption': caption,
                    'credit': autor[:120], 'license': lic, 'link': ii['descriptionurl']}
    f.write_text(json.dumps(issue, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    print('ok', destino.relative_to(RAIZ).as_posix(), '%d KB' % (destino.stat().st_size // 1024), lic, '·', autor[:50])


if __name__ == '__main__':
    if len(sys.argv) >= 3 and sys.argv[1] == 'buscar':
        buscar(sys.argv[2])
    elif len(sys.argv) == 7 and sys.argv[1] == 'poner':
        poner(*sys.argv[2:])
    else:
        raise SystemExit(__doc__)
