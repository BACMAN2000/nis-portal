# -*- coding: utf-8 -*-
"""Baja a nivel Flyers el vocabulario de los tests de A2.

Flyers es el ultimo nivel, asi que aqui no hay «palabra de un nivel superior»:
todo lo que se señala esta fuera de la word list de YLE entera. A cambio, la
lista acumulada es grande (1 380 palabras) y casi siempre hay un equivalente.

Tres pasadas, como en Movers: palabra por palabra cuando hay equivalente exacto,
patrones para las expresiones que se repiten, y frases enteras para lo demas.

No se toca lo que nombra algo dibujado en la lamina ni las notas de produccion.

    python yle/tools/lexico_flyers.py --check
    python yle/tools/lexico_flyers.py
"""
import io, os, re, sys, json, glob

AQUI = os.path.dirname(os.path.abspath(__file__))
DIR = os.path.join(os.path.dirname(os.path.dirname(AQUI)), 'yle', 'flyers')

# fuera de YLE -> dentro de la lista acumulada de Flyers
UNO_A_UNO = {
    'notebook': 'book', 'notebooks': 'books',
    'ferry': 'boat', 'ferries': 'boats',
    'tram': 'bus', 'trams': 'buses',
    'medal': 'prize', 'medals': 'prizes',
    'jar': 'bottle', 'jars': 'bottles',
    'nuts': 'biscuits',
    'raincoat': 'coat', 'raincoats': 'coats',
    'wellies': 'boots',
    'carpet': 'rug', 'carpets': 'rugs',
    'guests': 'people', 'guest': 'person',
    'celebration': 'party', 'celebrations': 'parties',
    'gymnastics': 'sport',
    'peanuts': 'olives',
    'rainy': 'raining',
    'definitely': 'really',
    'absolute': '',                 # «his absolute favourite» -> «his favourite»
    'bright': 'lovely',
    'dragon': 'king',
    'vet': 'animal doctor',
    'twin': 'second',
    'seasons': 'times of the year', 'season': 'time of the year',
    'routine': 'day',
    'healthy': 'well',
    'lunchtime': 'lunch',
    'neighbours': 'people next to us', 'neighbour': 'person next to us',
}

# expresiones que se repiten en varios tests
PATRONES = [
    (r'\bper class\b', 'in each class', 'per no esta en YLE'),
    (r'\bper (\w+)\b', r'in each \1', 'per no esta en YLE'),
    (r'\bthe rest of the story\b', 'the story', 'rest no esta en YLE'),
    (r'\bpencil case\b', 'pencil box', 'case no esta en YLE'),
    (r'\bas usual\b', 'again', 'as usual no esta en YLE'),
    (r'\bat lunchtime\b', 'at lunch', 'lunchtime no esta en YLE'),
    (r'\bweather report\b', 'weather news', 'report no esta en YLE'),
    (r'\ba whole\b', 'all the', 'whole no esta en YLE'),
    (r'\bthe whole\b', 'all the', 'whole no esta en YLE'),
    (r'\balmost an hour\b', 'an hour', 'almost no esta en YLE'),
    (r'\balmost\b', 'nearly all', 'almost no esta en YLE'),
    (r'\bthe main teacher\b', 'the teacher', 'main no esta en YLE'),
    (r'\btotal price\b', 'money', 'price no esta en YLE'),
    (r'\bthe price\b', 'the money', 'price no esta en YLE'),
    (r'\bDay of the flight\b', 'Day of the journey', 'flight no esta en YLE'),
    (r'\bflight number\b', 'plane number', 'flight no esta en YLE'),
    (r'\bthe flight\b', 'the plane', 'flight no esta en YLE'),
    (r'\bWhat activities can you do\b', 'What can you do', 'activities no esta en YLE'),
    (r'\bactivities\b', 'things to do', 'activities no esta en YLE'),
    (r'\bthe bakery\b', "the baker's shop", 'bakery no esta en YLE'),
    (r'\bbakery\b', "baker's shop", 'bakery no esta en YLE'),
    (r'\bItem \(clothing\)', 'Item of clothes', 'clothing no esta en YLE'),
    (r'\bclothing\b', 'clothes', 'clothing no esta en YLE'),
    (r'\bdegrees\b', '', 'degrees no esta en YLE: el numero basta'),
    (r'\bWhat vehicle do you love\b', 'How do you like to travel', 'vehicle no esta en YLE'),
    (r'\bvehicles?\b', 'cars and buses', 'vehicle no esta en YLE'),
    (r'\bWhich season do you love\b', 'Which time of the year do you love', 'season no esta en YLE'),
    (r'\bfireworks\b', 'lights in the sky', 'fireworks no esta en YLE'),
    (r'\bthe menu\b', 'the food', 'menu no esta en YLE'),
    (r'\ba big hug\b', 'a big kiss', 'hug no esta en YLE; kiss tampoco, se arregla en frases'),
    (r'\bhow much do I pay\b', 'how much is it', 'pay no esta en YLE'),
    (r'\bHow much do I pay\b', 'How much is it', 'pay no esta en YLE'),
    (r'\bto celebrate\b', 'at the party', 'celebrate no esta en YLE'),
    (r'\bin a small pot\b', 'in a small glass', 'pot no esta en YLE'),
    (r'\bthe extra club\b', 'the other club', 'extra no esta en YLE'),
    (r'\ba red tie\b', 'a red scarf', 'tie no esta en YLE'),
    (r'\bred tie\b', 'red scarf', 'tie no esta en YLE'),
    (r'\ba tie\b', 'a scarf', 'tie no esta en YLE'),
    (r'different (from|to) our own', r'different \1 ours', 'own no esta en YLE'),
    (r'\bour own\b', 'ours', 'own no esta en YLE'),
    (r'with candles for a birthday', 'you eat at a birthday party', 'candle no esta en YLE'),
    (r'\bcandles\b', 'lights', 'candle no esta en YLE'),
    (r'\bfresh (water|fruit|air|milk|food)\b', r'\1', 'fresh no esta en YLE'),
    (r'\bfresh\b ', '', 'fresh no esta en YLE'),
    (r"\bbaker's shop\b", 'bread shop', 'baker no esta en YLE'),
    (r'\beight pounds\b', 'eight', 'pound no esta en YLE'),
    (r'\bpounds\b', '', 'pound no esta en YLE: en la ficha va el simbolo'),
    (r'\bthe rest of the (day|story|week|afternoon)\b', r'all the \1', 'rest no esta en YLE'),
    (r'\bTotal price\b', 'Money', 'price no esta en YLE'),
    (r'\bMoney to pay each month\b', 'Money each month', 'pay no esta en YLE'),
    (r'\ba big kiss\b', 'a big smile', 'kiss no esta en YLE'),
    (r'\bextra club\b', 'other club', 'extra no esta en YLE'),
    (r'\bplant pot\b', 'plant glass', 'pot no esta en YLE'),
    (r"\bthe writer's job\b", "the person's job", 'writer no esta en YLE'),
    (r"\bwriter's\b", "person's", 'writer no esta en YLE'),
    (r'\bfashion show\b', 'clothes show', 'fashion no esta en YLE'),
    (r'\boutfit\b', 'dress', 'outfit no esta en YLE'),
    (r'\bghost\b', 'monster', 'ghost no esta en YLE; monster si'),
    (r'\bwizard\b', 'king', 'wizard no esta en YLE'),
    (r'\bis planning a party\b', 'is getting ready for a party', 'plan no esta en YLE'),
    (r'\bat the aquarium\b', 'at the sea museum', 'aquarium no esta en YLE'),
    (r"\bhe's crazy about them\b", 'he loves them', 'crazy no esta en YLE'),
    (r'\bespecially\b', 'above all', 'especially no esta en YLE'),
    (r'\bcolourful feathers\b', 'colourful wings', 'feather no esta en YLE'),
    (r'\bgoldfish\b', 'fish', 'goldfish no esta en YLE'),
    (r"\bThat's perfect\b", "That's great", 'perfect no esta en YLE'),
    (r'\bperfect\b', 'great', 'perfect no esta en YLE'),
    (r'\byou saw recently\b', 'you saw last week', 'recently no esta en YLE'),
    (r'\bwe did a safari and\b', 'we went in a big car and', 'safari no esta en YLE'),
    (r'\bsandcastle\b', 'castle in the sand', 'sandcastle no esta en YLE'),
    (r'\bvery sharp teeth\b', 'very big teeth', 'sharp no esta en YLE'),
    (r'\bturtles\b', 'tortoises', 'turtle no esta en YLE; tortoise si'),
    (r'\bturtle\b', 'tortoise', 'turtle no esta en YLE; tortoise si'),
    (r'\bscience experiment\b', 'science lesson', 'experiment no esta en YLE'),
    (r'\bexperiment\b', 'lesson', 'experiment no esta en YLE'),
    (r'\bblue collar\b', 'blue ring', 'collar no esta en YLE'),
    (r'\ba crown and a cape\b', 'a crown and a long dress', 'cape no esta en YLE'),
    (r'\beither\b', 'one of them', 'either no esta en YLE'),
    (r'\bNow you tell the rest\b', 'Now you tell the story', 'rest no esta en YLE'),
    (r'\bthe rest\b', 'the story', 'rest no esta en YLE'),
    (r'\bYour order number is\b', 'Your number is', 'order no esta en YLE'),
    (r'\bNumber of the order\b', 'Number for you', 'order no esta en YLE'),
    (r'\ba librarian\b', 'a person', 'librarian no esta en YLE'),
    (r'\b(\d+) metres long\b', 'very long', 'metre no esta en YLE'),
    (r'\bmetres\b', 'kilometres', 'metre no esta en YLE; kilometre si'),
    (r'\bthe pot\b', 'the glass', 'pot no esta en YLE'),
    (r'\bshare her sandwich\b', 'give away her sandwich', 'share no esta en YLE'),
    (r'\bshare\b', 'give', 'share no esta en YLE'),
    (r'\ba blue apron\b', 'a blue coat', 'apron no esta en YLE'),
    (r'\bpasta dish\b', 'pasta meal', 'dish no esta en YLE'),
    (r'\bdish\b', 'meal', 'dish no esta en YLE'),
    (r'\bhomemade pizza\b', 'pizza at home', 'homemade no esta en YLE'),
    (r'\bwith lettuce and tomatoes\b', 'with tomatoes and olives', 'lettuce no esta en YLE'),
    (r'\bdinner – yum!', 'dinner – delicious!', 'yum no esta en YLE'),
    (r'\byum\b', 'delicious', 'yum no esta en YLE'),
    (r'\bThree altogether\b', 'Three', 'altogether no esta en YLE'),
    (r'\baltogether\b', 'in all', 'altogether no esta en YLE'),
    (r'\bto be comfortable\b', 'to be soft', 'comfortable no esta en YLE'),
    (r'\bcomfortable\b', 'soft', 'comfortable no esta en YLE'),
    (r'\bThis covers your floor\b', 'This goes on your floor', 'cover no esta en YLE'),
    (r'\bmake a mess with\b', 'make dirty with', 'mess no esta en YLE'),
    (r'\bblow this\b', 'use this', 'blow no esta en YLE'),
    (r'\bI go to karate\b', 'I do a sport', 'karate no esta en YLE'),
    (r'\bkarate\b', 'sport', 'karate no esta en YLE'),
    (r'\bchildren maximum\b', 'children', 'maximum no esta en YLE'),
    (r'\bnervous\b', 'worried', 'nervous no esta en YLE'),
    (r'\bperfectly\b', 'very well', 'perfectly no esta en YLE'),
    (r'\bwill continue until\b', 'will not stop until', 'continue no esta en YLE'),
    (r'\bthe local radio\b', 'the radio', 'local no esta en YLE'),
    (r'\blocal\b', '', 'local no esta en YLE'),
    (r"\bthe reporter's name\b", "the woman's name", 'reporter no esta en YLE'),
    (r"\breporter's\b", "woman's", 'reporter no esta en YLE'),
    (r'\bthe sun will shine\b', 'the sun will come out', 'shine no esta en YLE'),
    (r'\bit was really snowy all day\b', 'it snowed all day', 'snowy no esta en YLE'),
    (r'\bsnowy\b', 'snowing', 'snowy no esta en YLE'),
    (r'\bterribly\b', 'very', 'terribly no esta en YLE'),
    (r'\bthick fog\b', 'a lot of fog', 'thick no esta en YLE'),
]


def cambia_patrones(t):
    # el JSON usa el apostrofe tipografico ’, asi que los patrones aceptan los dos
    for pat, nuevo, _ in PATRONES:
        t = re.sub(pat.replace(chr(39), '[' + chr(39) + chr(8217) + ']'), nuevo, t)
    return re.sub(r'  +', ' ', t)


def cambia_palabras(t):
    """Las de valor vacio se borran; el resto se sustituyen, respetando mayuscula."""
    borrar = [w for w, v in UNO_A_UNO.items() if not v]
    cambiar = {w: v for w, v in UNO_A_UNO.items() if v}
    if borrar:
        t = re.sub(r'\b(' + '|'.join(sorted(borrar, key=len, reverse=True)) + r')\b ', '', t, flags=re.I)
    def rep(m):
        w = m.group(0); nueva = cambiar[w.lower()]
        return nueva[0].upper() + nueva[1:] if w[0].isupper() else nueva
    pat = r'\b(' + '|'.join(sorted(cambiar, key=len, reverse=True)) + r')\b'
    return re.sub(pat, rep, t, flags=re.I)


def main():
    check = '--check' in sys.argv
    rehacer = {}
    for f in sorted(glob.glob(os.path.join(DIR, 'test-*.json'))):
        n = int(re.search(r'test-(\d+)', f).group(1))
        crudo = io.open(f, encoding='utf-8').read()
        antes = crudo
        crudo = cambia_patrones(crudo)
        crudo = cambia_palabras(crudo)
        crudo = re.sub(r' +([,.!?])', r'\1', crudo)      # espacios sueltos que dejan los borrados
        if crudo == antes: continue
        d, viejo = json.loads(crudo), json.loads(antes)
        partes = sorted(pk for pk, evs in (d.get('audio') or {}).items()
                        if viejo.get('audio', {}).get(pk) != evs)
        if partes: rehacer[n] = partes
        print('test %2d: reescrito%s' % (n, ' · audio: ' + ', '.join(partes) if partes else ''))
        if not check:
            io.open(f, 'w', encoding='utf-8', newline='').write(crudo)
    if rehacer and not check:
        print('\n  for n in %s; do python yle/tools/gen_yle_audio.py flyers $n; done'
              % ' '.join(str(n) for n in sorted(rehacer)))


if __name__ == '__main__':
    main()
