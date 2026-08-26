window.ATTWN_DATA = (function(){
const CHAPTERS = [
  { n:1, title:"Two Boys in London",
    sum:"On the same day in 1537 two boys are born in London: Tom Canty, in a poor room in Offal Court, and Edward Tudor, the son of King Henry VIII. Tom begs in the streets and his father hits him, but old Father Andrew teaches him to read and tells him stories about kings.",
    vocab:[
      ["PAUPER","a very poor person with no money"],
      ["BEG","to ask people in the street for money or food"],
      ["PRINCE","the son of a king or a queen"],
      ["PALACE","the big beautiful house of a king"],
      ["PRIEST","a man who works in a church"],
      ["BANQUET","a big dinner with a lot of important people"],
      ["FIREWORKS","lights and noise in the sky at a party"],
      ["HEIR","the person who will be king after the old king"],
      ["STREET","a road in a town with houses on both sides"],
      ["DIRTY","not clean"],
      ["HUNGRY","when you want to eat"],
      ["DREAM","to see pictures in your head when you sleep"]
    ],
    comp:[
      ["When were Tom Canty and Edward Tudor born?",["On different days","On the same day","In different years","Nobody knows"],1,"Both boys were born in London on the same day in 1537."],
      ["Where did Tom’s family live?",["In Westminster Palace","In a big house","In a small room in Offal Court","In a barn"],2,"The Canty family lived in one small room in Offal Court, near Pudding Lane."],
      ["Why was Tom’s father not happy when Tom was born?",["Because he wanted a girl","Because he had no money for another child","Because he was ill","Because he was at work"],1,"John Canty said, “Now we have another child and we don’t have any money!”"],
      ["Who was Edward’s father?",["Father Andrew","John Canty","King Henry VIII","Miles Hendon"],2,"Edward Tudor was the son of Henry VIII, King of England."],
      ["What did John Canty tell Tom to do every day?",["Go to school","Go out and beg","Work in the palace","Clean the house"],1,"John Canty never worked. He said, “Go out and beg, and bring home lots of money.”"],
      ["What happened when Tom came home with no money?",["His father gave him food","His father hit him","His mother was angry","Nothing"],1,"When Tom didn’t bring money home, John Canty hit him and Tom cried."],
      ["Who taught Tom to read and write?",["His mother","Father Andrew","Prince Edward","His sisters"],1,"Father Andrew was a kind old priest who lived nearby and taught Tom."],
      ["What did Tom dream about at night?",["Food","Castles, knights and princes","The sea","His father"],1,"Tom read Father Andrew’s books and dreamed about castles, knights, princes and their adventures."]
    ],
    tf:[
      ["Tom Canty was born in a rich family.",false,"Tom was born to a family of paupers in Offal Court."],
      ["Edward Tudor was born on the same day as Tom.",true,"Two boys were born on the same day in London in 1537."],
      ["All England was happy when the prince was born.",true,"King Henry wanted a son, so there was a big banquet and fireworks."],
      ["Tom’s family had a big house near the river.",false,"They lived in one small room near Pudding Lane."],
      ["Father Andrew was Tom’s friend.",true,"He was a kind old priest who taught Tom to read and write."],
      ["Tom wanted to be poor forever.",false,"Tom said, “I don’t want to be poor forever. I want to learn to read and write.”"]
    ],
    rw:[
      ["At the age of ten, Tom Canty was a beggar.",0,"Right — at ten Tom was already begging on the streets of London."],
      ["Tom Canty had three older sisters.",1,"Wrong — he had two sisters, Bet and Nan."],
      ["Tom’s family lived near the River Thames.",0,"Right — Offal Court and Pudding Lane were a poor neighbourhood near the Thames."],
      ["Father Andrew was seventy-five years old.",2,"Doesn’t say — we only know that he was old and kind."],
      ["Edward liked reading books about knights and castles.",2,"Doesn’t say — it is Tom who reads those books, with Father Andrew."],
      ["King Henry VIII had two daughters before Edward was born.",0,"Right — Mary and Elizabeth, from two different marriages."],
      ["The children of the Canty family slept on the cold floor.",0,"Right — they slept on the floor and they were always hungry."],
      ["Tom learned to read in one week.",2,"Doesn’t say — the text says he learned quickly, but not how long it took."]
    ],
    halves:[
      ["Tom Canty was born","in a poor family in Offal Court."],
      ["Edward Tudor was born","at Westminster Palace, the son of the king."],
      ["John Canty never worked,","so he sent Tom out to beg."],
      ["When Tom brought no money home,","his father hit him."],
      ["Father Andrew was a kind old priest","who taught Tom to read and write."],
      ["Tom read books about kings and knights","and dreamed about them at night."],
      ["Tom’s friends laughed at him","and called him ‘Prince Tom’."],
      ["Father Andrew said, “Go to Westminster Palace","and perhaps you can see the real prince.”"]
    ],
    odd:[
      [["father","mother","sister","priest"],3,"A priest is not a member of the family."],
      [["palace","castle","room","street"],3,"A street is not a building."],
      [["hungry","thirsty","tired","dirty"],3,"Dirty is not a feeling of the body."],
      [["king","prince","queen","beggar"],3,"A beggar is not a member of a royal family."],
      [["read","write","learn","beg"],3,"Beg is not something you do at school."]
    ],
    gaps:{ title:"Past simple", bank:["was","lived","taught","hit","wanted","dreamed"],
      items:[
        ["Tom Canty ___ born in London in 1537.","was"],
        ["The Canty family ___ in one small room.","lived"],
        ["Father Andrew ___ Tom to read and write.","taught"],
        ["John Canty ___ Tom when he brought no money home.","hit"],
        ["Tom ___ to learn and to know about the world.","wanted"],
        ["At night he ___ about castles and princes.","dreamed"]
      ]},
    think:{ quote:"Tom thought, “I don’t want to be poor forever. I want to learn to read and write. I want to know about the world.”",
      question:"Tom wants to improve and become a better person — he is <b>ambitious</b>. Why do you think it is important to learn to read and write, and know about the world?",
      options:["To become rich","To better understand people and our world","To help others","To find a good job","To become an important person"],
      answer:null,
      note:"There is no single right answer here. Tom’s reason is the second one: he wants to understand a world that nobody has explained to him."},
    writing:[
      {task:"Imagine you are Tom Canty. Write about one day of your life in Offal Court.",target:"30–50 words",
       tips:["Use past simple: woke up, walked, asked, came home","Say what you did in the street","Say how you felt at the end of the day"],
       starters:["I woke up early on the cold floor and…","In the street I asked people for…","Some people were kind, but others…","When I came home with no money, my father…"]},
      {task:"Write about Father Andrew. Who is he and why is he important for Tom?",target:"30–50 words",
       tips:["Say where he lives and what his job is","Say what he teaches Tom","Say why the lessons change Tom’s life"],
       starters:["Father Andrew is an old priest who…","Every morning Tom goes to his room to…","Thanks to him, Tom can…","Without Father Andrew, Tom would never…"]}
    ]},

  { n:2, title:"An Exciting Game",
    sum:"Tom goes to Westminster Palace to see the prince. A soldier hits him, but Prince Edward opens the gate and invites him in. The two boys talk, eat and look in a mirror: they have the same face. They change clothes for a game — and then Edward runs out into the street.",
    vocab:[
      ["GATE","the big door in a wall around a house or a garden"],
      ["SOLDIER","a person in the army of a king"],
      ["SERVANT","a person who works in the house of a rich family"],
      ["MIRROR","the glass where you can see your face"],
      ["ARMOUR","the metal clothes a knight wears in a battle"],
      ["MUD","a mix of water and earth"],
      ["BORED","not interested; when there is nothing fun to do"],
      ["SAME","not different"],
      ["CHANGE","to put something new in the place of something old"],
      ["SEAL","the special stamp the king uses on documents"],
      ["THIN","not fat"],
      ["COUSIN","the child of your uncle or your aunt"]
    ],
    comp:[
      ["Why did Tom go to Westminster Palace?",["To beg for money","To see Prince Edward","To find his father","To work there"],1,"Father Andrew gave him the idea, and Tom wanted to see the real prince."],
      ["What did the soldier do when Tom ran to the gate?",["He opened the gate","He hit Tom on the head","He gave him money","He called the king"],1,"A soldier hit Tom on the head, and the young prince saw it and got angry."],
      ["What did Prince Edward say to the soldiers?",["“Take him away!”","“Open the gates and let him come in.”","“Hit him again.”","“Call my father.”"],1,"Edward said his father was the king of rich people and poor people, too."],
      ["What did the servant bring for Tom?",["Only bread","Meat, cheese, fruit, cakes and milk","Nothing","Water"],1,"It was the first time Tom saw so much good food, and he ate quickly."],
      ["How many rooms did Edward have?",["One","Two","Five","Hundreds"],2,"Edward had five rooms — and there were hundreds of rooms in the palace."],
      ["What did the boys see in the mirror?",["Two different boys","Two boys with the same face","Nothing","The king"],1,"They were both thin, with brown hair and brown eyes, and the same height."],
      ["Whose idea was it to change clothes?",["Tom’s","Edward’s","Father Andrew’s","The servant’s"],1,"Edward said, “We can play a wonderful game! Let’s change clothes.”"],
      ["What did Edward hide before he ran out of the room?",["A book","Something big and round, inside an old suit of armour","Money","A sword"],1,"It was the Great Seal of England — but nobody knew that yet."]
    ],
    tf:[
      ["Two soldiers stood outside the palace gate.",true,"Tom saw two tall soldiers by the gate of Westminster Palace."],
      ["Prince Edward was angry with the soldier.",true,"He told the soldier to remember that his father was king of poor people too."],
      ["Tom was not hungry at the palace.",false,"He ate and drank quickly because he was hungry and thirsty."],
      ["Edward had two sisters and one cousin in the story.",true,"Lady Elizabeth and Lady Mary were his sisters, and Lady Jane Grey his cousin."],
      ["Edward often played in the street with other boys.",false,"He said, “I never play with other boys.” He was bored with life at the palace."],
      ["After the change of clothes, the boys looked different.",false,"They looked at each other in the mirror and laughed: now Tom was Edward and Edward was Tom."]
    ],
    rw:[
      ["Two soldiers stood outside Westminster Palace.",0,"Right — Tom saw two tall soldiers by the gate."],
      ["A soldier hit Tom on the head.",0,"Right — and the prince saw it from inside the gate."],
      ["The servants brought Tom a big mirror.",1,"Wrong — the servants brought food. The mirror was already in the room."],
      ["Prince Edward’s sisters were Lady Elizabeth and Lady Mary.",0,"Right — Lady Jane Grey was his cousin, not his sister."],
      ["Lady Elizabeth was fourteen years old.",0,"Right — Edward says she is 14 and friendly."],
      ["Edward could swim very well.",1,"Wrong — he wanted to swim in the river but he had never done it."],
      ["Tom’s mother knew that he had gone to the palace.",2,"Doesn’t say — the story never tells us."],
      ["Edward wanted to be a pauper for a short time.",0,"Right — he said, “Now I’m a pauper and I can play in the streets.”"]
    ],
    halves:[
      ["Tom went to Westminster Palace","because he wanted to see the prince."],
      ["A soldier hit Tom on the head,","and Prince Edward got angry."],
      ["Edward told the soldiers","to open the gate and let Tom come in."],
      ["The servant brought meat, cheese and cakes,","and Tom ate quickly because he was hungry."],
      ["Tom said that his room was small","and that Edward’s room was more beautiful."],
      ["The two boys looked in the mirror","and saw that they had the same face."],
      ["They changed clothes","and played at being each other."],
      ["Before he ran out, Edward hid the Great Seal","inside an old suit of armour."]
    ],
    odd:[
      [["gate","door","window","mirror"],3,"A mirror is not a way in or out of a building."],
      [["meat","cheese","fruit","milk"],3,"Milk is a drink, the others are food."],
      [["soldier","servant","priest","palace"],3,"A palace is a place, not a person."],
      [["thin","tall","brown","short"],2,"Brown is a colour, the others describe a body."],
      [["laugh","smile","cry","play"],2,"Cry is the only sad one."]
    ],
    gaps:{ title:"Comparatives", bank:["bigger","more beautiful","kinder","poorer","happier","taller"],
      items:[
        ["Edward’s room was ___ than Tom’s room.","bigger"],
        ["“Your room is ___ than mine,” said Tom.","more beautiful"],
        ["Lady Elizabeth was ___ than Lady Mary.","kinder"],
        ["Tom’s family was ___ than the king’s family.","poorer"],
        ["The soldiers were ___ than the two boys.","taller"],
        ["Edward was ___ in the street than in the palace.","happier"]
      ]},
    think:{ quote:"“Remember, my father is the king of rich people and poor people, too.”",
      question:"The soldiers hit Tom and are unkind to him. Prince Edward tells them that his father is the King of rich people <i>and</i> poor people. The King wants <b>equality</b> in his kingdom — which means that all people are the same to the King. Choose one example of equality.",
      options:["The king talks to rich people and to poor people every day.","Rich people and poor people are equally important.","The king knows all the rich people and all the poor people in his kingdom."],
      answer:1,
      note:"Equality is not about knowing everybody or talking to everybody: it is about people counting the same."},
    writing:[
      {task:"Imagine you are Tom. Write about your first hour inside Westminster Palace.",target:"30–50 words",
       tips:["Say what you saw when you walked in","Say what you ate and how you felt","Use past simple"],
       starters:["When the soldiers opened the gate, I…","Inside the palace I saw…","The servant brought…","I couldn’t believe that…"]},
      {task:"Why do you think Edward wants to change clothes with Tom? Explain his reasons.",target:"30–50 words",
       tips:["Think about what Edward can’t do in the palace","Use the word bored","Say what he wants to try"],
       starters:["Edward wants to change clothes because…","In the palace he can never…","He would like to…","For him it is only a game, but…"]}
    ]},

  { n:3, title:"Lost in London",
    sum:"Outside the palace nobody believes Edward. The soldiers push him away, a crowd laughs at him and dogs run after him. Then a tall soldier called Miles Hendon draws his sword and defends him. But John Canty finds the boy and takes him away, because he thinks Edward is his son Tom.",
    vocab:[
      ["CROWD","a lot of people together in one place"],
      ["SHOUT","to speak in a very loud voice"],
      ["LAUGH","to make a happy noise with your mouth"],
      ["SWORD","a long knife that soldiers used in battles"],
      ["DEFEND","to protect somebody from danger"],
      ["MAD","ill in the head; crazy"],
      ["STICK","a long thin piece of wood"],
      ["LOST","when you don’t know where you are"],
      ["RAGS","very old, dirty, broken clothes"],
      ["THIEF","a person who takes things that are not his"],
      ["BRAVE","not afraid of danger"],
      ["INN","a small hotel where you can eat and sleep"]
    ],
    comp:[
      ["What happened when Edward ran out of the palace?",["The soldiers called him ‘Your Majesty’","The soldiers pushed him away","His father came","Nothing happened"],1,"In Tom’s dirty clothes he was only a beggar to them."],
      ["What did the people in the street do?",["They helped him","They laughed at him","They gave him food","They took him home"],1,"He said he was the Prince of Wales, and the crowd laughed and shouted at him."],
      ["Who defended Edward in front of the crowd?",["John Canty","Father Andrew","Miles Hendon","A soldier of the palace"],2,"Miles Hendon, a soldier back from the war, drew his sword."],
      ["Did Miles believe that the boy was the prince?",["Yes, immediately","No, he thought the boy was ill","Yes, because of his clothes","He never spoke to him"],1,"Miles thought the boy was mad — but he decided to help him anyway."],
      ["Where did Miles take the boy?",["To the palace","To a small inn","To the river","To Hendon Hall"],1,"He took him to an inn to give him food and a warm bed."],
      ["Who was John Canty looking for?",["The prince","His son Tom","Miles Hendon","Father Andrew"],1,"He found Edward and was sure that the boy was his son."],
      ["What did John Canty have in his hand?",["A sword","A big stick","A bag of money","Nothing"],1,"He came out of the dark with a big stick and took the boy away."],
      ["How did Edward feel in the streets of London?",["Happy and free","Cold, hungry and frightened","Bored","Rich"],1,"Nobody believed him, he had no food and he did not know where to go."]
    ],
    tf:[
      ["The soldiers of the palace believed Edward’s story.",false,"They saw only a dirty beggar boy and pushed him away."],
      ["Edward stopped saying that he was the king.",false,"He said it again and again, and that is why people laughed."],
      ["Miles Hendon was a soldier who came back from the war.",true,"He had been away for years and had just returned to England."],
      ["Miles used his sword to defend Edward.",true,"He stood in front of the boy and drew his sword against the crowd."],
      ["John Canty thought the boy was the real prince.",false,"He thought the boy was his son Tom, and that he was mad."],
      ["Edward went back to the palace at the end of the chapter.",false,"John Canty took him away from London."]
    ],
    rw:[
      ["Miles Hendon and Edward ran away from the crowd.",0,"Right — they left the crowd and went to an inn."],
      ["There were people in the street who were shouting “Long live King Edward!”",1,"Wrong — the crowd was laughing at him, not cheering."],
      ["Edward was very sad because he was cold and hungry.",0,"Right — he had no food, no warm clothes and nowhere to go."],
      ["Miles went to the market to buy new clothes for Edward.",2,"Doesn’t say in this chapter — he takes him to the inn first."],
      ["John Canty took Edward to an old barn where there were beggars and thieves.",0,"Right — that is where the Canty family and their friends slept."],
      ["The beggars at the old barn were friendly.",1,"Wrong — they laughed at the boy and called him ‘the mad king’."],
      ["Miles believed that Edward was the real prince.",1,"Wrong — he thought the boy’s mind was ill, but he helped him."],
      ["Edward was happy because he had new clothes to wear.",2,"Doesn’t say — in this chapter he is still in Tom’s rags."]
    ],
    halves:[
      ["The soldiers pushed Edward away","because he was wearing a beggar’s clothes."],
      ["The crowd laughed at the boy","every time he said he was the prince."],
      ["Miles Hendon drew his sword","and stood in front of the little king."],
      ["Miles took the boy to an inn","and gave him food and a warm bed."],
      ["Miles thought the boy was mad,","but he promised to stay with him."],
      ["John Canty came out of the dark","with a big stick in his hand."],
      ["John Canty was sure","that the boy was his son Tom."],
      ["At the end of the chapter Edward","was taken away from London."]
    ],
    odd:[
      [["shout","laugh","speak","walk"],3,"Walk is the only one you don’t do with your mouth."],
      [["sword","stick","knife","bread"],3,"Bread is not something you fight with."],
      [["crowd","people","family","street"],3,"A street is a place, not a group of people."],
      [["brave","kind","cruel","friendly"],2,"Cruel is the only negative adjective."],
      [["inn","hotel","barn","room"],2,"You don’t normally sleep in a barn; farmers keep animals there."]
    ],
    gaps:{ title:"Adverbs of manner", bank:["angrily","quickly","loudly","carefully","sadly","bravely"],
      items:[
        ["Edward ran down the dark streets ___ because he was afraid.","quickly"],
        ["The crowd laughed ___ at the boy in rags.","loudly"],
        ["“There’s no dinner for you tonight!” said John Canty ___.","angrily"],
        ["Miles looked at the boy ___ and decided to help him.","carefully"],
        ["“Nobody believes me,” said the little king ___.","sadly"],
        ["Miles defended the boy ___ in front of the whole crowd.","bravely"]
      ]},
    think:{ quote:"Miles Hendon did not believe the boy’s story — and he defended him anyway.",
      question:"Miles thinks the boy is ill, but he still draws his sword for him. Which sentence describes best what Miles does?",
      options:["He helps somebody because he will get money for it.","He helps somebody who cannot defend himself, even if he doesn’t understand him.","He helps somebody because he is afraid of the crowd."],
      answer:1,
      note:"That is why the little king trusts him later: Miles helped before he had any reason to."},
    writing:[
      {task:"Imagine you are Edward. Write about your first night outside the palace.",target:"30–50 words",
       tips:["Say what the people in the street did","Say how you felt: cold, hungry, angry","Finish with Miles Hendon"],
       starters:["I told them who I was, but they…","The streets were cold and…","Nobody believed me until…","Then a tall soldier…"]},
      {task:"Write about Miles Hendon. What kind of person is he?",target:"30–50 words",
       tips:["Say where he comes from","Say what he does when he sees the crowd","Say what he really thinks about the boy"],
       starters:["Miles Hendon is a soldier who…","When he sees the crowd, he…","He doesn’t believe that…","In my opinion, he is…"]}
    ]},

  { n:4, title:"The Royal Banquet",
    sum:"At the palace everybody believes Tom is the prince. He goes to the royal banquet at the Guildhall, drinks from the finger bowl and does everything wrong — but nobody says a word. Then he meets King Henry VIII, who cannot find the Great Seal. That night the old king dies, and Tom is king.",
    vocab:[
      ["CROWN","the gold hat of a king or a queen"],
      ["NOBLE","a very important person who works near the king"],
      ["MANNERS","the polite way you behave at table or with people"],
      ["FINGER BOWL","a small bowl of water for washing your fingers at table"],
      ["ILL","not well; sick"],
      ["FORGET","to not remember"],
      ["DOCUMENT","an important paper with information on it"],
      ["MERCY","being kind to somebody you could punish"],
      ["WORRIED","not calm, because you think something bad can happen"],
      ["ROYAL","of the king or the queen"],
      ["NUTS","hard brown fruit that you must break to eat"],
      ["DEAD","not alive"]
    ],
    comp:[
      ["Who did everybody at the palace think Tom was?",["A servant","A thief","Prince Edward","Miles Hendon"],2,"He was wearing the prince’s clothes, and nobody looked at his face."],
      ["Where was the royal banquet?",["At Westminster Palace","At the Guildhall in London","At Hendon Hall","In Offal Court"],1,"The banquet in honour of King Henry VIII was at the Guildhall."],
      ["What did Tom do with the finger bowl?",["He washed his fingers","He drank from it","He gave it to a servant","He broke it"],1,"It was water for washing his fingers, but Tom drank it. Nobody said anything."],
      ["Why did nobody correct Tom’s mistakes?",["Because they didn’t see them","Because you don’t correct a prince","Because they were his friends","Because he was ill"],1,"Everybody believed he was the prince, and nobody corrects a prince."],
      ["What was King Henry looking for?",["His crown","His son","The Great Seal","A doctor"],2,"He needed the Great Seal for an important document, and nobody could find it."],
      ["What did Tom say when the king asked about the Seal?",["He knew where it was","He said he could not remember","He said his father had it","He said nothing at all"],1,"Tom didn’t know what the Seal was, so he said he couldn’t remember."],
      ["How did King Henry treat his son in this chapter?",["He was very angry with him","He was kind and worried about him","He sent him away","He didn’t speak to him"],1,"The old king was frightening to everybody else, but gentle with his son."],
      ["What happened at the end of the chapter?",["Tom went home","King Henry died","Edward came back","The Seal was found"],1,"The old king died, and the whole country changed in one afternoon."]
    ],
    tf:[
      ["Tom went to the royal banquet dressed as the prince.",true,"Everyone at the Guildhall believed he was Prince Edward."],
      ["Tom had perfect table manners.",false,"He drank from the finger bowl and ate with his fingers."],
      ["Somebody at the banquet told Tom that he was doing it wrong.",false,"Nobody said a word, because nobody corrects a prince."],
      ["King Henry VIII was young and healthy.",false,"He was old and ill, and he died at the end of the chapter."],
      ["Tom knew where the Great Seal was.",false,"He had never seen it and did not know what it was."],
      ["When the old king died, Tom became king.",true,"Everybody thought he was Edward, so he was the new king."]
    ],
    rw:[
      ["At seven o’clock in the evening the royal barge moved down the River Thames.",0,"Right — that is how the court travelled to the Guildhall."],
      ["The royal banquet was at the Guildhall.",0,"Right — the invitation says the Guildhall in London."],
      ["A big crowd of people killed Father Andrew.",2,"Doesn’t say — Father Andrew is not in this chapter."],
      ["At the royal banquet Tom sat next to King Henry at a big table.",1,"Wrong — King Henry was ill at the palace and did not go to the banquet."],
      ["There were one hundred important people at the royal banquet.",2,"Doesn’t say — we know there were many, but not the exact number."],
      ["Lord Hertford told everyone at the Guildhall that King Henry was dead.",0,"Right — and the people shouted for the new king."],
      ["King Henry VIII was worried because he could not find the Great Seal.",0,"Right — he needed it for an important document."],
      ["Tom asked the king for mercy for a man he had never met.",0,"Right — it is his first act as a prince."]
    ],
    halves:[
      ["Everybody at the palace believed","that Tom was Prince Edward."],
      ["The royal banquet was held","at the Guildhall in London."],
      ["Tom drank the water of the finger bowl","because he didn’t know what it was for."],
      ["Nobody corrected his mistakes","because nobody corrects a prince."],
      ["King Henry VIII was old and ill","and he loved his son very much."],
      ["The king needed the Great Seal","for an important document."],
      ["Tom could not say where the Seal was","because he had never seen it."],
      ["When the old king died,","Tom Canty became King of England."]
    ],
    odd:[
      [["crown","seal","document","banquet"],3,"A banquet is an event, the others are things."],
      [["noble","lord","king","servant"],3,"A servant is not an important person at court."],
      [["ill","sick","tired","royal"],3,"Royal does not describe health."],
      [["meat","fish","chicken","cake"],3,"Cake is sweet; the others are the main course."],
      [["forget","remember","think","eat"],3,"Eat is not something you do with your mind."]
    ],
    gaps:{ title:"Prepositions", bank:["at","on","in","from","after","into"],
      items:[
        ["During the royal banquet Tom sat ___ a big table.","at"],
        ["The shops were closed because no one worked ___ Sunday.","on"],
        ["The royal banquet started ___ the evening.","in"],
        ["“This letter is ___ you, Your Majesty,” said Lord Hertford.","from"],
        ["Everyone was wet ___ the big storm.","after"],
        ["Edward put something big and round ___ a suit of armour.","into"]
      ]},
    think:{ quote:"Tom is frightened at the banquet — and he still asks the king for mercy for a man he has never met.",
      question:"Tom has no power, no education and no friends at court. Why do you think he asks for mercy anyway?",
      options:["Because he wants the nobles to like him.","Because he knows what it is to be poor and afraid.","Because the king told him to do it."],
      answer:1,
      note:"This is the first sign that a pauper might make a good king: he remembers."},
    writing:[
      {task:"Imagine you are a noble at the royal banquet. Write about the prince’s strange behaviour.",target:"30–50 words",
       tips:["Describe one or two mistakes he makes","Say what you and the others do about it","Use past simple"],
       starters:["Last night at the Guildhall I saw…","The prince took the finger bowl and…","Nobody said anything because…","I thought that perhaps he was…"]},
      {task:"Write about King Henry VIII in this chapter. Is he only a frightening king?",target:"30–50 words",
       tips:["Say how the other people behave with him","Say how he speaks to his son","Give your opinion"],
       starters:["King Henry VIII is old and ill, and…","Everybody at court is afraid of him because…","But when he speaks to his son, he…","In my opinion he is…"]}
    ]},

  { n:5, title:"Long Live King Edward!",
    sum:"Miles takes the little king to an inn, gives him food and a bed, and serves him at table. Edward makes him a knight and gives him the right to sit in the king’s presence. But when Miles goes out to buy clothes, John Canty takes the boy away again.",
    vocab:[
      ["KNIGHT","a soldier of the king with the title ‘Sir’"],
      ["PRESENCE","being in the same place as somebody important"],
      ["SERVE","to bring food and drink to somebody at table"],
      ["MARKET","the place in a town where people buy and sell things"],
      ["PROMISE","to say that you will surely do something"],
      ["TIRED","when you want to sleep or rest"],
      ["ASLEEP","sleeping"],
      ["STEAL","to take something that is not yours"],
      ["MESSAGE","words that one person sends to another"],
      ["TRUST","to believe that somebody will not hurt you"],
      ["RUN AWAY","to leave a place quickly, in secret"],
      ["ALONE","without other people"]
    ],
    comp:[
      ["Where did Miles and the boy sleep?",["In the palace","In a small inn","In the street","In a barn"],1,"Miles took him to a small inn near London Bridge."],
      ["What did Miles do while the boy ate?",["He ate too","He stood and served him","He went out","He slept"],1,"The boy said a king eats alone, so Miles stood and served him at table."],
      ["What did Edward give Miles for his help?",["Money","A horse","The title of knight","A house"],2,"He made him Sir Miles Hendon and gave him the right to sit in his presence."],
      ["Why did Miles go to the market?",["To find John Canty","To buy new clothes for the boy","To sell his sword","To find work"],1,"The boy’s clothes were only rags, so Miles went to buy him new ones."],
      ["What happened while Miles was out?",["The boy slept all day","A message took the boy away","The boy went to the palace","Nothing"],1,"Somebody said that Miles was waiting for him — and the boy went out."],
      ["Who was waiting for the boy?",["Miles","Father Andrew","John Canty","Lord Hertford"],2,"John Canty took him away again, out of London."],
      ["How did Miles feel when he came back?",["Happy","Angry and worried","Bored","Tired"],1,"The room was empty, and he started to look for the boy."],
      ["Did Miles stop looking for the boy?",["Yes","No, he looked for him for days","He went home","He went back to the war"],1,"He had made a promise, and he kept it."]
    ],
    tf:[
      ["Miles Hendon took Edward to Westminster Palace.",false,"He took him to a small inn."],
      ["Edward asked Miles to sit down and eat with him.",false,"At first Miles stood and served him, because a king eats alone."],
      ["Edward made Miles a knight.",true,"He said, “Rise, Sir Miles Hendon.”"],
      ["Miles could sit in the king’s presence after that.",true,"That was the special gift the little king gave him."],
      ["Miles went out to buy food.",false,"He went to the market to buy new clothes for the boy."],
      ["John Canty took the boy away while Miles was out.",true,"He used a false message to get him out of the inn."]
    ],
    rw:[
      ["Miles took Edward to an old barn where they slept.",1,"Wrong — they slept at an inn."],
      ["Miles believed that Edward was the real prince.",1,"Wrong — he still thought the boy was ill, but he was kind to him."],
      ["Edward was happy because he had new clothes to wear.",2,"Doesn’t say — Miles goes to buy them, but the boy is taken away first."],
      ["Miles went to the market to buy some new clothes for Edward.",0,"Right — the boy was still wearing Tom’s rags."],
      ["Miles Hendon wanted to think of a good plan to get Edward back to Westminster Palace.",0,"Right — that was his idea from the beginning."],
      ["The inn was near London Bridge.",0,"Right — that is where Miles took him."],
      ["Edward slept for two days.",2,"Doesn’t say — we only know he was very tired and fell asleep."],
      ["John Canty used a false message to take the boy away.",0,"Right — the boy was told that Miles was waiting for him."]
    ],
    halves:[
      ["Miles took the little king","to a small inn near London Bridge."],
      ["The boy said that a king eats alone,","so Miles stood and served him."],
      ["Edward was so pleased","that he made Miles a knight."],
      ["From that day Miles could sit","in the presence of the king."],
      ["When the boy fell asleep,","Miles covered him and watched the door."],
      ["Miles went to the market","to buy new clothes for the boy."],
      ["While Miles was out,","a false message took the boy away."],
      ["Miles came back to an empty room","and started to look for him."]
    ],
    odd:[
      [["knight","soldier","king","market"],3,"A market is a place, not a person."],
      [["eat","drink","serve","sleep"],3,"Sleep is the only one you don’t do at table."],
      [["tired","asleep","awake","hungry"],2,"Awake is the opposite of the others in this list."],
      [["buy","sell","pay","steal"],3,"Steal is the only one that is not honest."],
      [["promise","say","tell","run"],3,"Run is not something you do with words."]
    ],
    opposites:[
      ["rich","poor"],["happy","sad"],["cold","hot"],["quickly","slowly"],["laugh","cry"],
      ["dirty","clean"],["old","young"],["kind","cruel"],["small","large"],["beautiful","ugly"]
    ],
    gaps:{ title:"Past simple — irregular verbs", bank:["took","stood","gave","slept","went","woke"],
      items:[
        ["Miles ___ the boy to a small inn.","took"],
        ["He ___ at the table while the little king ate.","stood"],
        ["Edward ___ Miles the title of knight.","gave"],
        ["That night they ___ in the same small room.","slept"],
        ["In the morning Miles ___ to the market.","went"],
        ["When Miles came back, the boy ___ not there.","woke"]
      ]},
    think:{ quote:"“Rise, Sir Miles Hendon. You may sit in my presence.”",
      question:"Edward has no palace, no money and no crown, but he still gives Miles a title. What is he really giving him?",
      options:["Money for the food and the room.","Respect and a promise for the future.","A joke to make him laugh."],
      answer:1,
      note:"It costs him nothing and it means everything — and at the end of the book he keeps that promise."},
    writing:[
      {task:"Imagine you are Miles Hendon. Write about your evening at the inn with the boy.",target:"30–50 words",
       tips:["Say what you gave him","Say what you thought about his story","Say what you decided to do"],
       starters:["The boy was cold and hungry, so I…","While he ate, I…","I still don’t believe that…","But I promised that…"]},
      {task:"Write about what a good friend does, using Miles as an example.",target:"30–50 words",
       tips:["Give two examples from the chapter","Use because and so","Finish with your own idea of friendship"],
       starters:["Miles is a good friend because…","For example, when the boy…","He doesn’t ask for…","For me, a real friend is somebody who…"]}
    ]},

  { n:6, title:"The Whipping Boy",
    sum:"At the palace Tom must be a king: he sits on the gold chair and signs documents he cannot read. Then he meets Humphrey Marlow, the whipping boy, who is punished when the prince makes a mistake. Humphrey teaches Tom about the court, and Tom decides to stop the whipping.",
    vocab:[
      ["WHIP","to hit somebody as a punishment"],
      ["PUNISH","to make somebody suffer for doing something wrong"],
      ["MISTAKE","something you do wrong"],
      ["SIGN","to write your name on a document"],
      ["LESSON","a time when you learn something with a teacher"],
      ["GREEK","the language of Greece"],
      ["COUNCIL","a group of important people who help the king decide"],
      ["JOB","the work a person does for money"],
      ["AFRAID","frightened"],
      ["SECRET","something you know but must not tell"],
      ["FRIEND","a person you like and trust"],
      ["BORED","not interested; with nothing fun to do"]
    ],
    comp:[
      ["What did Tom have to do every morning at the palace?",["Play in the garden","Sit on the king’s gold chair and work","Beg in the street","Cook"],1,"Three gentlemen helped him get dressed, and then he went to the Council Chamber."],
      ["Why was signing documents difficult for Tom?",["He was tired","He could read only a little and understood nothing","He had no pen","Nobody asked him"],1,"He signed papers he could not understand at all."],
      ["Who was Humphrey Marlow?",["A servant","The prince’s whipping boy","A soldier","A teacher"],1,"When the prince made a mistake, the teacher hit Humphrey instead."],
      ["Why did the teacher hit Humphrey and not the prince?",["Because Humphrey was slow","Because nobody was allowed to hit a prince","Because Humphrey wanted it","Because he was poor"],1,"Nobody could touch the son of a king, so another boy took the punishment."],
      ["Why was Humphrey worried?",["He was ill","He was afraid of losing his job","He wanted to go home","He had no friends"],1,"His family was poor and they needed the money from his job."],
      ["What did Humphrey do for Tom?",["He gave him money","He told him everything about life at court","He took him home","He wrote his documents"],1,"That is how Tom learned the names, the rules and the routines of the palace."],
      ["How did Tom feel about the whipping?",["He thought it was normal","He thought it was wrong and wanted to stop it","He laughed","He didn’t care"],1,"It is his first real decision as a king."],
      ["How did Tom feel about palace life in general?",["Excited every day","Bored, even with good food and a warm bed","Frightened all the time","Angry"],1,"The food was good, the bed was warm, the clothes were expensive — but Tom was bored."]
    ],
    tf:[
      ["Tom sat on the king’s gold chair.",true,"After breakfast he went to the Council Chamber and sat on the gold chair."],
      ["Tom understood all the documents he signed.",false,"He signed documents he could not understand."],
      ["Humphrey Marlow was punished for the prince’s mistakes.",true,"That was the job of a whipping boy."],
      ["Humphrey wanted to lose his job.",false,"He was afraid of losing it, because his family needed the money."],
      ["Tom and Humphrey became friends.",true,"They talked together and Humphrey told him everything about the court."],
      ["Tom was very happy with life at Westminster Palace.",false,"He had everything — and he was bored."]
    ],
    rw:[
      ["Tom woke up at eight o’clock in the morning.",0,"Right — and two gentlemen were standing by his bed."],
      ["Three gentlemen helped Tom to get dressed.",0,"Right — that was the routine every morning."],
      ["Tom sat on the king’s gold chair in the Council Chamber.",0,"Right — after breakfast."],
      ["One man told Tom that there was no money because King Henry spent it all.",0,"Right — and Tom said some funny things, then stopped talking."],
      ["Humphrey Marlow did not want to lose his job because he was poor.",0,"Right — his family needed the money."],
      ["Humphrey was thirteen years old.",2,"Doesn’t say — the story never gives his age."],
      ["Lord Hertford asked Tom where the Great Seal was.",0,"Right — and Tom didn’t know."],
      ["Tom told Humphrey that he was not the real prince.",1,"Wrong — that is exactly the secret he cannot tell."]
    ],
    halves:[
      ["Every morning three gentlemen","helped Tom to get dressed."],
      ["In the Council Chamber Tom sat","on the king’s gold chair."],
      ["Tom signed documents","that he could not understand."],
      ["Humphrey Marlow was the whipping boy,","so he was hit for the prince’s mistakes."],
      ["Nobody was allowed to hit a prince,","and that is why the custom existed."],
      ["Humphrey was afraid of losing his job","because his family was poor."],
      ["Humphrey told Tom about the court,","and the two boys became friends."],
      ["Tom had good food and a warm bed,","but he was bored at the palace."]
    ],
    odd:[
      [["teacher","lesson","school","palace"],3,"A palace is not part of school life."],
      [["hit","whip","punish","help"],3,"Help is the only kind action."],
      [["afraid","frightened","worried","pleased"],3,"Pleased is the only good feeling."],
      [["read","write","sign","run"],3,"Run is not something you do with a pen."],
      [["English","Greek","Latin","Council"],3,"A Council is not a language."]
    ],
    wordform:[
      ["happiness","happy"],["anger","angry"],["hunger","hungry"],["sadness","sad"],
      ["danger","dangerous"],["interest","interesting"],["truth","true"],["beauty","beautiful"]
    ],
    gaps:{ title:"Adverbs from adjectives", bank:["angrily","happily","immediately","quickly","slowly","well"],
      items:[
        ["“I can explain, Your Majesty,” said Humphrey ___.","quickly"],
        ["The old beggar walked ___ because he was very tired.","slowly"],
        ["Tom and his friends played ___ near the river.","happily"],
        ["“There’s no dinner for you tonight, Tom!” said John Canty ___.","angrily"],
        ["The servants answered the new king ___.","immediately"],
        ["Tom learned to read very ___ with Father Andrew.","well"]
      ]},
    think:{ quote:"Every time the prince made a mistake, the teacher hit Humphrey and not the prince.",
      question:"The whipping boy was a real custom in Tudor times. Why is it unfair, and what does it show about that world?",
      options:["It is fair, because Humphrey was paid for it.","It is unfair: the person who makes the mistake is not the person who pays for it.","It is unfair, but only because Humphrey was a child."],
      answer:1,
      note:"Tom sees it at once — because he is the only person at court who has ever been hit for nothing."},
    writing:[
      {task:"Imagine you are Humphrey Marlow. Write about your job at the palace.",target:"30–50 words",
       tips:["Explain what a whipping boy does","Say how you feel about it","Say why you don’t want to lose the job"],
       starters:["My job at the palace is…","When the prince makes a mistake, the teacher…","I don’t like it, but…","If I lose this job, my family…"]},
      {task:"Tom has everything at the palace and he is still bored. Explain why.",target:"30–50 words",
       tips:["List what he has","Say what he does not have","Use but and because"],
       starters:["At the palace Tom has…","However, he doesn’t have…","He misses…","That is why he…"]}
    ]},

  { n:7, title:"Surprise at Hendon Hall",
    sum:"Miles finds the boy again and takes him home to Hendon Hall. But his brother Hugh says he does not know him: Hugh has taken the house, the land and the money, and married Lady Edith. Miles is called a thief, and he and the little king go to prison — and then to the stocks.",
    vocab:[
      ["HALL","a large old house in the country"],
      ["BROTHER","a boy or man with the same parents as you"],
      ["JUDGE","the person in court who decides who is guilty"],
      ["GUILTY","when you have done something against the law"],
      ["PRISON","the building where guilty people are kept"],
      ["STOCKS","a wooden frame that held a person’s feet in public"],
      ["LAWS","the rules of a country"],
      ["CRUEL","very unkind"],
      ["BARN","a building where farmers keep animals and animal food"],
      ["MARRY","to become the husband or the wife of somebody"],
      ["LIE","to say something that is not true"],
      ["FREE","not in prison; able to go where you want"]
    ],
    comp:[
      ["Where did Miles take the boy?",["To the palace","To Hendon Hall, his home","To France","To the market"],1,"Miles had been away for seven years and wanted to go home."],
      ["Who was Hugh Hendon?",["Miles’s son","Miles’s brother","A soldier","A judge"],1,"Hugh was his younger brother."],
      ["What had Hugh told everybody?",["That Miles was rich","That Miles was dead","That Miles was ill","That Miles was in France"],1,"So he could take the house, the land and the money."],
      ["Who had Hugh married?",["Lady Jane","Lady Edith","Lady Mary","Nobody"],1,"Lady Edith was the woman Miles loved before he went to the war."],
      ["What did Hugh say when he saw Miles?",["“Welcome home, brother!”","“I don’t know this man.”","“Take the house.”","“Where is the boy?”"],1,"Then he called the soldiers and said Miles was a thief."],
      ["What happened to Miles and the boy?",["They ran away","They went to prison","They went back to London","They stayed at the house"],1,"They spent long days behind the bars of a prison."],
      ["What did the little king see in prison?",["Nothing","How his own laws worked for poor people","His father","Tom"],1,"He met people punished very hard for very small things."],
      ["Where did the soldiers put Miles at the end?",["In a boat","In the stocks","In a barn","In the palace"],1,"And the little king stood beside him and would not leave."]
    ],
    tf:[
      ["Hendon Hall was Miles’s home.",true,"He had not seen it for seven years."],
      ["Hugh was happy to see his brother.",false,"He said he did not know the man and called the soldiers."],
      ["Hugh took Miles’s house, land and money.",true,"He did it while Miles was away at the war."],
      ["Lady Edith married Miles.",false,"She married Hugh while Miles was away."],
      ["Miles and the boy stayed in prison.",true,"They spent long days there before the stocks."],
      ["The little king left Miles alone in the stocks.",false,"He stayed beside him — and that is why Miles never forgot it."]
    ],
    rw:[
      ["Hendon Hall was a small house near the River Thames.",1,"Wrong — it was a large old house in the country."],
      ["Hendon Hall was built one hundred years ago.",2,"Doesn’t say — the age of the house is never given."],
      ["Hugh Hendon was Miles’s brother.",0,"Right — his younger brother."],
      ["Hugh was a friendly man.",1,"Wrong — he lied about his brother and sent him to prison."],
      ["Miles spent seven years away from England.",0,"Right — he was at the war and then a prisoner abroad."],
      ["Hugh took Miles’s land, money and home.",0,"Right — he did it while everybody believed Miles was dead."],
      ["Lady Edith married Hugh while Miles was away.",0,"Right — and when Miles returns she says she does not know him."],
      ["Miles and Edward stayed in a terrible prison for one month.",2,"Doesn’t say — we know it was many days, but not exactly how many."]
    ],
    halves:[
      ["Miles took the little king","home to Hendon Hall."],
      ["Hugh had told everybody","that his brother Miles was dead."],
      ["While Miles was away,","Hugh took the house, the land and the money."],
      ["Lady Edith, the woman Miles loved,","had married Hugh."],
      ["Hugh looked at his brother and said","that he did not know this man."],
      ["The soldiers took Miles away","and put him in prison."],
      ["In prison the little king saw","how his own laws punished poor people."],
      ["When they put Miles in the stocks,","the boy stayed beside him."]
    ],
    odd:[
      [["judge","court","prison","barn"],3,"A barn has nothing to do with the law."],
      [["brother","sister","cousin","soldier"],3,"A soldier is not family."],
      [["guilty","innocent","free","cruel"],3,"Cruel is about character, not about the law."],
      [["house","hall","home","street"],3,"A street is not a place where you live."],
      [["lie","say","tell","steal"],3,"Steal is not something you do with words."]
    ],
    gaps:{ title:"Past simple — irregular verbs", bank:["thought","left","bought","wrote","took","put"],
      items:[
        ["The soldiers ___ Miles outside the building.","took"],
        ["They ___ him in the stocks in front of everybody.","put"],
        ["Everybody ___ that Miles Hendon was dead.","thought"],
        ["Miles ___ England seven years before.","left"],
        ["Hugh ___ a letter to say that his brother was dead.","wrote"],
        ["With Miles’s money, Hugh ___ everything he wanted.","bought"]
      ]},
    think:{ quote:"In prison the little king saw, for the first time, what his own laws did to poor people.",
      question:"Edward has made laws all his life without ever seeing them work. What does this chapter teach him?",
      options:["That prisons should be more comfortable.","That a person who decides the rules should know what they do to people.","That his brother-in-law Hugh is a bad man."],
      answer:1,
      note:"This is why Twain sends the king into the streets: a king who has never been poor cannot know."},
    writing:[
      {task:"Imagine you are Miles Hendon arriving at Hendon Hall after seven years.",target:"30–50 words",
       tips:["Say what you expected to find","Say what really happened","Say how you felt"],
       starters:["After seven years I finally saw…","I thought my brother would…","Instead, Hugh looked at me and…","At that moment I felt…"]},
      {task:"Is it fair that Miles goes to prison? Explain your opinion.",target:"30–50 words",
       tips:["Say what Miles is accused of","Say who is really guilty","Use words like unfair, guilty, innocent"],
       starters:["Miles goes to prison because Hugh says…","But the real thief is…","This is unfair because…","In my opinion, the law…"]}
    ]},

  { n:8, title:"The Great Seal",
    sum:"It is Coronation Day. The Archbishop lifts the crown over Tom’s head — and a boy in rags shouts from the door of the Abbey: “I am the king!” Nobody believes him until he says where the Great Seal is. Edward becomes King of England, and he does not forget Tom or Miles.",
    vocab:[
      ["CORONATION","the day and the ceremony when a prince becomes a king"],
      ["ABBEY","a very big and important church"],
      ["ARCHBISHOP","the most important priest of the country"],
      ["PROCESSION","a long line of people walking or riding through the streets"],
      ["RAGS","very old, dirty, broken clothes"],
      ["PROVE","to show that something is true"],
      ["ARMOUR","the metal clothes of a knight"],
      ["THRONE","the special chair of a king or a queen"],
      ["MERCY","being kind to somebody you could punish"],
      ["FORGIVE","to stop being angry with somebody"],
      ["TRUE","real; not false"],
      ["FOREVER","always; for all time"]
    ],
    comp:[
      ["What day is it at the start of the chapter?",["Christmas Day","Coronation Day","Tom’s birthday","A normal day"],1,"All London came out for the royal procession."],
      ["What was the Archbishop going to do?",["Read a letter","Put the crown on Tom’s head","Call the soldiers","Open the Abbey"],1,"That was the last moment of the ceremony."],
      ["Who shouted from the door of the Abbey?",["Miles Hendon","John Canty","Edward, in rags","Humphrey"],2,"He cried, “I am the king!”"],
      ["Did the nobles believe him at first?",["Yes","No, they wanted to take him away","They laughed","They ran away"],1,"A boy in rags saying he is the king — it had happened all through the story."],
      ["What did Tom do?",["He said nothing","He said the boy was the real king","He ran away","He called the soldiers"],1,"He could have kept the crown by saying nothing."],
      ["What question proved who the real king was?",["“What is your name?”","“Where is the Great Seal?”","“Who is your father?”","“Where do you live?”"],1,"Only the true prince knew: inside the old suit of armour."],
      ["What had Tom used the Great Seal for?",["To sign documents","To break nuts","Nothing","To play"],1,"He didn’t know what it was."],
      ["What happened to Miles Hendon at the end?",["He went back to the war","The king kept his promise to him","He went to prison","He never saw the king again"],1,"He sat down in the presence of the king, and Hugh had to give everything back."]
    ],
    tf:[
      ["On Coronation Day the streets of London were empty.",false,"All London came out for the royal procession."],
      ["Edward ran into the Abbey and said he was the king.",true,"It was the last possible moment, with the crown in the air."],
      ["Tom kept the crown and said nothing.",false,"He said that the boy in rags was the true king."],
      ["Edward knew where the Great Seal was.",true,"He had hidden it himself inside an old suit of armour."],
      ["Tom had used the Great Seal to break nuts.",true,"He had no idea what the strange heavy object was for."],
      ["The new king forgot about Miles Hendon.",false,"He kept his promise: Miles could sit in the king’s presence."]
    ],
    rw:[
      ["Coronation Day was on 20 February.",0,"Right — that is the date given for the ceremony."],
      ["On Coronation Day Edward ran into Westminster Abbey and said he was the new king.",0,"Right — at the last moment of the ceremony."],
      ["Lord Hertford was surprised when he saw that Tom and Edward were the same.",0,"Right — the two boys had the same face."],
      ["Edward knew that the Great Seal was under his bed.",1,"Wrong — it was inside an old suit of armour."],
      ["Tom returned to Pudding Lane where his mother, grandmother and sisters lived.",0,"Right — and the new king looked after him and his family."],
      ["Edward knew where the Great Seal was and so he became King of England.",0,"Right — it was the proof nobody else could give."],
      ["The crowd in the Abbey was three thousand people.",2,"Doesn’t say — the number is never given."],
      ["Hugh Hendon had to give everything back to Sir Miles.",0,"Right — the new king ordered it."]
    ],
    halves:[
      ["Everyone was celebrating in London","because 20 February was Coronation Day."],
      ["Tom rode a tall horse","in the royal parade."],
      ["When Tom saw his mother in the crowd,","he said he didn’t know her."],
      ["When the Archbishop was ready to put the crown on Tom’s head,","Edward ran into the church and cried “I’m the king!”"],
      ["Lord Hertford asked Edward","“Where’s the Great Seal?”"],
      ["Lord John found the Great Seal","and Edward became King of England."],
      ["Tom had used the Great Seal","to break open nuts."],
      ["Edward thanked Sir Miles for his help","and ordered Hugh to give everything back."]
    ],
    odd:[
      [["crown","throne","seal","abbey"],3,"An abbey is a building, the others are objects of the king."],
      [["archbishop","priest","judge","king"],3,"A king does not work in a church."],
      [["true","real","false","honest"],2,"False is the opposite of the others."],
      [["forgive","help","punish","thank"],2,"Punish is the only unkind one."],
      [["procession","parade","ceremony","prison"],3,"A prison is not a celebration."]
    ],
    gaps:{ title:"Past simple — the end of the story", bank:["became","cried","found","gave","rode","forgot"],
      items:[
        ["Tom ___ a tall horse in the royal parade.","rode"],
        ["Edward ran into the church and ___ “I’m the king!”","cried"],
        ["Lord John ___ the Great Seal inside the old suit of armour.","found"],
        ["Edward ___ King of England on that day.","became"],
        ["The new king ___ Tom a home and looked after his family.","gave"],
        ["England never ___ the young king who died at sixteen.","forgot"]
      ]},
    think:{ quote:"Tom could keep the crown by saying nothing. He said one sentence instead.",
      question:"Tom is one second away from being King of England forever. Why do you think he tells the truth?",
      options:["Because he is afraid of the soldiers.","Because he knows what it is to have nothing, and he could not do that to Edward.","Because he doesn’t like being king."],
      answer:1,
      note:"Twain gives the pauper the last word of the story on purpose: honesty is the one thing the palace could not teach him."},
    writing:[
      {task:"Imagine you were in Westminster Abbey on Coronation Day. Write what you saw.",target:"30–50 words",
       tips:["Start with the crown in the air","Describe the boy at the door","Say how the people reacted"],
       starters:["The Archbishop was lifting the crown when…","A boy in rags stood at the door and…","At first everybody thought…","Then Lord Hertford asked…"]},
      {task:"What kind of king do you think Edward will be after everything he has seen? Explain.",target:"30–50 words",
       tips:["Say what he learned in the streets and in prison","Say what he does for Tom and Miles","Use will and because"],
       starters:["After his month in the streets, Edward will…","He knows now that his laws…","He looks after Tom because…","In my opinion he will be a king who…"]}
    ]}
];

const READINGS = {
1:[
"Two boys were born on the same day in London in the year 1537. One of them was Tom Canty. His family was very poor, and they lived in a small room in Offal Court, near Pudding Lane. It was a poor neighbourhood near the River Thames.",
"When Tom’s father saw the baby, he was not happy. “Now we have another child to look after, and we don’t have any money!” he said angrily.",
"The other baby was Edward Tudor, Prince of Wales. His father was Henry VIII, King of England, and they lived at Westminster Palace in London.",
"King Henry VIII had two daughters, Mary and Elizabeth, but he really wanted a son. His third wife, Jane Seymour, gave him a boy. When the king saw the baby he was very happy. “My son is born! Let’s have a big banquet and fireworks!” All of England was happy.",
"At the age of ten, Tom Canty was a beggar on the streets of London. Poor Tom didn’t have any shoes and his clothes were old and dirty.",
"He lived with his mother, father, grandmother and two sisters, Bet and Nan. The children slept on the cold floor and they were always hungry. Tom’s father, John Canty, never worked.",
"“Go out and beg!” he told Tom. “And bring home lots of money.” Sometimes people were sorry for Tom and gave him some money. But other times they didn’t give him anything. When he didn’t bring any money home, John Canty hit him and Tom cried.",
"Tom thought, “I don’t want to be poor forever. I want to learn to read and write. I want to know about the world.”",
"Father Andrew was Tom’s friend. He was a kind, old priest who lived nearby. One day Tom said, “Can you help me, Father Andrew? I want to read and write. And I want to speak good English, like important people.”",
"Father Andrew smiled at Tom and said, “Of course I can help you. Come to my room early in the morning.”",
"Father Andrew taught Tom to read and write. He told him stories about brave knights, kings and castles. Tom learned quickly and soon read Father Andrew’s books. At night he dreamed about castles, knights, princes and their adventures.",
"Tom had a lot of friends and they played together and swam in the river. They often played prince and king, and Tom always wanted to be the prince. His friends laughed at him and called him ‘Prince Tom’.",
"One day Father Andrew said, “I have an idea, Tom. Why don’t you go to Westminster Palace and see the real prince, Edward. Perhaps you can meet him!”"
],
2:[
"The next day Tom decided to go to Westminster Palace. “Perhaps I can see Prince Edward,” he thought. When he got to the palace he stood outside the big gate. He looked at the beautiful palace but he couldn’t go near it. There were two tall soldiers who stood by the gate.",
"He went back to Westminster Palace the next day. This time he saw important people going to the palace, but he never saw Prince Edward.",
"After a few days Tom went back to Westminster Palace and he saw the prince at last. “He’s Prince Edward,” thought Tom. “He’s wearing fine clothes and nice shoes.” He ran to the gate to look at the prince.",
"“Stop!” cried the soldiers. “You can’t come in here.” A soldier hit Tom on the head. The young prince saw this and got angry.",
"“Don’t hit that poor boy!” said the prince. “Open the gates and let him come in.” “He’s only a dirty beggar, sir,” said one of the soldiers. The prince looked at the soldier and said, “Remember, my father is the king of rich people and poor people, too. Now open the gate, quickly!”",
"He took Tom inside the big palace. Tom looked at the long stairs and the beautiful rooms. He saw big paintings on the walls. When they reached the prince’s rooms, Edward called his servant. “Bring some food,” he ordered. The servant brought meat, cheese, fruit, cakes and a tall glass of milk. It was the first time Tom saw so much good food, and he ate and drank quickly because he was hungry.",
"“What’s your name?” asked the prince kindly. “My name’s Tom Canty.” “My name’s Edward. Where do you live?” “I live with my family in a room near Pudding Lane,” said Tom. “In one room?” asked the prince, surprised. “Do you all live in the same room?” “Yes. It’s a small room. Your room is more beautiful than mine.”",
"“I have two sisters, Lady Elizabeth and Lady Mary,” said the prince. “And I have a cousin called Lady Jane Grey. Do you play with other boys?” “Of course I do,” said Tom happily. “We swim in the river and jump in the mud. Our clothes get dirty but it’s great fun!”",
"“How wonderful!” exclaimed the prince. “I want to swim in the river and jump in the mud and get dirty once in my life. But I can’t, because I’m a prince. I must stay in the palace… And I’m terribly bored with life here.”",
"Edward and Tom looked at each other and laughed. Then Edward suddenly said, “Wait! I have an idea — a great idea. Come here and look in the mirror.”",
"“Look in the mirror, Tom,” said Edward. “You and I are the same.” Tom looked and said, “You’re right! You’re like me and I’m like you.” They both laughed. “You’re thin and I’m thin,” said Edward, smiling. “And you’ve got brown hair and brown eyes, just like me,” said Tom. “And we’re the same height!”",
"“We can play a wonderful game!” exclaimed Edward. “Let’s change clothes and you can be the prince and I can be the pauper for a short time.” Tom washed his face and hands, and put on the prince’s clothes and shoes. Then Edward put on Tom’s old trousers and dirty shirt. They looked at each other in the mirror and laughed loudly. Now Tom was Edward and Edward was Tom.",
"“Tom, you can stay here until I come back,” said the prince. “Now I’m a pauper and I can play in the streets and swim in the river with the other boys!” Before leaving the room the prince took something big and round from the table. He went to a corner of the room and put it inside an old suit of armour. Tom watched him carefully. Then the prince ran out of the door.",
"Tom was alone in the beautiful room. He looked around and thought, “What can I do now that I’m a prince?”"
],
3:[
"Edward ran out of the palace in Tom’s old clothes. “Now I can play in the streets!” he thought. But when he reached the gate, the soldiers didn’t look at his face. They looked at his dirty shirt.",
"“Out!” said a soldier, and he pushed the boy into the street. “But I am the Prince of Wales!” cried Edward. The soldier laughed. “Of course you are,” he said, and closed the gate.",
"People stopped in the street to look at the strange boy in rags who said he was a prince. A crowd came around him. Some laughed, some shouted. Dogs ran after him. “I am the Prince of Wales!” Edward said again and again — and the crowd laughed louder.",
"For the first time in his life, Edward was cold, hungry and frightened. He did not know the way home. He did not know how to ask for food. Nobody in the whole city believed one word he said.",
"Then a tall man walked into the middle of the crowd. He was a soldier back from the war, and his name was Miles Hendon.",
"“Leave the boy alone,” he said, and he drew his sword. The crowd was big, but the sword was long, and the people went away.",
"“Thank you,” said Edward. “You have helped your king today.” Miles looked at the small, dirty, tired boy in rags. “Poor child,” he thought. “His mind is ill.” But he said politely, “Then I will stay with Your Majesty.”",
"Miles took him to a small inn near London Bridge. He gave him food and a warm bed. The boy ate a little and fell asleep at once, and Miles sat by the door and watched him.",
"But somebody else was looking for a boy that night. John Canty came out of the dark with a big stick in his hand. He saw the face in the doorway of the inn and he was sure. “Tom!” he shouted. “Come home!”",
"“I am not your son,” said Edward. “I am the King of England.” “So the boy is mad now,” said John Canty. He took Edward by the arm and pulled him away from London, into the night."
],
4:[
"At Westminster Palace, nobody knew that the boy in the prince’s clothes was Tom Canty. The servants called him ‘Your Highness’. The lords listened when he spoke. Tom said again and again, “I am not the prince! I am Tom Canty, from Offal Court!” — and everybody at court answered, “The prince is ill. He doesn’t remember who he is.”",
"That evening the royal barge moved down the River Thames. Tom was going to the royal banquet at the Guildhall, in honour of King Henry VIII.",
"Great nobles walked upon each side of him. People stood along the river to see the prince pass. Tom looked at the crowd and thought about his mother and his sisters, somewhere in those streets.",
"The Guildhall was full of light and food. There was roast meat, roast chicken and fish, green vegetables, eight kinds of cheese, fruit, cakes and pudding.",
"Tom was hungry, and he ate with his fingers. He made noises with his mouth. Then he took the finger bowl — the small bowl of water for washing your fingers — and he drank the water.",
"Nobody said a word. Nobody laughed. Nobody corrects a prince.",
"Later that night Tom went to see King Henry VIII. He was afraid. But the old king in the great bed was not angry with him at all.",
"King Henry was old and very ill. His face was big and grey, and one of his legs was wrapped in bandages. He looked at the boy and said gently, “Come here, my son.”",
"“I am not your son, sir,” said Tom quietly. “I am Tom Canty.” The king smiled sadly. “The prince is ill,” he said to the lords. “Nobody must say this outside these rooms.”",
"Then the king’s face changed. “I need the Great Seal,” he said. “There is an important document. Where is the Great Seal, my son?”",
"Tom did not know what the Great Seal was. “I… I can’t remember, sir,” he said. The king was worried, and the lords looked at each other. In all England, only one boy knew where the Great Seal was — and he was somewhere in the streets, in a beggar’s clothes.",
"Before he left, Tom asked the king something. There was a man in prison who was going to die, and Tom asked for mercy for him. The king looked at his son for a long moment. Then he said yes.",
"That night King Henry VIII died. In the morning Lord Hertford came into the room, went down on one knee, and said: “The king is dead. Long live the king.”",
"And Tom Canty, the beggar of Offal Court, was King of England."
],
5:[
"Miles Hendon looked for the boy for two days and two nights. On the third day he found him again, cold and hungry on a road outside London, and took him back to the inn.",
"“Sit down, Your Majesty,” said Miles. “Your dinner is ready.” The boy sat at the small table. Miles put the plate in front of him and then stood up straight beside the chair.",
"“Sit down and eat with me,” said Edward. “I cannot, Your Majesty,” said Miles, smiling to himself. “A king eats alone.” So Miles stood, and served him, and the little king ate.",
"Miles was tired. He had walked all day and he had no money left. But he did not sit down, because the boy did not want him to sit down.",
"When the boy finished, he looked at the tall soldier for a long moment. “You have been kind to me,” he said, “and you ask for nothing. Kneel.” Miles knelt, and the boy touched his shoulder. “Rise, Sir Miles Hendon.”",
"Then the little king said something better. “A king cannot give what he does not have, so I will give you this: you and your family may sit in the presence of the King of England — forever.”",
"Miles laughed to himself, and then he stopped laughing, because the boy was completely serious. “I thank Your Majesty,” he said — and he sat down.",
"The next morning Miles looked at the boy’s clothes. They were rags. “A king cannot walk through England like this,” he said. “I am going to the market to buy you clothes. Stay here. Don’t open the door to anybody.”",
"While Miles was out, a young man came to the inn with a message. “Sir Miles is waiting for you by the river,” he said. “Come quickly.”",
"The little king went out into the street — and John Canty was waiting for him at the corner.",
"When Miles came back with the new clothes, the room was empty. He stood in the doorway for a long time. Then he put the clothes on the bed, took his sword, and went out to look for him again."
],
6:[
"At the palace, Tom’s new life began at eight o’clock in the morning. When he woke up and looked around, two gentlemen were standing by his bed. Three more helped him to get dressed.",
"After breakfast Tom went to the Council Chamber. He sat on the king’s gold chair. Lords came in, went down on one knee, and spoke to him about money, about ships, about France.",
"One man told him that there was no money in the treasury, because King Henry had spent it all. Tom said some funny things, and then he stopped talking, because nobody laughed.",
"They gave him documents to sign. Tom looked at the long lines of writing and understood almost nothing. He wrote the prince’s name slowly, letter by letter, and hoped that nobody was watching his hand.",
"When Tom went back to his room, a boy came in. He was about the same age as Tom, and he was afraid.",
"“Who are you?” asked Tom. “Humphrey Marlow, Your Highness,” said the boy. “I am your whipping boy.” “My what?” “When you make a mistake in your lessons, the teacher hits me. Nobody is allowed to hit a prince.”",
"Tom stared at him. In Offal Court his father hit him for nothing at all, and here was a boy who was hit for somebody else’s Greek.",
"“And do you want this job?” asked Tom. “Oh yes, Your Highness!” said Humphrey quickly. “Please don’t send me away. My family is poor. If I lose this job we have nothing.”",
"So Tom kept him. And Humphrey, who was so happy that he could not stop talking, told Tom everything: the names of the lords, the rules of the court, what the prince liked to eat, how he walked, what he said. Every day the ‘prince’ made fewer mistakes — and every day the two boys became better friends.",
"Lord Hertford asked Tom again where the Great Seal was. Tom did not know, and he signed more documents that he could not read.",
"Everything at Westminster Palace was wonderful — the good food, the warm bed, the expensive clothes. But Tom was bored. He looked out of the window at the river and thought about his friends, and the mud, and the noise.",
"And then he remembered Humphrey, standing in the corner waiting to be hit for somebody else. “No,” Tom said out loud, to nobody. “That is going to stop.”"
],
7:[
"Miles found the boy again three weeks later, and this time he did not let him go. “We are going home,” he said. “To Hendon Hall.”",
"They walked for days. Miles talked about the house all the way: the big rooms, the trees, his father, his brother Hugh, and Lady Edith, the woman he loved before he went to the war.",
"At last they arrived. Hendon Hall was large and old and quiet in the afternoon light. Miles ran to the door with his heart full.",
"Inside, a young man was sitting at a table. It was Hugh. He looked up at the tall soldier in the doorway and his face did not move.",
"“Hugh! Brother!” said Miles. “I have come home.” Hugh looked at him calmly and said, “I don’t know this man.”",
"Then Lady Edith came in. She looked at Miles for one second — one long second — and said, “I have never seen him before.” And she left the room quickly, without looking back.",
"Miles understood everything then. While he was away at the war, Hugh had told everybody that his brother was dead. He had taken the house, the land and the money, and he had married Lady Edith.",
"Hugh called the soldiers. “This man is a thief,” he said, “and the boy is mad.” The soldiers took them both away, and Miles and the little king went to prison.",
"The prison was cold and dark and full of people. There was an old woman there who had stolen a piece of cloth. There was a man who could not pay what he owed. There were people waiting for punishments that were far bigger than the things they had done.",
"The little king listened to all of them. These were his laws. He had never seen them from this side. “When I am king again,” he said quietly, “these laws will change.”",
"After many days the soldiers took Miles outside and put him in the stocks, in front of everybody, and people threw things at him.",
"The boy in rags walked out and stood beside him and would not move. He stayed there all day, next to the man who had defended him when nobody else would."
],
8:[
"On the twentieth of February, all London woke up early. It was Coronation Day.",
"There were flags in every street and people at every window. The royal procession came slowly through the city: soldiers, horses, lords in gold and silver — and, in the middle of it all, a boy on a tall white horse.",
"Tom rode past the crowd and looked at the faces. And in one of those faces, close to the horse, he saw his mother.",
"She ran forward and put her hand on his leg and said, “Oh, my child!” The guards pushed her away. Tom looked straight ahead and said, “I don’t know you, woman.” And then he rode on, and he was ashamed for the rest of the day.",
"In Westminster Abbey the ceremony was long and beautiful. At the end of it the Archbishop of Canterbury lifted the crown of England high above the boy’s head.",
"And a voice at the door of the Abbey cried: “Stop! That crown is mine!”",
"Everybody turned. In the great doorway stood a thin boy in dirty rags. Soldiers moved towards him at once — and Tom Canty said, in a loud, clear voice: “Let him go. He is the true king.”",
"Then Tom went down from the steps and knelt in front of the boy in rags.",
"The lords did not know what to think. Two boys with the same face stood in front of them, and one wore silk and the other wore rags. Lord Hertford stepped forward and asked the only question that could not be answered by luck: “Where is the Great Seal of England?”",
"Everybody was silent.",
"“It is at Westminster Palace,” said Edward, “in the corner of my room, inside the old suit of armour. I put it there myself.” The lords sent men to look — and there it was.",
"“And you,” said Edward, turning to Tom, “what did you do with it in all these weeks?” Tom looked at the floor. “I used it to break nuts, Your Majesty,” he said. “I didn’t know what it was.” And the Abbey, which had been silent for a very long minute, began to laugh.",
"Edward Tudor was crowned King of England that day. He did not forget anybody. Tom Canty and his mother and sisters were given a home and looked after for the rest of their lives. Hugh Hendon gave everything back, and Sir Miles Hendon — and his family after him — could sit in the presence of the King of England forever.",
"Edward VI was a good and merciful king. He remembered the streets, and the prison, and the stocks, and he changed the laws he had seen from below. He was king for only six years and died when he was sixteen — but England never forgot him."
]
};

const EVENTS = {
1:{ev:[
  "Two boys were born on the same day in London in 1537.",
  "Tom Canty grew up in a poor room in Offal Court.",
  "John Canty sent Tom out to beg on the streets.",
  "Tom asked Father Andrew to teach him to read and write.",
  "Tom read books about kings and dreamed about castles.",
  "Father Andrew told Tom to go and see the real prince."
],keys:["born","Offal","beg","Father","books","prince"]},
2:{ev:[
  "Tom went to Westminster Palace and waited by the gate.",
  "A soldier hit Tom, and Prince Edward got angry.",
  "Edward took Tom inside and gave him food.",
  "The two boys looked in the mirror and saw the same face.",
  "They changed clothes for a game.",
  "Edward hid the Great Seal and ran out into the street."
],keys:["gate","soldier","food","mirror","clothes","Seal"]},
3:{ev:[
  "The soldiers pushed Edward out of the palace.",
  "A crowd laughed at the boy who said he was the prince.",
  "Miles Hendon drew his sword and defended him.",
  "Miles took the boy to an inn and gave him food.",
  "John Canty found the boy in the doorway.",
  "John Canty took Edward away from London."
],keys:["pushed","crowd","sword","inn","Canty","away"]},
4:{ev:[
  "Everybody at the palace believed Tom was the prince.",
  "The royal barge took Tom to the Guildhall.",
  "Tom drank the water of the finger bowl at the banquet.",
  "Tom met King Henry VIII, who was old and ill.",
  "The king asked for the Great Seal and Tom could not answer.",
  "King Henry died, and Tom became King of England."
],keys:["believed","barge","bowl","Henry","Seal","died"]},
5:{ev:[
  "Miles found the little king again and took him to the inn.",
  "Miles stood and served the boy at table.",
  "Edward made Miles a knight.",
  "Miles was allowed to sit in the presence of the king.",
  "Miles went to the market to buy new clothes.",
  "A false message took the boy out of the inn."
],keys:["found","served","knight","sit","market","message"]},
6:{ev:[
  "Tom woke up at the palace with gentlemen by his bed.",
  "He sat on the king’s gold chair in the Council Chamber.",
  "He signed documents that he could not understand.",
  "Humphrey Marlow came in and explained his job.",
  "Humphrey told Tom everything about life at court.",
  "Tom decided that the whipping had to stop."
],keys:["woke","chair","documents","Humphrey","court","stop"]},
7:{ev:[
  "Miles took the little king home to Hendon Hall.",
  "Hugh looked at his brother and said he did not know him.",
  "Lady Edith said she had never seen Miles before.",
  "Hugh called the soldiers and said Miles was a thief.",
  "Miles and the king were taken to prison.",
  "The soldiers put Miles in the stocks and the boy stayed with him."
],keys:["Hendon","Hugh","Edith","thief","prison","stocks"]},
8:{ev:[
  "All London came out for the royal procession.",
  "Tom saw his mother in the crowd and said he didn’t know her.",
  "The Archbishop lifted the crown over Tom’s head.",
  "A boy in rags cried “That crown is mine!”",
  "Edward said where the Great Seal was.",
  "Edward was crowned king and rewarded Tom and Miles."
],keys:["procession","mother","crown","rags","Seal","rewarded"]}
};

return {level:'A2', lead:'Mark Twain · adapted by Paolo Baca · <b>A2 elementary</b> (≈600 headwords)',
  CHAPTERS:CHAPTERS, READINGS:READINGS, EVENTS:EVENTS};
})();
