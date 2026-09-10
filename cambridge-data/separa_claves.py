# -*- coding: utf-8 -*-
"""Saca las respuestas de los datasets Cambridge y las deja fuera del repo publico.

POR QUE EXISTE. `cambridge-data/cambridge-<nivel>.js` son archivos estaticos: los
sirve nis.cohasset.pe y tambien GitHub Pages, y este repositorio es PUBLICO. Con
la respuesta correcta pegada a cada pregunta (`ans:` y `gap:`), cualquiera que
supiera la direccion se descargaba la clave de los 10 tests de practica de cada
nivel sin tener cuenta. Comprobado en vivo el 10-sep-2026: los cinco archivos
respondian 200 y llegaban enteros.

QUE HACE. Deja las preguntas donde estaban -la practica sigue abierta, que es la
politica- y se lleva SOLO las respuestas a `backend/app/data/cambridge-keys/`
del repo de deploy de Cohasset, que nginx no sirve. Desde ahi las entrega
`GET /api/cambridge/keys/<nivel>/<test>` a quien tenga cuenta, con el mismo
criterio que el material de los examenes de ninos.

COMO SE CORRESPONDEN. La clave viaja por POSICION, no por identificador: el
archivo de respuestas repite la forma `lessons[].exercises[].items[]` del dataset
y en cada item lleva `ans` o `gap`. La pagina las mezcla en memoria justo antes
de corregir. Si algun dia se reordenan las preguntas hay que volver a correr esto.

COMO SE USA (despues de anadir o tocar un test):
    python cambridge-data/separa_claves.py            # separa y verifica
    python cambridge-data/separa_claves.py --revisar  # solo dice como esta

SEGURIDAD DE LA OPERACION. No reescribe el JS entero: le quita los pares
`ans:`/`gap:` con cirugia de texto y despues **comprueba** evaluando el archivo
antes y despues que lo unico que cambio son esas claves. Si algo no cuadra, no
escribe nada.
"""
import argparse
import io
import json
import os
import re
import subprocess
import sys
import tempfile

AQUI = os.path.dirname(os.path.abspath(__file__))
PORTAL = os.path.dirname(AQUI)
# El repo de deploy de Cohasset, donde vive el backend que las servira.
DESTINO = os.path.join(r"C:\Projects\cohasset-community\repo",
                       "backend", "app", "data", "cambridge-keys")
NIVELES = [("ket", "CAM_KET"), ("pet", "CAM_PET"), ("fce", "CAM_FCE"),
           ("cae", "CAM_CAE"), ("cpe", "CAM_CPE")]

VOLCADO = """
import fs from 'fs'; import vm from 'vm';
const [,, archivo, nombre] = process.argv;
const src = fs.readFileSync(archivo, 'utf8');
const ctx = vm.createContext({ window: {} });
vm.runInContext(src + `\\n;globalThis.__out = ${nombre};`, ctx, { filename: archivo });
process.stdout.write(JSON.stringify(ctx.__out));
"""

# `ans` puede ser numero o cadena; `gap` siempre cadena. No hay otras formas
# (comprobado sobre los cinco archivos).
VALOR = r'(?:\d+|"(?:[^"\\]|\\.)*")'
CON_COMA_DELANTE = re.compile(r',\s*(?<![A-Za-z_])(?:ans|gap)\s*:\s*' + VALOR)
CON_COMA_DETRAS = re.compile(r'(?<![A-Za-z_])(?:ans|gap)\s*:\s*' + VALOR + r'\s*,')
SUELTA = re.compile(r'(?<![A-Za-z_])(?:ans|gap)\s*:\s*' + VALOR)


def evalua(ruta, nombre):
    """El dataset tal como lo ve el navegador."""
    with tempfile.NamedTemporaryFile('w', suffix='.mjs', delete=False, encoding='utf-8') as f:
        f.write(VOLCADO)
        tmp = f.name
    try:
        r = subprocess.run(['node', tmp, ruta, nombre], capture_output=True, text=True,
                           encoding='utf-8', timeout=120)
        if r.returncode != 0:
            sys.exit('ERROR: no se pudo leer %s: %s' % (ruta, (r.stderr or '')[:200]))
        return json.loads(r.stdout)
    finally:
        os.unlink(tmp)


def claves_de(dataset):
    """Las respuestas, en la misma forma que el dataset y sin nada mas."""
    fuera = {'lessons': []}
    n = 0
    for leccion in dataset.get('lessons') or []:
        ejs = []
        for ej in leccion.get('exercises') or []:
            items = []
            for it in ej.get('items') or []:
                clave = {}
                if 'ans' in it:
                    clave['ans'] = it['ans']; n += 1
                if 'gap' in it:
                    clave['gap'] = it['gap']; n += 1
                items.append(clave)
            ejs.append({'items': items})
        fuera['lessons'].append({'exercises': ejs})
    return fuera, n


def sin_claves(obj):
    """El dataset sin `ans` ni `gap`, para comparar con el archivo recortado."""
    if isinstance(obj, dict):
        return {k: sin_claves(v) for k, v in obj.items() if k not in ('ans', 'gap')}
    if isinstance(obj, list):
        return [sin_claves(x) for x in obj]
    return obj


def recorta(texto):
    t = CON_COMA_DELANTE.sub('', texto)
    t = CON_COMA_DETRAS.sub('', t)
    t = SUELTA.sub('', t)
    return t


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--revisar', action='store_true', help='solo informa, no escribe')
    a = ap.parse_args()

    os.makedirs(DESTINO, exist_ok=True)
    total = 0
    for nivel, nombre in NIVELES:
        js = os.path.join(AQUI, 'cambridge-%s.js' % nivel)
        texto = io.open(js, encoding='utf-8', newline='').read()
        quedan = len(SUELTA.findall(texto))
        if quedan == 0:
            print('%-4s ya estaba separado (0 respuestas en el archivo publico)' % nivel)
            continue

        antes = evalua(js, nombre)
        claves, n = claves_de(antes)
        if a.revisar:
            print('%-4s %d respuestas dentro del archivo publico' % (nivel, n))
            total += n
            continue

        nuevo = recorta(texto)
        if len(SUELTA.findall(nuevo)) != 0:
            sys.exit('ERROR: %s: quedaron respuestas sin recortar' % nivel)

        tmp = js + '.tmp'
        io.open(tmp, 'w', encoding='utf-8', newline='').write(nuevo)
        try:
            despues = evalua(tmp, nombre)
            if despues != sin_claves(antes):
                sys.exit('ERROR: %s: el recorte cambio algo mas que las respuestas' % nivel)
            io.open(js, 'w', encoding='utf-8', newline='').write(nuevo)
        finally:
            if os.path.exists(tmp):
                os.unlink(tmp)

        destino = os.path.join(DESTINO, '%s.json' % nivel)
        io.open(destino, 'w', encoding='utf-8', newline='\n').write(
            json.dumps(claves, ensure_ascii=False, indent=1) + '\n')
        print('%-4s %4d respuestas fuera  ->  %s' % (nivel, n, destino))
        total += n

    print('total: %d respuestas' % total)


if __name__ == '__main__':
    main()
