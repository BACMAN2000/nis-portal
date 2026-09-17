# -*- coding: utf-8 -*-
"""Una sola copia del motor de mocks: nis-portal/mocks-cambridge es la verdad
y las otras dos (cohasset.pe y el repo standalone) son espejos que se copian.

    python tools/mocks/sincroniza.py --check      # ¿se han desviado? (lo corre el hook pre-push)
    python tools/mocks/sincroniza.py              # copia y resella; no commitea
    python tools/mocks/sincroniza.py --publicar   # copia, resella, commitea y pushea los espejos

POR QUÉ. Hasta el 17-sep-2026 los simulacros vivían en tres copias que se
llevaban a mano, cada una con su logo, sus colores y su correo escritos DENTRO
del JS del motor; "sincronizar" era pasar regex sobre el HTML y confiar. Así
cohasset.pe estuvo semanas con el A2 de cuatro opciones, el C1 con
transformaciones de nivel B2 y 23 partes por detrás. Ahora la marca sale de
`window.MOCKS_SITE` (nis: config.js · cohasset: coh-bridge.js) y los archivos
COMPARTIDOS son byte a byte iguales en las tres copias: se copian, no se
transforman. Lo que cada web tiene de suyo (el HTML con su piel, su bridge, su
logo) no se toca.

QUÉ ES COMPARTIDO (motor + bancos + vocabulario + avisos + versión):
  reading-quiz.app-data.js · listening-quiz.app-data.js · writing-quiz.app-data.js
  reading-quiz.exam-vocab.js · listening-quiz.exam-vocab.js · writing-rubric.js
  ui-mensajes.js · version.json · faces/* · images/*

ESPEJOS:
  cohasset.pe  → C:/Projects/cohasset-community/repo/cambridge-mocks (solo lo compartido;
                 su HTML lleva la piel de Cohasset y se resellan ahí los ?v= de lo copiado,
                 md5[:8] como el resto de ese repo)
  standalone   → C:/Projects/mocks-cambridge (TODO lo que nis-portal tiene en mocks-cambridge
                 menos tools/: es la copia NIS que GitHub Pages redirige a nis.cohasset.pe)

Si un espejo no está en esta máquina se avisa y se sigue: el hook no debe
tumbar un push por un clon que falta. Si está y se desvía, --check falla y
dice qué correr.
"""
import hashlib, io, os, re, subprocess, sys

sys.stdout.reconfigure(encoding='utf-8')

AQUI = os.path.dirname(os.path.abspath(__file__))
NIS = os.path.normpath(os.path.join(AQUI, '..', '..', 'mocks-cambridge'))
NIS_REPO = os.path.normpath(os.path.join(AQUI, '..', '..'))
COH_REPO = next((p for p in [r'C:\Projects\cohasset-community\repo'] if os.path.isdir(p)), None)
STD_REPO = next((p for p in [r'C:\Projects\mocks-cambridge'] if os.path.isdir(p)), None)
COH = COH_REPO and os.path.join(COH_REPO, 'cambridge-mocks')

COMPARTIDOS = ['reading-quiz.app-data.js', 'listening-quiz.app-data.js', 'writing-quiz.app-data.js',
               'reading-quiz.exam-vocab.js', 'listening-quiz.exam-vocab.js', 'writing-rubric.js',
               'ui-mensajes.js', 'version.json']
CARPETAS_COMPARTIDAS = ['faces', 'images']
HTML = ['quizzes.html', 'reading-quiz.html', 'listening-quiz.html', 'writing-quiz.html']

CHECK = '--check' in sys.argv
PUBLICAR = '--publicar' in sys.argv

def lee(p):
    with open(p, 'rb') as h: return h.read()
def escribe(p, b):
    os.makedirs(os.path.dirname(p), exist_ok=True)
    with open(p, 'wb') as h: h.write(b)
def md5_8(b): return hashlib.md5(b).hexdigest()[:8]

def lista_compartidos():
    """(ruta relativa) de todo lo compartido que existe en la verdad."""
    out = list(COMPARTIDOS)
    for c in CARPETAS_COMPARTIDAS:
        d = os.path.join(NIS, c)
        if os.path.isdir(d):
            for f in sorted(os.listdir(d)):
                if os.path.isfile(os.path.join(d, f)): out.append(c + '/' + f)
    return out

def tracked_nis():
    """Todo lo que git sigue en mocks-cambridge/ (la verdad), menos tools/."""
    r = subprocess.run(['git', 'ls-files', 'mocks-cambridge'], cwd=NIS_REPO, capture_output=True, text=True, check=True)
    return [l[len('mocks-cambridge/'):] for l in r.stdout.splitlines() if l and not l.startswith('mocks-cambridge/tools/')]

def desvios(destino, rutas):
    """Rutas que faltan o difieren en el destino."""
    out = []
    for rel in rutas:
        a = os.path.join(NIS, rel); b = os.path.join(destino, rel)
        if not os.path.isfile(a): continue
        if not os.path.isfile(b) or lee(a) != lee(b): out.append(rel)
    return out

def resella(html_path, rutas):
    """En un HTML del espejo de Cohasset, pone ?v=md5[:8] a las rutas copiadas (a bytes, sin tocar finales de línea)."""
    b = lee(html_path); orig = b; cambios = 0
    for rel in rutas:
        f = os.path.join(os.path.dirname(html_path), rel)
        if not os.path.isfile(f) or rel.endswith('.json'): continue
        h = md5_8(lee(f)).encode()
        pat = re.compile(re.escape(rel.encode()) + rb'\?v=[0-9A-Za-z._-]+')
        def rep(m):
            nonlocal cambios
            nuevo = rel.encode() + b'?v=' + h
            if m.group(0) != nuevo: cambios += 1
            return nuevo
        b = pat.sub(rep, b)
    if b != orig: escribe(html_path, b)
    return cambios

def sellos_caducados(destino, rutas):
    """Referencias ?v= del espejo de Cohasset que no llevan el hash del archivo copiado."""
    out = []
    for h in HTML:
        p = os.path.join(destino, h)
        if not os.path.isfile(p): continue
        b = lee(p)
        for rel in rutas:
            f = os.path.join(destino, rel)
            if not os.path.isfile(f) or rel.endswith('.json'): continue
            esperado = md5_8(lee(f)).encode()
            for m in re.finditer(re.escape(rel.encode()) + rb'\?v=([0-9A-Za-z._-]+)', b):
                if m.group(1) != esperado: out.append(f'{h}: {rel}?v={m.group(1).decode()} (toca {esperado.decode()})')
    return out

def git(repo, *args):
    return subprocess.run(['git', *args], cwd=repo, capture_output=True, text=True)

def main():
    rutas = lista_compartidos()
    problemas = []
    # ---- Cohasset: solo lo compartido + sellos ----
    if COH and os.path.isdir(COH):
        d = desvios(COH, rutas)
        if CHECK:
            if d: problemas.append(f'cohasset.pe: {len(d)} archivo(s) compartido(s) distintos: ' + ', '.join(d[:6]) + (' …' if len(d) > 6 else ''))
            s = sellos_caducados(COH, rutas)
            if s: problemas.append('cohasset.pe: ?v= caducados: ' + ' · '.join(s[:4]))
        else:
            for rel in d: escribe(os.path.join(COH, rel), lee(os.path.join(NIS, rel)))
            sellos = sum(resella(os.path.join(COH, h), rutas) for h in HTML if os.path.isfile(os.path.join(COH, h)))
            print(f'cohasset.pe: {len(d)} archivo(s) copiados, {sellos} ?v= resellados')
            if desvios(COH, rutas) or sellos_caducados(COH, rutas): raise SystemExit('cohasset.pe: sigue desviado tras copiar (¿archivo bloqueado?)')
    else:
        print('cohasset.pe: clon no encontrado en esta máquina; no se comprueba')
    # ---- Standalone: espejo entero (menos tools/) ----
    if STD_REPO and os.path.isdir(STD_REPO):
        todo = tracked_nis()
        d = desvios(STD_REPO, todo)
        if CHECK:
            if d: problemas.append(f'standalone: {len(d)} archivo(s) distintos: ' + ', '.join(d[:6]) + (' …' if len(d) > 6 else ''))
        else:
            for rel in d: escribe(os.path.join(STD_REPO, rel), lee(os.path.join(NIS, rel)))
            print(f'standalone: {len(d)} archivo(s) copiados')
    else:
        print('standalone: clon no encontrado en esta máquina; no se comprueba')

    if CHECK:
        if problemas:
            print('✗ Las copias del motor de mocks se han desviado de nis-portal/mocks-cambridge:')
            for p in problemas: print('   ' + p)
            print('   → python tools/mocks/sincroniza.py --publicar')
            sys.exit(1)
        print('✓ mocks: las copias de cohasset.pe y standalone coinciden con nis-portal')
        return

    if PUBLICAR:
        if COH_REPO:
            rel_paths = ['cambridge-mocks/' + r for r in rutas] + ['cambridge-mocks/' + h for h in HTML]
            git(COH_REPO, 'add', '--', *[p for p in rel_paths if os.path.exists(os.path.join(COH_REPO, p))])
            if git(COH_REPO, 'diff', '--cached', '--quiet').returncode != 0:
                r = git(COH_REPO, 'commit', '-q', '-m', 'Mocks Cambridge: sincronizados desde nis-portal (motor y bancos compartidos)\n\nCo-Authored-By: Claude Opus 5 <noreply@anthropic.com>')
                print('cohasset.pe: commit', 'ok' if r.returncode == 0 else r.stderr.strip())
                r = git(COH_REPO, 'push', 'origin', 'main'); print('cohasset.pe: push', 'ok' if r.returncode == 0 else r.stderr.strip()[-300:])
            else: print('cohasset.pe: nada que commitear')
        if STD_REPO:
            git(STD_REPO, 'add', '-A', '--', '.', ':!tools')
            if git(STD_REPO, 'diff', '--cached', '--quiet').returncode != 0:
                r = git(STD_REPO, 'commit', '-q', '-m', 'Espejo de nis-portal/mocks-cambridge\n\nCo-Authored-By: Claude Opus 5 <noreply@anthropic.com>')
                print('standalone: commit', 'ok' if r.returncode == 0 else r.stderr.strip())
                r = git(STD_REPO, 'push'); print('standalone: push', 'ok' if r.returncode == 0 else r.stderr.strip()[-300:])
            else: print('standalone: nada que commitear')

if __name__ == '__main__':
    main()
