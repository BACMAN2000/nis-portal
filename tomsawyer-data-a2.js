window.ATTWN_DATA = (function(){
const CHAPTERS = [
  { n:1, title:"Tom and the Fence",
    sum:"Tom lives with his Aunt Polly in St. Petersburg. As a punishment he must whitewash the big fence on Saturday — but clever Tom makes the other boys pay to do the work for him.",
    vocab:[
      ["FENCE","a wooden wall around a garden or house"],
      ["WHITEWASH","to paint a wall or fence white"],
      ["BRUSH","the tool you use to paint"],
      ["AUNT","the sister of your mother or father"],
      ["PUNISH","to make someone suffer for doing wrong"],
      ["TRICK","a clever way to fool someone"],
      ["APPLE","a round red or green fruit"],
      ["SATURDAY","the day before Sunday"],
      ["CLEVER","quick and good at thinking"],
      ["MARBLE","a small glass ball children play with"],
      ["PAINT","the liquid color you put on walls"],
      ["BUCKET","an open container for water or paint"]
    ],
    comp:[
      ["Who does Tom live with?",["His parents","His Aunt Polly","His brother Sid","Huckleberry Finn"],1,"Tom is an orphan and lives with his Aunt Polly."],
      ["What is Tom’s punishment on Saturday?",["To stay in bed","To go to school","To whitewash the fence","To wash the dishes"],2,"Aunt Polly makes him paint the long fence white."],
      ["How does Tom get the other boys to work?",["He pays them money","He makes painting look like fun","He asks his aunt for help","He forces them"],1,"Tom pretends the job is a great privilege, so the boys want to try it."],
      ["What do the boys give Tom to paint the fence?",["Their homework","Their little treasures","Their lunch","Nothing"],1,"The boys give him apples, marbles and other treasures for the chance to paint."],
      ["How does Tom feel at the end of the day?",["Tired and sad","Rich and happy","Angry with his aunt","Bored"],1,"Tom does no work, collects many treasures and feels rich."],
      ["Where does Tom live?",["In New York","In St. Petersburg","In London","On Jackson’s Island"],1,"The story happens in the small town of St. Petersburg, near a big river."],
      ["Who is the first boy to pay for a turn?",["Joe Harper","Ben Rogers","Huckleberry Finn","Sid"],1,"Ben Rogers gives Tom his apple and takes the brush first."],
      ["What lesson does Tom learn?",["Work is always fun","People want things that are hard to get","Painting is easy","Aunt Polly is never angry"],1,"Tom sees that people desire a thing when it looks difficult to have."]
    ],
    tf:[
      ["Tom lived with his mother and father.",false,"Tom lived with his Aunt Polly in St. Petersburg."],
      ["Aunt Polly told Tom to whitewash the fence on Saturday.",true,"The whitewashing was Tom’s Saturday punishment."],
      ["Tom paid the other boys to paint for him.",false,"The boys paid Tom with apples, marbles and treasures for a turn."],
      ["Ben Rogers was the first boy to take the brush.",true,"Ben gave Tom his apple and started painting first."],
      ["The fence got three coats of paint.",true,"By the afternoon the boys painted the fence three times."],
      ["Tom felt sad and poor at the end of the day.",false,"Tom felt rich and happy with his bag of small treasures."]
    ],
    writing:[
      {task:"Imagine you are Ben Rogers. Write about the day you painted Tom’s fence.",target:"30–50 words",
       tips:["Use past simple verbs like walked, gave and painted","Say what you gave Tom for a turn","Say how you felt at the end of the day"],
       starters:["On Saturday I walked past Tom’s house and...","I saw Tom with a brush and a bucket, so...","At first I laughed at Tom because...","I gave Tom my apple and then..."]},
      {task:"Describe Tom Sawyer to a friend who does not know him.",target:"30–50 words",
       tips:["Say where he lived and who he lived with","Use adjectives like clever, lazy and funny","Give one example of his tricks"],
       starters:["Tom Sawyer was a boy from a small town called...","He lived with his Aunt Polly, who...","Tom did not like work, but he...","His best trick was the day when..."]}
    ]},
  { n:2, title:"Church and Becky",
    sum:"At Sunday school Tom trades his treasures for tickets and wins a prize Bible, even though he doesn’t know the answers. He also meets a pretty new girl, Becky Thatcher, and falls in love.",
    vocab:[
      ["CHURCH","a building where people pray"],
      ["BIBLE","the holy book of Christians"],
      ["TICKET","a small paper you exchange for a prize"],
      ["PRIZE","something you win"],
      ["TEACHER","a person who teaches at school"],
      ["LOVE","a very strong warm feeling for someone"],
      ["PROMISE","to say you will surely do something"],
      ["PRETTY","nice to look at; beautiful"],
      ["SHOW","to let someone see something"],
      ["QUESTION","something you ask"],
      ["SUNDAY","the day after Saturday"],
      ["ANSWER","what you say when someone asks something"]
    ],
    comp:[
      ["How does Tom get the tickets for the prize?",["He studies hard","He trades treasures with other boys","He steals them","The teacher gives them"],1,"Tom swaps his marbles and treasures for the boys’ tickets."],
      ["What prize does Tom win at Sunday school?",["A new Bible","A bicycle","Some money","An apple"],0,"The tickets can be exchanged for a Bible."],
      ["What happens when Tom gets a Bible question?",["He answers perfectly","He gives a wrong answer","He runs away","He starts to cry"],1,"Tom never learned the verses, so his answer is very wrong."],
      ["Who is the new girl in town?",["Aunt Polly","Becky Thatcher","Mary","Amy Lawrence"],1,"Becky Thatcher, the judge’s daughter, is new in St. Petersburg."],
      ["What does Tom feel for Becky?",["Fear","Love","Anger","Nothing"],1,"Tom falls in love with Becky at first sight."],
      ["Who asks Tom the Bible question?",["The teacher","Judge Thatcher","Aunt Polly","The minister"],1,"The important visitor, Judge Thatcher, asks Tom an easy question."],
      ["What wrong answer does Tom give?",["Adam and Eve","David and Goliath","Peter and Paul","Cain and Abel"],1,"Tom shouts ‘David and Goliath’, and the room goes quiet."],
      ["What does Becky throw to Tom?",["A ticket","A flower","An apple","A book"],1,"Becky watches Tom from the window and throws him a flower."]
    ],
    tf:[
      ["Tom learned his Bible verses at home.",false,"Tom never studied; he traded treasures for the tickets instead."],
      ["A student needed many tickets to win the prize Bible.",true,"Tickets came from learning verses and could be exchanged for the prize."],
      ["Tom answered the judge’s question correctly.",false,"He said ‘David and Goliath’, which was very wrong."],
      ["Becky Thatcher was the judge’s daughter.",true,"Becky was Judge Thatcher’s daughter, new in town."],
      ["Tom still loved Amy Lawrence after meeting Becky.",false,"He forgot Amy at once and fell in love with Becky."],
      ["Becky threw Tom a flower over the fence.",true,"She watched his jumps from the window, smiled and threw a flower."]
    ],
    writing:[
      {task:"Write about Tom’s day at Sunday school and the prize Bible.",target:"30–50 words",
       tips:["Explain how Tom got the tickets","Use past simple verbs like traded, won and asked","Say what happened with the judge’s question"],
       starters:["On Sunday morning Tom went to...","Tom did not learn his verses, so he...","The teacher was surprised when Tom...","Everything went wrong when the judge..."]},
      {task:"Imagine you are Becky. Write about the strange boy you saw.",target:"30–50 words",
       tips:["Describe what Tom did in front of your house","Use adjectives like funny, silly and brave","Say how you felt and what you did"],
       starters:["From my window I saw a boy who...","He jumped and danced like...","I thought he was very funny because...","At the end I threw him..."]}
    ]},
  { n:3, title:"In the Graveyard",
    sum:"At midnight Tom and Huckleberry Finn go to the graveyard to cure warts. There they secretly see Injun Joe kill young Doctor Robinson and then blame poor Muff Potter. The frightened boys promise to keep the terrible secret.",
    vocab:[
      ["GRAVEYARD","a place where dead people are buried"],
      ["MIDNIGHT","twelve o’clock at night"],
      ["MURDER","to kill a person on purpose"],
      ["DOCTOR","a person who helps sick people"],
      ["KNIFE","a sharp tool used to cut"],
      ["AFRAID","feeling fear"],
      ["SECRET","something you must not tell"],
      ["BLOOD","the red liquid inside your body"],
      ["SPADE","a tool used to dig the ground"],
      ["ESCAPE","to get away from danger"],
      ["CAT","a small animal that says miaow"],
      ["WART","a small hard bump on the skin"]
    ],
    comp:[
      ["Why do Tom and Huck go to the graveyard at night?",["To dig for gold","To cure warts with a dead cat","To meet Becky","To hide from the police"],1,"Huck believes a dead cat can cure warts in a graveyard at midnight."],
      ["Who do the boys see in the graveyard?",["Aunt Polly and Mary","Injun Joe, Muff Potter and Doctor Robinson","Becky and her father","No one"],1,"Three men come in the dark with a lantern and a spade."],
      ["Who kills Doctor Robinson?",["Muff Potter","Injun Joe","Huck","Tom"],1,"Injun Joe stabs the doctor with the knife."],
      ["Who does Injun Joe blame for the murder?",["Tom","Huck","Muff Potter","The doctor"],2,"He puts the knife in the hand of the sleeping Muff Potter."],
      ["What do Tom and Huck decide to do?",["Tell the police at once","Keep the murder a secret","Fight Injun Joe","Run away forever"],1,"They are terrified of Injun Joe, so they promise to keep silent."],
      ["What does Huck carry to the graveyard?",["A spade","A dead cat","A candle","A Bible"],1,"Huck brings a dead cat in a bag to cure his warts."],
      ["Why do the three men come to the graveyard?",["To pray","To dig up a grave","To hide treasure","To catch the boys"],1,"They dig up a grave for the young doctor."],
      ["How do the boys seal their promise?",["They shake hands","They sign an oath in blood","They tell the teacher","They pray in church"],1,"Tom and Huck write an oath and sign it in blood."]
    ],
    tf:[
      ["The boys went to the graveyard to look for gold.",false,"They went at midnight to cure warts with a dead cat."],
      ["Three men came to the graveyard with a lantern and a spade.",true,"Injun Joe, Muff Potter and Doctor Robinson arrived in the dark."],
      ["Muff Potter killed Doctor Robinson.",false,"Injun Joe killed the doctor with the knife."],
      ["Injun Joe put the knife in Muff Potter’s hand.",true,"He wanted the sleeping Potter to look guilty."],
      ["Muff Potter knew he was innocent.",false,"Potter believed Injun Joe’s lie and thought he did it himself."],
      ["Tom and Huck signed an oath to keep the secret.",true,"They were too afraid of Injun Joe to tell anyone."]
    ],
    writing:[
      {task:"Write what Tom and Huck saw in the graveyard that night.",target:"30–50 words",
       tips:["Put the events in the correct order","Use past simple verbs like heard, saw and ran","Say how the boys felt"],
       starters:["At midnight Tom and Huck walked to...","Behind the trees the boys heard...","Suddenly Injun Joe took out...","The boys were so afraid that..."]},
      {task:"Write Tom’s secret diary page after the night in the graveyard.",target:"30–50 words",
       tips:["Write in the first person with I and we","Explain why you cannot tell the truth","Use feeling words like afraid and terrible"],
       starters:["Dear diary, tonight I saw something terrible...","I cannot sleep because...","Huck and I made an oath, so...","I feel sorry for Muff Potter because..."]}
    ]},
  { n:4, title:"The Young Pirates",
    sum:"Feeling unhappy, Tom runs away with his friends Joe Harper and Huck. On a raft they sail to Jackson’s Island to live free as pirates. In town, everybody thinks the three boys have drowned in the river.",
    vocab:[
      ["PIRATE","a robber who sails the seas"],
      ["ISLAND","land with water all around it"],
      ["RIVER","a long line of water flowing to the sea"],
      ["RAFT","a flat boat made of wood"],
      ["CAMP","a place to live outside in tents"],
      ["FIRE","the hot bright flames that give heat"],
      ["FREEDOM","being free to do what you want"],
      ["SWIM","to move through water"],
      ["ADVENTURE","an exciting and risky experience"],
      ["DROWN","to die under the water"],
      ["FISH","an animal that lives and swims in water"],
      ["STORM","very bad weather with wind and rain"]
    ],
    comp:[
      ["Who runs away with Tom?",["Becky and Amy","Joe Harper and Huck","Sid and Mary","Injun Joe"],1,"Tom, Joe Harper and Huckleberry Finn go together."],
      ["Where do the boys go?",["To the graveyard","To Jackson’s Island","To Becky’s house","To another town"],1,"They travel to Jackson’s Island in the middle of the river."],
      ["What do the boys want to be?",["Soldiers","Pirates","Teachers","Farmers"],1,"They dream of living free as pirates."],
      ["How do they get to the island?",["They swim","On a wooden raft","By train","In a big ship"],1,"They float across the river on an old raft."],
      ["What do the townspeople think happened to the boys?",["They went to school","They drowned in the river","They are on holiday","They ran to the city"],1,"When the boys disappear, everyone believes they have drowned."],
      ["Why does Tom want to run away?",["He is happy at school","He feels sad and misunderstood","Aunt Polly sends him away","He wants to find gold"],1,"Becky is cold to him and Tom thinks nobody understands him."],
      ["What do the boys eat on the island?",["Only bread","Fish they catch","Restaurant food","Nothing at all"],1,"They catch fish and cook them on their fire."],
      ["What does the boat on the river do?",["It carries pirates","It fires a cannon to find bodies","It brings the boys food","It takes them home"],1,"The boat fires a cannon over the water to search for the dead boys."]
    ],
    tf:[
      ["Tom ran away alone.",false,"Joe Harper and Huck went with him on the adventure."],
      ["The boys traveled to the island on a raft.",true,"They floated across the great river at night."],
      ["The boys wanted to be soldiers.",false,"They dreamed of living free and rich as pirates."],
      ["A storm hit the island one night.",true,"Wind and rain shook the boys’ little camp."],
      ["The boys felt happy every single day on the island.",false,"After some days they felt lonely, and Joe missed his mother."],
      ["The town believed the boys drowned in the river.",true,"A boat searched the water for their bodies."]
    ],
    writing:[
      {task:"Describe one day on Jackson’s Island as a young pirate.",target:"30–50 words",
       tips:["Write about swimming, fishing and the camp","Use past simple verbs like swam, cooked and played","Say why the boys felt free"],
       starters:["In the morning we went for a swim in...","We caught fish and cooked them on...","On the island nobody told us...","At night we slept under..."]},
      {task:"Imagine you are Aunt Polly. Write about the day Tom disappeared.",target:"30–50 words",
       tips:["Write in the first person with I","Use feeling words like worried, sad and afraid","Say what the town did to find the boys"],
       starters:["On that terrible morning Tom was not in...","I looked for him everywhere, but...","A boat searched the river because...","I cried all night thinking about..."]}
    ]},
  { n:5, title:"Back from the Dead",
    sum:"The town believes the boys are dead and prepares a funeral. Tom has a secret plan: the three ‘dead’ pirates walk into the church during their own funeral. Everyone is amazed and happy, and Aunt Polly hugs Tom.",
    vocab:[
      ["FUNERAL","a ceremony for a dead person"],
      ["ALIVE","living; not dead"],
      ["SURPRISE","a sudden unexpected thing"],
      ["CRY","to have tears in your eyes"],
      ["HUG","to hold someone in your arms with love"],
      ["HERO","a very brave and admired person"],
      ["RETURN","to come back"],
      ["HAPPY","feeling joy"],
      ["PLAN","an idea of how to do something"],
      ["AMAZED","very surprised"],
      ["DEAD","not living any more"],
      ["SONG","music that you sing"]
    ],
    comp:[
      ["What does the town prepare for the boys?",["A party","A funeral","A trip","A prize"],1,"Believing them dead, the town organizes a funeral in the church."],
      ["What is Tom’s secret plan?",["To stay on the island","To watch their own funeral","To move to a new town","To catch Injun Joe"],1,"Tom’s plan is for the boys to appear during their own funeral."],
      ["How do the boys enter the church?",["They knock on the door","They walk in during the funeral","They climb a window","They send a letter"],1,"The three ‘dead’ boys walk in while everyone mourns them."],
      ["How do the people react?",["They are angry","They are amazed and happy","They faint and leave","They say nothing"],1,"The whole church is amazed, then very happy and full of joy."],
      ["Who hugs Tom?",["Becky","Aunt Polly","Injun Joe","The teacher"],1,"Aunt Polly cries happy tears and hugs Tom."],
      ["What does Tom do secretly one night?",["He visits Aunt Polly’s house","He steals a boat","He talks to Becky","He fights Injun Joe"],0,"Tom crosses the river and listens to the sad women at home."],
      ["What does Tom become at school after his return?",["A problem","A great hero","A teacher","A quiet boy"],1,"The other boys admire Tom and want to hear his island stories."],
      ["What still worries Tom after the funeral?",["His homework","Muff Potter in prison","The lost raft","Becky’s father"],1,"Tom knows poor Muff Potter is innocent and still waits in prison."]
    ],
    tf:[
      ["Tom visited his aunt’s house secretly one night.",true,"He crossed the dark river and listened inside the house."],
      ["The funeral was at the school.",false,"The funeral service was in the church, full of people in black."],
      ["The boys watched their own funeral and walked in.",true,"That was exactly Tom’s secret plan."],
      ["The people were angry when the boys appeared.",false,"They were amazed, then everyone laughed and sang a happy song."],
      ["Aunt Polly hugged Tom in the church.",true,"She cried again, but this time with happy tears."],
      ["Tom forgot about Muff Potter completely.",false,"The thought of Potter waiting in prison stayed in his mind."]
    ],
    writing:[
      {task:"Write a short letter from Tom to Joe Harper about the great funeral plan.",target:"30–50 words",
       tips:["Explain the plan step by step","Use future words like will and can","Make the plan sound exciting"],
       starters:["Dear Joe, I have a fantastic plan...","The town thinks we are dead, so...","On Sunday we will cross the river and...","Imagine their faces when we..."]},
      {task:"Describe the moment the three boys walked into their own funeral.",target:"30–50 words",
       tips:["Describe the church before and after","Use past simple verbs like opened, walked and cried","Say how Aunt Polly reacted"],
       starters:["The church was full of sad people when...","Suddenly the door opened and...","Nobody could speak because...","Aunt Polly ran to Tom and..."]}
    ]},
  { n:6, title:"Muff Potter’s Trial",
    sum:"Poor Muff Potter is put on trial for the murder of Doctor Robinson. Tom is very afraid of Injun Joe, but in court he is brave and tells the truth. Injun Joe jumps through the window and escapes.",
    vocab:[
      ["TRIAL","when a court decides if someone is guilty"],
      ["JUDGE","the person who leads a court"],
      ["COURT","the place where trials happen"],
      ["TRUTH","what is really true"],
      ["WITNESS","a person who tells what they saw"],
      ["GUILTY","having done something wrong"],
      ["INNOCENT","not guilty"],
      ["BRAVE","not afraid of danger"],
      ["WINDOW","the glass opening in a wall"],
      ["JUSTICE","fair treatment under the law"],
      ["PRISON","the place where criminals are locked up"],
      ["LAWYER","a person who defends people in court"]
    ],
    comp:[
      ["Who is on trial for the murder?",["Injun Joe","Muff Potter","Tom","The doctor"],1,"Everyone wrongly believes Muff Potter is the killer."],
      ["Who tells the truth in court?",["Huck","Tom","Aunt Polly","Becky"],1,"Tom is brave and stands up to tell what really happened."],
      ["Who is the real murderer?",["Muff Potter","Injun Joe","Joe Harper","No one"],1,"Injun Joe killed Doctor Robinson and blamed Muff Potter."],
      ["What does Injun Joe do when Tom speaks?",["He confesses","He jumps out the window and escapes","He cries","He attacks the judge"],1,"He crashes through the courtroom window and runs away."],
      ["Why is Tom brave?",["He is not afraid of anything","He tells the truth even though he is scared","He fights Injun Joe","He is bigger than the men"],1,"Tom is terrified of Injun Joe but tells the truth to save an innocent man."],
      ["Who calls Tom to speak at the trial?",["The judge","Muff Potter’s lawyer","Injun Joe","Aunt Polly"],1,"The lawyer surprises the court and calls Thomas Sawyer."],
      ["Where does Muff Potter wait before the trial?",["At home","In the small prison","On the island","In the church"],1,"Potter waits alone in prison while the town calls him guilty."],
      ["How does Tom feel at night after the trial?",["Completely calm","Afraid of Injun Joe","Proud and relaxed","Angry with Huck"],1,"Injun Joe is free somewhere, and Tom sees his cold eyes in dreams."]
    ],
    tf:[
      ["Injun Joe was on trial for the murder.",false,"Muff Potter was on trial; the town thought he was guilty."],
      ["Tom spoke as a witness in court.",true,"The lawyer called Tom, and he told the truth about the graveyard."],
      ["Tom felt no fear when he spoke.",false,"He was afraid of Injun Joe but chose to be brave."],
      ["Injun Joe escaped through the window.",true,"He jumped through the court window before anyone could move."],
      ["Muff Potter was set free.",true,"The court declared him an innocent man at last."],
      ["The police caught Injun Joe that same week.",false,"Nobody found him anywhere, and Tom had bad dreams."]
    ],
    writing:[
      {task:"Imagine you are Tom. Write about the day you spoke in court.",target:"30–50 words",
       tips:["Write in the first person with I","Say why you decided to tell the truth","Describe what Injun Joe did"],
       starters:["My legs shook when the lawyer called...","I looked at Muff Potter and decided...","When I said the name, Injun Joe...","Now I am afraid because..."]},
      {task:"Write a short newspaper report about the end of the trial.",target:"30–50 words",
       tips:["Give the report a short title","Answer who, what and where","Use past simple verbs like escaped and declared"],
       starters:["Yesterday the court of St. Petersburg heard...","A young boy, Thomas Sawyer, told...","The real murderer escaped through...","Muff Potter is now a free man because..."]}
    ]},
  { n:7, title:"Looking for Treasure",
    sum:"Tom and Huck dream of finding hidden treasure. In an old haunted house they hide and watch Injun Joe, in disguise, dig up a box full of gold. The boys are excited and decide to follow the money.",
    vocab:[
      ["TREASURE","hidden gold, money or jewels"],
      ["GOLD","a valuable shiny yellow metal"],
      ["HAUNTED","a place where ghosts live"],
      ["GHOST","the spirit of a dead person"],
      ["DIG","to make a hole in the ground"],
      ["BOX","a container with a lid"],
      ["HIDE","to put out of sight"],
      ["LUCK","good things that happen by chance"],
      ["MONEY","coins and notes you pay with"],
      ["DISGUISE","clothes that hide who you are"],
      ["COIN","a small round piece of metal money"],
      ["CROSS","a mark or shape like the letter X"]
    ],
    comp:[
      ["What do Tom and Huck look for?",["A lost dog","Hidden treasure","Their homework","Becky"],1,"The boys go treasure hunting, hoping to get rich."],
      ["Where do they hide?",["In the school","In an old haunted house","On the island","In the church"],1,"They explore and hide upstairs in the haunted house."],
      ["Who comes into the house?",["Aunt Polly","Injun Joe in disguise","The judge","Becky’s father"],1,"Injun Joe arrives, disguised as an old deaf Spaniard."],
      ["What does Injun Joe find in the house?",["A dead cat","A box full of gold","A knife","Nothing"],1,"The men’s tools hit a box with thousands of dollars in gold."],
      ["What do the boys decide to do?",["Tell the teacher","Follow Injun Joe and the treasure","Forget about it","Go home to sleep"],1,"They want the gold, so they decide to watch for Injun Joe."],
      ["What do the boys use to dig?",["Their hands","A pick and a spade","A knife","A machine"],1,"They take a pick and a spade to dig under the trees."],
      ["What strange words does Injun Joe say?",["Under the tree","Number Two — under the cross","Behind the church","Inside the cave"],1,"He says he will take the gold to ‘Number Two — under the cross’."],
      ["Who does Injun Joe pretend to be?",["A rich judge","An old deaf Spaniard","A teacher","A doctor"],1,"His disguise fools everyone until he speaks."]
    ],
    tf:[
      ["The boys found treasure under the trees on the first day.",false,"They dug for hours, but their luck was very bad."],
      ["Huck was afraid of ghosts.",true,"He feared the haunted house but agreed to go in."],
      ["The old Spaniard was really Injun Joe.",true,"When the man spoke, the boys recognized his voice."],
      ["The box was full of silver spoons.",false,"It held thousands of dollars in gold coins."],
      ["Injun Joe left the gold in the haunted house.",false,"He carried the box away to ‘Number Two — under the cross’."],
      ["The boys promised to find the treasure one day.",true,"They dreamed about the box of gold and kept watching the town."]
    ],
    writing:[
      {task:"Describe the haunted house and what happened inside.",target:"30–50 words",
       tips:["Describe the house with adjectives like old, dark and silent","Put the events in the correct order","Say how the boys felt upstairs"],
       starters:["The haunted house stood alone at the end of...","Tom and Huck went in on a quiet...","Suddenly two men came in with...","From upstairs the boys saw..."]},
      {task:"Imagine you are Huck. Write about the moment you heard the Spaniard speak.",target:"30–50 words",
       tips:["Write in the first person with I","Say who the Spaniard really was","Use feeling words like afraid and excited"],
       starters:["We hid upstairs when the men...","The old Spaniard opened his mouth and...","My heart stopped because the voice was...","Then the men found a box full of..."]}
    ]},
  { n:8, title:"Lost in the Cave",
    sum:"At a school picnic Tom and Becky get lost in the dark McDougal’s Cave, where Injun Joe is hiding. They finally escape, but Injun Joe is trapped and dies inside. At the end, Tom and Huck find the treasure and become rich.",
    vocab:[
      ["CAVE","a big hole in a rock or hill"],
      ["PICNIC","a meal eaten outside for fun"],
      ["LOST","not knowing where you are"],
      ["DARK","without light"],
      ["CANDLE","a stick of wax that gives light"],
      ["BAT","a small animal that flies at night"],
      ["RESCUE","to save someone from danger"],
      ["HUNGRY","needing to eat"],
      ["RICH","having a lot of money"],
      ["TRAP","to catch and hold so it cannot escape"],
      ["DOOR","you open it to go into a place"],
      ["WIDOW","a woman whose husband is dead"]
    ],
    comp:[
      ["Where does the school picnic end up?",["On the island","In McDougal’s Cave","In the church","At Tom’s house"],1,"The children explore McDougal’s Cave with candles."],
      ["Who gets lost in the cave?",["Tom and Huck","Tom and Becky","Joe and Huck","Aunt Polly"],1,"Tom and Becky walk deeper than the others and get lost."],
      ["Who else is hiding in the cave?",["Muff Potter","Injun Joe","The judge","A pirate"],1,"Tom sees Injun Joe’s candle behind a rock."],
      ["What happens to Injun Joe?",["He escapes again","He is trapped in the cave and dies","He goes to prison","He becomes good"],1,"When the iron door closes the cave, Injun Joe is trapped inside and dies."],
      ["How does the story end for Tom and Huck?",["They are still poor","They find the treasure and become rich","They move away","They lose the gold"],1,"The boys recover the box of gold under the cross."],
      ["What helps Tom explore the dark passages?",["A map","A kite string","A rope","A dog"],1,"Tom uses a kite string so he can find his way back to Becky."],
      ["How do Tom and Becky finally get out?",["Through the main door","Through a small far opening","People dig them out","Injun Joe shows them"],1,"Tom finds a far opening, and they climb out into the sunshine."],
      ["Who gives Huck a new home at the end?",["Aunt Polly","The Widow Douglas","Judge Thatcher","The teacher"],1,"The kind Widow Douglas takes Huck into her home."]
    ],
    tf:[
      ["The picnic children traveled by boat.",true,"They took a boat down the river and later explored the cave."],
      ["Tom and Becky stayed close to the other children.",false,"They walked deeper into the cave and got lost."],
      ["The children’s candles lasted for days.",false,"Their last candle burned down and died in the dark."],
      ["Tom saw Injun Joe inside the cave.",true,"He saw a light and a hand with a candle behind a rock."],
      ["Injun Joe escaped from the cave.",false,"He died behind the strong iron door."],
      ["Tom and Huck found the gold under the cross.",true,"They returned to the cave and became rich at last."]
    ],
    writing:[
      {task:"Imagine you are Becky. Write about being lost in the cave.",target:"30–50 words",
       tips:["Write in the first person with I and we","Use adjectives like dark, cold and hungry","Say what Tom did to save you"],
       starters:["The cave was beautiful until we...","Our last candle died and I...","Tom held my hand and promised...","At last we saw sunshine through..."]},
      {task:"Write the end of the story: the treasure and Huck’s new home.",target:"30–50 words",
       tips:["Say where the boys found the gold","Explain what happened to Injun Joe","Say who adopted Huck"],
       starters:["After the cave was closed, Tom and Huck...","Under the cross they found...","Injun Joe never left the cave because...","Huck got a new home with..."]}
    ]}
];

const READINGS = {
1:[
"Tom Sawyer lived with his Aunt Polly in St. Petersburg. It was a small town near a big river. Tom did not like school or work. He loved games, adventures and tricks. One Friday he came home very late. Aunt Polly was angry with him.",
"On Saturday morning the sun was warm and bright. Aunt Polly gave Tom a brush and a bucket. She said, “Whitewash the fence. That is your punishment.” The fence was very long and very high. Tom looked at it and felt sad. All the other boys were free that day.",
"Then Ben Rogers walked past with a big apple. Tom had a clever idea. He moved the brush slowly, like an artist. “This is not work,” Tom said. “Not every boy can whitewash a fence.” Ben watched with big eyes. He wanted to try it too.",
"Ben gave Tom his apple and took the brush. Soon more boys came to the fence. Every boy paid Tom for a turn. They gave him marbles, a dead rat and a kite. Tom sat under a tree and ate apples. He watched the boys do his work.",
"By the afternoon the fence had three coats of white paint. The boys were tired, but Tom was happy. He was now a rich boy. He had a bag full of small treasures. Aunt Polly came out and looked at the fence. She was very surprised.",
"“Good work, Tom,” Aunt Polly said. She gave him an apple and let him go. Tom ran away to play at once. He learned an important lesson that day. People want a thing when it is hard to get. It was a fine trick."
],
2:[
"On Sunday morning everyone in town went to church. Tom wore his best clothes and clean shoes. He hated them, but Aunt Polly said nothing else. First the children went to Sunday school. There the teacher gave tickets to good students. Tickets came from learning Bible verses.",
"A student with many tickets won a prize. The prize was a beautiful new Bible. Tom never learned his verses at home. But he had a pocket full of treasures. Outside the door he traded with the boys. He gave marbles and got their tickets.",
"Soon Tom had more tickets than any student. He walked to the front and asked for the prize. The teacher was surprised, but he gave Tom the Bible. Everyone looked at the new hero of the school. An important visitor was there that day. He was Judge Thatcher.",
"The judge asked Tom an easy Bible question. “Who were the first two disciples?” he said. Tom did not know the answer at all. At last he shouted, “David and Goliath!” The answer was very wrong. Everyone in the room went quiet.",
"That day Tom also saw a new girl. Her name was Becky Thatcher, the judge’s daughter. She had blue eyes and long yellow hair. Tom thought she was very pretty. He forgot his old friend Amy Lawrence at once. Tom fell in love immediately.",
"Tom wanted to show Becky all his best moves. He jumped and danced in front of her house. He stood on his head and shouted. Becky watched him from the window and smiled. She threw a flower to him over the fence. Tom kept the flower and made a promise. He said, “I will love Becky forever.”"
],
3:[
"One night Tom met Huckleberry Finn near the town. Huck carried a dead cat in a bag. “A dead cat can cure warts,” Huck said. “You must take it to the graveyard at midnight.” Tom loved this strange plan very much. The two boys walked into the dark night.",
"The graveyard was quiet, cold and full of shadows. The boys hid behind some old trees. Then they heard voices in the dark. Three men walked in with a lantern and a spade. They were Injun Joe, Muff Potter and Doctor Robinson. The boys were too afraid to move.",
"The men dug up a grave for the doctor. Then they argued loudly about more money. Muff Potter jumped at the doctor first. The doctor hit him, and Potter fell down. He lay still on the cold ground. Injun Joe took out a long knife.",
"Injun Joe killed Doctor Robinson with the knife. There was blood on the young doctor’s coat. Tom and Huck saw the terrible murder. They could not speak or breathe. Then Injun Joe did an evil thing. He put the knife in Muff Potter’s hand.",
"Muff Potter opened his eyes a little later. He saw the knife in his own hand. “Did I do this?” he asked sadly. “Yes, you did it,” Injun Joe lied. Poor Muff Potter believed the terrible lie. Then Injun Joe made his quiet escape.",
"Tom and Huck ran away as fast as possible. They stopped at an old empty building. “We must never tell this secret,” Tom said. They wrote an oath and signed it in blood. “Muff Potter is not the murderer,” Huck whispered. But both boys were too afraid to talk."
],
4:[
"Tom felt sad and angry with the whole world. Becky was cold to him at school. Nobody understood him, he thought. So Tom decided to leave his old life. He met Joe Harper, who felt the same. They asked Huck to join their big adventure.",
"The three boys wanted to be pirates. “Pirates are free and rich,” Tom said. At night they met by the great river. They found an old raft by the water. They put bread and meat on it. Then they floated away in the dark.",
"The raft carried them to Jackson’s Island. The island was green, wild and empty. The boys made a camp under the trees. They lit a fire and cooked their food. Nobody could tell them what to do. This was true freedom at last.",
"The first days on the island were wonderful. Every morning the boys went for a swim. They caught fish and cooked them slowly. They played pirates on the warm yellow sand. At night they slept under the stars. No school, no church, no Aunt Polly.",
"One night a big storm hit the island. Wind and rain shook the little camp. After some days the boys felt lonely too. Joe wanted his mother and his warm home. Then a boat came slowly down the river. It fired a cannon over the water.",
"The boat searched the river for dead bodies. “Boys sometimes drown in that water,” Huck said. Everyone in town thought the three friends were dead. Tom felt strange, sad and a little proud. That night he left the camp very quietly. He had a secret plan in his head."
],
5:[
"That night Tom swam across the dark river. He walked quietly to Aunt Polly’s house. Inside, the women cried about the boys. “Tom was not a bad boy,” said Aunt Polly. Tom listened under the bed and almost cried too. Then he went back to the island quietly.",
"On the island Tom told his secret plan. “The town will have a funeral for us,” he said. “We can watch it and then walk in!” Joe and Huck loved the crazy idea. The boys waited on the island three more days. On Sunday morning they crossed the river again.",
"The church was full of sad people in black. The minister spoke kind words about the boys. Everyone remembered the three young friends. Aunt Polly began to cry loudly. Becky cried too, full of tears. Then the church door opened slowly.",
"The three dead boys walked in together. People stood up and could not speak. They were amazed — the boys were alive! Then everyone laughed and sang a happy song. Aunt Polly gave Tom a very big hug. She cried again, but with happy tears.",
"The return of the boys was a big surprise. People hugged the three young pirates warmly. Nobody was angry that morning, only glad. At school Tom became a great hero. The other boys watched him with open mouths. Everyone wanted to hear about the island.",
"Tom told his adventure stories again and again. Each time the stories grew a little bigger. Becky smiled at Tom in the classroom. He felt happy and proud all week. But one dark cloud stayed in his mind. Poor Muff Potter still waited in prison."
],
6:[
"Summer came, and everyone talked about the murder. Muff Potter waited alone in the small prison. People in town said he was guilty. Tom and Huck felt terrible about their secret. Sometimes they stood outside the prison window. They gave poor Muff small presents there.",
"At last the day of the trial arrived. The court was full of people from town. The judge sat in his high chair. Injun Joe sat inside as a witness too. He told his lie with a calm face. Things looked very dark for Muff Potter.",
"Muff Potter’s lawyer stood up on the last day. “I call Thomas Sawyer!” he said loudly. Everyone in the court turned to look. Tom walked to the front on weak legs. He was afraid, but he made his choice. Injun Joe watched him with cold eyes.",
"Tom told the truth about the graveyard night. He described the fight and the knife. “Injun Joe killed Doctor Robinson,” said Tom. Suddenly Injun Joe jumped up like lightning. He crashed through the window of the court. He escaped before any man could move.",
"The court set Muff Potter free that day. He was an innocent man at last. He thanked Tom with tears in his eyes. The town called Tom brave and good. Justice finally came to St. Petersburg. By day Tom felt like a hero.",
"But at night Tom could not sleep well. Injun Joe was free somewhere in the dark. Tom saw the man’s cold eyes in dreams. Huck was afraid too, day and night. Nobody found Injun Joe anywhere. The two boys waited and hoped."
],
7:[
"One hot day Tom wanted a new adventure. “Let’s dig for hidden treasure,” he told Huck. “Dead pirates hide gold under old trees.” The boys took a pick and a spade. They dug for hours, but found nothing. Their luck was very bad that day.",
"“Let’s try the haunted house,” said Tom. Huck was afraid of ghosts, but agreed. The old house stood alone and silent. Its windows were broken and dark. The boys went in on a quiet afternoon. Upstairs they explored the dusty rooms.",
"Suddenly they heard men at the door. The boys hid upstairs and looked down. Two men came in with a heavy bag. One was an old deaf Spaniard, they thought. Then the man spoke, and the boys froze. The Spaniard was Injun Joe in disguise!",
"The men wanted to hide their stolen money. They dug a hole in the corner. Then their tools hit something hard and old. It was a box full of gold coins! “Thousands of dollars,” whispered Injun Joe. The boys’ eyes grew big upstairs.",
"Injun Joe decided not to leave the gold. “We take it to Number Two,” he said. “Under the cross.” The strange words stayed in the boys’ heads. The men carried the treasure box away. Tom and Huck came down much later. Their legs still shook with fear.",
"After that day the boys watched the town. They looked for Injun Joe everywhere. “Number Two — under the cross,” Tom repeated. What did the strange words mean? The boys dreamed about the box of gold. They promised to find that treasure one day."
],
8:[
"Becky’s mother organized a big school picnic. The children took a boat down the river. They played games and ate wonderful food. Later they explored McDougal’s Cave with candles. The cave was cool, dark and enormous. Tom and Becky walked deeper than the others.",
"The two friends looked at strange rock shapes. Bats flew at their small candle lights. The children ran deeper into new passages. After many turns they stopped and shouted. Nobody answered them in the black silence. Tom and Becky were lost in the cave.",
"They walked for hours and grew very hungry. They shared a small piece of picnic cake. Becky cried, and Tom held her hand. “I will find a way,” he promised. Soon the last candle burned down and died. The darkness around them was total now.",
"Tom explored side passages with a kite string. In one passage he saw a light. A hand with a candle came around a rock. It was Injun Joe, hiding in the cave! Tom ran back to Becky without a sound. Luckily, the man did not see him.",
"At last Tom found a small far opening. The two children climbed out into the sunshine. The town celebrated their wonderful rescue. Days later, Judge Thatcher closed the cave. Workers put a strong iron door on it. “Injun Joe is inside!” Tom shouted then.",
"Men opened the cave and found Injun Joe dead. The cave became a trap for the bad man. Later Tom and Huck returned for the treasure. They found the gold box under the cross. The two boys were rich at last! The kind Widow Douglas took Huck into her home."
]
};

const EVENTS={
1:{ev:[
  "Tom came home late, so Aunt Polly was angry.",
  "Tom got the fence as his Saturday punishment.",
  "Ben Rogers watched Tom and paid to paint first.",
  "Many boys gave Tom marbles and treasures for a turn.",
  "Aunt Polly saw the white fence and was surprised.",
  "Tom went off to play, happy with his clever trick."
],keys:["Friday","punishment","Ben","marbles","surprised","trick"]},
2:{ev:[
  "Tom traded his treasures for the boys’ tickets.",
  "Tom asked the teacher for the prize Bible.",
  "Judge Thatcher asked Tom an easy Bible question.",
  "Tom gave a very wrong answer in front of everyone.",
  "Tom saw Becky and fell in love at once.",
  "Becky threw Tom a flower from her window."
],keys:["tickets","prize","Thatcher","answer","Becky","flower"]},
3:{ev:[
  "Huck took a dead cat to the graveyard to cure warts.",
  "Three men came to the graveyard with a lantern and a spade.",
  "Injun Joe took out a long knife during the fight.",
  "The boys saw the murder of Doctor Robinson.",
  "Injun Joe made sleeping Muff Potter believe the lie.",
  "Tom and Huck signed an oath to keep the secret."
],keys:["cat","spade","knife","murder","Potter","oath"]},
4:{ev:[
  "Unhappy Tom decided to run away with Joe Harper and Huck.",
  "The boys floated to Jackson’s Island on an old raft.",
  "They made a camp with a fire and felt free.",
  "They enjoyed a swim and fresh fish every day.",
  "A storm shook the island, and the boys felt lonely.",
  "The town believed the boys drowned in the river."
],keys:["Harper","raft","camp","swim","storm","drown"]},
5:{ev:[
  "Tom secretly visited Aunt Polly’s house at night.",
  "Tom told Joe and Huck his secret funeral plan.",
  "The minister spoke about the boys at the funeral.",
  "The boys walked in, alive, during their own funeral.",
  "Aunt Polly gave Tom a big happy hug.",
  "Tom became the great hero of the school."
],keys:["Polly","plan","minister","alive","hug","hero"]},
6:{ev:[
  "Muff Potter waited in prison before the trial.",
  "Injun Joe told his lie as a witness in court.",
  "The lawyer called Thomas Sawyer to speak.",
  "Tom told the truth about the graveyard night.",
  "Injun Joe escaped through the window of the court.",
  "Muff Potter walked free, an innocent man at last."
],keys:["prison","witness","lawyer","truth","window","innocent"]},
7:{ev:[
  "Tom and Huck dug under the trees for treasure.",
  "The boys explored the old haunted house.",
  "They discovered Injun Joe under his Spaniard disguise.",
  "The men found a box full of gold coins.",
  "Injun Joe spoke of Number Two, under the cross.",
  "The boys promised to find the gold one day."
],keys:["treasure","haunted","disguise","coins","cross","gold"]},
8:{ev:[
  "The children explored the cave after the school picnic.",
  "Tom and Becky got lost in the dark passages.",
  "Tom saw a light and found Injun Joe hiding.",
  "Tom found a far opening, and the children escaped.",
  "The cave got an iron door, and Injun Joe died inside.",
  "Tom and Huck found the treasure under the cross."
],keys:["picnic","lost","light","opening","iron","cross"]}
};

return {level:'A2', lead:'Mark Twain · easy retelling · <b>A2 elementary</b> (≈600 headwords)',
  CHAPTERS:CHAPTERS, READINGS:READINGS, EVENTS:EVENTS};
})();
