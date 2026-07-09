# -*- coding: utf-8 -*-
"""Localiza a INGLÉS las fichas/juegos del Portal NIS (instrucciones, UI, feedback,
notas). NO toca los reportes (viven en app.js) ni el curso de francés (*-fr.html)."""
import os, re, sys
try: sys.stdout.reconfigure(encoding='utf-8', errors='replace')
except Exception: pass
REPO = os.path.dirname(os.path.abspath(__file__))

def deesc(s):
    """Revierte UN nivel de escapado HTML introducido al transcribir los pares
    (los bloques NEW llegan con &lt; &gt; &amp; &quot;). Orden: entidades primero,
    &amp; al final, para no romper entidades reales del archivo (p.ej. &uacute;)."""
    return (s.replace('&lt;', '<').replace('&gt;', '>')
             .replace('&quot;', '"').replace('&amp;', '&'))

# ── Pares ORIGINALES (ya con bytes reales, no se des-escapan) ──────────────────
REPL = {
'reported-speech.html': [
 ('Contar lo que otra persona dijo. Lee el resumen y practica con el juego: elige la transformación correcta, recibe feedback al instante.',
  'Report what another person said. Read the summary, then play: choose the correct transformation and get instant feedback.'),
 ('🔤 Otro juego: Ordena la oración →','🔤 Another game: Put the sentence in order →'),
 ('<b>Lo esencial</b>','<b>The essentials</b>'),
 ('El verbo suele <b>retroceder un tiempo</b>: present → past, past → past perfect, <i>will → would</i>, <i>can → could</i>.',
  'The verb usually <b>shifts back one tense</b>: present → past, past → past perfect, <i>will → would</i>, <i>can → could</i>.'),
 ('Cambian los <b>pronombres</b> (I → he/she, my → his/her, you → me…).',
  '<b>Pronouns</b> change (I → he/she, my → his/her, you → me…).'),
 ('Cambian el <b>tiempo y el lugar</b>: now → then, today → that day, tomorrow → the next day, here → there, this → that, last week → the week before.',
  '<b>Time and place words</b> change: now → then, today → that day, tomorrow → the next day, here → there, this → that, last week → the week before.'),
 ('<b>Preguntas:</b> orden de afirmación (sin <i>do/does/did</i>); sí/no → <i>if/whether</i>.',
  '<b>Questions:</b> statement word order (no <i>do/does/did</i>); yes/no → <i>if/whether</i>.'),
 ('<b>Órdenes/peticiones:</b> <i>tell + objeto + (not) to + infinitivo</i> → <i>He told me to wait / not to be late.</i>',
  '<b>Orders/requests:</b> <i>tell + object + (not) to + infinitive</i> → <i>He told me to wait / not to be late.</i>'),
 ('Present simple → past (am → was) y el pronombre I → he.','Present simple → past (am → was); pronoun I → he.'),
 ('Past simple → past perfect (finished → had finished); my → her.','Past simple → past perfect (finished → had finished); my → her.'),
 ('Pregunta de sí/no → if + orden de afirmación, sin "do"; speak → spoke.','Yes/no question → if + statement word order, no "do"; speak → spoke.'),
 ('Pregunta wh- → orden de afirmación; are → was; you → I.','Wh- question → statement word order; are → was; you → I.'),
 ('Orden → tell + objeto + to + infinitivo.','Order → tell + object + to + infinitive.'),
 ('Orden negativa → not + to + infinitivo; say to → tell.','Negative order → not + to + infinitive; say to → tell.'),
 ('can → could; el infinitivo no cambia (drive).','can → could; the infinitive does not change (drive).'),
 ('Volvemos al presente y a la 1ª persona: was → am; she → I.','Back to present and first person: was → am; she → I.'),
 ('Pregunta directa: recupera "do" y el orden de pregunta; lived → live; I → you.','Direct question: bring back "do" and question word order; lived → live; I → you.'),
 ("'Elige el <b>reported speech</b> correcto:'","'Choose the correct <b>reported speech</b>:'"),
 ("'Elige el <b>direct speech</b> correcto (las palabras exactas):'","'Choose the correct <b>direct speech</b> (the exact words):'"),
 ("'Ver resultado'","'See result'"), ("'Siguiente →'","'Next →'"),
 ('¡Correcto!</b> ','Correct!</b> '), ('❌ <b>Casi.</b>','❌ <b>Almost.</b>'),
 ("+'Respuesta: <b>'","+'Answer: <b>'"),
 ('¡Excelente! Dominas el reported speech. 🌟','Excellent! You have mastered reported speech. 🌟'),
 ('Buen trabajo. Repasa los cambios de tiempo y pronombres. 👍','Good job. Review the tense and pronoun changes. 👍'),
 ('Vas bien. Revisa el resumen de arriba y vuelve a intentar. 💪','You are getting there. Check the summary above and try again. 💪'),
 ('Sigue practicando: lee el resumen y juega otra vez. ✍️','Keep practising: read the summary and play again. ✍️'),
 ('↻ Jugar otra vez','↻ Play again'),
],
'reported-speech-order.html': [
 ('Reported Speech · Ordena la oración — Portal NIS','Reported Speech · Word Order — Portal NIS'),
 ('Toca las palabras para construir la oración…','Tap the words to build the sentence…'),
 ('🔤 Reported Speech — Ordena la oración','🔤 Reported Speech — Word Order'),
 ('Lee la oración en <b>Direct speech</b>. Luego ordena las palabras para formar el <b>Reported speech</b> correcto.',
  'Read the sentence in <b>Direct speech</b>. Then put the words in order to form the correct <b>Reported speech</b>.'),
 ('🧩 Otro juego: Elige la opción correcta →','🧩 Another game: Choose the correct option →'),
 ('<span class="pill">Oración ','<span class="pill">Sentence '),
 ('Ordena el <b>reported speech</b>:','Put the <b>reported speech</b> in order:'),
 ('>↺ Reiniciar<','>↺ Reset<'),
 ('>Mostrar respuesta<','>Show answer<'),
 ('>Comprobar<','>Check<'),
 ('✅ <b>¡Correcto!</b> ','✅ <b>Correct!</b> '),
 ('🤔 Aún no. Revisa el orden (tiempo verbal, pronombres) e inténtalo otra vez.','🤔 Not yet. Check the order (verb tense, pronouns) and try again.'),
 ("'👀 Respuesta: <b>'","'👀 Answer: <b>'"),
 ("'Ver resultado'","'See result'"), ("'Siguiente →'","'Next →'"),
 ("'¡Excelente orden! 🌟'","'Excellent ordering! 🌟'"),
 (" : pct>=60?'Buen trabajo. 👍' : pct>=40?'Vas mejorando. 💪' : 'Repasa el resumen y vuelve a intentar. ✍️'",
  " : pct>=60?'Good job. 👍' : pct>=40?'Getting better. 💪' : 'Review and try again. ✍️'"),
 ('↻ Jugar otra vez','↻ Play again'),
],
'grammar-quiz.html': [
 ('Simple para rutinas y hechos; continuous para lo que pasa ahora (now, at the moment, Look!, Listen!).',
  'Simple for routines and facts; continuous for what is happening now (now, at the moment, Look!, Listen!).'),
 ('Present perfect para experiencias y resultados (ever, never, already, since, for); past simple para tiempo terminado (yesterday, last…, ago).',
  'Present perfect for experiences and results (ever, never, already, since, for); past simple for finished time (yesterday, last…, ago).'),
 ('La pasiva: be + participio. El foco está en la acción o el objeto, no en quién la hace (by + agente, opcional).',
  'The passive: be + past participle. The focus is on the action or the object, not on who does it (by + agent, optional).'),
 ('Condicionales mixtos, wish e inversión formal (Had I…, Were I…, Should it…).',
  'Mixed conditionals, wish and formal inversion (Had I…, Were I…, Should it…).'),
 ('"every day" = rutina → present simple (goes).','"every day" = routine → present simple (goes).'),
 ('Rutina + "I" → drink.','Routine + "I" → drink.'),
 ('Hecho permanente → works.','Permanent fact → works.'),
 ('"last year" (terminado) → past simple.','"last year" (finished) → past simple.'),
 ('Resultado en el presente → present perfect.','Result in the present → present perfect.'),
 ('"When" + momento definido → past simple.','"When" + a definite time → past simple.'),
 ('Pasado pasivo: was + painted.','Past passive: was + painted.'),
 ('Presente pasivo: is + spoken.','Present passive: is + spoken.'),
 ('Futuro pasivo: will be + finished.','Future passive: will be + finished.'),
 ('Pasado pasivo: was built.','Past passive: was built.'),
 ('Presente pasivo plural: are cleaned.','Present passive (plural): are cleaned.'),
 ('Presente continuo pasivo: is being built.','Present continuous passive: is being built.'),
 ('Pasado pasivo: was stolen.','Past passive: was stolen.'),
 ('Present perfect pasivo: have been sent.','Present perfect passive: have been sent.'),
 ('Second conditional (were para todas las personas).','Second conditional (were for all persons).'),
 ('Mixto: condición pasada → resultado presente (would live).','Mixed: past condition → present result (would live).'),
 ('Inversión: "Had I known" = "If I had known".','Inversion: "Had I known" = "If I had known".'),
 ('Second conditional: would + infinitivo.','Second conditional: would + infinitive.'),
 ('Mixto: condición presente → resultado pasado (would have given).','Mixed: present condition → past result (would have given).'),
 ('Inversión formal: "Should it rain" = "If it rains".','Formal inversion: "Should it rain" = "If it rains".'),
 ('wish + past simple para un deseo presente.','wish + past simple for a present wish.'),
 ("'Nivel '+SET.level","'Level '+SET.level"),
 ("'Ver resultado'","'See result'"), ("'Siguiente →'","'Next →'"),
 ('¡Correcto!</b> ','Correct!</b> '), ('❌ <b>Casi.</b>','❌ <b>Almost.</b>'),
 ("pct>=80?'¡Excelente! 🌟':pct>=60?'Buen trabajo. 👍':pct>=40?'Vas mejorando. 💪':'Repasa la regla de arriba y vuelve a intentar. ✍️'",
  "pct>=80?'Excellent! 🌟':pct>=60?'Good job. 👍':pct>=40?'Getting better. 💪':'Review the rule above and try again. ✍️'"),
 ('↻ Jugar otra vez','↻ Play again'),
],
}

# ── Pares NUEVOS (transcritos con escapado HTML de una capa; se des-escapan) ───
NEW = {
'grammar.html': [
 ('&lt;html lang="es"&gt;','&lt;html lang="en"&gt;'),
 ('&lt;title&gt;Grammar — Portal NIS&lt;/title&gt;','&lt;title&gt;Grammar — NIS Portal&lt;/title&gt;'),
 ('🏫 Volver al Portal','🏫 Back to the Portal'),
 ('Gramática por grado. Iremos publicando más unidades poco a poco.','Grammar by grade. We will keep publishing more units little by little.'),
 ('Rutinas vs. lo que pasa ahora.','Routines vs. what is happening now.'),
 ('Aprende los 4 cambios (animado) y practica statements, questions y commands.','Learn the 4 changes (animated) and practise statements, questions and commands.'),
 ('Cada tiempo un paso atrás: ladder, matching, drill y whack-a-mole (incluye modales).','Every tense one step back: ladder, matching, drill and whack-a-mole (includes modals).'),
 ('Ruleta de oraciones para transformar en voz alta en clase (proyector).','Sentence wheel to transform out loud in class (projector).'),
 ('Elige la transformación correcta.','Choose the correct transformation.'),
 ('Ordena las palabras del reported speech.','Put the reported speech words in order.'),
 ('Avanzado B2: advise/suggest/apologise/accuse… con su patrón. Con racha y cronómetro.','Advanced B2: advise/suggest/apologise/accuse… with their pattern. With streak and timer.'),
 ('be + participio: el foco en la acción.','be + participle: the focus on the action.'),
 ('Repaso de tiempos clave B2.','Review of key B2 tenses.'),
 ('Mixtos, wish e inversión (Had I…, Should it…).','Mixed, wish and inversion (Had I…, Should it…).'),
 ("'Gramática de '+m[1]+' (nivel '+m[2]+'). Toca una unidad para practicar.'","'Grammar for '+m[1]+' (level '+m[2]+'). Tap a unit to practise.'"),
 ('&lt;span class="tag"&gt;Próximamente&lt;/span&gt;','&lt;span class="tag"&gt;Coming soon&lt;/span&gt;'),
 ('▶ Practicar&lt;/span&gt;','▶ Practise&lt;/span&gt;'),
 ("t:'Reported Speech — Ruleta'","t:'Reported Speech — Wheel'"),
 ("t:'Reported Speech — Ordena'","t:'Reported Speech — Word Order'"),
],
'reported-speech-verbs.html': [
 ('&lt;html lang="es"&gt;','&lt;html lang="en"&gt;'),
 ('&lt;div class="lvl"&gt;Nivel B2 · Challenge&lt;/div&gt;','&lt;div class="lvl"&gt;Level B2 · Challenge&lt;/div&gt;'),
 ('El reto avanzado: reporta usando el &lt;b&gt;verbo y patrón correctos&lt;/b&gt; (no solo say/tell). ¡Cuidado con la estructura! Suma &lt;b&gt;racha&lt;/b&gt; y compite contra el cronómetro.','The advanced challenge: report using the &lt;b&gt;correct verb and pattern&lt;/b&gt; (not just say/tell). Watch out for the structure! Build up your &lt;b&gt;streak&lt;/b&gt; and race against the clock.'),
 ('&lt;b&gt;Patrones clave:&lt;/b&gt;','&lt;b&gt;Key patterns:&lt;/b&gt;'),
 ('Elige el &lt;b&gt;reported speech&lt;/b&gt; con el verbo y patrón correctos:','Choose the &lt;b&gt;reported speech&lt;/b&gt; with the correct verb and pattern:'),
 ("'Ver resultado'","'See result'"),
 ('Siguiente →','Next →'),
 ('advise + objeto + to-infinitivo.','advise + object + to-infinitive.'),
 ('warn (+ objeto) + (not) to-infinitivo.','warn (+ object) + (not) to-infinitive.'),
 ('suggest + -ing (o suggest that + should).','suggest + -ing (or suggest that + should).'),
 ('offer + to-infinitivo.','offer + to-infinitive.'),
 ('admit + -ing (o admit to + -ing).','admit + -ing (or admit to + -ing).'),
 ('remind + objeto + to-infinitivo (no confundir con remember).','remind + object + to-infinitive (do not confuse with remember).'),
 ('promise + to-infinitivo.','promise + to-infinitive.'),
 ('invite + objeto + to-infinitivo.','invite + object + to-infinitive.'),
 ('refuse + to-infinitivo.','refuse + to-infinitive.'),
 ('threaten + to-infinitivo.','threaten + to-infinitive.'),
 ('recommend + -ing (o recommend that + should).','recommend + -ing (or recommend that + should).'),
 ('encourage + objeto + to-infinitivo.','encourage + object + to-infinitive.'),
 ('¡Maestro de los reporting verbs! 🏆 Racha máxima: ${best}.',"You're a master of reporting verbs! 🏆 Best streak: ${best}."),
 ("¡Muy bien! Dominas los patrones. Racha máxima: ${best}.","Great job! You've got the patterns down. Best streak: ${best}."),
 ('Buen intento. Repasa los patrones (-ing vs to) y vuelve a intentar.','Good try. Review the patterns (-ing vs to) and try again.'),
 ('Estos verbos son difíciles. Lee los patrones de arriba y reinténtalo.','These verbs are tricky. Read the patterns above and try again.'),
 ('🔥 mejor racha ${best}','🔥 best streak ${best}'),
 ('↻ Reintentar (mejora tu tiempo)','↻ Retry (beat your time)'),
],
'writing.html': [
 ('lang="es"','lang="en"'),
 ('&lt;title&gt;Writing — Portal NIS&lt;/title&gt;','&lt;title&gt;Writing — NIS Portal&lt;/title&gt;'),
 ('🏫 Volver al Portal','🏫 Back to the Portal'),
 ('Escritura por grado. Iremos publicando más tareas y herramientas poco a poco.',"Writing by grade. We'll be publishing more tasks and tools little by little."),
 ('Writing Part 1 (FCE): 6 tópicos a elegir. Arma tu opinion essay párrafo a párrafo con frases guía, banco de linkers, contador de palabras y checklist.','Writing Part 1 (FCE): 6 topics to choose from. Build your opinion essay paragraph by paragraph with guide phrases, a bank of linkers, a word counter and a checklist.'),
 ('Writing Part 1 (FCE): 6 tópicos a elegir, con frases guía, linkers, contador de palabras y checklist.','Writing Part 1 (FCE): 6 topics to choose from, with guide phrases, linkers, a word counter and a checklist.'),
 ("document.getElementById('lead').textContent='Escritura de '+m[1]+' (nivel '+m[2]+'). Toca una tarea para practicar.';","document.getElementById('lead').textContent='Writing for '+m[1]+' (level '+m[2]+'). Tap a task to practice.';"),
 ('&lt;span class="tag"&gt;Próximamente&lt;/span&gt;','&lt;span class="tag"&gt;Coming soon&lt;/span&gt;'),
 ('&lt;span class="tag go"&gt;▶ Practicar&lt;/span&gt;','&lt;span class="tag go"&gt;▶ Practice&lt;/span&gt;'),
 ('&lt;h2&gt;Próximamente&lt;/h2&gt;','&lt;h2&gt;Coming soon&lt;/h2&gt;'),
 ('&lt;div class="desc"&gt;Pronto publicaremos tareas de escritura para este grado.&lt;/div&gt;','&lt;div class="desc"&gt;We will soon publish writing tasks for this grade.&lt;/div&gt;'),
],
'opinion-essay-builder.html': [
 ('lang="es"','lang="en"'),
 ('📤 Entregar a mi profesor','📤 Hand in to my teacher'),
 ('✓ Entregado a tu profesor — ','✓ Handed in to your teacher — '),
 ('Tu ensayo está vacío. Escribe algo antes de entregar.','Your essay is empty. Write something before you hand in.'),
 ('Tu ensayo tiene ','Your essay has '),
 (' palabras (objetivo ',' words (target '),
 ('). ¿Entregar de todas formas?','). Hand in anyway?'),
 ('Inicia sesión en el Portal NIS (con tu cuenta de alumno) para entregar tu trabajo a tu profesor.','Log in to the NIS Portal (with your student account) to hand your work in to your teacher.'),
 ('No hay un destino de entrega configurado. Avisa a tu profesor.','No hand-in destination is set up. Let your teacher know.'),
 ('¿Entregar tu ensayo «','Hand in your essay "'),
 ('» (','" ('),
 (' palabras) a tu profesor?',' words) to your teacher?'),
 ('Enviando…','Sending…'),
 ('✅ ¡Entregado! Tu profesor recibirá tu ensayo por correo para corregirlo y darte tu nota. Puedes seguir editando y volver a entregar si lo necesitas.','✅ Handed in! Your teacher will receive your essay by email to mark it and give you your grade. You can keep editing and hand it in again if you need to.'),
 ('No se pudo entregar. Revisa tu conexión e inténtalo otra vez.','Could not hand in. Check your connection and try again.'),
],
'activities.html': [
 ('lang="es"','lang="en"'),
 ('&lt;a class="back" href="./"&gt;&amp;#127979; Volver al Portal&lt;/a&gt;','&lt;a class="back" href="./"&gt;&amp;#127979; Back to Portal&lt;/a&gt;'),
 ('&lt;p class="lead"&gt;Juegos y actividades interactivas por niveles del Marco Com&amp;uacute;n Europeo (A1 &amp;middot; A2 &amp;middot; B1 &amp;middot; B2 &amp;middot; C1).&lt;/p&gt;','&lt;p class="lead"&gt;Interactive games and activities by Common European Framework level (A1 &amp;middot; A2 &amp;middot; B1 &amp;middot; B2 &amp;middot; C1).&lt;/p&gt;'),
 ('&amp;#128218; Vocabulario CEFR (A1&amp;ndash;C1)','&amp;#128218; CEFR Vocabulary (A1&amp;ndash;C1)'),
 ('&lt;div class="desc"&gt;10 crucigramas tem&amp;aacute;ticos (familia, comida, viajes, tecnolog&amp;iacute;a&amp;hellip;) por cada nivel. Elige nivel y crossword 1&amp;ndash;10. Pistas, vidas, cron&amp;oacute;metro y resultados.&lt;/div&gt;','&lt;div class="desc"&gt;10 themed crosswords (family, food, travel, technology&amp;hellip;) for each level. Choose a level and crossword 1&amp;ndash;10. Clues, lives, timer and results.&lt;/div&gt;'),
 ('&lt;div class="desc"&gt;10 sopas de letras tem&amp;aacute;ticas por nivel. Las palabras van en cualquier direcci&amp;oacute;n (&amp;iexcl;tambi&amp;eacute;n al rev&amp;eacute;s y en diagonal!). A1 con 15 palabras hasta C1 con 50.&lt;/div&gt;','&lt;div class="desc"&gt;10 themed word searches per level. Words go in any direction (backwards and diagonal too!). From A1 with 15 words up to C1 with 50.&lt;/div&gt;'),
 ('&lt;div class="desc"&gt;Te gu&amp;iacute;a qu&amp;eacute; escribir en cada secci&amp;oacute;n (essay, article, email, story, review, report + estilos acad&amp;eacute;micos), con frases sugeridas, contador de palabras, pasos del proceso y checklist. A2&amp;ndash;C1.&lt;/div&gt;','&lt;div class="desc"&gt;Guides you on what to write in each section (essay, article, email, story, review, report + academic styles), with suggested phrases, a word counter, process steps and a checklist. A2&amp;ndash;C1.&lt;/div&gt;'),
 ('&lt;div class="desc"&gt;Crucigrama interactivo con el vocabulario de la Unidad 3 (Scrolling Identities). Pistas, verificaci&amp;oacute;n y puntaje.&lt;/div&gt;','&lt;div class="desc"&gt;Interactive crossword with the Unit 3 vocabulary (Scrolling Identities). Clues, checking and scoring.&lt;/div&gt;'),
 ('&lt;div class="desc"&gt;Sopa de letras con 48 palabras del tema. Arrastra sobre las letras para encontrarlas; la dificultad sube por nivel.&lt;/div&gt;','&lt;div class="desc"&gt;Word search with 48 words from the topic. Drag over the letters to find them; difficulty increases by level.&lt;/div&gt;'),
],
'reported-speech.html': [
 ('&lt;html lang="es"&gt;','&lt;html lang="en"&gt;'),
 ('&lt;span class="pill"&gt;Pregunta ','&lt;span class="pill"&gt;Question '),
 ('← Volver a Grammar','← Back to Grammar'),
],
'reported-speech-order.html': [
 ('&lt;html lang="es"&gt;','&lt;html lang="en"&gt;'),
],
'grammar-quiz.html': [
 ('&lt;html lang="es"&gt;','&lt;html lang="en"&gt;'),
],
}

for f, reps in NEW.items():
    REPL.setdefault(f, []).extend([(deesc(o), deesc(n)) for o, n in reps])

# ── Aplicar ───────────────────────────────────────────────────────────────────
total_ok = total_miss = 0
for f, reps in REPL.items():
    p = os.path.join(REPO, f)
    if not os.path.exists(p):
        print(f, '-> NO EXISTE, saltado'); continue
    s = open(p, encoding='utf-8').read(); miss = []
    for old, new in reps:
        if old in s:
            s = s.replace(old, new); total_ok += 1
        else:
            miss.append(old); total_miss += 1
    open(p, 'w', encoding='utf-8').write(s)
    print(f, '-> OK' if not miss else f'-> {len(miss)} NO-MATCH:')
    for m in miss:
        print('   NO-MATCH:', repr(m[:80]))

# ── Reporte de español residual (heurístico) — ignora curso francés y reportes ──
SPANISH_HINT = re.compile(r'\b(Gram[aá]tica|Juego|Nivel|Volver|Pr[oó]xima|actividad|Elige|'
    r'Ordena|Comprobar|Reiniciar|Siguiente|Respuesta|Entregar|Escritura|Toca|palabras|'
    r'crucigrama|sopa|correcta|inténtalo|resultado)\b', re.I)
print('\n── residual (revisar manualmente si aparece) ──')
for f in REPL:
    p = os.path.join(REPO, f)
    if not os.path.exists(p): continue
    for i, line in enumerate(open(p, encoding='utf-8'), 1):
        if SPANISH_HINT.search(line) and 'lang=' not in line:
            print(f'{f}:{i}: {line.strip()[:100]}')

print(f'\nTOTAL: {total_ok} reemplazos aplicados, {total_miss} sin match.')
