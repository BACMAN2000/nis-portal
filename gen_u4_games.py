# -*- coding: utf-8 -*-
"""Genera crossword-mind-over-matter.html y wordsearch-mind-over-matter.html
(Unit 4 · Mind Over Matter, A2-C1) clonando la UI de los juegos de Unit 3
y cambiando sólo `const DATA`, el <title> y el <header>.

Mismo algoritmo de rejilla que gen_fr_games.py. Reproducible (seed fija).
"""
import re, json, random, string, os, sys
try: sys.stdout.reconfigure(encoding='utf-8', errors='replace')
except Exception: pass

random.seed(20260818)
REPO = os.path.dirname(os.path.abspath(__file__))

# ---------------------------------------------------------------- vocabulario
# (palabra, pista). Todo sale del material real de la Unidad 4:
# W1S1 adjetivos+adverbios, W1S2 la lectura, W1S3 escaleras+listening, W2 gramática.
LEVELS = {
'A2': [
 ("OVERWHELMED", "You have far more to do than you can possibly manage."),
 ("ANXIOUS",     "Worried about something that might happen."),
 ("EXHAUSTED",   "Extremely tired: no energy left at all."),
 ("TENSE",       "Not relaxed — your shoulders are up by your ears."),
 ("IRRITABLE",   "You get angry very easily. Don't talk to me before breakfast!"),
 ("FRUSTRATED",  "Annoyed because you cannot do the thing you want to do."),
 ("RESTLESS",    "You cannot sit still or settle down."),
 ("DRAINED",     "Empty of energy, like a battery at zero."),
 ("MASK",        "You put on an invisible one to hide how you really feel."),
 ("KNOT",        "The tight feeling in your stomach before a test."),
 ("SLIGHTLY",    "Only a little: I'm ___ uneasy about tomorrow."),
 ("REALLY",      "Very: I was ___ frustrated when the printer broke."),
 ("PLAN",        "Miss Elena helped him make a realistic study ___."),
],
'B1': [
 ("DISCOURAGED", "You have lost hope after failing something twice."),
 ("UNEASY",      "Slightly uncomfortable — something does not feel right."),
 ("COUNSELLOR",  "The person at school who listens to students' problems."),
 ("PRETEND",     "To act as if everything is fine when it is not."),
 ("MINDSET",     "The beliefs you hold about something — your stress ___."),
 ("UTTERLY",     "Completely, absolutely: ___ exhausted."),
 ("COPE",        "To deal successfully with a difficult situation."),
 ("RATHER",      "Fairly, quite: I was ___ tense before the final whistle."),
 ("BRICKS",      "Comparing yourself to others is like a backpack full of ___."),
 ("SUPPORT",     "Under pressure we are more likely to seek ___."),
 ("OVERWHELMED", "So much to do that you cannot manage any of it."),
 ("EXHAUSTED",   "Completely without energy after three exams in two days."),
 ("RESTLESS",    "Too tired to work, too ___ to relax."),
 ("DRAINED",     "Emotionally empty — a battery at zero."),
 ("HAMSTER",     "At night my mind spun like a ___ on a wheel."),
],
'B2': [
 ("APPREHENSIVE","Nervous about a specific event that has not happened yet."),
 ("AGITATED",    "Troubled and unable to keep still — pacing, biting your nails."),
 ("LIVID",       "The top rung of the anger ladder: beyond furious."),
 ("DEVASTATED",  "The strongest word on the sadness ladder — a limit adjective."),
 ("MISERABLE",   "Stronger than sad, weaker than devastated."),
 ("PANICKED",    "The top rung of the worry ladder."),
 ("HARMFUL",     "Causing damage: do you believe stress is ___ to your health?"),
 ("SIGNAL",      "A pounding heart is an ambiguous ___ — threat or energy?"),
 ("BELIEF",      "Not the stress itself, but the ___ attached to it, mattered."),
 ("PERFORM",     "My body is pumping oxygen to my brain so that I can ___."),
 ("REALISTIC",   "Sensible and achievable — the kind of study plan that works."),
 ("MUMBLED",     "Said something quietly and unclearly, then walked out."),
 ("THEREFORE",   "Cause-effect linker: my schedule is full; ___ I feel overwhelmed."),
 ("GRADABLE",    "An adjective you CAN use with 'slightly' (unlike 'devastated')."),
 ("INTENSITY",   "What an emotion ladder measures, rung by rung."),
 ("COLLOCATION", "'Utterly exhausted' is natural; 'utterly tired' breaks this."),
],
'C1': [
 ("DESPONDENT",  "Beyond discouraged: hope lost after a term of near-misses."),
 ("RATIONED",    "He had ___ the truth for months — released in tiny amounts."),
 ("CURATED",     "Social feeds that are ___ show only the flattering material."),
 ("DISMANTLE",   "To take an enormous task apart into survivable steps."),
 ("CHOREOGRAPHY","The exhausting ___ of seeming fine."),
 ("PHOTOGENIC",  "The truth was less ___ — it did not look good in photos."),
 ("MYTHOLOGY",   "In my private ___, asking for help was a confession of weakness."),
 ("INSOMNIA",    "The clinical word for the sleepless nights he confessed."),
 ("ASTONISHMENT","To my ___, the world declined to end."),
 ("APPRAISAL",   "How you read a signal — threat or challenge."),
 ("CONFOUNDER",  "Optimism or income: a hidden third variable in a study."),
 ("AFFILIATION", "Stress does not only trigger flight; it drives ___."),
 ("BENIGN",      "Harmless: the healthy may find it easier to regard stress as ___."),
 ("SPOILSPORT",  "Someone who deflates a satisfying conclusion with the evidence."),
 ("UNCLENCHED",  "A knot like a fist that never ___."),
 ("OBSERVATIONAL","The study's design: nobody was assigned to a belief."),
],
}
SUBS = {'A2':'Elementary','B1':'Intermediate','B2':'Upper-Intermediate','C1':'Advanced'}
WS_BASE = {'A2':12,'B1':13,'B2':14,'C1':15}
WS_NOTE = {
 'A2':"Words go → across and ↓ down.",
 'B1':"Words go → across, ↓ down and ↘ diagonally.",
 'B2':"Words go in all 8 directions — including backwards.",
 'C1':"All 8 directions, backwards included. 16 words to find.",
}
WS_DIRS = {
 'A2':[(0,1),(1,0)],
 'B1':[(0,1),(1,0),(1,1)],
 'B2':[(0,1),(1,0),(0,-1),(-1,0),(1,1),(1,-1),(-1,1),(-1,-1)],
 'C1':[(0,1),(1,0),(0,-1),(-1,0),(1,1),(1,-1),(-1,1),(-1,-1)],
}

def strip(w): return re.sub(r'[^A-Z]', '', w.upper())

# ---------------------------------------------------------------- crossword
def check_place(grid, W, r0, c0, dr, dc):
    n = len(W)
    if (r0-dr, c0-dc) in grid: return -1
    if (r0+dr*n, c0+dc*n) in grid: return -1
    crosses = 0
    for k, ch in enumerate(W):
        r = r0+dr*k; c = c0+dc*k
        if (r, c) in grid:
            if grid[(r, c)] != ch: return -1
            crosses += 1
        else:
            pr, pc = dc, dr
            if (r+pr, c+pc) in grid: return -1
            if (r-pr, c-pc) in grid: return -1
    return crosses

def best_crossword(pairs, tries=400):
    """Prueba muchos órdenes de inserción y se queda con la rejilla más compacta
    (primero cuadrada, luego pequeña) que coloque todas las palabras."""
    best = None
    for t in range(tries):
        ws = list(pairs)
        if t:                                    # t=0 = orden por longitud (el de siempre)
            random.Random(t).shuffle(ws)
        c = make_crossword(ws, keep_order=bool(t))
        if len(c['words']) < len(pairs):         # descarta rejillas incompletas
            continue
        w, h = c['width'], c['height']
        score = (max(w, h), w * h, abs(w - h))   # compacta y lo más cuadrada posible
        if best is None or score < best[0]:
            best = (score, c)
    if best is None:                             # nunca cabe todo: devuelve el orden clásico
        return make_crossword(pairs)
    return best[1]


def make_crossword(pairs, keep_order=False):
    words = [{'w': strip(w), 'clue': cl} for w, cl in pairs]
    if not keep_order:
        words.sort(key=lambda x: -len(x['w']))
    words = [x for x in words if 2 < len(x['w']) <= 13]
    grid = {}; placed = []
    first = words[0]
    for i, ch in enumerate(first['w']): grid[(0, i)] = ch
    placed.append((first['w'], 0, 0, 'across', first['clue']))
    for it in words[1:]:
        W = it['w']; best = None; bestcross = 0
        for i, ch in enumerate(W):
            for (r, c), gch in list(grid.items()):
                if gch != ch: continue
                for dr, dc, dirn in ((1, 0, 'down'), (0, 1, 'across')):
                    r0 = r-dr*i; c0 = c-dc*i
                    cr = check_place(grid, W, r0, c0, dr, dc)
                    if cr > bestcross:
                        bestcross = cr; best = (W, r0, c0, dirn, it['clue'], dr, dc)
        if best:
            W, rb, cb, dirb, clb, dr, dc = best
            for k, ch in enumerate(W): grid[(rb+dr*k, cb+dc*k)] = ch
            placed.append((W, rb, cb, dirb, clb))
    minr = min(r for r, c in grid); minc = min(c for r, c in grid)
    maxr = max(r for r, c in grid); maxc = max(c for r, c in grid)
    return {'width': maxc-minc+1, 'height': maxr-minr+1,
            'words': [{'word': w, 'row': r-minr, 'col': c-minc, 'dir': d, 'clue': cl}
                      for (w, r, c, d, cl) in placed]}

# ---------------------------------------------------------------- word search
def make_wordsearch(pairs, base, dirs):
    items = [strip(w) for w, cl in pairs]
    items = [w for w in items if 2 < len(w) <= 16]
    items = list(dict.fromkeys(items))                 # dedupe, keep order
    size = max(base, max(len(w) for w in items))
    grid = [[None]*size for _ in range(size)]
    placed = []
    for W in sorted(items, key=lambda x: -len(x)):
        for _ in range(600):
            dr, dc = random.choice(dirs)
            r0 = random.randrange(size); c0 = random.randrange(size)
            re_ = r0+dr*(len(W)-1); ce = c0+dc*(len(W)-1)
            if not (0 <= re_ < size and 0 <= ce < size): continue
            cells = []; good = True
            for k, ch in enumerate(W):
                r = r0+dr*k; c = c0+dc*k
                if grid[r][c] not in (None, ch): good = False; break
                cells.append((r, c))
            if not good: continue
            for k, ch in enumerate(W):
                r, c = cells[k]; grid[r][c] = ch
            placed.append({'word': W, 'cells': [[r, c] for r, c in cells]})
            break
    for r in range(size):
        for c in range(size):
            if grid[r][c] is None: grid[r][c] = random.choice(string.ascii_uppercase)
    return {'size': size, 'grid': [''.join(grid[r]) for r in range(size)], 'words': placed}

# ---------------------------------------------------------------- build
cw = {}; ws = {}
for lv, pairs in LEVELS.items():
    c = best_crossword(pairs)
    cw[lv] = {'label': lv, 'sub': SUBS[lv], 'width': c['width'], 'height': c['height'], 'words': c['words']}
    w = make_wordsearch(pairs, WS_BASE[lv], WS_DIRS[lv])
    ws[lv] = {'label': lv, 'sub': SUBS[lv], 'note': WS_NOTE[lv], 'size': w['size'],
              'grid': w['grid'], 'words': w['words']}

# ---------------------------------------------------------------- validate
problems = []
for lv in LEVELS:
    p = cw[lv]; occ = {}
    for wd in p['words']:
        dr, dc = (1, 0) if wd['dir'] == 'down' else (0, 1)
        for k, ch in enumerate(wd['word']):
            rr, cc = wd['row']+dr*k, wd['col']+dc*k
            if not (0 <= rr < p['height'] and 0 <= cc < p['width']):
                problems.append(('cw-bounds', lv, wd['word']))
            if (rr, cc) in occ and occ[(rr, cc)] != ch:
                problems.append(('cw-conflict', lv, wd['word']))
            occ[(rr, cc)] = ch
    q = ws[lv]
    assert len(q['grid']) == q['size'] and all(len(r) == q['size'] for r in q['grid']), ('ws-size', lv)
    for wd in q['words']:
        if len(wd['cells']) != len(wd['word']): problems.append(('ws-len', lv, wd['word']))
        for (r, c), ch in zip(wd['cells'], wd['word']):
            if q['grid'][r][c] != ch: problems.append(('ws-mismatch', lv, wd['word']))

# ---------------------------------------------------------------- emit
def replace_data(src, data):
    """Sustituye el bloque `const DATA = {...};` completo (puede ser multilínea)."""
    i = src.index('const DATA =')
    j = src.index('{', i)
    depth = 0; k = j
    while k < len(src):
        if src[k] == '{': depth += 1
        elif src[k] == '}':
            depth -= 1
            if depth == 0: break
        k += 1
    end = src.index(';', k) + 1
    return src[:i] + 'const DATA = ' + json.dumps(data, ensure_ascii=False) + ';' + src[end:]

def emit(src_name, dst_name, data, title, h1, sub):
    s = open(os.path.join(REPO, src_name), encoding='utf-8').read()
    s = replace_data(s, data)
    s = re.sub(r'<title>.*?</title>', '<title>' + title + '</title>', s, count=1)
    s = re.sub(r'<header>\s*<h1>.*?</h1>\s*<p>.*?</p>\s*</header>',
               '<header>\n  <h1>' + h1 + '</h1>\n  <p>' + sub + '</p>\n</header>',
               s, count=1, flags=re.S)
    open(os.path.join(REPO, dst_name), 'w', encoding='utf-8').write(s)

emit('crossword-digital-footprint.html', 'crossword-mind-over-matter.html', cw,
     'Mind Over Matter Crossword — by CEFR level',
     '&#129504; Mind Over Matter — Crossword by Level',
     'Unit 4 &middot; The Wellbeing Generation — the whole unit&rsquo;s vocabulary, graded A2 to C1 '
     '(the weekly crosswords cover one week each). Grade 9 &middot; NIS English')

emit('wordsearch-digital-footprint.html', 'wordsearch-mind-over-matter.html', ws,
     'Mind Over Matter Word Search — by CEFR level',
     '&#128269; Mind Over Matter — Word Search by Level',
     'Unit 4 &middot; The Wellbeing Generation — the whole unit&rsquo;s vocabulary, graded A2 to C1. '
     'A2 goes across and down; C1 runs in all eight directions. Grade 9 &middot; NIS English')

# ---------------------------------------------------------------- report
print('=' * 60)
for lv in LEVELS:
    print(f"{lv}: crossword {len(cw[lv]['words'])}/{len(LEVELS[lv])} words "
          f"in {cw[lv]['width']}x{cw[lv]['height']}  |  "
          f"word search {len(ws[lv]['words'])}/{len(LEVELS[lv])} in {ws[lv]['size']}x{ws[lv]['size']}")
print('=' * 60)
print('PROBLEMS:', problems if problems else 'none')
print('written: crossword-mind-over-matter.html, wordsearch-mind-over-matter.html')
