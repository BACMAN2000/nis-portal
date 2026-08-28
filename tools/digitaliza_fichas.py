# -*- coding: utf-8 -*-
"""Convierte las fichas .docx en fichas DIGITALES que el alumno rellena en el portal.

Hasta ahora el alumno se descargaba el PDF (que no se puede editar) o el Word
(que le obliga a salir del portal). Esto lee el .docx -- que es un ZIP con XML,
sin dependencias -- y saca la estructura real de la ficha: los objetivos con
casilla, las actividades, las instrucciones, las lineas para escribir, las
tablas que hay que completar y los bancos de palabras.

Lo que se reconoce, y por que:
  ☐ texto            -> objetivo con casilla
  Activity N — ...   -> cabecera de actividad
  _______ (linea)    -> hueco de escritura; varias seguidas = un solo campo
  <w:tbl>            -> tabla; las celdas vacias se vuelven campos
  Word bank          -> banco de palabras (ayuda, no se rellena)

Uso:
    python tools/digitaliza_fichas.py                 # todas las del disco
    python tools/digitaliza_fichas.py w1              # solo una semana
    python tools/digitaliza_fichas.py --sql salida.sql

Escribe worksheets-digital.json y, con --sql, el INSERT para la tabla
worksheets de Supabase.
"""
import io, json, os, re, sys, zipfile

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BASE = os.path.join(RAIZ, 'classes')
RE_NOMBRE = re.compile(r'^u(\d+)w(\d+)s(\d+)-worksheet-([a-z0-9]+)\.docx$', re.I)

RE_PARA = re.compile(r'<w:p[ >].*?</w:p>', re.S)
# Ojo: <w:t[^>]*> tambien casa con <w:tcPr>, y entonces se cuela el XML crudo
# como si fuera texto. Hay que exigir que tras w:t venga '>' o un espacio.
RE_TEXTO = re.compile(r'<w:t(?:\s[^>]*)?>(.*?)</w:t>', re.S)
RE_TABLA = re.compile(r'<w:tbl>.*?</w:tbl>', re.S)
RE_FILA = re.compile(r'<w:tr[ >].*?</w:tr>', re.S)
RE_CELDA = re.compile(r'<w:tc>.*?</w:tc>', re.S)
RE_LINEA = re.compile(r'^[_\s.]{12,}$')
RE_ACTIVIDAD = re.compile(r'^(activity|task|step)\s', re.I)


def desescapa(t):
    return (t.replace('&amp;', '&').replace('&lt;', '<').replace('&gt;', '>')
             .replace('&quot;', '"').replace('&apos;', "'"))


def texto_de(frag):
    return desescapa(''.join(RE_TEXTO.findall(frag))).strip()


def negrita(frag, txt):
    """Titular de verdad, no cualquier cosa resaltada.

    Casi todos los parrafos de estas fichas llevan algun <w:b/> suelto, asi
    que con eso solo la ficha entera salia como titulares. Se pide ademas que
    sea corto: una instruccion larga en negrita sigue siendo instruccion.
    """
    if '<w:b/>' not in frag and '<w:b ' not in frag:
        return False
    return len(txt) <= 80


def trocea(xml):
    """Devuelve el cuerpo en orden: parrafos y tablas mezclados como van."""
    piezas = []
    pos = 0
    for m in RE_TABLA.finditer(xml):
        for p in RE_PARA.finditer(xml[pos:m.start()]):
            piezas.append(('p', p.group(0)))
        piezas.append(('tbl', m.group(0)))
        pos = m.end()
    for p in RE_PARA.finditer(xml[pos:]):
        piezas.append(('p', p.group(0)))
    return piezas


def lee_tabla(frag):
    filas = []
    for fr in RE_FILA.finditer(frag):
        celdas = [texto_de(c.group(0)) for c in RE_CELDA.finditer(fr.group(0))]
        if celdas:
            filas.append(celdas)
    return filas


def convierte(ruta):
    xml = zipfile.ZipFile(ruta).read('word/document.xml').decode('utf-8')
    bloques = []
    objetivos = []
    lineas_pendientes = 0
    n_campo = 0
    titulo = ''
    meta = ''

    def cierra_lineas():
        nonlocal lineas_pendientes, n_campo
        if lineas_pendientes:
            n_campo += 1
            bloques.append({'t': 'write', 'id': 'w%d' % n_campo,
                            'lines': min(lineas_pendientes, 12)})
            lineas_pendientes = 0

    for tipo, frag in trocea(xml):
        if tipo == 'tbl':
            cierra_lineas()
            filas = lee_tabla(frag)
            if not filas:
                continue
            if len(filas) == 1 and len(filas[0]) == 1:
                caja = filas[0][0]
                if '☐' in caja or '□' in caja:
                    items = [x.strip() for x in re.split(u'[☐□]', caja) if x.strip()]
                    cab = items.pop(0) if items and not items[0].endswith('.') and len(items) > 1 else None
                    if items:
                        bloques.append({'t': 'goals', 'items': items})
                    continue
                if caja.lower().startswith('word bank'):
                    resto = caja[9:].strip(' :')
                    bloques.append({'t': 'bank',
                                    'items': [x.strip() for x in re.split(u'[·|,]', resto) if x.strip()]})
                    continue
                bloques.append({'t': 'note', 'text': caja})
                continue
            n_campo += 1
            bloques.append({'t': 'table', 'id': 't%d' % n_campo,
                            'head': filas[0], 'rows': filas[1:]})
            continue

        txt = texto_de(frag)
        if not txt:
            continue

        if RE_LINEA.match(txt):
            lineas_pendientes += 1
            continue
        cierra_lineas()

        if txt.startswith('☐') or txt.startswith('□'):
            objetivos.append(txt.lstrip('☐□ ').strip())
            continue
        if objetivos:
            bloques.append({'t': 'goals', 'items': objetivos})
            objetivos = []

        b = negrita(frag, txt)
        if not titulo and negrita(frag, txt[:80]) and 'STUDENT WORKSHEET' not in txt.upper():
            titulo = txt
            continue
        if not meta and ('·' in txt or '|' in txt) and not b:
            meta = txt
            continue
        if txt.lower().startswith('name:'):
            continue                                  # el portal ya sabe quien es
        if 'STUDENT WORKSHEET' in txt.upper():
            continue

        if RE_ACTIVIDAD.match(txt):
            bloques.append({'t': 'activity', 'text': txt})
        elif txt.lower().startswith('word bank'):
            bloques.append({'t': 'bankhead', 'text': txt})
        elif b:
            bloques.append({'t': 'h', 'text': txt})
        else:
            bloques.append({'t': 'p', 'text': txt})

    cierra_lineas()
    if objetivos:
        bloques.append({'t': 'goals', 'items': objetivos})
    return titulo, meta, bloques


def main():
    args = [a for a in sys.argv[1:] if not a.startswith('--')]
    filtro = args[0] if args else None
    fichas = []
    for dirpath, _d, files in os.walk(BASE):
        for f in sorted(files):
            m = RE_NOMBRE.match(f)
            if not m:
                continue
            partes = os.path.normpath(dirpath).split(os.sep)
            grado, unidad, semana = partes[-3], partes[-2], partes[-1]
            if filtro and semana != filtro:
                continue
            titulo, meta, bloques = convierte(os.path.join(dirpath, f))
            campos = sum(1 for b in bloques if b['t'] in ('write', 'table'))
            fichas.append({
                'code': 'u%sw%ss%s' % (m.group(1), m.group(2), m.group(3)),
                'grade': grado, 'unit': int(m.group(1)),
                'week': int(m.group(2)), 'session': int(m.group(3)),
                'level': m.group(4).upper(),
                'title': titulo, 'meta': meta, 'blocks': bloques, 'fields': campos,
            })

    salida = os.path.join(RAIZ, 'worksheets-digital.json')
    io.open(salida, 'w', encoding='utf-8').write(
        json.dumps(fichas, ensure_ascii=False, indent=1))
    print('%d fichas digitalizadas -> worksheets-digital.json' % len(fichas))
    if fichas:
        tot = sum(f['fields'] for f in fichas)
        print('  %d campos rellenables en total (%.1f de media)'
              % (tot, tot / float(len(fichas))))
        ej = fichas[0]
        print('  ejemplo: %s %s "%s" — %d bloques, %d campos'
              % (ej['code'], ej['level'], ej['title'][:40], len(ej['blocks']), ej['fields']))


if __name__ == '__main__':
    main()
