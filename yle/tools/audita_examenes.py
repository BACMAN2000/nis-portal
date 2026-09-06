# -*- coding: utf-8 -*-
"""Repasa los diez examenes de un nivel YLE buscando la clase de fallos que no
se ven leyendo el JSON pero rompen la pregunta en pantalla:

  - dibujos que faltan (salen como el marco vacio) o que se repiten dentro del
    mismo grupo de opciones, con lo que el nino no puede distinguirlos;
  - la misma opcion escrita dos veces (ojo: en Starters P3 repetir el dibujo es
    a proposito, son las cantidades para contar);
  - claves que el audio contradice, fuera de rango o que no estan entre las
    opciones; ordenes de colorear sin color; letras del deletreo que no forman
    la palabra o que vienen sin revolver;
  - numero de preguntas por parte contra yle/specs.json.

    python yle/tools/audita_examenes.py [starters|movers|flyers]

Lo que salga en MEDIO hay que mirarlo a mano: el audio dice los numeros con
palabras y a veces se corrige a si mismo («no a las diez y cuarto... y media»),
asi que no todo aviso es un fallo.
"""
import io, json, re, sys, os

BASE = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))  # la raiz del repo
LV = (sys.argv[1] if len(sys.argv) > 1 else 'starters')

js = io.open(os.path.join(BASE, 'yle', 'fluent3d.js'), encoding='utf-8').read()
ICONS = json.loads(re.search(r'var ICONS = (\{.*?\});', js, re.S).group(1))
for nombre in ('SUPP_YLE', 'SUPP_2'):
    m = re.search(r'var %s = (\{.*?\});' % nombre, js, re.S)
    if m:
        for k, v in json.loads(m.group(1)).items(): ICONS.setdefault(k, v)
VACIAS = set('a an the of at in on to with and for my his her its their some is are'.split())

def singular(k):
    if re.search(r'ies$', k): return k[:-3] + 'y'
    if re.search(r'(ches|shes|sses|xes|zes)$', k): return k[:-2]
    if re.search(r'[^aeiou]oes$', k): return k[:-2]
    if re.search(r's$', k) and not re.search(r'ss$', k): return k[:-1]

def norm(w):
    return re.sub(r'^(a|an|the) ', '', str(w).lower()).replace('.', '').replace(',', '').replace(';', '').strip()

def dibujo(w):
    """devuelve (emoji, 'exacto'|'singular'|'por palabra'|None)"""
    k = norm(w)
    if ICONS.get(k) or ICONS.get(re.sub(r'\s+', '', k)): return (ICONS.get(k) or ICONS.get(re.sub(r'\s+', '', k))), 'exacto'
    s = singular(k)
    if s and ICONS.get(s): return ICONS[s], 'singular'
    for p in re.split(r"[^a-z0-9'-]+", k):
        if p and p not in VACIAS:
            e = ICONS.get(p) or (ICONS.get(singular(p)) if singular(p) else None)
            if e: return e, 'por palabra'
    return None, None

def par(x):
    if isinstance(x, str): return x, None, 1
    return x.get('word', ''), x.get('emoji'), x.get('n', 1)

def guion(P, d, pk):
    """el texto que se oye en esa parte, en minusculas"""
    a = P.get('audio') or (d.get('audio') or {}).get(pk) or []
    out = []
    for ev in a:
        if isinstance(ev, list) and len(ev) >= 2 and isinstance(ev[-1], str): out.append(ev[-1])
    return ' '.join(out).lower()

B = chr(92) + 'b'   # limite de palabra para los regex
GRAVE, MEDIO, LEVE = [], [], []
def apunta(nivel, t, donde, msg): nivel.append('T%-2d %-16s %s' % (t, donde, msg))

for n in range(1, 11):
    ruta = os.path.join(BASE, 'yle', LV, 'test-%02d.json' % n)
    if not os.path.exists(ruta): continue
    d = json.load(io.open(ruta, encoding='utf-8'))

    # ---------- dibujos: grupos de opciones ----------
    for paper in ('listening', 'rw', 'speaking'):
        for pk, P in (d.get(paper) or {}).items():
            if not isinstance(P, dict): continue
            grupos = []
            if P.get('type') == 'match_letters' and P.get('pictures'):
                grupos.append(('%s.%s tablero' % (paper, pk), [par(x) for x in P['pictures']]))
            for si, st in enumerate(P.get('sets') or []):
                grupos.append(('%s.%s set %d' % (paper, pk, si), [par(p) for p in st.get('pics', [])]))
            for i, it in enumerate(P.get('items') or []):
                if isinstance(it, dict) and it.get('pics'):
                    grupos.append(('%s.%s q%d' % (paper, pk, i + 1), [par(p) for p in it['pics']]))
            for x in (P.get('words') or []):
                if isinstance(x, dict) and x.get('word'):
                    e, via = dibujo(x['word'])
                    if not (x.get('emoji') or e): apunta(GRAVE, n, '%s.%s' % (paper, pk), 'sin dibujo: %s' % x['word'])
                    elif not x.get('emoji') and via == 'por palabra': apunta(LEVE, n, '%s.%s' % (paper, pk), 'dibujo aproximado (%s) para «%s»' % (e, x['word']))
            for donde, tri in grupos:
                vw, ve = {}, {}
                for w, emo, cant in tri:
                    e, via = (emo, 'del json') if emo else dibujo(w)
                    if not e: apunta(GRAVE, n, donde, 'sin dibujo: «%s»' % w)
                    elif via == 'por palabra': apunta(LEVE, n, donde, 'dibujo aproximado (%s) para «%s»' % (e, w))
                    if w in vw and vw[w] == cant: apunta(GRAVE, n, donde, 'la opcion «%s» sale dos veces igual' % w)
                    if e and e in ve and ve[e] != w: apunta(MEDIO, n, donde, '«%s» y «%s» comparten dibujo %s' % (ve[e], w, e))
                    vw[w] = cant; ve[e] = w

    # ---------- listening ----------
    L = d.get('listening') or {}
    for pk, P in L.items():
        tipo, g = P.get('type'), guion(P, d, pk)
        donde = 'listening.%s' % pk
        if not g: apunta(MEDIO, n, donde, 'sin guion de audio')
        if tipo == 'draw_lines':
            ids = [x['id'] for x in P.get('people', [])]
            if len(ids) != len(set(ids)): apunta(GRAVE, n, donde, 'dos personas con la misma letra')
            usados = [P['example']['person']] + [it['person'] for it in P['items']]
            if len(usados) != len(set(usados)): apunta(GRAVE, n, donde, 'la misma persona es la respuesta de dos nombres')
            for x in usados:
                if x not in ids: apunta(GRAVE, n, donde, 'la clave apunta a una persona que no existe: %s' % x)
            # desde que la fila es la persona y se elige el nombre, lo que tiene que
            # sobrar es un nombre; si no, la ultima pregunta sale por descarte
            nombres = P.get('names') or []
            usados = [P['example']['name']] + [it['name'] for it in P['items']]
            sobran = [x for x in nombres if x not in usados]
            if len(sobran) != 1:
                apunta(MEDIO, n, donde, '%d nombres para %d preguntas + ejemplo: deberia sobrar exactamente uno (sobran %s)' % (len(nombres), len(P['items']), sobran or 'ninguno'))
            elif g and re.search(r'(?i)' + B + re.escape(sobran[0]) + B, g):
                apunta(GRAVE, n, donde, 'el nombre que sobra («%s») se oye en el audio de esta parte' % sobran[0])
            descs = [x['desc'] for x in P.get('people', [])]
            if len(descs) != len(set(descs)): apunta(GRAVE, n, donde, 'dos personas descritas igual')
            for it in P['items']:
                if g and it['name'].lower() not in g: apunta(GRAVE, n, donde, 'el audio no nombra a «%s»' % it['name'])
        elif tipo in ('note_taking', 'note_taking_names_numbers'):
            for i, it in enumerate(P['items']):
                if not str(it.get('a', '')).strip(): apunta(GRAVE, n, donde, 'q%d sin respuesta' % (i + 1))
                elif g:
                    variantes = it['a'] if isinstance(it['a'], list) else [it['a']]
                    a = str(variantes[0]).lower()
                    letras = ' '.join(a.upper()) .lower()
                    UNI = {'0':'zero','1':'one','2':'two','3':'three','4':'four','5':'five','6':'six','7':'seven','8':'eight','9':'nine','10':'ten',
                           '11':'eleven','12':'twelve','13':'thirteen','14':'fourteen','15':'fifteen','16':'sixteen','17':'seventeen',
                           '18':'eighteen','19':'nineteen','20':'twenty'}
                    DEC = {'2':'twenty','3':'thirty','4':'forty','5':'fifty','6':'sixty','7':'seventy','8':'eighty','9':'ninety'}
                    num = UNI.get(a)
                    if num is None and re.fullmatch(r'[2-9][0-9]', a or ''):
                        num = DEC[a[0]] + ('' if a[1] == '0' else '-' + UNI[a[1]])
                    if num is None and re.fullmatch(r'([0-9]|1[0-2])[.:][0-5][0-9]', a or ''):
                        h, mi = re.split(r'[.:]', a)
                        num = UNI.get(str(int(h)), '') + ' ' + ('thirty' if mi == '30' else UNI.get(str(int(mi)), mi))
                    if (not any(str(v).lower() in g for v in variantes)) and letras not in g and not (num and num in g):
                        apunta(MEDIO, n, donde, 'q%d: el audio no dice ninguna forma de la respuesta %s' % (i + 1, variantes))
        elif tipo == 'mc_pictures':
            claves = [it.get('key') for it in P['items']]
            if len(set(claves)) == 1: apunta(MEDIO, n, donde, 'las %d respuestas son la misma letra (%s)' % (len(claves), claves[0]))
            for i, it in enumerate(P['items']):
                ops, key = it.get('options') or [], it.get('key')
                if key not in ('A', 'B', 'C'): apunta(GRAVE, n, donde, 'q%d con clave rara: %r' % (i + 1, key))
                if len(ops) != 3: apunta(GRAVE, n, donde, 'q%d tiene %d opciones' % (i + 1, len(ops)))
                if len(set(map(norm, ops))) != len(ops): apunta(GRAVE, n, donde, 'q%d repite una opcion: %s' % (i + 1, ops))
                pics = [par(p)[0] for p in (it.get('pics') or [])]
                if pics and len(pics) != len(ops): apunta(MEDIO, n, donde, 'q%d: %d dibujos para %d opciones' % (i + 1, len(pics), len(ops)))
                if key in ('A', 'B', 'C') and ops:
                    buena = norm(ops['ABC'.index(key)])
                    if g and buena and len(buena.split()) == 1 and buena not in g:
                        apunta(MEDIO, n, donde, 'q%d: el audio no dice la respuesta «%s»' % (i + 1, ops['ABC'.index(key)]))
                    cants = [par(p)[2] for p in (it.get('pics') or [])]
                    contar = any(c > 1 for c in cants)
                    NUM = {'one':1,'two':2,'three':3,'four':4,'five':5,'six':6,'seven':7,'eight':8,'nine':9,'ten':10,
                           'eleven':11,'twelve':12,'thirteen':13,'fourteen':14,'fifteen':15,'sixteen':16,'seventeen':17,
                           'eighteen':18,'nineteen':19,'twenty':20}
                    if contar:
                        # cada opcion dice un numero: tiene que ser el numero de dibujos de esa caja
                        for j, o in enumerate(ops):
                            num = NUM.get(norm(o).split()[-1]) if norm(o) else None
                            if num is None: apunta(MEDIO, n, donde, 'q%d: la opcion «%s» no es un numero y las demas cuentan' % (i + 1, o))
                            elif j < len(cants) and num != cants[j]:
                                apunta(GRAVE, n, donde, 'q%d opcion %s dice «%s» pero hay %d dibujos' % (i + 1, 'ABC'[j], o, cants[j]))
                        if len(set(cants)) != len(cants): apunta(GRAVE, n, donde, 'q%d: dos opciones con la misma cantidad %s' % (i + 1, cants))
                        base = {par(p)[0] for p in (it.get('pics') or [])}
                        if len(base) != 1: apunta(MEDIO, n, donde, 'q%d: se cuentan cosas distintas %s' % (i + 1, sorted(base)))
                    elif pics and len(pics) == len(ops):
                        pk2 = norm(pics['ABC'.index(key)])
                        if pk2 and buena and pk2 not in buena and buena not in pk2:
                            apunta(MEDIO, n, donde, 'q%d: la opcion buena dice «%s» y su dibujo es «%s»' % (i + 1, ops['ABC'.index(key)], pics['ABC'.index(key)]))
        elif tipo in ('colour', 'colour_write'):
            vistos = {}
            todo = [P['example']] + P['items']
            for i, it in enumerate(todo):
                clave = (str(it.get('what') or P.get('object') or '') + '|' + str(it.get('where') or '')).lower()
                if clave in vistos: apunta(GRAVE, n, donde, 'dos ordenes sobre lo mismo: %s' % clave)
                vistos[clave] = 1
                if not it.get('colour') and not it.get('write'): apunta(GRAVE, n, donde, 'orden %d sin color' % i)
                if g and it.get('colour') and it['colour'].lower() not in g:
                    apunta(MEDIO, n, donde, 'el audio no dice el color «%s»' % it['colour'])

    # ---------- reading & writing ----------
    R = d.get('rw') or {}
    for pk, P in R.items():
        tipo, donde = P.get('type'), 'rw.%s' % pk
        if tipo == 'tick_cross':
            for i, it in enumerate(P['items']):
                if not isinstance(it.get('key'), bool): apunta(GRAVE, n, donde, 'q%d sin clave verdadero/falso' % (i + 1))
                else:
                    # la frase tiene que nombrar el dibujo cuando la respuesta es si, y no nombrarlo cuando es no
                    w, fr = norm(it.get('word', '')), norm(it.get('sentence', ''))
                    if w and fr:
                        pal = lambda x: re.compile(B + re.escape(x) + B)
                        SINON = {'tv': 'television', 'television': 'tv', 'bike': 'bicycle', 'plane': 'aeroplane', 'mum': 'mother', 'dad': 'father'}
                        dice = (pal(w).search(fr) or (singular(w) and pal(singular(w)).search(fr))
                                or (SINON.get(w) and pal(SINON[w]).search(fr)))
                        if it['key'] and not dice: apunta(GRAVE, n, donde, 'q%d: la respuesta es SI pero la frase no nombra «%s»: «%s»' % (i + 1, it['word'], it['sentence']))
                        if not it['key'] and dice: apunta(GRAVE, n, donde, 'q%d: la respuesta es NO pero la frase nombra «%s»: «%s»' % (i + 1, it['word'], it['sentence']))
            if all(it.get('key') for it in P['items']) or not any(it.get('key') for it in P['items']):
                apunta(MEDIO, n, donde, 'todas las respuestas son iguales')
        elif tipo == 'yes_no':
            for i, it in enumerate(P['items']):
                if str(it.get('key', '')).lower() not in ('yes', 'no'): apunta(GRAVE, n, donde, 'q%d con clave rara: %r' % (i + 1, it.get('key')))
            claves = [str(it.get('key', '')).lower() for it in P['items']]
            if len(set(claves)) == 1: apunta(MEDIO, n, donde, 'todas las respuestas son «%s»' % claves[0])
        elif tipo == 'unscramble':
            for i, it in enumerate(P['items']):
                w = str(it.get('word', ''))
                mezcla = it.get('letters') or it.get('scrambled') or ''
                mez = ''.join(mezcla) if isinstance(mezcla, list) else str(mezcla)
                if not w: apunta(GRAVE, n, donde, 'q%d sin palabra' % (i + 1)); continue
                if mez and sorted(mez.lower().replace(' ', '')) != sorted(w.lower().replace(' ', '')):
                    apunta(GRAVE, n, donde, 'q%d: las letras «%s» no forman «%s»' % (i + 1, mez, w))
                if mez and mez.lower() == w.lower(): apunta(MEDIO, n, donde, 'q%d: las letras ya vienen ordenadas (%s)' % (i + 1, w))
                elif mez and sum(1 for a, b in zip(mez.lower(), w.lower()) if a == b) * 2 >= len(w):
                    apunta(LEVE, n, donde, 'q%d: «%s» apenas esta revuelta (%s)' % (i + 1, w, mez))
        elif tipo == 'mc_cloze_copy':
            ops, keys = P.get('words') or P.get('options') or [], P.get('key') or []
            ops_txt = [x if isinstance(x, str) else x.get('word', '') for x in ops]
            for i, k in enumerate(keys):
                if ops_txt and k not in ops_txt: apunta(GRAVE, n, donde, 'q%d: la respuesta «%s» no esta entre las palabras' % (i + 1, k))
            if len(set(keys)) != len(keys): apunta(MEDIO, n, donde, 'la misma palabra es respuesta dos veces')
        elif tipo == 'story_one_word':
            for x in P.get('parts') or []:
                for i, it in enumerate(x.get('items') or []):
                    if not str(it.get('a', '')).strip(): apunta(GRAVE, n, donde, 'una pregunta sin respuesta')
                    elif len(str(it['a']).split()) > 1: apunta(LEVE, n, donde, 'respuesta de mas de una palabra: «%s»' % it['a'])

    # ---------- numero de preguntas por parte ----------
    specs = json.load(io.open(os.path.join(BASE, 'yle', 'specs.json'), encoding='utf-8'))['levels'][LV]
    for paper in ('listening', 'rw'):
        for sp in specs[paper]['parts']:
            P = (d.get(paper) or {}).get('p%d' % sp['n'])
            if not P: apunta(GRAVE, n, '%s.p%d' % (paper, sp['n']), 'la parte no existe'); continue
            if P.get('type') not in (sp['type'], sp['type'].replace('_names_numbers', '')):
                apunta(LEVE, n, '%s.p%d' % (paper, sp['n']), 'tipo %s, el spec dice %s' % (P.get('type'), sp['type']))
            cuenta = (len(P.get('items') or [])
                      or sum(len(x.get('items') or []) for x in (P.get('parts') or []))
                      or len(P.get('complete') or [])
                      or len(P.get('key') or []))
            if P.get('type') == 'gapped_text_title' and P.get('title_key'): cuenta += 1
            if P.get('type') == 'story_writing': cuenta = 1
            if P.get('type') == 'open_cloze' and isinstance(P.get('key'), dict): cuenta = len(P['key'])
            if P.get('type') == 'productive_writing':
                cuenta = len(P.get('complete') or []) + len(P.get('answer') or []) + ((P.get('write') or {}).get('n') or 2)
            if cuenta != sp['items']: apunta(GRAVE, n, '%s.p%d' % (paper, sp['n']), '%d preguntas, el spec dice %d' % (cuenta, sp['items']))

print('=' * 70)
print('AUDITORIA DE %s — %d cosas' % (LV.upper(), len(GRAVE) + len(MEDIO) + len(LEVE)))
for titulo, lista in (('GRAVE (rompe la pregunta)', GRAVE), ('MEDIO (revisar)', MEDIO), ('LEVE', LEVE)):
    print('\n--- %s: %d' % (titulo, len(lista)))
    for x in lista: print('   ', x)
