# -*- coding: utf-8 -*-
"""Saca de los tests los prompts de las laminas, listos para pegar en Gemini.

Cada test necesita seis: L1 (escena con las seis personas), L5 (dibujo para
colorear), R5 (tira de la historia), R6 (escena para escribir), S1 (par con
diferencias) y S2 (historia en cuatro vinetas). El texto sale de los propios
campos 'scene'/'frames'/'differences' del test, para que la lamina y el audio
no se separen nunca.

    python yle/tools/prompts_laminas.py movers 6 7 8 9 10 > prompts.txt
    python yle/tools/prompts_laminas.py movers 6 --json prompts.json
"""
import io, json, os, re, sys

AQUI = os.path.dirname(os.path.abspath(__file__))
RAIZ = os.path.dirname(os.path.dirname(AQUI))
ESTILO = ('Children\'s book illustration, friendly cartoon style, clean thick outlines, flat bright '
          'colours, white background, no text, no letters, no words anywhere in the image.')


def prompts(level, n):
    t = json.load(io.open(os.path.join(RAIZ, 'yle', level, 'test-%02d.json' % n), encoding='utf-8'))
    L, R, S = t['listening'], t['rw'], t['speaking']
    out = []

    p1 = L['p1']
    gente = '; '.join('%s: %s' % (p['id'], p['desc']) for p in p1['people'])
    out.append(('L1', 'Wide 16:9 scene for a children\'s English exam. %s The six people are clearly '
                'separated so a child can point at each one: %s. Each person is drawn full body, doing '
                'their action clearly. %s' % (p1['scene'], gente, ESTILO)))

    p5 = L['p5']
    cosas = ', '.join('%s %s' % (i['what'], i['where']) for i in [p5['example']] + p5['items'])
    out.append(('L5', 'Black and white line drawing for children to colour, 4:3. %s Everything is drawn '
                'with thick black outlines and NO colour at all, so a child can colour it: %s. The board '
                'or sign is completely empty, with room to write one word. No text anywhere.'
                % (p5['scene'], cosas)))

    r5 = R['p5']
    def resumen(txt):      # la primera frase entera, para no cortar a media palabra
        fr = re.split(r'(?<=[.!?])\s+', txt.strip())
        corto = fr[0]
        if len(corto) < 90 and len(fr) > 1: corto += ' ' + fr[1]
        return corto
    vin = ' | '.join('%d) %s' % (i + 1, resumen(p['text'])) for i, p in enumerate(r5['parts']))
    out.append(('R5', 'One horizontal strip with %d numbered pictures in a row, left to right, telling the '
                'story "%s": %s. Same characters and same clothes in every picture. %s'
                % (len(r5['parts']), r5['title'], vin, ESTILO)))

    r6 = R['p6']
    out.append(('R6', 'Wide scene for a children\'s writing task, 4:3. %s Everything is easy to see and to '
                'name. %s' % (r6['scene'], ESTILO)))

    s1 = S['p1']
    dif = ' '.join('- %s' % d for d in s1['differences'])
    out.append(('S1', 'Two almost identical pictures side by side, left and right, with a thin line between '
                'them. %s The pictures are the same EXCEPT for these differences, which must be obvious: '
                '%s (the LEFT picture is "my picture" and the RIGHT one is "your picture"). %s'
                % (s1['scene'], dif, ESTILO)))

    s2 = S['p2']
    fr = ' | '.join('%d) %s' % (i + 1, f) for i, f in enumerate(s2['frames']))
    out.append(('S2', 'Four pictures in a 2x2 grid, numbered 1 to 4, telling the story "%s": %s. Same '
                'characters and same clothes in the four pictures. %s' % (s2['title'], fr, ESTILO)))
    return out


if __name__ == '__main__':
    level = sys.argv[1] if len(sys.argv) > 1 else 'movers'
    nums = [int(a) for a in sys.argv[2:] if a.isdigit()]
    todo = []
    for n in nums:
        for pid, texto in prompts(level, n):
            todo.append({'level': level, 'test': n, 'id': pid, 'archivo': 'test_%02d_%s.jpg' % (n, pid),
                         'prompt': texto})
    if '--json' in sys.argv:
        destino = sys.argv[sys.argv.index('--json') + 1]
        json.dump(todo, io.open(destino, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
        print('%d prompts -> %s' % (len(todo), destino))
    else:
        for p in todo:
            print('=== %s (%s) ===' % (p['archivo'], p['id']))
            print(p['prompt'])
            print()
