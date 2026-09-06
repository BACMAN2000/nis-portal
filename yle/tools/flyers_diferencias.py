# -*- coding: utf-8 -*-
"""Pone en ingles las diferencias del Speaking 1 de Flyers.

Estaban escritas en notacion abreviada —«Bucket colour (red vs blue).», «Three
birds vs five birds.»—, que es una nota de produccion, no lo que el nino tiene
que decir. Y el motor se las enseña al alumno en «Show the differences», asi que
son texto del examen: 34 apariciones de «vs», que no es una palabra inglesa.

En Movers ya estaban como frases modelo («In your picture the girl has got un
scarf, but in my picture she has got a bag»), que es la forma en que el examinador
espera oirlo. Aqui se hace lo mismo en los diez tests, con vocabulario del nivel.

    python yle/tools/flyers_diferencias.py --check
    python yle/tools/flyers_diferencias.py
"""
import io, os, sys, json

AQUI = os.path.dirname(os.path.abspath(__file__))
DIR = os.path.join(os.path.dirname(os.path.dirname(AQUI)), 'yle', 'flyers')

OTRA = 'You can say any other difference you find.'

NUEVAS = {
 1: ["In my picture the bucket is red, but in your picture it's blue.",
     "In my picture the woman is reading a book, but in your picture she's eating an ice cream.",
     "In my picture there are three birds, but in your picture there are five.",
     "In my picture the castle in the sand has got one flag, but in your picture it's got two."],
 2: ["In my picture there's a pencil on the desk, but in your picture there's a pen.",
     "In my picture the bag is red, but in your picture it's blue.",
     "In my picture there's maths on the board, but in your picture there's science.",
     "In my picture there are three books, but in your picture there are five."],
 3: ["In my picture the hat is white, but in your picture it's black.",
     "In my picture there are four eggs, but in your picture there are six.",
     "In my picture there's a cat, but in your picture there's a dog.",
     "In my picture there are two tomatoes, but in your picture there are four."],
 4: ["In my picture the man is reading a book, but in your picture he's reading a newspaper.",
     "In my picture there's a toy train, but in your picture there's a toy lorry.",
     "In my picture there's a dog, but in your picture there's a cat.",
     "In my picture there's one clock, but in your picture there are two."],
 5: ["In my picture the children are playing football, but in your picture they're playing basketball.",
     "In my picture the ball is red, but in your picture it's green.",
     "In my picture there are two birds, but in your picture there are four.",
     "In my picture there's a cap on the seat, but in your picture there's a book."],
 6: ["In my picture it's sunny, but in your picture it's raining.",
     "In my picture the kite is blue, but in your picture it's red.",
     "In my picture the man is reading a book, but in your picture he's reading a newspaper.",
     "In my picture no-one has got an umbrella, but in your picture a woman has got one."],
 7: ["In my picture the girl is eating an apple, but in your picture she's eating a banana.",
     "In my picture there are three people waiting, but in your picture there are five.",
     "In my picture the train is blue, but in your picture it's red.", OTRA],
 8: ["In my picture there's a picture of a flower on the wall, but in your picture there's a picture of a dog.",
     "In my picture there's a plant on the desk, but in your picture there's a cup.",
     "In my picture the woman is writing, but in your picture she's using the computer.", OTRA],
 9: ["In my picture the bag is big, but in your picture it's small.",
     "In my picture there are three dresses, but in your picture there are five.",
     "In my picture the mirror is blue, but in your picture it's green.", OTRA],
 10: ["In my picture there are eight candles on the cake, but in your picture there are ten.",
      "In my picture there's a dog, but in your picture there's a cat.",
      "In my picture the flag on the wall is red, but in your picture it's blue.", OTRA],
}


def main():
    check = '--check' in sys.argv
    for n, lista in sorted(NUEVAS.items()):
        ruta = os.path.join(DIR, 'test-%02d.json' % n)
        d = json.load(io.open(ruta, encoding='utf-8'))
        viejas = (d.get('speaking') or {}).get('p1', {}).get('differences') or []
        if len(viejas) != len(lista):
            print('  !! test %d: habia %d diferencias y traigo %d' % (n, len(viejas), len(lista)))
        print('test %2d: %d diferencias en frase' % (n, len(lista)))
        if check:
            for v, w in zip(viejas, lista): print('     %-46s -> %s' % (v[:46], w[:70]))
            continue
        d['speaking']['p1']['differences'] = lista
        with io.open(ruta, 'w', encoding='utf-8', newline='') as f:
            json.dump(d, f, ensure_ascii=False, indent=1)


if __name__ == '__main__':
    main()
