"""Genera el SQL que carga las claves de los retos en daily_challenge_keys.

Uso:  python tools/daily/sube_claves.py > claves.sql   (o --nivel B1 para uno)
Lee tools/daily/keys.private/<nivel>.json (fuera de git). El SQL hace upsert,
así que se puede repetir sin duplicar. Se aplica en el SQL editor de Supabase
o por la herramienta de la sesión; NUNCA se commitea.
"""
import json, os, sys

KEYS = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'keys.private')


def lit(s):
    return "'" + str(s).replace("'", "''") + "'"


def main():
    niveles = [sys.argv[sys.argv.index('--nivel') + 1]] if '--nivel' in sys.argv else ['K', 'A2', 'B1', 'B2', 'C1']
    for lv in niveles:
        ruta = os.path.join(KEYS, f'{lv}.json')
        if not os.path.exists(ruta):
            continue
        filas = [c for c in json.load(open(ruta, encoding='utf-8')) if c.get('correct') in (0, 1, 2, 3)]
        if not filas:
            continue
        valores = ',\n'.join(f"({lit(lv)},{int(c['day_no'])},{int(c['correct'])},{lit(c.get('explain') or '')})" for c in filas)
        print(f"insert into daily_challenge_keys(level, day_no, correct, explain) values\n{valores}\n"
              "on conflict (level, day_no) do update set correct = excluded.correct, explain = excluded.explain;")


if __name__ == '__main__':
    main()
