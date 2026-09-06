# -*- coding: utf-8 -*-
"""Revision a fondo de los examenes de unidad, antes de abrirlos.

    python exams/audita_unidad.py            # todos
    python exams/audita_unidad.py g9-u34     # una carpeta

validate.py mira la forma (que el motor sepa pintar cada tipo, los limites de
palabras, el reparto de claves) y audita_filtraciones.py busca respuestas que se
leen en otra pregunta. Esto mira si el examen SE PUEDE RESPONDER y si dice la
verdad:

  · que la respuesta de cada hueco del Listening este de verdad en el guion —
    si no, el alumno la falla escuche lo que escuche;
  · que la respuesta correcta de cada Listening de opciones tenga apoyo en el
    guion, y que los distractores no lo tengan mas;
  · que el mp3 exista y dure lo razonable;
  · que las preguntas del reader hablen de personajes que existen en el libro;
  · que cada word formation cambie de verdad la palabra que se da;
  · que toda pregunta traiga su explicacion, que es lo que el alumno lee al
    corregir;
  · y los conteos: 7 partes, 39 preguntas y el writing.
"""
import io, json, os, re, subprocess, sys

try:
    sys.stdout.reconfigure(encoding='utf-8')
except Exception:
    pass

AQUI = os.path.dirname(os.path.abspath(__file__))
RAIZ = os.path.dirname(AQUI)
AUDIO = os.path.join(RAIZ, 'exam-audio')

# Quien existe en And Then There Were None. Un nombre fuera de esta lista en una
# pregunta del reader es un personaje inventado.
PERSONAJES = {'wargrave', 'vera', 'claythorne', 'lombard', 'philip', 'rogers', 'ethel',
              'thomas', 'macarthur', 'marston', 'anthony', 'armstrong', 'blore', 'william',
              'emily', 'brent', 'beatrice', 'taylor', 'narracott', 'fred', 'owen', 'davis',
              'hugo', 'seton', 'morris', 'landor', 'constance', 'culmington', 'christie'}
PALABRAS_LIBRO = {'soldier', 'island', 'devon', 'sticklehaven'}
# Titulos y lugares que acompañan a un nombre y no son nombres en si.
TITULOS = {'general', 'judge', 'doctor', 'miss', 'mister', 'inspector', 'captain',
           'arequipa', 'lima', 'peru'}

RANGOS = {'a2': (60, 130), 'b1': (90, 150), 'b2': (130, 200), 'c1': (200, 280)}

norm = lambda s: re.sub(r"[^a-z0-9' ]", ' ', str(s or '').lower()).replace("’", "'")
def pals(t):
    return [w for w in norm(t).split() if w]


def dur_mp3(ruta):
    try:
        out = subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration',
                              '-of', 'csv=p=0', ruta], capture_output=True, text=True, timeout=30)
        return float(out.stdout.strip())
    except Exception:
        return None


def revisa(ruta):
    d = json.load(io.open(ruta, encoding='utf-8'))
    err, avi = [], []
    guion = norm(d.get('script', ''))
    guion_pal = set(pals(d.get('script', '')))
    nivel = d.get('level', '')

    partes = d.get('parts', [])
    tipos = [p.get('type') for p in partes]
    if len(partes) != 7:
        err.append('tiene %d partes, no 7' % len(partes))
    total = sum(len(p.get('items', [])) for p in partes)
    if total != 39:
        err.append('tiene %d preguntas, no 39' % total)

    n = 0
    for p in partes:
        for it in p.get('items', []):
            n += 1
            if not it.get('ex'):
                avi.append('q%d (%s) sin explicación al corregir' % (n, p['type']))

            # --- el listening tiene que poderse responder escuchando ---
            if p['type'] == 'listening':
                if it.get('kind') == 'gap':
                    ok = any(norm(a) and norm(a) in guion for a in it.get('accept', []))
                    if not ok:
                        err.append('q%d: la respuesta %s NO está en el guion — no se puede acertar'
                                   % (n, it.get('accept')))
                else:
                    buena = it['opts'][it['ok']]
                    apoyo = [w for w in pals(buena) if len(w) > 3 and w in guion_pal]
                    if not apoyo:
                        err.append('q%d: la opción correcta no tiene ninguna palabra del guion' % n)
                    # un distractor no puede parecerse mas al guion que la respuesta
                    for j, o in enumerate(it['opts']):
                        if j == it['ok']:
                            continue
                        otro = [w for w in pals(o) if len(w) > 3 and w in guion_pal]
                        if len(otro) > len(apoyo) + 1:
                            avi.append('q%d: el distractor "%s" se parece más al guion que la respuesta'
                                       % (n, o[:44]))

            # --- word formation: tiene que cambiar la palabra ---
            if p['type'] == 'wf':
                raiz = norm(it['root'])
                for a in it.get('accept', []):
                    if norm(a) == raiz:
                        err.append('q%d: acepta la palabra dada (%s)' % (n, it['root']))
                # Familia: o la raiz esta dentro de la respuesta (SYMMETRY/asymmetry,
                # USE/useful), o comparten el principio, o es una de las familias
                # irregulares de verdad, que existen y son las mas interesantes.
                IRREGULARES = {('good', 'better'), ('afraid', 'fear'), ('true', 'truth'),
                               ('fun', 'funny'), ('complicity', 'complicit')}
                # REFUTE → irrefutable y SECURE → insecurity son familia: lo que
                # los separa es el prefijo negativo, que se quita antes de mirar.
                PREFIJOS = ('irr', 'ir', 'im', 'in', 'un', 'dis', 'mis', 'non', 'a')
                def familia(a, raiz=raiz):
                    a = norm(a)
                    formas = [a] + [a[len(p):] for p in PREFIJOS if a.startswith(p) and len(a) - len(p) > 3]
                    return any(raiz in f or f in raiz or f[:3] == raiz[:3] or (raiz, a) in IRREGULARES
                               for f in formas)
                if not any(familia(a) for a in it.get('accept', [])):
                    avi.append('q%d: %s → %s no parecen la misma familia'
                               % (n, it['root'], it['accept'][0]))

            # --- transformaciones: la palabra clave, intacta y presente ---
            if p['type'] == 'kt':
                clave = norm(it.get('key', ''))
                if not any(clave in norm(a).split() for a in it.get('accept', [])):
                    err.append('q%d: ninguna respuesta usa la palabra clave %s' % (n, it['key']))

            # --- ordenar palabras: las dadas tienen que dar la respuesta ---
            if p['type'] == 'order':
                if sorted(norm(w) for w in it['words']) != sorted(norm(x) for x in it['answer'].split()):
                    err.append('q%d: las palabras dadas no forman la respuesta' % n)

            # --- personajes del libro ---
            # Solo mayusculas EN MEDIO de una frase: la primera palabra de un
            # enunciado o de una opcion va en mayuscula por escritura, no por ser
            # un nombre. Sin esto el aviso marcaba «Nobody», «Perhaps», «General».
            trozos = [str(it.get('q', '')), str(it.get('lead', '')), str(it.get('sent', ''))]
            trozos += [str(x) for x in (it.get('opts') or [])]
            candidatos = []
            for t in trozos:
                t = re.sub(r'<[^>]*>', ' ', t)
                for frase in re.split(r'(?<=[.!?:;])\s+', t):
                    ws = re.findall(r"\b[A-Za-z][A-Za-z']{3,}\b", frase)
                    candidatos += [w for w in ws[1:] if w[0].isupper()]
            for w in candidatos:
                # "Lombard's" es Lombard: el genitivo no hace un personaje nuevo.
                b = re.sub(r"'s$", '', w.lower())
                if b in PERSONAJES or b in PALABRAS_LIBRO or b in TITULOS:
                    continue
                if b in ('what', 'why', 'where', 'when', 'which', 'this', 'that', 'they', 'their',
                         'there', 'then', 'these', 'those', 'with', 'from', 'have', 'here', 'your',
                         'most', 'some', 'lima', 'sunday', 'monday', 'january', 'because', 'after',
                         'before', 'during', 'social', 'media', 'internet', 'english', 'cambridge',
                         'nordic', 'chapters', 'units', 'wellbeing', 'issue', 'part', 'listen',
                         'write', 'choose', 'complete', 'clara', 'nadia', 'daniel', 'hart', 'owen',
                         'mia', 'sile', 'reader', 'answer', 'true', 'false', 'scrolling', 'mind'):
                    continue
                avi.append('q%d: nombre propio no reconocido «%s» (¿personaje inventado?)' % (n, w))

    # --- writing ---
    wr = [p for p in partes if p['type'] == 'writing']
    if wr:
        for t in wr[0].get('tasks', []):
            lo, hi = t.get('range', [0, 0])
            elo, ehi = RANGOS.get(nivel, (0, 999))
            if lo < elo or hi > ehi:
                avi.append('writing «%s»: %d-%d palabras se sale de lo esperable en %s (%d-%d)'
                           % (t.get('label', '?'), lo, hi, nivel.upper(), elo, ehi))
            if not t.get('tips'):
                avi.append('writing «%s» sin pistas para el alumno' % t.get('label', '?'))

    # --- audio ---
    mp3 = os.path.join(AUDIO, d.get('audio', ''))
    if not os.path.exists(mp3):
        err.append('falta el mp3 %s' % d.get('audio'))
    else:
        seg = dur_mp3(mp3)
        if seg is None:
            avi.append('no se pudo medir el mp3')
        elif seg < 60:
            err.append('el audio dura %ds: demasiado corto para %d preguntas' % (seg, 6))
        elif seg > 300:
            avi.append('el audio dura %d min' % (seg // 60))
    if not d.get('script', '').strip():
        err.append('sin guion del listening')

    return d, err, avi


def main():
    carpetas = sys.argv[1:] or [c for c in sorted(os.listdir(AQUI))
                                if os.path.isdir(os.path.join(AQUI, c))]
    malos = 0
    for c in carpetas:
        dr = os.path.join(AQUI, c)
        for f in sorted(os.listdir(dr)):
            if not f.endswith('.json'):
                continue
            d, err, avi = revisa(os.path.join(dr, f))
            print('%s %s/%s — %s · %s' % ('MAL ' if err else 'OK  ', c, f,
                                          d.get('kind'), d.get('level', '').upper()))
            for x in err:
                print('       x  %s' % x)
            for x in avi:
                print('       !  %s' % x)
            malos += bool(err)
    print('\n%s' % ('Los exámenes revisados están correctos.' if not malos
                    else '%d examen(es) con errores.' % malos))
    sys.exit(1 if malos else 0)


if __name__ == '__main__':
    main()
