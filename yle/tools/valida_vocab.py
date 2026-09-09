# -*- coding: utf-8 -*-
"""Comprueba que las frases de ejemplo del entrenador estan dentro del nivel.

El entrenador ensena una palabra con una frase, y la frase no puede apoyarse en
palabras que el nino todavia no tiene: en Starters no vale explicar «lamp» con
«electricity». Aqui se pasa el mismo filtro que valida los examenes (validate.py:
la word list del nivel y de los anteriores, mas las formas gramaticales de EXTRA),
frase a frase, sobre yle/vocab/<level>.json.

    python yle/tools/valida_vocab.py                 # los tres niveles
    python yle/tools/valida_vocab.py starters        # uno solo
    python yle/tools/valida_vocab.py --curso         # solo las marcadas "c" (las nuevas)

Sale con codigo 1 si alguna frase se sale del nivel. Los nombres propios (mayuscula
dentro de la frase), los numeros y las palabras de una letra se toleran, igual que
en el validador de examenes.
"""
import io, os, re, sys, json, unicodedata

AQUI = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.dirname(AQUI))
import validate as V

RAIZ = os.path.dirname(os.path.dirname(AQUI))
NIVELES = ['starters', 'movers', 'flyers']
BIBLIA = os.path.join(RAIZ, 'nis-fun', 'characters', 'bible.md')


def pelado(p):
    """Sin tildes y en minuscula: la biblia escribe el slug «sofia» y la frase «Sofía»."""
    return ''.join(c for c in unicodedata.normalize('NFD', p.lower()) if not unicodedata.combining(c))


def elenco():
    """Los personajes de Fun for Nordic, leidos de la biblia.

    Freya, Erik o Kili no estan en la word list ni pueden estar: son nombres propios.
    La lista de quien puede salir ya existe y es cerrada (nis-fun/characters/bible.md,
    columna «Slug»), asi que se lee de ahi y no se copia a mano a un segundo sitio."""
    if not os.path.exists(BIBLIA):
        return set()
    txt = io.open(BIBLIA, encoding='utf-8').read()
    slugs = {m.group(1) for m in re.finditer(r'^\|\s*([a-z][a-z0-9_-]{1,20})\s*\|', txt, re.M)}
    return slugs - {'slug'}   # la cabecera de la tabla no es un personaje


def nombres_propios(frases):
    """Los nombres propios que se demuestran a si mismos en el corpus del nivel.

    El validador de examenes tolera la mayuscula en medio de la frase, pero asi
    «Luna was a very small puppy» daba error y «Look at Luna» no: el mismo nombre,
    contado de dos maneras segun donde cayera. Aqui vale como nombre propio el que
    aparece con mayuscula en medio de alguna frase del nivel; en las demas ya puede
    abrir la frase. «Wash your face!» sigue siendo un error, porque «Wash» no sale
    con mayuscula en ningun otro sitio."""
    propios = set()
    for f in frases:
        for i, p in enumerate(V.palabras(f)):
            if i > 0 and p[0].isupper():
                propios.add(p.lower())
    return propios


def fuera_de_nivel(frase, vocab, propios):
    """Las palabras de la frase que no estan en el nivel ni en los anteriores."""
    malas = []
    for i, p in enumerate(V.palabras(frase)):
        lw = p.lower().replace('’', "'")
        if len(lw) < 2 or lw.isdigit():
            continue
        # un nombre propio va con mayuscula: en medio de la frase, o demostrado
        # en otra frase del nivel (si no, el mismo nombre contaba distinto segun
        # cayera al principio o no)
        if p[0].isupper() and (i > 0 or pelado(lw) in propios):
            continue
        if V.bases(lw) & vocab:
            continue
        malas.append(p)
    return malas


def revisa(level, solo_curso=False):
    data = json.load(io.open(os.path.join(RAIZ, 'yle', 'vocab', level + '.json'), encoding='utf-8'))
    vocab = V.vocabulario(level)
    propios = {pelado(p) for p in nombres_propios([w['ex'] for w in data['words']])} | elenco()
    filas = [w for w in data['words'] if not solo_curso or w.get('c')]
    fallos = []
    for w in filas:
        malas = fuera_de_nivel(w["ex"], vocab, propios)
        if malas:
            fallos.append((w['w'], w['ex'], malas))
    print('%-9s %3d frases revisadas, %d fuera de nivel' % (level, len(filas), len(fallos)))
    for pal, ex, malas in fallos:
        print('   %-28s %-52s -> %s' % (pal, ex, ', '.join(malas)))
    return len(fallos)


if __name__ == '__main__':
    solo = '--curso' in sys.argv
    args = [a for a in sys.argv[1:] if not a.startswith('--')]
    total = sum(revisa(lv, solo) for lv in (args or NIVELES))
    print('TOTAL fuera de nivel: %d' % total)
    sys.exit(1 if total else 0)
