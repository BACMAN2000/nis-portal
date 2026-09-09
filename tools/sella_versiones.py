# -*- coding: utf-8 -*-
"""
Pone en cada ?v= el hash del contenido del archivo que se pide.

    python tools/sella_versiones.py --ensayo         # dice que cambiaria, no escribe
    python tools/sella_versiones.py                  # sella el repositorio entero
    python tools/sella_versiones.py --estacionados   # solo lo que va en el commit

POR QUE. El portal pedia sus archivos con un numero escrito a mano
-app.js?v=210, project-arcs.js?v=9- y ese numero hay que acordarse de subirlo.
En la auditoria del 8-sep-2026 habia 20 archivos con la version caducada sobre
1.478 referencias: uno de ellos, anticheat.js, se pedia en v=8 desde 276 paginas
y en v=1 desde una, que servia a un alumno con la cache caliente un anti-cheat de
tres meses antes. Y project-arcs.js convivia en tres versiones a la vez, asi que
un cambio publicado no se veia en tres de las cinco paginas que lo cargan.

Un numero a mano falla siempre por lo mismo: quien edita el archivo no es quien
se acuerda de la version. El hash no se olvida porque no se escribe: sale del
propio contenido. Si el archivo no cambio, el hash es el mismo y el navegador
sigue usando su copia; si cambio, la direccion cambia sola y se la trae.

COMO. Se recorre el repositorio, se resuelve cada referencia contra la carpeta
de quien la pide, y si el destino existe en disco se le pone el hash de su
contenido. Se repite hasta que nada cambia: sellar un archivo cambia SU hash, y
eso hay que propagarlo a quien lo pide -index.html pide app.js, y app.js puede
pedir otra cosa-.

Es idempotente: correrlo dos veces seguidas no toca nada la segunda.

LO QUE NO HACE. No inventa versiones para rutas que se arman en tiempo de
ejecucion (reader.html construye '...-extras.js'): esas no existen como archivo
y se dejan como estan. Tampoco entra en _backup_*, vendor ni node_modules.
"""
import hashlib, os, re, sys

sys.stdout.reconfigure(encoding='utf-8')

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MIRA = ('.html', '.js', '.css')
SALTA = {'.git', 'node_modules', 'vendor', '.claude', '.vscode'}
# el token puede ser el numero viejo o un hash ya sellado
REF = re.compile(r'''(["'(])([A-Za-z0-9_\-./]+\.(?:js|css|json|html))\?v=([A-Za-z0-9]+)''')


def sello(path):
    """Ocho caracteres del sha1 del contenido. Del contenido, no de la fecha:
    tocar un archivo sin cambiarlo no debe obligar a nadie a bajarlo otra vez."""
    h = hashlib.sha1()
    with open(path, 'rb') as f:
        for tramo in iter(lambda: f.read(65536), b''):
            h.update(tramo)
    return h.hexdigest()[:8]


def archivos(solo_estacionados=False):
    """Todos los del repositorio, o solo los que van en el commit.

    El hook usa lo segundo a proposito. Sellar el repositorio entero desde un
    commit toca archivos que otra sesion tiene a medias, y entonces o los
    arrastras -publicando trabajo sin terminar- o te bloqueas para siempre.
    Se sella lo que se publica; lo demas se sellara cuando lo publique quien lo
    este escribiendo."""
    if solo_estacionados:
        import subprocess
        salida = subprocess.run(['git', 'diff', '--cached', '--name-only'],
                                cwd=RAIZ, capture_output=True, text=True).stdout
        for rel in salida.split(chr(10)):
            rel = rel.strip()
            if rel.endswith(MIRA):
                p = os.path.join(RAIZ, rel)
                if os.path.isfile(p):
                    yield p
        return
    for base, dirs, files in os.walk(RAIZ):
        dirs[:] = [d for d in dirs if d not in SALTA and not d.startswith('_backup_')]
        for f in files:
            if f.endswith(MIRA):
                yield os.path.join(base, f)


def una_pasada(escribir, solo_estacionados=False):
    """Sella todas las referencias una vez. Devuelve los cambios encontrados."""
    cambios = []
    for p in archivos(solo_estacionados):
        try:
            s = open(p, encoding='utf-8', newline='').read()
        except (UnicodeDecodeError, OSError):
            continue
        carpeta = os.path.dirname(p)
        nuevo = s

        def sella_ref(m):
            comilla, ruta, ver = m.group(1), m.group(2), m.group(3)
            destino = os.path.normpath(os.path.join(carpeta, ruta))
            if not os.path.isfile(destino):
                return m.group(0)          # ruta armada al vuelo: no es nuestro asunto
            if os.path.samefile(destino, p):
                # un archivo que se cita a si mismo esta ensenando como se usa, no
                # cargandose: anticheat.js lo hace en su cabecera. Sellarlo cambiaria
                # su propio hash en cada vuelta y no estabilizaria nunca.
                return m.group(0)
            h = sello(destino)
            if h == ver:
                return m.group(0)
            cambios.append((os.path.relpath(p, RAIZ).replace(os.sep, '/'), ruta, ver, h))
            return f'{comilla}{ruta}?v={h}'

        nuevo = REF.sub(sella_ref, nuevo)
        if escribir and nuevo != s:
            open(p, 'w', encoding='utf-8', newline='').write(nuevo)
    return cambios


def main():
    ensayo = '--ensayo' in sys.argv
    solo = '--estacionados' in sys.argv
    if ensayo:
        cambios = una_pasada(escribir=False, solo_estacionados=solo)
        print(f'referencias que cambiarian: {len(cambios)}')
        for f, r, v, h in cambios[:40]:
            print(f'  {f:<34} {r:<28} v={v} -> {h}')
        if len(cambios) > 40:
            print(f'  … y {len(cambios) - 40} mas')
        print('\n(ensayo: no se ha escrito nada)')
        return

    total = 0
    for vuelta in range(1, 11):
        cambios = una_pasada(escribir=True, solo_estacionados=solo)
        if not cambios:
            break
        total += len(cambios)
        print(f'  vuelta {vuelta}: {len(cambios)} referencias selladas')
    else:
        # diez vueltas sin estabilizar: hay un ciclo y hay que mirarlo, no insistir
        raise SystemExit('[x] no se estabiliza en diez vueltas: revisa si dos '
                         'archivos se piden el uno al otro')
    print(f'selladas {total} referencias' if total else 'ya estaba todo sellado')


if __name__ == '__main__':
    main()
