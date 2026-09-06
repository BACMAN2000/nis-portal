# -*- coding: utf-8 -*-
"""Pasa los diez Flyers Practice Tests al esquema del motor unico.

Hasta ahora Flyers vivia aparte, en flyers-practice.html, con los tests dentro
del propio HTML y un motor que solo sabia pintar 'radio' y 'text': el alumno no
unia con lineas, no coloreaba y no escribia la historia, no habia cronometro ni
escudos, y nada llegaba a yle_attempts (el panel del profesor ofrecia «A2
Flyers» y siempre estaba vacio). Este script convierte ese contenido al formato
de yle/<level>/test-NN.json, que ya usan Starters y Movers.

El contenido sale del array TESTS del propio flyers-practice.html (que es el que
esta en vivo) y el guion del audio, de flyers_content.py, para que guion y mp3
sigan siendo el mismo texto.

    python yle/tools/migra_flyers.py            # escribe yle/flyers/*.json
    python yle/tools/migra_flyers.py --check    # solo valida, no escribe
"""
import os, re, sys, json, io

AQUI = os.path.dirname(os.path.abspath(__file__))
RAIZ = os.path.dirname(os.path.dirname(AQUI))
HTML = os.path.join(RAIZ, 'flyers-practice.html')
SALIDA = os.path.join(RAIZ, 'yle', 'flyers')
# el guion del audio y sus pausas viven en el generador original
FLY = r'C:\Projects\cohasset.pe\Flyers_Practice'

COLORES = ['black', 'blue', 'brown', 'green', 'grey', 'orange', 'pink', 'purple', 'red', 'yellow']

# la clave que le faltaba a Listening Parte 2, escrita a partir del guion del audio
try:
    KEY_L2 = json.load(io.open(os.path.join(SALIDA, '_listening-p2-key.json'), encoding='utf-8'))
except Exception:
    KEY_L2 = {}


def tests_del_html():
    h = io.open(HTML, encoding='utf-8', errors='replace').read()
    i = h.index('const TESTS'); j = h.index('[', i); d = 0
    for k in range(j, len(h)):
        if h[k] == '[': d += 1
        elif h[k] == ']':
            d -= 1
            if d == 0: break
    return json.loads(h[j:k + 1])


def guiones():
    """{numero: {p1: [[voz, texto] | ['pause', s], …]}} tal y como se monto el mp3."""
    if not os.path.isdir(FLY): return {}
    sys.path.insert(0, FLY)
    cwd = os.getcwd(); os.chdir(FLY)
    try:
        import gen_flyers_dialogue_audio as G
        out = {}
        for t in G.ALL:
            evs = {}
            for p in range(1, 6):
                e = G.eventos_test(t, p)
                # el generador de Flyers da ('say', voz, texto); el motor espera [voz, texto]
                if e: evs['p%d' % p] = [[x[1], x[2]] if len(x) == 3 and x[0] == 'say' else list(x) for x in e]
            out[t['number']] = evs
        return out
    except Exception as e:
        print('   (sin guion de audio: %s)' % e)
        return {}
    finally:
        os.chdir(cwd)


# ---------------------------------------------------------------- Listening
def L1(d, ans, script):
    """draw_lines. Las personas pasan a ser A, B, C… y la respuesta de cada
    nombre es la letra. El ejemplo no esta en las respuestas: se saca del guion,
    que es quien manda porque es lo que el alumno oye."""
    gente = [{'id': chr(65 + i), 'desc': p} for i, p in enumerate(d['people'])]
    porDesc = {g['desc']: g['id'] for g in gente}
    items = []
    for i, n in enumerate(d['names']):
        desc = ans.get('lis_p1_%d' % i)
        items.append({'name': n, 'person': porDesc.get(desc, '')})
    usadas = {it['person'] for it in items}
    libres = [g for g in gente if g['id'] not in usadas]
    # de las que sobran, la del ejemplo es la que menciona la primera parte del guion
    ej, cabeza = libres[0]['id'] if libres else 'A', (script or '').split('Now you listen')[0].lower()
    mejor = -1
    for g in libres:
        clave = [w for w in re.findall(r"[a-z]+", g['desc'].lower()) if len(w) > 3]
        n = sum(1 for w in clave if w in cabeza)
        if n > mejor: mejor, ej = n, g['id']
    return {'type': 'draw_lines', 'image': 'L1', 'scene': d['scene'],
            'names': [d['example_name']] + list(d['names']),
            'people': gente, 'example': {'name': d['example_name'], 'person': ej}, 'items': items}


def L2(d, ans, script, extra=None):
    """note_taking. El contenido original casi no traia clave para esta parte (12 de
    50 respuestas en los diez tests), asi que la app vieja no la corregia. Las
    respuestas buenas estan en yle/flyers/_listening-p2-key.json, sacadas del guion
    del audio; lo que hubiera en 'answers' solo se usa si ahi no hay nada."""
    items = [{'q': lab, 'a': (extra[i] if extra and i < len(extra) else ans.get('lis_p2_%d' % i, ''))}
             for i, lab in enumerate(d['labels'])]
    return {'type': 'note_taking', 'heading': d.get('heading', ''),
            'example': {'q': d.get('example_label', ''), 'a': d.get('example', '')}, 'items': items}


def L3(d, ans, script):
    pics = [{'letter': o[0], 'word': o[1]} for o in d['options']]
    items = [{'who': w, 'letter': ans.get('lis_p3_%d' % i, '')} for i, w in enumerate(d['items'])]
    return {'type': 'match_letters', 'intro': d.get('instruction', ''), 'image': 'L3', 'pictures': pics,
            'example': {'who': d.get('example_item', ''), 'letter': d.get('example_letter', '')}, 'items': items}


def L4(d, ans, script):
    items = []
    for i, it in enumerate(d['items']):
        items.append({'q': it['q'], 'options': [it['A'], it['B'], it['C']],
                      'key': ans.get('lis_p4_%d' % i, 'A'), 'image': 'P4Q%d' % (i + 1)})
    return {'type': 'mc_pictures', 'items': items}


def L5(d, ans, script):
    """colour_write. Las instrucciones vienen como frase entera («Colour the pig
    pink.», «Write the word FARM on the door of the barn.»); se parten en lo que
    hay que hacer y donde, que es lo que el motor pinta y corrige."""
    def parte(fr):
        f = fr.strip().rstrip('.')
        m = re.match(r'^colour\s+(.*?)\s+(%s)$' % '|'.join(COLORES), f, re.I)
        if m: return {'what': m.group(1), 'colour': m.group(2).lower()}
        m = re.match(r'^write\s+the\s+word\s+([A-Za-z]+)\s+(.*)$', f, re.I)
        if m: return {'what': m.group(2), 'write': m.group(1)}
        m = re.match(r'^draw\s+(.*)$', f, re.I)
        if m: return {'what': m.group(1), 'write': 'draw'}
        return {'what': f}
    return {'type': 'colour_write', 'image': 'L5', 'scene': d['scene'], 'object': 'thing',
            'example': parte(d.get('example', '')), 'items': [parte(x) for x in d['items']]}


# --------------------------------------------------------- Reading & Writing
def R1(d, ans, n):
    """definitions_copy. El ejemplo de estos tests es solo la palabra ya gastada
    (no trae su definicion), asi que se pasa como word sin def y el motor lo
    pinta como «ya usada» en vez de inventarle un enunciado."""
    items = [{'def': x, 'word': ans.get('rw_p1_%d' % i, '')} for i, x in enumerate(d['defs'])]
    ex = d.get('example')
    if isinstance(ex, dict): ejemplo = {'def': ex.get('def', ''), 'word': ex.get('word', '')}
    else: ejemplo = {'def': '', 'word': str(ex or '')}
    return {'type': 'definitions_copy', 'words': d['words'], 'example': ejemplo, 'items': items}


def R2(d, ans, n):
    """dialogue_mc8: dialogo seguido, ocho respuestas A-H de las que sobran tres."""
    opts = [{'letter': o[0], 'text': o[1]} for o in d['options']]
    items = [{'a': p['a'], 'key': ans.get('rw_p2_%d' % i, '')} for i, p in enumerate(d['pairs'])]
    return {'type': 'dialogue_mc8', 'speakerA': d['speakerA'], 'speakerB': d['speakerB'],
            'example': {'a': d.get('line0_a', ''), 'key': d.get('line0_b_letter', ''), 'text': d.get('line0_b_text', '')},
            'options': opts, 'items': items}


def R3(d, ans, n):
    key = [ans.get('rw_p3_%d' % i, '') for i in range(5)]
    return {'type': 'gapped_text_title', 'words': d['words'], 'text': d['text'],
            'example': d.get('example', ''), 'title_choices': d['title_choices'],
            'key': key, 'title_key': ans.get('rw_p3_title', 'A')}


def R4(d, ans, n):
    def tres(o):
        if isinstance(o, list): return list(o)
        if isinstance(o, dict): return [o.get('A', ''), o.get('B', ''), o.get('C', '')]
        return ['', '', '']
    items = []
    for i, it in enumerate(d['items']):
        o = tres(it.get('options') if isinstance(it, dict) else it)
        letra = ans.get('rw_p4_%d' % i, 'A')
        if letra not in 'ABC' and letra in o: letra = 'ABC'[o.index(letra)]
        items.append({'options': o, 'key': letra})
    ex = d.get('example') if isinstance(d.get('example'), dict) else {}
    return {'type': 'mc_cloze', 'title': d.get('title', ''), 'text': d['text'],
            'example': {'options': tres(ex.get('options')), 'key': ex.get('key', 'A')}, 'items': items}


def R5(d, ans, n):
    items = []
    for i, q in enumerate(d['questions']):
        a = ans.get('rw_p5_%d' % i, '')
        items.append({'s': q if isinstance(q, str) else q.get('s', ''), 'a': a})
    return {'type': 'story_completion', 'title': d.get('title', ''),
            'parts': [{'text': d.get('text', ''), 'examples': [{'s': d.get('example_q', ''), 'a': d.get('example_a', '')}], 'items': items}]}


def R6(d, ans, n):
    """open_cloze: correo o diario con huecos y sin opciones. El hueco del ejemplo
    viene como __(ex)__ y se pasa a __(0)__, que es como marca el ejemplo el motor."""
    return {'type': 'open_cloze', 'title': d.get('title', ''),
            'text': re.sub(r'__\(ex\)__', '__(0)__', d['text']),
            'example': d.get('example', ''), 'key': [ans.get('rw_p6_%d' % i, '') for i in range(5)]}


def R7(d, ans, n):
    return {'type': 'story_writing', 'title': d.get('title', ''), 'image': 'P7',
            'pictures': [d.get('p1', ''), d.get('p2', ''), d.get('p3', '')],
            'prompt': d.get('prompt', 'Look at the three pictures. Write about this story. Write 20 or more words.')}


# ---------------------------------------------------------------- Speaking
def SP(sp, n):
    return {
        'p1': {'type': 'find_differences_statements', 'image': 'S1',
               'examiner_scene': sp.get('p1_ex', ''), 'candidate_scene': sp.get('p1_cand', ''),
               'differences': sp.get('p1_diffs', [])},
        'p2': {'type': 'information_exchange', 'topic': sp.get('p2_topic', ''),
               'candidate_card': sp.get('p2_cand_card', ''), 'candidate_questions': sp.get('p2_cand_qs', []),
               'examiner_card': sp.get('p2_ex_card', ''), 'examiner_questions': sp.get('p2_ex_qs', [])},
        'p3': {'type': 'picture_sequence', 'image': 'S3', 'title': sp.get('p3_title', ''),
               'examiner_open': sp.get('p3_examiner_open', ''),
               'frames': [sp.get('p3_p%d' % i, '') for i in range(1, 6) if sp.get('p3_p%d' % i)]},
        'p4': {'type': 'personal_questions',
               'questions': [q if isinstance(q, dict) else {'q': q} for q in sp.get('p4_questions', [])]}
    }


def convierte(t, script):
    a = t.get('answers') or {}
    aL, aR = a.get('listening') or {}, a.get('rw') or {}
    L, R = t['listening'], t['rw']
    return {
        'level': 'flyers', 'number': t['number'], 'theme': t['theme'],
        'listening': {'p1': L1(L['p1'], aL, (script or {}).get('_p1_txt')),
                      'p2': L2(L['p2'], aL, None, (KEY_L2 or {}).get(str(t['number']))), 'p3': L3(L['p3'], aL, None),
                      'p4': L4(L['p4'], aL, None), 'p5': L5(L['p5'], aL, None)},
        'rw': {'p1': R1(R['p1'], aR, 1), 'p2': R2(R['p2'], aR, 2), 'p3': R3(R['p3'], aR, 3),
               'p4': R4(R['p4'], aR, 4), 'p5': R5(R['p5'], aR, 5), 'p6': R6(R['p6'], aR, 6),
               'p7': R7(R['p7'], aR, 7)},
        'speaking': SP(t.get('speaking') or {}, t['number'])
    }


def main():
    solo_check = '--check' in sys.argv
    tests = tests_del_html()
    print('tests en flyers-practice.html:', len(tests))
    G = guiones()
    print('guiones de audio recuperados:', len(G))
    # el texto crudo del guion de p1 hace falta para colocar el ejemplo de draw_lines
    crudos = {}
    if os.path.isdir(FLY):
        sys.path.insert(0, FLY)
        try:
            from flyers_content import TEST_1, TEST_2, TEST_3, TEST_4, TEST_5
            from flyers_content_2 import TEST_6, TEST_7, TEST_8, TEST_9, TEST_10
            for x in (TEST_1, TEST_2, TEST_3, TEST_4, TEST_5, TEST_6, TEST_7, TEST_8, TEST_9, TEST_10):
                crudos[x['number']] = (x.get('scripts') or {}).get('p1', '')
        except Exception as e:
            print('   (sin scripts crudos: %s)' % e)
    if not solo_check: os.makedirs(SALIDA, exist_ok=True)
    idx = []
    for t in tests:
        n = t['number']
        out = convierte(t, {'_p1_txt': crudos.get(n, '')})
        out['listening']['p1'] = L1(t['listening']['p1'], (t.get('answers') or {}).get('listening') or {}, crudos.get(n, ''))
        if G.get(n): out['audio'] = G[n]
        idx.append({'number': n, 'theme': t['theme']})
        if solo_check: continue
        with io.open(os.path.join(SALIDA, 'test-%02d.json' % n), 'w', encoding='utf-8') as f:
            json.dump(out, f, ensure_ascii=False, indent=1)
        print('  escrito test-%02d.json  %s' % (n, t['theme']))
    if not solo_check:
        with io.open(os.path.join(SALIDA, 'index.json'), 'w', encoding='utf-8') as f:
            json.dump(idx, f, ensure_ascii=False)
        print('index.json con %d tests' % len(idx))


if __name__ == '__main__':
    main()
