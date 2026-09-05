# -*- coding: utf-8 -*-
"""Comprueba que las respuestas de un test YLE estan de verdad en el guion.

El validador mira el formato y el vocabulario; esto mira la coherencia: si la
clave de la Parte 2 dice "boots", la palabra "boots" tiene que oirse en el guion
de la Parte 2, y la opcion correcta de la Parte 4 tiene que aparecer en su
dialogo. Un test puede estar perfecto de formato y tener la clave equivocada.

    python yle/tools/check_audio.py yle/movers/test-06.json
    python yle/tools/check_audio.py yle/movers/*.json
"""
import io, json, re, sys, glob


def guion(t, parte):
    lineas = (t.get('audio') or {}).get(parte) or []
    return ' '.join(l[1] for l in lineas if l and l[0] != 'pause').lower().replace('’', "'")


VACIAS = {'a', 'an', 'the', 'by', 'on', 'in', 'at', 'with', 'of', 'to', 'have', 'has', 'is', 'are',
          'and', 'or', 'his', 'her', 'their', 'my', 'your', 'some', 'about', 'for'}
_U = ['zero','one','two','three','four','five','six','seven','eight','nine','ten','eleven','twelve',
      'thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen']
_D = ['', '', 'twenty','thirty','forty','fifty','sixty','seventy','eighty','ninety']


def en_letras(n):
    """46 -> 'forty-six', para reconocer la respuesta en el guion."""
    if n < 20: return _U[n]
    if n < 100:
        d, u = divmod(n, 10)
        return _D[d] + ('-' + _U[u] if u else '')
    return str(n)


NUM = {str(n): en_letras(n) for n in range(0, 101)}
NUM['4.30'] = 'half past four'
NUM['1.30'] = 'half past one'
NUM['2.30'] = 'half past two'
NUM['3.30'] = 'half past three'
NUM['5.30'] = 'half past five'
NUM['6.30'] = 'half past six'
NUM['7.30'] = 'half past seven'


# pasados irregulares que salen en los guiones
IRREG = {'sleep': 'slept', 'take': 'took', 'go': 'went', 'buy': 'bought', 'catch': 'caught',
         'swim': 'swam', 'ride': 'rode', 'run': 'ran', 'read': 'read', 'make': 'made',
         'give': 'gave', 'do': 'did', 'have': 'had', 'eat': 'ate', 'drink': 'drank',
         'see': 'saw', 'sing': 'sang', 'write': 'wrote', 'find': 'found', 'fly': 'flew'}


def raices(w):
    """La palabra y sus formas cercanas: plays/playing/played valen por play, y
    sleeping vale por slept."""
    out = {w, w.replace("'s", ''), w.rstrip("'")}
    for suf in ('ing', 'es', 's', 'ed'):
        if w.endswith(suf) and len(w) - len(suf) >= 3:
            out.add(w[:-len(suf)]); out.add(w[:-len(suf)] + 'e')
    out.add(w + 's'); out.add(w + 'es'); out.add(w + 'ing'); out.add(w + 'd')
    if w.endswith('e'): out.add(w[:-1] + 'ing')
    for b in list(out):
        if b in IRREG: out.add(IRREG[b])
    return out


def hay(texto, respuesta, todas=True):
    """Las palabras con contenido de la respuesta se oyen en el guion. No exige
    la frase literal: la clave dice 'by bike' y el guion 'on my bike'. Con
    todas=False basta con una, que es como funciona la Parte 3: el guion
    parafrasea a proposito ('feeding the dog' se oye como 'gives the dog food')."""
    r = str(respuesta).strip().lower().replace('’', "'")
    texto = texto.replace('’', "'")
    palabras = [p for p in re.findall(r"[a-z0-9'-]+", NUM.get(r, r)) if p not in VACIAS]
    if not palabras:
        palabras = [r]
    cumple = [any(f in texto for f in raices(p)) for p in palabras]
    return all(cumple) if todas else any(cumple)


def revisa(ruta):
    t = json.load(io.open(ruta, encoding='utf-8'))
    fallos = []
    L = t.get('listening') or {}

    p2 = L.get('p2') or {}
    g2 = guion(t, 'p2')
    for i, it in enumerate(p2.get('items') or [], 1):
        if not hay(g2, it['a']):
            fallos.append('P2.%d la respuesta %r no se oye en el guion' % (i, it['a']))

    p4 = L.get('p4') or {}
    g4 = guion(t, 'p4')
    for i, it in enumerate(p4.get('items') or [], 1):
        ok = it.get('options') or []
        clave = ok['ABC'.index(it['key'])] if it.get('key') and ok else None
        if clave and not hay(g4, clave):
            fallos.append('P4.%d la opcion correcta %r no se oye en el guion' % (i, clave))
        # la pregunta tiene que estar en el guion, que la lee el examinador
        q = (it.get('q') or '').lower().rstrip('?').replace('’', "'")
        if q and q not in g4:
            fallos.append('P4.%d la pregunta no esta en el guion' % i)

    p5 = L.get('p5') or {}
    g5 = guion(t, 'p5')
    for i, it in enumerate(p5.get('items') or [], 1):
        que, col = it.get('what', ''), it.get('colour') or it.get('write', '')
        for parte in (que.replace('the ', ''), col):
            if parte and not hay(g5, parte.lower()):
                fallos.append('P5.%d %r no se oye en el guion' % (i, parte))

    p1 = L.get('p1') or {}
    g1 = guion(t, 'p1')
    for it in p1.get('items') or []:
        if not hay(g1, it['name']):
            fallos.append('P1 el nombre %r no se oye en el guion' % it['name'])
    for n in p1.get('names') or []:
        usados = [it['name'] for it in p1.get('items') or []] + [(p1.get('example') or {}).get('name')]
        if n not in usados and hay(g1, n):
            fallos.append('P1 %r es el nombre que sobra, pero se oye en el guion' % n)

    p3 = L.get('p3') or {}
    g3 = guion(t, 'p3')
    letras = {p['letter']: p['word'] for p in p3.get('pictures') or []}
    for i, it in enumerate(p3.get('items') or [], 1):
        w = letras.get(it['letter'], '')
        if w and not hay(g3, w, todas=False):
            fallos.append('P3.%d %r (letra %s) no se oye en el guion' % (i, w, it['letter']))

    print('%s: %s' % (ruta.replace('\\', '/'), 'todo cuadra' if not fallos else '%d avisos' % len(fallos)))
    for f in fallos:
        print('   ~', f)
    return len(fallos)


if __name__ == '__main__':
    rutas = [r for a in sys.argv[1:] for r in glob.glob(a)]
    total = sum(revisa(r) for r in rutas)
    print('\ntotal de avisos:', total)
    sys.exit(0)
