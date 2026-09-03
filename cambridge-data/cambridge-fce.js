const CAM_FCE = {
id:"fce", name:"B2 First (FCE)", level:"b2",
examInfo:{
  title:"B2 First (FCE)", level:"B2",
  overview:"B2 First proves you can use everyday written and spoken English at an upper-intermediate level for work or study purposes.",
  papers:[
    {name:"Reading & Use of English",duration:"75 minutes",parts:7,questions:52},
    {name:"Writing",duration:"80 minutes",parts:2,questions:2},
    {name:"Listening",duration:"40 minutes",parts:4,questions:30},
    {name:"Speaking",duration:"14 minutes",parts:4,questions:null}
  ],
  paperDetails:[
    {paper:"Reading & Use of English",parts:[
      {part:1,name:"Multiple-choice cloze",questions:8,description:"Text with 8 gaps. Choose A-D. Tests vocabulary and collocations."},
      {part:2,name:"Open cloze",questions:8,description:"Text with 8 gaps. Write the missing word. Tests grammar."},
      {part:3,name:"Word formation",questions:8,description:"Use the given word to form the correct word for each gap."},
      {part:4,name:"Key word transformations",questions:6,description:"Complete a sentence using a given word so it means the same."},
      {part:5,name:"Multiple choice (text)",questions:6,description:"Read a text and answer 6 four-option questions."},
      {part:6,name:"Gapped text",questions:6,description:"Six sentences removed. Choose from seven to fill gaps."},
      {part:7,name:"Multiple matching",questions:10,description:"Match questions to sections of a text."}
    ]},
    {paper:"Writing",parts:[
      {part:1,name:"Compulsory essay",questions:1,description:"Write an essay (140-190 words) giving your opinion."},
      {part:2,name:"Choice task",questions:1,description:"Article, email/letter, report, or review (140-190 words)."}
    ]},
    {paper:"Listening",parts:[
      {part:1,name:"Multiple choice (extracts)",questions:8,description:"Eight short recordings, one question each."},
      {part:2,name:"Sentence completion",questions:10,description:"Complete sentences from a monologue."},
      {part:3,name:"Multiple matching",questions:5,description:"Five speakers matched to options."},
      {part:4,name:"Multiple choice (long)",questions:7,description:"Long recording, 7 questions."}
    ]}
  ],
  tips:[
    "Part 1 tests collocations and fixed phrases - learn common combinations.",
    "Open cloze answers are usually grammar words (articles, pronouns, prepositions, auxiliaries).",
    "In word formation, check if you need a prefix, suffix, or both.",
    "Key word transformations use 2-5 words including the key word.",
    "In writing, use clear paragraphs and varied linking words."
  ],
  scales:{pass:160,grade_B:173,grade_A:180,maxScore:190}
},
lessons:[
// ===== TEST 1: TECHNOLOGY & DIGITAL LIFE =====
{
  id:"fce-t1",name:"Practice Test 1 - Technology & Digital Life",
  exercises:[
    {type:"mc",tl:"Use of English",title:"Part 1 - Multiple-choice Cloze",ins:"Choose the correct word (A-D) for each gap.",
     passage:"The way we communicate has been (1)___ transformed by advances in technology over the past two decades. Social media platforms have (2)___ it possible for people to stay in touch with friends and family across the globe, regardless of distance. However, some experts have (3)___ concerns about the impact of excessive screen time on mental health, particularly among young people. Research (4)___ out at several universities suggests that spending more than three hours a day on social media can lead to feelings of anxiety and isolation. Despite these warnings, the (5)___ majority of teenagers continue to use these platforms on a daily basis. Many argue that the benefits far (6)___ the drawbacks, pointing to the sense of community that online groups can provide. Others take a more cautious (7)___ , recommending that parents set clear boundaries around device usage. Whatever your perspective, it is clear that digital communication is here to (8)___ and will continue to shape the way we interact with one another.",
     items:[
       {q:"Gap 1",opts:["deeply","fully","vastly","completely"],ans:2},
       {q:"Gap 2",opts:["done","made","caused","let"],ans:1},
       {q:"Gap 3",opts:["lifted","risen","raised","put"],ans:2},
       {q:"Gap 4",opts:["carried","brought","taken","held"],ans:0},
       {q:"Gap 5",opts:["wide","broad","vast","large"],ans:2},
       {q:"Gap 6",opts:["outweigh","overcome","overtake","outnumber"],ans:0},
       {q:"Gap 7",opts:["method","approach","system","way"],ans:1},
       {q:"Gap 8",opts:["remain","last","stay","keep"],ans:2}
     ]},
    {type:"fl",tl:"Use of English",title:"Part 2 - Open Cloze",ins:"Write the word which best fits each gap.",
     items:[
       {pre:"Many people are not aware",gap:"of",post:"how much personal data they share online every day."},
       {pre:"It was not",gap:"until",post:"the early 2000s that smartphones became widely available."},
       {pre:"The internet has made it easier for people to work from home,",gap:"which",post:"has changed the structure of many companies."},
       {pre:"You can download the app free",gap:"of",post:"charge from the official website."},
       {pre:"There is no point",gap:"in",post:"buying the latest phone if your current one works perfectly well."},
       {pre:"Artificial intelligence is expected to play a much bigger",gap:"role",post:"in education in the coming years."},
       {pre:"She would have finished the online course",gap:"if",post:"she had not been so busy with work."},
       {pre:"The company is looking",gap:"into",post:"ways of making their products more environmentally friendly."}
     ]},
    {type:"wf",tl:"Use of English",title:"Part 3 - Word Formation",ins:"Use the word given to form a word that fits the gap.",
     items:[
       {pre:"The",root:"DEVELOP",gap:"development",post:"of new software takes a great deal of time and effort."},
       {pre:"Many users find the new interface",root:"COMPLETE",gap:"completely",post:"intuitive and easy to navigate."},
       {pre:"There has been a dramatic",root:"IMPROVE",gap:"improvement",post:"in battery life with the latest model."},
       {pre:"It would be",root:"WISE",gap:"unwise",post:"to share your password with anyone you do not trust."},
       {pre:"The company made a public",root:"APOLOGISE",gap:"apology",post:"after the data breach affected millions of customers."},
       {pre:"Online shopping offers greater",root:"CONVENIENT",gap:"convenience",post:"than visiting physical stores."},
       {pre:"The",root:"RELY",gap:"reliability",post:"of the new system has been questioned by several experts."},
       {pre:"It is becoming",root:"INCREASE",gap:"increasingly",post:"difficult to tell real images from those generated by AI."}
     ]},
    {type:"kt",tl:"Use of English",title:"Part 4 - Key Word Transformations",ins:"Use 2-5 words including the word given.",
     items:[
       {src:"She started using social media when she was thirteen.",kw:"BEEN",ans:"has been using social media since",hint:"Present perfect continuous + since"},
       {src:"They did not let us take photos inside the museum.",kw:"ALLOWED",ans:"were not allowed to take",hint:"Passive voice with allow"},
       {src:"I regret not learning to code when I was younger.",kw:"WISH",ans:"wish I had learned to",hint:"Wish + past perfect for past regret"},
       {src:"It is possible that the file was deleted by mistake.",kw:"MAY",ans:"may have been deleted by",hint:"Modal of deduction + passive"},
       {src:"Despite the rain, they went ahead with the outdoor event.",kw:"EVEN",ans:"even though it was raining",hint:"Even though + clause"},
       {src:"He is too young to create an account on that platform.",kw:"ENOUGH",ans:"is not old enough to",hint:"Not + adjective + enough + to"}
     ]},
    {type:"mc",tl:"Reading",title:"Part 5 - Multiple Choice",ins:"Read the text and choose the best answer (A-D).",
     passage:"When Tim Berners-Lee invented the World Wide Web in 1989, he could hardly have imagined how profoundly it would reshape human civilisation. Working at CERN, the European particle physics laboratory in Switzerland, Berners-Lee was simply trying to make it easier for scientists to share research papers. His solution involved combining hypertext with the internet to create a system where documents could be linked together and accessed from anywhere in the world. The first website went live in 1991, and within just a few years, the web had exploded into mainstream use. By the mid-1990s, companies were racing to establish an online presence, and the dot-com boom was in full swing. Some of these early ventures, such as Amazon and eBay, would go on to become global giants. Others, however, collapsed spectacularly when the bubble burst in 2000. What is remarkable about Berners-Lee is that he chose not to patent his invention. He could easily have become one of the wealthiest people on the planet, but he believed that the web should remain open and free for everyone. This decision was instrumental in allowing the rapid growth and democratisation of the internet. Today, Berners-Lee continues to campaign for digital rights and an open web, warning against the concentration of power in the hands of a few large technology corporations. He has expressed concern about the spread of misinformation, the erosion of privacy, and the growing digital divide between those who have access to the internet and those who do not. In recent years, he has been working on a project called Solid, which aims to give individuals greater control over their personal data. Rather than storing information on the servers of big tech companies, Solid allows users to keep their data in personal online vaults called pods. Whether this vision will gain widespread adoption remains to be seen, but Berners-Lee remains optimistic that technology can still be a force for good in the world.",
     items:[
       {q:"What was Tim Berners-Lee originally trying to achieve?",opts:["Create a global communication network","Help scientists exchange research more easily","Build a commercial platform for businesses","Design a new programming language"],ans:1},
       {q:"What happened to many early internet businesses?",opts:["They all became extremely successful","Most were bought by larger companies","Some failed dramatically after 2000","They relocated to Switzerland"],ans:2},
       {q:"Why did Berners-Lee not patent the World Wide Web?",opts:["He did not realise its commercial value","He was not legally permitted to do so","He wanted it to be freely available to all","His employer at CERN held the rights"],ans:2},
       {q:"What does the writer suggest about Berners-Lee today?",opts:["He regrets not making money from his invention","He is worried about certain trends in technology","He has retired from public life","He believes technology companies act responsibly"],ans:1},
       {q:"What is the purpose of the Solid project?",opts:["To replace the World Wide Web entirely","To create faster internet connections","To let people manage their own data","To compete with social media platforms"],ans:2},
       {q:"What is the overall tone of the passage?",opts:["Critical of technology in general","Informative and broadly admiring","Pessimistic about the future of the web","Humorous and light-hearted"],ans:1}
     ]},
    {type:"mc",tl:"Listening",title:"Part 1 - Multiple Choice Extracts",ins:"Listen and choose the correct answer.",
     items:[
       {audio:"Woman: Have you tried that new productivity app everyone is talking about? Man: I downloaded it last week, actually. I thought it would be just another gimmick, but I have to say, it has really helped me organise my schedule. I have been getting so much more done since I started using it.",q:"What is the man's opinion of the app?",opts:["He thinks it is overrated","He finds it genuinely useful","He has not tried it yet"],ans:1},
       {audio:"Man: I read that they are planning to replace all the library computers with tablets. Woman: Really? I am not sure that is a good idea. Students need proper keyboards for writing essays, and tablets just are not the same, are they?",q:"What does the woman think about the plan?",opts:["She is enthusiastic about it","She thinks it will save money","She has doubts about it"],ans:2},
       {audio:"Woman: So how did the online interview go? Man: Well, the connection kept dropping out, which was incredibly frustrating. I think I answered the questions well enough, but I am worried the technical problems may have given a bad impression.",q:"What is the man concerned about?",opts:["He did not prepare enough for the interview","The poor connection may have affected how he came across","He could not understand the interviewer clearly"],ans:1},
       {audio:"Man: I have finally decided to delete my social media accounts. Woman: All of them? That is quite a big step. What made you decide? Man: I just realised I was spending hours scrolling through content that did not really add anything to my life. I would rather use that time to read or exercise.",q:"Why is the man deleting his social media?",opts:["He is worried about his privacy","He wants to spend his time more meaningfully","His friends have stopped using it"],ans:1},
       {audio:"Woman: Did you watch that documentary about artificial intelligence last night? Man: Yes, I found it absolutely fascinating. The part about how AI is being used in healthcare was really eye-opening. I had no idea it could detect diseases earlier than human doctors in some cases.",q:"What impressed the man most?",opts:["The history of AI development","The use of AI in medicine","The dangers of AI technology"],ans:1},
       {audio:"Man: I hear the company is introducing a four-day working week from next month. Woman: That is what they announced, yes. Personally, I am a bit sceptical. I think we will just end up working longer hours on those four days to fit everything in.",q:"How does the woman feel about the four-day week?",opts:["She is excited about having more free time","She doubts it will truly reduce workload","She plans to ask for a pay rise"],ans:1},
       {audio:"Woman: Have you noticed how many people are using electric scooters to get around the city now? Man: Yes, they seem to be everywhere. I must admit, I tried one the other day and it was great fun. Much quicker than walking, and you do not have to worry about parking like you do with a car.",q:"What does the man say about electric scooters?",opts:["They are dangerous and should be banned","They are enjoyable and practical","They are too expensive for most people"],ans:1},
       {audio:"Man: I have been trying to learn Spanish using one of those language apps. Woman: Oh, which one? Man: Duolingo. It is quite addictive, actually. I have done a lesson every day for three months now. But I am not sure I could hold a real conversation yet. I think you need actual practice with native speakers for that.",q:"What does the man think about learning with the app?",opts:["It is a complete waste of time","It is engaging but has limitations","It is better than having a real teacher"],ans:1}
     ]},
    {type:"fl",tl:"Listening",title:"Part 2 - Sentence Completion",ins:"Listen and complete the sentences.",
     audio:"Good morning, everyone. Today I would like to talk to you about the history and future of video gaming. The first commercially successful video game was Pong, which was released way back in 1972. It was a simple table tennis simulation, but it captured the public imagination and launched an entirely new industry. By the early 1980s, home consoles like the Atari 2600 had become hugely popular, although the market suffered a major crash in 1983 due to an oversupply of poor-quality games. It was Nintendo that revived the industry with the release of the Nintendo Entertainment System in 1985. The console introduced iconic characters such as Mario and Zelda, who remain beloved to this day. The 1990s saw fierce competition between Nintendo and Sega before Sony entered the market with the PlayStation in 1994. This was a turning point because the PlayStation attracted an older audience and helped establish gaming as mainstream entertainment rather than just a children's hobby. The early 2000s brought online gaming, which allowed players from different countries to compete against each other in real time. Today, the gaming industry generates more revenue than the film and music industries combined. Looking ahead, many experts believe that cloud gaming will become the dominant model, meaning players will stream games over the internet rather than buying physical discs or downloading large files. Virtual reality is another area of rapid growth, although the technology still needs to become more affordable and comfortable before it achieves mass adoption.",
     items:[
       {pre:"The first major commercial video game, Pong, was a",gap:"table tennis",post:"simulation."},
       {pre:"The video game market experienced a serious",gap:"crash",post:"in 1983."},
       {pre:"The crash was caused by too many",gap:"poor-quality games",post:"on the market."},
       {pre:"Nintendo helped revive the industry in",gap:"1985",post:"with a new console."},
       {pre:"Mario and Zelda are described as",gap:"iconic characters",post:"that people still love."},
       {pre:"Sony released the PlayStation in",gap:"1994",post:"."},
       {pre:"The PlayStation helped gaming become",gap:"mainstream entertainment",post:"rather than just a hobby for children."},
       {pre:"Online gaming allowed players from different countries to compete in",gap:"real time",post:"."},
       {pre:"The gaming industry now earns more than the film and",gap:"music industries",post:"combined."},
       {pre:"Virtual reality needs to become more affordable and",gap:"comfortable",post:"before most people adopt it."}
     ]},
    {type:"wr",tl:"Writing",title:"Part 1 - Essay",ins:"Write an essay (140-190 words).",
     prompt:"In your English class you have been discussing how technology affects daily life. Now your teacher has asked you to write an essay. Write an essay discussing two of the following points: 1) communication 2) education 3) health. Remember to give reasons for your opinions and include an introduction and conclusion.",minWords:140}
  ]
},
// ===== TEST 2: ENVIRONMENT & SUSTAINABILITY =====
{
  id:"fce-t2",name:"Practice Test 2 - Environment & Sustainability",
  exercises:[
    {type:"mc",tl:"Use of English",title:"Part 1 - Multiple-choice Cloze",ins:"Choose the correct word (A-D) for each gap.",
     passage:"Climate change is widely (1)___ as one of the greatest challenges facing humanity today. Scientists have been warning for decades that rising temperatures could have devastating (2)___ on ecosystems around the world. Despite growing awareness, many governments have been slow to (3)___ action. The burning of fossil fuels continues to release vast quantities of carbon dioxide into the atmosphere, contributing to the greenhouse (4)___. Meanwhile, deforestation in tropical regions is destroying habitats and reducing the planets ability to absorb CO2. Some countries have made significant (5)___ towards reducing their carbon footprint by investing in renewable energy sources such as wind and solar power. However, critics argue that these efforts are simply not enough to (6)___ the damage that has already been done. There is a growing (7)___ among scientists that we are running out of time. Unless dramatic changes are made within the next decade, the consequences for future generations could be (8)___.",
     items:[
       {q:"Gap 1",opts:["believed","regarded","thought","viewed"],ans:1},
       {q:"Gap 2",opts:["results","effects","reactions","causes"],ans:1},
       {q:"Gap 3",opts:["make","do","take","have"],ans:2},
       {q:"Gap 4",opts:["effect","result","outcome","product"],ans:0},
       {q:"Gap 5",opts:["progress","advance","development","movement"],ans:0},
       {q:"Gap 6",opts:["repair","undo","fix","restore"],ans:1},
       {q:"Gap 7",opts:["agreement","consensus","harmony","unity"],ans:1},
       {q:"Gap 8",opts:["severe","strong","heavy","hard"],ans:0}
     ]},
    {type:"fl",tl:"Use of English",title:"Part 2 - Open Cloze",ins:"Write the word which best fits each gap.",
     items:[
       {pre:"Global warming is caused",gap:"by",post:"the excessive burning of fossil fuels."},
       {pre:"Unless we take immediate action, the situation will get",gap:"worse",post:"over the coming decades."},
       {pre:"Recycling is one way",gap:"in",post:"which individuals can help reduce waste."},
       {pre:"The government has",gap:"been",post:"criticised for not doing enough to protect natural habitats."},
       {pre:"Many species are",gap:"at",post:"risk of extinction due to habitat loss."},
       {pre:"Solar panels are becoming cheaper,",gap:"which",post:"makes them more accessible to ordinary households."},
       {pre:"It is high time we",gap:"took",post:"the problem of pollution more seriously."},
       {pre:"There is",gap:"no",post:"doubt that climate change poses a threat to food production worldwide."}
     ]},
    {type:"wf",tl:"Use of English",title:"Part 3 - Word Formation",ins:"Use the word given to form a word that fits the gap.",
     items:[
       {pre:"The",root:"DESTROY",gap:"destruction",post:"of rainforests has accelerated in recent years."},
       {pre:"We need to find",root:"SUSTAIN",gap:"sustainable",post:"ways of producing energy for the future."},
       {pre:"Air",root:"POLLUTE",gap:"pollution",post:"in major cities has reached dangerous levels."},
       {pre:"Many",root:"ENVIRONMENT",gap:"environmentalists",post:"are calling for stricter regulations on industrial waste."},
       {pre:"The",root:"DISAPPEAR",gap:"disappearance",post:"of certain bird species has alarmed conservation groups."},
       {pre:"It is",root:"ESSENTIAL",gap:"essentially",post:"a problem of overconsumption and waste."},
       {pre:"Renewable energy offers a",root:"PROMISE",gap:"promising",post:"alternative to fossil fuels."},
       {pre:"The river was declared",root:"SUIT",gap:"unsuitable",post:"for swimming due to high levels of contamination."}
     ]},
    {type:"kt",tl:"Use of English",title:"Part 4 - Key Word Transformations",ins:"Use 2-5 words including the word given.",
     items:[
       {src:"People say that the factory is polluting the river.",kw:"SAID",ans:"is said to be polluting",hint:"Passive reporting structure"},
       {src:"We should have recycled more in the past.",kw:"OUGHT",ans:"ought to have recycled more",hint:"Ought to + perfect infinitive"},
       {src:"If they do not act now, the forest will be destroyed.",kw:"UNLESS",ans:"unless they act now the",hint:"Unless as negative conditional"},
       {src:"They are building a new wind farm near the coast.",kw:"BEING",ans:"a new wind farm is being",hint:"Present continuous passive"},
       {src:"I have never seen such a beautiful landscape before.",kw:"MOST",ans:"is the most beautiful landscape",hint:"Superlative structure"},
       {src:"It is not worth trying to clean the polluted lake.",kw:"POINT",ans:"there is no point in trying",hint:"There is no point in + -ing"}
     ]},
    {type:"mc",tl:"Reading",title:"Part 5 - Multiple Choice",ins:"Read the text and choose the best answer (A-D).",
     passage:"In the remote highlands of Ethiopia, a remarkable conservation success story is unfolding. The Ethiopian wolf, one of the rarest canids on Earth, was once on the very brink of extinction. With fewer than 500 individuals remaining in the wild, the species faced threats from disease, habitat loss, and conflict with local farmers. However, thanks to the tireless efforts of a dedicated team of conservationists, the population has stabilised and is now showing signs of slow but steady recovery. The Ethiopian Wolf Conservation Programme, established in the early 1990s, has adopted a multi-faceted approach to saving the species. One of its most successful initiatives has been a vaccination campaign targeting domestic dogs in the region, which are the primary carriers of rabies and canine distemper, diseases that have historically devastated wolf populations. Volunteers trek into remote mountain communities to administer vaccines, a task that requires considerable physical endurance and cultural sensitivity. The programme has also worked closely with local communities, recognising that conservation cannot succeed without the support of the people who share the landscape with the wolves. Farmers have been encouraged to adopt livestock management practices that reduce conflict with predators, and educational outreach programmes in schools aim to foster a sense of pride in the wolves among younger generations. One particularly innovative scheme pays local people to act as wolf ambassadors, monitoring packs in their area and reporting any signs of disease or disturbance. This has created a sense of shared ownership over the conservation effort. Despite these successes, challenges remain. Climate change is pushing the wolves higher into the mountains as temperatures rise, shrinking their already limited habitat. Agricultural expansion also continues to encroach on wolf territory. The future of the Ethiopian wolf is by no means secure, but the progress made so far offers a powerful reminder that dedicated, community-based conservation can make a real difference.",
     items:[
       {q:"What was the main threat to the Ethiopian wolf from domestic dogs?",opts:["Competition for food","Transmission of diseases","Attacks on wolf pups","Noise disturbance"],ans:1},
       {q:"What does the writer say about the vaccination campaign?",opts:["It has been one of the most effective measures","It was rejected by local communities","It only targets the wolves themselves","It was started in the 1980s"],ans:0},
       {q:"Why does the programme work with local communities?",opts:["Because the government requires it by law","Because conservation depends on local support","Because farmers are the main donors","Because wolves are kept as pets locally"],ans:1},
       {q:"What is the role of wolf ambassadors?",opts:["They breed wolves in captivity","They lead tourist groups in the highlands","They observe wolf packs and report problems","They teach at local universities"],ans:2},
       {q:"How is climate change affecting the Ethiopian wolf?",opts:["It is forcing wolves into lower valleys","It is reducing their food supply directly","It is causing their habitat to shrink upwards","It is making the wolves more aggressive"],ans:2},
       {q:"What is the writer's overall conclusion?",opts:["The Ethiopian wolf will inevitably go extinct","Conservation is too expensive to be practical","Community-based efforts can genuinely help","The programme has been a complete failure"],ans:2}
     ]},
    {type:"mc",tl:"Listening",title:"Part 1 - Multiple Choice Extracts",ins:"Listen and choose the correct answer.",
     items:[
       {audio:"Man: I have started composting all our kitchen waste instead of throwing it in the bin. Woman: That is brilliant. Has it been difficult to set up? Man: Not at all. I just bought a small composter for the garden. It takes about five minutes a day, and we have already cut our household waste by about a third.",q:"What has the man found about composting?",opts:["It takes too much effort","It is simple and effective","It is expensive to maintain"],ans:1},
       {audio:"Woman: Did you hear that the council is planning to ban single-use plastic bags from next year? Man: About time, if you ask me. I have been using reusable bags for years. It is such a simple change, and it makes a huge difference to the amount of plastic waste that ends up in landfill.",q:"How does the man feel about the plastic bag ban?",opts:["He thinks it is unnecessary","He is strongly in favour of it","He is worried about the cost"],ans:1},
       {audio:"Man: I was thinking about getting solar panels installed on the roof. Woman: We looked into that last year, actually. The initial cost is quite high, but the energy savings over time make it worthwhile. Plus, you can sell any excess electricity back to the grid.",q:"What does the woman say about solar panels?",opts:["They are not worth the investment","The long-term savings justify the cost","They produce too little energy"],ans:1},
       {audio:"Woman: I have signed up for a beach clean-up this weekend. Would you like to come along? Man: Sure, why not. How long does it usually take? Woman: A couple of hours. Last time we collected over fifty bags of rubbish. It is quite shocking how much waste washes up on the shore.",q:"What surprised the woman about the beach clean-up?",opts:["How few volunteers turned up","The amount of rubbish they found","How long the clean-up took"],ans:1},
       {audio:"Man: I read an article about a city in Denmark that has become completely carbon neutral. Woman: Copenhagen? Yes, they have invested heavily in cycling infrastructure and renewable energy. It just goes to show what is possible when a city commits to sustainability.",q:"What does the woman think about the Danish city?",opts:["It proves that green goals are achievable","It has spent too much money","It is not a realistic model for other cities"],ans:0},
       {audio:"Woman: Have you noticed how many electric cars there are on the roads now? Man: Yes, my neighbour just got one. He says the running costs are much lower than a petrol car, and he can charge it at home overnight. The only downside is the limited range on long journeys.",q:"What disadvantage does the man mention about electric cars?",opts:["They are difficult to maintain","They cannot travel far on one charge","They are too noisy"],ans:1},
       {audio:"Man: Our office has just switched to a paperless system. Everything is done digitally now. Woman: How are people finding it? Man: Most have adapted quite quickly, actually. A few of the older staff were resistant at first, but even they admit it is more efficient now.",q:"What does the man say about going paperless?",opts:["Nobody wanted to make the change","Most staff have adjusted well","It has caused a lot of problems"],ans:1},
       {audio:"Woman: I have started buying all my fruit and vegetables from a local farm shop rather than the supermarket. Man: Is it much more expensive? Woman: Slightly, but the produce is so much fresher. And I feel better knowing I am supporting local farmers and reducing food miles.",q:"Why does the woman prefer the farm shop?",opts:["The prices are lower than the supermarket","The produce is fresher and more ethical","It is closer to her home"],ans:1}
     ]},
    {type:"fl",tl:"Listening",title:"Part 2 - Sentence Completion",ins:"Listen and complete the sentences.",
     audio:"Thank you all for coming. I am here to talk about a fascinating conservation project that has been running in the Scottish Highlands for the past fifteen years. The project focuses on rewilding, which essentially means restoring land to its natural state by reintroducing native species and removing human interventions. Our main achievement so far has been the reintroduction of the Eurasian beaver, which had been extinct in Britain for over four hundred years. The beavers were first released in a carefully selected river valley in 2009. Since then, they have built an extensive network of dams, which has had a remarkable effect on the local ecosystem. The dams slow the flow of water, reducing the risk of flooding downstream. They also create wetland habitats that support a wide variety of other wildlife, including otters, dragonflies, and numerous bird species. We have also planted over two hundred thousand native trees, mainly birch, oak, and Scots pine, to replace the commercial plantations that once dominated the landscape. The early results have been extremely encouraging. Biodiversity surveys show that the number of species in the area has increased by around forty percent since the project began. Of course, not everyone has been supportive. Some local sheep farmers were initially opposed to the reintroduction of beavers, fearing damage to their land. However, we have worked hard to address their concerns, and most now accept that the benefits to the wider community outweigh any inconvenience.",
     items:[
       {pre:"The rewilding project in Scotland has been running for",gap:"fifteen years",post:"."},
       {pre:"The Eurasian beaver had been extinct in Britain for more than",gap:"four hundred years",post:"."},
       {pre:"The beavers were released in a carefully chosen",gap:"river valley",post:"in 2009."},
       {pre:"Beaver dams help reduce the risk of",gap:"flooding",post:"in areas downstream."},
       {pre:"The wetlands created by beaver dams support wildlife such as otters, dragonflies, and",gap:"bird species",post:"."},
       {pre:"The project has planted more than",gap:"two hundred thousand",post:"native trees."},
       {pre:"The main types of trees planted include birch, oak, and",gap:"Scots pine",post:"."},
       {pre:"Biodiversity in the area has gone up by about",gap:"forty percent",post:"."},
       {pre:"Some local",gap:"sheep farmers",post:"were against the beaver reintroduction at first."},
       {pre:"Most farmers now agree that the",gap:"benefits",post:"to the wider community are worth it."}
     ]},
    {type:"wr",tl:"Writing",title:"Part 1 - Essay",ins:"Write an essay (140-190 words).",
     prompt:"In your English class you have been discussing what individuals can do to help the environment. Now your teacher has asked you to write an essay. Write an essay discussing two of the following points: 1) recycling 2) transport 3) energy use at home. Remember to give reasons for your opinions and include an introduction and conclusion.",minWords:140}
  ]
},
// ===== TEST 3: EDUCATION & LEARNING =====
{
  id:"fce-t3",name:"Practice Test 3 - Education & Learning",
  exercises:[
    {type:"mc",tl:"Use of English",title:"Part 1 - Multiple-choice Cloze",ins:"Choose the correct word (A-D) for each gap.",
     passage:"The traditional model of education, in which students sit in rows and listen to a teacher deliver a lecture, is increasingly being (1)___ into question. Modern educators argue that passive learning methods fail to (2)___ students in a meaningful way and that a more interactive approach is needed. Project-based learning, for example, encourages students to (3)___ on real-world problems and develop solutions collaboratively. This not only deepens their understanding of the subject (4)___ but also helps them develop critical thinking and teamwork skills. Another growing trend is the use of technology in the classroom. Digital tools can provide instant (5)___ on student performance, allowing teachers to tailor their lessons accordingly. However, there are (6)___ about the potential for technology to become a distraction rather than an aid to learning. Some schools have even banned smartphones from the premises after (7)___ evidence that they were negatively affecting concentration and academic results. Finding the right (8)___ between innovation and proven teaching methods remains one of the biggest challenges in education today.",
     items:[
       {q:"Gap 1",opts:["brought","called","put","drawn"],ans:1},
       {q:"Gap 2",opts:["attract","engage","involve","interest"],ans:1},
       {q:"Gap 3",opts:["work","focus","concentrate","deal"],ans:0},
       {q:"Gap 4",opts:["area","matter","topic","content"],ans:1},
       {q:"Gap 5",opts:["response","feedback","answer","reaction"],ans:1},
       {q:"Gap 6",opts:["concerns","worries","troubles","anxieties"],ans:0},
       {q:"Gap 7",opts:["meeting","finding","reaching","getting"],ans:1},
       {q:"Gap 8",opts:["harmony","balance","mixture","combination"],ans:1}
     ]},
    {type:"fl",tl:"Use of English",title:"Part 2 - Open Cloze",ins:"Write the word which best fits each gap.",
     items:[
       {pre:"She has always been good",gap:"at",post:"mathematics, even as a young child."},
       {pre:"The number of students applying to university has gone",gap:"up",post:"significantly in recent years."},
       {pre:"He failed the exam",gap:"because",post:"he had not studied enough."},
       {pre:"The school provides extra support for students",gap:"who",post:"are struggling with their coursework."},
       {pre:"They were made",gap:"to",post:"wear uniforms at their previous school."},
       {pre:"I would have passed the test if I",gap:"had",post:"spent more time revising."},
       {pre:"There are a number of factors that need to be taken",gap:"into",post:"account when choosing a university."},
       {pre:"Learning a foreign language is",gap:"not",post:"as difficult as many people believe."}
     ]},
    {type:"wf",tl:"Use of English",title:"Part 3 - Word Formation",ins:"Use the word given to form a word that fits the gap.",
     items:[
       {pre:"A good",root:"EDUCATE",gap:"education",post:"is essential for success in the modern world."},
       {pre:"The student showed great",root:"DETERMINE",gap:"determination",post:"to overcome the difficulties she faced."},
       {pre:"Many young people feel enormous",root:"PRESS",gap:"pressure",post:"to achieve high grades."},
       {pre:"The teacher gave an",root:"EXPLAIN",gap:"explanation",post:"that was clear and easy to follow."},
       {pre:"It is important not to",root:"ESTIMATE",gap:"underestimate",post:"the value of lifelong learning."},
       {pre:"Reading widely can greatly broaden your",root:"KNOW",gap:"knowledge",post:"of the world."},
       {pre:"Her",root:"ACHIEVE",gap:"achievement",post:"in the final exam was truly outstanding."},
       {pre:"The new policy was met with",root:"APPROVE",gap:"disapproval",post:"from both students and parents."}
     ]},
    {type:"kt",tl:"Use of English",title:"Part 4 - Key Word Transformations",ins:"Use 2-5 words including the word given.",
     items:[
       {src:"The last time I took an exam was two years ago.",kw:"TAKEN",ans:"have not taken an exam for",hint:"Present perfect + for"},
       {src:"They think the new curriculum is too demanding.",kw:"CONSIDERED",ans:"the new curriculum is considered too",hint:"Passive with consider"},
       {src:"She managed to finish the assignment despite being ill.",kw:"SUCCEEDED",ans:"succeeded in finishing the assignment despite",hint:"Succeed in + -ing"},
       {src:"I am sorry I did not attend your lecture.",kw:"APOLOGISE",ans:"apologise for not attending your",hint:"Apologise for + -ing"},
       {src:"The teacher said we must hand in our essays by Friday.",kw:"TOLD",ans:"told us to hand in",hint:"Reported speech with tell + infinitive"},
       {src:"Nobody in the class is as talented as Maria.",kw:"MOST",ans:"is the most talented student in",hint:"Superlative comparison"}
     ]},
    {type:"mc",tl:"Reading",title:"Part 5 - Multiple Choice",ins:"Read the text and choose the best answer (A-D).",
     passage:"Finland consistently ranks among the top countries in the world for educational achievement, and yet its approach to schooling could hardly be more different from that of most other nations. Finnish children do not start formal education until the age of seven, a full one or two years later than in many comparable countries. There is minimal standardised testing, no school league tables, and homework is kept to a minimum. The school day is shorter than in most countries, and children are given frequent breaks, including at least fifteen minutes of outdoor play for every forty-five minutes of instruction. Teachers in Finland are highly valued by society and enjoy the same professional prestige as doctors and lawyers. Entry into teacher training programmes is extremely competitive, with only about one in ten applicants being accepted. All teachers must hold a master's degree, and they are given considerable freedom to design their own curricula and choose their own teaching methods. This level of trust and autonomy is seen as a key factor in attracting high-calibre graduates to the profession. Another distinctive feature of the Finnish system is its emphasis on equality. There are no private schools, and the gap between the highest and lowest performing students is among the smallest in the world. Additional support is provided early to any student who falls behind, rather than waiting for problems to accumulate. Free school meals, free textbooks, and free healthcare are available to all students. Critics have questioned whether the Finnish model can be transplanted to other countries with larger populations, greater cultural diversity, or different economic conditions. Finnish educators themselves are cautious about making sweeping claims, acknowledging that their system has evolved over decades and is deeply rooted in Finnish culture and values. Nevertheless, the Finnish experience offers valuable lessons about the importance of teacher quality, student well-being, and equity in education.",
     items:[
       {q:"What surprises many people about Finnish education?",opts:["Children must pass an entrance exam at age five","The school day is very long and intensive","Children start formal schooling later than elsewhere","Teachers are poorly paid compared to other countries"],ans:2},
       {q:"Why do talented graduates want to become teachers in Finland?",opts:["Teaching pays more than any other profession","The profession is highly respected and offers freedom","There are no other career options available","The government forces top graduates into teaching"],ans:1},
       {q:"How does Finland deal with students who struggle academically?",opts:["They are transferred to special schools","They receive extra support from an early stage","They are required to repeat the entire school year","Their parents must pay for private tutoring"],ans:1},
       {q:"What is a key characteristic of the Finnish education system?",opts:["Heavy reliance on standardised testing","A strong focus on equal opportunity for all","Competition between schools for funding","Strict national curriculum with no flexibility"],ans:1},
       {q:"What do Finnish educators say about copying their model?",opts:["They actively encourage other countries to adopt it exactly","They admit it may not work everywhere without adaptation","They believe it is the only correct approach to education","They refuse to discuss their methods with other countries"],ans:1},
       {q:"What is the main point of the passage?",opts:["Finland spends too little on education","Testing is the best way to improve results","Finland shows that a different approach to education can succeed","Private schools are more effective than public ones"],ans:2}
     ]},
    {type:"mc",tl:"Listening",title:"Part 1 - Multiple Choice Extracts",ins:"Listen and choose the correct answer.",
     items:[
       {audio:"Woman: I have been thinking about doing an online degree. The flexibility is really appealing since I can study in the evenings after work. Man: That sounds ideal for your situation. Just make sure the university is properly accredited. There are a lot of dubious institutions offering online qualifications that employers do not take seriously.",q:"What advice does the man give?",opts:["He suggests studying full-time instead","He warns her to check the university is legitimate","He thinks online degrees are a waste of money"],ans:1},
       {audio:"Man: How did your daughter get on with her first day at university? Woman: She was a bit overwhelmed, to be honest. The campus is enormous, and she did not know anyone. But she joined a couple of societies at the freshers fair, so I think she will settle in quickly enough.",q:"How did the woman's daughter feel on her first day?",opts:["Confident and excited","Bored and disappointed","A little intimidated at first"],ans:2},
       {audio:"Woman: Professor, I was wondering if I could have an extension on my essay. I have been ill for the past week and have not been able to do any research. Man: I am sorry to hear that. If you can provide a medical certificate, I can give you an extra five days. Just make sure you email me the documentation as soon as possible.",q:"What does the professor require from the student?",opts:["A letter from her parents","Evidence that she was unwell","A draft of the essay so far"],ans:1},
       {audio:"Man: I think gap years are incredibly valuable. I took one before university and it really helped me mature. I worked in a restaurant for six months and then travelled around South America. By the time I started my degree, I was much more focused and motivated. Woman: I wish I had done the same, honestly.",q:"What does the man say about his gap year?",opts:["He regrets not going to university sooner","It helped him become more prepared for university","He spent the entire year travelling"],ans:1},
       {audio:"Woman: Have you heard about the new scholarship programme for students from disadvantaged backgrounds? Man: Yes, I think it is a fantastic initiative. Too many talented young people miss out on higher education simply because they cannot afford it. Anything that widens access has to be a good thing.",q:"What is the man's view of the scholarship programme?",opts:["He thinks the selection criteria are unfair","He believes it only benefits a small number of people","He strongly supports it"],ans:2},
       {audio:"Man: I have just started learning Japanese, and I find the writing system incredibly challenging. There are three different scripts you have to learn. Woman: I know what you mean. I studied Mandarin for two years and the characters were the hardest part. But once you get past that initial hurdle, it becomes much more manageable.",q:"What does the woman suggest about learning an Asian language?",opts:["It is impossible to master the writing system","The writing is hard at first but gets easier","You should avoid trying to learn the characters"],ans:1},
       {audio:"Woman: My son has decided he does not want to go to university. He wants to do an apprenticeship in engineering instead. Man: I think that is a perfectly valid choice. Not everyone is suited to academic study, and apprenticeships give you hands-on experience and a qualification at the same time.",q:"What does the man think about apprenticeships?",opts:["They are a respectable alternative to university","They are only for people who fail their exams","They do not lead to good careers"],ans:0},
       {audio:"Man: I attended a really interesting talk yesterday about the future of education. The speaker argued that within twenty years, artificial intelligence will be able to create personalised learning programmes for every student. Woman: That sounds promising, but I wonder how it would affect the role of teachers.",q:"What concern does the woman raise?",opts:["AI will be too expensive for schools","The impact of AI on teachers is unclear","AI technology is not reliable enough"],ans:1}
     ]},
    {type:"fl",tl:"Listening",title:"Part 2 - Sentence Completion",ins:"Listen and complete the sentences.",
     audio:"Hello, everyone. My name is Dr Sarah Chen, and I am here to talk to you about the benefits of learning a musical instrument. Research consistently shows that studying music has a profoundly positive effect on brain development, particularly in children. When you play an instrument, multiple areas of the brain are activated simultaneously, including those responsible for motor control, auditory processing, and emotional regulation. A landmark study conducted at the University of Southern California found that children who received music lessons for two years showed measurable improvements in reading ability and mathematical reasoning compared to a control group. Interestingly, the benefits were most pronounced among children from lower-income families. Adults can benefit too. A study published in the Journal of Neuroscience demonstrated that older adults who had played an instrument for at least ten years performed significantly better on memory tests than those who had never played. Learning music also helps develop discipline and patience, since mastering an instrument requires thousands of hours of practice. Perhaps most importantly, music provides a powerful outlet for self-expression and can be a source of great joy and fulfilment throughout a person's life. Many professional musicians describe the experience of performing as deeply meditative, a state of total absorption in the present moment.",
     items:[
       {pre:"Playing a musical instrument activates multiple areas of the brain at the",gap:"same time",post:"."},
       {pre:"The brain areas involved include motor control, auditory processing, and",gap:"emotional regulation",post:"."},
       {pre:"A major study was carried out at the University of",gap:"Southern California",post:"."},
       {pre:"Children who had music lessons for two years improved in reading and",gap:"mathematical reasoning",post:"."},
       {pre:"The greatest benefits were seen among children from",gap:"lower-income families",post:"."},
       {pre:"Older adults who played an instrument for at least",gap:"ten years",post:"did better on memory tests."},
       {pre:"The memory study was published in the Journal of",gap:"Neuroscience",post:"."},
       {pre:"Learning music teaches discipline and",gap:"patience",post:"."},
       {pre:"Mastering an instrument requires thousands of hours of",gap:"practice",post:"."},
       {pre:"Many professional musicians describe performing as deeply",gap:"meditative",post:"."}
     ]},
    {type:"wr",tl:"Writing",title:"Part 1 - Essay",ins:"Write an essay (140-190 words).",
     prompt:"In your English class you have been discussing what makes a good education system. Now your teacher has asked you to write an essay. Write an essay discussing two of the following points: 1) class sizes 2) the role of technology 3) teacher training. Remember to give reasons for your opinions and include an introduction and conclusion.",minWords:140}
  ]
},
// ===== TEST 4: HEALTH & WELL-BEING =====
{
  id:"fce-t4",name:"Practice Test 4 - Health & Well-being",
  exercises:[
    {type:"mc",tl:"Use of English",title:"Part 1 - Multiple-choice Cloze",ins:"Choose the correct word (A-D) for each gap.",
     passage:"In recent years, there has been a significant (1)___ in the number of people taking up regular exercise. Fitness centres and gyms have seen membership (2)___ soar, and outdoor activities such as running and cycling have become increasingly popular. Health professionals have long stressed the importance of physical activity, and it seems their message is finally getting (3)___. Regular exercise not only strengthens the body but also has a profound (4)___ on mental health. Studies have shown that even moderate physical activity can reduce symptoms of anxiety and depression. The release of endorphins during exercise creates a natural sense of well-being, often (5)___ to as the runner's high. Despite these well-documented benefits, a large proportion of the population remains (6)___. Many people cite a lack of time as the main (7)___ to exercising regularly, while others simply find it difficult to stay motivated. Experts recommend starting with small, achievable goals rather than attempting dramatic lifestyle changes, as this approach is more likely to lead to long-term (8)___.",
     items:[
       {q:"Gap 1",opts:["growth","rise","increase","expansion"],ans:1},
       {q:"Gap 2",opts:["numbers","amounts","volumes","quantities"],ans:0},
       {q:"Gap 3",opts:["over","along","across","through"],ans:3},
       {q:"Gap 4",opts:["impact","force","power","strength"],ans:0},
       {q:"Gap 5",opts:["known","called","named","referred"],ans:3},
       {q:"Gap 6",opts:["static","inactive","idle","motionless"],ans:1},
       {q:"Gap 7",opts:["block","barrier","wall","limit"],ans:1},
       {q:"Gap 8",opts:["habits","customs","traditions","practices"],ans:0}
     ]},
    {type:"fl",tl:"Use of English",title:"Part 2 - Open Cloze",ins:"Write the word which best fits each gap.",
     items:[
       {pre:"A balanced diet, combined",gap:"with",post:"regular exercise, is the key to a healthy lifestyle."},
       {pre:"She has been suffering",gap:"from",post:"severe headaches for the past three weeks."},
       {pre:"The doctor advised him",gap:"to",post:"cut down on sugar and processed foods."},
       {pre:"Heart disease is one of the leading causes",gap:"of",post:"death in developed countries."},
       {pre:"If he",gap:"had",post:"followed the doctor's advice, he would be in much better shape now."},
       {pre:"You should try to get",gap:"at",post:"least seven hours of sleep every night."},
       {pre:"There has been a great deal",gap:"of",post:"research into the link between diet and mental health."},
       {pre:"Stress can have a negative effect on your health",gap:"whether",post:"you are aware of it or not."}
     ]},
    {type:"wf",tl:"Use of English",title:"Part 3 - Word Formation",ins:"Use the word given to form a word that fits the gap.",
     items:[
       {pre:"Regular exercise can greatly improve your physical and",root:"PSYCHOLOGY",gap:"psychological",post:"well-being."},
       {pre:"The",root:"FIT",gap:"fitness",post:"industry has grown enormously over the past decade."},
       {pre:"Lack of sleep can lead to poor",root:"CONCENTRATE",gap:"concentration",post:"during the day."},
       {pre:"Smoking is",root:"DOUBT",gap:"undoubtedly",post:"one of the most harmful habits a person can have."},
       {pre:"Good nutrition is",root:"ABSOLUTE",gap:"absolutely",post:"essential during childhood."},
       {pre:"There is a growing",root:"AWARE",gap:"awareness",post:"of the importance of mental health."},
       {pre:"The",root:"EFFECT",gap:"effectiveness",post:"of the new treatment has been confirmed by several studies."},
       {pre:"His",root:"RECOVER",gap:"recovery",post:"after the operation was remarkably quick."}
     ]},
    {type:"kt",tl:"Use of English",title:"Part 4 - Key Word Transformations",ins:"Use 2-5 words including the word given.",
     items:[
       {src:"He last went to the gym three months ago.",kw:"BEEN",ans:"has not been to the gym",hint:"Present perfect negative + for"},
       {src:"Running every day is something I am used to now.",kw:"ACCUSTOMED",ans:"have become accustomed to running every",hint:"Become accustomed to + -ing"},
       {src:"The doctor told me not to eat fatty food.",kw:"ADVISED",ans:"was advised not to eat",hint:"Passive with advise + not to"},
       {src:"Perhaps she is feeling unwell today.",kw:"MIGHT",ans:"she might be feeling unwell",hint:"Modal of deduction - might"},
       {src:"They opened the new hospital last year.",kw:"WAS",ans:"the new hospital was opened",hint:"Past simple passive"},
       {src:"I find it difficult to get up early every morning.",kw:"TROUBLE",ans:"have trouble getting up early",hint:"Have trouble + -ing"}
     ]},
    {type:"mc",tl:"Reading",title:"Part 5 - Multiple Choice",ins:"Read the text and choose the best answer (A-D).",
     passage:"Sleep is one of the most fundamental human needs, yet it is also one of the most neglected. In our fast-paced modern world, millions of people regularly sacrifice sleep in order to meet work deadlines, socialise, or simply scroll through their phones late into the night. The consequences of chronic sleep deprivation are far more serious than most people realise. Research has linked insufficient sleep to a wide range of health problems, including obesity, heart disease, diabetes, and weakened immune function. A study published in the journal Nature found that people who consistently slept fewer than six hours per night were four times more likely to catch a common cold than those who slept seven hours or more. The effects on mental health are equally alarming. Sleep-deprived individuals show reduced activity in the prefrontal cortex, the part of the brain responsible for rational thinking and emotional control. This helps explain why tired people are more irritable, more impulsive, and more prone to making poor decisions. Matthew Walker, a neuroscientist at the University of California, Berkeley, has described sleep as the single most effective thing we can do for our brain and body health. In his influential book, he argues that no aspect of our biology is left unscathed by sleep deprivation. Despite this overwhelming evidence, society continues to glorify busyness and treat sleep as an expendable luxury. Many successful business leaders boast about surviving on just four or five hours a night, sending a dangerous message to the rest of us. Schools, too, have been criticised for starting too early, forcing teenagers to attend classes at a time when their biological clocks are telling them to sleep. Some progressive schools have experimented with later start times and reported improvements in attendance, behaviour, and academic performance. The message from science is clear: we ignore sleep at our peril.",
     items:[
       {q:"What does the writer say about how people treat sleep?",opts:["Most people get enough sleep","Sleep is often not given enough priority","People sleep too much in modern society","Scientists disagree about the need for sleep"],ans:1},
       {q:"According to the Nature study, what happens to people who sleep less than six hours?",opts:["They are more likely to become ill","They perform better at work","They need less food","They have stronger immune systems"],ans:0},
       {q:"How does sleep deprivation affect the brain?",opts:["It improves creativity","It has no measurable impact","It reduces the ability to think clearly and control emotions","It makes people more cautious in their decisions"],ans:2},
       {q:"What criticism does the writer make about some business leaders?",opts:["They sleep too much during the day","They encourage unhealthy attitudes towards sleep","They refuse to fund sleep research","They force employees to work night shifts"],ans:1},
       {q:"What has happened in schools that start later?",opts:["Students complained about the change","There was no noticeable difference","Results and behaviour improved","Teachers refused to change their schedules"],ans:2},
       {q:"What is the writer's overall message?",opts:["Sleep is less important than diet and exercise","Getting enough sleep is vital and society should recognise this","Only teenagers need more sleep","The science on sleep is still inconclusive"],ans:1}
     ]},
    {type:"mc",tl:"Listening",title:"Part 1 - Multiple Choice Extracts",ins:"Listen and choose the correct answer.",
     items:[
       {audio:"Woman: I have been trying meditation for the past month. At first I found it really hard to sit still for ten minutes, but now I actually look forward to it. It has made a noticeable difference to my stress levels. Man: I have heard a lot of people say that. Maybe I should give it a try.",q:"What has the woman discovered about meditation?",opts:["It was easy from the very beginning","It has helped reduce her stress","She finds it boring and unhelpful"],ans:1},
       {audio:"Man: I went to the doctor about my back pain, and she recommended swimming. Apparently it is one of the best exercises for strengthening your back without putting too much strain on your joints. Woman: That makes sense. I swim twice a week and I never have any back problems.",q:"Why was swimming recommended to the man?",opts:["It is the cheapest form of exercise","It burns the most calories","It is gentle on the joints and good for the back"],ans:2},
       {audio:"Woman: Have you ever tried cutting out sugar from your diet? Man: I did for a month last year, actually. The first week was terrible, I had headaches and felt exhausted. But after that, I had so much more energy and even lost a few kilos. I wish I had stuck with it.",q:"What happened when the man stopped eating sugar?",opts:["He felt worse throughout the entire month","He struggled at first but then felt much better","He noticed no difference at all"],ans:1},
       {audio:"Man: My company has just introduced free yoga classes during the lunch break. I was sceptical at first, but I went along and it was surprisingly enjoyable. I felt much more relaxed and focused for the rest of the afternoon. Woman: That is such a great initiative. I wish more employers did that.",q:"How did the man feel after trying workplace yoga?",opts:["He thought it was a waste of time","He was more relaxed and productive afterwards","He found it too physically demanding"],ans:1},
       {audio:"Woman: I read that spending time in nature can lower your blood pressure and reduce cortisol levels. Man: I can believe that. Whenever I go for a walk in the countryside, I always feel calmer and more clear-headed. There is something about being surrounded by greenery that just puts things in perspective.",q:"What do both speakers agree about?",opts:["Walking in nature has a positive effect on well-being","The countryside is boring compared to the city","Exercise is only beneficial if done indoors"],ans:0},
       {audio:"Man: How is your training for the marathon going? Woman: Not as well as I had hoped, to be honest. I injured my knee a few weeks ago and had to take a break. I have started again now but I am behind schedule. I am not sure I will be ready in time. Man: Just take it easy and listen to your body.",q:"What is the woman's current situation?",opts:["She has given up on the marathon completely","She is ahead of schedule with her training","An injury has set back her preparation"],ans:2},
       {audio:"Woman: Did you know that laughing is actually good for your health? It boosts your immune system and releases tension. Man: I have heard that before. They even have laughter therapy classes now, where groups of people get together and practise laughing. It sounds bizarre, but apparently it works.",q:"What does the man say about laughter therapy?",opts:["He thinks it sounds strange but effective","He has attended several sessions himself","He believes it is completely pointless"],ans:0},
       {audio:"Man: I have started tracking my sleep with a smartwatch. It tells me how much deep sleep and light sleep I get each night. Woman: Is it accurate? Man: It seems to be. I have noticed that on nights when I avoid caffeine after lunch, I get significantly more deep sleep. It has really changed my habits.",q:"What has the man learned from tracking his sleep?",opts:["Caffeine in the evening does not affect his sleep","Avoiding afternoon caffeine improves his sleep quality","Smartwatches are unreliable for measuring sleep"],ans:1}
     ]},
    {type:"fl",tl:"Listening",title:"Part 2 - Sentence Completion",ins:"Listen and complete the sentences.",
     audio:"Good afternoon. I am Dr James Morton, and today I want to share with you some recent findings about the relationship between gut health and mental well-being. For decades, scientists treated the brain and the gut as entirely separate systems. However, groundbreaking research over the past ten years has revealed that the two are intimately connected through what we now call the gut-brain axis. Your gut contains approximately one hundred trillion bacteria, collectively known as the gut microbiome. These bacteria play a crucial role not only in digestion but also in regulating mood and behaviour. Studies have shown that people with a diverse range of gut bacteria tend to have lower rates of depression and anxiety. Conversely, an imbalanced microbiome has been associated with conditions such as irritable bowel syndrome and even autism. One of the most fascinating experiments in this field was conducted at University College Cork in Ireland. Researchers fed a specific strain of probiotic bacteria to a group of mice and observed significant reductions in stress-related behaviour. When the vagus nerve, which connects the gut to the brain, was severed, the beneficial effects disappeared entirely. This confirmed that the gut communicates directly with the brain through this neural pathway. So what can you do to improve your gut health? The single most important factor is diet. Eating a wide variety of fruits, vegetables, and fermented foods promotes microbial diversity. Processed foods and excessive sugar, on the other hand, tend to reduce it.",
     items:[
       {pre:"Scientists used to treat the brain and the gut as completely",gap:"separate systems",post:"."},
       {pre:"The gut contains roughly",gap:"one hundred trillion",post:"bacteria."},
       {pre:"The bacteria in the gut are known collectively as the gut",gap:"microbiome",post:"."},
       {pre:"People with diverse gut bacteria have lower rates of depression and",gap:"anxiety",post:"."},
       {pre:"An imbalanced microbiome has been linked to irritable bowel syndrome and",gap:"autism",post:"."},
       {pre:"The probiotic experiment was carried out at University College",gap:"Cork",post:"in Ireland."},
       {pre:"The researchers gave probiotic bacteria to a group of",gap:"mice",post:"."},
       {pre:"The gut communicates with the brain through the",gap:"vagus nerve",post:"."},
       {pre:"The most important factor for gut health is",gap:"diet",post:"."},
       {pre:"Processed foods and too much",gap:"sugar",post:"tend to reduce microbial diversity."}
     ]},
    {type:"wr",tl:"Writing",title:"Part 1 - Essay",ins:"Write an essay (140-190 words).",
     prompt:"In your English class you have been discussing how people can improve their health. Now your teacher has asked you to write an essay. Write an essay discussing two of the following points: 1) diet 2) sleep 3) physical activity. Remember to give reasons for your opinions and include an introduction and conclusion.",minWords:140}
  ]
},
// ===== TEST 5: ARTS & CULTURE =====
{
  id:"fce-t5",name:"Practice Test 5 - Arts & Culture",
  exercises:[
    {type:"mc",tl:"Use of English",title:"Part 1 - Multiple-choice Cloze",ins:"Choose the correct word (A-D) for each gap.",
     passage:"The arts have always played a vital (1)___ in human society, from the cave paintings of our earliest ancestors to the digital installations of today. Music, literature, theatre, and the visual arts all serve as powerful means of expression, allowing us to communicate ideas and emotions that (2)___ words alone cannot convey. In recent years, however, funding for the arts has come under increasing (3)___ in many countries. Governments facing tight budgets often see culture as an easy area in which to (4)___ cuts, arguing that resources should be directed towards more essential services such as healthcare and education. Critics of this approach (5)___ out that the arts contribute billions to the economy through tourism, employment, and creative industries. Furthermore, there is a growing body of evidence that (6)___ in the arts has significant benefits for mental health, social cohesion, and even physical well-being. A report by the World Health Organization (7)___ that activities such as singing in a choir or visiting a museum can reduce stress and combat loneliness. Despite these arguments, the (8)___ over arts funding shows no signs of being resolved any time soon.",
     items:[
       {q:"Gap 1",opts:["place","role","part","function"],ans:1},
       {q:"Gap 2",opts:["common","plain","ordinary","regular"],ans:2},
       {q:"Gap 3",opts:["threat","pressure","danger","risk"],ans:1},
       {q:"Gap 4",opts:["do","make","take","put"],ans:1},
       {q:"Gap 5",opts:["point","bring","stand","speak"],ans:0},
       {q:"Gap 6",opts:["participation","attendance","presence","involvement"],ans:0},
       {q:"Gap 7",opts:["discovered","concluded","resulted","determined"],ans:1},
       {q:"Gap 8",opts:["argument","debate","quarrel","dispute"],ans:1}
     ]},
    {type:"fl",tl:"Use of English",title:"Part 2 - Open Cloze",ins:"Write the word which best fits each gap.",
     items:[
       {pre:"The painting was so lifelike that it could easily be mistaken",gap:"for",post:"a photograph."},
       {pre:"She has been playing the violin",gap:"since",post:"she was five years old."},
       {pre:"The novel, which was written",gap:"by",post:"a previously unknown author, became an international bestseller."},
       {pre:"He is regarded",gap:"as",post:"one of the most influential artists of the twentieth century."},
       {pre:"The exhibition is well worth",gap:"visiting",post:"if you have any interest in modern sculpture."},
       {pre:"There were",gap:"so",post:"many people at the concert that we could not find a seat."},
       {pre:"The play is",gap:"based",post:"on a true story from the nineteenth century."},
       {pre:"Not",gap:"only",post:"is she an accomplished painter, but she is also a talented musician."}
     ]},
    {type:"wf",tl:"Use of English",title:"Part 3 - Word Formation",ins:"Use the word given to form a word that fits the gap.",
     items:[
       {pre:"The",root:"PERFORM",gap:"performance",post:"received a standing ovation from the audience."},
       {pre:"His paintings are known for their",root:"ORDINARY",gap:"extraordinary",post:"use of colour and light."},
       {pre:"The museum has an impressive",root:"COLLECT",gap:"collection",post:"of ancient Greek sculptures."},
       {pre:"She showed great",root:"CREATE",gap:"creativity",post:"in her approach to the project."},
       {pre:"The",root:"POPULAR",gap:"popularity",post:"of street art has grown enormously in recent years."},
       {pre:"It is virtually",root:"POSSIBLE",gap:"impossible",post:"to get tickets for the show at such short notice."},
       {pre:"The festival celebrates the cultural",root:"DIVERSE",gap:"diversity",post:"of the region."},
       {pre:"His latest novel was a huge commercial",root:"SUCCEED",gap:"success",post:"and sold over a million copies."}
     ]},
    {type:"kt",tl:"Use of English",title:"Part 4 - Key Word Transformations",ins:"Use 2-5 words including the word given.",
     items:[
       {src:"People believe that the painting is over 500 years old.",kw:"BELIEVED",ans:"the painting is believed to be",hint:"Passive reporting structure"},
       {src:"She has never performed in front of such a large audience before.",kw:"FIRST",ans:"the first time she has performed",hint:"It is the first time + present perfect"},
       {src:"I would prefer to go to the cinema rather than the theatre.",kw:"RATHER",ans:"would rather go to the",hint:"Would rather + base verb"},
       {src:"He started writing poetry when he was a teenager.",kw:"SINCE",ans:"has been writing poetry since",hint:"Present perfect continuous + since"},
       {src:"The gallery was too crowded for us to enjoy the exhibition.",kw:"SO",ans:"the gallery was so crowded that",hint:"So + adjective + that"},
       {src:"We were not allowed to take photographs inside the cathedral.",kw:"LET",ans:"they did not let us take",hint:"Let + object + bare infinitive"}
     ]},
    {type:"mc",tl:"Reading",title:"Part 5 - Multiple Choice",ins:"Read the text and choose the best answer (A-D).",
     passage:"Street art has undergone a remarkable transformation over the past few decades. Once dismissed as mere vandalism, it is now widely celebrated as a legitimate and often powerful form of artistic expression. The most famous figure in this movement is undoubtedly Banksy, the anonymous British artist whose satirical works have appeared on walls and buildings around the world. Banksy's pieces typically combine dark humour with sharp political commentary, addressing themes such as war, consumerism, and surveillance. One of his most iconic works, Girl with Balloon, was famously shredded moments after being sold at auction for over one million pounds in 2018, in what many interpreted as a comment on the commercialisation of art. The partly shredded piece, renamed Love is in the Bin, subsequently sold for even more. What makes Banksy so compelling is not just the quality of the art but the mystery surrounding the artist's identity. Despite decades of speculation, Banksy has never been definitively identified, and this anonymity has only added to the allure. Some critics argue that Banksy's work, while undeniably clever, has become part of the very establishment it claims to criticise. Banksy prints now sell for hundreds of thousands of pounds, and cities actively promote their Banksy works as tourist attractions. In a sense, the art world has co-opted the rebel. Others counter that Banksy's ability to operate outside the traditional gallery system, creating art that is freely accessible to anyone walking past, remains genuinely subversive. The works do not require a ticket or a knowledge of art history to appreciate; they speak directly to ordinary people in ordinary places. Regardless of where one stands on this debate, there is no denying that Banksy has changed the way we think about art, public space, and the boundaries between the two.",
     items:[
       {q:"How has the perception of street art changed?",opts:["It is still largely considered to be vandalism","It has gone from being rejected to being respected","It has always been popular with art critics","It is only valued outside the United Kingdom"],ans:1},
       {q:"What happened to Girl with Balloon?",opts:["It was destroyed completely at auction","It was stolen from a gallery","It was partly shredded and then sold for more money","It was donated to a museum by Banksy"],ans:2},
       {q:"Why is Banksy's identity significant?",opts:["The mystery increases public interest in the work","Banksy's real name has been confirmed by police","Knowing the artist would reduce the value of the work","Banksy has revealed his identity on social media"],ans:0},
       {q:"What criticism is made of Banksy in the text?",opts:["The quality of the art is declining","Banksy has become part of the system being criticised","Banksy's work is too difficult for most people to understand","Banksy charges too much for commissions"],ans:1},
       {q:"Why do some people defend Banksy's approach?",opts:["Banksy only sells work through traditional galleries","The art is accessible to everyone without cost","Banksy donates all profits to charity","Only art experts can fully appreciate the work"],ans:1},
       {q:"What is the writer's overall attitude towards Banksy?",opts:["Strongly negative and dismissive","Balanced and acknowledging Banksy's influence","Uncritical and entirely admiring","Confused and unable to form an opinion"],ans:1}
     ]},
    {type:"mc",tl:"Listening",title:"Part 1 - Multiple Choice Extracts",ins:"Listen and choose the correct answer.",
     items:[
       {audio:"Man: I went to see that new play at the National Theatre last night. The acting was superb, but the plot was rather confusing. I spent the first half trying to work out what was going on. Woman: I felt exactly the same way when I saw it. Beautiful to look at, but the story needed tightening up.",q:"What do both speakers agree about the play?",opts:["The story was clear and engaging","The acting was excellent but the plot was unclear","The production was a complete disappointment"],ans:1},
       {audio:"Woman: Have you read the latest novel by Elena Ferrante? Man: I have just finished it, actually. I thought the way she captures the complexity of female friendship was absolutely brilliant. It is one of those books that stays with you long after you have put it down.",q:"What does the man think of the novel?",opts:["He found it forgettable","He was deeply impressed by it","He thought it was too long"],ans:1},
       {audio:"Man: I took my daughter to the interactive art exhibition at the science museum. She loved it. There were installations you could touch and even walk through. It was a completely different experience from a traditional gallery. Woman: That sounds wonderful. I think museums need to do more of that kind of thing to attract younger visitors.",q:"What was special about the exhibition?",opts:["Visitors could physically interact with the art","It featured paintings by famous artists","It was only open to children"],ans:0},
       {audio:"Woman: I have been taking pottery classes in the evenings. I was terrible at first, but my teacher is incredibly patient. Last week I finally made a bowl that I was actually proud of. Man: That is great. I have always wanted to try something creative like that.",q:"How does the woman feel about her pottery classes?",opts:["She is frustrated by her lack of progress","She is pleased with her recent improvement","She thinks the teacher is too strict"],ans:1},
       {audio:"Man: Did you see the documentary about the restoration of the Sistine Chapel ceiling? It took over twenty years and was hugely controversial at the time. Some critics thought the cleaning would damage the original colours. Woman: And were they right? Man: Actually, no. The restoration revealed the true brilliance of Michelangelo's colours, which had been hidden under centuries of candle soot.",q:"What did the restoration of the Sistine Chapel reveal?",opts:["The original colours were not as vivid as expected","Centuries of dirt had been hiding Michelangelo's true colours","The restoration caused serious damage to the ceiling"],ans:1},
       {audio:"Woman: I think learning a musical instrument should be compulsory in schools. It teaches discipline, improves concentration, and gives children a creative outlet. Man: I agree in principle, but the cost of providing instruments and qualified music teachers would be enormous. Not every school could afford it.",q:"What is the man's concern?",opts:["He does not think music is important","The financial cost would be too high for many schools","He believes children are too young to learn instruments"],ans:1},
       {audio:"Man: I have just discovered that there is a free outdoor cinema in the park every Saturday during summer. They show classic films on a big screen. Woman: Oh, I went last week. It is a lovely atmosphere. People bring blankets and picnics. The only problem is the British weather. We had to leave halfway through because of the rain.",q:"What was the problem the woman experienced?",opts:["The sound quality was very poor","The films they showed were not interesting","Bad weather interrupted the screening"],ans:2},
       {audio:"Woman: My local library has started hosting live author events where you can meet writers and ask them questions about their books. I went to one last month and it was fascinating. The author talked about how she researches her historical novels. Man: That sounds like a great way to bring people back into libraries.",q:"What does the man think about the library events?",opts:["They could help increase library attendance","They are a waste of library resources","Only famous authors should be invited"],ans:0}
     ]},
    {type:"fl",tl:"Listening",title:"Part 2 - Sentence Completion",ins:"Listen and complete the sentences.",
     audio:"Good evening, and welcome to tonight's talk on the history of photography. The story begins in 1826, when a French inventor named Joseph Nicephore Niepce produced the first permanent photograph. The image, which showed the view from his workshop window, required an exposure time of approximately eight hours. Over the following decades, the technology improved rapidly. In 1839, Louis Daguerre introduced the daguerreotype, which could produce a sharp image in just a few minutes. Photography became commercially available for the first time, and portrait studios sprang up across Europe and America. By the 1880s, George Eastman had developed flexible roll film, and in 1888 he launched the Kodak camera with the famous slogan, You press the button, we do the rest. This democratised photography, making it accessible to ordinary people rather than just professionals. The twentieth century brought colour photography, the instant camera pioneered by Polaroid, and eventually the digital revolution. The first digital camera was actually built by an engineer at Kodak named Steve Sasson in 1975. Ironically, Kodak's management failed to recognise the potential of digital technology, and the company eventually filed for bankruptcy in 2012. Today, most photographs are taken on smartphones, and an estimated 1.4 trillion images are captured worldwide every year. The sheer volume raises questions about whether we are truly experiencing our lives or merely documenting them.",
     items:[
       {pre:"The first permanent photograph was created in",gap:"1826",post:"by a French inventor."},
       {pre:"The first photograph showed the view from Niepce's",gap:"workshop window",post:"."},
       {pre:"The exposure time for the first photograph was approximately",gap:"eight hours",post:"."},
       {pre:"The daguerreotype was introduced by Louis Daguerre in",gap:"1839",post:"."},
       {pre:"George Eastman developed flexible",gap:"roll film",post:"in the 1880s."},
       {pre:"Kodak's famous slogan was: You press the button, we do the",gap:"rest",post:"."},
       {pre:"The first digital camera was built by an engineer named",gap:"Steve Sasson",post:"."},
       {pre:"Kodak filed for",gap:"bankruptcy",post:"in 2012."},
       {pre:"Today, most photographs are taken on",gap:"smartphones",post:"."},
       {pre:"Around 1.4 trillion",gap:"images",post:"are captured around the world each year."}
     ]},
    {type:"wr",tl:"Writing",title:"Part 1 - Essay",ins:"Write an essay (140-190 words).",
     prompt:"In your English class you have been discussing the importance of the arts in society. Now your teacher has asked you to write an essay. Write an essay discussing two of the following points: 1) arts funding 2) art education in schools 3) the impact of digital technology on the arts. Remember to give reasons for your opinions and include an introduction and conclusion.",minWords:140}
  ]
},
// ===== TEST 6: PSYCHOLOGY & HUMAN BEHAVIOUR =====
{
  id:"fce-t6",name:"Practice Test 6 - Psychology & Human Behaviour",
  exercises:[
    {type:"mc",tl:"Use of English",title:"Part 1 - Multiple-choice Cloze",ins:"Choose the correct word (A-D) for each gap.",
     passage:"Why do some people thrive under pressure while others fall apart? Psychologists have been trying to answer this question for decades. One influential theory suggests that our response to stress is largely (1)___ by our mindset. Individuals who view challenges as opportunities for growth tend to perform better than those who see them as threats. This concept, known as a growth mindset, was (2)___ by the psychologist Carol Dweck in the 1990s. Her research showed that people who believe their abilities can be developed through effort and learning are more resilient and more likely to (3)___ their goals. In contrast, those with a fixed mindset, who believe that talent is innate and unchangeable, often give up when they (4)___ difficulties. The implications of this research are enormous. Schools that have adopted growth mindset programmes have reported improvements in student motivation and (5)___. Companies, too, have begun to (6)___ these principles into their training and recruitment processes. However, some critics have (7)___ concerns about the oversimplification of the theory, arguing that systemic factors such as poverty and inequality also play a significant (8)___ in determining outcomes.",
     items:[
       {q:"Gap 1",opts:["decided","settled","determined","resolved"],ans:2},
       {q:"Gap 2",opts:["discovered","pioneered","invented","originated"],ans:1},
       {q:"Gap 3",opts:["reach","arrive","get","achieve"],ans:3},
       {q:"Gap 4",opts:["meet","encounter","face","find"],ans:1},
       {q:"Gap 5",opts:["achievement","success","victory","triumph"],ans:0},
       {q:"Gap 6",opts:["incorporate","include","contain","involve"],ans:0},
       {q:"Gap 7",opts:["lifted","raised","grown","risen"],ans:1},
       {q:"Gap 8",opts:["role","place","position","part"],ans:0}
     ]},
    {type:"fl",tl:"Use of English",title:"Part 2 - Open Cloze",ins:"Write the word which best fits each gap.",
     items:[
       {pre:"People tend to behave differently when they know they are",gap:"being",post:"observed."},
       {pre:"The experiment was carried",gap:"out",post:"under strictly controlled laboratory conditions."},
       {pre:"She could not help",gap:"feeling",post:"nervous before her first public speaking engagement."},
       {pre:"Research suggests that first impressions are formed",gap:"within",post:"just a few seconds of meeting someone."},
       {pre:"The psychologist asked the participants",gap:"whether",post:"they had experienced any significant life changes recently."},
       {pre:"Human beings have a natural tendency to conform to the behaviour",gap:"of",post:"the group they belong to."},
       {pre:"The results were",gap:"so",post:"surprising that the researchers decided to repeat the experiment."},
       {pre:"It took him a long time to get",gap:"over",post:"the disappointment of not being selected for the team."}
     ]},
    {type:"wf",tl:"Use of English",title:"Part 3 - Word Formation",ins:"Use the word given to form a word that fits the gap.",
     items:[
       {pre:"The",root:"BEHAVE",gap:"behaviour",post:"of the participants changed significantly during the study."},
       {pre:"Her",root:"ANXIOUS",gap:"anxiety",post:"increased as the deadline approached."},
       {pre:"It is important to distinguish between",root:"RATIONAL",gap:"irrational",post:"fears and genuine dangers."},
       {pre:"The",root:"LONELY",gap:"loneliness",post:"experienced by elderly people is a growing social problem."},
       {pre:"His",root:"RELUCTANT",gap:"reluctance",post:"to ask for help made the situation worse."},
       {pre:"The study provided",root:"VALUE",gap:"valuable",post:"insights into how children learn to share."},
       {pre:"There is a strong",root:"CONNECT",gap:"connection",post:"between physical exercise and improved mood."},
       {pre:"The therapist helped her to",root:"COME",gap:"overcome",post:"her fear of flying."}
     ]},
    {type:"kt",tl:"Use of English",title:"Part 4 - Key Word Transformations",ins:"Use 2-5 words including the word given.",
     items:[
       {src:"It is thought that happiness depends more on relationships than money.",kw:"THOUGHT",ans:"happiness is thought to depend",hint:"Passive reporting with infinitive"},
       {src:"I am sure she did not do it on purpose.",kw:"HAVE",ans:"cannot have done it on",hint:"Cannot have + past participle"},
       {src:"He only realised his mistake after the meeting had ended.",kw:"UNTIL",ans:"did not realise his mistake until",hint:"Not until structure"},
       {src:"Despite feeling nervous, she gave an excellent presentation.",kw:"FACT",ans:"in spite of the fact that",hint:"In spite of the fact that + clause"},
       {src:"The experiment was so complex that nobody could replicate it.",kw:"TOO",ans:"the experiment was too complex for",hint:"Too + adjective + for + object"},
       {src:"She would prefer not to discuss her personal problems.",kw:"RATHER",ans:"would rather not discuss her",hint:"Would rather + not + base verb"}
     ]},
    {type:"mc",tl:"Reading",title:"Part 5 - Multiple Choice",ins:"Read the text and choose the best answer (A-D).",
     passage:"In 1971, psychologist Philip Zimbardo conducted one of the most controversial experiments in the history of social science. The Stanford Prison Experiment, as it became known, was designed to investigate how ordinary people behave when placed in positions of power or subjugation. Twenty-four male university students, all deemed psychologically healthy, were randomly assigned to play the role of either guards or prisoners in a simulated prison set up in the basement of a building at Stanford University. The experiment was planned to last two weeks but had to be abandoned after just six days due to the alarming behaviour that emerged. The guards, who had been given uniforms, mirrored sunglasses, and wooden batons, quickly began to abuse their authority. They subjected the prisoners to humiliating punishments, forced them to perform degrading tasks, and denied them sleep. Several prisoners suffered emotional breakdowns and had to be released early. Zimbardo himself, who played the role of prison superintendent, later admitted that he had become so absorbed in the experiment that he failed to intervene when he should have. The experiment has been cited countless times as evidence of the power of situational forces to override individual morality. The message seemed clear: under the right circumstances, anyone is capable of cruelty. However, in recent years, the experiment has come under intense scrutiny. Researchers who reviewed Zimbardo's original recordings discovered that the guards had been given much more direction than was originally claimed. Some participants have since stated that they were acting rather than genuinely losing control. Critics argue that the experiment tells us more about the influence of authority figures than about human nature itself. Despite these criticisms, the Stanford Prison Experiment remains a landmark study. It continues to provoke important discussions about ethics in research, the nature of obedience, and the thin line between civilised behaviour and brutality.",
     items:[
       {q:"What was the original purpose of the experiment?",opts:["To train students to become prison guards","To study how people react to having or lacking power","To test new methods of treating prisoners","To compare American and British prison systems"],ans:1},
       {q:"Why was the experiment stopped early?",opts:["The funding ran out after six days","The building was needed for other purposes","The behaviour of participants became dangerously extreme","The prisoners escaped from the simulated prison"],ans:2},
       {q:"What does the writer say about Zimbardo's role?",opts:["He remained completely neutral throughout","He became too involved and did not stop things soon enough","He left the experiment after the first day","He treated the prisoners worse than the guards did"],ans:1},
       {q:"What has recent research revealed about the experiment?",opts:["The results were even more dramatic than reported","The guards may have been influenced more than originally admitted","All participants were professional actors","The experiment actually lasted several months"],ans:1},
       {q:"What do critics say the experiment actually demonstrates?",opts:["That all humans are naturally violent","That authority figures can shape behaviour more than situations","That psychology experiments are always unreliable","That prisons should be abolished"],ans:1},
       {q:"What is the overall significance of the experiment according to the text?",opts:["It is considered completely discredited and irrelevant","It continues to raise important questions about ethics and human nature","It proved that prisoners are more dangerous than guards","It led to major reforms in the American prison system"],ans:1}
     ]},
    {type:"mc",tl:"Listening",title:"Part 1 - Multiple Choice Extracts",ins:"Listen and choose the correct answer.",
     items:[
       {audio:"Woman: I have been reading about the psychology of procrastination. Apparently, it is not really about laziness at all. It is more about avoiding negative emotions associated with a task. Man: That makes a lot of sense. I always put off doing my tax return because it makes me anxious, not because I am lazy.",q:"What do the speakers learn about procrastination?",opts:["It is caused by being lazy","It is linked to avoiding unpleasant feelings","It mainly affects students"],ans:1},
       {audio:"Man: My therapist suggested I try keeping a gratitude journal. Every evening I write down three things I am grateful for. It sounded a bit silly at first, but after a few weeks I noticed I was focusing much more on the positive aspects of my life. Woman: I have heard that can make a real difference.",q:"What happened when the man started the gratitude journal?",opts:["He found it pointless and stopped","His perspective became more positive","He felt more anxious than before"],ans:1},
       {audio:"Woman: Did you know that the colour of a room can actually affect your mood? Blue is supposed to be calming, while red can increase feelings of energy and urgency. Man: That would explain why so many restaurants use red in their decor. They want customers to eat quickly and leave to free up tables.",q:"What does the man suggest about restaurants using red?",opts:["They want to create a calm atmosphere","They use red because it is the cheapest paint","It encourages faster turnover of customers"],ans:2},
       {audio:"Man: I took one of those personality tests at work, the Myers-Briggs one. It said I was an introvert, which did not surprise me at all. I have always preferred small gatherings to large parties. Woman: I got extrovert, which fits. I feel energised by being around other people.",q:"What did the personality test confirm for the man?",opts:["He enjoys large social events","He prefers quieter social situations","He should change his behaviour at work"],ans:1},
       {audio:"Woman: I read an interesting study about the bystander effect. The more people who witness an emergency, the less likely any individual is to help. It is because everyone assumes someone else will take action. Man: That is terrifying when you think about it. So you are actually safer collapsing in front of one person than in front of a crowd.",q:"What is the bystander effect?",opts:["People are more helpful in larger groups","Individuals are less likely to act when others are present","Bystanders always call emergency services"],ans:1},
       {audio:"Man: Have you ever noticed how shops play slow music to make you browse longer and spend more money? Woman: Yes, and supermarkets put essential items like bread and milk at the back of the store so you have to walk past everything else. It is all psychology. Man: It is clever, but also a bit manipulative.",q:"What are the speakers discussing?",opts:["How shops use psychology to increase spending","Why supermarkets are badly designed","The best type of music to play in shops"],ans:0},
       {audio:"Woman: My daughter is going through a phase where she is afraid of the dark. We have tried everything, night lights, leaving the door open, but she still gets upset at bedtime. Man: My son was the same at that age. We found that reading a calming story together just before lights out really helped. It took a few weeks, but he gradually grew out of it.",q:"What advice does the man offer?",opts:["Using a very bright light in the bedroom","Reading a soothing story before sleep","Allowing the child to stay up later"],ans:1},
       {audio:"Man: I have been trying to break the habit of checking my phone first thing in the morning. Apparently, it floods your brain with information before it has had time to wake up properly, which can set an anxious tone for the rest of the day. Woman: I have switched to reading a book for ten minutes instead. It makes such a difference to how I feel.",q:"Why is checking your phone in the morning considered harmful?",opts:["It uses too much battery power","It can cause anxiety by overloading the brain too early","Phones emit harmful radiation in the morning"],ans:1}
     ]},
    {type:"fl",tl:"Listening",title:"Part 2 - Sentence Completion",ins:"Listen and complete the sentences.",
     audio:"Hello, everyone, and thank you for joining me today. I am going to talk about the fascinating science of body language. Research tells us that more than half of all communication is non-verbal, meaning that our gestures, facial expressions, and posture often say more than our words. One of the pioneers in this field was the American psychologist Paul Ekman, who spent decades studying facial expressions across different cultures. His most important finding was that there are seven basic emotions, happiness, sadness, anger, fear, surprise, contempt, and disgust, that are expressed through the same facial muscles regardless of cultural background. This suggests that these expressions are innate rather than learned. Ekman's work has had many practical applications. He developed a system called the Facial Action Coding System, or FACS, which catalogues every possible movement of the facial muscles. This tool has been used by law enforcement agencies to help detect when someone is lying. Interestingly, Ekman found that genuine smiles, known as Duchenne smiles, involve the muscles around the eyes as well as the mouth, whereas fake smiles only use the mouth. This is why we instinctively feel that someone's smile does not look quite right, even if we cannot explain why. More recently, researchers have been exploring how body language affects not just how others perceive us, but how we perceive ourselves. A well-known study by social psychologist Amy Cuddy suggested that adopting expansive postures, standing tall with your arms spread wide, can actually increase feelings of confidence.",
     items:[
       {pre:"More than half of all communication is",gap:"non-verbal",post:"."},
       {pre:"Paul Ekman was an American",gap:"psychologist",post:"who studied facial expressions."},
       {pre:"Ekman identified seven basic",gap:"emotions",post:"that are universal across cultures."},
       {pre:"The expressions for these emotions are considered to be",gap:"innate",post:"rather than learned."},
       {pre:"Ekman's coding system for facial muscles is called",gap:"FACS",post:"."},
       {pre:"The system has been used by law enforcement to help detect",gap:"lying",post:"."},
       {pre:"A genuine smile is called a",gap:"Duchenne smile",post:"."},
       {pre:"Fake smiles only involve the muscles of the",gap:"mouth",post:"."},
       {pre:"Amy Cuddy is a social",gap:"psychologist",post:"who researched body language and confidence."},
       {pre:"Adopting expansive postures can increase feelings of",gap:"confidence",post:"."}
     ]},
    {type:"wr",tl:"Writing",title:"Part 1 - Essay",ins:"Write an essay (140-190 words).",
     prompt:"In your English class you have been discussing what influences human behaviour. Now your teacher has asked you to write an essay. Write an essay discussing two of the following points: 1) social media 2) upbringing 3) peer pressure. Remember to give reasons for your opinions and include an introduction and conclusion.",minWords:140}
  ]
},
// ===== TEST 7: HISTORY & SOCIETY =====
{
  id:"fce-t7",name:"Practice Test 7 - History & Society",
  exercises:[
    {type:"mc",tl:"Use of English",title:"Part 1 - Multiple-choice Cloze",ins:"Choose the correct word (A-D) for each gap.",
     passage:"The study of history has always been about more than simply memorising dates and events. At its best, it offers us a deeper understanding of how societies have evolved and why the world looks the way it does today. By examining the past, we can (1)___ valuable lessons about human nature, the consequences of political decisions, and the forces that (2)___ social change. In recent years, there has been a growing movement to make history more inclusive, ensuring that the stories of ordinary people, not just kings and generals, are (3)___ into the historical record. This approach, sometimes called history from below, seeks to give a (4)___ to those who have traditionally been overlooked. Women, minorities, and working-class communities all have rich histories that deserve to be told. Technology has also transformed the way we (5)___ history. Digital archives, interactive museums, and online courses have made historical resources more accessible than ever before. However, the rise of misinformation on the internet has also (6)___ new challenges. False or misleading claims about historical events can spread rapidly, making it more important than ever for people to develop strong critical thinking skills. Ultimately, the study of history is not a luxury; it is a (7)___. Without an understanding of where we have come from, we cannot hope to navigate the (8)___ that lie ahead.",
     items:[
       {q:"Gap 1",opts:["gain","earn","win","obtain"],ans:0},
       {q:"Gap 2",opts:["make","drive","push","run"],ans:1},
       {q:"Gap 3",opts:["included","contained","composed","involved"],ans:0},
       {q:"Gap 4",opts:["sound","noise","voice","speech"],ans:2},
       {q:"Gap 5",opts:["reach","approach","access","enter"],ans:2},
       {q:"Gap 6",opts:["given","created","produced","formed"],ans:1},
       {q:"Gap 7",opts:["demand","requirement","necessity","condition"],ans:2},
       {q:"Gap 8",opts:["problems","matters","challenges","issues"],ans:2}
     ]},
    {type:"fl",tl:"Use of English",title:"Part 2 - Open Cloze",ins:"Write the word which best fits each gap.",
     items:[
       {pre:"The Roman Empire is often referred",gap:"to",post:"as one of the greatest civilisations in history."},
       {pre:"It was",gap:"not",post:"until the nineteenth century that most European countries abolished slavery."},
       {pre:"The war broke",gap:"out",post:"in 1914 and lasted for four devastating years."},
       {pre:"The museum has",gap:"been",post:"closed for renovation since the beginning of the year."},
       {pre:"No one knows for certain",gap:"what",post:"caused the decline of the Mayan civilisation."},
       {pre:"The treaty was signed by",gap:"both",post:"countries in an effort to establish lasting peace."},
       {pre:"She devoted her entire life",gap:"to",post:"fighting for the rights of the working class."},
       {pre:"In spite",gap:"of",post:"the harsh conditions, the expedition succeeded in reaching the South Pole."}
     ]},
    {type:"wf",tl:"Use of English",title:"Part 3 - Word Formation",ins:"Use the word given to form a word that fits the gap.",
     items:[
       {pre:"The",root:"DISCOVER",gap:"discovery",post:"of ancient tombs provided new insights into Egyptian burial practices."},
       {pre:"The museum contains a fascinating",root:"EXHIBIT",gap:"exhibition",post:"on life in medieval England."},
       {pre:"The",root:"INVADE",gap:"invasion",post:"of Normandy in 1944 was a turning point in the Second World War."},
       {pre:"Historical",root:"ACCURATE",gap:"inaccuracies",post:"in the film were criticised by several scholars."},
       {pre:"The",root:"GOVERN",gap:"government",post:"introduced sweeping reforms after the revolution."},
       {pre:"Her",root:"BRAVE",gap:"bravery",post:"during the conflict earned her a medal of honour."},
       {pre:"The",root:"SETTLE",gap:"settlement",post:"was established by traders in the early sixteenth century."},
       {pre:"The king's",root:"DECIDE",gap:"decision",post:"to raise taxes led to widespread unrest among the population."}
     ]},
    {type:"kt",tl:"Use of English",title:"Part 4 - Key Word Transformations",ins:"Use 2-5 words including the word given.",
     items:[
       {src:"They built the castle in the fourteenth century.",kw:"WAS",ans:"the castle was built in",hint:"Past simple passive"},
       {src:"We started the project three months ago and are still working on it.",kw:"WORKING",ans:"have been working on the project",hint:"Present perfect continuous"},
       {src:"The historian said that the document was probably a forgery.",kw:"MIGHT",ans:"the document might be a",hint:"Reported modal of deduction"},
       {src:"It was wrong of them to demolish the historic building.",kw:"SHOULD",ans:"they should not have demolished the",hint:"Should + perfect infinitive for criticism"},
       {src:"The new law made it illegal for children to work in factories.",kw:"LONGER",ans:"children were no longer allowed to",hint:"No longer + passive"},
       {src:"She knows more about ancient Rome than anyone else in the department.",kw:"NOBODY",ans:"nobody in the department knows more",hint:"Nobody + comparison"}
     ]},
    {type:"mc",tl:"Reading",title:"Part 5 - Multiple Choice",ins:"Read the text and choose the best answer (A-D).",
     passage:"The ancient city of Pompeii, buried under metres of volcanic ash when Mount Vesuvius erupted in 79 AD, is one of the most extraordinary archaeological sites in the world. The eruption, which occurred with devastating speed, killed an estimated two thousand people and preserved the city almost exactly as it was on that fateful day. When systematic excavations began in the eighteenth century, archaeologists were astonished to find intact buildings, vivid frescoes, and even the preserved forms of human bodies caught in their final moments. The site has provided an unparalleled window into daily life in the Roman Empire. We know what Pompeians ate, how they decorated their homes, what games their children played, and how they conducted business. Graffiti scratched onto walls reveals the everyday concerns and humour of ordinary Romans in a way that formal literary texts never could. One inscription reads: I am amazed, wall, that you have not yet collapsed under the weight of so much written nonsense. The excavation of Pompeii has not been without controversy, however. In the early days, treasure hunters removed valuable artefacts with little regard for their archaeological context. More recently, concerns have been raised about the deterioration of the site itself. Exposure to the elements, combined with the sheer number of tourists who visit each year, has taken a heavy toll. Several buildings have collapsed, and many frescoes are fading. The Italian government has invested hundreds of millions of euros in conservation efforts, but some experts believe that the site is being loved to death. A particularly heated debate centres on whether certain areas should be reburied for their own protection, even though this would deprive the public of access. It is a dilemma that neatly encapsulates the tension between preservation and public engagement that runs through all of archaeology.",
     items:[
       {q:"What made the eruption of Vesuvius so significant for archaeology?",opts:["It created a new island in the Mediterranean","It preserved a Roman city in remarkable detail","It destroyed all written records of the Roman period","It was the last volcanic eruption in Europe"],ans:1},
       {q:"What do the graffiti at Pompeii tell us?",opts:["That Romans were unable to read or write","That wall inscriptions were illegal in Roman times","About the everyday thoughts and humour of ordinary people","That the walls were in poor condition before the eruption"],ans:2},
       {q:"What problem affected early excavations at Pompeii?",opts:["There was not enough funding to dig properly","Valuable items were taken without proper documentation","The volcanic ash was too hard to remove","Local residents refused to allow excavation"],ans:1},
       {q:"Why are parts of Pompeii deteriorating?",opts:["Because of weather damage and high visitor numbers","Because the Italian government refuses to maintain the site","Because new volcanic activity is damaging the ruins","Because archaeologists are removing too many artefacts"],ans:0},
       {q:"What controversial solution has been suggested?",opts:["Closing the site permanently to all visitors","Rebuilding the city exactly as it was","Reburying some areas to protect them","Moving all artefacts to museums abroad"],ans:2},
       {q:"What broader issue does Pompeii illustrate?",opts:["The danger of living near active volcanoes","The conflict between protecting heritage and allowing public access","The superiority of Roman engineering over modern techniques","The declining interest in ancient history"],ans:1}
     ]},
    {type:"mc",tl:"Listening",title:"Part 1 - Multiple Choice Extracts",ins:"Listen and choose the correct answer.",
     items:[
       {audio:"Woman: I visited the new World War One exhibition at the Imperial War Museum. What really struck me was the section on the ordinary soldiers' letters home. They were incredibly moving. You could feel the fear and loneliness in every word. Man: I must go and see it. There is something about personal accounts that textbooks just cannot capture.",q:"What made the strongest impression on the woman?",opts:["The collection of weapons on display","The personal letters written by soldiers","The interactive map of the battlefields"],ans:1},
       {audio:"Man: I have been doing some research into my family history using one of those genealogy websites. I discovered that my great-grandfather emigrated from Poland in 1905 and worked in a coal mine in Wales. Woman: That is fascinating. Have you found any photographs? Man: Just one, but it is incredible to put a face to the story.",q:"What has the man discovered?",opts:["His ancestors were originally from Wales","His great-grandfather was a photographer","A relative came to Britain from Poland over a century ago"],ans:2},
       {audio:"Woman: Do you think we should remove statues of controversial historical figures from public spaces? Man: It is a difficult question. On one hand, keeping them up can seem like we are celebrating people who did terrible things. On the other hand, removing them could be seen as erasing history. Perhaps moving them to museums with proper context is the best compromise.",q:"What solution does the man suggest?",opts:["Destroying all controversial statues","Leaving all statues exactly where they are","Relocating them to museums with explanatory information"],ans:2},
       {audio:"Man: I watched a programme about the ancient Silk Road last night. I had no idea how important it was for connecting East and West. It was not just goods that were traded; ideas, religions, and technologies all travelled along those routes. Woman: It really puts modern globalisation into perspective, does it not?",q:"What did the man learn about the Silk Road?",opts:["It was mainly used for transporting silk","It facilitated the exchange of ideas as well as goods","It was only used for a short period of history"],ans:1},
       {audio:"Woman: I think history should be taught more through stories and less through memorising dates. When I was at school, it was so dry and boring. But when you read a personal account or watch a well-made documentary, history really comes alive. Man: I completely agree. Narrative is what makes the past meaningful and memorable.",q:"What do both speakers think about history teaching?",opts:["Memorising dates is the most important skill","Storytelling makes history more engaging","Documentaries are unreliable sources of information"],ans:1},
       {audio:"Man: Did you know that the Great Wall of China is not actually visible from space with the naked eye? It is one of those myths that people just keep repeating. Woman: Really? I have believed that my entire life. It just goes to show how persistent historical misconceptions can be.",q:"What are the speakers discussing?",opts:["The construction methods of the Great Wall","A common myth about the Great Wall being visible from space","Plans to repair the Great Wall"],ans:1},
       {audio:"Woman: I took my children to a living history event at the weekend, where actors dressed up as Tudors and showed us how people cooked, washed, and made clothes in the sixteenth century. The children absolutely loved it. Man: That sounds brilliant. Kids learn so much more when they can see and touch things rather than just reading about them.",q:"Why did the children enjoy the living history event?",opts:["They were allowed to dress up as kings and queens","The experience was hands-on and interactive","They received free souvenirs to take home"],ans:1},
       {audio:"Man: I have just finished reading a book about the fall of the Berlin Wall. It is hard to believe that it only happened in 1989. The speed at which everything changed was extraordinary. Within two years, the Soviet Union had completely collapsed. Woman: It must have been incredible to live through that period.",q:"What does the man find remarkable?",opts:["How slowly the Berlin Wall was constructed","How quickly political change occurred after the wall fell","How little impact the fall of the wall had"],ans:1}
     ]},
    {type:"fl",tl:"Listening",title:"Part 2 - Sentence Completion",ins:"Listen and complete the sentences.",
     audio:"Good morning. Today I am going to talk about a remarkable but often overlooked chapter in the history of exploration: the voyages of Zheng He. Zheng He was a Chinese admiral who led seven major naval expeditions between 1405 and 1433, decades before the European Age of Exploration began. His fleet was extraordinary by any standard. The largest ships, known as treasure ships, were approximately 120 metres long, making them several times bigger than anything the Europeans would build for another century. On his first voyage alone, Zheng He commanded a fleet of over three hundred vessels carrying nearly 28,000 crew members. The expeditions visited more than thirty countries across Southeast Asia, India, the Persian Gulf, and the east coast of Africa. The primary purpose was not conquest but diplomacy. Zheng He carried luxury goods such as silk, porcelain, and tea, which he exchanged for exotic items including spices, precious stones, and even giraffes. These voyages established China as the dominant maritime power in the Indian Ocean. However, after Zheng He's death in 1433, the Chinese emperor ordered the fleet to be dismantled and banned further ocean voyages. The reasons for this dramatic reversal remain debated. Some historians argue that the cost of maintaining such an enormous fleet became unsustainable. Others suggest that Confucian scholars at court disapproved of foreign trade and naval expansion. Whatever the cause, China turned inward, and within a few decades, European explorers had filled the vacuum.",
     items:[
       {pre:"Zheng He led seven major expeditions between 1405 and",gap:"1433",post:"."},
       {pre:"The largest vessels in the fleet were called",gap:"treasure ships",post:"."},
       {pre:"These ships were approximately",gap:"120 metres",post:"long."},
       {pre:"The first voyage included more than",gap:"three hundred",post:"vessels."},
       {pre:"The fleet carried nearly",gap:"28,000",post:"crew members on the first expedition."},
       {pre:"The main aim of the voyages was",gap:"diplomacy",post:"rather than conquest."},
       {pre:"Among the exotic items received were spices, precious stones, and",gap:"giraffes",post:"."},
       {pre:"After Zheng He died, the emperor ordered the fleet to be",gap:"dismantled",post:"."},
       {pre:"Some historians say the fleet became too",gap:"expensive",post:"to maintain."},
       {pre:"Confucian scholars reportedly disapproved of foreign trade and",gap:"naval expansion",post:"."}
     ]},
    {type:"wr",tl:"Writing",title:"Part 1 - Essay",ins:"Write an essay (140-190 words).",
     prompt:"In your English class you have been discussing whether it is important to study history. Now your teacher has asked you to write an essay. Write an essay discussing two of the following points: 1) understanding the present 2) avoiding past mistakes 3) preserving cultural identity. Remember to give reasons for your opinions and include an introduction and conclusion.",minWords:140}
  ]
},
// ===== TEST 8: SCIENCE & DISCOVERY =====
{
  id:"fce-t8",name:"Practice Test 8 - Science & Discovery",
  exercises:[
    {type:"mc",tl:"Use of English",title:"Part 1 - Multiple-choice Cloze",ins:"Choose the correct word (A-D) for each gap.",
     passage:"Scientific research has always been driven by curiosity, the fundamental human desire to understand how the world works. From the earliest astronomical observations to the latest discoveries in quantum physics, scientists have sought to (1)___ light on the mysteries of the universe. The process of scientific discovery is rarely straightforward, however. Many of the most important breakthroughs have come about by (2)___, when researchers were actually investigating something else entirely. Penicillin, for instance, was discovered when Alexander Fleming noticed that mould had contaminated one of his petri dishes and was killing the bacteria around it. This kind of serendipity plays a larger (3)___ in science than most people realise. Of course, luck alone is not enough. As the famous chemist Louis Pasteur once (4)___ it, chance favours the prepared mind. It takes years of training and deep knowledge of a subject to recognise when something unexpected is genuinely (5)___. Modern science faces a number of (6)___ challenges, including the pressure to publish results quickly, the difficulty of securing funding, and growing public (7)___ towards expertise. Despite these obstacles, the pace of discovery continues to accelerate. New technologies such as artificial intelligence and gene editing are opening up possibilities that would have seemed like science fiction just a generation ago. The question is no longer what we can discover, but how we choose to (8)___ that knowledge.",
     items:[
       {q:"Gap 1",opts:["throw","shed","cast","put"],ans:1},
       {q:"Gap 2",opts:["chance","luck","fortune","accident"],ans:3},
       {q:"Gap 3",opts:["part","role","share","piece"],ans:1},
       {q:"Gap 4",opts:["said","spoke","told","put"],ans:3},
       {q:"Gap 5",opts:["important","significant","considerable","notable"],ans:1},
       {q:"Gap 6",opts:["pressing","pushing","squeezing","forcing"],ans:0},
       {q:"Gap 7",opts:["doubt","suspicion","distrust","disbelief"],ans:2},
       {q:"Gap 8",opts:["apply","use","employ","practise"],ans:0}
     ]},
    {type:"fl",tl:"Use of English",title:"Part 2 - Open Cloze",ins:"Write the word which best fits each gap.",
     items:[
       {pre:"The experiment was designed to test",gap:"whether",post:"the new drug was effective against the virus."},
       {pre:"Scientists have",gap:"been",post:"trying to find a cure for the disease for over thirty years."},
       {pre:"The results turned",gap:"out",post:"to be far more surprising than anyone had expected."},
       {pre:"Little",gap:"is",post:"known about the long-term effects of the chemical on human health."},
       {pre:"The theory was eventually proved wrong,",gap:"despite",post:"having been widely accepted for decades."},
       {pre:"She was awarded the Nobel Prize",gap:"for",post:"her groundbreaking work in genetics."},
       {pre:"The team succeeded",gap:"in",post:"developing a vaccine in record time."},
       {pre:"If the data",gap:"had",post:"been collected more carefully, the conclusions would have been more reliable."}
     ]},
    {type:"wf",tl:"Use of English",title:"Part 3 - Word Formation",ins:"Use the word given to form a word that fits the gap.",
     items:[
       {pre:"The",root:"SCIENCE",gap:"scientific",post:"community was divided over the interpretation of the results."},
       {pre:"Her",root:"DISCOVER",gap:"discovery",post:"of the new species attracted international attention."},
       {pre:"The experiment required extreme",root:"PRECISE",gap:"precision",post:"in order to produce reliable results."},
       {pre:"The",root:"EXIST",gap:"existence",post:"of life on other planets remains unproven."},
       {pre:"Many",root:"RESEARCH",gap:"researchers",post:"believe that a breakthrough is imminent."},
       {pre:"It is",root:"DANGER",gap:"dangerous",post:"to draw conclusions from such a small sample size."},
       {pre:"The findings were",root:"EXPECT",gap:"unexpected",post:"and challenged several long-held assumptions."},
       {pre:"Space",root:"EXPLORE",gap:"exploration",post:"has fascinated humanity for centuries."}
     ]},
    {type:"kt",tl:"Use of English",title:"Part 4 - Key Word Transformations",ins:"Use 2-5 words including the word given.",
     items:[
       {src:"Scientists believe the universe began with a massive explosion.",kw:"BELIEVED",ans:"is believed to have begun",hint:"Passive reporting + perfect infinitive"},
       {src:"The experiment failed because the equipment was faulty.",kw:"DUE",ans:"the experiment failed due to",hint:"Due to + noun"},
       {src:"He was not experienced enough to lead the research team.",kw:"LITTLE",ans:"he had too little experience to",hint:"Too little + noun + to"},
       {src:"She did not expect the results to be so dramatic.",kw:"CAME",ans:"the results came as a surprise",hint:"Come as a surprise"},
       {src:"If we do not invest in science, progress will slow down.",kw:"WITHOUT",ans:"without investment in science progress will",hint:"Without + noun as conditional"},
       {src:"Nobody has ever observed this phenomenon before.",kw:"NEVER",ans:"this phenomenon has never been observed",hint:"Present perfect passive + never"}
     ]},
    {type:"mc",tl:"Reading",title:"Part 5 - Multiple Choice",ins:"Read the text and choose the best answer (A-D).",
     passage:"In 2012, scientists at CERN, the European Organisation for Nuclear Research, announced the discovery of the Higgs boson, a subatomic particle that had been predicted theoretically almost fifty years earlier. The discovery was hailed as one of the greatest achievements in the history of physics, confirming a crucial piece of the Standard Model, the theoretical framework that describes the fundamental forces and particles of the universe. The Higgs boson, sometimes called the God particle, a nickname that most physicists dislike, is responsible for giving other particles their mass. Without it, atoms could not form, and the universe as we know it would not exist. The search for the Higgs boson required the construction of the Large Hadron Collider, the most complex and expensive scientific instrument ever built. Located in a circular tunnel 27 kilometres in circumference beneath the border between France and Switzerland, the collider accelerates protons to nearly the speed of light before smashing them together. The collisions produce showers of subatomic particles, which are then analysed by enormous detectors. The sheer scale of the project is staggering. Thousands of scientists from over a hundred countries contributed to the effort, and the total cost has been estimated at approximately ten billion dollars. Some critics questioned whether such an enormous investment was justified for what might seem like an abstract discovery with no immediate practical application. Supporters counter that fundamental research has always been the foundation upon which practical technologies are eventually built. The World Wide Web, for example, was invented at CERN as a tool for physicists to share data, and it is difficult to imagine a technology that has had a greater impact on everyday life. The discovery of the Higgs boson answered one question but opened up many others. Physicists now hope that further experiments at the collider will shed light on mysteries such as dark matter, dark energy, and the fundamental nature of gravity.",
     items:[
       {q:"Why was the discovery of the Higgs boson so important?",opts:["It disproved the Standard Model of physics","It confirmed a key prediction about how particles gain mass","It showed that the speed of light can be exceeded","It led to the immediate development of new technology"],ans:1},
       {q:"What does the writer say about the nickname God particle?",opts:["It was invented by CERN's marketing team","Physicists generally approve of the name","Most physicists are not fond of the nickname","The name was chosen by the discoverers"],ans:2},
       {q:"What is the Large Hadron Collider?",opts:["A telescope used to observe distant galaxies","A machine that accelerates and collides particles","A computer used to simulate the Big Bang","A laboratory for testing nuclear weapons"],ans:1},
       {q:"What criticism was made of the project?",opts:["It was completed too quickly without proper testing","The discovery had no scientific value","The enormous cost was hard to justify for an abstract finding","Too few countries were involved in the research"],ans:2},
       {q:"How do supporters defend investment in fundamental research?",opts:["It always leads to immediate commercial profits","Past basic research has led to transformative technologies","Governments are legally required to fund all scientific projects","The discoveries can be sold to private companies"],ans:1},
       {q:"What do physicists hope to investigate next?",opts:["How to build a faster collider","Dark matter, dark energy, and gravity","Whether the Higgs boson really exists","How to travel faster than light"],ans:1}
     ]},
    {type:"mc",tl:"Listening",title:"Part 1 - Multiple Choice Extracts",ins:"Listen and choose the correct answer.",
     items:[
       {audio:"Woman: I went to a public lecture on black holes last night. The speaker was brilliant at making really complex ideas accessible. She used everyday analogies that made everything much easier to grasp. Man: That is a rare skill. So many scientists struggle to communicate their work to non-specialists.",q:"What did the woman appreciate about the lecture?",opts:["The speaker used highly technical language","The speaker explained difficult concepts clearly","The lecture was very short and concise"],ans:1},
       {audio:"Man: I have just read that scientists have managed to grow a human ear on a 3D printer using living cells. Woman: That is extraordinary. The potential for medicine is incredible. Imagine being able to print replacement organs for people who need transplants. Man: We are still a long way from that, but it is definitely heading in the right direction.",q:"What is the man's view of 3D-printed organs?",opts:["The technology will never work in practice","It is promising but not yet fully developed","It is already being used in hospitals"],ans:1},
       {audio:"Woman: Did you know that octopuses have three hearts and blue blood? Man: Yes, and they can change colour in milliseconds to blend in with their surroundings. They are probably the most intelligent invertebrates on the planet. It makes you wonder what other extraordinary abilities exist in the animal kingdom that we have not discovered yet.",q:"What fascinates the man about octopuses?",opts:["Their remarkable intelligence and abilities","Their similarity to human beings","Their ability to survive on land"],ans:0},
       {audio:"Man: My daughter wants to study marine biology at university. She has been passionate about the ocean ever since we took her snorkelling in the Red Sea when she was eight. Woman: It is wonderful when children find something they are truly passionate about. Marine biology is such an important field, especially with everything happening to coral reefs.",q:"What does the woman think about the daughter's choice?",opts:["She thinks it is an impractical career choice","She is supportive and sees it as an important field","She believes the daughter should study medicine instead"],ans:1},
       {audio:"Woman: I am reading a fascinating book about the human brain. Did you know that the brain uses about twenty percent of the body's total energy, even though it only makes up about two percent of body weight? Man: That is remarkable. It just goes to show how much processing power is required to keep everything running smoothly.",q:"What surprises the speakers about the brain?",opts:["It is larger than most people think","It uses a disproportionately large amount of energy","It does not require any energy at all"],ans:1},
       {audio:"Man: I saw a documentary about CRISPR gene editing technology. The idea that scientists can now cut and paste sections of DNA is both exciting and terrifying. Woman: I agree. The medical potential is enormous, but there are serious ethical questions about editing human genes, especially when it comes to future generations.",q:"What concern does the woman raise about gene editing?",opts:["It is too expensive to be practical","There are ethical issues around modifying human DNA","The technology does not actually work yet"],ans:1},
       {audio:"Woman: Have you heard about the mission to send a probe to Europa, one of Jupiter's moons? Scientists think there might be a liquid ocean beneath the ice, which could potentially harbour life. Man: That would be the most significant discovery in human history if they found even the simplest organisms.",q:"Why is Europa of interest to scientists?",opts:["It has a breathable atmosphere","It may have an ocean that could contain life","It is the closest moon to Earth"],ans:1},
       {audio:"Man: I tried one of those DNA ancestry tests. It told me I am forty percent Scandinavian, which was a complete surprise. My family has lived in southern England for as long as anyone can remember. Woman: Well, the Vikings did settle extensively in Britain. Perhaps you have some distant Norse ancestors.",q:"What surprised the man about his DNA results?",opts:["He had no European ancestry at all","A large percentage of his DNA was Scandinavian","His results were identical to his sister's"],ans:1}
     ]},
    {type:"fl",tl:"Listening",title:"Part 2 - Sentence Completion",ins:"Listen and complete the sentences.",
     audio:"Welcome, everyone. This afternoon I want to talk to you about one of the most ambitious scientific projects of the twentieth century: the Human Genome Project. Launched in 1990, the project set out to map every single gene in the human body. It was an international collaboration involving scientists from six countries: the United States, the United Kingdom, France, Germany, Japan, and China. The project took thirteen years to complete and cost approximately three billion dollars. When the results were published in 2003, they revealed that the human genome contains roughly 20,000 genes, far fewer than scientists had predicted. Prior to the project, estimates had ranged from 80,000 to over 100,000 genes. This was one of the biggest surprises of the entire endeavour. The genome itself consists of approximately three billion base pairs of DNA, arranged in a specific sequence along 23 pairs of chromosomes. Remarkably, all humans share about 99.9 percent of their DNA, meaning that the entire range of human diversity, from eye colour to susceptibility to disease, is determined by just 0.1 percent of our genetic code. The Human Genome Project has transformed the field of medicine. Doctors can now use genetic testing to identify individuals who are at increased risk of developing conditions such as breast cancer or heart disease. Personalised medicine, in which treatments are tailored to an individual's genetic profile, is becoming an increasingly important part of healthcare.",
     items:[
       {pre:"The Human Genome Project was launched in",gap:"1990",post:"."},
       {pre:"Scientists from",gap:"six countries",post:"were involved in the collaboration."},
       {pre:"The project took",gap:"thirteen years",post:"to finish."},
       {pre:"The total cost was approximately",gap:"three billion dollars",post:"."},
       {pre:"The human genome contains roughly",gap:"20,000 genes",post:"."},
       {pre:"Before the project, scientists estimated between 80,000 and",gap:"100,000 genes",post:"."},
       {pre:"Human DNA consists of about three billion",gap:"base pairs",post:"."},
       {pre:"DNA is arranged along 23 pairs of",gap:"chromosomes",post:"."},
       {pre:"All humans share approximately",gap:"99.9 percent",post:"of their DNA."},
       {pre:"Personalised medicine tailors treatments to a person's",gap:"genetic profile",post:"."}
     ]},
    {type:"wr",tl:"Writing",title:"Part 1 - Essay",ins:"Write an essay (140-190 words).",
     prompt:"In your English class you have been discussing the role of science in modern life. Now your teacher has asked you to write an essay. Write an essay discussing two of the following points: 1) medical advances 2) space exploration 3) ethical concerns in science. Remember to give reasons for your opinions and include an introduction and conclusion.",minWords:140}
  ]
},
// ===== TEST 9: MEDIA & COMMUNICATION =====
{
  id:"fce-t9",name:"Practice Test 9 - Media & Communication",
  exercises:[
    {type:"mc",tl:"Use of English",title:"Part 1 - Multiple-choice Cloze",ins:"Choose the correct word (A-D) for each gap.",
     passage:"The media landscape has changed beyond all (1)___ over the past twenty years. Traditional newspapers, which once held a virtual monopoly on the distribution of news, have seen their readership decline dramatically as more people turn to online sources for information. Many newspapers have been forced to (2)___ staff and reduce the number of pages they publish, while some have ceased print publication altogether. The rise of social media has (3)___ matters further. Platforms such as Twitter and Facebook have become primary news sources for millions of people, yet they operate without the editorial oversight that is a (4)___ of traditional journalism. This has led to growing concerns about the spread of fake news and misinformation. Studies have shown that false stories tend to spread (5)___ more quickly than truthful ones on social media, partly because they are often more sensational and emotionally charged. The consequences of this can be serious, from undermining public trust in institutions to influencing the outcome of elections. Some governments have attempted to (6)___ the problem through legislation, but regulating online content without infringing on freedom of speech is a delicate (7)___. Meanwhile, quality journalism remains as important as ever. In a world awash with information, the ability to verify facts, provide context, and hold the powerful to (8)___ is indispensable.",
     items:[
       {q:"Gap 1",opts:["knowledge","belief","recognition","imagination"],ans:2},
       {q:"Gap 2",opts:["lay off","put off","turn off","take off"],ans:0},
       {q:"Gap 3",opts:["complicated","worsened","troubled","disturbed"],ans:0},
       {q:"Gap 4",opts:["basis","standard","feature","mark"],ans:2},
       {q:"Gap 5",opts:["much","far","very","highly"],ans:1},
       {q:"Gap 6",opts:["handle","tackle","manage","deal"],ans:1},
       {q:"Gap 7",opts:["task","balancing act","operation","process"],ans:1},
       {q:"Gap 8",opts:["account","check","trial","justice"],ans:0}
     ]},
    {type:"fl",tl:"Use of English",title:"Part 2 - Open Cloze",ins:"Write the word which best fits each gap.",
     items:[
       {pre:"The article was shared",gap:"by",post:"thousands of people on social media within hours."},
       {pre:"It makes no",gap:"difference",post:"whether you read the news online or in print; what matters is accuracy."},
       {pre:"Many people do not bother to check",gap:"whether",post:"the information they share online is actually true."},
       {pre:"The journalist refused to reveal the identity of",gap:"her",post:"source, even under intense pressure."},
       {pre:"Local newspapers play an important role",gap:"in",post:"keeping communities informed about what is happening in their area."},
       {pre:"The programme would not have been broadcast",gap:"if",post:"the lawyers had not approved the content."},
       {pre:"There is",gap:"little",post:"doubt that social media has transformed the way we consume news."},
       {pre:"The editor was criticised",gap:"for",post:"publishing the story without verifying the facts first."}
     ]},
    {type:"wf",tl:"Use of English",title:"Part 3 - Word Formation",ins:"Use the word given to form a word that fits the gap.",
     items:[
       {pre:"The",root:"JOURNAL",gap:"journalist",post:"spent months investigating the corruption scandal."},
       {pre:"The spread of",root:"INFORM",gap:"misinformation",post:"online is a growing concern for democracies worldwide."},
       {pre:"The documentary provided a",root:"THOUGHT",gap:"thoughtful",post:"analysis of the refugee crisis."},
       {pre:"Many",root:"ADVERTISE",gap:"advertisements",post:"use emotional language to persuade consumers."},
       {pre:"The newspaper issued a formal",root:"CORRECT",gap:"correction",post:"after publishing inaccurate information."},
       {pre:"Freedom of the press is",root:"WIDE",gap:"widely",post:"regarded as a cornerstone of democracy."},
       {pre:"The show attracted an",root:"BELIEVE",gap:"unbelievable",post:"number of viewers on its opening night."},
       {pre:"She gave a powerful and",root:"PERSUADE",gap:"persuasive",post:"speech about the dangers of censorship."}
     ]},
    {type:"kt",tl:"Use of English",title:"Part 4 - Key Word Transformations",ins:"Use 2-5 words including the word given.",
     items:[
       {src:"The newspaper did not print the story because it was inaccurate.",kw:"WOULD",ans:"the newspaper would have printed the",hint:"Third conditional with would have"},
       {src:"He denied having leaked the document to the press.",kw:"DENIED",ans:"denied that he had leaked",hint:"Deny + that clause"},
       {src:"They are interviewing the witnesses at the moment.",kw:"BEING",ans:"the witnesses are being interviewed",hint:"Present continuous passive"},
       {src:"The journalist said she had already filed her report.",kw:"TOLD",ans:"the journalist told us she had",hint:"Reported speech with tell"},
       {src:"Reading the news every day is something I have always done.",kw:"USED",ans:"have always been used to reading",hint:"Be used to + -ing"},
       {src:"It was such a shocking headline that everyone talked about it.",kw:"SO",ans:"the headline was so shocking that",hint:"So + adjective + that"}
     ]},
    {type:"mc",tl:"Reading",title:"Part 5 - Multiple Choice",ins:"Read the text and choose the best answer (A-D).",
     passage:"Podcasting has quietly become one of the most popular forms of media in the world. What began in the early 2000s as a niche hobby for technology enthusiasts has grown into a billion-dollar industry, with an estimated 500 million listeners globally. Unlike traditional radio, podcasts are available on demand, allowing listeners to choose exactly what they want to hear and when they want to hear it. This flexibility has been a key factor in their appeal. The range of content available is staggering. There are podcasts on virtually every subject imaginable, from true crime and politics to philosophy, comedy, and niche hobbies like birdwatching. Some of the most successful podcasts have audiences that rival those of mainstream television programmes. Serial, a true crime podcast launched in 2014, is widely credited with bringing the medium to a mass audience. Its first series, which re-examined a murder case from 1999, was downloaded over 300 million times. For many creators, podcasting offers a level of creative freedom that is hard to find in other media. There are no advertisers dictating content in the early stages, no editors cutting material, and no time constraints beyond what the host chooses. This has allowed diverse and often underrepresented voices to find an audience. However, as the industry has grown, major media companies and streaming platforms have moved in, signing exclusive deals with popular hosts and investing heavily in original content. Some long-time podcast enthusiasts worry that this commercialisation threatens the independent spirit that made podcasting special in the first place. Others argue that investment from major players raises production quality and brings podcasts to a wider audience. The debate mirrors similar conversations that have taken place around other creative industries, from music to publishing, as they have been disrupted by digital technology.",
     items:[
       {q:"What does the writer say about the origins of podcasting?",opts:["It was immediately popular with a wide audience","It started as a small-scale activity for tech fans","It was invented by a major media company","It replaced radio within a few years"],ans:1},
       {q:"Why are podcasts appealing to listeners?",opts:["They can only be accessed at specific times","They offer flexibility in what and when you listen","They are shorter than radio programmes","They feature only professional broadcasters"],ans:1},
       {q:"What was significant about the podcast Serial?",opts:["It was the first podcast ever created","It was only available in the United States","It helped make podcasting mainstream","It was produced by a television network"],ans:2},
       {q:"What advantage does podcasting offer to creators?",opts:["Guaranteed income from the first episode","Complete creative control over content","Access to professional recording studios","Automatic distribution through radio stations"],ans:1},
       {q:"What concern do some podcast fans have?",opts:["That large companies may undermine the medium's independence","That podcasts are becoming too short","That the sound quality is declining","That there are too few podcasts available"],ans:0},
       {q:"What comparison does the writer draw at the end?",opts:["Between podcasting and television viewing habits","Between podcasts in different countries","Between podcasting's evolution and other creative industries affected by digital change","Between the cost of podcasting and traditional broadcasting"],ans:2}
     ]},
    {type:"mc",tl:"Listening",title:"Part 1 - Multiple Choice Extracts",ins:"Listen and choose the correct answer.",
     items:[
       {audio:"Woman: I have completely stopped watching the news on television. It is always so negative and sensationalised. I prefer to read a few trusted online sources where the reporting is more balanced. Man: I understand the feeling, but I worry that too many people are retreating into their own information bubbles, only reading things that confirm what they already believe.",q:"What is the man concerned about?",opts:["That television news is too positive","That people only seek out information they agree with","That online news is always more accurate"],ans:1},
       {audio:"Man: My teenager spends hours watching YouTube videos. I am not against it in principle, some of the content is genuinely educational, but I do worry about the algorithm pushing increasingly extreme content. Woman: That is a valid concern. I think platforms need to take more responsibility for what their algorithms recommend.",q:"What worries the man about YouTube?",opts:["That his teenager watches too many music videos","That the recommendation system can lead to extreme content","That YouTube requires a paid subscription"],ans:1},
       {audio:"Woman: I listened to the most incredible podcast about the history of the English language. Did you know that English has borrowed words from over 350 languages? Man: I did not know the number was that high. Which podcast was it? Woman: It is called The History of English Podcast. Each episode is about thirty minutes, and the narrator is really engaging.",q:"What impressed the woman about the podcast?",opts:["It was presented by a famous television personality","It covered an interesting topic in an engaging way","It was the longest podcast she had ever heard"],ans:1},
       {audio:"Man: I think social media has been terrible for political debate. Everything is reduced to slogans and soundbites. There is no room for nuance or complexity. Woman: I partly agree, but I have also seen social media used very effectively to organise protests and raise awareness about important issues. It is a double-edged sword.",q:"What does the woman think about social media and politics?",opts:["It is entirely negative","It has both positive and negative effects","It has no impact on politics whatsoever"],ans:1},
       {audio:"Woman: Have you noticed how many people get their news from headlines alone without actually reading the full article? Man: Yes, and that is a real problem. Headlines are designed to grab attention, and they often oversimplify or even misrepresent the story. If you only read the headline, you can come away with a completely wrong impression.",q:"What problem do the speakers identify?",opts:["Newspapers do not use headlines anymore","Headlines always accurately summarise the story","Many people form opinions from misleading headlines alone"],ans:2},
       {audio:"Man: I have been experimenting with writing a blog. I started it six months ago just for fun, writing about local restaurants, and I have been amazed at how many readers I have attracted. I now get over five thousand visitors a month. Woman: That is impressive. Have you thought about turning it into a more serious project?",q:"What has surprised the man about his blog?",opts:["That nobody reads it","That it has attracted a large readership","That blogs are no longer popular"],ans:1},
       {audio:"Woman: The problem with twenty-four-hour news channels is that they have to fill airtime constantly, so they end up repeating the same stories over and over or speculating about things that might happen. Man: I agree. It creates a false sense of urgency about everything. Not every event needs round-the-clock coverage.",q:"What do the speakers dislike about twenty-four-hour news?",opts:["The presenters are unprofessional","The same stories are repeated and speculation fills airtime","The channels show too many advertisements"],ans:1},
       {audio:"Man: My grandmother, who is eighty-five, has just learned how to video call using a tablet. She was terrified of technology at first, but my sister set it up for her and now she calls us every Sunday. It has made a huge difference to her quality of life, especially since she lives alone. Woman: That is lovely. Technology at its best.",q:"How has technology helped the man's grandmother?",opts:["She uses it to order groceries online","It allows her to stay connected with her family","She has become a professional video editor"],ans:1}
     ]},
    {type:"fl",tl:"Listening",title:"Part 2 - Sentence Completion",ins:"Listen and complete the sentences.",
     audio:"Good morning, everyone. Today I am going to talk about the evolution of the book and what the future might hold for reading. The history of the book stretches back thousands of years. The earliest known examples of writing appeared in ancient Mesopotamia around 3400 BC, inscribed on clay tablets. The ancient Egyptians later developed papyrus scrolls, which were lighter and easier to transport. The codex, the format we would recognise as a book today, with bound pages and a cover, emerged in the Roman period, around the first century AD. However, books remained rare and expensive objects for centuries, since each one had to be copied by hand. Everything changed in 1440, when Johannes Gutenberg invented the movable type printing press in Mainz, Germany. This revolutionary technology made it possible to produce books quickly and cheaply for the first time. Within fifty years, an estimated twenty million volumes had been printed across Europe. The printing press is widely regarded as one of the most important inventions in human history, because it democratised knowledge and helped fuel the Renaissance, the Reformation, and the Scientific Revolution. Fast forward to the twenty-first century, and the book is once again being transformed by technology. E-readers and audiobooks have changed the way many people consume literature. In 2023, audiobook sales surpassed two billion dollars globally for the first time. Despite frequent predictions that physical books would die out, however, print sales have actually remained remarkably stable, and in some markets have even grown.",
     items:[
       {pre:"The earliest known writing appeared in ancient Mesopotamia around",gap:"3400 BC",post:"."},
       {pre:"Writing was inscribed on",gap:"clay tablets",post:"."},
       {pre:"The ancient Egyptians used",gap:"papyrus scrolls",post:"for writing."},
       {pre:"The codex format appeared during the",gap:"Roman period",post:"."},
       {pre:"Gutenberg invented the printing press in",gap:"1440",post:"."},
       {pre:"The press was invented in the city of",gap:"Mainz",post:"in Germany."},
       {pre:"Within fifty years, approximately",gap:"twenty million",post:"volumes had been printed."},
       {pre:"The printing press helped fuel the Renaissance, the Reformation, and the",gap:"Scientific Revolution",post:"."},
       {pre:"In 2023, global audiobook sales exceeded",gap:"two billion dollars",post:"."},
       {pre:"Despite predictions, physical book sales have remained",gap:"remarkably stable",post:"."}
     ]},
    {type:"wr",tl:"Writing",title:"Part 1 - Essay",ins:"Write an essay (140-190 words).",
     prompt:"In your English class you have been discussing the role of the media in modern society. Now your teacher has asked you to write an essay. Write an essay discussing two of the following points: 1) the reliability of online news 2) the influence of social media 3) the future of newspapers. Remember to give reasons for your opinions and include an introduction and conclusion.",minWords:140}
  ]
},
// ===== TEST 10: TRAVEL & GLOBAL ISSUES =====
{
  id:"fce-t10",name:"Practice Test 10 - Travel & Global Issues",
  exercises:[
    {type:"mc",tl:"Use of English",title:"Part 1 - Multiple-choice Cloze",ins:"Choose the correct word (A-D) for each gap.",
     passage:"International travel has become more accessible than ever before, with budget airlines and online booking platforms making it possible to fly to the other side of the world for a (1)___ of the cost it would have been a generation ago. Tourism now accounts for roughly ten percent of global GDP and provides employment for hundreds of millions of people worldwide. However, the rapid (2)___ of mass tourism has raised serious questions about its impact on the environment and local communities. Popular destinations such as Venice, Barcelona, and Dubrovnik have all experienced problems associated with overtourism, including overcrowding, rising property prices, and damage to cultural (3)___. Some cities have responded by introducing tourist taxes or limiting the number of visitors to certain (4)___. Meanwhile, the aviation industry is responsible for approximately two percent of global carbon emissions, a figure that is expected to rise as air travel continues to grow. In response, there has been a growing (5)___ towards more sustainable forms of tourism. Eco-tourism, which emphasises responsible travel to natural areas, has gained considerable (6)___ in recent years. Slow travel, which encourages visitors to spend longer in fewer places and use overland transport rather than flying, is another (7)___ that is gaining ground. Ultimately, the challenge is to find a (8)___ that allows people to experience different cultures and landscapes without destroying the very things that make them worth visiting.",
     items:[
       {q:"Gap 1",opts:["piece","part","fraction","section"],ans:2},
       {q:"Gap 2",opts:["growth","increase","spread","rise"],ans:0},
       {q:"Gap 3",opts:["places","heritage","tradition","property"],ans:1},
       {q:"Gap 4",opts:["attractions","locations","positions","situations"],ans:0},
       {q:"Gap 5",opts:["direction","movement","trend","fashion"],ans:2},
       {q:"Gap 6",opts:["reputation","popularity","fame","prominence"],ans:1},
       {q:"Gap 7",opts:["approach","method","system","technique"],ans:0},
       {q:"Gap 8",opts:["way","balance","middle","solution"],ans:1}
     ]},
    {type:"fl",tl:"Use of English",title:"Part 2 - Open Cloze",ins:"Write the word which best fits each gap.",
     items:[
       {pre:"She has travelled to more than forty countries",gap:"since",post:"she graduated from university."},
       {pre:"The flight was delayed",gap:"due",post:"to severe weather conditions at the departure airport."},
       {pre:"I would love to visit Japan",gap:"if",post:"I had enough money to afford the trip."},
       {pre:"We had",gap:"such",post:"a wonderful time in Portugal that we decided to go back the following year."},
       {pre:"It took us three hours to get",gap:"through",post:"customs and immigration at the airport."},
       {pre:"The hotel turned",gap:"out",post:"to be much better than we had expected."},
       {pre:"Travelling by train is often more comfortable",gap:"than",post:"flying, especially on shorter journeys."},
       {pre:"He speaks fluent French,",gap:"which",post:"proved extremely useful during our stay in Paris."}
     ]},
    {type:"wf",tl:"Use of English",title:"Part 3 - Word Formation",ins:"Use the word given to form a word that fits the gap.",
     items:[
       {pre:"The",root:"TOUR",gap:"tourism",post:"industry was severely affected by the pandemic."},
       {pre:"The view from the top of the mountain was absolutely",root:"BREATH",gap:"breathtaking",post:"."},
       {pre:"Many travellers are",root:"AWARE",gap:"unaware",post:"of the customs regulations in the countries they visit."},
       {pre:"The",root:"ACCOMMODATE",gap:"accommodation",post:"in the city centre was surprisingly affordable."},
       {pre:"There has been a noticeable",root:"REDUCE",gap:"reduction",post:"in the number of flights during the off-peak season."},
       {pre:"The",root:"FRIEND",gap:"friendliness",post:"of the local people made our trip truly memorable."},
       {pre:"It is",root:"ADVISE",gap:"advisable",post:"to book your tickets well in advance during the summer months."},
       {pre:"The island remains relatively",root:"SPOIL",gap:"unspoilt",post:"despite the increase in visitor numbers."}
     ]},
    {type:"kt",tl:"Use of English",title:"Part 4 - Key Word Transformations",ins:"Use 2-5 words including the word given.",
     items:[
       {src:"I have never been to a more beautiful place than this.",kw:"MOST",ans:"this is the most beautiful place",hint:"Superlative structure"},
       {src:"We could not go to the beach because it was raining.",kw:"PREVENTED",ans:"the rain prevented us from going",hint:"Prevent + object + from + -ing"},
       {src:"She only started travelling abroad after she finished her studies.",kw:"UNTIL",ans:"did not travel abroad until she",hint:"Not until structure"},
       {src:"They say the museum is worth visiting.",kw:"SAID",ans:"the museum is said to be",hint:"Passive reporting with infinitive"},
       {src:"I regret not booking the hotel earlier.",kw:"WISH",ans:"wish I had booked the hotel",hint:"Wish + past perfect"},
       {src:"The holiday was so expensive that we had to borrow money.",kw:"SUCH",ans:"it was such an expensive holiday",hint:"Such + a/an + adjective + noun + that"}
     ]},
    {type:"mc",tl:"Reading",title:"Part 5 - Multiple Choice",ins:"Read the text and choose the best answer (A-D).",
     passage:"In 2019, a young Swedish climate activist named Greta Thunberg sailed across the Atlantic Ocean in a racing yacht to attend a United Nations climate summit in New York. She chose to sail rather than fly in order to highlight the carbon emissions produced by the aviation industry. The journey took fifteen days and attracted enormous media attention. Thunberg had first come to public notice the previous year, at the age of just fifteen, when she began a solitary protest outside the Swedish parliament, skipping school every Friday to demand action on climate change. Her School Strike for Climate movement quickly spread around the world, inspiring millions of young people to join protests in their own countries. Thunberg's message is simple but powerful: listen to the scientists. She has repeatedly accused world leaders of failing to take the climate crisis seriously, delivering blunt speeches at international summits that have both moved and angered her audience in equal measure. At the UN Climate Action Summit in 2019, she addressed delegates with the now-famous words: How dare you? You have stolen my dreams and my childhood with your empty words. Not everyone has been supportive, however. Some politicians have dismissed Thunberg as a naive teenager being manipulated by adults, while others have questioned whether school strikes are the most productive form of protest. Climate sceptics have attacked her personally, sometimes viciously, on social media. Thunberg has responded to such criticism with characteristic composure, arguing that the hostility she faces simply proves that her message is uncomfortable for those in power. Whether or not one agrees with her methods, it is difficult to deny that Thunberg has succeeded in placing climate change at the centre of global political debate in a way that decades of scientific reports and campaigning had failed to achieve.",
     items:[
       {q:"Why did Greta Thunberg choose to sail across the Atlantic?",opts:["She was afraid of flying","She wanted to demonstrate the environmental cost of flying","She could not afford an airline ticket","She wanted to set a sailing record"],ans:1},
       {q:"How did Thunberg's protest movement begin?",opts:["With a speech at the United Nations","Through a viral social media campaign","With a solo protest outside the Swedish parliament","At a conference organised by environmental groups"],ans:2},
       {q:"What is the core of Thunberg's message?",opts:["Young people should leave school permanently","Politicians should follow scientific evidence on climate","Aviation should be banned immediately","Only Sweden is taking climate change seriously"],ans:1},
       {q:"How have some politicians responded to Thunberg?",opts:["They have all praised her efforts publicly","Some have dismissed her as inexperienced and influenced by others","They have offered her a role in government","They have ignored her completely"],ans:1},
       {q:"How does Thunberg deal with criticism?",opts:["She refuses to speak to the media","She reacts with anger and hostility","She remains calm and argues it shows her message is effective","She has stopped her activism because of it"],ans:2},
       {q:"What does the writer conclude about Thunberg's impact?",opts:["She has had little effect on public debate","She has brought climate change to the forefront of global discussion","Her methods have been entirely counterproductive","She is only influential in Scandinavian countries"],ans:1}
     ]},
    {type:"mc",tl:"Listening",title:"Part 1 - Multiple Choice Extracts",ins:"Listen and choose the correct answer.",
     items:[
       {audio:"Woman: We have just come back from a holiday in Croatia. The old town in Dubrovnik was stunning, but it was so packed with tourists that it was hard to enjoy it. There were literally queues to take a photograph. Man: I have heard it has got much worse since that television series was filmed there. It is a shame when tourism spoils the very places people come to see.",q:"What problem did the woman encounter in Dubrovnik?",opts:["The weather was extremely poor","The town was too crowded with tourists","The accommodation was very expensive"],ans:1},
       {audio:"Man: I am thinking about taking a gap year to travel around South America. My parents are a bit worried about safety, but I have done a lot of research and I think if you take sensible precautions, the risks are manageable. Woman: I did exactly that ten years ago and it was the best decision I ever made. Just keep copies of all your documents and stay in touch regularly.",q:"What advice does the woman give?",opts:["He should not travel to South America alone","He should be sensible and keep in contact","He should take his parents with him"],ans:1},
       {audio:"Woman: Have you tried using one of those language translation apps when travelling abroad? Man: Yes, I used one in Tokyo last year. It was genuinely impressive. I held my phone up to a restaurant menu and it translated everything instantly. It is not perfect, but it takes away a lot of the stress of not speaking the local language.",q:"What does the man think about translation apps?",opts:["They are completely useless","They are helpful though not flawless","They are better than learning the language"],ans:1},
       {audio:"Man: I read that Bhutan measures its success not by GDP but by Gross National Happiness. They limit the number of tourists allowed in each year and charge a daily fee to protect their culture and environment. Woman: I think more countries should take that approach. Quality over quantity when it comes to tourism.",q:"What does the woman think about Bhutan's approach?",opts:["Other countries should consider a similar model","It is too restrictive and hurts the economy","The daily fee is unfair to tourists"],ans:0},
       {audio:"Woman: I had the most amazing experience volunteering at a wildlife sanctuary in South Africa. We helped look after orphaned elephants and assisted with anti-poaching patrols. It felt so much more meaningful than a typical beach holiday. Man: That sounds incredible. Was it expensive? Woman: Not really. You pay for your food and accommodation, but the work itself is unpaid, of course.",q:"Why did the woman enjoy her volunteer trip?",opts:["The beaches were beautiful","It felt more meaningful than a normal holiday","She earned a lot of money"],ans:1},
       {audio:"Man: One thing I always do when I travel is try the local street food. You learn so much about a culture through its food, and street vendors are usually incredibly friendly. Last year in Bangkok, I had the most incredible pad Thai from a tiny stall by the river. It cost less than a dollar. Woman: That is the best way to eat abroad, in my opinion. Avoid the tourist restaurants.",q:"Why does the man enjoy street food when travelling?",opts:["It is always safer than restaurant food","It provides cultural insight and is usually excellent","He does not like eating in restaurants"],ans:1},
       {audio:"Woman: I think responsible tourism starts with small choices. Using a reusable water bottle instead of buying plastic ones, choosing locally owned hotels over international chains, and learning a few words of the local language all make a difference. Man: Absolutely. And it often leads to a richer travel experience, too. When you make an effort with the local language, people open up to you much more.",q:"What do both speakers agree about?",opts:["Learning the local language is a waste of time","International hotel chains offer the best service","Small responsible choices enhance the travel experience"],ans:2},
       {audio:"Man: My family and I decided to take the train from London to the south of France instead of flying. It took longer, of course, but we went through the Channel Tunnel and then down through Paris. The children loved watching the scenery change, and we arrived feeling relaxed rather than jet-lagged. Woman: I would love to do that. There is something romantic about long train journeys.",q:"What did the man's family enjoy about travelling by train?",opts:["It was much cheaper than flying","The journey itself was part of the experience","The train had a swimming pool on board"],ans:1}
     ]},
    {type:"fl",tl:"Listening",title:"Part 2 - Sentence Completion",ins:"Listen and complete the sentences.",
     audio:"Thank you for coming today. I want to talk about the rise of ecotourism and why it matters. Ecotourism is generally defined as responsible travel to natural areas that conserves the environment and improves the well-being of local people. The concept first gained traction in the 1980s, when environmentalists began to argue that tourism could be a tool for conservation rather than a cause of destruction. Costa Rica is often cited as the pioneer of ecotourism. In the 1990s, the country made a deliberate decision to market itself as a green destination, investing heavily in national parks and protected areas. Today, approximately twenty-five percent of Costa Rica's land is protected, one of the highest percentages in the world. The strategy has been remarkably successful. Tourism is now the country's largest source of foreign income, surpassing both coffee and banana exports. Kenya offers another compelling example. Community conservancies, where local people manage wildlife areas and receive a share of tourism revenue, have proved highly effective at reducing poaching. In the Maasai Mara region, elephant populations have increased by thirty percent since community-based conservation programmes were introduced. However, ecotourism is not without its challenges. Critics point out that the term is sometimes used as a marketing label rather than a genuine commitment to sustainability. So-called greenwashing, where companies make misleading environmental claims, is a growing problem. Travellers need to do their research and look for recognised certification schemes to ensure that their money is genuinely supporting conservation.",
     items:[
       {pre:"Ecotourism involves responsible travel that conserves the environment and benefits",gap:"local people",post:"."},
       {pre:"The concept of ecotourism first became popular in the",gap:"1980s",post:"."},
       {pre:"Costa Rica is widely considered the",gap:"pioneer",post:"of ecotourism."},
       {pre:"Around twenty-five percent of Costa Rica's",gap:"land",post:"is now protected."},
       {pre:"Tourism has become Costa Rica's largest source of",gap:"foreign income",post:"."},
       {pre:"Tourism revenue in Costa Rica is greater than earnings from coffee and",gap:"banana exports",post:"."},
       {pre:"In Kenya, local people manage wildlife areas through community",gap:"conservancies",post:"."},
       {pre:"Elephant numbers in the Maasai Mara have risen by",gap:"thirty percent",post:"."},
       {pre:"Companies making false environmental claims is known as",gap:"greenwashing",post:"."},
       {pre:"Travellers should look for recognised",gap:"certification schemes",post:"to verify genuine ecotourism."}
     ]},
    {type:"wr",tl:"Writing",title:"Part 1 - Essay",ins:"Write an essay (140-190 words).",
     prompt:"In your English class you have been discussing the effects of international tourism. Now your teacher has asked you to write an essay. Write an essay discussing two of the following points: 1) economic benefits 2) environmental impact 3) cultural exchange. Remember to give reasons for your opinions and include an introduction and conclusion.",minWords:140}
  ]
}
]
};


// Exponer en window para que cambridge-runner.html encuentre el dataset.
if (typeof window !== 'undefined') { window.CAM_FCE = CAM_FCE; }
