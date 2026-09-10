function openRoadmap(){var d=document.getElementById('roadmapDoc').textContent;var b=new Blob([d],{type:'text/html'});window.open(URL.createObjectURL(b),'_blank');}
const KEY='jm_centro_v4';
let LANG=localStorage.getItem('jm_lang')||'en';
let activeTrack='english';

/* ---------- i18n UI strings ---------- */
const UI={
  en:{
    hdr_label:'Tutoring Center · Paolo Baca',
    hdr_sub:'9th Grade · San Ignacio de Recalde — World History & English',
    chip1:'Criteria → Corrections → Analysis', chip2:'Reading plan: Anne Frank', chip3:'Data saved locally',
    tab_dash:'Dashboard', tab_crit:'Criteria', tab_corr:'Corrections', tab_an:'Analysis', tab_read:'Reading Plan', tab_data:'Data',
    p_kicker:'Overview', p_title:'Progress dashboard',
    p_desc:'A quick view of where José Manuel stands: how much material you have logged, his recurring weaknesses, and what comes next in his reading plan.',
    weak_t:'Most recurring weaknesses', weak_s:'Criteria with the most logged corrections (weighted by severity).',
    nextread_t:'Next in the Reading Plan',
    roadmap_t:'6-Week Roadmap (History)', roadmap_s:'Critical essay · T.E.X.T · Value & Limitation',
    roadmap_hint:"José Manuel's earlier app. This Center complements it with criteria, corrections, analysis and the reading plan.",
    step1:'Step 1', crit_title:"Teachers' evaluation criteria",
    crit_desc:"Record each teacher's rubric here. Every criterion is later linked to corrections to measure where he struggles most. Seeded with the IB History rubric (critical essay) and the English criteria.",
    add_crit:'Add criterion', fl_subject:'Subject', opt_hist:'History (World History)', opt_eng:'English / Literature',
    fl_teacher:'Teacher', ph_teacher:'e.g. César Bonilla / Alejandro Ruiz',
    fl_crit:'Criterion', ph_crit:'e.g. Include Value & Limitation of two sources',
    fl_desc:'What it assesses / description', ph_desc:'Detail of what the teacher looks for in this criterion…',
    btn_add_crit:'+ Add criterion',
    step2:'Step 2', corr_title:'Corrections by criterion',
    corr_desc:"Each time you review José Manuel's work, log the correction and link it to the criterion it failed. This feeds the automatic analysis. Seeded with the real corrections from his manuscripts.",
    log_corr:'Log a correction', fl_date:'Date', fl_work:'Work / source', ph_work:'e.g. Galileo essay — Value & Limitation',
    fl_criterion:'Criterion affected', fl_issue:'Problem found (what he did wrong)', ph_issue:'e.g. Run-on sentences: chains ideas with commas, no full stops.',
    fl_fix:'Correction / how to improve it', ph_fix:'e.g. 1 idea = 1 sentence. Break with a full stop.',
    fl_sev:'Severity', sev_minor:'Minor', sev_mod:'Moderate', sev_serious:'Serious / recurring', btn_log:'+ Log correction',
    step3:'Step 3', an_title:'Automatic analysis',
    an_desc:'The Center cross-references criteria × corrections and generates the diagnosis: what fails most, in which subject, and what to prioritize next class.',
    an_bycrit_t:'Corrections by criterion (weighted by severity)', an_bycrit_s:'The longer the bar, the more urgent the focus.',
    an_bysub:'By subject', an_bysev:'By severity',
    read_kicker:'Reading & Study plan',
    read_desc:'Goodrich & Hackett. Tick each scene as you finish it; each one carries vocabulary, comprehension questions and an analysis focus. You can add your own reading entries at the bottom.',
    read_desc_h:'Holt McDougal — Patterns of Interaction, Ch. 22 (1550–1789). The four chapter sections with the key Terms & Names and the guided-reading questions. This is the content backbone for his History essays.',
    trk_en:'📖 English — Anne Frank', trk_hist:'📜 History — Ch. 22',
    st_sections:'Sections reviewed',
    read_addt:'Add a reading entry', fl_rdtitle:'Title / scene', ph_rdtitle:'e.g. Act Two — Scene 1',
    fl_pages:'Pages', ph_pages:'e.g. 304–320', fl_notes:'Notes / focus', ph_notes:'Themes, vocabulary, questions…', btn_addread:'+ Add reading',
    data_kicker:'Backup', data_title:'Data & backup',
    data_desc:'Everything is saved in this browser (localStorage). Export a file to back it up or move it to another computer; import it to restore.',
    data_card_t:'Export / Import', btn_export:'⤓ Export JSON', btn_import:'⤒ Import JSON', btn_print:'🖨 Print', btn_reset:'↺ Restore seeded data',
    tab_quiz:'Quiz', quiz_kicker:'History · Ch. 22', quiz_title:'Self-check exercises',
    quiz_desc:'Auto-graded Terms & Names quiz and comprehension questions with model answers — straight from the Holt McDougal Ch. 22 guided reading.',
    q_terms_t:'Terms & Names — multiple choice', q_terms_s:'Read the definition and pick the correct term. It marks itself instantly.',
    q_reset:'↺ New attempt', q_comp_t:'Comprehension questions', q_comp_s:'Try to answer first, then reveal the model answer and mark yourself.',
    q_show:'Show model answer', q_hide:'Hide answer', q_got:'✓ Got it', q_review:'↺ Review', q_mastered:'mastered',
    q_history:'Attempt history', q_history_s:'Save each attempt to track progress over time.', q_save:'＋ Save result',
    q_noattempts:'No attempts saved yet. Answer some questions and press “Save result”.', q_terms_lbl:'Terms', q_comp_lbl:'Comprehension', q_saved:'Result saved.',
    tab_bio:'Biology', bio_kicker:'Biology · Prof. Carlos A. Enríquez', bio_title:'Chromosomes, Meiosis & Heredity',
    bio_desc:'A visual, hands-on lab for the three decks: Chromosomes & Meiosis (09), the Process of Meiosis (10) and Mendel & Heredity (11). Watch the animation, flip the cards, and build a cross to memorize every term.',
    bio_play:'▶ Play meiosis', bio_pause:'❚❚ Pause', bio_prev:'‹ Prev', bio_next:'Next ›', bio_reset:'↺ Restart',
    bio_legend:'Legend', bio_mat:'maternal (from mother)', bio_pat:'paternal (from father)', bio_pair:'a pair = homologous', bio_sis:'two bars = sister chromatids',
    bio_player_t:'① Meiosis — animated walkthrough', bio_player_s:'1 diploid cell → 4 unique haploid cells. DNA is copied once, the cell divides twice. Use ▶ or step with Prev/Next.',
    bio_hsv_t:'② The #1 confusion: homologous chromosomes vs sister chromatids', bio_hsv_s:'Tap a card to highlight it. Memory hook: “Meiosis 1 = homologs out · Meiosis 2 = sisters split”.',
    bio_cards_t:'③ Memory flashcards', bio_cards_s:'Tap to flip. Mark the ones you know — the counter tracks how many terms you have memorized.', bio_mastered:'memorized',
    bio_pun_t:'④ Mendel — interactive Punnett square', bio_pun_s:'Cross two pea plants for flower colour (P = purple, dominant · p = white, recessive). A Pp × Pp cross gives Mendel’s 3 : 1.',
    bio_topics_t:'Key concepts from each deck', bio_p1:'Parent 1', bio_p2:'Parent 2',
    bio_sub_cells:'Cells', bio_sub_gen:'Genetics',
    cell_diag_t:'① The cell — click each organelle', cell_diag_s:'Tap any part of the cell to learn its name and function. Switch between an animal and a plant cell.',
    cell_animal:'🐾 Animal cell', cell_plant:'🌿 Plant cell',
    cell_info_default:'Click an organelle', cell_info_hint:'Tap any structure in the diagram to see what it is and what it does.',
    cycle_t:'② The cell cycle — interactive wheel', cycle_s:'Interphase (G1·S·G2) is ~90% of the cycle, then M phase (mitosis + cytokinesis). Step or ▶ to travel the wheel.',
    mit_t:'③ Mitosis — animated walkthrough', mit_s:'1 cell → 2 genetically IDENTICAL diploid cells. Sister chromatids separate (no crossing over).',
    mit_vs:'Compare: mitosis makes 2 identical diploid cells; meiosis (Genetics tab) makes 4 unique haploid cells.',
    cellcards_t:'④ Cell flashcards', cellcards_s:'Tap to flip. Mark the ones you know — the counter tracks how many you have memorized.',
    celltopics_t:'Key concepts from each deck',
    /* dynamic */
    all:'All', hist:'History', eng:'English', corrections_word:'correction(s)',
    sev_list:['','Minor','Moderate','Serious'],
    no_crit:'No criteria for this filter.', no_corr:'No corrections logged.', no_data:'No data yet.',
    serious_word:['Serious','Moderate','Minor'],
    st_crit:'Criteria loaded', st_corr:'Corrections', st_serious:'Serious points', st_read:'Reading plan',
    st_scenes:'Scenes read', st_progress:'Reading plan progress', st_remaining:'Remaining',
    goread:'Go to reading plan →', read_done:'Reading plan complete! 🎉',
    lbl_focus:'Analysis focus', lbl_vocab:'Vocabulary', lbl_comp:'Comprehension', lbl_notes:'Notes', rm_entry:'✕ Remove entry',
    crit_word:'Criterion:', prob_word:'Problem:', fix_word:'Correction:',
    a_h:"José Manuel's diagnosis",
    a_none:'No corrections yet. Log some in the <b>Corrections</b> tab and the automatic diagnosis will appear here.',
    a_logged:(t,h,e)=>`<b>${t} corrections</b> have been logged (${h} in History, ${e} in English). `,
    a_top:(n,c,w)=>`His weakness #1 is <b>${n}</b> (${c} correction${c>1?'s':''}, accumulated severity ${w})`,
    a_top2:n=>`, followed by <b>${n}</b>. `,
    a_serious:n=>`There ${n>1?'are':'is'} <b>${n} serious/recurring point${n>1?'s':''}</b> to tackle first. `,
    a_rec:n=>`<br><br><b>Next-class recommendation:</b> ${n?'focus on <b>'+n+'</b>':'—'} with guided practice on his own text, and close with a model paragraph that meets every criterion.`,
    al_critname:'Enter the criterion name.', al_addfirst:'Add criteria first.', al_issue:'Describe the problem found.',
    al_title:'Enter a title.', al_imported:'Data imported.', al_invalid:'Invalid file.',
    cf_delcrit:'There are corrections linked to this criterion. Delete anyway? (they will be left with no criterion)',
    cf_reset:'This deletes your changes and restores the factory-seeded data. Continue?',
    di:(c,r,d,s)=>`Criteria: <b>${c}</b> · Corrections: <b>${r}</b> · Readings: <b>${d}</b> · Seeded: ${s||'—'}`,
    untitled:'(untitled)', delcrit_label:'(deleted criterion)'
  },
  es:{
    hdr_label:'Centro de Tutoría · Paolo Baca',
    hdr_sub:'9.º Grado · San Ignacio de Recalde — World History & English',
    chip1:'Criterios → Correcciones → Análisis', chip2:'Plan lector: Anne Frank', chip3:'Datos guardados localmente',
    tab_dash:'Panel', tab_crit:'Criterios', tab_corr:'Correcciones', tab_an:'Análisis', tab_read:'Plan Lector', tab_data:'Datos',
    p_kicker:'Resumen', p_title:'Panel de progreso',
    p_desc:'Vista rápida del estado de José Manuel: cuánto material has registrado, sus debilidades recurrentes y qué sigue en su plan lector.',
    weak_t:'Debilidades más recurrentes', weak_s:'Criterios con más correcciones registradas (ponderado por gravedad).',
    nextread_t:'Próximo en el Plan Lector',
    roadmap_t:'Roadmap 6 semanas (Historia)', roadmap_s:'Ensayo crítico · T.E.X.T · Value & Limitation',
    roadmap_hint:'App previa de José Manuel. Este Centro la complementa con criterios, correcciones, análisis y el plan lector.',
    step1:'Paso 1', crit_title:'Criterios de evaluación de los profesores',
    crit_desc:'Aquí registras la rúbrica de cada profesor. Cada criterio luego se enlaza a las correcciones para medir en qué falla más. Sembrado con la rúbrica IB de Historia (ensayo crítico) y los criterios de English.',
    add_crit:'Añadir criterio', fl_subject:'Materia', opt_hist:'Historia (World History)', opt_eng:'English / Literatura',
    fl_teacher:'Profesor', ph_teacher:'Ej. César Bonilla / Alejandro Ruiz',
    fl_crit:'Criterio', ph_crit:'Ej. Incluir Value & Limitation de dos fuentes',
    fl_desc:'Qué evalúa / descripción', ph_desc:'Detalle de qué busca el profesor en este criterio…',
    btn_add_crit:'+ Añadir criterio',
    step2:'Paso 2', corr_title:'Correcciones según los criterios',
    corr_desc:'Cada vez que revisas un trabajo de José Manuel, registras la corrección y la enlazas al criterio que falló. Esto alimenta el análisis automático. Sembrado con las correcciones reales de sus manuscritos.',
    log_corr:'Registrar corrección', fl_date:'Fecha', fl_work:'Trabajo / fuente', ph_work:'Ej. Ensayo Galileo — Value & Limitation',
    fl_criterion:'Criterio afectado', fl_issue:'Problema detectado (qué hizo mal)', ph_issue:'Ej. Oraciones corridas: encadena ideas con comas sin punto.',
    fl_fix:'Corrección / cómo mejorarlo', ph_fix:'Ej. 1 idea = 1 oración. Cortar en punto y seguido.',
    fl_sev:'Gravedad', sev_minor:'Leve', sev_mod:'Media', sev_serious:'Grave / recurrente', btn_log:'+ Registrar corrección',
    step3:'Paso 3', an_title:'Análisis automático',
    an_desc:'El Centro cruza criterios × correcciones y genera el diagnóstico: qué falla más, en qué materia, y qué priorizar en la próxima clase.',
    an_bycrit_t:'Correcciones por criterio (ponderado por gravedad)', an_bycrit_s:'Cuanto más larga la barra, más urgente el foco.',
    an_bysub:'Por materia', an_bysev:'Por gravedad',
    read_kicker:'Plan de lectura y estudio',
    read_desc:'Goodrich & Hackett. Marca cada escena al terminarla; cada una trae vocabulario, preguntas de comprensión y un foco de análisis. Puedes añadir tus propias entradas de lectura al final.',
    read_desc_h:'Holt McDougal — Patterns of Interaction, Cap. 22 (1550–1789). Las cuatro secciones del capítulo con los Terms & Names clave y las preguntas de guided reading. Es el respaldo de contenido para sus ensayos de Historia.',
    trk_en:'📖 English — Anne Frank', trk_hist:'📜 Historia — Cap. 22',
    st_sections:'Secciones repasadas',
    read_addt:'Añadir entrada de lectura', fl_rdtitle:'Título / escena', ph_rdtitle:'Ej. Act Two — Scene 1',
    fl_pages:'Páginas', ph_pages:'Ej. 304–320', fl_notes:'Notas / foco', ph_notes:'Temas, vocabulario, preguntas…', btn_addread:'+ Añadir lectura',
    data_kicker:'Respaldo', data_title:'Datos & respaldo',
    data_desc:'Todo se guarda en este navegador (localStorage). Exporta un archivo para respaldar o llevarlo a otra PC; impórtalo para restaurar.',
    data_card_t:'Exportar / Importar', btn_export:'⤓ Exportar JSON', btn_import:'⤒ Importar JSON', btn_print:'🖨 Imprimir', btn_reset:'↺ Restaurar datos sembrados',
    tab_quiz:'Quiz', quiz_kicker:'Historia · Cap. 22', quiz_title:'Ejercicios de autoevaluación',
    quiz_desc:'Quiz de Terms & Names autocalificado y preguntas de comprensión con respuesta modelo — directo del guided reading del Cap. 22 (Holt McDougal).',
    q_terms_t:'Terms & Names — opción múltiple', q_terms_s:'Lee la definición y elige el término correcto. Se califica solo al instante.',
    q_reset:'↺ Nuevo intento', q_comp_t:'Preguntas de comprensión', q_comp_s:'Intenta responder primero, luego revela la respuesta modelo y autoevalúate.',
    q_show:'Ver respuesta modelo', q_hide:'Ocultar respuesta', q_got:'✓ Lo tengo', q_review:'↺ Repasar', q_mastered:'dominadas',
    q_history:'Historial de intentos', q_history_s:'Guarda cada intento para ver el progreso en el tiempo.', q_save:'＋ Guardar resultado',
    q_noattempts:'Aún no hay intentos guardados. Responde algunas preguntas y pulsa “Guardar resultado”.', q_terms_lbl:'Términos', q_comp_lbl:'Comprensión', q_saved:'Resultado guardado.',
    tab_bio:'Biología', bio_kicker:'Biología · Prof. Carlos A. Enríquez', bio_title:'Cromosomas, Meiosis y Herencia',
    bio_desc:'Un laboratorio visual e interactivo para las tres presentaciones: Chromosomes & Meiosis (09), Process of Meiosis (10) y Mendel & Heredity (11). Mira la animación, voltea las tarjetas y arma un cruce para memorizar cada término.',
    bio_play:'▶ Reproducir meiosis', bio_pause:'❚❚ Pausa', bio_prev:'‹ Anterior', bio_next:'Siguiente ›', bio_reset:'↺ Reiniciar',
    bio_legend:'Leyenda', bio_mat:'materno (de la madre)', bio_pat:'paterno (del padre)', bio_pair:'una pareja = homólogos', bio_sis:'dos barras = cromátidas hermanas',
    bio_player_t:'① Meiosis — recorrido animado', bio_player_s:'1 célula diploide → 4 células haploides únicas. El ADN se copia una vez, la célula se divide dos veces. Usa ▶ o avanza con Anterior/Siguiente.',
    bio_hsv_t:'② La confusión #1: cromosomas homólogos vs. cromátidas hermanas', bio_hsv_s:'Toca una tarjeta para resaltarla. Truco: «Meiosis 1 = salen los homólogos · Meiosis 2 = se separan las hermanas».',
    bio_cards_t:'③ Flashcards de memoria', bio_cards_s:'Toca para voltear. Marca las que ya sabes — el contador lleva cuántos términos memorizaste.', bio_mastered:'memorizados',
    bio_pun_t:'④ Mendel — cuadro de Punnett interactivo', bio_pun_s:'Cruza dos plantas de arveja por el color de la flor (P = púrpura, dominante · p = blanco, recesivo). Un cruce Pp × Pp da el 3 : 1 de Mendel.',
    bio_topics_t:'Conceptos clave de cada presentación', bio_p1:'Progenitor 1', bio_p2:'Progenitor 2',
    bio_sub_cells:'Células', bio_sub_gen:'Genética',
    cell_diag_t:'① La célula — haz clic en cada organelo', cell_diag_s:'Toca cualquier parte de la célula para ver su nombre y función. Cambia entre célula animal y vegetal.',
    cell_animal:'🐾 Célula animal', cell_plant:'🌿 Célula vegetal',
    cell_info_default:'Haz clic en un organelo', cell_info_hint:'Toca cualquier estructura del diagrama para ver qué es y qué hace.',
    cycle_t:'② El ciclo celular — rueda interactiva', cycle_s:'La interfase (G1·S·G2) es ~90% del ciclo, luego la fase M (mitosis + citocinesis). Avanza o pulsa ▶ para recorrer la rueda.',
    mit_t:'③ Mitosis — recorrido animado', mit_s:'1 célula → 2 células diploides IDÉNTICAS. Se separan las cromátidas hermanas (sin crossing over).',
    mit_vs:'Compara: la mitosis hace 2 células diploides idénticas; la meiosis (pestaña Genética) hace 4 haploides únicas.',
    cellcards_t:'④ Flashcards de la célula', cellcards_s:'Toca para voltear. Marca las que ya sabes — el contador lleva cuántas memorizaste.',
    celltopics_t:'Conceptos clave de cada presentación',
    all:'Todos', hist:'Historia', eng:'English', corrections_word:'corrección(es)',
    sev_list:['','Leve','Media','Grave'],
    no_crit:'No hay criterios para este filtro.', no_corr:'Sin correcciones registradas.', no_data:'Sin datos aún.',
    st_crit:'Criterios cargados', st_corr:'Correcciones', st_serious:'Puntos graves', st_read:'Plan lector',
    st_scenes:'Escenas leídas', st_progress:'Avance del plan lector', st_remaining:'Pendientes',
    goread:'Ir al plan lector →', read_done:'¡Plan lector completo! 🎉',
    lbl_focus:'Foco de análisis', lbl_vocab:'Vocabulario', lbl_comp:'Comprensión', lbl_notes:'Notas', rm_entry:'✕ Quitar entrada',
    crit_word:'Criterio:', prob_word:'Problema:', fix_word:'Corrección:',
    a_h:'Diagnóstico de José Manuel',
    a_none:'Aún no hay correcciones. Registra algunas en la pestaña <b>Correcciones</b> y aquí verás el diagnóstico automático.',
    a_logged:(t,h,e)=>`Se han registrado <b>${t} correcciones</b> (${h} en Historia, ${e} en English). `,
    a_top:(n,c,w)=>`Su debilidad #1 es <b>${n}</b> (${c} corrección${c>1?'es':''}, gravedad acumulada ${w})`,
    a_top2:n=>`, seguida de <b>${n}</b>. `,
    a_serious:n=>`Hay <b>${n} punto(s) grave(s)/recurrente(s)</b> que conviene atacar primero. `,
    a_rec:n=>`<br><br><b>Recomendación de la próxima clase:</b> ${n?'enfocarse en <b>'+n+'</b>':'—'} con práctica guiada sobre su propio texto, y cerrar con un párrafo modelo que cumpla todos los criterios.`,
    al_critname:'Escribe el nombre del criterio.', al_addfirst:'Primero registra criterios.', al_issue:'Describe el problema detectado.',
    al_title:'Pon un título.', al_imported:'Datos importados.', al_invalid:'Archivo inválido.',
    cf_delcrit:'Hay correcciones enlazadas a este criterio. ¿Eliminar igual? (quedarán sin criterio)',
    cf_reset:'Esto borra tus cambios y restaura los datos sembrados de fábrica. ¿Seguir?',
    di:(c,r,d,s)=>`Criterios: <b>${c}</b> · Correcciones: <b>${r}</b> · Lecturas: <b>${d}</b> · Sembrado: ${s||'—'}`,
    untitled:'(sin título)', delcrit_label:'(criterio eliminado)'
  }
};
function T(k){return UI[LANG][k];}
function L(v){if(v&&typeof v==='object'&&!Array.isArray(v))return v[LANG]!=null?v[LANG]:(v.en!=null?v.en:Object.values(v)[0]);return v;}

/* ---------- SEED (bilingual, real data from the photos) ---------- */
function seed(){
  const C=(subject,teacher,name,desc)=>({id:uid(),subject,teacher,name,desc});
  const criteria=[
    C('History','Bonilla/Villegas/Ruiz',
      {en:'Understand the question',es:'Entender la pregunta'},
      {en:'Read it twice, underline keywords and dates; identify the verb (analyze/examine/to what extent) and do NOT describe.',es:'Leer 2 veces, subrayar keywords y fechas; identificar el verbo (analyze/examine/to what extent) y NO describir.'}),
    C('History','Bonilla/Villegas/Ruiz',
      {en:'Complete introduction',es:'Introducción completa'},
      {en:'General statement + definitions + brief answer + announce the topics to be used.',es:'Statement general + definiciones + respuesta breve + anuncio de los topics que usará.'}),
    C('History','Bonilla/Villegas/Ruiz',
      {en:'T.E.X.T paragraph structure',es:'Estructura T.E.X.T por párrafo'},
      {en:'Topic sentence (answers the question) → Explanation → eXample/evidence → Tie-up. One topic per paragraph.',es:'Topic sentence (responde la pregunta) → Explanation → eXample/evidencia → Tie-up. Un solo topic por párrafo.'}),
    C('History','Bonilla/Villegas/Ruiz',
      {en:'Topic sentence answers the question',es:'Topic sentence responde la pregunta'},
      {en:'The first sentence of each paragraph must answer directly, using words from the question.',es:'La primera oración de cada párrafo debe contestar directamente, usando palabras de la pregunta.'}),
    C('History','Bonilla/Villegas/Ruiz',
      {en:'Historical detail (facts)',es:'Detalle histórico (facts)'},
      {en:'Dates, events, figures, policies and concrete data that support the argument.',es:'Fechas, eventos, personajes, políticas y datos concretos que sostienen el argumento.'}),
    C('History','Bonilla/Villegas/Ruiz',
      {en:'Value & Limitation of sources',es:'Value & Limitation de las fuentes'},
      {en:'Include the VALUE and the LIMITATION of TWO sources from the text. Develop both, not just the Value.',es:'Incluir el VALOR y la LIMITACIÓN de DOS fuentes del texto. Desarrollar ambas, no solo el Value.'}),
    C('History','Bonilla/Villegas/Ruiz',
      {en:'Short, referenced APA quotes',es:'Citas APA cortas y referenciadas'},
      {en:'Brief quotes in quotation marks + reference (Author, year, p.). The quote is part of the support and must be commented on.',es:'Citas breves entre comillas + referencia (Apellido, año, p.). La cita es parte del soporte, hay que comentarla.'}),
    C('History','Bonilla/Villegas/Ruiz',
      {en:'Formal academic tone',es:'Tono académico formal'},
      {en:'3rd person; no contractions, no 1st/2nd person, no slang or emotional language/generalizations.',es:'3.ª persona; sin contracciones, sin 1.ª/2.ª persona, sin slang ni lenguaje emocional/generalizaciones.'}),
    C('History','Bonilla/Villegas/Ruiz',
      {en:'Linking devices / connectors',es:'Linking devices / conectores'},
      {en:'Vary connectors (however, therefore, for instance, as a result) to clarify ideas.',es:'Variar conectores (however, therefore, for instance, as a result) para clarificar ideas.'}),
    C('History','Bonilla/Villegas/Ruiz',
      {en:'Conclusion with reflection',es:'Conclusión con reflexión'},
      {en:'Summarize the body + direct answer + reflection (what it teaches us today / lesson from the past).',es:'Resumir el cuerpo + respuesta directa + reflexión (qué nos enseña hoy / lección del pasado).'}),
    C('History','Bonilla/Villegas/Ruiz',
      {en:'OPCVL / Bias & Perspective',es:'OPCVL / Bias & Perspective'},
      {en:"Analyze Origin, Purpose, Content, Value, Limitation; detect the author's bias and perspective.",es:'Analizar Origin, Purpose, Content, Value, Limitation; detectar sesgo y perspectiva del autor.'}),
    C('English','Paolo Baca',
      {en:'Text comprehension',es:'Comprensión del texto'},
      {en:'Understand the plot, characters and sequence of the play (dialogue vs. stage directions).',es:'Entender trama, personajes y secuencia de la obra (diálogo vs. acotaciones).'}),
    C('English','Paolo Baca',
      {en:'Character analysis',es:'Análisis de personaje'},
      {en:'Infer emotions and motivations from the dialogue and stage directions.',es:'Inferir emociones y motivaciones desde el diálogo y las stage directions.'}),
    C('English','Paolo Baca',
      {en:'Theme identification',es:'Identificación de temas'},
      {en:'Recognize themes: tension of confinement, generosity in danger, identity/adolescence.',es:'Reconocer temas: tensión del encierro, generosidad ante el peligro, identidad/adolescencia.'}),
    C('English','Paolo Baca',
      {en:'PEE paragraph + quote',es:'Párrafo PEE + cita'},
      {en:'Point–Evidence–Explanation with a short, well-integrated quote from the text.',es:'Point–Evidence–Explanation con una cita corta del texto bien integrada.'}),
    C('English','Paolo Baca',
      {en:'Grammar accuracy & spelling',es:'Corrección gramatical y ortografía'},
      {en:'Complete sentences, no run-ons; correct spelling; consistent verb tenses.',es:'Oraciones completas, sin run-ons; spelling correcto; tiempos verbales consistentes.'}),
  ];
  const byName=n=>criteria.find(x=>x.name.en===n).id;
  const corr=(date,subject,work,cn,issue,fix,sev)=>({id:uid(),date,subject,work,criterionId:byName(cn),issue,fix,sev});
  const corrections=[
    corr('2026-06-15','History',{en:'Galileo essay — Value & Limitation',es:'Ensayo Galileo — Value & Limitation'},'Grammar accuracy & spelling',
      {en:'Run-on sentences: chains 3–4 ideas with commas and no full stop throughout the Value paragraph.',es:'Oraciones corridas (run-ons): encadena 3–4 ideas con comas sin punto en todo el párrafo de Value.'},
      {en:'1 idea = 1 sentence. Break with full stops; max. 2 clauses per sentence.',es:'1 idea = 1 oración. Cortar en punto y seguido; máx. 2 cláusulas por oración.'},3),
    corr('2026-06-15','History',{en:'Galileo essay — Value & Limitation',es:'Ensayo Galileo — Value & Limitation'},'Formal academic tone',
      {en:'Repeated filler: "it is highly relevant to emphasize that…", "highly accurate" several times.',es:'Muletilla repetida: "it is highly relevant to emphasize that…", "highly accurate" varias veces.'},
      {en:'Replace with direct verbs: "This source shows…", "Galileo argues…". Cut the padding.',es:'Reemplazar por verbos directos: "This source shows…", "Galileo argues…". Eliminar el relleno.'},2),
    corr('2026-06-15','History',{en:'Galileo essay — Value & Limitation',es:'Ensayo Galileo — Value & Limitation'},'Value & Limitation of sources',
      {en:'The VALUE part is developed but the LIMITATION is short and generic.',es:'La parte de VALUE está desarrollada pero la LIMITATION queda corta y genérica.'},
      {en:"Develop the limitation: biased source (Galileo defends his position), addressed to a duchess (persuasive intent), missing the Church's voice.",es:'Desarrollar la limitación: fuente parcial (Galileo defiende su postura), dirigida a una duquesa (intención persuasiva), falta la voz de la Iglesia.'},3),
    corr('2026-06-15','History',{en:'Galileo essay — Value & Limitation',es:'Ensayo Galileo — Value & Limitation'},'Grammar accuracy & spelling',
      {en:'Missing subject: "because is the time period…" (missing "it").',es:'Sujeto omitido: "because is the time period…" (falta "it").'},
      {en:'Remember the subject: "because it is the time period…". Check all "because/that" clauses.',es:'Recordar el sujeto: "because it is the time period…". Revisar todas las cláusulas con "because/that".'},2),
    corr('2026-06-18','History',{en:"Thirty Years' War essay",es:"Ensayo Thirty Years' War"},'T.E.X.T paragraph structure',
      {en:'Mixes more than one topic per paragraph; the Tie-up (closing) is missing or does not return to the question.',es:'Mezcla más de un topic por párrafo; el Tie-up (cierre) falta o no retoma la pregunta.'},
      {en:'One topic per paragraph and close each one with a sentence that returns to the question (the final T of T.E.X.T).',es:'Un topic por párrafo y cerrar cada uno con una oración que vuelva a la pregunta (la T final del T.E.X.T).'},2),
    corr('2026-06-18','History',{en:'Scientific Revolution essay',es:'Ensayo Scientific Revolution'},'Topic sentence answers the question',
      {en:'Starts the paragraph narrating context instead of answering "to what extent".',es:'Empieza el párrafo narrando contexto en vez de responder "to what extent".'},
      {en:'First sentence = direct answer using words from the question; context comes after as the Explanation.',es:'Primera oración = respuesta directa con palabras de la pregunta; el contexto va después como Explanation.'},2),
    corr('2026-06-18','History',{en:'Globalization essay (15th century)',es:'Ensayo Globalización (15th century)'},'Short, referenced APA quotes',
      {en:'Long quote with no comment and incomplete reference; spelling "15h century", "dependend".',es:'Cita larga sin comentar y referencia incompleta; ortografía "15h century", "dependend".'},
      {en:'Brief quote in quotation marks + (Author, year, p.) + your own comment. Fix 15th / dependent.',es:'Cita breve entre comillas + (Autor, año, p.) + comentario propio. Corregir 15th / dependent.'},2),
    corr('2026-06-10','English',{en:'Writing practice',es:'Práctica de escritura'},'Grammar accuracy & spelling',
      {en:'Very long sentences (40+ words) chained together; loses clarity.',es:'Oraciones muy largas (40+ palabras) encadenadas; pierde claridad.'},
      {en:'Break into shorter sentences; vary connectors.',es:'Dividir en oraciones más cortas; variar conectores.'},2),
  ];
  return {criteria,corrections,reading:[...anneFrankScenes(),...chapter22Sections()],quizLog:[],seededAt:new Date().toISOString().slice(0,10)};
}

function anneFrankScenes(){
  const s=(title,pages,vocab,comp,focus,done=false)=>({id:uid(),track:'english',title,pages,vocab,comp,focus,done});
  return [
    s({en:'Background & characters',es:'Background & personajes'},'279–280',
      ['Holocaust','persecution','in hiding','Secret Annex','threadbare'],
      [{en:'Why did the Frank family go into hiding, and where?',es:'¿Por qué la familia Frank se escondió y dónde?'},
       {en:'What prize did the play win, and how does it differ from the real diary?',es:'¿Qué premio ganó la obra y en qué se diferencia del diario real?'}],
      {en:'Historical context: who they are and why the play (drama) differs from the diary.',es:'Contexto histórico: quiénes son y por qué la obra (drama) difiere del diario.'}),
    s({en:'Scene 1 — Mr. Frank returns (1945)',es:'Scene 1 — Mr. Frank regresa (1945)'},'281–283',
      ['curtain rises','dusty','rucksack','carillon','restlessly'],
      [{en:'In what year and place does the play open?',es:'¿En qué año y lugar abre la obra?'},
       {en:"How does the stage direction describe Mr. Frank's condition?",es:'¿Cómo describe la acotación el estado de Mr. Frank?'}],
      {en:'Time frame (flashback): the play opens in 1945 and goes back to 1942. Tell dialogue apart from stage directions.',es:'Marco temporal (flashback): la obra arranca en 1945 y retrocede a 1942. Diferenciar diálogo de acotaciones.'}),
    s({en:'Scene 2 — Life in hiding',es:'Scene 2 — La vida en el escondite'},'283–291',
      ["Anne's Voice",'protectors','bearable','cheerful','to bother'],
      [{en:"What does Anne's voice tell us about the silence and the fear?",es:'¿Qué nos cuenta la voz de Anne sobre el silencio y el miedo?'},
       {en:'Who are "our protectors"?',es:'¿Quiénes son "our protectors"?'}],
      {en:"Voice/diary as a dramatic device: how Anne's thoughts are communicated.",es:'Voz/diario como recurso dramático: cómo se comunican los pensamientos de Anne.'}),
    s({en:"Scene 3 — Anne's energy, dancing and Peter",es:'Scene 3 — Energía de Anne, baile y Peter'},'292–295',
      ['pent-up energy','self-conscious','dignified','blush','girl friend'],
      [{en:'Why does Anne tease Peter, and what is she after?',es:'¿Por qué Anne molesta a Peter y qué busca?'},
       {en:'How does Mrs. Frank react ("not dignified")?',es:'¿Cómo reacciona Mrs. Frank ("not dignified")?'}],
      {en:'Characterization of Anne (lively, rebellious) against Peter (shy) and her mother.',es:'Caracterización de Anne (vital, rebelde) frente a Peter (tímido) y la madre.'}),
    s({en:'Scene 3 — The fur coat (Van Daan conflict)',es:'Scene 3 — El abrigo de pieles (conflicto Van Daan)'},'299–301',
      ['quarrel','spanking','restraining himself','clumsy','I could kill you'],
      [{en:'Why does Mrs. Van Daan get so angry? Is it really just about the coat?',es:'¿Por qué se enoja tanto Mrs. Van Daan? ¿Es solo por el abrigo?'},
       {en:'What does Anne dream of becoming ("remarkable", Paris)?',es:'¿Qué sueña Anne ser ("remarkable", París)?'}],
      {en:'Conflict and the tension of confinement: the fight is a symptom of accumulated stress. Idioms ("I could kill you").',es:'Conflicto y tensión del encierro: la pelea es síntoma del estrés acumulado. Idioms ("I could kill you").'}),
    s({en:'Scene 3 — Anne vs. her mother',es:'Scene 3 — Anne vs. su madre'},'301–302',
      ['self-willed','wild','the goat around here','courtesy','bickering'],
      [{en:'Why does Anne feel she is compared to Margot?',es:'¿Por qué siente Anne que la comparan con Margot?'},
       {en:'What does Mrs. Frank ask of her regarding the "guests"?',es:'¿Qué le pide Mrs. Frank sobre los "guests"?'}],
      {en:'Mother–daughter clash and adolescence/identity ("I\'m the goat around here").',es:'Choque madre–hija y adolescencia/identidad ("I\'m the goat around here").'}),
    s({en:'Scene 3 — Mr. Kraler and Dussel arrive',es:'Scene 3 — Llega Mr. Kraler y Dussel'},'302–303',
      ['grave','a hiding place','stretch the food','demands a decision','of course we will'],
      [{en:'What news does Mr. Kraler bring?',es:'¿Qué noticia trae Mr. Kraler?'},
       {en:'What does Mr. Frank decide, and what does it reveal about him?',es:'¿Qué decide Mr. Frank y qué revela de él?'},
       {en:'What sacrifice does Anne make in the end?',es:'¿Qué sacrificio hace Anne al final?'}],
      {en:'Central moral dilemma: taking Dussel in despite the shortage. Generosity and courage. Anne gives up her space.',es:'Dilema moral central: acoger a Dussel pese a la escasez. Generosidad y coraje. Anne cede su espacio.'}),
  ];
}

function chapter22Sections(){
  const s=(title,pages,vocab,comp,focus)=>({id:uid(),track:'history',title,pages,vocab,comp,focus,done:false});
  return [
    s({en:'Section 1 — The Scientific Revolution',es:'Sección 1 — The Scientific Revolution'},'pp. 189–194',
      ['Scientific Revolution','heliocentric theory','geocentric theory','Copernicus','Johannes Kepler','Galileo Galilei','scientific method','Francis Bacon','Descartes','Isaac Newton'],
      [{en:'What was the Scientific Revolution?',es:'¿Qué fue la Revolución Científica?'},
       {en:'What old belief about the universe did the new discoveries destroy?',es:'¿Qué vieja creencia sobre el universo destruyeron los nuevos descubrimientos?'},
       {en:'What thinkers helped advance the scientific method?',es:'¿Qué pensadores impulsaron el método científico?'},
       {en:'What did Copernicus, Kepler, Galileo and Newton each discover?',es:'¿Qué descubrió cada uno: Copernicus, Kepler, Galileo y Newton?'}],
      {en:'New way of thinking based on observation: geocentric → heliocentric (Copernicus/Kepler), Galileo\'s telescope vs. the Church, the scientific method (Bacon/Descartes), Newton\'s law of gravity. Directly supports his Galileo/Scientific Revolution essays.',es:'Nueva forma de pensar basada en la observación: geocéntrico → heliocéntrico (Copernicus/Kepler), el telescopio de Galileo vs. la Iglesia, el método científico (Bacon/Descartes), la ley de gravedad de Newton. Soporta directamente sus ensayos de Galileo/Revolución Científica.'}),
    s({en:'Section 2 — The Enlightenment in Europe',es:'Sección 2 — The Enlightenment in Europe'},'pp. 195–200',
      ['Enlightenment','social contract','Thomas Hobbes','John Locke','philosophes','Voltaire','Montesquieu','Rousseau','Mary Wollstonecraft'],
      [{en:"How were Hobbes's and Locke's views on government different?",es:'¿En qué se diferenciaban las ideas de Hobbes y Locke sobre el gobierno?'},
       {en:'Name the freedoms Enlightenment thinkers championed.',es:'Nombra las libertades que defendieron los pensadores de la Ilustración.'},
       {en:'Explain the influence of Enlightenment ideas.',es:'Explica la influencia de las ideas de la Ilustración.'}],
      {en:'The Age of Reason: Hobbes (strong king) vs. Locke (life, liberty, property; right to overthrow), the philosophes (Voltaire, Montesquieu, Rousseau), and Wollstonecraft on women\'s rights.',es:'La Edad de la Razón: Hobbes (rey fuerte) vs. Locke (vida, libertad, propiedad; derecho a derrocar), los philosophes (Voltaire, Montesquieu, Rousseau) y Wollstonecraft sobre los derechos de la mujer.'}),
    s({en:'Section 3 — The Enlightenment Spreads',es:'Sección 3 — The Enlightenment Spreads'},'pp. 202–205',
      ['salon','baroque','neoclassical','enlightened despot','Diderot','Encyclopedia','Frederick the Great','Joseph II','Catherine the Great'],
      [{en:'Why were salons important?',es:'¿Por qué eran importantes los salones?'},
       {en:'What new styles appeared in art, music and literature?',es:'¿Qué nuevos estilos surgieron en arte, música y literatura?'},
       {en:'In what way was Frederick the Great a typical enlightened despot?',es:'¿En qué sentido fue Federico el Grande un déspota ilustrado típico?'}],
      {en:'How ideas spread: salons and Diderot\'s Encyclopedia; baroque → neoclassical/classical art and music; the enlightened despots (Frederick, Joseph II, Catherine the Great).',es:'Cómo se difundieron las ideas: los salones y la Enciclopedia de Diderot; del barroco al arte/música neoclásico; los déspotas ilustrados (Federico, José II, Catalina la Grande).'}),
    s({en:'Section 4 — The American Revolution',es:'Sección 4 — The American Revolution'},'pp. 206–211',
      ['Declaration of Independence','Thomas Jefferson','checks and balances','federal system','Bill of Rights'],
      [{en:"How did the colonists' self-image clash with their status as colonists?",es:'¿Cómo chocaba la autoimagen de los colonos con su condición de colonos?'},
       {en:'Name some steps that led to the American Revolution.',es:'Nombra algunos pasos que llevaron a la Revolución Americana.'},
       {en:'Explain how the Constitution divides power.',es:'Explica cómo la Constitución divide el poder.'}],
      {en:'Enlightenment ideas in action: taxation without representation → Declaration of Independence (Jefferson); the Constitution uses Montesquieu (separation of powers / checks and balances), Locke, Voltaire, Beccaria; the Bill of Rights.',es:'Las ideas de la Ilustración en acción: impuestos sin representación → Declaración de Independencia (Jefferson); la Constitución usa a Montesquieu (separación de poderes / checks and balances), Locke, Voltaire, Beccaria; el Bill of Rights.'}),
  ];
}

/* ---------- STATE ---------- */
function uid(){return 'id'+Math.random().toString(36).slice(2,9)}
let DB=load();
if(!DB.quizLog)DB.quizLog=[];
function load(){try{const r=localStorage.getItem(KEY);if(r)return JSON.parse(r);}catch(e){}const d=seed();localStorage.setItem(KEY,JSON.stringify(d));return d;}
function save(){localStorage.setItem(KEY,JSON.stringify(DB));renderAll();}

/* ---------- LANG ---------- */
function setLang(l){LANG=l;localStorage.setItem('jm_lang',l);document.documentElement.lang=l;applyStatic();renderAll();}
function applyStatic(){
  document.querySelectorAll('[data-i18n]').forEach(el=>el.textContent=T(el.getAttribute('data-i18n')));
  document.querySelectorAll('[data-ph]').forEach(el=>el.placeholder=T(el.getAttribute('data-ph')));
  document.querySelectorAll('.lang-toggle button').forEach(b=>b.classList.toggle('active',b.getAttribute('data-lang')===LANG));
}

/* ---------- NAV ---------- */
function showView(v,el){
  document.querySelectorAll('.view').forEach(x=>x.classList.remove('active'));
  document.getElementById('view-'+v).classList.add('active');
  document.querySelectorAll('.nav-tab').forEach(t=>t.classList.remove('active'));
  if(el)el.classList.add('active');
  window.scrollTo({top:0,behavior:'smooth'});
}

/* ---------- CRITERIA ---------- */
let critFilter='__all';
function addCriterion(){
  const name=document.getElementById('cName').value.trim();
  if(!name){alert(T('al_critname'));return;}
  DB.criteria.push({id:uid(),subject:document.getElementById('cSubject').value,
    teacher:document.getElementById('cTeacher').value.trim()||'—',name,
    desc:document.getElementById('cDesc').value.trim()});
  document.getElementById('cName').value='';document.getElementById('cDesc').value='';
  save();
}
async function delCriterion(id){
  if(DB.corrections.some(c=>c.criterionId===id)){if(!await _preguntaUI(T('cf_delcrit')))return;}
  DB.criteria=DB.criteria.filter(c=>c.id!==id);save();
}
function badge(s){return s==='History'?`<span class="badge b-hist">${T('hist')}</span>`:`<span class="badge b-eng">${T('eng')}</span>`;}
function subLabel(s){return s==='History'?T('hist'):T('eng');}
function renderCriteria(){
  const subs=['__all',...new Set(DB.criteria.map(c=>c.subject))];
  document.getElementById('critFilters').innerHTML=subs.map(s=>
    `<span class="filter-pill ${critFilter===s?'active':''}" onclick="critFilter='${s}';renderCriteria()">${s==='__all'?T('all'):subLabel(s)}</span>`).join('');
  const list=DB.criteria.filter(c=>critFilter==='__all'||c.subject===critFilter);
  document.getElementById('critList').innerHTML=list.length?list.map(c=>`
    <div class="item"><div class="item-top">
      <div><div class="item-title">${esc(L(c.name))}</div>
      <div class="item-meta">${badge(c.subject)} · ${esc(c.teacher)} · ${DB.corrections.filter(x=>x.criterionId===c.id).length} ${T('corrections_word')}</div></div>
      <button class="icon-x" onclick="delCriterion('${c.id}')">✕</button></div>
      ${L(c.desc)?`<div class="item-body">${esc(L(c.desc))}</div>`:''}
    </div>`).join(''):`<div class="empty">${T('no_crit')}</div>`;
}

/* ---------- CORRECTIONS ---------- */
let corrFilter='__all';
function fillCriterionSelect(){
  document.getElementById('rCriterion').innerHTML=DB.criteria.map(c=>
    `<option value="${c.id}">[${subLabel(c.subject)}] ${esc(L(c.name))}</option>`).join('');
}
function addCorrection(){
  const cid=document.getElementById('rCriterion').value;
  const issue=document.getElementById('rIssue').value.trim();
  if(!cid){alert(T('al_addfirst'));return;}
  if(!issue){alert(T('al_issue'));return;}
  const crit=DB.criteria.find(c=>c.id===cid);
  DB.corrections.push({id:uid(),date:document.getElementById('rDate').value||new Date().toISOString().slice(0,10),
    subject:crit?crit.subject:'—',work:document.getElementById('rWork').value.trim()||T('untitled'),
    criterionId:cid,issue,fix:document.getElementById('rFix').value.trim(),sev:+document.getElementById('rSev').value});
  document.getElementById('rWork').value='';document.getElementById('rIssue').value='';document.getElementById('rFix').value='';
  save();
}
function delCorrection(id){DB.corrections=DB.corrections.filter(c=>c.id!==id);save();}
function critName(id){const c=DB.criteria.find(x=>x.id===id);return c?L(c.name):T('delcrit_label');}
function renderCorrections(){
  const subs=['__all',...new Set(DB.corrections.map(c=>c.subject))];
  document.getElementById('corrFilters').innerHTML=subs.map(s=>
    `<span class="filter-pill ${corrFilter===s?'active':''}" onclick="corrFilter='${s}';renderCorrections()">${s==='__all'?T('all'):subLabel(s)}</span>`).join('');
  const list=DB.corrections.filter(c=>corrFilter==='__all'||c.subject===corrFilter).slice().sort((a,b)=>b.date.localeCompare(a.date));
  document.getElementById('corrList').innerHTML=list.length?list.map(c=>`
    <div class="item"><div class="item-top">
      <div><div class="item-title">${esc(L(c.work))}</div>
      <div class="item-meta">${badge(c.subject)} · ${c.date} · <span class="sevdot sd${c.sev}"></span>${T('sev_list')[c.sev]}</div></div>
      <button class="icon-x" onclick="delCorrection('${c.id}')">✕</button></div>
      <div class="item-body"><b>${T('crit_word')}</b> ${esc(critName(c.criterionId))}</div>
      <div class="corr-issue"><b>${T('prob_word')}</b> ${esc(L(c.issue))}</div>
      ${L(c.fix)?`<div class="corr-fix"><b>${T('fix_word')}</b> ${esc(L(c.fix))}</div>`:''}
    </div>`).join(''):`<div class="empty">${T('no_corr')}</div>`;
}

/* ---------- ANALYSIS ---------- */
function weightByCriterion(){
  const m={};
  DB.corrections.forEach(c=>{const k=c.criterionId;if(!m[k])m[k]={count:0,weight:0,subject:c.subject};m[k].count++;m[k].weight+=c.sev;});
  return Object.entries(m).map(([id,v])=>({id,name:critName(id),...v})).sort((a,b)=>b.weight-a.weight);
}
function barColor(i){return ['#c45a3a','#c8822a','#5a4a8a','#2a7a6e','#3d8a4f','#8a5a1a'][i%6];}
function renderBars(el,data,maxKey){
  const max=Math.max(1,...data.map(d=>d[maxKey]));
  el.innerHTML=data.length?data.map((d,i)=>`
    <div class="bar-row"><div class="bar-label">${esc(d.name)}</div>
    <div class="bar-track"><div class="bar-fill" style="width:${Math.round(d[maxKey]/max*100)}%;background:${barColor(i)}">${d[maxKey]}</div></div></div>`).join(''):`<div class="empty">${T('no_data')}</div>`;
}
function renderAnalysis(){
  const w=weightByCriterion();
  renderBars(document.getElementById('anByCriterion'),w.map(d=>({name:d.name,weight:d.weight})),'weight');
  const subM={};DB.corrections.forEach(c=>subM[c.subject]=(subM[c.subject]||0)+1);
  renderBars(document.getElementById('anBySubject'),Object.entries(subM).map(([s,n])=>({name:subLabel(s),n})),'n');
  const sevM={1:0,2:0,3:0};DB.corrections.forEach(c=>sevM[c.sev]++);
  renderBars(document.getElementById('anBySev'),[{name:T('sev_list')[3],n:sevM[3]},{name:T('sev_list')[2],n:sevM[2]},{name:T('sev_list')[1],n:sevM[1]}],'n');
  const total=DB.corrections.length, top=w[0], top2=w[1];
  const histN=DB.corrections.filter(c=>c.subject==='History').length;
  const engN=DB.corrections.filter(c=>c.subject==='English').length;
  const serious=DB.corrections.filter(c=>c.sev===3);
  let html=`<h4>${T('a_h')}</h4>`;
  if(!total)html+=T('a_none');
  else{
    html+=T('a_logged')(total,histN,engN);
    if(top)html+=T('a_top')(esc(top.name),top.count,top.weight);
    if(top2)html+=T('a_top2')(esc(top2.name));else html+='. ';
    if(serious.length)html+=T('a_serious')(serious.length);
    html+=T('a_rec')(top?esc(top.name):'');
  }
  document.getElementById('anSummary').innerHTML=html;
}

/* ---------- READING PLAN ---------- */
function renderReading(){
  document.getElementById('readTracks').innerHTML=[['english',T('trk_en')],['history',T('trk_hist')]].map(([k,lbl])=>
    `<span class="filter-pill ${activeTrack===k?'active':''}" onclick="activeTrack='${k}';renderReading()">${lbl}</span>`).join('');
  document.getElementById('readTitle').textContent=activeTrack==='english'?'The Diary of Anne Frank — Act One':'Ch. 22 — Enlightenment & Revolution (1550–1789)';
  document.getElementById('readDesc').textContent=activeTrack==='english'?T('read_desc'):T('read_desc_h');
  const items=DB.reading.filter(r=>(r.track||'english')===activeTrack);
  const done=items.filter(r=>r.done).length, tot=items.length;
  document.getElementById('readStats').innerHTML=`
    <div class="stat"><div class="stat-num">${done}/${tot}</div><div class="stat-lbl">${T(activeTrack==='english'?'st_scenes':'st_sections')}</div></div>
    <div class="stat"><div class="stat-num">${tot?Math.round(done/tot*100):0}%</div><div class="stat-lbl">${T('st_progress')}</div></div>
    <div class="stat"><div class="stat-num">${tot-done}</div><div class="stat-lbl">${T('st_remaining')}</div></div>`;
  document.getElementById('sceneList').innerHTML=items.map(r=>`
    <div class="scene ${r._open?'open':''}" id="sc-${r.id}">
      <div class="scene-head">
        <div class="check ${r.done?'on':''}" onclick="event.stopPropagation();toggleDone('${r.id}')">${r.done?'✓':''}</div>
        <div class="scene-title" onclick="openScene('${r.id}')">${esc(L(r.title))}</div>
        <div class="scene-pages" onclick="openScene('${r.id}')">${esc(r.pages||'')}</div>
      </div>
      <div class="scene-body">
        ${L(r.focus)?`<div class="lbl">${T('lbl_focus')}</div>${esc(L(r.focus))}`:''}
        ${r.vocab&&r.vocab.length?`<div class="lbl">${T('lbl_vocab')}</div>${r.vocab.map(v=>`<span class="vocab">${esc(v)}</span>`).join('')}`:''}
        ${r.comp&&r.comp.length?`<div class="lbl">${T('lbl_comp')}</div><ul>${r.comp.map(q=>`<li>${esc(L(q))}</li>`).join('')}</ul>`:''}
        ${L(r.notes)?`<div class="lbl">${T('lbl_notes')}</div>${esc(L(r.notes))}`:''}
        <div style="margin-top:12px"><button class="btn ghost sm" onclick="delReading('${r.id}')">${T('rm_entry')}</button></div>
      </div>
    </div>`).join('');
}
function openScene(id){const r=DB.reading.find(x=>x.id===id);r._open=!r._open;renderReading();}
function toggleDone(id){const r=DB.reading.find(x=>x.id===id);r.done=!r.done;save();}
function addReading(){
  const t=document.getElementById('rdTitle').value.trim();if(!t){alert(T('al_title'));return;}
  DB.reading.push({id:uid(),track:activeTrack,title:t,pages:document.getElementById('rdPages').value.trim(),
    notes:document.getElementById('rdNotes').value.trim(),vocab:[],comp:[],focus:'',done:false});
  document.getElementById('rdTitle').value='';document.getElementById('rdPages').value='';document.getElementById('rdNotes').value='';
  save();
}
function delReading(id){DB.reading=DB.reading.filter(r=>r.id!==id);save();}

/* ---------- DASHBOARD ---------- */
function renderPanel(){
  const total=DB.corrections.length, crit=DB.criteria.length;
  const readDone=DB.reading.filter(r=>r.done).length, readTot=DB.reading.length;
  const serious=DB.corrections.filter(c=>c.sev===3).length;
  document.getElementById('panelStats').innerHTML=`
    <div class="stat"><div class="stat-num">${crit}</div><div class="stat-lbl">${T('st_crit')}</div></div>
    <div class="stat"><div class="stat-num">${total}</div><div class="stat-lbl">${T('st_corr')}</div></div>
    <div class="stat"><div class="stat-num sev3">${serious}</div><div class="stat-lbl">${T('st_serious')}</div></div>
    <div class="stat"><div class="stat-num">${readTot?Math.round(readDone/readTot*100):0}%</div><div class="stat-lbl">${T('st_read')}</div></div>`;
  renderBars(document.getElementById('panelWeak'),weightByCriterion().slice(0,5).map(d=>({name:d.name,weight:d.weight})),'weight');
  const next=DB.reading.find(r=>!r.done);
  const trkLbl=next?(((next.track||'english')==='english')?T('trk_en'):T('trk_hist')):'';
  document.getElementById('panelNextRead').innerHTML=next?
    `<div class="item-meta" style="margin-bottom:4px">${esc(trkLbl)}</div><div class="item-title">${esc(L(next.title))}</div><div class="item-meta">${esc(next.pages||'')}</div>${L(next.focus)?`<div class="item-body">${esc(L(next.focus))}</div>`:''}<div style="margin-top:10px"><button class="btn teal sm" onclick="gotoReading('${next.track||'english'}')">${T('goread')}</button></div>`
    :`<div class="empty">${T('read_done')}</div>`;
}
function gotoReading(track){activeTrack=track;document.querySelectorAll('.nav-tab')[4].click();renderReading();}

/* ---------- DATA ---------- */
function exportData(){
  const blob=new Blob([JSON.stringify(DB,null,2)],{type:'application/json'});
  const a=document.createElement('a');a.href=URL.createObjectURL(blob);
  a.download='josemanuel-center-'+new Date().toISOString().slice(0,10)+'.json';a.click();
}
function importData(e){
  const f=e.target.files[0];if(!f)return;const r=new FileReader();
  r.onload=()=>{try{DB=JSON.parse(r.result);localStorage.setItem(KEY,JSON.stringify(DB));renderAll();alert(T('al_imported'));}catch(x){alert(T('al_invalid'));}};
  r.readAsText(f);
}
async function resetData(){if(await _preguntaUI(T('cf_reset'))){DB=seed();localStorage.setItem(KEY,JSON.stringify(DB));renderAll();}}
function renderDataInfo(){document.getElementById('dataInfo').innerHTML=T('di')(DB.criteria.length,DB.corrections.length,DB.reading.length,DB.seededAt);}

/* ---------- QUIZ (Chapter 22, auto-graded) ---------- */
function quizData(){
  const D=(sec,term,def)=>({sec,term,def});
  const terms=[
    D('S1','Scientific Revolution',{en:'A new way of thinking about the natural world (mid-1500s), based on careful observation and questioning old beliefs.',es:'Nueva forma de pensar sobre el mundo natural (mediados del s. XVI), basada en la observación cuidadosa y en cuestionar viejas creencias.'}),
    D('S1','heliocentric theory',{en:'The theory that the Sun is at the center of the universe.',es:'La teoría de que el Sol está en el centro del universo.'}),
    D('S1','geocentric theory',{en:'The view that the Earth is at the center of the universe.',es:'La idea de que la Tierra está en el centro del universo.'}),
    D('S1','Nicolaus Copernicus',{en:'Polish astronomer who developed the heliocentric (sun-centered) theory.',es:'Astrónomo polaco que desarrolló la teoría heliocéntrica.'}),
    D('S1','Johannes Kepler',{en:"Used mathematics to prove Copernicus's basic idea was correct.",es:'Usó las matemáticas para probar que la idea básica de Copérnico era correcta.'}),
    D('S1','Galileo Galilei',{en:'Italian scientist forced by the Catholic Church to take back ideas that disagreed with its teaching.',es:'Científico italiano obligado por la Iglesia Católica a retractarse de ideas que contradecían su doctrina.'}),
    D('S1','scientific method',{en:'A logical procedure for gathering and testing ideas (question → hypothesis → experiment).',es:'Procedimiento lógico para reunir y probar ideas (pregunta → hipótesis → experimento).'}),
    D('S1','Francis Bacon',{en:'English writer who said scientists should base thinking on what they can observe and test.',es:'Escritor inglés que decía que la ciencia debía basarse en lo observable y comprobable.'}),
    D('S1','Isaac Newton',{en:'Scientist who described the laws of motion and gravity.',es:'Científico que describió las leyes del movimiento y la gravedad.'}),
    D('S2','Enlightenment',{en:'The Age of Reason — applying reason and the scientific method to human society and laws.',es:'La Edad de la Razón: aplicar la razón y el método científico a la sociedad y las leyes.'}),
    D('S2','social contract',{en:'An agreement people make with their government (Hobbes).',es:'Un acuerdo que la gente hace con su gobierno (Hobbes).'}),
    D('S2','John Locke',{en:'Philosopher who said people have natural rights to life, liberty and property.',es:'Filósofo que sostuvo que la gente tiene derechos naturales a la vida, la libertad y la propiedad.'}),
    D('S2','philosophes',{en:'Social critics in France who believed reason could find truth and improve society.',es:'Críticos sociales en Francia que creían que la razón hallaba la verdad y mejoraba la sociedad.'}),
    D('S2','Voltaire',{en:'Writer who fought for tolerance, reason and freedom of religion and speech.',es:'Escritor que luchó por la tolerancia, la razón y la libertad de religión y de expresión.'}),
    D('S2','Montesquieu',{en:'French writer who argued for the separation of powers in government.',es:'Escritor francés que defendió la separación de poderes en el gobierno.'}),
    D('S2','Rousseau',{en:'Enlightenment thinker who championed human freedom and equality.',es:'Pensador de la Ilustración que defendió la libertad y la igualdad humanas.'}),
    D('S2','Mary Wollstonecraft',{en:"Writer who argued for women's rights ('how is it that all women are born slaves?').",es:'Escritora que defendió los derechos de la mujer ("¿cómo es que todas las mujeres nacen esclavas?").'}),
    D('S3','salon',{en:'A social gathering to discuss ideas or enjoy art.',es:'Reunión social para discutir ideas o disfrutar del arte.'}),
    D('S3','baroque',{en:'A grand, ornate style of art and architecture.',es:'Estilo de arte y arquitectura grandioso y recargado.'}),
    D('S3','neoclassical',{en:'A simpler, elegant style borrowing ideas from classical Greece and Rome.',es:'Estilo más sencillo y elegante que toma ideas de la Grecia y Roma clásicas.'}),
    D('S3','enlightened despot',{en:'A ruler who supported Enlightenment ideas but did not give up power.',es:'Gobernante que apoyaba ideas de la Ilustración pero no cedía el poder.'}),
    D('S3','Catherine the Great',{en:'Russian ruler who took steps to reform and modernize Russia.',es:'Gobernante rusa que tomó medidas para reformar y modernizar Rusia.'}),
    D('S3','Diderot',{en:'Thinker who wrote and published the Encyclopedia.',es:'Pensador que escribió y publicó la Enciclopedia.'}),
    D('S4','Declaration of Independence',{en:'Document declaring American independence from Britain (1776).',es:'Documento que declaró la independencia de EE.UU. de Gran Bretaña (1776).'}),
    D('S4','Thomas Jefferson',{en:'Author of the Declaration of Independence.',es:'Autor de la Declaración de Independencia.'}),
    D('S4','checks and balances',{en:'A system where each branch of government limits the power of the others.',es:'Sistema en el que cada poder del gobierno limita a los demás.'}),
    D('S4','federal system',{en:'A system where power is divided between national and state governments.',es:'Sistema en el que el poder se divide entre el gobierno nacional y los estatales.'}),
    D('S4','Bill of Rights',{en:'The first ten amendments to the U.S. Constitution, protecting basic rights.',es:'Las primeras diez enmiendas de la Constitución de EE.UU., que protegen derechos básicos.'}),
  ];
  const Q=(sec,q,a)=>({sec,q,a});
  const comp=[
    Q('S1',{en:'What was the Scientific Revolution?',es:'¿Qué fue la Revolución Científica?'},
      {en:'A new way of thinking about the natural world (from the mid-1500s) based on careful observation and questioning long-held beliefs, rather than relying only on ancient writers or the Bible.',es:'Una nueva forma de pensar sobre el mundo natural (desde mediados del s. XVI) basada en la observación cuidadosa y en cuestionar creencias antiguas, en vez de confiar solo en los autores antiguos o en la Biblia.'}),
    Q('S1',{en:'What old belief about the universe did the new discoveries destroy?',es:'¿Qué vieja creencia sobre el universo destruyeron los nuevos descubrimientos?'},
      {en:'The geocentric idea that the Earth was the center of the universe; Copernicus, Kepler and Galileo showed the Earth and planets revolve around the Sun (heliocentric).',es:'La idea geocéntrica de que la Tierra era el centro del universo; Copérnico, Kepler y Galileo mostraron que la Tierra y los planetas giran alrededor del Sol (heliocéntrico).'}),
    Q('S1',{en:'What thinkers helped advance the scientific method?',es:'¿Qué pensadores impulsaron el método científico?'},
      {en:'Francis Bacon (base thinking on observation and testing) and René Descartes (logic and mathematics).',es:'Francis Bacon (basar el pensamiento en la observación y la experimentación) y René Descartes (lógica y matemáticas).'}),
    Q('S1',{en:'What did Copernicus, Kepler, Galileo and Newton each discover?',es:'¿Qué descubrió cada uno: Copérnico, Kepler, Galileo y Newton?'},
      {en:'Copernicus: heliocentric theory. Kepler: math proof of it. Galileo: telescope — Jupiter\'s moons, sunspots, a rough Moon. Newton: the law of gravity / laws of motion.',es:'Copérnico: la teoría heliocéntrica. Kepler: su prueba matemática. Galileo: el telescopio — las lunas de Júpiter, las manchas solares, la Luna rugosa. Newton: la ley de gravedad / leyes del movimiento.'}),
    Q('S2',{en:"How were Hobbes's and Locke's views on government different?",es:'¿En qué se diferenciaban las ideas de Hobbes y Locke sobre el gobierno?'},
      {en:'Hobbes wanted a strong king to keep order (people give up rights via a social contract). Locke said people have natural rights to life, liberty and property, and may overthrow a government that fails to protect them.',es:'Hobbes quería un rey fuerte para mantener el orden (la gente cede derechos mediante un contrato social). Locke decía que la gente tiene derechos naturales a la vida, la libertad y la propiedad, y puede derrocar al gobierno que no los proteja.'}),
    Q('S2',{en:'Name the freedoms Enlightenment thinkers championed.',es:'Nombra las libertades que defendieron los pensadores de la Ilustración.'},
      {en:'Freedom of religion/belief, freedom of speech, tolerance, and political liberty (separation of powers).',es:'Libertad de religión/creencia, libertad de expresión, tolerancia y libertad política (separación de poderes).'}),
    Q('S2',{en:'Explain the influence of Enlightenment ideas.',es:'Explica la influencia de las ideas de la Ilustración.'},
      {en:'They inspired the American and French revolutions, spread the idea of progress through reason, made society more worldly and less religious, and stressed the importance of the individual.',es:'Inspiraron las revoluciones americana y francesa, difundieron la idea de progreso mediante la razón, hicieron la sociedad más mundana y menos religiosa, y resaltaron la importancia del individuo.'}),
    Q('S3',{en:'Why were salons important?',es:'¿Por qué eran importantes los salones?'},
      {en:'They were gatherings where Enlightenment ideas were shared and spread among writers, artists and the growing middle class; they also funded projects like the Encyclopedia.',es:'Eran reuniones donde se compartían y difundían las ideas de la Ilustración entre escritores, artistas y la creciente clase media; también financiaron proyectos como la Enciclopedia.'}),
    Q('S3',{en:'What new styles appeared in art, music and literature?',es:'¿Qué nuevos estilos surgieron en arte, música y literatura?'},
      {en:'Art/architecture: baroque → neoclassical. Music: the classical style (Haydn, Mozart, Beethoven; sonata, symphony). Literature: the novel.',es:'Arte/arquitectura: del barroco al neoclásico. Música: el estilo clásico (Haydn, Mozart, Beethoven; sonata, sinfonía). Literatura: la novela.'}),
    Q('S3',{en:'In what way was Frederick the Great a typical enlightened despot?',es:'¿En qué sentido fue Federico el Grande un déspota ilustrado típico?'},
      {en:'He granted religious freedom, improved schooling and reformed justice, but kept his power and did not end serfdom.',es:'Concedió libertad religiosa, mejoró la educación y reformó la justicia, pero conservó su poder y no abolió la servidumbre.'}),
    Q('S4',{en:"How did the colonists' self-image clash with their status as colonists?",es:'¿Cómo chocaba la autoimagen de los colonos con su condición de colonos?'},
      {en:'They increasingly saw themselves as self-governing rather than British subjects, yet Parliament (with no colonial members) still taxed and governed them.',es:'Cada vez se veían más como autónomos que como súbditos británicos, pero el Parlamento (sin miembros coloniales) seguía cobrándoles impuestos y gobernándolos.'}),
    Q('S4',{en:'Explain how the Constitution divides power.',es:'Explica cómo la Constitución divide el poder.'},
      {en:'Separation of powers into three branches with checks and balances (Montesquieu), plus a federal system splitting power between national and state governments; the Bill of Rights protects individual rights.',es:'Separación de poderes en tres ramas con checks and balances (Montesquieu), más un sistema federal que reparte el poder entre el gobierno nacional y los estatales; el Bill of Rights protege los derechos individuales.'}),
  ];
  return {terms,comp};
}
let QZTERMS=[], QZCOMP=[];
function shuffle(a){for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
function buildQuiz(){
  const d=quizData();
  QZTERMS=shuffle(d.terms.slice()).map(t=>{
    const pool=d.terms.filter(x=>x.term!==t.term&&x.sec===t.sec);
    const distract=shuffle(pool.slice()).slice(0,3).map(x=>x.term);
    while(distract.length<3){const r=d.terms[Math.floor(Math.random()*d.terms.length)].term;if(r!==t.term&&!distract.includes(r))distract.push(r);}
    return {...t,options:shuffle([t.term,...distract]),answered:false,chosen:null};
  });
  QZCOMP=d.comp.map(c=>({...c,open:false,mark:null}));
}
function answerTerm(i,opt){const q=QZTERMS[i];if(q.answered)return;q.answered=true;q.chosen=opt;renderTermsList();}
function resetTerms(){buildQuiz();renderTermsList();}
function renderTermsList(){
  const done=QZTERMS.filter(q=>q.answered).length, ok=QZTERMS.filter(q=>q.answered&&q.chosen===q.term).length;
  document.getElementById('qzScore').textContent=ok+' / '+QZTERMS.length;
  document.getElementById('qzTermsList').innerHTML=QZTERMS.map((q,i)=>`
    <div class="qz-q">
      <span class="qz-sec">${q.sec}</span>
      <div class="qz-def">${esc(L(q.def))}</div>
      <div class="qz-opts">${q.options.map(o=>{
        let cls='qz-opt';
        if(q.answered){if(o===q.term)cls+=' right';else if(o===q.chosen)cls+=' wrong';}
        return `<button class="${cls}" ${q.answered?'disabled':''} onclick="answerTerm(${i},'${o.replace(/'/g,"\\'")}')">${esc(o)}</button>`;
      }).join('')}</div>
    </div>`).join('');
}
function toggleAns(i){QZCOMP[i].open=!QZCOMP[i].open;renderCompList();}
function markComp(i,v){QZCOMP[i].mark=v;renderCompList();}
function renderCompList(){
  const mastered=QZCOMP.filter(c=>c.mark==='got').length;
  document.getElementById('qzCompList').innerHTML=
    `<div class="card-sub" style="margin:0 0 12px">${mastered} / ${QZCOMP.length} ${T('q_mastered')}</div>`+
    QZCOMP.map((c,i)=>`
    <div class="qz-q ${c.open?'show':''} ${c.mark==='got'?'gotit':''}">
      <span class="qz-sec">${c.sec}</span>
      <div class="qz-def">${esc(L(c.q))}</div>
      <button class="btn ghost sm" onclick="toggleAns(${i})">${c.open?T('q_hide'):T('q_show')}</button>
      <div class="qz-ans">${esc(L(c.a))}</div>
      ${c.open?`<div class="qz-mark"><button class="btn teal sm" onclick="markComp(${i},'got')">${T('q_got')}</button><button class="btn ghost sm" onclick="markComp(${i},'rev')">${T('q_review')}</button></div>`:''}
    </div>`).join('');
}
function saveQuizAttempt(){
  const tc=QZTERMS.filter(q=>q.answered&&q.chosen===q.term).length, tt=QZTERMS.length;
  const cm=QZCOMP.filter(c=>c.mark==='got').length, ct=QZCOMP.length;
  if(!DB.quizLog)DB.quizLog=[];
  DB.quizLog.push({id:uid(),date:new Date().toISOString().slice(0,10),tc,tt,cm,ct});
  save();alert(T('q_saved'));
}
function delAttempt(id){DB.quizLog=DB.quizLog.filter(a=>a.id!==id);save();}
function renderQuizHistory(){
  const log=(DB.quizLog||[]).slice().sort((a,b)=>b.date.localeCompare(a.date)||b.id.localeCompare(a.id));
  const el=document.getElementById('qzHistory');
  if(!log.length){el.innerHTML=`<div class="empty">${T('q_noattempts')}</div>`;return;}
  el.innerHTML=log.map(a=>{
    const tp=a.tt?Math.round(a.tc/a.tt*100):0, cp=a.ct?Math.round(a.cm/a.ct*100):0;
    const col=tp>=80?'#3d8a4f':tp>=50?'#c8822a':'#c45a3a';
    return `<div class="item"><div class="item-top">
      <div><div class="item-title">${a.date}</div>
      <div class="item-meta">${T('q_terms_lbl')}: ${a.tc}/${a.tt} (${tp}%) · ${T('q_comp_lbl')}: ${a.cm}/${a.ct} (${cp}%)</div></div>
      <button class="icon-x" onclick="delAttempt('${a.id}')">✕</button></div>
      <div class="bar-track" style="margin-top:8px"><div class="bar-fill" style="width:${tp}%;background:${col}">${tp}%</div></div>
    </div>`;
  }).join('');
}
function renderQuiz(){if(!QZTERMS.length)buildQuiz();renderTermsList();renderCompList();renderQuizHistory();}

/* ---------- BIOLOGY ---------- */
// Meiosis phases: positions of the 4 chromatids (x,y in %), centromere joins, cell outlines, crossing-over
const BIO_PH=[
  {n:{en:'Interphase (DNA replicated)',es:'Interfase (ADN replicado)'},r:0,
   d:{en:'Before meiosis, DNA is copied ONCE. Each chromosome is now two identical sister chromatids joined at the centromere.',es:'Antes de la meiosis, el ADN se copia UNA vez. Cada cromosoma es ahora dos cromátidas hermanas idénticas unidas por el centrómero.'},
   cells:[[50,50,86,86]],p:{matA:[33,50],matB:[39,50],patA:[61,50],patB:[67,50]},jm:1,jp:1,x:0},
  {n:{en:'Prophase I',es:'Profase I'},r:1,
   d:{en:'Nuclear membrane breaks down; spindle fibers form. Homologous chromosomes pair up and exchange genetic information — crossing over.',es:'La membrana nuclear se rompe; se forman fibras del huso. Los cromosomas homólogos se emparejan e intercambian información genética — crossing over.'},
   cells:[[50,50,86,86]],p:{matA:[44,50],matB:[48,50],patA:[52,50],patB:[56,50]},jm:1,jp:1,x:1},
  {n:{en:'Metaphase I',es:'Metafase I'},r:1,
   d:{en:'Homologous pairs line up along the cell equator. Chromosomes from BOTH parents on each side → diversity.',es:'Las parejas homólogas se alinean en el ecuador de la célula. Cromosomas de AMBOS padres a cada lado → diversidad.'},
   cells:[[50,50,86,86]],p:{matA:[40,50],matB:[44,50],patA:[56,50],patB:[60,50]},jm:1,jp:1,x:1},
  {n:{en:'Anaphase I',es:'Anafase I'},r:1,
   d:{en:'Homologous chromosomes separate to opposite poles. Sister chromatids STAY together.',es:'Los cromosomas homólogos se separan a polos opuestos. Las cromátidas hermanas SIGUEN juntas.'},
   cells:[[50,50,86,86]],p:{matA:[24,50],matB:[30,50],patA:[70,50],patB:[76,50]},jm:1,jp:1,x:1},
  {n:{en:'Telophase I & Cytokinesis I',es:'Telofase I y Citocinesis I'},r:1,
   d:{en:'Two HAPLOID nuclei form and the cell splits → 2 haploid cells, each with duplicated chromosomes.',es:'Se forman dos núcleos HAPLOIDES y la célula se divide → 2 células haploides, cada una con cromosomas duplicados.'},
   cells:[[27,50,46,82],[73,50,46,82]],p:{matA:[24,50],matB:[30,50],patA:[70,50],patB:[76,50]},jm:1,jp:1,x:1},
  {n:{en:'Metaphase II',es:'Metafase II'},r:2,
   d:{en:'In each cell, the duplicated chromosome lines up at the equator. DNA is NOT copied again.',es:'En cada célula, el cromosoma duplicado se alinea en el ecuador. El ADN NO se vuelve a copiar.'},
   cells:[[27,50,46,82],[73,50,46,82]],p:{matA:[24,50],matB:[30,50],patA:[70,50],patB:[76,50]},jm:1,jp:1,x:0},
  {n:{en:'Anaphase II',es:'Anafase II'},r:2,
   d:{en:'Sister chromatids are finally pulled apart to opposite sides of each cell.',es:'Las cromátidas hermanas por fin se separan hacia lados opuestos de cada célula.'},
   cells:[[27,50,46,82],[73,50,46,82]],p:{matA:[27,28],matB:[27,72],patA:[73,28],patB:[73,72]},jm:0,jp:0,x:0},
  {n:{en:'Telophase II & Cytokinesis II',es:'Telofase II y Citocinesis II'},r:2,
   d:{en:'Nuclei reform and cells split → 4 HAPLOID cells, each with a unique combination of single chromosomes.',es:'Los núcleos se reforman y las células se dividen → 4 células HAPLOIDES, cada una con una combinación única de cromosomas simples.'},
   cells:[[27,28,46,42],[27,72,46,42],[73,28,46,42],[73,72,46,42]],p:{matA:[27,28],matB:[27,72],patA:[73,28],patB:[73,72]},jm:0,jp:0,x:0},
];
let bioI=0, bioTimer=null;
function setChrom(id,x,y){const e=document.getElementById(id);if(e){e.style.left=x+'%';e.style.top=y+'%';}}
function setBioPhase(i){
  bioI=(i+BIO_PH.length)%BIO_PH.length;
  const ph=BIO_PH[bioI];
  setChrom('matA',...ph.p.matA);setChrom('matB',...ph.p.matB);
  setChrom('patA',...ph.p.patA);setChrom('patB',...ph.p.patB);
  // cells
  for(let k=0;k<4;k++){const c=document.getElementById('cell'+k);
    if(k<ph.cells.length){const[x,y,w,h]=ph.cells[k];c.style.left=x+'%';c.style.top=y+'%';c.style.width=w+'%';c.style.height=h+'%';c.style.opacity='1';}
    else c.style.opacity='0';}
  // centromeres (midpoint of the two sisters)
  function cen(id,a,b,show){const e=document.getElementById(id);if(!show){e.style.opacity='0';return;}
    e.style.opacity='1';e.style.left=((a[0]+b[0])/2)+'%';e.style.top=((a[1]+b[1])/2)+'%';e.style.width=(Math.abs(a[0]-b[0])+6)+'%';}
  cen('cenMat',ph.p.matA,ph.p.matB,ph.jm);cen('cenPat',ph.p.patA,ph.p.patB,ph.jp);
  document.getElementById('bioStage').classList.toggle('crossed',!!ph.x);
  document.getElementById('phName').textContent=L(ph.n);
  document.getElementById('phDesc').textContent=L(ph.d);
  const tag=document.getElementById('phTag');
  tag.className='phase-tag '+(ph.r===1?'pt1':ph.r===2?'pt2':'pt0');
  tag.textContent=ph.r===1?'Meiosis I':ph.r===2?'Meiosis II':(LANG==='es'?'Inicio':'Start');
  document.getElementById('phDots').innerHTML=BIO_PH.map((_,k)=>`<span class="${k===bioI?'on':''}"></span>`).join('');
}
function bioNext(){setBioPhase(bioI+1);}
function bioPrev(){bioStop();setBioPhase(bioI-1);}
function bioRestart(){bioStop();setBioPhase(0);}
function bioStop(){if(bioTimer){clearInterval(bioTimer);bioTimer=null;}document.getElementById('bioPlayBtn').textContent=T('bio_play');}
function bioToggle(){
  if(bioTimer){bioStop();return;}
  if(bioI>=BIO_PH.length-1)setBioPhase(0);
  document.getElementById('bioPlayBtn').textContent=T('bio_pause');
  bioTimer=setInterval(()=>{ if(bioI>=BIO_PH.length-1){bioStop();return;} setBioPhase(bioI+1); },1500);
}

// Flashcards (key vocabulary across the 3 decks) with mnemonics
const BIO_CARDS=[
  {t:'Haploid (n)',d:{en:'A cell with ONE copy of each chromosome (gametes, n = 23).',es:'Célula con UNA copia de cada cromosoma (gametos, n = 23).'},m:{en:'Half → haPLOID (n).',es:'Mitad → haploide (n).'}},
  {t:'Diploid (2n)',d:{en:'A cell with TWO copies of each chromosome (body cells, 2n = 46).',es:'Célula con DOS copias de cada cromosoma (células del cuerpo, 2n = 46).'},m:{en:'Double → Diploid (2n).',es:'Doble → Diploide (2n).'}},
  {t:'Homologous chromosomes',d:{en:'A pair — one from mom, one from dad; same genes, maybe different alleles.',es:'Una pareja — uno de mamá, uno de papá; mismos genes, quizá distintos alelos.'},m:{en:'Homologous = a happy PAIR (mom + dad).',es:'Homólogos = una PAREJA (mamá + papá).'}},
  {t:'Sister chromatids',d:{en:'Two identical halves of ONE duplicated chromosome, joined at the centromere.',es:'Dos mitades idénticas de UN cromosoma duplicado, unidas por el centrómero.'},m:{en:'Sisters = identical twins of ONE chromosome.',es:'Hermanas = gemelas idénticas de UN cromosoma.'}},
  {t:'Centromere',d:{en:'The point that holds sister chromatids together.',es:'El punto que mantiene unidas a las cromátidas hermanas.'},m:{en:'CENTROmere = the CENTER clasp.',es:'CENTRÓmero = el broche CENTRAL.'}},
  {t:'Autosome',d:{en:'Chromosomes 1–22 — body traits NOT related to sex.',es:'Cromosomas 1–22 — rasgos del cuerpo NO relacionados con el sexo.'},m:{en:'AUTOsome = AUTOmatic body traits (not sex).',es:'AUTOsoma = rasgos AUTOmáticos del cuerpo (no sexo).'}},
  {t:'Sex chromosomes',d:{en:'Pair 23 — XX = female, XY = male.',es:'Par 23 — XX = mujer, XY = hombre.'},m:{en:'X & Y decide the seX.',es:'X e Y deciden el seXo.'}},
  {t:'Somatic cell',d:{en:'A body cell (diploid). Its DNA is NOT passed to offspring.',es:'Célula del cuerpo (diploide). Su ADN NO pasa a la descendencia.'},m:{en:'SOMA = body.',es:'SOMA = cuerpo.'}},
  {t:'Gamete',d:{en:'A sex cell — egg or sperm (haploid). Its DNA CAN be passed on.',es:'Célula sexual — óvulo o espermatozoide (haploide). Su ADN SÍ pasa.'},m:{en:'Gametes get together at fertilization.',es:'Los gametos se juntan en la fecundación.'}},
  {t:'Fertilization',d:{en:'Egg + sperm fuse → a diploid zygote (2n).',es:'Óvulo + espermatozoide se fusionan → cigoto diploide (2n).'},m:{en:'n + n = 2n.',es:'n + n = 2n.'}},
  {t:'Meiosis',d:{en:'Nuclear division: 1 diploid cell → 4 unique haploid cells. Copied once, divides twice.',es:'División nuclear: 1 célula diploide → 4 células haploides únicas. Se copia una vez, se divide dos veces.'},m:{en:'Meiosis = MAKE gametes (reduces n).',es:'Meiosis = HACER gametos (reduce n).'}},
  {t:'Mitosis',d:{en:'1 cell → 2 genetically identical diploid cells.',es:'1 célula → 2 células diploides genéticamente idénticas.'},m:{en:'miTOSIS = TWO identical copies.',es:'miTOSIS = DOS copias idénticas.'}},
  {t:'Meiosis I',d:{en:'First division — separates HOMOLOGOUS chromosomes (2n → n).',es:'Primera división — separa los cromosomas HOMÓLOGOS (2n → n).'},m:{en:'1 = hOMOlogs out.',es:'1 = salen los hOMÓlogos.'}},
  {t:'Meiosis II',d:{en:'Second division — separates SISTER chromatids.',es:'Segunda división — separa las cromátidas HERMANAS.'},m:{en:'2 = sisTers split.',es:'2 = se separan las hermanas.'}},
  {t:'Crossing over',d:{en:'Homologous chromosomes exchange segments in Prophase I → new combinations.',es:'Los cromosomas homólogos intercambian segmentos en Profase I → nuevas combinaciones.'},m:{en:'Cross = swap → variety.',es:'Cruce = intercambio → variedad.'}},
  {t:'Gametogenesis',d:{en:'Making mature gametes. Sperm: 4 per germ cell · Egg: 1 + 3 polar bodies.',es:'Producción de gametos maduros. Esperma: 4 por célula · Óvulo: 1 + 3 cuerpos polares.'},m:{en:'4 sperm vs 1 egg.',es:'4 espermatozoides vs 1 óvulo.'}},
  {t:'Polar body',d:{en:'A tiny cell (mostly just DNA) discarded during egg formation.',es:'Célula diminuta (casi solo ADN) descartada al formar el óvulo.'},m:{en:'Polar body = leftover, broken down.',es:'Cuerpo polar = sobrante, se degrada.'}},
  {t:'Trait',d:{en:'An inherited characteristic (eye colour, seed shape).',es:'Característica heredada (color de ojos, forma de semilla).'},m:{en:'Trait = what you inherit.',es:'Rasgo = lo que heredas.'}},
  {t:'Dominant / Recessive',d:{en:'Dominant (P) masks recessive (p). Recessive shows only as pp.',es:'El dominante (P) enmascara al recesivo (p). El recesivo solo se ve como pp.'},m:{en:'Capital = dominant.',es:'Mayúscula = dominante.'}},
  {t:'F1 / F2 generation',d:{en:'F1 = offspring of the parents; F2 = offspring of F1 self-crossing.',es:'F1 = hijos de los padres; F2 = hijos del autocruce de F1.'},m:{en:'F = Filial (children).',es:'F = Filial (hijos).'}},
  {t:'Law of segregation',d:{en:'Two alleles per gene SEPARATE during gamete formation — one allele per gamete.',es:'Los dos alelos de un gen se SEPARAN al formar gametos — un alelo por gameto.'},m:{en:'Segregate = separate.',es:'Segregar = separar.'}},
  {t:'Purebred',d:{en:'A line self-pollinated long enough to be genetically uniform.',es:'Una línea autopolinizada lo suficiente para ser genéticamente uniforme.'},m:{en:'Pure = always the same.',es:'Pura = siempre igual.'}},
];
let bioKnow={};
function renderBioCards(){
  document.getElementById('bioCardScore').textContent=Object.values(bioKnow).filter(Boolean).length+' / '+BIO_CARDS.length+' '+T('bio_mastered');
  document.getElementById('bioCards').innerHTML=BIO_CARDS.map((c,i)=>`
    <div class="flip ${bioKnow[i]?'know':''}" id="fc${i}">
      <div class="flip-in" onclick="document.getElementById('fc${i}').classList.toggle('on')">
        <div class="flip-f"><div class="term">${esc(c.t)}</div><div class="hintw">${LANG==='es'?'toca para voltear':'tap to flip'}</div></div>
        <div class="flip-b"><div>${esc(L(c.d))}</div><div class="mnem">💡 ${esc(L(c.m))}</div>
          <div class="flip-mark"><button onclick="event.stopPropagation();bioMark(${i},1)">${T('q_got')}</button><button onclick="event.stopPropagation();bioMark(${i},0)">${T('q_review')}</button></div>
        </div>
      </div>
    </div>`).join('');
}
function bioMark(i,v){bioKnow[i]=!!v;renderBioCards();}

// Punnett square
function renderPunnett(){
  const a=document.getElementById('pun1').value, b=document.getElementById('pun2').value;
  const g1=[a[0],a[1]], g2=[b[0],b[1]];
  const grid=document.getElementById('punGrid');
  let cells=[`<div class="pun-cell pun-head"></div>`,`<div class="pun-cell pun-head">${g2[0]}</div>`,`<div class="pun-cell pun-head">${g2[1]}</div>`];
  const geno={}, pheno={purple:0,white:0}; let idx=0;
  for(const x of g1){
    cells.push(`<div class="pun-cell pun-head">${x}</div>`);
    for(const y of g2){
      const combo=[x,y].sort((p,q)=>p==='P'?-1:1).join('');
      geno[combo]=(geno[combo]||0)+1;
      const purple=combo.includes('P'); purple?pheno.purple++:pheno.white++;
      cells.push(`<div class="pun-cell ${purple?'pun-purple':'pun-white'}" data-i="${idx++}">${combo}</div>`);
    }
  }
  grid.innerHTML=cells.join('');
  // animate reveal
  const dyn=grid.querySelectorAll('.pun-cell[data-i]');
  dyn.forEach((c,k)=>setTimeout(()=>c.classList.add('show'),80+k*120));
  grid.querySelectorAll('.pun-head').forEach(c=>c.classList.add('show'));
  const gtxt=Object.entries(geno).map(([k,v])=>`${v} ${k}`).join('  ·  ');
  document.getElementById('punGeno').innerHTML=(LANG==='es'?'Genotipos: ':'Genotypes: ')+'<b>'+gtxt+'</b>';
  const rp=ratio(pheno.purple,pheno.white);
  document.getElementById('punPheno').innerHTML=(LANG==='es'?'Fenotipos: ':'Phenotypes: ')+`<b>${pheno.purple} ${LANG==='es'?'púrpura':'purple'} : ${pheno.white} ${LANG==='es'?'blanco':'white'}</b>`+(rp?` &nbsp;(${rp})`:'');
}
function ratio(a,b){if(a&&b){const g=(x,y)=>y?g(y,x%y):x;const d=g(a,b);return (a/d)+' : '+(b/d);}return a?'all '+(LANG==='es'?'púrpura':'purple'):'all '+(LANG==='es'?'blanco':'white');}

// Key concepts per deck
const BIO_TOPICS=[
  {t:'09 · Chromosomes & Meiosis',pts:{
    en:['Body cells = 46 chromosomes in 23 pairs (22 autosome pairs + 1 sex pair: XX/XY).','Diploid (2n=46) = two copies of each chromosome; Haploid (n=23) = one copy.','Homologous chromosomes carry the same genes but not always the same alleles.','A duplicated chromosome = two sister chromatids joined at the centromere.','Meiosis makes 4 unique haploid cells; mitosis makes 2 identical diploid cells.'],
    es:['Células del cuerpo = 46 cromosomas en 23 pares (22 pares autosómicos + 1 par sexual: XX/XY).','Diploide (2n=46) = dos copias de cada cromosoma; Haploide (n=23) = una copia.','Los cromosomas homólogos llevan los mismos genes pero no siempre los mismos alelos.','Un cromosoma duplicado = dos cromátidas hermanas unidas por el centrómero.','La meiosis produce 4 células haploides únicas; la mitosis, 2 diploides idénticas.']}},
  {t:'10 · Process of Meiosis',pts:{
    en:['Meiosis I separates HOMOLOGOUS chromosomes; Meiosis II separates SISTER chromatids.','DNA is copied once, the cell divides twice → 4 haploid cells.','~2²³ ≈ 8 million chromosome combinations are possible per gamete.','Gametogenesis: 1 germ cell → 4 sperm, OR → 1 egg + 3 polar bodies.','Each round (I and II) has 4 phases: Prophase, Metaphase, Anaphase, Telophase.'],
    es:['Meiosis I separa los cromosomas HOMÓLOGOS; Meiosis II separa las cromátidas HERMANAS.','El ADN se copia una vez, la célula se divide dos veces → 4 células haploides.','~2²³ ≈ 8 millones de combinaciones de cromosomas posibles por gameto.','Gametogénesis: 1 célula germinal → 4 espermatozoides, O → 1 óvulo + 3 cuerpos polares.','Cada ronda (I y II) tiene 4 fases: Profase, Metafase, Anafase, Telofase.']}},
  {t:'11 · Mendel & Heredity',pts:{
    en:['Mendel crossed purebred pea plants and tracked 7 either-or traits.','F1: only the dominant trait shows; the recessive trait is hidden.','F2: the hidden trait returns in a ~3 : 1 (dominant : recessive) ratio.','Traits are inherited as discrete units (genes) — they do not blend.','Law of segregation: the two alleles separate during gamete formation (meiosis).'],
    es:['Mendel cruzó plantas de arveja puras y siguió 7 rasgos de tipo «o uno u otro».','F1: solo aparece el rasgo dominante; el recesivo queda oculto.','F2: el rasgo oculto vuelve en una proporción ~3 : 1 (dominante : recesivo).','Los rasgos se heredan como unidades discretas (genes) — no se mezclan.','Ley de la segregación: los dos alelos se separan al formar gametos (meiosis).']}},
];
function renderBioTopics(){
  document.getElementById('bioTopics').innerHTML=BIO_TOPICS.map((tp,i)=>`
    <div class="scene ${i===0?'open':''}" id="bt${i}">
      <div class="scene-head" onclick="document.getElementById('bt${i}').classList.toggle('open')">
        <div class="scene-title">${esc(tp.t)}</div><div class="scene-pages">▾</div>
      </div>
      <div class="scene-body"><ul>${tp.pts[LANG].map(p=>`<li>${esc(p)}</li>`).join('')}</ul></div>
    </div>`).join('');
}
// ===== CELLS sub-section =====
function showBioSub(which){
  document.getElementById('bioCells').style.display=which==='cells'?'block':'none';
  document.getElementById('bioGenetics').style.display=which==='gen'?'block':'none';
  document.getElementById('subCells').classList.toggle('active',which==='cells');
  document.getElementById('subGen').classList.toggle('active',which==='gen');
}

// Interactive cell — organelles
const CELL_ORG={
  membrane:{name:'Cell membrane',tag:'both',fn:{en:'Thin flexible boundary that controls what enters and leaves the cell. Present in ALL cells.',es:'Borde fino y flexible que controla qué entra y sale de la célula. Está en TODAS las células.'}},
  cyto:{name:'Cytoskeleton',tag:'both',fn:{en:'Network of protein fibers that gives the cell shape and support and helps it move and divide (microtubules, intermediate filaments, microfilaments).',es:'Red de fibras de proteína que da forma y soporte a la célula y ayuda a moverse y dividirse (microtúbulos, filamentos intermedios, microfilamentos).'}},
  nucleus:{name:'Nucleus',tag:'both',fn:{en:'Stores and protects the DNA and directs all cell activities. The dark spot inside is the nucleolus.',es:'Almacena y protege el ADN y dirige todas las actividades de la célula. El punto oscuro es el nucléolo.'}},
  rer:{name:'Rough ER',tag:'both',fn:{en:'Endoplasmic reticulum studded with ribosomes — it makes and folds PROTEINS.',es:'Retículo endoplásmico cubierto de ribosomas — fabrica y pliega PROTEÍNAS.'}},
  ser:{name:'Smooth ER',tag:'both',fn:{en:'Endoplasmic reticulum with no ribosomes — makes LIPIDS and breaks down drugs and alcohol.',es:'Retículo endoplásmico sin ribosomas — fabrica LÍPIDOS y descompone fármacos y alcohol.'}},
  ribosome:{name:'Ribosomes',tag:'both',fn:{en:'Tiny machines that assemble the protein chain. Found on the rough ER or floating free.',es:'Máquinas diminutas que ensamblan la cadena de proteína. Están en el RE rugoso o libres.'}},
  golgi:{name:'Golgi apparatus',tag:'both',fn:{en:'Modifies, packages and ships proteins to their destination — the cell\'s "post office".',es:'Modifica, empaqueta y envía las proteínas a su destino — el "correo" de la célula.'}},
  vesicle:{name:'Vesicle',tag:'both',fn:{en:'Small membrane sac that carries proteins from the ER to the Golgi and beyond.',es:'Pequeña bolsa de membrana que transporta proteínas del RE al Golgi y más allá.'}},
  mito:{name:'Mitochondrion',tag:'both',fn:{en:'Converts food into usable energy (ATP). Bean-shaped, has 2 membranes and its OWN DNA.',es:'Convierte el alimento en energía utilizable (ATP). Con forma de frijol, 2 membranas y su PROPIO ADN.'}},
  lyso:{name:'Lysosome',tag:'animal',fn:{en:'Contains digestive enzymes — recycles worn-out parts and defends against bacteria. Mostly in animal cells.',es:'Contiene enzimas digestivas — recicla partes gastadas y defiende contra bacterias. Sobre todo en células animales.'}},
  vacuole:{name:'Vacuole',tag:'both',fn:{en:'Fluid-filled sac that stores water, nutrients and waste. In plants it is ONE large central vacuole that supports the cell.',es:'Bolsa llena de líquido que guarda agua, nutrientes y desechos. En las plantas es UNA gran vacuola central que sostiene la célula.'}},
  centriole:{name:'Centrioles',tag:'animal',fn:{en:'Short microtubules that help separate DNA during cell division. Found in animal cells.',es:'Microtúbulos cortos que ayudan a separar el ADN durante la división. Están en células animales.'}},
  wall:{name:'Cell wall',tag:'plant',fn:{en:'Rigid layer of cellulose outside the membrane — gives shape, protection and support. PLANT cells only.',es:'Capa rígida de celulosa fuera de la membrana — da forma, protección y soporte. Solo en células VEGETALES.'}},
  chloro:{name:'Chloroplast',tag:'plant',fn:{en:'Carries out PHOTOSYNTHESIS (sunlight → chemical energy) using green chlorophyll. PLANT cells only.',es:'Realiza la FOTOSÍNTESIS (luz solar → energía química) con clorofila verde. Solo en células VEGETALES.'}},
};
let curOrg=null;
function cellInfo(key){
  document.querySelectorAll('#cellSvg .org').forEach(g=>g.classList.remove('sel'));
  const box=document.getElementById('cellInfo');
  if(!key||!CELL_ORG[key]){curOrg=null;box.innerHTML=`<div class="ci-name">${T('cell_info_default')}</div><div class="ci-fn">${T('cell_info_hint')}</div>`;return;}
  curOrg=key;const o=CELL_ORG[key];const g=document.getElementById('o-'+key);if(g)g.classList.add('sel');
  const tg=o.tag==='animal'?'ci-animal':o.tag==='plant'?'ci-plant':'ci-both';
  const tlab=o.tag==='animal'?(LANG==='es'?'animal':'animal'):o.tag==='plant'?(LANG==='es'?'vegetal':'plant'):(LANG==='es'?'ambas':'both cells');
  box.innerHTML=`<div class="ci-name">${esc(o.name)}</div><span class="ci-tag ${tg}">${tlab}</span><div class="ci-fn">${esc(L(o.fn))}</div>`;
}
let cellType='animal';
function setCellType(t){
  cellType=t;
  document.getElementById('ctAnimal').classList.toggle('active',t==='animal');
  document.getElementById('ctPlant').classList.toggle('active',t==='plant');
  document.querySelectorAll('#cellSvg .plantonly').forEach(e=>e.style.display=t==='plant'?'':'none');
  document.querySelectorAll('#cellSvg .animalonly').forEach(e=>e.style.display=t==='animal'?'':'none');
  const v=document.getElementById('vacShape'),vl=document.getElementById('vacLbl');
  if(t==='plant'){v.setAttribute('cx',300);v.setAttribute('cy',158);v.setAttribute('rx',60);v.setAttribute('ry',82);vl.setAttribute('x',300);vl.setAttribute('y',160);}
  else{v.setAttribute('cx',352);v.setAttribute('cy',232);v.setAttribute('rx',30);v.setAttribute('ry',24);vl.setAttribute('x',352);vl.setAttribute('y',234);}
}

// Cell cycle wheel
const CYCLE=[
  {k:'G1',col:'#3d8a4f',pct:34,name:{en:'G1 — Growth phase 1',es:'G1 — Crecimiento 1'},d:{en:'Interphase. The new daughter cell grows and carries out its normal functions.',es:'Interfase. La nueva célula hija crece y realiza sus funciones normales.'}},
  {k:'S',col:'#5a86c8',pct:24,name:{en:'S — Synthesis',es:'S — Síntesis'},d:{en:'DNA is replicated — every chromosome is duplicated into two sister chromatids.',es:'Se replica el ADN — cada cromosoma se duplica en dos cromátidas hermanas.'}},
  {k:'G2',col:'#2a7a6e',pct:24,name:{en:'G2 — Growth phase 2',es:'G2 — Crecimiento 2'},d:{en:'The cell grows more and prepares for division; organelles multiply and the DNA starts to condense.',es:'La célula crece más y se prepara para dividirse; los organelos se multiplican y el ADN empieza a condensarse.'}},
  {k:'M',col:'#c8822a',pct:18,name:{en:'M — Mitotic phase',es:'M — Fase mitótica'},d:{en:'Mitosis + cytokinesis: the cell divides into two genetically identical daughter cells.',es:'Mitosis + citocinesis: la célula se divide en dos células hijas genéticamente idénticas.'}},
];
let cycI=0,cycTimer=null;
function pol(cx,cy,r,a){const t=a*Math.PI/180;return[cx+r*Math.sin(t),cy-r*Math.cos(t)];}
function renderCycle(){
  let ang=0;const cx=130,cy=130,r=92;let html='';const mids=[];
  CYCLE.forEach((p,i)=>{const span=p.pct/100*360, a0=ang, a1=ang+span; mids[i]=a0+span/2; ang=a1;
    const[x0,y0]=pol(cx,cy,r,a0),[x1,y1]=pol(cx,cy,r,a1);const laf=span>180?1:0;
    html+=`<path class="cyc-arc" id="cyc${i}" data-i="${i}" onclick="cycSet(${i})" stroke="${p.col}" d="M${x0.toFixed(1)} ${y0.toFixed(1)} A${r} ${r} 0 ${laf} 1 ${x1.toFixed(1)} ${y1.toFixed(1)}"/>`;});
  document.getElementById('cycArcs').innerHTML=html;
  CYCLE._mids=mids;
}
function cycSet(i){
  cycI=(i+CYCLE.length)%CYCLE.length;const p=CYCLE[cycI];
  CYCLE.forEach((_,k)=>document.getElementById('cyc'+k).classList.toggle('on',k===cycI));
  document.getElementById('cycPointer').style.transform=`rotate(${CYCLE._mids[cycI]}deg)`;
  document.getElementById('cycName').textContent=L(p.name);
  document.getElementById('cycDesc').textContent=L(p.d);
  document.getElementById('cycCenter').textContent=cycI<3?(LANG==='es'?'Interfase':'Interphase'):(LANG==='es'?'Fase M':'M phase');
  document.getElementById('cycCenter2').textContent=p.k;
}
function cycNext(){cycSet(cycI+1);}
function cycPrev(){cycStop();cycSet(cycI-1);}
function cycStop(){if(cycTimer){clearInterval(cycTimer);cycTimer=null;}document.getElementById('cycPlayBtn').textContent=T('bio_play');}
function cycToggle(){if(cycTimer){cycStop();return;}document.getElementById('cycPlayBtn').textContent=T('bio_pause');cycTimer=setInterval(()=>cycSet(cycI+1),1600);}

// Mitosis player (reuses .bio-stage/.chromatid classes, m-prefixed ids)
const BIO_MIT=[
  {n:{en:'Interphase',es:'Interfase'},d:{en:'The cell grows and copies its DNA. Each chromosome becomes two sister chromatids (still loose chromatin).',es:'La célula crece y copia su ADN. Cada cromosoma se vuelve dos cromátidas hermanas (aún cromatina suelta).'},cells:[[50,50,86,86]],p:{matA:[37,40],matB:[43,40],patA:[59,62],patB:[65,62]},jm:1,jp:1},
  {n:{en:'Prophase',es:'Profase'},d:{en:'Chromatin condenses into visible duplicated chromosomes. The nuclear envelope breaks down and spindle fibers form from the centrioles.',es:'La cromatina se condensa en cromosomas duplicados visibles. La envoltura nuclear se rompe y se forman fibras del huso desde los centriolos.'},cells:[[50,50,86,86]],p:{matA:[40,42],matB:[46,42],patA:[58,60],patB:[64,60]},jm:1,jp:1},
  {n:{en:'Metaphase',es:'Metafase'},d:{en:'Spindle fibers attach to each centromere and line the chromosomes up along the cell equator (metaphase plate).',es:'Las fibras del huso se unen a cada centrómero y alinean los cromosomas en el ecuador de la célula (placa metafásica).'},cells:[[50,50,86,86]],p:{matA:[40,50],matB:[44,50],patA:[56,50],patB:[60,50]},jm:1,jp:1},
  {n:{en:'Anaphase',es:'Anafase'},d:{en:'Sister chromatids SEPARATE — spindle fibers shorten and pull them to opposite poles. The cell begins to elongate.',es:'Las cromátidas hermanas se SEPARAN — las fibras se acortan y las llevan a polos opuestos. La célula empieza a alargarse.'},cells:[[50,50,86,86]],p:{matA:[40,22],matB:[40,78],patA:[60,22],patB:[60,78]},jm:0,jp:0},
  {n:{en:'Telophase & Cytokinesis',es:'Telofase y Citocinesis'},d:{en:'Two new nuclei form and the cytoplasm divides (animal: cleavage furrow · plant: cell plate) → 2 genetically IDENTICAL diploid daughter cells.',es:'Se forman dos núcleos nuevos y el citoplasma se divide (animal: surco de división · planta: placa celular) → 2 células hijas diploides IDÉNTICAS.'},cells:[[50,27,82,44],[50,73,82,44]],p:{matA:[40,24],matB:[40,76],patA:[60,24],patB:[60,76]},jm:0,jp:0},
];
let mitI=0,mitTimer=null;
function setMit(id,x,y){const e=document.getElementById(id);if(e){e.style.left=x+'%';e.style.top=y+'%';}}
function setMitPhase(i){
  mitI=(i+BIO_MIT.length)%BIO_MIT.length;const ph=BIO_MIT[mitI];
  setMit('mMatA',...ph.p.matA);setMit('mMatB',...ph.p.matB);setMit('mPatA',...ph.p.patA);setMit('mPatB',...ph.p.patB);
  for(let k=0;k<2;k++){const c=document.getElementById('mCell'+k);
    if(k<ph.cells.length){const[x,y,w,h]=ph.cells[k];c.style.left=x+'%';c.style.top=y+'%';c.style.width=w+'%';c.style.height=h+'%';c.style.opacity='1';}else c.style.opacity='0';}
  function cen(id,a,b,show){const e=document.getElementById(id);if(!show){e.style.opacity='0';return;}e.style.opacity='1';e.style.left=((a[0]+b[0])/2)+'%';e.style.top=((a[1]+b[1])/2)+'%';e.style.width=(Math.abs(a[0]-b[0])+6)+'%';}
  cen('mCenMat',ph.p.matA,ph.p.matB,ph.jm);cen('mCenPat',ph.p.patA,ph.p.patB,ph.jp);
  document.getElementById('mPhName').textContent=L(ph.n);
  document.getElementById('mPhDesc').textContent=L(ph.d);
  document.getElementById('mPhDots').innerHTML=BIO_MIT.map((_,k)=>`<span class="${k===mitI?'on':''}"></span>`).join('');
}
function mitNext(){setMitPhase(mitI+1);}
function mitPrev(){mitStop();setMitPhase(mitI-1);}
function mitRestart(){mitStop();setMitPhase(0);}
function mitStop(){if(mitTimer){clearInterval(mitTimer);mitTimer=null;}document.getElementById('mitPlayBtn').textContent=T('bio_play');}
function mitToggle(){if(mitTimer){mitStop();return;}if(mitI>=BIO_MIT.length-1)setMitPhase(0);document.getElementById('mitPlayBtn').textContent=T('bio_pause');mitTimer=setInterval(()=>{if(mitI>=BIO_MIT.length-1){mitStop();return;}setMitPhase(mitI+1);},1500);}

// Cell flashcards
const CELL_CARDS=[
  {t:'Cell theory',d:{en:'1) All organisms are made of cells. 2) All cells come from pre-existing cells. 3) The cell is the most basic unit of life.',es:'1) Todos los organismos están hechos de células. 2) Toda célula proviene de otra célula. 3) La célula es la unidad básica de la vida.'}},
  {t:'Prokaryotic cell',d:{en:'No membrane-bound nucleus; DNA floats in the cytoplasm; no organelles. Example: bacteria.',es:'Sin núcleo rodeado de membrana; el ADN flota en el citoplasma; sin organelos. Ejemplo: bacterias.'},m:{en:'PRO = before a true nucleus.',es:'PRO = antes del núcleo verdadero.'}},
  {t:'Eukaryotic cell',d:{en:'Has a TRUE nucleus and membrane-bound organelles. Example: plants, animals, fungi.',es:'Tiene un núcleo VERDADERO y organelos con membrana. Ejemplo: plantas, animales, hongos.'},m:{en:'EU = a good (true) nucleus.',es:'EU = un buen núcleo (verdadero).'}},
  {t:'Organelle',d:{en:'A membrane-bound structure inside a eukaryotic cell with a specific job.',es:'Estructura con membrana dentro de una célula eucariota con una función específica.'}},
  {t:'Nucleus',d:{en:'Stores and protects DNA and directs all cell activities.',es:'Almacena y protege el ADN y dirige todas las actividades de la célula.'}},
  {t:'Mitochondrion',d:{en:'Converts food into ATP (energy); has its own DNA. The cell\'s "power plant".',es:'Convierte el alimento en ATP (energía); tiene su propio ADN. La "central eléctrica" de la célula.'},m:{en:'Mito = power.',es:'Mito = energía.'}},
  {t:'Ribosome',d:{en:'Builds proteins by assembling the amino-acid chain.',es:'Construye proteínas ensamblando la cadena de aminoácidos.'}},
  {t:'Rough ER',d:{en:'ER covered in ribosomes — makes proteins.',es:'RE cubierto de ribosomas — fabrica proteínas.'},m:{en:'Rough = Ribosomes = pRoteins.',es:'Rugoso = Ribosomas = pRoteínas.'}},
  {t:'Smooth ER',d:{en:'ER without ribosomes — makes lipids and breaks down drugs/alcohol.',es:'RE sin ribosomas — fabrica lípidos y descompone fármacos/alcohol.'}},
  {t:'Golgi apparatus',d:{en:'Modifies, packages and ships proteins — the cell\'s post office.',es:'Modifica, empaqueta y envía proteínas — el correo de la célula.'}},
  {t:'Lysosome',d:{en:'Holds digestive enzymes; recycles old parts and defends against bacteria.',es:'Contiene enzimas digestivas; recicla partes viejas y defiende contra bacterias.'}},
  {t:'Vacuole',d:{en:'Storage sac for water, nutrients and waste. Plants have one large central vacuole.',es:'Bolsa de almacenamiento de agua, nutrientes y desechos. Las plantas tienen una gran vacuola central.'}},
  {t:'Cell wall',d:{en:'Rigid cellulose layer outside plant cells — shape and support. (Plants only.)',es:'Capa rígida de celulosa fuera de las células vegetales — forma y soporte. (Solo plantas.)'}},
  {t:'Chloroplast',d:{en:'Does photosynthesis using chlorophyll. (Plants only.)',es:'Realiza la fotosíntesis con clorofila. (Solo plantas.)'}},
  {t:'Chromatin',d:{en:'Loose, uncoiled DNA + histones — the form for most of the cell\'s life.',es:'ADN + histonas sueltos y desenrollados — la forma durante casi toda la vida de la célula.'}},
  {t:'Chromosome',d:{en:'Condensed DNA + histones, visible when the cell divides.',es:'ADN + histonas condensados, visibles cuando la célula se divide.'}},
  {t:'Telomere',d:{en:'Protective repeated sequences at the ends of a chromosome.',es:'Secuencias repetidas protectoras en los extremos del cromosoma.'},m:{en:'Tips = Telomeres.',es:'Puntas = Telómeros.'}},
  {t:'Spindle fibers',d:{en:'Microtubules that attach to centromeres and move chromosomes during mitosis.',es:'Microtúbulos que se unen a los centrómeros y mueven los cromosomas durante la mitosis.'}},
  {t:'Interphase',d:{en:'The longest stage (G1, S, G2) — the cell grows and copies its DNA. ~90% of the cycle.',es:'La etapa más larga (G1, S, G2) — la célula crece y copia su ADN. ~90% del ciclo.'}},
  {t:'Cyclin',d:{en:'Protein that drives the cell forward through the cell-cycle checkpoints.',es:'Proteína que impulsa a la célula a avanzar por los puntos de control del ciclo.'}},
  {t:'Mitosis',d:{en:'Nuclear division → two genetically IDENTICAL nuclei (Prophase→Metaphase→Anaphase→Telophase).',es:'División del núcleo → dos núcleos genéticamente IDÉNTICOS (Profase→Metafase→Anafase→Telofase).'}},
  {t:'Cytokinesis',d:{en:'Division of the cytoplasm. Animal: cleavage furrow · Plant: cell plate (Golgi).',es:'División del citoplasma. Animal: surco de división · Planta: placa celular (Golgi).'}},
];
let cellKnow={};
function renderCellCards(){
  document.getElementById('cellCardScore').textContent=Object.values(cellKnow).filter(Boolean).length+' / '+CELL_CARDS.length+' '+T('bio_mastered');
  document.getElementById('cellCards').innerHTML=CELL_CARDS.map((c,i)=>`
    <div class="flip ${cellKnow[i]?'know':''}" id="cc${i}">
      <div class="flip-in" onclick="document.getElementById('cc${i}').classList.toggle('on')">
        <div class="flip-f"><div class="term">${esc(c.t)}</div><div class="hintw">${LANG==='es'?'toca para voltear':'tap to flip'}</div></div>
        <div class="flip-b"><div>${esc(L(c.d))}</div>${c.m?`<div class="mnem">💡 ${esc(L(c.m))}</div>`:''}
          <div class="flip-mark"><button onclick="event.stopPropagation();cellMark(${i},1)">${T('q_got')}</button><button onclick="event.stopPropagation();cellMark(${i},0)">${T('q_review')}</button></div>
        </div></div></div>`).join('');
}
function cellMark(i,v){cellKnow[i]=!!v;renderCellCards();}

// Cell key concepts
const CELL_TOPICS=[
  {t:'3 · Cell Structure & Function',pts:{en:['Cell theory: all organisms are cells · cells come from cells · the cell is the basic unit of life.','Prokaryote = no nucleus (bacteria); Eukaryote = true nucleus + organelles (plants, animals, fungi).','Protein factory: Nucleus → Rough ER + ribosomes → vesicle → Golgi → secretion.','Mitochondria = energy (ATP); Lysosomes = recycling/defense; Cytoskeleton = shape & movement.','Plant-only: cell wall (cellulose), chloroplasts, one large central vacuole.'],es:['Teoría celular: todos los organismos son células · las células provienen de células · la célula es la unidad básica de la vida.','Procariota = sin núcleo (bacterias); Eucariota = núcleo verdadero + organelos (plantas, animales, hongos).','Fábrica de proteínas: Núcleo → RE rugoso + ribosomas → vesícula → Golgi → secreción.','Mitocondrias = energía (ATP); Lisosomas = reciclaje/defensa; Citoesqueleto = forma y movimiento.','Solo plantas: pared celular (celulosa), cloroplastos, una gran vacuola central.']}},
  {t:'4 · The Cell Cycle',pts:{en:['Cell cycle = growth, DNA replication and division, producing two identical daughter cells.','Interphase (G1, S, G2) is the longest part, ~90% of the cycle.','G1 = growth · S = DNA is replicated (sister chromatids form) · G2 = grow & prepare for mitosis.','M phase = mitosis + cytokinesis.','Cyclins drive the cell through checkpoints; cells in G0 are not dividing.'],es:['Ciclo celular = crecimiento, replicación del ADN y división, que produce dos células hijas idénticas.','La interfase (G1, S, G2) es la parte más larga, ~90% del ciclo.','G1 = crecimiento · S = se replica el ADN (se forman cromátidas hermanas) · G2 = crecer y prepararse para la mitosis.','Fase M = mitosis + citocinesis.','Las ciclinas impulsan a la célula por los puntos de control; las células en G0 no se dividen.']}},
  {t:'5 · Cell Division (Mitosis & Cytokinesis)',pts:{en:['DNA: chromatin (loose) → condensed chromosome; duplicated = 2 sister chromatids at the centromere; telomeres protect the ends.','Prophase: chromosomes condense, nuclear envelope breaks down, spindle forms.','Metaphase: chromosomes line up at the cell equator.','Anaphase: sister chromatids are pulled to opposite poles.','Telophase + cytokinesis: 2 nuclei form; 1 parent cell → 2 IDENTICAL daughter cells (furrow in animals, cell plate in plants).'],es:['ADN: cromatina (suelta) → cromosoma condensado; duplicado = 2 cromátidas hermanas en el centrómero; los telómeros protegen los extremos.','Profase: los cromosomas se condensan, la envoltura nuclear se rompe, se forma el huso.','Metafase: los cromosomas se alinean en el ecuador de la célula.','Anafase: las cromátidas hermanas son llevadas a polos opuestos.','Telofase + citocinesis: se forman 2 núcleos; 1 célula madre → 2 células hijas IDÉNTICAS (surco en animales, placa celular en plantas).']}},
];
function renderCellTopics(){
  document.getElementById('cellTopics').innerHTML=CELL_TOPICS.map((tp,i)=>`
    <div class="scene ${i===0?'open':''}" id="ct${i}">
      <div class="scene-head" onclick="document.getElementById('ct${i}').classList.toggle('open')">
        <div class="scene-title">${esc(tp.t)}</div><div class="scene-pages">▾</div></div>
      <div class="scene-body"><ul>${tp.pts[LANG].map(p=>`<li>${esc(p)}</li>`).join('')}</ul></div>
    </div>`).join('');
}

let bioInit=false;
function renderBiology(){
  if(!bioInit){bioInit=true;
    document.getElementById('bioPlayBtn').textContent=T('bio_play');setBioPhase(0);renderPunnett();
    document.getElementById('mitPlayBtn').textContent=T('bio_play');document.getElementById('cycPlayBtn').textContent=T('bio_play');
    renderCycle();cycSet(0);setMitPhase(0);setCellType('animal');cellInfo(null);showBioSub('cells');
  } else {setBioPhase(bioI);setMitPhase(mitI);cycSet(cycI);cellInfo(curOrg);}
  renderBioCards();renderBioTopics();renderCellCards();renderCellTopics();
  if(!bioTimer)document.getElementById('bioPlayBtn').textContent=T('bio_play');
  if(!mitTimer)document.getElementById('mitPlayBtn').textContent=T('bio_play');
  if(!cycTimer)document.getElementById('cycPlayBtn').textContent=T('bio_play');
}

/* ---------- UTIL & RENDER ---------- */
function esc(s){return (s==null?'':''+s).replace(/[&<>"]/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[m]));}
function renderAll(){fillCriterionSelect();renderCriteria();renderCorrections();renderAnalysis();renderReading();renderPanel();renderQuiz();renderBiology();renderDataInfo();}
document.documentElement.lang=LANG;
document.getElementById('rDate').value=new Date().toISOString().slice(0,10);
applyStatic();
renderAll();
