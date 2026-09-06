# -*- coding: utf-8 -*-
"""Da a Starters las pausas que necesita un nino de Pre A1.

El Listening de Pre A1 Starters dura unos 20 minutos en el examen real. El
nuestro se quedaba entre 11,6 y 15,2 (los tests 6-10, los ultimos escritos, eran
los mas cortos): las pausas estaban en 2 y 3,4 segundos, cuando en Movers ya son
de 3 a 10. Un nino de seis anos no une una linea, escribe un nombre deletreado
ni colorea un objeto en tres segundos.

Aqui se reescriben las pausas segun lo que la parte le pide hacer, no segun un
numero fijo. Las pausas del cuerpo cuentan dos veces, porque cada parte se oye
dos veces.

    python yle/tools/pausas_starters.py --report   # que duraria cada test
    python yle/tools/pausas_starters.py            # aplica y deja el audio por regenerar
"""
import io, os, sys, json, glob

AQUI = os.path.dirname(os.path.abspath(__file__))
RAIZ = os.path.dirname(os.path.dirname(AQUI))
DIR = os.path.join(RAIZ, 'yle', 'starters')

# segundos por pausa, segun lo que el nino tiene que hacer en esa parte
PAUSA = {
    'p1': 7,    # unir con una linea el nombre y la persona
    'p2': 10,   # escribir un nombre que le deletrean, o un numero
    'p3': 6,    # marcar una casilla entre tres dibujos
    'p4': 15,   # buscar el objeto en la lamina y colorearlo
}
CONSIGNA = 4    # despues de «Now you listen…», antes del primer item


def ajusta(evs, pk):
    """Las pausas cortas pasan a las del nivel; la de la consigna, aparte."""
    out, vista_consigna = [], False
    for e in evs:
        if e[0] != 'pause':
            out.append(e)
            if isinstance(e[1], str) and 'now you listen' in e[1].lower(): vista_consigna = True
            continue
        if not vista_consigna: out.append(['pause', CONSIGNA])
        else: out.append(['pause', PAUSA.get(pk, 5)])
    return out


def main():
    solo = '--report' in sys.argv
    for f in sorted(glob.glob(os.path.join(DIR, 'test-*.json'))):
        d = json.load(io.open(f, encoding='utf-8'))
        if not d.get('audio'): continue
        antes = sum(x[1] for evs in d['audio'].values() for x in evs if x[0] == 'pause')
        for pk in list(d['audio']): d['audio'][pk] = ajusta(d['audio'][pk], pk)
        ahora = sum(x[1] for evs in d['audio'].values() for x in evs if x[0] == 'pause')
        print('test %2d: pausas %3.0f s -> %3.0f s (unos +%.1f min con la repeticion)'
              % (d['number'], antes, ahora, (ahora - antes) * 2 / 60.0))
        if not solo:
            with io.open(f, 'w', encoding='utf-8', newline='') as fh:
                json.dump(d, fh, ensure_ascii=False, indent=1)
    if not solo:
        print('\nRegenerar el audio (el TTS esta cacheado, solo se remonta):')
        print('  python yle/tools/gen_yle_audio.py starters all')


if __name__ == '__main__':
    main()
