# -*- coding: utf-8 -*-
"""Tercera pasada del vocabulario de Movers: los tests 3, 4, 5 y 10.

Despues de las dos primeras pasadas (lexico_movers.py) quedaban 103 palabras
fuera de nivel, casi todas en cuatro tests. Aqui se reescriben las de los tests
3, 4, 5 y 10, que tienen arreglo cambiando frases.

El test 2 no esta: su problema no es de palabras sueltas sino de TEMA. Va de una
competicion de natacion y de un partido de futbol, y «race», «competition»,
«team», «match» y «win» no existen en A1 Movers — ni siquiera en Flyers algunas.
Ese hay que reescribirlo de otra manera, con una historia que el nivel soporte.

    python yle/tools/lexico_movers2.py --check
    python yle/tools/lexico_movers2.py
"""
import io, os, re, sys, json, glob

AQUI = os.path.dirname(os.path.abspath(__file__))
DIR = os.path.join(os.path.dirname(os.path.dirname(AQUI)), 'yle', 'movers')

FRASES = {
 1: [
  ("But I saw a kangaroo! It jumped very high.", "But I saw a kangaroo! It jumped up and up.", "high es de Flyers"),
  ("Daisy was late for school, but she was very happy.",
   "Daisy was the last child at school, but she was very happy.", "late es de Flyers"),
  ("On the other side, the children heard a loud noise.",
   "Then the children heard a loud noise.", "other y side son de Flyers"),
  ("their families and lots of other parrots.", "their families and lots of parrots.", "other es de Flyers"),
  ("The kite breaks and it flies over the trees.", "The kite breaks and it flies above the trees.", "over no esta en Movers; above si"),
 ],
 6: [
  ("He eats cheese with everything, even with cake!", "He eats cheese with everything!", "even es de Flyers"),
  ("Don't be late or the tables aren't there!", "Come before two o'clock or the tables aren't there!", "late es de Flyers"),
  ("It's blue and it wasn't much money.", "It's blue and it was a very good one.", "money no esta en Movers"),
  ("It smells fantastic.", "It's fantastic.", "smell es de Flyers"),
 ],
 7: [
  ("His homework isn't finished and he is sad.", "He hasn't got his homework and he is sad.", "finish es de Flyers"),
  ("finishes his homework before school", "does his homework before school", "finish es de Flyers"),
  ("It is late. Nick comes home", "It is nine o'clock. Nick comes home", "late es de Flyers"),
  ("some children from the other class", "some children from another class", "other es de Flyers"),
  ("Nick plays football. He's in a school team and they play in the park.",
   "Nick plays football. He plays with his school friends in the park.", "team no esta en Movers"),
  ("It's a good way to start the day.", "It's a good thing before school.", "way es de Flyers"),
  ("Look, it's got two big wings.", "Look, it can fly!", "wing no esta en Movers"),
 ],
 8: [
  ("The dog stops and starts to bark.", "The dog stops and makes a loud noise.", "bark no esta en YLE"),
  ("Your first job is the horses.", "Your first work is the horses.", "job es de Flyers"),
  ("The potatoes are in the other box, then.", "The potatoes are in the second box, then.", "other es de Flyers"),
 ],
 9: [
  ("And don't forget your hat!", "And take your hat!", "forget es de Flyers"),
  ("His mother gives him his gloves too.", "His mother gives him his hat too.", "glove es de Flyers"),
  ("Now you're ready for the trip.", "Now you can go on the trip.", "ready no esta en Movers"),
 ],
 3: [
  ("You can't take books home if you haven't got it.", "You need it to take books home.", "if (condicional) es de Flyers"),
  ("It's in Park Street, opposite the bank.", "It's in Park Street, opposite the café.", "bank no esta en Movers; café si"),
  ("Excuse me, where's the bookshop? Is it next to the bank?",
   "Excuse me, where's the bookshop? Is it next to the café?", "bank no esta en Movers"),
  ('"next to the bank"', '"next to the café"', "bank no esta en Movers"),
  ('"a bank"', '"a café"', "bank no esta en Movers"),
  ("People put their money in this place.", "You sit here and drink a milkshake with friends.",
   "money y bank no estan en Movers; la respuesta pasa a ser el café"),
  ('"Shop assistant"', '"Woman in the shop"', "assistant no esta en YLE"),
  ("and when he turned round, his aunt wasn't there",
   "and when he looked again, his aunt wasn't there", "turn round es de Flyers"),
  ("A kind __(3)__ officer asked him", "A kind __(3)__ asked him", "officer no esta en YLE"),
  ('"police"', '"woman"', "police no esta en Movers"),
  ("but she didn't have much money for it", "but she couldn't buy a big one", "money no esta en Movers"),
 ],
 4: [
  ("She wanted to find the hotel on the map.", "She wanted to find the house on the map.", "hotel no esta en Movers"),
  ("Ha ha! I hope he didn't miss the train.", "Ha ha! He came to the train after us.", "hope y miss son de Flyers"),
  ("He said 'The train is late!' He looked at the clock every minute.",
   "He said 'The train isn't here!' He looked at the clock all the time.", "late es de Flyers y minute no esta en Movers"),
  ("No, it's too far. We're going by train.", "No, it's not near. We're going by train.", "far es de Flyers"),
  ("How many days are we staying there?", "How many days are we there?", "stay es de Flyers"),
  ("Seven days. A whole week.", "Seven days. One week.", "whole es de Flyers"),
  ("In a hotel next to the lake. It's called the Star Hotel. S-T-A-R.",
   "In a house next to the lake. It's called the Star House. S-T-A-R.", "hotel no esta en Movers"),
  ("Yes, we can go in a boat. A small boat with a motor.",
   "Yes, we can go in a boat. A small boat with a red sail.", "motor no esta en YLE; sail si es de Movers"),
  ("It's cold in the mountains in the evening, even in summer.",
   "It's cold in the mountains in the evening.", "even y summer son de Flyers"),
  ("He was tired, so he slept under a big umbrella every afternoon.",
   "He was tired, so he slept under a big tree every afternoon.", "umbrella es de Flyers"),
  ("Chicken is tomorrow.", "Chicken is on Sunday.", "tomorrow es de Flyers"),
  ("Name of the hotel: the … Hotel", "Name of the house: the … House", "hotel no esta en Movers"),
  ('"a hotel"', '"a village"', "hotel no esta en Movers; village si"),
  ("You sleep in this when you go camping.", "You sleep in this when you go to the mountains.", "camping es de Flyers"),
  ("This flies in the sky and takes people to other countries.",
   "This flies in the sky and takes people to different countries.", "other es de Flyers"),
  ("This is land with water all around it.", "This is a place with water all around it.", "land no esta en Movers"),
  ("It's very far.", "It's not near.", "far es de Flyers"),
  ("No, he's staying with Aunt Jane.", "No, he's with Aunt Jane.", "stay es de Flyers"),
  ("Yes, I sent it.", "Yes, I did.", "send es de Movers pero el pasado irregular no; y asi es mas natural"),
  ("Last summer, Kim and her family went to a small", "Last year, Kim and her family went to a small", "summer es de Flyers"),
  ("At the beach station, a woman in a blue uniform waited for them.",
   "At the beach station, a woman in a blue coat waited for them.", "uniform es de Flyers"),
  ("Here the sun is shining, but here it is cloudy.", "Here it is sunny, but here it is cloudy.", "shine no esta en YLE"),
  ("Peter and his dad are camping in the mountains. It's the ev",
   "Peter and his dad are on holiday in the mountains. It's the ev", "camping es de Flyers"),
  ("Peter and his dad are camping in the mountains. In the evening",
   "Peter and his dad are on holiday in the mountains. In the evening", "camping es de Flyers"),
  ("In the morning the sun is shining again.", "In the morning it is sunny again.", "shine no esta en YLE"),
 ],
 5: [
  ("Grandma's cat is staying with us this week.", "Grandma's cat is with us this week.", "stay es de Flyers"),
  ("Ben, I've got some jobs for you this Saturday.", "Ben, I've got some work for you this Saturday.", "job es de Flyers; work si es de Movers"),
  ("Yes, Mum. What's the first job?", "Yes, Mum. What's the first thing?", "job es de Flyers"),
  ("She does the shopping for the whole week.", "She does the shopping for all the week.", "whole es de Flyers"),
  ("What is Mum going to cook tonight?", "What is Mum going to cook this evening?", "tonight es de Flyers"),
  ("Mum, are we having soup tonight?", "Mum, are we having soup this evening?", "tonight es de Flyers"),
  ("I'm cleaning my bedroom. It's very untidy!", "I'm cleaning my bedroom. It's very dirty!", "untidy es de Flyers"),
  ("That's your job!", "That's your work!", "job es de Flyers"),
  ("Yes, green is perfect.", "Yes, green is very good.", "perfect no esta en YLE"),
  ("First job: clean the", "First thing: clean the", "job es de Flyers"),
  ("It's a dish.", "It's a plate.", "dish es de Flyers; plate si es de Movers"),
  ("It's next to the sink.", "It's next to the window.", "sink es de Flyers"),
  ("I like soap.", "I like it.", "soap es de Flyers"),
  ("Don't worry, I will.", "Don't worry, I can.", "will es de Flyers"),
  ("You're welcome!", "That's OK!", "welcome no esta en YLE"),
  ('"high"', '"tall"', "high es de Flyers; tall si es de Movers"),
  ('"higher"', '"taller"', "high es de Flyers"),
  ('"highest"', '"tallest"', "high es de Flyers"),
  ("Dad found the eggs, the flour and the sugar, and Sally found a big bowl.",
   "Dad found the eggs and the milk, and Sally found a big bowl.", "flour y sugar no estan en Movers"),
  ("Sally put the eggs and the sugar in the bowl.", "Sally put the eggs and the milk in the bowl.", "sugar no esta en Movers"),
  ("Then Dad's phone rang and he went to the living room.",
   "Then Dad's phone made a noise and he went to the living room.", "ring no esta en Movers"),
  ("Dad went to the living room because his ___ rang.", "Dad went to the living room because of his ___.", "ring no esta en Movers"),
  ("Sally thought the salt was ___.", "Sally thought the white thing was ___.", "salt no esta en Movers"),
  ("Dad said the cake mix was very ___.", "Dad said the cake was very ___.", "mix no esta en Movers"),
  ("Grandma ate ___ pieces of the second cake.", "Grandma ate ___ of the second cake.", "piece es de Flyers"),
  ("he tasted the cake mix. 'Hmm, this is very strange,' he said.",
   "he tried the cake. 'Hmm, this is very funny,' he said.", "taste, mix y strange no estan en Movers"),
  ("The second cake was perfect.", "The second cake was very good.", "perfect no esta en YLE"),
  ("but there is water and soap everywhere!", "but there is water on all the floor!", "soap es de Flyers y everywhere tambien"),
  ("She hugs Vicky and her brother.", "She says thank you to Vicky and her brother.", "hug es de Flyers"),
 ],
 10: [
  ("Mr Baker. B-A-K-E-R. He plays six instruments!", "Mr Baker. B-A-K-E-R. He plays the piano and the guitar!", "instrument no esta en Movers"),
  ("Sixteen. That's a big group.", "Sixteen. That's a big class.", "group no esta en Movers"),
  ("No, he stays at home and plays the piano.", "No, he's at home and plays the piano.", "stay es de Flyers"),
  ("In the summer, sometimes!", "When it's hot, sometimes!", "summer es de Flyers"),
  ("No, I get up too late.", "No, I get up after nine o'clock.", "late es de Flyers"),
  ("I listen to music, but I can't play anything.", "I listen to music, but I can't play it.", "anything es de Flyers"),
  ("the group needs one more player", "they need one more player", "group no esta en Movers"),
  ("Now she plays with the group every Saturday.", "Now she plays with them every Saturday.", "group no esta en Movers"),
  ("Can you play a musical instrument?", "Can you play the piano or the guitar?", "instrument y musical no estan en Movers"),
 ],
}


def main():
    check = '--check' in sys.argv
    rehacer = {}
    for n, lista in sorted(FRASES.items()):
        ruta = os.path.join(DIR, 'test-%02d.json' % n)
        crudo = io.open(ruta, encoding='utf-8').read()
        antes = crudo
        hechos = 0
        for viejo, nuevo, _ in lista:
            for v, w in ((viejo, nuevo), (viejo.replace("'", '’'), nuevo.replace("'", '’'))):
                if v in crudo:
                    crudo = crudo.replace(v, w); hechos += 1; break
            else:
                print('  !! test %d: no encuentro «%s»' % (n, viejo[:56]))
        if crudo == antes:
            print('test %2d: sin cambios' % n); continue
        d, viejo_d = json.loads(crudo), json.loads(antes)
        partes = sorted(pk for pk, evs in (d.get('audio') or {}).items()
                        if viejo_d.get('audio', {}).get(pk) != evs)
        if partes: rehacer[n] = partes
        print('test %2d: %d/%d frases%s' % (n, hechos, len(lista), ' · audio: ' + ', '.join(partes) if partes else ''))
        if not check:
            io.open(ruta, 'w', encoding='utf-8', newline='').write(crudo)
    if rehacer and not check:
        print('\n  for n in %s; do python yle/tools/gen_yle_audio.py movers $n; done'
              % ' '.join(str(n) for n in sorted(rehacer)))


if __name__ == '__main__':
    main()
