# -*- coding: utf-8 -*-
"""Escribe la clave que le faltaba a Reading & Writing Parte 5 de Flyers.

Igual que pasaba con Listening Parte 2: el contenido original solo traia
respuesta para los primeros items de cada historia. De los 70 items de los diez
tests, 26 estaban sin clave, asi que esa parte no se corregia.

Las respuestas salen del texto de la propia historia. Se aceptan varias formas,
como hace Cambridge («at ten» y «10 o'clock» valen las dos).

De paso se arreglan tres frases que dejo mal la sustitucion automatica de
vocabulario: un faro de 75 kilometros, un muñeco de nieve medido en metros y un
«my person next to us Joe» donde antes decia «my neighbour Joe».

    python yle/tools/flyers_p5_claves.py --check
    python yle/tools/flyers_p5_claves.py
"""
import io, os, sys, json

AQUI = os.path.dirname(os.path.abspath(__file__))
DIR = os.path.join(os.path.dirname(os.path.dirname(AQUI)), 'yle', 'flyers')

# antes de poner las claves, el texto tiene que decir algo que se pueda responder
TEXTO = {
 6: [("My person next to us Joe was already there", "My friend Joe was already there"),
     ("Our snowman was 1 metre 20 tall.", "Our snowman was as tall as my sister.")],
 7: [("the old lighthouse, which is 75 kilometres tall",
      "the old lighthouse, which has 75 steps"),
     ("How tall is the lighthouse?", "How many steps has the lighthouse got?")],
}

# test -> {(parte, item): respuestas}
CLAVES = {
 2: {(0, 3): ['very long'],
     (0, 4): ['Ben forgot his lunchbox', 'because Ben forgot his lunch', 'he forgot his lunchbox'],
     (0, 5): ['the planets', 'about the planets'],
     (0, 6): ['a poster of Mars', 'a small poster of Mars', 'a poster']},
 6: {(0, 3): ['as tall as his sister', 'as tall as my sister'],
     (0, 4): ['a carrot'],
     (0, 5): ['a big plastic plate', 'a plastic plate', 'a plate'],
     (0, 6): ['hot chocolate']},
 7: {(0, 0): ['45 minutes', 'forty-five minutes'],
     (0, 1): ['a map', 'a map with red marks'],
     (0, 2): ['75 steps', 'seventy-five steps', '75'],
     (0, 3): ['The Salty Fish'],
     (0, 4): ['a cheese sandwich', 'cheese sandwich'],
     (0, 5): ['the sea was rougher', 'because the sea was rougher', 'the sea'],
     (0, 6): ['four o’clock', "four o'clock", '4 o’clock', "4 o'clock", 'at four']},
 8: {(0, 2): ['100', 'a hundred', 'one hundred'],
     (0, 3): ['his big sister', 'his sister', 'my big sister'],
     (0, 4): ['more than fifty', 'fifty', 'more than 50', '50'],
     (0, 5): ['he is only nine', 'because he is only nine', 'he’s only nine'],
     (0, 6): ['a baker', 'baker']},
 10: {(0, 1): ['60', 'sixty'],
      (0, 2): ['Aisha'],
      (0, 3): ['kayaking'],
      (0, 4): ['making music', 'making music around the fire'],
      (0, 5): ['Petra and Juno'],
      (0, 6): ['a magic trick', 'he did a magic trick']},
}


def main():
    check = '--check' in sys.argv
    total = 0
    for n in sorted(set(list(CLAVES) + list(TEXTO))):
        ruta = os.path.join(DIR, 'test-%02d.json' % n)
        crudo = io.open(ruta, encoding='utf-8').read()
        for viejo, nuevo in TEXTO.get(n, []):
            for v, w in ((viejo, nuevo), (viejo.replace("'", '’'), nuevo.replace("'", '’'))):
                if v in crudo: crudo = crudo.replace(v, w); break
            else: print('  !! test %d: no encuentro «%s»' % (n, viejo[:50]))
        d = json.loads(crudo)
        puestas = 0
        for (pi, ii), respuestas in CLAVES.get(n, {}).items():
            try: it = d['rw']['p5']['parts'][pi]['items'][ii]
            except (IndexError, KeyError): print('  !! test %d: no existe el item %d.%d' % (n, pi, ii)); continue
            if it.get('a'): continue
            it['a'] = respuestas; puestas += 1
        total += puestas
        print('test %2d: %d claves escritas' % (n, puestas))
        if not check:
            with io.open(ruta, 'w', encoding='utf-8', newline='') as f:
                json.dump(d, f, ensure_ascii=False, indent=1)
    print('\ntotal: %d claves' % total)


if __name__ == '__main__':
    main()
