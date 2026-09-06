# -*- coding: utf-8 -*-
"""El ultimo test de Movers con vocabulario fuera de nivel: el 2.

Va de una competicion de natacion y de un partido de futbol, y «race»,
«competition», «team», «match», «win» y «score» no existen en A1 Movers. No hace
falta cambiar de tema —el deporte si es del nivel: la lista trae «goal»,
«player», «practise», «sports centre», «swimming pool», «cup»—, pero si hay que
contarlo con esas palabras y no con las del comentarista.

Asi que la carrera de bicis pasa a ser un paseo, la competicion de natacion un
«swimming day», el partido de Daisy un «football day», ganar es «be first» y
marcar es «get a goal». Las respuestas de los items no cambian.

    python yle/tools/lexico_movers_t2.py --check
    python yle/tools/lexico_movers_t2.py
"""
import io, os, re, sys, json

AQUI = os.path.dirname(os.path.abspath(__file__))
RUTA = os.path.join(os.path.dirname(os.path.dirname(AQUI)), 'yle', 'movers', 'test-02.json')

CAMBIOS = [
    # la carrera de bicis pasa a ser un paseo en bici
    ('had a bike __(0)__ in the park', 'went for a bike __(0)__ in the park'),
    ('"race"', '"ride"'),
    ('"The bike race"', '"The bike ride"'),
    ('Peter wanted to win.', 'Peter wanted to be first.'),
    ('because he was in a hurry', 'because he wanted to go quickly'),
    # la competicion de natacion pasa a ser un dia de natacion
    ('The swimming competition', 'The swimming day'),
    ('There is a competition next Saturday.', 'There is a swimming day next Saturday.'),
    ('The competition was on the next ___.', 'The swimming day was on the next ___.'),
    ('She wants to skate in a competition one day.', 'She wants to skate in a big show one day.'),
    ("There were ___ children in Jim's race.", "There were ___ children in Jim's group."),
    ('In the race, Jim came ___.', 'In the swimming, Jim came ___.'),
    ('The race started.', 'The swimming started.'),
    ('Jim swam as quickly as he could.', 'Jim swam very quickly.'),
    ("He didn't win, but he came third", "He wasn't first, but he came third"),
    ("'Next year I want to win!'", "'Next year I want to be first!'"),
    ('gave him a big hug.', 'gave him a big smile.'),
    ('Jim was in the race with five other children.', 'Jim was in the water with five more children.'),
    # el partido de Daisy pasa a ser su dia de futbol
    ("Daisy's football match", "Daisy's football day"),
    ('It’s the day of the big match', 'It’s the day of the big game'),
    ("It's the day of the big match", "It's the day of the big game"),
    ('The match starts.', 'The game starts.'),
    ('with her team', 'with her friends'),
    ('Her team wins and everybody is very happy.', 'Her friends are very happy.'),
    ('Her team wins and everyone is very happy.', 'Her friends are very happy.'),
    ('Daisy kicks the ball and scores a goal!', 'Daisy kicks the ball and gets a goal!'),
    ('His team is called the Red Stars.', 'He plays with the Red Stars.'),
    ("I don't like teams.", "I don't like ball games."),
    # sueltos
    ('Do you want to come to the swimming club?', 'Do you want to come to the swimming lessons?'),
    ('Day of the swimming club:', 'Day of the swimming lessons:'),
    ('Swimming club', 'Swimming lessons'),
    ('At half past four. Four thirty.', 'At four thirty.'),
    ('At half past five.', 'At five thirty.'),
    ('And when does it finish?', 'And when does it end?'),
    ('She swims for an hour every Saturday morning.', 'She swims every Saturday morning.'),
    ("It's like tennis, but the ball has got feathers and it's very light.",
     "It's like tennis, but the ball is very small and soft."),
    ('You use this to dry your body after swimming.', 'You take this to dry your body after swimming.'),
    ('No, that’s tomorrow.', 'No, that’s on Sunday.'),
    ("No, that's tomorrow.", "No, that's on Sunday."),
    ('My hat flew away!', 'My hat flew!'),
    # el texto de las ballenas
    ('to come up to the top of the water to breathe', 'to come up to the top of the water for air'),
    ('Whales can swim __(3)__ long way.', 'Whales can swim __(3)__ long time.'),
    ('Some whales travel thousands of kilometres every year to find hot water.',
     'Some whales travel every year to find hot water.'),
    ("Whales 'sing' to talk to __(4)__ other.", "Whales 'sing' to talk to __(4)__ friends."),
]


def main():
    check = '--check' in sys.argv
    crudo = io.open(RUTA, encoding='utf-8').read()
    antes = crudo
    hechos = fallos = 0
    for viejo, nuevo in CAMBIOS:
        for v, w in ((viejo, nuevo), (viejo.replace("'", '’'), nuevo.replace("'", '’'))):
            if v in crudo:
                crudo = crudo.replace(v, w); hechos += 1; break
        else:
            fallos += 1
            print('  !! no encuentro «%s»' % viejo[:60])
    d, viejo_d = json.loads(crudo), json.loads(antes)
    partes = sorted(pk for pk, evs in (d.get('audio') or {}).items()
                    if viejo_d.get('audio', {}).get(pk) != evs)
    print('test 2: %d/%d cambios%s' % (hechos, len(CAMBIOS), ' · audio: ' + ', '.join(partes) if partes else ''))
    if not check:
        io.open(RUTA, 'w', encoding='utf-8', newline='').write(crudo)
        if partes: print('\n  python yle/tools/gen_yle_audio.py movers 2')


if __name__ == '__main__':
    main()
