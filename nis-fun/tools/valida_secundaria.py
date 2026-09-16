# -*- coding: utf-8 -*-
"""Valida las unidades de secundaria (b2f, c1a) contra el formato de examen.

Comprueba lo que el motor no perdona (campos que faltan, respuestas fuera de
las opciones) y lo que el examen no perdona (una lectura de 250 palabras
vendida como Part 5, un cloze con banco de palabras, una clave que siempre
cae en la B, un audio que no dice la respuesta).

    python tools/valida_secundaria.py content/c1a            (toda la carpeta)
    python tools/valida_secundaria.py content/c1a/unit-01.json

Sale con 1 si hay fallos GRAVES. Los avisos no bloquean.
"""
import io, json, os, re, sys, glob
from collections import Counter

GRAVE, AVISO = [], []
def grave(u, a, m): GRAVE.append(f'{u} {a}: {m}')
def aviso(u, a, m): AVISO.append(f'{u} {a}: {m}')

def words(t): return len(re.findall(r'\S+', re.sub(r'<[^>]+>', ' ', str(t or ''))))
def norm(s): return re.sub(r'[^a-z0-9 ]', '', str(s).lower()).strip()
LIMITES = {'b2f': {'reading': (500, 750), 'writing': (140, 190)},
           'c1a': {'reading': (650, 900), 'writing': (220, 260)}}

def sesgo(u, a, idx, n_opts):
    """La respuesta correcta no puede caer casi siempre en la misma letra."""
    if len(idx) < 5: return
    c = Counter(idx).most_common(1)[0]
    if c[1] / len(idx) > 0.5:
        aviso(u, a, f'la clave cae en la opción {c[0]} en {c[1]}/{len(idx)} preguntas')

def revisa(u, act, nivel):
    t = act.get('type'); code = act.get('code', '?'); tag = f'{code}/{t}'
    d = act.get('data') or {}
    if 'outputs' not in act: grave(u, tag, 'falta outputs')
    exam = t in ('reading', 'mc_cloze', 'word_formation', 'gapped_text', 'multiple_matching', 'listening', 'listening_mc', 'listening_match', 'key_transform', 'gap_text', 'writing')
    if exam and not act.get('tips'): aviso(u, tag, 'sin tips (What to expect / How to go about it)')
    lim = LIMITES.get(nivel, LIMITES['c1a'])

    if t == 'reading':
        n = words(d.get('text'))
        if not (lim['reading'][0] <= n <= lim['reading'][1] + 100): grave(u, tag, f'texto de {n} palabras (se esperan {lim["reading"][0]}–{lim["reading"][1]})')
        qs = d.get('questions') or []
        if len(qs) != 6: aviso(u, tag, f'{len(qs)} preguntas (Part 5 tiene 6)')
        for i, q in enumerate(qs):
            if len(q.get('options', [])) != 4: grave(u, tag, f'pregunta {i+1}: {len(q.get("options", []))} opciones (deben ser 4)')
            if not (0 <= q.get('answer', -1) < len(q.get('options', []))): grave(u, tag, f'pregunta {i+1}: answer fuera de rango')
            if len(set(map(norm, q.get('options', [])))) != len(q.get('options', [])): grave(u, tag, f'pregunta {i+1}: opciones repetidas')
        sesgo(u, tag, [q.get('answer') for q in qs], 4)
        if not d.get('script'): aviso(u, tag, 'sin script para la voz')

    elif t == 'mc_cloze':
        gaps = re.findall(r'\{(\d+)\}', d.get('text', '')); items = d.get('items') or []
        if len(gaps) != len(items): grave(u, tag, f'{len(gaps)} huecos y {len(items)} items')
        if len(items) != 8: aviso(u, tag, f'{len(items)} items (Part 1 tiene 8)')
        for i, it in enumerate(items):
            if len(it.get('options', [])) != 4: grave(u, tag, f'item {i+1}: {len(it.get("options", []))} opciones')
            if not (0 <= it.get('answer', -1) < 4): grave(u, tag, f'item {i+1}: answer fuera de rango')
        sesgo(u, tag, [it.get('answer') for it in items], 4)

    elif t == 'word_formation':
        gaps = re.findall(r'\{(\d+):([^}]+)\}', d.get('text', '')); ans = d.get('answers') or []
        if len(gaps) != len(ans): grave(u, tag, f'{len(gaps)} huecos y {len(ans)} respuestas')
        if len(ans) != 8: aviso(u, tag, f'{len(ans)} huecos (Part 3 tiene 8)')
        for (n, stem), a in zip(gaps, ans):
            a0 = a[0] if isinstance(a, list) else a
            if norm(a0) == norm(stem): grave(u, tag, f'hueco {n}: la respuesta es la misma palabra ({stem})')
            if ' ' in str(a0).strip(): grave(u, tag, f'hueco {n}: la respuesta tiene espacios')

    elif t == 'gapped_text':
        gaps = re.findall(r'\{(\d+)\}', d.get('text', '')); paras = d.get('paragraphs') or []; ans = d.get('answers') or []
        letras = [p.get('letter') for p in paras]
        if len(gaps) != len(ans): grave(u, tag, f'{len(gaps)} huecos y {len(ans)} respuestas')
        if len(paras) != len(ans) + 1: aviso(u, tag, f'{len(paras)} párrafos para {len(ans)} huecos (debe sobrar uno)')
        if len(set(ans)) != len(ans): grave(u, tag, 'una letra se usa dos veces')
        for a in ans:
            if a not in letras: grave(u, tag, f'respuesta {a} no es un párrafo')
        n = words(d.get('text')) + sum(words(p.get('text')) for p in paras)
        if n < lim['reading'][0]: grave(u, tag, f'texto + párrafos = {n} palabras (mínimo {lim["reading"][0]})')

    elif t == 'multiple_matching':
        secs = d.get('sections') or []; qs = d.get('questions') or []
        letras = [s.get('letter') for s in secs]
        if len(secs) < 4: grave(u, tag, f'{len(secs)} secciones (mínimo 4)')
        for i, q in enumerate(qs):
            if q.get('answer') not in letras: grave(u, tag, f'pregunta {i+1}: respuesta {q.get("answer")} no es una sección')
        n = sum(words(s.get('text')) for s in secs)
        if n < lim['reading'][0] - 100: grave(u, tag, f'secciones suman {n} palabras')
        c = Counter(q.get('answer') for q in qs)
        if qs and c.most_common(1)[0][1] > len(qs) / 2: aviso(u, tag, f'la sección {c.most_common(1)[0][0]} responde {c.most_common(1)[0][1]}/{len(qs)}')
        if len(qs) not in (4, 10): aviso(u, tag, f'{len(qs)} preguntas (P6 tiene 4, P8 tiene 10)')

    elif t == 'listening':
        if not act.get('audio'): grave(u, tag, 'sin audio')
        sc = norm(d.get('script', '')); qs = d.get('questions') or []
        if not sc: grave(u, tag, 'sin script')
        if words(d.get('script')) < 350: aviso(u, tag, f'guion de {words(d.get("script"))} palabras (Part 2 son ~3 min ≈ 400+)')
        if len(qs) != 8: aviso(u, tag, f'{len(qs)} huecos (Part 2 tiene 8)')
        for i, q in enumerate(qs):
            if '…' not in q.get('q', ''): grave(u, tag, f'hueco {i+1}: la frase no lleva …')
            if norm(q.get('answer', '')) not in sc: grave(u, tag, f'hueco {i+1}: el audio no dice «{q.get("answer")}»')
            if len(str(q.get('answer', '')).split()) > 3: grave(u, tag, f'hueco {i+1}: respuesta de más de 3 palabras')

    elif t == 'listening_mc':
        if not act.get('audio'): grave(u, tag, 'sin audio')
        if not d.get('script'): grave(u, tag, 'sin script')
        ex = d.get('extracts') or []; todas = [q for x in ex for q in x.get('questions', [])]
        for i, q in enumerate(todas):
            if len(q.get('options', [])) not in (3, 4): grave(u, tag, f'pregunta {i+1}: {len(q.get("options", []))} opciones')
            if not (0 <= q.get('answer', -1) < len(q.get('options', []))): grave(u, tag, f'pregunta {i+1}: answer fuera de rango')
        if not ((len(ex) == 3 and len(todas) == 6) or (len(ex) == 1 and len(todas) == 6)): aviso(u, tag, f'{len(ex)} extractos / {len(todas)} preguntas (P1: 3×2, P3: 1×6)')
        sesgo(u, tag, [q.get('answer') for q in todas], 4)
        hablantes = set(re.findall(r'^([A-Z][A-Za-z0-9 .\'-]{0,40}):', d.get('script', ''), re.M))
        if len(hablantes) < 2: aviso(u, tag, 'el guion tiene una sola voz')

    elif t == 'listening_match':
        if not act.get('audio'): grave(u, tag, 'sin audio')
        if not d.get('script'): grave(u, tag, 'sin script')
        spk = d.get('speakers') or ['1', '2', '3', '4', '5']
        for ti, tk in enumerate(d.get('tasks') or []):
            opts = tk.get('options') or []; ans = tk.get('answers') or []
            if len(opts) != 8: aviso(u, tag, f'tarea {ti+1}: {len(opts)} opciones (son 8)')
            if len(ans) != len(spk): grave(u, tag, f'tarea {ti+1}: {len(ans)} respuestas para {len(spk)} hablantes')
            if len(set(ans)) != len(ans): grave(u, tag, f'tarea {ti+1}: una letra se repite')
            for a in ans:
                if a not in 'ABCDEFGH'[:len(opts)]: grave(u, tag, f'tarea {ti+1}: respuesta {a} no existe')
        hablantes = set(re.findall(r'^([A-Z][A-Za-z0-9 .\'-]{0,40}):', d.get('script', ''), re.M))
        if len(hablantes) < len(spk): aviso(u, tag, f'el guion tiene {len(hablantes)} voces para {len(spk)} hablantes')

    elif t == 'key_transform':
        items = d.get('items') or []
        if len(items) != 6: aviso(u, tag, f'{len(items)} items (Part 4 tiene 6)')
        for i, it in enumerate(items):
            key = it.get('key', '').lower()
            for a in it.get('answers', []):
                n = len(a.split())
                if not (2 <= n <= 6): grave(u, tag, f'item {i+1}: «{a}» tiene {n} palabras (3–6 con la clave)')
                if key and key not in norm(a).split() and key not in norm(it.get('second_start', '')).split() and key not in norm(it.get('second_end', '')).split():
                    grave(u, tag, f'item {i+1}: la clave {key.upper()} no aparece en «{a}»')
                if key and key in norm(a).split() and re.search(rf'\b{key}\b', norm(it.get('second_start', '')) + ' ' + norm(it.get('second_end', ''))):
                    aviso(u, tag, f'item {i+1}: la clave aparece dentro y fuera del hueco')

    elif t == 'gap_text':
        gaps = re.findall(r'\{(\d+)\}', d.get('text', '')); ans = d.get('answers') or []
        if len(gaps) != len(ans): grave(u, tag, f'{len(gaps)} huecos y {len(ans)} respuestas')
        if nivel in ('b2f', 'c1a') and d.get('box'): grave(u, tag, 'open cloze con banco de palabras: en B2/C1 el hueco se escribe')
        if len(ans) != 8: aviso(u, tag, f'{len(ans)} huecos (Part 2 tiene 8)')
        for i, a in enumerate(ans):
            if ' ' in a.strip(): grave(u, tag, f'hueco {i+1}: «{a}» no es una palabra')
        c = Counter(map(norm, ans))
        if c and c.most_common(1)[0][1] > 1: aviso(u, tag, f'respuesta repetida: {c.most_common(1)[0][0]}')

    elif t == 'writing':
        for k in ('task', 'model', 'plan', 'useful_language', 'genre'):
            if not d.get(k): grave(u, tag, f'falta data.{k}')
        w = d.get('words') or lim['writing']
        m = words(re.sub(r'<p><i>.*?</i></p>', '', d.get('model', ''), count=1, flags=re.S))
        if not (w[0] - 10 <= m <= w[1] + 15): aviso(u, tag, f'el modelo tiene {m} palabras (tarea {w[0]}–{w[1]})')
        if d.get('genre') not in ('essay', 'proposal', 'report', 'review', 'letter', 'email', 'formal letter', 'informal email', 'formal email', 'article', 'story'): aviso(u, tag, f'genre raro: {d.get("genre")}')

    elif t == 'pairwork':
        parts = d.get('parts')
        if parts:
            for p in parts:
                need_pics = 2 if nivel == 'b2f' else 3
                if p.get('part') == 2 and len(p.get('pictures', [])) != need_pics: grave(u, tag, 'Part 2 sin %d fotos' % need_pics)
                if p.get('part') == 3 and len(p.get('spokes', [])) != 5: grave(u, tag, 'Part 3 sin cinco ideas')
                if p.get('part') in (1, 4) and len(p.get('prompts', [])) < 3: grave(u, tag, f'Part {p.get("part")} con menos de 3 preguntas')
        elif not d.get('text'): grave(u, tag, 'pairwork sin texto')

    elif t == 'grammar_box':
        for k in ('title', 'intro', 'examples', 'rules', 'practice'):
            if not d.get(k): grave(u, tag, f'falta data.{k}')
        its = (d.get('practice') or {}).get('items') or []
        for i, it in enumerate(its):
            if '___' not in it.get('sentence', ''): grave(u, tag, f'práctica {i+1}: la frase no tiene ___')
            if not (0 <= it.get('answer', -1) < len(it.get('options', []))): grave(u, tag, f'práctica {i+1}: answer fuera de rango')
        sesgo(u, tag, [it.get('answer') for it in its], 3)
        if not d.get('can'): aviso(u, tag, 'sin data.can (frase del repaso final)')

    elif t == 'match_words':
        pares = d.get('pairs') or []
        if len(pares) < 8: aviso(u, tag, f'{len(pares)} pares')
        if len(set(norm(p['left']) for p in pares)) != len(pares): grave(u, tag, 'palabra repetida')
    elif t == 'exam_task':
        for i, it in enumerate(d.get('items') or []):
            if not (0 <= it.get('answer', -1) < len(it.get('options', []))): grave(u, tag, f'item {i+1}: answer fuera de rango')
    else:
        aviso(u, tag, f'tipo {t} sin reglas de validación')

def unidad(path):
    u = os.path.basename(path)
    try:
        U = json.load(io.open(path, encoding='utf-8'))
    except Exception as e:
        grave(u, '-', f'JSON inválido: {e}'); return
    for k in ('id', 'level', 'number', 'title', 'topic', 'grammar', 'wordlist', 'exam_focus', 'scene', 'activities', 'scope'):
        if k not in U: grave(u, '-', f'falta {k}')
    nivel = U.get('level', 'c1a')
    codes = [a.get('code') for a in U.get('activities', [])]
    if len(set(codes)) != len(codes): grave(u, '-', 'códigos de actividad repetidos')
    if codes != sorted(codes): aviso(u, '-', 'las actividades no van en orden de letra')
    tipos = Counter(a.get('type') for a in U.get('activities', []))
    if nivel in ('c1a', 'b2f'):
        for need in ('writing', 'pairwork'):
            if not tipos.get(need): grave(u, '-', f'la unidad no tiene {need}')
        if not any(tipos.get(t) for t in ('reading', 'gapped_text', 'multiple_matching')): grave(u, '-', 'sin tarea de Reading')
        if not any(tipos.get(t) for t in ('listening', 'listening_mc', 'listening_match')): grave(u, '-', 'sin tarea de Listening')
        uoe = sum(tipos.get(t, 0) for t in ('mc_cloze', 'gap_text', 'word_formation', 'key_transform'))
        if uoe < 2: aviso(u, '-', f'solo {uoe} tarea(s) de Use of English')
    for a in U.get('activities', []):
        revisa(u, a, nivel)
        if a.get('audio') and not re.match(rf'^{nivel}/u\d\d-[a-z]\.mp3$', a['audio']): aviso(u, a.get('code'), f'nombre de audio fuera de convención: {a["audio"]}')

if __name__ == '__main__':
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
    arg = sys.argv[1] if len(sys.argv) > 1 else 'content/c1a'
    files = [arg] if arg.endswith('.json') else sorted(glob.glob(os.path.join(arg, 'unit-*.json')))
    for f in files: unidad(f)
    for m in GRAVE: print('GRAVE ', m)
    for m in AVISO: print('aviso ', m)
    print(f'{len(files)} unidades · {len(GRAVE)} graves · {len(AVISO)} avisos')
    sys.exit(1 if GRAVE else 0)
