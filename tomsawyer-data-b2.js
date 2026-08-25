/* ============================================================
   THE ADVENTURES OF TOM SAWYER — Mark Twain
   B2 upper-intermediate dataset · original retelling
   Feeds the reader app: chapters, readings, events, activities.
   ============================================================ */
window.ATTWN_DATA = (function(){
const CHAPTERS = [
  { n:1, title:"Tom and the Fence",
    sum:"Tom Sawyer, terror and treasure of his Aunt Polly, is sentenced to whitewash the front fence on a perfect Saturday. With one inspired scheme he turns the punishment into a privilege — and the neighbourhood boys end up paying him for the honour of doing his work.",
    vocab:[
      ["MISCHIEF","playful behaviour that causes trouble without meaning serious harm"],
      ["REPUTATION","the opinion people generally have about someone’s character"],
      ["WHITEWASH","to paint a wall or fence with a white lime mixture"],
      ["SCHEME","a clever and often slightly dishonest plan"],
      ["PRIVILEGE","a special advantage given only to a particular person"],
      ["ENVY","the unhappy feeling of wanting what someone else has"],
      ["POSSESSIONS","the things that belong to you"],
      ["CUNNING","clever at getting what you want, especially by tricking people"],
      ["INSPIRATION","a sudden brilliant idea"],
      ["GLORIOUS","wonderful; deserving great admiration"],
      ["PROFITABLE","producing a gain or an advantage"],
      ["RELUCTANT","unwilling and hesitating to do something"]
    ],
    comp:[
      ["Why does Aunt Polly finally decide to punish Tom?",["He broke a board in the fence","Sid noticed the thread on his collar had changed colour","He stole apples from the market","He refused to go to church"],1,"Tom had sewn his collar back himself after swimming, but the different thread betrayed him and Aunt Polly’s patience collapsed."],
      ["How does Tom feel when he compares his first painted stripe with the rest of the fence?",["Proud of his fast progress","Discouraged by the size of the task","Furious with Ben Rogers","Excited about his scheme"],1,"One stripe against a continent of unpainted wood makes him sit down discouraged."],
      ["Why does Tom pretend that whitewashing is a privilege?",["Because he genuinely loves painting","So the boys will desire the job and even pay for it","Because Aunt Polly told him to say so","To make Sid jealous"],1,"It is pure strategy: if the work looks rare and desirable, the boys will beg to do it — and they do."],
      ["What must Ben Rogers hand over before he is allowed to paint?",["A dead rat on a string","His apple","Twelve marbles","A brass doorknob"],1,"Ben surrenders his apple, and only then is he generously permitted to take the brush."],
      ["What condition is the fence in by evening?",["It has one thin coat","It is half finished","It wears three full coats of whitewash","It is clean but unpainted"],2,"Boy after boy paid to work, so the fence received three glorious coats."],
      ["According to the great law Tom discovers, how do you make somebody desire a thing?",["Offer it very cheaply","Make it difficult to obtain","Explain how useful it is","Give it away for free"],1,"Tom stumbles on a law of human nature: rarity creates desire."],
      ["In Tom’s new philosophy, what separates work from play?",["Work is paid and play is not","Work is what you must do; play is what you choose to do","Work is for adults only","There is no real difference"],1,"The same brush is misery when required and delight when chosen — a cunning distinction indeed."],
      ["What does the narrator’s tone suggest about Tom’s trick?",["Strong moral disapproval","Amused admiration for his cunning","Complete indifference","Deep pity for the other boys"],1,"The story treats the scheme as a small masterpiece, laughing with Tom rather than condemning him."]
    ],
    tf:[
      ["Tom repaired his collar himself after swimming in the river.",true,"He sewed it back to hide the swim — the thread colour gave him away."],
      ["Aunt Polly noticed the changed thread colour without any help.",false,"It was his half-brother Sid who noticed the thread."],
      ["Tom offered the boys money to help him paint the fence.",false,"It was exactly the opposite: the boys paid Tom for the chance to paint."],
      ["Ben Rogers originally came to the fence intending to mock Tom.",true,"He arrived imitating a steamboat and ready to laugh — and ended up painting."],
      ["By evening the fence had received two coats of whitewash.",false,"It wore three glorious coats by the end of the afternoon."],
      ["Aunt Polly rewarded Tom with an apple when she saw the finished fence.",true,"She was so astonished that she added an apple to a short lecture on honest effort."]
    ],
    writing:[
      {task:"Write an email to an English-speaking friend about a time you (or someone you know) turned a boring job into something fun. Explain what the job was, what you did, and how people reacted.",
       target:"100–140 words",
       tips:["Open and close like a real email (Hi Alex… / Write soon!)","Use narrative tenses: past simple for the events, past continuous for the background","Add one touch of humour, the way Twain would"],
       starters:["Hi Alex, you won’t believe what happened on Saturday…","It all started when I was told to…","At first it seemed like the most boring job in the world…","By the end of the afternoon, everyone wanted a turn…"]},
      {task:"Write a story that begins with this sentence: “When Tom looked at the endless fence, a brilliant idea suddenly came to him.” Describe the plan, how it worked, and how the day ended.",
       target:"100–140 words",
       tips:["Keep the given sentence exactly as your first line","Show the trick working step by step — build up the queue of boys","Finish with a satisfying final image or a clever last line"],
       starters:["When Tom looked at the endless fence, a brilliant idea suddenly came to him.","He picked up the brush slowly, like an artist…","The first victim arrived whistling…","By sunset, the fence gleamed and his pockets bulged…"]}
    ]},
  { n:2, title:"Church and Becky",
    sum:"Scrubbed and suffering in his Sunday clothes, Tom trades his fence-earned treasures for prize tickets and claims a Bible he has never studied — mostly to impress Becky Thatcher, the new judge’s daughter. One impossible question about the disciples brings his triumph crashing down.",
    vocab:[
      ["ADMIRATION","a feeling of respect and warm approval"],
      ["RECITE","to say something aloud from memory"],
      ["VERSE","one short numbered part of a Bible chapter or a poem"],
      ["BARGAIN","to negotiate the price or conditions of an exchange"],
      ["TRIUMPH","a great victory or moment of success"],
      ["HUMILIATION","the painful feeling of being made to look foolish in public"],
      ["ASTONISHED","extremely surprised"],
      ["IMPRESS","to make someone admire you"],
      ["EXCHANGE","the act of giving one thing and receiving another"],
      ["SOLEMN","very serious and formal"],
      ["DIGNITY","calm self-respect that makes others respect you"],
      ["CONGREGATION","the group of people attending a church service"]
    ],
    comp:[
      ["How could a pupil honestly win the prize Bible?",["By attending church every Sunday for a year","By reciting two thousand memorised verses","By donating money to the school","By winning a writing competition"],1,"Only a child patient enough to recite two thousand verses earned the magnificent prize."],
      ["How does Tom actually collect enough tickets?",["He memorises the verses at top speed","He bargains, trading his fence treasures for other boys’ tickets","He steals them from the superintendent’s desk","The teacher gives them to him by mistake"],1,"In the yard he trades marbles and fish-hooks — the profits of the fence — for coloured tickets."],
      ["Who are the important visitors at church that morning?",["The mayor and his wife","Judge Thatcher and his daughter Becky","Mark Twain and his editor","Mrs Harper and Joe"],1,"Judge Thatcher, a great man from Constantinople twelve miles away, sits at the front with Becky."],
      ["Why does Tom claim the Bible although he knows no verses?",["He wants to read it at home","He wants public glory, above all to impress Becky","Aunt Polly ordered him to win it","He plans to sell it afterwards"],1,"The prize itself matters far less to Tom than the platform, the applause — and Becky watching."],
      ["Why is the superintendent astonished when Tom presents his tickets?",["Tom is too young for the prize","Tom is the last boy anyone expected to have earned them","The tickets are the wrong colour","The Bible has already been promised"],1,"He would sooner have expected lightning indoors — yet the tickets were genuine and the exchange had to be honoured."],
      ["What answer does Tom give to the Judge’s solemn question?",["Peter and Paul","David and Goliath","Adam and Eve","Samson and Delilah"],1,"Asked to name the first two disciples, Tom announces with great confidence: David and Goliath."],
      ["Why does the narrator “draw a curtain” over the rest of the scene?",["The chapter was censored","To spare everyone the painful, comic details of Tom’s humiliation","Because nobody knows what happened next","Becky asked him to"],1,"It is a joke of mercy: the disaster is complete, and kindness (and comedy) demand the curtain."],
      ["What happens to Tom’s devotion to Amy Lawrence?",["It grows stronger than ever","It vanishes the instant he sees Becky","He writes her a farewell letter","She rejects him first"],1,"Amy, adored faithfully for at least a week, disappears from his memory at first sight of Becky."]
    ],
    tf:[
      ["Pupils earned coloured tickets by memorising Bible verses.",true,"Blue, red and yellow tickets rewarded memorised verses, like a small religious currency."],
      ["Tom collected his tickets by learning verses faster than anyone else.",false,"He could not sit still for a single verse — he bargained for the tickets with his treasures."],
      ["Judge Thatcher had lived in St. Petersburg all his life.",false,"He came from Constantinople, twelve whole miles away — practically a foreign land."],
      ["Tom forgot Amy Lawrence the moment he saw Becky.",true,"His heart surrendered without a struggle, and Amy vanished from his memory."],
      ["The superintendent refused to hand over the Bible because he suspected a trick.",false,"The tickets were genuine, so the exchange had to be honoured — astonished or not."],
      ["Tom answered that the first two disciples were David and Goliath.",true,"He searched an entirely empty mind and produced the wrong heroes with great confidence."]
    ],
    writing:[
      {task:"Write a story ending with the words: “…and that is how my greatest triumph turned into my worst humiliation.” Your story can be about school, sport, family — anywhere pride comes before a fall.",
       target:"100–140 words",
       tips:["Plan backwards from the final sentence so the ending feels earned","Build the triumph up high before you let it fall","Use time expressions to move the story along (at first, moments later, before I knew it)"],
       starters:["I had never felt so confident in my life…","The whole school was watching when…","Winning was the easy part…","Everyone was applauding — and then came the question…"]},
      {task:"Write an article for your school magazine with the title “Showing off — why do we do it?” Use Tom’s day at Sunday school as one of your examples.",
       target:"100–140 words",
       tips:["Start with a question or a striking statement to hook the reader","Give one example from the book and one from real life","End with your own opinion or a piece of advice"],
       starters:["Have you ever pretended to know something you didn’t?","Tom Sawyer once won a Bible without learning a single verse…","We all want admiration — the question is the price…","Perhaps showing off is simply hope, wearing its loudest clothes…"]}
    ]},
  { n:3, title:"In the Graveyard",
    sum:"A midnight wart cure takes Tom and Huck to the graveyard, where they witness Injun Joe murder Doctor Robinson and coolly shift the blame onto drunken Muff Potter. Terrified, the boys sign an oath in blood never to breathe a word.",
    vocab:[
      ["SUPERSTITION","a belief in magic or luck that has no scientific basis"],
      ["CONSCIENCE","the inner voice that tells you whether your actions are right or wrong"],
      ["WITNESS","a person who sees an event happen"],
      ["VENGEANCE","punishment given in return for an injury or insult; revenge"],
      ["INNOCENT","not guilty of a crime"],
      ["TERROR","extreme fear"],
      ["GRAVE","the place in the ground where a dead person is buried"],
      ["OATH","a very serious formal promise"],
      ["ACCUSED","publicly blamed for a crime"],
      ["CORPSE","a dead human body"],
      ["VILLAIN","an evil character; a criminal"],
      ["DREAD","a strong fear of something that may happen"]
    ],
    comp:[
      ["Why do Tom and Huck go to the graveyard at midnight?",["To dig up a corpse for the doctor","To test a superstition about curing warts with a dead cat","To spy on Injun Joe","To hide from Aunt Polly"],1,"Huck’s approved method requires a dead cat, a graveyard, midnight — and patience for devils."],
      ["Why do the boys of St. Petersburg envy Huck while their mothers dread him?",["He is rich and generous","He is completely free: no school, no rules, no one to answer to","He owns a raft and a gun","He can read minds"],1,"Huck sleeps in barrels and answers to no one alive — every respectable boy’s secret dream."],
      ["What have the three men come to the graveyard to do?",["To bury stolen treasure","To dig up a fresh corpse for medical studies","To hold a secret meeting","To catch the two boys"],1,"Young Doctor Robinson needed a corpse for his studies, and had hired the other two to dig."],
      ["Why does Injun Joe attack the doctor?",["The doctor refused to pay anything at all","He wants payment for an old insult: the doctor’s family once drove him away","Muff Potter ordered him to","The doctor attacked him first"],1,"Beyond extra money, Joe demands something darker — vengeance for being treated like a beggar years before."],
      ["How does Injun Joe convince Muff Potter of his own guilt?",["He shows him a false letter","He places the knife in Potter’s hand and tells him he killed the doctor while drunk","He bribes a witness","He hypnotises him"],1,"Potter wakes confused, remembers nothing, and believes at once — even begging Joe to keep the secret."],
      ["Why do the boys swear their oath in blood rather than simply agreeing?",["It was Huck’s favourite game","The solemn ritual matches the deadly seriousness of their fear","A written oath was legally required","Tom wanted to impress Huck"],1,"Only the most binding oath imaginable felt strong enough to hold back a secret this dangerous."],
      ["What do the boys fear would happen if they told the truth?",["Nobody would believe two boys","If Injun Joe were not hanged, he would kill the witnesses","They would be arrested for being in the graveyard","Aunt Polly would punish them"],1,"Their logic is chilling: speak, and survive only as long as it takes Joe to find them."],
      ["What signs show that Tom’s conscience is at war with his fear?",["He avoids Huck completely","He sleeps badly, mutters about blood, and smuggles comforts to the prisoner","He confesses to Aunt Polly","He leaves town"],1,"His guilt leaks out at night and drives him to the barred window with small kindnesses."]
    ],
    tf:[
      ["Huck slept in empty barrels and answered to nobody.",true,"Son of the town drunkard, he lived gloriously free — and was worshipped for it."],
      ["The boys went to the graveyard to dig up a corpse for Doctor Robinson.",false,"They went to cure warts with a dead cat; it was the three men who came to dig."],
      ["Injun Joe killed the doctor with his own hunting knife.",false,"He used Muff Potter’s knife — which is exactly what made the framing so easy."],
      ["Muff Potter genuinely believed he had committed the murder.",true,"He remembered nothing, so he accepted Joe’s version at once and begged for silence."],
      ["The boys wrote their oath in ink on a scrap of paper.",false,"They signed a scrap of board with a splinter dipped in their own blood."],
      ["Tom secretly brought small comforts to Potter in jail.",true,"His conscience sent him to the barred window with smuggled gifts."]
    ],
    writing:[
      {task:"Write Tom’s diary entry for the night after the graveyard. Describe what he saw, how he feels about the oath, and what he fears will happen next.",
       target:"100–140 words",
       tips:["Write in the first person and let the fear show between the lines","Mix past tenses (what happened) with present tenses (how he feels now)","End with a worry or an unanswered question"],
       starters:["I will never forget what I saw tonight…","My hand is still shaking as I write this…","Huck and I swore an oath, and an oath is an oath…","If Injun Joe ever finds out we were there…"]},
      {task:"A friend writes that they have seen something serious happen but are afraid to tell anyone. Write an email giving advice. Should they stay silent like Tom and Huck? Why or why not?",
       target:"100–140 words",
       tips:["Acknowledge your friend’s fear before giving advice","Use advice language: If I were you…, You’d better…, It might help to…","Give one clear reason why silence can be dangerous"],
       starters:["Thanks for trusting me with this — it sounds frightening…","First of all, I understand why you’re scared…","If I were you, I would talk to an adult you trust…","Staying silent might feel safer, but…"]}
    ]},
  { n:4, title:"The Young Pirates",
    sum:"Feeling unappreciated by the entire civilised world, Tom, Joe Harper and Huck raft over to Jackson’s Island to begin promising careers as pirates. Freedom tastes wonderful — until homesickness sets in and the town starts dragging the river for their bodies.",
    vocab:[
      ["PROVISIONS","supplies of food for a journey"],
      ["DESERTED","empty of people; abandoned"],
      ["HOMESICK","sad because you are away from home"],
      ["SOLITUDE","the state of being alone"],
      ["REBELLION","open refusal to obey those in charge"],
      ["THUNDERSTORM","a storm with thunder, lightning and heavy rain"],
      ["DRENCHED","completely soaked with water"],
      ["EXPEDITION","an organised journey with a purpose"],
      ["CONSPIRATORS","people secretly planning something together"],
      ["SENSATION","an event causing great public excitement"],
      ["ERRAND","a short journey made to do a task for someone"],
      ["TRAGIC","extremely sad, usually involving death or disaster"]
    ],
    comp:[
      ["Why does Tom decide to run away and lead a life of crime?",["Aunt Polly has thrown him out","He feels rejected by Becky and unjustly blamed at home","The police are looking for him","Huck persuaded him"],1,"Becky has frozen him out and the world clearly does not appreciate him — piracy seems the only career left."],
      ["Why is Joe Harper in the perfect mood to join?",["His mother punished him for cream he had never tasted","He failed his exams","Becky rejected him too","He has always wanted to sail"],0,"Two injured souls met: Joe had just been punished for a crime he did not commit — a theme of the book in miniature."],
      ["How do the pirates obtain their provisions?",["They buy them with fence money","Each boy steals some, in strict pirate fashion","Aunt Polly packs them a basket","They fish for everything"],1,"Ham, bacon and a frying pan are all properly stolen — pirates never merely take things."],
      ["Why does the ferryboat fire a cannon over the water?",["To salute the missing boys","People believed cannon fire would bring a drowned body to the surface","To warn ships of danger","To celebrate a holiday"],1,"Huck knows the custom: the boom was supposed to raise the drowned — and it tells the boys they are being searched for."],
      ["How do the boys react to being mourned as dead?",["They feel ashamed and go straight home","They feel like tragic heroes and find it almost worth being dead","They are frightened of punishment","They do not care at all"],1,"Being mourned and adored is delicious — the whole town is finally paying proper attention."],
      ["Why does Tom mock Joe’s homesickness although he secretly feels the same?",["He is genuinely braver than Joe","Pride: admitting it would end the adventure and his authority","He hates Joe","He wants Joe to leave"],1,"Tom is fighting the same battle privately — mocking Joe protects both the expedition and his own dignity."],
      ["What stops the rebellion and keeps the pirates on the island?",["A storm blocks the river","Tom reveals a splendid secret plan","Huck threatens the others","They find treasure"],1,"Tom’s plan — a certain funeral, attended personally — is too magnificent to walk away from."],
      ["What had Tom already done secretly one night?",["Buried the provisions","Crossed the river on a secret errand of his own","Written to Becky","Spied on Injun Joe"],1,"He had slipped across to town — the reading keeps the errand mysterious until the next chapter."]
    ],
    tf:[
      ["The pirates bought their provisions before leaving town.",false,"Each boy stole his supplies, as pirate honour demanded."],
      ["The boys reached Jackson’s Island on a borrowed raft.",true,"They pushed out onto the Mississippi at midnight and landed two hours later."],
      ["The cannon fire from the ferryboat was meant to frighten the boys.",false,"It was believed to bring a drowned body to the surface — the town thought they were dead."],
      ["Joe Harper was the first to admit he was homesick.",true,"By the third day he was openly homesick, while Tom still pretended."],
      ["Huck never felt any wish to leave the island.",false,"Even Huck admitted that solitude had its limits."],
      ["A thunderstorm destroyed the pirates’ tent during the night.",true,"It tore the tent to rags and drove the drenched pirates under an oak."]
    ],
    writing:[
      {task:"Imagine you are one of the pirates. Write an email (never sent, of course) to a friend describing life on Jackson’s Island — the freedom, the food, and the feelings you don’t admit out loud.",
       target:"100–140 words",
       tips:["Use an informal, chatty register throughout","Contrast the daytime glory with the night-time doubts","Include sensory details: the fish, the campfire, the river at night"],
       starters:["You’d never guess where I’m writing from…","Being a pirate is everything we dreamed — mostly…","All day we swim and give orders to imaginary crews…","But at night, when the fire gets low…"]},
      {task:"“Running away never solves anything.” Write an article for the school magazine saying whether you agree, using the three pirates as an example.",
       target:"100–140 words",
       tips:["State your opinion clearly in the first paragraph","Use the boys’ homesickness as evidence for (or against) the statement","Finish with a memorable closing sentence"],
       starters:["Every child has dreamed of running away at least once…","Tom Sawyer tried it, and it lasted exactly three days…","Freedom, it turns out, tastes better with supper included…","Perhaps the problem with running away is that you take yourself along…"]}
    ]},
  { n:5, title:"Back from the Dead",
    sum:"St. Petersburg mourns its three drowned boys, and the church fills for their funeral. Halfway through the sermon the dead walk in: Tom’s masterpiece of stage management turns grief into rejoicing — though Aunt Polly has a question about how long he let her cry.",
    vocab:[
      ["GRIEF","deep sorrow, especially after a death"],
      ["EAVESDROP","to listen secretly to a private conversation"],
      ["SERMON","a religious speech given in church"],
      ["MINISTER","a religious leader who conducts church services"],
      ["HYMN","a religious song sung in church"],
      ["REMORSE","deep regret for a wrong you have committed"],
      ["CELEBRITY","a famous person"],
      ["PROCESSION","a line of people moving forward slowly and formally"],
      ["MISERY","great unhappiness or suffering"],
      ["AISLE","the passage between rows of seats in a church"],
      ["VIRTUES","good moral qualities"],
      ["GALLERY","an upper floor of seats in a church or theatre"]
    ],
    comp:[
      ["What did the search for the boys actually find?",["Their footprints on the island","Nothing but an abandoned raft","Tom’s jacket","A message in a bottle"],1,"The raft was all — and with it, hope quietly died."],
      ["Why does Becky wish she had kept the brass doorknob?",["It was valuable","It was a gift from Tom, whom she had treated coldly","It opened the school door","Her father wanted it"],1,"Regret arrives on schedule: the giver is believed dead, and the gift was thrown away with him."],
      ["Where did Tom hide during his secret visit home?",["In the garden shed","Under Aunt Polly’s bed","Behind the kitchen door","In Sid’s wardrobe"],1,"He lay in the dust, inches from her feet, eavesdropping while she wept over him with Mrs Harper."],
      ["Why did Tom nearly reveal himself that night?",["Sid almost stepped on him","Hearing Aunt Polly’s misery made him long to end it","He sneezed","He wanted his supper"],1,"He heard himself forgiven, praised and mourned — and very nearly crawled out; instead he kissed her and vanished."],
      ["What is ironic about the minister’s sermon?",["It was in Latin","The virtues he praised had looked like faults deserving the whip while the boys lived","It lasted only a minute","He forgot the boys’ names"],1,"Death, the sermon suggests, is a wonderful polisher of reputations."],
      ["Where had the three boys been hiding before their entrance?",["In the bell tower","In the empty gallery, listening to their own funeral","Behind the pulpit","Outside a window"],1,"They listened with professional interest before marching down the aisle in solemn procession."],
      ["Why does Tom protest during the celebrations?",["Nobody hugged Huck, and somebody ought to be glad to see him too","The hymn was too slow","He wanted a bigger welcome","Sid was laughing"],0,"Huck stood alone and unclaimed until Tom spoke — whereupon Aunt Polly hugged Huck beyond rescue."],
      ["Why is Tom’s triumph mixed with shame afterwards?",["The town fined him","Aunt Polly asks how he could let her suffer so long for a joke","Becky refuses to speak to him","The minister punished him"],1,"She had learned of the secret visit — and her quiet question lodged a worm of remorse in his glory."]
    ],
    tf:[
      ["The search party found the boys’ raft but no bodies.",true,"Only the abandoned raft was recovered, so the town concluded the worst."],
      ["Tom left Aunt Polly a note explaining that the boys were alive.",false,"He kissed her sleeping face and left no note at all."],
      ["The minister broke down and wept during his own sermon.",true,"By the end, he was weeping over his notes in the pulpit with the whole congregation."],
      ["The boys listened to their own funeral from the church gallery.",true,"They hid in the empty gallery before making their grand entrance."],
      ["Huck was ignored by everyone until the end of the service.",false,"After Tom protested, Aunt Polly hugged Huck too — to his deep embarrassment."],
      ["Aunt Polly never discovered Tom’s secret night visit.",false,"She learned about it — and her question about it spoiled a little of his triumph."]
    ],
    writing:[
      {task:"Write the scene in the church from Becky’s point of view: the sermon, the creaking door, and what she felt when she saw Tom alive.",
       target:"100–140 words",
       tips:["Stay inside Becky’s head — thoughts and feelings, not just events","Slow the moment down when the door creaks","Show her feelings changing: grief, disbelief, joy (and perhaps annoyance)"],
       starters:["I was staring at my shoes when the door creaked…","The minister was saying beautiful things about a boy I had been cruel to…","At first I thought I was imagining him…","I promised myself I would never be unkind again — well, almost never…"]},
      {task:"Aunt Polly writes to her sister about the week her nephew came back from the dead. Write her letter: the grief, the funeral, the shock, and how she feels about Tom’s joke now.",
       target:"100–140 words",
       tips:["Use an older, affectionate voice — scolding and loving at once","Sequence the week clearly: the search, the funeral, the entrance","End with her mixed feelings: fury, relief, and helpless love"],
       starters:["Dear sister, you may sit down before you read this…","On Sunday we buried the boy — and on Sunday he walked in…","I declare I don’t know whether to whip that child or kiss him…","A woman my age should not receive such surprises in church…"]}
    ]},
  { n:6, title:"Muff Potter’s Trial",
    sum:"As Muff Potter’s trial moves towards a certain guilty verdict, Tom’s conscience finally outweighs his terror of Injun Joe. His testimony electrifies the courtroom — and sends the real murderer crashing through the window and out of the reach of the law.",
    vocab:[
      ["TESTIMONY","a formal statement given by a witness in court"],
      ["COURTROOM","the room where a trial takes place"],
      ["EVIDENCE","facts and objects that prove whether something is true"],
      ["DEFENCE","the lawyer or team arguing for the accused person"],
      ["FUGITIVE","a person running away from the law"],
      ["GRATITUDE","the feeling of being thankful"],
      ["CONDEMNED","declared guilty; doomed"],
      ["ASTONISHMENT","very great surprise"],
      ["CLIMAX","the most exciting or important moment"],
      ["PURSUIT","the act of chasing someone"],
      ["LIBERTY","freedom"],
      ["VERDICT","the official decision of a court"]
    ],
    comp:[
      ["Why does every mention of the trial freeze Tom’s blood?",["He is accused of the murder","He knows the truth but is bound by his oath and his fear of Injun Joe","He must speak in public","He owes Potter money"],1,"The trial drags his secret towards the surface: he is the witness who dares not witness."],
      ["Why does Muff Potter’s gratitude punish the boys worse than any court?",["He gives them expensive gifts","Every thank-you reminds them that their silence is helping to hang an innocent man","He cries loudly","He asks them to testify"],1,"Guilt has excellent aim: kindness from the condemned man hurts more than punishment would."],
      ["Why does the case against Potter appear hopeless?",["He confessed in writing","Witnesses, the identified knife, and a lawyer who barely asks questions","The judge hates him","There were photographs"],1,"The evidence stacks up while the defence sits strangely quiet — hopeless, unless someone knows better."],
      ["Why does the courtroom gasp when the defence calls its witness?",["The witness is a woman","The witness is a small boy: Thomas Sawyer","The witness is Injun Joe","The witness arrives late"],1,"Nobody expected the defence’s case to rest on a frightened boy."],
      ["What finally made Tom break his blood oath?",["Huck released him from it","His conscience outweighed his terror — an innocent life mattered more","The lawyer paid him","He stopped believing in oaths"],1,"He went to the lawyer the night before and confessed everything: the oath weighed less than a man’s life."],
      ["What happens at the climax of Tom’s testimony?",["Potter confesses","Injun Joe leaps through the window and escapes","The judge stops the trial","Huck runs in"],1,"As every eye swings towards him, Joe tears through the crowd and is gone before anyone has risen."],
      ["What does the town’s treatment of Potter after the trial suggest?",["The town is careful and fair","Public opinion swings easily from hanging a man to feeding him dinner","Potter was secretly rich","The trial changed nothing"],1,"The same town that was ready to hang him now competes to feed him — Twain’s quiet joke about crowds."],
      ["Why can Tom not enjoy his heroism at night?",["The newspaper criticised him","In his dreams Injun Joe waits at the window; the fugitive is still free","He misses the island","Huck keeps him awake"],1,"Daylight makes him a hero; darkness reminds him that his testimony has a very dangerous enemy."]
    ],
    tf:[
      ["Tom and Huck smuggled tobacco and matches to Potter’s cell.",true,"Their small kindnesses were driven by guilt — and repaid with unbearable gratitude."],
      ["Potter’s lawyer questioned every witness aggressively.",false,"He asked so few questions that the audience murmured in disapproval."],
      ["Tom decided to testify only after Huck persuaded him.",false,"It was Tom’s own conscience: he went to the lawyer by himself the night before."],
      ["Injun Joe escaped through the courtroom window before anyone could stop him.",true,"He struck aside every hand and was gone before a single man had properly risen."],
      ["Muff Potter was found guilty but pardoned by the judge.",false,"He walked out free, blinking in the sunlight, once the truth was told."],
      ["At night Tom dreamed of Injun Joe waiting with a knife.",true,"While the fugitive remained at liberty, neither boy breathed freely."]
    ],
    writing:[
      {task:"Write a short newspaper report about the trial: the evidence against Potter, the surprise witness, and the escape through the window. Include one invented quotation from someone who was there.",
       target:"100–140 words",
       tips:["Give your report a punchy headline","Use passive forms where a reporter would (the knife was identified…)","Keep the tone factual, saving drama for the quotation"],
       starters:["COURTROOM SENSATION AS BOY NAMES REAL KILLER","The trial of Muff Potter took an extraordinary turn yesterday…","Until the defence rose, the verdict seemed certain…","“I never saw a window used so fast,” declared one spectator…"]},
      {task:"Tom broke a promise sworn in blood — and did the right thing. Write an essay discussing when, if ever, it is right to break a promise.",
       target:"100–140 words",
       tips:["Open with a clear position on the question","Use Tom’s dilemma as your central example, weighing both sides","Use linking words of contrast and result (however, even so, therefore)"],
       starters:["We are taught that promises are sacred, but…","Tom Sawyer swore in blood to stay silent — and broke that oath in court…","Some promises protect people; others protect the guilty…","A promise, in the end, is only as good as the reason for keeping it…"]}
    ]},
  { n:7, title:"Looking for Treasure",
    sum:"Treasure fever leads Tom and Huck to a haunted house, where a disguised Injun Joe unearths a box of gold before their hidden eyes. The villains carry it off to a hiding place named only in a riddle: Number Two — under the cross.",
    vocab:[
      ["FORTUNE","a very large amount of money; luck"],
      ["SUSPICIOUS","feeling that something is wrong or someone cannot be trusted"],
      ["VILLAINY","evil or criminal behaviour"],
      ["DISGUISE","clothes or appearance that hide who you really are"],
      ["REVENGE","harm done to someone in return for harm they caused"],
      ["RIDDLE","a puzzling question or mystery"],
      ["TAVERN","an inn where drinks are served and travellers stay"],
      ["RUIN","a badly damaged building; destruction"],
      ["TWILIGHT","the dim light just after sunset"],
      ["PARALYSED","unable to move"],
      ["WEALTH","a large quantity of money and possessions"],
      ["LABOUR","hard physical work"]
    ],
    comp:[
      ["According to Tom’s confident science, where is treasure always buried?",["In church cellars","Under haunted houses or dead-limbed trees, at midnight","On river islands","In graveyards only"],1,"Tom explains it with total authority — buried by robbers who never, for professional reasons, come back."],
      ["Why can’t the boys escape when the two men enter the house?",["The door is locked","The stairs would betray them instantly","They are tied up","They want to stay"],1,"Flat on the dusty boards upstairs, they can only lie still: one creak of the stairs would give them away."],
      ["What finally reveals the deaf-and-mute Spaniard’s identity?",["His face under the hat","His voice — it is Injun Joe’s","A scar on his hand","The other man names him"],1,"A deaf-and-mute man who speaks is a poor actor: the voice belongs to Injun Joe."],
      ["What do the villains discover while burying their silver?",["A skeleton","A rotten box heavy with gold coins","A trapdoor","The boys’ tools only"],1,"Joe’s knife strikes wood, and out comes a fortune buried long ago by some forgotten gang."],
      ["Why does Injun Joe refuse to leave the gold in the house?",["The box is too heavy","The fresh-earthed pick and shovel make him suspicious that someone has been there","The house is collapsing","He trusts nobody"],1,"The boys’ own tools nearly betray them: somebody had been here, and might return."],
      ["What is “Number Two — under the cross”?",["A grave in the cemetery","The riddle naming the villains’ new hiding place","A page in the Bible","A room in the school"],1,"Joe names his den only in a riddle — and the boys inherit the puzzle along with the gold fever."],
      ["Where does Tom decide Number Two must be?",["Under the church cross","Room two of the riverside tavern, kept permanently locked","The second island","Cardiff Hill"],1,"After rejecting mysteries all over town, he reasons his way to the tavern’s locked second room."],
      ["Why is the boys’ discovery both thrilling and hopeless?",["The gold is fake","A fortune lies in plain sight — guarded by the most dangerous man alive","They cannot count that high","The box is empty"],1,"Wealth close enough to smell, and Injun Joe between them and it: glorious and impossible at once."]
    ],
    tf:[
      ["Tom believed treasure was always guarded by living pirates.",false,"His theory was the opposite: those who buried it never came back for it."],
      ["The boys were upstairs when the two men entered the house.",true,"They had just climbed up — and spent the visit flat on the boards, peering through cracks."],
      ["Injun Joe was disguised as a deaf-and-mute Spaniard.",true,"The disguise had been seen around town; only his voice gave him away."],
      ["The box of gold had been buried recently by Injun Joe himself.",false,"It was buried long ago by some forgotten gang — thousands of dollars of it."],
      ["The villains left the gold buried in the corner of the haunted house.",false,"Grown suspicious, they carried the whole treasure off to Number Two."],
      ["Tom found Injun Joe asleep on the floor of the tavern room.",true,"He slipped in one night and stumbled out white-faced with the news."]
    ],
    writing:[
      {task:"Write a story that ends with the words: “…and from the dusty floorboards above, two pairs of eyes watched the gold disappear into the night.”",
       target:"100–140 words",
       tips:["Build suspense before the men arrive — sounds, dust, waiting","Use the boys’ limited view (cracks in the floor) to create tension","Land exactly on the required final sentence"],
       starters:["The haunted house had been silent for years…","We only meant to stay five minutes…","Below us, a spade rang against something wooden…","Nobody breathed as the box came out of the earth…"]},
      {task:"Write an email to Huck (who cannot read very well, so keep it clear!) proposing a plan to find Number Two. Explain your reasoning about the tavern and give instructions for the night watch.",
       target:"100–140 words",
       tips:["Use short sentences and clear sequencing (first, then, if…)","Explain the reasoning simply: why the tavern? why room two?","Include one precaution in case Injun Joe appears"],
       starters:["Huck — read this twice, then burn it…","I have worked out what Number Two means…","Here is the plan, and it cannot fail (probably)…","If you see the Spaniard, do not follow him alone…"]}
    ]},
  { n:8, title:"Lost in the Cave",
    sum:"Becky’s picnic ends with her and Tom lost for days in the labyrinth of McDougal’s Cave — where Injun Joe is hiding too. After their escape the cave is sealed, the villain meets his end behind the iron door, the gold is dug up under the cross, and Huck faces the gravest danger of all: being adopted and civilised.",
    vocab:[
      ["LABYRINTH","a confusing network of passages; a maze"],
      ["PASSAGE","a long narrow way through a cave or building"],
      ["DESPAIR","the complete loss of hope"],
      ["ENCOUNTER","an unexpected meeting"],
      ["SEALED","closed so firmly that nothing can enter or leave"],
      ["CAVERN","a large underground chamber in a cave"],
      ["PANIC","sudden uncontrollable fear"],
      ["PITY","sympathy and sorrow for someone’s suffering"],
      ["ADOPTED","legally taken into a family as their own child"],
      ["CIVILISATION","organised society with its rules and comforts"],
      ["ENTRANCE","the way into a place"],
      ["INEVITABLE","certain to happen; unavoidable"]
    ],
    comp:[
      ["How do Tom and Becky become separated from the picnic party?",["They leave before lunch","They wander deep while exploring, until bats drive them down unknown passages","Injun Joe leads them away","They fall through a hole"],1,"Marking their way with candle smoke, they drift too far — then panic and the bats finish the job."],
      ["How does Tom explore the side passages once their light is nearly gone?",["Feeling along the walls","With a kite string tied to a rock","By dropping breadcrumbs","Following the bats"],1,"The kite string is his lifeline back to Becky through the dark."],
      ["Who rises from behind a stone column during one exploration?",["Muff Potter","Injun Joe, holding a candle","Judge Thatcher","A searcher from town"],1,"A hand with a candle, then the face of Injun Joe — Tom flees, grateful the echoes hide his identity."],
      ["How do the children finally escape the cave?",["Rescuers dig them out","Tom finds a speck of daylight — a hole opening on the riverbank five miles from the entrance","They retrace the smoke marks","Becky remembers the way"],1,"The far-off speck widens into the blessed evening light above the Mississippi."],
      ["Why does Judge Thatcher have the cave entrance sealed?",["To trap Injun Joe deliberately","To protect future picnickers from being lost","To guard the treasure","To stop the bats"],1,"The iron door is pure safety policy — nobody knows the fugitive is still inside."],
      ["What scene meets the men who open the iron door?",["An empty cave","Injun Joe dead just behind it, knife broken from useless digging","The box of gold","A tunnel to the river"],1,"He died at the threshold, face pressed to the crack of light — a grim end even Tom pities."],
      ["Why does Tom, of all people, feel pity for Injun Joe?",["He never feared him","He has felt the same darkness and hunger of the cave himself","The Judge orders mourning","He doubts Joe’s guilt"],1,"Having starved in that same blackness, Tom understands exactly how the villain died."],
      ["What does Huck consider the gravest danger in the whole story?",["Injun Joe’s ghost","Being adopted and civilised — collars, meals and manners","Losing the gold","Tom’s robber gang"],1,"The Widow’s kindness comes with clean collars and regular meals; Huck endures it only for the gang."]
    ],
    tf:[
      ["Tom and Becky marked their route with candle smoke.",true,"That was their system — until panic and the bats drove them off the marked path."],
      ["Their candles were blown out by a sudden wind from the entrance.",false,"Bats attacked the candles; later the final candle drowned in its own wax."],
      ["Tom explored the side passages holding a kite string.",true,"The string, tied to a rock, let him find his way back to Becky."],
      ["Tom and Becky escaped through the main entrance of the cave.",false,"They squeezed out of a hole in the riverbank, five miles from the cave’s mouth."],
      ["Injun Joe was found dead just behind the iron door.",true,"His knife was broken from useless digging against the sealed entrance."],
      ["Huck refused the Widow Douglas and ran away to the island forever.",false,"He endured adoption, barely — because Tom promised him a place in the robber gang."]
    ],
    writing:[
      {task:"Tell the story of being lost somewhere — a cave, a forest, a foreign city (real or imagined). Describe how you got lost, what you felt, and how you found your way out.",
       target:"100–140 words",
       tips:["Use the senses: darkness, echoes, cold, silence","Show your feelings changing from confidence to panic to relief","Vary sentence length — short sentences raise the tension"],
       starters:["It only takes one wrong turn…","At first, getting lost felt like part of the adventure…","I called out, and my own voice answered me…","When I finally saw daylight, I understood Tom Sawyer perfectly…"]},
      {task:"Huck writes to Tom complaining about civilised life with the Widow Douglas — clean collars, regular meals, table manners — and asking whether the robber gang is still on. Write his letter with some humour.",
       target:"100–140 words",
       tips:["Keep Huck’s voice: informal, funny, slightly rebellious","List his sufferings — the more respectable, the more terrible","End with the question about the gang and a condition or two"],
       starters:["Tom — they wash me. On purpose. Every day…","Being rich is harder work than being poor ever was…","The Widow means kind, but her kindness has a collar on it…","So tell me straight: is the gang still on, or have I suffered for nothing?"]}
    ]}
];

const READINGS = {
1:[
"In the drowsy riverside town of St. Petersburg, Missouri, lived a boy named Tom Sawyer, whose gift for mischief was admired and dreaded in roughly equal measure. He stayed with his Aunt Polly, a kind-hearted woman who loved him fiercely and scolded him constantly, usually in that order. Tom was not wicked, exactly; he simply found rules unbearable and adventures irresistible, and whenever trouble visited the neighbourhood, everyone knew whose reputation would be examined first.",
"One Friday, Tom escaped school, swam in the forbidden river and came home with his collar suspiciously clean, since he had sewn it back himself. Unfortunately, his half-brother Sid noticed that the thread had changed colour, and Aunt Polly’s patience finally collapsed. Determined to punish him properly, she announced a sentence that hurt worse than any whipping: on Saturday morning, while every free boy in town was out playing, Tom would whitewash the enormous fence in front of the house.",
"Saturday arrived, bright and green and full of summer promise, and Tom surveyed the fence with deep sorrow: thirty yards of board, nine feet high. He dipped his brush, painted a stripe, compared it with the continent of unpainted wood, and sat down discouraged. The thought of the other boys arriving to laugh at him burned like fire. Then, at that dark and hopeless moment, an inspiration burst upon him — nothing less than a magnificent, glorious scheme.",
"Ben Rogers appeared first, munching an apple and imitating a steamboat. He had come to mock, but Tom ignored him completely, stepping back from the fence like an artist admiring a masterpiece. Painting, Tom explained carelessly, was not work at all; it was a rare privilege, since a fence facing the street could hardly be trusted to just anybody. Ben laughed, then hesitated, then begged. Only after surrendering his apple was he generously permitted to take the brush.",
"All afternoon the trap worked beautifully. Boy after boy came to sneer, stayed to watch, and finally paid for the honour of working in the sun. By evening the fence wore three glorious coats of whitewash, and Tom sat upon a barrel counting his new possessions: twelve marbles, a brass doorknob, a one-eyed kitten, a dead rat on a string, and much more. He had discovered that envy, properly managed, is the most profitable force in the world.",
"Aunt Polly, inspecting the gleaming fence, was so astonished that she rewarded Tom with an apple and a short lecture on honest effort, both of which he accepted gracefully. Tom had stumbled upon a great law of human nature: to make somebody desire a thing, you need only make that thing difficult to obtain. Work, he now understood, is whatever a person must do, while play is whatever a person chooses to do — a cunning distinction indeed."
],
2:[
"On Sunday morning the Sawyer household went to war with soap and water. Tom was scrubbed, combed and buttoned into his stiff Sunday clothes until he felt, in his own words, uncomfortably clean and respectable. At Sunday school each pupil was expected to memorise verses from the Bible, and any child patient enough to recite two thousand of them was awarded a magnificent prize Bible in front of the whole admiring school. Tom had never come remotely close.",
"The school rewarded memorised verses with coloured tickets: blue, red and yellow, each worth a fixed number of the others, like a small religious currency. Tom, who could not sit still long enough to learn a single verse, saw a faster road to glory. In the yard he began to bargain, trading the treasures earned at the fence for tickets. One boy took a marble; another accepted a fish-hook; slowly, an impressive fortune of tickets filled his pockets.",
"That morning an important visitor sat at the front of the church: Judge Thatcher, a great man from Constantinople, twelve whole miles away. Beside him sat his daughter Becky, a lovely blue-eyed girl with golden hair, and the moment Tom saw her his heart surrendered without a struggle. Amy Lawrence, whom he had adored faithfully for at least a week, vanished from his memory. Tom instantly began showing off in every way known to boyhood.",
"Hungry to impress Becky, Tom marched forward and presented his tickets, demanding the prize Bible. The superintendent was astonished; frankly, he would sooner have expected lightning indoors. Yet the tickets were genuine, and the exchange had to be honoured. Tom was lifted to the platform beside the Judge and announced as a boy of remarkable learning, while the real students, who had sold their glory for marbles and fish-hooks, watched in silent, miserable admiration.",
"Then came the disaster. Wishing to display his new star, the Judge asked Tom a simple, solemn question: could he name the first two disciples? The congregation leaned forward. Tom turned red, stared at his boots, and searched an entirely empty mind. Finally, in desperation, he announced with great confidence that the first two disciples were David and Goliath. Let us, as Mark Twain himself suggested, kindly draw a curtain over the rest of that scene.",
"His moment of triumph had collapsed into public humiliation, yet Tom recovered with the speed of a rubber ball. School, after all, still contained Becky Thatcher. He passed her a peach, performed dangerous stunts on fences, and wrote something on his slate which he hid with theatrical care until curiosity forced her to look. There, in proud letters, stood the words that had cost him all his dignity to write: a simple, reckless declaration of love."
],
3:[
"Huckleberry Finn was the envy of every boy in St. Petersburg: son of the town drunkard, he slept in empty barrels, wore cheerful rags, and answered to no one alive. Respectable mothers dreaded him; their sons worshipped him. Huck was also a walking library of superstition, and it was he who explained to Tom the approved method for curing warts: carry a dead cat to a graveyard at midnight and wait for the devils to arrive.",
"So it was that, near midnight, two small figures crept between the crooked wooden markers of the old graveyard, a dead cat swinging between them. The wind moaned exactly as wind should in such a place, and the boys spoke in whispers. Suddenly voices approached — human ones, which somehow felt worse. The boys flattened themselves behind three great elms as lantern light revealed Doctor Robinson, followed by Muff Potter and a dark, dangerous man: Injun Joe.",
"The three men had come to dig up a fresh grave, for the young doctor needed a corpse for his medical studies. When the work was done, Injun Joe demanded extra money and then something darker: payment for an old insult. Years before, he snarled, the doctor’s family had driven him away like a beggar, and he had sworn vengeance. The quarrel exploded. Potter was knocked senseless, and Injun Joe drove Potter’s knife deep into the doctor.",
"What followed was colder than the murder itself. Injun Joe placed the bloody knife in the open hand of the unconscious Muff Potter and waited, patient as a cat. When Potter woke, confused and trembling, Joe gently informed him that he had killed the doctor in his drunkenness. Poor Potter, who could remember nothing, believed him at once and begged him to keep the secret. Joe promised — and the two boys, watching in terror, understood everything.",
"Tom and Huck ran until their lungs burned, and stopped inside the ruined tannery to face an ugly truth: they were the only honest witnesses to a murder, and the murderer was the most feared man in the region. If they spoke and Injun Joe was not hanged, how long would either witness survive? They took a scrap of board, and with a splinter dipped in their own blood, each boy signed a solemn oath of silence.",
"By noon the next day the town knew everything — or believed it did. The knife had been identified as Muff Potter’s, and when the harmless old man was arrested, Injun Joe calmly accused him to his face and nobody doubted the story. Tom’s conscience began a long, quiet war against his fear. He slept badly, muttered about blood in his dreams, and took to smuggling small comforts to the innocent prisoner behind the barred window."
],
4:[
"Life, Tom decided, was hardly worth the trouble. Becky Thatcher had frozen him out, Aunt Polly had blamed him unjustly, and the world clearly did not appreciate him. He resolved to lead a life of crime. Conveniently, he met Joe Harper, whose mother had just punished him for cream he had never tasted, and the two injured souls recruited Huckleberry Finn, who joined cheerfully, having no plans and no supper. They would become pirates.",
"At midnight the three conspirators met on the riverbank above town, each having stolen provisions in strict pirate fashion: a boiled ham, some bacon, a frying pan and half-cured tobacco leaves. They borrowed a small raft — pirates never merely take things — and pushed out onto the huge, whispering Mississippi. Tom commanded in a low, dramatic voice, ordering imaginary crews about, and two hours later the expedition landed on the deserted shore of Jackson’s Island.",
"The first days were pure glory. The pirates swam every hour, fried fish they had caught themselves, and lay in the shade arguing about whether hermits or pirates enjoyed the better career. Nobody ordered them to wash, study or attend church. Freedom, served with fried fish, tasted magnificent. Yet each evening, as the campfire sank and the dark river murmured around their island, a suspicious silence settled over three boys who were all secretly thinking about home.",
"On the second afternoon a ferryboat came puffing down the river, crowded with people, firing a cannon over the water. Huck knew the custom: cannon fire was believed to bring a drowned body to the surface. The truth landed on the pirates all at once — the entire town was searching for them. They were not runaways; they were tragic heroes, mourned and adored. It was, all three agreed, almost worth being dead just to hear about it.",
"Glory, however, is a thin blanket on a cold night. By the third day Joe Harper was openly homesick, and even Huck admitted that solitude had its limits. Tom mocked them both as babies, but privately he was fighting the same battle; he had already crept out one night and slipped across the river on a secret errand of his own. When rebellion threatened to end the adventure, Tom revealed a plan so splendid that both pirates agreed to stay.",
"That night a tremendous thunderstorm attacked the island, tearing their tent to rags and driving the drenched pirates under a great oak while lightning turned the river white. Morning found them muddy, smoky and enormously pleased with themselves, playing at being a tribe of hostile natives to vary the programme. But under everything ran Tom’s secret: the date of a certain funeral in St. Petersburg, and the sensation three drowned boys might cause by attending it personally."
],
5:[
"While the pirates feasted on fish, St. Petersburg drowned in grief. The search had found nothing but an abandoned raft, and hope quietly died. Becky Thatcher wandered miserably around the empty schoolyard, wishing she had kept a certain brass doorknob given to her by a boy she had treated coldly. Aunt Polly’s grey head bent lower each day, and the villagers agreed, with real tears, that they had never properly valued those remarkable children.",
"What nobody knew was that Tom had already been home. On his secret night errand he had crossed the river, slipped through the back door, and hidden under Aunt Polly’s bed to eavesdrop while she wept over him with Mrs Harper. Lying in the dust, inches from her feet, Tom heard himself forgiven, praised and mourned, and very nearly crawled out to end her misery. Instead he kissed her sleeping face, left no note, and vanished again.",
"On Sunday the church bell tolled slowly, and the whole village gathered in black. Nobody could remember the little church ever being so full, or so quiet. The minister delivered a moving sermon about the three lost boys, discovering in them virtues and graces that, in life, had somehow resembled faults deserving of the whip. Soon the entire congregation was sobbing aloud, and the minister himself broke down and wept over his notes in the pulpit.",
"At that precise moment the church door creaked. The minister raised his streaming eyes — and froze. Down the aisle, in solemn procession, marched the three dead boys: Tom in the lead, Joe Harper next, and a deeply embarrassed Huck creeping behind in his rags. They had been hiding in the empty gallery, listening with professional interest to their own funeral. The congregation stared at the returned pirates as though eternity itself had opened for inspection.",
"Then joy exploded. Aunt Polly and Mrs Harper threw themselves upon their restored boys, smothering them with kisses and thanks, while poor Huck stood alone, unclaimed, until Tom protested that somebody ought to be glad to see Huck too — whereupon Aunt Polly hugged him as well, embarrassing him beyond rescue. The minister shouted for the great hymn of thanksgiving, and the congregation sang it with such force that the roof timbers trembled overhead.",
"Tom Sawyer returned to school a celebrity of the first rank. Smaller boys followed him in worshipful processions, and he related his adventures to any audience, improving them generously with each telling. Yet a small worm of remorse gnawed at his glory: Aunt Polly had learned about the secret visit and asked, quietly, how he could let her suffer so long for the sake of a joke. Tom discovered that triumph and shame can share one heart."
],
6:[
"Summer should have been delicious, but a shadow lay over it: the murder trial of Muff Potter was approaching, and every mention of it froze Tom’s blood. He and Huck met privately to reassure each other that their oath still held, and to confirm, in whispers, that Injun Joe was still the most terrifying man alive. Meanwhile they smuggled tobacco and matches to Potter’s cell window, and his tearful gratitude punished them worse than any court.",
"When the trial opened, the courtroom was packed to the walls. Witness after witness described Muff Potter washing in the creek at dawn, and the famous knife was displayed beside the evidence that condemned him. Potter’s own lawyer asked so few questions that the audience murmured in disapproval; the case appeared hopeless. The prisoner sat pale and hollow-eyed, while in a corner, sweating quietly, sat a small boy who knew exactly how hopeless it truly was.",
"Then the defence rose and pronounced words that emptied every lung in the courtroom: call Thomas Sawyer. Astonishment swept the benches, and Injun Joe’s iron face flickered for the first time. Tom took the stand looking small and thoroughly frightened, for his conscience had finally defeated his terror; he had gone to the lawyer the night before and confessed everything. The oath sworn in blood had weighed less, in the end, than an innocent man’s life.",
"Haltingly at first, then with gathering courage, Tom delivered his testimony: the graveyard, the midnight moon, the quarrel over old insults, the flash of the knife. The courtroom hung on every syllable, and even the judge leaned forward. Tom described how Doctor Robinson fell, how Muff Potter lay senseless, and how the true murderer wiped the blade clean. As the story reached its climax, every eye in the room swung towards Injun Joe.",
"But Injun Joe had already made his decision. Quick as lightning he tore through the astonished crowd, struck aside every hand that reached for him, leapt through the tall courtroom window and was gone before a single man had properly risen. The pursuit found nothing; the fugitive had melted into the countryside. Muff Potter walked out free, blinking in the sunlight, and the town that had been ready to hang him now competed to feed him dinner.",
"Tom was a shining hero once more — the pride of the old, the envy of the young, his name immortal in the local newspaper. Some even predicted he would be President, provided he escaped hanging first. But night reversed everything. In his dreams Injun Joe waited endlessly at the window, knife in hand. Huck, whose part the lawyer had kept secret, shared the dread, and neither boy breathed freely while the fugitive remained at liberty."
],
7:[
"With Injun Joe vanished and summer stretching ahead, Tom developed a new fever: buried treasure. He explained the science of it to Huck with total authority — treasure is always buried under haunted houses or dead-limbed trees, always at midnight, and always by pirates or robbers who never, for professional reasons, come back for it. Huck, who had no prejudices against sudden wealth, agreed to invest his labour, and the partners began to dig.",
"Several holes and zero fortunes later, the partners transferred their operations to the haunted house on Cardiff Hill, a sagging, shutterless ruin that every sensible person avoided. They explored the ground floor, hearts knocking, then climbed upstairs. At that exact moment the front door opened below them. Flat on the dusty boards, peering through cracks in the floor, the boys watched two men enter — a ragged stranger, and a deaf-and-mute Spaniard recently seen around town.",
"Then the Spaniard spoke, and the boys nearly stopped breathing: it was the voice of Injun Joe. The disguise hid everything but his villainy. The two men discussed a past robbery and one more job of dangerous revenge still to be done, then settled down to sleep, while overhead two paralysed boys counted the endless minutes and regretted every decision that had ever brought them near Cardiff Hill. Escape was impossible; the stairs would betray them instantly.",
"Waking, the villains decided to bury their small bag of stolen silver in the corner of the room — and while digging the hole, Injun Joe’s knife struck wood. Minutes later they dragged out a rotten box heavy with gold coins: thousands of dollars, buried long ago by some forgotten gang. Above the ceiling, two hearts nearly burst with excitement. Fortune lay in plain sight below them, close enough to smell, and guarded by the worst man alive.",
"But luck turned traitor. Noticing the boys’ pick and shovel, still shining with fresh earth, Injun Joe grew suspicious: somebody had been here, and might return. He would not bury the gold now. Instead the men would carry the whole treasure to another hiding place — a den he called simply “Number Two — under the cross.” With that riddle hanging in the dusty air, the villains shouldered the box and disappeared into the twilight.",
"The boys crept home haunted by golden visions and one burning riddle. What was Number Two? After rejecting addresses and mysteries all over town, Tom reasoned it might be room two of the riverside tavern, whose second room was kept permanently locked. One night he slipped in through the back and stumbled out again, white-faced: Injun Joe lay asleep on the floor inside. The partners organised a patient watch, Huck standing guard over the alley nightly."
],
8:[
"Becky Thatcher’s long-promised picnic finally took place on a golden Saturday. A ferryboat carried the young people downriver to a wooded valley, and after lunch somebody shouted the inevitable suggestion: the cave! Armed with candles, the whole company poured into McDougal’s Cave, a vast labyrinth of crooked passages where, it was said, a person might wander for days among tangled corridors without ever finding the entrance again. Nobody, of course, believed anything so gloomy.",
"Tom and Becky, exploring hand in hand, drifted farther than the rest, marking their way with candle smoke. They discovered a natural staircase, then a hidden spring, then a cavern hung with glittering stalactites — and then bats attacked their candles, driving them in panic down unknown passages. When the silence finally settled, they called until their voices cracked, but only echoes answered. The two children were hopelessly lost in the dark heart of the hill.",
"Three days of darkness followed. They shared the last piece of picnic cake as solemnly as a wedding feast, drank from the spring, and watched their final candle drown in its own wax. Becky slept while Tom explored side passages with a kite string tied to a rock. On one such expedition a hand holding a candle rose suddenly from behind a stone column — and above it appeared the face of Injun Joe. Tom fled, silently thanking the echoing dark.",
"Hunger and despair had nearly finished them when Tom, crawling along yet another passage, saw a far-off speck of daylight. It grew, it widened, and suddenly he was looking at the broad, rolling Mississippi from a hole in the riverbank five miles from the cave’s mouth. He fetched Becky, and the two prisoners squeezed out into the blessed evening light. When they were carried into town, half the population turned out, laughing, weeping and ringing bells.",
"Two weeks later Tom mentioned his cave encounter to Judge Thatcher and received news that turned him white: to protect future picnickers, the Judge had ordered the cave’s entrance sealed with an iron door. Injun Joe was still inside. When the door was opened, the fugitive lay dead just behind it, his knife broken from useless digging, his face pressed to the crack of light. Even Tom, who had every reason to hate him, felt pity.",
"For Tom had solved the riddle at last: the cross was inside the cave, marked in candle smoke upon a great rock, and beneath it the partners dug up the box of gold — more than twelve thousand dollars, real and countable. The kind Widow Douglas, scandalised that a rich boy should sleep in empty barrels, adopted Huck, condemning him to clean collars, regular meals and civilisation. Huck endured it, barely, because Tom promised him a place in his robber gang."
]
};

const EVENTS={
1:{ev:["Aunt Polly discovers Tom’s trick with the collar and loses her patience.","Tom is sentenced to whitewash the enormous fence on Saturday morning.","Staring at the unpainted boards, Tom is struck by a glorious scheme.","Ben Rogers trades his apple for the privilege of painting.","Boy after boy pays Tom with small treasures for a turn with the brush.","The fence ends the day wearing three coats of whitewash, and Tom feels rich."],
   keys:["collar","fence","scheme","apple","brush","whitewash"]},
2:{ev:["Tom is scrubbed, combed and forced into his stiff Sunday clothes.","In the yard, Tom trades his fence treasures for coloured tickets.","Judge Thatcher and his daughter Becky sit at the front of the church.","Tom presents his tickets and claims the prize Bible.","Asked to name the first two disciples, Tom answers David and Goliath.","Tom writes a reckless declaration of love on his slate for Becky to find."],
   keys:["Sunday","tickets","Becky","Bible","Goliath","slate"]},
3:{ev:["Tom and Huck carry a dead cat to the graveyard at midnight.","Doctor Robinson, Muff Potter and Injun Joe arrive to dig up a fresh grave.","Injun Joe demands payment for an old insult and the quarrel explodes.","Injun Joe kills the doctor with Muff Potter’s own knife.","The terrified boys sign an oath of silence in their own blood.","Muff Potter is arrested while Tom’s conscience begins its long war."],
   keys:["graveyard","grave","quarrel","knife","oath","conscience"]},
4:{ev:["Tom, Joe Harper and Huck agree to run away and become pirates.","At midnight the three load their stolen provisions onto a raft.","The expedition lands on the deserted shore of Jackson’s Island.","A ferryboat fires a cannon to raise the boys’ drowned bodies.","Joe grows openly homesick and rebellion threatens the crew.","A thunderstorm wrecks the camp, but Tom’s secret plan keeps the pirates together."],
   keys:["pirates","provisions","expedition","cannon","homesick","thunderstorm"]},
5:{ev:["The town gives up the search after finding only the abandoned raft.","Tom hides under Aunt Polly’s bed to eavesdrop on her grief.","The whole village fills the church for the boys’ funeral.","The minister’s sermon leaves the entire congregation sobbing.","The three dead pirates march down the aisle in solemn procession.","Joy explodes, Huck gets hugged, and the hymn shakes the roof timbers."],
   keys:["raft","eavesdrop","funeral","sermon","aisle","hymn"]},
6:{ev:["Tom and Huck smuggle small comforts to Potter’s cell window.","The trial opens and the evidence condemns Muff Potter.","The defence calls a surprise witness: Thomas Sawyer.","Tom delivers his testimony about the night in the graveyard.","Injun Joe leaps through the courtroom window and escapes.","Muff Potter is set free, but at night Tom dreads the escaped fugitive."],
   keys:["cell","evidence","witness","testimony","window","fugitive"]},
7:{ev:["Tom convinces Huck that buried treasure is waiting under haunted houses.","The partners explore the haunted house and hide upstairs.","The ragged stranger’s companion turns out to be Injun Joe in disguise.","While burying their silver, the villains strike a box full of gold.","Grown suspicious, Joe moves the treasure to Number Two — under the cross.","Tom finds Injun Joe asleep in the locked room of the tavern."],
   keys:["treasure","upstairs","disguise","gold","cross","tavern"]},
8:{ev:["The picnic party pours into McDougal’s Cave armed with candles.","Bats attack the candles and drive Tom and Becky down unknown passages.","Exploring with a kite string, Tom comes face to face with Injun Joe.","Tom spots a speck of daylight and the prisoners escape through the riverbank.","The cave is sealed with an iron door — and becomes Injun Joe’s tomb.","The gold is dug up under the cross, and the Widow Douglas adopts Huck."],
   keys:["picnic","bats","kite","daylight","sealed","Widow"]}
};

return {level:'B2', lead:'Mark Twain · retelling · <b>B2 upper-intermediate</b> (≈2,000 headwords)',
  CHAPTERS:CHAPTERS, READINGS:READINGS, EVENTS:EVENTS};
})();
