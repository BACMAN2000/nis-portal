"""Copia Daily English de nis-portal (origen) a cohasset.pe.

Uso:  python tools/daily/sincroniza.py [--cohasset RUTA] [--check]

Copia, y no toca nada más del repo de cohasset:
  daily-english/daily-core.js, daily.css        -> <cohasset>/daily-english/
  daily-english/bank/*.json (menos *-K)          -> <cohasset>/daily-english/bank/
  tools/daily/keys.private/{A2,B1,B2,C1}.json    -> <cohasset>/backend/app/data/daily-keys/
y escribe <cohasset>/daily-english/version.json con el sha1[:8] del núcleo y
de la hoja: daily-coh.js lo lee para el ?v= (caché por contenido).
Las claves van a backend/, que nginx no sirve; salen por /daily/today solo
después de las 16:00 de Lima.

--check no escribe nada: sale con código 1 si algo difiere o sobra.
"""
import hashlib
import json
import os
import shutil
import sys

NIS = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
SRC = os.path.join(NIS, 'daily-english')
KEYS = os.path.join(NIS, 'tools', 'daily', 'keys.private')
COH_DEFAULT = r'C:\Projects\cohasset-community\repo'
NIVELES = ['A2', 'B1', 'B2', 'C1']      # cohasset no tiene la banda K


def sha8(ruta):
    with open(ruta, 'rb') as f:
        return hashlib.sha1(f.read()).hexdigest()[:8]


def leer(ruta):
    try:
        with open(ruta, 'rb') as f:
            return f.read()
    except OSError:
        return None


def plan(coh):
    """Lista de (origen, destino) y carpetas destino gestionadas."""
    pares = [(os.path.join(SRC, n), os.path.join(coh, 'daily-english', n)) for n in ('daily-core.js', 'daily.css')]
    bank_src = os.path.join(SRC, 'bank')
    bank_dst = os.path.join(coh, 'daily-english', 'bank')
    for n in sorted(os.listdir(bank_src)):
        if n.endswith('.json') and not n.endswith('-K.json'):   # la banda K es solo de NIS
            pares.append((os.path.join(bank_src, n), os.path.join(bank_dst, n)))
    keys_dst = os.path.join(coh, 'backend', 'app', 'data', 'daily-keys')
    for lv in NIVELES:
        s = os.path.join(KEYS, f'{lv}.json')
        if os.path.exists(s):
            pares.append((s, os.path.join(keys_dst, f'{lv}.json')))
    # Sin keys.private (otra máquina, carpeta fuera de git) no se borra ninguna
    # clave que ya esté en cohasset.
    return pares, [bank_dst] + ([keys_dst] if os.path.isdir(KEYS) else [])


def version_json(pares):
    v = {'core': sha8(pares[0][0]), 'css': sha8(pares[1][0])}
    return (json.dumps(v, indent=1) + '\n').encode('utf-8')


def main():
    coh = sys.argv[sys.argv.index('--cohasset') + 1] if '--cohasset' in sys.argv else COH_DEFAULT
    check = '--check' in sys.argv
    if not os.path.isdir(os.path.join(coh, 'backend', 'app')):
        sys.exit(f'No parece el repo de cohasset: {coh}')
    pares, carpetas = plan(coh)
    destinos = {os.path.normcase(d) for _, d in pares}
    ver_dst = os.path.join(coh, 'daily-english', 'version.json')
    ver = version_json(pares)

    difieren = [d for s, d in pares if leer(s) != leer(d)]
    if leer(ver_dst) != ver:
        difieren.append(ver_dst)
    sobran = []
    for c in carpetas:
        if os.path.isdir(c):
            sobran += [os.path.join(c, n) for n in os.listdir(c)
                       if n.endswith('.json') and os.path.normcase(os.path.join(c, n)) not in destinos]

    if check:
        for d in difieren:
            print('difiere:', os.path.relpath(d, coh))
        for d in sobran:
            print('sobra:  ', os.path.relpath(d, coh))
        if difieren or sobran:
            sys.exit(1)
        print(f'Daily English al día en {coh} ({len(pares)} archivos).')
        return

    for s, d in pares:
        if leer(s) != leer(d):
            os.makedirs(os.path.dirname(d), exist_ok=True)
            shutil.copyfile(s, d)
    with open(ver_dst, 'wb') as f:
        f.write(ver)
    for d in sobran:
        os.remove(d)
    print(f'Copiados {len(difieren)} de {len(pares) + 1}; borrados {len(sobran)} que ya no están en el origen.')
    if not any('daily-keys' in d for _, d in pares):
        print('Aviso: no hay claves en tools/daily/keys.private; los retos no darán puntos.')


if __name__ == '__main__':
    main()
