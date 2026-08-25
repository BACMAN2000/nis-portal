/* ============================================================
   THE ADVENTURES OF TOM SAWYER — Mark Twain
   B1 intermediate dataset · original retelling for the NIS reader
   ============================================================ */
window.ATTWN_DATA = (function(){
const CHAPTERS = [
  { n:1, title:"Tom and the Fence",
    sum:"Aunt Polly punishes Tom with a Saturday job: whitewashing the long fence. Instead of working, clever Tom convinces every boy who passes to pay treasures for the pleasure of painting it for him.",
    vocab:[
      ["FENCE","a wooden wall built around a garden or yard"],
      ["WHITEWASH","to paint something white with a special cheap paint"],
      ["BRUSH","a tool with hairs on a handle, used for painting"],
      ["PUNISHMENT","something unpleasant you must do because you behaved badly"],
      ["CLEVER","intelligent and quick at thinking of ideas"],
      ["APPLE","a round red or green fruit that grows on trees"],
      ["MARBLES","small coloured glass balls that children play with"],
      ["TREASURE","something valuable that you keep, collect or hide"],
      ["REWARD","something good you receive because you did well"],
      ["SHADE","a cool, darker place protected from the sun"],
      ["PRIVILEGE","a special right or chance that only a few people get"],
      ["HONOUR","something that makes you feel proud and important"]
    ],
    comp:[
      ["Who does Tom Sawyer live with?",["His grandfather","His Aunt Polly","His parents","The Widow Douglas"],1,"Tom lives with his Aunt Polly in the small town of St. Petersburg."],
      ["Why does Tom have to whitewash the fence?",["He wants pocket money","It is his Saturday hobby","It is a punishment from Aunt Polly","Ben Rogers asked him to"],2,"Aunt Polly gives him the job as a punishment he will remember."],
      ["How long is the fence Tom must paint?",["About three metres","Almost thirty metres","Three hundred metres","The text does not say"],1,"The fence is almost thirty metres long and taller than Tom’s head."],
      ["What is Tom’s clever idea?",["To pay other boys to paint","To pretend the work is a rare pleasure","To ask Aunt Polly for help","To paint only half the fence"],1,"He pretends that painting is an honour that few boys can enjoy, so everyone wants a turn."],
      ["What does Ben Rogers give Tom for a turn with the brush?",["A juicy apple","Twelve marbles","A tin soldier","A dead rat"],0,"Ben hands over his apple and happily starts painting."],
      ["What do the other boys pay with?",["Money","Their small treasures","Their homework","Nothing at all"],1,"Boy after boy pays with treasures: marbles, blue glass, a tin soldier, even a kitten."],
      ["How many coats of whitewash does the fence get?",["One","Two","Three","Four"],2,"By evening the fence wears three shining coats of whitewash."],
      ["What law of human nature does Tom discover?",["Work is always boring","People desire what is hard to get","Aunts forgive everything","Boys hate painting"],1,"If something looks difficult to get, people want it — and will even pay for it."]
    ],
    tf:[
      ["Tom lives in a town called St. Petersburg.",true,"The story happens in St. Petersburg, beside the Mississippi River."],
      ["Tom paints the whole fence by himself.",false,"The other boys do almost all the work for him."],
      ["Ben Rogers is eating an apple when he arrives.",true,"Ben walks past eating a juicy apple, which Tom soon wins."],
      ["The boys refuse to help Tom with the fence.",false,"They beg for a turn and even pay Tom for the privilege."],
      ["Aunt Polly is angry when she sees the finished fence.",false,"She can hardly believe her eyes and gives Tom a reward."],
      ["Tom does almost no painting himself.",true,"He sits in the shade while the others paint three coats."]
    ],
    writing:[
      {task:"Imagine you are Ben Rogers. Write a short diary entry about the day you gave Tom your apple just to paint his fence.",
       target:"50–70 words",
       tips:["Use the past simple to tell what happened.","Explain how Tom made the job look special.","Say how you felt at the end of the day."],
       starters:["Dear Diary, today something strange happened...","This morning I was going to the river when...","I still cannot believe I gave Tom my apple...","At first I laughed at Tom, but then..."]},
      {task:"Describe a time when you made a boring job fun, like Tom did. What was the job and what was your trick?",
       target:"50–70 words",
       tips:["Say what the boring job was.","Explain your idea step by step.","Finish with what you learned."],
       starters:["Last year I had to...","The most boring job I ever did was...","My trick was very simple:...","Like Tom Sawyer, I discovered that..."]}
    ]},
  { n:2, title:"Church and Becky",
    sum:"At Sunday school Tom trades his new treasures for prize tickets and wins a Bible he has not earned — until one simple question ruins his moment of glory. He also meets Becky Thatcher and falls in love.",
    vocab:[
      ["TICKET","a small piece of paper that you can exchange for something"],
      ["VERSE","a few lines from the Bible or from a poem"],
      ["PRIZE","something you win in a competition"],
      ["JUDGE","an important person who decides cases in a court"],
      ["CEREMONY","a formal public event with special actions and words"],
      ["ADMIRATION","the feeling of liking and respecting someone very much"],
      ["PRIDE","a good feeling about yourself when you do something well"],
      ["GLORY","great fame, praise and honour"],
      ["TRADE","to exchange one thing for another thing"],
      ["CHALK","a soft white stick used for writing on a board"],
      ["CURTAIN","a piece of cloth that covers a window or a stage"],
      ["EMBARRASSING","making you feel silly or ashamed in front of people"]
    ],
    comp:[
      ["How can a pupil earn a ticket at Sunday school?",["By arriving early","By learning two Bible verses","By singing a hymn","By cleaning the church"],1,"The children receive a small ticket for every two verses they learn by heart."],
      ["What can enough tickets be exchanged for?",["A holiday","A new Bible","Some money","A box of chalk"],1,"The great prize, given with ceremony, is a new Bible."],
      ["How does Tom collect his tickets?",["He studies all week","He trades his treasures for them","He steals them from the teacher","Becky gives them to him"],1,"He quietly trades the treasures from the fence for the other boys’ tickets."],
      ["Who visits the Sunday school class?",["The sheriff","Judge Thatcher","Aunt Polly","Doctor Robinson"],1,"Judge Thatcher, Becky’s father, visits the class that morning."],
      ["What question is Tom asked?",["The names of the first two disciples","The name of the first king","How many books the Bible has","Where Moses was born"],0,"The judge asks him a simple question about the first two disciples."],
      ["What answer does Tom give?",["Peter and Paul","David and Goliath","Adam and Eve","He says nothing"],1,"Tom shouts the only famous names he can remember: David and Goliath."],
      ["Who is Becky Thatcher?",["The teacher’s niece","The judge’s daughter","Tom’s cousin","Huck’s sister"],1,"Becky is the new girl in town, the daughter of the town judge."],
      ["What does Tom show Becky in the schoolyard?",["His prize Bible","His best drawings","His tickets","His marbles"],1,"He shows her his drawings and tells her she is the prettiest girl he has ever seen."]
    ],
    tf:[
      ["Tom enjoys wearing his Sunday clothes.",false,"He hates every minute of washing, combing and dressing up."],
      ["Tom has learned many Bible verses by heart.",false,"He has never learned his verses — that is why he needs to trade."],
      ["Becky Thatcher has golden hair and blue eyes.",true,"That is how the new girl is described when Tom first sees her."],
      ["The teacher expects Tom to win the prize.",false,"The teacher is surprised when Tom marches forward with the tickets."],
      ["Tom answers the judge’s question correctly.",false,"His answer, David and Goliath, is completely wrong."],
      ["Tom tells Becky she is the prettiest girl he has ever seen.",true,"He says it in the schoolyard, and Becky smiles."]
    ],
    writing:[
      {task:"Write a short letter from Tom to a friend about the new girl in town and about what happened at Sunday school.",
       target:"50–70 words",
       tips:["Use informal letter language.","Mention both the prize and the wrong answer.","Describe Becky in one or two sentences."],
       starters:["Dear friend, you will not believe my week...","Something wonderful and something terrible happened...","There is a new girl in town and...","First the good news: I won a Bible..."]},
      {task:"Describe an embarrassing moment at school — yours or an invented one — and explain how you felt afterwards.",
       target:"50–70 words",
       tips:["Set the scene: where and when it happened.","Use adjectives of feeling (nervous, ashamed, red-faced).","End with what you would do differently."],
       starters:["My most embarrassing moment happened when...","It was a normal morning until...","Everyone was looking at me when...","I wanted the floor to open because..."]}
    ]},
  { n:3, title:"In the Graveyard",
    sum:"At midnight Tom and Huckleberry Finn visit the graveyard and secretly watch Injun Joe murder Doctor Robinson and put the blame on innocent Muff Potter. Terrified, the boys swear a blood oath never to tell.",
    vocab:[
      ["GRAVEYARD","a place where dead people are buried"],
      ["MIDNIGHT","twelve o’clock at night"],
      ["SUPERSTITION","a belief in magic and luck that science cannot explain"],
      ["DRUNKARD","a person who drinks too much alcohol"],
      ["LANTERN","a lamp in a case that you can carry"],
      ["SPADE","a tool with a flat blade for digging the ground"],
      ["KNIFE","a sharp blade with a handle, used for cutting"],
      ["MURDER","the crime of killing a person deliberately"],
      ["WICKED","morally very bad; evil"],
      ["OATH","a very serious formal promise"],
      ["SHERIFF","the chief police officer of an American town"],
      ["CONSCIENCE","the inner voice that tells you what is right and wrong"]
    ],
    comp:[
      ["Why do Tom and Huck go to the graveyard at midnight?",["To dig for treasure","To try a cure for warts","To follow Injun Joe","To visit a family grave"],1,"Huck’s superstition says a dead cat can pull warts away at midnight in a graveyard."],
      ["Who is Huckleberry Finn?",["The judge’s son","The son of the town drunkard","Tom’s cousin","A rich orphan"],1,"Huck is the drunkard’s son, admired by boys and hated by adults."],
      ["Why is Doctor Robinson in the graveyard?",["He is visiting a patient","He wants a body for his medical studies","He is hiding from the sheriff","He is burying treasure"],1,"He has paid the two men to dig up a body for his studies."],
      ["What starts the fight between the men?",["Injun Joe demands more money","Muff Potter steals the lantern","The doctor breaks a spade","A ghost appears"],0,"Injun Joe demands more money and remembers an old insult."],
      ["Who kills Doctor Robinson?",["Muff Potter","Injun Joe","An unknown stranger","Nobody — it is an accident"],1,"Injun Joe drives Muff Potter’s knife into the doctor’s chest."],
      ["What lie does Injun Joe tell Muff Potter?",["That the doctor ran away","That Potter himself killed the doctor","That Tom saw everything","That the sheriff is coming"],1,"Confused by the blow, poor Muff believes he did the murder himself."],
      ["What do Tom and Huck write in blood?",["A letter to the sheriff","An oath to keep silent forever","Injun Joe’s name","A map of the graveyard"],1,"They swear on a piece of wood never to speak about the murder."],
      ["Who is arrested the next day?",["Injun Joe","Muff Potter","Huckleberry Finn","The doctor’s brother"],1,"The knife left beside the body points to Muff Potter, and the town arrests him."]
    ],
    tf:[
      ["Huck goes to school every day.",false,"Huck never goes to school and sleeps in empty barrels."],
      ["The boys hide behind three big elm trees.",true,"They hide behind the elms when the three men arrive."],
      ["The doctor knocks Muff Potter down with a board.",true,"During the fight the doctor hits Potter and knocks him down."],
      ["Muff Potter really killed Doctor Robinson.",false,"Injun Joe is the killer; Potter was lying unconscious."],
      ["Tom and Huck run straight to the sheriff.",false,"They are too afraid of Injun Joe and swear to stay silent."],
      ["Injun Joe leaves the knife beside the body.",true,"He leaves it there so that the blame will fall on Muff Potter."]
    ],
    writing:[
      {task:"Write Tom’s secret diary entry for the night of the graveyard. What did he see, and why can he not tell anyone?",
       target:"50–70 words",
       tips:["Use past tenses to describe the night.","Show Tom’s fear with strong adjectives.","Explain the oath and what could happen if he speaks."],
       starters:["Midnight. I cannot sleep because...","Tonight I saw something terrible...","Huck and I only wanted to cure warts, but...","My hand is still shaking as I write..."]},
      {task:"Is it ever right to break a promise? Give your opinion using the boys’ oath as an example.",
       target:"50–70 words",
       tips:["State your opinion clearly in the first sentence.","Give one reason for and one against.","Connect your ideas with because, but and however."],
       starters:["In my opinion, a promise...","Tom and Huck promised to stay silent, but...","Some promises protect people; others...","I think there is one situation when..."]}
    ]},
  { n:4, title:"The Young Pirates",
    sum:"Feeling that nobody loves him, Tom runs away with Joe Harper and Huck to Jackson’s Island to live as free pirates — until a searching ferryboat shows them that the whole town believes they have drowned.",
    vocab:[
      ["PIRATE","a robber who attacks ships at sea"],
      ["RAFT","a flat boat made of pieces of wood tied together"],
      ["ISLAND","a piece of land with water all around it"],
      ["RIVERBANK","the ground along the side of a river"],
      ["CAMP","a place where people sleep outside, often with a fire"],
      ["BACON","salted meat from a pig, often fried"],
      ["KINGDOM","a country or area ruled by a king"],
      ["FERRYBOAT","a boat that carries people across a river"],
      ["CANNON","a large heavy gun that fires iron balls"],
      ["DROWN","to die under water because you cannot breathe"],
      ["HOMESICKNESS","sadness because you are far away from home"],
      ["AVENGER","a person who punishes others for a wrong"]
    ],
    comp:[
      ["Why does Tom decide to run away?",["Aunt Polly sends him away","He feels that nobody loves him","He is escaping from Injun Joe","He wants to find treasure"],1,"Becky is ill, Aunt Polly scolds him, and the graveyard secret weighs on him."],
      ["Who runs away with Tom?",["Ben Rogers and Sid","Joe Harper and Huckleberry Finn","Becky and Amy","Muff Potter"],1,"Joe Harper, punished unfairly at home, and Huck join him."],
      ["How do the boys reach Jackson’s Island?",["They swim across","On a small raft","In the ferryboat","Across a bridge"],1,"At midnight they board a small raft and push off into the Mississippi."],
      ["Where is Jackson’s Island?",["In the middle of a lake","Three miles below the town","Next to the graveyard","In another state"],1,"It is a wild, forest-covered island three miles downriver."],
      ["What do the pirates eat at their camp?",["Fish and bread only","Bacon cooked on an open fire","Food from a shop","Turtle soup"],1,"They cook their stolen bacon on the open fire and sleep under the stars."],
      ["Why is the ferryboat firing a cannon?",["To celebrate a holiday","To search for a drowned body","To scare the pirates","To announce the funeral"],1,"Huck explains that a cannon fired over water was believed to find drowned bodies."],
      ["What do the townspeople believe about the boys?",["They ran to another town","They drowned in the river","They are hiding on the island","They were kidnapped"],1,"When the boys disappear, the whole town believes they have drowned."],
      ["What happens to the boys at night on the island?",["They fight each other","Homesickness creeps into the camp","They see Injun Joe","A storm destroys the raft"],1,"Joe misses his mother, Tom thinks of Aunt Polly, and a secret plan begins to grow."]
    ],
    tf:[
      ["The three boys meet on the riverbank at midnight.",true,"They meet at midnight with stolen bacon, a ham and a few tools."],
      ["The boys swim all the way to the island.",false,"They travel on a small wooden raft."],
      ["On the island, nobody can give the boys orders.",true,"That freedom is exactly why the island feels like a kingdom."],
      ["The cannon is fired to celebrate a town holiday.",false,"It is fired over the water to search for drowned bodies."],
      ["Joe Harper misses his mother at night.",true,"Homesickness creeps into the camp, and Joe misses her most."],
      ["The boys return home that same night.",false,"They stay; Tom only starts forming a secret plan."]
    ],
    writing:[
      {task:"Write a postcard from Jackson’s Island. Tell a friend what a pirate’s day is like and how you really feel at night.",
       target:"50–70 words",
       tips:["Use the present simple for daily routines.","Contrast the fun by day with the feelings at night.","Finish with a mysterious hint about your plan."],
       starters:["Greetings from Jackson’s Island!...","You will never guess where I am...","Life as a pirate is...","By day we swim and explore, but..."]},
      {task:"Describe your perfect day of total freedom, with no school and no rules. What would you do from morning to night?",
       target:"50–70 words",
       tips:["Organise the day in order: morning, afternoon, evening.","Use would for imaginary situations.","Say if total freedom has any problems."],
       starters:["If I had one day of total freedom, I would...","My perfect free day would start...","First I would..., then...","Like Tom, I would soon discover that..."]}
    ]},
  { n:5, title:"Back from the Dead",
    sum:"The sad town prepares a funeral for the three drowned boys. After secretly visiting home one night, Tom leads his pirates back into the church in the middle of their own funeral, turning tears into joy.",
    vocab:[
      ["FUNERAL","a ceremony for a person who has died"],
      ["MINISTER","a religious leader in a church"],
      ["AISLE","the long passage between rows of seats"],
      ["GALLERY","a high floor over the main part of a church or hall"],
      ["HYMN","a religious song sung in church"],
      ["ANGEL","a heavenly being, or a very good person"],
      ["GENEROUS","happy to give more than is necessary"],
      ["CREAK","the long thin sound of an old door or floor"],
      ["KISS","to touch someone with your lips to show love"],
      ["PROUD","feeling pleased about something you have done"],
      ["ASHAMED","feeling bad because of something you did or are"],
      ["HERO","a person admired for bravery or great acts"]
    ],
    comp:[
      ["What does the town prepare for the three boys?",["A search party","A funeral","A festival","A school ceremony"],1,"Believing the boys drowned, the village announces a funeral for Sunday morning."],
      ["What did Tom secretly do one night?",["He stole the ferryboat","He crossed the river and hid under Aunt Polly’s bed","He visited Becky","He spoke to the minister"],1,"He slipped home, hid under the bed and listened to his aunt cry and pray."],
      ["Why did Tom not show himself at home that night?",["He fell asleep","A bigger, brighter idea stopped him","Sid saw him first","He was too ashamed"],1,"A better plan — appearing at the funeral — stopped him, and he crept back."],
      ["What does the minister talk about at the funeral?",["The dangers of the river","The boys’ sweet and generous acts","The history of the church","Punishment for bad boys"],1,"He remembers only their best acts, and everyone cries."],
      ["How do the boys enter the church?",["Through a window","Down the aisle while everyone watches","Dressed as pirates","With the sheriff"],1,"The door creaks open and the three march down the aisle, Tom in front."],
      ["Where had the boys been hiding during the service?",["Behind the altar","In the empty gallery","Under the seats","Outside the door"],1,"They had listened to their own funeral from the empty gallery."],
      ["Who hugs Huck in the end?",["Nobody","Aunt Polly","Mrs. Harper","The minister"],1,"After Tom protests that someone should be glad to see Huck, Aunt Polly hugs him."],
      ["How are the boys treated at school afterwards?",["As liars","As heroes","As criminals","As babies"],1,"Younger boys follow them everywhere, dreaming of rafts and islands."]
    ],
    tf:[
      ["The river gave back the boys’ bodies after some days.",false,"The search found nothing — because the boys were alive on the island."],
      ["The minister says only bad things about the boys.",false,"He remembers their sweet and generous acts, and everyone cries."],
      ["Tom hid under Aunt Polly’s bed and heard her pray.",true,"During his secret night visit he listened from under the bed."],
      ["Huck is hugged first of all the boys.",false,"At first nobody hugs Huck; he stands alone until Tom protests."],
      ["The people sing an old hymn with great power.",true,"The hymn rises so powerfully that the windows seem to shake."],
      ["It was the proudest moment of Tom’s life.",true,"Marching into his own funeral was his proudest moment."]
    ],
    writing:[
      {task:"Write a short newspaper report about the boys who came back from the dead during their own funeral.",
       target:"50–70 words",
       tips:["Start with a strong headline sentence.","Answer who, where, when and what happened.","Include one short invented quotation from a witness."],
       starters:["Yesterday our town saw a miracle...","Three boys, believed drowned, walked...","The church was full of tears when...","St. Petersburg will never forget the Sunday when..."]},
      {task:"Imagine you are Aunt Polly. Write your diary entry for the evening after the funeral.",
       target:"50–70 words",
       tips:["Mix emotions: joy, relief and a little anger.","Use exclamations to show strong feeling.","End with what you want to say to Tom tomorrow."],
       starters:["My Tom is alive!...","I have cried all day, but...","This morning I went to church to bury my boy...","Part of me wants to hug him forever, and part..."]}
    ]},
  { n:6, title:"Muff Potter’s Trial",
    sum:"At Muff Potter’s trial the whole town expects the old man to hang. Fighting his terror of Injun Joe, Tom stands up as a surprise witness and tells the truth — and the real murderer leaps through the courtroom window and escapes.",
    vocab:[
      ["TRIAL","the process in which a court decides if someone is guilty"],
      ["COURTROOM","the room where a trial takes place"],
      ["WITNESS","a person who tells a court what they saw"],
      ["LAWYER","a person whose job is to defend people in court"],
      ["JURY","the group of citizens who decide a court case"],
      ["GUILTY","responsible for a crime"],
      ["INNOCENT","not guilty of a crime"],
      ["JAIL","a small prison"],
      ["DEFENCE","the lawyer and arguments on the accused person’s side"],
      ["MURMUR","a low, quiet sound of many voices"],
      ["CONSCIENCE","the inner voice that tells you what is right and wrong"],
      ["MURDERER","a person who has killed someone deliberately"]
    ],
    comp:[
      ["Who is on trial for the murder of Doctor Robinson?",["Injun Joe","Muff Potter","Tom Sawyer","Huckleberry Finn"],1,"The town is certain that old Muff Potter is guilty."],
      ["What do Tom and Huck pass through the jail window?",["A knife and a rope","Tobacco and matches","Letters and food","A key"],1,"They bring small comforts to Muff in the evenings."],
      ["How does Muff Potter treat the boys at the jail?",["He is angry with them","He thanks them warmly and blames only himself","He asks them to free him","He does not recognise them"],1,"His kindness makes their consciences burn even more."],
      ["How does the trial go at first?",["Very well for Muff","Very badly for Muff","It is stopped by the judge","Injun Joe confesses"],1,"Witness after witness speaks against Muff, and the defence asks almost nothing."],
      ["Who is the surprise witness for the defence?",["Aunt Polly","Thomas Sawyer","Huckleberry Finn","The sheriff"],1,"A murmur runs through the court when Tom’s name is called."],
      ["Why did Tom decide to speak to the lawyer?",["For a reward","His conscience would not let an innocent man die","Huck convinced him","Injun Joe threatened him"],1,"He had spoken to the lawyer the night before, pushed by his conscience."],
      ["What does Injun Joe do during Tom’s story?",["He confesses everything","He leaps through the window and escapes","He attacks Tom","He laughs at the court"],1,"Quick as lightning, he crashes through the courtroom window and disappears."],
      ["How does Tom feel after the trial?",["Completely safe","A hero by day, afraid by night","Sorry for Injun Joe","Angry with Huck"],1,"By day he is a hero; by night he dreams of Injun Joe’s eyes."]
    ],
    tf:[
      ["Everybody in town believes Muff Potter is innocent.",false,"Everybody is certain he is guilty — Injun Joe’s story convinced them."],
      ["The boys visit Muff Potter at the jail.",true,"They pass tobacco and matches through the window in the evenings."],
      ["The defence lawyer asks many hard questions at first.",false,"At first he asks almost no questions, and the trial goes badly."],
      ["Tom talked to the lawyer the night before he testified.",true,"He went to the lawyer secretly because his conscience hurt him."],
      ["Injun Joe is caught as he runs from the courtroom.",false,"No hand in town is fast enough; he escapes completely."],
      ["Muff Potter is set free after Tom speaks.",true,"Tom’s true story of that midnight saves the innocent man."]
    ],
    writing:[
      {task:"Write Tom’s thoughts on the night before he speaks in court. What is he afraid of, and why will he speak anyway?",
       target:"50–70 words",
       tips:["Use the first person and present tenses.","Show the fight between fear and conscience.","End with his final decision."],
       starters:["I cannot sleep. Tomorrow...","Injun Joe’s eyes follow me everywhere, but...","Muff Potter called us his best friends...","If I stay silent, an innocent man..."]},
      {task:"Write a short news report about the dramatic end of the trial, when the real murderer escaped.",
       target:"50–70 words",
       tips:["Report the facts in the past simple.","Mention the surprise witness and the window.","Keep the report neutral and clear."],
       starters:["Drama filled our courtroom yesterday when...","The trial of Muff Potter ended in chaos...","A young witness changed everything...","Seconds after the boy spoke, glass..."]}
    ]},
  { n:7, title:"Looking for Treasure",
    sum:"Hunting for buried treasure, Tom and Huck hide upstairs in a haunted house and watch a disguised Injun Joe dig up an iron box full of gold coins — which he carries off to a mysterious place he calls Number Two, under the cross.",
    vocab:[
      ["TREASURE","hidden gold, silver, money or jewels"],
      ["HAUNTED","visited by ghosts"],
      ["GHOST","the spirit of a dead person"],
      ["SHOVEL","a tool with a wide blade for moving earth"],
      ["DISGUISE","clothes and objects that hide who you really are"],
      ["STRANGER","a person you do not know"],
      ["ROBBER","a person who steals using force or threats"],
      ["COIN","a flat round piece of metal money"],
      ["STAIRCASE","a set of stairs inside a building"],
      ["SUSPICIOUS","feeling that something is wrong or dangerous"],
      ["BURY","to put something under the ground"],
      ["FORTUNE","a very large amount of money"]
    ],
    comp:[
      ["Where do Tom and Huck dig first?",["In the graveyard","Near a dead tree","Under the schoolhouse","On Jackson’s Island"],1,"Tom explains that treasure hides under dead trees, so they start there — and find only blisters."],
      ["Where do the boys continue their treasure hunt?",["In McDougal’s Cave","In the haunted house on Cardiff Hill","Behind the church","At Muff Potter’s cabin"],1,"They move on to the silent, broken haunted house on Cardiff Hill."],
      ["Who is the old deaf-and-dumb Spaniard really?",["A real Spanish traveller","Injun Joe in disguise","Muff Potter","A harmless beggar"],1,"When the Spaniard speaks, the boys recognise Injun Joe’s voice."],
      ["What do the two men find under the floor?",["A skeleton","An iron box full of gold coins","Old letters","A bag of tools"],1,"Joe’s knife strikes wood, and an iron box heavy with gold appears."],
      ["Who hid the gold in the house long ago?",["Pirates from the sea","Robbers","The first settlers","Injun Joe himself"],1,"The thousands of dollars were hidden long ago by robbers."],
      ["Why does Injun Joe become suspicious?",["He hears the boys breathe","He sees fresh earth on the tools","He finds a footprint","The stranger warns him"],1,"Fresh earth on the pick and shovel shows that someone has been digging there."],
      ["Why does Injun Joe not search upstairs?",["He is in a hurry","The old steps break under his weight","The stranger stops him","He hears voices outside"],1,"The rotten staircase collapses, so he gives up the search."],
      ["Where will Injun Joe take the treasure?",["To Texas","To Number Two — under the cross","Back to the graveyard","To the riverbank"],1,"His words about Number Two, under the cross, haunt the boys for weeks."]
    ],
    tf:[
      ["The boys find treasure under the dead tree.",false,"The dead tree gives them nothing but blisters."],
      ["The boys explore the haunted house during the day.",true,"They decide that by day the ghosts are surely asleep."],
      ["The Spaniard really cannot hear or speak.",false,"The white beard and green glasses are only Injun Joe’s disguise."],
      ["The iron box contains thousands of dollars in gold.",true,"It is heavy with gold coins hidden long ago by robbers."],
      ["Injun Joe climbs the staircase and finds the boys.",false,"The old steps break under his weight and he gives up."],
      ["The boys hear where the treasure will be hidden next.",true,"They hear the mysterious words: Number Two — under the cross."]
    ],
    writing:[
      {task:"Describe the haunted house using your five senses. What can you see, hear, smell and feel inside?",
       target:"50–70 words",
       tips:["Use at least three different senses.","Choose atmospheric adjectives (dusty, silent, broken).","Build tension towards the sound of voices below."],
       starters:["The house stood silent on Cardiff Hill...","Dust covered everything like grey snow...","Through the broken windows...","We heard nothing at first, and then..."]},
      {task:"Imagine you are Huck. Write about the moment the old Spaniard spoke with Injun Joe’s voice.",
       target:"50–70 words",
       tips:["Describe the moment just before and just after.","Show physical reactions: cold skin, frozen breath.","Use short sentences for dramatic effect."],
       starters:["We were watching through the holes in the floor when...","At first he was just a strange old man...","Then the Spaniard spoke. I nearly...","My heart stopped, because that voice..."]}
    ]},
  { n:8, title:"Lost in the Cave",
    sum:"During a picnic Tom and Becky lose their way in McDougal’s Cave, where Injun Joe is hiding. They escape through a far opening; the sealed cave becomes Injun Joe’s grave, the gold is found under the cross, and the Widow Douglas adopts Huck.",
    vocab:[
      ["PICNIC","a meal that you take with you and eat outside"],
      ["CAVE","a large natural hole in rock or under the ground"],
      ["CANDLE","a stick of wax with a string that burns to give light"],
      ["TUNNEL","a long underground passage"],
      ["PASSAGE","a narrow way that connects one place to another"],
      ["BAT","a small flying animal that comes out at night"],
      ["ECHO","a sound that is reflected back to you"],
      ["EXHAUSTION","the state of being extremely tired"],
      ["ENTRANCE","the door or opening where you go into a place"],
      ["MIRACLE","a wonderful event that seems impossible"],
      ["WIDOW","a woman whose husband has died"],
      ["ADOPT","to take a child into your family as your own"]
    ],
    comp:[
      ["Where do the picnic children go to explore?",["Jackson’s Island","McDougal’s Cave","Cardiff Hill","The haunted house"],1,"After eating, the crowd explores the famous cave of tunnels and columns."],
      ["How do Tom and Becky mark their way at first?",["With chalk arrows","With candle smoke on the walls","With a kite string","With small stones"],1,"They mark the walls with candle smoke — but later every passage looks the same."],
      ["Who does Tom discover hiding in the cave?",["Muff Potter","Injun Joe","The Widow Douglas","A runaway robber"],1,"The hand holding the candle belongs to Injun Joe, hiding from the town."],
      ["Why does Injun Joe run away from Tom?",["He does not want witnesses","The echo changes Tom’s voice","He hears the searchers","He sees the sheriff’s lantern"],1,"The echo makes the voice strange, so the murderer runs instead of coming closer."],
      ["How does Tom finally find a way out?",["He follows a bat","He sees a tiny point of daylight","Becky remembers the path","Searchers find them"],1,"He notices far daylight and pushes through a narrow hole above the river."],
      ["How far is the opening from the main entrance?",["A few steps","One mile","Five miles","Twenty miles"],2,"The lost children come out five miles from the cave’s main entrance."],
      ["What does Judge Thatcher do to the cave?",["He explores it","He closes it with a great iron door","He sells it","He puts guards at the entrance"],1,"To protect other children, he seals the cave — not knowing Injun Joe is inside."],
      ["What happens to Huck at the end of the story?",["He runs away again","The Widow Douglas adopts him","He goes to jail","He moves to Texas"],1,"The kind Widow Douglas adopts Huck, and both boys become rich."]
    ],
    tf:[
      ["The children travel to the picnic on a ferryboat.",true,"A crowd of happy children takes the ferryboat downriver."],
      ["Tom tells Becky that Injun Joe is in the cave.",false,"He says nothing to Becky so that she will not panic."],
      ["The children are lost in the cave for several days.",true,"Only three days after they disappeared does Tom find daylight."],
      ["Injun Joe escapes from the cave before it is closed.",false,"He is trapped behind the iron door and found dead."],
      ["The treasure is found inside the cave under a cross.",true,"Number Two was in the cave: a cross drawn in candle smoke."],
      ["Tom and Huck stay poor at the end of the story.",false,"The gold is invested for them — they are the richest boys in town."]
    ],
    writing:[
      {task:"Imagine you are Tom, lost in the dark cave with one candle left. Write the message you would leave on the wall for the searchers.",
       target:"50–70 words",
       tips:["Say who you are and who is with you.","Describe your direction and your condition.","Keep the tone brave for Becky’s sake."],
       starters:["To anyone who finds this message:...","We are alive. Becky Thatcher and I...","Our candles are almost gone, so...","Follow the smoke marks on the walls..."]},
      {task:"How does Huck’s life change when the Widow Douglas adopts him? Compare his old life and his new life.",
       target:"50–70 words",
       tips:["Use comparatives: cleaner, safer, more comfortable.","Mention clothes, food, school and rules.","Say if you think Huck is happier now, and why."],
       starters:["Before, Huck slept in empty barrels; now...","Huck’s new life is very different because...","The Widow Douglas gives Huck...","Some boys would love this new life, but Huck..."]}
    ]}
];

const READINGS = {
1:[
"Tom Sawyer lived with his Aunt Polly in the small town of St. Petersburg, beside the great Mississippi River. Tom was not a bad boy, but he loved adventure more than school or work. Aunt Polly loved him deeply, although he often drove her crazy with his tricks. One warm afternoon Tom came home late with dirty clothes and a guilty face.",
"Aunt Polly decided that Tom needed a punishment he would remember. On Saturday morning, when every other boy in town was free to play, Tom had to whitewash the long wooden fence in front of the house. The fence was almost thirty metres long and taller than his head. Tom looked at the huge job and felt his heart grow heavy.",
"He dipped his brush into the white paint and made a few sad lines. Then a wonderful, clever idea arrived. When his friend Ben Rogers walked past, eating a juicy apple, Tom did not complain about the work. Instead he pretended that painting the fence was the most interesting job in the world, an honour that few boys could enjoy.",
"Ben watched Tom paint slowly and carefully, like an artist. Soon Ben was begging for a turn. Tom refused at first, which only made Ben want it more. Finally Tom agreed — but only if Ben gave him the apple. Ben handed it over happily and started to paint, while Tom sat in the shade and rested like a king.",
"All afternoon, boy after boy came to laugh at Tom and stayed to work. Each one paid for the privilege with a treasure: a dead rat on a string, twelve marbles, a piece of blue glass, a tin soldier, a one-eyed kitten. By evening the fence wore three shining coats of whitewash, and Tom had done almost nothing at all.",
"Aunt Polly could hardly believe her eyes when she saw the perfect white fence. She gave Tom the afternoon free and her best apple as a reward. Tom had discovered a great law of human nature: people always desire the thing that is hard to get. If work looks like play, everyone wants to do it — and will even pay to try."
],
2:[
"On Sunday morning Aunt Polly made Tom wash, comb his hair and put on his stiff Sunday clothes. He hated every minute of it. On the way to Sunday school he met a new girl with golden hair and blue eyes. Her name was Becky Thatcher, the daughter of the town judge, and Tom fell in love immediately.",
"At Sunday school the children received a small ticket for every two Bible verses they learned by heart. A pupil who collected enough tickets could exchange them for a prize: a new Bible, given with great ceremony in front of everyone. Tom had never learned his verses, but he wanted the glory of that prize more than anything.",
"Before the lesson began, Tom did some quiet business in the yard. He traded the treasures from the fence — marbles, glass and other riches — for the boys’ tickets. One boy took a fish-hook, another took a piece of chalk. Soon Tom’s pockets were full of tickets, though he had not learned a single verse himself.",
"When Judge Thatcher visited the class, Tom marched forward and presented his tickets. The surprised teacher had to give him the prize Bible in front of the whole school. Becky looked at him with admiration, and Tom’s heart swelled with pride. He stood tall and enjoyed his moment as the cleverest, most famous boy in the room.",
"Then the judge asked a simple, friendly question: what were the names of the first two disciples? Tom’s face turned red. He knew no answer at all, but he had to say something, so he shouted the only famous names he could remember: David and Goliath! Let us kindly close the curtain on that terrible, embarrassing moment.",
"Later that week Tom found Becky in the empty schoolyard. He showed her his best drawings and told her she was the prettiest girl he had ever seen. Becky smiled, and Tom felt braver than any pirate. School, church and even Aunt Polly’s rules seemed lighter now, because the new girl with golden hair knew his name."
],
3:[
"Huckleberry Finn was the son of the town drunkard. He slept in empty barrels, never went to school, and wore old clothes that adults hated and boys admired. Huck knew a hundred strange cures and superstitions. He told Tom that a dead cat, taken to a graveyard at midnight, could pull warts away when the devils came for a wicked soul.",
"So that night, when the church clock struck twelve, the two boys crept between the dark graves with the dead cat in a bag. The wind whispered in the trees, and an owl cried far away. Suddenly they heard human voices. Three figures came near, carrying a lantern, a rope and spades. The boys hid behind three big elm trees and waited.",
"The men were young Doctor Robinson, old Muff Potter and the dangerous Injun Joe. The doctor had paid the other two to dig up a body for his medical studies. While they worked, Injun Joe demanded more money and reminded the doctor of an old insult. Angry words became a fight, and the doctor knocked Muff Potter down with a board.",
"Then, in one terrible second, Injun Joe picked up Muff Potter’s knife and drove it into the doctor’s chest. The young man fell and did not move again. Tom and Huck, frozen with fear behind the trees, saw everything. They ran through the darkness without stopping until the lights of the village appeared, their hearts beating like drums.",
"When Muff Potter woke up, confused from the blow, Injun Joe told him a wicked lie: that Potter himself had killed the doctor during the fight. Poor Muff believed it and begged Joe to keep the secret. Injun Joe promised, but he left the knife lying beside the body, where the sheriff would surely find it in the morning.",
"In an old building the two boys made a solemn oath. They wrote their promise in blood on a piece of wood: they would keep silent about the murder forever. If they spoke, Injun Joe would surely kill them too. The next day the town arrested Muff Potter, and Tom’s conscience began to hurt him like a hidden stone."
],
4:[
"A dark week followed. Becky was ill and away from school, Aunt Polly scolded him unfairly, and the secret of the graveyard sat on his chest like a rock. Tom decided that nobody loved him and that he would leave the world of rules forever. He would begin a life of crime — a glorious, free, romantic life as a pirate.",
"He found two partners with troubles of their own: Joe Harper, whose mother had punished him for something he had not done, and Huckleberry Finn, who was always ready for anything. At midnight the three met on the riverbank with stolen bacon, a ham and a few tools. They boarded a small raft and pushed off into the great, quiet Mississippi.",
"The raft carried them to Jackson’s Island, a long wild island covered with forest, three miles below the town. There nobody could give them orders. They built a camp under an old tree, cooked bacon on an open fire, and slept under the stars. Tom the Pirate, the Black Avenger, felt happier than he had ever felt in his life.",
"The days were golden. The pirates swam in the river, hunted for turtle eggs, fished for their dinner and explored every corner of their kingdom. They marched around with wooden swords and gave each other terrifying pirate names. No school bell called them, no aunt told them to wash, and the wide brown river protected them from the whole world.",
"But in the afternoon a strange, deep boom rolled across the water. A ferryboat was moving slowly, firing a cannon over the river. Huck explained the mystery: that was how people searched for a drowned body. The boys understood in one cold moment — the town believed that they were dead, and the whole village was searching for them.",
"That night, while the others slept, homesickness crept into the camp like fog. Joe missed his mother; even brave Tom thought of Aunt Polly crying at home. Being famous and dead was exciting, but it also hurt the people they loved. Tom lay awake by the dying fire, and slowly a magnificent, secret plan began to grow in his mind."
],
5:[
"In St. Petersburg the joy had gone out of everything. The search continued for days, but the river gave no answer. Aunt Polly’s grey head bent lower and lower, and Mrs. Harper cried for her Joe. The funeral for the three drowned boys was announced for Sunday morning, and the whole sad village prepared to say goodbye.",
"What nobody knew was that Tom had already visited home. One dark night he had swum and rowed across the river, slipped into the house, and hidden under Aunt Polly’s bed. He listened while she cried and prayed for him. Tom almost showed himself — but then a bigger, brighter idea stopped him, and he crept back to the island.",
"On Sunday the church was full and silent. The minister spoke beautiful words about the three lost boys, remembering only their sweet and generous acts. Everyone cried; even the minister’s voice broke. People who had once called Tom the worst boy in town now remembered him as a little angel taken too soon from the world.",
"Then the church door opened with a creak. The minister looked up — and froze. Down the aisle marched the three dead pirates: Tom in front, then Joe, then ragged Huck at the back. They had hidden in the empty gallery, listening to their own funeral. It was, Tom thought, the proudest moment of his whole life.",
"The church exploded with joy. Aunt Polly threw her arms around Tom and covered him with kisses, laughing and crying at the same time. Mrs. Harper squeezed poor Joe until he could hardly breathe. Then someone shouted that they should sing, and the old hymn rose up so powerfully that the windows seemed to shake with happiness.",
"For a while nobody hugged Huck, who stood alone and ashamed by the door. Then Tom protested loudly that somebody should be glad to see Huck too, and Aunt Polly pulled the lonely boy into her warm arms. At school the returned pirates became heroes. Younger boys followed them everywhere, dreaming of rafts, islands and glorious adventures of their own."
],
6:[
"Summer came, and with it the day of Muff Potter’s trial. The whole town talked of nothing else. Everybody was certain the old man was guilty, and Injun Joe’s terrible story was repeated in every shop and kitchen. Tom and Huck felt sick with guilt. Their secret was heavy, but their fear of Injun Joe was even heavier.",
"The boys visited the small jail in the evenings and passed tobacco and matches through the window to Muff. The old man thanked them so warmly and kindly that their consciences burned. He blamed only himself, told them to stay away from drink, and called them the best friends he had — friends who now stood silently outside his prison.",
"In the hot courtroom the trial went badly for Muff. Witness after witness described the knife, the blood and the fight, and the lawyer for the defence asked almost no questions. Injun Joe sat calm as stone and told his lie perfectly. Muff Potter’s face lost all hope. The jury seemed ready to hang him already.",
"Then the defence called a surprise witness: Thomas Sawyer. A murmur ran through the court. Tom stood up, pale but determined. He had spoken to the lawyer the night before, because his conscience would not let an innocent man die. Every eye fixed on him as he began, slowly at first, to tell the true story of that midnight.",
"Tom described the graveyard, the fight and the moment when Injun Joe drove the knife into the doctor. As the words left his mouth, there was a crash of breaking glass. Quick as lightning, Injun Joe leaped through the courtroom window, pushed past everyone outside, and disappeared. No hand in the town was fast enough to stop him.",
"Muff Potter was free, and Tom was a hero once more — by day. By night he was a prisoner of fear. He dreamed of Injun Joe’s eyes and woke up shaking. Huck was frightened too, for the trial had shown that secrets can escape. Somewhere out there, the murderer was alive, and he knew exactly who had spoken."
],
7:[
"Every real boy, at some point, feels a burning desire to dig for hidden treasure. That summer the fever caught Tom, and he recruited Huck at once. Where do pirates and robbers hide their gold? Under dead trees, on islands, and inside haunted houses, Tom explained. They took an old pick and a shovel and started digging near a dead tree.",
"The dead tree gave them nothing but blisters, so the treasure hunters turned to the haunted house on Cardiff Hill. It stood silent and broken, with empty windows like blind eyes. By day, they decided, ghosts surely slept. The boys crept inside, explored the dusty ground floor, and then climbed the old staircase to look at the room above.",
"Suddenly they heard voices below. Through holes in the floor they saw two men enter. One was a ragged stranger; the other was an old deaf-and-dumb Spaniard who had been seen around town lately. Then the Spaniard spoke — and the boys nearly fainted. That voice belonged to Injun Joe. His white beard and green glasses were only a disguise.",
"The two men planned one more dangerous job and then escape to Texas. When they dug a hole to bury their own money, Injun Joe’s knife struck wood. Out of the ground came an old iron box, heavy with gold coins — thousands of dollars, hidden long ago by robbers. Upstairs, the boys watched with pounding hearts and dry mouths.",
"Injun Joe started to bury the box again — then stopped. Fresh earth on the tools made him suspicious. Someone had been digging here. He looked at the staircase, and the boys’ blood turned to ice. But the old steps broke under his weight, and he gave up the search. The gold would go to his other hiding place instead.",
"Before the men left, Injun Joe spoke the words that would haunt the boys for weeks: he would carry the treasure to Number Two — under the cross. Tom and Huck slipped away when the house was empty, dizzy with excitement and fear. Somewhere in town, behind that mysterious name, lay a fortune in gold, guarded by a murderer."
],
8:[
"At last Becky’s long-promised picnic took place. A crowd of happy children took the ferryboat downriver, ate mountains of food, and then explored the famous McDougal’s Cave, a cold underworld of tunnels, columns and dripping stone. Deep inside, Tom and Becky left the others to look for new wonders, marking their way with candle smoke on the walls.",
"When they tried to return, every passage looked the same. They walked and called until their voices died in the darkness; only echoes answered. Bats chased them from tunnel to tunnel, and their candles burned lower and lower. Becky cried and slept from exhaustion, while Tom held the last piece of candle and watched the small flame tremble.",
"Exploring a side passage with a kite string as his guide, Tom saw a light ahead. He shouted with joy — then froze. The hand holding the candle belonged to Injun Joe, hiding in the cave from the whole town. Luckily the echo changed Tom’s voice, and the murderer ran away instead of coming closer. Tom said nothing to Becky.",
"Three days after they disappeared, Tom noticed a far, tiny point of daylight. He pushed through a narrow hole and saw the broad Mississippi rolling below. The lost children were five miles from the main entrance. Fishermen carried them back to a town gone mad with joy, and church bells rang all night for the second miracle of the year.",
"Two weeks later Tom learned terrible news: to protect other children, Judge Thatcher had closed the cave with a great iron door. Tom turned white — Injun Joe was inside! Men rushed to the cave and found the murderer lying dead behind the door, his knife broken from useless digging. His long, cruel story had finally reached its end.",
"Tom had understood the secret at last: Number Two was inside the cave, under a cross drawn in candle smoke. He and Huck returned through Tom’s new hole and dug up the iron box of gold. The money was invested for them, and the kind Widow Douglas adopted Huck. Two ragged adventurers had become the richest boys in St. Petersburg."
]
};

const EVENTS={
1:{ev:["Tom comes home late with dirty clothes","Aunt Polly gives Tom a Saturday punishment","A clever idea arrives while Tom paints","Ben trades his apple for a turn with the brush","The boys pay treasures and the fence gets three coats","Aunt Polly gives Tom a reward for the perfect fence"],
   keys:["clothes","punishment","idea","apple","coats","reward"]},
2:{ev:["Tom meets Becky Thatcher on the way to Sunday school","Children earn tickets for learning Bible verses","Tom trades his treasures for the boys’ tickets","Tom receives the prize Bible in front of everyone","Tom answers the judge with David and Goliath","Tom shows Becky his drawings in the schoolyard"],
   keys:["Becky","tickets","traded","Bible","Goliath","drawings"]},
3:{ev:["Huck suggests a midnight cure with a dead cat","Three men arrive at the graveyard with a lantern","Injun Joe kills the doctor with Muff Potter’s knife","Injun Joe tells Muff Potter a wicked lie","The boys swear a blood oath of silence","Muff Potter is arrested for the murder"],
   keys:["cat","lantern","knife","lie","oath","arrested"]},
4:{ev:["Tom decides to leave the world of rules","Joe Harper and Huck join Tom on the raft","The pirates build a camp on Jackson’s Island","A cannon booms across the river","The boys realise the town thinks they are dead","A secret plan grows in Tom’s mind at night"],
   keys:["Harper","raft","camp","cannon","dead","plan"]},
5:{ev:["The village prepares a funeral for the boys","Tom secretly hides under Aunt Polly’s bed","The minister praises the three lost boys","The pirates march down the aisle of the church","The whole church sings the old hymn with joy","The returned boys become heroes at school"],
   keys:["funeral","bed","minister","aisle","hymn","heroes"]},
6:{ev:["The boys bring small gifts to Muff at the jail","Witness after witness speaks against Muff","The defence calls Thomas Sawyer to speak","Tom tells the true story of the graveyard","Injun Joe leaps through the courtroom window","Muff Potter walks out of the trial a free man"],
   keys:["jail","witness","Sawyer","graveyard","window","free"]},
7:{ev:["Tom and Huck dig with a pick and a shovel","The boys explore the haunted house on Cardiff Hill","The old Spaniard speaks with Injun Joe’s voice","The men dig up an iron box of gold","The broken staircase saves the hidden boys","Injun Joe names Number Two, under the cross"],
   keys:["shovel","Spaniard","box","staircase","cross","fortune"]},
8:{ev:["The picnic children explore McDougal’s Cave","Tom and Becky lose their way in the dark passages","Tom sees Injun Joe hiding deep in the cave","Tom finds a tiny point of daylight and escapes","Injun Joe is found dead behind the iron door","The treasure is found and the Widow Douglas adopts Huck"],
   keys:["picnic","candles","echo","daylight","door","Douglas"]}
};

return {level:'B1', lead:'Mark Twain · retelling · <b>B1 intermediate</b> (≈1,000 headwords)',
  CHAPTERS:CHAPTERS, READINGS:READINGS, EVENTS:EVENTS};
})();
