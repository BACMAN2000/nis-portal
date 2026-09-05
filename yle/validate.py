# -*- coding: utf-8 -*-
"""Validador de tests YLE contra el formato oficial (specs.json) y la lista de
palabras 2025 (wordlist-2025.json).

    python yle/validate.py tests.json            # tests.json = lista de tests (esquema de flyers-practice)
    python yle/validate.py tests.json --level flyers --strict

Comprueba, por test:
  - que cada parte de Listening y Reading & Writing tiene el numero de items oficial
  - que cada paper suma los items oficiales
  - que las palabras de los textos (R&W) estan en la lista del nivel o de los
    anteriores; los nombres propios, numeros y palabras de una letra se toleran

Sale con codigo 1 si hay errores de formato (los avisos de vocabulario no cortan
salvo con --strict). Pensado para correr antes de publicar un test nuevo.
"""
import io, os, re, sys, json

AQUI = os.path.dirname(os.path.abspath(__file__))
SPECS = json.load(io.open(os.path.join(AQUI, 'specs.json'), encoding='utf-8'))
WL = json.load(io.open(os.path.join(AQUI, 'wordlist-2025.json'), encoding='utf-8'))
ORDEN = ['starters', 'movers', 'flyers']
# formas que la lista oficial no enumera pero salen de ella (gramatica): pasados
# irregulares, contracciones, numeros en letras y comparativos
EXTRA = set('''am is are was were been being has had did done went gone came come ate eaten drank drunk saw seen took taken gave given made bought brought
built began begun caught felt fell fallen flew flown forgot found got grew heard held kept knew known left lost met paid put ran read rode said sat
slept spoke spent stood swam taught thought told understood wore woke won wrote written drew drawn sang sung swum threw thrown broke broken chose chosen
could should would might can't cannot don't doesn't didn't isn't aren't wasn't weren't couldn't shouldn't wouldn't won't haven't hasn't hadn't let's i'm
you're he's she's it's we're they're i've you've we've they've i'll you'll we'll they'll that's there's what's who's
zero one two three four five six seven eight nine ten eleven twelve thirteen fourteen fifteen sixteen seventeen eighteen nineteen twenty thirty forty fifty
sixty seventy eighty ninety hundred thousand first second third fourth fifth sixth seventh eighth ninth tenth eleventh twelfth twentieth
better best worse worst more most less least further farther bigger biggest smaller smallest colour colours colourful favourite'''.split())

# como cuenta items cada tipo de parte del esquema actual (flyers-practice)
def cuenta(parte):
    if not isinstance(parte, dict): return 0
    # esquema nuevo (yle/<level>/test-NN.json): cada parte declara su tipo
    t = parte.get('type')
    if t == 'mc_cloze_copy': return len(parte.get('key') or [])
    if t == 'story_one_word': return sum(len(x.get('items') or []) for x in parte.get('parts') or [])
    if t == 'story_completion': return sum(len(x.get('items') or []) for x in parte.get('parts') or [])
    if t == 'productive_writing' and 'complete' in parte: return len(parte.get('complete') or []) + len(parte.get('answer') or []) + int((parte.get('write') or {}).get('n', 2))
    if t in ('gapped_text_title',): return len([g for g in re.findall(r'__\((\d+)\)__', parte.get('text', '')) if g != '0']) + 1
    if t in ('story_writing', 'productive_writing'): return len(parte.get('items') or []) or 1
    if t and isinstance(parte.get('items'), list): return len(parte['items'])
    for k in ('items', 'defs', 'pairs', 'questions', 'labels', 'names', 'answers', 'instructions'):
        if isinstance(parte.get(k), list): return len(parte[k])
    if 'words' in parte and 'title_choices' in parte:   # texto con huecos + titulo
        return len(re.findall(r'__\(\d+\)__', parte.get('text', ''))) + 1
    if parte.get('type') in ('story_writing',) or 'p1' in parte: return 1
    return 0

def vocabulario(level):
    v = set()
    for l in ORDEN[:ORDEN.index(level) + 1]:
        for w in WL[l]:
            for parte in re.split(r'\s*/\s*', w): v.add(re.sub(r'\s*\(.*?\)', '', parte).strip().lower())
    return v | EXTRA

def palabras(texto):
    return re.findall(r"[A-Za-z][A-Za-z'’]*", texto or '')

def textos_rw(t):
    out = []
    def rec(x):
        if isinstance(x, str): out.append(x)
        elif isinstance(x, list): [rec(i) for i in x]
        elif isinstance(x, dict): [rec(v) for k, v in x.items() if k not in ('type', 'image', 'images', 'id', 'person', 'card', 'target', 'zone', 'zones')]
    rec(t.get('rw', {})); rec(t.get('listening', {}))
    return out

def valida(tests, level, strict=False):
    spec = SPECS['levels'][level]; vocab = vocabulario(level); errores = 0; avisos = 0
    for t in tests:
        n = t.get('number'); print('== Test %s %s' % (n, t.get('theme', '')))
        for paper, clave in (('listening', 'listening'), ('rw', 'rw')):
            for p in spec[paper]['parts']:
                parte = (t.get(clave) or {}).get('p%d' % p['n'])
                if parte is None:
                    print('   !! %s parte %d no existe (%s)' % (paper, p['n'], p['task'])); errores += 1; continue
                c = cuenta(parte)
                if c != p['items']:
                    print('   !! %s parte %d: %d items, oficial %d (%s)' % (paper, p['n'], c, p['items'], p['type'])); errores += 1
            total = sum(cuenta((t.get(clave) or {}).get('p%d' % p['n'])) for p in spec[paper]['parts'])
            print('   %s: %d items (oficial %d)' % (paper, total, spec[paper]['items']))
        fuera = {}
        for txt in textos_rw(t):
            for w in palabras(txt):
                lw = w.lower().strip("'’")
                lw = lw.replace('’', "'")
                if len(lw) <= 1 or lw in vocab or w[0].isupper() or lw.isdigit() or lw == 'ex': continue
                # formas flexionadas simples de palabras de la lista
                base = re.sub(r"(ies|es|s|ed|ing|er|est|ly|'s|’s)$", '', lw)
                if base in vocab or base + 'e' in vocab or (base.endswith('i') and base[:-1] + 'y' in vocab): continue
                if len(base) > 2 and base[-1] == base[-2] and base[:-1] in vocab: continue   # running -> run
                fuera[lw] = fuera.get(lw, 0) + 1
        if fuera:
            avisos += len(fuera)
            print('   ~ fuera de la lista %s: %s' % (level, ', '.join(sorted(fuera)[:30]) + (' …' if len(fuera) > 30 else '')))
    print('\nerrores de formato:', errores, '| palabras fuera de lista:', avisos)
    return errores == 0 and (not strict or avisos == 0)

if __name__ == '__main__':
    args = [a for a in sys.argv[1:] if not a.startswith('--')]
    level = 'flyers'
    if '--level' in sys.argv: level = sys.argv[sys.argv.index('--level') + 1]
    tests = json.load(io.open(args[0], encoding='utf-8'))
    if isinstance(tests, dict): tests = [tests]
    ok = valida(tests, level, '--strict' in sys.argv)
    sys.exit(0 if ok else 1)
