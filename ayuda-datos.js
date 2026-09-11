/* Contenido de la ayuda del Portal NIS (ayuda.html).
   Va aparte del HTML a proposito: el texto se corrige a menudo y quien lo
   corrige no tiene por que tocar la pagina. El mismo archivo alimenta la
   ayuda en pantalla y el manual impreso, asi que lo que se escriba aqui sale
   en los dos sitios.

   Formato de cada bloque del cuerpo:
     'texto'                     -> parrafo (admite HTML sencillo)
     {h:'Titulo'}                -> subtitulo
     {pasos:['…','…']}           -> lista numerada
     {lista:['…','…']}           -> lista con vinetas
     {nota:'…', tipo:'warn'}     -> aviso (tipo: '', 'warn', 'bad')
     {tabla:{cols:[…], filas:[[…]]}}  -> tabla; la primera celda va resaltada

   REGLA: no se documenta nada que no exista. Si una pantalla cambia de sitio,
   se cambia aqui el mismo dia. */
window.AYUDA = {

/* ───────────────────────────── ALUMNO ───────────────────────────── */
student: { secciones: [

  { icon:'🔑', titulo:'Signing in to the portal', busca:'login password access sign in forgot',
    sub:'The address is nis.cohasset.pe. Always sign in there.',
    cuerpo:[
      {pasos:[
        'Open <b>nis.cohasset.pe</b> in your browser (Chrome works best).',
        'Enter your <b>school email</b> and your password.',
        'Tap <b>Sign in</b>. You will see your name at the top right.'
      ]},
      {h:'I forgot my password'},
      'On the sign-in screen, tap <b>Forgot your password?</b> and enter your email: you will get a link to set a new one. If the email does not arrive, check the spam folder, and if it still does not show up, ask your teacher to tell coordination so they can give you a temporary password.',
      {nota:'If you go in through an address starting with <b>bacman2000.github.io</b>, the portal takes you straight to nis.cohasset.pe. It is the same platform, but sign-in only works on nis.cohasset.pe: update your bookmark.', tipo:'warn'}
    ]},

  { icon:'🧭', titulo:'How it is organized', busca:'menu bar navigation where is structure map',
    sub:'Six entries on the left-hand bar, and nothing more.',
    cuerpo:[
      {tabla:{cols:['On the bar','What you will find'],filas:[
        ['🏠 Home','Your unit at a glance, the subjects (English and French) and the general resources: Library and MUN Academy.'],
        ['🇬🇧 English','<b>Everything for English</b>, spread across four blocks. It is the screen where you will spend most of your time.'],
        ['🇫🇷 French','The French material: by grade (what is being taught in class) and by Common European Framework level (A1–C2).'],
        ['📊 My Progress','Your exams and practice: what you took, when, and with what grade.'],
        ['👤 My account','Change your password.'],
        ['❓ Help','This guide.']
      ]}},
      {nota:'On mobile or tablet the bar is not on the left: it is a row that scrolls along the top of the screen. It has the same entries.'}
    ]},

  { icon:'🇬🇧', titulo:'English: the four blocks', busca:'english blocks my work practice cambridge results cards',
    sub:'They go in the order you use them: first what you are working on, then what you train with, then the exam, and finally your grades.',
    cuerpo:[
      {h:'🎯 My work — what you are working on'},
      {lista:[
        '<b>My unit</b> — your unit for this term: the big question, what you need to produce, and the criteria you will be graded on. <b>The rubric is visible from day one</b>, before you start.',
        '<b>My project</b> — the term’s interdisciplinary project: eleven weeks and what each subject contributes.',
        '<b>Classes</b> — your grade’s material: grammar, activities, readers, unit exams and the worksheets for each session.'
      ]},
      {h:'🧠 Practice — to train on your own'},
      {lista:[
        '<b>Pronunciation</b> — every sound, with the tongue and the airflow, to listen to and repeat.',
        '<b>Phonics</b> — sounds and word patterns: CVC, blends, magic-e.',
        '<b>Games Lab</b> — 7 games per topic: grammar, vocabulary, phrasal verbs and idioms (A1–C1).',
        '<b>NIShoot Live</b> — your class’s live game. Join with the PIN your teacher gives you.'
      ]},
      {h:'🎓 Cambridge — the official exam'},
      {lista:[
        '<b>Cambridge</b> — the full map: the Young Learners track (Pre-A1 to A2) and the Main Suite (A2 to C2), with the guide for each exam.',
        '<b>Mocks</b> — the official MOCK 1 and MOCK 2 mock exams, by skill.',
        '<b>Practice Tests</b> — practice in Cambridge format, always available.'
      ]},
      {h:'📊 My results'},
      {lista:['<b>Final result</b> — your final CEFR level and the report your family receives, with a PDF.']},
      {nota:'Your <b>day-to-day progress</b> is not here: it is under <b>📊 My Progress</b>, on the left-hand bar, so you can reach it from any screen.'}
    ]},

  { icon:'🎯', titulo:'My unit and my project', busca:'unit product rubric project submission big question',
    sub:'The unit has a final product and a rubric. Both are visible from the start.',
    cuerpo:[
      {pasos:[
        'Go to <b>English → My unit</b> (or from Home, in the band at the top).',
        'At the top is the <b>final product</b>: what you need to submit at the end of the unit.',
        'Below it, the <b>rubric</b>: the criteria you are graded on, on the <b>AD · A · B · C</b> scale (AD is the highest level).',
        'After that comes the <b>week-by-week path</b>, with each week’s activities attached where they belong.',
        'At the end is the <b>submission</b>: you upload your file or paste your Google Doc link, and tap submit.'
      ]},
      {h:'The materials for each session'},
      'Inside each week you will find the worksheet in <b>PDF</b> (to read), in <b>Word</b> (to edit it on your computer or in Google Docs), and the <b>class viewer</b> with the slides your teacher used.',
      {nota:'The slides can be viewed in the portal but not downloaded. You can download the worksheet in both formats.'}
    ]},

  { icon:'📄', titulo:'Answering and submitting a worksheet', busca:'worksheet save submit draft',
    sub:'Worksheets are answered inside the portal. There is no need to print them or copy them into Word.',
    cuerpo:[
      {pasos:[
        'Open the right session from <b>Classes → your grade → the unit → the week</b>.',
        'The worksheet opens with its fields: you write directly on the screen.',
        'It <b>autosaves</b> as you type, a second and a half after your last keystroke. You will see the save notice at the top.',
        'When you finish, tap <b>Submit</b>. That is the moment your teacher receives it.'
      ]},
      {nota:'<b>Saving is not submitting.</b> While you only save, your work stays as a draft and your teacher does not see it in their list. The submission happens with the submit button.', tipo:'warn'},
      {h:'Your work goes to your account, not to the computer'},
      'You can start a worksheet in the computer lab and finish it at home: when you open it again, what you wrote is there. If the copy on the computer is more recent than the one in your account, the portal keeps the computer’s copy and offers to undo it. Nothing is ever deleted.',
      {nota:'If you signed in to the portal in another tab and the session closed, the worksheet keeps working but only saves on that computer, and the bar tells you so. Sign in again before writing too much.', tipo:'warn'}
    ]},

  { icon:'📚', titulo:'Readers and reading checks', busca:'reader reading book chapter check exam read along',
    sub:'The graded readers with activities by chapter, and the reading check for each one.',
    cuerpo:[
      'Go to <b>Classes → your grade → Readers</b>. Each book is read <b>at your level</b>: when you open it you choose A2, B1, B2 or C1, and the text changes in difficulty, not just in length.',
      {h:'Read along'},
      'This is the reading screen with audio. The time you spend there is recorded and your teacher can see it: it does not give a grade, but it is proof that you have read.',
      {h:'The chapter check'},
      {lista:[
        'You get to it from the <b>📝 EXAMS</b> card in the book’s level selector.',
        'Your teacher <b>opens and closes it</b>. If it is not open, you cannot take it.',
        'While a chapter’s check is open, <b>that chapter is closed in the reading</b>, and in every level of the book. When the check closes, the reading reopens on its own.'
      ]},
      {h:'📊 My reading report'},
      'In Readers you have your report: the grade for each chapter, your reading time, and your overall grade. The chapter grade is from your <b>best attempt</b>.'
    ]},

  { icon:'📋', titulo:'Unit exams', busca:'exam unit practice official writing listening',
    sub:'Your unit’s exam with its reader, at your level, in a practice version and an official version.',
    cuerpo:[
      'You get to it from <b>Classes → your grade → 📋 Unit Exams</b>. The first thing you see is a card for each <b>block of units</b> (1 and 2, 3 and 4, 5 and 6). Blocks that do not have an exam yet appear greyed out.',
      {lista:[
        '<b>Practice</b> — to train. You can take it once your teacher opens it.',
        '<b>Official</b> — the one that counts. It only opens on the day it is scheduled.'
      ]},
      'It has seven parts: multiple choice, true/false, word formation, key word transformations, word order, listening and writing. The first six give you the grade instantly on the AD·A·B·C scale.',
      {nota:'<b>Writing is not marked automatically</b>: your teacher reads and grades it, and their comment reaches you.'},
      {nota:'If the exam is not open for you, its content does not appear. It is not a page fault: your teacher simply has not opened it yet.', tipo:'warn'}
    ]},

  { icon:'📊', titulo:'My progress and my final result', busca:'progress grades results history cefr level final report parents',
    cuerpo:[
      {h:'📊 My Progress (on the bar)'},
      'All your exams and practice: what you took, when, with what score, and which parts you were stronger or weaker in.',
      {h:'🏅 Final result (English → My results)'},
      'Your final CEFR level for the year and the report your family receives, with its PDF to download.'
    ]},

  { icon:'👤', titulo:'My account and my password', busca:'password change account security',
    cuerpo:[
      {pasos:[
        'Go to <b>👤 My account</b>.',
        'Type the new password twice (at least 8 characters).',
        'Tap <b>Save new password</b>. The change is immediate.'
      ]},
      {nota:'Choose a short phrase you will remember, with letters and numbers. <b>Do not share your password with anyone</b>, not even a classmate: whatever is done with your account is recorded under your name.', tipo:'warn'}
    ]},

  { icon:'🔒', titulo:'Why I cannot see something a classmate has', busca:'lock locked cannot see missing does not appear',
    cuerpo:[
      'When a card shows a <b>🔒 lock</b>, it exists but is not yet open for your grade or for you. It stays locked for three different reasons:',
      {lista:[
        'Your teacher <b>has not activated it yet</b> (this is the most common reason: material opens once the class gets there).',
        'The activity belongs to <b>another grade</b> or another level.',
        'It is an <b>exam</b>, and exams only open during their window.'
      ]},
      'If you think it should be open, tell your teacher: they can open it from their panel right away.'
    ]},

  { icon:'🆘', titulo:'If something is not working', busca:'problem error fault will not load will not save slow help support',
    cuerpo:[
      {tabla:{cols:['What you see','What to do'],filas:[
        ['The page looks like it did before the update','Press <kbd>Ctrl</kbd>+<kbd>F5</kbd> (on Mac <kbd>Cmd</kbd>+<kbd>Shift</kbd>+<kbd>R</kbd>) so the browser fetches the new version.'],
        ['“Your session expired” when reloading','Close all the portal tabs, open just one, and sign in again.'],
        ['My work is not saving','Check that your name shows at the top. Without a session, the activity only saves on that computer and the bar tells you so.'],
        ['I cannot open an exam','It is closed. Only your teacher can open it.'],
        ['The audio does not play','Turn up the computer’s volume and try headphones. If it still does not play, tell your teacher: they can give you the paper sheet.'],
        ['None of the above','Write to your teacher or to <b>pbaca@nordic-school.edu.pe</b> telling them which screen you were on.']
      ]}}
    ]}
]},

/* ──────────────────────────── PROFESOR ──────────────────────────── */
teacher: { secciones: [

  { icon:'🧭', titulo:'Your panel, group by group', busca:'menu groups sidebar panel where is navigation',
    sub:'The bar is organized into groups that collapse. The criterion is what you are going to DO, not what each thing is.',
    cuerpo:[
      {tabla:{cols:['Group','What it is for','What is inside'],filas:[
        ['👥 Students','On its own at the top: it is where you go in almost every time.','Your students, their profile and their progress.'],
        ['✅ Marking','Whatever is waiting for a grade from you, or needs opening so it can be submitted.','Unit products · Mark worksheets · Unit exams · Reading checks · Fun for Nordic'],
        ['📈 Monitoring','Only for viewing. Nothing gets changed here.','Results · Final result · Screen time · Honesty'],
        ['🏫 Classes','Teaching: the subject, the sequence, the material and your tools.','Classes · French · Scope &amp; Sequence · Class materials · Little Readers · Whiteboard · Material checker'],
        ['🧸 Nordic courses','The school’s own courses.','Starters · Movers · Flyers · Cap sur le français'],
        ['🎓 Cambridge','The official exam: its apps and the lock that opens practice.','YLE + Main Suite · YLE panel · Mocks and Practice · Use of English · Cambridge info · Open Practice Tests'],
        ['🎮 Activities','What your students use, so you can see it before assigning it.','Games Lab · NIShoot Live · MUN Academy · Phonics · Pronunciation'],
        ['🔐 Permissions','What you open and close by grade.','Activate units · Units by grade']
      ]}},
      {nota:'<b>You only see the groups you have access to.</b> A group with no tabs does not appear. If something you need is missing, ask coordination: access is granted by the administrator.'},
      {nota:'The group with the currently open tab expands on its own; the rest stay as you left them last time. If you cannot find a tab, <b>open the headers</b>: they start collapsed.', tipo:'warn'}
    ]},

  { icon:'✅', titulo:'Marking: the five screens', busca:'mark grade rubric submissions worksheets products',
    sub:'Everything waiting for a grade from you is in this group, and nowhere else.',
    cuerpo:[
      {h:'🎯 Unit products'},
      'The final product for each unit. At the top is <b>progress by criterion</b> and below it the grade. This is also where you mark a piece of work to appear in the <b>unit gallery</b>, with a checkbox.',
      {h:'✅ Mark worksheets'},
      {pasos:[
        'Choose grade, unit, week and session.',
        'See who submitted and how many are still missing.',
        'When you open a student, their answers are on the left and the <b>rubric on the right</b>, with a button for each score.',
        'The grade adds up on its own. <b>Save and next</b> moves from one student to the next without going back to the list.'
      ]},
      {nota:'The rubric is set <b>once per session</b> and applies to all four levels: the criterion is the same, what changes is how demanding it is.'},
      {h:'📋 Unit exams'},
      'You get to it through a card for each <b>block of units</b> (1 and 2, 3 and 4, 5 and 6). Inside, a row per exam and another per level, with the 🔓/🔒 button to open and close. You can open it for everyone, for a grade, for a homeroom, or for one specific student: <b>the most specific scope always wins</b>.',
      {lista:[
        'The first six parts mark themselves, on the AD·A·B·C scale.',
        '<b>You grade the writing</b>: it appears in the written work queue.',
        'Each level has the <b>🖨️ Paper · 🔑 Key · 🎧 Script</b> buttons for giving the exam on paper. The key and the script are never served to a student account.'
      ]},
      {h:'📖 Reading checks'},
      'You open and close the check for each chapter of each reader. <b>While the check is open, that chapter is closed in the reading</b>, and in every level of the book, so no one can answer it while reading. When you close it, the reading reopens on its own.',
      'It has three tabs: grades by chapter, detail by student, and <b>reading time</b> by week. Students who have not read anything still show up, in grey: they are half the picture.',
      {h:'🧸 Fun for Nordic'},
      'The submissions for the three primary courses, with pills to filter by level (Starters, Movers, Flyers).'
    ]},

  { icon:'📈', titulo:'Monitoring: look without touching', busca:'results statistics screen time honesty cefr',
    cuerpo:[
      {lista:[
        '<b>📝 Results</b> — all your students’ attempts: mocks, practice and activities, with the breakdown by part.',
        '<b>🎓 Final result</b> — each student’s final CEFR level and the report for the family.',
        '<b>⏱️ Screen time</b> — minutes per student and week.',
        '<b>🛡️ Honesty</b> — the alerts from the anti-cheating system.'
      ]},
      {nota:'Screen time measures <b>logged</b> time: it is a floor, it does not count a page left open with no activity. Each session is capped at 120 minutes because some are left open. Both notes are written on the screen itself.'}
    ]},

  { icon:'🏫', titulo:'Classes: material and tools', busca:'materials worksheets slides upload scope sequence whiteboard checker',
    cuerpo:[
      {h:'📄 Class materials — uploading your worksheets'},
      {pasos:[
        'Go to <b>Classes → Class materials</b>.',
        'Drag the files in. <b>The path comes from the file name</b>: <code>u4w1s1-worksheet-a2.pdf</code> goes straight to Grade 9 / unit 4 / week 1.',
        'A whole unit fits in one go.'
      ]},
      {nota:'You can upload, but <b>only the administrator can delete</b>. If you uploaded something by mistake, tell coordination.', tipo:'warn'},
      {h:'📚 Scope &amp; Sequence'},
      'The official sequence for the year: which level each grade covers and in what order.',
      {h:'🧒 Little Readers'},
      'The books for the youngest students, for reference.',
      {h:'📝 Whiteboard and ✍️ Material checker'},
      'The whiteboard for explaining things in class, and the checker for reviewing material you prepare before handing it out.'
    ]},

  { icon:'🎓', titulo:'Cambridge', busca:'cambridge yle mocks practice info',
    cuerpo:[
      {lista:[
        '<b>🎓 YLE + Main Suite</b> — the map your students see: both tracks and their levels.',
        '<b>🛡️ YLE panel</b> — the tracking of the Young Learners exams for your grades.',
        '<b>🎧 Mocks and Practice</b> — opens the exams in Cambridge format (leaves the portal, to the mocks section).',
        '<b>🧩 Use of English</b> — the Part 1 app for B2 First.',
        '<b>📘 Cambridge info</b> — what each exam is, how many parts it has, how long it takes and how it is scored. For answering families.',
        '<b>🔓 Open Practice Tests</b> — the lock: which grade can take the practice tests.'
      ]},
      {nota:'Entries starting with <b>🔓 Open</b> are not the activity itself: they are the permission. They open or close access for a grade.'}
    ]},

  { icon:'🔐', titulo:'What you can open and close', busca:'permissions activate units open lock access grade',
    cuerpo:[
      {lista:[
        '<b>📚 Activate units</b> — which units each grade sees.',
        '<b>🔐 Units by grade</b> — which part of the Fun for Nordic courses each grade sees.',
        '<b>📋 Unit exams</b> and <b>📖 Reading checks</b> (under Marking) — open and close each exam.',
        '<b>🔓 Open Practice Tests</b> (under Cambridge).'
      ]},
      {nota:'These tabs only appear if you have grades assigned. If you do not see them, coordination has not assigned you any yet.', tipo:'warn'}
    ]},

  { icon:'❗', titulo:'What only the administrator can do', busca:'cannot permissions create user delete admin coordination',
    cuerpo:[
      {lista:[
        'Create, edit, suspend or delete student and teacher accounts.',
        'Grant access to another teacher.',
        'Delete material already uploaded to the class bucket.',
        'Open the Mocks (the official mock exams).',
        'View the school’s overall statistics.'
      ]},
      'All of that is requested from coordination: <b>pbaca@nordic-school.edu.pe</b>.'
    ]}
]},

/* ─────────────────────────── ADMINISTRADOR ─────────────────────────── */
admin: { secciones: [

  { icon:'🧭', titulo:'The panel, group by group', busca:'menu groups admin panel navigation where is',
    sub:'Nine groups and the Overview on its own at the top. Teachers see these same groups, with fewer tabs inside.',
    cuerpo:[
      {tabla:{cols:['Group','What is inside'],filas:[
        ['📊 Overview','The homepage: how many students, how many teachers, and recent activity.'],
        ['👥 People','Users · Teachers'],
        ['✅ Marking','Unit products · Mark worksheets · Unit exams · Reading checks · Fun for Nordic'],
        ['📈 Monitoring','Statistics · Results · Final result · Screen time · Honesty'],
        ['🏫 Classes','Classes · French · Scope &amp; Sequence · Class materials · Little Readers · Whiteboard · Material checker · Library'],
        ['🧸 Nordic courses','Starters · Movers · Flyers · Cap sur le français'],
        ['🎓 Cambridge','YLE + Main Suite · YLE panel · Study plan · Mocks and Practice · Use of English · Cambridge info · Open Mocks · Open Practice Tests'],
        ['🎮 Activities','Games Lab · NIShoot Live · MUN Academy · Phonics · Pronunciation'],
        ['🔐 Permissions','Access · Activate units · Units by grade']
      ]}},
      {nota:'The criterion behind the layout: <b>Marking</b> is whatever waits for a grade or needs opening so it can be submitted; <b>Monitoring</b> is for viewing only; <b>Permissions</b> is what gets opened and closed by grade.'}
    ]},

  { icon:'👥', titulo:'People: creating accounts and granting access', busca:'user create student teacher password demo suspend delete',
    cuerpo:[
      {h:'👥 Users'},
      '<b>Everyone</b> is here: students, teachers, administrators and demo accounts. The filters are a row of buttons with the count for each type (All · Students · Teachers · Admins · Demos) plus grade, section and academic year.',
      {tabla:{cols:['Row button','What it does'],filas:[
        ['👁️ View as','Opens the portal <b>exactly as that student sees it</b>, with their locks. A bar at the top reminds you who is really signed in.'],
        ['🔧 Access','Opens or closes activities <b>for that specific student</b>, on top of whatever their grade has.'],
        ['🔑 Reset','Assigns a new temporary password. This is what you do when a student cannot sign in.'],
        ['Edit','Name, grade, section, CEFR level and the 🧪 <b>demo</b> checkbox.'],
        ['Delete','Deletes the account. There is no going back.']
      ]}},
      {nota:'<b>“Demo” is not a role.</b> The roles are still student, teacher and administrator; demo is a separate checkbox for test accounts. Check it in Edit, after creating the account.'},
      {nota:'In <b>View as</b> you cannot change the student’s password: that is deliberate. That is what 🔑 Reset is for.', tipo:'warn'},
      {h:'👨‍🏫 Teachers'},
      'This is where you decide what each teacher sees: <b>Results</b>, <b>Students</b>, and the grades assigned to them. A teacher with nothing assigned signs in to the portal and only reads “The administrator has not assigned you any access yet.”',
      {nota:'When you create a new tab or a new grade, <b>teachers already set up do not receive it automatically</b>: you have to assign it to them.', tipo:'warn'}
    ]},

  { icon:'🔐', titulo:'How access works', busca:'access nodes lock grade student permissions matrix open close',
    sub:'Three levels, and the most specific always wins.',
    cuerpo:[
      {tabla:{cols:['Level','Where you change it','What it is for'],filas:[
        ['By grade','🔐 Permissions → 🔐 Access','The grade × activity matrix. This is the normal level: an activity is opened for a whole grade.'],
        ['By student','👥 Users → 🔧 Access','Opens or closes something for a single person, on top of their grade.'],
        ['By exam','✅ Marking → Unit exams / Reading checks','Exam windows, with scope everyone → grade → homeroom → student.']
      ]}},
      {lista:[
        '<b>No row = closed</b> for exams. If no one opened it, no one can take it.',
        'Whatever already existed starts out <b>open</b>; anything newly added starts out <b>closed</b> until it is enabled.',
        'The administrator always sees everything, even when it is closed: it is the preview.'
      ]},
      {h:'The other two doors'},
      {lista:[
        '<b>📚 Activate units</b> — which units each grade offers.',
        '<b>🔐 Units by grade</b> — which part of the Fun for Nordic courses each grade sees.'
      ]}
    ]},

  { icon:'📈', titulo:'Monitoring and statistics', busca:'statistics results projection december screen time honesty',
    cuerpo:[
      {lista:[
        '<b>📈 Statistics</b> — the school’s progress with its chart and the projection to December.',
        '<b>📝 Results</b> — every attempt, filterable by grade, section and year.',
        '<b>🎓 Final result</b> — the final CEFR level and the reports for families.',
        '<b>⏱️ Screen time</b> — the data-backed answer to how much time students spend on the tablet.',
        '<b>🛡️ Honesty</b> — the alerts from the anti-cheating system.'
      ]},
      {nota:'The counts on the Overview <b>include demo accounts</b>. To count real students, filter in Users.', tipo:'warn'}
    ]},

  { icon:'🎓', titulo:'Cambridge and the study plan', busca:'cambridge mocks practice yle study plan exam date',
    cuerpo:[
      {lista:[
        '<b>🎓 YLE + Main Suite</b> — the map students and teachers see.',
        '<b>🛡️ YLE panel</b> — the Young Learners tracking for all grades.',
        '<b>📋 Study plan</b> — the official exam date and the instructions that appear on the student’s Cambridge screen, by grade or by student.',
        '<b>🎧 Mocks and Practice</b> — the mocks section (leaves the portal).',
        '<b>🔓 Open Mocks</b> and <b>🔓 Open Practice Tests</b> — the two locks.'
      ]},
      {nota:'Whatever you write in the study plan is read by the student on their Cambridge screen, right at the top. It is the place to announce a date or give a term-long instruction.'}
    ]},

  { icon:'🧪', titulo:'Checking a change before announcing it', busca:'test verify demo trial student preview cache',
    cuerpo:[
      {pasos:[
        'Use a <b>demo account</b>, never the first student row you find: whatever you do stays on their record.',
        'Or go through <b>👥 Users → 👁️ View as</b>, which does not write anything.',
        'If the screen looks like it did before, press <kbd>Ctrl</kbd>+<kbd>F5</kbd>: the browser has saved the previous version.'
      ]},
      {nota:'Mark test accounts with the 🧪 <b>demo</b> checkbox in Edit. That way they stand out from real ones in any listing.'}
    ]},

  { icon:'🆘', titulo:'The most frequently asked questions', busca:'problem frequent cannot sign in cannot see error support question',
    cuerpo:[
      {tabla:{cols:['The case','The answer'],filas:[
        ['“A student cannot sign in”','👥 Users → search their name → 🔑 Reset. Also check that the account is not suspended.'],
        ['“A teacher cannot see anything”','👨‍🏫 Teachers: they have no Results or Students assigned, or no grades.'],
        ['“My students cannot see the activity”','🔐 Access: that activity is closed for their grade. New items start out closed.'],
        ['“The exam does not appear for them”','With no opening row, the exam is closed. Open it in ✅ Marking → Unit exams.'],
        ['“It shows yesterday’s version”','<kbd>Ctrl</kbd>+<kbd>F5</kbd> on that page.'],
        ['“How many students are there really?”','The Overview includes demo accounts. Filter in 👥 Users.']
      ]}}
    ]}
]}

};
