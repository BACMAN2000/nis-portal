# -*- coding: utf-8 -*-
"""Vuelca las CONEXIONES INTERDISCIPLINARIAS de secundaria a JSON, sin interpretar.

QUE HAY EN EL COLEGIO
En Drive, `3. Secondary /Pedagogical Documents/Proyectos/` guarda cinco
carpetas -- Proyecto 1 (U2) Mayo, Proyecto 2 (U3) Junio, Proyecto 3 (U4)
Agosto, Unidad 5 Setiembre y Proyecto 5 (U6) Noviembre -- y dentro de cada
una hay un documento por grado, de 6.o a 11.o: 30 en total. Cada uno es una
tabla `Area | Contenidos/Conceptos clave | Posibles conexiones con otras
areas`, y la unidad dura SEIS SEMANAS, escrito en la propia cabecera.

Los contenidos estan escritos. **La columna de conexiones esta vacia en los
30.** Existe un unico documento con la columna llena, y ademas con tematicas
comunes, producto integrador, cronograma y evaluacion: "EJEMPLO UNIDAD 2 -
DURACION: 6 SEMANAS" (9.o, "Emprendimiento sostenible"). Ese ejemplo es el
molde del colegio y se vuelca aparte, en `ejemplo`.

Este script NO propone nada: copia. Lo que se proponga va en
project-arcs-sec.js, marcado como propuesta del portal.

    python tools/extrae_conexiones_sec.py            # usa la ruta de Drive
    python tools/extrae_conexiones_sec.py <zip>

Escribe scope/secundaria-conexiones-2026.json.
"""
import zipfile, io, re, os, sys, json, glob, unicodedata

ZIP_POR_DEFECTO = 'C:/NORDIC DOCUMENTS/3. Secondary -20260831T221531Z-1-001.zip'
BASE = '3. Secondary /Pedagogical Documents/Proyectos/'
SALIDA = os.path.join(os.path.dirname(__file__), '..', 'scope', 'secundaria-conexiones-2026.json')

# Las cinco carpetas, con el numero de proyecto, la unidad y el mes que el
# propio nombre de carpeta declara.
CARPETAS = [
    ('p1u2', 1, 2, 'Mayo',      'Proyecto 1 (U2) - Mayo/'),
    ('p2u3', 2, 3, 'Junio',     'Proyecto 2 (U3) - Junio /'),
    ('p3u4', 3, 4, 'Agosto',    'Proyecto 3 (U4) - Agosto/'),
    ('p4u5', 4, 5, 'Setiembre', 'Unidad 5 - Setiembre /'),
    ('p5u6', 5, 6, 'Noviembre', 'Proyecto 5 (U6) - Noviembre /'),
]

# Un .docx marca el fin de celda y el de fila con etiquetas distintas, pero
# el fin de parrafo tambien es un salto: si los tres se convierten en "\n" la
# tabla se vuelve ilegible. Por eso celda y fila llevan marcador propio.
CELDA, FILA = '\x01', '\x02'


def texto_tabla(datos):
    with zipfile.ZipFile(io.BytesIO(datos)) as d:
        xml = d.read('word/document.xml').decode('utf-8', 'replace')
    xml = re.sub(r'</w:tc>', CELDA, xml)
    xml = re.sub(r'</w:tr>', FILA, xml)
    xml = re.sub(r'</w:p>', '\n', xml)
    xml = re.sub(r'<w:br[^>]*/>', '\n', xml)
    xml = re.sub(r'<w:tab[^>]*/>', ' ', xml)
    # <w:t[^>]*> tambien casa con <w:tcPr> y colaria XML crudo como texto.
    trozos = re.findall(r'<w:t(?:\s[^>]*)?>(.*?)</w:t>|(\n)|(' + CELDA + ')|(' + FILA + ')', xml, re.S)
    t = ''.join(a or b or c or d for a, b, c, d in trozos)
    for a, b in (('&amp;', '&'), ('&lt;', '<'), ('&gt;', '>'), ('&quot;', '"'), ('&#39;', "'")):
        t = t.replace(a, b)
    return t


def limpia(celda):
    """Una celda -> lista de lineas de contenido, sin vinetas ni vacios."""
    out = []
    for l in celda.split('\n'):
        l = l.replace('\u2022', ' ').replace('●', ' ').strip(' \t·-–—:')
        l = re.sub(r'\s{2,}', ' ', l).strip()
        if l and l.lower() not in ('area', 'área'):
            out.append(l)
    return out


def parsea(texto):
    """Devuelve (cabecera, filas) donde cada fila es [area, contenidos, conexiones]."""
    cab = texto.split(FILA)[0].split(CELDA)[0]
    cab = re.sub(r'\s+', ' ', cab).strip()
    filas = []
    for fila in texto.split(FILA):
        celdas = fila.split(CELDA)
        if len(celdas) < 3:
            continue
        area = ' '.join(limpia(celdas[0]))
        if not area:
            continue
        low = area.lower()
        if low.startswith('area') or low.startswith('área'):
            continue          # es la cabecera de la tabla
        # La primera fila de varios documentos trae el titulo dentro de la
        # celda de area (celdas combinadas): no es un area.
        if 'conexiones interdisciplinarias' in low or 'formato inicial' in low:
            continue
        filas.append({
            'area': area,
            'contenidos': limpia(celdas[1]),
            'conexiones': limpia(celdas[2]),
        })
    return cab, filas


def encaja(nombre, carpeta, grado):
    """El nombre del archivo no sigue un patron unico: hay 'P3 - G9', 'P2 G9',
    '-P5- G9' y 'P4_U5-G9'. Se normaliza y se busca el grado al final."""
    n = unicodedata.normalize('NFKD', nombre).encode('ascii', 'ignore').decode()
    n = n.upper().replace('_', ' ').replace('-', ' ')
    n = re.sub(r'\s+', ' ', n)
    if not n.endswith('.DOCX'):
        return False
    return re.search(r'\bG\s?%d\b' % grado, n) is not None


def main():
    zp = sys.argv[1] if len(sys.argv) > 1 else ZIP_POR_DEFECTO
    if not os.path.exists(zp):
        cand = sorted(glob.glob('C:/NORDIC DOCUMENTS/3. Secondary*.zip'))
        if not cand:
            print('No encuentro el ZIP de Secondary. Pasalo como argumento.')
            return 1
        zp = cand[0]

    doc = {
        '_leeme': ('Contenidos por area, grado y unidad de SECUNDARIA, copiados literalmente de los '
                   '30 documentos "CONEXIONES INTERDISCIPLINARIAS" del colegio (6 grados x 5 '
                   'proyectos). La columna "conexiones" viene VACIA en el original: el colegio hizo '
                   'el formato y lleno los contenidos, pero la parte interdisciplinaria esta sin '
                   'escribir. Lo que el portal propone para esa columna NO esta aqui, esta en '
                   'project-arcs-sec.js y sale marcado como propuesta.'),
        'fuente': BASE + ' (Google Drive del colegio)',
        'leido': '2026-09-08',
        'duracion_semanas': 6,
        'proyectos': [],
        'ejemplo': None,
        'avisos': [],
    }

    with zipfile.ZipFile(zp) as z:
        nombres = z.namelist()
        for clave, npro, unidad, mes, carpeta in CARPETAS:
            entrada = {'clave': clave, 'proyecto': npro, 'unidad': unidad, 'mes': mes,
                       'carpeta': carpeta, 'grados': {}}
            enCarpeta = [n for n in nombres
                         if n.startswith(BASE + carpeta) and 'CONEXIONES' in n.upper()]
            for g in range(6, 12):
                match = [n for n in enCarpeta if encaja(os.path.basename(n), carpeta, g)]
                if not match:
                    doc['avisos'].append('Sin documento de conexiones para %d.o en %s' % (g, carpeta))
                    continue
                cab, filas = parsea(texto_tabla(z.read(match[0])))
                entrada['grados'][str(g)] = {
                    'archivo': os.path.basename(match[0]),
                    'cabecera': cab,
                    'areas': filas,
                    'conexiones_escritas': sum(1 for f in filas if f['conexiones']),
                }
                # La cabecera del documento y la carpeta donde vive no siempre
                # dicen lo mismo. Se anota en vez de corregirlo en silencio:
                # es de coordinacion, no nuestro.
                mg = re.search(r'GRADO:\s*(\d+)', cab)
                if mg and int(mg.group(1)) != g:
                    doc['avisos'].append('%s dice "GRADO: %s" y el archivo es de %d.o (%s)'
                                         % (os.path.basename(match[0]), mg.group(1), g, carpeta.strip('/')))
                mu = re.search(r'UNIDAD\s*(\d+)', cab)
                if mu and int(mu.group(1)) != unidad:
                    doc['avisos'].append('%s dice "UNIDAD %s" y la carpeta es %s (unidad %d)'
                                         % (os.path.basename(match[0]), mu.group(1), carpeta.strip('/'), unidad))
            doc['proyectos'].append(entrada)

        # El unico documento con la columna llena: el molde del colegio.
        ej = [n for n in nombres if 'EJEMPLO UNIDAD 2' in n.upper()]
        if ej:
            crudo = texto_tabla(z.read(ej[0]))
            cab, filas = parsea(crudo)
            # Lo que va debajo de la tabla (tematicas, producto, cronograma,
            # evaluacion) no es tabla: se guarda como texto por bloques.
            cola = crudo.split(FILA)[-1].replace(CELDA, '\n')
            bloques = {}
            actual = None
            for l in cola.split('\n'):
                l = l.strip()
                if not l:
                    continue
                if l.isupper() and l.endswith(':'):
                    actual = l.rstrip(':')
                    bloques[actual] = []
                elif actual:
                    bloques[actual].append(l)
            doc['ejemplo'] = {'archivo': os.path.basename(ej[0]), 'cabecera': cab,
                              'areas': filas, 'bloques': bloques}

    with io.open(os.path.abspath(SALIDA), 'w', encoding='utf-8') as f:
        json.dump(doc, f, ensure_ascii=False, indent=1)

    n = sum(len(p['grados']) for p in doc['proyectos'])
    con = sum(v['conexiones_escritas'] for p in doc['proyectos'] for v in p['grados'].values())
    print('%d documentos leidos, %d celdas de conexion ya escritas por el colegio.' % (n, con))
    for a in doc['avisos']:
        print('  aviso:', a)
    print('->', os.path.abspath(SALIDA))
    return 0


if __name__ == '__main__':
    sys.exit(main())
