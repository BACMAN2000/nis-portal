# -*- coding: utf-8 -*-
"""Reparte las claves de las preguntas de opciones entre A, B, C y D.

    python exams/baraja_claves.py            # todos
    python exams/baraja_claves.py g9-u34     # una carpeta

Escribiendo un examen la respuesta buena sale siempre la primera, y el alumno
que lo nota deja de leer las otras opciones: en los Listening de los mocks el
57 % de las claves era la B, y en Fun for Nordic el 81 % era la A. El motor
ademas baraja al pintar, pero los datos tambien tienen que estar repartidos:
asi el examen impreso y la revision del profesor no ensenan ningun patron.

El barajado es determinista (semilla = nombre del archivo + numero de pregunta),
asi que dos pasadas dan el mismo resultado y el diff no cambia sin motivo.
"""
import io, json, os, random, sys

try:
    sys.stdout.reconfigure(encoding='utf-8')
except Exception:
    pass

AQUI = os.path.dirname(os.path.abspath(__file__))


def baraja(ruta):
    """Reparte a proposito, no al azar: barajar cada pregunta por su cuenta deja
    igualmente ocho claves en la A una vez de cada tantas. Aqui las posiciones
    destino se reparten por turnos (A, B, C, D, A, B...) sobre un orden barajado,
    asi que ningun examen puede quedar cargado hacia una letra."""
    d = json.load(io.open(ruta, encoding='utf-8'))
    nombre = os.path.basename(ruta)
    rnd = random.Random(nombre)
    conopts = [it for p in d.get('parts', []) for it in p.get('items', [])
               if 'opts' in it and 'ok' in it]
    turnos = []
    while len(turnos) < len(conopts):
        v = [0, 1, 2, 3]
        rnd.shuffle(v)
        turnos += v
    for it, destino in zip(conopts, turnos):
        opts = it['opts'][:]
        buena = opts.pop(it['ok'])
        rnd.shuffle(opts)
        destino = min(destino, len(opts))
        opts.insert(destino, buena)
        it['opts'] = opts
        it['ok'] = destino
    n = len(conopts)
    io.open(ruta, 'w', encoding='utf-8').write(
        json.dumps(d, ensure_ascii=False, indent=1) + '\n')
    return n


def main():
    carpetas = sys.argv[1:] or [c for c in sorted(os.listdir(AQUI))
                                if os.path.isdir(os.path.join(AQUI, c))]
    for c in carpetas:
        d = os.path.join(AQUI, c)
        for f in sorted(os.listdir(d)):
            if f.endswith('.json'):
                print('%s/%s: %d preguntas repartidas' % (c, f, baraja(os.path.join(d, f))))


if __name__ == '__main__':
    main()
