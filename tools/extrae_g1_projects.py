# -*- coding: utf-8 -*-
"""Saca de los Project.docx de 1.o el contenido de Science y Social.

La hoja "Annual Plan" de 1.o (dentro de EY_Assessment Criteria_G1.xlsx) solo
carga Comunicacion, Math e English — y Music y PE en P1. Science y Social no
aparecen NUNCA ahi: viven en los cuatro Project N.docx del grado, dentro de
"1. EARLY YEARS/3. Grade 1/8. Planning/P1..P4".

Este script los transcribe. De cada leccion coge el objetivo ("I can..." o
"Students...") y la competencia CNEB, y usa la competencia para saber a que
area pertenece la leccion. No interpreta ni reescribe: copia el objetivo.

Uso:  python tools/extrae_g1_projects.py <P1 Project.docx> <P2> <P3> <P4> [salida.json]
"""
import json
import re
import sys
import zipfile
import xml.etree.ElementTree as ET
from pathlib import Path

NS = '{http://schemas.openxmlformats.org/wordprocessingml/2006/main}'

# La competencia CNEB dice de que area es la leccion. Es lo unico que se
# "interpreta", y es una equivalencia directa del propio curriculo.
AREA_POR_COMPETENCIA = [
    ('indaga mediante metodos',      'science'),
    ('explica el mundo fisico',      'science'),
    ('disena y construye soluciones', 'science'),
    ('construye su identidad',       'social'),
    ('convive y participa',          'social'),
    ('construye interpretaciones',   'social'),
    ('gestiona responsablemente el espacio', 'social'),
    ('gestiona recursos',            'social'),
    ('gestiona responsablemente los recursos', 'social'),
]


def sinacento(s):
    tabla = str.maketrans('áéíóúÁÉÍÓÚñÑ', 'aeiouAEIOUnN')
    return s.translate(tabla).lower()


def area_de(competencia):
    c = sinacento(competencia)
    for clave, area in AREA_POR_COMPETENCIA:
        if clave in c:
            return area
    return None


def celda(tc):
    partes = []
    for par in tc.findall(NS + 'p'):
        x = ''.join(t.text or '' for t in par.iter(NS + 't')).strip()
        if x:
            partes.append(x)
    return ' '.join(partes)


def limpia(s, etiqueta):
    s = s.replace(etiqueta, ' ', 1)
    return re.sub(r'\s+', ' ', s).strip(' /·-')


def lee(ruta):
    """[(semana, [(objetivo, competencia), ...]), ...] tal como esta en el docx."""
    root = ET.fromstring(zipfile.ZipFile(ruta).read('word/document.xml'))
    body = root.find(NS + 'body')
    semanas, semana = [], 0
    for hijo in body:
        if hijo.tag == NS + 'tbl':
            filas = [[celda(tc) for tc in tr.findall(NS + 'tc')]
                     for tr in hijo.findall(NS + 'tr')]
            objetivos = next((f for f in filas if any('LESSON OBJECTIVE' in c for c in f)), None)
            comps = next((f for f in filas if any('COMPETENCY' in c for c in f)), None)
            if not objetivos:
                continue
            semana += 1
            pares = []
            for i, o in enumerate(objetivos):
                obj = limpia(o, 'LESSON OBJECTIVE')
                comp = limpia(comps[i], 'COMPETENCY, CAPABILITY AND CRITERIA') if comps and i < len(comps) else ''
                if obj:
                    pares.append((obj, comp))
            semanas.append((semana, pares))
    return semanas


def main():
    docs = [a for a in sys.argv[1:] if a.lower().endswith('.docx')]
    salidas = [a for a in sys.argv[1:] if a.lower().endswith('.json')]
    destino = Path(salidas[0]) if salidas else Path('scope/g1-project-areas.json')
    assert len(docs) == 4, 'hacen falta los cuatro Project.docx (P1 a P4)'

    periodos = {}
    for n, ruta in enumerate(docs, start=1):
        semanas = {}
        for sem, pares in lee(ruta):
            areas = {}
            for obj, comp in pares:
                a = area_de(comp)
                if not a:
                    continue
                # el objetivo se copia tal cual, recortado a una linea legible
                texto = re.sub(r'^Students\s+', '', obj).strip()
                texto = texto[0].upper() + texto[1:] if texto else texto
                areas.setdefault(a, [])
                if texto not in areas[a]:
                    areas[a].append(texto)
            if areas:
                semanas[str(sem)] = areas
        periodos[str(n)] = semanas
        print('P%d: %d semanas con Science o Social' % (n, len(semanas)))

    salida = dict(
        _leeme='Science y Social de 1.o, transcritos de los Project 1..4.docx del grado. '
               'La hoja "Annual Plan" de 1.o no los trae. El area de cada leccion se deduce de '
               'su competencia CNEB, que es una equivalencia directa del curriculo.',
        fuente='1. EARLY YEARS/3. Grade 1/8. Planning/P1..P4/Project N.docx',
        generado_por='tools/extrae_g1_projects.py',
        grado='g1', periodos=periodos,
    )
    destino.parent.mkdir(parents=True, exist_ok=True)
    destino.write_text(json.dumps(salida, ensure_ascii=False, indent=1), encoding='utf-8')
    tot = sum(len(v) for v in periodos.values())
    print('-> %s  ·  %d semanas en total, %d KB' % (destino, tot, destino.stat().st_size // 1024))


if __name__ == '__main__':
    main()
