# -*- coding: utf-8 -*-
"""Deja listo el SQL para subir un examen de unidad a la base.

Los examenes NO se publican como archivos: el JSON lleva dentro las claves de
respuesta y el repo del portal es publico (la misma leccion que los tests YLE
el 6-sep-2026). Viven en `unit_exams`, y su RLS solo se los entrega al profesor,
al admin o al alumno que lo tiene abierto.

El guion del Listening se separa y va a `unit_exam_scripts`, que no lee ningun
alumno: dentro del examen serian las respuestas escritas.

El circuito para tocar un examen:

    1. editar   exams/g9-u34/official-b2.json
    2. repartir python exams/baraja_claves.py g9-u34
    3. validar  python exams/validate.py g9-u34
    4. grabar   python exams/gen_audio.py g9-u34
    5. subir    python exams/sube_examen.py g9-u34 > subir.sql   (y ejecutarlo)
                python exams/sube_audio.py

Sin el paso 5 el cambio se queda en el disco y el alumno sigue viendo el viejo.

    python exams/sube_examen.py g9-u34                 # los ocho
    python exams/sube_examen.py g9-u34 official b2     # uno
"""
import io, json, os, sys

try:
    sys.stdout.reconfigure(encoding='utf-8')
except Exception:
    pass

AQUI = os.path.dirname(os.path.abspath(__file__))
q = lambda s: str(s).replace("'", "''")


def sql_de(ruta):
    d = json.load(io.open(ruta, encoding='utf-8'))
    guion = d.pop('script', '')
    d.pop('audio', None)          # el mp3 lo resuelve la ruta del bucket
    d['questions'] = sum(len(p.get('items', [])) for p in d.get('parts', []))
    crudo = json.dumps(d, ensure_ascii=False)
    g, u, k, l = d['grade'], d['units'], d['kind'], d['level']
    out = [
        "insert into unit_exams (grade, units, kind, level, title, minutes, data) values",
        "('%s', '%s', '%s', '%s', '%s', %d, '%s'::jsonb)"
        % (g, u, k, l, q(d.get('title', '')), int(d.get('minutes', 60)), q(crudo)),
        "on conflict (grade, units, kind, level) do update set",
        "  title = excluded.title, minutes = excluded.minutes, data = excluded.data,",
        "  updated_at = now();",
    ]
    if guion.strip():
        out += [
            "insert into unit_exam_scripts (grade, units, kind, level, script) values",
            "('%s', '%s', '%s', '%s', '%s')" % (g, u, k, l, q(guion)),
            "on conflict (grade, units, kind, level) do update set",
            "  script = excluded.script, updated_at = now();",
        ]
    return '\n'.join(out)


def main():
    if len(sys.argv) < 2:
        print(__doc__)
        sys.exit(1)
    carpeta = sys.argv[1]
    d = os.path.join(AQUI, carpeta)
    if not os.path.isdir(d):
        sys.exit('no existe la carpeta exams/%s' % carpeta)
    if len(sys.argv) > 3:
        ficheros = ['%s-%s.json' % (sys.argv[2], sys.argv[3])]
    else:
        ficheros = sorted(f for f in os.listdir(d) if f.endswith('.json'))
    for f in ficheros:
        ruta = os.path.join(d, f)
        if not os.path.exists(ruta):
            print('-- no existe %s' % f, file=sys.stderr)
            continue
        print('-- %s' % f)
        print(sql_de(ruta))
        print()


if __name__ == '__main__':
    main()
