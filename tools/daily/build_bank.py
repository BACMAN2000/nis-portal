"""Construye daily-english/bank/ a partir de los JSON en bruto y saca las claves.

Uso:  python tools/daily/build_bank.py <carpeta_bruta> [--anchor 2026-10-18]

- phrases-*.json, ladders.json y culture.json pasan tal cual tras validarlos
  (la clave de la práctica y de la cultura no puntúa: puede ir en el JSON).
- challenges-*.json pierden `a` y `explain_after`: van a
  tools/daily/keys.private/<nivel>.json (fuera de git, el repo es público) y
  de ahí a Supabase (daily_challenge_keys) con sube_claves.py.
- Una entrada que no valida se marca "ok": false y el núcleo no la pinta.
- index.json dice qué bandas están completas: `live[archivo] = False` si no
  llega a 365 días válidos (nada incompleto en vivo).
"""
import json, os, sys, re

RAIZ = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
BANK = os.path.join(RAIZ, 'daily-english', 'bank')
KEYS = os.path.join(RAIZ, 'tools', 'daily', 'keys.private')
BANDS = ['K', 'A2', 'B1', 'B2C1']
LEVELS = ['K', 'A2', 'B1', 'B2', 'C1']
MARCA = re.compile(r'\{[AB]\}')


def carga(ruta):
    with open(ruta, encoding='utf-8') as f:
        return json.load(f)


def guarda(ruta, datos):
    os.makedirs(os.path.dirname(ruta), exist_ok=True)
    with open(ruta, 'w', encoding='utf-8', newline='\n') as f:
        json.dump(datos, f, ensure_ascii=False, indent=1)
        f.write('\n')


def ok_frase(p):
    try:
        pr = p.get('practice') or {}
        return (all(isinstance(p.get(k), str) and p[k].strip() for k in ('text', 'meaning_en', 'example', 'scene', 'bubble'))
                and not MARCA.search(p['example'])
                and isinstance(pr.get('options'), list) and len(pr['options']) == 3
                and pr.get('a') in (0, 1, 2))
    except Exception:
        return False


def ok_reto(c):
    return (isinstance(c.get('stem'), str) and c['stem'].strip()
            and isinstance(c.get('options'), list) and len(c['options']) == 4
            and len(set(o.strip().lower() for o in c['options'])) == 4
            and c.get('a') in (0, 1, 2, 3))


def main():
    if len(sys.argv) < 2:
        sys.exit(__doc__)
    bruta = sys.argv[1]
    anchor = sys.argv[sys.argv.index('--anchor') + 1] if '--anchor' in sys.argv else '2026-10-18'
    live, resumen = {}, []

    for b in BANDS:
        ruta = os.path.join(bruta, f'phrases-{b}.json')
        if not os.path.exists(ruta):
            live[f'phrases-{b}'] = False
            resumen.append(f'phrases-{b}: falta')
            continue
        datos = sorted(carga(ruta), key=lambda x: x.get('day', 0))
        malos = 0
        for p in datos:
            p.pop('audio', None)
            if not ok_frase(p):
                p['ok'] = False
                malos += 1
        dias = {p['day'] for p in datos if p.get('ok') is not False}
        live[f'phrases-{b}'] = len(dias) >= 365
        guarda(os.path.join(BANK, f'phrases-{b}.json'), datos)
        resumen.append(f'phrases-{b}: {len(datos)} ({malos} sin validar)')

    for lv in LEVELS:
        ruta = os.path.join(bruta, f'challenges-{lv}.json')
        if not os.path.exists(ruta):
            live[f'challenges-{lv}'] = False
            resumen.append(f'challenges-{lv}: falta')
            continue
        datos = sorted(carga(ruta), key=lambda x: x.get('day', 0))
        publico, claves, malos = [], [], 0
        for c in datos:
            bueno = ok_reto(c)
            claves.append({'day_no': c['day'], 'correct': c.get('a'), 'explain': (c.get('explain_after') or '')[:400]})
            pub = {k: v for k, v in c.items() if k not in ('a', 'explain_after')}
            if not bueno:
                pub['ok'] = False
                malos += 1
            publico.append(pub)
        dias = {c['day'] for c in publico if c.get('ok') is not False}
        live[f'challenges-{lv}'] = len(dias) >= 365
        guarda(os.path.join(BANK, f'challenges-{lv}.json'), publico)
        guarda(os.path.join(KEYS, f'{lv}.json'), claves)
        resumen.append(f'challenges-{lv}: {len(datos)} ({malos} sin validar)')

    for nombre, minimo in (('ladders', 100), ('culture', 52)):
        ruta = os.path.join(bruta, f'{nombre}.json')
        if not os.path.exists(ruta):
            live[nombre] = False
            resumen.append(f'{nombre}: falta')
            continue
        datos = carga(ruta)
        live[nombre] = len(datos) >= minimo
        guarda(os.path.join(BANK, f'{nombre}.json'), datos)
        resumen.append(f'{nombre}: {len(datos)}')

    guarda(os.path.join(BANK, 'index.json'), {'version': 1, 'anchor': anchor, 'live': live})
    print('\n'.join(resumen))
    print('live:', json.dumps(live))


if __name__ == '__main__':
    main()
