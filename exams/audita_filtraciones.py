# -*- coding: utf-8 -*-
"""Busca respuestas que se REGALAN en otra parte del mismo examen.

    python exams/audita_filtraciones.py            # todos
    python exams/audita_filtraciones.py g9-u34     # una carpeta

El problema, visto en el control de lectura de los capitulos 2-4: el alumno
tiene que ESCRIBIR una palabra, no la sabe, sigue avanzando, y cinco preguntas
mas adelante la encuentra impresa en el enunciado de otra. Vuelve atras y la
copia. Esa pregunta ha dejado de medir nada, y encima premia al que hojea el
examen entero antes de empezar.

Aqui se cruza cada respuesta que hay que escribir —word formation, key word
transformations y los huecos del listening— con TODO lo que el alumno puede
leer en el examen: enunciados, opciones, frases de apoyo, el banco de palabras
de ordenar y las tareas de writing. Si la respuesta aparece ahi, se avisa.

No mira las explicaciones (`ex`): esas solo se ven al corregir, cuando ya se ha
entregado.

Tres niveles:
  FUGA   la respuesta exacta esta escrita en otra pregunta. Hay que cambiarla.
  FAMILIA  aparece otra palabra de la misma familia (suspect / suspicion). En
           word formation puede ser deliberado, pero conviene mirarlo.
  (la raiz que se da en MAYUSCULAS en su propio item no cuenta: es la tarea)
"""
import io, json, os, re, sys
from collections import defaultdict

try:
    sys.stdout.reconfigure(encoding='utf-8')
except Exception:
    pass

AQUI = os.path.dirname(os.path.abspath(__file__))

# Palabras que aparecen en cualquier frase y no son "la respuesta" de nada.
VACIAS = set("""a an the of to in on at for with by from as is are was were be been being am
do does did done have has had having will would shall should can could may might must
and or but if that this these those there here it its he she they them his her their our your my
not no nor so than then when where which who whom whose what why how all any some more most
i you we one two up out off over under about into onto very just only also too still yet
""".split())

norm = lambda s: re.sub(r'[^a-z0-9\' -]', ' ', str(s).lower().replace('’', "'"))


def palabras(texto, partir_guion=True):
    """El apostrofe de las comillas se pega a la palabra ('Turn off tu telefono')
    y hacia que "'turn" no coincidiera con "turn": el auditor daba por regalada
    una respuesta que estaba en su propia frase. Se recorta de los extremos, y
    el de dentro se respeta (don't)."""
    trozos = re.split(r'[\s\-]+' if partir_guion else r'\s+', norm(texto))
    out = []
    for w in trozos:
        w = w.strip("'")
        if w and w not in VACIAS and len(w) > 2:
            out.append(w)
    return out


def raiz(w):
    """Recorte tosco para emparejar familias: curated/curate, suspicion/suspect."""
    for suf in ('ations', 'ation', 'ements', 'ement', 'ingly', 'ness', 'ance', 'ence', 'ions', 'ion',
                'ible', 'able', 'ing', 'ers', 'est', 'ies', 'ied', 'ly', 'ed', 'es', 'er', 'al', 's'):
        if w.endswith(suf) and len(w) - len(suf) >= 4:
            return w[:-len(suf)]
    return w


def visible_de(p, it):
    """Lo que el alumno LEE de este item. Nunca `ex`: eso es la correccion."""
    t = []
    if p['type'] in ('mc', 'tf') or (p['type'] == 'listening'):
        t.append(it.get('q', ''))
        t += it.get('opts', []) or []
    if p['type'] == 'wf':
        t.append(it.get('sent', ''))          # la raiz en MAYUSCULAS se trata aparte
    if p['type'] == 'kt':
        t += [it.get('lead', ''), it.get('before', ''), it.get('after', ''), it.get('key', '')]
    if p['type'] == 'order':
        t += it.get('words', []) or []
    return ' '.join(str(x) for x in t)


def escritas_de(p, it):
    """Lo que el alumno tiene que PRODUCIR de su cabeza, sin lo que ya se le da.

    Descuenta lo que YA está impreso en su propia pregunta, que es la mitad del
    ejercicio: en una transformacion la frase de partida trae el verbo lexico
    ('¿has leido la correccion?' → 'whether I had read'), y lo que se produce es
    la estructura, no la palabra. Sin este descuento el auditor marcaba catorce
    transformaciones que no regalan nada.
    En ordenar palabras se dan todas: no hay nada que adivinar."""
    if p['type'] == 'wf':
        dado = {raiz(w) for w in palabras(it.get('root', '') + ' ' + it.get('sent', ''))}
        return [w for w in palabras(it['accept'][0]) if raiz(w) not in dado]
    if p['type'] == 'kt':
        propio = it.get('key', '') + ' ' + it.get('lead', '') + ' ' + \
                 it.get('before', '') + ' ' + it.get('after', '')
        dado = {raiz(w) for w in palabras(propio)}
        return [w for w in palabras(it['accept'][0]) if raiz(w) not in dado]
    if p['type'] == 'listening' and it.get('kind') == 'gap':
        dado = {raiz(w) for w in palabras(it.get('q', ''))}
        # Sin partir por el guion: la respuesta es "twenty-three", y encontrar
        # "three" suelto en otra pregunta no le sirve de nada al alumno.
        return [w for w in palabras(it['accept'][0], partir_guion=False) if raiz(w) not in dado]
    return []


def revisa(ruta):
    d = json.load(io.open(ruta, encoding='utf-8'))
    items = []           # (n, parte, item)
    n = 0
    for p in d.get('parts', []):
        for it in p.get('items', []):
            n += 1
            items.append((n, p, it))
        if p['type'] == 'writing':
            for t in p.get('tasks', []):
                items.append((n + 0.5, p, {'q': (t.get('task', '') + ' ' + ' '.join(t.get('tips', [])))}))

    # indice de dónde se puede LEER cada palabra
    donde = defaultdict(set)
    donde_raiz = defaultdict(set)
    for (num, p, it) in items:
        for w in palabras(visible_de(p, it)):
            donde[w].add(num)
            donde_raiz[raiz(w)].add(num)

    fugas, familias = [], []
    for (num, p, it) in items:
        for w in escritas_de(p, it):
            otros = sorted(x for x in donde.get(w, ()) if x != num)
            if otros:
                fugas.append((num, p['type'], w, otros))
                continue
            otros = sorted(x for x in donde_raiz.get(raiz(w), ()) if x != num)
            if otros:
                familias.append((num, p['type'], w, otros))
    return d, fugas, familias


def main():
    carpetas = sys.argv[1:] or [c for c in sorted(os.listdir(AQUI))
                                if os.path.isdir(os.path.join(AQUI, c))]
    total_f = 0
    for c in carpetas:
        dr = os.path.join(AQUI, c)
        for f in sorted(os.listdir(dr)):
            if not f.endswith('.json'):
                continue
            d, fugas, familias = revisa(os.path.join(dr, f))
            estado = 'OK ' if not fugas else 'FUGA'
            print('%s %s/%s' % (estado, c, f))
            for (num, tipo, w, otros) in fugas:
                sitio = ', '.join('#%s' % (int(x) if x == int(x) else 'writing') for x in otros)
                print('     x  q%-3d %-4s "%s" se puede leer en %s' % (num, tipo, w, sitio))
            for (num, tipo, w, otros) in familias:
                sitio = ', '.join('#%s' % (int(x) if x == int(x) else 'writing') for x in otros)
                print('     !  q%-3d %-4s "%s" tiene familia en %s' % (num, tipo, w, sitio))
            total_f += len(fugas)
    print('\n%s' % ('Sin fugas.' if not total_f else '%d respuesta(s) regalada(s).' % total_f))
    sys.exit(1 if total_f else 0)


if __name__ == '__main__':
    main()
