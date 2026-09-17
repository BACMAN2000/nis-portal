window.ATTWN_DATA = (function(){
const CHAPTERS = [
  { n:1, title:"Old Major's dream", unit:1, span:"Chapter 1",
    sum:"On Manor Farm, the drunken farmer Mr Jones forgets to lock the henhouses. That night, the animals meet old Major, a respected prize boar, who describes a dream of a world with no humans. He explains that man produces nothing but takes everything, teaches the animals an old song about freedom, and warns them never to become cruel like man. Three days later, Major dies peacefully in his sleep.",
    vocab:[["FARM","a place where people keep animals and grow food"],["DRUNK","having drunk too much alcohol"],["HENHOUSE","a small building where hens sleep"],["BOAR","an adult male pig"],["PRIZE","a reward given for being the best"],["RESPECT","a feeling of admiration for someone"],["DREAM","pictures and ideas in your mind while you sleep"],["FREEDOM","the state of being free"],["CREATURE","a living animal"],["SONG","words that are sung, often with music"],["WARNING","something said to tell someone about danger"],["WEAK","not strong; having little energy"]],
    comp:[
      ["Who owns Manor Farm?",["Mr Jones","Napoleon","Old Major","Boxer"],0,"Mr Jones is the farmer who owns Manor Farm."],
      ["Why does Mr Jones forget to shut the henhouses?",["He is ill","He is too drunk","He is asleep early","He is away"],1,"He drinks too much and forgets his jobs."],
      ["Who do the animals go to hear speak at night?",["Mr Jones","Old Major","Squealer","Boxer"],1,"They gather quietly to hear Old Major."],
      ["What kind of animal is Old Major?",["A horse","A prize boar","A sheep","A dog"],1,"He is described as an old prize boar."],
      ["What is missing from the world in Major's dream?",["Food","Humans","Animals","Farms"],1,"In his dream, there are no humans anywhere."],
      ["According to Major, what does man never do?",["Sleep","Produce anything useful","Eat","Walk"],1,"Major says man eats but produces nothing useful."],
      ["What does Major teach the animals?",["A new rule","An old song about freedom","A dance","A game"],1,"He teaches them an old song about freedom."],
      ["What happens three days after Major's speech?",["He leaves the farm","He becomes a Twelve","He dies","He meets Mr Jones"],2,"Old Major grows weak and dies peacefully."]
    ],
    tf:[
      ["Mr Jones owns Manor Farm.",true,"He is the farmer in charge of it."],
      ["Mr Jones carefully locks the henhouses every night.",false,"He forgets, because he is too drunk."],
      ["Old Major is a young animal.",false,"He is old, and described as a prize boar."],
      ["Major dreams of a world without humans.",true,"His dream has no men in it at all."],
      ["Major says that man produces plenty of useful food.",false,"He says man produces nothing useful."],
      ["Major dies three days after telling his dream.",true,"He grows weak and dies peacefully."]
    ],
    rw:[
      ["Mr Jones is a farmer.",0,"Right — he owns and runs Manor Farm."],
      ["The animals meet in the farmhouse.",1,"Wrong — they meet in the big barn."],
      ["Major is described as a prize boar.",0,"Right — every animal respects him."],
      ["In Major's dream, humans live happily with animals.",1,"Wrong — his dream has no humans at all."],
      ["Every other animal on the farm works hard.",0,"Right — the hens, cows and horses all work."],
      ["Major had exactly ten children of his own.",2,"Doesn't say — the text never mentions his children."],
      ["Mr Jones fires his gun during the night.",0,"Right — he thinks a fox is near."]
    ],
    halves:[
      ["Mr Jones often gets drunk","and forgets his farm duties."],
      ["The animals quietly leave their beds","to hear Major speak in the barn."],
      ["Major is an old boar","whom every animal respects deeply."],
      ["In his dream,","there are no humans at all."],
      ["Man is the only creature","that eats without producing anything useful."],
      ["Major teaches the animals","an old song about freedom."],
      ["Three days later,","Old Major dies peacefully in his sleep."]
    ],
    odd:[
      [["farm","henhouse","barn","freedom"],3,"Freedom is an idea, not a building."],
      [["boar","pig","hen","dream"],3,"A dream is not a type of animal."],
      [["drunk","tired","sleepy","song"],3,"A song is not a physical state."],
      [["weak","tired","ill","respect"],3,"Respect is a feeling, not a physical condition."],
      [["warning","danger","risk","freedom"],3,"Freedom is not about danger."]
    ],
    gaps:{title:"Past simple", bank:["told","walked","felt","taught","fired","died"], items:[
      ["Major ___ the animals about his dream.","told"],
      ["The animals ___ to the barn at night.","walked"],
      ["Every animal ___ deep respect for Major.","felt"],
      ["Major ___ them an old song about freedom.","taught"],
      ["Mr Jones ___ his gun into the darkness.","fired"],
      ["Three days later, Major ___ peacefully.","died"]
    ]},
    think:{quote:"Major stands before the animals at night, describing a dream where no humans exist and every animal lives completely free.", question:"Why does Major's dream feel so powerful to the other animals?", options:["Because it promises them a better, freer future.","Because it explains how to grow more food.","Because it teaches them to read."], answer:0, note:"Major's vision gives the animals hope of controlling their own lives for the first time."},
    writing:[
      {task:"Describe Old Major's dream in your own words.",target:"30-50 words",tips:["Say what is missing from the dream","Say what animals can keep","Say how the animals feel about it"],starters:["In his dream, Major sees a world without...","In this world, animals keep...","The animals feel...","Major warns them to..."]},
      {task:"Imagine you are one of the animals hearing Major speak. Write your thoughts.",target:"30-50 words",tips:["Say how you feel about the dream","Say what you hope for","Say what worries you"],starters:["Tonight I heard Old Major talk about...","I feel...","I hope that one day...","I am still worried about..."]}
    ]},
  { n:2, title:"The Rebellion", unit:2, span:"Chapter 2",
    sum:"After Major's death, the pigs Snowball, Napoleon and Squealer develop his ideas into a system called Animalism. When hungry animals break into the store-shed, they drive Mr Jones and his men off the farm and rename it Animal Farm. The pigs paint seven rules on the barn wall, with equality as the most important one. During the harvest, the cows' milk mysteriously disappears.",
    vocab:[["PIG","a farm animal known for being intelligent"],["SYSTEM","a set of connected ideas or rules"],["SECRETLY","in a way that other people do not know about"],["HUNGRY","wanting or needing food"],["PATIENCE","the ability to wait calmly without complaining"],["SHED","a small, simple building for storing things"],["WHIP","a long piece of leather used to hit animals"],["BRAVELY","in a brave way, without showing fear"],["SUCCESS","doing well at something you tried to do"],["RULE","something you must or must not do"],["HARVEST","the time when crops are collected from the fields"],["MILK","the white drink produced by cows"]],
    comp:[
      ["Who are the three clever pigs mentioned in this chapter?",["Boxer, Clover, Benjamin","Snowball, Napoleon and Squealer","Mr Jones and his men","Old Major and Boxer"],1,"Snowball, Napoleon and Squealer become the leaders."],
      ["What do the pigs call their new system of ideas?",["Animalism","Freedomism","Farmology","Piggery"],0,"They name their system Animalism."],
      ["Why do the animals finally rebel against Mr Jones?",["He sells the farm","He forgets to feed them","He hurts Boxer","He paints new rules"],1,"He forgets to feed the hungry animals."],
      ["What do the animals do to Mr Jones and his men?",["Welcome them","Drive them off the farm","Ask them to stay","Follow their orders"],1,"They drive Jones and his men away."],
      ["What is the farm's new name?",["Rebel Farm","Piggery Farm","Animal Farm","Freedom Farm"],2,"They rename it Animal Farm."],
      ["How many rules do the pigs paint on the barn wall?",["Five","Six","Seven","Ten"],2,"They paint seven important rules."],
      ["What does the most important rule say?",["Pigs are the best animals","All animals are equal","Man is always right","Nobody may sleep"],1,"It says that all animals are equal."],
      ["What disappears during the harvest?",["The apples","The eggs","The milk","The flag"],2,"The milk from the cows disappears."]
    ],
    tf:[
      ["Snowball, Napoleon and Squealer become the farm's leaders.",true,"The three clever pigs take charge."],
      ["Mr Jones feeds the animals carefully every day.",false,"He forgets to feed them, which causes the rebellion."],
      ["The animals successfully drive Mr Jones off the farm.",true,"They fight back and Jones runs away."],
      ["The farm keeps its old name, Manor Farm.",false,"The animals rename it Animal Farm."],
      ["The pigs cannot read or write.",false,"They have secretly taught themselves to read and write."],
      ["The milk from the cows disappears during the harvest.",true,"Nobody explains exactly where it goes."]
    ],
    rw:[
      ["Snowball, Napoleon and Squealer are pigs.",0,"Right — they are the three clever pigs."],
      ["Mr Jones feeds the animals well every single day.",1,"Wrong — he forgets to feed them at all."],
      ["The animals break into the store-shed for food.",0,"Right — they are too hungry to wait."],
      ["Mr Jones successfully keeps control of the farm.",1,"Wrong — he and his men are driven away."],
      ["The pigs paint exactly seven rules on the barn wall.",0,"Right — using white paint and a ladder."],
      ["Every single animal on the farm can read the new rules easily.",2,"Doesn't say — the text does not say every animal can read."],
      ["The milk disappears without any explanation.",0,"Right — nobody says exactly where it went."]
    ],
    halves:[
      ["Snowball, Napoleon and Squealer","become the leaders after Major's death."],
      ["The pigs develop Major's ideas","into a system called Animalism."],
      ["Hungry animals break into","the store-shed for food."],
      ["The animals successfully drive","Mr Jones and his men off the farm."],
      ["The farm's name changes","from Manor Farm to Animal Farm."],
      ["The pigs paint seven rules","on the wall of the big barn."],
      ["During the harvest, the milk","mysteriously disappears."]
    ],
    odd:[
      [["pig","hen","cow","system"],3,"A system is an idea, not an animal."],
      [["hungry","tired","thirsty","shed"],3,"A shed is a building, not a feeling."],
      [["whip","stick","rope","success"],3,"Success is not a physical object."],
      [["rule","law","order","harvest"],3,"Harvest is a time of year, not a rule."],
      [["milk","eggs","apples","patience"],3,"Patience is a feeling, not a farm product."]
    ],
    gaps:{title:"Prepositions", bank:["into","from","on","with","at","for"], items:[
      ["The animals broke ___ the store-shed.","into"],
      ["Mr Jones and his men ran away ___ the farm.","from"],
      ["The pigs wrote seven rules ___ the barn wall.","on"],
      ["Squealer explained the new system ___ great confidence.","with"],
      ["The animals worked hard ___ harvest time.","at"],
      ["Everybody worked together ___ the good of the farm.","for"]
    ]},
    think:{quote:"The pigs stand proudly by the barn wall, having just finished painting their new rules for every animal to see.", question:"Why might the pigs be the ones who wrote the farm's new rules?", options:["Because they were the only animals who could read and write.","Because Mr Jones asked them to.","Because the other animals could not agree on anything."], answer:0, note:"Being the only animals who could read and write gave the pigs early control over the farm's ideas."},
    writing:[
      {task:"Describe how the animals took control of the farm.",target:"30-50 words",tips:["Say why they were angry with Mr Jones","Say what they did","Say how the farm's name changed"],starters:["The animals rebelled because...","They broke into...","Afterwards, they renamed the farm...","This felt..."]},
      {task:"Imagine you are one of the pigs writing the seven rules. Explain your first rule.",target:"30-50 words",tips:["Say what the rule is about","Say why it matters","Say who must follow it"],starters:["Our most important rule says that...","We wrote this because...","Every animal must...","We hope this rule will..."]}
    ]},
  { n:3, title:"The harvest and the committees", unit:3, span:"Chapter 3",
    sum:"The animals bring in their best harvest ever, with Boxer working harder than anyone else. At Sunday meetings, Snowball and Napoleon argue constantly, while Snowball organises committees and teaches the sheep a short slogan. Napoleon secretly takes nine puppies away for private education, and the pigs quietly keep the milk and apples for themselves.",
    vocab:[["HARVEST","the time when crops are collected"],["ENTHUSIASM","strong excitement and interest"],["PROMISE","something you say you will definitely do"],["FLAG","a piece of cloth with a symbol or colour"],["HOOF","the hard foot of an animal like a horse"],["ARGUMENT","a disagreement, often with raised voices"],["COMMITTEE","a small group chosen to organise something"],["SLOGAN","a short, memorable phrase"],["BLEAT","the sound a sheep makes"],["LOFT","a small room, often high up, used for storage"],["APPLE","a round fruit that grows on trees"],["BENEFIT","something good that a person gains"]],
    comp:[
      ["How does that summer's harvest compare to earlier years?",["It is worse","It is the best ever","It fails completely","It stays the same"],1,"It is the best harvest the farm has ever had."],
      ["Which animal works hardest during the harvest?",["Napoleon","Boxer","Snowball","Squealer"],1,"Boxer works harder than any other animal."],
      ["What do the animals raise before Sunday meetings?",["A gun","A green flag","A book","A song sheet"],1,"They raise a green flag with a horn and hoof."],
      ["How do Snowball and Napoleon usually behave at meetings?",["They always agree","They often argue","They never speak","They fall asleep"],1,"They almost never agree and argue loudly."],
      ["What does Snowball organise for the animals?",["Parties","Committees and reading classes","Races","Holidays"],1,"He organises committees and reading classes."],
      ["What does Snowball teach the sheep?",["A new rule","A short slogan","A dance","A story"],1,"He teaches them a short, simple slogan."],
      ["What does Napoleon do with nine newborn puppies?",["Gives them to Mr Jones","Takes them away for private education","Sends them to school","Sells them"],1,"He takes them away to educate privately."],
      ["What do the pigs keep for themselves?",["Bicycles","The milk and apples","The flag","The books"],1,"They quietly keep the milk and apples."]
    ],
    tf:[
      ["The animals have their best harvest ever that summer.",true,"Everybody works with real enthusiasm."],
      ["Boxer is the laziest animal on the farm.",false,"He is actually the hardest worker of all."],
      ["Snowball and Napoleon always agree at meetings.",false,"They almost never agree and often argue."],
      ["Snowball starts reading classes for the animals.",true,"He organises committees and reading classes."],
      ["Napoleon lets the puppies stay with their mothers.",false,"He takes them away for private education."],
      ["The pigs share the milk and apples equally with everyone.",false,"They quietly keep this food for themselves."]
    ],
    rw:[
      ["That summer's harvest is the best the farm has ever had.",0,"Right — everybody works with enthusiasm."],
      ["Boxer has a personal promise about working harder.",0,"Right — whenever there is a problem, he works harder."],
      ["The animals raise a red flag every Sunday.",1,"Wrong — the flag is green."],
      ["Snowball organises committees and reading classes.",0,"Right — he works with great energy."],
      ["The sheep quickly learn a long, complicated speech.",1,"Wrong — they learn a short, simple slogan instead."],
      ["Napoleon takes the puppies to a private loft.",0,"Right — nobody else can visit them there."],
      ["Squealer explains to the animals why pigs keep the milk.",0,"Right — he says it helps everyone in the end."],
      ["The nine puppies grow up to become friendly farm pets.",2,"Doesn't say — the text does not describe what the puppies become."]
    ],
    halves:[
      ["The animals bring in","the best harvest the farm has ever had."],
      ["Boxer, the huge cart-horse,","works harder than any other animal."],
      ["Every Sunday, the animals raise","a green flag before their meeting."],
      ["Snowball and Napoleon","almost never agree with each other."],
      ["Snowball organises busy committees","and starts reading classes."],
      ["The sheep learn a short slogan","and bleat it constantly."],
      ["Napoleon secretly takes nine puppies","away for private education."]
    ],
    odd:[
      [["harvest","crop","field","argument"],3,"An argument has nothing to do with growing crops."],
      [["flag","horn","hoof","committee"],3,"A committee is a group of animals, not a symbol on a flag."],
      [["slogan","phrase","saying","apple"],3,"An apple is a fruit, not a type of phrase."],
      [["loft","room","building","enthusiasm"],3,"Enthusiasm is a feeling, not a place."],
      [["milk","apple","benefit","hoof"],3,"A hoof is a body part, not food."]
    ],
    gaps:{title:"Adjectives", bank:["huge","green","short","private","hard","clever"], items:[
      ["Boxer, the ___ cart-horse, worked harder than anyone.","huge"],
      ["They raised a ___ flag every Sunday.","green"],
      ["Snowball taught the sheep a ___ slogan.","short"],
      ["Napoleon kept the puppies in a ___ loft.","private"],
      ["Every animal worked ___ during the harvest.","hard"],
      ["Snowball was full of ___ new ideas.","clever"]
    ]},
    think:{quote:"Napoleon quietly leads nine small puppies away to a loft that only he is allowed to visit.", question:"Why might Napoleon want to raise the puppies privately, away from the other animals?", options:["He simply loves puppies more than other animals.","He may want loyal helpers who obey only him.","He wants to protect them from Mr Jones."], answer:1, note:"Later events suggest Napoleon was quietly preparing private protection for himself."},
    writing:[
      {task:"Describe how Boxer helps the farm during the harvest.",target:"30-50 words",tips:["Say what Boxer does","Say what his personal promise is","Say how the other animals see him"],starters:["Boxer works harder than...","Whenever there is a problem, he...","The other animals think Boxer is...","This shows that Boxer..."]},
      {task:"Explain why Napoleon might want to keep the puppies away from everyone else.",target:"30-50 words",tips:["Say what Napoleon does with the puppies","Say where he keeps them","Give your own opinion"],starters:["Napoleon takes the puppies to...","Nobody else can...","In my opinion, he wants...","This might be dangerous because..."]}
    ]},
  { n:4, title:"The Battle of the Cowshed", unit:4, span:"Chapter 4",
    sum:"News of the rebellion spreads to the neighbouring farmers, Mr Pilkington and Mr Frederick. In October, Mr Jones attacks with armed men, but Snowball leads a clever defence based on old battle plans. The animals win, though a sheep dies and Snowball is wounded, and Boxer fears he has hurt a stable-boy. Afterwards, the animals create a medal and place the gun by the flagstaff.",
    vocab:[["OWNER","a person who owns something, like a farm"],["NERVOUS","worried about something that might happen"],["STICK","a long, thin piece of wood"],["GENERAL","an important leader in an army"],["DEFEND","to protect something from attack"],["FARMYARD","the open area around farm buildings"],["BULLET","a small piece of metal fired from a gun"],["VICTORY","success in a fight or competition"],["BOY","a young male person"],["MEDAL","a small metal award for bravery or success"],["COURAGE","the ability to do something brave"],["SYMBOL","an object that represents an idea"]],
    comp:[
      ["Who are the neighbouring farmers mentioned in this chapter?",["Snowball and Napoleon","Mr Pilkington and Mr Frederick","Boxer and Clover","Squealer and Benjamin"],1,"They are Mr Pilkington and Mr Frederick."],
      ["What does Mr Jones bring with him in October?",["Food","Sticks and a gun","Books","Medals"],1,"He brings sticks, and he carries a gun."],
      ["Whose old battle plans does Snowball study?",["Napoleon's","Julius Caesar's","Mr Jones's","Boxer's"],1,"He studies the famous general Julius Caesar."],
      ["What happens to Snowball during the fighting?",["He runs away","He is wounded","He is killed","He hides"],1,"He is wounded but keeps leading the animals."],
      ["What happens to one of the sheep?",["It escapes","It dies in the battle","It changes sides","It is wounded only"],1,"One brave sheep dies during the fighting."],
      ["What does Boxer fear he has done?",["Broken a rule","Killed a stable-boy","Lost the battle","Hurt Snowball"],1,"He fears he has killed a young stable-boy."],
      ["What actually happened to the stable-boy?",["He was killed","He was only stunned","He ran the farm","He joined the animals"],1,"He was only stunned, and later ran off unharmed."],
      ["What do the animals do with Mr Jones's gun after the battle?",["Destroy it","Sell it","Place it by the flagstaff","Give it to Boxer"],2,"They place it proudly beside the flagstaff."]
    ],
    tf:[
      ["News of the rebellion reaches the neighbouring farms.",true,"Mr Pilkington and Mr Frederick both hear about it."],
      ["Mr Jones attacks the farm completely unarmed.",false,"He and his men carry sticks and a gun."],
      ["Snowball plans the animals' defence using old battle ideas.",true,"He studies Julius Caesar's methods."],
      ["Every single animal survives the battle unharmed.",false,"One sheep dies during the fighting."],
      ["Boxer feels proud and happy about the stable-boy.",false,"He feels terrible, fearing he has killed him."],
      ["The animals win the battle against Mr Jones's men.",true,"The men finally run away from the farm."]
    ],
    rw:[
      ["Mr Pilkington and Mr Frederick own neighbouring farms.",0,"Right — they are the farm's neighbours."],
      ["Mr Jones attacks completely alone, with no other men.",1,"Wrong — he brings several armed men with him."],
      ["Snowball leads the animals' defence during the battle.",0,"Right — following his careful plan."],
      ["Every man on Mr Jones's side is badly hurt.",2,"Doesn't say — the text does not describe each man's injuries."],
      ["Boxer worries that he has killed the stable-boy.",0,"Right — until he learns the boy was only stunned."],
      ["The animals create a medal to honour bravery.",0,"Right — they give one to Snowball and one to Boxer."],
      ["The animals throw the gun away after the battle.",1,"Wrong — they place it proudly by the flagstaff."]
    ],
    halves:[
      ["News about the rebellion","spreads to the neighbouring farms."],
      ["Mr Jones returns with armed men,","carrying sticks and a gun."],
      ["Snowball plans the defence","using old ideas from Julius Caesar."],
      ["During the fighting,","Snowball is wounded but keeps leading."],
      ["Boxer fears that he has","killed a young stable-boy."],
      ["Luckily, the stable-boy","was only stunned, not killed."],
      ["The animals place the gun","proudly beside the flagstaff."]
    ],
    odd:[
      [["owner","farmer","neighbour","victory"],3,"Victory is not a type of person."],
      [["stick","gun","bullet","courage"],3,"Courage is a feeling, not a weapon."],
      [["defend","protect","guard","nervous"],3,"Nervous describes a feeling, not an action of protecting."],
      [["farmyard","field","barn","medal"],3,"A medal is an award, not a place."],
      [["general","leader","boy","soldier"],2,"A boy is not necessarily a leader or soldier here."]
    ],
    gaps:{title:"Question words", bank:["who","what","why","when","where","how"], items:[
      ["___ attacked the farm with armed men?","who"],
      ["___ plan did Snowball use to defend the farm?","what"],
      ["___ did Mr Jones and his men finally run away?","why"],
      ["___ did the battle take place?","when"],
      ["___ did the animals place the gun after the battle?","where"],
      ["___ did Boxer feel about the stable-boy?","how"]
    ]},
    think:{quote:"Boxer stands over a fallen stable-boy, terrified that his own strength might have caused a death.", question:"Why does Boxer feel so upset about the stable-boy, even during a battle to defend the farm?", options:["Because he dislikes fighting of any kind.","Because he never wanted to cause real harm, even to an enemy.","Because he is afraid of being punished."], answer:1, note:"Boxer's gentle nature makes him uncomfortable with hurting anyone, even during a necessary fight."},
    writing:[
      {task:"Describe how Snowball helps the animals win the battle.",target:"30-50 words",tips:["Say what Snowball studies","Say what he plans","Say what happens to him"],starters:["Snowball studies...","He plans for the animals to...","During the fighting, he...","In the end, the animals..."]},
      {task:"Imagine you are Boxer after the battle. Write about your feelings.",target:"30-50 words",tips:["Say what you feared you had done","Say how you felt","Say what happened when you learned the truth"],starters:["During the battle, I thought I had...","This made me feel...","Later, I learned that the boy...","Now I feel..."]}
    ]},
  { n:5, title:"The windmill", unit:5, span:"Chapter 5",
    sum:"Mollie the vain mare deserts the farm for ribbons and sugar. Snowball proposes building a windmill for electricity and comfort, but Napoleon strongly opposes the plan. At a decisive meeting, Napoleon's secretly raised dogs chase Snowball off the farm forever, and Napoleon ends the Sunday debates. Weeks later, he announces the windmill will be built after all, with Squealer claiming it was always Napoleon's idea.",
    vocab:[["MARE","an adult female horse"],["RIBBON","a thin strip of coloured material"],["SUGAR","a sweet substance used in food and drinks"],["WINDMILL","a machine that uses wind to produce power"],["ELECTRICITY","a form of power used to run machines"],["COMFORTABLE","pleasant and relaxing to use or feel"],["URGENT","needing attention very soon"],["SIGNAL","an action or sound used to give a message"],["FIERCE","aggressive and frightening"],["TERRIFIED","extremely frightened"],["DEBATE","a formal discussion of different opinions"],["SPEECH","a talk given to a group of people"]],
    comp:[
      ["Why does Mollie lose interest in the farm's new life?",["She dislikes Boxer","She misses ribbons and sugar","She wants a bigger job","She is too old"],1,"She misses pretty ribbons and sweet sugar."],
      ["What eventually happens to Mollie?",["She stays and works harder","She disappears to live with humans","She becomes a leader","She is punished"],1,"She disappears after talking to a man."],
      ["What does Snowball want to build?",["A new barn","A windmill","A bridge","A school"],1,"He wants to build a windmill."],
      ["What would the windmill produce, according to Snowball?",["Food","Electricity","Water","Wool"],1,"It would produce electricity for the farm."],
      ["How does Napoleon feel about the windmill plan?",["He loves it","He strongly opposes it","He ignores it","He builds it alone"],1,"He strongly opposes Snowball's plan."],
      ["What happens to Snowball during the big meeting?",["He wins the vote","He is chased off the farm by dogs","He becomes leader","He builds the windmill"],1,"Napoleon's dogs chase him off the farm."],
      ["What does Napoleon do to the Sunday meetings?",["Makes them longer","Ends the open debates","Cancels the flag","Moves them outside"],1,"He stops the open Sunday debates."],
      ["What does Squealer later claim about the windmill?",["It was Snowball's idea","It was always Napoleon's idea","It was Mr Jones's idea","Nobody remembers whose idea it was"],1,"He claims it was Napoleon's idea from the start."]
    ],
    tf:[
      ["Mollie enjoys wearing ribbons and eating sugar.",true,"She misses these small pleasures."],
      ["Mollie stays loyally on the farm forever.",false,"She disappears to live with humans instead."],
      ["Snowball wants to build a windmill for electricity.",true,"He believes it will help every animal."],
      ["Napoleon fully supports Snowball's windmill plan.",false,"He strongly opposes the whole idea."],
      ["Napoleon's dogs protect Snowball during the meeting.",false,"They attack him and chase him away."],
      ["Squealer says the windmill idea was always Napoleon's.",true,"He claims Napoleon thought of it first."]
    ],
    rw:[
      ["Mollie is a pretty white mare.",0,"Right — she is described this way."],
      ["Mollie happily gives up ribbons for the farm's new rules.",1,"Wrong — she misses them and eventually leaves."],
      ["Snowball believes the windmill will make life easier.",0,"Right — it could produce electricity and comfort."],
      ["Napoleon and Snowball agree completely about the windmill.",1,"Wrong — Napoleon strongly opposes the plan."],
      ["Nine grown dogs suddenly attack Snowball at the meeting.",0,"Right — they chase him off the farm."],
      ["Every animal knew Napoleon secretly raised those dogs.",2,"Doesn't say — the text does not say who knew this."],
      ["Napoleon ends the open Sunday debates after Snowball leaves.",0,"Right — a small group of pigs decides things instead."]
    ],
    halves:[
      ["Mollie misses","pretty ribbons and sweet sugar."],
      ["Snowball proposes building a windmill","to produce electricity for the farm."],
      ["Napoleon strongly opposes","the whole windmill idea."],
      ["During the big meeting,","fierce dogs suddenly attack Snowball."],
      ["The dogs chase Snowball","off the farm forever."],
      ["Napoleon ends","the open Sunday debates completely."],
      ["Squealer later claims","the windmill was Napoleon's idea all along."]
    ],
    odd:[
      [["mare","horse","pony","ribbon"],3,"A ribbon is an object, not an animal."],
      [["windmill","electricity","comfort","fierce"],3,"Fierce describes behaviour, not the windmill's benefits."],
      [["signal","sign","message","debate"],3,"A debate is a discussion, not a type of message."],
      [["terrified","frightened","scared","urgent"],3,"Urgent describes importance, not fear."],
      [["speech","talk","announcement","sugar"],3,"Sugar is food, not a type of talk."]
    ],
    gaps:{title:"Past simple", bank:["missed","opposed","ran","chased","began","announced"], items:[
      ["Mollie ___ pretty ribbons and sugar.","missed"],
      ["Napoleon strongly ___ the windmill plan.","opposed"],
      ["The fierce dogs ___ into the barn.","ran"],
      ["The dogs ___ Snowball off the farm.","chased"],
      ["The Sunday debates ___ to disappear.","began"],
      ["Napoleon ___ that the windmill would be built.","announced"]
    ]},
    think:{quote:"Nine grown dogs suddenly burst into the meeting and chase Snowball away from the farm forever.", question:"Why might Napoleon have secretly raised those dogs himself?", options:["To help Snowball with his plans.","To have a loyal force ready to remove any rival.","To protect the sheep from foxes."], answer:1, note:"Napoleon later uses the dogs again and again to remove anyone who challenges his power."},
    writing:[
      {task:"Explain why Mollie decides to leave the farm.",target:"30-50 words",tips:["Say what Mollie misses","Say what she does","Say how you feel about her choice"],starters:["Mollie misses...","One day, she...","In my opinion, she left because...","This shows that..."]},
      {task:"Describe what happens to Snowball during the big meeting.",target:"30-50 words",tips:["Say what Snowball is doing before the attack","Say what happens next","Say how the other animals might feel"],starters:["Snowball is giving a speech about...","Suddenly, Napoleon...","The dogs...","The other animals feel..."]}
    ]},
  { n:6, title:"Hard work and trade", unit:6, span:"Chapter 6",
    sum:"The animals work almost like slaves to finish the windmill, with Boxer dragging stones from the quarry every day. Napoleon starts trading with humans through the solicitor Mr Whymper, and the pigs move into the farmhouse to sleep in beds. A November storm destroys the windmill, and Napoleon blames Snowball, declaring him a traitor sentenced to death.",
    vocab:[["SLAVE","a person forced to work without freedom or pay"],["QUARRY","a place where stone is dug out of the ground"],["SOLICITOR","a person who gives legal advice and arranges deals"],["DEAL","an agreement between two people or groups"],["FARMHOUSE","the main house on a farm"],["COMFORTABLY","in a relaxed, pleasant way"],["STORM","very bad, windy weather"],["VIOLENTLY","with great, sudden force"],["DISASTER","a very bad and damaging event"],["JEALOUSY","an unhappy feeling caused by wanting what someone else has"],["TRAITOR","a person who betrays their own group"],["SENTENCE","an official punishment decided by someone in charge"]],
    comp:[
      ["How hard do the animals now work to build the windmill?",["Very little","Almost like slaves","Only on Sundays","Not at all"],1,"They work extremely hard, almost like slaves."],
      ["What does Boxer drag up from the quarry?",["Wood","Heavy stones","Water","Sand"],1,"He drags heavy stones for the windmill."],
      ["Who does Napoleon start trading with?",["Other animals","Human farmers, through Mr Whymper","The Chief Elder","Nobody"],1,"He trades with humans through the solicitor Mr Whymper."],
      ["Where do the pigs start sleeping?",["In the barn","In the farmhouse, in beds","Outside","In the Annex"],1,"They move into the farmhouse and sleep in beds."],
      ["What do some animals notice about the rule on beds?",["It disappeared completely","It seems to have changed","It was never there","It is very old"],1,"The rule seems different from how they remembered it."],
      ["What happens to the farm in November?",["A fire starts","A powerful storm hits","Snow falls heavily","Nothing unusual"],1,"A powerful storm hits the farm."],
      ["What happens to the windmill after the storm?",["It survives perfectly","It completely collapses","It grows bigger","It is sold"],1,"It completely collapses after the storm."],
      ["Who does Napoleon blame for the windmill's destruction?",["Mr Jones","Snowball","Boxer","Mr Whymper"],1,"He blames Snowball for the disaster."]
    ],
    tf:[
      ["The animals now work almost like slaves.",true,"They work extremely hard to finish the windmill."],
      ["Boxer refuses to help with the heavy stones.",false,"He drags the heaviest stones of all."],
      ["Napoleon refuses to trade with any humans.",false,"He starts trading through the solicitor Mr Whymper."],
      ["The pigs move into the farmhouse to sleep in beds.",true,"This is something no animal had done before."],
      ["A storm in November destroys the windmill completely.",true,"The animals find it collapsed the next morning."],
      ["Napoleon praises Snowball for his good work.",false,"He blames Snowball and calls him a traitor."]
    ],
    rw:[
      ["The animals work extremely hard to finish the windmill.",0,"Right — almost like slaves."],
      ["Boxer avoids the hardest, heaviest work.",1,"Wrong — he does the heaviest work of all."],
      ["Mr Whymper is a solicitor who arranges deals for Napoleon.",0,"Right — he manages the trading business."],
      ["The pigs continue sleeping outside with the other animals.",1,"Wrong — they move into the farmhouse."],
      ["Mr Whymper visits the farm every single day.",2,"Doesn't say — the text does not say how often he visits."],
      ["A powerful storm destroys the windmill in November.",0,"Right — the animals find it in pieces."],
      ["Napoleon calls Snowball a traitor after the storm.",0,"Right — he sentences him to death."]
    ],
    halves:[
      ["The animals work almost like slaves","to finish building the windmill."],
      ["Boxer drags heavy stones","up from the quarry every day."],
      ["Napoleon starts trading with humans","through the solicitor Mr Whymper."],
      ["The pigs move into the farmhouse","and begin sleeping in beds."],
      ["Some animals notice that the rule about beds","seems strangely different now."],
      ["A powerful storm in November","completely destroys the windmill."],
      ["Napoleon blames Snowball for the disaster","and calls him a dangerous traitor."]
    ],
    odd:[
      [["slave","worker","servant","quarry"],3,"A quarry is a place, not a type of worker."],
      [["solicitor","lawyer","deal","storm"],3,"A storm is weather, unrelated to legal work."],
      [["farmhouse","barn","building","jealousy"],3,"Jealousy is a feeling, not a building."],
      [["violently","suddenly","strongly","comfortably"],3,"Comfortably is the opposite of violently."],
      [["traitor","enemy","betrayer","friend"],3,"A friend is the opposite of a traitor."]
    ],
    gaps:{title:"Prepositions", bank:["from","into","with","about","before","for"], items:[
      ["Boxer dragged heavy stones ___ the quarry.","from"],
      ["The pigs moved ___ the old farmhouse.","into"],
      ["Napoleon started trading ___ human farmers.","with"],
      ["Some animals asked ___ the rule on beds.","about"],
      ["The storm hit the farm ___ dawn.","before"],
      ["Napoleon blamed Snowball ___ the disaster.","for"]
    ]},
    think:{quote:"Some animals stare at the rule about beds painted on the barn wall, unsure if it always said this.", question:"Why might the rules on the wall keep seeming to change?", options:["The paint keeps fading in the rain.","The pigs may be quietly changing the rules to suit themselves.","The animals cannot read very well."], answer:1, note:"Small, unnoticed changes to the rules let the pigs slowly take more comfort for themselves."},
    writing:[
      {task:"Describe how Boxer helps to build the windmill.",target:"30-50 words",tips:["Say what job Boxer does","Say how hard he works","Say what happens to the windmill"],starters:["Boxer works by...","Every day, he...","Sadly, the windmill...","This shows that Boxer..."]},
      {task:"Explain why the pigs moving into the farmhouse might worry the other animals.",target:"30-50 words",tips:["Say what the pigs do","Say what rule seems to change","Give your opinion"],starters:["The pigs now sleep in...","Some animals notice that the rule...","In my opinion, this shows...","This might mean..."]}
    ]},
  { n:7, title:"Confessions", unit:7, span:"Chapter 7",
    sum:"During a bitter winter, the pigs hide the farm's food shortage from visitors. When Napoleon tries to sell eggs, the hens rebel and are starved into surrender, and nine die. Napoleon then forces several animals to confess to imaginary crimes before his fierce dogs kill them. Boxer decides he must simply work harder, Clover mourns the farm's lost promises, and the old song about freedom is banned.",
    vocab:[["WINTER","the coldest season of the year"],["GRAIN","seeds from crops like wheat, used as food"],["SAND","tiny grains of rock, often found on beaches"],["VISITOR","a person who comes to see a place"],["EGG","a round object laid by a hen"],["SEVERELY","in a very strict or harsh way"],["EXHAUSTED","extremely tired"],["GOOSE","a large farm bird, bigger than a duck"],["HORROR","a feeling of great shock and fear"],["SHAKEN","upset and disturbed by something"],["FAIR","treating everyone equally and justly"],["FREEDOM","the state of being free"]],
    comp:[
      ["How does that winter affect the farm?",["It brings plenty of food","It brings dangerous food shortages","It is unusually warm","It brings visitors and parties"],1,"That winter brings a dangerous shortage of food."],
      ["How do the pigs hide the food shortage from visitors?",["They lock the gates","They fill empty bins with sand and grain","They send visitors away","They ask Squealer to lie"],1,"They fill empty bins with sand covered by grain."],
      ["Why do the hens rebel?",["They want more space","Napoleon tries to sell their eggs","They want a new leader","They are too cold"],1,"Napoleon wants to sell their eggs for money."],
      ["How does Napoleon punish the rebelling hens?",["He forgives them","He stops their food","He gives them a holiday","He sends them away"],1,"He stops giving them any food."],
      ["What happens to nine hens during the punishment?",["They escape","They die","They recover quickly","They become leaders"],1,"Sadly, nine hens die during this time."],
      ["What does Napoleon force several animals to do?",["Leave the farm","Confess to crimes","Build a windmill","Learn to read"],1,"He forces them to publicly confess to crimes."],
      ["What happens immediately after each confession?",["The animal is forgiven","The dogs kill the animal","The animal becomes a pig","Nothing happens"],1,"Napoleon's fierce dogs kill the animal at once."],
      ["What does Napoleon ban after these events?",["The windmill","The old song about freedom","Sunday meetings","The barn wall"],1,"He bans the old song about freedom completely."]
    ],
    tf:[
      ["That winter brings plenty of extra food.",false,"It brings a dangerous shortage of food instead."],
      ["The pigs hide the food shortage using sand and grain.",true,"They fill empty bins to fool visitors."],
      ["The hens happily agree to sell their eggs.",false,"They rebel and break their own eggs instead."],
      ["Nine hens die after Napoleon stops their food.",true,"They are starved into surrender."],
      ["Napoleon forces several animals to confess to crimes.",true,"Pigs, hens, a goose and sheep all confess."],
      ["Napoleon allows the old song about freedom to continue.",false,"He bans it completely after these events."]
    ],
    rw:[
      ["That winter brings a dangerous shortage of food.",0,"Right — the farm is close to famine."],
      ["The pigs openly admit the food shortage to visitors.",1,"Wrong — they hide it with sand and grain."],
      ["The hens rebel when Napoleon tries to sell their eggs.",0,"Right — they break their own eggs instead."],
      ["Napoleon forgives the hens immediately.",1,"Wrong — he punishes them severely by stopping their food."],
      ["Exactly nine hens die during the punishment.",0,"Right — the text gives this exact number."],
      ["Squealer feels sorry for the animals who are killed.",2,"Doesn't say — the text does not describe Squealer's feelings about this."],
      ["Boxer decides never to work hard again.",1,"Wrong — he decides he must work even harder."],
      ["Clover feels sad about the farm's broken promises.",0,"Right — she quietly grieves for what was promised."]
    ],
    halves:[
      ["That winter, food becomes","dangerously short on the farm."],
      ["The pigs hide the shortage","using sand covered with grain."],
      ["The hens rebel","when Napoleon tries to sell their eggs."],
      ["Napoleon punishes the hens severely","by stopping their food completely."],
      ["Napoleon forces several animals","to publicly confess to crimes."],
      ["The fierce dogs kill","each animal right after its confession."],
      ["Napoleon bans","the old song about freedom."]
    ],
    odd:[
      [["winter","cold","snow","goose"],3,"A goose is an animal, not related to cold weather."],
      [["egg","hen","goose","horror"],3,"Horror is a feeling, not a farm bird or egg."],
      [["exhausted","tired","weak","fair"],3,"Fair is about justice, not tiredness."],
      [["confess","admit","deny","crime"],2,"Deny is the opposite of confessing."],
      [["shaken","upset","disturbed","calm"],3,"Calm is the opposite of shaken."]
    ],
    gaps:{title:"Adjectives", bank:["cold","empty","exhausted","silent","fierce","gentle"], items:[
      ["That winter was extremely ___.","cold"],
      ["The pigs filled ___ bins with sand.","empty"],
      ["The ___ hens finally gave up.","exhausted"],
      ["The other animals watched in ___ horror.","silent"],
      ["Napoleon's ___ dogs attacked the confessing animals.","fierce"],
      ["Clover was a ___ cart-horse.","gentle"]
    ]},
    think:{quote:"One by one, frightened animals confess to crimes in front of the whole farm, before the dogs attack.", question:"Why might Napoleon want public confessions before punishing anyone?", options:["To follow fair, careful justice.","To frighten every other animal into total obedience.","To help the confessing animals feel better."], answer:1, note:"Public fear keeps the other animals too afraid to ever question Napoleon's decisions."},
    writing:[
      {task:"Explain why the hens rebel against Napoleon.",target:"30-50 words",tips:["Say what Napoleon wants to do","Say how the hens respond","Say what happens to them"],starters:["Napoleon wants to...","The hens refuse by...","Napoleon punishes them by...","Sadly, this results in..."]},
      {task:"Describe how Clover feels about the farm at this point in the story.",target:"30-50 words",tips:["Say what was originally promised","Say what has actually happened","Say how Clover feels"],starters:["The animals were once promised...","Instead, the farm has become...","Clover feels...","She remembers..."]}
    ]},
  { n:8, title:"The Battle of the Windmill", unit:8, span:"Chapter 8",
    sum:"Napoleon rarely appears in public while more rules are quietly altered. He sells timber to Mr Frederick, who pays with forged banknotes and then attacks with armed men, blowing up the rebuilt windmill. The animals win at a terrible cost, though Squealer calls it a great victory. Afterwards, the pigs find whisky, and Napoleon briefly seems close to death before recovering.",
    vocab:[["PUBLIC","open to everyone; not private"],["TIMBER","wood used for building things"],["FORGED","made falsely to look real"],["EXPLOSIVE","a substance that can cause a powerful blast"],["ARMED","carrying weapons"],["EXPLOSION","a sudden, violent burst of energy"],["INJURED","hurt or physically harmed"],["DESTROYED","completely ruined or broken"],["CONFIDENTLY","in a way that shows confidence"],["WHISKY","a strong alcoholic drink"],["CELLAR","a room under a building, often for storage"],["ALCOHOL","a strong drink that can make people drunk"]],
    comp:[
      ["How often does Napoleon appear in public now?",["Every day","Rarely","Only on Sundays","Constantly"],1,"He rarely appears in public any more."],
      ["What does Napoleon sell to Mr Frederick?",["Milk","Timber","Apples","The windmill"],1,"He sells a large pile of timber."],
      ["How does Mr Frederick pay for the timber?",["With real gold","With forged banknotes","With food","He does not pay"],1,"He pays with banknotes that turn out to be forged."],
      ["What does Frederick do after the trick is discovered?",["Apologises","Attacks the farm with armed men","Leaves the area","Returns the timber"],1,"He attacks the farm with fifteen armed men."],
      ["What happens to the windmill during the battle?",["It survives perfectly","It is blown up","It is sold","It is moved"],1,"The men blow it up with explosives."],
      ["How does the battle finally end?",["The animals lose completely","The animals win, at a terrible cost","Frederick becomes a friend","Nothing changes"],1,"The animals win, but many are injured."],
      ["How does Squealer describe the costly battle?",["A total disaster","A great victory","A small mistake","Nobody's business"],1,"He confidently calls it a great victory."],
      ["What do the pigs find after the battle?",["More timber","A case of whisky","New rules","A letter"],1,"They find a case of whisky in the cellar."]
    ],
    tf:[
      ["Napoleon appears in public every single day.",false,"He rarely appears in public any more."],
      ["Mr Frederick pays for the timber with real money.",false,"He pays with forged, fake banknotes."],
      ["Frederick attacks the farm with fifteen armed men.",true,"He brings weapons and explosives."],
      ["The windmill survives the battle completely undamaged.",false,"The men blow it up with explosives."],
      ["Many animals are injured during the battle.",true,"The victory comes at a terrible cost."],
      ["Napoleon fully recovers after drinking too much whisky.",true,"He seems close to death, then recovers."]
    ],
    rw:[
      ["Napoleon rarely appears in public these days.",0,"Right — he stays inside, guarded by dogs."],
      ["Mr Frederick pays with completely genuine banknotes.",1,"Wrong — the banknotes turn out to be forged."],
      ["Frederick attacks the farm with exactly fifteen men.",0,"Right — the text gives this exact number."],
      ["The rebuilt windmill survives the attack undamaged.",1,"Wrong — the men blow it up completely."],
      ["Every single attacking man is killed in the battle.",2,"Doesn't say — the text does not confirm this."],
      ["Squealer calls the costly battle a great victory.",0,"Right — despite the terrible cost."],
      ["The pigs find a case of whisky after the battle.",0,"Right — in the farmhouse cellar."]
    ],
    halves:[
      ["Napoleon now rarely appears","in public at all."],
      ["Napoleon sells a large pile of timber","to the harsh farmer Mr Frederick."],
      ["Frederick pays with banknotes","that later turn out to be forged."],
      ["Furious about the trick,","Frederick attacks the farm with armed men."],
      ["The men blow up","the newly rebuilt windmill with explosives."],
      ["Although the animals win the battle,","the cost is terrible."],
      ["Napoleon drinks too much whisky","and briefly seems close to death."]
    ],
    odd:[
      [["timber","wood","stone","forged"],3,"Forged describes something fake, not a building material."],
      [["armed","dangerous","weapons","confidently"],3,"Confidently describes manner, not danger or weapons."],
      [["explosion","blast","bang","cellar"],3,"A cellar is a room, not a type of explosion."],
      [["injured","hurt","wounded","destroyed"],3,"Destroyed describes objects, not injured people."],
      [["whisky","alcohol","drink","timber"],3,"Timber is wood, unrelated to drinks."]
    ],
    gaps:{title:"Question words", bank:["who","what","why","when","where","how"], items:[
      ["___ does Napoleon sell timber to?","who"],
      ["___ does Frederick pay with?","what"],
      ["___ does Frederick attack the farm?","why"],
      ["___ do the men blow up the windmill?","when"],
      ["___ do the pigs find the whisky?","where"],
      ["___ does Napoleon behave after drinking too much?","how"]
    ]},
    think:{quote:"The animals stand around their windmill, now broken into pieces, while Squealer calls the battle a victory.", question:"Why might Squealer insist on calling such a costly battle a victory?", options:["Because more animals were happy than sad.","Because admitting failure might make the animals question Napoleon.","Because the windmill was easy to rebuild."], answer:1, note:"Squealer's job is to protect Napoleon's image, even when the truth is painful."},
    writing:[
      {task:"Explain how Mr Frederick tricks Napoleon.",target:"30-50 words",tips:["Say what Napoleon sells him","Say how Frederick pays","Say what happens next"],starters:["Napoleon sells Frederick...","Frederick pays with...","Later, the animals discover...","This leads to..."]},
      {task:"Describe the battle at the windmill and its cost.",target:"30-50 words",tips:["Say what happens to the windmill","Say how the animals win","Say what the cost is"],starters:["During the battle, the men...","The animals fight back by...","In the end, they win, but...","Squealer calls this..."]}
    ]},
  { n:9, title:"Boxer", unit:9, span:"Chapter 9",
    sum:"Boxer badly splits a hoof but keeps working, even as food rations are cut for everyone except the pigs and dogs. Napoleon becomes President and introduces regular parades. When Boxer finally collapses at the windmill, a van takes him away, and Benjamin the donkey realises too late that it belongs to a horse slaughterer. Squealer later announces that Boxer died peacefully, praising Napoleon.",
    vocab:[["SPLIT","broken or divided into parts"],["HOOF","the hard foot of an animal like a horse"],["RATION","a fixed, limited amount of food"],["GUARD","someone or something that protects and watches"],["TITLE","an official name showing someone's position"],["PRESIDENT","the official leader of a country or group"],["PARADE","a public march or procession"],["ACHIEVEMENT","something successfully done or completed"],["TIRED","needing rest or sleep"],["DONKEY","a farm animal similar to a small horse"],["SLAUGHTERER","a person whose job is killing animals for meat"],["DESPERATELY","in an urgent, worried way"]],
    comp:[
      ["What happens to one of Boxer's hooves?",["It heals quickly","It badly splits","Nothing happens","It grows stronger"],1,"One of his hooves badly splits while working."],
      ["Who keeps receiving the same amount of food as before?",["Every animal equally","The pigs and the guard dogs","Only Boxer","Nobody"],1,"Only the pigs and the dogs keep their full rations."],
      ["What new title does Napoleon give himself?",["King","President","Chief Elder","Captain"],1,"He gives himself the title of President."],
      ["What are the new regular parades called?",["Farm Festivals","Spontaneous Demonstrations","Animal Games","Victory Marches"],1,"They are called Spontaneous Demonstrations."],
      ["What happens to Boxer while working at the windmill?",["He finishes early","He collapses","He runs away","He becomes President"],1,"He suddenly collapses and cannot get up."],
      ["Who reads the writing on the side of the van?",["Napoleon","Squealer","Benjamin the donkey","Clover"],2,"Benjamin slowly reads the writing on the van."],
      ["What does the van actually belong to?",["A hospital","A horse slaughterer","Mr Whymper","A neighbouring farm"],1,"It belongs to a horse slaughterer, not a hospital."],
      ["What does Squealer tell the other animals about Boxer's death?",["He died in an accident","He died peacefully in hospital, praising Napoleon","He escaped the farm","Nobody knows"],1,"He claims Boxer died peacefully, praising Napoleon."]
    ],
    tf:[
      ["Boxer badly splits one of his hooves.",true,"He still refuses to slow down properly."],
      ["Food rations stay exactly equal for every single animal.",false,"The pigs and dogs keep more than the others."],
      ["Napoleon gives himself the title of President.",true,"He introduces this new title for himself."],
      ["Boxer collapses while resting comfortably at home.",false,"He collapses while working hard at the windmill."],
      ["Benjamin quickly realises what the van truly is.",true,"He reads the writing and understands the danger."],
      ["Squealer says that Boxer died happily, praising Napoleon.",true,"This is the story Squealer gives the other animals."]
    ],
    rw:[
      ["Boxer badly splits one of his hooves.",0,"Right — while working hard on the windmill."],
      ["Every animal receives exactly the same food rations.",1,"Wrong — the pigs and dogs get more."],
      ["Napoleon gives himself the title of President.",0,"Right — a new, grander title for himself."],
      ["Boxer collapses suddenly while working at the windmill.",0,"Right — he cannot get back onto his legs."],
      ["Benjamin cannot read at all.",1,"Wrong — he can read, and reads the van's writing."],
      ["The van actually belongs to a hospital.",1,"Wrong — it belongs to a horse slaughterer."],
      ["The other animals manage to stop the van in time.",1,"Wrong — it drives away too quickly."],
      ["Boxer was exactly the same age as Napoleon.",2,"Doesn't say — the text does not compare their ages."]
    ],
    halves:[
      ["Boxer badly splits","one of his hooves while working."],
      ["Food rations are cut","for everyone except the pigs and dogs."],
      ["Napoleon gives himself","the new title of President."],
      ["One exhausting afternoon,","Boxer suddenly collapses at the windmill."],
      ["Benjamin slowly reads","the writing painted on the van."],
      ["To everyone's horror, the van","actually belongs to a horse slaughterer."],
      ["Squealer later announces that Boxer","died peacefully, praising Napoleon."]
    ],
    odd:[
      [["hoof","leg","split","president"],3,"President is a title, unrelated to Boxer's body."],
      [["ration","food","meal","guard"],3,"A guard protects; it is not related to food."],
      [["parade","march","procession","donkey"],3,"A donkey is an animal, not a public event."],
      [["tired","exhausted","weak","desperately"],3,"Desperately describes how something is done, not a physical state."],
      [["slaughterer","butcher","killer","achievement"],3,"An achievement is a success, unrelated to killing."]
    ],
    gaps:{title:"Past simple", bank:["split","cut","collapsed","arrived","realised","died"], items:[
      ["Boxer ___ one of his hooves.","split"],
      ["Food rations were ___ for most animals.","cut"],
      ["Boxer suddenly ___ at the windmill.","collapsed"],
      ["A van ___ to take him away.","arrived"],
      ["Benjamin ___ where the van was really going.","realised"],
      ["Squealer announced that Boxer had ___ in hospital.","died"]
    ]},
    think:{quote:"Benjamin slowly reads the writing on the side of the van as it carries Boxer away.", question:"Why might Benjamin's discovery about the van feel especially shocking to readers?", options:["Because nobody expected a van at all.","Because Boxer, the farm's most loyal worker, is betrayed by the farm he served.","Because Benjamin rarely speaks."], answer:1, note:"Boxer trusted the farm completely, which makes his fate feel especially unfair."},
    writing:[
      {task:"Describe what happens to Boxer at the windmill.",target:"30-50 words",tips:["Say what Boxer is doing before he collapses","Say what happens next","Say how you feel about it"],starters:["Boxer is working hard when...","Suddenly, he...","A van arrives to...","This makes me feel..."]},
      {task:"Explain what Benjamin discovers about the van, and why it matters.",target:"30-50 words",tips:["Say what the van claims to be","Say what Benjamin reads","Say why this is so shocking"],starters:["The van is supposed to be...","Benjamin reads that it actually...","This means Boxer is...","This is shocking because..."]}
    ]},
  { n:10, title:"The pigs walk on two legs", unit:10, span:"Chapter 10",
    sum:"Years later, the windmill finally earns a profit, though the ordinary animals are no better off. One day Squealer, then Napoleon, appear walking on two legs, while the sheep repeat a new slogan about legs. The seven rules on the barn wall have vanished, replaced by one sentence about equality that favours the pigs. That evening, watching pigs and humans together through a window, the animals can no longer tell them apart.",
    vocab:[["PROFIT","money gained from selling something"],["ASTONISHING","extremely surprising"],["UPRIGHT","standing straight up"],["DISBELIEF","the feeling of not being able to believe something"],["TROTTER","the foot of a pig"],["SLOGAN","a short, memorable phrase"],["ORIGINAL","the first or earliest version of something"],["EQUALITY","the state of being equal"],["CELEBRATION","a special event to mark something happy"],["NERVOUSLY","in a worried, anxious way"],["DIFFERENCE","a way in which things are not the same"],["WHIP","a long piece of leather used to hit animals"]],
    comp:[
      ["What does the windmill finally do, years later?",["Nothing useful","Grind corn and earn a profit","Fall down again","Get sold"],1,"It finally grinds corn and earns a profit."],
      ["Do the ordinary animals become richer or happier?",["Yes, much happier","No, they are no better off","They become very rich","They leave the farm"],1,"They are not truly richer or happier."],
      ["Who is the first pig seen walking on two legs?",["Napoleon","Squealer","Snowball","Benjamin"],1,"Squealer is the first one seen walking upright."],
      ["What does Napoleon carry while walking on two legs?",["A book","A whip","A flag","A gun"],1,"He proudly carries a whip in one trotter."],
      ["What do the trained sheep begin repeating?",["An old song","A brand-new slogan about legs","A list of rules","Nothing at all"],1,"They repeat a brand-new slogan about legs."],
      ["What has happened to the seven original rules?",["They are unchanged","They have completely vanished","They are painted bigger","They were never there"],1,"They have completely vanished from the wall."],
      ["What replaces the seven rules?",["Nothing at all","One sentence about equality favouring the pigs","A new set of ten rules","A picture of Napoleon"],1,"One short sentence about equality, favouring the pigs."],
      ["What do the animals notice while watching through the window?",["The pigs look different from men","They cannot tell pigs and men apart","The men are frightened","Nothing unusual"],1,"They can no longer tell pigs and men apart."]
    ],
    tf:[
      ["The windmill finally earns a profit for the pigs.",true,"It grinds corn successfully at last."],
      ["The ordinary animals become much richer and happier.",false,"They are not truly better off than before."],
      ["Squealer is seen walking upright on two legs.",true,"The other animals stare in shock."],
      ["Napoleon refuses to walk on two legs like Squealer.",false,"He soon walks out on two legs as well."],
      ["The seven original rules remain exactly the same.",false,"They have completely vanished from the wall."],
      ["The animals can easily tell the pigs and men apart at the end.",false,"They can no longer tell any real difference."]
    ],
    rw:[
      ["The windmill finally grinds corn for a profit.",0,"Right — years after it was first built."],
      ["Every ordinary animal becomes much richer.",1,"Wrong — they are no better off than before."],
      ["Squealer is the first pig seen walking on two legs.",0,"Right — the others stare in shock."],
      ["The sheep refuse to learn any new slogan.",1,"Wrong — they quickly learn a brand-new one."],
      ["The seven original rules are completely gone from the wall.",0,"Right — replaced by a single sentence."],
      ["Napoleon invites the neighbouring farmers into the farmhouse.",0,"Right — for a friendly evening together."],
      ["The exact number of farmers who visit is given in the text.",2,"Doesn't say — the text does not give an exact number."]
    ],
    halves:[
      ["Years later, the windmill","finally earns a steady profit."],
      ["The ordinary animals work hard,","but they are not truly better off."],
      ["Squealer suddenly appears","walking upright on two legs."],
      ["Napoleon follows, proudly carrying","a whip in one trotter."],
      ["The trained sheep begin repeating","a brand-new slogan about legs."],
      ["The seven original rules","have completely vanished from the wall."],
      ["Watching through the window,","the animals cannot tell pigs from men."]
    ],
    odd:[
      [["profit","money","earnings","upright"],3,"Upright describes posture, not money."],
      [["trotter","hoof","paw","celebration"],3,"A celebration is an event, not a body part."],
      [["slogan","phrase","saying","equality"],3,"Equality is an idea, not a type of phrase."],
      [["astonishing","surprising","shocking","nervously"],3,"Nervously describes manner, not surprise."],
      [["difference","contrast","gap","disbelief"],3,"Disbelief is a feeling, not a type of difference."]
    ],
    gaps:{title:"Prepositions", bank:["on","of","through","from","into","to"], items:[
      ["Squealer began walking ___ two legs.","on"],
      ["Napoleon walked out ___ the farmhouse.","of"],
      ["The animals looked ___ the window.","through"],
      ["The seven rules disappeared ___ the barn wall.","from"],
      ["The pigs invited farmers ___ the farmhouse.","into"],
      ["It became impossible ___ tell pigs from men.","to"]
    ]},
    think:{quote:"Through a lit window, the watching animals see pigs and men together, and can no longer tell them apart.", question:"What does this final scene suggest about how the farm has changed?", options:["The animals finally achieved true equality.","The pigs have become just like the humans they once removed.","The humans have become kinder over time."], answer:1, note:"The story ends by showing that power changed the pigs into the very thing the animals first rebelled against."},
    writing:[
      {task:"Describe the moment Squealer and Napoleon walk on two legs.",target:"30-50 words",tips:["Say who appears first","Say what Napoleon carries","Say how the other animals react"],starters:["First, Squealer appears...","Then Napoleon walks out, carrying...","The other animals feel...","This is shocking because..."]},
      {task:"Explain what the final scene at the window shows about the farm.",target:"30-50 words",tips:["Say who is inside the farmhouse","Say what the animals see","Say what this means for the farm's future"],starters:["Inside, Napoleon has invited...","The watching animals see...","They realise that pigs and men...","This shows that..."]}
    ]}
];
const READINGS = {
1:[
"Manor Farm belonged to Mr Jones, a farmer who often got drunk. One night, Mr Jones forgot to shut the henhouses properly. He was too drunk to remember.",
"When the farmer fell asleep, all the animals quietly left their beds. They walked to the big barn to hear old Major speak. Major was an old prize boar, and every animal felt deep respect for him.",
"Major told the animals about a strange dream. In his dream, there were no humans anywhere. The animals lived alone, and they were completely free. They kept all the food that they made, instead of giving it to a farmer.",
"Major explained an important idea. He said that man was the only creature on the farm who ate food but made nothing useful. Every other animal worked hard: the hens laid eggs, the cows gave milk, and the horses pulled carts. Man took everything and gave very little back.",
"Major told the animals that one day they could remove Mr Jones from the farm. Then the animals could live and work for themselves, in real freedom. He gave them a serious warning: never become like man, and never hurt each other.",
"Then Major taught the animals an old song about freedom. It described a future without men, when animals could live happily on their own land. The animals sang it together with great excitement, louder and louder.",
"The noise woke Mr Jones, who fired his gun into the darkness, thinking a fox was near. The animals ran back to their beds and pretended to be asleep.",
"Three days later, Old Major grew weak and quietly passed away in his sleep. But his powerful ideas about freedom stayed alive in the other animals' minds."
],
2:[
"After Major's death, three clever pigs became the natural leaders of the farm. Their names were Snowball, Napoleon and Squealer. Squealer could talk very well and always found clever arguments.",
"The three pigs took Major's ideas and turned them into a full system of thought. They called this system Animalism. Secretly, at night, they taught the other animals about it in the barn.",
"One day, Mr Jones forgot to feed the animals for a whole day. The hungry animals finally lost their patience. They broke into the store-shed and ate the food that they found there.",
"When Mr Jones and his men tried to stop them with whips, the animals fought back bravely. Surprised and frightened, the men ran away from the farm as fast as they could.",
"The animals could not believe their success. For the very first time, the farm truly belonged to them. They quickly changed its name from Manor Farm to Animal Farm.",
"The pigs had secretly taught themselves to read and write. Using a ladder and white paint, they wrote seven important rules on the wall of the big barn.",
"These rules explained how every animal on the farm should now behave. The most important rule said that all animals were equal, with no differences between them.",
"Later, at harvest time, all the animals worked together happily to bring in the crops. But while everyone was busy working, the milk from the cows quietly disappeared. Nobody asked exactly where it had gone."
],
3:[
"That summer, the animals brought in the best harvest the farm had ever produced. Everybody worked with real enthusiasm, because now the harvest belonged to them.",
"Boxer, the huge cart-horse, worked harder than any other animal. He had made a personal promise to himself: whenever a problem appeared, he would simply work harder.",
"Every Sunday morning, the animals held a meeting in the big barn. Before the meeting, they raised a green flag with a horn and a hoof painted on it.",
"At these meetings, the animals discussed plans for the following week. Snowball and Napoleon almost never agreed with each other, and they often had loud arguments in front of everyone.",
"Snowball organised busy committees for the other animals, and he also started reading classes. He worked with great energy, always full of clever new ideas for the farm.",
"The sheep found it hard to remember long, complicated ideas. Instead, Snowball taught them a short slogan, and they began to bleat it constantly, even during quiet meetings.",
"One day, Napoleon quietly took nine newborn puppies away from their mothers. He said that he would personally educate them, in a private loft that nobody else could visit.",
"Meanwhile, the pigs quietly kept all the milk and the apples that fell from the trees for themselves. When the other animals began to complain, Squealer explained carefully that pigs needed this special food for everyone's benefit."
],
4:[
"News about the rebellion slowly spread to the neighbouring farms. The owners, Mr Pilkington and Mr Frederick, felt nervous about their own animals hearing such dangerous ideas.",
"One cold morning in October, Mr Jones returned with several men. They carried sticks, and Mr Jones also carried a gun.",
"Luckily, Snowball had studied old battles, including the famous general Julius Caesar. He had already planned exactly how the animals should defend the farm.",
"Following Snowball's clever plan, the animals hid around the farmyard and waited quietly. When the men walked in, the animals suddenly attacked them from every side.",
"During the fighting, Snowball bravely led the animals, although a bullet wounded his back. One brave sheep died in the battle, but the men could not stand against so many angry animals.",
"Frightened and confused, Mr Jones and his men finally ran away from the farm completely. The animals had won an important victory over their old enemy.",
"Afterwards, Boxer felt terrible because he believed he had killed a young stable-boy with his heavy hoof. Luckily, the boy had only been stunned, and he soon ran off unharmed.",
"To celebrate the victory, the animals created a new medal for bravery. They gave one to Snowball and one to Boxer, in honour of their courage. They also placed Mr Jones's gun proudly beside the flagstaff, as a symbol of their victory."
],
5:[
"Mollie, the pretty white mare, began to lose interest in the farm's new ideas. She missed pretty ribbons and sweet sugar, which the new rules did not allow.",
"One day, somebody saw Mollie happily talking to a man from a neighbouring farm. Soon afterwards, Mollie left the farm completely, and nobody on the farm ever saw her again.",
"Snowball had a brilliant new plan: building a windmill. It could produce electricity and make life much more comfortable for every animal.",
"Napoleon strongly opposed the whole idea. He argued that building a windmill would take too much time and effort away from more urgent farm work.",
"At a big meeting, while Snowball was giving his final speech, Napoleon suddenly gave a strange signal. Nine enormous, fierce dogs ran into the barn and attacked Snowball immediately.",
"Terrified, Snowball ran as fast as he could, and the dogs chased him right off the farm. He was never seen on the farm again.",
"After this shocking event, Napoleon announced that Sunday meetings with open debates would stop completely. From now on, a small group of pigs would simply decide everything.",
"Three weeks later, Napoleon surprised everyone by announcing that the windmill would be built after all. Squealer cleverly told the other animals that the whole windmill idea had actually been Napoleon's from the very beginning."
],
6:[
"Every animal now worked extremely hard, almost like slaves, to finish building the windmill. Boxer worked hardest of all, dragging heavy stones up from the quarry every single day. Even so, he never once complained about the endless, exhausting work.",
"Napoleon announced a surprising new plan: the farm would start trading with human farmers nearby. A local solicitor named Mr Whymper agreed to arrange all the business deals.",
"Soon afterwards, the pigs quietly moved into the old farmhouse. They began sleeping comfortably in soft beds, something no animal had ever done before. The other animals could hardly believe what they were seeing.",
"When some animals questioned this change, they checked the rule about beds painted on the barn wall. Strangely, the rule seemed different from how they remembered it.",
"One terrible night in November, a powerful storm hit the farm. Fierce winds shook every building violently until dawn.",
"In the morning, the animals discovered that their windmill had completely collapsed. All their hard months of work now lay broken on the ground. Many animals could not hold back their tears at the terrible sight.",
"Napoleon quickly blamed Snowball for the disaster, claiming that Snowball had secretly returned and wrecked the windmill out of pure jealousy.",
"Furious, Napoleon declared Snowball a dangerous traitor to the farm. He announced a serious sentence: death to anyone who ever helped Snowball again. From then on, every animal felt frightened simply at the mention of Snowball's name."
],
7:[
"That winter was extremely cold, and food became dangerously short on the farm. To hide this problem from visitors, the pigs cleverly filled empty food bins with sand, covered by a thin layer of grain.",
"When Napoleon decided to sell some eggs to earn money, the hens strongly refused. They protested by breaking their own eggs instead of giving them away.",
"Napoleon punished the hens severely by stopping their food completely. After several difficult days without food, the exhausted hens finally gave up. Sadly, nine hens died during this terrible time.",
"Napoleon blamed Snowball for almost every problem on the farm, even for troubles that had happened years earlier. Snowball, he said, was secretly working against them all.",
"Napoleon then called a frightening meeting. Four young pigs publicly confessed to helping Snowball, followed by some hens, a goose, and several sheep.",
"Immediately after each confession, Napoleon's fierce dogs attacked and killed the animal on the spot. The other animals watched in silent horror, too afraid to say anything.",
"Boxer felt deeply shaken by these terrible events. Still, his simple answer to every difficulty was always the same: he must work even harder.",
"Clover, the gentle cart-horse, quietly mourned the fair, free farm that the animals had once been promised. Soon afterwards, Napoleon banned the old song about freedom completely, and nobody ever sang it again."
],
8:[
"By now, Napoleon rarely appeared in public at all. He preferred to stay inside the farmhouse, protected closely by his fierce dogs. Instead, he relied completely on his loyal dogs to protect him.",
"Meanwhile, more of the rules on the barn wall kept quietly changing, though few animals noticed exactly when or how.",
"Napoleon agreed to sell a large pile of timber to Mr Frederick, a harsh neighbouring farmer. Frederick paid with banknotes that later turned out to be completely forged.",
"Furious about the trick, Frederick suddenly attacked the farm with fifteen armed men. This time, the enemy carried powerful explosives as well as guns. The animals felt afraid, remembering the terrible battle only months before.",
"During the fierce battle, the men placed explosives under the newly rebuilt windmill and blew it into pieces. The explosion shook the whole farm violently.",
"Although the animals eventually drove the men away, the cost was terrible. Many animals were injured, and the beloved windmill lay completely destroyed again. Even Boxer, still strong despite his age, fought until the very end.",
"Despite everything, Squealer confidently announced that the battle had been a truly great victory for the farm.",
"Soon after, the pigs discovered a case of whisky in the farmhouse cellar. Napoleon drank far too much and briefly seemed close to death, but he fully recovered by the next morning. For a few frightening days, nobody knew if their leader would survive. Afterwards, the strict rule about alcohol was quietly altered."
],
9:[
"Boxer badly split one of his hooves while working, but he still refused to slow down or rest properly. He simply wanted the new windmill finished. Even so, nobody dared to suggest that he should rest.",
"Food rations were cut for almost every animal that year, although the pigs and the guard dogs somehow kept receiving exactly the same amount as before. The other animals said nothing, though many of them felt it was unfair.",
"Around this time, Napoleon gave himself an important new title: President of the farm. Regular parades called Spontaneous Demonstrations were introduced to celebrate the farm's achievements.",
"One exhausting afternoon at the windmill, Boxer suddenly collapsed onto the ground. He could no longer get back up onto his tired legs. Two other horses ran quickly to help him, but it was no use.",
"Soon a van arrived to take Boxer away, supposedly to a hospital. Benjamin, the clever donkey, slowly read the writing painted on its side.",
"To everyone's horror, Benjamin realised the van actually belonged to a horse slaughterer, not to any hospital at all.",
"The other animals ran and shouted desperately, but the van drove away far too quickly for anyone to stop it.",
"A few days later, Squealer sadly announced that Boxer had died peacefully in a proper hospital, praising Napoleon with his very last words. Many animals felt a strange, uneasy sadness they could not fully explain. That same week, the pigs somehow found enough money to buy another case of whisky."
],
10:[
"Years passed slowly on the farm. The windmill finally worked, grinding corn and earning a steady profit, but only for the pigs.",
"The ordinary animals worked just as hard as always. They were not truly richer or happier, yet most of them still believed they were completely free.",
"One astonishing afternoon, Squealer suddenly appeared walking upright on his two back legs. The other animals stared in complete shock and disbelief.",
"Moments later, Napoleon himself walked out of the farmhouse on two legs too, proudly carrying a whip in one trotter.",
"The sheep, carefully trained beforehand, immediately began repeating a brand-new slogan. It praised walking on two legs instead of four.",
"Curious, some animals walked over to the barn wall to check the old rules. Every single one of the seven original rules had vanished completely.",
"In their place, the pigs had painted just one short sentence about equality, cleverly changed so that the pigs themselves counted for more than anyone else.",
"That same evening, Napoleon proudly invited neighbouring farmers into the farmhouse for a friendly drink and a celebration.",
"Outside, in the darkness, the other animals crept closer and looked nervously through the window. They watched the pigs and the humans laughing, drinking and arguing together inside.",
"The watching animals looked from pig to man, then from man to pig again. Already, it was becoming impossible to tell any real difference between them."
]
};
const EVENTS = {
1:{ev:["Old Major gathers the animals in the barn at night.","He tells them about his dream of a world without humans.","Major says man is the only creature that produces nothing useful.","He warns the animals never to become like man.","Major teaches the animals an old song about freedom.","Three days later, Major dies peacefully in his sleep."],keys:["major","dream","produces","warns","song","dies"]},
2:{ev:["Snowball, Napoleon and Squealer develop Major's ideas into Animalism.","Mr Jones forgets to feed the hungry animals.","The animals break into the store-shed for food.","The animals drive Mr Jones and his men off the farm.","The farm is renamed Animal Farm.","The pigs paint seven rules on the barn wall."],keys:["animalism","hungry","shed","drive","renamed","rules"]},
3:{ev:["The animals bring in the best harvest ever.","Boxer works harder than every other animal.","The animals hold weekly meetings under a green flag.","Snowball organises committees and reading classes.","The sheep learn a short slogan from Snowball.","Napoleon takes nine puppies away for private education."],keys:["harvest","boxer","flag","committees","slogan","puppies"]},
4:{ev:["News of the rebellion reaches the neighbouring farms.","Mr Jones attacks the farm with armed men.","Snowball leads the animals using a clever battle plan.","A sheep dies and Snowball is wounded in the fighting.","Boxer fears he has killed a stable-boy.","The animals create a medal and place the gun by the flagstaff."],keys:["neighbouring","armed","snowball","wounded","boxer","medal"]},
5:{ev:["Mollie deserts the farm for ribbons and sugar.","Snowball proposes building a windmill for electricity.","Napoleon strongly opposes Snowball's windmill plan.","Napoleon's fierce dogs chase Snowball off the farm.","Napoleon ends the Sunday debates completely.","Squealer claims the windmill was always Napoleon's idea."],keys:["mollie","windmill","opposes","dogs","debates","squealer"]},
6:{ev:["The animals work hard building the windmill.","Napoleon starts trading with humans through Mr Whymper.","The pigs move into the farmhouse and sleep in beds.","The rule about beds seems mysteriously changed.","A storm destroys the newly built windmill.","Napoleon blames Snowball and sentences him to death."],keys:["windmill","whymper","farmhouse","beds","storm","sentences"]},
7:{ev:["A harsh winter brings hunger to the farm.","The pigs hide empty food bins with sand and grain.","The hens rebel and are starved into surrender.","Napoleon forces several animals to confess to crimes.","The fierce dogs kill the confessing animals.","Napoleon bans the old song about freedom."],keys:["winter","sand","hens","confess","dogs","bans"]},
8:{ev:["Napoleon rarely appears in public any more.","Napoleon sells timber to Mr Frederick.","Frederick pays with forged banknotes.","Frederick attacks the farm and blows up the windmill.","The animals win the battle at a terrible cost.","The pigs find whisky and the rule on alcohol changes."],keys:["frederick","forged","attacks","windmill","battle","whisky"]},
9:{ev:["Boxer badly splits one of his hooves.","Food rations are cut for most animals.","Napoleon becomes President of the farm.","Boxer collapses while working at the windmill.","Benjamin realises the van belongs to a horse slaughterer.","Squealer announces that Boxer died praising Napoleon."],keys:["boxer","rations","president","collapses","slaughterer","squealer"]},
10:{ev:["Years pass and the windmill finally earns a profit.","Squealer suddenly walks on his two back legs.","Napoleon appears carrying a whip on two legs.","The seven rules on the barn wall disappear completely.","A single new sentence about equality favours the pigs.","The animals can no longer tell the pigs from the men."],keys:["profit","squealer","napoleon","disappear","equality","pigs"]}
};
return {level:'A2', lead:'George Orwell · reading companion · <b>A2 elementary</b> (≈600 headwords)', CHAPTERS:CHAPTERS, READINGS:READINGS, EVENTS:EVENTS};
})();
