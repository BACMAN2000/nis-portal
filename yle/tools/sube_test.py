# -*- coding: utf-8 -*-
"""Deja listo el SQL para subir un test a la tabla yle_tests.

Los examenes ya no se publican como archivos (el JSON lleva las claves de
respuesta): viven en `yle_tests` y el motor los lee con la cuenta del alumno.
Los archivos de yle/<nivel>/ siguen en el disco porque las herramientas de
autoria trabajan sobre ellos, pero no se publican.

El circuito para tocar un test:

    1. editar        yle/movers/test-06.json
    2. validar       python yle/validate.py yle/movers/test-06.json --level movers
    3. cuadrar audio python yle/tools/check_audio.py yle/movers/test-06.json
    4. subir         python yle/tools/sube_test.py movers 6 > subir.sql
                     y ejecutar ese SQL en la base (Supabase SQL editor o MCP)

Sin el paso 4 el cambio se queda en el disco y el alumno sigue viendo el test
viejo.

    python yle/tools/sube_test.py movers 6          # un test
    python yle/tools/sube_test.py movers            # los diez del nivel
"""
import io, json, os, re, sys

# Los tests llevan emoji: en Windows la salida por consola es cp1252 y revienta.
try:
    sys.stdout.reconfigure(encoding='utf-8')
except Exception:
    pass

AQUI = os.path.dirname(os.path.abspath(__file__))
RAIZ = os.path.dirname(os.path.dirname(AQUI))


def sql_de(level, n):
    ruta = os.path.join(RAIZ, 'yle', level, 'test-%02d.json' % n)
    if not os.path.exists(ruta):
        return None
    d = json.load(io.open(ruta, encoding='utf-8'))
    tema = d.get('theme', '')
    idx = os.path.join(RAIZ, 'yle', level, 'index.json')
    if os.path.exists(idx):
        for x in json.load(io.open(idx, encoding='utf-8')):
            if x.get('number') == n and x.get('theme'):
                tema = x['theme']
    crudo = json.dumps(d, ensure_ascii=False)
    return ("insert into yle_tests (level, number, theme, data) values\n"
            "('%s', %d, '%s', '%s'::jsonb)\n"
            "on conflict (level, number) do update set\n"
            "  theme = excluded.theme, data = excluded.data, updated_at = now();"
            % (level, n, tema.replace("'", "''"), crudo.replace("'", "''")))


def main():
    if len(sys.argv) < 2:
        print(__doc__); sys.exit(1)
    level = sys.argv[1]
    if level not in ('starters', 'movers', 'flyers'):
        print('nivel desconocido: %s' % level, file=sys.stderr); sys.exit(1)
    if len(sys.argv) > 2:
        nums = [int(sys.argv[2])]
    else:
        d = os.path.join(RAIZ, 'yle', level)
        nums = sorted(int(re.search(r'(\d+)', f).group(1)) for f in os.listdir(d)
                      if re.match(r'test-\d+\.json$', f))
    for n in nums:
        s = sql_de(level, n)
        if s is None:
            print('-- no existe test-%02d.json' % n, file=sys.stderr); continue
        print(s)


if __name__ == '__main__':
    main()
