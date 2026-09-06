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
better best worse worst more most less least further farther bigger biggest smaller smallest colour colours colourful favourite
each'''.split())

# como cuenta items cada tipo de parte del esquema actual (flyers-practice)
def cuenta(parte):
    if not isinstance(parte, dict): return 0
    # esquema nuevo (yle/<level>/test-NN.json): cada parte declara su tipo
    t = parte.get('type')
    if t in ('mc_cloze_copy', 'open_cloze'): return len(parte.get('key') or [])
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

# parentesis que solo aclaran el sentido y no forman parte de la palabra:
# 'catch (e.g. a bus)', 'letter (as in mail)', 'stage (theatre)', 'fish (s + pl)'
ACLARA = re.compile(r'^(as in|e\.g\.|i\.e\.|for |s \+ pl|music|computer|theatre|football|ride|as sports|car; bike|title)', re.I)

def parentesis(e):
    """Primer parentesis de la entrada, contando anidados: en
    'candy (UK sweet(s))' devuelve (inicio, fin, 'UK sweet(s)')."""
    i = e.find('(')
    if i < 0: return None
    hondo = 0
    for j in range(i, len(e)):
        if e[j] == '(': hondo += 1
        elif e[j] == ')':
            hondo -= 1
            if hondo == 0: return i, j + 1, e[i + 1:j].strip()
    return None

def expande(entrada):
    """Las formas en que una entrada oficial puede aparecer en un texto.

    'apartment (UK flat)'  -> apartment, flat        (variante US/UK)
    'teddy (bear)'         -> teddy, teddy bear      (parte opcional)
    'sweet(s)' 'blond(e)'  -> sweet, sweets / blond, blonde
    'man/men'              -> man, men
    'city/town centre'     -> city centre, town centre
    'letter (as in mail)'  -> letter                 (solo aclara)
    """
    e = entrada.strip()
    formas = set()
    p = parentesis(e)
    if p:
        ini, fin, dentro = p
        if ini > 0 and e[ini - 1] != ' ':   # pegado a la palabra: sweet(s), blond(e), chemist('s)
            return expande(e[:ini] + e[fin:]) | expande(e[:ini] + dentro + e[fin:])
        def con(x):   # la entrada con el parentesis sustituido por x
            return re.sub(r'\s+', ' ', e[:ini] + ' ' + x + ' ' + e[fin:]).strip()
        formas |= expande(con(''))
        if re.match(r'^(US|UK)\s+', dentro, re.I):        # variante del otro ingles
            # la variante sustituye a las palabras que nombra, que son las que van
            # justo antes: 'apartment (UK flat)' -> flat, 'film (US movie) star' ->
            # movie star, 'fire engine (US fire truck)' -> fire truck
            otra = re.sub(r'^(US|UK)\s+', '', dentro, flags=re.I)
            antes = e[:ini].split()
            corta = len(otra.split())
            formas |= expande(' '.join(antes[:-corta] + [otra]) + e[fin:])
        elif not ACLARA.match(dentro):                     # parte opcional: teddy (bear)
            formas |= expande(con(dentro))
        return formas
    # alternativas dentro de una palabra: man/men, city/town centre
    tok = e.split()
    for i, t in enumerate(tok):
        if '/' in t:
            for alt in t.split('/'):
                formas |= expande(' '.join(tok[:i] + [alt] + tok[i + 1:]))
            return formas
    return {e.lower()} if e else set()

def vocabulario(level):
    v = set()
    for l in ORDEN[:ORDEN.index(level) + 1]:
        for w in WL[l]:
            for forma in expande(w):
                forma = forma.replace('’', "'")   # o’clock -> o'clock
                v.add(forma)
                v.update(forma.split())   # 'ice cream' permite tambien 'ice' y 'cream'
                v.update(forma.replace('-', ' ').split())   # y 'grown-up' -> 'grown', 'up'
    return v | EXTRA

def palabras(texto):
    return re.findall(r"[A-Za-zÀ-ÿ][A-Za-zÀ-ÿ'’]*", texto or '')   # con acentos: café

# plurales irregulares que la lista da en singular: scarf -> scarves
IRREG = {'scarves': 'scarf', 'shelves': 'shelf', 'wolves': 'wolf', 'knives': 'knife',
         'leaves': 'leaf', 'loaves': 'loaf', 'halves': 'half', 'thieves': 'thief',
         'children': 'child', 'people': 'person', 'mice': 'mouse', 'geese': 'goose',
         'feet': 'foot', 'teeth': 'tooth', 'men': 'man', 'women': 'woman'}


def bases(lw):
    """Formas de las que puede venir una palabra flexionada."""
    out = {lw}
    if lw in IRREG: out.add(IRREG[lw])
    for suf, rep in (('ies', 'y'), ('ies', 'ie'), ('ied', 'y'), ('ier', 'y'), ('iest', 'y'), ('es', ''), ('es', 'e'), ('s', ''),
                     ('ed', ''), ('ed', 'e'), ('ing', ''), ('ing', 'e'),
                     ('er', ''), ('er', 'e'), ('est', ''), ('est', 'e'), ('ly', ''),
                     ("'s", ''), ('’s', '')):
        if lw.endswith(suf) and len(lw) - len(suf) >= 2:
            out.add(lw[:-len(suf)] + rep)
    for b in list(out):                      # running -> run, bigger -> big
        if len(b) > 2 and b[-1] == b[-2]:
            out.add(b[:-1])
    out.add(lw + 's'); out.add(lw + 'es')    # la lista trae 'boots', el texto dice 'boot'
    return out

def textos_rw(t):
    out = []
    def rec(x):
        if isinstance(x, str): out.append(x)
        elif isinstance(x, list): [rec(i) for i in x]
        elif isinstance(x, dict): [rec(v) for k, v in x.items() if k not in ('type', 'image', 'images', 'id', 'person', 'card', 'target', 'zone', 'zones', 'scene')]
    rec(t.get('rw', {})); rec(t.get('listening', {}))
    return out

# ---------------------------------------------------------------- gramatica
# Estructuras de la Grammar and Structures List (yle/grammar-2024.json) que se
# reconocen en un texto. Solo estan las que se pueden detectar sin equivocarse:
# la idea no es puntuar la gramatica del test, sino avisar de que un examen usa
# algo que su nivel todavia no ha visto (past continuous en Movers, por ejemplo).
# Las palabras que terminan en -ing sin serlo (nothing, morning) se descartan.
NO_ING = set('nothing something anything everything thing things king ring spring morning evening during string wing swing sing bring young along wrong'.split())
GRAM_PAT = {
  'past_simple':      [r"\b(?:went|saw|ate|drank|rode|took|gave|bought|found|caught|flew|wrote|sang|swam|ran|said|told|made|played|walked|looked|wanted|liked|opened|closed|jumped|helped|watched|carried|dropped|shouted|laughed|climbed|painted|cleaned|washed|cooked|visited|arrived)\b"],
  'comparative_adj':  [r"\b\w{3,}er than\b", r"\bthe \w{3,}est\b", r"\bmore \w+ than\b"],
  'must':             [r"\bmust(?:n't)? \w+"],
  'have_to':          [r"\b(?:have|has|had) to \w+"],
  'relative_clauses': [r"\bthe (?:girl|boy|man|woman|person|one|thing|place|house|dog|cat|children|people) (?:who|which|where|that) \w+"],
  'past_continuous':  ['@ing'],
  'present_perfect':  [r"\b(?:has|have|'s|'ve) (?:just|already|ever|never) \w+", r"\b(?:has|have|'ve) (?:been|gone|eaten|seen|done|made|finished|found|bought|written|taken|forgotten|broken|lost|won)\b"],
  'be_going_to':      [r"\b(?:am|is|are|'m|'s|'re) going to (?!the\b|a\b|an\b|school\b|bed\b|town\b|work\b|sleep\b)[a-z]+"],
  'will':             [r"\b(?:will|won't) [a-z]+", r"'ll [a-z]+"],
  'might':            [r"\bmight [a-z]+"],
  'should':           [r"\bshould(?:n't)? [a-z]+"],
  'tag_questions':    [r",\s(?:isn't|aren't|doesn't|don't|didn't|wasn't|can't|won't) (?:it|he|she|they|you|we|I)\?"],
}


def gramatica_de(level):
    """{id: nivel} de las estructuras oficiales, para saber cual sobra en cada nivel."""
    try:
        G = json.load(io.open(os.path.join(AQUI, 'grammar-2024.json'), encoding='utf-8'))
    except Exception:
        return {}
    return {e['id']: (L, e['name']) for L in ORDEN for e in G.get(L, [])}


def gramatica_fuera(texto, level, mapa):
    """Estructuras de un nivel superior que aparecen en el texto, con un ejemplo."""
    permitido = ORDEN.index(level)
    out = {}
    for sid, pats in GRAM_PAT.items():
        if sid not in mapa: continue
        nivel, nombre = mapa[sid]
        if ORDEN.index(nivel) <= permitido: continue
        casos = []
        for pat in pats:
            if pat == '@ing':   # past continuous: was/were + gerundio de verdad
                for m in re.finditer(r"\b(was|were)\s+([a-z]+ing)\b", texto, re.I):
                    if m.group(2).lower() not in NO_ING: casos.append(m.group(0))
            else:
                casos += re.findall(pat, texto, re.I)
        if casos: out[nombre] = (nivel, len(casos), casos[0])
    return out


def valida(tests, level, strict=False):
    spec = SPECS['levels'][level]; vocab = vocabulario(level); errores = 0; avisos = 0
    mapa = gramatica_de(level); gram = 0
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
                # 'th'/'st'/'nd'/'rd' salen de los ordinales (4th, 17th), no son palabras
                if len(lw) <= 1 or lw in vocab or w[0].isupper() or lw.isdigit() or lw in ('ex', 'th', 'st', 'nd', 'rd'): continue
                if bases(lw) & vocab: continue   # formas flexionadas de palabras de la lista
                fuera[lw] = fuera.get(lw, 0) + 1
        if fuera:
            avisos += len(fuera)
            print('   ~ fuera de la lista %s: %s' % (level, ', '.join(sorted(fuera)[:30]) + (' …' if len(fuera) > 30 else '')))
        g = gramatica_fuera(' '.join(textos_rw(t)), level, mapa)
        for nombre, (niv, n, ej) in sorted(g.items(), key=lambda x: -x[1][1]):
            gram += 1
            print('   ~ gramática de %s: %s (%d) «%s»' % (niv, nombre, n, ej.strip()[:60]))
    print('\nerrores de formato:', errores, '| palabras fuera de lista:', avisos, '| estructuras por encima de nivel:', gram)
    return errores == 0 and (not strict or (avisos == 0 and gram == 0))

if __name__ == '__main__':
    args = [a for a in sys.argv[1:] if not a.startswith('--')]
    level = 'flyers'
    if '--level' in sys.argv: level = sys.argv[sys.argv.index('--level') + 1]
    tests = json.load(io.open(args[0], encoding='utf-8'))
    if isinstance(tests, dict): tests = [tests]
    ok = valida(tests, level, '--strict' in sys.argv)
    sys.exit(0 if ok else 1)
