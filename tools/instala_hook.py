# -*- coding: utf-8 -*-
"""
Instala el hook que sella los ?v= antes de cada commit.

    python tools/instala_hook.py

HAY QUE CORRERLO UNA VEZ EN CADA CLON. Los hooks viven en .git/hooks, que no
viaja con el repositorio: por eso el hook esta versionado en tools/hooks/ y esto
solo lo copia a su sitio. En un clon donde nadie lo instale, el sellado no
ocurre solo y hay que correr tools/sella_versiones.py a mano antes de publicar.

Si ya hay un pre-commit distinto no lo pisa: lo dice y para.
"""
import filecmp, os, shutil, subprocess, sys

sys.stdout.reconfigure(encoding='utf-8')
RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ORIGEN = os.path.join(RAIZ, 'tools', 'hooks', 'pre-commit')


def main():
    hooks = subprocess.run(['git', 'rev-parse', '--git-path', 'hooks'],
                           cwd=RAIZ, capture_output=True, text=True).stdout.strip()
    if not hooks:
        raise SystemExit('[x] esto no parece un clon de git')
    hooks = os.path.join(RAIZ, hooks) if not os.path.isabs(hooks) else hooks
    os.makedirs(hooks, exist_ok=True)
    destino = os.path.join(hooks, 'pre-commit')

    if os.path.exists(destino):
        if filecmp.cmp(ORIGEN, destino, shallow=False):
            print('ya estaba instalado y es el mismo')
            return
        with open(destino, encoding='utf-8', errors='replace') as f:
            if 'sella_versiones' not in f.read():
                raise SystemExit(
                    f'[x] ya hay otro pre-commit en {destino} y no es este.\n'
                    '    No se pisa: miralo y decide tu si se combinan.')

    shutil.copyfile(ORIGEN, destino)
    os.chmod(destino, 0o755)
    print(f'instalado en {destino}')
    print('a partir de ahora cada commit sella las versiones solo')


if __name__ == '__main__':
    main()
