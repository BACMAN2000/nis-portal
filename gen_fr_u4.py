# -*- coding: utf-8 -*-
"""Genera los 216 juegos de la Unité 4 de FRANCÉS
(6 grados x 6 semanas x 6 juegos), clonando los motores de la Unit 4 de
inglés y sustituyendo sólo sus datos y los textos de interfaz.

Mismo método que gen_fr_games.py: se lee el HTML inglés, se cambia la
línea `const DATA` / `const LEVELS`, el <title>, el <h1>, y se parchea
lo que el francés necesita (voz fr-FR, plegado de acentos, títulos de
resultados). Reproducible: semilla fija.

    python gen_fr_u4.py
"""
import re, os, json, random, unicodedata, string, math
from fr_definitions import DEF as DEF_BASE
from fr_u4_vocab import (DEF_U4, WEEKS, GRADES, GRADE_LABEL, GRADE_LEVEL, GRADE_TITLE,
                         SUDOKU_POOL_4, SUDOKU_POOL_6)

random.seed(20260817)
REPO = os.path.dirname(os.path.abspath(__file__))
MISSING_DEF = set()
PATCH_MISS = []

# --------------------------------------------------------------- #
#  Utilidades                                                      #
# --------------------------------------------------------------- #
def strip(w):
    """Quita acentos, guiones y apóstrofos -> A-Z (las rejillas son ASCII)."""
    w = unicodedata.normalize('NFD', w)
    w = ''.join(c for c in w if unicodedata.category(c) != 'Mn')
    return re.sub(r'[^A-Z]', '', w.upper())

def clue(word):
    d = DEF_U4.get(word) or DEF_BASE.get(word)
    if not d:
        MISSING_DEF.add(word)
        return "Mot de la semaine : " + word + "."
    return d

def days(words):
    """D1 = primera mitad, D2 = segunda mitad, D3 = todas (repaso)."""
    h = math.ceil(len(words) / 2)
    return {'D1': words[:h], 'D2': words[h:], 'D3': list(words)}

DAY_LABEL = {'D1': 'Jour 1', 'D2': 'Jour 2', 'D3': 'Jour 3'}
DAY_SUB   = {'D1': 'Découverte', 'D2': 'Approfondissement', 'D3': 'Révision'}

# --------------------------------------------------------------- #
#  Crossword (mismo algoritmo que gen_fr_games.py)                 #
# --------------------------------------------------------------- #
def check_place(grid, W, r0, c0, dr, dc):
    n = len(W)
    if (r0 - dr, c0 - dc) in grid: return -1
    if (r0 + dr * n, c0 + dc * n) in grid: return -1
    crosses = 0
    for k, ch in enumerate(W):
        r, c = r0 + dr * k, c0 + dc * k
        if (r, c) in grid:
            if grid[(r, c)] != ch: return -1
            crosses += 1
        else:
            pr, pc = dc, dr
            if (r + pr, c + pc) in grid: return -1
            if (r - pr, c - pc) in grid: return -1
    return crosses

def make_crossword(words_fr):
    items = []
    seen = set()
    for fr in words_fr:
        W = strip(fr)
        if not (2 < len(W) <= 13) or W in seen: continue
        seen.add(W)
        items.append({'w': W, 'clue': clue(fr), 'fr': fr})
    items.sort(key=lambda x: -len(x['w']))
    if not items: return None
    grid, placed = {}, []
    first = items[0]
    for i, ch in enumerate(first['w']): grid[(0, i)] = ch
    placed.append((first['w'], 0, 0, 'across', first['clue']))
    for it in items[1:]:
        W = it['w']; best = None; bestcross = 0
        for i, ch in enumerate(W):
            for (r, c), gch in list(grid.items()):
                if gch != ch: continue
                for dr, dc, dirn in ((1, 0, 'down'), (0, 1, 'across')):
                    r0, c0 = r - dr * i, c - dc * i
                    cr = check_place(grid, W, r0, c0, dr, dc)
                    if cr > bestcross:
                        bestcross = cr; best = (W, r0, c0, dirn, it['clue'], dr, dc)
        if best:
            W, rb, cb, dirb, clb, dr, dc = best
            for k, ch in enumerate(W): grid[(rb + dr * k, cb + dc * k)] = ch
            placed.append((W, rb, cb, dirb, clb))
    minr = min(r for r, c in grid); minc = min(c for r, c in grid)
    maxr = max(r for r, c in grid); maxc = max(c for r, c in grid)
    return {
        'width': maxc - minc + 1, 'height': maxr - minr + 1,
        'words': [{'word': w, 'row': r - minr, 'col': c - minc, 'dir': d, 'clue': cl}
                  for (w, r, c, d, cl) in placed],
    }

# --------------------------------------------------------------- #
#  Word search — la dificultad sube por día                        #
# --------------------------------------------------------------- #
DIRS_BY_DAY = {
    'D1': [(0, 1), (1, 0)],
    'D2': [(0, 1), (1, 0), (1, 1)],
    'D3': [(0, 1), (1, 0), (0, -1), (-1, 0), (1, 1), (1, -1), (-1, 1), (-1, -1)],
}
NOTE_BY_DAY = {
    'D1': "Les mots vont → horizontalement et ↓ verticalement.",
    'D2': "Les mots vont →, ↓ et ↘ en diagonale.",
    'D3': "Expert : les mots vont dans les 8 directions, y compris ↑ et ← à l'envers.",
}

def make_wordsearch(words_fr, day):
    items, seen = [], set()
    for fr in words_fr:
        W = strip(fr)
        if not (2 < len(W) <= 14) or W in seen: continue
        seen.add(W); items.append((W, fr))
    if not items: return None
    size = max(12, max(len(w) for w, fr in items) + 1)
    dirs = DIRS_BY_DAY[day]
    grid = [[None] * size for _ in range(size)]
    placed = []
    for W, fr in sorted(items, key=lambda x: -len(x[0])):
        for _ in range(600):
            dr, dc = random.choice(dirs)
            r0, c0 = random.randrange(size), random.randrange(size)
            re_, ce = r0 + dr * (len(W) - 1), c0 + dc * (len(W) - 1)
            if not (0 <= re_ < size and 0 <= ce < size): continue
            cells, good = [], True
            for k, ch in enumerate(W):
                r, c = r0 + dr * k, c0 + dc * k
                if grid[r][c] not in (None, ch): good = False; break
                cells.append((r, c))
            if not good: continue
            for k, ch in enumerate(W):
                r, c = cells[k]; grid[r][c] = ch
            placed.append({'word': W, 'fr': fr, 'cells': [[r, c] for r, c in cells]})
            break
    for r in range(size):
        for c in range(size):
            if grid[r][c] is None: grid[r][c] = random.choice(string.ascii_uppercase)
    return {'size': size, 'grid': [''.join(grid[r]) for r in range(size)],
            'words': placed, 'note': NOTE_BY_DAY[day]}

# --------------------------------------------------------------- #
#  Word sudoku — las letras son los símbolos: deben ser distintas  #
# --------------------------------------------------------------- #
def distinct(w):
    return len(set(w)) == len(w)

def pick_sudoku(words_fr, n, pool, want, used):
    """Prefiere palabras de la semana; completa con el pool general."""
    out = []
    for fr in words_fr:
        W = strip(fr)
        if len(W) == n and distinct(W) and W not in out and W not in used:
            out.append(W)
        if len(out) >= want: return out
    for W in pool:
        if len(W) == n and distinct(W) and W not in out and W not in used:
            out.append(W)
        if len(out) >= want: return out
    return out

def make_sudoku(words_fr, theme):
    used = set()
    d1 = pick_sudoku(words_fr, 4, SUDOKU_POOL_4, 4, used); used.update(d1)
    d2 = pick_sudoku(words_fr, 6, SUDOKU_POOL_6, 3, used); used.update(d2)
    d3 = pick_sudoku(words_fr, 6, SUDOKU_POOL_6, 3, used)
    return {
        'D1': {'n': 4, 'br': 2, 'bc': 2, 'clues': 8,  'topic': DAY_SUB['D1'], 'words': d1},
        'D2': {'n': 6, 'br': 2, 'bc': 3, 'clues': 18, 'topic': DAY_SUB['D2'], 'words': d2},
        'D3': {'n': 6, 'br': 2, 'bc': 3, 'clues': 18, 'topic': DAY_SUB['D3'], 'words': d3},
    }

# --------------------------------------------------------------- #
#  Emisión: clona el motor inglés y sustituye datos + textos       #
# --------------------------------------------------------------- #
def rep(s, old, new, tag, count=0):
    """Reemplazo que AVISA si el ancla no aparece (motor cambiado)."""
    if old not in s:
        PATCH_MISS.append(tag)
        return s
    return s.replace(old, new) if count == 0 else s.replace(old, new, count)

def set_const(s, name, value, tag):
    # Ojo: los motores declaran indistintamente `const DATA = …` y
    # `const LEVELS={…}` (sin espacios), así que el ancla es una regex.
    pat = re.compile(r'^\s*const\s+' + re.escape(name) + r'\s*=')
    lines = s.split('\n')
    for i, l in enumerate(lines):
        if pat.match(l):
            lines[i] = 'const %s = %s;' % (name, json.dumps(value, ensure_ascii=False))
            return '\n'.join(lines)
    PATCH_MISS.append(tag)
    return s

def head(s, title, h1, sub, footer):
    s = re.sub(r'<title>.*?</title>', '<title>' + title + '</title>', s, count=1, flags=re.S)
    s = re.sub(r'<h1>.*?</h1>', '<h1>' + h1 + '</h1>', s, count=1, flags=re.S)
    # El <p> que sigue al <h1> y el <footer> todavía hablaban de la unidad
    # inglesa ("Mind Over Matter · The Wellbeing Generation … Grade 9").
    s2 = re.sub(r'(<h1>.*?</h1>\s*\n\s*)<p>.*?</p>',
                lambda m: m.group(1) + '<p>' + sub + '</p>', s, count=1, flags=re.S)
    if s2 == s: PATCH_MISS.append('sub')
    s = re.sub(r'<footer>.*?</footer>', '<footer>' + footer + '</footer>', s2,
               count=1, flags=re.S)
    return s

FOLD = ".normalize('NFD').replace(/[\\u0300-\\u036f]/g,'')"

def patch_tts(s, recognition=False):
    """Voz y reconocimiento en francés.
    Ojo: los dos motores escriben la regex distinto (`/^en[-_]US/i` en
    Voice Battle, `/^en-US/i` en Say It Right). Si se escapa una, el juego
    lee el francés con voz inglesa."""
    s = s.replace("/^en[-_]US/i", "/^fr[-_]FR/i").replace("/^en-US/i", "/^fr-FR/i")
    s = s.replace("/^en/i", "/^fr/i")
    s = s.replace("u.lang = 'en-US'", "u.lang = 'fr-FR'")
    s = s.replace("u.lang='en-US'", "u.lang='fr-FR'")
    if recognition:
        s = s.replace("rec.lang = 'en-US'", "rec.lang = 'fr-FR'")
    return s

# Si el equipo no tiene NINGUNA voz francesa instalada (pasa en Windows por
# defecto), el navegador lee el francés con la voz que tenga — española o
# inglesa. Mejor avisarlo que enseñar una pronunciación falsa en silencio.
NO_FR_VOICE_JS = """
/* Aviso: sin voz francesa instalada, la pronunciación no es de fiar. */
var _frWarned = false;
function _frVoiceCheck(){
  try{
    if(_frWarned) return;                       /* si no, sale duplicado */
    if(!window.speechSynthesis) return;
    var vs = window.speechSynthesis.getVoices() || [];
    if(!vs.length) return;                      /* aún no han cargado */
    if(vs.some(function(v){ return /^fr/i.test(v.lang); })) return;
    var w = document.getElementById('%s');
    if(!w) return;
    _frWarned = true;
    %s
  }catch(e){}
}
if(window.speechSynthesis){
  _frVoiceCheck();
  try{ window.speechSynthesis.addEventListener('voiceschanged', _frVoiceCheck); }
  catch(e){ }
  setTimeout(_frVoiceCheck, 1500);              /* Chrome las carga tarde */
}
"""

def add_voice_warning(s, el, body):
    js = NO_FR_VOICE_JS % (el, body)
    i = s.rfind('</script>')
    if i < 0:
        PATCH_MISS.append('voicewarn:' + el)
        return s
    return s[:i] + js + s[i:]

def out(name, s):
    open(os.path.join(REPO, name), 'w', encoding='utf-8').write(s)

def tpl(name):
    return open(os.path.join(REPO, name), encoding='utf-8').read()

TPL = {k: tpl(k + '-u4w1.html') for k in
       ('crossword', 'wordsearch', 'word-sudoku', 'word-invaders',
        'voice-battle', 'say-it-right')}

# --------------------------------------------------------------- #
#  Bucle principal                                                 #
# --------------------------------------------------------------- #
built, problems = [], []

for g in GRADES:
    GL = GRADE_LABEL[g]                      # 5e, 6e, ...
    for wi, wk in enumerate(WEEKS[g], 1):
        theme, words = wk['theme'], wk['words']
        D = days(words)
        stem = '-fr-%s-u4w%d.html' % (g, wi)
        tag = 'FR · %s · Semaine %d' % (GL, wi)
        base_t = '%s — %s' % (tag, theme)
        sig = 'Français NIS · %s' % GL
        foot = ('Unité 4 · %s · Semaine %d · %s · Jour 1 · Jour 2 · Jour 3'
                % (GL, wi, theme))

        # ---------- 1. Mots croisés ----------
        data = {}
        for d in ('D1', 'D2', 'D3'):
            cw = make_crossword(D[d])
            if not cw or len(cw['words']) < 3:
                problems.append(('crossword', g, wi, d, 'trop peu de mots placés'))
                cw = cw or {'width': 1, 'height': 1, 'words': []}
            cw['label'] = DAY_LABEL[d]; cw['sub'] = DAY_SUB[d]
            data[d] = cw
        s = TPL['crossword']
        s = set_const(s, 'DATA', data, 'cw:DATA')
        s = head(s, 'Mots croisés — ' + base_t, '🧠 %s — Mots croisés' % base_t,
                 "Choisis un jour, lis la définition et écris le mot. " + sig, foot)
        s = rep(s, "title:'Crossword — U4 Week 1'",
                   "title:'Mots croisés — FR %s Semaine %d'" % (GL, wi), 'cw:title')
        out('crossword' + stem, s); built.append('crossword' + stem)

        # ---------- 2. Mots mêlés ----------
        data = {}
        for d in ('D1', 'D2', 'D3'):
            ws = make_wordsearch(D[d], d)
            if not ws: problems.append(('wordsearch', g, wi, d, 'sin palabras'))
            ws = ws or {'size': 12, 'grid': ['A' * 12] * 12, 'words': [], 'note': ''}
            ws['label'] = DAY_LABEL[d]; ws['sub'] = DAY_SUB[d]
            data[d] = ws
        s = TPL['wordsearch']
        s = set_const(s, 'DATA', data, 'ws:DATA')
        s = head(s, 'Mots mêlés — ' + base_t, '🔍 %s — Mots mêlés' % base_t,
                 "Glisse sur les lettres pour trouver chaque mot. " + sig, foot)
        s = rep(s, "title:'Word Search — U4 Week 1'",
                   "title:'Mots mêlés — FR %s Semaine %d'" % (GL, wi), 'ws:title')
        out('wordsearch' + stem, s); built.append('wordsearch' + stem)

        # ---------- 3. Word Sudoku ----------
        lv = make_sudoku(words, theme)
        for d, cfg in lv.items():
            if not cfg['words']:
                problems.append(('sudoku', g, wi, d, 'sin palabras válidas'))
            for W in cfg['words']:
                if len(W) != cfg['n'] or not distinct(W):
                    problems.append(('sudoku', g, wi, d, 'palabra inválida ' + W))
        s = TPL['word-sudoku']
        s = set_const(s, 'LEVELS', lv, 'sud:LEVELS')
        s = head(s, 'Word Sudoku — ' + base_t, '🔢 %s — Word Sudoku' % base_t,
                 "Comme le Sudoku, mais avec des <b>lettres</b> : chaque ligne, chaque "
                 "colonne et chaque bloc utilise une seule fois chaque lettre du mot. " + sig, foot)
        s = rep(s, "title:'Word Sudoku — '+word",
                   "title:'Word Sudoku FR %s S%d — '+word" % (GL, wi), 'sud:title')
        out('word-sudoku' + stem, s); built.append('word-sudoku' + stem)

        # ---------- 4. Word Invaders ----------
        data = {d: {'label': DAY_LABEL[d], 'sub': DAY_SUB[d],
                    'words': [{'w': w, 'c': clue(w)} for w in D[d]]}
                for d in ('D1', 'D2', 'D3')}
        s = TPL['word-invaders']
        s = set_const(s, 'DATA', data, 'inv:DATA')
        s = set_const(s, 'WEEK', wi, 'inv:WEEK')
        s = head(s, 'Word Invaders — ' + base_t, '👾 %s — Word Invaders' % base_t,
                 "Tape les mots avant qu'ils n'atterrissent. " + sig, foot)
        # Acentos: plegar en norm() y comparar la palabra que cae ya plegada,
        # si no «équitation» sería imposible de teclear (y en iPad, un castigo).
        s = rep(s, "const norm = s => String(s||'').toLowerCase().replace(/[^a-z]/g,'');",
                   "const norm = s => String(s||'').toLowerCase()" + FOLD + ".replace(/[^a-z]/g,'');",
                   'inv:norm')
        s = rep(s, "const o = live.find(x => x.w === v);",
                   "const o = live.find(x => norm(x.w) === v);", 'inv:find')
        s = rep(s, "o.el.classList.toggle('near', !!v && o.w.startsWith(v));",
                   "o.el.classList.toggle('near', !!v && norm(o.w).startsWith(v));", 'inv:near')
        s = rep(s, "title:'Word Invaders — U4 Week ' + WEEK",
                   "title:'Word Invaders — FR %s Semaine %d'" % (GL, wi), 'inv:title')
        s = s.replace('Type the word — BOOM 💣', 'Tape le mot — BOUM 💣')
        out('word-invaders' + stem, s); built.append('word-invaders' + stem)

        # ---------- 5. Voice Battle (dictée) ----------
        data = {d: {'label': DAY_LABEL[d], 'sub': DAY_SUB[d],
                    'words': [{'word': w, 'clue': clue(w)} for w in D[d]]}
                for d in ('D1', 'D2', 'D3')}
        s = TPL['voice-battle']
        s = set_const(s, 'DATA', data, 'vb:DATA')
        s = set_const(s, 'WEEK', wi, 'vb:WEEK')
        s = head(s, 'Voice Battle — ' + base_t, '🎧 %s — Voice Battle' % base_t,
                 "Écoute le mot et écris ce que tu entends. " + sig, foot)
        s = patch_tts(s)
        # No hay mp3 franceses (ElevenLabs sin créditos): ir directo a la voz
        # del navegador en vez de sondear un 404 en cada palabra.
        s = rep(s, "let ttsOnly = false,", "let ttsOnly = true,", 'vb:ttsOnly')
        s = rep(s, "function norm(s){ return (s||'').toLowerCase().replace(/[^a-z]/g,''); }",
                   "function norm(s){ return (s||'').toLowerCase()" + FOLD + ".replace(/[^a-z]/g,''); }",
                   'vb:norm')
        s = rep(s, "title:'Voice Battle — U4 Week 1'",
                   "title:'Voice Battle — FR %s Semaine %d'" % (GL, wi), 'vb:title')
        s = s.replace('Type what you hear…', 'Écris ce que tu entends…')
        s = rep(s, "note('🗣️ Voz del navegador (no hay audio grabado para esta semana).');",
                   "note('🗣️ Voix du navigateur (pas d\\u2019audio enregistré pour cette semaine).');",
                   'vb:note')
        s = add_voice_warning(s, 'audionote',
            "w.textContent = '\\u26a0\\ufe0f Cet appareil n\\u2019a aucune voix française installée : "
            "le mot sera lu avec une autre langue. Demande à ton professeur.';")
        out('voice-battle' + stem, s); built.append('voice-battle' + stem)

        # ---------- 6. Say It Right (prononciation) ----------
        s = TPL['say-it-right']
        s = set_const(s, 'DATA', data, 'sir:DATA')
        s = set_const(s, 'WEEK', wi, 'sir:WEEK')
        s = head(s, 'Say It Right — ' + base_t, '🗣️ %s — Say It Right' % base_t,
                 "Écoute, répète à voix haute et vois si tu t'en approches. " + sig, foot)
        s = patch_tts(s, recognition=True)
        s = rep(s, "function norm(s){ return String(s).toLowerCase().replace(/[^a-z0-9' ]/g,' ').replace(/\\s+/g,' ').trim(); }",
                   "function norm(s){ return String(s).toLowerCase()" + FOLD + ".replace(/[^a-z0-9' ]/g,' ').replace(/\\s+/g,' ').trim(); }",
                   'sir:norm')
        s = rep(s, "title:'Say It Right — U4 Week ' + WEEK",
                   "title:'Say It Right — FR %s Semaine %d'" % (GL, wi), 'sir:title')
        # El motor inglés trae 8 palabras por día y dice "Beat 6 of the 8".
        # En francés cambian por día (6 en Jour 1, todas en Jour 3), así que
        # ningún número fijo vale: se enuncia la regla (PASS = 0.7).
        s = rep(s, 'Beat 6 of the 8 words to defeat the Robo-Noob.',
                   'Réussis 70 % des mots du jour pour battre le Robo-Noob.',
                   'sir:beat')
        # Aquí importa el doble: el juego PUNTÚA la pronunciación, y sin voz
        # francesa el modelo que oye el alumno es de otro idioma.
        s = add_voice_warning(s, 'warn',
            "w.className = 'warn show';"
            "w.innerHTML += (w.innerHTML ? '<br>' : '') + "
            "'\\ud83d\\udd0a Cet appareil n\\u2019a aucune voix française installée : "
            "le mod\\u00e8le que tu entends ne sera pas fiable.';")
        out('say-it-right' + stem, s); built.append('say-it-right' + stem)

# --------------------------------------------------------------- #
#  activities-fr-data.js — las tarjetas del portal, de la MISMA     #
#  fuente que los juegos, para que no puedan desincronizarse.       #
# --------------------------------------------------------------- #
GAMES_META = [
 ('crossword',    '🧠', 'Mots croisés',
  "Le vocabulaire de la semaine. Lis la définition en français et écris le mot. Vies, chrono et résultat."),
 ('wordsearch',   '🔍', 'Mots mêlés',
  "Trouve les mots dans la grille. La difficulté monte chaque jour : → et ↓, puis les diagonales, puis les 8 directions."),
 ('word-sudoku',  '🔢', 'Word Sudoku',
  "Échauffement : remplis chaque ligne, chaque colonne et chaque bloc avec les lettres d'un mot."),
 ('word-invaders','👾', 'Word Invaders',
  "Arcade : les mots tombent du ciel, tape-les avant qu'ils n'atterrissent. Les accents ne sont pas obligatoires."),
 ('voice-battle', '🎧', 'Voice Battle',
  "Dictée : écoute le mot et écris-le. Rejouer, ralentir, et cinq coeurs."),
 ('say-it-right', '🗣️', 'Say It Right',
  "Prononciation : écoute, répète au micro et reçois un % de réussite. Le micro demande Chrome."),
]
DAYS_JS = ['Jour 1', 'Jour 2', 'Jour 3']

units_js = []
for g in GRADES:
    GL = GRADE_LABEL[g]
    weeks_js = []
    for wi, wk in enumerate(WEEKS[g], 1):
        games = [{
            'href': '%s-fr-%s-u4w%d.html' % (eng, g, wi),
            'icon': ico, 'title': '%s — Semaine %d' % (name, wi),
            'desc': desc, 'tags': DAYS_JS,
        } for (eng, ico, name, desc) in GAMES_META]
        weeks_js.append({
            'id': 'w%d' % wi,
            'title': 'Semaine %d — %s' % (wi, wk['theme']),
            # Nacen abiertas la 1 y la 2; el resto las suelta el profesor
            # desde 🔐 Accesos conforme avanza la unidad.
            'locked': wi > 2,
            'games': games,
        })
    units_js.append({
        'id': 'u4', 'grade': g, 'subject': 'french', 'icon': '🇫🇷',
        'title': 'Unité 4 — ' + GRADE_TITLE[g],
        'blurb': '6 semaines × 6 jeux : mots croisés, mots mêlés, word sudoku, word invaders, voice battle et say it right.',
        'lead': 'Français · %s · %s. Chaque jeu a trois onglets — Jour 1 · Jour 2 · Jour 3 — qui suivent les trois séances de la semaine.'
                % (GL, GRADE_LEVEL[g]),
        'locked': True,          # toda unidad nueva nace cerrada
        'weeks': weeks_js,
    })

js = """/* Unité 4 de FRANCÉS — GENERADO por gen_fr_u4.py. NO editar a mano:
   cualquier cambio se pierde al regenerar. La fuente es fr_u4_vocab.py.

   Se carga DESPUÉS de activities-data.js y añade sus unidades a la misma
   lista, marcadas con subject:'french' para que forGrade('g7','french')
   las separe de las de inglés. */
(function(){
  var D = window.ACTIVITIES_DATA;
  if(!D || !Array.isArray(D.units)) return;   // sin la base, no hay nada que añadir
  var FR = %s;
  FR.forEach(function(u){ D.units.push(u); });
})();
""" % json.dumps(units_js, ensure_ascii=False, indent=2)
out('activities-fr-data.js', js)

# --------------------------------------------------------------- #
#  Informe                                                         #
# --------------------------------------------------------------- #
print('ARCHIVOS GENERADOS:', len(built), '+ activities-fr-data.js')
print('SEMANAS:', sum(len(WEEKS[g]) for g in GRADES), '· GRADOS:', len(GRADES))
if PATCH_MISS:
    from collections import Counter
    print('ANCLAS NO ENCONTRADAS (el motor inglés cambió):')
    for k, n in sorted(Counter(PATCH_MISS).items()):
        print('   ', k, 'x', n)
else:
    print('PARCHES: todos aplicados')
print('PROBLEMAS:', problems if problems else 'NINGUNO')
print('DEFINICIONES FALTANTES:', sorted(MISSING_DEF) if MISSING_DEF else 'NINGUNA')
