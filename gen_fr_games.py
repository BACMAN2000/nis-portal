# -*- coding: utf-8 -*-
"""Genera crosswords-fr.html y wordsearches-fr.html (francés, A1-C1, 10/nivel)
clonando la UI de los archivos en inglés y sólo cambiando const DATA y el <title>.
Pistas en español. Cuadrículas válidas (algoritmo). Reproducible (seed)."""
import re, json, random, unicodedata, string, os

random.seed(20260616)
REPO = os.path.dirname(os.path.abspath(__file__))

def strip(w):
    w = unicodedata.normalize('NFD', w)
    w = ''.join(c for c in w if unicodedata.category(c) != 'Mn')
    return w.upper().replace('-', '').replace("'", '').replace(' ', '')

# ---------- Vocabulario francés por nivel y tema: (theme, [(francés, glosa_es), ...]) ----------
LEVELS = {
'A1': [
 ('La famille', [('père','padre'),('mère','madre'),('frère','hermano'),('soeur','hermana'),('fils','hijo'),('fille','hija'),('oncle','tío'),('tante','tía'),('cousin','primo'),('bébé','bebé'),('parents','padres')]),
 ('Les couleurs', [('rouge','rojo'),('bleu','azul'),('vert','verde'),('jaune','amarillo'),('noir','negro'),('blanc','blanco'),('rose','rosa'),('gris','gris'),('orange','naranja'),('violet','morado'),('marron','marrón')]),
 ('Les nombres', [('deux','dos'),('trois','tres'),('quatre','cuatro'),('cinq','cinco'),('six','seis'),('sept','siete'),('huit','ocho'),('neuf','nueve'),('dix','diez'),('onze','once'),('douze','doce')]),
 ('Les animaux', [('chien','perro'),('chat','gato'),('cheval','caballo'),('vache','vaca'),('cochon','cerdo'),('poule','gallina'),('lapin','conejo'),('oiseau','pájaro'),('poisson','pez'),('souris','ratón'),('canard','pato')]),
 ('La nourriture', [('pain','pan'),('lait','leche'),('oeuf','huevo'),('fromage','queso'),('pomme','manzana'),('banane','plátano'),('viande','carne'),('riz','arroz'),('eau','agua'),('gâteau','pastel'),('sucre','azúcar')]),
 ('La maison', [('maison','casa'),('porte','puerta'),('fenêtre','ventana'),('table','mesa'),('chaise','silla'),('lit','cama'),('cuisine','cocina'),('chambre','dormitorio'),('salon','sala'),('jardin','jardín'),('mur','pared')]),
 ('Le corps', [('tête','cabeza'),('main','mano'),('pied','pie'),('bras','brazo'),('jambe','pierna'),('nez','nariz'),('bouche','boca'),('oreille','oreja'),('cheveux','cabello'),('dent','diente'),('ventre','barriga')]),
 ('Les vêtements', [('pantalon','pantalón'),('chemise','camisa'),('robe','vestido'),('jupe','falda'),('manteau','abrigo'),('chaussure','zapato'),('chapeau','sombrero'),('gant','guante'),('pull','suéter'),('veste','chaqueta'),('botte','bota')]),
 ('L\'école', [('école','escuela'),('livre','libro'),('stylo','bolígrafo'),('crayon','lápiz'),('cahier','cuaderno'),('bureau','escritorio'),('règle','regla'),('gomme','goma'),('classe','clase'),('élève','alumno'),('sac','mochila')]),
 ('Les jours et les mois', [('lundi','lunes'),('mardi','martes'),('mercredi','miércoles'),('jeudi','jueves'),('vendredi','viernes'),('samedi','sábado'),('dimanche','domingo'),('janvier','enero'),('mars','marzo'),('avril','abril'),('mai','mayo')]),
],
'A2': [
 ('La ville', [('ville','ciudad'),('rue','calle'),('magasin','tienda'),('banque','banco'),('hôpital','hospital'),('église','iglesia'),('parc','parque'),('marché','mercado'),('gare','estación'),('musée','museo'),('pont','puente')]),
 ('Les transports', [('voiture','coche'),('bus','autobús'),('train','tren'),('avion','avión'),('vélo','bicicleta'),('moto','moto'),('bateau','barco'),('métro','metro'),('taxi','taxi'),('camion','camión')]),
 ('La météo', [('soleil','sol'),('pluie','lluvia'),('neige','nieve'),('vent','viento'),('nuage','nube'),('orage','tormenta'),('chaud','calor'),('froid','frío'),('ciel','cielo'),('brouillard','niebla')]),
 ('Les loisirs', [('cinéma','cine'),('musique','música'),('danse','baile'),('lecture','lectura'),('sport','deporte'),('peinture','pintura'),('voyage','viaje'),('photo','foto'),('théâtre','teatro'),('concert','concierto')]),
 ('La routine', [('réveil','despertador'),('douche','ducha'),('déjeuner','almuerzo'),('travail','trabajo'),('dormir','dormir'),('manger','comer'),('boire','beber'),('étudier','estudiar'),('matin','mañana'),('soir','tarde')]),
 ('Les métiers', [('médecin','médico'),('professeur','profesor'),('infirmier','enfermero'),('avocat','abogado'),('cuisinier','cocinero'),('policier','policía'),('pompier','bombero'),('vendeur','vendedor'),('ingénieur','ingeniero'),('boulanger','panadero')]),
 ('Au restaurant', [('menu','menú'),('plat','plato'),('entrée','entrada'),('dessert','postre'),('boisson','bebida'),('addition','cuenta'),('serveur','camarero'),('verre','vaso'),('fourchette','tenedor'),('couteau','cuchillo')]),
 ('Les courses', [('argent','dinero'),('prix','precio'),('caisse','caja'),('panier','cesta'),('client','cliente'),('carte','tarjeta'),('monnaie','cambio'),('ticket','recibo'),('promotion','oferta'),('liste','lista')]),
 ('La nature', [('arbre','árbol'),('fleur','flor'),('montagne','montaña'),('rivière','río'),('mer','mar'),('plage','playa'),('forêt','bosque'),('champ','campo'),('lac','lago'),('herbe','hierba')]),
 ('Les sentiments', [('content','contento'),('triste','triste'),('heureux','feliz'),('fâché','enfadado'),('peur','miedo'),('joie','alegría'),('amour','amor'),('colère','ira'),('surprise','sorpresa'),('fatigue','cansancio')]),
],
'B1': [
 ('Le travail', [('emploi','empleo'),('salaire','salario'),('réunion','reunión'),('collègue','colega'),('patron','jefe'),('bureau','oficina'),('contrat','contrato'),('entreprise','empresa'),('projet','proyecto'),('chômage','desempleo')]),
 ('La santé', [('maladie','enfermedad'),('médicament','medicamento'),('douleur','dolor'),('fièvre','fiebre'),('hôpital','hospital'),('ordonnance','receta'),('guérir','curar'),('rhume','resfriado'),('blessure','herida'),('vaccin','vacuna')]),
 ('L\'environnement', [('pollution','contaminación'),('recyclage','reciclaje'),('déchet','residuo'),('climat','clima'),('planète','planeta'),('énergie','energía'),('nature','naturaleza'),('océan','océano'),('espèce','especie'),('durable','sostenible')]),
 ('Les voyages', [('aéroport','aeropuerto'),('billet','billete'),('valise','maleta'),('passeport','pasaporte'),('hôtel','hotel'),('vol','vuelo'),('douane','aduana'),('séjour','estancia'),('frontière','frontera'),('bagage','equipaje')]),
 ('La technologie', [('ordinateur','computadora'),('écran','pantalla'),('clavier','teclado'),('internet','internet'),('logiciel','software'),('réseau','red'),('fichier','archivo'),('courriel','correo'),('portable','móvil'),('données','datos')]),
 ('Les médias', [('journal','periódico'),('télévision','televisión'),('radio','radio'),('publicité','publicidad'),('information','información'),('presse','prensa'),('reportage','reportaje'),('chaîne','canal'),('article','artículo'),('actualité','actualidad')]),
 ('L\'éducation', [('étudiant','estudiante'),('examen','examen'),('note','nota'),('devoir','tarea'),('cours','curso'),('université','universidad'),('diplôme','diploma'),('matière','asignatura'),('leçon','lección'),('bibliothèque','biblioteca')]),
 ('Le logement', [('appartement','apartamento'),('loyer','alquiler'),('meuble','mueble'),('voisin','vecino'),('immeuble','edificio'),('étage','piso'),('ascenseur','ascensor'),('clé','llave'),('déménager','mudarse'),('quartier','barrio')]),
 ('Les relations', [('ami','amigo'),('amitié','amistad'),('couple','pareja'),('mariage','matrimonio'),('dispute','disputa'),('confiance','confianza'),('rencontre','encuentro'),('respect','respeto'),('famille','familia'),('amour','amor')]),
 ('Le sport', [('football','fútbol'),('natation','natación'),('course','carrera'),('équipe','equipo'),('match','partido'),('entraînement','entrenamiento'),('joueur','jugador'),('victoire','victoria'),('ballon','balón'),('stade','estadio')]),
],
'B2': [
 ('La société', [('citoyen','ciudadano'),('gouvernement','gobierno'),('loi','ley'),('droit','derecho'),('liberté','libertad'),('égalité','igualdad'),('manifestation','manifestación'),('vote','voto'),('justice','justicia'),('pauvreté','pobreza')]),
 ('L\'économie', [('marché','mercado'),('entreprise','empresa'),('croissance','crecimiento'),('impôt','impuesto'),('monnaie','moneda'),('commerce','comercio'),('investissement','inversión'),('dette','deuda'),('richesse','riqueza'),('budget','presupuesto')]),
 ('La culture', [('patrimoine','patrimonio'),('tradition','tradición'),('langue','lengua'),('oeuvre','obra'),('artiste','artista'),('héritage','herencia'),('coutume','costumbre'),('identité','identidad'),('festival','festival'),('musée','museo')]),
 ('La science', [('recherche','investigación'),('expérience','experimento'),('découverte','descubrimiento'),('théorie','teoría'),('cellule','célula'),('molécule','molécula'),('laboratoire','laboratorio'),('hypothèse','hipótesis'),('preuve','prueba'),('savant','científico')]),
 ('L\'écologie', [('biodiversité','biodiversidad'),('réchauffement','calentamiento'),('émission','emisión'),('carbone','carbono'),('renouvelable','renovable'),('gaspillage','desperdicio'),('écosystème','ecosistema'),('espèce','especie'),('ressource','recurso'),('forêt','bosque')]),
 ('Les arts', [('peinture','pintura'),('sculpture','escultura'),('littérature','literatura'),('poésie','poesía'),('roman','novela'),('cinéma','cine'),('danse','danza'),('musique','música'),('architecture','arquitectura'),('spectacle','espectáculo')]),
 ('La justice', [('tribunal','tribunal'),('juge','juez'),('avocat','abogado'),('crime','crimen'),('peine','pena'),('témoin','testigo'),('preuve','prueba'),('accusé','acusado'),('procès','juicio'),('prison','prisión')]),
 ('La psychologie', [('comportement','comportamiento'),('émotion','emoción'),('mémoire','memoria'),('conscience','conciencia'),('stress','estrés'),('motivation','motivación'),('perception','percepción'),('angoisse','angustia'),('esprit','mente'),('habitude','hábito')]),
 ('L\'actualité', [('événement','acontecimiento'),('crise','crisis'),('conflit','conflicto'),('accord','acuerdo'),('sommet','cumbre'),('discours','discurso'),('élection','elección'),('réforme','reforma'),('scandale','escándalo'),('enquête','investigación')]),
 ('Le monde professionnel', [('compétence','competencia'),('entretien','entrevista'),('candidature','candidatura'),('stage','prácticas'),('télétravail','teletrabajo'),('productivité','productividad'),('gestion','gestión'),('objectif','objetivo'),('équipe','equipo'),('carrière','carrera')]),
],
'C1': [
 ('La philosophie', [('pensée','pensamiento'),('raison','razón'),('vérité','verdad'),('morale','moral'),('existence','existencia'),('conscience','conciencia'),('sagesse','sabiduría'),('logique','lógica'),('doute','duda'),('sens','sentido')]),
 ('La mondialisation', [('échange','intercambio'),('frontière','frontera'),('marché','mercado'),('migration','migración'),('culture','cultura'),('multinationale','multinacional'),('inégalité','desigualdad'),('réseau','red'),('influence','influencia'),('commerce','comercio')]),
 ('L\'innovation', [('technologie','tecnología'),('invention','invención'),('brevet','patente'),('progrès','progreso'),('créativité','creatividad'),('automatisation','automatización'),('intelligence','inteligencia'),('prototype','prototipo'),('rupture','ruptura'),('numérique','digital')]),
 ('Le développement durable', [('durabilité','sostenibilidad'),('ressource','recurso'),('équilibre','equilibrio'),('consommation','consumo'),('transition','transición'),('énergie','energía'),('empreinte','huella'),('recyclage','reciclaje'),('responsabilité','responsabilidad'),('avenir','futuro')]),
 ('La linguistique', [('langage','lenguaje'),('grammaire','gramática'),('syntaxe','sintaxis'),('sens','sentido'),('discours','discurso'),('traduction','traducción'),('dialecte','dialecto'),('phonétique','fonética'),('lexique','léxico'),('signification','significado')]),
 ('L\'urbanisme', [('territoire','territorio'),('quartier','barrio'),('densité','densidad'),('infrastructure','infraestructura'),('mobilité','movilidad'),('logement','vivienda'),('espace','espacio'),('banlieue','periferia'),('transport','transporte'),('croissance','crecimiento')]),
 ('La gouvernance', [('pouvoir','poder'),('institution','institución'),('transparence','transparencia'),('décision','decisión'),('autorité','autoridad'),('citoyenneté','ciudadanía'),('politique','política'),('réforme','reforma'),('légitimité','legitimidad'),('responsabilité','responsabilidad')]),
 ('La créativité', [('imagination','imaginación'),('inspiration','inspiración'),('originalité','originalidad'),('idée','idea'),('concept','concepto'),('expression','expresión'),('innovation','innovación'),('talent','talento'),('intuition','intuición'),('vision','visión')]),
 ('La résilience', [('adaptation','adaptación'),('courage','coraje'),('persévérance','perseverancia'),('épreuve','prueba'),('force','fuerza'),('espoir','esperanza'),('surmonter','superar'),('équilibre','equilibrio'),('soutien','apoyo'),('confiance','confianza')]),
 ('L\'éthique', [('morale','moral'),('valeur','valor'),('devoir','deber'),('dignité','dignidad'),('justice','justicia'),('respect','respeto'),('intégrité','integridad'),('responsabilité','responsabilidad'),('conscience','conciencia'),('honnêteté','honestidad')]),
],
}

WS_BASE = {'A1':12,'A2':12,'B1':13,'B2':14,'C1':15}

# ---------- Crossword ----------
def check_place(grid, W, r0, c0, dr, dc):
    n=len(W)
    if (r0-dr, c0-dc) in grid: return -1
    if (r0+dr*n, c0+dc*n) in grid: return -1
    crosses=0
    for k,ch in enumerate(W):
        r=r0+dr*k; c=c0+dc*k
        if (r,c) in grid:
            if grid[(r,c)]!=ch: return -1
            crosses+=1
        else:
            pr,pc=dc,dr
            if (r+pr,c+pc) in grid: return -1
            if (r-pr,c-pc) in grid: return -1
    return crosses

def make_crossword(pairs):
    words=sorted(({ 'w':strip(fr),'clue':es,'fr':fr } for fr,es in pairs), key=lambda x:-len(x['w']))
    words=[x for x in words if 2<len(x['w'])<=13]
    grid={}; placed=[]
    first=words[0]
    for i,ch in enumerate(first['w']): grid[(0,i)]=ch
    placed.append((first['w'],0,0,'across',first['clue'],first['fr']))
    for it in words[1:]:
        W=it['w']; best=None; bestcross=0
        for i,ch in enumerate(W):
            for (r,c),gch in list(grid.items()):
                if gch!=ch: continue
                for dr,dc,dirn in ((1,0,'down'),(0,1,'across')):
                    r0=r-dr*i; c0=c-dc*i
                    cr=check_place(grid,W,r0,c0,dr,dc)
                    if cr>bestcross:
                        bestcross=cr; best=(W,r0,c0,dirn,it['clue'],dr,dc,it['fr'])
        if best:
            W,rb,cb,dirb,clb,dr,dc,frb=best
            for k,ch in enumerate(W): grid[(rb+dr*k,cb+dc*k)]=ch
            placed.append((W,rb,cb,dirb,clb,frb))
    minr=min(r for r,c in grid); minc=min(c for r,c in grid)
    maxr=max(r for r,c in grid); maxc=max(c for r,c in grid)
    W_=maxc-minc+1; H_=maxr-minr+1
    words_out=[{'word':w,'row':r-minr,'col':c-minc,'dir':d,'clue':cl,'fr':fr} for (w,r,c,d,cl,fr) in placed]
    return {'width':W_,'height':H_,'placed':len(words_out),'words':words_out}

# ---------- Word search ----------
DIRS=[(0,1),(1,0),(0,-1),(-1,0),(1,1),(1,-1),(-1,1),(-1,-1)]
def make_wordsearch(pairs, base):
    items=[(strip(fr), fr) for fr,es in pairs]
    items=[(w,fr) for w,fr in items if 2<len(w)<=15]
    size=max(base, max(len(w) for w,fr in items))
    grid=[[None]*size for _ in range(size)]
    placed=[]
    for W,fr in sorted(items,key=lambda x:-len(x[0])):
        ok=False
        for _ in range(400):
            dr,dc=random.choice(DIRS)
            r0=random.randrange(size); c0=random.randrange(size)
            re_=r0+dr*(len(W)-1); ce=c0+dc*(len(W)-1)
            if not(0<=re_<size and 0<=ce<size): continue
            cells=[]; good=True
            for k,ch in enumerate(W):
                r=r0+dr*k; c=c0+dc*k
                if grid[r][c] not in (None,ch): good=False; break
                cells.append((r,c))
            if not good: continue
            for k,ch in enumerate(W):
                r,c=cells[k]; grid[r][c]=ch
            placed.append({'word':W,'fr':fr,'cells':[[r,c] for r,c in cells]})
            ok=True; break
    for r in range(size):
        for c in range(size):
            if grid[r][c] is None: grid[r][c]=random.choice(string.ascii_uppercase)
    rows=[''.join(grid[r]) for r in range(size)]
    return {'size':size,'grid':rows,'words':placed}

# ---------- Build DATA ----------
cw={}; ws={}
for lv, themes in LEVELS.items():
    cw[lv]=[]; ws[lv]=[]
    for n,(theme,pairs) in enumerate(themes,1):
        c=make_crossword(pairs); c['title']='Crossword %d'%n; c['theme']=theme; cw[lv].append(c)
        w=make_wordsearch(pairs, WS_BASE[lv]); w['title']='Word Search %d'%n; w['theme']=theme; ws[lv].append(w)

# ---------- Validation ----------
def validate():
    probs=[]
    for lv in LEVELS:
        assert len(cw[lv])==10 and len(ws[lv])==10, lv
        for p in ws[lv]:
            g=p['grid']; sz=p['size']
            assert len(g)==sz and all(len(r)==sz for r in g), ('ws size',lv)
            for wd in p['words']:
                cells=wd['cells']; W=wd['word']
                if len(cells)!=len(W): probs.append(('wslen',lv,W))
                for (r,c),ch in zip(cells,W):
                    if g[r][c]!=ch: probs.append(('wsmismatch',lv,W))
        for p in cw[lv]:
            occ={}
            for wd in p['words']:
                r,c=wd['row'],wd['col']; dr,dc=(1,0) if wd['dir']=='down' else (0,1)
                for k,ch in enumerate(wd['word']):
                    rr,cc=r+dr*k,c+dc*k
                    if not(0<=rr<p['height'] and 0<=cc<p['width']): probs.append(('cwbounds',lv,wd['word']))
                    if (rr,cc) in occ and occ[(rr,cc)]!=ch: probs.append(('cwconflict',lv,wd['word']))
                    occ[(rr,cc)]=ch
    return probs

probs=validate()

# ---------- Emit HTML ----------
def emit(src, dst, data, title):
    s=open(os.path.join(REPO,src),encoding='utf-8').read()
    lines=s.split('\n')
    for i,l in enumerate(lines):
        if l.lstrip().startswith('const DATA'):
            lines[i]='const DATA = '+json.dumps(data,ensure_ascii=False)+';'; break
    s='\n'.join(lines)
    s=re.sub(r'<title>.*?</title>', '<title>'+title+'</title>', s, count=1)
    open(os.path.join(REPO,dst),'w',encoding='utf-8').write(s)

emit('crosswords.html','crosswords-fr.html',cw,'Crosswords (Français) — Portal NIS')
emit('wordsearches.html','wordsearches-fr.html',ws,'Word Search (Français) — Portal NIS')

# Pronunciación (TTS) al encontrar una palabra — sólo en el word search francés.
_wp=os.path.join(REPO,'wordsearches-fr.html'); _s=open(_wp,encoding='utf-8').read()
_old='found[w.word]=true; paint(w,d.words.indexOf(w));'
_new='found[w.word]=true; try{speakFR(w);}catch(_){} paint(w,d.words.indexOf(w));'
assert _old in _s, 'no se encontro el handler de palabra encontrada'
_s=_s.replace(_old,_new,1)
_audio=("\n/* Pronunciacion francesa (Web Speech API) al encontrar una palabra */\n"
"let _frVoice=null;\n"
"function _pickFrVoice(){ try{ var vs=speechSynthesis.getVoices(); _frVoice=vs.find(function(v){return /^fr/i.test(v.lang);})||vs.find(function(v){return /fran/i.test(v.name);})||null; }catch(e){} }\n"
"if('speechSynthesis' in window){ _pickFrVoice(); try{ speechSynthesis.onvoiceschanged=_pickFrVoice; }catch(e){} }\n"
"function speakFR(w){ if(!('speechSynthesis' in window))return; var t=(w&&(w.fr||w.word))||''; if(!t)return; var u=new SpeechSynthesisUtterance(t); u.lang='fr-FR'; if(_frVoice)u.voice=_frVoice; u.rate=0.9; try{speechSynthesis.cancel();}catch(e){} speechSynthesis.speak(u); }\n")
_i=_s.rfind('</script>'); _s=_s[:_i]+_audio+_s[_i:]
open(_wp,'w',encoding='utf-8').write(_s)
print('TTS inyectado en wordsearches-fr.html:', ('speakFR' in _s) and (_new in _s))

# Pronunciación (TTS) al resolver una entrada — sólo en el crossword francés.
_cp=os.path.join(REPO,'crosswords-fr.html'); _cs=open(_cp,encoding='utf-8').read()
_cold="  for(const w of entries){ const ok=wordSolved(w); const el=document.getElementById('clue_'+w.num+'_'+w.dir); if(el)el.classList.toggle('solved',ok); if(ok)solved++; }"
_cnew=("  for(const w of entries){ const ok=wordSolved(w); const el=document.getElementById('clue_'+w.num+'_'+w.dir); if(el)el.classList.toggle('solved',ok); "
       "if(ok){ solved++; var _kk=w.num+'_'+w.dir; if(!_spoken.has(_kk)){ _spoken.add(_kk); try{speakFR(w);}catch(_){} } } }")
assert _cold in _cs, 'no se encontro liveCheck en crosswords-fr'
_cs=_cs.replace(_cold,_cnew,1)
_lold="  cells={};sol={};numbers={};entries=[];curEntry=null;hintsUsed=0;lives=5;elapsed=0;completed=false;"
assert _lold in _cs, 'no se encontro reset de load en crosswords-fr'
_cs=_cs.replace(_lold,_lold+" _spoken=new Set();",1)
_caudio=("\n/* Pronunciacion francesa (Web Speech API) al resolver una entrada */\n"
"let _spoken=new Set(), _frVoice=null;\n"
"function _pickFrVoice(){ try{ var vs=speechSynthesis.getVoices(); _frVoice=vs.find(function(v){return /^fr/i.test(v.lang);})||vs.find(function(v){return /fran/i.test(v.name);})||null; }catch(e){} }\n"
"if('speechSynthesis' in window){ _pickFrVoice(); try{ speechSynthesis.onvoiceschanged=_pickFrVoice; }catch(e){} }\n"
"function speakFR(w){ if(!('speechSynthesis' in window))return; var t=(w&&(w.fr||w.word))||''; if(!t)return; var u=new SpeechSynthesisUtterance(t); u.lang='fr-FR'; if(_frVoice)u.voice=_frVoice; u.rate=0.9; try{speechSynthesis.cancel();}catch(e){} speechSynthesis.speak(u); }\n")
_ci=_cs.rfind('</script>'); _cs=_cs[:_ci]+_caudio+_cs[_ci:]
open(_cp,'w',encoding='utf-8').write(_cs)
print('TTS inyectado en crosswords-fr.html:', ('speakFR' in _cs) and ('_spoken.add' in _cs))

print('CROSSWORDS placed per level:', {lv:[p['placed'] for p in cw[lv]] for lv in LEVELS})
print('WS words per level:', {lv:[len(p['words']) for p in ws[lv]] for lv in LEVELS})
print('WS sizes:', {lv:ws[lv][0]['size'] for lv in LEVELS})
print('levels-param kept (cw):', 'URLSearchParams(location.search).get' in open(os.path.join(REPO,'crosswords-fr.html'),encoding='utf-8').read())
print('levels-param kept (ws):', 'URLSearchParams(location.search).get' in open(os.path.join(REPO,'wordsearches-fr.html'),encoding='utf-8').read())
print('PROBLEMS:', probs if probs else 'NONE — ALL VALID')
