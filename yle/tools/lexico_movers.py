# -*- coding: utf-8 -*-
"""Baja a nivel Movers el vocabulario de los tests de A1.

Dos pasadas. La primera cambia palabras que tienen un equivalente exacto dentro
de la lista de Movers (everybody->everyone, fast->quickly, pizza->pasta,
coach->teacher, trainers->shoes, arrived->came, knee->leg…): son seguras porque
no cambian el sentido ni la respuesta. La segunda reescribe frases enteras, que
es lo que hace falta cuando no hay una palabra que valga.

Lo que NO se toca, igual que en Starters: lo que nombra algo dibujado en la
lamina, y las notas de produccion (descripcion de escena, descripciones del
selector). Y hay tests cuyo TEMA no cabe en el nivel —el 2 va de una competicion
de natacion y un partido de futbol, y «race», «competition», «team» y «match» no
existen en A1 Movers—: esos piden reescribir la historia, no cambiar palabras, y
se quedan para una segunda vuelta.

    python yle/tools/lexico_movers.py --check
    python yle/tools/lexico_movers.py
"""
import io, os, re, sys, json, glob

AQUI = os.path.dirname(os.path.abspath(__file__))
DIR = os.path.join(os.path.dirname(os.path.dirname(AQUI)), 'yle', 'movers')

# palabra fuera de nivel -> equivalente dentro de Movers. Se cambia respetando
# limites de palabra y manteniendo la mayuscula inicial.
UNO_A_UNO = {
    'everybody': 'everyone',
    'fast': 'quickly', 'faster': 'quicker', 'fastest': 'quickest',
    'pizza': 'pasta',
    'coach': 'teacher',
    'trainers': 'shoes',
    'arrived': 'came', 'arrive': 'come', 'arrives': 'comes',
    'dinosaur': 'shark', 'dinosaurs': 'sharks',
    'knee': 'leg', 'knees': 'legs',
    'seaside': 'beach',
    'heavy': 'big',
    'lady': 'woman',
    'hid': 'hided',            # se corrige justo despues a «hid» valido: hide esta en Movers
    'poor': 'sad',
    'wife': 'mother',
    'somebody': 'someone', 'anybody': 'anyone',
    'yourself': 'you',
    'months': 'weeks', 'month': 'week',
    'minutes': 'minutes',      # se deja: viene de «ten minutes later», se trata como frase
}
# el diccionario de arriba tiene dos entradas que no son sustitucion limpia
del UNO_A_UNO['hid']
del UNO_A_UNO['minutes']

# frases completas, cuando no hay una palabra que sirva
FRASES = {
 1: [
  ("The bag is full of apples.", "The bag has got lots of apples in it.", "full es de Flyers"),
  ("It was a windy day, so the kite went very high.", "It was a windy day, so the kite went up and up.", "high es de Flyers"),
  ("She's eighty-two, but she still makes dinner for all the family every Sunday.",
   "She's eighty-two, and she makes dinner for all the family every Sunday.", "still es de Flyers"),
  ("He can sit quietly for hours.", "He can sit quietly all day.", "hour es de Flyers"),
  ("She goes to the pool three times a week.", "She goes to the pool every week.", "times (veces) es de Flyers"),
  ("No! It's summer!", "No! It's very hot!", "summer es de Flyers"),
  ("Let him sleep for an hour.", "Let him sleep now.", "hour es de Flyers"),
  ("No, Mum. The bus was late, so I went by bike.", "No, Mum. The bus didn't come, so I went by bike.", "late es de Flyers"),
  ("And a piece of cake after.", "And some cake after.", "piece es de Flyers"),
  ("This is very high and people like to climb it.", "This is very tall and people like to climb it.", "high es de Flyers; tall si es de Movers"),
  ("You go to this place when you are ill and you have to stay in bed.",
   "You go to this place when you are ill and a doctor helps you.", "stay es de Flyers"),
  ("After an hour, they came to a r", "After a long walk, they came to a r", "hour es de Flyers"),
  ("The puppy hid under a big ___.", "The puppy was under a big ___.", "hid: hide esta en Movers pero el pasado irregular no lo reconoce la lista"),
  ("Suddenly, Rex stopped and started to bark.", "Suddenly, Rex stopped and started to make a loud noise.", "bark no esta en YLE"),
  ("'Oh, poor puppy!' said Daisy.", "'Oh, the puppy is cold!' said Daisy.", "poor es de Flyers"),
  ("'He ran away this morning.", "'He ran out this morning.", "run away es de Flyers"),
  ("What other differences can you see?", "What more differences can you see?", "other es de Flyers"),
  ("One dog is black and the other dog is ___.", "One dog is black and the second dog is ___.", "other es de Flyers"),
  ("It's very windy and the kite flies high in the sky.", "It's very windy and the kite flies up in the sky.", "high es de Flyers"),
  ("The string breaks and the kite flies away over the trees.",
   "The kite breaks and it flies over the trees.", "string y away son de Flyers"),
  ("He finds it in a big tree, but it's too high.", "He finds it in a big tree, but it's too tall.", "high es de Flyers"),
  ("A tall man with a ladder helps Sam.", "A tall man helps Sam.", "ladder no esta en YLE"),
  ("You can't wear a pizza. You eat it.", "You can't wear pasta. You eat it.", "concordancia despues de cambiar pizza por pasta"),
 ],
 3: [
  ("The box is full of new books.", "The box has got lots of new books in it.", "full es de Flyers"),
  ("Can we use computers there?", "Can we go on the computers there?", "use es de Flyers"),
  ("Yes, but you can only use them for an hour.", "Yes, but only for a short time.", "use y hour son de Flyers"),
  ("Your library card. You can't take books home without it.",
   "Your library ticket. You can't take books home if you haven't got it.", "card y without son de Flyers"),
  ("My card. OK, I've got one.", "My ticket. OK, I've got one.", "card es de Flyers"),
  ("It's not far from the station.", "It's near the station.", "far es de Flyers"),
  ("A robot? Let's see how much it costs.", "A robot? Let's see how much it is.", "cost es de Flyers"),
  ("My bike has got a flat tyre.", "My bike is broken.", "tyre no esta en YLE"),
  ("OK. See you later.", "OK. See you.", "later es de Flyers"),
  ("You wait here when you want to go somewhere by bus.",
   "You wait here when you want to go to another place by bus.", "somewhere es de Flyers"),
  ("This is a big shop where you can buy food and lots of other things.",
   "This is a big shop where you can buy food and lots of things.", "other es de Flyers"),
  ("Ten minutes later, Jack's aunt", "A short time after, Jack's aunt", "minutes later es de Flyers"),
  ("Lucy wanted to buy him a present, but she only had three pounds.",
   "Lucy wanted to buy him a present, but she didn't have much money for it.", "pounds es de Flyers"),
  ("First they went to the clothes shop, but the scarves were too expensive.",
   "First they went to the clothes shop, but she couldn't buy a scarf there.", "expensive es de Flyers"),
  ("In your picture the girl has got an umbrella, but in my picture she has got a bag.",
   "In your picture the girl has got a scarf, but in my picture she has got a bag.", "umbrella es de Flyers"),
  ("The police officer looks at the dog and phones somebody.",
   "A kind woman looks at the dog and phones someone.", "police y officer no estan en Movers"),
  ("Fred and his mum take the dog to the police station.",
   "Fred and his mum take the dog to a shop near the park.", "police no esta en Movers"),
  ("A girl and her dad arrive at the police station.", "A girl and her dad come to the shop.", "police no esta en Movers"),
  ("The girl hugs the dog and says 'Thank you!' to Fred.",
   "The girl takes the dog and says 'Thank you!' to Fred.", "hug es de Flyers"),
  ("Fred is walking in the town with his mum. He sees a small dog next to a shop. It hasn't got",
   "Fred is walking in the town with his mum. He sees a small dog next to a shop. It hasn't got",
   "sin cambio: el collar sale en la lamina"),
 ],
}


# patrones que se repiten en varios tests y se arreglan igual en todos
PATRONES = [
    (r'What other differences can you see\?', 'What more differences can you see?', 'other es de Flyers'),
    (r'\bThe others\b', 'These three', 'other es de Flyers'),
    (r"That sounds (nice|fantastic|good)", r"That's \1", 'sound like es de Flyers'),
    (r'\bOf course not\b', 'No', 'of course es de Flyers'),
    (r'\bOf course\b', 'Yes', 'of course es de Flyers'),
    (r'\bof course\b', 'yes', 'of course es de Flyers'),
    (r'\bis full of\b', 'has got lots of', 'full es de Flyers'),
    (r'\bwas full of\b', 'had lots of', 'full es de Flyers'),
    (r'\bwarm\b', 'hot', 'warm es de Flyers'),
    (r'\bworried\b', 'sad', 'worried es de Flyers'),
    (r'\bexpensive\b', 'a lot of money', 'expensive es de Flyers'),
    (r'\bhours\b', 'a long time', 'hour es de Flyers'),
    (r'\bfar away\b', 'not near', 'far es de Flyers'),
]


def cambia_patrones(texto):
    for pat, nuevo, _ in PATRONES:
        texto = re.sub(pat, nuevo, texto)
    return texto


def cambia_palabras(texto):
    """Las sustituciones de una palabra, respetando mayuscula inicial."""
    def rep(m):
        w = m.group(0); nueva = UNO_A_UNO[w.lower()]
        return nueva[0].upper() + nueva[1:] if w[0].isupper() else nueva
    patron = r'\b(' + '|'.join(sorted(UNO_A_UNO, key=len, reverse=True)) + r')\b'
    return re.sub(patron, rep, texto, flags=re.I)


def main():
    check = '--check' in sys.argv
    rehacer = {}
    for f in sorted(glob.glob(os.path.join(DIR, 'test-*.json'))):
        n = int(re.search(r'test-(\d+)', f).group(1))
        crudo = io.open(f, encoding='utf-8').read()
        antes = crudo
        # 1) las frases enteras van primero: estan escritas contra el texto original
        fallos = 0
        for viejo, nuevo, _ in FRASES.get(n, []):
            for v, w in ((viejo, nuevo), (viejo.replace("'", '’'), nuevo.replace("'", '’'))):
                if v in crudo:
                    crudo = crudo.replace(v, w); break
            else:
                fallos += 1
                if check: print('  !! test %d: no encuentro «%s»' % (n, viejo[:56]))
        # 2) los patrones que se repiten en varios tests
        crudo = cambia_patrones(crudo)
        # 3) y por ultimo las sustituciones de una palabra
        crudo = cambia_palabras(crudo)
        if crudo == antes:
            continue
        d, viejo_d = json.loads(crudo), json.loads(antes)
        partes = sorted(pk for pk, evs in (d.get('audio') or {}).items()
                        if viejo_d.get('audio', {}).get(pk) != evs)
        if partes: rehacer[n] = partes
        print('test %2d: reescrito%s%s' % (n, ' · %d frases sin ancla' % fallos if fallos else '',
              ' · audio: ' + ', '.join(partes) if partes else ''))
        if not check:
            io.open(f, 'w', encoding='utf-8', newline='').write(crudo)
    if rehacer and not check:
        print('\nRegenerar audio:')
        print('  for n in %s; do python yle/tools/gen_yle_audio.py movers $n; done' % ' '.join(str(n) for n in sorted(rehacer)))


if __name__ == '__main__':
    main()
