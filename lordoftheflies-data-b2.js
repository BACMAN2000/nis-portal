window.ATTWN_DATA = (function(){
const CHAPTERS = [
  { n:1, title:"The Sound of the Shell", unit:1, span:"Chapter 1",
    sum:"A plane crash leaves a group of British schoolboys alone on a tropical island with no adults. Ralph meets the asthmatic, short-sighted boy who hates being called Piggy, and together they find a conch shell that calls the other survivors together. Ralph is elected chief over Jack Merridew, who leads the choir as hunters instead, and the three boys who explore the island confirm that they are entirely alone.",
    vocab:[
      ["WRECKAGE","the broken remains of something that has been destroyed, such as a plane"],
      ["ASTHMATIC","suffering from a condition that makes breathing difficult"],
      ["SPECTACLES","glasses worn to help someone see better"],
      ["CONCH","a large spiral seashell that can be blown like a horn"],
      ["CHOIR","a group of people who sing together, often wearing matching robes"],
      ["ELECTED","chosen for a position of leadership by a vote"],
      ["HESITATE","to pause before doing something because you feel unsure"],
      ["LAGOON","a shallow area of calm sea water separated from the ocean"],
      ["RESCUE","the act of saving someone from a dangerous situation"],
      ["SCATTERED","spread out loosely over a wide area"],
      ["TRAPPED","unable to escape or move freely"],
      ["GLEAMED","shone with a soft, bright light"]
    ],
    comp:[
      ["Why are there no adults on the island?",["They chose to stay at home","None of the grown-ups survived the crash","They are exploring another part of the island","They left on a rescue boat"],1,"No grown-up survived when the plane came down."],
      ["Why does Piggy beg the others not to use his nickname?",["He has always been mocked for it and finds it humiliating","He does not understand English well","He prefers a completely different name","He thinks Ralph invented it"],0,"The name has followed him from home, where it was used to mock him."],
      ["What is special about the shell Ralph and Piggy find?",["It is extremely valuable","Blowing through it produces a sound that carries across the island","It can only be found underwater","It belonged to Jack's choir"],1,"Its sound is loud enough to summon every child on the island."],
      ["What detail shows that the choir still obeys school habits after the crash?",["They march in formation and wear their choir cloaks","They refuse to speak to anyone","They start hunting immediately","They ignore Jack completely"],0,"Old routines survive the crash even though the school itself no longer exists."],
      ["Why is Ralph chosen as chief rather than Jack?",["He is older than Jack","He held the conch and seemed calm and trustworthy","He is a stronger hunter","Jack refuses to be chief"],1,"His manner, not his age or strength, wins the vote."],
      ["What role does Ralph give Jack's choir to soften his disappointment?",["Rule-making","Building shelters","Hunting for meat","Signalling for rescue"],2,"Ralph lets the choir keep a special identity as hunters."],
      ["What do Ralph, Jack and Simon discover when they climb the mountain?",["Other survivors living further away","That they are on an island with nobody else on it","A working radio","The remains of the plane"],1,"The view from the top confirms they are completely alone."],
      ["Why does Jack fail to kill the trapped piglet?",["He cannot bring himself to do it in that moment","He has no knife with him","The piglet is too strong for him","Ralph physically stops him"],0,"Something in him still resists the act, for now."]
    ],
    tf:[
      ["Every adult on the plane survived the crash.",false,"No grown-up survived; the boys are entirely alone."],
      ["Piggy is teased because of his weight and his asthma.",true,"Both details are mentioned as reasons he is mocked."],
      ["The conch shell can be heard only by the person blowing it.",false,"Its sound carries across the whole island."],
      ["Jack's choir arrives before any of the other children.",false,"They arrive last of all, marching together."],
      ["Ralph is elected chief by a show of hands.",true,"The boys vote for him by raising their hands."],
      ["Jack manages to kill the piglet on the mountain path.",false,"He hesitates and the piglet escapes."]
    ],
    rw:[
      ["Ralph and Piggy find the conch near the lagoon.",0,"Right — they find it down by the water where they first meet."],
      ["Piggy wears glasses.",0,"Right — his spectacles are mentioned repeatedly."],
      ["Jack Merridew leads the choir.",0,"Right — he marches at their head."],
      ["There are exactly one hundred boys on the island.",2,"Doesn't say — no precise number is ever given."],
      ["Every single boy agrees enthusiastically with electing Ralph.",2,"Doesn't say — Jack's disappointment is mentioned, but not an actual vote against him."],
      ["Piggy is the one who is elected chief.",1,"Wrong — Ralph is elected, not Piggy."],
      ["Jack kills the piglet with his knife.",1,"Wrong — he hesitates and it escapes into the trees."],
      ["The boys agree that whoever holds the conch may speak.",0,"Right — this becomes their first rule."]
    ],
    halves:[
      ["The plane crashes on the island","because it is shot down while flying over the Pacific."],
      ["Piggy begs Ralph","never to use the nickname he has always hated."],
      ["Blowing the conch","brings the scattered children together on the beach."],
      ["Jack's choir marches in","wearing black cloaks despite the tropical heat."],
      ["Ralph is elected chief","because he seems calm and trustworthy, and he holds the conch."],
      ["Jack and the choir become","the hunters, responsible for finding meat."],
      ["From the mountain the boys realise","that they are alone on an island with no other people."],
      ["Jack cannot kill the piglet,","and the frightened animal escapes into the trees."]
    ],
    odd:[
      [["wreckage","debris","rubble","harvest"],3,"A harvest has nothing to do with destruction."],
      [["asthmatic","wheezing","breathless","athletic"],3,"Athletic describes fitness, not breathing difficulty."],
      [["conch","shell","whistle","pebble"],3,"A pebble makes no sound at all."],
      [["elected","chosen","voted","ignored"],3,"Ignored is the opposite of being selected."],
      [["hesitate","pause","delay","rush"],3,"To rush means to hurry, the opposite of hesitating."]
    ],
    wordform:[
      ["fear","fearful"],["shame","ashamed"],["trust","trustworthy"],["disappointment","disappointed"],
      ["curiosity","curious"],["terror","terrified"],["confusion","confused"],["authority","authoritative"]
    ],
    opposites:[
      ["scattered","gathered"],["elected","rejected"],["trapped","free"],["calm","panicked"],
      ["alone","accompanied"],["hesitate","act"],["disappointed","satisfied"],["survive","perish"]
    ],
    gaps:{ title:"Narrative tenses", bank:["had crashed","was blowing","gathered","had never seen","raised","escaped"],
      items:[
        ["By the time the boys reached the beach, the plane ___ into the jungle.","had crashed"],
        ["Ralph ___ the conch when the first children appeared.","was blowing"],
        ["Children from every part of the island ___ around Ralph.","gathered"],
        ["Some of the littluns ___ such an enormous shell before.","had never seen"],
        ["The boys ___ their hands to elect a chief.","raised"],
        ["The frightened piglet ___ into the trees.","escaped"]
      ]},
    think:{ quote:"Golding pictures Jack standing over the trapped piglet with his knife raised, unable, in that first moment, to bring the blade down.",
      question:"Why do you think Jack cannot kill the piglet on this first attempt?",
      options:["Because part of him still feels the old rules against killing","Because the piglet is too dangerous to approach","Because Ralph orders him to stop"],
      answer:0,
      note:"This hesitation matters because it will not last: as the story goes on, killing becomes easier and easier for Jack."},
    writing:[
      {task:"Imagine you are one of the littluns on the first day. Describe what you see and how you feel when the conch sounds and the other children appear.",target:"120-150 words",
       tips:["Use past tenses to narrate what happens","Describe your feelings honestly, including fear and relief","Mention at least one detail about the island itself"],
       starters:["I had been alone in the trees when...","The sound of the shell made me...","When I saw the other children, I...","By the end of that first day, I felt..."]},
      {task:"Compare Ralph and Jack as leaders, based only on what happens in this chapter.",target:"120-150 words",
       tips:["Support each point with something Ralph or Jack actually does","Use linking words such as whereas and although","Explain what each action reveals, rather than just retelling the story"],
       starters:["Ralph is chosen as chief mainly because...","Jack, on the other hand, seems to believe that...","Although Jack is disappointed, he...","Even at this early stage, it is clear that..."]}
    ]},
  { n:2, title:"Fire on the Mountain", unit:2, span:"Chapter 2",
    sum:"Ralph calls an assembly and explains that the boys must keep a signal fire burning on the mountain if they hope to be rescued. A small boy with a birthmark claims to have seen a beast in the night, but he is largely ignored as everyone rushes up the mountain to light the fire with Piggy's glasses. The fire spreads out of control into the forest, and by the time it is over, the boy with the birthmark cannot be found.",
    vocab:[
      ["ASSEMBLY","a formal meeting of a whole group"],
      ["SIGNAL","something used to send a message over a distance, such as smoke or light"],
      ["BIRTHMARK","a coloured mark on the skin present since birth"],
      ["SERPENT","a large snake, especially one seen as frightening or dangerous"],
      ["BLAZE","a large, strongly burning fire"],
      ["SPARK","a tiny bright piece of burning material that can start a fire"],
      ["SCORCHED","burnt on the surface by heat or fire"],
      ["PANIC","a sudden feeling of fear that makes people act without thinking clearly"],
      ["VANISHED","disappeared suddenly and completely"],
      ["SMOULDERING","burning slowly with smoke but no flame"],
      ["IGNITED","set on fire; began to burn"],
      ["RECKLESS","acting without thinking about danger or consequences"]
    ],
    comp:[
      ["Why does Ralph call the assembly at the start of the chapter?",["To choose a new chief","To explain the importance of a signal fire","To punish Jack","To count the littluns"],1,"Rescue depends on a fire that ships can see from far away."],
      ["What does the small boy with the birthmark claim to have seen?",["A ship on the horizon","A beast, like a kind of serpent, in the night","Another group of survivors","A fire on the mountain"],1,"He describes a snake-like beast moving in the dark."],
      ["How do the older boys react to his story at first?",["They believe him completely","They laugh at him, though some littluns cry","They punish him for lying","They ask Piggy to investigate"],1,"Laughter is their first defence against an uncomfortable idea."],
      ["How is the fire actually lit?",["With matches Piggy had hidden","By focusing sunlight through one lens of Piggy's glasses","By rubbing two sticks together","By striking a rock against metal"],1,"Piggy's spectacles become the only tool available for making fire."],
      ["What happens to the fire soon after it is lit?",["It goes out almost immediately","It spreads out of control into the forest below","It is put out by rain","Jack puts it out on purpose"],1,"Excitement, not planning, has guided the whole operation."],
      ["What does Piggy accuse the other boys of?",["Stealing his food","Behaving recklessly, like children, instead of thinking ahead","Refusing to build shelters","Wanting to leave the island"],1,"He is furious that nobody stopped to consider the consequences."],
      ["What basic thing does Piggy point out that nobody has done?",["Building a shelter","Making a list of everyone's names","Finding fresh water","Choosing a new chief"],1,"Without names, nobody can be sure who is even missing."],
      ["What is suggested about the boy with the birthmark by the end of the chapter?",["He is hiding as a joke","He may have died in the fire","He swam away from the island","He is punished by Jack"],1,"His disappearance, right after the blaze, is left deliberately unresolved and troubling."]
    ],
    tf:[
      ["The purpose of the signal fire is to attract a passing ship.",true,"Only a visible fire gives them any real chance of rescue."],
      ["Everyone believes the boy with the birthmark immediately.",false,"He is laughed at rather than believed at first."],
      ["The fire is lit using matches.",false,"It is lit using a lens from Piggy's glasses."],
      ["The fire spreads further than the boys intended.",true,"It runs from the mountain top down into the forest below."],
      ["Piggy is pleased that his glasses were used without asking.",false,"He is furious about it."],
      ["The boy with the birthmark is found safe at the end of the chapter.",false,"He cannot be found after the fire."]
    ],
    rw:[
      ["Ralph reminds the boys that the conch gives the right to speak.",0,"Right — this rule is repeated at the start of the assembly."],
      ["The boy with the birthmark says he saw the beast during the day.",1,"Wrong — he says he saw it in the night."],
      ["Piggy's glasses are used to start the fire.",0,"Right — one lens focuses the sunlight."],
      ["The fire burns for exactly three hours.",2,"Doesn't say — no duration is given in the text."],
      ["Some littluns were sleeping near the area that catches fire.",0,"Right — this is mentioned as the fire spreads."],
      ["Piggy calls the others sensible and responsible.",1,"Wrong — he calls their behaviour reckless."],
      ["The narrator explains exactly what happened to the boy with the birthmark.",2,"Doesn't say — his fate is left unclear."],
      ["Jack is the one who suggests climbing the mountain straight away.",0,"Right — he proposes it to prove the hunters are not afraid."]
    ],
    halves:[
      ["Ralph calls an assembly","to explain why a signal fire is so important."],
      ["A small boy with a birthmark","claims to have seen a beast, like a serpent, in the night."],
      ["Jack volunteers his hunters","to climb the mountain and build the fire at once."],
      ["Piggy's glasses are used","to focus the sunlight and ignite the dry leaves."],
      ["The fire spreads down the mountain","and leaves a wide area of forest scorched and smouldering."],
      ["Piggy scolds the others","for behaving recklessly instead of thinking ahead."],
      ["Nobody had drawn up a list of names,","so no one can be sure who is missing."],
      ["The boy with the birthmark","is never seen again after the fire."]
    ],
    odd:[
      [["assembly","gathering","meeting","isolation"],3,"Isolation means being alone, the opposite of a gathering."],
      [["blaze","fire","flame","ash"],3,"Ash is what remains after a fire, not the fire itself."],
      [["scorched","burnt","charred","fresh"],3,"Fresh is the opposite of burnt."],
      [["panic","terror","alarm","composure"],3,"Composure means staying calm, the opposite of panic."],
      [["reckless","careless","rash","cautious"],3,"Cautious means careful, the opposite of reckless."]
    ],
    wordform:[
      ["fear","fearful"],["panic","panicked"],["recklessness","reckless"],["suspicion","suspicious"],
      ["disappearance","missing"],["urgency","urgent"],["confusion","confused"],["responsibility","responsible"]
    ],
    opposites:[
      ["ignite","extinguish"],["reckless","careful"],["scorched","fresh"],["vanish","appear"],
      ["panic","calm"],["assembly","dispersal"],["signal","silence"],["believe","doubt"]
    ],
    gaps:{ title:"Passive voice", bank:["was lit","were laughed at","was seized","had been drawn up","was suspected","were sent"],
      items:[
        ["The fire ___ using one lens of Piggy's glasses.","was lit"],
        ["The boy with the birthmark and his story ___ by most of the older boys.","were laughed at"],
        ["One lens of Piggy's glasses ___ from his face without permission.","was seized"],
        ["No list of names ___ before the meeting ended.","had been drawn up"],
        ["By the end of the chapter, the fire ___ of having caused a boy's disappearance.","was suspected"],
        ["Search parties ___ to look for the missing boy, but he was not found.","were sent"]
      ]},
    think:{ quote:"Golding lets the reader watch the flames race down the mountainside long before any boy admits, even to himself, that something may have gone terribly wrong.",
      question:"Why do you think none of the boys immediately says out loud that the missing boy might be dead?",
      options:["Because nobody actually cares what happened to him","Because admitting it would make the disaster impossible to ignore","Because they are sure he simply ran away"],
      answer:1,
      note:"Golding uses this first disaster to show how easily fear of admitting a mistake can replace any real action."},
    writing:[
      {task:"Write the missing boy's story from his own point of view: what he sees, why he speaks up, and what happens when everyone rushes off towards the mountain.",target:"120-150 words",
       tips:["Use past tenses to build a clear sequence of events","Show his fear without being graphic about what may have happened to him","End at the point where he is left behind"],
       starters:["I saw it clearly, in the dark, moving between the trees...","Nobody believed me except...","When the others ran towards the mountain, I...","The last thing I remember is..."]},
      {task:"Explain, using evidence from the chapter, why Piggy is right to be angry about how the fire was lit.",target:"120-150 words",
       tips:["Refer to specific actions, such as taking the glasses without asking","Use passive voice where it fits naturally, for example 'the fire was lit without any real plan'","Reach a clear conclusion about who is responsible"],
       starters:["Piggy has good reason to be furious because...","The fire was lit without...","If the boys had planned more carefully,...","In the end, responsibility for the disaster falls on..."]}
    ]},
  { n:3, title:"Huts on the Beach", unit:3, span:"Chapter 3",
    sum:"Days after the fire, Jack hunts alone in the jungle but still fails to catch a pig, while Ralph and Simon struggle almost single-handedly to build shelters that keep falling down. When Jack returns, he and Ralph argue bitterly about what matters more, hunting or shelter and rescue, and neither can understand the other's point of view. Simon slips away to a hidden, plant-covered place in the jungle where he watches the evening arrive in peace.",
    vocab:[
      ["TRACK","a mark or sign left by an animal that shows where it has gone"],
      ["SHELTER","a simple structure built to give protection from the weather"],
      ["TRAMPLED","walked over something repeatedly, often carelessly"],
      ["TANGLED","twisted together in a messy, confused way"],
      ["TOILED","worked very hard for a long time"],
      ["EXHAUSTED","extremely tired after great effort"],
      ["INSTINCT","a natural ability to know or do something without thinking"],
      ["INDIFFERENT","not caring or interested about something"],
      ["INTRICATE","having many small parts, so it is complicated to make"],
      ["SOLITARY","done alone, without other people"],
      ["CREEPERS","climbing plants with long stems that hang or spread"],
      ["TWILIGHT","the soft light in the sky just after sunset"]
    ],
    comp:[
      ["What is Jack trying to learn as he hunts alone?",["How to build a shelter","How to track and find a pig","How to make fire","How to swim faster"],1,"He studies signs on the ground, trying to become a real hunter."],
      ["Why does Jack examine the ground and even a pile of dung?",["He is looking for water","He is trying to work out how close a pig might be","He wants to prove Ralph wrong","He is bored"],1,"Fresh droppings can tell a hunter how recently an animal passed."],
      ["Who does most of the work of building shelters?",["Jack and his hunters","Ralph and Simon, almost alone","Piggy and the littluns","Everyone equally"],1,"The two of them carry nearly the whole task by themselves."],
      ["What do most of the other boys prefer to do instead of building?",["Explore the mountain","Swim and play in the lagoon","Guard the fire","Hunt with Jack"],1,"The sea is simply more tempting than intricate, tiring work."],
      ["What does Ralph believe matters most for the group?",["Hunting enough meat","Shelters and the signal fire, for the sake of rescue","Winning arguments with Jack","Exploring every part of the island"],1,"He keeps returning to the idea that rescue depends on preparation."],
      ["Why can Jack not understand Ralph's priorities?",["He thinks Ralph is lying","Hunting feels like its own important achievement to him","He does not care about the group at all","He has never tried to build anything"],1,"For Jack, the thrill and skill of hunting feel like enough justification on their own."],
      ["Where does Simon go after the argument?",["Back to the mountain","To a hidden, plant-covered place in the jungle","Down to the wrecked plane","To find Jack's hunters"],1,"He knows a secret spot that nobody else has found."],
      ["What does Simon feel while he watches the evening arrive?",["Fear of the dark","A rare sense of peace, away from the arguments","Anger at Ralph and Jack","Hunger"],1,"For a while, the conflicts on the beach feel very far away."]
    ],
    tf:[
      ["Jack manages to catch a pig on this hunting trip.",false,"He returns with nothing once again."],
      ["Ralph and Simon do most of the shelter-building work.",true,"The others mostly swim and play instead."],
      ["Most of the boys help build shelters instead of swimming.",false,"Most of them prefer swimming and playing."],
      ["Ralph and Jack agree completely about what the group should prioritise.",false,"They argue and cannot understand each other's view."],
      ["Only two shelters have been built, and both are weak.",true,"Two flimsy huts stand, in danger of collapsing."],
      ["Simon shares his hidden place with Ralph immediately.",false,"He goes there alone; no one else has discovered it."]
    ],
    rw:[
      ["Jack hunts alone, without any of his choir.",0,"Right — he goes into the jungle by himself."],
      ["Jack manages to kill a pig on this trip.",1,"Wrong — he returns with nothing, once again."],
      ["Simon helps Ralph build the shelters.",0,"Right — the two of them work on the huts together."],
      ["The argument between Ralph and Jack ends with Jack apologising.",1,"Wrong — it ends with neither boy changing his mind."],
      ["The narrator states which boy shouts the loudest during the argument.",2,"Doesn't say — the text does not compare their volume."],
      ["Simon's hidden place is found by another boy before the chapter ends.",1,"Wrong — nobody else on the island has discovered it."],
      ["The exact number of pigs on the island is given in the chapter.",2,"Doesn't say — no such number is mentioned."],
      ["Ralph feels the weight of responsibility for the unfinished shelters.",0,"Right — this is described directly."]
    ],
    halves:[
      ["Jack hunts alone in the jungle","but fails once again to catch a pig."],
      ["Ralph and Simon build the shelters","almost entirely by themselves, exhausted by the effort."],
      ["Most of the other boys","prefer swimming and playing to helping with the huts."],
      ["Ralph values shelters and the fire","because he believes they offer the only real hope of rescue."],
      ["Jack values hunting","because it feels like its own kind of achievement to him."],
      ["Neither boy can understand the other,","so the argument ends without any real agreement."],
      ["Simon slips away alone","to a hidden place deep in the jungle."],
      ["Among the hanging creepers,","Simon watches quietly as evening turns into twilight."]
    ],
    odd:[
      [["track","trail","footprint","argument"],3,"An argument has nothing to do with following a trail."],
      [["exhausted","tired","worn out","energetic"],3,"Energetic is the opposite of exhausted."],
      [["tangled","knotted","twisted","orderly"],3,"Orderly means neat, the opposite of tangled."],
      [["solitary","alone","isolated","crowded"],3,"Crowded means full of people, the opposite of solitary."],
      [["indifferent","uninterested","unconcerned","eager"],3,"Eager means keen, the opposite of indifferent."]
    ],
    wordform:[
      ["exhaustion","exhausted"],["indifference","indifferent"],["frustration","frustrated"],["responsibility","responsible"],
      ["solitude","solitary"],["determination","determined"],["achievement","accomplished"],["patience","patient"]
    ],
    opposites:[
      ["exhausted","refreshed"],["tangled","untangled"],["solitary","sociable"],["indifferent","concerned"],
      ["collapse","stand"],["track","lose"],["toil","rest"],["twilight","dawn"]
    ],
    gaps:{ title:"Linkers of contrast", bank:["Although","whereas","however","even though","on the other hand","despite"],
      items:[
        ["___ Jack hunted all day, he did not catch a single pig.","Although"],
        ["Ralph wanted shelters built first, ___ Jack wanted to hunt.","whereas"],
        ["The huts kept collapsing; ___, Ralph and Simon kept rebuilding them.","however"],
        ["___ he was exhausted, Simon still found time to be alone.","even though"],
        ["Jack, ___, believed that meat mattered more than rescue.","on the other hand"],
        ["___ the difficulty, Ralph refused to give up on the shelters.","despite"]
      ]},
    think:{ quote:"Golding lets us watch Simon disappear into his private green shelter just as Ralph and Jack are shouting past each other on the beach.",
      question:"Why do you think Simon needs a hidden place of his own?",
      options:["Because he is planning to escape the island alone","Because the constant arguing and effort on the beach exhaust him and he needs quiet","Because he does not like any of the other boys"],
      answer:1,
      note:"Simon's need for solitude marks him out from the start as someone who notices things the others are too busy, or too loud, to see."},
    writing:[
      {task:"Write the argument between Ralph and Jack as a piece of narrative, showing what each boy says and, just as importantly, what each boy is thinking but does not say.",target:"120-150 words",
       tips:["Use linkers of contrast such as whereas and although","Show both points of view fairly","Avoid making either boy simply right or simply wrong"],
       starters:["Ralph began by pointing at the two half-finished huts...","Jack, on the other hand, felt that...","Although Ralph tried to stay calm,...","By the end of the argument, neither boy..."]},
      {task:"Describe Simon's hidden place in the jungle and explain why you think a place like this matters to him.",target:"120-150 words",
       tips:["Use descriptive language for the setting","Refer to specific details from the chapter, such as the creepers","Connect the place to how Simon is feeling"],
       starters:["Deep in the jungle, hidden by hanging creepers,...","Simon chose this place because...","Unlike the beach, this hidden cabin...","As twilight arrived, Simon..."]}
    ]},
  { n:4, title:"Painted Faces and Long Hair", unit:4, span:"Chapter 4",
    sum:"While Roger and Maurice torment the littluns on the beach, Jack paints his face with clay and charcoal and feels freed from every old rule. A ship passes close to the island, but the signal fire has gone out because the hunters left it to chase a pig, and Ralph is furious when they return chanting and triumphant. Jack strikes Piggy and breaks one lens of his glasses before the group roasts the pig and Ralph calls another assembly.",
    vocab:[
      ["SANDCASTLES","small models of castles built out of sand, usually by children"],
      ["CHARCOAL","a black substance made from burnt wood, used here as face paint"],
      ["DISGUISE","something worn to hide who a person really is"],
      ["LIBERATED","set free from limits, rules or restraints"],
      ["HORIZON","the line far away where the sky seems to meet the sea or land"],
      ["CHANTING","repeating words or sounds in a rhythm, often as a group"],
      ["FURIOUS","extremely angry"],
      ["SHATTERED","broken suddenly into many small pieces"],
      ["GLINTING","shining with small, quick flashes of light"],
      ["TABOO","a rule, often unspoken, against doing something a society sees as wrong"],
      ["PAINTED","covered with paint or colour"],
      ["MOCKED","laughed at unkindly or made fun of"]
    ],
    comp:[
      ["What do Roger and Maurice do to the littluns' sandcastles?",["Help improve them","Destroy them for no real reason","Copy them nearby","Photograph them"],1,"There is no real motive; it is simple, casual cruelty."],
      ["Why does Roger avoid actually hitting Henry with his stones?",["He has bad aim","Something from his old life still stops him","Ralph is watching him","He likes Henry"],1,"An old, half-remembered rule still holds him back, for now."],
      ["What does Jack do to his face, and why does it matter?",["He paints it to protect it from the sun, nothing more","He paints it as a disguise that seems to free him from old rules","He paints it to look like Ralph","He paints it by accident"],1,"Behind the mask he feels able to act without the weight of who he was."],
      ["What appears on the horizon while the hunters are away?",["Another island","A ship","A storm","An aircraft returning"],1,"A real chance of rescue passes close to the island."],
      ["Why does the signal fire go out at the worst possible moment?",["It rained heavily","Everyone who should tend it went hunting instead","Piggy let it go out on purpose","The wood was too wet to burn"],1,"The hunters abandoned their duty for the excitement of the chase."],
      ["How do the hunters behave when they return with the pig?",["Quiet and ashamed","Triumphant, chanting about the kill","Frightened of Ralph","Indifferent to the pig"],1,"Pride in the kill completely overshadows what has been lost."],
      ["What happens to Piggy during the argument that follows?",["He is praised for his idea","Jack hits him and breaks a lens of his glasses","He faints from the heat","He runs away"],1,"Violence, not argument, settles this exchange."],
      ["What does Ralph decide to do at the end of the chapter?",["Give up on the signal fire","Call another assembly to settle what matters most","Join Jack's hunters","Leave the island alone"],1,"He still believes the group can be made to agree on priorities."]
    ],
    tf:[
      ["Roger and Maurice destroy the littluns' sandcastles without any real reason.",true,"Their cruelty is casual, without any clear motive."],
      ["Roger throws stones directly at Henry and hits him.",false,"He aims carefully to miss every time."],
      ["Jack feels restricted and uncomfortable behind his painted mask.",false,"He feels liberated, not restricted."],
      ["The signal fire is burning when the ship passes.",false,"It has gone out because the hunters left it."],
      ["Jack hits Piggy and breaks one lens of his glasses.",true,"This happens during the argument about the missed ship."],
      ["The group ignores the roasted pig because they are too angry to eat.",false,"The smell of meat makes most of them eat despite the argument."]
    ],
    rw:[
      ["Roger throws stones near Henry but keeps missing on purpose.",0,"Right — an old rule still stops him from actually hitting the boy."],
      ["Jack paints his face with clay and charcoal.",0,"Right — this is described in detail."],
      ["The ship that passes actually stops to rescue the boys.",1,"Wrong — it disappears without stopping, since there is no smoke."],
      ["The text states exactly how many stones Roger throws.",2,"Doesn't say — no precise number is given."],
      ["Piggy loses both lenses of his glasses in this chapter.",1,"Wrong — only one lens shatters."],
      ["The hunters chant as they carry the dead pig.",0,"Right — they march along the beach chanting."],
      ["Ralph calls his assembly before the pig is roasted.",1,"Wrong — the pig is roasted first, and the assembly is called for later that night."],
      ["The narrator gives the exact number of hunters who go on this hunting trip.",2,"Doesn't say — no such number is given."]
    ],
    halves:[
      ["Roger and Maurice destroy","the sandcastles the littluns have carefully built."],
      ["Roger throws stones near Henry","but some old rule still stops him from actually hitting the boy."],
      ["Jack paints his face with clay and charcoal","and feels suddenly liberated from every old rule."],
      ["A ship passes on the horizon","just as the signal fire has been left to go out."],
      ["The hunters return chanting,","proud of having killed their first pig."],
      ["Ralph is furious","because the missed ship might have meant rescue."],
      ["Jack hits Piggy","and shatters one lens of his glasses."],
      ["After the pig is roasted,","Ralph calls another assembly to settle what matters most."]
    ],
    odd:[
      [["chanting","singing","shouting","whispering"],3,"Whispering is quiet, unlike the loud chanting."],
      [["furious","angry","enraged","delighted"],3,"Delighted is a positive feeling, the opposite of furious."],
      [["shattered","broken","cracked","intact"],3,"Intact means undamaged, the opposite of shattered."],
      [["disguise","mask","costume","truth"],3,"The truth is the opposite of something hidden by a disguise."],
      [["liberated","freed","released","trapped"],3,"Trapped is the opposite of being liberated."]
    ],
    wordform:[
      ["fury","furious"],["liberation","liberated"],["disguise","disguised"],["mockery","mocking"],
      ["triumph","triumphant"],["pride","proud"],["destruction","destructive"],["cruelty","cruel"]
    ],
    opposites:[
      ["liberated","restricted"],["shattered","whole"],["furious","calm"],["triumphant","defeated"],
      ["mocked","praised"],["destroy","build"],["taboo","permitted"],["chanting","silence"]
    ],
    gaps:{ title:"Relative clauses", bank:["who was playing","which had gone out","that killed the pig","whose glasses broke","which appeared on the horizon","who painted his face"],
      items:[
        ["Henry, ___ at the edge of the water, was the target of Roger's stones.","who was playing"],
        ["The signal fire, ___, could have shown the ship where they were.","which had gone out"],
        ["The hunters ___ came back chanting with pride.","that killed the pig"],
        ["Piggy, ___ during the fight, could hardly see afterwards.","whose glasses broke"],
        ["The ship, ___, disappeared before anyone could signal it.","which appeared on the horizon"],
        ["Jack, ___ with clay and charcoal, felt like a completely different person.","who painted his face"]
      ]},
    think:{ quote:"Golding shows Jack staring into a still pool of water at his own painted reflection, and laughing at it as though it belonged to somebody else entirely.",
      question:"Why do you think painting his face changes Jack's behaviour so much?",
      options:["Because the paint physically makes him stronger","Because the mask lets him stop feeling responsible for what he does","Because he wants to frighten the littluns for fun"],
      answer:1,
      note:"Behind a disguise, Jack no longer feels like the schoolboy he was; that feeling of freedom from identity is exactly what makes him dangerous."},
    writing:[
      {task:"Write Ralph's private thoughts as he watches the ship disappear on the horizon, knowing the fire has gone out.",target:"120-150 words",
       tips:["Show his feelings building from hope to anger","Refer to what the fire was supposed to achieve","Use relative clauses to add detail naturally"],
       starters:["At first, Ralph could not believe what he was seeing...","The ship, which had seemed so close,...","All he could think about was the fire that...","By the time Jack's hunters appeared, Ralph..."]},
      {task:"Explain what the painted mask seems to do to Jack, using evidence from the chapter.",target:"120-150 words",
       tips:["Refer to specific actions Jack takes once he is painted","Consider what he might feel he can now get away with","Use a clear structure: idea, evidence, explanation"],
       starters:["Once his face is painted, Jack seems to...","The mask appears to free him from...","One clear example of this change is when...","This matters for the rest of the story because..."]}
    ]},
  { n:5, title:"Beast from Water", unit:5, span:"Chapter 5",
    sum:"At an evening assembly Ralph lists everything that has gone wrong, from water and shelters to the fire and the toilet rocks, before the meeting turns to a deeper fear: a beast the littluns dream about at night. Jack denies any beast exists, Percival whispers that it comes from the sea, and Simon's suggestion that the beast might live inside them is laughed away. Jack furiously rejects Ralph's rules and leads most of the boys off in a wild, defiant dance, leaving Ralph, Piggy and Simon alone with their fear.",
    vocab:[
      ["NIGHTMARE","a frightening dream"],
      ["WHISPERED","spoke very quietly and softly"],
      ["REJECTED","refused to accept an idea or a person"],
      ["DESPERATE","feeling or showing a loss of hope, and willing to try anything"],
      ["CHAOTIC","in a state of complete confusion and disorder"],
      ["DEFIANT","openly refusing to obey or follow rules"],
      ["COLLAPSED","fell down suddenly, or stopped working completely"],
      ["CONVINCED","made someone certain that something is true"],
      ["RIDICULE","unkind laughter or mockery aimed at someone's idea"],
      ["ORDERLY","arranged or behaving in a neat, controlled way"],
      ["ABANDONED","left behind or given up completely"],
      ["ANXIOUS","feeling worried or nervous about something"]
    ],
    comp:[
      ["What kind of problems does Ralph list at the start of the assembly?",["Only problems with food","Practical problems such as water, shelters, the fire and hygiene","Problems between Jack and Piggy only","Problems with the weather"],1,"He covers everything the group has let slide since the crash."],
      ["Why does Ralph insist on rules and order?",["Because he enjoys giving orders","Because he believes they give the group the best chance of rescue","Because Piggy told him to","Because Jack asked him to"],1,"For Ralph, order and rescue are directly connected."],
      ["What do many of the littluns admit during the meeting?",["That they want to go home by swimming","That they have nightmares about a beast","That they dislike Ralph","That they are hungry"],1,"Fear, once one child names it, spreads quickly through the group."],
      ["How does Jack respond to the idea of a beast?",["He agrees it must be real","He rejects it completely, saying hunters would have seen it","He says only littluns believe in it","He refuses to discuss it at all"],1,"He argues from his own experience in the jungle."],
      ["What does Percival whisper that shocks the assembly?",["That he has seen Jack's hunters lie","That the beast comes out of the sea","That he wants to leave the island","That Ralph is not really the chief"],1,"An idea from the sea is somehow harder to dismiss than one from the forest."],
      ["What idea does Simon try to suggest about the beast?",["That it is only a large lizard","That it might be something inside all of them","That it is another group of boys","That it left the island already"],1,"His idea is closer to the novel's real subject than anyone realises."],
      ["How is Simon's idea received by the others?",["With serious discussion","With laughter and ridicule","With fear and silence","With applause"],1,"The group prefers mockery to an uncomfortable thought."],
      ["How does the assembly end?",["With a calm vote on new rules","With Jack leading a defiant, chanting group away","With everyone agreeing to build a boat","With the discovery of the real beast"],1,"Order collapses the moment Jack decides to walk away from it."]
    ],
    tf:[
      ["Ralph reports that the shelters and the fire are both being neglected.",true,"Both appear on his list of problems."],
      ["Everyone at the assembly denies having any fear of a beast.",false,"Many littluns, and some older boys privately, admit to being afraid."],
      ["Percival says the beast lives inside people.",false,"That is Simon's idea, not Percival's."],
      ["Simon's suggestion is taken seriously by the group.",false,"He is laughed at and sits down without finishing."],
      ["Jack leads a group away from the assembly in a wild dance.",true,"Most of the older boys follow him off down the beach."],
      ["Ralph, Piggy and Simon feel confident and hopeful at the end of the chapter.",false,"They feel alone and wish for a sign from the adult world."]
    ],
    rw:[
      ["Ralph mentions the toilet rocks as one of the problems.",0,"Right — hygiene is one of the issues on his list."],
      ["Jack believes firmly that a beast exists on the island.",1,"Wrong — he rejects the idea completely."],
      ["Percival says the beast comes from the sea.",0,"Right — this is his whispered contribution."],
      ["The text gives Percival's exact age.",2,"Doesn't say — no age is stated for him."],
      ["Simon successfully convinces the group that the beast is inside them.",1,"Wrong — he is laughed down before finishing."],
      ["Most of the older boys follow Jack away from the assembly.",0,"Right — the dance draws most of them away."],
      ["The narrator explains exactly how many littluns have nightmares.",2,"Doesn't say — no precise number is given."],
      ["Ralph feels hopeful and confident by the end of the chapter.",1,"Wrong — he feels alone and wishes for a sign from the grown-up world."]
    ],
    halves:[
      ["Ralph lists the group's practical problems,","from water and shelters to the fire and hygiene."],
      ["Ralph insists on rules and order","because he believes they matter for the group's rescue."],
      ["Many littluns admit","that they have nightmares about a beast in the forest."],
      ["Jack rejects the idea of a beast,","insisting that hunters would surely have seen it by now."],
      ["Percival whispers","that the beast comes out of the sea."],
      ["Simon tries to suggest","that the beast might be something inside all of them."],
      ["The group laughs at Simon","instead of taking his idea seriously."],
      ["Jack leads a defiant group away,","leaving Ralph, Piggy and Simon alone with their fear."]
    ],
    odd:[
      [["nightmare","dream","fear","comfort"],3,"Comfort is a pleasant feeling, unlike a nightmare."],
      [["chaotic","disorderly","messy","orderly"],3,"Orderly is the opposite of chaotic."],
      [["whispered","murmured","muttered","shouted"],3,"Shouted is loud, unlike a whisper."],
      [["rejected","refused","denied","accepted"],3,"Accepted is the opposite of rejected."],
      [["ridicule","mockery","scorn","praise"],3,"Praise is positive, unlike ridicule."]
    ],
    wordform:[
      ["fear","fearful"],["ridicule","ridiculous"],["defiance","defiant"],["chaos","chaotic"],
      ["anxiety","anxious"],["desperation","desperate"],["rejection","rejected"],["conviction","convinced"]
    ],
    opposites:[
      ["orderly","chaotic"],["rejected","accepted"],["convinced","doubtful"],["defiant","obedient"],
      ["abandoned","maintained"],["anxious","calm"],["ridicule","praise"],["collapsed","held"]
    ],
    gaps:{ title:"Conditionals", bank:["would have seen","had listened","will not improve","would feel","had not laughed","would follow"],
      items:[
        ["Jack insists that hunters ___ any trace of a beast if it existed.","would have seen"],
        ["If the boys ___ to Simon, they might have understood his idea.","had listened"],
        ["Ralph warns that conditions ___ unless everyone helps.","will not improve"],
        ["If a real sign from the grown-up world arrived, Ralph ___ enormous relief.","would feel"],
        ["Simon might have finished his idea if the others ___ at him.","had not laughed"],
        ["Jack was confident that most of the older boys ___ him away from the meeting.","would follow"]
      ]},
    think:{ quote:"Golding has Simon stand up, search for words that will not come easily, and try to tell the others that the beast might simply be themselves.",
      question:"Why do you think the other boys laugh at Simon instead of considering his idea?",
      options:["Because his idea is obviously silly and wrong","Because it is far more comfortable to imagine an outside monster than to look at themselves","Because they think Simon is joking on purpose"],
      answer:1,
      note:"Simon's idea is the novel's central warning, offered early and dismissed immediately — which is exactly why it matters."},
    writing:[
      {task:"Write Simon's unfinished speech in full, as if the others had let him continue explaining his idea about the beast.",target:"120-150 words",
       tips:["Keep Simon's hesitant, thoughtful voice","Use conditionals to explore possibilities, such as what would happen if they looked at themselves honestly","Avoid making him sound too confident; he struggles to find words"],
       starters:["What I am trying to say is...","Perhaps the beast is not an animal at all, but...","If we looked closely at ourselves, we might find...","I know this sounds strange, but..."]},
      {task:"Explain why Ralph's list of practical problems fails to keep the group united during the assembly.",target:"120-150 words",
       tips:["Refer to specific problems Ralph mentions","Explain how the conversation shifts toward fear","Reach a conclusion about what this shift reveals about the group"],
       starters:["Ralph begins the meeting by listing...","However, the mood changes when...","This shows that practical problems matter less than...","By the end of the assembly, it is clear that..."]}
    ]},
  { n:6, title:"Beast from Air", unit:6, span:"Chapter 6",
    sum:"During the night a battle in the sky sends a dead airman drifting down by parachute onto the mountain, where the wind makes his body rise and fall. Sam and Eric, tending the fire, see the shape and run, convinced they have found the beast. Ralph leads a search party the next day, and on the way Jack is drawn to Castle Rock, a natural fortress at the island's tip, but Ralph insists they push on towards the mountain instead.",
    vocab:[
      ["AIRMAN","a member of an air force, especially one who flies"],
      ["PARACHUTE","a large piece of fabric used to slow a person's fall through the air"],
      ["TANGLED","twisted together in a messy, confused way"],
      ["TERRIFIED","extremely frightened"],
      ["INSISTED","stated firmly that something was true, despite doubt from others"],
      ["CONVINCED","made certain that something is true"],
      ["FORTRESS","a strong building or place built to be defended"],
      ["RIDGE","a long, narrow raised strip of land or rock"],
      ["RELUCTANTLY","unwillingly; without wanting to"],
      ["STIRRED","moved slightly, especially due to wind or a light touch"],
      ["GUSTED","blew suddenly and strongly, in bursts"],
      ["SCRAMBLED","moved quickly and awkwardly, often over rough ground"]
    ],
    comp:[
      ["What actually lands on the mountain during the night?",["A ship's lifeboat","The body of a dead airman under a parachute","A wild animal","Another group of boys"],1,"A soldier killed in an aerial battle drifts down by parachute."],
      ["Why does the shape on the mountain seem to move?",["It is genuinely alive","The wind fills the parachute and shifts the body","Someone is controlling it","It is an illusion caused by the fire"],1,"Wind, not life, is what makes the body rise and fall."],
      ["Who first sees the shape and reacts with terror?",["Ralph and Piggy","The twins, Sam and Eric","Jack and his hunters","Simon"],1,"They are tending the fire when they catch sight of it."],
      ["How does the rest of the group react to the twins' story at dawn?",["They laugh it off completely","They take it seriously and grow nervous","They ignore it entirely","They blame the twins for lying"],1,"Even the usual sceptics feel uneasy this time."],
      ["Why does Ralph decide to lead the search himself?",["He enjoys danger","He feels his authority depends on it","Jack refuses to go","Piggy orders him to"],1,"Letting someone else lead would weaken his position as chief."],
      ["What is Castle Rock?",["A cave full of water","A rocky fortress at the tip of the island","The wreck of the plane","A hut built by Jack"],1,"A narrow ridge connects it to the rest of the island."],
      ["Why is Jack drawn to Castle Rock?",["It has good hunting nearby","Its natural walls would make an easy fort to defend","It is close to the lagoon","It has fresh water"],1,"He immediately sees its defensive value."],
      ["What does Ralph insist on instead of exploring Castle Rock?",["Returning to build more shelters","Continuing towards the mountain and the fire","Going back to the beach to eat","Sending Jack away alone"],1,"For Ralph, the search and the fire outweigh any fortress."]
    ],
    tf:[
      ["A real beast is confirmed to exist in this chapter.",false,"What the twins see is a dead airman, not a beast."],
      ["Sam and Eric are the ones who see the parachute shape.",true,"They are tending the fire when they see it."],
      ["The whole group laughs at the twins' story the next morning.",false,"This time nobody laughs; everyone grows nervous."],
      ["Ralph leads the search party himself.",true,"He feels his authority depends on taking the lead."],
      ["Jack wants to leave Castle Rock immediately without exploring it.",false,"He wants to stay and explore it properly."],
      ["Ralph insists they continue searching rather than stay at Castle Rock.",true,"He values the search and the fire more than the fortress."]
    ],
    rw:[
      ["The dead man arrives on the island by parachute.",0,"Right — his body drifts down under a parachute."],
      ["Sam and Eric are asleep when they see the shape.",1,"Wrong — they are awake, tending the signal fire."],
      ["The twins insist they have seen the beast.",0,"Right — they are convinced of it."],
      ["The text names every boy who joins the search party.",2,"Doesn't say — not every member is listed."],
      ["Jack wants to explore Castle Rock rather than continue the search immediately.",0,"Right — he is drawn to its defensive walls."],
      ["Ralph agrees to stay at Castle Rock and abandon the search.",1,"Wrong — he insists on continuing towards the mountain."],
      ["The narrator reveals exactly which country's aircraft were fighting overhead.",2,"Doesn't say — this detail is never given."],
      ["The parachute is still on the mountain at the end of the chapter.",0,"Right — nobody has resolved what it actually is yet."]
    ],
    halves:[
      ["A dead airman drifts down","beneath a parachute and lands on the mountain."],
      ["The wind fills the parachute","and makes the body seem to move on its own."],
      ["Sam and Eric see the shape","and run down the mountain, convinced it is the beast."],
      ["The whole group grows nervous","once the twins repeat their story at dawn."],
      ["Ralph leads the search","because he feels his authority as chief depends on it."],
      ["The search party reaches Castle Rock,","a natural fortress at the very tip of the island."],
      ["Jack wants to stay and explore the rock,","since its walls would make it easy to defend."],
      ["Ralph insists on pushing on,","so the group reluctantly follows him towards the mountain."]
    ],
    odd:[
      [["terrified","frightened","scared","confident"],3,"Confident is the opposite of terrified."],
      [["fortress","fort","stronghold","meadow"],3,"A meadow is open ground, not a defensive structure."],
      [["gusted","blew","swept","stilled"],3,"Stilled means becoming calm, the opposite of gusting."],
      [["scrambled","climbed","crawled","strolled"],3,"Strolled means walking slowly and calmly, unlike scrambling."],
      [["reluctantly","unwillingly","hesitantly","eagerly"],3,"Eagerly means willingly, the opposite of reluctantly."]
    ],
    wordform:[
      ["terror","terrified"],["fear","fearful"],["reluctance","reluctant"],["conviction","convinced"],
      ["authority","authoritative"],["defence","defensible"],["curiosity","curious"],["tension","tense"]
    ],
    opposites:[
      ["terrified","calm"],["reluctantly","willingly"],["convinced","doubtful"],["insisted","conceded"],
      ["ascend","descend"],["gusted","stilled"],["tangled","untangled"],["scrambled","strolled"]
    ],
    gaps:{ title:"Reporting verbs", bank:["insisted that","admitted that","explained that","claimed that","warned that","suggested that"],
      items:[
        ["Sam and Eric ___ they had seen the beast with their own eyes.","insisted that"],
        ["Some of the older boys secretly ___ they were also afraid.","admitted that"],
        ["Ralph ___ the search could not wait until later.","explained that"],
        ["The twins ___ the creature's face was a mass of moving fibres.","claimed that"],
        ["Ralph ___ delaying the search would only make things worse.","warned that"],
        ["Jack ___ they should stay and explore Castle Rock first.","suggested that"]
      ]},
    think:{ quote:"Golding shows the dead airman's body rising and slumping with every gust of wind, so that from below it looks, horribly, as if it is still breathing.",
      question:"Why do you think the twins are so quickly and completely convinced that they have seen the beast?",
      options:["Because they are lying to get attention","Because fear and darkness make an ordinary, sad sight look monstrous","Because Jack told them what to say"],
      answer:1,
      note:"The real horror in this chapter is human, not supernatural — a dead soldier, not a monster — but fear will not let the boys see that."},
    writing:[
      {task:"Write the moment Sam and Eric see the shape on the mountain, showing exactly what they see and why they misunderstand it.",target:"120-150 words",
       tips:["Build tension gradually before revealing what they see","Use reporting verbs such as insisted or claimed when they later tell their story","Keep the description frightening but not graphic"],
       starters:["The fire had almost burned low when Sam noticed...","At first it looked like nothing more than...","Eric grabbed his brother's arm and...","By the time they reached the bottom of the mountain, both boys..."]},
      {task:"Explain why Jack is drawn to Castle Rock, and predict what this fascination might mean later in the story.",target:"120-150 words",
       tips:["Describe Castle Rock using details from the chapter","Connect Jack's reaction to what you already know about his character","Make a reasonable prediction, not a wild guess"],
       starters:["Castle Rock appeals to Jack because...","Unlike Ralph, Jack seems to value...","This suggests that later in the story, Jack might...","If Jack eventually controls a place like this,..."]}
    ]},
  { n:7, title:"Shadows and Tall Trees", unit:7, span:"Chapter 7",
    sum:"As the search continues, Ralph despairs at the sight of the endless ocean, though Simon reassures him he will get home. A charging boar gives Ralph his first real taste of hunting when he wounds it with his spear, and a game re-enacting the chase turns rough enough to hurt a boy named Robert. That evening Ralph, Jack and Roger climb the mountain and flee in terror when the airman's shape seems to lift its head towards them.",
    vocab:[
      ["DESPAIR","a complete loss of hope"],
      ["CHARGING","rushing forward quickly and aggressively, often to attack"],
      ["THRUSTING","pushing something forward with sudden force"],
      ["PROUD","feeling pleased about something you have done"],
      ["FRENZIED","wild and out of control, often through excitement or fear"],
      ["VOLUNTEERED","offered to do something without being asked or forced"],
      ["RELUCTANTLY","unwillingly; without wanting to"],
      ["GLOOM","near darkness, or a feeling of sadness"],
      ["TERRIFIED","extremely frightened"],
      ["CONVINCED","made certain that something is true"],
      ["UNEASY","feeling worried or uncomfortable about a situation"],
      ["SWERVED","turned suddenly to avoid something"]
    ],
    comp:[
      ["What does Ralph feel as he looks out at the ocean?",["Excitement about exploring","A deep sense of despair at how alone they are","Anger at Jack","Boredom"],1,"The empty horizon reminds him how far they are from any rescue."],
      ["What does Simon tell Ralph, without being able to fully explain why?",["That the beast is not real","That Ralph will get home safely","That Jack will become chief","That the ship will return tomorrow"],1,"Simon offers comfort based on feeling rather than proof."],
      ["What happens when the boar charges the group?",["It runs straight past them, ignored","Ralph wounds it with his sharpened stick","Jack kills it instantly","The boys hide until it leaves"],1,"Ralph reacts almost without thinking and strikes the animal."],
      ["How does Ralph feel after wounding the boar?",["Ashamed and guilty","Breathless, shaking, and unexpectedly proud","Completely indifferent","Terrified of the boar"],1,"The thrill of the moment surprises even Ralph himself."],
      ["What happens during the mock hunting game with Robert?",["Nobody takes it seriously","It grows rough and Robert is genuinely hurt","Robert refuses to play the pig","Jack stops the game immediately"],1,"Play slides uncomfortably close to real violence."],
      ["Why does Simon volunteer to go back alone?",["He is afraid of the mountain","He wants to warn Piggy that the group will be late","He wants to avoid Jack","He is told to by Ralph"],1,"He thinks of the littluns waiting anxiously on the beach."],
      ["Who climbs the mountain at dusk to search for the beast?",["Ralph, Piggy and Simon","Ralph, Jack and Roger","Jack and his whole tribe","Sam and Eric again"],1,"These three press on as the light fails."],
      ["What makes the three boys flee from the mountain in terror?",["A real animal attacks them","The shape in the rocks appears to lift its head","They hear Piggy shouting","A storm suddenly begins"],1,"A gust of wind is enough to convince them the beast has moved."]
    ],
    tf:[
      ["Ralph feels hopeful and confident when he looks at the ocean.",false,"He feels despair at how alone they are."],
      ["Ralph wounds a wild boar with his sharpened stick.",true,"He strikes it almost without thinking as it charges."],
      ["The hunting game with Robert stays gentle and harmless throughout.",false,"It grows frenzied and Robert is genuinely hurt."],
      ["Simon offers to walk back through the forest alone.",true,"He volunteers so Piggy will know they are delayed."],
      ["Ralph, Jack and Roger all react calmly to what they see on the mountain.",false,"All three flee in terror."],
      ["The three boys run away without confirming what the shape really is.",true,"They flee before checking what has actually moved."]
    ],
    rw:[
      ["Simon tells Ralph he is certain Ralph will get home.",0,"Right — he reassures Ralph of this directly."],
      ["Ralph kills the boar completely.",1,"Wrong — he only wounds it before it escapes."],
      ["Robert is hurt during the pretend hunting game.",0,"Right — the game turns frenzied and he is genuinely hurt."],
      ["The text states exactly how many boys join the mock hunt.",2,"Doesn't say — no precise number is given."],
      ["Simon is afraid to walk through the forest alone.",1,"Wrong — he seems glad to move through the trees by himself."],
      ["Roger is one of the three boys who climb the mountain at dusk.",0,"Right — Ralph, Jack and Roger climb together."],
      ["The three boys confirm for certain that the shape is not a beast.",1,"Wrong — they flee, still convinced it is the beast."],
      ["The narrator gives a precise description of what is actually on the mountain.",2,"Doesn't say — the shape stays unexplained from the boys' point of view."]
    ],
    halves:[
      ["Ralph looks at the endless ocean","and feels a sudden despair at how alone they really are."],
      ["Simon reassures Ralph","that he is sure Ralph will get home safely."],
      ["A wild boar charges the group,","and Ralph wounds it with his sharpened stick."],
      ["The mock hunting game","grows rough enough to genuinely hurt Robert."],
      ["Simon volunteers","to walk back alone and warn Piggy they will be late."],
      ["Ralph, Jack and Roger","climb the mountain together at dusk."],
      ["A gust of wind","makes the shape among the rocks appear to lift its head."],
      ["Terrified, the three boys","run back down the mountain without looking behind them."]
    ],
    odd:[
      [["despair","hopelessness","gloom","optimism"],3,"Optimism is a hopeful feeling, the opposite of despair."],
      [["charging","attacking","rushing","retreating"],3,"Retreating means moving away, the opposite of charging."],
      [["frenzied","wild","frantic","calm"],3,"Calm is the opposite of frenzied."],
      [["proud","pleased","satisfied","ashamed"],3,"Ashamed is a negative feeling, the opposite of proud."],
      [["uneasy","worried","troubled","relaxed"],3,"Relaxed is the opposite of uneasy."]
    ],
    wordform:[
      ["despair","despairing"],["pride","proud"],["frenzy","frenzied"],["unease","uneasy"],
      ["terror","terrified"],["conviction","convinced"],["reluctance","reluctant"],["courage","courageous"]
    ],
    opposites:[
      ["despair","hope"],["charging","retreating"],["frenzied","calm"],["proud","ashamed"],
      ["uneasy","relaxed"],["terrified","fearless"],["volunteered","refused"],["gloom","brightness"]
    ],
    gaps:{ title:"Narrative tenses", bank:["was looking","charged","had wounded","was getting","had climbed","turned"],
      items:[
        ["Ralph ___ out at the ocean when Simon spoke to him.","was looking"],
        ["A wild boar suddenly ___ towards the group.","charged"],
        ["By the time it escaped, Ralph ___ it with his stick.","had wounded"],
        ["Simon noticed that it ___ late in the afternoon.","was getting"],
        ["By dusk the three boys ___ almost to the top of the mountain.","had climbed"],
        ["The shape among the rocks ___ slowly towards them.","turned"]
      ]},
    think:{ quote:"Golding has Ralph wound the boar and feel, for one confusing moment, real pride in the violence of it, before the feeling embarrasses him.",
      question:"Why might Ralph's pride at wounding the boar worry the reader more than it worries Ralph himself?",
      options:["Because it proves Ralph is now a bad person","Because it shows the same excitement that drives Jack's hunting is present in Ralph too","Because it means Ralph will now stop wanting rescue"],
      answer:1,
      note:"Golding is careful to show that the pull towards violence is not only Jack's; it is available to anyone, including the boy trying hardest to stay civilised."},
    writing:[
      {task:"Describe the mock hunting game from Robert's point of view, from the moment it starts as fun to the moment it becomes frightening.",target:"120-150 words",
       tips:["Show the change in mood gradually, not suddenly","Use narrative tenses to build a clear sequence","End with how Robert feels once the game stops"],
       starters:["At first, being the pig was almost funny...","With every round, the sticks seemed to...","I tried to laugh, but...","When it finally stopped, I..."]},
      {task:"Explain what Ralph's reaction to wounding the boar reveals about him, using evidence from the chapter.",target:"120-150 words",
       tips:["Refer to his exact feelings after the boar escapes","Compare this briefly to how Jack usually reacts to hunting","Reach a clear conclusion"],
       starters:["When Ralph wounds the boar, he feels...","This is surprising because...","Unlike Jack, Ralph usually...","This moment suggests that..."]}
    ]},
  { n:8, title:"Gift for the Darkness", unit:8, span:"Chapter 8",
    sum:"Jack challenges Ralph's leadership in a new assembly, and when nobody votes against Ralph, a humiliated Jack storms off weeping to start his own tribe. While Piggy suggests a new fire on the beach, Jack's hunters kill a nursing sow and leave its head on a stake as a gift for the beast, then raid the camp for fire. Left alone with the fly-covered head, an exhausted Simon has a feverish vision suggesting the beast lives inside every boy, and he faints.",
    vocab:[
      ["COWARD","a person who lacks courage and avoids danger or difficulty"],
      ["HUMILIATED","made to feel ashamed or foolish in front of others"],
      ["WEEPING","crying, often quietly or with an effort to hide it"],
      ["NURSING","feeding young with milk, as a mother animal does"],
      ["OFFERING","something given, often to please or calm a feared power"],
      ["SHARPENED","made pointed or sharp, especially at one end"],
      ["RAIDED","attacked or entered suddenly to take something"],
      ["SCUFFLE","a short, confused fight or struggle"],
      ["SWARMED","gathered or moved in a large, moving crowd"],
      ["FEVERISH","unusually hot, weak and confused, as if ill"],
      ["DIZZY","feeling unsteady, as if everything is spinning"],
      ["UNCONSCIOUS","not awake and not aware of anything around you"]
    ],
    comp:[
      ["What does Jack accuse Ralph of being?",["A liar","A coward","A thief","A traitor"],1,"He claims Ralph was too afraid to face the beast."],
      ["What happens when Jack asks for a vote against Ralph?",["Everyone votes against Ralph","Nobody raises a hand against Ralph","Piggy votes against Ralph","The vote is postponed"],1,"Ralph keeps his position by simple silence."],
      ["How does Jack react to this failure?",["He laughs it off","He is humiliated and leaves, weeping, to start his own tribe","He apologises to Ralph","He challenges Ralph to a fight"],1,"His pride cannot bear the public rejection."],
      ["What does Piggy suggest after Jack leaves?",["Giving up on the fire entirely","Building a new signal fire down by the shelters","Following Jack immediately","Sending Simon to find Jack"],1,"A fire nearer the beach would be easier to maintain."],
      ["What do Jack's hunters do to the sow they kill?",["They release her back into the jungle","They cut off her head and place it on a stake as a gift for the beast","They bring her back to Ralph's camp","They hide her from the others"],1,"It becomes an offering meant to satisfy the beast."],
      ["What else do the hunters do before returning to their camp?",["They apologise to Ralph","They raid the beach for burning branches from the fire","They rebuild the shelters","They release the piglets"],1,"They need fire of their own and take it by force."],
      ["What does Simon experience while alone with the sow's head?",["A peaceful, restful sleep","A feverish, dizzy vision that seems to speak to him","A visit from Ralph","Nothing unusual at all"],1,"Heat, flies and exhaustion combine into something like a waking dream."],
      ["What idea does the vision seem to communicate to Simon?",["That the beast lives far away in the sea","That the beast lives inside every boy, including himself","That the beast has already left the island","That Jack is the only dangerous one"],1,"It echoes the very idea Simon tried, and failed, to explain earlier."]
    ],
    tf:[
      ["Jack calls the assembly hoping to be voted chief instead of Ralph.",true,"That is exactly his goal in calling the meeting."],
      ["The other boys vote clearly against Ralph.",false,"Nobody raises a hand against him."],
      ["Jack leaves calmly, without any strong emotion.",false,"He leaves humiliated and weeping."],
      ["The hunters leave the sow's head as a gift for the beast.",true,"They fix it on a stake as an offering."],
      ["The hunters return to their camp without taking anything from Ralph's fire.",false,"They raid it for burning branches."],
      ["Simon remains calm and undisturbed while alone with the head.",false,"He grows dizzy and feverish before fainting."]
    ],
    rw:[
      ["Jack asks the group to vote on whether Ralph should remain chief.",0,"Right — this is the purpose of his assembly."],
      ["Everyone in the group chooses to follow Jack immediately.",1,"Wrong — many stay with Ralph, at least for now."],
      ["Piggy suggests a new fire lower down, near the shelters.",0,"Right — this is his practical suggestion."],
      ["The hunters kill a male boar rather than a sow.",1,"Wrong — they kill a nursing sow."],
      ["The text states exactly how many piglets follow the sow.",2,"Doesn't say — no number is given."],
      ["The hunters take burning branches from the beach fire.",0,"Right — this is how they start their own fire."],
      ["Simon speaks to the other boys about his vision immediately afterwards.",2,"Doesn't say — the chapter ends with him unconscious."],
      ["Simon faints after his feverish vision.",0,"Right — heat, flies and exhaustion overwhelm him."]
    ],
    halves:[
      ["Jack accuses Ralph","of being a coward who is afraid to hunt the beast."],
      ["When nobody votes against Ralph,","Jack feels humiliated in front of the whole group."],
      ["Jack storms off weeping","to start his own tribe of hunters."],
      ["Piggy suggests building","a new signal fire down by the shelters."],
      ["Jack's hunters kill a nursing sow","and place her head on a stake as a gift for the beast."],
      ["Before leaving, the hunters","raid the beach fire for burning branches."],
      ["Alone with the fly-covered head,","Simon grows dizzy in the feverish heat."],
      ["In his vision, Simon senses","that the beast lives inside every boy on the island."]
    ],
    odd:[
      [["coward","timid","fearful","brave"],3,"Brave is the opposite of coward."],
      [["humiliated","embarrassed","ashamed","proud"],3,"Proud is the opposite of humiliated."],
      [["weeping","crying","sobbing","laughing"],3,"Laughing is the opposite of weeping."],
      [["swarmed","crowded","covered","empty"],3,"Empty is the opposite of swarmed."],
      [["feverish","hot","burning","cool"],3,"Cool is the opposite of feverish."]
    ],
    wordform:[
      ["humiliation","humiliated"],["cowardice","cowardly"],["confidence","confident"],["fever","feverish"],
      ["exhaustion","exhausted"],["cruelty","cruel"],["vision","visionary"],["dizziness","dizzy"]
    ],
    opposites:[
      ["coward","hero"],["humiliated","honoured"],["weeping","laughing"],["feverish","cool"],
      ["swarmed","empty"],["dizzy","steady"],["nursing","weaned"],["offering","refusal"]
    ],
    gaps:{ title:"Passive voice", bank:["was accused","was left","was killed","were raided","was struck","was overwhelmed"],
      items:[
        ["Ralph ___ of cowardice in front of the whole group.","was accused"],
        ["The sow's head ___ on a sharpened stick as a gift.","was left"],
        ["The nursing sow ___ by the hunters working together.","was killed"],
        ["The shelters' fire and supplies ___ by Jack's hunters.","were raided"],
        ["Ralph ___ during the confusion of the raid.","was struck"],
        ["In the heat and the flies, Simon ___ by dizziness.","was overwhelmed"]
      ]},
    think:{ quote:"Golding lets the fly-covered head seem to speak to Simon, though it is really Simon's own exhausted mind giving words to something he already half understands.",
      question:"What do you think the vision is really telling Simon about the beast?",
      options:["That a real monster is hiding somewhere on the island","That the beast is a part of human nature itself, present in every boy","That Jack is secretly the beast"],
      answer:1,
      note:"The scene never claims the head literally speaks; Golding is showing us Simon reaching, alone and unwell, the idea the others refused to hear in Chapter 5."},
    writing:[
      {task:"Explain, in your own words, what Simon's vision seems to mean, and why you think Golding chooses to reveal this idea through Simon rather than another character.",target:"120-150 words",
       tips:["Refer to what the vision seems to say about the beast","Think about what kind of character Simon is compared with the others","Avoid simply retelling the scene"],
       starters:["The vision suggests that the real beast is...","Golding may have chosen Simon because...","Unlike Jack or Ralph, Simon...","This idea matters for the rest of the novel because..."]},
      {task:"Write the scene of Jack's failed vote from Piggy's point of view, showing what he notices and what he privately hopes will happen.",target:"120-150 words",
       tips:["Use passive voice naturally where it fits, for example 'no hand was raised'","Show Piggy's caution and his relief","Keep his voice recognisable from earlier chapters"],
       starters:["Piggy gripped the conch tightly as Jack spoke...","When nobody raised a hand, Piggy felt...","He knew Jack would not take this quietly...","As Jack walked away, Piggy thought..."]}
    ]},
  { n:9, title:"A View to a Death", unit:9, span:"Chapter 9",
    sum:"Simon recovers enough to climb the mountain, discovers that the beast is only the body of a dead airman, and frees it so the wind can carry it out to sea. While Ralph and Piggy join Jack's feast, a storm builds and the hunters begin their wild dance; when Simon stumbles out of the forest to share the truth, the frenzied circle mistakes him for the beast and kills him. The storm carries both the airman's body and Simon's out to sea as the island falls quiet under the stars.",
    vocab:[
      ["STORM","a period of very bad, violent weather with strong wind and rain"],
      ["THUNDER","the loud noise that comes after lightning during a storm"],
      ["CHANTING","repeating words or sounds in a rhythm, often as a group"],
      ["CIRCLE","a ring shape, or a group of people arranged in a ring"],
      ["FRENZY","a state of wild, uncontrolled excitement or activity"],
      ["LIGHTNING","a sudden, bright flash of light in the sky during a storm"],
      ["DRAGGED","pulled something heavy along, often with effort"],
      ["TIDE","the regular rise and fall of the sea's level"],
      ["STARS","the small, bright points of light seen in the night sky"],
      ["SCREAMING","shouting loudly in fear, pain or excitement"],
      ["MISTOOK","wrongly identified someone or something as different"],
      ["DARKNESS","the state of having little or no light"]
    ],
    comp:[
      ["What does Simon discover at the top of the mountain?",["A hidden supply of food","That the 'beast' is only the body of a dead airman","A group of enemy soldiers","Another survivor"],1,"The mystery that has terrified everyone turns out to be tragically human."],
      ["What does Simon do once he understands the truth?",["He hides the body","He frees the parachute lines so the body can drift out to sea","He brings the body down to the beach","He buries it"],1,"He treats the dead man with quiet respect before heading down to tell the others."],
      ["Why do Ralph and Piggy go to Jack's feast?",["Jack invites them formally","The smell of roasting meat is hard to resist","They want to make peace with Jack","Piggy is starving and has no other food"],1,"Hunger overcomes their reluctance to be near Jack's tribe."],
      ["What does Jack do at the feast?",["He apologises to Ralph","He offers meat and invites others to join his tribe","He gives the conch back to Ralph","He refuses to eat with anyone"],1,"He is openly trying to win more boys away from Ralph."],
      ["What is happening in the sky as the feast continues?",["The sun is shining brightly","A storm is building, with thunder rolling closer","Another aircraft flies over","Nothing unusual"],1,"The weather mirrors the mounting tension on the beach."],
      ["What are the boys doing when Simon comes out of the forest?",["Sleeping","Performing their hunting dance in a circle","Searching for Piggy","Building a new shelter"],1,"The dance has grown wild and almost uncontrollable."],
      ["Why do the boys attack Simon?",["They recognise him and dislike him","In the storm and frenzy, they mistake him for the beast","Jack orders them to attack any newcomer","Simon attacks them first"],1,"Darkness, rain and panic make a tragic mistake possible."],
      ["What happens to Simon's body and the airman's body by the end of the chapter?",["Both are buried on the island","Both are carried out to sea, one by the tide and one by the wind","Both are found the next morning","Neither is ever found"],1,"The sea takes both, quietly, before dawn."]
    ],
    tf:[
      ["Simon discovers that the beast is a real, living monster.",false,"He finds only the body of a dead airman."],
      ["Simon frees the parachute so it can drift away from the island.",true,"He works the lines loose so the wind can carry it off."],
      ["Ralph and Piggy refuse to go anywhere near Jack's feast.",false,"They go, mostly for the meat."],
      ["A storm is approaching while the boys dance around the fire.",true,"Thunder and lightning build through the scene."],
      ["The boys immediately recognise Simon as he comes out of the forest.",false,"They mistake him for the beast in the storm and darkness."],
      ["Simon's body and the airman's body are both eventually carried out to sea.",true,"The tide takes Simon; the wind takes the airman."]
    ],
    rw:[
      ["Simon works to free the airman's body from the rocks.",0,"Right — he releases the tangled parachute lines."],
      ["Ralph refuses completely to go near Jack's camp.",1,"Wrong — he goes with Piggy, drawn by the food."],
      ["Jack invites others to join his tribe during the feast.",0,"Right — this is his clear purpose at the feast."],
      ["The text states exactly how many boys join the dancing circle.",2,"Doesn't say — no precise number is given."],
      ["The boys recognise Simon immediately as he runs towards them.",1,"Wrong — they mistake him for the beast."],
      ["Ralph and Piggy are pulled into the edge of the dancing circle.",0,"Right — they are caught up in it almost without meaning to be."],
      ["The narrator explains exactly what Piggy is thinking during the attack.",2,"Doesn't say — his private thoughts are not given here."],
      ["Simon dies as a result of the attack.",0,"Right — he does not survive it."]
    ],
    halves:[
      ["Simon climbs the mountain","and discovers that the beast is only a dead airman."],
      ["Simon frees the parachute lines","so the wind can carry the body away from the island."],
      ["Ralph and Piggy join Jack's feast","mostly because the smell of meat is too tempting to resist."],
      ["Jack offers meat to the group","and invites anyone willing to join his tribe."],
      ["A storm gathers overhead","just as the boys begin their wild hunting dance."],
      ["Simon runs out of the forest","to tell everyone the truth about the beast."],
      ["In the chaos of the storm,","the circle mistakes Simon for the beast and kills him."],
      ["By morning,","both the airman's body and Simon's have been carried out to sea."]
    ],
    odd:[
      [["frenzy","chaos","madness","order"],3,"Order is the opposite of frenzy."],
      [["screaming","shouting","yelling","whispering"],3,"Whispering is quiet, unlike screaming."],
      [["dragged","pulled","hauled","released"],3,"Released means letting go, the opposite of dragging something away."],
      [["mistook","confused","misjudged","recognised"],3,"Recognised means correctly identifying, the opposite of mistaking."],
      [["darkness","gloom","blackness","daylight"],3,"Daylight is the opposite of darkness."]
    ],
    wordform:[
      ["frenzy","frenzied"],["darkness","dark"],["confusion","confused"],["tragedy","tragic"],
      ["violence","violent"],["chaos","chaotic"],["terror","terrified"],["silence","silent"]
    ],
    opposites:[
      ["darkness","light"],["frenzy","calm"],["dragged","released"],["mistook","recognised"],
      ["screaming","whispering"],["gathered","dispersed"],["truth","lie"],["stillness","movement"]
    ],
    gaps:{ title:"Relative clauses", bank:["who had fainted earlier","which was tangled in the lines","who offered meat to everyone","which grew louder with the thunder","who came out of the forest","which carried both bodies away"],
      items:[
        ["Simon, ___, still felt determined to climb the mountain.","who had fainted earlier"],
        ["The body, ___, could finally drift away once Simon freed it.","which was tangled in the lines"],
        ["Jack, ___, tried to persuade more boys to join his tribe.","who offered meat to everyone"],
        ["The chanting circle, ___, pulled in Ralph and Piggy as well.","which grew louder with the thunder"],
        ["Simon, ___ to share the truth, was tragically mistaken for the beast.","who came out of the forest"],
        ["The storm, ___, left the island strangely quiet afterwards.","which carried both bodies away"]
      ]},
    think:{ quote:"Golding lets the storm, the firelight and the wild dance blur together until the reader, like the boys themselves, can hardly tell any more what is really happening on the sand.",
      question:"Why do you think Golding makes it genuinely hard, in this scene, to tell exactly who is responsible for what happens to Simon?",
      options:["Because he wants to excuse the boys completely","Because he wants to show how a frightened crowd can do something no single person planned or intended","Because the scene is not meant to be taken seriously"],
      answer:1,
      note:"This is the moment the novel has been building towards since Chapter 5: the very idea Simon tried to explain — a fear that lives in people — ends up destroying him."},
    writing:[
      {task:"Write a short newspaper-style report describing what happened on the beach, as if written by someone who could see events clearly but did not know the boys personally.",target:"120-150 words",
       tips:["Stay factual and calm in tone, like a report rather than a personal story","Use relative clauses to add extra information smoothly","Avoid taking sides or blaming any one boy by name"],
       starters:["Last night, during a violent storm,...","Witnesses described a chanting circle that...","The victim, who had been trying to reach the group,...","No single person has been identified as..."]},
      {task:"Explain what Simon discovers about the beast, and why this truth arrives too late to change anything.",target:"120-150 words",
       tips:["Refer to what Simon actually finds on the mountain","Explain the timing: the storm, the dance, the darkness","Reach a clear, thoughtful conclusion"],
       starters:["Simon discovers that the beast is really...","This truth could have changed everything, except that...","By the time Simon reaches the beach,...","The tragedy is that..."]}
    ]},
  { n:10, title:"The Shell and the Glasses", unit:10, span:"Chapter 10",
    sum:"Ashamed and full of guilt, Ralph, Piggy, Sam and Eric agree on an excuse for what happened to Simon: darkness, confusion, an accident nobody meant. At Castle Rock, Jack has a boy named Wilfred beaten for no clear reason and tells his tribe the beast came to them in disguise and might return. That night Jack, Roger and Maurice raid the shelters and steal Piggy's glasses, leaving the conch untouched because it was fire, not power, that they wanted.",
    vocab:[
      ["ASHAMED","feeling guilty or embarrassed about something you have done"],
      ["GUILT","a feeling of having done something wrong"],
      ["EXCUSE","a reason given to explain or defend a mistake or a fault"],
      ["BEATEN","hit repeatedly, as a punishment or attack"],
      ["DISGUISE","something worn or used to hide who or what someone really is"],
      ["OBEDIENT","willing to do what one is told"],
      ["UNEASE","a feeling of anxiety or discomfort"],
      ["DEFENCELESS","unable to protect oneself"],
      ["SNATCHED","grabbed something suddenly and quickly"],
      ["FLICKERING","shining unsteadily, with quick, small changes in light"],
      ["ACCUSED","charged with doing something wrong"],
      ["LOYAL","firm and faithful in one's support of someone"]
    ],
    comp:[
      ["How do Ralph and Piggy explain what happened to Simon?",["They admit it was murder","They tell themselves it was an accident caused by darkness and confusion","They blame Jack entirely","They refuse to discuss it at all"],1,"They build a comforting story around the storm and the dark."],
      ["What do Sam and Eric say when they arrive?",["A completely different story","Almost the same excuse as Ralph and Piggy","That they saw nothing at all","That Jack ordered the attack"],1,"The same explanation spreads among the boys who feel guilty."],
      ["Why is Wilfred beaten at Castle Rock?",["For trying to escape","For no clearly explained reason","For stealing food","For questioning Jack"],1,"Jack's punishments no longer need a real justification."],
      ["What new story does Jack tell his tribe about the beast?",["That it has left the island for good","That it came to them in disguise and might return","That Ralph invented it","That Piggy is the beast"],1,"A returning, disguised beast keeps his hunters afraid and useful."],
      ["Why is fear of the beast useful to Jack?",["It has no real use to him","It helps keep his hunters loyal and obedient","It makes the hunters afraid of Jack instead","It ends the need for hunting"],1,"A frightened tribe follows orders more easily."],
      ["What is the real purpose of the night raid on Ralph's camp?",["To steal the conch","To take Piggy's glasses in order to make fire","To kidnap Piggy","To destroy the shelters completely"],1,"Jack's tribe needs fire, and only the glasses can make it."],
      ["What is left behind during the raid?",["The glasses","The conch shell","The spears","The sow's head"],1,"The conch means nothing to Jack any more."],
      ["How does Piggy react once his glasses are taken?",["He is unconcerned","He is left almost unable to see, and Ralph understands what it will cost them","He immediately gets them back","He decides to join Jack"],1,"Both boys grasp at once how serious the loss really is."]
    ],
    tf:[
      ["Ralph and Piggy openly admit responsibility for Simon's death.",false,"They tell themselves it was an accident, not something they caused."],
      ["Sam and Eric give a story very similar to Ralph and Piggy's.",true,"All four repeat almost the same excuse."],
      ["Jack explains clearly and fairly why Wilfred is punished.",false,"No clear reason for the beating is ever given."],
      ["Jack tells his tribe the beast might return in disguise.",true,"This becomes his new, convenient explanation."],
      ["The raiders take the conch shell and leave the glasses.",false,"They take the glasses and leave the conch untouched."],
      ["Piggy can see clearly after his glasses are stolen.",false,"He can only make out flickering, indistinct shapes."]
    ],
    rw:[
      ["Ralph and Piggy avoid saying Simon's name directly.",0,"Right — they seem to avoid it on purpose."],
      ["Wilfred is beaten for a clearly explained crime.",1,"Wrong — no clear reason is ever given."],
      ["Jack tells his hunters that the beast may return in disguise.",0,"Right — this becomes his new warning to the tribe."],
      ["The text gives the exact number of hunters loyal to Jack at this point.",2,"Doesn't say — no precise number is stated."],
      ["The raiders steal the conch during the night attack.",1,"Wrong — they leave it and take the glasses instead."],
      ["Piggy struggles to understand what is happening during the raid.",0,"Right — he is defenceless and confused without his glasses."],
      ["The narrator states exactly what Ralph says to Piggy the next morning.",2,"Doesn't say — their exact words are not all reported."],
      ["Without his glasses, Piggy can only see flickering, indistinct shapes.",0,"Right — this is described directly."]
    ],
    halves:[
      ["Ralph and Piggy tell each other","that Simon's death was a terrible accident caused by the storm and darkness."],
      ["Sam and Eric arrive","and repeat almost exactly the same excuse."],
      ["Jack has Wilfred beaten","for an offence that is never clearly explained."],
      ["Jack tells his tribe","that the beast came to them in disguise and might return."],
      ["Fear of the beast","helps Jack keep his hunters loyal and obedient."],
      ["Jack, Roger and Maurice raid the shelters","while most of Ralph's group is asleep."],
      ["The raiders take Piggy's glasses","but leave the conch shell untouched on the sand."],
      ["Without his spectacles,","Piggy can only make out flickering, indistinct shapes."]
    ],
    odd:[
      [["ashamed","guilty","embarrassed","proud"],3,"Proud is the opposite of ashamed."],
      [["obedient","loyal","compliant","rebellious"],3,"Rebellious is the opposite of obedient."],
      [["defenceless","vulnerable","exposed","protected"],3,"Protected is the opposite of defenceless."],
      [["snatched","grabbed","seized","offered"],3,"Offered means giving willingly, the opposite of snatching."],
      [["accused","blamed","charged","cleared"],3,"Cleared means found innocent, the opposite of accused."]
    ],
    wordform:[
      ["guilt","guilty"],["shame","ashamed"],["obedience","obedient"],["loyalty","loyal"],
      ["defence","defenceless"],["accusation","accused"],["cruelty","cruel"],["unease","uneasy"]
    ],
    opposites:[
      ["ashamed","proud"],["obedient","rebellious"],["defenceless","protected"],["snatched","offered"],
      ["accused","cleared"],["loyal","disloyal"],["flickering","steady"],["guilt","innocence"]
    ],
    gaps:{ title:"Conditionals", bank:["would not have happened","had recognised","will return","would be easier","had not lost","would follow"],
      items:[
        ["Ralph believes that if the storm had not confused everyone, Simon's death ___.","would not have happened"],
        ["If the circle ___ Simon sooner, he might still be alive.","had recognised"],
        ["Jack warns his tribe that the beast ___ in disguise.","will return"],
        ["Jack believes hunting ___ if the whole island feared the beast.","would be easier"],
        ["If Piggy ___ his glasses, the fire could still be lit easily.","had not lost"],
        ["Jack was sure that Roger and Maurice ___ him on the raid.","would follow"]
      ]},
    think:{ quote:"Golding has Ralph and Piggy repeat the same careful phrases about the storm and the darkness until the explanation starts to sound rehearsed rather than remembered.",
      question:"Why do you think Ralph and Piggy need to keep repeating the same excuse to each other?",
      options:["Because they genuinely cannot remember what happened","Because saying it often enough might make the guilt easier to bear","Because Jack has ordered them to say it"],
      answer:1,
      note:"Repeating an excuse is often less about persuading someone else than about persuading yourself; Golding lets us watch that process happen in real time."},
    writing:[
      {task:"Write the conversation between Ralph and Piggy the morning after Simon's death, showing what they say out loud and what you think each of them is really feeling.",target:"120-150 words",
       tips:["Keep any dialogue realistic and brief, but focus mainly on narration","Show the gap between what they say and what they seem to feel","Use conditionals if useful, such as 'if only...'"],
       starters:["Neither boy wanted to be the first to speak...","Piggy kept repeating that...","Ralph stared at the sand and thought...","By the end of the conversation, both of them..."]},
      {task:"Explain why stealing Piggy's glasses is a more damaging act than it might first appear.",target:"120-150 words",
       tips:["Think about what the glasses are used for on the island","Consider what this means for Ralph's group specifically","Reach a clear conclusion about power and resources"],
       starters:["At first, stealing glasses might seem like a small act, but...","Without the glasses, Ralph's group can no longer...","This gives Jack's tribe an advantage because...","The theft shows that..."]}
    ]},
  { n:11, title:"Castle Rock", unit:11, span:"Chapter 11",
    sum:"Ralph leads his tiny remaining group, including Piggy carrying the conch, to Castle Rock to demand back the stolen glasses. A fight breaks out between Ralph and Jack while Sam and Eric are seized, and as Piggy tries to argue that rules matter more than hunting, Roger releases a huge boulder that kills him and shatters the conch. Jack throws his spear at the fleeing Ralph, and Roger advances on the twins with a new, unspoken authority.",
    vocab:[
      ["DEMAND","a firm request that leaves little room for refusal"],
      ["BOULDER","a very large rock"],
      ["LEVER","a bar used to lift or move something heavy by pressing down on one end"],
      ["SEIZED","grabbed and held by force"],
      ["SHATTERING","breaking suddenly into many small pieces"],
      ["PLUNGED","fell or moved down suddenly and with great force"],
      ["GRAZING","touching or scraping the surface of something lightly while passing"],
      ["TRIUMPH","a feeling of great satisfaction after a success or a victory"],
      ["AUTHORITY","the power or right to control and give orders to others"],
      ["FORCED","made to do something against one's will"],
      ["SQUINTING","looking with partly closed eyes, often to see something more clearly"],
      ["BRUISED","marked with a dark patch on the skin caused by a blow"]
    ],
    comp:[
      ["Why do Ralph and his group travel to Castle Rock?",["To join Jack's tribe","To demand the return of Piggy's stolen glasses","To rescue Simon","To find fresh water"],1,"Without the glasses their fire, and their last hope, is gone."],
      ["Why does Piggy insist on carrying the conch himself?",["He wants to keep it safe from Ralph","He still believes it represents order and meaning","He does not trust Sam and Eric","Ralph orders him to"],1,"For Piggy, the conch still stands for a world worth defending."],
      ["What happens between Ralph and Jack at Castle Rock?",["They shake hands and agree to share the island","They fight with the blunt ends of their spears","Jack immediately surrenders","Ralph refuses to speak to him"],1,"Words have already failed by this point in the story."],
      ["What happens to Sam and Eric during the visit?",["They escape easily","They are seized and dragged into Jack's camp","They join the fight against Jack","They are sent home early"],1,"They become prisoners of Jack's tribe almost instantly."],
      ["What does Piggy try to argue, one last time?",["That Jack should be chief","That rules and rescue matter more than hunting and killing","That the beast is definitely real","That the glasses do not matter"],1,"He makes his clearest, most desperate case for order."],
      ["What does Roger do above the group?",["He warns everyone of danger","He releases a huge boulder onto Piggy","He throws his spear at Ralph","He tries to stop the fighting"],1,"His action decides the scene far more than any argument does."],
      ["What happens to Piggy and the conch?",["Both survive undamaged","Piggy is killed and the conch is shattered","Only the conch is destroyed","Only Piggy is hurt, not killed"],1,"Both are destroyed in the same instant."],
      ["What does Ralph do immediately after Piggy's death?",["He attacks Jack","He runs for his life towards the trees","He surrenders to Jack","He tries to rebuild the conch"],1,"Flight is the only option left to him now."]
    ],
    tf:[
      ["Piggy carries the conch to Castle Rock himself.",true,"He insists on holding it during the journey."],
      ["Jack and his tribe welcome Ralph's group peacefully.",false,"They block the path with spears and threats."],
      ["Sam and Eric are allowed to leave freely after the visit.",false,"They are seized and kept at Castle Rock."],
      ["Piggy argues that hunting matters more than rules.",false,"He argues the opposite: rules and rescue matter most."],
      ["Roger deliberately releases the boulder that kills Piggy.",true,"He leans on the lever and lets it go."],
      ["Ralph stays at Castle Rock after Piggy's death.",false,"He runs away towards the trees."]
    ],
    rw:[
      ["Ralph's group travels to Castle Rock to get the glasses back.",0,"Right — this is the whole purpose of the journey."],
      ["Jack immediately agrees to return the glasses without any conflict.",1,"Wrong — the visit ends in violence, not agreement."],
      ["Piggy is killed by the falling boulder.",0,"Right — it strikes him directly."],
      ["The exact weight of the boulder is given in the text.",2,"Doesn't say — no measurement is given."],
      ["Sam and Eric fight off Jack's hunters successfully.",1,"Wrong — they are seized and dragged away."],
      ["The conch shell is destroyed along with Piggy.",0,"Right — it shatters in the same moment."],
      ["The narrator explains exactly what Roger is thinking as he releases the boulder.",2,"Doesn't say — his exact thoughts are left unclear."],
      ["Jack throws his spear at Ralph as he flees.",0,"Right — Ralph is grazed as he runs."]
    ],
    halves:[
      ["Ralph's tiny group travels to Castle Rock","to demand the return of Piggy's stolen glasses."],
      ["Piggy insists on carrying the conch","because he still believes it means something."],
      ["Ralph and Jack fight","with the blunt ends of their spears."],
      ["Jack's hunters seize","Sam and Eric and drag them into the camp."],
      ["Piggy shouts that rules and rescue","matter more than hunting and killing."],
      ["Roger releases the boulder,","which kills Piggy and shatters the conch."],
      ["Jack throws his spear at Ralph,","who turns and runs for the safety of the trees."],
      ["Roger advances on the twins","with a quiet, unspoken authority nobody dares question."]
    ],
    odd:[
      [["boulder","rock","stone","feather"],3,"A feather is light, unlike a heavy boulder."],
      [["seized","grabbed","captured","released"],3,"Released is the opposite of seized."],
      [["bruised","hurt","injured","unharmed"],3,"Unharmed is the opposite of bruised."],
      [["triumph","victory","success","defeat"],3,"Defeat is the opposite of triumph."],
      [["forced","compelled","obliged","invited"],3,"Invited implies choice, unlike being forced."]
    ],
    wordform:[
      ["triumph","triumphant"],["authority","authoritative"],["defiance","defiant"],["cruelty","cruel"],
      ["bruise","bruised"],["fear","fearful"],["silence","silent"],["force","forced"]
    ],
    opposites:[
      ["seized","released"],["bruised","unharmed"],["triumph","defeat"],["forced","invited"],
      ["shattered","whole"],["demand","offer"],["fled","stayed"],["authority","chaos"]
    ],
    gaps:{ title:"Reporting verbs", bank:["demanded that","argued that","warned that","shouted that","claimed that","ordered that"],
      items:[
        ["Ralph ___ Jack return Piggy's glasses immediately.","demanded that"],
        ["Piggy ___ rules mattered more than hunting.","argued that"],
        ["Ralph ___ the group not to trust Jack's tribe.","warned that"],
        ["Piggy ___ being sensible was the only way to survive.","shouted that"],
        ["Jack ___ the island now belonged to his tribe.","claimed that"],
        ["Jack ___ his hunters seize the twins at once.","ordered that"]
      ]},
    think:{ quote:"Golding lets Roger lean on the lever for just a moment before letting go, a pause the novel never explains as either accident or choice.",
      question:"Why do you think Golding leaves it unclear whether Roger fully understands what he is about to do?",
      options:["Because the scene is poorly written","Because it forces the reader to sit with the same uncertainty the characters might feel about their own actions","Because Roger is meant to be innocent"],
      answer:1,
      note:"That single ambiguous pause is one of the most argued-over moments in the novel, and Golding never resolves it for us."},
    writing:[
      {task:"Write Ralph's thoughts as he runs from Castle Rock immediately after Piggy's death, without describing the death itself again.",target:"120-150 words",
       tips:["Focus on Ralph's fear and disbelief, not on graphic description","Use reporting verbs to show what he remembers Piggy saying","Keep sentences short to reflect panic"],
       starters:["Ralph's legs moved before his mind caught up...","He kept hearing Piggy's last words about...","Somewhere behind him, Jack was shouting that...","All he could think was that..."]},
      {task:"Explain what the destruction of the conch alongside Piggy's death seems to symbolise for the rest of the story.",target:"120-150 words",
       tips:["Recall what the conch has represented since Chapter 1","Connect its destruction directly to what happens to Piggy","Reach a clear, well-supported conclusion"],
       starters:["Since the first chapter, the conch has stood for...","Its destruction at this exact moment suggests that...","With both Piggy and the conch gone,...","This moment marks a turning point because..."]}
    ]},
  { n:12, title:"Cry of the Hunters", unit:12, span:"Chapter 12",
    sum:"Wounded and alone, Ralph hides from Jack's tribe, who hunt him with rolled rocks and finally set the island's forest on fire to smoke him out. He bursts onto the beach and collapses at the feet of a naval officer, whose ship has seen the smoke and come to investigate, expecting only a boys' game. Unable to explain what has really happened, Ralph weeps for Piggy, for the end of childhood innocence, and for the darkness he now knows exists in every person, and the other boys weep with him.",
    vocab:[
      ["WOUNDED","injured, especially by a weapon"],
      ["SKULL","the bony structure of the head"],
      ["SHARPENED","made pointed or sharp, especially at one end"],
      ["DESPERATE","willing to do almost anything because a situation feels hopeless"],
      ["ABLAZE","burning strongly"],
      ["COUGHING","forcing air out of the lungs suddenly and noisily, often because of smoke"],
      ["OFFICER","a person who holds a position of authority, especially in the armed forces"],
      ["ASSUMED","believed something to be true without checking it"],
      ["INNOCENCE","the state of being free from evil, guilt or experience of the world"],
      ["WEPT","cried"],
      ["EMBARRASSED","feeling awkward, ashamed or self-conscious"],
      ["ROLLING","moving by turning over and over"]
    ],
    comp:[
      ["Why is Ralph hiding at the start of the chapter?",["He is playing a game","He is wounded and being hunted by Jack's tribe","He is looking for food","He is waiting for Sam and Eric"],1,"He is now the tribe's prey rather than its chief."],
      ["What warning do Sam and Eric give Ralph?",["That the tribe will leave him alone","That the whole tribe plans to hunt him down the next day","That Jack has left the island","That the rescue ship has already arrived"],1,"They risk their own safety to give him this warning."],
      ["What weapon has Roger specially prepared?",["A bow and arrow","A stick sharpened at both ends","A net","A rope trap"],1,"Its purpose is left chillingly clear without being described in detail."],
      ["How do the hunters first try to flush Ralph out?",["By calling his name","By rolling heavy rocks through the undergrowth","By offering him food","By asking Sam and Eric to find him"],1,"Noise and danger, not conversation, are meant to drive him into the open."],
      ["What more dangerous method do they use next?",["Flooding the forest","Setting fire to a wide stretch of the island","Digging traps","Building a wall of rocks"],1,"Fire succeeds where the rocks alone could not."],
      ["How does Ralph finally reach safety?",["He hides until the hunters give up","He runs through the fire onto the open beach","He swims away from the island","Sam and Eric rescue him"],1,"The very fire meant to kill him also brings his rescue."],
      ["Who does Ralph find waiting for him on the beach?",["Jack, ready to surrender","A naval officer from a rescuing ship","Piggy, alive after all","Another group of boys"],1,"The smoke that nearly kills Ralph is also what finally brings help."],
      ["Why does Ralph weep at the end of the chapter?",["Because he is disappointed by the rescue","For the loss of innocence, the darkness in people, and for Piggy","Because the officer refuses to help","Because he is angry at Jack"],1,"Rescue arrives too late to undo what the island has already cost him."]
    ],
    tf:[
      ["Ralph is completely unharmed when this chapter begins.",false,"He is wounded from the spear thrown at Castle Rock."],
      ["Sam and Eric warn Ralph about the tribe's plan to hunt him.",true,"They tell him about the planned hunt and Roger's weapon."],
      ["The hunters succeed in finding Ralph using rolled rocks alone.",false,"He manages to stay out of reach until the fire is set."],
      ["The hunters set fire to the island to force Ralph into the open.",true,"Smoke and flame are meant to drive him out."],
      ["The naval officer immediately understands the full truth about the island.",false,"He assumes, at first, that the boys have simply been playing a game."],
      ["Ralph is the only one who weeps at the end of the chapter.",false,"The other boys begin to weep as well."]
    ],
    rw:[
      ["Ralph is wounded before this chapter begins.",0,"Right — Jack's spear grazed him at Castle Rock."],
      ["The narrator explains exactly how many hunters take part in the fire.",2,"Doesn't say — no precise number is given."],
      ["Roger prepares a spear sharpened at only one end.",1,"Wrong — his stick is sharpened at both ends."],
      ["The fire spreads quickly across a wide part of the island.",0,"Right — it becomes a serious blaze very fast."],
      ["Ralph reaches the beach by swimming around the island.",1,"Wrong — he runs through the forest and the flames."],
      ["The officer initially believes the boys have been playing a game.",0,"Right — that is his first, cheerful assumption."],
      ["The officer immediately scolds the boys for what has happened.",2,"Doesn't say — his exact reaction to the full story is not given."],
      ["Ralph weeps for Piggy at the end of the chapter.",0,"Right — Piggy is named directly among his reasons for weeping."]
    ],
    halves:[
      ["Ralph hides, wounded,","from the tribe that has now turned completely against him."],
      ["Sam and Eric warn Ralph","that the whole tribe plans to hunt him down the next day."],
      ["The hunters first try","rolling heavy rocks through the undergrowth to flush him out."],
      ["When that fails, the hunters","set fire to a wide stretch of the island instead."],
      ["Ralph runs through the smoke and flames","until he bursts out onto the open beach."],
      ["On the beach, Ralph finds","a naval officer whose ship has seen the smoke."],
      ["The officer assumes, at first,","that the boys have simply been playing a game."],
      ["Unable to explain what happened,","Ralph weeps for Piggy and for everything the island has cost them."]
    ],
    odd:[
      [["wounded","injured","hurt","healed"],3,"Healed is the opposite of wounded."],
      [["ablaze","burning","alight","extinguished"],3,"Extinguished means put out, the opposite of ablaze."],
      [["desperate","hopeless","frantic","composed"],3,"Composed means calm, the opposite of desperate."],
      [["innocence","purity","naivety","corruption"],3,"Corruption is the opposite of innocence."],
      [["embarrassed","awkward","uncomfortable","relaxed"],3,"Relaxed is the opposite of embarrassed."]
    ],
    wordform:[
      ["desperation","desperate"],["innocence","innocent"],["embarrassment","embarrassed"],["relief","relieved"],
      ["exhaustion","exhausted"],["confusion","confused"],["grief","grieving"],["darkness","dark"]
    ],
    opposites:[
      ["wounded","healed"],["ablaze","extinguished"],["desperate","composed"],["innocence","corruption"],
      ["embarrassed","relaxed"],["rescued","abandoned"],["wept","laughed"],["darkness","light"]
    ],
    gaps:{ title:"Linkers of contrast", bank:["Although","whereas","even though","however","despite","on the other hand"],
      items:[
        ["___ Ralph is exhausted, he keeps moving to avoid the hunters.","Although"],
        ["Ralph wants to survive, ___ the hunters want to kill him.","whereas"],
        ["___ he is badly frightened, Ralph manages to reach the beach.","even though"],
        ["The rocks fail to find him; ___, the fire very nearly does.","however"],
        ["___ the danger, Ralph refuses to simply give up.","despite"],
        ["The officer, ___, has no idea what has really happened on the island.","on the other hand"]
      ]},
    think:{ quote:"Golding ends with the naval officer looking down at painted, filthy children and imagining nothing worse than a game of pirates, while Ralph weeps for things the officer cannot begin to imagine.",
      question:"Why do you think Golding chooses to end the novel with an adult who so completely misunderstands what has happened?",
      options:["To make the ending more cheerful","To show how easily adults, too, can miss the darkness the boys have just lived through","Because the officer is meant to be a hero who fixes everything"],
      answer:1,
      note:"The officer's cheerful misunderstanding is Golding's final, quiet warning: the capacity for this kind of darkness does not stay behind on the island with the children."},
    writing:[
      {task:"Write the naval officer's report of what he found on the island, based only on what he can actually see and what the boys manage to tell him.",target:"120-150 words",
       tips:["Keep the officer's voice formal and slightly puzzled","Use linkers of contrast to show the gap between what he expects and what he finds","Avoid giving the officer knowledge he could not really have"],
       starters:["Upon landing, we discovered a group of boys who...","Although the boys appeared to have been playing some kind of game, it was clear that...","One boy, identified as Ralph, was unable to...","We have been unable to establish exactly..."]},
      {task:"Explain what you think Ralph means when he weeps for the innocence the boys have lost and what he has learned about human nature. Use evidence from across the novel, not just this chapter.",target:"120-150 words",
       tips:["Refer back to at least one earlier chapter as evidence","Explain the difference between the boys who landed and the boys being rescued","Reach a clear personal conclusion"],
       starters:["At the start of the novel, the boys behaved as though...","By the final chapter, however, they have learned that...","Piggy's death, in particular, shows that...","Ralph's tears suggest that he now understands..."]}
    ]}
];
const READINGS = {
1:[
"A passenger aircraft carrying a group of English schoolboys away from a war had been shot down over the Pacific, and it crashed into the thick jungle of a remote, uninhabited island, leaving a long scar of wreckage that ran from the beach to the trees. No grown-up had survived the crash, and for the first time in their lives the boys found themselves entirely alone, without a single adult to tell them what to do.",
"A fair-haired boy named Ralph climbed down towards a wide, sheltered lagoon and met a short, fat boy who wheezed as he walked and wore a pair of thick spectacles. The fat boy was asthmatic and had spent his whole life being teased for it; he begged Ralph, more than once, never to call him by the hated nickname his aunt had given him — Piggy — although, by the end of the day, almost everyone did exactly that.",
"Little by little more children appeared out of the trees, drawn by curiosity, until boys of every age had gathered on the sand: tall twelve-year-olds and tiny six-year-olds nobody could even name. It was already clear that the older boys, soon called the biguns, would have to look after the smallest ones, the littluns, who cried for their mothers and wandered off to look for fruit the moment nobody was watching them.",
"Down by the water Ralph and Piggy found a large, pink-lipped conch shell lying among the rocks, and Piggy worked out that if Ralph blew hard through the narrow end, the sound would carry across the whole island. Ralph pressed the shell to his lips and blew until his cheeks ached, and one by one the children who had been scattered across the beaches and the forest came out of the undergrowth and gathered around him.",
"Last of all came a choir, marching in two neat lines and dressed in black cloaks despite the heat, led by a tall, thin, red-haired boy called Jack Merridew. Jack demanded to know at once who was in charge, and when nobody could give him a clear answer, it was suggested that the boy holding the strange white shell should be the one to decide.",
"The boys raised their hands and Ralph was elected chief, chosen partly because he held the conch and partly because his size and his calm manner made the others trust him instinctively. Jack was clearly disappointed, since he had expected the choir to follow him alone, so Ralph offered him something to soften the blow: the choir could keep its identity as hunters, responsible for finding meat, while Ralph took charge of the business of rescue. He also announced that whoever held the conch at a meeting had the right to speak without being interrupted, since without any grown-ups they would need rules of their own if anything were to work properly.",
"Ralph chose Jack and a quiet, dark-haired boy named Simon to climb the mountain with him and find out exactly what kind of place they had landed on. From the top the three of them looked down at endless green forest, pale sand and a lagoon that gleamed turquoise in the midday sun, and understood, with a mixture of fear and excitement, that they were standing on an island with nobody else on it.",
"On the way back down through the forest the boys came across a piglet that had become trapped in a tangle of creepers, squealing in terror. Jack pulled out his knife and lifted his arm to strike, but for a long, silent moment he could not make himself bring the blade down, and the piglet tore itself free and vanished into the trees. Jack's face reddened with shame, and he swore, loudly, that next time he would not hesitate."
],
2:[
"Ralph called the boys together for a formal assembly, the second since the crash, and reminded everyone that whoever held the conch shell could speak without being interrupted. He explained that a signal fire had to be lit and kept burning on the mountain, since only a fire that a passing ship could see from a great distance stood any chance of bringing about a rescue. He also insisted that a list of every boy's name should be drawn up, since so far only a handful of them were known to each other, but the meeting moved on before anyone had written a single name down.",
"During the meeting a small boy with a strange mulberry-coloured birthmark on his face was pushed forward by the other littluns to speak. In a shaking voice he said that in the night he had seen a snake-thing, a beast — some kind of serpent, he insisted — moving among the trees, and although the older boys laughed at him, a few of the littluns began to cry.",
"Jack jumped up and declared that hunters were not afraid of any beast, and, eager to prove himself useful, he suggested that the whole group climb the mountain immediately and build the signal fire there and then. Ralph, caught up in the excitement, agreed, and almost the entire assembly ran off through the forest towards the mountain, forgetting, for the moment, every rule about order they had just agreed on. In their hurry, nobody stopped to check whether every littlun had been woken and brought along.",
"At the top, the boys gathered dry wood into an enormous pile, but nobody had matches, so Jack seized Piggy's spectacles from his face and used one lens to focus the sunlight onto a handful of dry leaves. It took several attempts, since the sunlight was faint and Piggy would not stop protesting the whole time, but at last a thin curl of smoke rose, a spark caught, and the leaves ignited; the boys cheered as the flames spread and grew into a genuine blaze.",
"The fire, however, quickly grew far larger than anyone had planned. It jumped from the dead wood at the top of the mountain down into the forest below, and a wide area of trees was soon scorched and smouldering, filled with panic as small creatures fled from the smoke and heat. Down near the beach, some of the littluns who had been sleeping close to that part of the forest were seen running and screaming, and it was impossible, in all the smoke, to be sure that everyone had escaped.",
"Piggy, out of breath from the climb and furious at having his glasses taken without asking, scolded the others harshly, accusing them of behaving like reckless little children instead of the sensible group they were meant to be. He pointed out that nobody had even counted how many boys there were, and that nobody knew each other's names.",
"It was only then, as the fire raged below them, that anyone thought again of the small boy with the birthmark. Nobody could say for certain where he had been standing when the group had rushed off, and however hard the older boys called and searched, the boy seemed to have vanished completely; he was never seen again, and the fire that was meant to save them all was already suspected of having taken his life. The signal fire, lit in such haste and so poorly controlled, had already cost the group something it could not replace, though most of the boys preferred, for now, not to think about it too closely."
],
3:[
"Several days after the fire, Jack went hunting alone in the jungle, determined to succeed where he had failed before. He crouched over broken twigs and disturbed leaves, trying to read every track a pig might have left, and he even pressed his face close to a pile of dung to judge how fresh it was, but by the end of the day he still returned to the beach with nothing. It was hard, patient work, and it demanded a kind of concentration that made him forget, for hours at a time, that he was only a schoolboy playing at being a hunter.",
"While Jack toiled after pigs, Ralph and a quiet, serious boy named Simon worked, exhausted, at building shelters on the sand, hoping to give the littluns somewhere safe and dry to sleep. Most of the other boys preferred to swim in the lagoon and play games in the sun, and after days of effort only two flimsy huts stood, and both of them were in danger of falling down at any moment. The first hut had partly collapsed twice already, and rebuilding it each time took hours that could otherwise have gone into hunting, resting or exploring further along the coast.",
"When Jack came back from the jungle, indifferent to the state of the shelters, an argument broke out between him and Ralph that neither of them could really win. Ralph argued that shelters and the signal fire mattered more than anything else, since without them there was no real hope of rescue, whereas Jack argued just as fiercely that meat and hunting mattered more, since a full stomach was worth more to him than any distant ship.",
"Ralph pointed out that almost everyone had trampled off to swim or play instead of helping to build, and that only he and Simon had done any of the intricate, exhausting work of tying branches and leaves together into something like a roof. Jack, however, seemed to feel that hunting a pig, with all its instinct and cunning, was its own kind of achievement, and could not understand why Ralph refused to see it that way.",
"Neither boy could really enter the other's mind: Ralph could not feel the thrill Jack felt when he was close, however briefly, to killing something, and Jack could not feel the weight of responsibility that pressed on Ralph every time he looked at the crooked, half-finished huts on the beach. The argument ended without either of them changing his mind, and each walked away certain that he alone understood what truly mattered.",
"Simon, meanwhile, slipped away by himself into the deepest part of the jungle, following a path only he seemed to know, until he reached a hidden, tangled place where thick creepers hung down and formed a kind of green, sheltered cabin above his head. It was a solitary spot, quiet and cool, that no one else on the island had discovered.",
"There, alone, Simon sat and watched the light change as the day slowly turned to twilight, the green leaves around him darkening until the whole hidden cabin seemed to glow faintly from within. For a while, at least, the arguments on the beach, the unbuilt shelters and the unfound pig seemed very far away, and Simon felt something close to peace."
],
4:[
"On the beach the littluns spent much of the morning building elaborate sandcastles in the wet sand, decorating them with shells and small flowers, while two older boys, Roger and Maurice, watched with a kind of lazy amusement. Without any real reason, Roger and Maurice ran straight through the sandcastles, kicking them flat and scattering the careful decorations everywhere, and the small builders, close to tears, could do nothing but watch as their work was mocked and destroyed.",
"Roger then picked up a handful of stones and began throwing them, one after another, in the direction of a littlun named Henry, who was playing at the edge of the water. Roger aimed carefully to miss, keeping a space of several metres around the boy at every throw, since some invisible barrier — the last taboo of home, backed by the memory of policemen and parents — still stopped him from actually hitting anyone.",
"Meanwhile, deep in the forest, Jack knelt beside a clear pool and stared at his own reflection before covering his face with red and white clay and streaks of charcoal until his own mother would not have recognised him. Behind that painted mask he felt suddenly and completely liberated, as though the disguise had released him from every rule he had ever followed, and he let out a strange, wild laugh that startled even his own hunters.",
"Out on the flat, empty horizon a ship appeared for the first time since the crash, a thin grey shape moving slowly across the distant water, but when Ralph and Piggy looked up towards the mountain in desperate hope, they saw no smoke at all: the signal fire, the one thing that might have saved them all, had gone out, because every single one of the boys who should have been tending it had gone off hunting instead.",
"The hunters came back down from the jungle at that very moment, carrying between them the first pig they had ever managed to kill, chanting an excited rhythm about the spilling of its blood as they marched triumphantly along the beach. Ralph, watching the empty horizon where the ship had already begun to disappear, was furious in a way none of them had seen before, and he told Jack, in front of everyone, exactly what his hunting had cost them.",
"Jack, still painted and full of the pride of his first kill, could barely take in what Ralph was saying, and when Piggy tried to add his own furious complaint about the missed ship, Jack turned and hit him hard across the head. Piggy's glasses flew from his face and one lens shattered on the rocks, glinting in pieces at his feet, and for a moment even the boys who idolised Jack fell completely silent.",
"That evening the hunters roasted their pig over a new fire, and even the hungriest and angriest boys found the smell of real meat impossible to resist, so that arguments were, for a while, half forgotten in favour of eating. Even so, Ralph called an assembly for later that night, determined that this time the whole group would agree, once and for all, on what mattered more: the fire that could be seen from the sea, or the meat that could only be tasted on the island."
],
5:[
"That evening Ralph called the promised assembly and stood before the group with the conch in his hands, feeling strangely nervous about everything he had to say. He listed, one by one, everything that had gone wrong since the crash: there was still no proper supply of fresh water carried up from the stream, the shelters were unfinished and half-abandoned, the fire on the mountain had been allowed to go out more than once, and even the rocks chosen as a toilet area were being ignored, so that parts of the beach had grown filthy. Some of the littluns, he added, had even stopped bothering to walk to the agreed spot at all, which was no small problem in weather as hot as theirs.",
"Ralph's tone grew almost desperate as he explained that none of this was really about rules for their own sake; it was about giving themselves the best possible chance of being rescued, and about staying, as he put it, sensible and orderly rather than sliding into something chaotic. Piggy, standing beside him with the conch, looked anxious and nodded at every point.",
"Then the meeting turned, almost without anyone deciding it should, from practical problems to something far harder to discuss: fear itself. Many of the littluns admitted, in whispered, frightened voices, that they had nightmares about a beast moving through the forest at night, and some of the older boys, though they would never have said so out loud a few weeks earlier, privately admitted the same fear to themselves.",
"Jack stood up, confident and scornful, and rejected the whole idea outright, insisting that there was no beast on the island and that hunters, of all people, would certainly have seen some trace of it if it existed. A small boy named Percival, half asleep and barely able to speak clearly, then whispered something that chilled the assembly far more than any argument could: he said that the beast came out of the sea. The certainty in Jack's voice convinced some of the older boys for a moment, though it did nothing to comfort the youngest ones.",
"Simon, usually silent at meetings, forced himself to stand and try to explain a different, stranger idea: that the beast the littluns feared so much might not be an animal hiding in the jungle or the water at all, but something that lived inside every one of them. His halting words were met with laughter and ridicule, and, embarrassed and defeated, he sat back down without finishing his thought.",
"Furious at how the meeting had turned into chaos, Jack seized the conch, declared that Ralph's rules meant nothing without hunters and warriors to enforce them, and led a sudden, defiant charge away down the beach, chanting and dancing wildly with most of the older boys following behind him. Order, such as it had been, collapsed within moments.",
"Ralph, Piggy and Simon were left sitting together in the near-darkness, listening to the fading noise of the dance and feeling, more than ever, how completely alone they were. Ralph found himself wishing, almost desperately, for some clear sign from the world of grown-ups — a message, a rescue, anything — that would tell them what to do, but no such sign came, and the three of them sat in silence as the island grew dark around them."
],
6:[
"High above the island, during the night, a battle was fought in the dark sky between aircraft that none of the boys could see clearly from the ground, only hear as a distant, frightening rumble. When it was over, the body of a dead airman drifted down beneath a parachute and landed on rocks near the top of the mountain, and there it remained, tangled among the lines of his own parachute.",
"A steady wind blew across the peak all through the night, and every time it gusted the parachute filled and pulled at the dead man's body, making it seem, from a distance, to sit up, lean forward and slump back again, over and over, as though it were still faintly alive.",
"The twins, Sam and Eric, had been left to tend the signal fire that night, and when the wind lifted the shape on the mountain, they caught sight of it in the moonlight and were terrified. They scrambled down through the dark forest as fast as their legs would carry them, and insisted, breathless and shaking, that they had seen the beast itself, its face a mass of tangled, moving fibres.",
"At dawn, white and frightened, the twins repeated their story to the whole group gathered on the beach, and this time nobody laughed. Even the older boys who usually mocked any talk of a beast found themselves glancing nervously towards the dark shape of the mountain, and for a while nobody wanted to be the one to suggest going anywhere near it.",
"Their story convinced almost everyone, since neither twin would normally lie about something so frightening, and Ralph decided that a proper search had to be organised without delay. For once Ralph himself led the way, since he felt that if he let anyone else take charge of something this dangerous, his own position as chief would mean very little.",
"Jack followed close behind Ralph, more careful and quiet than he usually was, and together with a small group they climbed cautiously towards the mountain, stopping and listening at every strange sound. Along the way they came to Castle Rock, a narrow, rocky fortress jutting out at the very tip of the island, connected to the rest of the land by only a thin ridge of stone with a terrifying drop on either side.",
"Jack was immediately drawn to the place, certain that its natural walls would make a wonderful fort, easy to defend against almost anything, and he wanted to stay there and explore it properly rather than push on towards the mountain and the beast. Ralph, however, insisted that finding the beast and keeping the fire burning mattered far more than admiring a fortress, and, after a short, tense argument, the group reluctantly followed him back towards the mountain instead.",
"By the time they returned to the beach without any real answer, dusk was falling again, and the parachute still stirred on the mountaintop, unseen and unexplained, waiting for someone braver, or more curious, to climb high enough to learn the truth."
],
7:[
"As the search party pressed on towards the mountain, Ralph paused at a high point and looked out over the endless, empty ocean, and for a moment despair settled over him: the sea stretched in every direction with no ship, no land, nothing but water meeting sky. It was the first time since the crash that he had allowed himself, even briefly, to imagine that they might never be found at all. Simon, walking close beside him, said quietly that he was sure Ralph would get back home safely, though he could not really explain why he felt so certain of it.",
"Further along the track a wild boar burst suddenly out of the undergrowth, squealing and charging straight towards the group. In the confusion Ralph found himself thrusting his sharpened stick at the animal almost without thinking, and the point drove into its side before the boar swerved away and crashed off into the forest, leaving Ralph breathless, shaking, and unexpectedly proud of what he had done.",
"Buoyed by the excitement of the real chase, the boys decided to act it out again as a game, with a boy named Robert taking the part of the pig while the others closed in around him with their sticks, chanting and jabbing at him in fun. What began as a joke, however, grew rougher and more frenzied with every round, until Robert was genuinely hurt and crying out, and the game had come uncomfortably close to becoming something else entirely. Afterwards, several of the boys avoided each other's eyes, uneasy about how easily the game had slipped out of their control.",
"Realising how late it was getting and worried about the littluns waiting on the beach, Simon quietly volunteered to go back alone through the darkening forest to tell Piggy that the search party would return later than planned. He set off without complaint, glad, in his own way, to be moving through the trees by himself again rather than staying with the noisy, restless group.",
"As dusk thickened into near-darkness, Ralph, Jack and Roger climbed on alone towards the top of the mountain, each of them more frightened than he wanted to admit, moving slowly and reluctantly closer to whatever it was the twins had seen the night before. The wind had dropped, and the whole mountain felt unnaturally still and silent around them.",
"At last they came close enough to make out a shape crouched among the rocks in the gloom, and as they stared at it, a sudden gust of wind caught the shape and made it lift what looked exactly like a head, turning it slowly towards them. All three boys turned and ran, crashing wildly back down through the darkness, too terrified even to look behind them, utterly convinced that they had finally come face to face with the beast itself."
],
8:[
"Jack called his own assembly on the beach and stood before the group with a new kind of confidence, accusing Ralph directly of being a coward who had refused to hunt the beast when it mattered. He demanded that the others vote, there and then, on whether Ralph should remain chief, certain that this time the group would finally choose him instead.",
"Nobody, however, raised a hand against Ralph, and in the silence that followed Jack felt suddenly and completely humiliated in front of everyone. Fighting back tears, he shouted that he was leaving to start his own tribe, one with real hunters and real fun, and that anyone who wanted meat rather than empty rules should follow him; then he turned and walked away down the beach, weeping despite his effort to hide it.",
"After Jack had gone, Piggy suggested, sensibly, that they build a new signal fire down by the shelters instead of on the distant mountain, since a fire on the beach would be far easier for the remaining boys to manage and keep alight. Simon, quiet as always during the argument, slipped away once the meeting ended and made his way back towards his own hidden, leafy place deep in the jungle.",
"Jack's hunters, meanwhile, tracked down a large nursing sow and, working together with spears, killed it in the undergrowth, a task made easier because the animal was slowed by the piglets following close behind her. Afterwards, as a kind of offering to the beast they still believed lived somewhere on the island, they cut off the sow's head and fixed it firmly onto a sharpened stick driven into the ground, leaving it there, facing the forest, as a gift for the darkness.",
"Before returning to their new camp, the hunters also raided the beach, grabbing burning branches from the shelters' fire to carry back with them for their own use, and in the confusion and shouting Ralph was struck during the scuffle, though nothing serious came of it. Most of the boys who still called themselves Ralph's group watched, uneasy and unsure, as more and more of them quietly decided to join Jack instead.",
"Simon, alone in the clearing, found himself facing the sow's head on its stick, now swarmed by flies that rose and settled again in a low, constant hum, and in the heavy, feverish heat he grew dizzy and could not look away. In his exhausted, half-dreaming state, it seemed to him as though the head were speaking, telling him that the beast was not a creature that could be hunted or killed, because it lived inside every boy on the island, including himself, and that things were going to be a lot of fun on the island — for it, at least.",
"The dizziness and the heat and the flies and the fear all mixed together until Simon's legs gave way beneath him, and he fell to the ground in front of the grinning, fly-covered head, unconscious, alone in the darkening jungle."
],
9:[
"Simon woke slowly from his fainting spell, weak and unsteady, and although the worst of the dizziness had passed, he understood that he still had something important left to do that day. He made his way, with great effort, up towards the top of the mountain, driven by a need to see for himself exactly what the frightening shape among the rocks really was.",
"At the summit he finally saw the truth clearly: the shape was the body of a dead airman, tangled in the lines of his parachute, moved only by the wind rather than by any life of its own. Gently, and with a kind of quiet respect, Simon worked the twisted lines free from the rocks so that the body could lift, catch the air and drift away over the sea, no longer able to frighten anyone on the beach below.",
"Sick, exhausted and eager to tell the others the truth about the beast, Simon set off down through the forest as fast as his weakened legs would carry him. Meanwhile, on the beach, Ralph and Piggy had decided, almost against their own better judgement, to walk over to Jack's new camp and join the feast, mostly because the smell of roasting meat was more than their hunger could resist.",
"At the feast, Jack sat above the others like a painted king on a kind of throne, offering generous pieces of meat to anyone willing to join his tribe and abandon Ralph's rules completely. Overhead, dark clouds had been gathering all afternoon, and the first low rumble of thunder rolled across the island just as Jack stood and asked, loudly, who among them would come and hunt with him.",
"As the storm grew closer, the boys began their familiar hunting dance, forming a wide, moving circle, chanting and beating sticks together in a rising, wild rhythm that grew louder with every roll of thunder. Ralph and Piggy, caught up almost without meaning to be, found themselves pulled into the edge of the excited circle as the rain began to fall in heavy, sudden sheets.",
"It was at that exact moment that Simon came stumbling out of the dark forest, desperate to shout his news over the noise of the storm, but in the driving rain, the flashing lightning and the frenzy of the dance, the circle mistook him for the beast itself, since nobody could recognise him in the shape crawling out of the darkness. Screaming with fear and excitement together, the boys closed in on him with their sticks and their bare hands, and by the time anyone realised what they had actually done, Simon lay still on the sand, and nothing could be done to help him.",
"The storm broke fully soon afterwards, and a strong wind out at sea finally caught the dead airman's parachute and dragged his body far out across the water, away from the island for good. Down on the beach, the rising tide reached the place where Simon lay, and gently, silently, carried him out into the dark water, his stillness surrounded, oddly, by tiny points of glowing light in the waves, as the stars came out above the storm-washed island."
],
10:[
"Back at the shelters, Ralph and Piggy could barely look at each other, both of them ashamed and sick with a guilt neither wanted to name directly. They told each other, again and again, that it had been dark, that the storm had confused everyone, that they themselves had stayed outside the circle the whole time, and that whatever had happened to Simon had been a terrible accident rather than anything they had actually done. Piggy, in particular, repeated the story so many times that he almost seemed to be practising it, as if enough repetition might turn it into the plain truth.",
"When Sam and Eric arrived at the shelters, having slipped quietly away from Jack's camp, they repeated almost exactly the same excuse: it was dark, it was frightening, nobody could really have known who was who inside that circle. None of the four boys used Simon's name directly if they could help it, as though avoiding the word might somehow make the memory smaller.",
"At Castle Rock, meanwhile, Jack ruled over his tribe with growing authority, and when a boy named Wilfred was accused of some small, unclear offence, Jack had him tied up and beaten in front of the others without ever properly explaining why. Nobody questioned him, and Wilfred's crying afterwards seemed to bother no one at all, least of all Jack. It was the kind of casual cruelty that would once have shocked every boy on the island, and now barely earned a second glance.",
"Jack told his tribe a new, convenient version of events: the beast, he said, had come to them in disguise that night on the beach, and it might return again at any time, so they had to stay alert and ready to defend themselves. Fear of the beast, real or invented, was proving a useful tool for keeping his hunters loyal and obedient.",
"Back at the shelters, only a handful of boys now remained loyal to Ralph, and even they seemed uncertain, watching the mountain and the darkness beyond the fire with growing unease, half suspecting that Jack's raid, when it came, would not be gentle.",
"That night, once the shelters had gone quiet and most of the boys were asleep, Jack led Roger and Maurice in a raid on Ralph's camp, moving carefully through the darkness towards the sleeping figures. In the confusion of the attack, Piggy's glasses were snatched from his face while he struggled, defenceless without them, to understand what was even happening around him.",
"The raiders left as quickly as they had come, taking the precious glasses but leaving the conch shell untouched on the sand, since it was fire, not authority, that they had really come for: without Piggy's spectacles the shelters' fire could no longer be lit at all. Piggy sat blinking in the darkness afterwards, only able to see indistinct, flickering shapes, and Ralph understood, with a sinking heart, exactly what the theft would cost them."
],
11:[
"After the raid, Ralph's group had shrunk to almost nothing: three boys and himself, hungry, sunburnt, and increasingly aware that the balance of power on the island had shifted completely away from them. Still, Ralph refused to simply accept the theft of the glasses, since without fire there was truly no hope left of ever being rescued.",
"Determined to get Piggy's glasses back, Ralph gathered the few boys who still stood with him — Piggy, Sam and Eric — and set out along the coast towards Castle Rock to make his demand in person. Piggy, almost blind without his spectacles, insisted on carrying the conch shell himself, certain that it still meant something, even now.",
"At Castle Rock, Jack's tribe blocked the narrow rocky path with spears and threats, and when Ralph finally reached the top and blew the conch to call for order, Roger, standing above them near a huge loose boulder balanced on a kind of natural lever, watched the scene below with a cold, unreadable interest.",
"Ralph accused Jack directly of stealing and of being no better than a thief and a bully, and the argument between them quickly turned physical, the two boys jabbing at each other with the blunt ends of their spears in a short, furious struggle that left them both bruised but otherwise unhurt. Meanwhile, several of Jack's hunters seized Sam and Eric, tied them up and dragged them, protesting loudly, deeper into the tribe's camp.",
"Piggy, clutching the conch and squinting into the crowd, shouted as loudly as his weak lungs would allow that rules and rescue mattered far more than hunting and killing, and that being sensible was the only thing that could still save any of them. His words, for once, seemed to reach almost nobody at all.",
"High above, Roger leaned his whole weight against the lever holding the great boulder in place, and after a moment's hesitation he let it go completely. The huge rock plunged down the cliff face and struck Piggy directly, killing him instantly and shattering the conch shell in his hands into countless small, pale fragments that scattered across the rocks below.",
"In the silence that followed, Jack screamed in triumph and hurled his spear at Ralph, grazing his side, and Ralph, seeing that reason and rules meant nothing here any longer, turned and ran for his life along the narrow path and back towards the safety of the trees. Behind him, Roger climbed down slowly towards Sam and Eric with a strange, quiet authority that needed no explanation and no name, an authority that came from the boulder still settling among the rocks and from what everyone had just watched it do.",
"By nightfall, Sam and Eric, bruised and frightened, had been forced, one way or another, to become members of Jack's tribe, and the small, exhausted group that had once gathered around Ralph and the conch no longer existed at all."
],
12:[
"Alone now and wounded from Jack's spear, Ralph hid among the thick undergrowth, moving carefully from one hiding place to another, terrified of the tribe that had once been his own group of survivors. At one point he came across the pig's skull on its sharpened stick, its grinning white face still watching the clearing, and in a sudden burst of anger and fear he struck it hard, knocking it from its stick and into the leaves.",
"Later, creeping close to the tribe's camp under cover of darkness, Ralph managed to speak briefly to Sam and Eric, who were now, however unwillingly, members of Jack's tribe themselves. Frightened for him, the twins warned Ralph that the whole tribe intended to hunt him down like an animal the very next day, and that Roger, in particular, had prepared a terrible weapon: a stick sharpened at both ends.",
"At dawn the hunters began their search in earnest, spreading out across the island and rolling heavy rocks down through the undergrowth ahead of them to flush Ralph out of any hiding place he might have found. Ralph ran and crawled and hid by turns, exhausted, hungry and increasingly desperate, always managing to stay just out of their reach.",
"When rolling rocks failed to find him, the hunters had a far more effective, and far more dangerous, idea: they set fire to the dry undergrowth across a wide stretch of the island, hoping that smoke and flame together would drive Ralph out into the open where they could finally catch him. Soon a whole section of the forest was ablaze, the fire spreading with terrifying speed exactly as the earlier, accidental fire once had.",
"Ralph ran for his life through the smoke and the heat, coughing, half blind, and utterly certain that this time he really would be killed, until at last the trees gave way and he burst out, stumbling and falling, onto the open sand of the beach. Behind him the whole island seemed to be burning.",
"Lying there, expecting at any moment to feel a spear, Ralph instead found himself looking up at a pair of white naval shoes and, above them, the surprised face of a naval officer, whose ship had spotted the enormous column of smoke rising from the island and had come to investigate. The officer, seeing a group of painted, half-naked boys emerging from the trees behind Ralph, assumed cheerfully that they had simply been playing some sort of elaborate game.",
"Ralph tried, and failed, to find any words that could explain what had actually happened on the island, and instead of speaking he began to weep, and once he had started he could not stop: he wept for the end of the innocence they had all lost, for the darkness he now understood lived somewhere in every human heart, and, most of all, for Piggy, his true friend. Around him, one by one, the other boys began to weep as well, and the officer, embarrassed and unsure what to do, looked away towards his ship and waited for the crying to end."
]
};
const EVENTS = {
1:{ev:["A plane crash leaves a group of schoolboys alone on a tropical island.","Ralph meets Piggy, who begs not to be called by that nickname.","The boys find a conch shell and use it to call the others together.","Jack's choir arrives, marching in their black cloaks.","Ralph is elected chief and lets Jack lead the hunters instead.","Jack raises his knife over a trapped piglet but cannot kill it."],keys:["crash","piggy","conch","choir","elected","knife"]},
2:{ev:["Ralph holds an assembly and explains the need for a signal fire.","A small boy with a birthmark says he saw a beast in the night.","Jack persuades everyone to rush up the mountain and build the fire at once.","The boys use Piggy's glasses to focus sunlight and light the fire.","The fire spreads out of control into the forest below.","The boy with the birthmark cannot be found after the fire."],keys:["assembly","birthmark","mountain","glasses","spreads","found"]},
3:{ev:["Jack hunts alone in the jungle and learns to read pig tracks.","Jack fails again and returns to the beach with nothing.","Ralph and Simon struggle to build shelters almost alone.","Only two weak huts stand while most boys swim and play.","Ralph and Jack argue over shelters and rescue against hunting.","Simon slips away to a hidden green place in the jungle."],keys:["hunts","tracks","shelters","huts","argue","hidden"]},
4:{ev:["Roger and Maurice destroy the littluns' sandcastles.","Roger throws stones near Henry but does not hit him.","Jack paints his face with clay and charcoal and feels liberated.","A ship passes while the signal fire has gone out.","The hunters return chanting, proud of killing their first pig.","Jack hits Piggy and breaks one lens of his glasses."],keys:["sandcastles","stones","paints","ship","pig","glasses"]},
5:{ev:["Ralph lists the group's problems: water, shelters, the fire and hygiene.","Littluns admit having nightmares about a beast.","Jack rejects the idea that any beast exists.","Percival whispers that the beast comes from the sea.","Simon suggests the beast might be inside all of them and is laughed at.","Jack leads a defiant dance away from the assembly."],keys:["problems","nightmares","rejects","percival","laughed","defiant"]},
6:{ev:["A dead airman drifts down by parachute onto the mountain.","Wind makes the body rise and fall as if it were alive.","Sam and Eric see the shape and run, believing it is the beast.","The whole group grows frightened when the twins tell their story.","Ralph leads a search party towards the mountain the next day.","Jack is drawn to Castle Rock but Ralph insists they continue."],keys:["airman","parachute","twins","frightened","search","castle"]},
7:{ev:["Ralph despairs at the empty ocean and Simon reassures him.","A wild boar charges and Ralph wounds it with his spear.","The boys play a hunting game that turns rough and hurts Robert.","Simon volunteers to walk back alone to warn Piggy.","Ralph, Jack and Roger climb the mountain at dusk.","The shape in the rocks seems to lift its head and they flee."],keys:["ocean","boar","robert","volunteers","mountain","flee"]},
8:{ev:["Jack accuses Ralph of cowardice and asks for a vote.","Nobody votes against Ralph, and a humiliated Jack leaves weeping.","Piggy suggests building a new fire down by the shelters.","Jack's hunters kill a nursing sow and leave its head as a gift.","The hunters raid the beach fire before returning to their camp.","Alone with the head, Simon has a feverish vision and faints."],keys:["cowardice","vote","fire","sow","raid","vision"]},
9:{ev:["Simon climbs the mountain and finds the dead airman.","Simon frees the parachute so the body drifts out to sea.","Ralph and Piggy join Jack's feast as a storm approaches.","The boys begin a wild chanting dance in a circle.","Simon runs from the forest and is mistaken for the beast.","The circle kills Simon, and the tide carries his body away."],keys:["airman","parachute","feast","circle","mistaken","tide"]},
10:{ev:["Ralph and Piggy agree to blame the storm and darkness for Simon's death.","Sam and Eric arrive and repeat almost the same excuse.","At Castle Rock, Jack has Wilfred beaten for no clear reason.","Jack tells his tribe the beast came to them in disguise.","Jack, Roger and Maurice raid the shelters at night.","The raiders steal Piggy's glasses but leave the conch untouched."],keys:["storm","excuse","wilfred","disguise","raid","glasses"]},
11:{ev:["Ralph's group travels to Castle Rock to demand the glasses back.","Ralph and Jack fight while Sam and Eric are seized.","Piggy argues that rules matter more than hunting.","Roger releases a boulder that kills Piggy and shatters the conch.","Jack throws his spear at Ralph, who runs for the trees.","Roger advances on the twins with a new, silent authority."],keys:["castle","seized","piggy","boulder","spear","authority"]},
12:{ev:["Wounded, Ralph hides from Jack's tribe after Piggy's death.","Sam and Eric warn Ralph that the tribe will hunt him at dawn.","The hunters roll rocks through the undergrowth to find him.","The hunters set the forest on fire to smoke him out.","Ralph runs through the flames and reaches the open beach.","A naval officer finds Ralph, who weeps for Piggy and lost innocence."],keys:["wounded","warn","rocks","fire","beach","officer"]}
};
return {level:'B2', lead:'William Golding · reading companion · <b>B2 upper-intermediate</b>', CHAPTERS:CHAPTERS, READINGS:READINGS, EVENTS:EVENTS};
})();
