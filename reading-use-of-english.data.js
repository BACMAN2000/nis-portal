/* Reading and Use of English · Part 4 (Key word transformations).
   Cada ítem: [frase original, PALABRA CLAVE, texto antes del hueco, texto
   después del hueco, respuestas aceptadas separadas por «|»].
   La corrección expande contracciones en los dos lados (hasn't = has not),
   así que basta con escribir una forma de cada respuesta. */
window.RUOE_PARTS = [
  {n:1, name:'Multiple-choice cloze', desc:'8 gaps · choose A, B, C or D', ready:false},
  {n:2, name:'Open cloze', desc:'8 gaps · write one word', ready:false},
  {n:3, name:'Word formation', desc:'8 gaps · change the word in capitals', ready:false},
  {n:4, name:'Key word transformations', desc:'2–5 words including the key word', ready:true},
  {n:5, name:'Multiple choice', desc:'A long text · 6 questions', ready:false},
  {n:6, name:'Gapped text', desc:'Put the missing sentences back', ready:false},
  {n:7, name:'Multiple matching', desc:'Match the questions to the texts', ready:false}
];

window.RUOE_P4 = [
{
  id:'passive', emoji:'🔄', title:'Passive Voice and Causative Structures',
  focus:'The passive voice shifts the focus from the “doer” of the action to the action itself or the receiver. It is formed with <b>be + past participle</b>. Impersonal passives (<i>It is said that…</i> / <i>He is said to…</i>) are common for reporting general beliefs. The causative (<b>have/get something done</b>) is used when you arrange for a professional or someone else to do a task for you.',
  patterns:[
    ['Passive in any tense','The bridge <b>is being repaired</b> / <b>has been repaired</b> / <b>will have been repaired</b>.'],
    ['Impersonal passive','People say he is rich → He <b>is said to be</b> rich. · They believe he left → He <b>is believed to have left</b>.'],
    ['Causative','A mechanic is fixing my car → I <b>am having my car fixed</b>.'],
    ['Bad experiences','Someone stole my bike → I <b>had my bike stolen</b>.'],
    ['Modal passive','You must finish it → It <b>must be finished</b>. · It <b>should have been done</b>.']
  ],
  b2:[
    ['Someone stole my bike last night.','HAD','I','last night.','had my bike stolen'],
    ['They are repairing his car today.','HAVING','He','today.','is having his car repaired'],
    ['People say that the band is breaking up.','SAID','The band','breaking up.','is said to be'],
    ['They believe the thief escaped in a stolen car.','BELIEVED','The thief','in a stolen car.','is believed to have escaped'],
    ['The teacher told us to open our books.','WERE','We','our books by the teacher.','were told to open|were asked to open'],
    ['Nobody has cleaned this room for weeks.','BEEN','This room','for weeks.','has not been cleaned'],
    ['A professional is going to paint my portrait.','GETTING','I','by a professional.','am getting my portrait painted'],
    ['You must finish the report by Friday.','BE','The report','Friday.','must be finished by|must be completed by|must be done by'],
    ["They didn't give me the information.",'GIVEN','I','the information.','was not given'],
    ['Someone is building a new hospital here.','BUILT','A new hospital','here.','is being built'],
    ['They are going to demolish that old factory.','PULLED','That old factory','down.','is going to be pulled'],
    ['People expect that the president will resign.','EXPECTED','The president','resign.','is expected to'],
    ['A famous designer made her wedding dress.','MADE','She','by a famous designer.','had her wedding dress made|got her wedding dress made'],
    ['No one had told me about the meeting.','INFORMED','I','the meeting.','had not been informed about|had not been informed of'],
    ['Someone cleans the office every evening.','CLEANED','The office','every evening.','is cleaned|gets cleaned'],
    ['They will have completed the project by June.','BEEN','The project','by June.','will have been completed|will have been finished'],
    ['I need someone to check my eyesight.','TESTED','I need to','.','have my eyesight tested|get my eyesight tested|have my eyes tested|get my eyes tested'],
    ['People thought the painting was a fake.','THOUGHT','The painting','a fake.','was thought to be'],
    ['We are employing a gardener to cut the grass.','CUT','We are','by a gardener.','having the grass cut|getting the grass cut'],
    ["They haven't delivered the furniture yet.",'DELIVERED','The furniture','yet.','has not been delivered']
  ],
  c1:[
    ['It is thought that the fire was started deliberately.','HAVE','The fire is thought','deliberately.','to have been started|to have been lit'],
    ['The authorities are said to be investigating the incident.','BEING','The incident is said','by the authorities.','to be being investigated'],
    ['Nobody told the residents anything about the road closure.','KEPT','The residents','about the road closure.','were kept in the dark'],
    ['Someone must have stolen the documents while we were out.','BEEN','The documents','while we were out.','must have been stolen|must have been taken'],
    ['The council should have repaired the bridge years ago.','REPAIRED','The bridge','years ago.','should have been repaired|ought to have been repaired'],
    ["Experts don't expect the economy to recover before next year.",'EXPECTED','The economy','before next year.','is not expected to recover'],
    ['She resents it when people interrupt her in meetings.','BEING','She','in meetings.','resents being interrupted'],
    ['It is claimed that the minister knew nothing about the deal.','CLAIMED','The minister','nothing about the deal.','is claimed to have known']
  ]
},
{
  id:'conditionals', emoji:'🔀', title:'Conditionals and Wishes',
  focus:'Conditionals describe possible, hypothetical or impossible situations and their consequences. Key transformations often replace <b>if</b> with <b>unless</b>, <b>provided that</b> or <b>as long as</b>. <b>Wish</b> and <b>if only</b> express regrets about the past (+ Past Perfect), dissatisfaction with the present (+ Past Simple) or annoyance (+ would). <b>It’s time</b> and <b>I’d rather</b> are followed by the Past Simple to refer to the present or future.',
  patterns:[
    ['Alternatives to if','<b>unless</b> (= if … not) · <b>as long as</b> / <b>provided (that)</b> (= only if)'],
    ['Mixed conditional','If I <b>had slept</b> more last night, I <b>wouldn’t be</b> tired now.'],
    ['Wish / If only','I <b>wish I had studied</b> (past regret) · <b>If only I could</b> speak French (present) · I <b>wish you would stop</b> (annoyance)'],
    ['It’s time / I’d rather','<b>It’s time we went</b> home. · <b>I’d rather you didn’t</b> smoke.'],
    ['C1 · inverted conditionals','<b>Had I known</b>… · <b>Should you need</b> help… · <b>But for</b> your help…']
  ],
  b2:[
    ['I regret not studying harder.','WISH','I','harder.','wish I had studied'],
    ["I'll help you if you pay me.",'LONG',"I'll help you",'me.','as long as you pay|so long as you pay'],
    ["He won't go to the party if they don't invite him.",'UNLESS',"He won't go to the party",'him.','unless they invite'],
    ["It's a pity I can't speak French.",'ONLY','If','French.','only I could speak'],
    ["I would like it if you didn't smoke in here.",'RATHER',"I'd",'in here.','rather you did not smoke'],
    ['She is tired because she went to bed late.',"WOULDN'T","If she hadn't gone to bed late, she",'tired.','would not be|would not be so|would not feel'],
    ["He won't pass because he doesn't study.",'WOULD','If he studied,','the exam.','he would pass'],
    ["We didn't bring a map, so we got lost.",'BROUGHT','If we',", we wouldn't have got lost.",'had brought a map'],
    ['You can borrow my car, but you must drive carefully.','PROVIDED','You can borrow my car','carefully.','provided you drive|provided that you drive'],
    ['It is late, so we should go home now.','WENT','It is time','home.','we went'],
    ['I advise you to speak to the manager.','WERE','If',', I would speak to the manager.','I were you'],
    ["She didn't take an umbrella and got wet.",'TAKEN','If',"an umbrella, she wouldn't have got wet.",'she had taken'],
    ["I'm sorry I offended you.",'WISH','I','you.','wish I had not offended'],
    ["We can play tennis if it doesn't rain.",'UNLESS','We can play tennis','.','unless it rains'],
    ["I'd prefer you to wear a suit to the wedding.",'RATHER','I','a suit to the wedding.','would rather you wore'],
    ["He didn't know the answer, so he failed.",'KNOWN','If he',", he wouldn't have failed.",'had known the answer'],
    ['Stop making so much noise!','WOULD','I','making so much noise!','wish you would stop'],
    ['You ought to start looking for a job.','STARTED',"It's time",'for a job.','you started looking'],
    ['We will go to the beach only if it is sunny.','LONG','We will go to the beach','sunny.','as long as it is|so long as it is'],
    ['I regret buying such an expensive car.','ONLY','If','such an expensive car.','only I had not bought']
  ],
  c1:[
    ['If you happen to need any help, just call me.','SHOULD','','any help, just call me.','should you need|should you happen to need'],
    ["I didn't know about the problem, so I didn't help.",'HAD','','about the problem, I would have helped.','had I known'],
    ['Without your support, I would never have finished the project.','BEEN','If it','support, I would never have finished the project.','had not been for your'],
    ['We only won because our goalkeeper was brilliant.','BUT','','brilliant goalkeeper, we would have lost.','but for our'],
    ["I'd prefer you not to mention this to anyone.",'SOONER','I would','this to anyone.','sooner you did not mention'],
    ['Imagine you won the lottery – what would you do?','SUPPOSING','','the lottery, what would you do?','supposing you won|supposing you were to win'],
    ['You should have told me the truth from the start.','WISH','I','me the truth from the start.','wish you had told'],
    ['The government really should do something about pollution now.','ACTION',"It's high time the government",'pollution.','took action on|took action against|took action about|took some action on|took some action against']
  ]
},
{
  id:'reported', emoji:'💬', title:'Reported Speech',
  focus:'Reported speech communicates what someone else said. This requires “backshifting” tenses (Present Simple → Past Simple) and changing pronouns and time expressions. B2 First tests <b>reporting verbs</b> heavily (<i>accuse someone of doing, deny doing, suggest doing, apologise for doing, advise someone to do</i>), which avoid the tense changes by using a gerund or an infinitive.',
  patterns:[
    ['Verb + -ing','<b>deny</b>, <b>admit</b>, <b>suggest</b>, <b>recommend</b> + doing'],
    ['Verb + to-infinitive','<b>offer</b>, <b>refuse</b>, <b>promise</b>, <b>agree</b>, <b>threaten</b> + to do'],
    ['Verb + object + to-infinitive','<b>advise</b>, <b>remind</b>, <b>warn</b>, <b>urge</b>, <b>invite</b> + someone to do'],
    ['Verb + preposition','<b>accuse</b> sb <b>of</b> · <b>apologise for</b> · <b>insist on</b> · <b>congratulate</b> sb <b>on</b> · <b>blame</b> sb <b>for</b>'],
    ['Reported questions','“Are you coming?” → He asked me <b>whether I was coming</b> (no question word order).']
  ],
  b2:[
    ['"I didn\'t break the window," said Tom.','DENIED','Tom','the window.','denied breaking|denied having broken'],
    ['"Why don\'t we go to the cinema?" said Mary.','SUGGESTED','Mary','to the cinema.','suggested going|suggested that we go|suggested we go|suggested that we went|suggested we went|suggested that they go'],
    ['"I\'m sorry I arrived late," said John.','APOLOGISED','John','late.','apologised for arriving|apologised for being|apologised for having arrived|apologized for arriving|apologized for being|apologized for having arrived'],
    ['"You stole my wallet!" said the man to the boy.','ACCUSED','The man','his wallet.','accused the boy of stealing|accused him of stealing'],
    ['"Don\'t forget to buy milk," she told him.','REMINDED','She','milk.','reminded him to buy|reminded him to get'],
    ['"I\'ll carry your bag," said Paul.','OFFERED','Paul','my bag.','offered to carry'],
    ['"No, I won\'t do it," she said.','REFUSED','She','it.','refused to do'],
    ['"Are you going to the party?" he asked me.','WHETHER','He asked me','to the party.','whether I was going'],
    ['"Where is the station?" she asked.','KNOW','She wanted to','was.','know where the station'],
    ['"You should apply for the job," said my mother.','ADVISED','My mother','for the job.','advised me to apply'],
    ['"I\'ve never seen this man before," the witness said.','HAVING','The witness denied','man before.','having seen that|having ever seen that|having seen the|having ever seen the|having seen this|having ever seen this'],
    ['"Let\'s throw a surprise party for Sarah," said Mark.','THROWING','Mark','a surprise party for Sarah.','suggested throwing|proposed throwing'],
    ['"Don\'t swim in that river," the guide told us.','WARNED','The guide','in that river.','warned us not to swim|warned us against swimming'],
    ['"I will definitely pay you back tomorrow," she said.','PROMISED','She','the next day.','promised to pay me back|promised to pay us back'],
    ['"Can you help me with this box?" he asked.','COULD','He asked me','with the box.','if I could help him|whether I could help him'],
    ['"I broke the computer," said the student.','ADMITTED','The student','the computer.','admitted breaking|admitted having broken|admitted to breaking|admitted to having broken|admitted that he had broken|admitted that she had broken'],
    ['"Would you like to come to dinner?" she asked him.','INVITED','She','to dinner.','invited him to come|invited him'],
    ['"You really must stay for lunch," they said to us.','INSISTED','They','for lunch.','insisted on us staying|insisted on our staying|insisted that we stay|insisted that we stayed|insisted we stay|insisted we stayed'],
    ['"Who does this jacket belong to?" the teacher asked.','WHOSE','The teacher asked','was.','whose jacket it|whose jacket that|whose jacket this'],
    ['"I didn\'t mean to delete the file," he said.','INTENTION','He said he had','the file.','no intention of deleting']
  ],
  c1:[
    ['"I\'m sorry, but you can\'t park here," the guard told us.','PERMITTED','The guard told us that we','there.','were not permitted to park'],
    ['"It was Tom who broke it," said Anna.','BLAMED','Anna','it.','blamed Tom for breaking|blamed Tom for having broken'],
    ['"You really must try the local food," our guide said.','URGED','Our guide','the local food.','urged us to try'],
    ['"Well done on winning the prize, Sophie!" said her teacher.','CONGRATULATED',"Sophie's teacher",'the prize.','congratulated her on winning|congratulated her on having won|congratulated Sophie on winning'],
    ['"I\'ll definitely be there on time," Mark told us.','ASSURED','Mark','be there on time.','assured us that he would|assured us he would'],
    ['"Don\'t worry, I won\'t tell anyone," she said to me.','PROMISED','She','anyone.','promised not to tell|promised she would not tell|promised me not to tell'],
    ['"I really think you should see a specialist," the doctor said to me.','RECOMMENDED','The doctor','a specialist.','recommended that I see|recommended that I should see|recommended I see|recommended me to see|recommended that I saw'],
    ['"I wasn\'t anywhere near the bank that night," the suspect insisted.','DENIED','The suspect','the bank that night.','denied having been near|denied being near|denied being anywhere near|denied having been anywhere near|denied that he was near']
  ]
},
{
  id:'modals', emoji:'🔮', title:'Modal Verbs (Present and Past)',
  focus:'Modals express probability, ability, permission, obligation and advice. A key B2 challenge is <b>past modals for deduction</b> (<i>must have been, can’t have done, might have gone</i>) and <b>unfulfilled obligations</b> (<i>should have done, needn’t have done</i>). <b>Manage to</b> and <b>be able to</b> are used for ability on one specific occasion in the past, instead of <i>could</i>.',
  patterns:[
    ['Deduction (present)','I’m sure he’s at home → He <b>must be</b> at home. · It’s impossible → It <b>can’t be</b> true.'],
    ['Deduction (past)','<b>must have done</b> (sure) · <b>can’t / couldn’t have done</b> (impossible) · <b>might / may have done</b> (possible)'],
    ['Criticism / regret','It was a mistake to go → You <b>shouldn’t have gone</b>.'],
    ['Necessity in the past','<b>needn’t have done</b> = you did it, but it wasn’t necessary · <b>didn’t need to do</b> = it wasn’t necessary (usually not done)'],
    ['Ability in the past','<b>could</b> (general ability) · <b>managed to / was able to</b> (one specific success)']
  ],
  b2:[
    ["I'm sure he is at home.",'MUST','He','home.','must be at'],
    ["It's impossible that she saw me.","CAN'T",'She','me.','cannot have seen'],
    ['Perhaps they forgot about the meeting.','MIGHT','They','about the meeting.','might have forgotten'],
    ['It was a mistake to talk to her.','SHOULD','You','to her.','should not have talked|should not have spoken'],
    ["I wasn't able to finish the exam in time.",'MANAGE',"I didn't",'the exam in time.','manage to finish|manage to complete'],
    ["It wasn't necessary for you to bring a gift.","NEEDN'T",'You','a gift.','need not have brought'],
    ["I am certain they didn't leave early.",'HAVE','They','early.','cannot have left|could not have left'],
    ['Was it necessary for you to work late?','HAVE','Did','late?','you have to work'],
    ['I succeeded in passing the driving test.','ABLE','I','the driving test.','was able to pass'],
    ['It is a good idea to eat more vegetables.','OUGHT','You','more vegetables.','ought to eat'],
    ["I'm sure you dropped your wallet in the shop.",'MUST','You','your wallet in the shop.','must have dropped'],
    ['It was a bad idea for us to leave so late.','LEFT','We','so late.','should not have left|ought not to have left'],
    ['There is a chance that she missed the train.','MIGHT','She','the train.','might have missed'],
    ['It is forbidden to park here.','NOT','You','here.','must not park|are not allowed to park|are not permitted to park'],
    ['He had the ability to run fast when he was young.','COULD','He','when he was young.','could run fast'],
    ["It wasn't necessary to book tickets in advance, but we did.",'BOOKED','We','tickets in advance.','need not have booked'],
    ["I'm sure they haven't finished the work yet.","CAN'T",'They','the work yet.','cannot have finished'],
    ['I think you should see a doctor.','WERE','If',', I would see a doctor.','I were you'],
    ['We were obliged to wear a uniform at school.','HAD','We','a uniform at school.','had to wear'],
    ["I didn't manage to find the keys.",'SUCCEED','I','the keys.','did not succeed in finding']
  ],
  c1:[
    ["I'm sure it wasn't easy for her to move abroad.","CAN'T",'It','for her to move abroad.','cannot have been easy'],
    ["It's possible that he didn't receive my message.",'MAY','He','my message.','may not have received|may not have got|may not have seen'],
    ['There was no need for you to wait for me, but thank you.','HAVE','You','for me, but thank you.','need not have waited'],
    ["There's nothing else to do here, so we should just go home.",'MIGHT','We','go home.','might as well|might just as well'],
    ['It was wrong of you to shout at him.','OUGHT','You','at him.','ought not to have shouted|ought not have shouted'],
    ["I bet they've got lost on the way.",'MUST','They','on the way.','must have got lost|must have gotten lost'],
    ['Perhaps she was telling the truth after all.','COULD','She','the truth after all.','could have been telling'],
    ["I'm sure he didn't realise how serious it was.",'REALISED','He','how serious it was.','cannot have realised']
  ]
},
{
  id:'comparatives', emoji:'⚖️', title:'Comparatives and Superlatives',
  focus:'This section tests your ability to express the same degree of comparison with different structures. Common patterns: converting comparatives to <b>not as… as</b>, using <b>so / such</b> to express intensity, balancing <b>too</b> (excess) with <b>not … enough</b> (insufficiency) and <b>double comparatives</b> (<i>The older you get, the wiser you become</i>).',
  patterns:[
    ['Not as … as','John is taller than Peter → Peter is <b>not as tall as</b> John.'],
    ['So / such','<b>so</b> + adjective · <b>such (a)</b> + adjective + noun: It was <b>such a boring book</b> that…'],
    ['Too / enough','<b>too hot</b> to drink = <b>not cool enough</b> to drink'],
    ['Double comparative','<b>The more</b> I study, <b>the more confident</b> I feel.'],
    ['C1 · modifiers','<b>nowhere near as</b> · <b>every bit as</b> · <b>not nearly as</b> · <b>far / by far</b>']
  ],
  b2:[
    ['John is taller than Peter.','AS','Peter is','John.','not as tall as|not so tall as'],
    ["I've never seen such a beautiful house.",'THE','This is',"I've ever seen.",'the most beautiful house'],
    ['The coffee was too hot to drink.','ENOUGH','The coffee','to drink.','was not cool enough|was not cold enough'],
    ['The book was so boring that I fell asleep.','SUCH','It was','that I fell asleep.','such a boring book'],
    ['He is the worst player on the team.','THAN','Everyone else on the team','him.','is better than|plays better than|is a better player than'],
    ['The car was too expensive for me to buy.','HAVE','I','money to buy the car.','did not have enough'],
    ['Sarah speaks French better than Mark.','WELL',"Mark doesn't",'as Sarah.','speak French as well|speak French so well'],
    ['As you get older, you become wiser.','THE','The older you get,','become.','the wiser you'],
    ['This test is much easier than the last one.','NEARLY','This test is','as the last one.','not nearly as difficult|not nearly as hard'],
    ["There aren't enough chairs for everyone.",'TOO','There are','for everyone.','too few chairs'],
    ['No one in the class is as smart as Emma.','SMARTEST','Emma','in the class.','is the smartest|is the smartest student|is the smartest person|is the smartest one|is the smartest girl'],
    ['The journey was longer than I expected.','NOT','The journey','I expected.','was not as short as|was not so short as|was not as quick as'],
    ["He is so tired that he can't walk.",'TOO','He is','walk.','too tired to'],
    ["It was the most delicious meal I've ever eaten.",'SUCH','I have never','delicious meal.','eaten such a|had such a'],
    ['That is the cheapest restaurant in town.','LESS','There is no','that one in town.','restaurant less expensive than|less expensive restaurant than'],
    ["I don't have enough time to finish this today.",'TOO','I have','to finish this today.','too little time'],
    ['My brother and I are exactly the same height.','AS','I am exactly','my brother.','as tall as'],
    ['Because it was raining hard, we stayed indoors.','SO','It was','we stayed indoors.','raining so hard that|raining so heavily that|raining so much that'],
    ['We have never watched a worse film.','EVER','That is the worst film','watched.','we have ever'],
    ['As I study more, I feel more confident.','MORE','The more I study,','feel.','the more confident I']
  ],
  c1:[
    ["This year's results are much better than last year's.",'NOWHERE',"Last year's results were","this year's.",'nowhere near as good as|nowhere near as high as'],
    ['I had expected the hotel to be much better.','UP',"The hotel didn't",'my expectations.','live up to|come up to'],
    ['As I think about it more, I like the idea less and less.','THE','The more I think about it,','the idea.','the less I like'],
    ['She is by far the most talented singer in the choir.','NOBODY','','the choir is as talented as she is.','nobody else in'],
    ["I've never been so embarrassed in my life.",'MOST','It was','moment of my life.','the most embarrassing'],
    ['His second novel was just as successful as his first.','EVERY','His second novel was','as his first.','every bit as successful'],
    ['There were far fewer people at the concert than we had expected.','NOT','There were','people at the concert as we had expected.','not nearly as many|not as many|not so many|not nearly so many'],
    ["I'd rather walk than take the bus.",'PREFER','I','the bus.','prefer walking to taking|prefer walking to catching|prefer to walk rather than take|prefer to walk rather than catch']
  ]
},
{
  id:'verbpatterns', emoji:'🧩', title:'Verb Patterns (Gerunds and Infinitives)',
  focus:'English verbs are often followed by another verb, which must take a specific form: <b>to-infinitive</b>, <b>bare infinitive</b> or <b>gerund (-ing)</b>. This section tests which verbs take which pattern (<i>look forward to doing, afford to do, make someone do, succeed in doing</i>). It also includes noun and adjective phrases like <i>have trouble doing</i> or <i>there’s no point in doing</i>.',
  patterns:[
    ['+ to-infinitive','<b>afford</b>, <b>fail</b>, <b>manage</b>, <b>refuse</b>, <b>promise</b>, <b>tend</b> + to do'],
    ['+ -ing','<b>can’t help</b>, <b>can’t stand</b>, <b>avoid</b>, <b>mind</b>, <b>regret</b>, <b>deny</b> + doing'],
    ['Preposition + -ing','<b>look forward to</b> · <b>succeed in</b> · <b>be used to</b> · <b>get used to</b> · <b>apologise for</b> · <b>object to</b>'],
    ['Fixed phrases','<b>have trouble</b> doing · <b>there’s no point (in)</b> doing · <b>it’s no use</b> doing · <b>be worth</b> doing'],
    ['Make / let / allow','They <b>made me</b> do it = I <b>was made to</b> do it / I <b>was forced to</b> do it. · They didn’t <b>let me</b> go = I <b>wasn’t allowed to</b> go.']
  ],
  b2:[
    ["I can't wait to go on holiday.",'FORWARD',"I'm",'on holiday.','looking forward to going'],
    ['She finds it difficult to wake up early.','TROUBLE','She','up early.','has trouble waking|has trouble getting'],
    ["It's useless to argue with him.",'POINT','There is','with him.','no point arguing|no point in arguing'],
    ['He finally managed to fix the computer.','SUCCEEDED','He finally','the computer.','succeeded in fixing|succeeded in repairing'],
    ['I would prefer to stay at home tonight.','RATHER','I','at home tonight.','would rather stay'],
    ["They didn't let me leave the room.",'ALLOWED','I','the room.','was not allowed to leave'],
    ["He doesn't like it when people tell him what to do.",'BEING','He hates','do.','being told what to'],
    ['It is important that you remember to bring your passport.','FORGET','You','your passport.','must not forget to bring|should not forget to bring|must not forget to take'],
    ['"Don\'t touch the glass," the guard said to us.','WARNED','The guard','the glass.','warned us not to touch|warned us against touching'],
    ['He is too young to watch that film.','OLD','He is','that film.','not old enough to watch|not old enough to see'],
    ['My parents made me do my homework before dinner.','FORCED','I','my homework before dinner.','was forced to do|was forced to finish'],
    ['I advise you not to trust him.','AGAINST','I strongly','him.','advise you against trusting'],
    ["I'm sorry that I lost your favorite pen.",'APOLOGISE','I','your favorite pen.','apologise for losing|apologise for having lost|apologize for losing|apologize for having lost'],
    ['It is completely pointless to try and fix this TV.','USE',"It's",'to fix this TV.','no use trying'],
    ['I really hate doing the ironing.','STAND','I','the ironing.','cannot stand doing'],
    ['Will you let me use your phone?','MIND','Do','your phone?','you mind if I use|you mind me using|you mind my using'],
    ["I'm not accustomed to driving on the left.",'USED','I am','on the left.','not used to driving'],
    ['It was difficult for me to understand his accent.','FOUND','I','to understand his accent.','found it difficult|found it hard'],
    ['We spent hours trying to solve the puzzle.','TOOK','It','to solve the puzzle.','took us hours|took hours'],
    ['She said she would definitely not be late again.','PROMISED','She','late again.','promised not to be|promised she would not be']
  ],
  c1:[
    ['He finally confessed that he had made a mistake.','ADMITTED','He finally','a mistake.','admitted having made|admitted to having made|admitted to making|admitted that he had made'],
    ['I regret not taking the job when I had the chance.','SHOULD','I','the job when I had the chance.','should have taken|should have accepted'],
    ["It's pointless to repair this old bike.",'WORTH','This old bike','repairing.','is not worth'],
    ['The manager would not let anyone leave early.','PERMITTED','Nobody','early by the manager.','was permitted to leave'],
    ["I don't remember agreeing to this plan.",'RECALL','I','to this plan.','do not recall agreeing|cannot recall agreeing|do not recall having agreed'],
    ["He's now accustomed to working at night.",'GOT','He has','at night.','got used to working'],
    ['Do you have any objection to my opening the window?','OBJECT','Do you','the window?','object to me opening|object to my opening|object if I open'],
    ['It was a mistake for me to lend him money.','REGRET','I','him money.','regret having lent|regret that I lent']
  ]
},
{
  id:'tenses', emoji:'⏳', title:'Tenses and Time Expressions',
  focus:'This area tests the relationship between the <b>Past Simple</b> (finished actions at a specific time) and the <b>Present Perfect</b> (actions connected to the present, often with <i>since, for, already, yet</i>). It also covers past habits (<b>used to / would</b>), sequences in the past (<b>Past Perfect</b>) and first experiences (<i>It’s the first time I have…</i>).',
  patterns:[
    ['Ago ↔ for / since','I last saw him two years ago → I <b>haven’t seen</b> him <b>for</b> two years.'],
    ['First time','I’ve never eaten sushi → This is <b>the first time I have eaten</b> sushi.'],
    ['Past habits','<b>used to</b> (states and actions) · <b>would</b> (repeated actions only)'],
    ['Past Perfect','When we arrived, the train <b>had already left</b>.'],
    ['C1 · future perfect & continuous','By June I <b>will have been working</b> here for ten years.']
  ],
  b2:[
    ['I last saw him two years ago.','FOR','I','two years.','have not seen him for'],
    ['She started working here in 2015.','BEEN','She','2015.','has been working here since'],
    ['When did you buy that car?','HOW','','you buy that car?','how long ago did'],
    ['I have never eaten sushi before.','TIME','This is the','sushi.','first time I have eaten|first time I have tried|first time I have had'],
    ['He is still doing his homework.','FINISHED','He','his homework yet.','has not finished|has not finished doing'],
    ['I usually walked to school when I was a child.','USED','I','school when I was a child.','used to walk to'],
    ['She started crying the moment she heard the news.','SOON','She started crying','the news.','as soon as she heard'],
    ['During the film, I fell asleep.','WHILE','I fell asleep','the film.','while I was watching|while watching|while I watched'],
    ['The train left before we got to the station.','ALREADY','When we got to the station, the','left.','train had already'],
    ['They are still painting the house.','YET','They','painting the house.','have not yet finished'],
    ["It's ages since I went to the theater.",'BEEN','I','to the theater for ages.','have not been'],
    ['I started reading this book three weeks ago.','READING','I','this book for three weeks.','have been reading'],
    ['He has never driven such a fast car.','EVER','It is the fastest car he','.','has ever driven'],
    ["I didn't arrive in time to see the start of the match.",'ALREADY','The match','by the time I arrived.','had already started|had already begun'],
    ['My brother is constantly taking my clothes without asking.','ALWAYS','My brother','my clothes without asking.','is always taking'],
    ['When she was a teenager, she would play tennis every day.','USED','She','tennis every day when she was a teenager.','used to play'],
    ["I'm sure he didn't do it on purpose.",'MEAN','He','it on purpose.','did not mean to do'],
    ["It's two months since I last had a haircut.",'CUT',"I haven't",'two months.','had my hair cut for|had my hair cut in'],
    ['We waited for an hour before the bus finally arrived.','BEEN','We','an hour when the bus finally arrived.','had been waiting for'],
    ['As soon as I arrived, the phone rang.','JUST','I','when the phone rang.','had just arrived|had only just arrived']
  ],
  c1:[
    ["By the end of the year, I'll have worked here for a decade.",'BEEN','By the end of the year, I','here for ten years.','will have been working'],
    ["We haven't had a holiday for over two years.",'LAST',"It's over two years",'a holiday.','since we last had|since we last went on|since we last took'],
    ['The plane is about to take off.','POINT','The plane is','off.','on the point of taking'],
    ['She had only just sat down when the phone rang.','HARDLY','She had','when the phone rang.','hardly sat down'],
    ["I'm not used to getting up this early.",'ACCUSTOMED','I','up this early.','am not accustomed to getting'],
    ['When did you start learning the piano?','HOW','','been learning the piano?','how long have you'],
    ['Paul last spoke to his brother a year ago.','SPOKEN','Paul','his brother for a year.','has not spoken to'],
    ['I was cooking dinner when the guests arrived.','MIDDLE','I was','dinner when the guests arrived.','in the middle of cooking|in the middle of making|in the middle of preparing']
  ]
},
{
  id:'linkers', emoji:'🔗', title:'Connectors and Linkers',
  focus:'Connectors link ideas logically. Transformations often require a change in part of speech: a conjunction (<b>although / even though</b> + clause) becomes a preposition (<b>despite / in spite of</b> + noun or -ing). Other common focuses are cause (<b>due to / because of</b>), purpose (<b>in order to / so as to</b>) and result (<b>as a result / consequently</b>).',
  patterns:[
    ['Contrast','<b>although / even though</b> + clause · <b>despite / in spite of</b> + noun / -ing / <b>the fact that</b> + clause'],
    ['Cause','<b>because</b> + clause · <b>because of / due to / owing to</b> + noun'],
    ['Purpose','<b>in order to / so as to</b> + infinitive · <b>so as not to</b> · <b>to avoid</b> + -ing · <b>in case</b> + clause'],
    ['Result','<b>as a result</b> · <b>result in</b> + noun · <b>this means (that)</b>'],
    ['C1 · advanced linkers','<b>no matter how</b> · <b>for fear of</b> · <b>regardless of</b> · <b>on condition that</b> · <b>whereas</b>']
  ],
  b2:[
    ['Although it was raining, we went for a walk.','SPITE','We went for a walk','the rain.','in spite of'],
    ['Because of the bad weather, the match was cancelled.','DUE','The match was cancelled','weather.','due to the bad'],
    ['He studied hard, but he failed the exam.','EVEN','He failed the exam','hard.','even though he studied|even though he had studied|even though he worked|even though he had worked'],
    ['I brought an umbrella because it might rain.','CASE','I brought an umbrella','rained.','in case it'],
    ['The film was so boring that we left early.','SUCH','It was','we left early.','such a boring film that'],
    ['Consequently, they had to cancel the trip.','RESULT','As','cancel the trip.','a result, they had to|a result they had to'],
    ['She went to London to improve her English.','ORDER','She went to London','her English.','in order to improve'],
    ['Despite feeling ill, he went to work.','WELL','He went to work although','.','he was not feeling well|he was not well|he did not feel well'],
    ['Therefore, we will need more time.','MEANS','This','more time.','means we will need|means that we will need|means we need'],
    ['Besides being tired, I was also hungry.','ONLY','Not',', but I was also hungry.','only was I tired'],
    ['Even though she was late, she didn\'t hurry.','DESPITE',"She didn't hurry",'late.','despite being|despite running'],
    ["I set an alarm so that I wouldn't wake up late.",'AVOID','I set an alarm','late.','to avoid waking up|to avoid getting up'],
    ['The flight was delayed because of a strike.','RESULTED','A strike','of the flight.','resulted in the delay'],
    ['While I was walking home, I saw an accident.','DURING','I saw an accident','home.','during my walk|during my journey|during my way'],
    ['He was wearing a heavy coat, but he was still cold.','FACT','Despite','he was wearing a heavy coat, he was still cold.','the fact that'],
    ['She spoke quietly so nobody would hear her.','AS','She spoke quietly','be heard.','so as not to'],
    ['I liked the book, but the ending was disappointing.','EVEN','I liked the book','ending was disappointing.','even though the|even if the'],
    ['We missed the train because we got stuck in traffic.','WHY','Getting stuck in traffic is the','the train.','reason why we missed'],
    ['We stayed in because it was raining heavily.','OF','We stayed in','heavy rain.','because of the'],
    ['In addition to speaking Spanish, she speaks Italian.','ALSO','She speaks Spanish','speaks Italian.','and she also|and also|and she can also']
  ],
  c1:[
    ["However hard she tried, she couldn't open the jar.",'MATTER','No',", she couldn't open the jar.",'matter how hard she tried'],
    ['The concert was cancelled because very few tickets had been sold.','OWING','The concert was cancelled','ticket sales.','owing to poor|owing to low'],
    ["I'll lend you the money if you promise to pay it back next week.",'CONDITION',"I'll lend you the money",'pay it back next week.','on condition that you|on condition you'],
    ["We took a taxi so that we wouldn't miss the start.",'FEAR','We took a taxi','the start.','for fear of missing'],
    ['Tom loves football, but his brother hates it.','WHEREAS','Tom loves football,','hates it.','whereas his brother'],
    ['He resigned because of the scandal.','REASON','The scandal was','resigned.','the reason why he|the reason that he|the reason he'],
    ['She is determined to go, whatever the cost.','REGARDLESS','She is determined to go','cost.','regardless of the'],
    ['As well as being a talented singer, she writes her own songs.','ADDITION','','a talented singer, she writes her own songs.','in addition to being']
  ]
},
{
  id:'phrasal', emoji:'🧷', title:'Phrasal Verbs and Collocations',
  focus:'Idioms, phrasal verbs and fixed phrases are tested heavily. You must know exact combinations of verbs and particles (<i>put up with, turn down, take after</i>). <b>Collocations</b> are words that naturally go together (<i>make a difference, pay attention to, bear in mind</i>). The meaning of the sentence must stay exactly the same.',
  patterns:[
    ['Three-part phrasal verbs','<b>put up with</b> (tolerate) · <b>run out of</b> · <b>come up with</b> (invent) · <b>look up to</b> (admire) · <b>cut down on</b> (reduce)'],
    ['Two-part phrasal verbs','<b>turn down</b> (reject) · <b>call off</b> (cancel) · <b>put off</b> (postpone) · <b>take after</b> · <b>get over</b> · <b>take up</b>'],
    ['Collocations','<b>keep an eye on</b> · <b>bear in mind</b> · <b>take part in</b> · <b>do something on purpose</b> · <b>it’s up to you</b>'],
    ['C1 · fixed expressions','<b>take into account</b> · <b>take notice of</b> · <b>get the hang of</b> · <b>have a lot in common</b> · <b>be at a loss</b>']
  ],
  b2:[
    ["I can't tolerate this noise anymore.",'PUT',"I can't",'anymore.','put up with this noise|put up with the noise'],
    ['We have no more milk left.','RUN','We have','milk.','run out of'],
    ['She invented a brilliant excuse for being late.','CAME','She','brilliant excuse for being late.','came up with a'],
    ['He rejected their job offer.','TURNED','He','job offer.','turned down their'],
    ['The meeting was cancelled.','CALLED','The meeting','.','was called off|has been called off'],
    ["He doesn't have a good relationship with his sister.",'GET',"He doesn't",'his sister.','get on with|get on well with|get along with|get along well with'],
    ["It's not my fault that we are late.",'BLAME',"Don't",'late.','blame me for being|blame me for us being|blame me that we are'],
    ["I didn't mean to break the vase.",'PURPOSE',"I didn't break the",'.','vase on purpose'],
    ['She is very similar to her mother.','TAKES','She','mother.','takes after her'],
    ['He suddenly realized what had happened.','DAWNED','It suddenly','had happened.','dawned on him what'],
    ['You should think about the cost before you buy it.','MIND','You should','before you buy it.','bear the cost in mind|bear in mind the cost|keep the cost in mind|keep in mind the cost'],
    ['I admire my grandfather very much.','UP','I really','my grandfather.','look up to'],
    ['They postponed the match because of the rain.','PUT','The match','because of the rain.','was put off|has been put off'],
    ['Please watch my bag for a minute.','EYE','Please','my bag for a minute.','keep an eye on'],
    ['He recovered from his illness very quickly.','OVER','He','illness very quickly.','got over his'],
    ['I accidentally found this old photo in the attic.','ACROSS','I','old photo in the attic.','came across this|came across an|came across that'],
    ["It's your decision where we go tonight.",'UP',"It's",'where we go tonight.','up to you'],
    ['I think you should participate in the competition.','PART','I think you should','the competition.','take part in'],
    ['She started doing yoga last year.','UP','She','last year.','took up yoga'],
    ['We need to reduce the amount of sugar we eat.','CUT','We need to','the amount of sugar we eat.','cut down on|cut back on']
  ],
  c1:[
    ['The news came as a complete surprise to everyone.','TOOK','The news','by surprise.','took everyone completely|took everyone totally|took everybody completely'],
    ['The company is trying to reduce its costs.','BACK','The company is trying to','its costs.','cut back on'],
    ["He couldn't think of an answer to the question.",'LOSS','He was','an answer to the question.','at a loss for|at a loss to find'],
    ['You should consider his age when you judge his performance.','ACCOUNT','You should','when you judge his performance.','take his age into account|take into account his age'],
    ['Nobody paid any attention to her warnings.','NOTICE','Nobody','her warnings.','took any notice of|took notice of'],
    ['The two companies are very similar.','COMMON','The two companies','.','have a lot in common|have much in common|have a great deal in common'],
    ['He made no effort to help us.','TROUBLE',"He didn't",'help us.','take the trouble to'],
    ["I'm sure you'll learn how to use the new system soon.",'HANG',"I'm sure you'll soon",'the new system.','get the hang of']
  ]
},
{
  id:'future', emoji:'🔭', title:'Future Forms and Likelihood',
  focus:'Part 4 often asks you to express a future plan or the probability of an event in a different way. Learn the fixed structures: <b>be going to</b> (plans), <b>be due to</b> (timetables, expected events), <b>be about to</b> (very near future), <b>be bound to</b> (certain), <b>be likely to</b> (probable), the <b>future perfect</b> and the <b>future continuous</b>.',
  patterns:[
    ['Near future','<b>be about to</b> do · C1: <b>be on the point / verge of</b> doing'],
    ['Schedule / expected','The film <b>is due to start</b> at 8. · Prices <b>are set to rise</b>.'],
    ['Certainty','I’m sure he’ll be late → He <b>is bound to be</b> late / He <b>is certain to be</b> late.'],
    ['Probability','It will probably rain → It <b>is likely to</b> rain · <b>In all likelihood</b>… · <b>The odds are in favour of</b>…'],
    ['Impossibility','<b>There’s no chance of</b> them winning · <b>I doubt (whether)</b> they will win']
  ],
  b2:[
    ['I plan to visit my grandparents next weekend.','GOING','I','my grandparents next weekend.','am going to visit|am going to see'],
    ['The film starts at 8 p.m.','DUE','The film','at 8 p.m.','is due to start|is due to begin'],
    ["I'm sure he'll be late again.",'BOUND','He','late again.','is bound to be'],
    ["It's very likely that it will rain tomorrow.",'PROBABLY','It','tomorrow.','will probably rain|is probably going to rain'],
    ['The train is going to leave in a moment.','ABOUT','The train','leave.','is about to'],
    ['I will finish the report before you arrive.','HAVE','I','the report by the time you arrive.','will have finished|will have completed|will have written'],
    ["Don't call me at nine – I'll be in the middle of my exam.",'DOING',"Don't call me at nine – I",'my exam.','will be doing'],
    ["There's a good chance that she will get the job.",'LIKELY','She','the job.','is likely to get|is very likely to get'],
    ['We have arranged to meet Sarah at the station.','MEETING','We','at the station.','are meeting Sarah'],
    ["It's impossible that they will win the match.",'CHANCE',"There's",'winning the match.','no chance of them|no chance of their']
  ],
  c1:[
    ['In all probability, prices will rise again next year.','LIKELIHOOD','In','will rise again next year.','all likelihood, prices|all likelihood prices'],
    ["It's unlikely that the government will change its mind.",'DOUBT','I','will change its mind.','doubt that the government|doubt whether the government|doubt if the government|doubt the government'],
    ['The meeting is about to begin.','VERGE','The meeting is','beginning.','on the verge of'],
    ["There's no way she'll agree to this plan.",'WHATSOEVER','There is','she will agree to this plan.','no chance whatsoever that|no chance whatsoever|no possibility whatsoever that'],
    ['The results will definitely surprise you.','CERTAIN','The results','surprise you.','are certain to'],
    ['The president is expected to announce his decision tomorrow.','DUE','The president','his decision tomorrow.','is due to announce|is due to make'],
    ['Experts predict that the population will double by 2050.','SET','The population','by 2050.','is set to double|is set to have doubled'],
    ["It's very likely that they will win.",'ODDS','The','them winning.','odds are in favour of|odds are in favor of']
  ]
},
{
  id:'inversion', emoji:'🔁', title:'Inversion and Emphasis (C1)',
  focus:'At C1 Advanced, Part 4 often tests <b>inversion</b> after negative or restrictive adverbials (<i>Never, Hardly, No sooner, Not only, Only when, Under no circumstances</i>) and <b>cleft sentences</b> that emphasise one part of the sentence (<i>What I need is…</i>, <i>It was … that…</i>). After the adverbial, use question word order: auxiliary + subject.',
  patterns:[
    ['Negative adverbials','<b>Never had I seen</b>… · <b>At no time did he</b>… · <b>Under no circumstances must you</b>…'],
    ['Time sequences','<b>No sooner had</b> I arrived <b>than</b>… · <b>Hardly had</b> I arrived <b>when</b>…'],
    ['Not only / Only','<b>Not only is she</b> clever, <b>but</b>… · <b>Only when</b> I saw it <b>did I</b>… · <b>Not until</b> … <b>did we</b>…'],
    ['Cleft sentences','<b>What I need is</b> a holiday. · <b>It was</b> his rudeness <b>that</b> annoyed me.'],
    ['So / Such','<b>So bad was</b> the weather that… · <b>Such was</b> his anger that…']
  ],
  c1:[
    ['I had never seen such a beautiful sunset.','NEVER','','such a beautiful sunset.','never had I seen|never before had I seen'],
    ['As soon as I arrived, it started to rain.','SOONER','No','it started to rain.','sooner had I arrived than|sooner did I arrive than'],
    ["He didn't say sorry at any point.",'TIME','At','sorry.','no time did he say'],
    ['She is clever, and she is also very hard-working.','ONLY','Not','she is also very hard-working.','only is she clever, but|only is she clever but'],
    ['We only understood the problem when the engineer explained it.','UNTIL','Not','explained it did we understand the problem.','until the engineer'],
    ["You mustn't open this door under any circumstances.",'CIRCUMSTANCES','Under','open this door.','no circumstances must you|no circumstances should you|no circumstances are you to'],
    ['I need a long holiday.','WHAT','','a long holiday.','what I need is'],
    ["Tom's rudeness really annoyed me.",'WAS','It','really annoyed me.',"was Tom's rudeness that|was Tom's rudeness which"],
    ['The alarm went off just after I had closed my eyes.','HARDLY','','my eyes when the alarm went off.','hardly had I closed'],
    ['It is unusual to see such talent in someone so young.','RARELY','','such talent in someone so young.','rarely do we see|rarely does one see|rarely do you see|rarely is one able to see'],
    ['The thing that surprised me most was his calmness.','WHAT','','was his calmness.','what surprised me most|what surprised me the most'],
    ['The weather was so bad that the flight was cancelled.','SO','','the weather that the flight was cancelled.','so bad was|so terrible was']
  ]
},
{
  id:'fixedphrases', emoji:'📌', title:'Prepositional and Fixed Phrases (C1)',
  focus:'C1 Advanced rewards precise knowledge of <b>fixed phrases built around a noun and a preposition</b>: <i>in charge of, with a view to, at odds with, on account of, with the exception of</i>. The key word is usually the noun in the middle, so learn the whole chunk, not just the word.',
  patterns:[
    ['Responsibility / purpose','<b>in charge of</b> · <b>with a view to</b> + -ing · <b>for the sake of</b>'],
    ['Cause / exception','<b>on account of</b> · <b>with the exception of</b> · <b>in the event of</b>'],
    ['Attitude','<b>at odds with / over</b> · <b>unaware of</b> · <b>have no interest in</b> · <b>make no mention of</b>'],
    ['Reporting opinion','She <b>is generally considered to be</b>… · I <b>have no doubt that</b>… · The news <b>came as a surprise to</b>…'],
    ['Rules','<b>come into effect</b> · <b>take effect</b>']
  ],
  c1:[
    ['Who is responsible for the new project?','CHARGE','Who is','the new project?','in charge of'],
    ['She took the course because she wanted to improve her career prospects.','VIEW','She took the course','her career prospects.','with a view to improving'],
    ['The two managers disagree about the budget.','ODDS','The two managers are','the budget.','at odds over|at odds about|at odds on'],
    ['Everyone except Jack came to the meeting.','EXCEPTION','','Jack, everyone came to the meeting.','with the exception of'],
    ["He didn't realise the danger he was in.",'UNAWARE','He was','he was in.','unaware of the danger'],
    ['The new rules will apply from next Monday.','EFFECT','The new rules will','next Monday.','come into effect|take effect from|come into effect on|come into effect from|take effect on'],
    ["I'm sure you will succeed.",'DOUBT','I have','succeed.','no doubt that you will|no doubt you will'],
    ['She said nothing about her plans.','MENTION','She','her plans.','made no mention of'],
    ['We had to cancel the trip because of the storm.','ACCOUNT','We had to cancel the trip','storm.','on account of the'],
    ["I'm not interested in politics at all.",'INTEREST','I','politics whatsoever.','have no interest in|have no interest at all in'],
    ['He was really surprised to hear the news.','CAME','The news','him.','came as a surprise to|came as a shock to|came as a real surprise to'],
    ['Most people agree that she is the best candidate.','GENERALLY','She is','the best candidate.','generally considered to be|generally thought to be|generally agreed to be|generally regarded as|generally seen as']
  ]
}
];
