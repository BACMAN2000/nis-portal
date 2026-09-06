# -*- coding: utf-8 -*-
"""Segunda vuelta del vocabulario de Flyers: la cola larga.

Despues de la primera pasada quedaban 212 palabras fuera de la word list, casi
todas de una sola aparicion: vocabulario propio del tema de cada test (el circo,
los bomberos, la feria de ropa, el campamento). No hay patrones que las agrupen,
asi que van una a una, con su frase.

La regla es la de siempre: la palabra nueva tiene que estar en la lista acumulada
de YLE y la respuesta correcta no puede cambiar. Cuando no hay equivalente, se
reescribe la frase para que no la necesite.

    python yle/tools/lexico_flyers2.py --check
    python yle/tools/lexico_flyers2.py
"""
import io, os, re, sys, json, glob

AQUI = os.path.dirname(os.path.abspath(__file__))
DIR = os.path.join(os.path.dirname(os.path.dirname(AQUI)), 'yle', 'flyers')

# (patron, sustituto). El apostrofe recto casa tambien con el tipografico.
CAMBIOS = [
    # — animales y naturaleza —
    (r'\beats bamboo in China\b', 'eats plants in China'),
    (r'\ba squirrel\b', 'a rabbit'), (r'\bsquirrel\b', 'rabbit'),
    (r'\ba peacock\b', 'a parrot'), (r'\bpeacock\b', 'parrot'),
    (r'\bguinea pigs, birds and fish\b', 'birds and fish'),
    (r'\bMost popular animal: hamster\b', 'Most popular animal: rabbit'),
    (r'\bhamster\b', 'rabbit'),
    (r'\bThey are mammals, like people and dogs\.', 'They are like people and dogs.'),
    (r'\bmakes webs to catch flies\b', 'makes homes to catch flies'),
    (r'\ba sore paw\b', 'a sore leg'),
    (r'\bwags its tail\b', 'moves its tail'),
    (r'\bgreen and yellow feathers\b', 'green and yellow wings'),
    (r'\bthat can copy words\b', 'that can say words'),
    (r'\ba red collar\b', 'a red ring'),
    (r'\ba tiny brown puppy\b', 'a very small brown puppy'), (r'\btiny\b', 'very small'),
    (r'\bthe puppy belonged to\b', 'the puppy was'),
    # — comida —
    (r'\beggs with bacon and beans\b', 'eggs with beans'),
    (r'\bthe chef makes it\b', 'the cook makes it'), (r'\bchef\b', 'cook'),
    (r'\bExcellent choice\b', 'Very good'), (r'\bchoice\b', 'idea'),
    (r'\bsweet bread __\(5\)__ churros\b', 'sweet bread __(5)__ sugar'),
    (r'\bchurros\b', 'sweet bread'),
    (r'\bporridge from corn or other grains\b', 'hot cereal from rice'),
    (r'\bporridge\b', 'hot cereal'), (r'\bcorn\b', 'rice'), (r'\bgrains\b', 'rice'),
    (r'\bapples, crisps and\b', 'apples, biscuits and'), (r'\bcrisps\b', 'biscuits'),
    (r'\ba cucumber\b', 'a carrot'), (r'\bcucumber\b', 'carrot'),
    (r'\ba melon\b', 'a watermelon'), (r'\bmelon\b', 'watermelon'),
    (r'\ba mushroom\b', 'an onion'), (r'\bmushrooms\b', 'onions'), (r'\bmushroom\b', 'onion'),
    (r'\bSmall, medium or large glass\b', 'Small or large glass'), (r'\bmedium\b', 'small'),
    (r'\bgrows in bunches\b', 'grows in groups'),
    (r'\ba big bunch of flowers\b', 'a lot of flowers'), (r'\bbunch\b', 'lot'),
    (r'\ba ball with the dough\b', 'a ball with the bread'), (r'\bdough\b', 'bread'),
    (r'\blots of ingredients, like\b', 'lots of things, like'), (r'\bingredients\b', 'things'),
    (r'\ba ham sandwich\b', 'a cheese sandwich'), (r'\bham\b', 'cheese'),
    (r'\bstrawberry tarts\b', 'strawberry cakes'), (r'\btarts\b', 'cakes'),
    (r'\bsome popcorn\b', 'some biscuits'), (r'\bpopcorn\b', 'biscuits'),
    (r'\btea, toast and flowers\b', 'tea, bread and flowers'), (r'\btoast\b', 'bread'),
    (r'\byellow and sour\b', 'yellow and not sweet'), (r'\bsour\b', 'not sweet'),
    (r'\bsharp leaves on top\b', 'long leaves on top'),
    (r'\bbig, round or oval\b', 'big and round'), (r'\boval\b', 'round'),
    (r'\btasty\b', 'delicious'),
    (r'\bhis lunchbox at home\b', 'his lunch at home'), (r'\blunchbox\b', 'lunch bag'),
    # — deporte —
    (r'\ba football match against another school\b', 'a football match with another school'),
    (r'\bagainst\b', 'with'),
    (r'\bplaying in attack\b', 'playing in front'), (r'\battack\b', 'front'),
    (r'\bwe breathe lots\b', 'we take lots'), (r'\bbreathe\b', 'take air'),
    (r'\bbones\b', 'body'), (r'\bmuscles\b', 'body'),
    (r'\bwhere people do exercise\b', 'where people do sport'), (r'\bexercise\b', 'sport'),
    (r'\bswimming, tennis, judo, football\b', 'swimming, tennis, golf, football'), (r'\bjudo\b', 'golf'),
    (r'\ba tennis court\b', 'a tennis ground'), (r'\bcourt\b', 'ground'),
    (r'\ba hockey stick\b', 'a hockey bat'), (r'\bhockey stick\b', 'hockey bat'),
    (r'\bA long piece of string you can jump with\b', 'A long thing you can jump with'),
    (r'\bTeachers and referees use this\b', 'Teachers use this'), (r'\breferees\b', 'teachers'),
    (r'\beveryone cheers\b', 'everyone claps'), (r'\bcheers\b', 'claps'),
    (r'\bthe judges said\b', 'the teachers said'), (r'\bjudges\b', 'teachers'),
    (r'\bpractising shooting\b', 'practising football'), (r'\bshooting\b', 'football'),
    (r'\ba new sports area\b', 'a new sports ground'),
    (r'\ba game you played recently\b', 'a game you played last week'),
    (r'\bother __\(7\)__ types of sport\b', 'other __(7)__ kinds of sport'), (r'\btypes\b', 'kinds'),
    # — bomberos, medicos, oficios —
    (r'\bfirefighters\b', 'fire fighters'), (r'\bfirefighter\b', 'fire fighter'),
    (r'\bTo become a fire fighter\b', 'To be a fire fighter'), (r'\bbecome\b', 'be'),
    (r'\bspecial ladders\b', 'special stairs'), (r'\bladders\b', 'stairs'),
    (r'\bprotect them from the heat\b', 'keep them safe from the fire'),
    (r'\bprotect\b', 'keep safe'), (r'\bthe heat\b', 'the fire'),
    (r'\bThey also rescue animals\b', 'They also help animals'), (r'\brescue\b', 'help'),
    (r'\bare stuck in\b', 'need help in'), (r'\bstuck\b', 'lost'),
    (r'\bTheir main work\b', 'Their most important work'),
    (r'\bdanger\b', 'problem'),
    (r"\bI don't like blood\b", "I don't like hospitals"), (r'\bblood\b', 'hospitals'),
    (r'\bThis person checks your teeth\b', 'This person looks at your teeth'), (r'\bchecks\b', 'looks at'),
    (r'\barrives at her clinic\b', 'arrives at her hospital'), (r'\bclinic\b', 'hospital'),
    (r'\bThe happy owner thanks\b', 'The happy family thanks'),
    (r"\bthe café owner's dog\b", 'the café dog'), (r"\bowner's\b", "family's"), (r'\bowner\b', 'family'),
    (r'\bgave him a sticker\b', 'gave him a small present'), (r'\bsticker\b', 'small present'),
    (r'\bMy mum is my hero\b', 'My mum is the best'), (r'\bhero\b', 'best'),
    (r'\bA young animal doctor\b', 'A young animal doctor'),
    (r'\bA day in the life of a animal doctor\b', 'A day with an animal doctor'),
    (r'\bin the life of\b', 'with'),
    (r'\bto bake bread\b', 'to make bread'), (r'\bbake\b', 'make'),
    (r'\bto be a baker\b', 'to make bread in a shop'), (r'\bbaker\b', 'bread man'),
    (r'\bHow many loaves of bread does he make\b', 'How much bread does he make'),
    (r'\b100 loaves of bread\b', '100 breads'), (r'\bloaves\b', 'breads'),
    (r'\bshe serves the customers\b', 'she helps the people'),
    (r'\bserves the customers\b', 'helps the people'), (r'\bcustomers\b', 'people'),
    (r'\bshe served more than\b', 'she helped more than'), (r'\bserved\b', 'helped'),
    (r'\bdid she serve\b', 'did she help'), (r'\bserve\b', 'help'),
    (r'\bvery proud of him\b', 'very happy for him'), (r'\bproud\b', 'happy'),
    (r'\bthe plant proudly\b', 'the plant happily'), (r'\bproudly\b', 'happily'),
    (r"\bthe worker's job\b", "the man's job"), (r"\bworker's\b", "man's"), (r'\bTwo workers\b', 'Two men'),
    (r'\bworkers\b', 'men'),
    (r'\ba babysitter\b', 'a girl who looks after children'), (r'\bbabysitter\b', 'girl'),
    (r'\bMy daily day\b', 'My day'), (r'\bdaily\b', 'every day'),
    (r'\bhis alarm clock rings\b', 'his clock rings'), (r'\balarm\b', ''),
    (r'\ba stethoscope\b', 'a bag'), (r'\bstethoscope\b', 'bag'),
    (r'\bdriven\b', 'drive'),
    # — viajes —
    (r'\bTravel agency\b', 'Travel shop'), (r'\bagency\b', 'shop'),
    (r'\bthe agent is\b', 'the woman is'), (r'\bagent\b', 'woman'),
    (r'\bFIVE travellers in a queue\b', 'FIVE people waiting'),
    (r'\btravellers\b', 'people'), (r'\bqueue\b', 'line'),
    (r'\blots of luggage\b', 'lots of suitcases'), (r'\bluggage\b', 'suitcases'),
    (r'\ba passport\b', 'a ticket'), (r'\bpassport\b', 'ticket'),
    (r'\bA car you pay to take you somewhere fast\b', 'A car that takes you somewhere fast'),
    (r'\ba special carriage\b', 'a special part'), (r'\bcarriage\b', 'part'),
    (r'\bwithout moving forward\b', 'and it stays in the same place'), (r'\bforward\b', 'on'),
    (r'\ba tunnel\b', 'a bridge'), (r'\btunnel\b', 'bridge'),
    (r'\bthe lighthouse\b', 'the old building'), (r'\blighthouse\b', 'old building'),
    (r'\b4-star lodge\b', '4-star hotel'), (r'\blodge\b', 'hotel'),
    (r'\bhiking, fishing, biking\b', 'walking, fishing, cycling'),
    (r'\bhiking\b', 'walking'), (r'\bbiking\b', 'cycling'),
    (r'\bwe rented bikes\b', 'we took bikes'), (r'\brented\b', 'took'),
    (r'\bthe sea was rougher\b', 'the sea was bad'), (r'\brougher\b', 'bad'),
    (r"\bIt's exactly opposite\b", "It's opposite"), (r'\bexactly\b', ''),
    (r'\bwas really cute\b', 'was really lovely'), (r'\bcute\b', 'lovely'),
    (r'\bholiday transport\b', 'holiday journey'), (r'\btransport\b', 'journey'),
    (r'\bWe can deliver on\b', 'We can bring it on'), (r'\bdeliver\b', 'bring'),
    (r'\bA man is ordering from\b', 'A man is buying from'), (r'\bordering\b', 'buying'),
    # — fiestas y espectaculos —
    (r'\bacrobats in tight blue suits\b', 'circus people in blue clothes'),
    (r'\bacrobats\b', 'circus people'), (r'\ban acrobat\b', 'a circus person'), (r'\bacrobat\b', 'circus person'),
    (r'\btight blue suits\b', 'blue clothes'), (r'\bsuits\b', 'clothes'), (r'\btight\b', 'small'),
    (r'\bwe saw dancers\b', 'we saw people dancing'), (r'\bdancers\b', 'people dancing'),
    (r'\bHe told jokes\b', 'He told funny stories'), (r'\bjokes\b', 'funny stories'),
    (r'\bthe presenter\b', 'the teacher'), (r'\bpresenter\b', 'teacher'),
    (r'\bmatching outfits with stars\b', 'the same dresses with stars'),
    (r'\bMy school organised\b', 'My school had'), (r'\borganised\b', 'had'),
    (r"\bit's more elegant\b", "it's more beautiful"), (r'\belegant\b', 'beautiful'),
    (r'\ba smart party or a casual one\b', 'a special party or an easy one'),
    (r'\bsmart\b', 'special'), (r'\bcasual\b', 'easy'),
    (r'\bmany jumpers\b', 'many dresses'), (r'\bjumpers\b', 'dresses'),
    (r'\bgolden shoes\b', 'gold shoes'), (r'\bgolden\b', 'gold'),
    (r'\bwith small heels\b', 'for parties'), (r'\bheels\b', 'party shoes'),
    (r'\bearrings\b', 'a necklace'),
    (r'\bit goes around the waist\b', 'it goes around your body'), (r'\bwaist\b', 'body'),
    (r"\ba witch's costume\b", 'a monster costume'), (r"\bwitch's\b", "monster's"),
    (r'\bbe a vampire, with a black cape\b', 'be a monster, with a black coat'),
    (r'\bvampire\b', 'monster'), (r'\bcape\b', 'coat'),
    (r'\bmy feet have grown a lot\b', 'my feet are bigger now'), (r'\bgrown\b', 'bigger'),
    (r'\bfive dresses on a rack\b', 'five dresses on a shelf'), (r'\brack\b', 'shelf'),
    (r'\ba cashier with glasses\b', 'a woman with glasses'), (r'\bcashier\b', 'woman'),
    (r'\bIs there a sale\b', 'Is it cheap'), (r'\bsale\b', 'cheap day'),
    (r'\bMost popular item\b', 'Most popular thing'), (r'\bitem\b', 'thing'),
    (r'\bdid they raise\b', 'did they get'), (r'\braise\b', 'get'),
    (r'\bI will keep it forever\b', 'I will keep it always'), (r'\bforever\b', 'always'),
    (r'\bshe doesn.t notice\b', "she doesn't see it"), (r'\bnotice\b', 'see'),
    (r'\ba photo album\b', 'a photo book'), (r'\balbum\b', 'book'),
    (r'\bthe talent show\b', 'the school show'), (r'\btalent\b', 'school'),
    (r'\bdid a magic trick and made a coin disappear\b',
     'did something funny and made a key disappear'),
    (r'\bmagic trick\b', 'funny trick'), (r'\bmagic\b', 'funny'), (r'\bcoin\b', 'key'),
    (r'\bfame\b', 'famous'),
    (r'\bfull of joy\b', 'full of fun'), (r'\bjoy\b', 'fun'),
    (r'\ba special event\b', 'a special day'), (r'\bspecial events\b', 'special days'),
    (r'\bevents\b', 'days'), (r'\bevent\b', 'day'),
    (r'\bYou receive this piece of paper\b', 'You get this piece of paper'), (r'\breceive\b', 'get'),
    (r'\bpeople celebrate special days\b', 'people have parties on special days'),
    (r'\bcelebrate\b', 'have a party'),
    (r'\bto decorate a birthday cake\b', 'to paint a birthday cake'),
    (r'\bdecorates the living room\b', 'paints the living room'),
    (r'\bdecorations\b', 'paintings'), (r'\bdecorating\b', 'painting'),
    (r'\bdecoration\b', 'painting'), (r'\bdecorates\b', 'paints'), (r'\bdecorate\b', 'paint'),
    (r'\bblows out the lights\b', 'puts out the lights'),
    (r'\bYou blow air into this\b', 'You put air into this'), (r'\bblows\b', 'puts'), (r'\bblow\b', 'put'),
    (r'\blights that explode in the sky\b', 'lights that go up in the sky'), (r'\bexplode\b', 'go up'),
    (r'\bsmall oil __\(7\)__\b', 'small __(7)__'), (r'\boil\b', ''),
    (r'\bunder cherry trees\b', 'under the trees'), (r'\bcherry\b', ''),
    (r'"trick or treat!"', '"Happy Halloween!"'), (r'\btreat\b', 'sweet'), (r'\btrick\b', 'game'),
    (r'\bhas its own party\b', 'has a different party'),
    (r'\ba ribbon\b', 'paper'), (r'\bribbon\b', 'paper'),
    (r'\bto tie a beautiful present\b', 'on a beautiful present'),
    (r'\bBirthday planning\b', 'Birthday party'),
    # — colegio y casa —
    (r'\ba calculator\b', 'a computer'), (r'\bcalculator\b', 'computer'),
    (r'\bto rub out mistakes\b', 'to take out mistakes'), (r'\brub\b', 'take'),
    (r'\bThey returned to school\b', 'They went back to school'), (r'\breturned\b', 'went back'),
    (r'\bWho was the leader\b', 'Who was the teacher'), (r'\bleader\b', 'teacher'),
    (r'\ba garage\b', 'a car park'), (r'\bgarage\b', 'car park'),
    (r'\bon the pillow\b', 'on the bed'), (r'\bpillow\b', 'bed'),
    (r'\binteresting objects\b', 'interesting things'), (r'\bobjects\b', 'things'),
    (r'\bmade a huge mess in\b', 'made everything dirty in'), (r'\bmess\b', 'dirty'),
    (r'\bthe boy covers his ears\b', 'the boy puts his hands on his ears'),
    (r'\bto cover your hands\b', 'to keep your hands warm'), (r'\bcovers\b', 'goes on'), (r'\bcover\b', 'keep warm'),
    (r'\bOur whole family\b', 'All our family'),
    (r'\beverybody clapped\b', 'everyone clapped'), (r'\beverybody\b', 'everyone'),
    (r'\bmaybe the piano\b', 'perhaps the piano'), (r'\bmaybe\b', 'perhaps'),
    (r'\bkayaking\b', 'sailing'), (r'\barchery\b', 'painting'),
    (r'\baround the campfire\b', 'around the fire'), (r'\bcampfire\b', 'fire'),
    (r'\bfavourite activity\b', 'favourite thing to do'), (r'\bactivity\b', 'thing to do'),
    (r'\bFive for adults\b', 'Five for grown-ups'), (r'\badults\b', 'grown-ups'),
    (r'\bdancing indoors\b', 'dancing inside'), (r'\bindoors\b', 'inside'),
    (r'\ba small shelter\b', 'a small building'), (r'\bshelter\b', 'building'),
    (r"\bshe'll love them\b", 'she will love them'),
    # — tiempo —
    (r'\bthat becomes hard when\b', 'that gets hard when'), (r'\bbecomes\b', 'gets'),
    (r'\bpieces of frozen water\b', 'pieces of ice'), (r'\bfrozen\b', 'cold'),
    (r'\bstarts to rain heavily\b', 'starts to rain a lot'), (r'\bheavily\b', 'a lot'),
    (r'\bNear the equator\b', 'In hot countries'), (r'\bequator\b', 'hot countries'),
    (r'\bthe snow started to melt\b', 'the snow started to go'), (r'\bmelt\b', 'go'),
    (r'\bwater or mud\b', 'water or dirty ground'), (r'\bmud\b', 'dirty ground'),
    (r'\bA sudden storm\b', 'A big storm'), (r'\bsudden\b', 'big'),
    (r'\bthe temperature normally\b', 'the temperature usually'), (r'\bnormally\b', 'usually'),
    (r'\b12 noon\b', '12 midday'), (r'\bnoon\b', 'midday'),
    (r'\bWeather report\b', 'Weather news'),
    (r'\bsnowflakes\b', 'snow'), (r'\blightning\b', 'storm'), (r'\bthunder\b', 'storm'),
    (r'\bsandals\b', 'shoes'),
    (r'\bto slide down\b', 'to go down'), (r'\bslide\b', 'go down'),
    (r'\bto the seaside\b', 'to the beach'), (r'\bseaside\b', 'beach'),
    (r'\bfresher\b', 'colder'), (r'\bfreshly\b', 'newly'), (r'\bfresh\b', 'cold'),
    (r'\bfree\b', 'no money'),
    (r'\busual\b', 'the same'),
]


def main():
    check = '--check' in sys.argv
    rehacer = {}
    for f in sorted(glob.glob(os.path.join(DIR, 'test-*.json'))):
        n = int(re.search(r'test-(\d+)', f).group(1))
        crudo = io.open(f, encoding='utf-8').read()
        antes = crudo
        for pat, nuevo in CAMBIOS:
            crudo = re.sub(pat.replace(chr(39), '[' + chr(39) + chr(8217) + ']'), nuevo, crudo)
        crudo = re.sub(r'  +', ' ', crudo)
        crudo = re.sub(r' +([,.!?])', r'\1', crudo)
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
