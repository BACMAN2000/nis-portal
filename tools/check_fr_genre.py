# -*- coding: utf-8 -*-
"""Auditor de genero del curso frances (nis-fun/content-fr).

En ingles no hay genero, asi que al traducir el curso el fallo tipico no es el
vocabulario sino la CONCORDANCIA: "une nuit noir", "elle est alle", "un maison".
Este script lee las 150 unidades y avisa de cuatro cosas:

  1. DETERMINANTE vs SUSTANTIVO   un/une, ce/cette, ma/ta/sa, du/de la, au/a la
     contra el lexico de generos (nis-fun/content-fr/genres.json).
  2. ADJETIVO detras del sustantivo   "une porte vert" -> verte
  3. ELLE + adjetivo o participio     "elle est alle" -> allee
  4. La misma palabra usada con los DOS generos dentro del curso.

No mira mon/ton/son ante vocal o h muda: ahi el masculino es la forma correcta
tambien para el femenino ("mon amie", "son histoire") y avisar seria mentir.

Uso:   python tools/check_fr_genre.py            (solo el resumen)
       python tools/check_fr_genre.py -v         (todas las lineas)
Sale con codigo 1 si encuentra algun fallo, para poder engancharlo a un hook.
"""
import io, json, os, re, sys, collections

AQUI = os.path.dirname(os.path.abspath(__file__))
RAIZ = os.path.join(AQUI, "..", "nis-fun", "content-fr")
LEX = os.path.join(RAIZ, "genres.json")   # mismo fichero que puede leer el curso
L = u"a-zàâçéèêëîïôûùüÿœ"
VOCAL = u"aàâeéèêëiîïoôuùûyh"

# ---------------------------------------------------------------- adjetivos
# masculino -> femenino. Los invariables (rouge, jaune, drole...) no hacen falta:
# si no estan en la tabla, no se comprueban.
ADJ = {
    u"grand": u"grande", u"petit": u"petite", u"gros": u"grosse", u"beau": u"belle",
    u"joli": u"jolie", u"vieux": u"vieille", u"nouveau": u"nouvelle", u"bon": u"bonne",
    u"mauvais": u"mauvaise", u"meilleur": u"meilleure", u"premier": u"première",
    u"dernier": u"dernière", u"long": u"longue", u"court": u"courte", u"gentil": u"gentille",
    u"vert": u"verte", u"bleu": u"bleue", u"blanc": u"blanche", u"noir": u"noire",
    u"gris": u"grise", u"violet": u"violette", u"marron": u"marron", u"doré": u"dorée",
    u"chaud": u"chaude", u"froid": u"froide", u"content": u"contente", u"heureux": u"heureuse",
    u"fatigué": u"fatiguée", u"malheureux": u"malheureuse", u"fort": u"forte",
    u"lourd": u"lourde", u"léger": u"légère", u"sec": u"sèche", u"mouillé": u"mouillée",
    u"plein": u"pleine", u"ouvert": u"ouverte", u"fermé": u"fermée", u"cassé": u"cassée",
    u"prêt": u"prête", u"sûr": u"sûre", u"préféré": u"préférée", u"délicieux": u"délicieuse",
    u"dangereux": u"dangereuse", u"ennuyeux": u"ennuyeuse", u"amusant": u"amusante",
    u"intéressant": u"intéressante", u"important": u"importante", u"différent": u"différente",
    u"mignon": u"mignonne", u"sportif": u"sportive", u"actif": u"active", u"créatif": u"créative",
    u"neuf": u"neuve", u"doux": u"douce", u"frais": u"fraîche", u"seul": u"seule",
    u"vrai": u"vraie", u"faux": u"fausse", u"seconde": u"seconde", u"nombreux": u"nombreuse",
    u"peureux": u"peureuse", u"curieux": u"curieuse", u"sérieux": u"sérieuse",
    u"paresseux": u"paresseuse", u"courageux": u"courageuse", u"silencieux": u"silencieuse",
    u"bruyant": u"bruyante", u"lent": u"lente", u"haut": u"haute", u"profond": u"profonde",
    u"étroit": u"étroite", u"large": u"large", u"sale": u"sale", u"propre": u"propre",
}
FEM_DE = {}
for m, f in ADJ.items():
    FEM_DE.setdefault(f, m)
# participios que con etre concuerdan con el sujeto
PART = u"""allé venu parti resté arrivé entré sorti monté descendu tombé né mort
retourné rentré devenu passé assis couché levé perdu blessé""".split()

DET_M = u"un|ce|cet|mon|ton|son"
DET_F = u"une|cette|ma|ta|sa"
FEM_DETS = set(u"une cette ma ta sa".split())
PRE = set(list(ADJ.keys()) + list(ADJ.values()))          # adjetivos antepuestos
NEXO = set(u"que qui dont de du des a au aux en y et ou si ne pas plus tres".split()
           + [u"à", u"très"])


def cadenas(o, ruta=u""):
    if isinstance(o, str):
        yield ruta, o
    elif isinstance(o, dict):
        for k, v in o.items():
            for x in cadenas(v, ruta + u"." + k):
                yield x
    elif isinstance(o, list):
        for i, v in enumerate(o):
            for x in cadenas(v, u"%s[%d]" % (ruta, i)):
                yield x


def unidades():
    for nivel in (u"starters", u"movers", u"flyers"):
        d = os.path.join(RAIZ, nivel)
        if not os.path.isdir(d):
            continue
        for f in sorted(os.listdir(d)):
            if f.startswith(u"unit-"):
                yield nivel + u"/" + f, json.load(io.open(os.path.join(d, f), encoding="utf-8"))


def cargar_lexico():
    if os.path.exists(LEX):
        return json.load(io.open(LEX, encoding="utf-8"))
    return {}


GEN = cargar_lexico()

RE_SN = re.compile(u"(?<![%s'’])(%s|%s)\\s+([%s]+)(?:\\s+([%s]+))?(?:\\s+([%s]+))?" %
                   (L, DET_M, DET_F, L, L, L), re.I)
RE_ELLE = re.compile(u"\\b([Ee]lle)\\s+(?:est|était|semble|reste|devient|paraît|a\\s+l'air)\\s+([%s]+)" % L)
RE_ELLES = re.compile(u"\\b([Ee]lles)\\s+(?:sont|étaient|semblent|restent)\\s+([%s]+)" % L)

fallos = []          # (tipo, archivo, ruta, aviso, frase)
usos = collections.defaultdict(lambda: collections.defaultdict(int))
n_unidades = 0

for arch, data in unidades():
    n_unidades += 1
    for ruta, s in cadenas(data):
        for det, w1, w2, w3 in RE_SN.findall(s):
            d = det.lower()
            fem = d in FEM_DETS
            # mon/ton/son ante vocal o h muda no dice nada del genero
            if d in (u"mon", u"ton", u"son") and w1[:1].lower() in VOCAL:
                continue
            palabras = [w for w in (w1, w2, w3) if w]
            # "une que seul ton camarade fait": detras del determinante no viene
            # el sustantivo sino un relativo o una preposicion. No hay nada que mirar.
            if palabras[0].lower() in NEXO:
                continue
            i = 0
            while i < len(palabras) - 1 and palabras[i].lower() in PRE:
                a = palabras[i].lower()                    # 2. adjetivo antepuesto
                if fem and a in ADJ and ADJ[a] != a:
                    fallos.append((u"adj", arch, ruta, u"%s %s → %s %s" % (det, a, det, ADJ[a]), s))
                elif not fem and a in FEM_DE and FEM_DE[a] != a:
                    fallos.append((u"adj", arch, ruta, u"%s %s → %s %s" % (det, a, det, FEM_DE[a]), s))
                i += 1
            nom = palabras[i].lower()
            usos[nom][u"f" if fem else u"m"] += 1
            g = GEN.get(nom)
            if g and g != (u"f" if fem else u"m") and g in u"mf":     # 1. determinante
                bien = {u"un": u"une", u"une": u"un", u"ce": u"cette", u"cet": u"cette",
                        u"cette": u"ce", u"ma": u"mon", u"ta": u"ton", u"sa": u"son",
                        u"mon": u"ma", u"ton": u"ta", u"son": u"sa"}.get(d, d)
                fallos.append((u"det", arch, ruta, u"%s %s → %s %s  (%s es %s)" % (det, nom, bien, nom, nom, g), s))
            # 3. adjetivo pospuesto: SOLO el que va pegado al sustantivo. Si en
            #    medio hay un enlace ("une carte de bon retablissement") el
            #    adjetivo ya no es del sustantivo, y avisar seria un falso aviso.
            if i + 1 < len(palabras):
                al = palabras[i + 1].lower()
                if fem and al in ADJ and ADJ[al] != al:
                    fallos.append((u"adj", arch, ruta, u"%s %s %s → %s %s %s" % (det, nom, al, det, nom, ADJ[al]), s))
                elif not fem and al in FEM_DE and FEM_DE[al] != al and al not in ADJ:
                    fallos.append((u"adj", arch, ruta, u"%s %s %s → %s %s %s" % (det, nom, al, det, nom, FEM_DE[al]), s))
    # 4. elle est + adjetivo / participio
        for suj, a in RE_ELLE.findall(s) + RE_ELLES.findall(s):
            al = a.lower()
            if al in ADJ and ADJ[al] != al:
                fallos.append((u"elle", arch, ruta, u"%s est %s → %s" % (suj, al, ADJ[al]), s))
            elif al in PART:
                fallos.append((u"elle", arch, ruta, u"%s est %s → %se" % (suj, al, al), s))

# solo interesan las palabras que el lexico reconoce como sustantivo de verdad
choques = {n: g for n, g in usos.items()
           if len(g) > 1 and min(g.values()) > 1 and GEN.get(n) in (u"m", u"f")}

verboso = "-v" in sys.argv
print(u"Unidades leidas: %d · sustantivos con genero visible: %d · lexico: %d palabras"
      % (n_unidades, len(usos), len(GEN)))
por_tipo = collections.Counter(t for t, _, _, _, _ in fallos)
nombre = {u"det": u"determinante que no concuerda", u"adj": u"adjetivo que no concuerda",
          u"elle": u"elle + forma masculina"}
if not fallos and not choques:
    print(u"Sin fallos de genero.")
for t in (u"det", u"adj", u"elle"):
    if por_tipo[t]:
        print(u"\n%d %s:" % (por_tipo[t], nombre[t]))
        vistos = fallos if verboso else fallos[:40]
        for tt, arch, ruta, aviso, frase in vistos:
            if tt == t:
                print(u"  %-24s %-28s %s" % (arch, aviso, frase.strip()[:90]))
if choques:
    print(u"\n%d palabra(s) usadas con los DOS generos (mirar a mano):" % len(choques))
    for n in sorted(choques):
        print(u"  %-20s m:%d f:%d" % (n, usos[n].get(u"m", 0), usos[n].get(u"f", 0)))
sys.exit(1 if fallos else 0)
