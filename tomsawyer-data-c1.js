/* ============================================================
   THE ADVENTURES OF TOM SAWYER — Mark Twain
   Original C1 (advanced) retelling · ≈3,000 headwords
   Dataset for the NIS reader app. Public-domain source;
   all prose below is an original retelling.
   ============================================================ */

window.ATTWN_DATA = (function(){
const CHAPTERS = [
  { n:1, title:"Tom and the Fence",
    sum:"Condemned to spend his precious Saturday whitewashing Aunt Polly’s fence, Tom converts punishment into privilege and persuades the boys of St. Petersburg to pay him for the honour of doing his work — a first lesson in the economics of desire.",
    vocab:[
      ["DRUDGERY","hard, monotonous and unrewarding work"],
      ["MELANCHOLY","a deep, thoughtful sadness"],
      ["INGENUITY","cleverness and originality in solving problems"],
      ["NONCHALANCE","an air of calm, unconcerned indifference"],
      ["PRIVILEGE","a special advantage granted only to a favoured few"],
      ["COVET","to long to possess something that belongs to another"],
      ["RELINQUISH","to give up or surrender something, usually reluctantly"],
      ["SHREWD","sharp-witted and astute in practical matters"],
      ["INDIGNITY","treatment that humiliates or degrades a person"],
      ["PROSPEROUS","wealthy, successful and flourishing"],
      ["GUILE","sly cunning used to deceive others"],
      ["CONTEMPLATION","long, quiet and serious thought"]
    ],
    comp:[
      ["What does the narrator suggest about St. Petersburg’s idea of virtue?",["It rests on genuine private kindness","It is largely a matter of public appearance","It is confined to the town’s children","It is imported from larger cities"],1,"Virtue is ‘measured chiefly by attendance at church’ — the town values the appearance of goodness over the substance."],
      ["Why does Aunt Polly so seldom punish Tom severely?",["She is secretly afraid of him","She rarely manages to catch him","Her affection keeps defeating her principles","She believes punishment never works"],2,"She sees her dead sister in the boy, so the rod she believes in ‘so seldom actually fell’."],
      ["Tom’s despair before the fence comes mainly from…",["the sheer physical effort required","the loss of a day’s wages","the prospect of being seen and mocked by free boys","fear of Aunt Polly’s final inspection"],2,"The drudgery is bad, but what stings is the parade of free boys coming to sneer — the indignity, not the labour."],
      ["How does Tom make the brush desirable to Ben Rogers?",["By offering to pay him generously","By performing the work as a rare and exclusive pleasure","By explaining how important the fence is","By threatening to fight him"],1,"Tom’s studied nonchalance turns whitewashing into art — a privilege a boy hardly gets every day."],
      ["What is ironic about the treasures Tom collects?",["The boys pay them for the right to do his punishment","They are secretly stolen from Aunt Polly","They already belonged to Tom","They turn out to be worth real money"],0,"A dead rat and a one-eyed kitten are the price boys pay to do work Tom was sentenced to as punishment."],
      ["The ‘great law of human action’ Tom discovers is that people desire…",["whatever is genuinely useful","whatever is difficult to attain","whatever their friends despise","whatever costs the most money"],1,"Make a thing hard to get and it will be coveted — the whole con rests on manufactured scarcity."],
      ["The narrator’s tone in calling Tom ‘a small capitalist’ is best described as…",["bitterly critical","affectionately mocking","openly admiring","completely neutral"],1,"The narrator is amused rather than outraged — he mocks Tom fondly while letting the satire of commerce land."],
      ["According to the chapter, the real difference between work and play lies in…",["the nature of the task itself","whether one is obliged to do it","whether one is paid for it","the age of the person doing it"],1,"Work is what a body is obliged to do; play is what a body is not obliged to do — the task is identical."]
    ],
    tf:[
      ["Aunt Polly’s strictness is repeatedly undermined by her affection for Tom.",true,"She arms herself with principles and loses every battle; the rod seldom falls."],
      ["Tom’s first idea is to pay the village boys from his own pocket to do the painting.",true,"He inspects his worldly wealth, finds it could buy barely ten minutes of labour, and gives the idea up — the con comes later."],
      ["Ben Rogers hands over his whole apple, not just the core, for a turn with the brush.",true,"Tom refuses the core; the whole apple buys a brief, reluctant surrender of the brush."],
      ["The fence ends the day with a single hurried coat of whitewash.",false,"By mid-afternoon it wears three gleaming coats — the workforce was enthusiastic."],
      ["Tom is careful never to touch the brush himself once Ben appears.",false,"He is painting with absorbed nonchalance precisely so that Ben will see the work as a pleasure."],
      ["The narrator claims Tom’s discovery applies to grown men as well as boys.",true,"The ‘great law of human action’ is stated for ‘a man or a boy’ — the satire aims well above the fence."]
    ],
    writing:[
      {task:"Essay: ‘Tom’s fence trick is clever entrepreneurship, not dishonesty.’ Discuss this statement, presenting arguments on both sides and giving your own reasoned opinion.",target:"150–190 words",
        tips:["Define the difference between persuasion and deception before you judge Tom.","Use one concrete detail from the chapter as evidence for each side.","End with a clear position — sitting on the fence is only allowed for Tom."],
        starters:["Few punishments in literature have been so profitably avoided as Tom Sawyer’s.","Whether Tom is a swindler or a genius depends on what we think the boys actually bought.","It is tempting to admire a boy who turns drudgery into profit.","Persuasion becomes dishonesty at the point where the buyer is harmed — or does it?"]},
      {task:"Informal email: You are Ben Rogers. Write to a cousin in another town describing the Saturday you paid a whole apple for the privilege of painting a fence — and the exact moment, days later, when you realised what had happened.",target:"150–190 words",
        tips:["Keep the register informal: contractions, exclamations, direct questions to your cousin.","Let the realisation arrive gradually — comedy lives in the delay.","Show some grudging admiration for Tom rather than plain anger."],
        starters:["You will not believe what I spent my apple on last Saturday.","Do you remember me telling you Tom Sawyer was the luckiest boy in town?","I have done a foolish thing, and the worst part is that I queued for it.","Something happened here that I still cannot fully explain."]}
    ]},

  { n:2, title:"Church and Becky",
    sum:"In the ticket economy of Sunday school, Tom buys his way to a prize Bible and is publicly undone by a single question — all performed to dazzle the new judge’s daughter, Becky Thatcher.",
    vocab:[
      ["PIETY","devout observance of religious duty"],
      ["CONGREGATION","the body of worshippers gathered in a church"],
      ["BARTER","to trade goods or services without using money"],
      ["PRESTIGE","high status and respect in the eyes of others"],
      ["DEVOUT","deeply and sincerely religious"],
      ["ILLUSTRIOUS","famous, distinguished and greatly admired"],
      ["POMP","splendid and stately ceremonial display"],
      ["MORTIFICATION","intense embarrassment or wounded pride"],
      ["HUMILIATION","the painful loss of dignity before others"],
      ["SMITTEN","suddenly and completely captivated by love"],
      ["SPECTACLE","a striking public display or performance"],
      ["VENERABLE","worthy of deep respect because of age or dignity"]
    ],
    comp:[
      ["The ticket system was designed to reward holiness. What did it actually reward?",["Patient memorisation","Skill in trade and negotiation","Regular attendance","Family reputation"],1,"Designed to encourage memory and holiness, ‘what it actually encouraged was commerce’ — tickets became currency."],
      ["Why does the narrator mention that Judge Thatcher came only twelve miles?",["To explain his late arrival","To mock how easily the town is impressed by ‘greatness’","To show how dangerous travel was","To prove the judge’s modesty"],1,"Calling a man from twelve miles away an ‘illustrious visitor from Constantinople’ satirises provincial awe."],
      ["Why must the envious boys applaud Tom, and what makes it ironic?",["They fear the superintendent — situational irony","They sold him the very tickets that built his glory — they applaud their own loss","They love ceremonies — dramatic irony","They hope to borrow the Bible — verbal irony"],1,"The traded tickets were theirs; they must now celebrate a triumph assembled from their own surrendered credit."],
      ["What does Tom’s answer ‘David and Goliath’ reveal?",["He has confused two prizes","He never learned the verses his tickets represented","He is deliberately joking","He panicked despite knowing the answer"],1,"The tickets were bought, not earned; the first easy question exposes the fraud completely."],
      ["‘Let us draw the curtain of charity over the rest of the scene’ shows the narrator…",["genuinely too embarrassed to continue","using mock delicacy instead of describing the disaster","protecting Tom’s reputation seriously","quoting the superintendent directly"],1,"The theatrical modesty is a wink to the reader — the humiliation is worse than anything he could print."],
      ["The speed with which Tom forgets Amy Lawrence suggests his ‘great passions’ are…",["deep but hidden","theatrical and shallow","reserved for adults","invented by the narrator"],1,"A love that evaporates ‘so completely that he could scarcely remember having loved her’ was performance, not devotion."],
      ["Why did Tom want the prize Bible in the first place?",["Out of sincere religious feeling","For glory in front of a particular audience","To please Aunt Polly","To resell it later"],1,"The performance ‘had one particular audience in mind’ — the prestige was for Becky, not for heaven."],
      ["In the final paragraph, the narrator implies that compared with the congregation, Tom is…",["far more wicked","at least an honest kind of fraud","a genuinely devout boy","beyond forgiveness"],1,"Tom cheated openly and was caught publicly, ‘which in that town passed for a kind of integrity’ — the town’s piety is the deeper fraud."]
    ],
    tf:[
      ["A Bible could be earned by reciting fewer than one hundred verses.",false,"Two verses per blue ticket, ten blues to a red, ten reds to a yellow, ten yellows to a Bible — the honest route runs to thousands."],
      ["Tom had at one point made a genuine attempt to memorise scripture.",true,"He once set out on the Sermon on the Mount — choosing the shortest verses on grounds of efficiency."],
      ["Tom acquires his tickets by reciting verses faster than the other boys.",false,"He buys them on the chapel steps with licorice, fish-hooks and the profits of the fence."],
      ["The boys who envy Tom’s triumph helped to construct it.",true,"Their own traded tickets built the glory they are obliged to applaud."],
      ["Tom’s attachment to Amy Lawrence survives his first sight of Becky.",false,"Amy evaporates from his heart instantly — and they had been engaged."],
      ["According to the narrator, the only sincere attention of the whole service goes to a dog.",true,"A poodle’s battle with a beetle draws the one honest interest of the morning."]
    ],
    writing:[
      {task:"Review: For the parents’ newsletter, write a review of the Sunday school ticket system, evaluating whether it teaches scripture or commerce, and ending with a clear recommendation.",target:"150–190 words",
        tips:["Adopt the measured, slightly formal voice of a newsletter reviewer.","Assess the system against its stated aim before judging its actual effects.","Finish with a concrete recommendation — keep, reform or abolish."],
        starters:["Our Sunday school has devised a system of tickets that deserves closer inspection.","On paper, the ticket scheme rewards memory and devotion.","Every currency eventually finds its market, and ours found the chapel steps.","The recent prize-giving has raised questions this review will try to answer."]},
      {task:"Article: Write a magazine article entitled ‘Showing Off: Why We Perform for People We Admire’, using Tom’s behaviour in front of Becky Thatcher as your opening example.",target:"150–190 words",
        tips:["Hook the reader with Tom’s lunatic showing-off before widening to people in general.","Balance humour with one genuinely thoughtful observation about admiration.","Address the reader directly at least once — articles are conversations."],
        starters:["When Tom Sawyer met Becky Thatcher, he immediately began behaving like a circus.","Why do sensible people become idiots in front of those they admire?","There is a performance we all know how to give, though nobody teaches it.","The audience was one girl; the show involved a prize Bible and total disgrace."]}
    ]},

  { n:3, title:"In the Graveyard",
    sum:"A midnight wart cure takes Tom and Huck to the graveyard, where they watch Injun Joe murder Doctor Robinson and hang the crime on Muff Potter. Terrified, the boys sign an oath of silence in their own blood.",
    vocab:[
      ["SUPERSTITION","an irrational belief in magic, omens or luck"],
      ["MACABRE","disturbing because concerned with death"],
      ["EXHUME","to dig up a body that has been buried"],
      ["VENGEANCE","punishment inflicted in return for an injury"],
      ["TREACHERY","betrayal of trust; deceitful and disloyal action"],
      ["STUPOR","a dazed state close to unconsciousness"],
      ["CULPRIT","the person actually guilty of a crime"],
      ["SOLEMNITY","deep, dignified seriousness"],
      ["ACCOMPLICE","a partner who helps in wrongdoing"],
      ["REMORSE","deep, gnawing regret for a wrong one has done"],
      ["OMEN","a sign believed to foretell good or evil"],
      ["INCRIMINATE","to make someone appear guilty of a crime"]
    ],
    comp:[
      ["Why do the respectable mothers of St. Petersburg dread Huckleberry Finn?",["He steals from their kitchens","Their sons envy and adore his freedom","He spreads disease from the barrels","He insults them in the street"],1,"Mothers dread him ‘precisely because their sons adored him’ — his freedom is contagious."],
      ["Why are human voices in the graveyard more terrifying than devils would have been?",["The boys recognise them at once","Real, present danger outweighs imagined danger","Devils were expected to be silent","The voices are unnaturally loud"],1,"Devils were part of the programme; living men at midnight mean real and unpredictable peril."],
      ["What does Doctor Robinson’s errand suggest about respectable society?",["Science and crime never mix","Respectability quietly employs disreputable hands for its dirty work","Doctors were poorly paid","Grave-robbing was legal at the time"],1,"A ‘macabre trade conducted by respectable science through disreputable hands’ — the town’s virtue subcontracts its sins."],
      ["Injun Joe’s motive for the murder is best described as…",["sudden drunken rage","greed for the doctor’s money","long-nursed vengeance for an old humiliation","fear of being arrested"],2,"Years before, the doctor’s family drove him from their door; he has nursed his vengeance ever since."],
      ["How does Injun Joe convince Muff Potter of his own guilt?",["He shows him false evidence","He exploits Potter’s stupor and tells him gently what ‘he’ did","He threatens to kill him","He bribes him with whisky"],1,"Potter wakes from his stupor to a knife in his hand and a trusted voice explaining the crime he cannot remember."],
      ["Why does the blood oath comfort the two boys?",["It legally protects them","Its ceremony makes unbearable terror feel managed","Injun Joe will respect it","It transfers the guilt to Potter"],1,"Being boys, ‘they solved the dilemma with ceremony’ — ritual gives shape to a fear too large to carry loose."],
      ["The phrase ‘one occupant richer’, describing the graveyard, is an example of…",["sentimental exaggeration","grim comic understatement","accidental ambiguity","religious symbolism"],1,"A murder is recorded as a modest gain in population — the narrator’s darkest, driest joke."],
      ["What is implied by remorse following Tom home ‘and getting into bed beside him’?",["Huck sleeps at Tom’s house","His guilt is now a constant, intimate companion","Aunt Polly suspects the truth","Tom dreams of the doctor"],1,"Personified remorse will share his nights from now on — silence has a price payable daily."]
    ],
    tf:[
      ["Huck’s wart cure requires the dead cat to be thrown after the departing devils.",true,"The cat, thrown after them, draws the warts along ‘in some fashion no one thought to question’."],
      ["Doctor Robinson is in the graveyard that night on lawful business.",false,"He has hired two men to exhume a fresh corpse for his anatomy studies."],
      ["Muff Potter is unconscious at the moment the doctor is stabbed.",true,"He is knocked senseless with a grave-board before Joe seizes his fallen knife."],
      ["Injun Joe’s grievance concerns something the doctor did to him that same week.",false,"The insult is years old — the doctor’s family once drove him from their kitchen door."],
      ["Potter asks Injun Joe what happened because he genuinely cannot remember.",true,"He swims up out of his stupor to a corpse, a red knife and no memory — and believes what he is told."],
      ["The boys seal their oath with ink borrowed from the schoolhouse.",false,"Each signature is sealed in blood squeezed from a pricked thumb."]
    ],
    writing:[
      {task:"Essay: ‘Fear can make silence feel like the only choice.’ Discuss whether Tom and Huck deserve blame for their oath of silence, considering both their terror and Muff Potter’s danger.",target:"150–190 words",
        tips:["Weigh the boys’ age and real peril against the cost of their silence.","Distinguish between understanding a choice and excusing it.","Use the blood oath itself as evidence of how they experienced the dilemma."],
        starters:["Two children watched a murder and chose ceremony over confession.","Before condemning Tom and Huck, it is worth asking what speaking would have cost them.","Silence is rarely neutral; in St. Petersburg it nearly hanged an innocent man.","The oath was written in blood, but it was signed in fear."]},
      {task:"Report: Write the account of the graveyard events that Tom might secretly have drafted for himself — a witness report stating precisely what he saw, in order, and carefully separating observation from assumption.",target:"150–190 words",
        tips:["Use headings or clear sequencing — reports value order over drama.","Keep the tone factual; let the horror come from the details themselves.","Mark clearly which statements are seen and which are inferred."],
        starters:["At approximately midnight, the witness and one companion entered the graveyard.","This report records the events of the night as accurately as memory allows.","Three men arrived carrying a lantern, a rope and two spades.","What follows was observed from behind the elms at a distance of some yards."]}
    ]},

  { n:4, title:"The Young Pirates",
    sum:"Rejected — as they see it — by the world, Tom, Joe Harper and Huck desert civilisation for Jackson’s Island to live as pirates, while the town drags the river for their bodies and mourns them as drowned.",
    vocab:[
      ["IDYLL","a blissfully happy and carefree episode or place"],
      ["RENEGADE","a person who deserts the rules or society they belonged to"],
      ["PROVISIONS","supplies of food gathered for a journey"],
      ["RAPTURE","a state of intense, overwhelming delight"],
      ["SOLITUDE","the state of being alone, especially by choice"],
      ["NOSTALGIA","an aching longing for home or for the past"],
      ["TEMPEST","a violent and dramatic storm"],
      ["MUTINY","open rebellion against a captain or leader"],
      ["PANG","a sudden sharp stab of emotion or pain"],
      ["IMPROVISE","to make or do something with whatever is at hand"],
      ["MAROONED","left isolated with no means of leaving, as on an island"],
      ["VAGABOND","a wanderer who has no settled home"]
    ],
    comp:[
      ["What does the narrator suggest about the boys’ reasons for running away?",["They face genuine cruelty at home","Their grievances are mostly flimsy — the adventure is the real motive","They are fleeing Injun Joe","They have been expelled from school"],1,"Joe’s ‘injustice’ is cream he did not steal ‘this time’; Huck needs no injustice at all, ‘merely an invitation’."],
      ["Why does the stolen food taste better than any food ever had?",["Island air improves appetite","It is seasoned with theft and freedom","Huck is an excellent cook","They have never eaten fried fish before"],1,"The narrator notes food tastes best ‘when it is seasoned with theft and freedom’ — the crime is the spice."],
      ["What is comic about the boys’ conscience over the bacon?",["Pirates in training are ashamed of a petty theft","They return the bacon secretly","They blame each other loudly","Huck refuses to eat it"],0,"Aspiring buccaneers, professionally committed to crime, pray privately over some borrowed bacon."],
      ["The ‘proudest moment of their lives’ — being mourned as drowned — is undercut by…",["fear of punishment on returning","the thought of what their mothers are suffering","Huck’s indifference to the town","the cannon frightening them"],1,"The pang of ‘what mothers might be doing with that news arrived uninvited’ — glory and guilt share a border."],
      ["What does Joe Harper’s drift toward mutiny reveal?",["He was never loyal to Tom","Homesickness lives just beneath the pirate performance","He fears the storm is an omen","He wants to lead the expedition himself"],1,"The pirate costume is thin: one hard evening and Joe simply wants his mother."],
      ["Tom writing a name in the sand and scuffing it out suggests…",["he is practising his handwriting","his own nostalgia has an object he will not admit","he is leaving a message for rescuers","he has forgotten how to spell"],1,"He writes ‘a certain name’ and erases it angrily — Becky follows him even into exile."],
      ["What actually keeps the expedition together in the end?",["Fear of punishment at home","Tom’s secret plan and its promise of theatre","The island’s comforts","Huck’s authority over the others"],1,"Not courage but theatre: one whispered plan ‘restored the company’s loyalty entire’."],
      ["The narrator’s final attitude to the boys’ freedom is that it…",["is the happiest state a boy can know","grows heavy when there is nobody to forbid anything","should be forbidden by law","belongs only to Huck"],1,"The chapter turns on the discovery of ‘how heavy freedom can become when there is nobody to forbid it’."]
    ],
    tf:[
      ["Huck joins the expedition because of an injustice suffered at home.",false,"Huck ‘required no injustice at all, merely an invitation’ — he has no home to be unjust to him."],
      ["The raft responds promptly to the boys’ nautical commands.",false,"They issue solemn orders ‘to which the raft paid no attention whatever’."],
      ["At least some of the pirates pray secretly on the first night.",true,"Conscience opens after dark; they say their prayers privately, ‘lest heaven notice the omission’."],
      ["The ferryboat’s cannon is fired as a signal aimed at scaring the runaways.",false,"Firing a cannon over the water was the approved method of raising a drowned body — the town believes them dead."],
      ["Joe Harper is the first of the three to weaken and want to go home.",true,"He drifts ‘toward the shameful edge of mutiny’ and is jeered back into piracy — temporarily."],
      ["The reader is told Tom’s secret plan as soon as he returns from his night errand.",false,"‘History does not tolerate a spoiled surprise, so the plan must wait a chapter.’"]
    ],
    writing:[
      {task:"Informal letter: Write the letter Joe Harper composes to his mother on Jackson’s Island but never sends — why he left, what pirate life is actually like, and what he misses most.",target:"150–190 words",
        tips:["Let the bravado of the opening collapse gradually into honesty.","Include one vivid sensory detail of island life — storm, fish, firelight.","End on the reason the letter was never sent."],
        starters:["Dear Mother, by the time you read this I shall be a pirate of some reputation.","I want you to know that I left for excellent reasons, most of which I have forgotten.","The island is everything we hoped, which is a harder sentence to write than I expected.","You will have heard by now that I am drowned. I am not."]},
      {task:"Proposal: As Tom Sawyer, write a proposal addressed to future runaways recommending Jackson’s Island as a pirate headquarters — location, provisions, daily programme and rules — including one honest section on drawbacks.",target:"150–190 words",
        tips:["Use headed sections and confident, persuasive language, as proposals do.","Recommend concrete arrangements, not vague enthusiasm.","Let the ‘drawbacks’ section quietly undermine the glamour — storms, conscience, mothers."],
        starters:["This proposal sets out the case for Jackson’s Island as a permanent base for piracy.","Future runaways deserve better planning than we enjoyed; hence this document.","The site: three miles below town, wooded, uninhabited and entirely ours.","Any programme of successful piracy must begin with the question of bacon."]}
    ]},

  { n:5, title:"Back from the Dead",
    sum:"St. Petersburg mourns its drowned boys; Tom slips home by night to eavesdrop on his own grief, then stages the ultimate entrance — resurrection at their own funeral, timed to the very summit of the town’s sorrow.",
    vocab:[
      ["BEREAVED","mourning the recent death of a loved one"],
      ["LAMENT","a passionate expression of grief or sorrow"],
      ["EAVESDROP","to listen secretly to a private conversation"],
      ["CONTRITION","sincere sorrow and guilt for one’s own fault"],
      ["RESURRECTION","a rising or return from the dead"],
      ["AUDACITY","shameless, breathtaking daring"],
      ["THEATRICAL","exaggerated and staged for dramatic effect"],
      ["EULOGY","a speech of high praise for someone who has died"],
      ["POIGNANT","sharply touching to the emotions; movingly sad"],
      ["SOLACE","comfort or consolation in a time of distress"],
      ["PRODIGAL","recklessly wasteful; a wanderer who returns repentant"],
      ["VANITY","excessive pride in oneself or one’s importance"]
    ],
    comp:[
      ["How does presumed death change the boys’ reputations?",["The town remembers them accurately","Grief revises their biographies — crimes become promise","They are blamed for their own drowning","Only Huck is mourned"],1,"Boys once switched for playing with Tom now recall him tenderly; ‘grief had done what nothing else could’."],
      ["Why does the bark message go back across the river undelivered?",["Tom cannot find a pen","A grander, more theatrical idea has seized him","Aunt Polly is not at home","Sid intercepts it"],1,"Comforting his aunt would spoil the show; the resurrection needs her grief intact."],
      ["What does eavesdropping on his own obituary reveal about Tom?",["He is checking whether it is safe to return","His vanity can feed even on other people’s grief","He wants to correct the facts","He feels no affection for Aunt Polly"],1,"He finds his obituary ‘excellent’ — mourning becomes his favourite review."],
      ["Why is the funeral sermon described as ‘generous’?",["It lasts an unusually long time","It converts the boys’ faults into virtues in disguise","It mentions all three boys equally","It forgives the congregation’s sins"],1,"The eulogy discovers ‘sweet, generous, misunderstood natures’ where the town had recorded only crime."],
      ["The congregation weeping, laughing and furious at once suggests…",["the trick has genuinely divided the town","joy and outrage can share a single moment","the minister has lost control of the service","the boys are not truly forgiven"],1,"Old Hundred is sung by people doing all three simultaneously — the town’s feelings refuse to queue."],
      ["Why does Aunt Polly choose to believe the story of the kiss?",["Sid confirms it happened","She needs the comfort more than she needs the proof","Tom produces a witness","The minister vouches for the dream"],1,"The kiss is ‘offered without a witness in the world’ — she believes it because she needs to."],
      ["What does ‘only its vanity had been buried’ imply about the town?",["The town suffered no real loss and rather enjoyed the funeral","The funeral was cancelled","The town will never forgive Tom","The town’s grief was entirely false"],0,"The town forgives the prodigal easily — it got a magnificent funeral and lost nothing but its dignity."],
      ["What makes Tom’s plan ‘heartless, theatrical, and irresistible’ at the same time?",["It requires the boys to lie under oath","It buys him glory at the price of a week of others’ real grief","It endangers Becky","It breaks the blood oath"],1,"The audience’s sorrow is genuine; the entrance built upon it is pure, cruel showmanship — and it works."]
    ],
    tf:[
      ["The search for the boys’ bodies is still under way on Saturday.",false,"The search has been given up; the Sunday sermon is to double as their funeral."],
      ["Tom listens to his family’s grief from beneath a bed in his own house.",true,"He crosses the river, slips home and lies hidden while Polly, Mrs. Harper and Sid mourn by candlelight."],
      ["Tom leaves the bark scroll behind so that Aunt Polly will know he is alive.",false,"The grander idea seizes him and the bark goes back across the river in his pocket."],
      ["Huck is included in the embraces at the church only because Tom insists.",true,"Huck, ‘who belonged to nobody’, is hauled into the general embrace at Tom’s insistence."],
      ["The doxology is proposed by the minister once order is restored.",false,"Somebody in the crowd shouts for it, and Old Hundred goes up with rafter-shaking force."],
      ["Aunt Polly’s forgiveness rests partly on evidence she cannot verify.",true,"The kiss has no witness; she chooses belief over proof because she needs the solace."]
    ],
    writing:[
      {task:"Article: Write a report-style article for the town newspaper entitled ‘The Funeral That Ended in Applause’, covering the service, the entrance of the three boys, and the townspeople’s divided reactions.",target:"150–190 words",
        tips:["Open with the most dramatic moment, then reconstruct events for the reader.","Quote one imagined witness — articles love a voice from the pews.","Keep the reporter’s tone straight; let the absurdity speak for itself."],
        starters:["St. Petersburg buried three boys on Sunday and shook hands with all of them by noon.","The funeral began in tears and ended in the loudest doxology this church has known.","Witnesses agree the door creaked at the precise summit of the sermon.","Not every congregation applauds at a funeral; ours now has."]},
      {task:"Essay: ‘Tom’s trick was cruel, whatever its brilliance.’ Discuss, weighing the week of needless grief against the town’s joy at the resurrection — and decide whether an ending can excuse its means.",target:"150–190 words",
        tips:["Acknowledge the theatrical brilliance before judging the cruelty — concession strengthens argument.","Consider Aunt Polly’s suffering as the strongest evidence for the prosecution.","Commit to a verdict in your final paragraph."],
        starters:["No one disputes that the entrance was magnificent; the question is what it cost.","For one week, real people grieved so that one boy could enjoy his own funeral.","Brilliance and cruelty are not opposites, and Tom’s plan proves it.","The town forgave Tom almost instantly — which may be the strangest fact of all."]}
    ]},

  { n:6, title:"Muff Potter’s Trial",
    sum:"Muff Potter stands trial for the murder of Doctor Robinson while the true culprit sits calmly in court. Tom breaks the blood oath and testifies — and Injun Joe goes through the courtroom window and vanishes.",
    vocab:[
      ["TESTIMONY","a formal statement given as evidence in court"],
      ["VERDICT","the formal decision reached by a jury"],
      ["PROSECUTION","the lawyers attempting to prove a defendant’s guilt"],
      ["ACQUIT","to declare a defendant not guilty of a charge"],
      ["CONSCIENCE","the inner sense of what is right and wrong"],
      ["INTIMIDATION","the use of fear to control another person"],
      ["GALLOWS","the wooden frame on which criminals were hanged"],
      ["EXONERATE","to clear someone officially of all blame"],
      ["TORMENT","severe and prolonged mental suffering"],
      ["FUGITIVE","a person who is fleeing from arrest or capture"],
      ["DELIBERATION","the careful weighing of evidence before deciding"],
      ["PARIAH","a person despised and rejected by society; an outcast"]
    ],
    comp:[
      ["Why does Tom take to tying his jaw shut at night?",["A toothache is troubling him","He fears his sleep-talking will betray the secret","Aunt Polly has ordered it","He is imitating Muff Potter"],1,"He talks in his sleep ‘alarmingly’ — the secret is trying to escape while his guard is down."],
      ["Why do the gifts of tobacco and matches make Tom feel worse rather than better?",["Muff refuses to accept them","Potter’s gratitude comes from the man Tom’s silence is condemning","Huck mocks the gesture","They are stolen goods"],1,"Being called the best of friends by the man you are letting hang is ‘arithmetic a boy cannot do’."],
      ["What is implied about the jury’s deliberation?",["It lasted several days","It was essentially ceremonial — the town decided weeks earlier","It ended in disagreement","It was unusually careful"],1,"The real deliberation ‘had been completed weeks before over back fences’; the courtroom merely records it."],
      ["Why does the defence’s passivity bewilder the courtroom?",["The lawyer appears to be asleep","No one suspects he is saving a surprise witness","He has quarrelled with Potter","He believes Potter is guilty"],1,"Declining to cross-examine looks like surrender; in fact the defence is holding Tom Sawyer in reserve."],
      ["What finally defeats the blood oath?",["Huck releases Tom from it","Tom’s conscience proves stronger than his terror","The lawyer discovers it","Injun Joe leaves town"],1,"The oath ‘lost its battle with his conscience at last’ — Tom goes to Potter’s lawyer by night."],
      ["What does Injun Joe’s leap through the window demonstrate?",["The court is poorly guarded","Flight is a confession the law never gets to read aloud","He intends to surrender later","He fears Muff Potter’s revenge"],1,"He is gone ‘like something poured’ before the verdict — his escape convicts him more surely than the jury could."],
      ["The town’s swing from gallows to handshakes shows that its opinions are…",["carefully reasoned","as passionate as they are reversible","controlled by the judge","permanently divided"],1,"The same citizens ready to watch Potter hang now compete to congratulate him, ‘with an enthusiasm exactly proportional to their previous certainty’."],
      ["Why is Huck ‘entirely satisfied’ to share the terror without the fame?",["He is jealous of Tom","Anonymity is protection — fame would put Injun Joe on his trail too","He plans to testify later","He dislikes newspapers"],1,"His name stayed out of it; where a vengeful fugitive is concerned, obscurity is the better prize."]
    ],
    tf:[
      ["Tom and Huck bring small comforts to Muff Potter in jail.",true,"They slip tobacco and matches to him — gifts that ease their consciences ‘no more than they eased his sentence’."],
      ["Injun Joe gives sworn testimony that becomes the accepted account of the murder.",true,"His version, ‘delivered twice under oath with perfect calm’, stands as the official truth."],
      ["The defence aggressively cross-examines every prosecution witness.",false,"To general bewilderment, the defence declines to cross-examine anyone — until it calls Tom."],
      ["Tom first tells the whole story to Potter’s lawyer on the night before he testifies.",true,"His testimony ‘had been given in secret to Potter’s lawyer the night before’."],
      ["Injun Joe is recaptured within days of his escape.",false,"The pursuit is loud, official and entirely unsuccessful; he vanishes into river country."],
      ["Tom’s new fame puts an end to his fear of Injun Joe.",false,"His days are glittering, but in his nights Joe stands at the window, ‘patient as weather’."]
    ],
    writing:[
      {task:"Report: As a visiting court reporter for a city newspaper, write an account of the Potter trial — the prosecution’s case, the surprise testimony, and the escape — ending with the question the town is now asking itself.",target:"150–190 words",
        tips:["Order the events as the courtroom experienced them, surprise included.","Keep reporter’s distance: attribute opinions to the townspeople, not to yourself.","Close with the unresolved threat — a good report knows what it cannot yet answer."],
        starters:["The trial of Muff Potter ended yesterday in the strangest scene this correspondent has witnessed.","For two days the case against the prisoner was built brick by brick.","The defence called a single witness, aged approximately twelve.","Somewhere beyond the river tonight is a man this town convicted too late."]},
      {task:"Essay: Write an essay on moral courage, examining what finally made Tom speak at the trial and whether speaking late deserves less credit than speaking at once.",target:"150–190 words",
        tips:["Define moral courage in your first paragraph — courage with an audience of one’s own fears.","Use Tom’s months of torment as evidence that the delay had a cost he paid nightly.","Weigh ‘late’ against ‘never’ explicitly before concluding."],
        starters:["Courage is usually pictured at the moment of action; Tom Sawyer’s began months earlier.","There are two clocks in every act of conscience: when we know, and when we speak.","An innocent man nearly hanged because two boys were afraid — and was saved because one stopped being.","It is easy to say Tom should have spoken sooner; it is harder to say we would have."]}
    ]},

  { n:7, title:"Looking for Treasure",
    sum:"Treasure fever sends Tom and Huck digging under dead trees and, at last, into a haunted house — where a disguised Injun Joe unearths a box of gold and names a hiding place the boys will not forget: Number Two, under the cross.",
    vocab:[
      ["AVARICE","insatiable greed for wealth"],
      ["DERELICT","abandoned by its owners and falling into ruin"],
      ["HOARD","a hidden store of money or valuables"],
      ["FOLKLORE","the traditional beliefs and stories of a community"],
      ["WINDFALL","a sudden and unearned piece of good fortune"],
      ["MASQUERADE","a false show or disguise of one’s identity"],
      ["LURK","to wait hidden, usually with bad intentions"],
      ["HENCHMAN","a criminal’s loyal and unquestioning helper"],
      ["VIGIL","a watchful wait kept during normal sleeping hours"],
      ["RANSACK","to search a place roughly and thoroughly"],
      ["OMINOUS","giving the worrying impression that something bad is coming"],
      ["MISGIVING","a feeling of doubt or apprehension about what may happen"]
    ],
    comp:[
      ["What does the treasure folklore reveal about the boys’ expedition?",["It is based on a real map","Their confidence is total and their information nonexistent","Huck has done this before","The town encourages such digging"],1,"They begin ‘with high hearts, borrowed tools, and no information whatever’ — folklore supplies certainty, not facts."],
      ["What does Huck’s dream of pie and a red necktie every day suggest?",["He has expensive tastes","The modest scale of what poverty has taught him to want","He is mocking Tom’s plans","He intends to leave town"],1,"Beside Tom’s sword, drum and wedding, Huck’s entire ambition costs a few cents — a quiet portrait of his life."],
      ["Why is superstition suddenly ‘negotiable’ at the haunted house?",["The house is not really haunted","Greed outweighs fear when gold may be involved","It is Sunday, so ghosts rest","Huck has a protective charm"],1,"They venture in by daylight, ‘superstition being negotiable when gold is involved’ — avarice renegotiates terror."],
      ["What single detail destroys the Spaniard’s masquerade?",["His green goggles slip","His voice","His companion names him","The boys recognise his knife"],1,"Serape and goggles survive; then ‘the Spaniard spoke, and the voice was Injun Joe’s’."],
      ["Why can the boys not simply claim the gold they have seen?",["The law forbids found treasure","It is in the hands of the one man they most fear","The box is too heavy to lift","It belongs to the ragged stranger"],1,"Fate hands the hoard ‘to the one man in Missouri the boys could not simply rob back’."],
      ["What nearly betrays the boys’ presence in the house?",["A sneeze from upstairs","Fresh earth on their abandoned tools","Their footprints on the stairs","Huck’s dropped hat"],1,"Joe’s misgiving begins with the tools and the fresh earth on them — someone has been digging here."],
      ["Why is the staircase collapse called an ‘act of pure mercy’?",["It kills the ragged stranger","Chance saves the boys where courage could not","It reveals the second treasure","It traps Injun Joe permanently"],1,"Joe is climbing toward discovery when the stairs give way — the narrative spares its spies by accident."],
      ["How has treasure-hunting changed by the end of the chapter?",["It has become legal","A murderer now stands quietly at the centre of the game","The boys have abandoned it","It has made the boys rich"],1,"What began as ‘the sunniest of games’ now has Injun Joe in the middle of it — and he is hunting too."]
    ],
    tf:[
      ["The boys’ first excavations are guided by reliable information.",false,"They are guided by folklore — dead trees, midnight, ghosts — and by no information whatever."],
      ["Huck can be recruited by almost any scheme promising wealth without work.",true,"‘Huck could always be recruited by any scheme promising wealth without work.’"],
      ["The ragged stranger spots the boys hiding on the upper floor.",false,"The boys watch through knotholes, unseen; it is their tools, not their faces, that rouse suspicion."],
      ["Injun Joe discovers the gold while meaning only to bury his own silver.",true,"Turning up a hearthstone to hide their loot, the men strike someone else’s iron box instead."],
      ["Before leaving the house, the boys learn exactly where ‘Number Two’ is.",false,"The henchman knows the place; the boys, memorising the words through the knothole, do not."],
      ["Tom keeps a night watch on a tavern room numbered two.",true,"He keeps ‘an uneasy vigil’ on the tavern whose room bears that number — and finds only whisky and dread."]
    ],
    writing:[
      {task:"Proposal: As Tom, write a proposal for the treasure-recovery operation: what is known for certain, what ‘Number Two — under the cross’ might mean, recommended next steps, and the risks — one of whom has a knife.",target:"150–190 words",
        tips:["Separate confirmed facts from guesses in labelled sections.","Make each recommendation specific: who watches, where, and when.","Treat the risk section seriously — this proposal’s reader could be killed."],
        starters:["This proposal concerns the recovery of a treasure seen, counted by ear, and lost.","Known facts: one iron box, gold coin in the thousands, and four terrible words.","‘Number Two’ admits at least two interpretations, and we have tried the wrong one first.","Any plan must begin from one premise: Injun Joe is watching for us too."]},
      {task:"Article: Write a feature article entitled ‘Treasure Fever’ on why stories of buried gold can grip an entire community, using St. Petersburg — its boys, its haunted houses, its folklore — as your case study.",target:"150–190 words",
        tips:["Open with a striking image of the fever at work before analysing it.","Offer at least one explanation: poverty, boredom, or the charm of the unearned.","Return to your opening image in the final line for a rounded finish."],
        starters:["No epidemic spreads through a river town faster than the rumour of buried gold.","Every community keeps two maps: one of its streets, one of its imagined treasures.","It begins with a dead tree, a midnight, and a boy with a borrowed spade.","The gold does not need to exist; the digging happens anyway."]}
    ]},

  { n:8, title:"Lost in the Cave",
    sum:"A picnic ends with Tom and Becky lost in the dark labyrinth of McDougal’s Cave — where Injun Joe is hiding. Escape, a sealed door, a dead villain, twelve thousand dollars under the cross, and a widow who undertakes to civilise Huck.",
    vocab:[
      ["LABYRINTH","a bewildering maze of paths or passages"],
      ["SUBTERRANEAN","existing or happening beneath the earth’s surface"],
      ["ORDEAL","a prolonged and severe trial of endurance"],
      ["PREDICAMENT","a difficult situation offering no easy way out"],
      ["FAMISHED","suffering from extreme hunger"],
      ["DELIRIOUS","confused and raving, as from fever or exhaustion"],
      ["FORTITUDE","courage and strength under prolonged suffering"],
      ["PERSEVERANCE","steady persistence in spite of difficulty"],
      ["ENTOMB","to enclose or trap as if in a grave"],
      ["GRUESOME","horrifying and repellent, especially through violence"],
      ["BENEFACTOR","a person who gives generous help or money to another"],
      ["RESPECTABILITY","the condition of being approved of by polite society"]
    ],
    comp:[
      ["How does the ferry’s departure endanger Tom and Becky?",["The captain miscounts deliberately","An assumption does the work of a fact — no one checks","Becky asks to stay behind","The boat leaves early"],1,"‘Someone was sure’ they were with Mrs. Harper’s party; certainty without checking loses two children for a night and a day."],
      ["Why does Tom blow out Becky’s candle?",["To hide from Injun Joe","To ration their light against a long predicament","Because the smoke is dangerous","To signal the searchers"],1,"Hope has become a supply problem: candles are time, and Tom is now the keeper of both."],
      ["What does Tom’s ‘certainly’, spoken without belief, show?",["He has stopped thinking clearly","Protective lying can be a form of fortitude","He knows the way out already","He is mocking Becky’s fear"],1,"He does not believe they will get out, and says ‘certainly’ so well his voice ‘almost believed itself’ — courage on her behalf."],
      ["Why does Injun Joe run from Tom in the cave?",["He mistakes him for a search party","The echoing shout unnerves him and he never learns whose voice it was","He is unarmed","He recognises Tom and fears witnesses"],1,"The fugitive flees the echo; the irony is that the one voice he would most want silenced goes unrecognised."],
      ["What is the central irony of the boiler-iron door?",["It was installed by Judge Thatcher","A measure meant to protect children entombs the villain","It fails to keep anyone out","Tom asked for it to be built"],1,"Public safety, not justice, kills Injun Joe — sealed in ‘by an accident’ of good intentions."],
      ["What does the broken knife at the sill tell us about Joe’s final days?",["He died quickly and painlessly","He fought the door with desperate persistence before starving","He was attacked inside the cave","He tried to dig for the treasure"],1,"The blade broken against the sill, the gruesome remnants of candles and bats — the evidence measures a slow, stubborn dying."],
      ["Why does the town begin dismembering haunted houses plank by plank?",["To prevent further tragedies","Treasure fever — the boys’ fortune convinces everyone that gold hides everywhere","To find Injun Joe’s accomplice","On the judge’s orders"],1,"Twelve thousand real dollars make every legend briefly true; the town ransacks its own folklore."],
      ["Why does Huck compare respectability to imprisonment?",["The widow locks the doors at night","Civilisation’s comforts are constraints to a boy raised free","He misses the money","Tom has abandoned him"],1,"Clean sheets, cutlery and prayers are walls to Huck — the widow’s kindness costs him his liberty."]
    ],
    tf:[
      ["The children’s absence is discovered on the evening of the picnic itself.",false,"The assumption holds all night; ‘it was Sunday morning before the town learned otherwise’."],
      ["Tom and Becky ration both the wedding-cake and their candlelight.",true,"The cake is shared ‘like a sacrament’ and the candles guarded — supplies against a lengthening dark."],
      ["Injun Joe realises that the voice shouting in the cave belongs to Tom.",false,"He flees the echo ‘never knowing whose voice it was’."],
      ["Tom finds the way out while exploring side passages with a kite-line.",true,"Line after line, passage after passage, until a far speck of daylight opens on the Mississippi."],
      ["The cave is sealed as a deliberate trap for Injun Joe.",false,"The door is fitted so no more children will be lost; nobody knows Joe is inside until Tom speaks."],
      ["The cross that marks the treasure is located inside the cave.",true,"Number Two was never the tavern: the cross is smoked on a rock deep in the cave, near Tom’s exit."]
    ],
    writing:[
      {task:"Informal letter: As Becky Thatcher, write to a friend in Constantinople describing the days lost in McDougal’s Cave — the dark, the hunger, the fear — and how your opinion of Tom Sawyer changed underground.",target:"150–190 words",
        tips:["Choose two or three sensory details and let them carry the horror.","Trace the change in your view of Tom through specific moments, not adjectives.","Keep the voice a young girl’s — honest, a little proud, still shaken."],
        starters:["You will have read about us in the newspapers, but the newspapers were not there.","I used to think Tom Sawyer was mostly noise. I owe him an apology.","The worst part was not the hunger; it was when the last candle went.","Three days is a short time on a calendar and a very long time in the dark."]},
      {task:"Essay: ‘Huck was freer before he was rescued.’ Discuss whether the Widow Douglas’s adoption of Huck is truly a happy ending, weighing security and care against the liberty he loses.",target:"150–190 words",
        tips:["Define what freedom actually meant in Huck’s old life — including its hunger and dangers.","Consider the widow’s perspective as a genuine benefactor, not merely a jailer.","Conclude by saying what ‘happy ending’ should mean, and whether this is one."],
        starters:["The richest boy in St. Petersburg spent his first respectable week planning his escape.","Rescue is a curious word for what happened to Huckleberry Finn.","Clean sheets, regular meals, prayers before supper: the inventory of a kindness or of a cell?","Every civilisation believes it is doing the wild a favour."]}
    ]}
];

const READINGS = {
1:[
"St. Petersburg drowsed on the bank of the Mississippi, a small town entirely satisfied with itself, where everyone’s business was public property and virtue was measured chiefly by attendance at church. In this kingdom of respectable dullness lived Tom Sawyer, an orphan lodged with his Aunt Polly — a soft-hearted woman who armed herself with spectacles and scripture and lost every battle she fought with him. She believed that sparing the rod would ruin the boy; she also believed, more privately, that he was the image of her dead sister, which is why the rod so seldom actually fell.",
"His days were a catalogue of small crimes conducted with great artistry. He raided the jam closet, went swimming when he was presumed at school, and fought a too-well-dressed newcomer purely on principle. Aunt Polly, catching him at last with the evidence sewn into his collar — or rather, conspicuously not sewn — pronounced sentence: Saturday, the freest and sweetest day of a boy’s week, would be spent whitewashing thirty yards of board fence, nine feet high. To Tom the punishment was not labour but public indignity, and life, he decided, was hollow and hardly worth the trouble of living.",
"Saturday arrived, bright and mocking. All the summer world seemed to be on holiday except one boy with a bucket of whitewash and a long-handled brush. Tom surveyed the fence, and a deep melancholy settled upon him: the drudgery stretched ahead of him like a continent, and worse, the boys of the village would soon come skipping past, free as birds, to sneer at the prisoner. After long contemplation he emptied his pockets and inspected his worldly wealth — toy fragments, marbles, glorious trash — enough to buy perhaps ten minutes of another boy’s labour, nowhere near enough to buy half an hour of freedom.",
"Then, at this dark and hopeless moment, inspiration burst upon him — nothing less than a stroke of genius, or at any rate of ingenuity, which in Tom amounted to the same thing. When Ben Rogers came along, munching an apple and playing at being a steamboat, Tom was painting with the absorbed nonchalance of an artist before a canvas. He stepped back, surveyed his work, added a delicate touch, surveyed it again. Whitewashing, his whole manner announced, was not work at all: it was a rare and elevated pleasure. Did a boy get a chance to whitewash a fence every day?",
"Ben scoffed, then wavered, then began to covet the brush with all his soul. He offered the core of his apple; Tom refused. He offered the whole apple, and Tom, with visible reluctance, agreed to relinquish the brush — briefly, and strictly as a personal favour. By mid-afternoon a procession of boys had paid handsomely for the same privilege: a kite, a dead rat on a string, twelve marbles, a brass doorknob, a one-eyed kitten. The fence wore three gleaming coats of whitewash, and Tom, who had done almost nothing whatever, sat in the shade counting a considerable fortune.",
"He had discovered, without knowing it, a great law of human action: that in order to make a man or a boy covet a thing, it is only necessary to make the thing difficult to attain. Work is whatever a body is obliged to do; play is whatever a body is not obliged to do — and the shrewd may convert the one into the other with a little guile and good stage management. Aunt Polly, inspecting the dazzling fence, was astonished into rewarding him with an apple. Tom strolled off prosperous and entirely at peace, a small capitalist who had never once touched a brush in anger."
],
2:[
"Sunday morning scrubbed St. Petersburg pink and marched it to church. At Sunday school, piety was administered on a strict accounting system: two verses recited earned a blue ticket, ten blues a red, ten reds a yellow, and ten yellow tickets could at last be exchanged for a plainly bound Bible, presented before the whole congregation with tremendous pomp. The system was designed to encourage memory and holiness; what it actually encouraged was commerce. Boys of genuine devotion took two years to earn a Bible. Boys of genius — and Tom was one — perceived at once that tickets, like any currency, could simply be bought.",
"Tom arrived rich from the fence affair and set up shop on the chapel steps. A licorice stub bought a blue ticket; a fish-hook bought three; his most dubious treasures were transformed, by patient barter, into the accumulated righteousness of a dozen boys who had actually learned their verses — while he had learned none. It should be recorded, in fairness, that Tom had once attempted scripture himself. He had set out upon the Sermon on the Mount, selecting the shortest verses available, on the sensible ground that if eternity was the reward, efficiency could hardly be a sin.",
"That morning the school glittered, for a personage had come: Judge Thatcher, an illustrious visitor from Constantinople — twelve miles away — accompanied by his family. The superintendent, aching to exhibit a prodigy before such greatness, asked whether any scholar had earned a Bible, and Tom Sawyer stepped forward with his tickets. The announcement fell like a thunderclap. Here was prestige beyond dreaming: the idlest boy in the school elevated, before the entire devout assembly, to the rank of saint. The other boys were eaten alive with envy — especially those who recognised, too late, that their own traded tickets had built the glory they now had to applaud.",
"Then came the ceremony’s fatal flourish. The Judge, laying a kindly hand on Tom’s head, called him a fine little man and asked him — surely he could say — to name the first two disciples. The silence stretched. Tom studied the floor, which offered nothing. Commanded gently to answer, with the Judge waiting and the whole school waiting, he drew a breath and announced: David and Goliath. Let us draw the curtain of charity over the rest of the scene, as the school itself hurried to do. The mortification would have destroyed a lesser boy; Tom’s humiliation lasted very nearly until lunchtime.",
"It must be admitted that Tom’s performance that morning had one particular audience in mind. A new family had come to town, and with it a girl: Becky Thatcher, blue-eyed, yellow-haired, and instantly fatal. Tom saw her and was smitten on the spot. The great passion of his life to that date, one Amy Lawrence, evaporated from his heart so completely that he could scarcely remember having loved her at all — and they had been engaged. He worshipped this new angel by every means available to him, which is to say by showing off in ways that bordered on lunacy.",
"What that Sunday chiefly demonstrates, perhaps, is that St. Petersburg’s religion had a form and a spirit, and the town greatly preferred the form. The congregation endured the sermon by counting its pages; the choir giggled through the anthem as usual; a poodle’s battle with a beetle drew the only sincere attention of the entire service, and even the venerable minister could not compete with it. Tom, whose spectacle at the prize-giving had at least been honest commerce, does not come out of the comparison so badly. He had cheated openly and been caught publicly, which in that town passed for a kind of integrity."
],
3:[
"Huckleberry Finn was the town’s official outcast: son of the drunkard, sleeper in empty barrels, wearer of a grown man’s cast-off clothes, and envied desperately by every respectable boy in St. Petersburg. Mothers dreaded him precisely because their sons adored him. Huck’s education came not from school but from superstition, and on the subject of removing warts he was a recognised scholar. The approved method required a dead cat, a fresh grave and midnight — for it is at midnight that devils come to fetch the wicked dead, and the cat, thrown after them, draws the warts along in some fashion no one thought to question.",
"So it happened that midnight found two small boys crouched behind the elms of the graveyard, a dead cat between them, waiting hopefully for devils. The place suited the errand: a neglected, weed-grown acre on a hill, its wooden markers leaning as if tired, the wind moaning low in the grass. Every sound became an omen. The boys conversed in whispers about the dead beneath them, and whether the dead minded being discussed, and the solemnity of the hour pressed upon them until their hearts hammered. Then real voices came murmuring through the dark — human ones — which was somehow far more terrifying than devils.",
"Three figures approached with a lantern, a rope and spades: young Doctor Robinson, and two men he had hired for grim night-work — Muff Potter, the amiable town drunkard, and a half-breed called Injun Joe, whom the town feared with excellent reason. Their business was to exhume a fresh corpse for the doctor’s anatomy studies: a macabre trade conducted by respectable science through disreputable hands. The digging done, the hired men demanded extra money. But Injun Joe’s grievance ran deeper than wages. Years before, the doctor’s family had driven him from their kitchen door like a beggar, and he had nursed his vengeance ever since.",
"What followed took less than a minute and lasted the boys the rest of their lives. Potter fought the doctor and was knocked senseless with a grave-board; Injun Joe, seizing Potter’s fallen knife, drove it into Robinson’s chest as the young man stood over his unconscious partner. Then, with unhurried treachery, he placed the dripping knife in Potter’s open hand and sat down to wait. The boys fled, running through the dark until their lungs burned, each privately convinced that the murder had been visible from every window in town. Behind them the graveyard kept its old silence, one occupant richer.",
"Potter swam up out of his stupor to find a corpse beside him, a knife — his own — red in his hand, and Injun Joe’s steady eyes upon him. What happened, Joe? he begged, and the half-breed told him, gently and regretfully: Potter had done it himself, drink-mad, with his own blade. The wretched man believed it. That is the masterstroke a true culprit can achieve — persuading his victim to confess in his heart to the crime. Potter pleaded with Joe to tell no one, and Joe promised, with the warm sincerity he reserved exclusively for lies.",
"In a disused tannery the two witnesses faced what they knew. To speak was to accuse Injun Joe, and Injun Joe did not forgive; to stay silent was to let an innocent man hang. Being boys, they solved the dilemma with ceremony: a pine shingle, a scrawled vow, and each signature sealed in blood squeezed from a pricked thumb — an oath to keep mum for ever and to rot if they ever told. The blood made it binding; the terror made it easy. But remorse is a patient accomplice, and it followed Tom home that night and got into bed beside him."
],
4:[
"The world, Tom concluded that week, had rejected him — Becky had snubbed him, Aunt Polly had whipped him wrongly — and there was clearly nothing left but a life of crime. He recruited Joe Harper, who had also been unjustly treated (his mother had accused him of cream he had not stolen, this time), and Huck, who required no injustice at all, merely an invitation. They would be pirates. Three renegades, dead to a heartless civilisation, they appointed a rendezvous on the riverbank at midnight, each to bring what provisions he could steal — hooks, bacon, a skillet — in proper piratical style.",
"At midnight they poled a borrowed raft out into the great dark river, standing solemn watches and issuing nautical commands to which the raft paid no attention whatever. By dawn they were installed on Jackson’s Island, three miles below town — wooded, uninhabited, entirely theirs. They fried fish they had caught themselves, and it tasted better than any food had ever tasted, as food does when it is seasoned with theft and freedom. Then they lay in the shade and wondered aloud why everyone did not live this way: marooned by choice, with no bells, no baths, no lessons, and no discernible future.",
"The first full day was rapture — an idyll no schoolroom could survive comparison with. They swam every hour, raced on the sandbar, found the solitude of the deep woods delicious rather than dreadful, and held long professional discussions of piracy: its costume, its cruelty, its retirement arrangements. Nobody, they noted, made a pirate whitewash a fence or memorise a verse. But when night fell and the fire sank, the talk thinned. Two of the three had never precisely stolen anything before the bacon, and conscience, which keeps no regular office hours, chose that hour to open. They said their prayers privately, lest heaven notice the omission.",
"A dull boom rolled across the water the next afternoon: a ferryboat was firing a cannon over the river, the approved method of raising a drowned body. The truth broke upon them slowly and gloriously — the town believed they had drowned; they were being dragged for, mourned, discussed. They were famous. It was the proudest moment of their lives, and it lasted almost until dark, when the pang of what their mothers might be doing with that news arrived uninvited. Joe drifted toward the shameful edge of mutiny — he wanted, simply, to go home — and was jeered back into piracy, temporarily.",
"The days that followed taught them how heavy freedom can become when there is nobody to forbid anything. They improvised turtle-egg feasts and circus games, but a homesick nostalgia kept creeping into the silences, and Tom found himself writing a certain name in the sand with his toe and scuffing it out angrily. Then one night a tempest broke over the island — white glares of lightning, trees groaning, the river driven sideways — and the three pirates huddled under a flapping scrap of sail, magnificently free, entirely soaked, and privately grateful that the storm did not much care to claim them.",
"What held them there in the end was not courage but theatre. Tom had slipped away one night on private business across the river and had come back carrying a secret — a plan so superb, so perfectly dreadful, that when Joe’s rebellion finally threatened to end the expedition, Tom had only to whisper it to restore the company’s loyalty entire. History does not tolerate a spoiled surprise, so the plan must wait a chapter. It is enough to say that three vagabonds who might have gone home damp and defeated chose instead to stay, rehearse, and prepare the most sensational homecoming in the town’s memory."
],
5:[
"Saturday’s town was a subdued and haunted place. The search had been abandoned; the three bodies, it was agreed, would never be recovered; and Sunday’s sermon would double as a funeral. Grief had done what nothing else could: it had revised three biographies. Boys who had once been switched for playing with Tom now recalled him tenderly; teachers remembered promise where they had recorded only crime. The bereaved households drew their curtains, and Aunt Polly’s lament — that she had loved the boy and yet clouted him — was repeated, in one key or another, in every kitchen in St. Petersburg.",
"What the town did not know was that its principal corpse had visited it on Wednesday night. Tom had crossed the river on a log, slipped into his own house, and hidden under the bed while Aunt Polly, Mrs. Harper and Sid grieved by candlelight. There he lay to eavesdrop on his own obituary, and found it excellent. His aunt’s contrition — she blamed herself, naturally, not him — moved him almost to showing himself; he even crept out and kissed her faded lips as she slept. He had brought a bark scroll with a message to end her misery; but a grander idea had seized him, and it went back across the river in his pocket.",
"For the grander idea was this: nothing becomes a hero like a resurrection, and no audience on earth is better prepared than one that has already ordered the flowers. Back on the island Tom drilled his fellow pirates in the scheme, and its sheer audacity converted even homesick Joe on the spot. They would attend church. More precisely, they would attend their own funeral, timed to the minute, entering at the exact summit of the town’s sorrow. It was heartless, theatrical, and irresistible — three adjectives which, in Tom’s private economy, had never once come into conflict.",
"Sunday came, and the church filled as it had never filled for any living attraction. The minister preached the funeral sermon and was generous: the boys emerged from his eulogy as sweet, generous, misunderstood natures whose faults had plainly been virtues in disguise. The congregation, hearing at last what noble spirits it had lost, wept as one body, and the minister wept with them. It was at this precise and poignant moment — grief at flood tide, handkerchiefs at every face — that the church door creaked, and the minister, raising his streaming eyes, beheld three dead boys marching down the aisle in rags.",
"What followed was the nearest thing to a riot that congregation ever produced. Aunt Polly and Mrs. Harper flung themselves upon their restored dead and half-smothered them; even Huck, who belonged to nobody, was hauled into the general embrace at Tom’s insistence. Somebody shouted for the doxology, and Old Hundred went up with such force that it shook the rafters, sung by people who were weeping, laughing and furious simultaneously. Tom Sawyer the pirate, surveying his envying juniors, confessed in his heart that this was the proudest moment of his life. The sermon, it was generally agreed, had rarely been so effective.",
"The moral accounting afterwards was complicated. Aunt Polly hovered between solace and outrage: the boy had let her mourn him for a week in order to purchase himself an entrance. Tom pleaded first the dream he claimed to have had of her grieving, and finally the kiss he had truly left on her sleeping face — and that kiss, offered without a witness in the world, she chose to believe, because she needed to. The town forgave its prodigal on much the same terms. It had, after all, enjoyed the funeral immensely, and nothing had been buried at it except its vanity."
],
6:[
"Summer should have been kind, but Tom’s share of it was torment. Muff Potter sat in the little brick jail awaiting trial for the murder of Doctor Robinson, and the whole town had already convicted him over its fences and supper tables. Tom’s conscience conducted proceedings of its own, nightly. He talked in his sleep — alarmingly — until he took to tying his jaw shut; he shuddered at the word murder as at a touch on the shoulder. Huck was no better. The two met privately, more than once, to reassure each other that the oath still held, and each fresh swearing steadied them for nearly a day.",
"Their guilt found small, useless outlets. They slipped down to the jail with tobacco and matches for Muff, gifts that eased their consciences no more than they eased his sentence. Potter thanked them with such humble, ruinous gratitude — calling them the best friends a broken old man had — that Tom went home wretched. To be blessed by the very man your silence is hanging: there is no arithmetic a boy can do with that. Meanwhile Injun Joe’s account of the night, delivered twice under oath with perfect calm, stood as the official truth, and nobody in St. Petersburg cared to question it.",
"The trial, when it came, emptied the town into the courtroom. The prosecution built its case like a wall, brick upon brick: the knife identified as Potter’s, the washing at the creek, witnesses to his flight — while the defence, to general bewilderment, declined to cross-examine anyone. Potter sat grey and hopeless, a man already fitted for the gallows in the public mind. Verdicts are supposed to follow deliberation; in St. Petersburg the deliberation had been completed weeks before, over back fences, and the jury’s part was understood to be ceremonial. Then the defence rose and called, of all witnesses on earth, Thomas Sawyer.",
"Tom took the stand looking as if he intended to bolt from it. Injun Joe’s iron gaze was fixed on him, and for a long moment speech would not come. Then it did, gathering strength as the story pulled him forward: the graveyard, the moonlight, the quarrel, the grave-board, the knife. The courtroom hung breathless on every word. His testimony had been given in secret to Potter’s lawyer the night before — the oath had lost its battle with his conscience at last — and whatever the intimidation of that seated, listening murderer, the tale was out now and running, and no power on earth could call it back.",
"He reached the killing itself, and as Injun Joe understood that the next sentence would name him, the half-breed moved. He went through the courtroom window like something poured, and was gone before the nearest men had risen from their seats. The pursuit that followed was loud, official and entirely unsuccessful: a fugitive who could vanish into river country vanished. Muff Potter was acquitted to cheering — acquitted being the court’s word; the town’s word was embraced, for the same citizens who had been ready to watch him hang now competed to shake his hand, with an enthusiasm exactly proportional to their previous certainty.",
"Tom’s days were glittering. The town that had once predicted the gallows for him now predicted the presidency; the newspaper made him a hero; and Muff Potter, exonerated, was fed and befriended with the zeal of converts making up for lost time. Tom’s nights were another country altogether. In them Injun Joe stood at the window, patient as weather, and no verdict could reach him there. Huck, whose name had been kept out of the whole affair, shared the terror without the fame — an arrangement he had considered carefully and found, on reflection, entirely satisfactory."
],
7:[
"There comes a time in every rightly constructed boy’s life when he is seized by a raging desire to dig for buried treasure, and that fever now took Tom. The folklore on the subject was exact: hoards were buried by robbers under dead trees, on islands, and beneath the floors of haunted houses, invariably at midnight, and guarded, as often as not, by a ghost with a strong interest in property. Huck was recruited at once — Huck could always be recruited by any scheme promising wealth without work — and the partners began operations with high hearts, borrowed tools, and no information whatever.",
"Avarice, in boys, is a sunny thing. They dug under the dead tree on the hill and were not much discouraged by failure; they discussed at length what each would do with his fortune — Huck proposed pie and a red necktie daily, while Tom intended a sword, a drum and a wedding, in that order — and only after several barren excavations did they conclude that the trouble was location. The money, plainly, lay under the haunted house on Cardiff Hill. That house was ominous even at noon: sagging, shuttered, weed-choked, the kind of derelict building a town instinctively passes on the far side of the road.",
"They ventured in by daylight, superstition being negotiable when gold is involved, and explored the ruin — rotted floors, a crippled staircase, fallen plaster, and a silence of the sort that seems to listen back. They were upstairs when two men entered below, and the boys flattened themselves to the boards, eyes to the knotholes, hearts audible. One visitor was a ragged stranger nobody knew. The other the whole region knew by sight: the old deaf-and-dumb Spaniard who had lately appeared about town in a serape and green goggles. Then the Spaniard spoke, and the voice was Injun Joe’s.",
"The masquerade collapsed in a single sentence, and the boys lay directly above their worst enemy, afraid of their own breathing. The men below spoke of a dangerous job still to be done — revenge, Joe called it, and the word came up through the floorboards like cold air. Then, meaning only to lurk until dark and bury their own silver, they turned up a rotted hearthstone and struck someone else’s iron box. It was full of gold coin — thousands of dollars by the ring of it. Robbers had buried a hoard there after all, and fate had handed it to the one man in Missouri the boys could not simply rob back.",
"For one exquisite moment the watchers upstairs were rich; the windfall glittered a single floor away from their pockets. Then a misgiving seized Injun Joe: the abandoned tools, he noticed, carried fresh earth. Someone had been here; someone might be here still; the treasure could not stay. They would carry it, he decided, not to his old hiding place — no — but to the den: Number Two, under the cross. His henchman knew the place; the boys, memorising the words through the knothole, did not. Joe started up the stairs to search the house, and the staircase, in the book’s one act of pure mercy, collapsed beneath him.",
"The boys escaped at dusk, poorer by a fortune they had never touched and richer by one sentence: Number Two — under the cross. Tom pursued the riddle through the town’s available Number Twos and kept an uneasy vigil on the tavern whose room bore that number, where whisky and darkness suggested the answer lay elsewhere, or somewhere worse. The watching came to nothing but dread. Somewhere Injun Joe was ransacking his own memory too — for the boy who had testified against him — and treasure-hunting, which had begun as the sunniest of games, now had a murderer standing quietly at the centre of it."
],
8:[
"The long-promised picnic came at last, and a flotilla of young people was ferried downriver to feast below McDougal’s Cave — a vast subterranean honeycomb in the bluff, where passage branched from passage until the true map of it existed in no head in Missouri. Parties roamed the known avenues by candlelight, played hide-and-seek among the limestone columns, and drifted back to the boat at dusk. In the counting and the ferrying home, an assumption quietly did the work of a fact: Tom and Becky, someone was sure, had stayed the night with Mrs. Harper’s party. It was Sunday morning before the town learned otherwise.",
"The two of them had wandered from the games, reading smoke-written names on the walls, until novelty led them by easy stages into the unvisited dark. When they turned back, the labyrinth had quietly closed behind them: every corridor repeated every other, their landmarks had multiplied into lies, and a whirl of bats had chased them, candles guttering, down turnings no memory could retrace. Becky understood first, and wept. Tom took charge of hope as though it were his department — blowing out her candle to save it, shouting at intervals down the black corridors, and listening to each echo die in a silence that seemed to have been waiting for them.",
"Their predicament settled into the routine of an ordeal. They slept, and could no longer tell night from day; they shared the wedding-cake she had saved from the picnic like a sacrament, and afterwards were famished in earnest. The candles went, stub after stub, until the darkness was total and they sat holding hands beside a little spring, because water, at least, could still be trusted. Becky drifted toward a delirious half-sleep and asked Tom, quite gently, whether he thought they would ever get out; and Tom, who did not, said certainly — and heard his own voice sound almost as if it believed itself.",
"Tom kept exploring the side passages with a kite-line paid out behind him, which was fortitude of the practical kind. Down one of them his candle found a hand holding a light beyond a rock — and the hand belonged to Injun Joe. Tom froze; the fugitive, unnerved by the echoing shout, fled the other way, never knowing whose voice it was. Terror drove the boy back to Becky, and then perseverance drove him out again, line after line, passage after passage, until at the end of one of them he saw a far speck of daylight, pushed toward it, and looked out upon the broad rolling Mississippi.",
"The rescue set the town ringing its bells at midnight, half-mad with joy. Tom and Becky were fed, wept over and exhibited; recovery took days. A fortnight passed before Judge Thatcher mentioned with satisfaction that the cave had been sealed — its mouth shut with a boiler-iron door — so that no child would ever be lost in it again. Tom turned white and said what he alone could say: Injun Joe was in the cave. They found him just inside, dead where he had fallen, his knife broken against the sill; the gruesome evidence of eaten candle-stubs and captured bats told how slowly the door had killed him — entombed by an accident of public safety.",
"The rest was harvest. Tom had noticed, deep in the cave near his exit, a cross smoked upon a rock: Number Two had never been the tavern at all. He and Huck returned through the new opening, and under the cross they raised the box — twelve thousand dollars in coin, a fortune beyond the town’s private dreams. St. Petersburg went briefly insane; derelict houses were dismembered plank by plank for treasures that were not there. Huck, who had separately saved the Widow Douglas from Injun Joe’s revenge, was adopted by the grateful widow — henceforth his benefactor — and introduced to respectability: clean sheets, cutlery, prayers. He endured it, he reported, about as well as imprisonment."
]
};

const EVENTS={
1:{ev:["Aunt Polly catches Tom and sentences him to whitewash the fence on Saturday","Tom surveys the thirty yards of fence and sinks into melancholy","Ben Rogers arrives munching an apple and playing at being a steamboat","Tom paints with the nonchalance of an artist and refuses to share the brush","A procession of boys pays their treasures for the privilege of painting","The fence gains three coats and Tom strolls off prosperous"],
   keys:["whitewash","melancholy","steamboat","nonchalance","treasures","prosperous"]},
2:{ev:["Tom trades his new wealth for the other boys’ tickets on the chapel steps","Judge Thatcher’s visit sets the whole school showing off","Tom claims the prize Bible before the astonished school","Asked to name the first two disciples, Tom answers David and Goliath","Tom falls for the new girl, Becky Thatcher, and forgets Amy on the spot","A poodle and a beetle steal the only sincere attention of the service"],
   keys:["tickets","Judge","Bible","Goliath","Becky","poodle"]},
3:{ev:["Tom and Huck wait in the graveyard at midnight with a dead cat","Three men arrive with a lantern and spades to rob a grave","Injun Joe stabs Doctor Robinson with Muff Potter’s knife","Joe convinces the waking Potter that he himself is the killer","The boys sign an oath of silence in their own blood","Tom carries his remorse home to bed that night"],
   keys:["cat","lantern","knife","killer","oath","remorse"]},
4:{ev:["The three runaways pole a raft into the dark river at midnight","They set up their pirate camp on Jackson’s Island","A ferryboat cannon tells them the town believes they have drowned","Homesick Joe drifts toward mutiny and is jeered back","A night tempest soaks the pirates in their scrap of tent","Tom returns from a secret night errand carrying a plan"],
   keys:["raft","Jackson","cannon","mutiny","tempest","secret"]},
5:{ev:["The town gives up the search and sinks into mourning","Tom hides under the bed and listens to his own obituary","The church fills for the boys’ funeral sermon","Three dead pirates march down the aisle in rags","The doxology shakes the rafters as grief turns to joy","Aunt Polly chooses to believe the story of the kiss"],
   keys:["mourning","bed","funeral","aisle","doxology","kiss"]},
6:{ev:["Tom and Huck bring tobacco and matches to Muff in jail","The trial opens with the town’s mind made up already","The defence calls a surprise witness: Thomas Sawyer","Injun Joe escapes through the courtroom window","Muff Potter is acquitted and re-embraced by the town","Fame fills Tom’s days while nightmares fill his nights"],
   keys:["jail","trial","witness","window","acquitted","nightmares"]},
7:{ev:["Treasure fever sends Tom and Huck digging under a dead tree","The partners try their luck inside the haunted house","The deaf-and-dumb Spaniard speaks with Injun Joe’s voice","The men unearth an iron box full of gold coin","Joe names the new hiding place: Number Two, under the cross","Tom keeps an uneasy vigil on the tavern’s room Number Two"],
   keys:["treasure","haunted","Spaniard","gold","cross","vigil"]},
8:{ev:["The picnic ferry leaves without anyone checking who is aboard","Tom and Becky wander into the labyrinth beyond the known paths","The last candle dies and the dark becomes total","Following a kite-line, Tom finds a speck of daylight","Behind the sealed iron door, Injun Joe lies dead","The Widow Douglas adopts Huck and undertakes to civilise him"],
   keys:["picnic","labyrinth","candle","kite","door","Widow"]}
};

return {level:'C1', lead:'Mark Twain · advanced retelling · <b>C1 advanced</b> (≈3,000 headwords)',
  CHAPTERS:CHAPTERS, READINGS:READINGS, EVENTS:EVENTS};
})();
