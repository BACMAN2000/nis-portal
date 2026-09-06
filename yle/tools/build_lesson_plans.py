# -*- coding: utf-8 -*-
"""El mapa entre los lesson plans oficiales de Cambridge y nuestro curso.

Cambridge publica gratis una leccion por cada parte del examen de Starters:
trece cuadernillos de unas diez paginas con las competencias que exige la
tarea, los objetivos, el material fotocopiable, la hoja del profesor, la
actividad de clase y una tarea de muestra con su audio. Estaban descargados en
C:/Projects/yle-oficial y no los usaba nadie.

No se copian al portal: son de Cambridge y su licencia pide enlazar al origen,
que ademas siempre tiene la version mas reciente. Lo que si falta y aqui se
construye es el mapa: que unidades de Fun for Nordic entrenan cada parte y que
practice test la contiene, para que el profesor abra el plan que le toca sin
buscar.

    python yle/tools/build_lesson_plans.py     -> yle/lesson-plans.json
"""
import glob, io, json, os, re

AQUI = os.path.dirname(os.path.abspath(__file__))
RAIZ = os.path.dirname(os.path.dirname(AQUI))
PREP = 'https://www.cambridgeenglish.org/exams-and-tests/%s/preparation/'

# Los trece cuadernillos, tal como los nombra Cambridge en su pagina.
PLANES = [
 ('listening', 1, 'Pre A1 Starters 2018 Listening Part 1'),
 ('listening', 2, 'Pre A1 Starters 2018 Listening Part 2'),
 ('listening', 3, 'Pre A1 Starters 2018 Listening Part 3'),
 ('listening', 4, 'Pre A1 Starters 2018 Listening Part 4'),
 ('rw', 1, 'Pre A1 Starters 2018 Reading and Writing Part 1'),
 ('rw', 2, 'Pre A1 Starters 2018 Reading and Writing Part 2'),
 ('rw', 3, 'Pre A1 Starters 2018 Reading and Writing Part 3'),
 ('rw', 4, 'Pre A1 Starters 2018 Reading and Writing Part 4'),
 ('rw', 5, 'Pre A1 Starters 2018 Reading and Writing Part 5'),
 ('speaking', 1, 'Pre A1 Starters 2018 Speaking Part 1'),
 ('speaking', 2, 'Pre A1 Starters 2018 Speaking Part 2'),
 ('speaking', 3, 'Pre A1 Starters 2018 Speaking Part 3'),
 ('speaking', 4, 'Pre A1 Starters 2018 Speaking Part 4'),
]

OTROS = [
 ('Starters individual progress chart', 'La hoja de estrellas de cada nino: una fila por parte del examen, para firmar en casa.'),
 ('Starters group progress chart', 'La misma hoja para toda la clase, de una ojeada.'),
 ('Pre A1 Starters exam preparation resources', 'El cuadernillo con todo lo anterior junto y las instrucciones de uso.'),
 ('A1 Movers exam preparation resources', 'Lo mismo para Movers: aunque los lesson plans de Cambridge son de Starters, este cuadernillo si cubre Movers.'),
]

PAPER = {'listening': 'Listening', 'rw': 'Reading & Writing', 'speaking': 'Speaking'}


def unidades(paper, parte):
    """Las unidades de Fun for Nordic Starters que entrenan esa parte."""
    out = []
    for f in sorted(glob.glob(os.path.join(RAIZ, 'nis-fun', 'content', 'starters', 'unit-*.json'))):
        d = json.load(io.open(f, encoding='utf-8'))
        ef = d.get('exam_focus') or {}
        if ef.get('paper') == PAPER[paper] and int(ef.get('part') or 0) == parte:
            out.append({'n': d['number'], 'title': d['title']})
    return out


def pairwork(parte):
    """Y para el Speaking, los pairwork que ensayan esa parte."""
    out = []
    for f in sorted(glob.glob(os.path.join(RAIZ, 'nis-fun', 'content', 'starters', 'unit-*.json'))):
        d = json.load(io.open(f, encoding='utf-8'))
        for a in d['activities']:
            if a['type'] == 'pairwork' and (a.get('speaking') or {}).get('part') == parte:
                out.append({'n': d['number'], 'title': d['title']})
    return out


def main():
    specs = json.load(io.open(os.path.join(RAIZ, 'yle', 'specs.json'), encoding='utf-8'))['levels']['starters']
    filas = []
    for paper, n, nombre in PLANES:
        sp = [p for p in specs[paper]['parts'] if int(p['n']) == n]
        us = pairwork(n) if paper == 'speaking' else unidades(paper, n)
        filas.append({
            'paper': PAPER[paper], 'part': n, 'plan': nombre,
            'task': (sp[0].get('task') if sp else ''),
            'units': us,
            'print': 'yle-print.html?level=starters&test=1&paper=%s' % ('rw' if paper == 'rw' else paper),
        })
    salida = {
        '_fuente': ('Cambridge English, Pre A1 Starters lesson plans 2018 y progress charts. '
                    'Se enlaza a la pagina oficial de preparacion, no se copia el material.'),
        'prep': {l: PREP % l for l in ('starters', 'movers', 'flyers')},
        'plans': filas,
        'otros': [{'name': a, 'what': b} for a, b in OTROS],
    }
    ruta = os.path.join(RAIZ, 'yle', 'lesson-plans.json')
    io.open(ruta, 'w', encoding='utf-8', newline='').write(json.dumps(salida, ensure_ascii=False, indent=1))
    con = sum(1 for f in filas if f['units'])
    print('%d planes, %d con unidades del curso detras -> yle/lesson-plans.json' % (len(filas), con))
    for f in filas:
        print('  %-18s parte %d  %2d unidades' % (f['paper'], f['part'], len(f['units'])))


if __name__ == '__main__':
    main()
