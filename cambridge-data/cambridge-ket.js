// Cambridge A2 Key (KET) - 10 Practice Tests
const CAM_KET = {
id:"ket", name:"A2 Key (KET)", level:"a2",
examInfo:{
  title:"A2 Key (KET)", level:"A2",
  overview:"The A2 Key exam proves you can use everyday English at a basic level. It covers reading, writing, listening and speaking. It is the first step in your English learning journey.",
  papers:[
    {name:"Reading & Writing",duration:"60 minutes",parts:7,questions:32},
    {name:"Listening",duration:"30 minutes",parts:5,questions:25},
    {name:"Speaking",duration:"8-10 minutes",parts:2,questions:null}
  ],
  paperDetails:[
    {paper:"Reading & Writing",parts:[
      {part:1,name:"Multiple-choice (signs/notices)",questions:6,description:"Read short texts like signs, notices and messages. Choose the correct meaning from three options."},
      {part:2,name:"Matching",questions:3,description:"Match three descriptions of people to eight short texts."},
      {part:3,name:"Multiple-choice (longer text)",questions:5,description:"Read a longer text and answer five multiple-choice questions."},
      {part:4,name:"Multiple-choice cloze",questions:6,description:"Read a short text with six gaps. Choose the correct word (A, B or C) for each gap."},
      {part:5,name:"Open cloze",questions:6,description:"Read a short text with six gaps. Write the missing word in each gap."},
      {part:6,name:"Word completion",questions:5,description:"Read definitions and write the correct word, using a picture as a clue."},
      {part:7,name:"Short message writing",questions:1,description:"Write a short message of 25 words or more (email, note, or postcard)."}
    ]},
    {paper:"Listening",parts:[
      {part:1,name:"Multiple choice (pictures)",questions:5,description:"Listen to five short recordings and choose the correct picture."},
      {part:2,name:"Gap fill",questions:5,description:"Listen and write the missing information in a form or notes."},
      {part:3,name:"Multiple choice (longer)",questions:5,description:"Listen to a longer conversation and answer five questions."},
      {part:4,name:"Multiple choice (short)",questions:5,description:"Listen to five short conversations and choose the correct answer."},
      {part:5,name:"Matching",questions:5,description:"Listen and match five items to eight options."}
    ]}
  ],
  tips:[
    "Read the question carefully before looking at the answer options.",
    "In listening, you will hear each recording twice - use the second time to check.",
    "For open cloze, think about grammar words: articles, prepositions, pronouns.",
    "In writing Part 7, always count your words - you need at least 25.",
    "Practice reading signs, notices, and short messages in English every day."
  ],
  scales:{pass:120,merit:133,distinction:140,maxScore:150}
},
lessons:[
// ===== TEST 1 =====
{t:"Practice Test 1",exercises:[
  {type:"mc",tl:"Reading",title:"Part 1 - Signs & Notices",ins:"Read each text. What does it say? Choose the correct answer.",
   items:[
    {q:"NOTICE: Car park closes at 8 PM. Please remove your vehicle before this time.",opts:["You can park here all night","You must move your car before 8 PM","The car park opens at 8 PM"],ans:1},
    {q:"TO ALL STAFF: The meeting on Friday has been moved from Room 3 to Room 7.",opts:["Friday's meeting is cancelled","The meeting will be in a different room","Room 7 is closed on Friday"],ans:1},
    {q:"SALE: Buy two T-shirts and get the third one free!",opts:["All T-shirts are free","You pay for two T-shirts and receive three","T-shirts cost three times as much"],ans:1},
    {q:"Dear Tom, I'll be 15 minutes late for dinner. Start without me! - Kate",opts:["Kate cannot come to dinner","Kate wants Tom to wait for her","Kate will arrive after dinner starts"],ans:2},
    {q:"SWIMMING POOL: Children under 10 must be with an adult at all times.",opts:["Adults cannot swim here","Children under 10 need an adult with them","The pool is only for children"],ans:1},
    {q:"LIBRARY: Books can be borrowed for up to three weeks. Late returns: 50p per day.",opts:["You pay 50p to borrow each book","Books are free if returned within three weeks","The library is open for three weeks"],ans:1}
  ]},
  {type:"mc",tl:"Reading",title:"Part 3 - Reading Comprehension",ins:"Read the text and choose the best answer for each question.",
   passage:"Last summer, my family and I went on holiday to a small town by the sea in the south of Spain. We stayed in a hotel near the beach for two weeks. Every morning, we walked to the beach and spent the day swimming and playing games. The water was very warm and clean. My favourite day was when we took a boat trip to a small island. We saw dolphins in the sea! I took many photos with my new camera. We also visited the old part of the town and tried local food at a small restaurant. The fish was delicious. In the evenings, we usually went for a walk along the beach and watched the sunset. Sometimes we ate ice cream from a shop near our hotel. I want to go back next year because it was the best holiday I have ever had.",
   items:[
    {q:"Where did the family go on holiday?",opts:["To a big city","To a seaside town in Spain","To an island"],ans:1},
    {q:"How long was the holiday?",opts:["One week","Two weeks","Three weeks"],ans:1},
    {q:"What did the writer see on the boat trip?",opts:["Whales","Fish","Dolphins"],ans:2},
    {q:"What did the family often do in the evenings?",opts:["Went swimming","Walked on the beach","Visited restaurants"],ans:1},
    {q:"How does the writer feel about the holiday?",opts:["It was boring","It was the best ever","It was too long"],ans:1}
  ]},
  {type:"mc",tl:"Reading",title:"Part 4 - Multiple-choice Cloze",ins:"Choose the correct word (A, B or C) for each gap.",
   passage:"I (1)___ to school by bus every day. The bus stop is near my (2)___. It takes about 20 minutes to (3)___ to school. I usually sit (4)___ my best friend, Sarah. We talk about our homework or (5)___ music on our phones. I (6)___ like the bus because it is always on time.",
   items:[
    {q:"Gap 1",opts:["go","going","goes"],ans:0},
    {q:"Gap 2",opts:["work","house","garden"],ans:1},
    {q:"Gap 3",opts:["arrive","get","come"],ans:1},
    {q:"Gap 4",opts:["between","next to","in front"],ans:1},
    {q:"Gap 5",opts:["hear","listen","listen to"],ans:2},
    {q:"Gap 6",opts:["very","much","really"],ans:2}
  ]},
  {type:"fl",tl:"Reading",title:"Part 5 - Open Cloze",ins:"Write one word for each gap.",
   items:[
    {pre:"Maria lives",gap:"in",post:"a small village near the mountains."},
    {pre:"She goes",gap:"to",post:"school by bicycle every morning."},
    {pre:"Her school is not far",gap:"from",post:"her home."},
    {pre:"She has",gap:"been",post:"at the same school for three years."},
    {pre:"Maria is good",gap:"at",post:"maths and science."},
    {pre:"She wants to",gap:"be",post:"a doctor when she grows up."}
  ]},
  {type:"mc",tl:"Listening",title:"Part 1 - Short Conversations",ins:"Listen and choose the correct answer.",
   items:[
    {audio:"Woman: What time does the train to London leave? Man: Let me check. There is one at quarter past nine and another at ten thirty. Woman: I will take the earlier one, please.",q:"What time train does the woman want?",opts:["9:15","9:30","10:30"],ans:0},
    {audio:"Man: How much are the apples? Woman: They are one pound fifty for a bag. Man: OK, I will take two bags, please. Woman: That is three pounds.",q:"How much does the man pay?",opts:["One pound fifty","Two pounds","Three pounds"],ans:2},
    {audio:"Girl: What did you do last weekend? Boy: I wanted to play football, but it rained all day Saturday, so I stayed home and watched a film. On Sunday I went shopping with my mum.",q:"What did the boy do on Saturday?",opts:["Played football","Watched a film","Went shopping"],ans:1},
    {audio:"Woman: Excuse me, is there a supermarket near here? Man: Yes, go straight ahead, then turn left at the traffic lights. It is on the right, next to the bank.",q:"Where is the supermarket?",opts:["Next to the bank","Opposite the traffic lights","Behind the bank"],ans:0},
    {audio:"Teacher: Do not forget, the English test is on Thursday this week, not Friday. Student: Oh! I thought it was Friday. Teacher: No, we changed it because Friday is a holiday.",q:"When is the English test?",opts:["Wednesday","Thursday","Friday"],ans:1}
  ]},
  {type:"wr",tl:"Writing",title:"Part 7 - Short Message",ins:"Write a short message of 25 words or more.",
   prompt:"Your English friend, Alex, wants to visit your city next month. Write a message to Alex. In your message:\n- say when is the best time to visit\n- suggest a place to stay\n- recommend something to do",
   minWords:25}
]},
// ===== TEST 2 =====
{t:"Practice Test 2",exercises:[
  {type:"mc",tl:"Reading",title:"Part 1 - Signs & Notices",ins:"Read each text. What does it say? Choose the correct answer.",
   items:[
    {q:"RESTAURANT: Last orders at 9:30 PM. Kitchen closes at 10 PM.",opts:["The restaurant opens at 9:30 PM","You must order food before 9:30 PM","Dinner is served until midnight"],ans:1},
    {q:"Hi Jenny, Can you bring your laptop to class tomorrow? Mine is broken. Thanks, Mark",opts:["Mark wants to borrow Jenny's laptop","Mark has fixed his laptop","Jenny needs a new laptop"],ans:0},
    {q:"MUSEUM: Free entry on the first Sunday of every month.",opts:["The museum is always free","You can visit free once a month on a specific day","The museum is closed on Sundays"],ans:1},
    {q:"BUS 42: Due to road works, this bus will not stop at Green Street until December.",opts:["Bus 42 goes to Green Street in December","Bus 42 is not running until December","Bus 42 will miss the Green Street stop temporarily"],ans:2},
    {q:"SPECIAL OFFER: Buy any large pizza and get a free drink!",opts:["Drinks are more expensive than pizza","A drink is included with a large pizza","All pizzas are on special offer"],ans:1},
    {q:"NOTE: Please turn off all lights when you leave the office.",opts:["The lights are broken","You should switch off lights when you go","Lights must stay on in the office"],ans:1}
  ]},
  {type:"mc",tl:"Reading",title:"Part 3 - Reading Comprehension",ins:"Read the text and choose the best answer for each question.",
   passage:"Jake started his new job at a bookshop three months ago. He works there every Saturday from 9 AM to 5 PM. He enjoys it because he loves books and he likes talking to customers. His favourite part of the job is recommending books to people. The bookshop is in the centre of town, next to a coffee shop. Sometimes during his lunch break, Jake goes to the coffee shop and reads. His manager, Mrs. Chen, is very kind and always helps him when he has questions. Jake earns eight pounds an hour. He is saving the money to buy a new bicycle. He needs about two hundred more pounds. He thinks he will have enough money by the end of next month.",
   items:[
    {q:"How long has Jake worked at the bookshop?",opts:["One month","Three months","Six months"],ans:1},
    {q:"When does Jake work?",opts:["Every day","Weekdays only","Saturdays"],ans:2},
    {q:"What does Jake do during his lunch break?",opts:["Goes home","Reads at the coffee shop","Plays games"],ans:1},
    {q:"What is Jake saving money for?",opts:["A new phone","A holiday","A bicycle"],ans:2},
    {q:"How much more money does Jake need?",opts:["One hundred pounds","Two hundred pounds","Three hundred pounds"],ans:1}
  ]},
  {type:"mc",tl:"Reading",title:"Part 4 - Multiple-choice Cloze",ins:"Choose the correct word (A, B or C) for each gap.",
   passage:"My sister loves (1)___. She plays the piano and the guitar. She (2)___ playing when she was only five years old. Now she is fifteen and she plays (3)___ a band with her friends. They practice (4)___ Saturday afternoon in our garage. Sometimes the music is very (5)___ and our neighbours complain! But my sister says she wants to (6)___ a famous musician one day.",
   items:[
    {q:"Gap 1",opts:["music","sport","cooking"],ans:0},
    {q:"Gap 2",opts:["started","starts","is starting"],ans:0},
    {q:"Gap 3",opts:["on","at","in"],ans:2},
    {q:"Gap 4",opts:["all","each","every"],ans:2},
    {q:"Gap 5",opts:["loud","strong","high"],ans:0},
    {q:"Gap 6",opts:["get","become","turn"],ans:1}
  ]},
  {type:"fl",tl:"Reading",title:"Part 5 - Open Cloze",ins:"Write one word for each gap.",
   items:[
    {pre:"There is a new sports centre",gap:"in",post:"our town."},
    {pre:"It was opened",gap:"by",post:"the mayor last month."},
    {pre:"You can play tennis",gap:"or",post:"go swimming there."},
    {pre:"It is open every day",gap:"from",post:"seven in the morning."},
    {pre:"My brother goes there",gap:"with",post:"his friends after school."},
    {pre:"I have not",gap:"been",post:"there yet, but I want to try it."}
  ]},
  {type:"mc",tl:"Listening",title:"Part 1 - Short Conversations",ins:"Listen and choose the correct answer.",
   items:[
    {audio:"Man: I would like a ticket for the film at 7 o clock, please. Woman: I am sorry, that showing is full. We have seats at 8:15. Man: OK, that is fine.",q:"What time will the man see the film?",opts:["7:00","7:15","8:15"],ans:2},
    {audio:"Girl: What is your new teacher like? Boy: She is great! She is very friendly and explains things clearly. She is much better than our old teacher.",q:"What does the boy think of his new teacher?",opts:["She is strict","She is good","She is boring"],ans:1},
    {audio:"Woman: Would you like tea or coffee? Man: Actually, could I just have a glass of water? I am really thirsty. Woman: Of course! With or without ice? Man: Without, please.",q:"What does the man want to drink?",opts:["Tea","Coffee","Water"],ans:2},
    {audio:"Man: I went to the gym yesterday for the first time. Woman: How was it? Man: It was hard! I am so tired today. My legs hurt. But I want to go again next week.",q:"How does the man feel today?",opts:["Excited","Tired","Angry"],ans:1},
    {audio:"Boy: Mum, can I have a dog for my birthday? Woman: We already have two cats. I do not think we need another pet. Boy: Please! I will take care of it every day. Woman: Let me talk to your father about it.",q:"What does the boy want?",opts:["A cat","A birthday party","A dog"],ans:2}
  ]},
  {type:"wr",tl:"Writing",title:"Part 7 - Short Message",ins:"Write a short message of 25 words or more.",
   prompt:"You are going to start an English course next week. Write an email to your friend, Sam. In your email:\n- tell Sam about the course\n- say why you want to learn English\n- invite Sam to join the course",
   minWords:25}
]},
// ===== TEST 3 =====
{t:"Practice Test 3",exercises:[
  {type:"mc",tl:"Reading",title:"Part 1 - Signs & Notices",ins:"Read each text. What does it say? Choose the correct answer.",
   items:[
    {q:"AIRPORT: Passengers for flight BA234 to Paris should go to Gate 12 immediately.",opts:["Flight BA234 is delayed","Passengers for Paris must go to Gate 12 now","Gate 12 is closed"],ans:1},
    {q:"SCHOOL NOTICE: Sports Day is next Wednesday. All students should wear trainers.",opts:["Students cannot wear trainers on Wednesday","Sports Day has been cancelled","Students need trainers for Sports Day"],ans:2},
    {q:"Dear Lisa, Sorry I missed your call. I was at the dentist. Call me back after 6. - David",opts:["David was busy when Lisa called","David called Lisa from the dentist","Lisa should call before 6"],ans:0},
    {q:"HOTEL: Breakfast is served between 7:00 and 9:30 AM in the ground floor restaurant.",opts:["Breakfast finishes at 7:00 AM","You can have breakfast until 9:30 AM","The restaurant is on the first floor"],ans:1},
    {q:"SHOP: We do not accept cards for purchases under five pounds.",opts:["All items cost five pounds","You must pay cash for small amounts","Credit cards are not accepted here"],ans:1},
    {q:"PARK: Dogs must be kept on a lead at all times.",opts:["Dogs are not allowed in the park","Dogs can run free in the park","Dog owners must use a lead"],ans:2}
  ]},
  {type:"mc",tl:"Reading",title:"Part 3 - Reading Comprehension",ins:"Read the text and choose the best answer for each question.",
   passage:"Emma moved to London two years ago to study at university. At first, she felt lonely because she did not know anyone in the city. She shared a flat with three other students, but they were often busy with their own studies. Then Emma joined a running club at her university. She started running three times a week with the other members. She made many friends and her English improved too because she had to talk to people. Running also helped her feel less stressed about her exams. Now Emma is in her second year and she feels much happier. She still runs with the club and has even finished a half marathon. She says that joining the club was the best decision she made at university.",
   items:[
    {q:"Why did Emma move to London?",opts:["For work","To study","To be with friends"],ans:1},
    {q:"How did Emma feel at first?",opts:["Happy","Excited","Lonely"],ans:2},
    {q:"What did Emma join?",opts:["A book club","A running club","A cooking class"],ans:1},
    {q:"How did running help Emma?",opts:["She earned money","She felt less stressed","She lost weight"],ans:1},
    {q:"What has Emma completed?",opts:["A full marathon","A swimming race","A half marathon"],ans:2}
  ]},
  {type:"mc",tl:"Reading",title:"Part 4 - Multiple-choice Cloze",ins:"Choose the correct word (A, B or C) for each gap.",
   passage:"My friend Tom loves (1)___. He cooks dinner for his family almost (2)___ day. Last week, he made a wonderful Italian pasta. He learned the recipe (3)___ a cooking programme on TV. Tom is (4)___ at making cakes too. He once made a birthday cake (5)___ his mother and she loved it. Tom says cooking makes him feel (6)___ and he wants to open a restaurant someday.",
   items:[
    {q:"Gap 1",opts:["cooking","to cook","cook"],ans:0},
    {q:"Gap 2",opts:["all","some","every"],ans:2},
    {q:"Gap 3",opts:["in","from","at"],ans:1},
    {q:"Gap 4",opts:["well","fine","good"],ans:2},
    {q:"Gap 5",opts:["for","to","at"],ans:0},
    {q:"Gap 6",opts:["happy","happily","happiness"],ans:0}
  ]},
  {type:"fl",tl:"Reading",title:"Part 5 - Open Cloze",ins:"Write one word for each gap.",
   items:[
    {pre:"I woke up early because I",gap:"had",post:"a lot of things to do."},
    {pre:"First, I went",gap:"to",post:"the supermarket to buy some food."},
    {pre:"Then I came home and cleaned",gap:"the",post:"house."},
    {pre:"In the afternoon, my friends came",gap:"to",post:"visit me."},
    {pre:"We watched a film",gap:"and",post:"ate popcorn together."},
    {pre:"It was a great day even",gap:"though",post:"I was very busy."}
  ]},
  {type:"mc",tl:"Listening",title:"Part 1 - Short Conversations",ins:"Listen and choose the correct answer.",
   items:[
    {audio:"Woman: How do you get to work every day? Man: I usually drive, but today I took the bus because my car is at the garage. Woman: Is it being repaired? Man: Yes, it should be ready by Friday.",q:"How did the man travel today?",opts:["By car","By bus","On foot"],ans:1},
    {audio:"Girl: I am thinking of joining the school choir. Boy: Really? You have a nice voice. When do they practise? Girl: Every Tuesday after school.",q:"When does the choir practise?",opts:["Monday","Tuesday after school","Wednesday"],ans:1},
    {audio:"Man: Could I book a table for Saturday evening, please? Woman: How many people? Man: There will be six of us. Woman: I can offer you a table at 7:30 or 9:00. Man: 7:30 would be perfect.",q:"How many people will come for dinner?",opts:["Four","Six","Seven"],ans:1},
    {audio:"Woman: The weather forecast says it will rain this afternoon. Man: Oh no! I wanted to go to the park. Woman: Why don't we go to the cinema instead? Man: Good idea!",q:"What will they probably do this afternoon?",opts:["Go to the park","Stay at home","Go to the cinema"],ans:2},
    {audio:"Boy: I got 85 percent on my maths test! Girl: That is great! I got 72 percent. It was a really difficult test.",q:"What was the boy's test score?",opts:["72%","85%","100%"],ans:1}
  ]},
  {type:"wr",tl:"Writing",title:"Part 7 - Short Message",ins:"Write a short message of 25 words or more.",
   prompt:"You went to a new restaurant last weekend. Write a message to your English friend, Pat. In your message:\n- say where the restaurant is\n- describe the food you had\n- say whether you recommend it",
   minWords:25}
]},
// ===== TEST 4 =====
{t:"Practice Test 4",exercises:[
  {type:"mc",tl:"Reading",title:"Part 1 - Signs & Notices",ins:"Read each text. What does it say? Choose the correct answer.",
   items:[
    {q:"GYM NOTICE: Members must bring their own towel. Towels are not provided.",opts:["You can buy towels at the gym","The gym gives you a free towel","You need to bring a towel from home"],ans:2},
    {q:"TRAIN DELAYED: The 14:20 to Manchester will depart at approximately 14:50.",opts:["The train is cancelled","The Manchester train is about 30 minutes late","The train leaves at exactly 14:20"],ans:1},
    {q:"Hi Joe, I left my umbrella at your house yesterday. Can you bring it to school tomorrow? Thanks! Anna",opts:["Anna wants Joe to return her umbrella","Anna found Joe's umbrella","Anna is buying a new umbrella"],ans:0},
    {q:"CINEMA: Students get 20% off all tickets on Tuesdays with a valid student card.",opts:["The cinema is cheaper for students on Tuesdays","Students cannot go to the cinema on Tuesdays","All tickets are 20 pounds"],ans:0},
    {q:"ROAD CLOSED: Bridge Street closed for repairs. Use Park Road instead.",opts:["Park Road is being repaired","You cannot use Bridge Street right now","Bridge Street is the best route"],ans:1},
    {q:"CAFE: Free Wi-Fi available. Ask staff for the password.",opts:["You need to pay for Wi-Fi","Wi-Fi is free but you need a password","The cafe does not have Wi-Fi"],ans:1}
  ]},
  {type:"mc",tl:"Reading",title:"Part 3 - Reading Comprehension",ins:"Read the text and choose the best answer for each question.",
   passage:"Ben is 14 years old and he is crazy about animals. He has two pets at home: a dog called Max and a cat called Bella. Every morning before school, he takes Max for a walk in the park. After school, he feeds both pets and plays with them. Ben also helps at a local animal shelter every Saturday. He walks the dogs, cleans the cages, and plays with the cats. The people at the shelter say Ben is one of the best volunteers they have ever had. Ben loves spending time there because he knows he is helping animals that do not have homes. Ben's dream is to become a vet when he is older. His parents support his dream and have promised to help him pay for university. Ben works hard at school, especially in science, because he knows he needs good grades.",
   items:[
    {q:"How many pets does Ben have?",opts:["One","Two","Three"],ans:1},
    {q:"What does Ben do every morning?",opts:["Feeds the cat","Walks the dog","Goes to the shelter"],ans:1},
    {q:"How often does Ben go to the shelter?",opts:["Every day","Twice a week","Every Saturday"],ans:2},
    {q:"What is Ben's dream job?",opts:["A teacher","A vet","A scientist"],ans:1},
    {q:"Why does Ben work hard in science?",opts:["He finds it easy","He needs good grades","His parents force him"],ans:1}
  ]},
  {type:"mc",tl:"Reading",title:"Part 4 - Multiple-choice Cloze",ins:"Choose the correct word (A, B or C) for each gap.",
   passage:"Last weekend, my family went to the countryside. We (1)___ early in the morning and drove for two hours. When we (2)___, we had a picnic by a beautiful lake. The children (3)___ in the water while the adults sat and talked. After lunch, we went (4)___ a walk through the forest. We saw some wild (5)___ including deer and rabbits. Everyone agreed it was a (6)___ day out.",
   items:[
    {q:"Gap 1",opts:["left","leaved","were leaving"],ans:0},
    {q:"Gap 2",opts:["got","arrived","reached"],ans:1},
    {q:"Gap 3",opts:["played","were playing","have played"],ans:0},
    {q:"Gap 4",opts:["to","for","on"],ans:1},
    {q:"Gap 5",opts:["animals","pets","creatures"],ans:0},
    {q:"Gap 6",opts:["good","wonderful","nice"],ans:1}
  ]},
  {type:"fl",tl:"Reading",title:"Part 5 - Open Cloze",ins:"Write one word for each gap.",
   items:[
    {pre:"My best friend is called Sophie. I have known",gap:"her",post:"since we were five years old."},
    {pre:"We met",gap:"at",post:"primary school and became friends immediately."},
    {pre:"Sophie is taller",gap:"than",post:"me, but I am older by two months."},
    {pre:"We",gap:"both",post:"like the same music and TV shows."},
    {pre:"She is very good",gap:"at",post:"drawing and often makes pictures for me."},
    {pre:"I am lucky",gap:"to",post:"have such a wonderful friend."}
  ]},
  {type:"mc",tl:"Listening",title:"Part 1 - Short Conversations",ins:"Listen and choose the correct answer.",
   items:[
    {audio:"Woman: Have you decided what to have for lunch? Man: I think I will have the chicken sandwich. What about you? Woman: I am not very hungry, so I will just have a salad.",q:"What will the woman eat?",opts:["A chicken sandwich","A salad","Pizza"],ans:1},
    {audio:"Girl: Where are you going on holiday this year? Boy: We are going to Italy. We are staying in a villa near the coast for ten days.",q:"How long is the boy's holiday?",opts:["A week","Ten days","Two weeks"],ans:1},
    {audio:"Man: I need to buy a present for my wife's birthday. Woman: What does she like? Man: She loves reading. Woman: Why don't you get her a book?",q:"What will the man probably buy?",opts:["Clothes","A book","Flowers"],ans:1},
    {audio:"Woman: Excuse me, how much is this blue dress? Man: It is forty-five pounds, but we have a ten percent discount today. Woman: That is great! I will take it.",q:"How much will the woman pay with discount?",opts:["Thirty-five pounds","Forty pounds fifty","Forty-five pounds"],ans:1},
    {audio:"Teacher: Remember, the school trip is next Thursday. Please bring a packed lunch and wear comfortable shoes. Student: Can we bring our phones? Teacher: Yes, but only for taking photos.",q:"What should students bring?",opts:["Money for lunch","A packed lunch","A camera"],ans:1}
  ]},
  {type:"wr",tl:"Writing",title:"Part 7 - Short Message",ins:"Write a short message of 25 words or more.",
   prompt:"Your English teacher has asked you to write about your favourite sport. In your message:\n- say what sport you like\n- explain why you enjoy it\n- say how often you play or watch it",
   minWords:25}
]},
// ===== TEST 5 =====
{t:"Practice Test 5",exercises:[
  {type:"mc",tl:"Reading",title:"Part 1 - Signs & Notices",ins:"Read each text. What does it say? Choose the correct answer.",
   items:[
    {q:"SUPERMARKET: This checkout is for 10 items or fewer only.",opts:["You can buy up to 10 items here","Everything costs 10 pounds","The shop has 10 checkouts"],ans:0},
    {q:"DOCTOR: Please arrive 10 minutes before your appointment time.",opts:["Appointments last 10 minutes","Come early for your appointment","The surgery opens 10 minutes early"],ans:1},
    {q:"Hi Pablo, The party starts at 7 but come at 6:30 to help me set up. Bring some music! - Kira",opts:["Kira wants Pablo to come early","The party is at 6:30","Pablo is bringing food"],ans:0},
    {q:"BEACH: No swimming when the red flag is flying.",opts:["You can always swim here","Swimming is not safe when there is a red flag","The beach is closed"],ans:1},
    {q:"POST OFFICE: Open Mon-Fri 9 AM - 5 PM. Saturday 9 AM - 12 PM.",opts:["Closed on Saturdays","Saturday hours are shorter than weekday hours","Closes at 12 every day"],ans:1},
    {q:"WAREHOUSE SALE: Up to 70% off! This weekend only!",opts:["Prices are higher this weekend","There are big discounts this weekend","The warehouse is closed"],ans:1}
  ]},
  {type:"mc",tl:"Reading",title:"Part 3 - Reading Comprehension",ins:"Read the text and choose the best answer for each question.",
   passage:"Amy works as a tour guide in a big city. She takes groups of tourists around the most famous places. She shows them old buildings, beautiful parks, and interesting museums. Amy works five days a week and walks about 15 kilometres every day. Amy speaks three languages: English, French, and Spanish. She learned French at school and studied Spanish at university. Speaking different languages helps her communicate with tourists from many countries. She says her job is never boring because she meets new people every day. The worst thing about her job is the weather. In winter, it can be very cold and rainy, but she still has to walk outside all day. Despite the weather, she says she would not change her job for anything.",
   items:[
    {q:"What is Amy's job?",opts:["A teacher","A tour guide","A museum worker"],ans:1},
    {q:"How many languages does Amy speak?",opts:["Two","Three","Four"],ans:1},
    {q:"Where did Amy learn Spanish?",opts:["At school","At university","In Spain"],ans:1},
    {q:"What is the worst part of Amy's job?",opts:["The hours","Meeting tourists","Bad weather"],ans:2},
    {q:"How does Amy feel about her job?",opts:["She loves it","She wants to change it","She finds it boring"],ans:0}
  ]},
  {type:"mc",tl:"Reading",title:"Part 4 - Multiple-choice Cloze",ins:"Choose the correct word (A, B or C) for each gap.",
   passage:"My grandmother is 78 years old and she is very (1)___. She goes to a yoga class (2)___ a week and walks in the park every day. She says the (3)___ to a long life is staying active. She also eats lots of fruit and (4)___ and she never eats junk food. My grandmother (5)___ looks after her garden. She grows tomatoes, carrots, and flowers. I hope I am as (6)___ as her when I am 78!",
   items:[
    {q:"Gap 1",opts:["healthy","health","healthily"],ans:0},
    {q:"Gap 2",opts:["one","twice","two"],ans:1},
    {q:"Gap 3",opts:["way","key","door"],ans:1},
    {q:"Gap 4",opts:["meat","vegetables","bread"],ans:1},
    {q:"Gap 5",opts:["too","as well","also"],ans:2},
    {q:"Gap 6",opts:["fit","strong","well"],ans:0}
  ]},
  {type:"fl",tl:"Reading",title:"Part 5 - Open Cloze",ins:"Write one word for each gap.",
   items:[
    {pre:"Last summer I went camping",gap:"with",post:"my friends in the mountains."},
    {pre:"We stayed there",gap:"for",post:"five days."},
    {pre:"Every morning we woke up",gap:"at",post:"six o clock."},
    {pre:"The weather",gap:"was",post:"beautiful every day."},
    {pre:"We cooked our meals",gap:"on",post:"a campfire."},
    {pre:"It was one of",gap:"the",post:"best holidays I have ever had."}
  ]},
  {type:"mc",tl:"Listening",title:"Part 1 - Short Conversations",ins:"Listen and choose the correct answer.",
   items:[
    {audio:"Boy: Mum, can I use the computer? Woman: Not right now. Your sister is doing her homework on it. You can use it after dinner.",q:"Why can't the boy use the computer?",opts:["It is broken","His sister is using it","His mother needs it"],ans:1},
    {audio:"Woman: I have been waiting for the bus for twenty minutes! Man: The buses are always late on rainy days. Why don't we walk? Woman: In this rain? No thanks, I will wait.",q:"How long has the woman been waiting?",opts:["Ten minutes","Fifteen minutes","Twenty minutes"],ans:2},
    {audio:"Girl: I want to learn to play a musical instrument. Man: What are you interested in? Guitar? Piano? Girl: I have always wanted to play the violin.",q:"What instrument does the girl want to learn?",opts:["Guitar","Piano","Violin"],ans:2},
    {audio:"Man: I lost my wallet somewhere today. Woman: Oh no! Do you remember where you last had it? Man: I think I had it at the coffee shop this morning.",q:"Where does the man think he lost his wallet?",opts:["At work","At the coffee shop","On the bus"],ans:1},
    {audio:"Woman: Happy birthday, Jack! I got you a present. Man: Thank you! What is it? Woman: Open it! Man: Wow, a watch! It is beautiful!",q:"What present did Jack receive?",opts:["A book","A watch","A phone"],ans:1}
  ]},
  {type:"wr",tl:"Writing",title:"Part 7 - Short Message",ins:"Write a short message of 25 words or more.",
   prompt:"You have just moved to a new house. Write a message to your English friend, Chris. In your message:\n- describe your new house\n- say what you like about it\n- invite Chris to visit you",
   minWords:25}
]},
// ===== TEST 6 =====
{t:"Practice Test 6",exercises:[
  {type:"mc",tl:"Reading",title:"Part 1 - Signs & Notices",ins:"Read each text. What does it say? Choose the correct answer.",
   items:[
    {q:"LIFT OUT OF ORDER. Please use the stairs.",opts:["The lift is working","You cannot use the lift today","The stairs are closed"],ans:1},
    {q:"Hi Clare, I tried to call you but your phone was off. Meet me at the bookshop at 3. - Sophie",opts:["Sophie wants to meet Clare","Clare called Sophie","They are meeting at the library"],ans:0},
    {q:"DENTIST: Please switch off your mobile phone in the waiting room.",opts:["You can use your phone while waiting","Phones must be turned off while waiting","The dentist will call your phone"],ans:1},
    {q:"MARKET: Fresh fish every Tuesday and Thursday. Organic vegetables daily.",opts:["Fish is available every day","Vegetables are only sold on Tuesdays","Fresh fish comes twice a week"],ans:2},
    {q:"PLAYGROUND: Children under 5 must be supervised by an adult.",opts:["The playground is for under 5s only","Small children need an adult watching them","Adults cannot enter"],ans:1},
    {q:"BUS PASS: Valid for unlimited travel in zones 1 and 2 only.",opts:["This pass works everywhere","You can only use this pass in two zones","The pass is for one journey"],ans:1}
  ]},
  {type:"mc",tl:"Reading",title:"Part 3 - Reading Comprehension",ins:"Read the text and choose the best answer for each question.",
   passage:"Carlo comes from Rome, Italy, but he now lives in Edinburgh, Scotland, where he works as a chef in an Italian restaurant. He moved there five years ago because his wife, who is Scottish, wanted to live closer to her family. Carlo says that the biggest difference between Rome and Edinburgh is the weather. In Rome, it is usually sunny and warm, but Edinburgh can be cold and windy, especially in winter. However, Carlo says he loves Edinburgh because the people are very friendly and the city is beautiful. At the restaurant, Carlo makes traditional Italian dishes using recipes from his grandmother. The restaurant is very popular and is always busy at weekends. Carlo is proud that Scottish people love his Italian food.",
   items:[
    {q:"Why did Carlo move to Edinburgh?",opts:["For a new job","His wife wanted to be near family","He likes cold weather"],ans:1},
    {q:"What is the biggest difference Carlo noticed?",opts:["The food","The people","The weather"],ans:2},
    {q:"What does Carlo like about Edinburgh?",opts:["Friendly people and beautiful city","The warm weather","The Italian community"],ans:0},
    {q:"Where do Carlo's recipes come from?",opts:["A cookbook","His grandmother","The internet"],ans:1},
    {q:"When is the restaurant busiest?",opts:["Weekdays","Lunchtimes","Weekends"],ans:2}
  ]},
  {type:"mc",tl:"Reading",title:"Part 4 - Multiple-choice Cloze",ins:"Choose the correct word (A, B or C) for each gap.",
   passage:"Technology has changed the (1)___ we live. Most people now (2)___ a smartphone and use it every day. We can (3)___ messages, take photos, and find information on the internet. Some people spend (4)___ than four hours a day on their phone. Doctors say this is not (5)___ for our eyes or our sleep. They advise us to take (6)___ from screens and go outside more.",
   items:[
    {q:"Gap 1",opts:["way","road","path"],ans:0},
    {q:"Gap 2",opts:["get","own","take"],ans:1},
    {q:"Gap 3",opts:["post","make","send"],ans:2},
    {q:"Gap 4",opts:["more","much","over"],ans:0},
    {q:"Gap 5",opts:["well","fine","good"],ans:2},
    {q:"Gap 6",opts:["breaks","rest","stop"],ans:0}
  ]},
  {type:"fl",tl:"Reading",title:"Part 5 - Open Cloze",ins:"Write one word for each gap.",
   items:[
    {pre:"My town is famous",gap:"for",post:"its beautiful old castle."},
    {pre:"Thousands of tourists come",gap:"to",post:"visit it every year."},
    {pre:"The castle",gap:"was",post:"built more than 500 years ago."},
    {pre:"There is",gap:"a",post:"gift shop and a cafe inside."},
    {pre:"You can walk",gap:"around",post:"the gardens for free."},
    {pre:"I think everyone",gap:"should",post:"visit it at least once."}
  ]},
  {type:"mc",tl:"Listening",title:"Part 1 - Short Conversations",ins:"Listen and choose the correct answer.",
   items:[
    {audio:"Man: Excuse me, is there a cash machine near here? Woman: Yes, there is one inside the supermarket on the corner. It is about two minutes walk from here.",q:"Where is the cash machine?",opts:["In the bank","In the supermarket","Outside the station"],ans:1},
    {audio:"Girl: Do you want to come to the beach tomorrow? Boy: I would love to, but the weather forecast says it will rain. Girl: Maybe we can go bowling instead. Boy: Perfect!",q:"What will they probably do tomorrow?",opts:["Go to the beach","Stay at home","Go bowling"],ans:2},
    {audio:"Woman: This is a lovely photo! Where was it taken? Man: That is in Peru. We went to Machu Picchu last year. It was incredible!",q:"Where was the photo taken?",opts:["Brazil","Peru","Mexico"],ans:1},
    {audio:"Boy: I finished reading that book you gave me. Girl: Did you like it? Boy: It was great at the beginning but the ending was disappointing.",q:"What did the boy think of the book?",opts:["It was perfect","The start was good but the end was not","It was boring"],ans:1},
    {audio:"Man: Two adult tickets and one child ticket for the castle tour, please. Woman: Adults are eight pounds each and children are five pounds. That is twenty-one pounds altogether.",q:"How much do the tickets cost in total?",opts:["Sixteen pounds","Twenty-one pounds","Twenty-four pounds"],ans:1}
  ]},
  {type:"wr",tl:"Writing",title:"Part 7 - Short Message",ins:"Write a short message of 25 words or more.",
   prompt:"You are organising a surprise birthday party for a friend. Write a message to another friend, Kim. In your message:\n- say when and where the party will be\n- ask Kim to bring something\n- remind Kim it is a surprise",
   minWords:25}
]},
// ===== TEST 7 =====
{t:"Practice Test 7",exercises:[
  {type:"mc",tl:"Reading",title:"Part 1 - Signs & Notices",ins:"Read each text. What does it say? Choose the correct answer.",
   items:[
    {q:"TOURIST INFORMATION: Maps available free of charge at the front desk.",opts:["You can get a free map","Maps cost a small fee","The desk is closed"],ans:0},
    {q:"CAUTION: Wet floor. Please walk carefully.",opts:["The floor has been cleaned","You should not walk here","Be careful - the floor is wet"],ans:2},
    {q:"Tom, I have gone to pick up Grandma from the station. Dinner is in the oven. Back by 7. - Mum",opts:["Tom should make dinner","Mum will return at 7","Grandma is making dinner"],ans:1},
    {q:"CONCERT: Doors open at 7 PM. Show starts at 8 PM. No late entry.",opts:["You can arrive at any time","The concert begins at 7 PM","You cannot enter after the show starts"],ans:2},
    {q:"ZOO: Do not feed the animals. Thank you for your cooperation.",opts:["You can feed some animals","Visitors should not give food to animals","Food is sold near the animals"],ans:1},
    {q:"PHARMACY: Open 24 hours. Emergency prescriptions available.",opts:["This pharmacy is always open","Closes at midnight","Emergency services only"],ans:0}
  ]},
  {type:"mc",tl:"Reading",title:"Part 3 - Reading Comprehension",ins:"Read the text and choose the best answer for each question.",
   passage:"Sixteen-year-old Mia has an unusual hobby: she makes jewellery from recycled materials. She started when she was twelve, after watching a video online about how to make earrings from old buttons. Since then, she has created necklaces, bracelets, and rings from things like bottle caps, old keys, and broken electronics. Mia sells her jewellery at local markets and online. She earns about fifty pounds a month, which she saves for university. Her customers love her designs because each piece is unique and no two items are the same. Recently, Mia won a local business competition for young entrepreneurs. The prize was two hundred pounds and a chance to sell at the city's biggest craft fair.",
   items:[
    {q:"When did Mia start making jewellery?",opts:["When she was 10","When she was 12","When she was 16"],ans:1},
    {q:"What materials does Mia use?",opts:["New materials from shops","Expensive metals","Recycled items"],ans:2},
    {q:"How much does Mia earn per month?",opts:["Twenty pounds","Fifty pounds","Two hundred pounds"],ans:1},
    {q:"Why do customers like her jewellery?",opts:["It is cheap","Every piece is different","It is made of gold"],ans:1},
    {q:"What did Mia win?",opts:["A holiday","A business competition","A scholarship"],ans:1}
  ]},
  {type:"mc",tl:"Reading",title:"Part 4 - Multiple-choice Cloze",ins:"Choose the correct word (A, B or C) for each gap.",
   passage:"Learning a new language can be (1)___ but also very rewarding. The (2)___ important thing is to practise every day, even if it is only for fifteen minutes. You can listen to songs, watch films, or (3)___ with native speakers online. It is also helpful to (4)___ a vocabulary notebook. Do not be (5)___ of making mistakes - they are a natural part of (6)___.",
   items:[
    {q:"Gap 1",opts:["easy","difficult","simple"],ans:1},
    {q:"Gap 2",opts:["more","most","very"],ans:1},
    {q:"Gap 3",opts:["talk","say","tell"],ans:0},
    {q:"Gap 4",opts:["have","keep","hold"],ans:1},
    {q:"Gap 5",opts:["afraid","worried","scared"],ans:0},
    {q:"Gap 6",opts:["studying","learning","teaching"],ans:1}
  ]},
  {type:"fl",tl:"Reading",title:"Part 5 - Open Cloze",ins:"Write one word for each gap.",
   items:[
    {pre:"English is spoken",gap:"by",post:"millions of people around the world."},
    {pre:"Many students learn it",gap:"as",post:"a second language at school."},
    {pre:"It is useful",gap:"for",post:"travel, work, and making friends."},
    {pre:"If you want to improve,",gap:"you",post:"should read books in English."},
    {pre:"Watching English TV shows is",gap:"also",post:"a great way to learn."},
    {pre:"Do not give up",gap:"if",post:"it seems difficult at first."}
  ]},
  {type:"mc",tl:"Listening",title:"Part 1 - Short Conversations",ins:"Listen and choose the correct answer.",
   items:[
    {audio:"Woman: I am looking for a gift for my daughter. She is turning seven next week. Man: How about this puzzle? It is very popular with children her age. Woman: That looks great! How much is it? Man: It is twelve ninety-nine.",q:"Who is the gift for?",opts:["The woman's friend","The woman's daughter","The man's daughter"],ans:1},
    {audio:"Boy: What did you have for breakfast? Girl: Just toast and orange juice. I was late so I did not have time for anything else.",q:"Why did the girl have a simple breakfast?",opts:["She was not hungry","She was running late","She does not like cereal"],ans:1},
    {audio:"Man: Can I return this shirt, please? I bought it last week but it is too small. Woman: Do you have the receipt? Man: Yes, here it is.",q:"Why is the man returning the shirt?",opts:["Wrong colour","He does not like it","It does not fit"],ans:2},
    {audio:"Girl: I heard the school is starting a gardening club. Boy: Really? When does it meet? Girl: Wednesday lunchtimes. Do you want to join?",q:"When does the gardening club meet?",opts:["After school","Wednesday lunchtimes","Saturday mornings"],ans:1},
    {audio:"Woman: How long have you lived in this neighbourhood? Man: About fifteen years. I moved here when I got married. Woman: Do you like it? Man: Yes, it is very quiet.",q:"How long has the man lived there?",opts:["Five years","Ten years","Fifteen years"],ans:2}
  ]},
  {type:"wr",tl:"Writing",title:"Part 7 - Short Message",ins:"Write a short message of 25 words or more.",
   prompt:"Your school is organising a talent show. Write a message to your English friend, Lee. In your message:\n- tell Lee about the talent show\n- say what you are going to do in it\n- ask if Lee wants to come and watch",
   minWords:25}
]},
// ===== TEST 8 =====
{t:"Practice Test 8",exercises:[
  {type:"mc",tl:"Reading",title:"Part 1 - Signs & Notices",ins:"Read each text. What does it say? Choose the correct answer.",
   items:[
    {q:"FERRY: Check in at least 30 minutes before departure.",opts:["The ferry leaves in 30 minutes","You need to check in early","You can arrive at any time"],ans:1},
    {q:"OFFICE: The air conditioning is broken. A technician will come on Thursday.",opts:["The office is closed until Thursday","The air conditioning will be fixed Thursday","A new AC was installed"],ans:1},
    {q:"Hey Lucia, my phone is almost dead. If you cannot reach me, try the house phone: 555-0123. - Marco",opts:["Marco has a new number","Marco's phone might not work","Lucia should call at 8"],ans:1},
    {q:"LAUNDRY: Wash and fold service available. Ready in 24 hours.",opts:["You must fold your own clothes","The laundry keeps clothes forever","They wash and fold clothes in a day"],ans:2},
    {q:"CYCLING LANE: Pedestrians please keep to the pavement.",opts:["Everyone should use this lane","Walkers should not use the cycling lane","Cyclists should walk here"],ans:1},
    {q:"CLASSROOM: No food or drink except water.",opts:["You can eat in the classroom","Only water is allowed here","All drinks are banned"],ans:1}
  ]},
  {type:"mc",tl:"Reading",title:"Part 3 - Reading Comprehension",ins:"Read the text and choose the best answer for each question.",
   passage:"Kenji is from Japan but he has lived in London for two years. He came to study graphic design at an art college. At first, he found it difficult to understand British English because people spoke very fast. He also missed Japanese food. To make friends, Kenji joined a photography group that meets in Hyde Park every Sunday. Through the group, he met people from many different countries. He also started cooking Japanese food for his flatmates, who loved it. Now he cooks for them twice a week. Kenji finishes his course next June. He wants to stay in London and work for a design company. He also wants to start a food blog because so many people have asked him for recipes.",
   items:[
    {q:"Why did Kenji move to London?",opts:["For work","To study","To be with family"],ans:1},
    {q:"What was difficult for Kenji at first?",opts:["Finding a flat","Understanding British English","The cold weather"],ans:1},
    {q:"How did Kenji make friends?",opts:["Through his course","By joining a photography group","At a Japanese restaurant"],ans:1},
    {q:"When does Kenji's course end?",opts:["This month","Next January","Next June"],ans:2},
    {q:"What does Kenji want to start?",opts:["A restaurant","A design company","A food blog"],ans:2}
  ]},
  {type:"mc",tl:"Reading",title:"Part 4 - Multiple-choice Cloze",ins:"Choose the correct word (A, B or C) for each gap.",
   passage:"Shopping online has become very (1)___ in recent years. Many people prefer to buy things from their (2)___ instead of going to shops. You can find almost (3)___ you need on the internet. However, some people still (4)___ shopping in real shops because they can see and (5)___ products before buying them. Shopping centres are also popular places to (6)___ time with friends.",
   items:[
    {q:"Gap 1",opts:["popular","known","usual"],ans:0},
    {q:"Gap 2",opts:["desk","chair","home"],ans:2},
    {q:"Gap 3",opts:["everything","something","nothing"],ans:0},
    {q:"Gap 4",opts:["want","enjoy","hope"],ans:1},
    {q:"Gap 5",opts:["hold","touch","take"],ans:1},
    {q:"Gap 6",opts:["spend","use","pass"],ans:0}
  ]},
  {type:"fl",tl:"Reading",title:"Part 5 - Open Cloze",ins:"Write one word for each gap.",
   items:[
    {pre:"My family moved to a bigger house last",gap:"year",post:"because we needed more space."},
    {pre:"The new house has four bedrooms",gap:"and",post:"a large garden."},
    {pre:"I now have",gap:"my",post:"own room, which is wonderful."},
    {pre:"The kitchen is much bigger",gap:"than",post:"the one in our old house."},
    {pre:"We live closer",gap:"to",post:"my school now, so I can walk there."},
    {pre:"I am very happy",gap:"with",post:"our new home."}
  ]},
  {type:"mc",tl:"Listening",title:"Part 1 - Short Conversations",ins:"Listen and choose the correct answer.",
   items:[
    {audio:"Woman: I would like to book a room, please. Man: Single or double? Woman: A double room with a view of the sea, if possible. Man: We have one on the fourth floor.",q:"What room does the woman want?",opts:["A single room","A double room with sea view","A ground floor room"],ans:1},
    {audio:"Boy: I cannot find my science textbook! Girl: Did you leave it in the classroom? Boy: I checked there. I think I left it on the bus.",q:"Where does the boy think his book is?",opts:["In the classroom","At home","On the bus"],ans:2},
    {audio:"Man: The plane to Barcelona departs at 2:15, but we need to be at the airport two hours early. Woman: So we should leave home at 11. It takes about an hour to get there.",q:"What time should they leave home?",opts:["11 o clock","12 o clock","2 o clock"],ans:0},
    {audio:"Girl: Have you seen the new Spider-Man film? Boy: Yes, I saw it last weekend. It was really exciting! The special effects were amazing.",q:"What did the boy think of the film?",opts:["It was boring","It was exciting","It was scary"],ans:1},
    {audio:"Woman: Could you help me carry these boxes, please? Man: Of course! Where do you want them? Woman: In the storage room at the end of the corridor.",q:"Where should the boxes go?",opts:["In the office","In the storage room","Outside"],ans:1}
  ]},
  {type:"wr",tl:"Writing",title:"Part 7 - Short Message",ins:"Write a short message of 25 words or more.",
   prompt:"You want to join an after-school English conversation class. Write an email to the English teacher, Mr. Brown. In your email:\n- say you want to join the class\n- ask about the schedule\n- ask about the cost",
   minWords:25}
]},
// ===== TEST 9 =====
{t:"Practice Test 9",exercises:[
  {type:"mc",tl:"Reading",title:"Part 1 - Signs & Notices",ins:"Read each text. What does it say? Choose the correct answer.",
   items:[
    {q:"HOTEL: Please leave your key at the desk when going out.",opts:["Keep your key with you always","Return your key before leaving","Keys are available at the desk"],ans:1},
    {q:"REMEMBER: Rubbish collection is on Tuesdays. Put bins out by 7 AM.",opts:["Bins are collected on Tuesday mornings","Do not put bins out before Tuesday","Rubbish is collected in the evening"],ans:0},
    {q:"Dear Mr. Park, Your parcel has arrived. Please collect it before Friday. - Post Office",opts:["Mr. Park needs to pick up a package","Mr. Park sent a parcel","The post office is closing Friday"],ans:0},
    {q:"ART GALLERY: Photography is not permitted inside the exhibitions.",opts:["You can take photos","Photos are not allowed in exhibition rooms","Cameras are sold at the gallery"],ans:1},
    {q:"SPORTS CENTRE: Annual membership: Adults 360 pounds. Juniors (under 16) 180 pounds.",opts:["Everyone pays the same","Young people pay less than adults","The centre is free for under 16s"],ans:1},
    {q:"TAXI RANK: Please queue here. Next available taxi will be assigned to you.",opts:["You should wait in line for a taxi","Taxis are free here","You must book taxis in advance"],ans:0}
  ]},
  {type:"mc",tl:"Reading",title:"Part 3 - Reading Comprehension",ins:"Read the text and choose the best answer for each question.",
   passage:"Oliver and his twin sister Lucy are both sixteen years old. They look very similar but their personalities are completely different. Oliver is quiet and enjoys reading and playing chess. Lucy is outgoing and loves sports, especially basketball and running. At school, Oliver gets the best grades in his class, especially in English and history. Lucy prefers practical subjects like art and PE. Despite their differences, they get along very well and help each other. Oliver helps Lucy with her essays, and Lucy helps Oliver stay fit by making him go jogging. After school, they both want to go to university. Oliver wants to study law, while Lucy dreams of becoming a sports coach. Their parents are proud of both of them.",
   items:[
    {q:"What is the relationship between Oliver and Lucy?",opts:["They are cousins","They are twins","They are classmates"],ans:1},
    {q:"What is Oliver's personality like?",opts:["Quiet","Sporty","Funny"],ans:0},
    {q:"How does Lucy help Oliver?",opts:["With homework","By making him exercise","By cooking for him"],ans:1},
    {q:"What does Oliver want to be?",opts:["A teacher","A sports coach","A lawyer"],ans:2},
    {q:"How do the parents feel?",opts:["Disappointed","Worried","Proud"],ans:2}
  ]},
  {type:"mc",tl:"Reading",title:"Part 4 - Multiple-choice Cloze",ins:"Choose the correct word (A, B or C) for each gap.",
   passage:"Every country has its own special (1)___. In Japan, people take (2)___ their shoes before entering a home. In many Middle Eastern countries, it is polite to offer guests tea or (3)___. In the UK, people often talk about the (4)___ when they meet someone new. In Latin America, people usually (5)___ each other on the cheek when saying hello. It is important to (6)___ about local customs when you travel.",
   items:[
    {q:"Gap 1",opts:["habits","customs","hobbies"],ans:1},
    {q:"Gap 2",opts:["out","off","away"],ans:1},
    {q:"Gap 3",opts:["juice","coffee","water"],ans:1},
    {q:"Gap 4",opts:["time","weather","news"],ans:1},
    {q:"Gap 5",opts:["kiss","shake","wave"],ans:0},
    {q:"Gap 6",opts:["read","know","learn"],ans:2}
  ]},
  {type:"fl",tl:"Reading",title:"Part 5 - Open Cloze",ins:"Write one word for each gap.",
   items:[
    {pre:"I enjoy going to the cinema",gap:"with",post:"my friends at the weekend."},
    {pre:"We usually choose a film",gap:"that",post:"everyone wants to see."},
    {pre:"Last Saturday we",gap:"went",post:"to see an action film."},
    {pre:"It was",gap:"about",post:"a group of heroes who save the world."},
    {pre:"The film lasted",gap:"for",post:"two hours and twenty minutes."},
    {pre:"We all agreed",gap:"it",post:"was one of the best films this year."}
  ]},
  {type:"mc",tl:"Listening",title:"Part 1 - Short Conversations",ins:"Listen and choose the correct answer.",
   items:[
    {audio:"Man: I need a new pair of running shoes. Woman: There is a sale at the sports shop this week. Everything is half price. Man: Really? The sale ends on Thursday so do not wait too long.",q:"When does the sale finish?",opts:["Today","Thursday","This weekend"],ans:1},
    {audio:"Girl: How was your piano exam yesterday? Boy: I was really nervous, but I think it went well. I will get my results in two weeks.",q:"How did the boy feel about his exam?",opts:["He thinks it went well","He thinks he failed","He was not nervous"],ans:0},
    {audio:"Woman: Do you know where the nearest library is? Man: Yes, go down this street, past the park, and turn right. It is about a ten-minute walk.",q:"How long to walk to the library?",opts:["Five minutes","Ten minutes","Fifteen minutes"],ans:1},
    {audio:"Boy: What is for dinner tonight, Dad? Man: I thought we could order something. Boy: Can we have Chinese food? Man: Sure! What do you want? Boy: Chicken noodles, please.",q:"What will they have for dinner?",opts:["Home-made food","Pizza","Chinese food"],ans:2},
    {audio:"Woman: I started learning to drive last month. Man: How is it going? Woman: It is harder than I expected! Parking is really difficult.",q:"What does the woman find difficult?",opts:["Driving fast","Parking","Turning corners"],ans:1}
  ]},
  {type:"wr",tl:"Writing",title:"Part 7 - Short Message",ins:"Write a short message of 25 words or more.",
   prompt:"You have found a wallet on the bus. Write a note for the bus company. In your note:\n- say what you found and where\n- describe the wallet\n- leave your contact details",
   minWords:25}
]},
// ===== TEST 10 =====
{t:"Practice Test 10",exercises:[
  {type:"mc",tl:"Reading",title:"Part 1 - Signs & Notices",ins:"Read each text. What does it say? Choose the correct answer.",
   items:[
    {q:"FIRE EXIT: Keep clear at all times. Do not block with furniture.",opts:["You can store furniture near the exit","Nothing should block this door","This exit is locked"],ans:1},
    {q:"Hello neighbours! We are having a party on Saturday evening. Sorry if there is some noise! - Flat 4B",opts:["Neighbours are complaining","There will be noise from a party Saturday","Saturday parties are not allowed"],ans:1},
    {q:"PETROL STATION: Please turn off your engine while filling up.",opts:["Keep your car running","Switch off your engine at the pump","The petrol station is closed"],ans:1},
    {q:"EXAM NOTICE: Students may not bring phones or electronic devices into the exam hall.",opts:["Electronic devices are allowed","Phones must be on silent","No electronic devices allowed in the exam"],ans:2},
    {q:"BAKERY: Fresh bread baked every morning. Order before 9 AM for same-day collection.",opts:["You can collect bread anytime","Bread is only available mornings","Order early if you want bread today"],ans:2},
    {q:"PARK CAFE: Closed for renovations. Will reopen on March 15th with a new menu.",opts:["The cafe is open with a new menu","The cafe is temporarily closed","The menu has not changed"],ans:1}
  ]},
  {type:"mc",tl:"Reading",title:"Part 3 - Reading Comprehension",ins:"Read the text and choose the best answer for each question.",
   passage:"Rosa started volunteering at a local charity shop six months ago. She works there every Wednesday afternoon, sorting donated clothes, books, and household items. She also serves customers and operates the cash register. Rosa began volunteering because she wanted to gain experience for her CV. She is studying business at college and thought it would be useful to work in a real shop. However, she has found that volunteering is much more rewarding than she expected. Rosa says the best part is meeting interesting people. Many of the customers come regularly and she knows them by name now. The money from the shop goes to a children's hospital, which makes Rosa feel good about her work. She plans to continue volunteering even after she finds a paid job.",
   items:[
    {q:"How often does Rosa volunteer?",opts:["Every day","Once a week","Twice a week"],ans:1},
    {q:"What does Rosa do at the shop?",opts:["Only sorts clothes","Cooks meals","Sorts items and serves customers"],ans:2},
    {q:"Why did Rosa start volunteering?",opts:["For fun","To get experience","Because she was bored"],ans:1},
    {q:"Where does the shop's money go?",opts:["To Rosa","To a children's hospital","To the government"],ans:1},
    {q:"What will Rosa do in the future?",opts:["Stop volunteering","Continue volunteering","Open her own shop"],ans:1}
  ]},
  {type:"mc",tl:"Reading",title:"Part 4 - Multiple-choice Cloze",ins:"Choose the correct word (A, B or C) for each gap.",
   passage:"Pandas are one of the (1)___ famous animals in the world. They live in the mountains of China and eat mostly (2)___. A panda can eat up to 38 kilograms of bamboo in (3)___ day! Unfortunately, pandas are endangered because their forests are being (4)___ down. There are now only about 1,800 pandas (5)___ in the wild. Many organisations are working hard to (6)___ pandas and their habitat.",
   items:[
    {q:"Gap 1",opts:["more","very","most"],ans:2},
    {q:"Gap 2",opts:["bamboo","grass","fruit"],ans:0},
    {q:"Gap 3",opts:["one","a","the"],ans:1},
    {q:"Gap 4",opts:["broken","cut","pulled"],ans:1},
    {q:"Gap 5",opts:["lived","living","live"],ans:1},
    {q:"Gap 6",opts:["protect","help","save"],ans:0}
  ]},
  {type:"fl",tl:"Reading",title:"Part 5 - Open Cloze",ins:"Write one word for each gap.",
   items:[
    {pre:"Next week is my grandmother's birthday and",gap:"we",post:"are planning a special party."},
    {pre:"The party will be",gap:"at",post:"a restaurant near her house."},
    {pre:"All her children and grandchildren",gap:"will",post:"be there."},
    {pre:"My cousin is making",gap:"a",post:"cake for her."},
    {pre:"I have bought",gap:"her",post:"a beautiful scarf as a present."},
    {pre:"She does not know because",gap:"it",post:"is a surprise."}
  ]},
  {type:"mc",tl:"Listening",title:"Part 1 - Short Conversations",ins:"Listen and choose the correct answer.",
   items:[
    {audio:"Man: Which platform does the train to Oxford leave from? Woman: Let me check the board. Platform 6, departing at 11:45. Man: Do I need to change trains? Woman: No, it is a direct service.",q:"Does the man need to change trains?",opts:["Yes, once","Yes, twice","No, it is direct"],ans:2},
    {audio:"Girl: Are you coming to the school barbecue on Friday? Boy: What time does it start? Girl: At four o clock in the school garden. Boy: Great, I will be there!",q:"Where is the barbecue?",opts:["At the girl's house","In the school garden","At a restaurant"],ans:1},
    {audio:"Woman: I went to the art exhibition at the town hall yesterday. It was wonderful! Man: What kind of art was it? Woman: Mostly paintings of the local countryside. There were also some sculptures.",q:"What did the exhibition mainly show?",opts:["Photos","Paintings of the countryside","Modern art"],ans:1},
    {audio:"Boy: I cannot decide whether to study French or German next year. Man: Which one do you find more interesting? Boy: I like both, but French might be more useful for travelling.",q:"What is the boy's problem?",opts:["He dislikes languages","He cannot choose between two languages","He wants to study three languages"],ans:1},
    {audio:"Woman: The new neighbours moved in yesterday. They have two children and a big dog. Man: Have you met them? Woman: Yes, they seem very friendly. They invited us for tea on Sunday.",q:"When will they visit the neighbours?",opts:["Today","Saturday","Sunday"],ans:2}
  ]},
  {type:"wr",tl:"Writing",title:"Part 7 - Short Message",ins:"Write a short message of 25 words or more.",
   prompt:"Your class is doing a project about healthy living. Write a message to your classmates. In your message:\n- suggest one healthy habit everyone should try\n- explain why it is good for you\n- say how often you do it yourself",
   minWords:25}
]}
]};


// Exponer en window para que cambridge-runner.html encuentre el dataset.
if (typeof window !== 'undefined') { window.CAM_KET = CAM_KET; }
