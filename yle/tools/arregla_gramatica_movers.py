# -*- coding: utf-8 -*-
"""Saca de los examenes de Movers la gramatica que es de Flyers.

El filtro de vocabulario se paso a los tests, pero el de gramatica no existia
hasta hoy, asi que en Movers se colaron tres estructuras que la Grammar and
Structures List situa en A2 Flyers: el past continuous, el «be going to» de
futuro y el «will». Un nino de A1 Movers no las ha visto todavia.

Aqui se reescribe cada pasaje con gramatica del nivel —past simple, present
simple, «want to» + infinitivo, «can», «must»— cuidando que la respuesta
correcta del item siga siendo la misma. Los cambios que tocan la clave "audio"
obligan a regenerar el mp3 de esa parte:

    python yle/tools/arregla_gramatica_movers.py            # aplica y dice que audio hay que rehacer
    python yle/tools/arregla_gramatica_movers.py --check    # solo comprueba que las anclas existen
"""
import io, os, sys, json

AQUI = os.path.dirname(os.path.abspath(__file__))
RAIZ = os.path.dirname(os.path.dirname(AQUI))
DIR = os.path.join(RAIZ, 'yle', 'movers')

# test -> [(texto viejo, texto nuevo, por que)]
PARCHES = {
 1: [
  ("Last Tuesday, it was raining and the road was very wet.",
   "Last Tuesday, the weather was rainy and the road was very wet.",
   "past continuous -> adjetivo; la respuesta del item sigue siendo rainy/wet"),
  ("The puppy was hiding under a big ___.",
   "The puppy hid under a big ___.",
   "past continuous -> past simple"),
  ("At the farm, the farmer's wife, Mrs Field, was looking for something.",
   "At the farm, the farmer's wife, Mrs Field, looked for something.",
   "past continuous -> past simple"),
  ("Your lunch and a hat. It's going to be very sunny.",
   "Your lunch and a hat. It's very sunny today.",
   "AUDIO p2: be going to -> present simple"),
  ("No, Dad. The pandas were sleeping. But I saw a kangaroo! It was jumping.",
   "No, Dad. The pandas slept all day. But I saw a kangaroo! It jumped very high.",
   "AUDIO p4: past continuous -> past simple"),
 ],
 2: [
  ("'Next year I'm going to win!'", "'Next year I want to win!'",
   "be going to -> want + infinitivo, que si es de Movers"),
  ("No, the cows were in the field, very far away. And the sheep were sleeping.",
   "No, the cows were in the field, very far away. And the sheep slept under a tree.",
   "AUDIO p4: past continuous -> past simple"),
 ],
 3: [
  ("Great! I'll come back then.", "Great! I can come back then.",
   "will -> can, que ya esta en Starters"),
 ],
 4: [
  ("Charlie and his parents were going on holiday to the seaside.",
   "Charlie and his parents went on holiday to the seaside.",
   "past continuous -> past simple"),
  ("At the seaside station, a woman in a blue uniform was waiting for them.",
   "At the seaside station, a woman in a blue uniform waited for them.",
   "past continuous -> past simple"),
  ("The woman at the station was wearing a blue ___.",
   "The woman at the station wore a blue ___.",
   "past continuous -> past simple; la respuesta sigue siendo uniform"),
  ("That's Nick. He was saying 'The train is late!'",
   "That's Nick. He said 'The train is late!'",
   "AUDIO p1: past continuous -> past simple"),
  ("No, I've got sunglasses. I'm going to buy a hat. A big one.",
   "No, I've got sunglasses. I want to buy a hat. A big one.",
   "AUDIO p4: be going to -> want + infinitivo"),
 ],
 5: [
  ("He was playing with his ball before.", "He played with his ball before.",
   "AUDIO p4: past continuous -> past simple"),
 ],
 6: [
  ("Two o'clock. I'll go at eleven.", "Two o'clock. I can go at eleven.",
   "AUDIO p2: will -> can"),
 ],
 7: [
  ("No, Miss Green says we must wear our boots, because we're going to walk in the countryside.",
   "No, Miss Green says we must wear our boots, because we walk in the countryside.",
   "AUDIO p2: be going to -> present simple"),
 ],
 8: [
  ("What are you going to do this afternoon?", "What do you want to do this afternoon?",
   "be going to -> want + infinitivo"),
  ("I'm going to swim in the river.", "I want to swim in the river.",
   "be going to -> want + infinitivo; sigue siendo la respuesta correcta"),
  ("She was sleeping and she didn't want to come out.",
   "She slept in it and she didn't want to come out.",
   "past continuous -> past simple"),
 ],
 9: [
  ("Take your boots too. It's going to rain.", "Take your boots too. The path is very wet.",
   "be going to -> present simple"),
  ("OK, I'll take it.", "OK, I can take them.",
   "will -> can, y en plural porque habla de las botas"),
  ("One windy afternoon, Kim was walking next to the river with her brother.",
   "One windy afternoon, Kim walked next to the river with her brother.",
   "past continuous -> past simple"),
  ("Kim was walking next to the ___ with her brother.",
   "Kim walked next to the ___ with her brother.",
   "past continuous -> past simple; la respuesta sigue siendo river"),
  ("The weather is going to be:", "The weather today:",
   "be going to en la ficha; hay que rehacer tambien el audio de p2"),
  ("Is it going to rain?", "Is the weather bad today?",
   "AUDIO p2: be going to -> present simple"),
  ("No, it's going to be hot. Very hot!", "No, it's hot today. Very hot!",
   "AUDIO p2: be going to -> present simple"),
  ("My jacket isn't warm. I'm going to wear my big coat.",
   "My jacket isn't warm. I want to wear my big coat.",
   "AUDIO p4: be going to -> want + infinitivo"),
 ],
 10: [
  ("One wet afternoon, Ben was helping his grandmother in her house.",
   "One wet afternoon, Ben helped his grandmother in her house.",
   "past continuous -> past simple"),
  ("Ben was helping his ___ in her house.", "Ben helped his ___ in her house.",
   "past continuous -> past simple; la respuesta sigue siendo grandmother"),
  ("Ben is going to learn the:", "Ben wants to learn the:",
   "be going to -> want + infinitivo; hay que rehacer tambien el audio de p2"),
  ("Which teacher is going to help you?", "Which teacher helps you?",
   "AUDIO p2: be going to -> present simple"),
 ],
}


def main():
    check = '--check' in sys.argv
    rehacer = {}
    for n, lista in sorted(PARCHES.items()):
        ruta = os.path.join(DIR, 'test-%02d.json' % n)
        crudo = io.open(ruta, encoding='utf-8').read()
        antes = crudo
        for viejo, nuevo, _ in lista:
            # el JSON guarda los apostrofes tipograficos: se prueban las dos formas
            for v, w in ((viejo, nuevo), (viejo.replace("'", '’'), nuevo.replace("'", '’'))):
                if v in crudo:
                    crudo = crudo.replace(v, w); break
            else:
                print('  !! test %d: no encuentro «%s»' % (n, viejo[:60]))
        if crudo == antes:
            print('test %2d: sin cambios' % n); continue
        d = json.loads(crudo)   # que siga siendo JSON valido
        partes = set()
        for pk, evs in (d.get('audio') or {}).items():
            viejo_json = json.loads(antes).get('audio', {}).get(pk)
            if viejo_json != evs: partes.add(pk)
        if partes: rehacer[n] = sorted(partes)
        print('test %2d: %d pasajes reescritos%s' % (n, len(lista), ' · audio a rehacer: ' + ', '.join(sorted(partes)) if partes else ''))
        if not check:
            io.open(ruta, 'w', encoding='utf-8', newline='').write(crudo)
    if rehacer:
        print('\nRegenerar audio:')
        for n, ps in sorted(rehacer.items()):
            print('  python yle/tools/gen_yle_audio.py movers %d   # partes %s' % (n, ', '.join(ps)))


if __name__ == '__main__':
    main()
