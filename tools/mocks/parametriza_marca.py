"""Saca la marca de los archivos compartidos del motor de mocks (17-sep-2026).

Los simulacros viven en tres copias (nis-portal/mocks-cambridge, que sirve
nis.cohasset.pe; cohasset-community/repo/cambridge-mocks, que sirve cohasset.pe;
y el repo standalone mocks-cambridge). Los bancos y el motor son los mismos,
pero cada copia llevaba SU logo, SU correo y SUS colores escritos dentro del
JS, así que "sincronizar" era pasar transformaciones por regex y rezar. Desde
hoy el motor y los bancos (reading/listening/writing-quiz.app-data.js) leen la
marca de `window.MOCKS_SITE`, que cada web define en su propio archivo
(nis: config.js · cohasset: coh-bridge.js), y los archivos compartidos son
byte a byte iguales en las tres copias: se copian, no se transforman
(tools/mocks/sincroniza.py) y el hook pre-push avisa si se desvían.

Este script se corrió UNA vez sobre la copia de nis-portal; queda como
registro de qué se cambió y por si hay que repetirlo sobre otra copia.

    python tools/mocks/parametriza_marca.py [ruta/a/la/copia]
"""
import io, re, sys, os

RAIZ = sys.argv[1] if len(sys.argv) > 1 else os.path.join(os.path.dirname(__file__), '..', '..', 'mocks-cambridge')
RAIZ = os.path.abspath(RAIZ)

PREAMBULO = """/* Marca y datos del sitio (17-sep-2026): cada web define window.MOCKS_SITE
   ANTES de cargar este archivo (nis: config.js · cohasset: coh-bridge.js).
   Así este archivo es idéntico en las tres copias del motor y se sincroniza
   copiándolo, sin transformaciones. Ver tools/mocks/sincroniza.py. */
var MSITE = Object.assign({
  teacherEmail: '', schoolName: '', classLabel: 'English 2026', portalName: 'the Portal',
  logo: '', logoAlt: '', emailExample: 'name.surname@school.edu',
  accent: '#4987c6', accent2: '#2d5a8d', webhookUrl: ''
}, window.MOCKS_SITE || {});
"""

def lee(f):
    with io.open(f, encoding='utf-8', newline='') as h: return h.read()
def escribe(f, s):
    with io.open(f, 'w', encoding='utf-8', newline='') as h: h.write(s)

def sustituye(s, pares, nombre):
    for viejo, nuevo, veces in pares:
        n = s.count(viejo)
        if veces is not None and n != veces:
            raise SystemExit(f'{nombre}: «{viejo[:70]}» aparece {n} veces, esperaba {veces}')
        if n == 0:
            raise SystemExit(f'{nombre}: no encuentro «{viejo[:70]}»')
        s = s.replace(viejo, nuevo)
    return s

# ---- Reading -------------------------------------------------------------
f = os.path.join(RAIZ, 'reading-quiz.app-data.js'); s = lee(f)
nl = '\r\n' if '\r\n' in s[:500] else '\n'
s = sustituye(s, [
    ("  teacherEmail: 'pbaca@nordic-school.edu.pe',\n  schoolName: 'Nordic International School of Lima',".replace('\n', nl),
     "  teacherEmail: MSITE.teacherEmail,\n  schoolName: MSITE.schoolName,".replace('\n', nl), 1),
    ("  webhookUrl: 'https://script.google.com/macros/s/AKfycbzwn09Be0ZfKxGpwgkjLdp7nIs7awq8h7SVKkMlWN4EjekkOFqpLmnChzGHN_bB6kN-/exec',",
     "  webhookUrl: MSITE.webhookUrl || 'https://script.google.com/macros/s/AKfycbzwn09Be0ZfKxGpwgkjLdp7nIs7awq8h7SVKkMlWN4EjekkOFqpLmnChzGHN_bB6kN-/exec',", 1),
    ('<img class="hero-logo" src="nordic-logo-h.svg" alt="Nordic International School of Lima">',
     '<img class="hero-logo" src="${MSITE.logo}" alt="${MSITE.schoolName}">', 1),
    ('placeholder="e.g. maria.garcia@nordic-school.edu.pe"', 'placeholder="e.g. ${MSITE.emailExample}"', 1),
    ("alert('🔒 Practice tests are locked right now.\\n\\nYour teacher has kept them for class and will unlock them from the NIS Portal.')",
     "NISUI.avisa('🔒 Practice tests are locked right now.\\n\\nYour teacher has kept them for class and will unlock them from '+MSITE.portalName+'.', {titulo:'Locked'})", 1),
    ("alert('🔒 The mocks are locked.\\n\\nYour teacher will open them from the NIS Portal when you are ready to sit them.')",
     "NISUI.avisa('🔒 The mocks are locked.\\n\\nYour teacher will open them from '+MSITE.portalName+' when you are ready to sit them.', {titulo:'Locked'})", 1),
    ('<a class="brand" href="quizzes.html" title="Nordic International School of Lima"><img src="nordic-logo-h.svg" alt="Nordic"></a>',
     '<a class="brand" href="quizzes.html" title="${MSITE.schoolName}"><img src="${MSITE.logo}" alt="${MSITE.logoAlt}"></a>', 1),
    ('border-bottom:2px solid #4987c6;margin-bottom:14px">', 'border-bottom:2px solid ${MSITE.accent};margin-bottom:14px">', 1),
    ('<img src="nordic-logo-h.svg" alt="Nordic" style="height:50px;width:auto">', '<img src="${MSITE.logo}" alt="${MSITE.logoAlt}" style="height:50px;width:auto">', 1),
], 'reading')
if 'var MSITE' not in s: s = PREAMBULO.replace('\n', nl) + s
escribe(f, s); print('reading-quiz.app-data.js ok')

# ---- Listening -----------------------------------------------------------
f = os.path.join(RAIZ, 'listening-quiz.app-data.js'); s = lee(f)
nl = '\r\n' if '\r\n' in s[:500] else '\n'
s = sustituye(s, [
    ('  TEACHER_EMAIL: "pbaca@nordic-school.edu.pe",\n  CLASS_LABEL: "NIS English 2026"'.replace('\n', nl),
     '  TEACHER_EMAIL: MSITE.teacherEmail,\n  CLASS_LABEL: MSITE.classLabel'.replace('\n', nl), 1),
    ("'style=\"background:#4987c6;color:#fff;border:none;padding:14px 36px;border-radius:10px;' +",
     "'style=\"background:'+MSITE.accent+';color:#fff;border:none;padding:14px 36px;border-radius:10px;' +", 1),
    ('placeholder="e.g. maria.garcia@nordic-school.edu.pe"', 'placeholder="e.g. ${MSITE.emailExample}"', 1),
    ('font-size:1.4rem;color:#2d5a8d">', 'font-size:1.4rem;color:${MSITE.accent2}">', None),
    ("alert('🔒 Practice tests are locked right now.\\n\\nYour teacher has kept them for class and will unlock them from the NIS Portal.')",
     "NISUI.avisa('🔒 Practice tests are locked right now.\\n\\nYour teacher has kept them for class and will unlock them from '+MSITE.portalName+'.', {titulo:'Locked'})", 1),
    ("alert('🔒 The mocks are locked.\\n\\nYour teacher will open them from the NIS Portal when you are ready to sit them.')",
     "NISUI.avisa('🔒 The mocks are locked.\\n\\nYour teacher will open them from '+MSITE.portalName+' when you are ready to sit them.', {titulo:'Locked'})", 1),
    ('const cardBtn = "background:#4987c6;', 'const cardBtn = "background:"+MSITE.accent+";', 2),
    ('<div class="ins-brand"><img src="nordic-logo-h.svg" alt="Nordic"></div>',
     '<div class="ins-brand"><img src="${MSITE.logo}" alt="${MSITE.logoAlt}"></div>', 1),
    ('<div class="stem" style="color:#4987c6">', '<div class="stem" style="color:${MSITE.accent}">', 1),
    ('<div class="pdf-brand"><img src="nordic-logo-h.svg" alt="Nordic">',
     '<div class="pdf-brand"><img src="${MSITE.logo}" alt="${MSITE.logoAlt}">', 1),
], 'listening')
if 'var MSITE' not in s: s = PREAMBULO.replace('\n', nl) + s
escribe(f, s); print('listening-quiz.app-data.js ok')

# ---- Writing: el script inline pasa a writing-quiz.app-data.js ------------
f = os.path.join(RAIZ, 'writing-quiz.html'); s = lee(f)
nl = '\r\n' if '\r\n' in s[:500] else '\n'
scripts = list(re.finditer(r'<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)</script>', s))
grande = max(scripts, key=lambda m: len(m.group(1)))
if len(grande.group(1)) < 100000: raise SystemExit('writing: no encuentro el script grande')
js = grande.group(1)
js = sustituye(js, [
    ("  teacherEmail: 'pbaca@nordic-school.edu.pe',\n  schoolName: 'Nordic International School of Lima'".replace('\n', nl),
     "  teacherEmail: MSITE.teacherEmail,\n  schoolName: MSITE.schoolName".replace('\n', nl), 1),
    ('<img src="nordic-logo-h.svg" alt="Nordic International School of Lima">', '<img src="${MSITE.logo}" alt="${MSITE.schoolName}">', 1),
    ('<img src="nordic-logo-h.svg" alt="Nordic">', '<img src="${MSITE.logo}" alt="${MSITE.logoAlt}">', 3),
    ('<img src="nordic-logo-h.svg" style="height:46px">', '<img src="${MSITE.logo}" style="height:46px">', 1),
    ('Your teacher will unlock the mocks from the NIS Portal', 'Your teacher will unlock the mocks from ${MSITE.portalName}', 1),
    ('🏫 Back to the NIS Portal</a>', '🏫 Back to ${MSITE.portalName}</a>', 1),
    ("'style=\"background:#4987c6;color:#fff;border:none;padding:14px 36px;border-radius:10px;' +",
     "'style=\"background:'+MSITE.accent+';color:#fff;border:none;padding:14px 36px;border-radius:10px;' +", 1),
    ("alert('🔒 The mocks are locked.\\n\\nYour teacher will open them from the NIS Portal when you are ready to sit them.')",
     "NISUI.avisa('🔒 The mocks are locked.\\n\\nYour teacher will open them from '+MSITE.portalName+' when you are ready to sit them.', {titulo:'Locked'})", 1),
    ("alert('🔒 Practice tests are locked right now.\\n\\nYour teacher has kept them for class and will unlock them from the NIS Portal.')",
     "NISUI.avisa('🔒 Practice tests are locked right now.\\n\\nYour teacher has kept them for class and will unlock them from '+MSITE.portalName+'.', {titulo:'Locked'})", 1),
], 'writing')
if 'nordic' in js.lower() or 'NIS Portal' in js:
    for m in re.finditer(r'.{40}(?:nordic|NIS Portal).{40}', js, re.I): print('  QUEDA:', m.group(0))
    raise SystemExit('writing: quedan restos de marca en el script')
js = PREAMBULO.replace('\n', nl) + js.lstrip('\r\n')
escribe(os.path.join(RAIZ, 'writing-quiz.app-data.js'), js)
s = s[:grande.start()] + '<script src="writing-quiz.app-data.js?v=0"></script>' + s[grande.end():]
escribe(f, s); print('writing-quiz.html → writing-quiz.app-data.js ok')

# ---- Comprobación: nada de marca en los compartidos ---------------------
for nombre in ['reading-quiz.app-data.js', 'listening-quiz.app-data.js', 'writing-quiz.app-data.js']:
    t = lee(os.path.join(RAIZ, nombre))
    restos = [m.group(0) for m in re.finditer(r'.{30}(?:nordic|NIS Portal|#4987c6|#2d5a8d|cohasset).{30}', t, re.I)]
    restos = [r for r in restos if 'MSITE' not in r and 'accent' not in r and 'tools/mocks' not in r]
    if restos:
        print(nombre, 'restos:'); [print('   ', r) for r in restos]
print('listo')
