window.ATTWN_DATA = (function(){
const CHAPTERS = [
  { n:1, title:"Two Boys in London", unit:1,
    sum:"In the autumn of 1537 two boys are born on the same day: Tom Canty, in a filthy room in Offal Court, and Edward Tudor, heir to the throne of England. One birth is a disaster for a family with nothing; the other is a national holiday. Tom begs, is beaten and dreams of princes — until an old priest teaches him to read.",
    vocab:[
      ["PAUPER","a person who is extremely poor and depends on charity"],
      ["BEG","to ask strangers in the street for money or food"],
      ["HEIR","the person who will inherit a title, a throne or property"],
      ["THRONE","the royal chair — and, by extension, royal power itself"],
      ["NEIGHBOURHOOD","a particular area of a town and the people who live there"],
      ["FILTHY","extremely dirty"],
      ["MISERY","great suffering, usually caused by poverty or unhappiness"],
      ["CELEBRATE","to do something enjoyable because of a special event"],
      ["EDUCATE","to teach somebody, especially over a long period"],
      ["AMBITIOUS","determined to succeed or to improve your situation"],
      ["IMAGINATION","the ability to form pictures and ideas in your mind"],
      ["CHARITY","kindness shown to people in need, often as money or food"]
    ],
    comp:[
      ["What does the novel do in its very first paragraph?",["It describes the palace","It puts two births side by side","It introduces Miles Hendon","It describes the war"],1,"Twain sets the two boys in parallel from the first sentence: same city, same day, opposite worlds."],
      ["How does John Canty react to the birth of his son?",["With joy","With indifference","With anger, because there is no money","He is not there"],2,"“Now we have another child to look after, and we don’t have any money!”"],
      ["Why was Edward’s birth so important to Henry VIII?",["He had no children","He wanted a male heir","He needed money","He wanted a big party"],1,"He already had two daughters, Mary and Elizabeth, but the Tudor throne needed a son."],
      ["What is life like in the Canty household?",["Poor but happy","Violent and hungry","Quiet","Comfortable"],1,"The children sleep on the floor, they are always hungry and the father beats them."],
      ["What does Tom want more than anything?",["Money","To learn to read and understand the world","To leave London","A new father"],1,"“I don’t want to be poor forever. I want to know about the world.”"],
      ["Who is Father Andrew and what does he give Tom?",["A rich uncle who gives him money","A priest who gives him an education","A soldier who gives him work","A teacher at a royal school"],1,"He is a poor old priest, and the books and lessons he gives Tom will later save his life at court."],
      ["Why do Tom’s friends call him ‘Prince Tom’?",["He is rich","He always plays the prince in their games","He lives near the palace","He knows the prince"],1,"His head is full of the stories Father Andrew tells him."],
      ["What idea does Father Andrew give Tom at the end of the chapter?",["To find work at the palace","To go and see the real prince","To leave London","To become a priest"],1,"It is the small suggestion that starts the whole story."]
    ],
    tf:[
      ["Tom and Edward were born in the same year but in different months.",false,"They were born on the same day in 1537."],
      ["The birth of the prince was celebrated across the whole country.",true,"There were banquets and fireworks, and all England was happy."],
      ["Tom’s father worked hard to feed the family.",false,"John Canty never worked; he sent his son out to beg."],
      ["Father Andrew charged Tom money for the lessons.",false,"He was poor himself and taught the boy for nothing."],
      ["Tom learned to read quickly.",true,"He soon read Father Andrew’s books on his own."],
      ["Tom was satisfied with his life in Offal Court.",false,"He was ambitious: he wanted to learn, and to stop being poor."]
    ],
    rw:[
      ["At the age of ten, Tom Canty was already begging in the streets.",0,"Right — begging was his daily work."],
      ["Tom Canty had three older sisters.",1,"Wrong — he had two sisters, Bet and Nan."],
      ["Offal Court was in a poor neighbourhood near the River Thames.",0,"Right — the text places it near Pudding Lane, by the river."],
      ["Father Andrew was seventy-five years old.",2,"Doesn’t say — we know only that he was old and kind."],
      ["Henry VIII’s two daughters came from two different marriages.",0,"Right — Mary and Elizabeth had different mothers."],
      ["The Canty children had beds of their own.",1,"Wrong — they slept on the cold floor."],
      ["Tom’s mother tried to protect him from his father.",2,"Doesn’t say — the chapter does not tell us what she did."],
      ["Tom was able to read Latin as well as English.",2,"Doesn’t say — we know he read Father Andrew’s books, not in what language."]
    ],
    halves:[
      ["Two boys were born on the same day,","but into two completely different worlds."],
      ["John Canty was angry at the birth of his son","because there was no money to feed another child."],
      ["Henry VIII wanted a male heir,","so the birth of Edward was celebrated all over England."],
      ["The Canty children slept on the floor","and were hungry almost every day."],
      ["Tom was beaten by his father","whenever he came home with empty hands."],
      ["Father Andrew taught Tom to read and write","and filled his head with stories of kings and knights."],
      ["Tom’s friends called him ‘Prince Tom’","because he always played that part in their games."],
      ["At the end of the chapter Father Andrew suggests","that Tom should go and see the real prince."]
    ],
    odd:[
      [["pauper","beggar","poverty","priest"],3,"A priest is a profession; the others belong to the vocabulary of poverty."],
      [["heir","throne","crown","street"],3,"A street has nothing to do with royalty."],
      [["educate","teach","learn","beg"],3,"Beg is not connected with education."],
      [["filthy","dirty","clean","dusty"],2,"Clean is the opposite of the others."],
      [["ambitious","determined","hopeful","indifferent"],3,"Indifferent means you don’t care — the opposite of ambitious."]
    ],
    gaps:{ title:"Past simple vs past continuous", bank:["was begging","taught","were sleeping","hit","wanted","dreamed"],
      items:[
        ["At the age of ten Tom ___ on the streets of London every day.","was begging"],
        ["Father Andrew ___ him to read and write.","taught"],
        ["While the other children ___ on the cold floor, Tom read his books.","were sleeping"],
        ["John Canty ___ his son when he came home with nothing.","hit"],
        ["Tom ___ to understand the world outside Offal Court.","wanted"],
        ["Night after night he ___ of castles and princes.","dreamed"]
      ]},
    think:{ quote:"Tom thought, “I don’t want to be poor forever. I want to learn to read and write. I want to know about the world.”",
      question:"Tom wants to improve and become a better person — he is <b>ambitious</b>. Why is it important to learn to read and write, and to know about the world?",
      options:["To become rich","To better understand people and our world","To help others","To find a good job","To become an important person"],
      answer:null,
      note:"There is no single correct answer. Twain’s point is the second one: literacy gives Tom a world that his street could never give him."},
    writing:[
      {task:"Describe a day in Tom Canty’s life in Offal Court, from morning to night.",target:"60–80 words",
       tips:["Use past simple and past continuous","Include one detail about hunger and one about the street","End with Father Andrew’s lessons"],
       starters:["Tom usually woke before dawn, because…","By the middle of the morning he was…","The worst part of the day came when…","The only good hour was the one he spent…"]},
      {task:"Twain begins his novel with two births on the same day. Why do you think he does this?",target:"60–80 words",
       tips:["Say what the two babies have in common","Say what is completely different","Explain what the reader is being prepared for"],
       starters:["Twain opens the novel with two babies who…","The only difference between them is…","By putting them side by side, he…","This prepares the reader for…"]}
    ]},

  { n:2, title:"An Exciting Game", unit:2,
    sum:"Tom finally sees Prince Edward through the palace gate and is struck by a guard. The prince intervenes, brings the beggar inside, feeds him and questions him about a life he has never known. In front of a mirror the boys discover an identical face — and they change clothes for a game that neither can undo.",
    vocab:[
      ["GUARD","a soldier whose job is to protect a place or a person"],
      ["SERVANT","a person employed to work in somebody’s house"],
      ["MIRROR","a piece of glass in which you see your reflection"],
      ["ARMOUR","the metal covering that protected a knight in battle"],
      ["IDENTICAL","exactly the same"],
      ["ORDER","to tell somebody to do something, with authority"],
      ["POLITE","showing good manners and respect for other people"],
      ["EXCHANGE","to give one thing and receive another in return"],
      ["PRIVILEGE","a special right that only some people have"],
      ["CONFINED","kept inside a place and not allowed to leave"],
      ["GREAT SEAL","the official stamp used to authorise royal documents"],
      ["REFLECTION","the image you see in a mirror or in water"]
    ],
    comp:[
      ["Why does Tom go back to the palace several days in a row?",["To beg there","To see the prince","To look for work","To meet the king"],1,"He waits by the gate until he finally catches sight of Edward."],
      ["What does the guard do, and how does Edward react?",["He opens the gate; Edward thanks him","He strikes Tom; Edward is furious","He ignores Tom; Edward laughs","He arrests Tom; Edward agrees"],1,"Edward orders the gate opened and reminds the guard that his father is king of the poor as well."],
      ["What surprises Tom most inside the palace?",["The soldiers","The quantity of food and the beauty of the rooms","The size of the garden","The other children"],1,"It is the first time he has seen so much good food."],
      ["What does Edward envy about Tom’s life?",["His money","His freedom to play in the streets and the river","His family","His clothes"],1,"Edward says he is “terribly bored” with life at the palace."],
      ["What do the boys see in the mirror?",["Two very different faces","An identical face","Nothing clearly","The king behind them"],1,"Same height, same thin build, same brown hair and eyes."],
      ["Whose idea is the exchange of clothes?",["Tom’s","Edward’s","The servant’s","Father Andrew’s"],1,"Edward proposes it as “a wonderful game”, for a short time only."],
      ["What does Edward do just before he runs out of the room?",["He locks the door","He hides the Great Seal in a suit of armour","He writes a letter","He calls the guards"],1,"He hides something “big and round” — a detail that decides the whole ending."],
      ["Why can nobody tell the boys apart afterwards?",["Because the palace is dark","Because people look at clothes, not faces","Because they are twins","Because Tom lies"],1,"That is Twain’s central idea: rank is a costume."]
    ],
    tf:[
      ["Tom saw the prince the first time he went to the palace.",false,"He returned several times before he finally saw him."],
      ["Edward reminded the guard that his father was king of poor people too.",true,"It is his first act of justice in the book."],
      ["Tom ate slowly and politely at the palace.",false,"He ate and drank quickly, because he was genuinely hungry."],
      ["Edward had never played in the river with other boys.",true,"He says he has never played with other boys at all."],
      ["The exchange of clothes was meant to be permanent.",false,"It was a game “for a short time”."],
      ["Edward hid the Great Seal before leaving the room.",true,"He put it inside an old suit of armour, and Tom watched him do it."]
    ],
    rw:[
      ["Two guards were standing outside Westminster Palace.",0,"Right — two tall soldiers by the gate."],
      ["A guard struck Tom on the head.",0,"Right — and the prince saw it happen."],
      ["The servants brought Tom a large mirror.",1,"Wrong — they brought food; the mirror was already in the room."],
      ["Lady Elizabeth was fourteen years old.",0,"Right — Edward describes her as 14 and friendly."],
      ["Edward could swim well.",1,"Wrong — he had never been allowed near the river."],
      ["Tom’s mother knew where he had gone that day.",2,"Doesn’t say — the chapter never tells us."],
      ["Edward wanted to be a pauper permanently.",1,"Wrong — only “for a short time”, as a game."],
      ["The palace had hundreds of rooms.",0,"Right — Edward says so when Tom describes his single room."]
    ],
    halves:[
      ["Tom returned to the palace day after day","until he finally saw Prince Edward."],
      ["When the guard struck Tom,","Edward ordered the gate to be opened."],
      ["Edward reminded the soldier","that his father was king of poor people too."],
      ["Tom ate and drank quickly","because he had never seen so much food."],
      ["Edward envied Tom’s freedom","and admitted that he was bored with palace life."],
      ["In front of the mirror the boys realised","that they had exactly the same face."],
      ["They exchanged clothes as a game,","and neither of them imagined the consequences."],
      ["Before running out, Edward hid the Great Seal","inside an old suit of armour."]
    ],
    odd:[
      [["gate","door","entrance","mirror"],3,"A mirror is not a way in or out."],
      [["guard","soldier","servant","armour"],3,"Armour is an object, not a person."],
      [["identical","same","similar","opposite"],3,"Opposite breaks the series."],
      [["order","command","ask","tell"],2,"Ask is the only one without authority."],
      [["bored","confined","trapped","free"],3,"Free is the opposite of the others."]
    ],
    gaps:{ title:"Comparatives and superlatives", bank:["more beautiful","bigger","kinder","the most important","the worst","taller"],
      items:[
        ["Edward’s room was ___ than the one Tom shared with his family.","bigger"],
        ["“Your room is ___ than mine,” Tom admitted.","more beautiful"],
        ["Edward said that Lady Elizabeth was ___ than Lady Mary.","kinder"],
        ["Westminster was ___ palace in London.","the most important"],
        ["The guards were ___ than either of the two boys.","taller"],
        ["Later, at the banquet, Tom would have ___ table manners in England.","the worst"]
      ]},
    think:{ quote:"“Remember, my father is the king of rich people and poor people, too.”",
      question:"The guards are cruel to Tom; Edward reminds them that his father rules the poor as well. The King wants <b>equality</b> in his kingdom — all people count the same. Choose the best example of equality.",
      options:["The king talks to rich people and to poor people every day.","Rich people and poor people are equally important.","The king knows all the rich people and all the poor people in his kingdom."],
      answer:1,
      note:"Equality is not about the king’s diary or his memory: it is about whose life counts."},
    writing:[
      {task:"You are Tom, writing the same evening. Describe the hour you spent inside the palace.",target:"60–80 words",
       tips:["Begin at the gate and the blow on the head","Describe the food and the rooms","End with the mirror"],
       starters:["The guard hit me before I could even speak, and then…","Inside, everything was…","He asked me questions nobody has ever asked me, like…","When we stood in front of the mirror I…"]},
      {task:"Explain why Edward wants to exchange clothes. What is he really looking for?",target:"60–80 words",
       tips:["List what Edward has and cannot use","Contrast it with what Tom has","Use words like bored, confined, freedom"],
       starters:["Edward has five rooms, fine clothes and hundreds of servants, but…","What he does not have is…","When Tom describes the river, Edward…","The exchange is not about clothes at all: it is about…"]}
    ]},

  { n:3, title:"Lost in London", unit:3,
    sum:"In rags, Edward discovers that his authority was never in his face. Guards throw him out, a crowd mocks him, dogs chase him. A soldier just back from the wars, Miles Hendon, draws his sword for a boy he believes to be mad — and John Canty drags the little king away into the night.",
    vocab:[
      ["MOCK","to laugh at somebody in an unkind way"],
      ["CROWD","a large group of people gathered in one place"],
      ["RAGS","clothes that are old, torn and dirty"],
      ["DRAW A SWORD","to take a sword out of its case, ready to fight"],
      ["DEFEND","to protect somebody from attack"],
      ["MAD","mentally ill; insane"],
      ["INSIST","to say something firmly, again and again"],
      ["DIGNITY","calm, serious behaviour that earns respect"],
      ["MISTAKEN","wrong about something"],
      ["DELIVERER","a person who rescues somebody from danger"],
      ["THREATEN","to say you will hurt somebody"],
      ["DRAG","to pull something or somebody along with force"]
    ],
    comp:[
      ["Why do the palace guards throw Edward out?",["They recognise him","They see only a beggar’s clothes","They are following orders","The king told them to"],1,"They never look at his face — the whole novel is in that detail."],
      ["How does the crowd treat the boy?",["With pity","With mockery and laughter","With fear","With respect"],1,"The more he insists that he is the prince, the funnier they find him."],
      ["What is new for Edward in these streets?",["Being cold, hungry and disbelieved","Riding a horse","Talking to servants","Reading books"],0,"For the first time nothing he says has any power at all."],
      ["Who is Miles Hendon?",["A courtier","A soldier returning from the wars","A merchant","A priest"],1,"He has been away for years, fighting and imprisoned abroad."],
      ["Does Miles believe Edward’s story?",["Yes, at once","No — he thinks the boy’s mind is ill","Yes, because of the Seal","He never listens"],1,"And he defends him anyway, which is the point of his character."],
      ["Where does Miles take the boy?",["To the palace","To a small inn near London Bridge","To Hendon Hall","To the river"],1,"He gives him food and a bed and sits by the door."],
      ["Who is John Canty looking for?",["The prince","His son Tom","Miles Hendon","A thief"],1,"He is completely certain that the boy in rags is his own son."],
      ["What does Edward keep saying, even when it costs him?",["Nothing","That he is the King of England","That he is hungry","That he wants to go home"],1,"He never once denies who he is — that stubbornness is his dignity."]
    ],
    tf:[
      ["The palace guards looked closely at Edward’s face.",false,"They looked at his clothes, and that was enough for them."],
      ["Edward gave up claiming to be the prince.",false,"He insisted again and again, which is exactly why they laughed."],
      ["Miles Hendon had recently returned from abroad.",true,"He had spent years at war and in prison."],
      ["Miles believed the boy was the true prince.",false,"He believed the boy was ill, and helped him regardless."],
      ["Miles took Edward to an inn near London Bridge.",true,"There he gave him food and a warm bed."],
      ["John Canty realised that the boy was the king.",false,"He was sure the boy was his son Tom, and that he had lost his mind."]
    ],
    rw:[
      ["Miles Hendon and Edward went to an inn.",0,"Right — after escaping the crowd."],
      ["There were people in the street shouting “Long live King Edward!”",1,"Wrong — the crowd was laughing at him."],
      ["Edward was miserable because he was cold and hungry.",0,"Right — and because nobody believed a word he said."],
      ["Miles went to the market to buy new clothes for Edward.",2,"Doesn’t say in this chapter — that happens later."],
      ["John Canty took Edward to an old barn where there were beggars and thieves.",0,"Right — that was where his people slept."],
      ["The beggars at the barn were friendly to the boy.",1,"Wrong — they mocked him and called him ‘the mad king’."],
      ["Miles believed that Edward was the real prince.",1,"Wrong — he thought his mind was disturbed."],
      ["Miles had been imprisoned abroad for seven years.",0,"Right — that is why nobody at home expected him back."]
    ],
    halves:[
      ["The guards threw Edward out","because they judged him by his clothes."],
      ["The crowd laughed at the boy","every time he insisted that he was the prince."],
      ["For the first time in his life, Edward","was cold, hungry and completely powerless."],
      ["Miles Hendon drew his sword","and stood between the boy and the crowd."],
      ["Miles was convinced the boy was ill,","but he promised to protect him anyway."],
      ["He took the little king to an inn","and watched the door while he slept."],
      ["John Canty appeared out of the darkness","with a heavy stick in his hand."],
      ["Certain that the boy was his son,","Canty dragged him out of London."]
    ],
    odd:[
      [["mock","laugh","tease","defend"],3,"Defend is the only kind action."],
      [["sword","stick","knife","bread"],3,"Bread is not a weapon."],
      [["crowd","mob","group","street"],3,"A street is a place, not a group of people."],
      [["brave","loyal","cruel","generous"],2,"Cruel is the only negative quality."],
      [["inn","tavern","barn","hotel"],2,"A barn is for animals, not for guests."]
    ],
    opposites:[
      ["wealthy","poor"],["cheerful","miserable"],["cruel","kind"],["believe","doubt"],
      ["defend","attack"],["freedom","prison"],["polite","rude"],["truth","lie"],
      ["arrive","leave"],["remember","forget"]
    ],
    gaps:{ title:"Adverbs of manner", bank:["angrily","bravely","desperately","politely","quietly","loudly"],
      items:[
        ["The crowd laughed ___ at the boy in rags.","loudly"],
        ["Miles stepped forward ___ and drew his sword.","bravely"],
        ["“There is no supper for you tonight!” shouted Canty ___.","angrily"],
        ["Edward insisted ___ that he was the King of England.","desperately"],
        ["Miles answered the boy ___, as if he really were a king.","politely"],
        ["When the boy fell asleep, Miles sat ___ by the door.","quietly"]
      ]},
    think:{ quote:"Miles Hendon did not believe a word of the boy’s story — and he drew his sword for him anyway.",
      question:"Which sentence best describes what Miles does in this chapter?",
      options:["He helps somebody because he expects a reward.","He protects somebody who cannot protect himself, even though he doesn’t understand him.","He acts out of fear of the crowd."],
      answer:1,
      note:"His help costs him something and gains him nothing — which is why the little king never forgets it."},
    writing:[
      {task:"You are Edward, at the end of your first day in the streets. Write your account.",target:"60–80 words",
       tips:["Start with the gate and the guards","Describe the crowd","End with the stranger who defended you"],
       starters:["I told them who I was, and the gate closed in my face…","The crowd grew, and every word I said made them…","I had never been cold or hungry before, and…","Then a tall man stepped forward and…"]},
      {task:"Twain shows a crowd laughing at a child telling the truth. What is he saying about crowds?",target:"60–80 words",
       tips:["Describe what the crowd does","Explain why the truth sounds ridiculous to them","Connect it to something you have seen"],
       starters:["The crowd in this chapter behaves as though…","What makes the scene painful is that the boy…","Twain seems to suggest that a group of people…","We can still see this today when…"]}
    ]},

  { n:4, title:"The Royal Banquet", unit:4,
    sum:"At court everyone decides that the prince is ill rather than that the prince is a stranger. Tom is carried down the Thames to the Guildhall, drinks from a finger bowl in front of the nobility, and is corrected by nobody. Then he meets a dying king who asks for the one thing he cannot give: the Great Seal.",
    vocab:[
      ["COURT","the king and all the people who live and work around him"],
      ["NOBLE","a person of high social rank, close to the king"],
      ["BARGE","a large flat boat used for ceremonies on a river"],
      ["MANNERS","the socially accepted way of behaving"],
      ["FINGER BOWL","a small bowl of water for cleaning the fingers at table"],
      ["MERCY","kindness shown to somebody you have the power to punish"],
      ["AUTHORISE","to give official permission for something"],
      ["ANNOUNCE","to tell people something officially and publicly"],
      ["REIGN","the period during which a king or queen rules"],
      ["CEREMONY","a formal public event with fixed traditions"],
      ["CONCEAL","to hide something"],
      ["SUCCEED","to take the place of somebody in an official position"]
    ],
    comp:[
      ["How does the court explain Tom’s strange behaviour?",["They say he is an impostor","They say the prince is ill","They ignore it","They arrest him"],1,"It is easier for them to believe the prince has lost his memory than to doubt the clothes."],
      ["Where does the royal banquet take place?",["Westminster Palace","The Guildhall","Hendon Hall","The Tower"],1,"The court travels there by barge along the Thames."],
      ["What social mistake does Tom make at the table?",["He refuses to eat","He drinks from the finger bowl","He sits in the wrong place","He speaks to a servant"],1,"He also eats with his fingers and makes noise — and nobody reacts."],
      ["Why does nobody correct him?",["They do not notice","Because nobody corrects a prince","They find it funny","They are afraid of the king"],1,"Twain uses the silence for comedy and for criticism at the same time."],
      ["What is King Henry VIII like in this chapter?",["Cruel to his son","Frightening to others, gentle with Edward","Absent","Healthy and strong"],1,"The court trembles; the boy is treated with tenderness."],
      ["Why is the Great Seal so important?",["It is very valuable","No royal document is valid without it","It belongs to the queen","It opens the treasury"],1,"Without it, the king cannot authorise the document he needs."],
      ["What does Tom answer when asked where the Seal is?",["He tells the truth","That he cannot remember","That he never had it","That the queen has it"],1,"It is the safest answer he can give — and it deepens the crisis."],
      ["What does Tom ask the king for, and what does it show?",["Money — that he is greedy","Mercy for a prisoner — that he remembers the poor","Freedom — that he is afraid","A horse — that he is a child"],1,"It is the first hint that a pauper might make a decent king."]
    ],
    tf:[
      ["The court concluded that the prince had lost his memory.",true,"Illness was easier to believe than substitution."],
      ["Tom behaved perfectly at the royal banquet.",false,"He drank from the finger bowl and ate with his fingers."],
      ["A noble corrected Tom’s table manners in public.",false,"Nobody said a word."],
      ["King Henry VIII was gentle with the boy he believed to be his son.",true,"He was feared by everyone else, but tender with Edward."],
      ["Tom knew what the Great Seal was.",false,"He had never seen it and had no idea of its purpose."],
      ["Tom asked the king to show mercy to a prisoner.",true,"And the king granted it."]
    ],
    rw:[
      ["At seven in the evening the royal barge moved down the Thames.",0,"Right — that is how the court travelled to the Guildhall."],
      ["The royal banquet was held at the Guildhall.",0,"Right — in honour of King Henry VIII."],
      ["A large crowd killed Father Andrew.",2,"Doesn’t say — Father Andrew does not appear in this chapter."],
      ["At the banquet Tom sat next to King Henry.",1,"Wrong — the king was too ill to attend."],
      ["There were exactly one hundred guests at the banquet.",2,"Doesn’t say — the number is never given."],
      ["Lord Hertford announced that King Henry was dead.",0,"Right — and the succession was proclaimed immediately."],
      ["King Henry was anxious because the Great Seal could not be found.",0,"Right — he needed it to authorise a document."],
      ["Tom asked for mercy for a man he had never met.",0,"Right — his first genuinely royal act."]
    ],
    halves:[
      ["The court decided that the prince was ill","rather than admit that he might not be the prince."],
      ["The royal barge carried Tom down the Thames","to the banquet at the Guildhall."],
      ["Tom drank from the finger bowl","and not one of the nobles said a word."],
      ["Twain uses the silence of the court","to make us laugh and to make us think."],
      ["King Henry was feared by the whole kingdom","and gentle only with his son."],
      ["No royal document was valid","without the Great Seal."],
      ["Tom said he could not remember where the Seal was","because he had never seen it in his life."],
      ["Before leaving, Tom asked for mercy","for a prisoner he had never met."]
    ],
    odd:[
      [["crown","seal","sceptre","banquet"],3,"A banquet is an event, not an object of state."],
      [["noble","lord","courtier","servant"],3,"A servant does not belong to the nobility."],
      [["announce","proclaim","declare","conceal"],3,"Conceal means to hide — the opposite."],
      [["reign","rule","govern","obey"],3,"Obey is what subjects do, not kings."],
      [["barge","boat","ship","carriage"],3,"A carriage travels on land."]
    ],
    gaps:{ title:"Prepositions of time and place", bank:["at","on","in","from","after","into"],
      items:[
        ["During the banquet Tom sat ___ the head of a long table.","at"],
        ["The shops were closed because nobody worked ___ Sunday.","on"],
        ["The ceremony began ___ the evening.","in"],
        ["“This letter is ___ the French ambassador,” said Lord Hertford.","from"],
        ["The court returned to the palace ___ the banquet.","after"],
        ["Edward had pushed the Seal ___ an old suit of armour.","into"]
      ]},
    think:{ quote:"Tom is terrified at the banquet — and he still asks the dying king for mercy for a stranger.",
      question:"Tom has no power, no education and no allies at court. Why does he ask for mercy anyway?",
      options:["Because he wants the nobles to approve of him.","Because he knows from the inside what it is to be poor and afraid.","Because the king ordered him to."],
      answer:1,
      note:"Twain plants the argument of the whole novel here: experience, not birth, is what makes a just ruler."},
    writing:[
      {task:"You are a noble who attended the banquet. Write a private letter about the prince’s behaviour.",target:"60–80 words",
       tips:["Describe one or two mistakes precisely","Explain why nobody intervened","Keep the tone discreet — you are writing about your future king"],
       starters:["I must write down what I saw last night at the Guildhall…","When the finger bowl was placed before him, His Highness…","Naturally, nobody said anything, because…","I confess that I begin to wonder whether…"]},
      {task:"Twain makes the banquet funny and frightening at the same time. Explain how.",target:"60–80 words",
       tips:["Identify what is comic","Identify what is disturbing","Say what the silence of the nobles really means"],
       starters:["The comedy of the scene comes from…","What is frightening, however, is that…","The silence of the court shows that…","Twain lets us laugh and then makes us…"]}
    ]},

  { n:5, title:"Long Live King Edward!", unit:5,
    sum:"Miles finds the boy again and plays along with his story — and then stops playing. He serves him standing at table, is knighted for it, and is granted the right to sit in the king’s presence. But while Miles is buying him decent clothes, a false message takes the little king back into John Canty’s hands.",
    vocab:[
      ["KNIGHT","a man given an honorary military rank and the title ‘Sir’"],
      ["PRESENCE","the fact of being in the same place as somebody"],
      ["GRANT","to give something formally, especially a right"],
      ["ATTEND","to be present and to serve or accompany somebody"],
      ["WEARY","very tired"],
      ["HUMOUR SOMEBODY","to accept somebody’s strange idea in order to please them"],
      ["ERRAND","a short journey to do a small job for somebody"],
      ["DECEIVE","to make somebody believe something that is not true"],
      ["VANISH","to disappear suddenly and completely"],
      ["PURSUE","to follow somebody in order to catch them"],
      ["OATH","a serious formal promise"],
      ["DEVOTION","great love and loyalty towards somebody"]
    ],
    comp:[
      ["Why does Miles remain standing while the boy eats?",["He is not hungry","Because the boy tells him a king eats alone","He is being punished","There is only one chair"],1,"Miles humours him — and then keeps doing it long after the joke should have ended."],
      ["What does the boy give Miles in return?",["Money","A knighthood","A horse","A letter"],1,"“Rise, Sir Miles Hendon.”"],
      ["What is the second, stranger gift?",["Land","The right for him and his family to sit in the king’s presence","A command in the army","A house in London"],1,"A right that costs the boy nothing now and everything later — and he honours it."],
      ["Why does Miles go out to the market?",["To sell his sword","To buy the boy proper clothes","To find John Canty","To look for work"],1,"The little king is still dressed in Tom Canty’s rags."],
      ["How is the boy lured out of the inn?",["He is dragged out","By a false message saying Miles is waiting","He leaves on his own","The innkeeper sends him away"],1,"The deception is what makes it work."],
      ["Who is waiting outside?",["Lord Hertford","Father Andrew","John Canty","The guards"],2,"He has been following the boy since the night of the barn."],
      ["What does Miles find when he returns?",["The boy asleep","An empty room","A message","The guards"],1,"He stands in the doorway for a long time, then goes out to search again."],
      ["What does Miles’s behaviour in this chapter show?",["That he is easily fooled","That his loyalty is not conditional on belief","That he wants a reward","That he is afraid of the boy"],1,"He keeps a promise made to a story he does not accept."]
    ],
    tf:[
      ["Miles took Edward back to Westminster Palace.",false,"He took him back to the inn."],
      ["Miles sat down and ate with the boy immediately.",false,"He stood and served him, because a king eats alone."],
      ["Edward knighted Miles Hendon.",true,"“Rise, Sir Miles Hendon.”"],
      ["The right to sit in the king’s presence was granted to Miles and his family.",true,"And Edward keeps that promise in the final chapter."],
      ["Miles went out to buy food.",false,"He went to buy clothes; the boy was still in rags."],
      ["The boy left the inn because he was deceived.",true,"He was told that Miles was waiting for him by the river."]
    ],
    rw:[
      ["Miles took Edward to an old barn where they slept.",1,"Wrong — they stayed at an inn."],
      ["Miles believed that Edward was the real prince.",1,"Wrong — he still thought the boy’s mind was disturbed."],
      ["Edward was pleased because he had new clothes to wear.",2,"Doesn’t say — the clothes are bought, but the boy is taken before he wears them."],
      ["Miles went to the market to buy new clothes for Edward.",0,"Right — the rags were impossible."],
      ["Miles wanted to find a way to get Edward back to Westminster Palace.",0,"Right — that was his plan from the start."],
      ["The inn was near London Bridge.",0,"Right — that is where Miles took him."],
      ["Edward slept for two whole days at the inn.",2,"Doesn’t say — only that he was exhausted and slept."],
      ["A false message was used to get the boy out of the inn.",0,"Right — he was told Miles was waiting for him."]
    ],
    halves:[
      ["Miles searched for two days and two nights","before he found the boy again."],
      ["Because the boy said that a king eats alone,","Miles stood and served him at table."],
      ["Moved by his kindness,","the little king knighted Miles Hendon."],
      ["From that day Sir Miles and his family","had the right to sit in the king’s presence."],
      ["Miles was exhausted and penniless,","but he did not sit down until he was told he could."],
      ["The next morning Miles went to the market","to buy the boy decent clothes."],
      ["A false message told the boy","that Miles was waiting for him by the river."],
      ["Miles returned to an empty room","and immediately went out to search again."]
    ],
    odd:[
      [["knight","soldier","captain","market"],3,"A market is a place, not a rank."],
      [["weary","exhausted","tired","alert"],3,"Alert is the opposite of the others."],
      [["deceive","lie","trick","promise"],3,"A promise is meant to be honest."],
      [["vanish","disappear","hide","arrive"],3,"Arrive is the opposite movement."],
      [["devotion","loyalty","faithfulness","betrayal"],3,"Betrayal breaks the series."]
    ],
    wordform:[
      ["loyalty","loyal"],["kindness","kind"],["courage","courageous"],["poverty","poor"],
      ["hunger","hungry"],["strength","strong"],["truth","true"],["danger","dangerous"]
    ],
    gaps:{ title:"Past simple — irregular verbs", bank:["took","stood","gave","knelt","went","found"],
      items:[
        ["Miles ___ the boy back to the inn near London Bridge.","took"],
        ["He ___ beside the chair while the little king ate.","stood"],
        ["Edward ___ him the title of knight.","gave"],
        ["Miles ___ down and rose again as Sir Miles Hendon.","knelt"],
        ["The next morning he ___ to the market.","went"],
        ["When he came back he ___ the room empty.","found"]
      ]},
    think:{ quote:"“A king cannot give what he does not have, so I will give you this: you and your family may sit in the presence of the King of England — forever.”",
      question:"Edward has no palace, no money and no crown. What is he actually giving Miles?",
      options:["Payment for the food and the room.","Respect now, and a promise for a future he cannot guarantee.","A joke to lighten the mood."],
      answer:1,
      note:"And in the last chapter he keeps it — which turns a child’s game into the moral centre of the book."},
    writing:[
      {task:"You are Miles Hendon. Write your private thoughts after the boy has fallen asleep.",target:"60–80 words",
       tips:["Say what you actually believe about him","Say why you keep serving him anyway","Include the knighting"],
       starters:["The child sleeps as if the room belonged to him…","I do not believe one word of it, and yet…","When he told me to rise as Sir Miles Hendon, I…","Tomorrow I shall buy him clothes, because…"]},
      {task:"Explain what kind of loyalty Miles shows. Is loyalty stronger when you don’t believe the person?",target:"60–80 words",
       tips:["Give two examples from the chapter","Distinguish believing from protecting","End with your own opinion"],
       starters:["Miles is loyal to a story he considers impossible, which…","For example, when the boy orders him to…","Believing somebody and protecting them are…","In my view, this kind of loyalty is…"]}
    ]},

  { n:6, title:"The Whipping Boy", unit:6,
    sum:"Tom learns the trade of kingship: the gold chair, the Council, documents he cannot read. Then Humphrey Marlow appears — the boy who is beaten whenever the prince makes a mistake. Humphrey teaches Tom the court, Tom gives Humphrey a friend, and the new king makes his first real decision.",
    vocab:[
      ["COUNCIL","the group of advisers who help a ruler govern"],
      ["TREASURY","the money and finances of a state"],
      ["SIGN","to write your name on a document to make it official"],
      ["WHIPPING BOY","a boy punished in place of a prince who could not be struck"],
      ["PUNISHMENT","something unpleasant done to somebody because of a fault"],
      ["ROUTINE","the fixed order in which you do things every day"],
      ["DISMISS","to send somebody away from their job"],
      ["CONFIDE","to tell somebody a secret you trust them with"],
      ["INJUSTICE","a situation in which people are not treated fairly"],
      ["ETIQUETTE","the formal rules of correct behaviour in society"],
      ["REFORM","to change something in order to improve it"],
      ["PRIVILEGE","a special advantage available only to some people"]
    ],
    comp:[
      ["What does Tom’s morning routine at the palace involve?",["Nothing formal","Several gentlemen helping him dress, then the Council","Lessons only","Riding"],1,"Even getting dressed is a public ceremony."],
      ["What is Tom’s difficulty with the documents?",["They are in French","He can barely read them and understands nothing","There are too many","They are secret"],1,"He signs a name that is not his, on decisions he cannot judge."],
      ["Who is Humphrey Marlow?",["A servant","The prince’s whipping boy","A young lord","A teacher"],1,"He is beaten in place of the prince, who cannot be touched."],
      ["Why did the position of whipping boy exist?",["Because princes were fragile","Because nobody was allowed to strike a prince","As a game","To train soldiers"],1,"A real Tudor custom, and a perfect image of inherited privilege."],
      ["Why is Humphrey desperate to keep the job?",["He enjoys it","His family is poor and depends on the wages","He loves the prince","He has nowhere to live"],1,"Twain makes the injustice worse: the victim needs the injustice."],
      ["What does Humphrey give Tom in exchange?",["Money","All the information he needs to pass as the prince","Protection","Books"],1,"Names, rules, habits — the court decoded."],
      ["How does Tom react to the whipping?",["He accepts it as normal","He is shocked and decides to end it","He laughs","He ignores it"],1,"His first genuine act of government."],
      ["Why is Tom bored despite the luxury?",["He misses his father","He has comfort but no freedom or purpose","He is ill","He dislikes the food"],1,"Twain refuses to let the palace be simply a reward."]
    ],
    tf:[
      ["Tom was dressed by several gentlemen each morning.",true,"Two stood by his bed and three helped him dress."],
      ["Tom understood the documents he signed.",false,"He understood almost nothing of them."],
      ["Humphrey was punished for the prince’s mistakes.",true,"That was precisely his function at court."],
      ["Humphrey wanted to be dismissed.",false,"He was terrified of losing the job."],
      ["Humphrey taught Tom how to behave like the prince.",true,"That is how the impersonation survived."],
      ["Life at the palace made Tom completely happy.",false,"He had everything and was bored."]
    ],
    rw:[
      ["Tom woke at eight o’clock with two gentlemen beside his bed.",0,"Right — that is the routine described."],
      ["Three gentlemen helped Tom to get dressed.",0,"Right."],
      ["Tom sat on the king’s gold chair in the Council Chamber.",0,"Right — after breakfast."],
      ["Tom was told that there was no money left because Henry VIII had spent it.",0,"Right — and Tom’s joke about it fell flat."],
      ["Humphrey Marlow did not want to lose his job because he was poor.",0,"Right — his family depended on it."],
      ["Humphrey was thirteen years old.",2,"Doesn’t say — his age is never given."],
      ["Lord Hertford asked Tom where the Great Seal was.",0,"Right — and Tom still could not answer."],
      ["Tom told Humphrey the truth about who he really was.",1,"Wrong — that is the one secret he cannot share."]
    ],
    halves:[
      ["Every morning several gentlemen","helped the new king to dress."],
      ["In the Council Chamber Tom sat","on the king’s gold chair and listened to the lords."],
      ["He signed documents","whose contents he could not understand."],
      ["Humphrey Marlow was beaten","whenever the prince made a mistake in his lessons."],
      ["Nobody was permitted to strike a prince,","and that is why the position existed at all."],
      ["Humphrey was desperate to keep the job","because his family depended on the wages."],
      ["In return, Humphrey taught Tom","the names, rules and habits of the court."],
      ["Surrounded by luxury,","Tom was bored and homesick."]
    ],
    odd:[
      [["council","court","chamber","market"],3,"A market has no place in royal government."],
      [["strike","beat","whip","protect"],3,"Protect is the opposite action."],
      [["injustice","unfairness","inequality","privilege"],3,"Privilege is the advantage, not the wrong."],
      [["sign","write","read","ride"],3,"Ride is not done with a pen."],
      [["routine","habit","custom","accident"],3,"An accident is precisely what is not repeated."]
    ],
    gaps:{ title:"Adverbs formed from adjectives", bank:["angrily","happily","immediately","nervously","slowly","well"],
      items:[
        ["“I can explain, Your Majesty,” said Humphrey ___.","nervously"],
        ["The old beggar walked ___ because he was exhausted.","slowly"],
        ["Tom and his friends had played ___ by the river.","happily"],
        ["“There is no supper for you tonight!” said John Canty ___.","angrily"],
        ["The servants obeyed the new king ___.","immediately"],
        ["Thanks to Father Andrew, Tom could read remarkably ___.","well"]
      ]},
    think:{ quote:"Every time the prince made a mistake, the teacher beat Humphrey and not the prince.",
      question:"The whipping boy was a real Tudor custom. What does it reveal about that society?",
      options:["It is fair, because Humphrey was paid.","It is unfair: the person who makes the mistake is not the person who pays for it.","It is unfair only because Humphrey was a child."],
      answer:1,
      note:"Tom recognises it instantly — he is the only person at court who has been beaten for nothing."},
    writing:[
      {task:"You are Humphrey Marlow. Explain your job and your feelings about it.",target:"60–80 words",
       tips:["Explain the custom clearly","Say what you feel and what you cannot say aloud","Explain why you still want the job"],
       starters:["My position at court is easily described: when the prince errs, I…","I have learned not to show what I feel, because…","People assume I must hate him, but…","If I were dismissed, my family would…"]},
      {task:"Tom has everything at the palace and is still unhappy. What does this tell us about wealth?",target:"60–80 words",
       tips:["List what he has","Identify precisely what is missing","Give your own opinion"],
       starters:["Tom now has food, warmth and expensive clothes, and yet…","What the palace cannot give him is…","Twain is careful not to make the palace…","In my opinion, this suggests that…"]}
    ]},

  { n:7, title:"Surprise at Hendon Hall", unit:7,
    sum:"Miles brings the boy home after seven years away — and is met by a brother who says he has never seen him, and by the woman he loved, who says the same. Declared a thief, he is thrown into prison with the little king, who at last sees his own laws from below. Then come the stocks.",
    vocab:[
      ["INHERIT","to receive money or property from somebody who has died"],
      ["DISOWN","to say publicly that somebody is not a member of your family"],
      ["ESTATE","a large area of land with a big house on it"],
      ["ACCUSE","to say that somebody has done something wrong"],
      ["IMPOSTOR","a person who pretends to be somebody else"],
      ["MAGISTRATE","an official who judges minor cases in court"],
      ["SENTENCE","the punishment given by a court"],
      ["STOCKS","a wooden frame that held a person’s feet in a public place"],
      ["INJUSTICE","unfair treatment, especially by those with power"],
      ["WITNESS","a person who sees something happen and can describe it"],
      ["BETRAY","to hurt somebody who trusts you"],
      ["ENDURE","to suffer something difficult patiently"]
    ],
    comp:[
      ["Where does Miles take the boy in this chapter?",["To France","To Hendon Hall, his family home","Back to London","To a monastery"],1,"He has not seen it for seven years."],
      ["What has Hugh told everyone in Miles’s absence?",["That he was rich","That he was dead","That he had married","That he was a traitor"],1,"A lie that allowed him to inherit everything."],
      ["What has Hugh done with the estate?",["Sold it","Taken the house, the land and the money","Given it to the king","Abandoned it"],1,"And he has married Lady Edith as well."],
      ["How does Hugh receive his brother?",["With joy","He claims not to know him","With fear","He runs away"],1,"“I don’t know this man.”"],
      ["What does Lady Edith do?",["She recognises him publicly","She denies knowing him and leaves quickly","She attacks Hugh","She helps Miles escape"],1,"Twain gives her one long second of hesitation — enough for the reader to understand."],
      ["What happens to Miles and the boy?",["They escape","They are imprisoned","They are sent abroad","They are pardoned"],1,"Accused as a thief and a madman."],
      ["What does the king learn in prison?",["That prisons should be larger","How his own laws punish the poor","That Hugh is guilty","How to escape"],1,"He hears the cases of people ruined by small offences."],
      ["What does the boy do when Miles is put in the stocks?",["He runs away","He stands beside him all day","He calls the guards","He goes back to London"],1,"The scene that binds them permanently."]
    ],
    tf:[
      ["Hendon Hall belonged to Miles’s family.",true,"He had grown up there before going to the wars."],
      ["Hugh welcomed his brother home.",false,"He denied knowing him and called the soldiers."],
      ["Hugh had taken the house, the land and the money.",true,"He did it while everyone believed Miles was dead."],
      ["Lady Edith had married Miles.",false,"She had married Hugh."],
      ["Miles and the boy were sent to prison.",true,"Accused of being a thief and a madman."],
      ["The little king abandoned Miles in the stocks.",false,"He stayed beside him all day."]
    ],
    rw:[
      ["Hendon Hall was a small house near the Thames.",1,"Wrong — it was a large old country house."],
      ["Hendon Hall was built one hundred years ago.",2,"Doesn’t say — its age is never given."],
      ["Hugh Hendon was Miles’s brother.",0,"Right — his younger brother."],
      ["Hugh was a friendly man.",1,"Wrong — he disowned his brother and had him imprisoned."],
      ["Miles spent seven years away from England.",0,"Right — at war and then imprisoned abroad."],
      ["Hugh took Miles’s land, money and home.",0,"Right — during his absence."],
      ["Lady Edith married Hugh while Miles was away.",0,"Right — and she denies knowing Miles when he returns."],
      ["Miles and Edward stayed in a terrible prison for exactly one month.",2,"Doesn’t say — many days, but the number is not given."]
    ],
    halves:[
      ["Miles returned to Hendon Hall","after seven years of war and imprisonment."],
      ["In his absence Hugh had told everybody","that his brother was dead."],
      ["That lie allowed Hugh","to inherit the house, the land and the money."],
      ["Lady Edith, the woman Miles had loved,","had married his brother."],
      ["When Miles announced himself, Hugh replied","that he had never seen the man before."],
      ["Accused of being a thief,","Miles was thrown into prison with the boy."],
      ["In prison the little king heard","how his own laws crushed the poor."],
      ["When the soldiers put Miles in the stocks,","the boy stood beside him and refused to move."]
    ],
    odd:[
      [["magistrate","judge","court","barn"],3,"A barn has nothing to do with the law."],
      [["inherit","receive","obtain","betray"],3,"Betray does not belong to the vocabulary of property."],
      [["accuse","blame","charge","defend"],3,"Defend is the opposite action."],
      [["estate","manor","hall","street"],3,"A street is not a private property."],
      [["endure","suffer","bear","enjoy"],3,"Enjoy breaks the series."]
    ],
    gaps:{ title:"Past simple and past perfect", bank:["had told","took","had married","was","put","had never seen"],
      items:[
        ["Hugh ___ everybody that his brother was dead.","had told"],
        ["The soldiers ___ Miles outside the building.","took"],
        ["Lady Edith ___ Hugh while Miles was at the war.","had married"],
        ["They ___ him in the stocks in front of the whole village.","put"],
        ["Miles ___ accused of being a thief in his own house.","was"],
        ["Hugh said that he ___ the man before.","had never seen"]
      ]},
    think:{ quote:"In prison the little king saw, for the first time, what his own laws did to poor people.",
      question:"Edward has approved laws all his life without ever seeing them applied. What is Twain arguing here?",
      options:["That prisons should be more comfortable.","That whoever makes the rules should know what they do to the people who live under them.","That Hugh Hendon is an unusually bad man."],
      answer:1,
      note:"This is the reason Twain sends a king into the streets at all: a ruler who has never been powerless cannot know."},
    writing:[
      {task:"You are Miles Hendon, arriving at Hendon Hall after seven years. Write what happens.",target:"60–80 words",
       tips:["Describe your expectations on the road","Describe the moment Hugh speaks","End with Lady Edith"],
       starters:["For seven years I had imagined this door…","I said my own name aloud, and my brother answered that…","Then Edith came in, looked at me for one second, and…","I understood everything in that second, because…"]},
      {task:"Is Lady Edith guilty, a victim, or both? Argue your position.",target:"60–80 words",
       tips:["Describe exactly what she does","Consider what power she has in that house","Use however and although"],
       starters:["Edith denies knowing the man she once loved, which…","However, we should ask what would happen to her if…","Although her words are a betrayal, her situation…","On balance, I would say that she is…"]}
    ]},

  { n:8, title:"The Great Seal", unit:8,
    sum:"Coronation Day. Tom rides through London, denies his own mother, and is carrying that shame when the Archbishop lifts the crown above his head — and a boy in rags shouts from the doorway. One question decides everything, and the pauper who could have kept a kingdom gives it back.",
    vocab:[
      ["CORONATION","the ceremony at which a monarch is crowned"],
      ["ABBEY","a large and important church, often attached to a monastery"],
      ["ARCHBISHOP","the most senior bishop of a country"],
      ["PROCESSION","a formal line of people moving through the streets"],
      ["ASHAMED","feeling bad about something you have done"],
      ["PROVE","to show with evidence that something is true"],
      ["EVIDENCE","facts or objects that show whether something is true"],
      ["RESTORE","to give something back to its rightful owner"],
      ["MERCIFUL","willing to forgive rather than punish"],
      ["REWARD","something given to somebody for what they have done"],
      ["LEGITIMATE","legally correct; having a proper right"],
      ["REIGN","to rule as a king or a queen"]
    ],
    comp:[
      ["What happens when Tom sees his mother in the crowd?",["He greets her","He denies knowing her and is immediately ashamed","He stops the procession","He does not see her"],1,"The single moment where Twain lets his pauper fail."],
      ["At what point does Edward reach the Abbey?",["Before the ceremony","As the crown is being lifted","After the crowning","The next day"],1,"Twain places him at the last possible second."],
      ["What is the nobles’ first reaction?",["They kneel","They move to remove the intruder","They laugh","They call the queen"],1,"A boy in rags claiming a crown — they have seen this all book long."],
      ["What does Tom do?",["Nothing","He declares that the boy is the true king","He runs away","He orders his arrest"],1,"He then kneels to a boy in rags in front of the entire court."],
      ["What question settles the matter?",["“What is your name?”","“Where is the Great Seal?”","“Who was your mother?”","“Where were you born?”"],1,"Only the true prince can answer it."],
      ["Where was the Seal all along?",["In the treasury","Inside the old suit of armour","With the Archbishop","In Offal Court"],1,"Exactly where Edward hid it in chapter 2."],
      ["What had Tom used it for?",["Signing documents","Cracking nuts","Nothing at all","Paying debts"],1,"The joke that releases the tension of the whole novel."],
      ["How does Edward reign afterwards?",["Harshly","Mercifully, reforming the laws he saw from below","Briefly and badly","He abdicates"],1,"He was king for six years and died at sixteen."]
    ],
    tf:[
      ["London was empty on Coronation Day.",false,"The whole city came out for the procession."],
      ["Tom recognised his mother publicly.",false,"He said, “I don’t know you, woman” — and was ashamed all day."],
      ["Edward interrupted the ceremony at the last moment.",true,"The crown was already above Tom’s head."],
      ["Tom kept the crown by staying silent.",false,"He declared that the boy in rags was the true king."],
      ["The Great Seal was found inside a suit of armour.",true,"Where Edward had hidden it before running out."],
      ["Edward rewarded Tom and Miles at the end.",true,"Tom’s family was provided for and Sir Miles kept his privilege."]
    ],
    rw:[
      ["Coronation Day was on 20 February.",0,"Right — the date given for the ceremony."],
      ["Edward ran into Westminster Abbey and declared himself king.",0,"Right — at the final moment of the ceremony."],
      ["Lord Hertford was astonished to see that the two boys were identical.",0,"Right — the resemblance is complete."],
      ["Edward said the Great Seal was under his bed.",1,"Wrong — inside an old suit of armour."],
      ["Tom returned to Pudding Lane, where his mother, grandmother and sisters lived.",0,"Right — and the new king looked after them."],
      ["Edward proved his identity by naming the hiding place of the Great Seal.",0,"Right — the one fact luck could not supply."],
      ["There were three thousand people inside the Abbey.",2,"Doesn’t say — no number is given."],
      ["Hugh Hendon was ordered to restore everything to Sir Miles.",0,"Right — by order of the new king."]
    ],
    halves:[
      ["All London came out into the streets","because the twentieth of February was Coronation Day."],
      ["When Tom saw his mother in the crowd,","he denied knowing her and was ashamed all day."],
      ["Just as the Archbishop lifted the crown,","a boy in rags cried out from the doorway."],
      ["The nobles moved to seize the intruder,","but Tom ordered them to let him go."],
      ["Lord Hertford asked the one question","that only the true prince could answer."],
      ["The Great Seal was found","inside the old suit of armour in the prince’s room."],
      ["Tom confessed that he had used the Seal","to crack nuts, because he did not know what it was."],
      ["Edward reigned mercifully for six years","and England never forgot him."]
    ],
    odd:[
      [["crown","throne","sceptre","abbey"],3,"An abbey is a building, not a royal object."],
      [["archbishop","bishop","priest","magistrate"],3,"A magistrate belongs to the law, not the church."],
      [["prove","demonstrate","show","doubt"],3,"Doubt is the opposite of proving."],
      [["merciful","forgiving","generous","cruel"],3,"Cruel breaks the series."],
      [["restore","return","give back","steal"],3,"Steal is the opposite action."]
    ],
    gaps:{ title:"Narrative tenses", bank:["was lifting","cried","had hidden","became","knelt","had used"],
      items:[
        ["The Archbishop ___ the crown when the doors opened.","was lifting"],
        ["A boy in rags ___ out that the crown was his.","cried"],
        ["Edward ___ the Great Seal inside a suit of armour weeks before.","had hidden"],
        ["Tom ___ in front of the boy in rags.","knelt"],
        ["Edward ___ King of England that same day.","became"],
        ["Tom admitted that he ___ the Seal to crack nuts.","had used"]
      ]},
    think:{ quote:"Tom could have kept the crown by saying nothing. He said one sentence instead.",
      question:"Tom is one second away from being King of England for life. Why does he tell the truth?",
      options:["Because he is afraid of being discovered later.","Because he knows exactly what it is to have nothing, and he cannot do that to Edward.","Because he dislikes being king."],
      answer:1,
      note:"Twain gives the last decision of the novel to the pauper on purpose: the palace could teach Tom etiquette, but not this."},
    writing:[
      {task:"You were inside Westminster Abbey. Write an eyewitness account of the interruption.",target:"60–80 words",
       tips:["Begin with the crown in the air","Describe the boy at the door and the reaction","End with the question about the Seal"],
       starters:["The Archbishop had raised the crown when a voice…","In the doorway stood a boy so ragged that…","The nobles moved at once, but then the young king…","Everything turned on a single question:…"]},
      {task:"After the streets, the prison and the stocks, what kind of king will Edward be? Justify your answer.",target:"60–80 words",
       tips:["Name two things he saw that a king normally never sees","Say what he does for Tom, Miles and the laws","Use will and because"],
       starters:["Edward returns to the throne having seen…","Unlike his father, he knows what a law feels like when…","He proves it immediately by…","For that reason I believe his reign will be…"]}
    ]}
];

const READINGS = {
1:[
"In the ancient city of London, on a certain autumn day in the second quarter of the sixteenth century, a boy was born to a poor family of the name of Canty, who did not want him. On the same day another English child was born to a rich family of the name of Tudor, who did want him. All England wanted him too.",
"The Canty family lived in a single room in Offal Court, a foul little pocket of streets near Pudding Lane, not far from the River Thames. When Tom’s father saw the baby he did not smile. “Another mouth,” he said, “and not a penny in the house to feed it.”",
"The other baby was Edward Tudor, Prince of Wales, and he was born at Westminster Palace. King Henry VIII already had two daughters, Mary and Elizabeth, from two different marriages, but the Tudor throne needed a son. When his third wife, Jane Seymour, gave him one, the king ordered banquets and fireworks, and for several days the whole country celebrated a child it would never meet.",
"By the age of ten Tom Canty was begging in the streets of London. He had no shoes. His clothes were the same clothes he had worn the year before, and they were filthy.",
"He lived with his mother, his father, his grandmother and his two sisters, Bet and Nan. The children slept on the floor and were hungry almost every day of their lives. John Canty never worked and never intended to.",
"“Go and beg,” he told his son every morning, “and bring the money home.” Some days people were sorry for the thin boy and gave him a coin. On the other days John Canty was waiting, and Tom learned to know from the door what kind of evening it was going to be.",
"And still, in the middle of that, Tom thought: “I do not want to be poor for ever. I want to read and write. I want to know what the world is.”",
"Father Andrew was the reason he could think it at all. He was an old priest who lived nearby, as poor as the Cantys and considerably kinder, and one morning Tom knocked on his door and asked whether a beggar could learn to read.",
"“Of course he can,” said Father Andrew. “Come early, before the streets are awake.”",
"So Tom learned his letters at a table with one candle on it, and then he learned to write, and then, because the old man had a shelf of books and no reason to keep them shut, Tom learned about knights, and castles, and kings, and courts. At night, on the cold floor, he dreamed about them.",
"His friends in Offal Court noticed. When the boys played at princes by the river, Tom was always the prince — he knew how a prince should stand, and how a prince should speak, which none of them did. They laughed at him and called him ‘Prince Tom’, and the name stuck.",
"One morning Father Andrew closed his book and looked at him. “I have an idea, Tom,” he said. “Why don’t you go up to Westminster Palace and see the real prince? They say he rides out. Perhaps you will see him. Perhaps you will even meet him.”",
"Tom did not sleep much that night."
],
2:[
"The next day Tom went to Westminster Palace. He stood outside the great gate for a long time and looked through the bars at a building so large that he could not hold all of it in his head at once. Two tall soldiers stood on either side of the gate and did not look at him.",
"He went back the following day, and the day after that. He saw important people arriving and leaving, in clothes that cost more than his street, but he never saw the prince.",
"Then, after several days, he saw him. A slight boy in fine clothes and good shoes came out into the courtyard, and Tom forgot every rule he had ever learned about not being noticed. He ran to the gate and pressed his face against the bars.",
"“Get back!” cried a soldier, and struck him on the side of the head. Tom sat down hard on the stones. And the boy in the courtyard turned round.",
"“Do not strike that poor lad!” said the prince. “Open the gate and let him in.” “He is only a dirty little beggar, sir,” said the soldier. The prince looked at him steadily. “Remember that my father is king of the poor as well as the rich. Open the gate.” The soldier opened the gate.",
"Inside, Tom walked up a staircase wider than his room and along corridors hung with paintings of people who had all, apparently, been somebody. When they reached the prince’s apartments, Edward called for food, and a servant brought meat, cheese, fruit, cakes and a tall glass of milk. Tom had never seen that much food in one place in his life. He ate quickly, because he had learned that food does not always stay where you leave it.",
"“What is your name?” asked the prince. “Tom Canty, sir.” “Mine is Edward. Where do you live?” “In a room near Pudding Lane, with my family.” “In one room? All of you?” “Yes, sir. It is a small room. Yours is more beautiful than mine.”",
"“I have two sisters,” said the prince, “Lady Elizabeth and Lady Mary. Elizabeth is fourteen and she is kind. And a cousin, Lady Jane Grey, who is my own age. Do you play with other boys?” “Of course I do,” said Tom. “We swim in the river and jump in the mud. Our clothes get filthy, but it is the best thing in the world.”",
"“How wonderful,” said the prince, and there was nothing polite about the way he said it. “I want to swim in a river. I want to be dirty once in my life. I want to shout in a street. But I cannot, because I am a prince, and I must stay in the palace, and I am terribly bored.”",
"They looked at one another, two boys who had each spent the morning envying a life they had never seen. Then Edward said, “Wait. Come and look in the mirror.”",
"They stood side by side in front of the glass and stopped talking. The same height. The same thin shoulders. The same brown hair, the same brown eyes, the same mouth. “You are like me,” said Tom at last, “and I am like you.”",
"“Then we shall play a game,” said Edward. “Change clothes with me. You be the prince and I shall be the pauper, for an hour.” Tom washed his face and hands and put on the prince’s clothes and shoes; Edward pulled on Tom’s old shirt and trousers. They looked in the mirror again and laughed until they could not stand up straight. Now Tom was Edward and Edward was Tom.",
"“Stay here until I come back,” said Edward, and he was already at the door. Then he stopped, went to the table, took something heavy and round from it, crossed to the corner of the room and pushed it deep inside an old suit of armour. Tom watched him do it and did not ask. And then the prince ran out, laughing, in a beggar’s clothes.",
"Tom was alone in a room the size of a house. He looked at the silk and the silver and the fire, and he thought: “What does a prince do all day?”"
],
3:[
"Edward ran across the courtyard in Tom Canty’s shirt, and the soldiers at the gate did not look at his face. They looked at the shirt.",
"“Out,” said one, and pushed him into the street. “I am the Prince of Wales!” said Edward. The soldier laughed. It was a short, tired laugh, the laugh of a man who has heard everything. Then he closed the gate.",
"Within an hour Edward had learned something that had never been part of his education: that in the streets of London a statement is only as true as the clothes of the person making it. People stopped. A crowd gathered. Boys ran alongside him, dogs barked at his heels, and the more clearly and correctly he explained who he was, the more the crowd enjoyed itself.",
"He was cold. He was hungry — not the hunger of a late dinner, but the other kind. He did not know the way anywhere. And there was not one person in that enormous city who believed a single word he said.",
"Then a man came through the crowd — tall, sunburned, badly dressed and armed. He had been away for seven years, at the wars and afterwards in a foreign prison, and he had come home to find London exactly as noisy as he had left it. His name was Miles Hendon.",
"“Leave the boy alone,” he said, and drew his sword. The crowd considered the length of the sword and remembered other appointments.",
"“I thank you,” said Edward, straightening up. “You have served your king today.” Miles looked down at a small, filthy, exhausted child in rags, standing as though he were on a dais. Poor lad, he thought, his wits are gone. But what he said was: “Then I shall stay with Your Majesty.”",
"He took the boy to a small inn near London Bridge, bought him supper with money he could not spare, and put him in the only bed. The boy ate a little, said something about the state of the kingdom, and fell asleep in the middle of the sentence. Miles sat down against the door and watched him.",
"But there was another man looking for a boy that night. John Canty had been walking the streets since morning, and when he saw a face in the light of the inn doorway he did not hesitate for a moment. “Tom!” he shouted. “Home!”",
"“I am not your son,” said Edward. “I am the King of England.” “So he is mad as well,” said Canty, and took him by the arm, and pulled him out of London and into the dark."
],
4:[
"At Westminster Palace, the problem of the boy in the prince’s clothes was solved in the way that palaces solve problems: by finding an explanation that changed nothing. Tom said, again and again, that he was Tom Canty of Offal Court and that they should send him home. And the court agreed among themselves, with real sympathy, that the prince was ill and had lost his memory, and that nobody should speak of it outside these rooms.",
"That evening the royal barge went down the Thames with lights along the water and music on the deck. Tom was going to the Guildhall, to a banquet given in honour of King Henry VIII, who was too ill to attend it.",
"Great nobles walked upon each side of him. On both banks of the river people had come out to see the prince pass, and they cheered him, and Tom looked at their faces and wondered which of those streets his mother was in.",
"The Guildhall was hot with candles and loud with three hundred important people. There was roast meat, roast chicken and fish; green vegetables and roast potatoes; eight kinds of cheese; apples, pears and grapes; strawberry cake, honey cake and chocolate pudding.",
"Tom was hungry, and he ate the way a hungry boy eats. He used his fingers. He made a noise. And then he picked up the finger bowl — a small silver bowl of water placed there so that gentlemen might clean their hands — and drank it.",
"Nobody laughed. Nobody coughed. Nobody looked at anybody else. Three hundred of the most powerful people in England watched their future king drink the washing water, and went on with their conversations, because one does not correct a prince.",
"Later that night they took him to the king. Tom was so frightened that he could hear his own blood. But the enormous old man in the great bed was not frightening to him at all.",
"Henry VIII was ill and swollen, his face grey, one bandaged leg propped on a pillow, and the whole room bent towards him like grass. He looked at the boy and his voice, when it came, was gentle. “Come here, my son.”",
"“I am not your son, sir,” said Tom. “My name is Tom Canty and I live near Pudding Lane.” The king closed his eyes for a moment. “The prince is ill,” he said to the room. “Nobody is to repeat what has been said here.”",
"Then his face changed, and he was a king again. “The Great Seal,” he said. “There is a document that must be sealed. Where did you put the Great Seal, Edward?”",
"Tom did not know what a Great Seal was. “I cannot remember, sir,” he said, and the lords looked at one another over his head. In all of England exactly one person knew where the Great Seal was, and at that hour he was somewhere between London Bridge and the dark, in a beggar’s shirt.",
"Before he was taken away, Tom asked for something. There was a man in prison, condemned to die for a crime the evidence did not really prove, and Tom — who had known men like that all his life — asked the king to spare him. The old king studied the boy for a long moment. Then he granted it.",
"King Henry VIII died that night. In the morning Lord Hertford came into the room, knelt on one knee, and said the words that had been said in that palace for six hundred years: “The king is dead. Long live the king.”",
"And Tom Canty, beggar, of Offal Court, was King of England."
],
5:[
"Miles Hendon looked for the boy for two days and two nights, and found him on the third, on a road outside London, cold, filthy and still perfectly certain of who he was. He brought him back to the inn.",
"“Your supper, Your Majesty,” said Miles, and set the plate down. The boy sat. Miles pulled out the second chair — and the boy said, without looking up, “A king eats alone.”",
"Miles opened his mouth, closed it again, and stood up straight beside the chair. He had walked twenty miles that day. He had eaten nothing since morning and had no money left. He stood, and served, and the little king ate.",
"There is a moment in that scene where the joke ends and something else begins, and Miles could not have said afterwards exactly where it was.",
"When the boy had finished he looked up at the tall, tired soldier for a long time. “You have been kind to me,” he said, “and you have asked for nothing. Kneel.” Miles knelt, wondering at himself. The boy touched his shoulder. “Rise, Sir Miles Hendon.”",
"“And a king,” he added, “cannot give what he does not have. So I give you this: you and your family after you may sit in the presence of the King of England — for ever.”",
"Miles began to laugh, and then stopped, because the child was entirely serious. “I thank Your Majesty,” he said, and sat down, and found that his legs were extremely glad of it.",
"In the morning Miles looked at what the boy was wearing and shook his head. Rags: filthy, torn and impossible. “A king cannot cross England like that,” he said. “I am going to the market. Stay here. Do not open the door to anyone.”",
"He had been gone half an hour when a young man arrived at the inn with a message. “Sir Miles is waiting for you by the river,” he said, “and he says come quickly.”",
"The little king went out into the street. John Canty was waiting at the corner.",
"Miles came back with a good plain suit of clothes under his arm and found the room empty and the door open. He stood in the doorway for a long moment. Then he put the clothes on the bed, picked up his sword, and went out to look for him again."
],
6:[
"At Westminster Palace, Tom’s new life began at eight o’clock in the morning, when he woke to find two gentlemen standing beside his bed watching him sleep. Three more came in to dress him. Nobody in that room had ever put on his own shirt.",
"After breakfast he was taken to the Council Chamber and seated in the king’s gold chair. Lords came in, knelt, and told him about money, ships, France and the price of wool.",
"One of them explained that the treasury was empty because the late King Henry had spent it. Tom, who knew a great deal about empty treasuries, made a joke about it. Nobody laughed. He did not make another one.",
"Then they brought documents. Tom looked at the long grey lines of secretary hand, understood perhaps one word in five, and wrote the prince’s name slowly at the bottom, letter by letter, hoping nobody was watching his fingers.",
"That afternoon a boy of about his own age came into his room, and stopped just inside the door as though the floor might not hold him.",
"“Who are you?” asked Tom. “Humphrey Marlow, Your Majesty. I am your whipping boy.” “My what?” “When you make a mistake in your Greek, sir, the tutor beats me. Nobody is permitted to strike a prince.”",
"Tom stared at him for a long moment. In Offal Court his father had beaten him for coming home empty-handed; here was a boy who was beaten for somebody else’s grammar, and paid for it.",
"“And do you want this post?” asked Tom at last. “Oh, please, Your Majesty,” said Humphrey quickly, “do not dismiss me. My family has nothing else. If I lose this place we starve.”",
"So Tom kept him. And Humphrey, weak with relief and quite unable to stop talking, told him everything: who the lords were, what they wanted, what the prince liked to eat, how he walked, what he said when he was angry, which of his tutors could be managed and which could not. Day by day the ‘prince’ made fewer mistakes; day by day the two boys talked longer. It was the first friendship either of them had had with somebody who knew what they were.",
"Lord Hertford asked again about the Great Seal. Tom still did not know, and signed another document he could not read.",
"Everything at Westminster was wonderful. The food was extraordinary, the bed was warm, the clothes were worth more than his street. Tom stood at the window looking down at the river and was so bored that his chest hurt.",
"And then he thought about Humphrey, standing in a corridor somewhere waiting to be beaten for a mistake he had not made. “No,” he said aloud, to an empty room. “That stops."
],
7:[
"Miles found the boy three weeks later, and this time he did not let go of him. “We are going home,” he said. “To Hendon Hall.”",
"They walked for days, and Miles talked the whole way: the long low house, the trees behind it, his father, his brother Hugh, and Lady Edith, whom he had loved before the war and had thought about in a foreign prison for seven years.",
"They came over the last rise in the late afternoon and there it was, exactly as he had described it, quiet in the yellow light. Miles ran the last hundred yards.",
"Inside, a young man was sitting at a table, writing. It was Hugh. He looked up at the tall, sunburned soldier standing in his hall, and his face did not change at all.",
"“Hugh!” said Miles. “Brother! I have come home.” Hugh put down his pen. “I do not know this man,” he said.",
"Then Lady Edith came in. She looked at Miles for exactly one second — one second, which is a long time — and said, “I have never seen him before in my life.” And she went out of the room very quickly, without looking back.",
"Miles understood it all in the space of that second. While he was away, his brother had told the county that he was dead. On that lie Hugh had taken the house, the land and the money, and had married Edith, who had had a choice between a dead man and a living one.",
"Hugh called for the servants and then for the soldiers. “This man is a thief,” he said pleasantly, “and the boy is mad.” And so Sir Miles Hendon, knight, of Hendon Hall, went to prison in his own parish, and the King of England went with him.",
"The prison was cold and crowded, and the little king listened to it for many days. There was an old woman who had stolen a piece of cloth. There was a man who could not pay what he owed and would therefore never be able to pay it. There were people waiting for punishments enormously larger than the things they had done.",
"These were his laws. He had heard them read out at a table with a fire in it, and he had approved them, and he had never once seen what they looked like from underneath. “When I am king again,” he said quietly, to nobody, “these laws will change.”",
"After many days the soldiers took Miles out into the square and put him in the stocks, and left him there, and the sort of people who throw things at a man who cannot move began to arrive.",
"The boy in rags walked out of the crowd and stood beside him. They told him to move. He did not move. He stayed there the whole day, beside the man who had drawn a sword for him when nobody in England would say his name."
],
8:[
"On the twentieth of February, London got up before it was light. It was Coronation Day.",
"There were flags in every street and faces at every window, and by nine o’clock nobody in the city was indoors. The procession came slowly up through the crowd — soldiers, horses, lords in cloth of gold, the whole machinery of a kingdom announcing itself — and in the middle of it, on a tall white horse, rode a thin boy in silk.",
"Tom looked out over the crowd, and the noise, and the flags, and in the front row, close enough to touch, he saw his mother.",
"She came forward and put her hand on his leg and looked up at him and said, “Oh, my child—”. The guards had her away in a moment. And Tom Canty looked straight ahead over the ears of the horse and said, clearly, so that the men beside him could hear it: “I do not know you, woman.” Then the procession moved on, and he carried that sentence with him through every street of the city.",
"Inside Westminster Abbey the ceremony was long, and beautiful, and very slow. At the end of it the Archbishop of Canterbury took the crown of England in both hands and raised it high above the boy’s head.",
"And from the great doorway a voice cried: “Stop! That crown is mine!”",
"Every head in the Abbey turned. In the doorway, between two enormous columns, stood a thin boy in filthy rags, and the guards were already moving towards him — and Tom Canty said, in a voice that carried the whole length of the church: “Let him go. He is the true king.”",
"Then Tom came down from the steps, in his silk and his gold, and knelt on the stones in front of a beggar.",
"The lords looked from one boy to the other and could not tell them apart, and there began to be a noise in the Abbey that had never been made there before. Lord Hertford stepped forward. He had served three kings and he knew that a face proves nothing. He asked the only question in England that luck could not answer: “Where is the Great Seal?”",
"The Abbey went completely silent.",
"“At Westminster Palace,” said the boy in rags, “in my own apartments, in the corner, inside the old suit of armour. I put it there myself, with my own hands, on the day I went out.” They sent men. The men came back. It was there.",
"“And you,” said Edward, turning to Tom with the beginning of a smile, “what did you do with the Great Seal of England for six weeks?” Tom looked at the floor. “I cracked nuts with it, Your Majesty,” he said. “I did not know what it was.” And Westminster Abbey, which had been holding its breath for a very long minute, began to laugh.",
"Edward Tudor was crowned that day. He forgot nobody. Tom Canty, his mother and his sisters were given a home and an income for life, and Tom was called the King’s Ward and wore a special dress and was pointed at in the street, which he enjoyed enormously. Hugh Hendon gave back everything he had taken, and Sir Miles Hendon — and his sons, and his sons’ sons — kept the right to sit in the presence of the King of England.",
"And Edward VI, who had seen his own laws from underneath, reigned mercifully and changed a great many of them. He was king for six years and died at sixteen, which is very young for a king and very young for anything else. But whenever anyone asked him why he was so gentle with the poor, he said that he remembered — and nobody in the room ever understood how completely he meant it."
]
};

const EVENTS = {
1:{ev:[
  "Two boys were born on the same autumn day of 1537.",
  "Tom grew up in a single filthy room in Offal Court.",
  "John Canty sent his son out to beg every morning.",
  "Tom asked Father Andrew to teach him to read.",
  "Tom read about kings and dreamed about them at night.",
  "Father Andrew suggested that Tom go and see the real prince."
],keys:["born","Offal","beg","Father","dreamed","prince"]},
2:{ev:[
  "Tom waited at the palace gate day after day.",
  "A soldier struck him, and Prince Edward intervened.",
  "Edward brought Tom inside and gave him food.",
  "The two boys discovered an identical face in the mirror.",
  "They exchanged clothes as a game.",
  "Edward hid the Great Seal and ran out into the street."
],keys:["gate","struck","food","mirror","exchanged","Seal"]},
3:{ev:[
  "The guards judged Edward by his clothes and threw him out.",
  "A crowd mocked the boy who claimed to be the prince.",
  "Miles Hendon drew his sword and dispersed the crowd.",
  "Miles took the boy to an inn near London Bridge.",
  "John Canty recognised the face in the doorway.",
  "Canty dragged the little king out of London."
],keys:["clothes","mocked","sword","inn","recognised","dragged"]},
4:{ev:[
  "The court decided that the prince had lost his memory.",
  "The royal barge carried Tom to the Guildhall.",
  "Tom drank from the finger bowl in front of the nobility.",
  "Tom met the dying King Henry VIII.",
  "Tom could not say where the Great Seal was.",
  "Henry VIII died and Tom Canty became king."
],keys:["memory","barge","bowl","Henry","Seal","died"]},
5:{ev:[
  "Miles searched for two days and found the boy again.",
  "Miles stood and served him because a king eats alone.",
  "Edward knighted him as Sir Miles Hendon.",
  "Miles was granted the right to sit in the king’s presence.",
  "Miles went to the market to buy proper clothes.",
  "A false message took the boy back to John Canty."
],keys:["searched","served","knighted","sit","market","message"]},
6:{ev:[
  "Tom woke to find gentlemen waiting to dress him.",
  "He sat in the gold chair and listened to the Council.",
  "He signed documents he could not understand.",
  "Humphrey Marlow explained the job of a whipping boy.",
  "Humphrey taught Tom how to pass as the prince.",
  "Tom decided that the whipping had to stop."
],keys:["dress","Council","documents","Humphrey","pass","stop"]},
7:{ev:[
  "Miles brought the little king home to Hendon Hall.",
  "Hugh looked at his brother and denied knowing him.",
  "Lady Edith said she had never seen Miles before.",
  "Hugh accused Miles of being a thief.",
  "Miles and the king were imprisoned together.",
  "Miles was put in the stocks and the boy stood beside him."
],keys:["Hendon","denied","Edith","thief","imprisoned","stocks"]},
8:{ev:[
  "All London came out for the coronation procession.",
  "Tom saw his mother and denied knowing her.",
  "The Archbishop raised the crown above Tom’s head.",
  "A boy in rags cried out that the crown was his.",
  "Edward named the hiding place of the Great Seal.",
  "Edward was crowned and rewarded Tom and Miles."
],keys:["procession","mother","crown","rags","Seal","rewarded"]}
};

return {level:'B1', lead:'Mark Twain · adapted by Paolo Baca · <b>B1 intermediate</b> (≈1500 headwords)',
  CHAPTERS:CHAPTERS, READINGS:READINGS, EVENTS:EVENTS};
})();
