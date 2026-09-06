# -*- coding: utf-8 -*-
"""Baja a nivel Starters el vocabulario de los tests de Pre A1.

Los diez tests usaban palabras que la word list 2025 situa en Movers o en Flyers
—o que no estan en YLE— en el texto que el nino lee y oye. Aqui se reescriben
esas frases con palabras de Starters, cuidando que la respuesta correcta del item
no cambie.

Lo que NO se toca: las palabras que nombran algo dibujado en la lamina (bucket,
towel, crab, umbrella, fridge, bowl, bench, plate…). Cambiarlas dejaria el
enunciado hablando de una cosa y el dibujo enseñando otra, asi que esas esperan a
que se regeneren las laminas. Tampoco las descripciones de escena, que desde hoy
son el texto alternativo de la imagen y no se le pintan al nino.

    python yle/tools/lexico_starters.py --check   # comprueba las anclas
    python yle/tools/lexico_starters.py           # aplica y dice que audio rehacer
"""
import io, os, sys, json

AQUI = os.path.dirname(os.path.abspath(__file__))
DIR = os.path.join(os.path.dirname(os.path.dirname(AQUI)), 'yle', 'starters')

# test -> [(texto viejo, texto nuevo, por que)]
PARCHES = {
 1: [
  ("Yes. That's Lucy. She's tired!", "Yes. That's Lucy. She's sleeping!", "tired es de Movers"),
  ("How many children are on the trip today?", "How many children are at the zoo today?", "trip es de Movers"),
  ("How many children are on the trip?", "How many children are at the zoo?", "trip es de Movers"),
  ("The zoo trip", "The zoo day", "trip es de Movers"),
  ("It's OK. But I like the giraffe. It's very tall!", "It's OK. But I like the giraffe. It's very big!", "tall es de Flyers"),
  ("Ben laughs and Mum takes a photo.", "Ben is happy and Mum takes a photo.", "laugh es de Movers"),
 ],
 2: [
  ("Yes, it is. Mark is always late!", "Yes, it is. Mark is not here!", "always es de Movers y late de Flyers"),
  ("That's Eva. She's helping the teacher.", "That's Eva. She's with the teacher.", "help es de Movers"),
  ("Number nine. That's next to the library.", "Number nine. That's next to the classroom.", "library es de Movers"),
  ("Five. What is Tony eating at break?", "Five. What is Tony eating at lunch?", "break es de Movers"),
  ("What is Tony eating at break?", "What is Tony eating at lunch?", "break es de Movers"),
  ("No, Miss. I'm eating a sandwich. A cheese sandwich.", "No, Miss. I'm eating a burger. A chicken burger.", "sandwich y cheese son de Movers"),
  ("A sandwich. OK!", "A burger. OK!", "sandwich es de Movers"),
  ('"a sandwich"', '"a burger"', "la opcion escrita del item"),
  ('"sandwich"', '"burger"', "el dibujo del item"),
  ("we write in our notebooks. At break time", "we write in our books. At lunch", "notebook no esta en YLE; break y time son de Movers"),
  ("Tom sits next to a girl called Anna.", "Tom sits next to a girl. Her name is Anna.", "be called es de Movers"),
  ("At break, Tom and Anna play football", "At lunch, Tom and Anna play football", "break es de Movers"),
  ("What do you do at break time?", "What do you do at lunch?", "break y time son de Movers"),
 ],
 3: [
  ("That's Bill. He watches TV every afternoon.", "That's Bill. He watches TV in the afternoon.", "every es de Movers"),
  ("Yes, it is. Jill drinks milk every day.", "Yes, it is. Jill drinks milk in the morning.", "every es de Movers"),
  ("No. I'm cleaning the bathroom. Can you help me?", "No. I'm cleaning the bathroom. Can you come here?", "help es de Movers"),
  ("Where does Kim hear a noise?", "Where is Bobby?", "hear y noise son de Flyers; la respuesta sigue siendo el bano"),
  ("Then she hears a noise in the bathroom.", "Then she looks in the bathroom.", "hear y noise son de Flyers"),
  ("Kim laughs. Bobby is wet! Kim washes Bobby with soap and water.",
   "Kim smiles. Bobby is dirty! Kim cleans Bobby with water.",
   "laugh, wet y wash son de Movers; soap es de Flyers"),
 ],
 4: [
  ("Look at the girl drinking lemonade with a straw.", "Look at the girl drinking lemonade.", "straw es de Movers"),
  ("That's Ben. Don't eat all the sweets, Ben!", "That's Ben. Don't eat lots of sweets, Ben!", "all es de Movers"),
  ("No, Mum. I want pizza, please.", "No, Mum. I want a burger, please.", "pizza es de Flyers"),
  ("My dad drinks black coffee and my mum drinks __(1)__ with milk.",
   "My dad drinks water and my mum drinks __(1)__.", "coffee es de Movers y tea tambien"),
  ("I eat an egg and some __(2)__ with butter. My little sister eats a banana and a __(3)__.",
   "I eat an egg and some __(2)__. My small sister eats a banana and a __(3)__.",
   "butter no esta en YLE y little es de Flyers"),
  ("After breakfast, we __(5)__ our teeth", "After breakfast, we __(5)__ our face", "teeth es de Movers"),
  ("How many sandwiches does Sam eat?", "How many burgers does Sam eat?", "sandwich es de Movers"),
  ("Sam eats two sandwiches.", "Sam eats two burgers.", "sandwich es de Movers"),
  ("Grandma has got a big bag with sandwiches, apples and orange juice.",
   "Grandma has got a big bag with burgers, apples and orange juice.", "sandwich es de Movers"),
  ("Grandma has got a surprise: three ice creams!", "Grandma has got three ice creams for them!", "surprise es de Flyers"),
  ('"word": "pizza"', '"word": "bread"', "pizza es de Flyers; el dibujo cambia y la frase «This is a cake» sigue siendo falsa"),
  ('"tea"', '"juice"', "tea es de Movers: cambia en el banco de palabras y en la clave"),
  ("What a nice picnic!", "What a nice day!", "picnic es de Movers"),
  ('"title": "The picnic"', '"title": "A day in the park"', "picnic es de Movers"),
 ],
 5: [
  ("We're at the beach today. Look at all the children!", "We're at the beach today. Look at the children!", "all es de Movers"),
  ("Sleeping! Ha ha. He's tired.", "Sleeping! Ha ha. He's in the sun.", "tired es de Movers"),
  ("It is a hot day. Anna and her dad are at the beach.", "It is a beautiful day. Anna and her dad are at the beach.", "hot es de Flyers"),
 ],
 6: [
  ("We're in the park today. Look at all the children!", "We're in the park today. Look at the children!", "all es de Movers"),
  ("There are three kites in the sky.", "There are three kites.", "sky es de Flyers"),
  ("There is a kite in the sky.", "There is a kite.", "sky es de Flyers; la respuesta si/no no cambia"),
  ("I've got a kite. It can fly high.", "I've got a kite. It can fly.", "high es de Flyers"),
  ("And the ball on the path? Colour it purple.", "And the ball under the tree? Colour it purple.",
   "path es de Flyers, y ademas el audio pedia «on the path» cuando la clave dice «under the tree»"),
  ("It is a sunny day. Ben and his sister Lucy are in the park.",
   "It is a beautiful day. Ben and his sister Lucy are in the park.", "sunny es de Movers"),
  ("What does Rex run after?", "What does Rex see?", "after (persecucion) es de Movers; la respuesta sigue siendo el pato"),
  ("Rex runs after a duck next to the water.", "Rex sees a duck next to the water.", "after es de Movers"),
 ],
 7: [
  ("It's a birthday today! Look at all the children.", "It's a birthday today! Look at the children.", "all es de Movers"),
  ("How many candles are on the cake?", "How many balloons can you see?", "candle no esta en YLE"),
 ],
 9: [
  ("Look at all the children in their nice clothes!", "Look at the children in their nice clothes!", "all es de Movers"),
 ],
 10: [
  ("What a lovely garden! Look at all the children.", "What a lovely garden! Look at the children.", "all es de Movers"),
  ("I can see a little bird in the tree.", "I can see a small bird in the tree.", "little es de Flyers"),
  ("What is Kim smelling?", "What has Kim got?", "smell es de Flyers; la respuesta sigue siendo la flor"),
  ("Kim is picking a flower.", "Kim has got a flower.", "pick (una flor) no esta en Starters"),
 ],
}


def main():
    check = '--check' in sys.argv
    rehacer = {}
    for n, lista in sorted(PARCHES.items()):
        ruta = os.path.join(DIR, 'test-%02d.json' % n)
        crudo = io.open(ruta, encoding='utf-8').read()
        antes = crudo
        hechos = 0
        for viejo, nuevo, _ in lista:
            for v, w in ((viejo, nuevo), (viejo.replace("'", '’'), nuevo.replace("'", '’'))):
                if v in crudo:
                    crudo = crudo.replace(v, w); hechos += 1; break
            else:
                print('  !! test %d: no encuentro «%s»' % (n, viejo[:58]))
        if crudo == antes:
            print('test %2d: sin cambios' % n); continue
        d, viejo_d = json.loads(crudo), json.loads(antes)   # que siga siendo JSON valido
        partes = sorted(pk for pk, evs in (d.get('audio') or {}).items()
                        if viejo_d.get('audio', {}).get(pk) != evs)
        if partes: rehacer[n] = partes
        print('test %2d: %d/%d frases reescritas%s' % (n, hechos, len(lista),
              ' · audio a rehacer: ' + ', '.join(partes) if partes else ''))
        if not check:
            io.open(ruta, 'w', encoding='utf-8', newline='').write(crudo)
    if rehacer and not check:
        print('\nRegenerar audio:')
        for n, ps in sorted(rehacer.items()):
            print('  python yle/tools/gen_yle_audio.py starters %d   # %s' % (n, ', '.join(ps)))


if __name__ == '__main__':
    main()
