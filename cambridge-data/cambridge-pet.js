// Cambridge B1 Preliminary (PET) - 10 Practice Tests
const CAM_PET = {
id:"pet", name:"B1 Preliminary (PET)", level:"b1",
examInfo:{
  title:"B1 Preliminary (PET)", level:"B1",
  overview:"B1 Preliminary shows you have mastered the basics of English and can deal with everyday written and spoken communication. It covers reading, writing, listening, and speaking.",
  papers:[
    {name:"Reading",duration:"45 minutes",parts:6,questions:32},
    {name:"Writing",duration:"45 minutes",parts:2,questions:2},
    {name:"Listening",duration:"36 minutes",parts:4,questions:25},
    {name:"Speaking",duration:"12-17 minutes",parts:4,questions:null}
  ],
  paperDetails:[
    {paper:"Reading",parts:[
      {part:1,name:"Multiple choice (short texts)",questions:5,description:"Read notices, messages, signs and choose the correct meaning."},
      {part:2,name:"Matching",questions:5,description:"Match people to texts based on their preferences."},
      {part:3,name:"Multiple choice (longer text)",questions:5,description:"Read a longer text and answer questions."},
      {part:4,name:"Multiple-choice cloze",questions:6,description:"Choose the correct word to fill each gap from four options."},
      {part:5,name:"Open cloze",questions:6,description:"Write the missing word in each gap."},
      {part:6,name:"Sentence transformations",questions:6,description:"Complete the second sentence using a given word so it means the same."}
    ]},
    {paper:"Writing",parts:[
      {part:1,name:"Email/message",questions:1,description:"Write about 100 words - an email or short message."},
      {part:2,name:"Article or Story",questions:1,description:"Write about 100 words - choose between an article or a story."}
    ]},
    {paper:"Listening",parts:[
      {part:1,name:"Multiple choice (pictures)",questions:7,description:"Short conversations - choose the correct picture/answer."},
      {part:2,name:"Multiple choice (longer)",questions:6,description:"Listen to a monologue or interview and answer questions."},
      {part:3,name:"Gap fill",questions:6,description:"Listen and complete notes with missing information."},
      {part:4,name:"Multiple choice (short)",questions:6,description:"Listen to short recordings and choose the answer."}
    ]}
  ],
  tips:[
    "In reading, skim the whole text before answering questions.",
    "For sentence transformations, use 1-3 words including the key word.",
    "In listening, read the questions before the audio plays.",
    "For writing, plan your answer before you start writing.",
    "Check grammar, spelling, and word count in writing tasks."
  ],
  scales:{pass:140,merit:153,distinction:160,maxScore:170}
},
lessons:[
// ===== TEST 1: TRAVEL =====
{t:"Practice Test 1",exercises:[
  {type:"mc",tl:"Reading",title:"Part 1 - Short Texts",ins:"Read each text and choose the correct answer.",
   items:[
    {q:"AIRPORT NOTICE: All passengers must show their boarding pass and photo ID before entering the departure area.",opts:["You only need your boarding pass to enter","Two documents are required to enter the departure area","Photo ID is not accepted at this airport"],ans:1},
    {q:"HOTEL: Guests who wish to extend their stay should contact reception before 10 AM on the day of departure.",opts:["You can only leave the hotel before 10 AM","You should tell reception early if you want to stay longer","The hotel closes at 10 AM"],ans:1},
    {q:"Dear Maria, Our flight has been delayed by two hours. I will pick you up at 9 PM instead of 7 PM. - David",opts:["David is cancelling the trip","Maria needs to arrive two hours early","David will arrive later than planned"],ans:2},
    {q:"TRAIN STATION: Return tickets are valid for one month from the date of purchase.",opts:["You must travel back within one month","Single tickets last one month","Return tickets can only be used on the same day"],ans:0},
    {q:"TOURIST INFORMATION: Free city maps are available at the front desk. Guided tours depart at 11 AM daily.",opts:["You must pay for a city map","Maps and tours are both free","You can get a free map and join a tour at 11 AM"],ans:2}
  ]},
  {type:"mc",tl:"Reading",title:"Part 3 - Reading Comprehension",ins:"Read the text and choose the best answer.",
   passage:"When Clara turned eighteen, she decided to travel around South America on her own. Her parents were worried at first, but Clara had been planning the trip for two years and had saved enough money from her weekend job at a bookshop. She bought a backpack, a guidebook, and a basic first-aid kit. Her first stop was Lima, Peru, where she stayed in a small hostel near the city centre. She was surprised by how friendly the other travellers were. On her second day, she met a group of students from Germany who were also travelling alone. They decided to visit Machu Picchu together. The journey took several hours by bus through the mountains, but the views were incredible. Clara had never seen anything so beautiful. After Peru, she travelled to Bolivia and then to Argentina. She tried local food everywhere she went and even learned to dance the tango in Buenos Aires. By the end of her three-month trip, Clara had visited six countries and made friends from all over the world. She returned home feeling more confident and independent than ever before. Her parents admitted they had been wrong to worry.",
   items:[
    {q:"How did Clara pay for her trip?",opts:["Her parents gave her the money","She saved money from a part-time job","She won a travel competition"],ans:1},
    {q:"What surprised Clara in Lima?",opts:["How expensive the hostel was","How unfriendly people were","How welcoming other travellers were"],ans:2},
    {q:"Who did Clara visit Machu Picchu with?",opts:["Her parents","Some German students","A tour guide from the hostel"],ans:1},
    {q:"What did Clara learn to do in Buenos Aires?",opts:["Cook local food","Speak Spanish fluently","Dance the tango"],ans:2},
    {q:"How did Clara feel when she returned home?",opts:["More confident and independent","Tired and disappointed","Worried about money"],ans:0}
  ]},
  {type:"mc",tl:"Reading",title:"Part 4 - Multiple-choice Cloze",ins:"Choose the correct word for each space.",
   passage:"Travelling by train has become increasingly popular in recent years. Many people (1)___ to take the train rather than fly because it is better for the environment. Trains produce far (2)___ carbon emissions than planes, which is important for people who care about climate change. Another advantage is that train stations are usually located in city centres, (3)___ means you do not need to travel far to reach your destination. Of course, trains can be slower than planes, (4)___ for long distances. However, many travellers enjoy the journey itself. They can look out of the window, read a book, or (5)___ work on their laptops. Some countries have invested heavily in high-speed rail networks. In Japan, for example, the bullet train can (6)___ speeds of over 300 kilometres per hour.",
   items:[
    {q:"Gap 1",opts:["prefer","rather","like","enjoy"],ans:0},
    {q:"Gap 2",opts:["less","fewer","smaller","lower"],ans:1},
    {q:"Gap 3",opts:["that","what","which","where"],ans:2},
    {q:"Gap 4",opts:["mainly","especially","mostly","hardly"],ans:1},
    {q:"Gap 5",opts:["still","yet","even","already"],ans:2},
    {q:"Gap 6",opts:["arrive","get","reach","come"],ans:2}
  ]},
  {type:"fl",tl:"Reading",title:"Part 5 - Open Cloze",ins:"Write one word for each space.",
   items:[
    {pre:"She has lived in London",gap:"since",post:"2018."},
    {pre:"I am not used",gap:"to",post:"getting up so early."},
    {pre:"There were very",gap:"few",post:"tourists at the museum today."},
    {pre:"He asked me",gap:"if",post:"I had ever been to Paris."},
    {pre:"We need to set",gap:"off",post:"early tomorrow morning."},
    {pre:"This is the best holiday I have",gap:"ever",post:"had."}
  ]},
  {type:"kt",tl:"Reading",title:"Part 6 - Sentence Transformations",ins:"Complete the second sentence so it means the same as the first. Use 1-3 words including the given word.",
   items:[
    {src:"I started learning French three years ago.",kw:"FOR",ans:"have been learning French for",hint:"Present perfect + for"},
    {src:"This hotel is cheaper than the one we stayed at last year.",kw:"EXPENSIVE",ans:"not as expensive as",hint:"Not as ... as comparison"},
    {src:"Someone stole my suitcase at the airport.",kw:"WAS",ans:"My suitcase was stolen",hint:"Passive voice"},
    {src:"It is not necessary to book in advance.",kw:"HAVE",ans:"do not have to",hint:"Modal: don't have to"},
    {src:"The journey was too long for the children.",kw:"ENOUGH",ans:"not short enough for",hint:"Too/enough transformation"},
    {src:"'I will call you tomorrow,' said Tom.",kw:"WOULD",ans:"Tom said he would",hint:"Reported speech"}
  ]},
  {type:"mc",tl:"Listening",title:"Part 2 - Longer Recording",ins:"Listen and choose the correct answer.",
   audio:"Interviewer: Today I am talking to Jake, who has just returned from an amazing trip. Jake, tell us about it. Jake: Well, I spent three months travelling around Southeast Asia. I visited Thailand, Vietnam, Cambodia, and Laos. Interviewer: That sounds wonderful. Why did you choose that part of the world? Jake: Actually, my older sister went there a few years ago and she could not stop talking about it. She showed me her photos and I knew I had to go. Interviewer: What was the highlight of your trip? Jake: That is a difficult question. I loved the temples in Cambodia, and the food in Vietnam was incredible. But I think the best experience was a cooking class I took in Thailand. The teacher was a local woman who had been cooking traditional Thai food for over thirty years. She taught us how to make five different dishes in one afternoon. I still cook them at home now. Interviewer: Were there any difficult moments? Jake: Yes, I got quite ill in Laos. I think it was something I ate. I had to stay in bed for three days. That was not fun. But the people at my guesthouse were so kind. They brought me soup and medicine. Interviewer: Would you go back? Jake: Absolutely. I am already saving money for my next trip. I want to go to Indonesia next time.",
   items:[
    {q:"Why did Jake choose to travel to Southeast Asia?",opts:["He read about it in a magazine","His sister recommended it","He won a free ticket"],ans:1},
    {q:"What was the best experience of Jake's trip?",opts:["Visiting temples in Cambodia","Eating street food in Vietnam","A cooking class in Thailand"],ans:2},
    {q:"How long did the cooking teacher spend making Thai food?",opts:["Over thirty years","Five years","One afternoon"],ans:0},
    {q:"What happened to Jake in Laos?",opts:["He lost his passport","He became ill","He missed his flight"],ans:1},
    {q:"Who helped Jake when he was unwell?",opts:["Other travellers","His family","The guesthouse staff"],ans:2},
    {q:"What does Jake plan to do next?",opts:["Return to Thailand","Travel to Indonesia","Visit his sister"],ans:1}
  ]},
  {type:"wr",tl:"Writing",title:"Part 2 - Article or Story",ins:"Write about 100 words.",
   prompt:"Your English teacher has asked you to write an article about a place you have visited that you would recommend to other people. Write your article explaining where you went, what you did there, and why you would recommend it.",minWords:80}
]},
// ===== TEST 2: TECHNOLOGY =====
{t:"Practice Test 2",exercises:[
  {type:"mc",tl:"Reading",title:"Part 1 - Short Texts",ins:"Read each text and choose the correct answer.",
   items:[
    {q:"COMPUTER LAB: Please save all work to your own USB drive. Files left on the desktop will be deleted every evening.",opts:["Your files will be safe on the desktop overnight","You should save your work on a USB drive","USB drives are not allowed in the lab"],ans:1},
    {q:"Dear customers, our website will be unavailable from midnight to 6 AM on Saturday for essential maintenance. We apologise for any inconvenience.",opts:["The website is permanently closing","The website will not work for part of Saturday","Customers should contact the company on Saturday"],ans:1},
    {q:"PHONE SHOP: Trade in your old phone and get up to 150 pounds off a new model.",opts:["New phones cost 150 pounds","You can exchange your old phone for a discount","Old phones are sold for 150 pounds"],ans:1},
    {q:"WARNING: This software update requires at least 2 GB of free space. Please check your storage before proceeding.",opts:["The update will give you 2 GB of space","You need enough free space before updating","The software costs 2 pounds"],ans:1},
    {q:"Hi Sam, I have just bought a new tablet. It was much cheaper online than in the shop. You should check the website! - Nico",opts:["Nico prefers shopping in stores","The tablet was more expensive online","Nico found a better price on the internet"],ans:2}
  ]},
  {type:"mc",tl:"Reading",title:"Part 3 - Reading Comprehension",ins:"Read the text and choose the best answer.",
   passage:"The way we listen to music has changed enormously over the past few decades. In the 1980s and 1990s, most people bought CDs from music shops. They would spend hours browsing through shelves and reading the back covers of albums before deciding what to buy. Then, in the early 2000s, digital music arrived and everything changed. Suddenly, people could download individual songs for a small fee instead of buying a whole album. Music shops began to close, and many musicians worried about how they would earn money. The biggest change, however, came with streaming services. These platforms allow users to listen to millions of songs for a monthly fee. Today, most young people have never bought a physical CD. They simply open an app on their phone and choose from a huge library of music. While this is incredibly convenient, some people argue that we have lost something important. When music is so easily available, we may not value individual albums as much as we used to. Artists also complain that streaming services do not pay them fairly. Despite these concerns, streaming continues to grow, and it is clear that this is how most people will listen to music in the future.",
   items:[
    {q:"What did people do in music shops in the 1980s and 1990s?",opts:["They downloaded songs","They looked through CDs before buying","They listened to streaming services"],ans:1},
    {q:"What happened when digital music arrived?",opts:["More music shops opened","People could buy single songs","CDs became more expensive"],ans:1},
    {q:"What do streaming services offer?",opts:["Free CDs by post","Access to millions of songs for a fee","Discounts on concert tickets"],ans:1},
    {q:"Why do some people think streaming is a problem?",opts:["It is too expensive","People may value music less","The sound quality is very poor"],ans:1},
    {q:"What is the writer's conclusion about streaming?",opts:["It will soon disappear","It is the future of music listening","It is only popular with older people"],ans:1}
  ]},
  {type:"mc",tl:"Reading",title:"Part 4 - Multiple-choice Cloze",ins:"Choose the correct word for each space.",
   passage:"Social media has changed the way people (1)___ with each other. In the past, if you wanted to stay in touch with a friend who lived far away, you had to write letters or make expensive phone calls. (2)___, you can simply send a message or share a photo online. Social media also allows people to (3)___ new friends who share similar interests. However, many experts are concerned about the (4)___ that social media has on young people. Some studies have shown that spending too much time online can (5)___ to feelings of loneliness and anxiety. It is important to find a healthy (6)___ between online and offline activities.",
   items:[
    {q:"Gap 1",opts:["communicate","say","speak","tell"],ans:0},
    {q:"Gap 2",opts:["However","Nowadays","Although","Despite"],ans:1},
    {q:"Gap 3",opts:["do","get","make","have"],ans:2},
    {q:"Gap 4",opts:["result","effect","cause","reason"],ans:1},
    {q:"Gap 5",opts:["take","bring","lead","carry"],ans:2},
    {q:"Gap 6",opts:["weight","balance","measure","level"],ans:1}
  ]},
  {type:"fl",tl:"Reading",title:"Part 5 - Open Cloze",ins:"Write one word for each space.",
   items:[
    {pre:"This laptop is",gap:"more",post:"expensive than the one I wanted."},
    {pre:"I have not seen him",gap:"for",post:"a long time."},
    {pre:"She was talking",gap:"on",post:"the phone when I arrived."},
    {pre:"Would you mind",gap:"turning",post:"off the computer?"},
    {pre:"It depends",gap:"on",post:"how much memory you need."},
    {pre:"He is interested",gap:"in",post:"learning about programming."}
  ]},
  {type:"kt",tl:"Reading",title:"Part 6 - Sentence Transformations",ins:"Complete the second sentence so it means the same as the first. Use 1-3 words including the given word.",
   items:[
    {src:"They built this computer in Japan.",kw:"WAS",ans:"This computer was built",hint:"Passive voice"},
    {src:"I have never used this app before.",kw:"FIRST",ans:"the first time I have",hint:"First time + present perfect"},
    {src:"My old phone was not as fast as this one.",kw:"FASTER",ans:"This phone is faster than",hint:"Comparative adjective"},
    {src:"You are not allowed to use phones in the exam.",kw:"MUST",ans:"You must not use",hint:"Modal: must not"},
    {src:"I regret not buying the cheaper laptop.",kw:"WISH",ans:"I wish I had bought",hint:"Wish + past perfect"},
    {src:"'I am fixing the computer,' said the technician.",kw:"WAS",ans:"the technician said he was fixing",hint:"Reported speech - past continuous"}
  ]},
  {type:"mc",tl:"Listening",title:"Part 2 - Longer Recording",ins:"Listen and choose the correct answer.",
   audio:"Interviewer: I am here with Dr. Patel, who studies how technology affects our daily lives. Dr. Patel, thank you for joining us. Dr. Patel: Thank you for having me. Interviewer: People spend a lot of time looking at screens these days. Is that a problem? Dr. Patel: It depends. Screens themselves are not bad. The problem is when people use them too much, especially before going to sleep. The blue light from phones and tablets can make it harder to fall asleep. I always tell my patients to stop using screens at least one hour before bedtime. Interviewer: What about children? Dr. Patel: This is something I feel strongly about. Young children should not spend more than one hour a day on screens. They need to play outside, talk to other children, and use their imagination. I have seen children who spend five or six hours a day watching videos, and it really affects their concentration at school. Interviewer: Do you think technology has any benefits for health? Dr. Patel: Oh, absolutely. There are wonderful apps that help people exercise, track what they eat, and even monitor their heart rate. I use a fitness tracker myself and it has helped me walk more every day. Technology is a tool, and like any tool, it can be helpful or harmful depending on how you use it. Interviewer: That is very helpful advice. Thank you, Dr. Patel.",
   items:[
    {q:"What does Dr. Patel say about screens?",opts:["They are always harmful","They are a problem when used too much","They have no effect on health"],ans:1},
    {q:"What should people do before going to sleep?",opts:["Use their phone for one hour","Avoid screens for at least an hour","Watch relaxing videos"],ans:1},
    {q:"How long should young children use screens each day?",opts:["No more than one hour","At least two hours","As long as they want"],ans:0},
    {q:"What problem has Dr. Patel noticed in children who watch too many videos?",opts:["They eat too much","They cannot sleep","They have trouble concentrating at school"],ans:2},
    {q:"How does Dr. Patel use technology for health?",opts:["She uses a fitness tracker","She watches exercise videos","She reads health articles online"],ans:0},
    {q:"What is Dr. Patel's overall view of technology?",opts:["It is mostly harmful","It depends on how it is used","It should be avoided"],ans:1}
  ]},
  {type:"wr",tl:"Writing",title:"Part 2 - Article or Story",ins:"Write about 100 words.",
   prompt:"Your English teacher has asked you to write an article about how technology has changed your daily life. Write your article explaining what technology you use most, how it helps you, and whether you think there are any disadvantages.",minWords:80}
]},
// ===== TEST 3: ENVIRONMENT =====
{t:"Practice Test 3",exercises:[
  {type:"mc",tl:"Reading",title:"Part 1 - Short Texts",ins:"Read each text and choose the correct answer.",
   items:[
    {q:"PARK NOTICE: Please do not feed the birds. Bread is harmful to their health.",opts:["Feeding birds is encouraged in this park","You should not give food to the birds","Bread is available for sale in the park"],ans:1},
    {q:"CITY COUNCIL: From next month, all plastic bags will cost 20p each. Please bring your own reusable bags when shopping.",opts:["Plastic bags will be free from next month","Shoppers are advised to bring their own bags","The city is banning all types of bags"],ans:1},
    {q:"Dear neighbours, Please remember to put recycling bins out on Tuesday evenings, not Wednesday mornings. Thank you. - Building Manager",opts:["Recycling collection is on Wednesday morning","Bins should be placed outside on Tuesday evening","Recycling has been cancelled this week"],ans:1},
    {q:"NATURE RESERVE: Visitors must stay on the marked paths. Dogs are not permitted in this area.",opts:["You can walk anywhere you like with your dog","Dogs are welcome if they stay on the paths","You must follow the paths and leave dogs at home"],ans:2},
    {q:"SCHOOL: All students are invited to join the new environment club. We meet every Thursday at lunchtime in Room 12.",opts:["The environment club is only for certain students","Students can join the club on Thursdays at lunch","Room 12 is closed on Thursdays"],ans:1}
  ]},
  {type:"mc",tl:"Reading",title:"Part 3 - Reading Comprehension",ins:"Read the text and choose the best answer.",
   passage:"Ocean plastic pollution has become one of the most serious environmental problems of our time. Every year, approximately eight million tonnes of plastic waste enters the oceans. This plastic does not disappear. Instead, it breaks down into tiny pieces called microplastics, which are eaten by fish and other sea creatures. Scientists have found microplastics in the stomachs of animals living in the deepest parts of the ocean. The problem starts on land. Much of the plastic in the ocean comes from countries that do not have proper waste management systems. In these places, rubbish is often dumped in rivers, which carry it out to sea. However, wealthier countries also contribute to the problem by producing enormous amounts of single-use plastic, such as bottles, bags, and food packaging. Several solutions have been proposed. Some organisations are developing machines that can collect plastic from the ocean. Others believe we should focus on reducing the amount of plastic we produce in the first place. Many governments have introduced bans on certain single-use items, and some companies have started using alternative materials. Experts say that a combination of approaches is needed, and that everyone, from governments to individuals, has a role to play in solving this crisis.",
   items:[
    {q:"How much plastic enters the oceans each year?",opts:["Eight thousand tonnes","Eight million tonnes","Eighty million tonnes"],ans:1},
    {q:"What are microplastics?",opts:["Large pieces of ocean waste","Tiny pieces of broken-down plastic","A type of fish food"],ans:1},
    {q:"Where does much of the ocean plastic come from?",opts:["Ships and boats at sea","Countries without proper waste systems","Factories built near the coast"],ans:1},
    {q:"What have some governments done about the problem?",opts:["Banned all plastic completely","Closed rivers that carry waste","Banned certain single-use plastic items"],ans:2},
    {q:"What do experts say is needed to solve the problem?",opts:["Only governments need to act","A combination of different approaches","Ocean cleaning machines are the only answer"],ans:1}
  ]},
  {type:"mc",tl:"Reading",title:"Part 4 - Multiple-choice Cloze",ins:"Choose the correct word for each space.",
   passage:"Climate change is (1)___ the natural world in many ways. Temperatures around the world have been rising for several decades, and this is having a serious (2)___ on wildlife. Many animals are being forced to move to cooler areas in order to (3)___. Birds are migrating earlier in the year, and some plants are flowering weeks before they used to. Scientists are particularly (4)___ about polar bears, whose habitat is disappearing as the ice melts. If we do not take action soon, it is (5)___ that many species will become extinct. Everyone needs to do their (6)___ to reduce carbon emissions and protect the planet.",
   items:[
    {q:"Gap 1",opts:["touching","affecting","impressing","contacting"],ans:1},
    {q:"Gap 2",opts:["impression","result","impact","meaning"],ans:2},
    {q:"Gap 3",opts:["survive","remain","continue","stay"],ans:0},
    {q:"Gap 4",opts:["afraid","worried","nervous","frightened"],ans:1},
    {q:"Gap 5",opts:["probably","likely","possibly","certainly"],ans:1},
    {q:"Gap 6",opts:["part","job","work","share"],ans:0}
  ]},
  {type:"fl",tl:"Reading",title:"Part 5 - Open Cloze",ins:"Write one word for each space.",
   items:[
    {pre:"We should all try to use",gap:"less",post:"plastic in our daily lives."},
    {pre:"The forest has been here",gap:"for",post:"hundreds of years."},
    {pre:"If everyone recycles, it will make",gap:"a",post:"big difference."},
    {pre:"Many animals are",gap:"in",post:"danger of becoming extinct."},
    {pre:"I have never",gap:"seen",post:"so much rubbish on a beach before."},
    {pre:"This project was set",gap:"up",post:"by a group of young volunteers."}
  ]},
  {type:"kt",tl:"Reading",title:"Part 6 - Sentence Transformations",ins:"Complete the second sentence so it means the same as the first. Use 1-3 words including the given word.",
   items:[
    {src:"People throw away too much plastic.",kw:"THROWN",ans:"Too much plastic is thrown",hint:"Passive voice"},
    {src:"It started raining while we were cleaning the beach.",kw:"WHEN",ans:"We were cleaning the beach when",hint:"Past continuous + when"},
    {src:"No city is more polluted than this one.",kw:"MOST",ans:"This is the most polluted",hint:"Superlative"},
    {src:"We cannot go to the park because it is raining.",kw:"WOULD",ans:"We would go to the park",hint:"Second conditional idea"},
    {src:"It is possible that temperatures will rise further.",kw:"MAY",ans:"Temperatures may rise further",hint:"Modal: may for possibility"},
    {src:"They have not cleaned the river for months.",kw:"SINCE",ans:"has not been cleaned since",hint:"Passive + since"}
  ]},
  {type:"mc",tl:"Listening",title:"Part 2 - Longer Recording",ins:"Listen and choose the correct answer.",
   audio:"Interviewer: Welcome to the programme. Today we are talking to Lisa, a seventeen-year-old student who has started an environmental project at her school. Lisa, tell us what you have been doing. Lisa: Thank you. Well, it all started about six months ago when I noticed how much food was being wasted in our school canteen. Every lunchtime, huge amounts of perfectly good food were being thrown away. It really upset me. Interviewer: So what did you do? Lisa: First, I talked to the head teacher about it. She was really supportive and helped me set up a team of volunteers. We started by measuring exactly how much food was being wasted each day. The results were shocking. We were throwing away nearly fifty kilos of food every week. Interviewer: That is a lot. How did you reduce it? Lisa: We introduced a system where students could choose smaller portions if they wanted. We also started a composting programme, so any food waste that could not be avoided was turned into compost for the school garden. We even set up a sharing table where students could leave food they did not want for others to take. Interviewer: Has it made a difference? Lisa: Definitely. After three months, we reduced food waste by sixty percent. Other schools have contacted us to ask how they can do the same thing. I am really proud of what we have achieved.",
   items:[
    {q:"What first made Lisa want to start her project?",opts:["A lesson about the environment","Seeing food wasted at her school","Reading an article about composting"],ans:1},
    {q:"Who helped Lisa set up the project?",opts:["Her parents","The head teacher","A local charity"],ans:1},
    {q:"How much food was wasted each week at the school?",opts:["About thirty kilos","About fifty kilos","About seventy kilos"],ans:1},
    {q:"What did the sharing table allow students to do?",opts:["Buy cheaper food","Leave unwanted food for others","Cook their own meals"],ans:1},
    {q:"By how much did the school reduce food waste?",opts:["Forty percent","Fifty percent","Sixty percent"],ans:2},
    {q:"What has happened since the project started?",opts:["The school has won an award","Other schools want to copy the idea","The canteen has closed down"],ans:1}
  ]},
  {type:"wr",tl:"Writing",title:"Part 2 - Article or Story",ins:"Write about 100 words.",
   prompt:"Your English teacher has asked you to write an article about what young people can do to help the environment. Write your article explaining what the problem is, what actions young people can take, and why it is important.",minWords:80}
]},
// ===== TEST 4: HEALTH & FITNESS =====
{t:"Practice Test 4",exercises:[
  {type:"mc",tl:"Reading",title:"Part 1 - Short Texts",ins:"Read each text and choose the correct answer.",
   items:[
    {q:"GYM NOTICE: All new members must complete a health questionnaire before using the equipment.",opts:["New members can use the equipment immediately","You need to fill in a form about your health first","The gym equipment is currently broken"],ans:1},
    {q:"SWIMMING POOL: The pool will be closed for maintenance from 5th to 12th March. We apologise for any inconvenience.",opts:["The pool is open every day in March","The pool will be shut for one week","Maintenance work happens every week"],ans:1},
    {q:"Dear all, This year's school sports day has been moved from June 15th to June 22nd due to predicted bad weather. - Mr. Collins",opts:["Sports day has been cancelled","Sports day will be a week later than planned","The weather will be good on June 15th"],ans:1},
    {q:"CAFE: Our new healthy lunch menu includes salads, soups, and fresh juices. All meals under 5 pounds!",opts:["The cafe only serves drinks","Healthy meals are available at an affordable price","Salads cost more than 5 pounds"],ans:1},
    {q:"PHARMACY: Flu vaccinations are available now. No appointment needed. Ask at the counter.",opts:["You must book an appointment for a flu vaccination","Flu vaccinations require a doctor's letter","You can get a flu vaccination without booking"],ans:2}
  ]},
  {type:"mc",tl:"Reading",title:"Part 3 - Reading Comprehension",ins:"Read the text and choose the best answer.",
   passage:"Running has become one of the most popular forms of exercise in the world, and it is easy to see why. Unlike many sports, running requires very little equipment. All you need is a good pair of trainers, and you can run almost anywhere, at any time. Many people take up running because they want to lose weight or improve their fitness. However, research has shown that running has many other benefits as well. Regular runners report feeling less stressed and more energetic. Running releases chemicals in the brain called endorphins, which can improve your mood and help you sleep better. Some people describe feeling a sense of calm and happiness after a long run, which is often called the runner's high. Of course, running is not without its risks. Beginners sometimes do too much too soon and injure themselves. Experts recommend starting slowly and gradually increasing the distance. It is also important to warm up properly before running and to stretch afterwards. Good shoes are essential, as they protect your feet and joints from the impact of running on hard surfaces. For those who enjoy a challenge, there are thousands of running events held around the world each year, from short five-kilometre races to marathons and even ultra-marathons. Many of these events raise money for charity, which gives runners an extra reason to take part.",
   items:[
    {q:"Why is running so popular?",opts:["It requires expensive equipment","You can do it almost anywhere with little equipment","It is only done indoors"],ans:1},
    {q:"What are endorphins?",opts:["A type of running shoe","A style of exercise","Chemicals in the brain that improve mood"],ans:2},
    {q:"What mistake do beginners often make?",opts:["They do not run enough","They do too much too quickly","They buy the wrong clothes"],ans:1},
    {q:"Why are good shoes important for runners?",opts:["They make you run faster","They protect feet and joints","They look more professional"],ans:1},
    {q:"What extra motivation do charity events give runners?",opts:["Free trainers","Prize money","Raising money for a good cause"],ans:2}
  ]},
  {type:"mc",tl:"Reading",title:"Part 4 - Multiple-choice Cloze",ins:"Choose the correct word for each space.",
   passage:"Getting enough sleep is essential for good health, but many people do not (1)___ how important it really is. Adults need between seven and nine hours of sleep every night. Without (2)___ sleep, people often find it difficult to concentrate during the day. Their memory gets worse and they are more (3)___ to get ill. There are several things you can do to improve the quality of your sleep. First, try to go to bed and (4)___ up at the same time every day, even at weekends. This helps your body get into a regular routine. Second, avoid drinking coffee or tea in the (5)___. The caffeine in these drinks can keep you awake for hours. Finally, make sure your bedroom is dark, quiet, and not too (6)___.",
   items:[
    {q:"Gap 1",opts:["recognise","know","realise","understand"],ans:2},
    {q:"Gap 2",opts:["right","enough","plenty","well"],ans:1},
    {q:"Gap 3",opts:["easy","able","likely","possible"],ans:2},
    {q:"Gap 4",opts:["wake","get","stand","rise"],ans:0},
    {q:"Gap 5",opts:["morning","afternoon","evening","night"],ans:2},
    {q:"Gap 6",opts:["cold","warm","cool","fresh"],ans:1}
  ]},
  {type:"fl",tl:"Reading",title:"Part 5 - Open Cloze",ins:"Write one word for each space.",
   items:[
    {pre:"You should try to exercise at",gap:"least",post:"three times a week."},
    {pre:"She has been feeling much",gap:"better",post:"since she started yoga."},
    {pre:"I am thinking",gap:"of",post:"joining a gym near my house."},
    {pre:"Running is good",gap:"for",post:"your heart and lungs."},
    {pre:"He gave",gap:"up",post:"smoking last year."},
    {pre:"There is",gap:"no",post:"point in worrying about things you cannot change."}
  ]},
  {type:"kt",tl:"Reading",title:"Part 6 - Sentence Transformations",ins:"Complete the second sentence so it means the same as the first. Use 1-3 words including the given word.",
   items:[
    {src:"She started going to the gym six months ago.",kw:"BEEN",ans:"She has been going",hint:"Present perfect continuous"},
    {src:"Running is healthier than watching TV.",kw:"AS",ans:"Watching TV is not as healthy as",hint:"Not as ... as"},
    {src:"You should eat less sugar.",kw:"OUGHT",ans:"You ought to eat",hint:"Modal: ought to"},
    {src:"The doctor told me not to eat fast food.",kw:"ADVISED",ans:"The doctor advised me not",hint:"Reporting verb: advise"},
    {src:"My sister runs faster than me.",kw:"SLOWLY",ans:"I run more slowly than",hint:"Comparative adverb"},
    {src:"It is not necessary to go to the gym every day.",kw:"NEED",ans:"You do not need to",hint:"Modal: don't need to"}
  ]},
  {type:"mc",tl:"Listening",title:"Part 2 - Longer Recording",ins:"Listen and choose the correct answer.",
   audio:"Interviewer: Good morning. Today on the show we have Emma, a personal trainer who works with young people. Emma, welcome. Emma: Thank you. It is great to be here. Interviewer: How did you become a personal trainer? Emma: Well, when I was at university studying sports science, I started helping my friends with their exercise routines. They told me I was really good at explaining things and keeping them motivated. So after I graduated, I decided to get my personal training qualification. It took about six months. Interviewer: Who do you mainly work with? Emma: Mostly teenagers and young adults. A lot of them come to me because they want to get fitter for a specific sport. I also work with some older adults who are trying to get back into exercise after an injury. Interviewer: What is the biggest mistake people make when they start exercising? Emma: Without a doubt, it is doing too much too soon. People get excited and they try to exercise every day, but their body is not ready for it. I always tell my clients to start with three sessions a week and build up slowly. Rest days are just as important as training days. Interviewer: Any other advice? Emma: Yes. Find an activity you actually enjoy. If you hate running, do not force yourself to run. Try swimming, cycling, dancing, whatever makes you happy. You are much more likely to keep going if you enjoy it.",
   items:[
    {q:"How did Emma discover she could be a good trainer?",opts:["She took a test at university","She helped her friends exercise","She watched training videos online"],ans:1},
    {q:"How long did it take Emma to get her qualification?",opts:["About three months","About six months","About twelve months"],ans:1},
    {q:"Who does Emma mainly work with?",opts:["Professional athletes","Older retired people","Teenagers and young adults"],ans:2},
    {q:"What is the biggest mistake beginners make?",opts:["They exercise too much at the start","They do not buy the right equipment","They eat too much protein"],ans:0},
    {q:"How often should beginners exercise according to Emma?",opts:["Every day","Three times a week","Once a week"],ans:1},
    {q:"What is Emma's main advice about choosing an activity?",opts:["Running is the best option","Choose something you enjoy","Always exercise with a trainer"],ans:1}
  ]},
  {type:"wr",tl:"Writing",title:"Part 2 - Article or Story",ins:"Write about 100 words.",
   prompt:"Your English teacher has asked you to write an article about staying healthy. Write your article explaining what people can do to stay fit and healthy, and why you think health is important for young people.",minWords:80}
]},
// ===== TEST 5: EDUCATION =====
{t:"Practice Test 5",exercises:[
  {type:"mc",tl:"Reading",title:"Part 1 - Short Texts",ins:"Read each text and choose the correct answer.",
   items:[
    {q:"UNIVERSITY: Applications for the September intake must be submitted online by 31st January. Late applications will not be accepted.",opts:["You can apply at any time during the year","You must apply before the end of January","Applications are only accepted on paper"],ans:1},
    {q:"NOTICE: The school library will open one hour earlier during exam week to give students extra study time.",opts:["The library is closing during exams","Students will have more time to study in the library","Exam week has been shortened by one hour"],ans:1},
    {q:"Hi Anna, Can you bring your history notes to class tomorrow? I was absent last Thursday and missed the lesson. Thanks, Ben",opts:["Ben wants to lend Anna his notes","Ben needs Anna's notes because he missed a class","Anna was absent from the history lesson"],ans:1},
    {q:"COLLEGE: Students who wish to change their course must speak to their tutor before the end of the second week.",opts:["Course changes are not possible","You have two weeks to request a course change","Tutors are not available in the first two weeks"],ans:1},
    {q:"CLASSROOM: Dictionaries may be used during the reading exam but electronic devices are not allowed.",opts:["You can use your phone as a dictionary","Paper dictionaries are permitted in the exam","All books are banned from the exam room"],ans:1}
  ]},
  {type:"mc",tl:"Reading",title:"Part 3 - Reading Comprehension",ins:"Read the text and choose the best answer.",
   passage:"Home schooling, where children are educated at home rather than at a traditional school, has been growing in popularity in many countries. There are several reasons why parents choose to educate their children at home. Some feel that schools do not provide enough individual attention, while others are unhappy with the quality of teaching. A few families choose home schooling because they travel frequently and need a more flexible approach to education. One of the main advantages of home schooling is that lessons can be adapted to suit each child's needs and interests. If a child is particularly interested in science, for example, they can spend more time on that subject. Children can also learn at their own pace without the pressure of keeping up with classmates. However, critics of home schooling point out some potential disadvantages. Children who are educated at home may have fewer opportunities to socialise with others their own age. They might miss out on team sports, group projects, and the everyday social interactions that happen naturally in a school environment. There are also concerns about whether parents have the necessary knowledge and skills to teach all subjects effectively. Despite these debates, research suggests that home-schooled children often perform as well as, or even better than, those who attend traditional schools. Many go on to succeed at university and in their careers.",
   items:[
    {q:"Why do some parents choose home schooling?",opts:["They think schools give too much attention to each child","They want more individual attention for their child","They want their children to socialise more"],ans:1},
    {q:"What is one advantage of home schooling mentioned in the text?",opts:["Children can focus on subjects they enjoy","Children learn to work in teams","Children have more friends"],ans:0},
    {q:"What concern do critics have about home schooling?",opts:["Children learn too quickly","Children may have fewer chances to socialise","Home schooling is too expensive"],ans:1},
    {q:"What does research suggest about home-schooled children?",opts:["They always do better than school children","They often do as well as school children","They usually struggle at university"],ans:1},
    {q:"What is the overall tone of the text?",opts:["Strongly against home schooling","Strongly in favour of home schooling","Balanced, presenting both sides"],ans:2}
  ]},
  {type:"mc",tl:"Reading",title:"Part 4 - Multiple-choice Cloze",ins:"Choose the correct word for each space.",
   passage:"Learning a foreign language has many benefits that go (1)___ simply being able to communicate with people from other countries. Research has shown that people who speak more than one language often have better memory and concentration skills. They are also better at (2)___ problems and making decisions. Learning a language can be challenging, but there are many ways to make the (3)___ easier and more enjoyable. Watching films and listening to music in the language you are studying can help you improve without (4)___ like you are studying. Many people also find it useful to practise with a language (5)___ - someone who is learning your language and wants to exchange conversation practice. The most important thing is to practise (6)___, even if it is only for a few minutes each day.",
   items:[
    {q:"Gap 1",opts:["after","over","beyond","above"],ans:2},
    {q:"Gap 2",opts:["solving","working","answering","dealing"],ans:0},
    {q:"Gap 3",opts:["method","way","process","manner"],ans:2},
    {q:"Gap 4",opts:["seeming","appearing","looking","feeling"],ans:3},
    {q:"Gap 5",opts:["friend","partner","colleague","member"],ans:1},
    {q:"Gap 6",opts:["usually","regularly","normally","frequently"],ans:1}
  ]},
  {type:"fl",tl:"Reading",title:"Part 5 - Open Cloze",ins:"Write one word for each space.",
   items:[
    {pre:"I am looking forward",gap:"to",post:"starting university in September."},
    {pre:"She did not do well in the exam",gap:"because",post:"she had not studied enough."},
    {pre:"He has been studying English",gap:"since",post:"he was ten years old."},
    {pre:"The teacher told us",gap:"to",post:"hand in our homework by Friday."},
    {pre:"If I had more time, I",gap:"would",post:"learn another language."},
    {pre:"This is the school",gap:"where",post:"my mother used to work."}
  ]},
  {type:"kt",tl:"Reading",title:"Part 6 - Sentence Transformations",ins:"Complete the second sentence so it means the same as the first. Use 1-3 words including the given word.",
   items:[
    {src:"I last saw her two weeks ago.",kw:"SEEN",ans:"I have not seen her",hint:"Present perfect negative"},
    {src:"English is easier than Chinese.",kw:"DIFFICULT",ans:"Chinese is more difficult than",hint:"Comparative"},
    {src:"They will open a new school next year.",kw:"OPENED",ans:"A new school will be opened",hint:"Future passive"},
    {src:"'Do not forget to bring your textbooks,' the teacher said.",kw:"REMINDED",ans:"The teacher reminded us to",hint:"Reporting verb: remind"},
    {src:"I am too tired to study tonight.",kw:"ENOUGH",ans:"I am not awake enough to",hint:"Too/enough transformation"},
    {src:"Perhaps she will pass the exam.",kw:"MIGHT",ans:"She might pass the",hint:"Modal: might for possibility"}
  ]},
  {type:"mc",tl:"Listening",title:"Part 2 - Longer Recording",ins:"Listen and choose the correct answer.",
   audio:"Interviewer: Today we are talking to Marco, a student from Italy who is studying in England. Marco, how is your experience going? Marco: It has been amazing so far. I arrived in September and I am studying business at the University of Leeds. Interviewer: Why did you decide to study in England? Marco: Well, I wanted to improve my English, and I thought the best way to do that was to live in an English-speaking country. I also heard that British universities have a very good reputation for business courses. My father studied here too, about twenty years ago, and he always told me it was the best experience of his life. Interviewer: Has anything been difficult? Marco: The weather was a shock at first. I come from Sicily, where it is sunny most of the year. But honestly, the hardest thing was understanding different accents. In my English classes back home, everyone spoke quite slowly and clearly. Here, people speak much faster and there are so many different regional accents. It took me a few weeks to get used to it. Interviewer: What do you enjoy most? Marco: The social life is brilliant. I have joined several clubs. I play in the university football team and I am also in the film society. I have made friends from all over the world. We cook meals together and share food from our different countries. I have learned to make Korean and Indian dishes. Interviewer: Would you recommend studying abroad? Marco: One hundred percent. It has made me more independent and more open-minded.",
   items:[
    {q:"Why did Marco choose to study in England?",opts:["He wanted a warmer climate","He wanted to improve his English","He could not get into an Italian university"],ans:1},
    {q:"Who inspired Marco to study in England?",opts:["His English teacher","His father","A friend from university"],ans:1},
    {q:"What was the hardest thing for Marco at first?",opts:["Understanding different accents","Making friends","Finding accommodation"],ans:0},
    {q:"What clubs has Marco joined?",opts:["Swimming and drama","Tennis and music","Football and film"],ans:2},
    {q:"What has Marco learned to cook?",opts:["Italian and French dishes","Korean and Indian dishes","English and Spanish dishes"],ans:1},
    {q:"How has studying abroad changed Marco?",opts:["He is more independent and open-minded","He wants to become a teacher","He prefers living in Italy"],ans:0}
  ]},
  {type:"wr",tl:"Writing",title:"Part 2 - Article or Story",ins:"Write about 100 words.",
   prompt:"Your English teacher has asked you to write a story that begins with this sentence: 'On the first day at my new school, something unexpected happened.' Write your story.",minWords:80}
]},
// ===== TEST 6: ENTERTAINMENT =====
{t:"Practice Test 6",exercises:[
  {type:"mc",tl:"Reading",title:"Part 1 - Short Texts",ins:"Read each text and choose the correct answer.",
   items:[
    {q:"CINEMA: Tuesday special - all tickets half price. Offer does not include 3D screenings.",opts:["All films are cheaper on Tuesdays","3D films are half price on Tuesdays","Tuesday tickets cost twice as much"],ans:0},
    {q:"THEATRE: Tonight's performance of Hamlet has been cancelled due to a technical problem. All tickets will be refunded.",opts:["Hamlet will be shown later tonight","You cannot see Hamlet tonight but will get your money back","Tickets for Hamlet are now on sale"],ans:1},
    {q:"Dear Sophie, I have two spare tickets for the concert on Saturday. Would you and Tom like to come? Let me know! - Rachel",opts:["Rachel wants to buy tickets from Sophie","Rachel is offering Sophie and Tom free tickets","Sophie has invited Rachel to a concert"],ans:1},
    {q:"MUSEUM: Free entry for children under 12. Adults 8 pounds. Family ticket (2 adults + 2 children) 14 pounds.",opts:["Everyone must pay to enter the museum","Children pay 8 pounds each","A family ticket costs less than two adult tickets"],ans:2},
    {q:"MUSIC FESTIVAL: No glass bottles allowed. Water can be purchased inside the festival grounds.",opts:["You may bring glass bottles of water","Glass bottles are not permitted at the festival","Water is free at the festival"],ans:1}
  ]},
  {type:"mc",tl:"Reading",title:"Part 3 - Reading Comprehension",ins:"Read the text and choose the best answer.",
   passage:"The popularity of streaming services has had a huge impact on the film industry. In the past, people would go to the cinema to watch new films. Then, weeks or months later, the films would be released on DVD. Now, many films go straight to streaming platforms, and audiences can watch them from the comfort of their own homes on the same day they are released. This has caused a big debate in the film industry. Traditional filmmakers argue that films are designed to be seen on a large screen with professional sound systems. They believe that watching a film on a laptop or television does not provide the same experience. Some famous directors have even refused to make films for streaming services because they want their work to be shown in cinemas first. On the other hand, supporters of streaming say that it makes films more accessible. Not everyone lives near a cinema, and cinema tickets can be expensive, especially for families. Streaming allows people to watch a wide variety of films for a reasonable monthly fee. It has also given opportunities to smaller filmmakers who might struggle to get their films shown in cinemas. Despite the growth of streaming, cinema attendance has not disappeared entirely. Many people still enjoy the social experience of going to the cinema with friends or family. The big screen, the surround sound, and the excitement of watching a film with an audience cannot easily be replaced.",
   items:[
    {q:"How has streaming changed the film industry?",opts:["Films are no longer made","Films can be watched at home on release day","Cinemas have become cheaper"],ans:1},
    {q:"Why do some filmmakers dislike streaming?",opts:["Films are meant to be seen on a big screen","Streaming services pay too much","It takes too long to upload films"],ans:0},
    {q:"How does streaming help smaller filmmakers?",opts:["It gives them bigger budgets","It helps them get awards","It gives them a platform to show their work"],ans:2},
    {q:"Why do some people prefer streaming over cinema?",opts:["The sound quality is better at home","It is more affordable and accessible","They do not like watching films with others"],ans:1},
    {q:"What does the writer say about cinemas?",opts:["They will close soon","People still enjoy going to them","They are better than streaming in every way"],ans:1}
  ]},
  {type:"mc",tl:"Reading",title:"Part 4 - Multiple-choice Cloze",ins:"Choose the correct word for each space.",
   passage:"Video games are no longer just a hobby for children. In recent years, professional gaming, also (1)___ as e-sports, has become a billion-dollar industry. Top players can (2)___ huge amounts of money from competitions, sponsorship deals, and online streaming. Some e-sports events attract audiences of millions, with fans watching (3)___ online or in large arenas. The games themselves have become incredibly (4)___, with detailed graphics and complex storylines. However, like traditional sports, professional gaming requires years of practice and (5)___. Top players often train for eight to ten hours a day. While e-sports continue to grow in (6)___, some people still question whether playing video games should be considered a real sport.",
   items:[
    {q:"Gap 1",opts:["called","known","named","said"],ans:1},
    {q:"Gap 2",opts:["win","gain","earn","take"],ans:2},
    {q:"Gap 3",opts:["both","either","neither","each"],ans:1},
    {q:"Gap 4",opts:["advanced","developed","improved","increased"],ans:0},
    {q:"Gap 5",opts:["commitment","devotion","attention","interest"],ans:0},
    {q:"Gap 6",opts:["fame","reputation","popularity","fashion"],ans:2}
  ]},
  {type:"fl",tl:"Reading",title:"Part 5 - Open Cloze",ins:"Write one word for each space.",
   items:[
    {pre:"I am really keen",gap:"on",post:"watching science fiction films."},
    {pre:"She has been acting",gap:"since",post:"she was a child."},
    {pre:"The film was",gap:"so",post:"exciting that I watched it twice."},
    {pre:"He plays the guitar as",gap:"well",post:"as the piano."},
    {pre:"We had to queue",gap:"for",post:"over an hour to get tickets."},
    {pre:"I could not help",gap:"laughing",post:"during the comedy show."}
  ]},
  {type:"kt",tl:"Reading",title:"Part 6 - Sentence Transformations",ins:"Complete the second sentence so it means the same as the first. Use 1-3 words including the given word.",
   items:[
    {src:"The last time I went to the cinema was in March.",kw:"BEEN",ans:"I have not been to the cinema since",hint:"Present perfect negative + since"},
    {src:"This is the funniest film I have ever watched.",kw:"NEVER",ans:"I have never watched a funnier",hint:"Superlative to comparative"},
    {src:"Someone directed this film in 2019.",kw:"WAS",ans:"This film was directed",hint:"Passive voice"},
    {src:"The concert was too loud for my grandmother.",kw:"ENOUGH",ans:"The concert was not quiet enough",hint:"Too/enough transformation"},
    {src:"'Have you seen the new exhibition?' Tom asked me.",kw:"WHETHER",ans:"Tom asked me whether I had seen",hint:"Reported question"},
    {src:"It is a pity I cannot play a musical instrument.",kw:"WISH",ans:"I wish I could play",hint:"Wish + past simple"}
  ]},
  {type:"mc",tl:"Listening",title:"Part 2 - Longer Recording",ins:"Listen and choose the correct answer.",
   audio:"Interviewer: I am talking to Alex, who runs a small independent cinema in Brighton. Alex, tell us about your cinema. Alex: Well, we have been open for about five years now. We are quite small. We only have two screens and about eighty seats in each one. We show a mix of new releases and older classic films. Interviewer: How do you compete with the big cinema chains? Alex: We offer something different. The big cinemas have ten or fifteen screens and show mainly blockbuster action films. We focus on a wider range of films, including independent and foreign films that you cannot see anywhere else. We also have a nice cafe where people can have a meal before the film. Interviewer: Has it been difficult financially? Alex: Yes, honestly, the first two years were very tough. We almost had to close. But then we started doing special events. We have a film quiz every Wednesday evening, and once a month we have an outdoor screening in the summer. These events brought in new customers. We also started a membership scheme where people pay ten pounds a month and can see as many films as they want. That has been very popular. Interviewer: What about the future? Alex: I am optimistic. People still want the cinema experience. They want to sit in a dark room with other people and lose themselves in a story on a big screen. As long as we keep offering something special, I think we will be fine.",
   items:[
    {q:"How long has Alex's cinema been open?",opts:["About three years","About five years","About ten years"],ans:1},
    {q:"What makes Alex's cinema different from big chains?",opts:["It has more screens","It shows a wider range of films","It is cheaper for everyone"],ans:1},
    {q:"What nearly happened in the first two years?",opts:["The cinema nearly closed","They had to move to a bigger building","They stopped showing old films"],ans:0},
    {q:"What events helped bring in new customers?",opts:["Free popcorn nights","Film quizzes and outdoor screenings","Celebrity visits"],ans:1},
    {q:"How does the membership scheme work?",opts:["You pay once and get free films forever","You pay monthly for unlimited films","You get one free film per month"],ans:1},
    {q:"How does Alex feel about the future?",opts:["Worried","Unsure","Positive"],ans:2}
  ]},
  {type:"wr",tl:"Writing",title:"Part 2 - Article or Story",ins:"Write about 100 words.",
   prompt:"Your English teacher has asked you to write an article about the best way to spend a weekend. Write your article describing what you like to do at weekends and why you enjoy these activities.",minWords:80}
]},
// ===== TEST 7: SPORTS =====
{t:"Practice Test 7",exercises:[
  {type:"mc",tl:"Reading",title:"Part 1 - Short Texts",ins:"Read each text and choose the correct answer.",
   items:[
    {q:"SPORTS CENTRE: The basketball court is available for booking from 6 PM on weekdays. Weekend slots fill up fast, so book early.",opts:["The basketball court cannot be booked","You can book the court on weekday evenings","The court is only open at weekends"],ans:1},
    {q:"FOOTBALL CLUB: Training for under-16s has moved from Wednesday to Thursday this week due to a national holiday.",opts:["Under-16 training is cancelled this week","Training will be on a different day this week","There is no training on national holidays"],ans:1},
    {q:"Dear Coach, I will not be at practice tomorrow because I have injured my ankle. I hope to be back next week. - James",opts:["James is leaving the team","James cannot practice because of an injury","James wants to change to a different sport"],ans:1},
    {q:"SWIMMING COMPETITION: Registration closes on Friday at 5 PM. Entry fee is 3 pounds per event.",opts:["The competition is free to enter","You must sign up before Friday evening","Registration is only available on Friday"],ans:1},
    {q:"NOTICE: The tennis courts will be resurfaced during August. They will reopen on 1st September.",opts:["The tennis courts are being improved over the summer","Tennis is available throughout August","New tennis courts are being built in September"],ans:0}
  ]},
  {type:"mc",tl:"Reading",title:"Part 3 - Reading Comprehension",ins:"Read the text and choose the best answer.",
   passage:"Cycling has experienced a remarkable rise in popularity over the past decade, particularly in cities around the world. Many urban areas have introduced bike-sharing schemes, where people can rent a bicycle for a short journey and return it at a different station. These schemes have made cycling a convenient option for people who do not own a bike. Cities like Amsterdam and Copenhagen have been famous for their cycling culture for many years, but now cities such as London, Paris, and New York are catching up. New cycle lanes have been built to make roads safer for cyclists, and many employers now provide shower facilities and bike storage for staff who cycle to work. The health benefits of cycling are well known. It is an excellent form of cardiovascular exercise that is gentler on the joints than running. Regular cyclists have a lower risk of heart disease, diabetes, and obesity. Cycling also has environmental benefits, as it produces no carbon emissions. Despite all these advantages, cycling in cities can still be dangerous. Accidents involving cyclists and motor vehicles are a serious concern, and many potential cyclists are put off by the risks. Campaigners continue to push for better infrastructure, including separated cycle lanes, lower speed limits, and improved driver education. With more investment and better planning, cycling could become the preferred way to travel for millions of city residents.",
   items:[
    {q:"What are bike-sharing schemes?",opts:["Programmes that give people free bicycles","Systems that let people rent bikes for short trips","Clubs for people who enjoy cycling together"],ans:1},
    {q:"What have some cities done to encourage cycling?",opts:["Banned all cars from the centre","Built new cycle lanes and provided facilities","Given everyone a free bicycle"],ans:1},
    {q:"Why is cycling better for joints than running?",opts:["It is a gentler form of exercise","It uses different muscles","It does not require movement"],ans:0},
    {q:"What discourages some people from cycling in cities?",opts:["The cost of buying a bicycle","The danger of accidents with cars","The lack of bike-sharing schemes"],ans:1},
    {q:"What do campaigners want?",opts:["More cars on the roads","Better cycling infrastructure","Higher speed limits"],ans:1}
  ]},
  {type:"mc",tl:"Reading",title:"Part 4 - Multiple-choice Cloze",ins:"Choose the correct word for each space.",
   passage:"The Olympic Games are the world's largest and most (1)___ sporting event. Every four years, thousands of athletes from around the globe (2)___ in a host city to compete against each other. The modern Olympics began in Athens in 1896, when just 241 athletes from 14 countries (3)___ part. Today, more than 10,000 athletes from over 200 countries participate. The Olympics include a wide (4)___ of sports, from athletics and swimming to newer additions such as skateboarding and surfing. Being (5)___ to compete at the Olympics is the dream of many young athletes, who train for years to reach the required standard. The event also brings people from different cultures together and promotes international understanding and (6)___.",
   items:[
    {q:"Gap 1",opts:["important","famous","favourite","popular"],ans:1},
    {q:"Gap 2",opts:["gather","join","arrive","collect"],ans:0},
    {q:"Gap 3",opts:["made","had","did","took"],ans:3},
    {q:"Gap 4",opts:["amount","number","range","group"],ans:2},
    {q:"Gap 5",opts:["chosen","picked","elected","voted"],ans:0},
    {q:"Gap 6",opts:["friendship","relationship","connection","company"],ans:0}
  ]},
  {type:"fl",tl:"Reading",title:"Part 5 - Open Cloze",ins:"Write one word for each space.",
   items:[
    {pre:"He has played football",gap:"since",post:"he was five years old."},
    {pre:"She is the fastest runner",gap:"in",post:"the whole school."},
    {pre:"I am not very good",gap:"at",post:"playing tennis."},
    {pre:"We were watching the match",gap:"when",post:"the power went off."},
    {pre:"You need to warm",gap:"up",post:"before doing any exercise."},
    {pre:"The team has won every game",gap:"so",post:"far this season."}
  ]},
  {type:"kt",tl:"Reading",title:"Part 6 - Sentence Transformations",ins:"Complete the second sentence so it means the same as the first. Use 1-3 words including the given word.",
   items:[
    {src:"No one in our team is as tall as Marco.",kw:"TALLEST",ans:"Marco is the tallest player",hint:"Superlative"},
    {src:"They cancelled the match because of the rain.",kw:"WAS",ans:"The match was cancelled because",hint:"Passive voice"},
    {src:"I started playing basketball when I was eight.",kw:"BEEN",ans:"I have been playing basketball since",hint:"Present perfect continuous + since"},
    {src:"'You should try a different sport,' the coach said to me.",kw:"SUGGESTED",ans:"The coach suggested I try",hint:"Reporting verb: suggest"},
    {src:"The stadium is too small for the final.",kw:"BIG",ans:"The stadium is not big enough",hint:"Too/enough transformation"},
    {src:"Perhaps the team will win the championship.",kw:"COULD",ans:"The team could win the",hint:"Modal: could for possibility"}
  ]},
  {type:"mc",tl:"Listening",title:"Part 2 - Longer Recording",ins:"Listen and choose the correct answer.",
   audio:"Interviewer: Today I am speaking to Mia, who has recently completed her first marathon. Mia, congratulations! Tell us how it all started. Mia: Thank you! Well, about eighteen months ago, I could barely run for five minutes without stopping. I was very unfit and I wanted to change that. My neighbour suggested we start running together. She had been running for years and offered to help me. Interviewer: How did you train? Mia: We started very slowly. At first, we would run for one minute and walk for two minutes, and repeat that for about twenty minutes. Gradually, I was able to run for longer periods. After about four months, I ran my first five-kilometre race. I was so proud of myself. That was when I decided to aim for a marathon. Interviewer: Was the training difficult? Mia: Incredibly difficult. For the marathon, I was training five or six days a week. The long runs at the weekend were the hardest. I had to run for three or four hours at a time. There were many days when I wanted to give up, but my neighbour kept encouraging me. Interviewer: Tell us about the marathon itself. Mia: It was the hardest thing I have ever done, but also the most amazing. The atmosphere was incredible. There were thousands of people cheering along the route. I finished in four hours and thirty-two minutes. I cried when I crossed the finish line. Interviewer: Will you do another one? Mia: Definitely. I have already signed up for one in the autumn.",
   items:[
    {q:"What was Mia like before she started running?",opts:["She was already quite fit","She could not run for very long","She had run several races"],ans:1},
    {q:"Who helped Mia start running?",opts:["A professional coach","Her neighbour","Her doctor"],ans:1},
    {q:"What did Mia do after four months of training?",opts:["She ran a five-kilometre race","She completed a marathon","She stopped running for a while"],ans:0},
    {q:"How often did Mia train for the marathon?",opts:["Three days a week","Every day","Five or six days a week"],ans:2},
    {q:"How did Mia feel when she finished the marathon?",opts:["Disappointed with her time","Emotional and proud","Too tired to feel anything"],ans:1},
    {q:"What is Mia's plan for the future?",opts:["She will stop running","She will become a coach","She will run another marathon"],ans:2}
  ]},
  {type:"wr",tl:"Writing",title:"Part 2 - Article or Story",ins:"Write about 100 words.",
   prompt:"Your English teacher has asked you to write an article about a sport or physical activity that you enjoy or would like to try. Write your article explaining what the activity is, why you like it or want to try it, and what benefits it has.",minWords:80}
]},
// ===== TEST 8: CULTURE =====
{t:"Practice Test 8",exercises:[
  {type:"mc",tl:"Reading",title:"Part 1 - Short Texts",ins:"Read each text and choose the correct answer.",
   items:[
    {q:"MUSEUM: Photography is permitted in all galleries except the special exhibition on the third floor.",opts:["You can take photos everywhere in the museum","Photos are not allowed in one area of the museum","Photography is completely banned"],ans:1},
    {q:"ART GALLERY: Free guided tours run at 11 AM and 2 PM. Tours last approximately 45 minutes. No booking required.",opts:["You must pay for a guided tour","Tours happen twice a day and are free","You need to book tours in advance"],ans:1},
    {q:"Dear Pablo, The food festival starts at noon on Saturday. Shall we meet at the entrance at 11:45? - Lucia",opts:["Lucia wants to arrive after the festival starts","Lucia suggests meeting before the festival opens","The festival starts in the evening"],ans:1},
    {q:"LIBRARY: Our world cultures reading group meets on the first Monday of every month at 7 PM. New members welcome!",opts:["The reading group meets every Monday","New people cannot join the group","The group meets once a month"],ans:2},
    {q:"FESTIVAL: Traditional dance performances take place every evening at 8 PM in the main square. Free admission.",opts:["Dance performances cost 8 pounds","You can watch free dance shows every evening","The main square is closed in the evening"],ans:1}
  ]},
  {type:"mc",tl:"Reading",title:"Part 3 - Reading Comprehension",ins:"Read the text and choose the best answer.",
   passage:"Street food has become a global phenomenon in recent years. While street food has always been popular in countries across Asia and Latin America, it is now booming in European and North American cities as well. Food markets and street food festivals are appearing everywhere, offering a wide variety of dishes from around the world. One reason for this trend is that people are becoming more adventurous with food. Social media has played a big role in this. People see photos of exciting dishes from other countries and want to try them. Street food markets bring these international flavours to local communities without the need to travel. Another factor is cost. Eating at a street food stall is usually much cheaper than going to a restaurant. You can get a delicious, freshly prepared meal for a fraction of the price. This makes it an attractive option for young people and families on a budget. Street food has also created opportunities for aspiring chefs. Starting a restaurant is expensive and risky, but setting up a street food stall requires much less investment. Many successful restaurants actually began as small street food businesses. However, there are some concerns about street food, including hygiene standards and the amount of waste produced by disposable plates and cups. Some markets are now addressing these issues by using biodegradable packaging and implementing strict food safety rules.",
   items:[
    {q:"Where has street food traditionally been popular?",opts:["Europe and North America","Asia and Latin America","Australia and Africa"],ans:1},
    {q:"How has social media affected street food?",opts:["It has made people less interested in food","It has made people want to try new foods","It has made street food more expensive"],ans:1},
    {q:"Why is street food attractive to people on a budget?",opts:["It is free","It is cheaper than restaurant food","It comes in larger portions"],ans:1},
    {q:"How does street food help aspiring chefs?",opts:["It gives them free training","They can start with less money than a restaurant","They earn more than restaurant chefs"],ans:1},
    {q:"What concern is mentioned about street food?",opts:["It is not popular enough","It only serves fast food","Hygiene and waste are issues"],ans:2}
  ]},
  {type:"mc",tl:"Reading",title:"Part 4 - Multiple-choice Cloze",ins:"Choose the correct word for each space.",
   passage:"Festivals play an important (1)___ in cultures around the world. They bring communities together and help people celebrate shared traditions and values. Some festivals have been (2)___ for hundreds of years, while others are relatively new. Many festivals are connected to religious or historical events, but there are also festivals that celebrate music, food, art, and literature. One of the most colourful festivals in the world is Holi, which is (3)___ in India and other South Asian countries. During Holi, people throw brightly coloured powders and water at each other to celebrate the (4)___ of spring. Another well-known celebration is the Carnival in Rio de Janeiro, which (5)___ millions of visitors every year. Whatever their origin, festivals provide a chance for people to take a (6)___ from their daily routines and enjoy themselves.",
   items:[
    {q:"Gap 1",opts:["role","job","part","work"],ans:0},
    {q:"Gap 2",opts:["existed","celebrated","performed","practised"],ans:1},
    {q:"Gap 3",opts:["made","done","held","given"],ans:2},
    {q:"Gap 4",opts:["beginning","arrival","opening","start"],ans:1},
    {q:"Gap 5",opts:["pulls","draws","attracts","catches"],ans:2},
    {q:"Gap 6",opts:["rest","pause","break","stop"],ans:2}
  ]},
  {type:"fl",tl:"Reading",title:"Part 5 - Open Cloze",ins:"Write one word for each space.",
   items:[
    {pre:"I am very fond",gap:"of",post:"traditional music from my country."},
    {pre:"The festival has been running",gap:"for",post:"over twenty years."},
    {pre:"This painting was done",gap:"by",post:"a famous artist in the 1800s."},
    {pre:"There were",gap:"so",post:"many people at the festival that we could not move."},
    {pre:"Have you ever",gap:"been",post:"to a cultural festival abroad?"},
    {pre:"She takes",gap:"after",post:"her mother, who is also a talented dancer."}
  ]},
  {type:"kt",tl:"Reading",title:"Part 6 - Sentence Transformations",ins:"Complete the second sentence so it means the same as the first. Use 1-3 words including the given word.",
   items:[
    {src:"People celebrate this festival every year.",kw:"IS",ans:"This festival is celebrated every",hint:"Passive voice"},
    {src:"I have never tried Japanese food before.",kw:"FIRST",ans:"This is the first time I have tried",hint:"First time + present perfect"},
    {src:"The old market is not as big as the new one.",kw:"BIGGER",ans:"The new market is bigger than",hint:"Comparative"},
    {src:"We could not go to the festival because it was raining.",kw:"WOULD",ans:"We would have gone to the festival",hint:"Third conditional idea"},
    {src:"'When does the festival start?' she asked.",kw:"STARTED",ans:"She asked when the festival started",hint:"Reported question"},
    {src:"It is possible that they will cancel the event.",kw:"MIGHT",ans:"They might cancel the",hint:"Modal: might for possibility"}
  ]},
  {type:"mc",tl:"Listening",title:"Part 2 - Longer Recording",ins:"Listen and choose the correct answer.",
   audio:"Interviewer: Today I am talking to Yuki, who has been living in London for two years. Yuki, you are originally from Japan. Tell us about your experience of British culture. Yuki: When I first arrived, I found some things quite different from what I was used to. In Japan, people are generally very quiet on public transport. But on the London Underground, people chat on their phones, listen to music without headphones, and sometimes even eat hot food. That was a big surprise for me. Interviewer: Have you found it easy to make friends? Yuki: At first it was difficult. British people are very polite but sometimes hard to get to know. Back home, I had friends I had known since primary school. Here, I had to start from scratch. But I joined a language exchange group where I teach Japanese and practise my English with British people. That really helped. I have made some wonderful friends through the group. Interviewer: What do you enjoy most about living in London? Yuki: The diversity. In my area alone there are restaurants from at least twenty different countries. I love trying food from places I have never visited. I also love the museums. In Tokyo, most museums charge admission, but in London many of the best museums are completely free. I visit the British Museum almost every month and I always discover something new. Interviewer: Is there anything you miss about Japan? Yuki: I miss the food the most. British food has improved a lot, but nothing compares to a proper bowl of ramen from a little shop in Tokyo. I also miss the hot springs. There is nothing like that here.",
   items:[
    {q:"What surprised Yuki about the London Underground?",opts:["How quiet it was","How noisy people were","How expensive tickets were"],ans:1},
    {q:"How did Yuki find making friends at first?",opts:["Very easy","Quite difficult","Impossible"],ans:1},
    {q:"How did Yuki make friends in London?",opts:["Through work colleagues","By joining a language exchange group","At a Japanese restaurant"],ans:1},
    {q:"What does Yuki enjoy most about London?",opts:["The weather","The public transport","The cultural diversity"],ans:2},
    {q:"What does Yuki like about London museums?",opts:["They are close to her home","Many of them are free","They have Japanese exhibitions"],ans:1},
    {q:"What does Yuki miss most about Japan?",opts:["The food","The museums","The public transport"],ans:0}
  ]},
  {type:"wr",tl:"Writing",title:"Part 2 - Article or Story",ins:"Write about 100 words.",
   prompt:"Your English teacher has asked you to write an article about a traditional festival or celebration in your country. Write your article explaining what the festival is, when it happens, and why it is important to people.",minWords:80}
]},
// ===== TEST 9: WORK & CAREERS =====
{t:"Practice Test 9",exercises:[
  {type:"mc",tl:"Reading",title:"Part 1 - Short Texts",ins:"Read each text and choose the correct answer.",
   items:[
    {q:"JOB ADVERT: Part-time sales assistant needed. Must be available at weekends. Experience preferred but not essential. Apply online.",opts:["You must have sales experience to apply","Weekend availability is required for this job","The job is full-time only"],ans:1},
    {q:"OFFICE NOTICE: Staff meeting at 3 PM today in Conference Room B. All team members are expected to attend.",opts:["The meeting is optional","Everyone should go to the meeting","The meeting has been cancelled"],ans:1},
    {q:"Dear Ms Taylor, Thank you for attending the interview last week. We are pleased to offer you the position. Please confirm by Friday. - HR Department",opts:["Ms Taylor did not get the job","Ms Taylor has been offered the job","The interview is next week"],ans:1},
    {q:"COMPANY POLICY: Employees working from home must be available by email between 9 AM and 5 PM on working days.",opts:["Working from home is not allowed","Home workers must check emails during office hours","Employees can only work from home at weekends"],ans:1},
    {q:"Hi David, I have decided to accept the job in Manchester. It means moving away, but the salary is much better. - Sarah",opts:["Sarah has rejected the job offer","Sarah will move for a job with better pay","David is also moving to Manchester"],ans:1}
  ]},
  {type:"mc",tl:"Reading",title:"Part 3 - Reading Comprehension",ins:"Read the text and choose the best answer.",
   passage:"The way people work has changed dramatically in recent years, and one of the biggest shifts has been the move towards remote working. Before 2020, working from home was relatively uncommon. Most people travelled to an office every day. Then the global pandemic forced millions of workers to stay at home, and companies quickly discovered that many jobs could be done just as effectively from a spare bedroom or kitchen table. Now that restrictions have ended, many companies have adopted a hybrid model, where employees split their time between the office and home. Surveys show that most workers prefer this arrangement. They enjoy the flexibility of working from home but also value the social interaction that comes with going to the office. The commute is another factor. Many workers spent hours travelling to and from work every day, and working from home has given them that time back. However, remote working is not perfect. Some employees feel isolated and find it harder to separate their work life from their personal life. Younger workers, in particular, say they miss the opportunity to learn from more experienced colleagues. There are also concerns about career progression. Some managers admit that they are more likely to promote employees they see in the office every day. Despite these challenges, it is clear that remote working is here to stay. The traditional nine-to-five office job may never look quite the same again.",
   items:[
    {q:"What was working from home like before 2020?",opts:["It was very common","It was not very common","It was impossible"],ans:1},
    {q:"What is a hybrid working model?",opts:["Working only from home","Working only in the office","Splitting time between home and office"],ans:2},
    {q:"What do most workers think about hybrid working?",opts:["They prefer it","They dislike it","They have no opinion"],ans:0},
    {q:"What problem do some younger workers face?",opts:["They earn less money","They miss learning from experienced colleagues","They have to travel too far"],ans:1},
    {q:"What concern exists about career progression?",opts:["Remote workers may be promoted less often","Remote workers get promoted too quickly","There are no promotions for office workers"],ans:0}
  ]},
  {type:"mc",tl:"Reading",title:"Part 4 - Multiple-choice Cloze",ins:"Choose the correct word for each space.",
   passage:"Finding your first job can be a challenging experience. Many young people feel nervous about writing a CV and going to interviews. However, with the right (1)___, the process can be much easier. First, make sure your CV is clear, well-organised, and free of mistakes. (2)___ any work experience you have, including part-time jobs, volunteer work, and internships. Even if the experience is not directly (3)___ to the job you are applying for, it shows that you are reliable and hard-working. When preparing for an interview, research the company (4)___. Find out what they do, what their values are, and why you want to work there. During the interview, try to be confident but (5)___. Answer questions honestly and give specific examples from your own experience. Finally, do not be (6)___ if you do not get the first job you apply for. Most people have to apply for several positions before they are successful.",
   items:[
    {q:"Gap 1",opts:["organisation","preparation","arrangement","introduction"],ans:1},
    {q:"Gap 2",opts:["Add","Put","Include","Join"],ans:2},
    {q:"Gap 3",opts:["related","attached","connected","joined"],ans:0},
    {q:"Gap 4",opts:["deeply","closely","thoroughly","strongly"],ans:2},
    {q:"Gap 5",opts:["natural","real","true","actual"],ans:0},
    {q:"Gap 6",opts:["let down","put off","turned away","discouraged"],ans:3}
  ]},
  {type:"fl",tl:"Reading",title:"Part 5 - Open Cloze",ins:"Write one word for each space.",
   items:[
    {pre:"She is responsible",gap:"for",post:"managing the sales team."},
    {pre:"He has worked at this company",gap:"since",post:"he graduated from university."},
    {pre:"I would like to apply",gap:"for",post:"the position of marketing assistant."},
    {pre:"They are looking",gap:"for",post:"someone with experience in customer service."},
    {pre:"The meeting will take",gap:"place",post:"in the main conference room."},
    {pre:"She got on well",gap:"with",post:"all her colleagues from the start."}
  ]},
  {type:"kt",tl:"Reading",title:"Part 6 - Sentence Transformations",ins:"Complete the second sentence so it means the same as the first. Use 1-3 words including the given word.",
   items:[
    {src:"They offered her the job last week.",kw:"WAS",ans:"She was offered the job",hint:"Passive voice"},
    {src:"He started working here five years ago.",kw:"BEEN",ans:"He has been working here for",hint:"Present perfect continuous + for"},
    {src:"No other employee works harder than Maria.",kw:"HARDEST",ans:"Maria is the hardest working",hint:"Superlative"},
    {src:"'You should apply for the management position,' my friend said.",kw:"ADVISED",ans:"My friend advised me to apply",hint:"Reporting verb: advise"},
    {src:"The office is too far from my house.",kw:"CLOSE",ans:"The office is not close enough",hint:"Too/enough transformation"},
    {src:"If I spoke better English, I would get the job.",kw:"WOULD",ans:"I would get the job if",hint:"Second conditional"}
  ]},
  {type:"mc",tl:"Listening",title:"Part 2 - Longer Recording",ins:"Listen and choose the correct answer.",
   audio:"Interviewer: I am here with Kate, who has an unusual job. Kate, what do you do? Kate: I am a professional dog walker. I walk dogs for people who are at work during the day. Interviewer: How did you end up doing this? Kate: Well, I used to work in an office as an accountant. The pay was good but I was miserable. I sat at a desk all day staring at a computer screen. I have always loved animals, and I had a dog of my own. One day, a friend asked if I could walk her dog while she was on holiday. I enjoyed it so much that I started thinking about doing it as a job. I did some research and found out that there was a real demand for professional dog walkers in my area. Interviewer: Was it scary to leave your office job? Kate: Terrifying. My family thought I was crazy. My parents kept asking me if I was sure about it. But I had savings to live on for a few months while I built up my business. I started by putting leaflets through doors in my neighbourhood. Within a month, I had ten regular clients. Interviewer: What is a typical day like? Kate: I usually walk between fifteen and twenty dogs a day, in groups of four or five. I do three or four walks, each lasting about an hour. It is physically demanding but I love being outdoors. Interviewer: Do you earn as much as you did as an accountant? Kate: Not quite, but the difference is not huge. And I am so much happier. That is worth more than money to me.",
   items:[
    {q:"What was Kate's previous job?",opts:["A veterinary nurse","An accountant","A teacher"],ans:1},
    {q:"Why was Kate unhappy in her old job?",opts:["The pay was too low","She did not like her colleagues","She spent all day at a desk"],ans:2},
    {q:"What made Kate think about becoming a dog walker?",opts:["She saw a job advert","She walked a friend's dog","She visited a dog training centre"],ans:1},
    {q:"How did Kate's family react to her decision?",opts:["They were very supportive","They thought she was making a mistake","They had no opinion"],ans:1},
    {q:"How did Kate find her first clients?",opts:["Through social media","By advertising in a newspaper","By putting leaflets through doors"],ans:2},
    {q:"How does Kate feel about earning less money?",opts:["She is upset about it","She does not mind because she is happier","She plans to go back to her old job"],ans:1}
  ]},
  {type:"wr",tl:"Writing",title:"Part 2 - Article or Story",ins:"Write about 100 words.",
   prompt:"Your English teacher has asked you to write an article about what kind of job you would like to have in the future. Write your article explaining what the job is, why it interests you, and what skills or qualifications you think you will need.",minWords:80}
]},
// ===== TEST 10: FOOD & COOKING =====
{t:"Practice Test 10",exercises:[
  {type:"mc",tl:"Reading",title:"Part 1 - Short Texts",ins:"Read each text and choose the correct answer.",
   items:[
    {q:"RESTAURANT: Lunch special available Monday to Friday, 12-2 PM. Main course plus a drink for 8.50 pounds.",opts:["The lunch special is available every day","You can get a meal and drink at a reduced price on weekdays","The restaurant is only open for lunch"],ans:1},
    {q:"SUPERMARKET: Reduced items can be found in the yellow-sticker section near the bakery. Items must be consumed by the date shown.",opts:["All items near the bakery are fresh","Discounted food is available near the bakery area","Yellow sticker items are the most expensive"],ans:1},
    {q:"Dear guests, Please let us know about any food allergies or dietary requirements at least 24 hours before the dinner. - Event Team",opts:["The dinner will only serve vegetarian food","You should inform them about allergies in advance","Guests with allergies cannot attend the dinner"],ans:1},
    {q:"COOKING CLASS: Beginners welcome. Learn to make fresh pasta and three classic sauces. All ingredients provided. 35 pounds per person.",opts:["You need to bring your own ingredients","The class is only for experienced cooks","Everything you need for the class is included in the price"],ans:2},
    {q:"CAFE: We are proud to serve only locally sourced, organic coffee. Ask about our loyalty card for a free drink after ten purchases.",opts:["The cafe serves imported coffee","You can earn a free drink by buying ten coffees","Loyalty cards cost extra"],ans:1}
  ]},
  {type:"mc",tl:"Reading",title:"Part 3 - Reading Comprehension",ins:"Read the text and choose the best answer.",
   passage:"Cooking shows have become some of the most popular programmes on television. From competitive baking shows to celebrity chef specials, millions of viewers tune in every week to watch people prepare food. But do cooking shows actually encourage people to cook more at home? The answer is complicated. Research from a British university found that people who regularly watch cooking shows are more interested in food and more willing to try new recipes. They are also more likely to cook from scratch rather than buying ready meals. However, the same study found that watching cooking shows does not necessarily lead to healthier eating. Many of the recipes shown on television use large amounts of butter, cream, and sugar. The portions are often much bigger than what nutritionists would recommend. There is also the entertainment factor. Many viewers watch cooking shows in the same way they watch drama or comedy. They enjoy the competition and the personalities of the presenters, but they never actually try the recipes themselves. Some critics argue that cooking shows have turned food into entertainment rather than something practical. Despite this criticism, many chefs and food writers believe that cooking shows have had a positive overall effect. They have made cooking seem exciting and accessible. Twenty years ago, many young people could not cook at all. Today, thanks partly to television, cooking is seen as a valuable and enjoyable skill.",
   items:[
    {q:"What did the British university study find about cooking show viewers?",opts:["They never cook at home","They are more willing to try new recipes","They only eat ready meals"],ans:1},
    {q:"What problem did the study find with cooking show recipes?",opts:["They are too complicated","They are too healthy","They often contain a lot of fat and sugar"],ans:2},
    {q:"How do some viewers treat cooking shows?",opts:["As entertainment rather than practical cooking guides","As educational lessons they follow carefully","As boring programmes they rarely watch"],ans:0},
    {q:"What criticism do some people have of cooking shows?",opts:["They are too expensive to make","They have turned food into just entertainment","They do not feature enough chefs"],ans:1},
    {q:"What positive effect have cooking shows had?",opts:["They have made restaurants cheaper","They have made cooking seem exciting and accessible","They have reduced the number of takeaway restaurants"],ans:1}
  ]},
  {type:"mc",tl:"Reading",title:"Part 4 - Multiple-choice Cloze",ins:"Choose the correct word for each space.",
   passage:"Vegetarianism is becoming increasingly common around the world. More and more people are (1)___ to stop eating meat, or at least to eat less of it. There are several reasons for this (2)___. Many people are concerned about the impact of meat production on the environment. Raising animals for food uses huge amounts of water and land, and produces significant greenhouse gas emissions. Others choose a vegetarian diet for (3)___ reasons, as they believe it is wrong to kill animals for food. Health is another important (4)___. Studies have shown that people who eat less meat tend to have lower rates of heart disease and certain types of cancer. However, it is important for vegetarians to make sure they get (5)___ protein, iron, and other nutrients. This can be done by eating a varied diet that includes beans, lentils, nuts, and dairy products. Whether or not you decide to (6)___ up meat completely, reducing your consumption can have benefits for both your health and the planet.",
   items:[
    {q:"Gap 1",opts:["selecting","choosing","picking","preferring"],ans:1},
    {q:"Gap 2",opts:["fashion","direction","movement","trend"],ans:3},
    {q:"Gap 3",opts:["moral","polite","fair","honest"],ans:0},
    {q:"Gap 4",opts:["issue","factor","point","matter"],ans:1},
    {q:"Gap 5",opts:["enough","plenty","much","lots"],ans:0},
    {q:"Gap 6",opts:["put","give","take","leave"],ans:1}
  ]},
  {type:"fl",tl:"Reading",title:"Part 5 - Open Cloze",ins:"Write one word for each space.",
   items:[
    {pre:"I am not used",gap:"to",post:"eating such spicy food."},
    {pre:"She learned to cook",gap:"from",post:"her grandmother when she was young."},
    {pre:"Would you like",gap:"some",post:"more cake? There is plenty left."},
    {pre:"The recipe calls",gap:"for",post:"two hundred grams of flour."},
    {pre:"We ran",gap:"out",post:"of milk so I went to the shop."},
    {pre:"This dish is made",gap:"with",post:"fresh vegetables from the garden."}
  ]},
  {type:"kt",tl:"Reading",title:"Part 6 - Sentence Transformations",ins:"Complete the second sentence so it means the same as the first. Use 1-3 words including the given word.",
   items:[
    {src:"My mother makes the best cake in the family.",kw:"MADE",ans:"The best cake in the family is made by",hint:"Passive voice"},
    {src:"I have not eaten sushi before.",kw:"FIRST",ans:"This is the first time I have eaten",hint:"First time + present perfect"},
    {src:"This restaurant is more expensive than the one on Park Street.",kw:"CHEAP",ans:"The restaurant on Park Street is cheaper than",hint:"Comparative"},
    {src:"'Do not touch the hot pan,' she said to me.",kw:"WARNED",ans:"She warned me not to touch",hint:"Reporting verb: warn"},
    {src:"The soup was too salty for me to eat.",kw:"ENOUGH",ans:"The soup was not mild enough",hint:"Too/enough transformation"},
    {src:"Perhaps they will open a new restaurant here.",kw:"MAY",ans:"They may open a new",hint:"Modal: may for possibility"}
  ]},
  {type:"mc",tl:"Listening",title:"Part 2 - Longer Recording",ins:"Listen and choose the correct answer.",
   audio:"Interviewer: Welcome to the show. I am talking to chef Daniel, who has just opened a new restaurant. Daniel, tell us about it. Daniel: Thank you. The restaurant is called Green Table, and we specialise in plant-based food. Everything on the menu is one hundred percent vegan. Interviewer: Why did you decide to open a vegan restaurant? Daniel: I was working as a chef in a traditional restaurant for about ten years. I enjoyed it, but I became more and more interested in cooking without meat or dairy. I started experimenting at home, and I realised that vegan food could be just as delicious and satisfying as anything else. My wife, who has been vegan for years, encouraged me to take the next step. Interviewer: Was it risky? Daniel: Very risky. Many people told me it would not work. They said most people would not pay restaurant prices for vegan food. But I believed there was a market for it. We opened three months ago and we have been fully booked every weekend since. We have even had to hire extra staff. Interviewer: What is your most popular dish? Daniel: Our mushroom and truffle pasta is the favourite. People cannot believe it does not contain any cream. We use cashew nuts to create a rich, creamy sauce. Even customers who are not vegan say it is one of the best pasta dishes they have ever had. Interviewer: What are your plans for the future? Daniel: I would love to open a second restaurant eventually, maybe in a different city. But for now, I am focusing on making Green Table the best it can be.",
   items:[
    {q:"What type of food does Green Table serve?",opts:["Traditional meat dishes","Only salads and soups","Completely plant-based food"],ans:2},
    {q:"How long did Daniel work as a chef before opening his restaurant?",opts:["About five years","About ten years","About fifteen years"],ans:1},
    {q:"Who encouraged Daniel to open the restaurant?",opts:["His colleagues","His wife","A business partner"],ans:1},
    {q:"What did people say about Daniel's idea?",opts:["They thought it would fail","They were very supportive","They wanted to invest money"],ans:0},
    {q:"What is the most popular dish at Green Table?",opts:["A vegetable curry","Mushroom and truffle pasta","A vegan burger"],ans:1},
    {q:"What are Daniel's future plans?",opts:["To close the restaurant","To add meat to the menu","To possibly open another restaurant"],ans:2}
  ]},
  {type:"wr",tl:"Writing",title:"Part 2 - Article or Story",ins:"Write about 100 words.",
   prompt:"Your English teacher has asked you to write an article about food and cooking in your country. Write your article describing a traditional dish from your country, explaining how it is made, and saying why it is special to you.",minWords:80}
]}
]};


// Exponer en window para que cambridge-runner.html encuentre el dataset.
if (typeof window !== 'undefined') { window.CAM_PET = CAM_PET; }
