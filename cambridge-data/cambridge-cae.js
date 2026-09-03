const CAM_CAE = {
id:"cae", name:"C1 Advanced (CAE)", level:"c1",
examInfo:{
  title:"C1 Advanced (CAE)", level:"C1",
  overview:"C1 Advanced proves high-level English for demanding academic and professional settings. It covers reading and use of English, writing, listening, and speaking.",
  papers:[
    {name:"Reading & Use of English",duration:"90 minutes",parts:8,questions:56},
    {name:"Writing",duration:"90 minutes",parts:2,questions:2},
    {name:"Listening",duration:"40 minutes",parts:4,questions:30},
    {name:"Speaking",duration:"15 minutes",parts:4,questions:null}
  ],
  paperDetails:[
    {paper:"Reading & Use of English",parts:[
      {part:1,name:"Multiple-choice cloze",questions:8,description:"Text with 8 gaps. Choose A-D. Tests vocabulary, collocations, idioms."},
      {part:2,name:"Open cloze",questions:8,description:"Text with 8 gaps. Write the missing word."},
      {part:3,name:"Word formation",questions:8,description:"Form the correct word from the given root."},
      {part:4,name:"Key word transformations",questions:6,description:"Rewrite using 3-6 words including the key word."},
      {part:5,name:"Multiple choice (text)",questions:6,description:"Read a long text, answer 6 four-option questions."},
      {part:6,name:"Cross-text multiple matching",questions:4,description:"Read 4 short texts by different writers and match opinions."},
      {part:7,name:"Gapped text",questions:6,description:"Six paragraphs removed. Choose from seven."},
      {part:8,name:"Multiple matching",questions:10,description:"Match 10 questions to sections of a long text."}
    ]},
    {paper:"Writing",parts:[
      {part:1,name:"Compulsory essay",questions:1,description:"Essay (220-260 words) evaluating two ideas."},
      {part:2,name:"Choice task",questions:1,description:"Letter, proposal, report, or review (220-260 words)."}
    ]},
    {paper:"Listening",parts:[
      {part:1,name:"Multiple choice (extracts)",questions:6,description:"Three short extracts, two questions each."},
      {part:2,name:"Sentence completion",questions:8,description:"Monologue, complete sentences."},
      {part:3,name:"Multiple choice (long)",questions:6,description:"Long conversation, six four-option questions."},
      {part:4,name:"Multiple matching",questions:10,description:"Five short monologues matched to statements."}
    ]}
  ],
  tips:[
    "Part 1 often tests collocations, idioms, and phrasal verbs.",
    "Key word transformations use 3-6 words and test complex grammar.",
    "In writing, demonstrate range of vocabulary and complex structures.",
    "Listening Part 4 plays once - focus on the gist of each speaker.",
    "Cross-text matching requires comparing writers opinions carefully."
  ],
  scales:{pass:180,grade_B:193,grade_A:200,maxScore:210}
},
lessons:[
// ===== TEST 1 =====
{t:"Practice Test 1",exercises:[
// Ex 1 - MC Cloze
{type:"mc",tl:"Use of English",title:"Part 1 - Multiple-choice Cloze",ins:"Choose the correct word (A-D) for each gap.",
passage:"The notion that creativity is an innate gift rather than a skill that can be cultivated has long been (1)_____ by researchers in the field. Studies have shown that individuals who (2)_____ themselves to deliberate practice over extended periods tend to produce work of remarkable originality. It is not simply a matter of (3)_____ talent, but rather one of sustained effort and willingness to take risks. Many of the world\\u0027s most celebrated artists went through prolonged phases of mediocrity before they (4)_____ their stride. The psychologist Anders Ericsson, whose research (5)_____ the foundation for the popular notion of the 10,000-hour rule, argued that what distinguishes experts from novices is not some mysterious spark of genius, but rather the (6)_____ accumulation of knowledge through focused training. However, critics have (7)_____ issue with this reductionist view, pointing out that certain cognitive predispositions do play a significant role. The debate remains far from (8)_____, but what is clear is that effort and environment matter enormously.",
items:[
  {q:"Gap 1",opts:["disputed","quarrelled","argued","opposed"],ans:0},
  {q:"Gap 2",opts:["commit","devote","dedicate","apply"],ans:1},
  {q:"Gap 3",opts:["bare","raw","sheer","plain"],ans:1},
  {q:"Gap 4",opts:["caught","hit","reached","found"],ans:1},
  {q:"Gap 5",opts:["set","laid","put","placed"],ans:1},
  {q:"Gap 6",opts:["steady","stable","constant","fixed"],ans:0},
  {q:"Gap 7",opts:["made","taken","brought","raised"],ans:1},
  {q:"Gap 8",opts:["settled","resolved","concluded","determined"],ans:0}
]},
// Ex 2 - Open Cloze
{type:"fl",tl:"Use of English",title:"Part 2 - Open Cloze",ins:"Write the word which best fits each gap.",
items:[
  {pre:"It was not until the late nineteenth century",gap:"that",post:"scientists began to understand the complex mechanisms behind human memory."},
  {pre:"The experiment was carried",gap:"out",post:"under strictly controlled laboratory conditions."},
  {pre:"No sooner had the results been published",gap:"than",post:"other research teams attempted to replicate the findings."},
  {pre:"The professor, many of",gap:"whose",post:"theories had been widely contested, finally received recognition for her work."},
  {pre:"There is little point",gap:"in",post:"attempting to memorize information without first understanding the underlying concepts."},
  {pre:"Had the funding been available,",gap:"would",post:"the researchers have been able to complete the longitudinal study."},
  {pre:"The discovery came",gap:"about",post:"almost by accident when a laboratory assistant noticed an anomaly in the data."},
  {pre:"Brilliant",gap:"as",post:"the theory may appear, it fails to account for several key variables."}
]},
// Ex 3 - Word Formation
{type:"wf",tl:"Use of English",title:"Part 3 - Word Formation",ins:"Use the word given to form a word that fits the gap.",
items:[
  {pre:"The sheer",root:"RELY",gap:"unreliability",post:"of the public transport system has driven many commuters to use their cars."},
  {pre:"Her",root:"EXCEPT",gap:"exceptionally",post:"thorough approach to the research impressed the entire faculty."},
  {pre:"The government has pledged to take",root:"DECIDE",gap:"decisive",post:"action to combat rising pollution levels."},
  {pre:"Many people feel a sense of",root:"POWER",gap:"powerlessness",post:"in the face of large-scale environmental destruction."},
  {pre:"The",root:"WIDE",gap:"widespread",post:"adoption of renewable energy sources has exceeded initial projections."},
  {pre:"His tendency to",root:"ESTIMATE",gap:"overestimate",post:"the time required for tasks often led to unnecessary delays."},
  {pre:"The company\\u0027s",root:"PREPARE",gap:"preparedness",post:"for the sudden market downturn proved to be entirely inadequate."},
  {pre:"It would be",root:"THINK",gap:"unthinkable",post:"to proceed without conducting a comprehensive risk assessment."}
]},
// Ex 4 - Key Word Transformations
{type:"kt",tl:"Use of English",title:"Part 4 - Key Word Transformations",ins:"Use 3-6 words including the word given.",
items:[
  {src:"Nobody expected the project to succeed.",kw:"CAME",ans:"it came as a surprise that the project succeeded",hint:"come as a surprise"},
  {src:"I regret not studying harder at university.",kw:"WISH",ans:"I wish I had studied harder at university",hint:"wish + past perfect"},
  {src:"The manager insisted that all staff attend the meeting.",kw:"MADE",ans:"the manager made it compulsory for all staff to attend",hint:"make it compulsory"},
  {src:"They say the castle was built in the fourteenth century.",kw:"SAID",ans:"the castle is said to have been built in the fourteenth century",hint:"is said to have been"},
  {src:"He only realized his mistake when he checked the figures.",kw:"DID",ans:"only when he checked the figures did he realize his mistake",hint:"inversion with only"},
  {src:"She was so persuasive that we all agreed to her plan.",kw:"SUCH",ans:"she was such a persuasive person that we all agreed",hint:"such + noun phrase"}
]},
// Ex 5 - Reading MC
{type:"mc",tl:"Reading",title:"Part 5 - Multiple Choice",ins:"Choose the best answer (A-D).",
passage:"The phenomenon known as cognitive dissonance, first described by Leon Festinger in 1957, remains one of the most influential concepts in social psychology. At its core, the theory proposes that individuals experience psychological discomfort when they hold two or more contradictory beliefs, values, or attitudes simultaneously. This discomfort, Festinger argued, motivates people to reduce the inconsistency, often through rationalisation or selective attention to information that supports their existing views.\n\nThe classic illustration of cognitive dissonance emerged from Festinger\\u0027s own observational study of a doomsday cult. When the predicted apocalypse failed to materialise, rather than abandoning their beliefs, cult members intensified their commitment, claiming that their faith had saved the world. This counterintuitive response perfectly encapsulated Festinger\\u0027s theory: when confronted with evidence that contradicts deeply held beliefs, people are more likely to reinterpret the evidence than to change their minds.\n\nSubsequent research has expanded the theory considerably. Elliot Aronson refined the concept by arguing that dissonance is most acute when behaviour threatens a person\\u0027s self-concept. According to Aronson, we are not troubled by just any inconsistency, but rather by actions that challenge our view of ourselves as competent, moral, and rational beings. This refinement helped explain why people who consider themselves honest experience particularly acute discomfort when caught in a lie.\n\nMore recently, neuroscience has begun to illuminate the biological underpinnings of dissonance. Brain imaging studies have revealed increased activity in the anterior cingulate cortex and the insula during episodes of cognitive conflict, regions associated with error detection and emotional processing respectively. These findings suggest that the discomfort described by Festinger is not merely metaphorical but corresponds to measurable physiological arousal.\n\nCritics of the theory have raised several objections. Some argue that many apparent instances of dissonance reduction can be better explained by self-perception theory, which holds that people infer their attitudes from observing their own behaviour rather than experiencing internal conflict. Others have questioned whether the phenomenon is truly universal, noting that research has been disproportionately conducted on Western, educated populations. Cross-cultural studies have yielded mixed results, with some suggesting that individuals from collectivist cultures may experience dissonance differently, or in response to different triggers.\n\nDespite these criticisms, cognitive dissonance remains a remarkably robust and generative framework. Its applications extend far beyond the laboratory, informing our understanding of everything from consumer behaviour and political polarisation to therapeutic interventions for addiction and anxiety.",
items:[
  {q:"What does the writer suggest about the cult members in paragraph 2?",opts:["They were irrational in their original beliefs.","Their response was consistent with Festinger\\u0027s predictions.","They eventually accepted that their prediction was wrong.","They were psychologically damaged by the experience."],ans:1},
  {q:"According to Aronson\\u0027s refinement, dissonance is strongest when",opts:["people hold mutually exclusive beliefs.","behaviour conflicts with one\\u0027s self-image.","individuals lack the ability to rationalise.","external evidence overwhelms internal beliefs."],ans:1},
  {q:"The neuroscience research mentioned in paragraph 4 demonstrates that",opts:["cognitive dissonance is purely an emotional phenomenon.","Festinger\\u0027s original theory was fundamentally flawed.","the experience of dissonance has a physical dimension.","brain imaging can predict when dissonance will occur."],ans:2},
  {q:"What criticism of the theory is mentioned in paragraph 5?",opts:["The theory cannot be tested under laboratory conditions.","Festinger\\u0027s methodology was not sufficiently rigorous.","Alternative theories may explain the same observations.","The theory has limited practical applications."],ans:2},
  {q:"The phrase \\u0027disproportionately conducted\\u0027 in paragraph 5 implies that",opts:["the research has been too expensive to replicate widely.","most studies have focused on a narrow demographic.","researchers have deliberately excluded certain groups.","the methodology has been applied inconsistently."],ans:1},
  {q:"What is the writer\\u0027s overall attitude toward cognitive dissonance theory?",opts:["Wholly uncritical and enthusiastic.","Cautiously positive despite acknowledged limitations.","Sceptical of its continued relevance.","Neutral, presenting arguments without personal judgement."],ans:1}
]},
// Ex 6 - Listening Part 1
{type:"mc",tl:"Listening",title:"Part 1 - Short Extracts",ins:"Listen and choose the correct answer.",
items:[
  {audio:"Extract 1: Woman: I was quite taken aback when they announced the restructuring. I mean, there had been rumours for months, but I suppose I never thought it would actually affect our department. Man: I know what you mean. I had mixed feelings myself. On the one hand, the old system was clearly not working, but on the other, there was something reassuring about its predictability.",q:"What was the woman\\u0027s initial reaction to the restructuring?",opts:["She had anticipated the changes.","She was surprised it impacted her team.","She felt the changes were overdue.","She was relieved the rumours were true."],ans:1},
  {audio:"Extract 1 (continued): Woman: What bothers me most is the lack of consultation. They just presented it as a fait accompli. Man: That\\u0027s a fair point. Though I have to say, the new structure does make more sense on paper at least.",q:"What does the man think about the new structure?",opts:["He is entirely opposed to it.","He believes it was well communicated.","He sees theoretical merit in it.","He thinks it will fail in practice."],ans:2},
  {audio:"Extract 2: Man: The exhibition was a revelation, frankly. I went in expecting the usual crowd-pleasing retrospective, but what they\\u0027ve done is really challenge the received narrative around her later work. Woman: I felt the same. The way they juxtaposed early sketches with the final canvases was particularly effective. It stripped away all the mythology and let you see the genuine evolution of her technique.",q:"What surprised the man about the exhibition?",opts:["The size of the collection on display.","The unconventional approach to the artist\\u0027s work.","The number of previously unseen works.","The focus on the artist\\u0027s personal life."],ans:1},
  {audio:"Extract 2 (continued): Woman: My one reservation was the audio guide. It assumed quite a lot of prior knowledge. Man: Oh, I didn\\u0027t bother with that. I just let the paintings speak for themselves.",q:"What was the woman\\u0027s criticism?",opts:["The exhibition was poorly organised.","The audio guide was too basic.","The audio guide was not accessible to all visitors.","The paintings were not well lit."],ans:2},
  {audio:"Extract 3: Woman: I\\u0027ve been looking into the new co-working spaces that have opened up on the high street, and honestly, the value proposition is quite compelling. For freelancers especially, the isolation of working from home can really take its toll. Man: I can see the appeal, but I wonder about the practicalities. Noise levels, for instance, or the lack of truly private meeting spaces.",q:"What is the woman\\u0027s view of co-working spaces?",opts:["They are overpriced for what they offer.","They provide a worthwhile alternative to home working.","They are only suitable for large teams.","They are a passing trend with limited appeal."],ans:1},
  {audio:"Extract 3 (continued): Man: I suppose it depends on the kind of work you do. If you need deep concentration, they might not be ideal. Woman: That\\u0027s true, but most of them now offer quiet zones and bookable rooms. It\\u0027s not the free-for-all it used to be.",q:"How does the woman respond to the man\\u0027s concern?",opts:["She dismisses it as irrelevant.","She agrees that co-working spaces are too noisy.","She points out that the facilities have improved.","She suggests that freelancers should work in cafes instead."],ans:2}
]},
// Ex 7 - Listening Part 2
{type:"fl",tl:"Listening",title:"Part 2 - Sentence Completion",ins:"Complete the sentences with a word or short phrase.",
audio:"Good morning, everyone. Today I want to talk about what\\u0027s known as the urban heat island effect, a phenomenon that has increasingly significant implications for city planning and public health. In essence, urban areas tend to be considerably warmer than surrounding rural regions, sometimes by as much as five degrees Celsius. The primary cause of this temperature differential is the replacement of natural land cover with dense concentrations of pavement, buildings, and other surfaces that absorb and retain heat. Concrete and asphalt, in particular, have very low albedo values, meaning they reflect very little of the incoming solar radiation. Instead, they store the energy and release it gradually, especially at night, which prevents the kind of cooling that occurs naturally in less developed areas. Vegetation plays a crucial role here. Trees and green spaces provide shade, and through a process called evapotranspiration, they effectively cool the surrounding air. When you remove vegetation and replace it with impervious surfaces, you eliminate both of these cooling mechanisms simultaneously. Another major contributor is waste heat generated by vehicles, air conditioning units, and industrial processes. In a densely populated city, this anthropogenic heat output can be substantial. The health implications are serious. Prolonged exposure to elevated temperatures increases the risk of heat exhaustion, cardiovascular stress, and respiratory problems. Vulnerable populations, particularly the elderly and those with pre-existing conditions, face the greatest danger. Several cities have begun implementing mitigation strategies with promising results. Singapore, for instance, has invested heavily in vertical gardens and green rooftops, which have measurably reduced surface temperatures in treated areas. Chicago pioneered the use of reflective roofing materials, and Melbourne has committed to doubling its tree canopy coverage by 2040. The challenge, of course, is that retrofitting existing urban infrastructure is enormously expensive, and the benefits, while real, tend to accrue gradually over decades rather than yielding immediate returns.",
items:[
  {pre:"Urban areas can be warmer than rural areas by up to",gap:"five degrees Celsius",post:"."},
  {pre:"Concrete and asphalt have very low",gap:"albedo values",post:", which means they absorb most solar radiation."},
  {pre:"Trees cool the surrounding air through a process called",gap:"evapotranspiration",post:"."},
  {pre:"When vegetation is replaced by impervious surfaces, two natural",gap:"cooling mechanisms",post:"are eliminated."},
  {pre:"In densely populated cities, waste heat from vehicles and industry is described as",gap:"anthropogenic heat",post:"output."},
  {pre:"The populations most at risk from the heat island effect are the elderly and those with",gap:"pre-existing conditions",post:"."},
  {pre:"Singapore has invested in vertical gardens and",gap:"green rooftops",post:"to reduce surface temperatures."},
  {pre:"Melbourne plans to double its",gap:"tree canopy coverage",post:"by 2040."}
]},
// Ex 8 - Writing
{type:"wr",tl:"Writing",title:"Part 1 - Essay",ins:"Write your essay (220-260 words).",
prompt:"Your class has watched a documentary about the factors that contribute to creativity. You have made the notes below.\n\nFactors contributing to creativity:\n- education and training\n- environment and surroundings\n- personal motivation\n\nSome opinions expressed in the documentary:\n\"Schools often kill creativity by focusing on standardised testing.\"\n\"Working in a stimulating environment with diverse people sparks new ideas.\"\n\"Without inner drive, even the most talented individuals produce nothing of value.\"\n\nWrite an essay discussing two of the factors listed above, explaining which you think has the greater influence on creativity. You should use your own words as far as possible.",minWords:220}
]},
// ===== TEST 2 =====
{t:"Practice Test 2",exercises:[
// Ex 1 - MC Cloze
{type:"mc",tl:"Use of English",title:"Part 1 - Multiple-choice Cloze",ins:"Choose the correct word (A-D) for each gap.",
passage:"The rise of artificial intelligence has (1)_____ profound questions about the future of human labour. While some commentators have painted a (2)_____ picture of mass unemployment, others argue that technological disruption has always (3)_____ rise to new forms of work. History lends (4)_____ to this more optimistic view: the Industrial Revolution, for instance, ultimately created far more jobs than it destroyed, even though the transition was painful. What is (5)_____ about the current wave of automation, however, is the speed at which it is unfolding. Previous transformations played out over generations, allowing societies to adapt gradually. Today, entire industries can be (6)_____ obsolete within a decade. Governments face the (7)_____ task of retraining millions of workers whose skills may no longer be in demand. The stakes could hardly be higher, and the need for thoughtful, forward-looking policy has never been more (8)_____.",
items:[
  {q:"Gap 1",opts:["posed","raised","put","set"],ans:1},
  {q:"Gap 2",opts:["bleak","dim","faint","dull"],ans:0},
  {q:"Gap 3",opts:["given","taken","made","brought"],ans:0},
  {q:"Gap 4",opts:["weight","support","backing","credence"],ans:1},
  {q:"Gap 5",opts:["remarkable","distinctive","notable","peculiar"],ans:1},
  {q:"Gap 6",opts:["turned","rendered","made","declared"],ans:1},
  {q:"Gap 7",opts:["demanding","daunting","gruelling","strenuous"],ans:1},
  {q:"Gap 8",opts:["pressing","forceful","compelling","insistent"],ans:0}
]},
// Ex 2 - Open Cloze
{type:"fl",tl:"Use of English",title:"Part 2 - Open Cloze",ins:"Write the word which best fits each gap.",
items:[
  {pre:"Only after the investigation had concluded",gap:"did",post:"the full extent of the damage become apparent."},
  {pre:"The building, which dates",gap:"back",post:"to the sixteenth century, has been extensively renovated."},
  {pre:"She takes great pride",gap:"in",post:"her ability to resolve conflicts diplomatically."},
  {pre:"Regardless",gap:"of",post:"how talented an individual may be, success requires sustained effort."},
  {pre:"It",gap:"being",post:"a public holiday, most shops in the centre were closed."},
  {pre:"Were it not",gap:"for",post:"his quick thinking, the situation could have escalated dramatically."},
  {pre:"The report makes",gap:"no",post:"mention of the environmental impact of the proposed development."},
  {pre:"Much",gap:"as",post:"I admire her dedication, I cannot agree with her methods."}
]},
// Ex 3 - Word Formation
{type:"wf",tl:"Use of English",title:"Part 3 - Word Formation",ins:"Use the word given to form a word that fits the gap.",
items:[
  {pre:"The",root:"PROCEED",gap:"proceedings",post:"were disrupted by a series of unexpected objections from the defence."},
  {pre:"His",root:"RELUCT",gap:"reluctance",post:"to engage with the media only fuelled further speculation."},
  {pre:"The study highlights the",root:"SIGNIFY",gap:"significance",post:"of early childhood nutrition on long-term cognitive development."},
  {pre:"The charity provides",root:"PRICE",gap:"priceless",post:"support to families affected by the crisis."},
  {pre:"The new policy has been",root:"WHOLE",gap:"wholeheartedly",post:"endorsed by the majority of the workforce."},
  {pre:"Critics have described the proposal as",root:"WORK",gap:"unworkable",post:"given the current budgetary constraints."},
  {pre:"Her",root:"FORGE",gap:"unforgettable",post:"performance in the lead role earned her a standing ovation."},
  {pre:"The",root:"SHORT",gap:"shortcomings",post:"of the existing system were exposed during the recent audit."}
]},
// Ex 4 - Key Word Transformations
{type:"kt",tl:"Use of English",title:"Part 4 - Key Word Transformations",ins:"Use 3-6 words including the word given.",
items:[
  {src:"\\u0027I\\u0027m sorry I didn\\u0027t tell you sooner,\\u0027 she said.",kw:"APOLOGISED",ans:"she apologised for not telling him sooner",hint:"apologise for + gerund"},
  {src:"People believe the fire started in the basement.",kw:"BELIEVED",ans:"the fire is believed to have started in the basement",hint:"is believed to have"},
  {src:"The concert was so good that everyone stood up and clapped.",kw:"SUCH",ans:"it was such a good concert that everyone stood up",hint:"such + noun phrase"},
  {src:"If it hadn\\u0027t rained, we would have gone to the beach.",kw:"BUT",ans:"but for the rain we would have gone to the beach",hint:"but for + noun"},
  {src:"He didn\\u0027t realise how difficult the exam would be.",kw:"LITTLE",ans:"little did he realise how difficult the exam would be",hint:"inversion with little"},
  {src:"They have been working on the bridge for two years.",kw:"UNDER",ans:"the bridge has been under construction for two years",hint:"under construction"}
]},
// Ex 5 - Reading MC
{type:"mc",tl:"Reading",title:"Part 5 - Multiple Choice",ins:"Choose the best answer (A-D).",
passage:"Language, far from being a transparent window onto thought, actively shapes the way we perceive and categorise the world around us. This is the central claim of linguistic relativity, a hypothesis most commonly associated with the American linguists Edward Sapir and Benjamin Lee Whorf. In its strongest form, the Sapir-Whorf hypothesis holds that the structure of a language determines the cognitive processes of its speakers. A weaker version, which has gained considerably more traction among contemporary researchers, suggests that language merely influences, rather than determines, habitual thought patterns.\n\nOne of the most frequently cited examples concerns colour perception. Russian speakers, who have separate basic terms for light blue (goluboy) and dark blue (siniy), have been shown in laboratory experiments to distinguish between shades of blue more rapidly than English speakers, for whom both shades fall under the single category of blue. Similarly, the Pirah people of the Brazilian Amazon, whose language reportedly lacks precise number words, appear to have difficulty with exact quantity matching tasks, though this finding remains controversial.\n\nTime is another domain where linguistic framing appears to matter. English speakers tend to conceptualise time as a horizontal continuum, typically running from left to right. Mandarin speakers, by contrast, more frequently employ vertical metaphors, with earlier events described as being above later ones. Lera Boroditsky\\u0027s experiments have demonstrated that these metaphorical habits influence performance on non-linguistic temporal reasoning tasks, suggesting that the effects of language extend beyond mere speech into deeper cognitive processing.\n\nSpatial reasoning offers further compelling evidence. Speakers of Guugu Yimithirr, an Australian Aboriginal language, use absolute cardinal directions rather than relative terms like left and right. As a result, they maintain an extraordinary awareness of their orientation at all times, a skill that speakers of languages reliant on relative spatial terms typically lack.\n\nCritics of linguistic relativity have countered that many of these effects are small, context-dependent, and reversible. They argue that the underlying cognitive architecture is universal and that language provides merely a superficial overlay. Steven Pinker, perhaps the most vocal critic, has argued forcefully that thought exists independently of language, pointing to the existence of pre-linguistic thought in infants and the capacity for abstract reasoning in individuals with severe language impairments.\n\nNevertheless, the accumulated evidence from cross-linguistic studies is difficult to dismiss entirely. Even if language does not erect impenetrable walls around thought, it does appear to create well-worn pathways that guide habitual cognition in subtle but measurable ways.",
items:[
  {q:"What does the writer say about the strong version of the Sapir-Whorf hypothesis?",opts:["It has been conclusively disproven.","It is less widely accepted than the weak version.","It is supported by the majority of recent research.","It was proposed as a modification of the weak version."],ans:1},
  {q:"Why is the example of Russian colour terms significant?",opts:["It proves that language determines perception.","It suggests that linguistic categories can affect cognitive speed.","It demonstrates that Russian has a richer vocabulary than English.","It shows that colour perception is entirely culturally determined."],ans:1},
  {q:"According to the passage, Boroditsky\\u0027s research indicates that",opts:["Mandarin speakers cannot understand horizontal time metaphors.","linguistic metaphors can influence non-verbal cognitive tasks.","English speakers are better at temporal reasoning than Mandarin speakers.","vertical time metaphors are more natural than horizontal ones."],ans:1},
  {q:"The example of Guugu Yimithirr speakers illustrates that",opts:["all languages should adopt absolute directional systems.","spatial language can shape everyday navigational abilities.","Aboriginal languages are more complex than European languages.","relative spatial terms are inherently less precise."],ans:1},
  {q:"Steven Pinker\\u0027s position is that",opts:["language has no effect whatsoever on cognition.","linguistic relativity is a dangerous political idea.","thinking is fundamentally independent of linguistic structure.","infants are unable to engage in meaningful thought."],ans:2},
  {q:"The writer\\u0027s conclusion suggests that language",opts:["creates absolute barriers to understanding across cultures.","has a modest but genuine influence on habitual thought.","is irrelevant to the way people think.","should be reformed to remove cognitive biases."],ans:1}
]},
// Ex 6 - Listening Part 1
{type:"mc",tl:"Listening",title:"Part 1 - Short Extracts",ins:"Listen and choose the correct answer.",
items:[
  {audio:"Extract 1: Man: I\\u0027ve been following the debate about remote work with some interest. My concern is that people romanticise the flexibility without acknowledging the downsides. Woman: Such as? Man: Well, career progression, for one. If you\\u0027re not visible in the office, you\\u0027re easily overlooked when promotions come around. And then there\\u0027s the erosion of team cohesion. You can\\u0027t replicate the spontaneous exchanges that happen in a shared physical space.",q:"What is the man\\u0027s main concern about remote work?",opts:["It leads to lower productivity.","It may harm employees\\u0027 career development.","It is not suitable for all industries.","It places too much pressure on managers."],ans:1},
  {audio:"Extract 1 (continued): Woman: I take your point, but studies consistently show that remote workers report higher job satisfaction. Surely that counts for something. Man: It does, but satisfaction and progression aren\\u0027t the same thing.",q:"How does the man respond to the woman\\u0027s argument?",opts:["He dismisses the studies as unreliable.","He agrees that satisfaction is the most important factor.","He draws a distinction between two different outcomes.","He suggests that remote workers are less committed."],ans:2},
  {audio:"Extract 2: Woman: What struck me about the documentary was how little we actually know about deep-sea ecosystems. We\\u0027ve mapped the surface of Mars more thoroughly than our own ocean floors. Man: That\\u0027s a staggering thought, isn\\u0027t it? And the implications for biodiversity are enormous. There could be thousands of species down there that we\\u0027ve never even catalogued.",q:"What does the woman find remarkable?",opts:["The technological advances in deep-sea exploration.","The extent of our ignorance about the deep ocean.","The number of new species recently discovered.","The cost of deep-sea research expeditions."],ans:1},
  {audio:"Extract 2 (continued): Man: The funding issue is what really frustrates me. Space exploration captures the public imagination, so the money flows. Ocean research just doesn\\u0027t have the same glamour. Woman: Which is ironic, given that the ocean directly affects our climate and food supply.",q:"Why is the man frustrated?",opts:["Deep-sea research receives insufficient funding.","Scientists are not interested in ocean exploration.","The documentary was poorly made.","Climate research is being neglected."],ans:0},
  {audio:"Extract 3: Man: I\\u0027ve just finished reading her latest novel, and I have to say, it\\u0027s a departure from her earlier work. The prose is much more restrained, almost austere. Woman: I noticed that too. Some reviewers called it cold, but I thought it was deliberate. She\\u0027s stripping away the ornamentation to let the story breathe.",q:"What do both speakers agree about the novel?",opts:["It is the author\\u0027s best work to date.","It represents a change in the author\\u0027s style.","It has received universally positive reviews.","It is too short to be fully satisfying."],ans:1},
  {audio:"Extract 3 (continued): Woman: What I found most compelling was the ambiguity of the ending. She refuses to tie everything up neatly, which I think takes real courage. Man: I can see that, though personally I found it slightly unsatisfying. I suppose I\\u0027m a traditionalist at heart.",q:"How does the man feel about the ending?",opts:["He found it confusing and poorly written.","He admires the author\\u0027s courage.","He would have preferred a more conventional resolution.","He thinks it was the strongest part of the book."],ans:2}
]},
// Ex 7 - Listening Part 2
{type:"fl",tl:"Listening",title:"Part 2 - Sentence Completion",ins:"Complete the sentences with a word or short phrase.",
audio:"Thank you for joining me today. I want to explore the psychology of decision-making, specifically the ways in which our brains take shortcuts that can lead us astray. These mental shortcuts are known as cognitive biases, and they affect everyone, regardless of intelligence or education. Perhaps the most pervasive is confirmation bias, our tendency to seek out and favour information that confirms what we already believe. This is particularly dangerous in the age of social media, where algorithms actively curate content that aligns with our existing preferences, effectively creating echo chambers. Then there is the anchoring effect. When making numerical estimates, we are disproportionately influenced by the first piece of information we encounter, even if it is entirely arbitrary. In one famous experiment, participants who were asked whether Gandhi was older or younger than 140 when he died subsequently gave higher estimates of his actual age than those anchored to a more reasonable number. The sunk cost fallacy is another powerful bias. This is the tendency to continue investing in a failing course of action simply because we have already invested time, money, or effort. Rationally, past costs should be irrelevant to future decisions, but emotionally, we find it extraordinarily difficult to cut our losses. Loss aversion, closely related to this, describes our tendency to feel losses roughly twice as intensely as equivalent gains. This asymmetry profoundly influences financial behaviour, leading investors to hold on to losing stocks far too long while selling winners prematurely. The availability heuristic causes us to overestimate the likelihood of events that come easily to mind, often because they are recent, vivid, or emotionally charged. This explains why people tend to overestimate the risk of dramatic events like plane crashes while underestimating mundane but statistically far more dangerous activities like driving.",
items:[
  {pre:"The mental shortcuts that lead to errors in judgement are called",gap:"cognitive biases",post:"."},
  {pre:"Confirmation bias is especially dangerous because social media algorithms create",gap:"echo chambers",post:"."},
  {pre:"The anchoring effect shows that we are heavily influenced by the first piece of",gap:"information",post:"we encounter."},
  {pre:"The sunk cost fallacy makes people continue investing in a",gap:"failing course of action",post:"because of prior investment."},
  {pre:"According to the speaker, past costs should be",gap:"irrelevant",post:"to future decisions."},
  {pre:"Loss aversion means we feel losses roughly",gap:"twice as intensely",post:"as equivalent gains."},
  {pre:"Due to loss aversion, investors hold on to losing stocks while selling",gap:"winners prematurely",post:"."},
  {pre:"The availability heuristic causes us to overestimate the likelihood of events that are recent, vivid, or",gap:"emotionally charged",post:"."}
]},
// Ex 8 - Writing
{type:"wr",tl:"Writing",title:"Part 1 - Essay",ins:"Write your essay (220-260 words).",
prompt:"Your class has been discussing the impact of technology on interpersonal relationships. You have made the notes below.\n\nWays technology affects relationships:\n- social media and communication\n- online dating\n- screen time and family life\n\nSome opinions expressed in the discussion:\n\"Social media keeps us connected with people we would otherwise lose touch with.\"\n\"Online dating has fundamentally changed how people form romantic partnerships.\"\n\"Excessive screen time is eroding the quality of face-to-face family interactions.\"\n\nWrite an essay discussing two of the points listed above, explaining which you think has a more significant impact on relationships. You should use your own words as far as possible.",minWords:220}
]},
// ===== TEST 3 =====
{t:"Practice Test 3",exercises:[
// Ex 1 - MC Cloze
{type:"mc",tl:"Use of English",title:"Part 1 - Multiple-choice Cloze",ins:"Choose the correct word (A-D) for each gap.",
passage:"The concept of rewilding, which (1)_____ returning degraded landscapes to their natural state, has gained considerable (2)_____ in conservation circles over the past two decades. Proponents argue that by reintroducing keystone species such as wolves, beavers, and lynx, it is possible to (3)_____ off a cascade of ecological benefits. In Yellowstone National Park, for example, the reintroduction of wolves in 1995 (4)_____ in a remarkable transformation of the entire ecosystem. The wolves kept elk populations in (5)_____, which allowed overgrazed vegetation to recover, which in turn stabilised riverbanks and created habitats for countless other species. Critics, however, (6)_____ out that rewilding projects can have unintended consequences, particularly when they (7)_____ with the livelihoods of local farming communities. Striking a balance between ecological ambition and practical reality remains one of the most (8)_____ challenges in modern conservation.",
items:[
  {q:"Gap 1",opts:["implies","entails","involves","contains"],ans:1},
  {q:"Gap 2",opts:["traction","friction","attraction","extraction"],ans:0},
  {q:"Gap 3",opts:["set","trigger","spark","launch"],ans:0},
  {q:"Gap 4",opts:["concluded","resulted","culminated","ended"],ans:1},
  {q:"Gap 5",opts:["order","line","control","check"],ans:3},
  {q:"Gap 6",opts:["bring","point","single","pick"],ans:1},
  {q:"Gap 7",opts:["collide","conflict","clash","compete"],ans:1},
  {q:"Gap 8",opts:["pressing","heavy","fierce","harsh"],ans:0}
]},
// Ex 2 - Open Cloze
{type:"fl",tl:"Use of English",title:"Part 2 - Open Cloze",ins:"Write the word which best fits each gap.",
items:[
  {pre:"Not only did the storm cause widespread damage,",gap:"but",post:"it also disrupted transport networks across the entire region."},
  {pre:"The scheme was scrapped on the",gap:"grounds",post:"that it would be too costly to implement."},
  {pre:"He prides himself",gap:"on",post:"never having missed a deadline in twenty years of professional work."},
  {pre:"Little",gap:"did",post:"the researchers suspect that their findings would spark such a fierce debate."},
  {pre:"The museum is well worth",gap:"a",post:"visit if you have any interest in maritime history."},
  {pre:"It was",gap:"not",post:"until the final chapter that the true significance of the opening scene became clear."},
  {pre:"The town has changed beyond all",gap:"recognition",post:"since the new development was completed."},
  {pre:"She spoke with such conviction",gap:"that",post:"even her most sceptical colleagues were persuaded."}
]},
// Ex 3 - Word Formation
{type:"wf",tl:"Use of English",title:"Part 3 - Word Formation",ins:"Use the word given to form a word that fits the gap.",
items:[
  {pre:"The",root:"DESTROY",gap:"destruction",post:"of vast areas of rainforest continues to accelerate at an alarming rate."},
  {pre:"Many consumers remain",root:"SUSPECT",gap:"suspicious",post:"of claims made by companies about the environmental credentials of their products."},
  {pre:"The government\\u0027s",root:"RESPOND",gap:"responsiveness",post:"to public concerns has been widely criticised."},
  {pre:"There has been a",root:"NOTICE",gap:"noticeable",post:"decline in the number of students choosing to study modern languages."},
  {pre:"The journalist\\u0027s",root:"COVER",gap:"uncovering",post:"of the scandal led to several high-profile resignations."},
  {pre:"His approach was characterised by a",root:"REMARK",gap:"remarkable",post:"lack of attention to detail."},
  {pre:"The",root:"LONG",gap:"prolonged",post:"drought had a devastating impact on agricultural output."},
  {pre:"It is",root:"ADVISE",gap:"inadvisable",post:"to make major financial decisions without seeking professional guidance."}
]},
// Ex 4 - Key Word Transformations
{type:"kt",tl:"Use of English",title:"Part 4 - Key Word Transformations",ins:"Use 3-6 words including the word given.",
items:[
  {src:"The last time I saw her was at the conference in March.",kw:"SINCE",ans:"I have not seen her since the conference in March",hint:"present perfect + since"},
  {src:"They cancelled the event because of the bad weather.",kw:"CALLED",ans:"the event was called off because of the bad weather",hint:"call off = cancel"},
  {src:"\\u0027You should apply for the scholarship,\\u0027 my tutor said to me.",kw:"ENCOURAGED",ans:"my tutor encouraged me to apply for the scholarship",hint:"encourage someone to do"},
  {src:"I\\u0027m sure he didn\\u0027t do it on purpose.",kw:"HAVE",ans:"he cannot have done it on purpose",hint:"cannot have + past participle"},
  {src:"She started learning Japanese three years ago.",kw:"BEEN",ans:"she has been learning Japanese for three years",hint:"present perfect continuous"},
  {src:"Without your help, we would never have finished on time.",kw:"HAD",ans:"had it not been for your help we would never have finished",hint:"inversion with had"}
]},
// Ex 5 - Reading MC
{type:"mc",tl:"Reading",title:"Part 5 - Multiple Choice",ins:"Choose the best answer (A-D).",
passage:"The architecture of sleep, as neuroscientists now understand it, is far more complex and purposeful than was once believed. Rather than representing a simple state of unconsciousness, sleep consists of multiple distinct stages, each performing specific biological functions that are essential to physical health, emotional regulation, and cognitive performance.\n\nThe sleep cycle alternates between two fundamentally different types of sleep: non-rapid eye movement (NREM) and rapid eye movement (REM). NREM sleep is itself divided into three stages of progressively deeper sleep. During the deepest stage, known as slow-wave sleep, the brain produces large, rhythmic delta waves. It is during this phase that the body undertakes its most intensive repair work, releasing growth hormones, strengthening the immune system, and consolidating declarative memories, the kind of factual knowledge we acquire through study and experience.\n\nREM sleep, by contrast, is characterised by intense brain activity that closely resembles waking consciousness. It is during REM sleep that we experience our most vivid dreams, and neuroscientists believe this stage plays a critical role in emotional processing and the consolidation of procedural memories, the motor skills and habitual behaviours that we perform automatically. Matthew Walker, a prominent sleep researcher at the University of California, Berkeley, has argued that REM sleep functions as a form of overnight therapy, stripping the emotional charge from difficult experiences and integrating them into our broader autobiographical narrative.\n\nThe consequences of sleep deprivation are both profound and wide-ranging. Even modest reductions in sleep duration, losing just one or two hours per night over a sustained period, can impair attention, decision-making, and emotional stability. Chronic sleep deprivation has been linked to increased risk of cardiovascular disease, diabetes, obesity, and depression. Perhaps most alarmingly, Walker\\u0027s research suggests that there is no mechanism for recovering lost sleep: the damage, once done, cannot be fully reversed by sleeping longer on subsequent nights.\n\nDespite this growing body of evidence, modern societies continue to undervalue sleep. The culture of overwork that pervades many professional environments treats sleep deprivation almost as a badge of honour, and technological devices, with their blue light emissions and addictive content, increasingly encroach upon the hours that should be devoted to rest.\n\nRecent policy responses have begun to address the problem. Several countries have introduced later school start times for adolescents, recognising that the teenage biological clock naturally shifts toward later sleep and wake times. Some corporations have experimented with nap pods and flexible schedules, though such initiatives remain the exception rather than the rule.",
items:[
  {q:"According to the passage, slow-wave sleep is important because it",opts:["produces the most vivid and memorable dreams.","is the stage when the brain is least active.","enables physical repair and factual memory consolidation.","helps regulate the body\\u0027s circadian rhythm."],ans:2},
  {q:"Matthew Walker\\u0027s view of REM sleep is that it",opts:["is less important than NREM sleep for overall health.","serves a therapeutic function by processing emotions.","should be artificially extended through medication.","is only necessary during periods of high stress."],ans:1},
  {q:"The writer\\u0027s use of the phrase \\u0027badge of honour\\u0027 suggests that",opts:["sleep deprivation is genuinely admirable.","some workplace cultures wrongly glorify lack of sleep.","professionals who sleep less are more productive.","there is a growing awareness of the need for sleep."],ans:1},
  {q:"What does the passage suggest about recovering lost sleep?",opts:["It is possible but requires extended periods of rest.","It can be achieved through short naps during the day.","The body naturally compensates over time.","The damage from sleep deprivation may be permanent."],ans:3},
  {q:"Why have some countries changed school start times?",opts:["Teachers complained about early morning classes.","Research shows teenagers have different sleep patterns.","Students were arriving late to school too frequently.","Parents lobbied for changes to the school timetable."],ans:1},
  {q:"What is the writer\\u0027s overall purpose in this passage?",opts:["To promote a specific sleep improvement programme.","To criticise neuroscientists for overstating the risks.","To highlight the importance and neglect of sleep.","To compare different cultural attitudes to sleep."],ans:2}
]},
// Ex 6 - Listening Part 1
{type:"mc",tl:"Listening",title:"Part 1 - Short Extracts",ins:"Listen and choose the correct answer.",
items:[
  {audio:"Extract 1: Woman: I\\u0027ve been thinking about switching to a plant-based diet, but I\\u0027m not sure I could give up cheese entirely. Man: You don\\u0027t have to be all or nothing about it. Even reducing your animal product consumption by fifty percent makes a significant environmental difference. Woman: That\\u0027s a more realistic approach, I suppose. It\\u0027s the absolutism that puts people off.",q:"What does the man suggest about dietary change?",opts:["People should eliminate all animal products immediately.","Partial reduction is still meaningful.","The environmental benefits are overstated.","Cheese is the most environmentally damaging food."],ans:1},
  {audio:"Extract 1 (continued): Man: The research is pretty clear on that. And from a health perspective, even small shifts toward more plant-based meals can lower cholesterol and blood pressure. Woman: I just worry about getting enough protein. Man: That\\u0027s a common concern, but it\\u0027s largely a myth. Legumes, nuts, and grains provide more than adequate protein for most people.",q:"How does the man respond to the woman\\u0027s worry about protein?",opts:["He acknowledges it as a genuine difficulty.","He recommends she take supplements.","He reassures her that plant sources are sufficient.","He suggests she consult a nutritionist."],ans:2},
  {audio:"Extract 2: Man: The new public transport system has been a disaster, frankly. The timetables are unreliable, the app crashes constantly, and the fares have gone up by nearly twenty percent. Woman: I agree it\\u0027s been poorly rolled out, but the underlying infrastructure is sound. Once they sort out the software issues, I think it\\u0027ll be a genuine improvement on what we had before.",q:"What is the woman\\u0027s overall view of the new transport system?",opts:["It is fundamentally flawed and should be scrapped.","It has potential despite its current problems.","It is already better than the previous system.","It will never live up to the original promises."],ans:1},
  {audio:"Extract 2 (continued): Man: You\\u0027re more patient than I am. I\\u0027ve already gone back to driving. Woman: Which is exactly what the city planners were trying to avoid. If everyone gives up on public transport at the first hurdle, we\\u0027ll never reduce congestion.",q:"What point does the woman make about the man\\u0027s decision?",opts:["She thinks he is being sensible.","She believes driving is sometimes necessary.","She argues it undermines the system\\u0027s goals.","She is indifferent to his choice."],ans:2},
  {audio:"Extract 3: Woman: I attended a lecture last week on the ethics of facial recognition technology, and it really opened my eyes. The speaker argued that the technology is being deployed far faster than the legal frameworks designed to regulate it. Man: That doesn\\u0027t surprise me at all. We\\u0027ve seen the same pattern with social media and data privacy. The technology comes first, and the regulation lags years behind.",q:"What does the man suggest about technological regulation?",opts:["Governments are quick to respond to new technologies.","The pattern of delayed regulation is a recurring problem.","Facial recognition is the most dangerous technology.","Legal frameworks are currently adequate."],ans:1},
  {audio:"Extract 3 (continued): Woman: What worried me most was the evidence of racial bias in the algorithms. The error rates are significantly higher for people of colour. Man: And yet it\\u0027s being used in law enforcement contexts where accuracy is critical. That\\u0027s deeply troubling.",q:"What concerns the woman about facial recognition?",opts:["It is too expensive to implement properly.","The technology is not accurate enough in general.","It produces unequal outcomes for different racial groups.","Law enforcement agencies refuse to adopt it."],ans:2}
]},
// Ex 7 - Listening Part 2
{type:"fl",tl:"Listening",title:"Part 2 - Sentence Completion",ins:"Complete the sentences with a word or short phrase.",
audio:"Welcome, everyone. Today I\\u0027d like to examine the concept of neuroplasticity, which refers to the brain\\u0027s remarkable ability to reorganise itself by forming new neural connections throughout life. For decades, the prevailing view in neuroscience was that the adult brain was essentially fixed, that it had a critical period of development in childhood after which its structure was largely set in stone. This dogma began to crumble in the 1990s, sometimes referred to as the decade of the brain, when a series of groundbreaking studies demonstrated that significant structural changes could occur well into adulthood. One of the most famous examples comes from research on London taxi drivers conducted by Eleanor Maguire at University College London. Maguire used brain imaging to show that the hippocampus, the brain region associated with spatial navigation, was significantly larger in experienced taxi drivers than in control subjects. Moreover, the size of the hippocampus correlated with the number of years spent driving a taxi, suggesting that the structural changes were a direct consequence of navigational experience rather than a pre-existing trait. Neuroplasticity has profound implications for rehabilitation. Stroke patients, for example, can sometimes recover lost functions as undamaged areas of the brain are recruited to take over from injured regions. This process, known as cortical remapping, forms the basis of many modern rehabilitation therapies. Music provides another compelling illustration. Professional musicians typically show enlarged cortical representations of the fingers they use most frequently, and these differences are most pronounced in those who began training before the age of seven. However, neuroplasticity is not always beneficial. Chronic pain, for instance, can result from maladaptive plasticity, where the brain becomes increasingly sensitised to pain signals even after the original injury has healed. Understanding both the positive and negative dimensions of neuroplasticity is essential for developing effective therapeutic interventions.",
items:[
  {pre:"Neuroplasticity refers to the brain\\u0027s ability to reorganise itself by forming new",gap:"neural connections",post:"throughout life."},
  {pre:"The old view was that the brain\\u0027s structure was largely",gap:"set in stone",post:"after childhood."},
  {pre:"The 1990s are sometimes referred to as the",gap:"decade of the brain",post:"."},
  {pre:"Eleanor Maguire\\u0027s research focused on the hippocampus, which is linked to",gap:"spatial navigation",post:"."},
  {pre:"The size of the hippocampus correlated with the number of",gap:"years spent driving",post:"a taxi."},
  {pre:"The process by which undamaged brain areas take over from injured ones is called",gap:"cortical remapping",post:"."},
  {pre:"Musicians who began training before the age of",gap:"seven",post:"showed the most pronounced cortical differences."},
  {pre:"Chronic pain can be caused by",gap:"maladaptive plasticity",post:", where the brain becomes oversensitised to pain signals."}
]},
// Ex 8 - Writing
{type:"wr",tl:"Writing",title:"Part 1 - Essay",ins:"Write your essay (220-260 words).",
prompt:"Your class has been discussing the role of universities in modern society. You have made the notes below.\n\nPurposes of university education:\n- preparing students for careers\n- developing critical thinking skills\n- advancing knowledge through research\n\nSome opinions expressed in the discussion:\n\"Universities should focus primarily on producing employable graduates.\"\n\"The most valuable thing university teaches is how to think, not what to think.\"\n\"Without university research, society would stagnate and innovation would suffer.\"\n\nWrite an essay discussing two of the purposes listed above, explaining which you think is more important. You should use your own words as far as possible.",minWords:220}
]},
// ===== TEST 4 =====
{t:"Practice Test 4",exercises:[
// Ex 1 - MC Cloze
{type:"mc",tl:"Use of English",title:"Part 1 - Multiple-choice Cloze",ins:"Choose the correct word (A-D) for each gap.",
passage:"In recent years, the practice of mindfulness meditation has (1)_____ from a niche spiritual discipline into a mainstream wellness phenomenon. Corporations, schools, and even military organisations have (2)_____ mindfulness programmes, drawn by research suggesting that regular practice can reduce stress, enhance focus, and improve emotional resilience. However, the (3)_____ commercialisation of mindfulness has attracted criticism from scholars who argue that stripping the practice of its Buddhist roots (4)_____ it to little more than a relaxation technique. The original purpose of mindfulness, they contend, was to cultivate ethical awareness and compassion, not merely to help executives (5)_____ with workplace pressure. This tension between traditional and modern interpretations shows no (6)_____ of being resolved. Meanwhile, the evidence base, while broadly encouraging, is not without (7)_____. Many studies suffer from small sample sizes, lack of control groups, and inconsistent definitions of what mindfulness actually (8)_____.",
items:[
  {q:"Gap 1",opts:["grown","evolved","developed","expanded"],ans:1},
  {q:"Gap 2",opts:["embraced","grasped","seized","held"],ans:0},
  {q:"Gap 3",opts:["rapid","swift","hasty","prompt"],ans:0},
  {q:"Gap 4",opts:["diminishes","reduces","lowers","shrinks"],ans:1},
  {q:"Gap 5",opts:["manage","handle","cope","deal"],ans:2},
  {q:"Gap 6",opts:["sign","mark","trace","indication"],ans:0},
  {q:"Gap 7",opts:["defects","flaws","faults","weaknesses"],ans:1},
  {q:"Gap 8",opts:["involves","comprises","entails","consists"],ans:2}
]},
// Ex 2 - Open Cloze
{type:"fl",tl:"Use of English",title:"Part 2 - Open Cloze",ins:"Write the word which best fits each gap.",
items:[
  {pre:"Under no circumstances",gap:"should",post:"confidential information be shared with unauthorised personnel."},
  {pre:"The project was completed well ahead",gap:"of",post:"schedule, much to the delight of the investors."},
  {pre:"She came",gap:"across",post:"an old photograph while clearing out the attic."},
  {pre:"There is no",gap:"denying",post:"that the situation has deteriorated significantly over the past six months."},
  {pre:"The painting, believed to",gap:"be",post:"the work of a minor Dutch master, turned out to be a forgery."},
  {pre:"He went to great",gap:"lengths",post:"to ensure that every detail of the event was perfect."},
  {pre:"Scarcely had the announcement been made",gap:"when",post:"a wave of protests erupted across the country."},
  {pre:"The proposal was rejected on the",gap:"basis",post:"that it lacked sufficient evidence to justify the expenditure."}
]},
// Ex 3 - Word Formation
{type:"wf",tl:"Use of English",title:"Part 3 - Word Formation",ins:"Use the word given to form a word that fits the gap.",
items:[
  {pre:"The",root:"MAINTAIN",gap:"maintenance",post:"of public parks and gardens requires a significant annual budget."},
  {pre:"Her",root:"PERSIST",gap:"persistence",post:"in the face of repeated setbacks eventually paid off."},
  {pre:"The company\\u0027s",root:"COMPETE",gap:"competitiveness",post:"has been eroded by a failure to invest in new technology."},
  {pre:"The new regulations were",root:"FORCE",gap:"enforceable",post:"from the first of January."},
  {pre:"It was an",root:"FORGIVE",gap:"unforgivable",post:"breach of trust that cost him his position."},
  {pre:"The",root:"KNOW",gap:"knowledgeable",post:"guide led us through the ancient ruins with great enthusiasm."},
  {pre:"His",root:"WILLING",gap:"unwillingness",post:"to compromise on even minor points made negotiations extremely difficult."},
  {pre:"The evidence presented was deemed",root:"SUFFICE",gap:"insufficient",post:"to secure a conviction."}
]},
// Ex 4 - Key Word Transformations
{type:"kt",tl:"Use of English",title:"Part 4 - Key Word Transformations",ins:"Use 3-6 words including the word given.",
items:[
  {src:"The police think the suspect left the country yesterday.",kw:"THOUGHT",ans:"the suspect is thought to have left the country yesterday",hint:"is thought to have + past participle"},
  {src:"I didn\\u0027t expect the film to be so moving.",kw:"BARGAIN",ans:"I had not bargained for the film being so moving",hint:"bargain for + gerund"},
  {src:"She regretted not accepting the job offer.",kw:"WISHED",ans:"she wished she had accepted the job offer",hint:"wish + past perfect"},
  {src:"The success of the business is entirely due to her leadership.",kw:"BEEN",ans:"had it not been for her leadership the business would not have succeeded",hint:"had it not been for"},
  {src:"It is not necessary for you to attend the meeting.",kw:"NEED",ans:"there is no need for you to attend the meeting",hint:"there is no need for"},
  {src:"They are going to demolish the old factory next month.",kw:"PULLED",ans:"the old factory is going to be pulled down next month",hint:"be pulled down"}
]},
// Ex 5 - Reading MC
{type:"mc",tl:"Reading",title:"Part 5 - Multiple Choice",ins:"Choose the best answer (A-D).",
passage:"The placebo effect, once dismissed as an inconvenient confound in clinical trials, has emerged as a fascinating subject of study in its own right. Far from being mere trickery, the placebo response reveals something fundamental about the relationship between expectation, belief, and physical health.\n\nAt its simplest, the placebo effect occurs when a patient experiences genuine improvement after receiving an inert treatment, such as a sugar pill or saline injection. The improvement cannot be attributed to any pharmacological action; instead, it appears to be driven by the patient\\u0027s expectation of benefit. Brain imaging studies have shown that placebos can trigger the release of endorphins, dopamine, and other neurotransmitters, producing measurable changes in brain chemistry that parallel those induced by active medications.\n\nThe magnitude of the placebo effect varies considerably depending on the condition being treated and the manner in which the treatment is administered. Pain, depression, and nausea tend to be particularly responsive to placebos, while conditions such as cancer or broken bones are not. The ritual of treatment matters enormously: injections tend to produce stronger placebo effects than pills, and more expensive placebos outperform cheaper ones, even when both are pharmacologically identical.\n\nPerhaps the most surprising recent discovery is that placebos can work even when patients know they are receiving them. In so-called open-label placebo trials, participants are told explicitly that they are taking an inert substance, yet many still report significant symptom relief. This finding challenges the traditional assumption that deception is essential to the placebo response and suggests that the therapeutic ritual itself, the act of taking a pill, the attention of a caring practitioner, the narrative of treatment, may be as important as the expectation of a specific chemical effect.\n\nEthical questions inevitably arise. Is it acceptable for doctors to prescribe placebos, even if they work? Traditional medical ethics, grounded in the principles of informed consent and truthfulness, would seem to prohibit such practices. Yet the open-label findings offer a potential resolution: if placebos work without deception, then prescribing them need not involve any breach of trust.\n\nThe implications extend beyond clinical practice. Understanding the placebo effect may help explain why complementary and alternative therapies, many of which lack pharmacological plausibility, nonetheless enjoy devoted followings. It is possible that their effectiveness lies not in their active ingredients but in the elaborate rituals, personal attention, and holistic narratives that typically accompany them.",
items:[
  {q:"The writer suggests that the placebo effect was previously viewed as",opts:["a promising area of medical research.","an unwanted complication in drug testing.","a form of deliberate medical fraud.","a well-understood psychological phenomenon."],ans:1},
  {q:"According to the passage, what do brain imaging studies demonstrate?",opts:["Placebos are as effective as real medications.","The placebo response involves real neurochemical changes.","Sugar pills can cure serious diseases.","Patients who respond to placebos have unusual brain structures."],ans:1},
  {q:"What does the passage say about the strength of the placebo effect?",opts:["It is consistent across all medical conditions.","It depends partly on how the treatment is delivered.","It has been declining in recent years.","It is strongest in conditions with clear biological causes."],ans:1},
  {q:"The significance of open-label placebo trials is that they show",opts:["most patients refuse to participate in placebo research.","placebos are ineffective when patients are informed.","the act of treatment may matter more than belief in a specific drug.","doctors should never tell patients what they are prescribing."],ans:2},
  {q:"How does the writer address the ethical concerns around placebos?",opts:["By arguing that deception in medicine is always justified.","By suggesting open-label placebos could resolve the ethical dilemma.","By stating that placebos should never be prescribed.","By dismissing the ethical concerns as unimportant."],ans:1},
  {q:"In the final paragraph, the writer implies that alternative therapies may work because",opts:["they contain undiscovered active ingredients.","patients who use them are more susceptible to suggestion.","the rituals and attention involved activate placebo mechanisms.","scientific research has validated their effectiveness."],ans:2}
]},
// Ex 6 - Listening Part 1
{type:"mc",tl:"Listening",title:"Part 1 - Short Extracts",ins:"Listen and choose the correct answer.",
items:[
  {audio:"Extract 1: Man: I\\u0027ve been reviewing the proposals for the new community centre, and frankly, none of them really hit the mark. Woman: What\\u0027s missing? Man: Well, they\\u0027re all architecturally impressive, but none of them have genuinely engaged with the community about what they actually need. It\\u0027s design for design\\u0027s sake. Woman: So you\\u0027re saying the process was flawed from the start?",q:"What is the man\\u0027s main criticism of the proposals?",opts:["They are too expensive to build.","They fail to reflect the community\\u0027s needs.","They are architecturally unimaginative.","They were submitted too late."],ans:1},
  {audio:"Extract 1 (continued): Man: Exactly. You can\\u0027t design a community space without first talking to the community. It\\u0027s a fundamental principle. Woman: I wonder if they\\u0027ll go back and consult more widely before making a decision. Man: I certainly hope so, but the deadline is tight.",q:"What does the man believe should have happened first?",opts:["The budget should have been increased.","More architects should have been invited.","The community should have been consulted.","The deadline should have been extended."],ans:2},
  {audio:"Extract 2: Woman: I\\u0027ve started a digital detox. No phone for the first hour after I wake up and the last hour before bed. Man: How\\u0027s that going? Woman: Better than I expected, actually. I\\u0027m sleeping more soundly and I feel less anxious in the mornings. The hardest part was the first week. I kept reaching for my phone out of sheer habit.",q:"What does the woman say about her digital detox?",opts:["She abandoned it after the first week.","She found it beneficial after initial difficulty.","She could not notice any difference.","She plans to extend it to the whole day."],ans:1},
  {audio:"Extract 2 (continued): Man: I\\u0027ve thought about doing something similar, but I worry about missing important messages. Woman: That\\u0027s what I thought too, but honestly, nothing that comes in at six in the morning is so urgent it can\\u0027t wait an hour.",q:"How does the woman address the man\\u0027s concern?",opts:["She admits that he has a valid point.","She suggests he check his phone less frequently.","She argues that truly urgent messages are rare.","She recommends using a different app."],ans:2},
  {audio:"Extract 3: Man: The thing about sustainable fashion is that it requires a complete shift in mindset. It\\u0027s not enough to buy one organic cotton t-shirt and feel virtuous. You have to fundamentally rethink your relationship with consumption. Woman: I agree in principle, but I also think we have to be realistic. Not everyone can afford to shop ethically. Sustainable brands tend to charge a premium that puts them out of reach for many people.",q:"What point does the woman make?",opts:["Sustainable fashion is a waste of money.","Ethical shopping is not financially accessible to everyone.","Organic cotton is no better than conventional materials.","People should buy fewer clothes regardless of the brand."],ans:1},
  {audio:"Extract 3 (continued): Man: That\\u0027s true, and it\\u0027s a structural issue that the industry needs to address. But buying second-hand is both sustainable and affordable. Woman: That\\u0027s a fair point. The second-hand market has really taken off in recent years.",q:"What solution does the man propose?",opts:["Governments should subsidise sustainable fashion.","People should make their own clothes.","Buying second-hand combines sustainability and affordability.","Fashion brands should lower their prices."],ans:2}
]},
// Ex 7 - Listening Part 2
{type:"fl",tl:"Listening",title:"Part 2 - Sentence Completion",ins:"Complete the sentences with a word or short phrase.",
audio:"Good afternoon. Today I want to discuss the phenomenon of bioluminescence, the production of light by living organisms. While we tend to associate this phenomenon with deep-sea creatures like anglerfish and jellyfish, bioluminescence is actually remarkably widespread across the tree of life, having evolved independently at least fifty times in different lineages. The light is produced through a chemical reaction involving a molecule called luciferin, which, when oxidised by an enzyme called luciferase, releases energy in the form of visible light. The colours produced range from blue and green, which are by far the most common in marine environments, to red and even infrared, which are extremely rare. The functions of bioluminescence are diverse. Many organisms use it for predation, either to lure prey or to illuminate their surroundings while hunting. Others employ it as a defence mechanism. Some species of squid, for example, release clouds of luminous mucus to confuse predators, while certain fish use counterillumination, matching the brightness of the surface light above them to eliminate their silhouette when viewed from below. Communication is another important function. Fireflies, perhaps the most familiar bioluminescent organisms on land, use species-specific flash patterns to identify and attract mates. Recent research has revealed that bioluminescence may have applications far beyond the natural world. Scientists have engineered bioluminescent genes into plant cells to create living light sources that require no electricity. Others are using luciferase as a reporter gene in biomedical research, allowing them to track the progression of diseases in living tissue with extraordinary precision. The potential for bioluminescence to contribute to sustainable lighting solutions is particularly exciting, though significant technical challenges remain before such applications become commercially viable.",
items:[
  {pre:"Bioluminescence has evolved independently at least",gap:"fifty times",post:"in different lineages."},
  {pre:"The chemical reaction that produces light involves a molecule called",gap:"luciferin",post:"."},
  {pre:"The most common colours of bioluminescence in marine environments are",gap:"blue and green",post:"."},
  {pre:"Some squid species release clouds of luminous",gap:"mucus",post:"to confuse predators."},
  {pre:"Certain fish use a technique called",gap:"counterillumination",post:"to eliminate their silhouette."},
  {pre:"Fireflies attract mates using species-specific",gap:"flash patterns",post:"."},
  {pre:"Scientists have used bioluminescent genes to create living",gap:"light sources",post:"that need no electricity."},
  {pre:"Luciferase is used as a reporter gene to track the progression of",gap:"diseases",post:"in living tissue."}
]},
// Ex 8 - Writing
{type:"wr",tl:"Writing",title:"Part 1 - Essay",ins:"Write your essay (220-260 words).",
prompt:"Your class has been discussing ways to protect the natural environment. You have made the notes below.\n\nApproaches to environmental protection:\n- individual lifestyle changes\n- government legislation and regulation\n- technological innovation\n\nSome opinions expressed in the discussion:\n\"Real change starts with individual choices like reducing waste and eating less meat.\"\n\"Only governments have the power to enforce the large-scale changes that are needed.\"\n\"New technologies like carbon capture and renewable energy are our best hope.\"\n\nWrite an essay discussing two of the approaches listed above, explaining which you think is more effective. You should use your own words as far as possible.",minWords:220}
]},
// ===== TEST 5 =====
{t:"Practice Test 5",exercises:[
// Ex 1 - MC Cloze
{type:"mc",tl:"Use of English",title:"Part 1 - Multiple-choice Cloze",ins:"Choose the correct word (A-D) for each gap.",
passage:"The decline of high streets across the United Kingdom has been one of the most (1)_____ discussed topics in urban planning over the past decade. The rise of online retail has (2)_____ a heavy toll on traditional bricks-and-mortar shops, many of which have been unable to compete with the convenience and lower prices offered by digital platforms. Town centres that were once (3)_____ with activity now present a dispiriting picture of boarded-up premises and empty car parks. Some commentators have (4)_____ the blame squarely at the feet of local councils, arguing that excessive business rates and restrictive planning regulations have made it virtually impossible for small retailers to (5)_____ afloat. Others point to deeper structural shifts in consumer behaviour that no amount of policy intervention can reverse. In response, several forward-thinking communities have (6)_____ innovative approaches, repurposing vacant shops as community hubs, art galleries, and co-working spaces. Whether these initiatives can (7)_____ the tide remains to be seen, but they represent a creative attempt to reimagine the role of the high street in an era when its traditional function has been fundamentally (8)_____.",
items:[
  {q:"Gap 1",opts:["hotly","fiercely","keenly","sharply"],ans:0},
  {q:"Gap 2",opts:["exacted","taken","inflicted","imposed"],ans:1},
  {q:"Gap 3",opts:["humming","buzzing","thriving","booming"],ans:1},
  {q:"Gap 4",opts:["placed","laid","put","set"],ans:1},
  {q:"Gap 5",opts:["remain","keep","stay","hold"],ans:2},
  {q:"Gap 6",opts:["adopted","adapted","assumed","acquired"],ans:0},
  {q:"Gap 7",opts:["change","shift","stem","reverse"],ans:2},
  {q:"Gap 8",opts:["undermined","weakened","eroded","diminished"],ans:0}
]},
// Ex 2 - Open Cloze
{type:"fl",tl:"Use of English",title:"Part 2 - Open Cloze",ins:"Write the word which best fits each gap.",
items:[
  {pre:"Hard",gap:"as",post:"it may be to believe, the company was once on the verge of bankruptcy."},
  {pre:"The government has come",gap:"under",post:"increasing pressure to reform the healthcare system."},
  {pre:"She was on the",gap:"point",post:"of resigning when she received the unexpected promotion."},
  {pre:"It makes no",gap:"difference",post:"whether you submit the form online or by post."},
  {pre:"The results were",gap:"by",post:"no means as conclusive as the researchers had hoped."},
  {pre:"Seldom",gap:"has",post:"a scientific discovery generated so much public excitement."},
  {pre:"He spoke at",gap:"such",post:"length that several members of the audience fell asleep."},
  {pre:"The project fell",gap:"through",post:"at the last minute when the main investor withdrew."}
]},
// Ex 3 - Word Formation
{type:"wf",tl:"Use of English",title:"Part 3 - Word Formation",ins:"Use the word given to form a word that fits the gap.",
items:[
  {pre:"The",root:"ACHIEVE",gap:"achievement",post:"of universal literacy remains an elusive goal in many parts of the world."},
  {pre:"His behaviour was",root:"CHARACTER",gap:"uncharacteristic",post:"of someone who normally displayed such composure."},
  {pre:"The city\\u0027s cultural",root:"DIVERSE",gap:"diversity",post:"is one of its greatest strengths."},
  {pre:"The politician\\u0027s promises proved to be",root:"SUBSTANCE",gap:"unsubstantiated",post:"and were quickly forgotten after the election."},
  {pre:"The",root:"HOUSE",gap:"housing",post:"crisis has reached critical proportions in several major European cities."},
  {pre:"It was a thoroughly",root:"ENJOY",gap:"enjoyable",post:"evening, despite the rather disappointing food."},
  {pre:"The committee expressed its",root:"APPROVE",gap:"disapproval",post:"of the proposed changes in the strongest possible terms."},
  {pre:"The",root:"PREDICT",gap:"unpredictability",post:"of the weather in this region makes farming an inherently risky occupation."}
]},
// Ex 4 - Key Word Transformations
{type:"kt",tl:"Use of English",title:"Part 4 - Key Word Transformations",ins:"Use 3-6 words including the word given.",
items:[
  {src:"We didn\\u0027t go out because of the heavy rain.",kw:"PREVENTED",ans:"the heavy rain prevented us from going out",hint:"prevent from + gerund"},
  {src:"The children were so excited that they couldn\\u0027t sleep.",kw:"TOO",ans:"the children were too excited to sleep",hint:"too + adjective + to"},
  {src:"He is likely to be promoted before the end of the year.",kw:"STANDS",ans:"he stands a good chance of being promoted before the end of the year",hint:"stand a good chance of"},
  {src:"I haven\\u0027t been to the dentist for over a year.",kw:"LAST",ans:"the last time I went to the dentist was over a year ago",hint:"the last time + past simple"},
  {src:"Everyone says that the restaurant is excellent.",kw:"REPUTED",ans:"the restaurant is reputed to be excellent",hint:"is reputed to be"},
  {src:"It was wrong of you not to inform us of the delay.",kw:"OUGHT",ans:"you ought to have informed us of the delay",hint:"ought to have + past participle"}
]},
// Ex 5 - Reading MC
{type:"mc",tl:"Reading",title:"Part 5 - Multiple Choice",ins:"Choose the best answer (A-D).",
passage:"The phenomenon of synesthesia, in which stimulation of one sensory pathway automatically triggers an experience in a second pathway, has intrigued researchers for over a century. A synesthete might perceive the number five as inherently red, or experience the taste of chocolate when hearing a particular piece of music. Once dismissed as fanciful or delusional, synesthesia is now recognised as a genuine neurological condition, estimated to affect between two and four percent of the population.\n\nThe most common form, grapheme-colour synesthesia, involves the automatic association of letters or numbers with specific colours. Importantly, these associations are highly consistent: a synesthete who sees the letter A as crimson will report the same association years or even decades later, unlike non-synesthetes asked to assign arbitrary colours to letters, whose responses vary substantially over time.\n\nSeveral theories have been proposed to explain the condition. The cross-activation hypothesis suggests that synesthesia results from increased structural connectivity between adjacent brain regions. In grapheme-colour synesthesia, for instance, the brain area responsible for processing letter shapes lies close to the region that processes colour, and it is proposed that unusually dense neural connections between these areas allow activation in one to spill over into the other.\n\nAn alternative account, the disinhibited feedback theory, argues that all brains possess the neural connections that produce synesthetic experiences, but that in most people, these connections are inhibited. On this view, synesthetes differ not in their neural wiring but in the degree to which feedback signals between brain regions are regulated. This theory is supported by the observation that certain drugs, particularly hallucinogens, can temporarily induce synesthetic experiences in non-synesthetes.\n\nResearch has also revealed intriguing links between synesthesia and creativity. Synesthetes are significantly over-represented in artistic professions, and several prominent artists, musicians, and writers have reported synesthetic experiences. It has been suggested that the automatic cross-sensory associations characteristic of synesthesia may facilitate metaphorical thinking, a cognitive skill that lies at the heart of creative expression.\n\nHowever, synesthesia is not without its disadvantages. Some synesthetes find their experiences intrusive or overwhelming, particularly in information-rich environments. Others report difficulty with tasks that conflict with their synesthetic associations, such as reading text printed in colours that do not match their internal letter-colour mappings.",
items:[
  {q:"What does the writer suggest about historical attitudes to synesthesia?",opts:["It was always taken seriously by the scientific community.","It was previously not considered a real phenomenon.","It was extensively studied but poorly understood.","It was thought to be limited to visual artists."],ans:1},
  {q:"Why is the consistency of synesthetic associations significant?",opts:["It proves that synesthesia is not a form of imagination.","It shows that synesthetes have better memories.","It demonstrates that all people experience synesthesia.","It indicates that synesthesia fades over time."],ans:0},
  {q:"According to the cross-activation hypothesis, synesthesia is caused by",opts:["damage to specific brain regions.","excessive connectivity between neighbouring brain areas.","a lack of sensory stimulation during childhood.","abnormal development of the visual cortex."],ans:1},
  {q:"The disinhibited feedback theory differs from the cross-activation hypothesis in that it proposes",opts:["synesthesia is not a real neurological phenomenon.","all brains have the potential for synesthetic experiences.","synesthetes have fewer neural connections than average.","drugs cannot replicate synesthetic experiences."],ans:1},
  {q:"The link between synesthesia and creativity is attributed to",opts:["synesthetes having higher levels of intelligence.","the enhanced ability to make cross-sensory metaphors.","a preference for artistic careers among synesthetes.","the fact that all creative people are synesthetes."],ans:1},
  {q:"What disadvantage of synesthesia is mentioned in the final paragraph?",opts:["It makes it impossible to read in certain lighting conditions.","It can cause permanent damage to the visual system.","It may create difficulties when sensory information conflicts.","It prevents synesthetes from working in certain professions."],ans:2}
]},
// Ex 6 - Listening Part 1
{type:"mc",tl:"Listening",title:"Part 1 - Short Extracts",ins:"Listen and choose the correct answer.",
items:[
  {audio:"Extract 1: Woman: I\\u0027ve just come back from a conference on urban farming, and the scale of what\\u0027s being achieved is genuinely impressive. One project in Detroit has converted entire blocks of abandoned properties into productive farmland. Man: It\\u0027s a great concept, but I\\u0027d question whether it can ever produce enough food to make a real dent in a city\\u0027s needs. The yields from urban plots tend to be quite modest.",q:"What is the man\\u0027s reservation about urban farming?",opts:["It requires too much specialist knowledge.","It is unlikely to produce food in sufficient quantities.","It is too dependent on government subsidies.","It only works in cities with abandoned land."],ans:1},
  {audio:"Extract 1 (continued): Woman: You\\u0027re right that it won\\u0027t replace conventional agriculture, but that\\u0027s not really the point. It\\u0027s about food education, community building, and reducing food miles for specific products. Man: Fair enough. I hadn\\u0027t thought of it in those terms.",q:"What does the woman argue about urban farming?",opts:["It should aim to replace traditional agriculture.","Its value extends beyond food production alone.","It is more efficient than conventional farming.","It is primarily an educational initiative for children."],ans:1},
  {audio:"Extract 2: Man: I\\u0027ve been grappling with the ethics of zoos for years, and I still haven\\u0027t come to a firm conclusion. On the one hand, the conservation work that the best zoos do is invaluable. On the other, keeping intelligent animals in captivity raises serious moral questions. Woman: I think the key word there is \\u0027best.\\u0027 The problem is that the standard varies enormously. Some zoos are world-class conservation centres; others are barely disguised entertainment venues.",q:"What does the woman emphasise about zoos?",opts:["All zoos should be closed immediately.","There is a significant quality gap between different zoos.","Entertainment is a valid purpose for zoos.","Conservation work is not the primary function of zoos."],ans:1},
  {audio:"Extract 2 (continued): Man: So you\\u0027d support a system where only accredited zoos that meet strict welfare standards are allowed to operate? Woman: Absolutely. And I\\u0027d go further. I think the focus should shift entirely toward conservation breeding programmes and away from public display.",q:"What does the woman think zoos should prioritise?",opts:["Increasing visitor numbers.","Education programmes for schools.","Conservation breeding over public display.","Releasing all animals into the wild."],ans:2},
  {audio:"Extract 3: Woman: The new grading system at the university has caused quite a stir. They\\u0027ve moved away from traditional letter grades to a pass-fail model for first-year courses. Man: I can see the logic. It reduces stress and encourages students to take intellectual risks without worrying about their GPA. Woman: That\\u0027s the theory. But some students feel it devalues their hard work. If everyone gets the same grade, what\\u0027s the incentive to excel?",q:"What concern does the woman raise about the pass-fail system?",opts:["It makes courses too easy.","It may reduce motivation to perform at a high level.","It confuses employers when reviewing applications.","It is unfair to students who struggle academically."],ans:1},
  {audio:"Extract 3 (continued): Man: That\\u0027s a valid concern, but the research suggests that students who are freed from grade anxiety actually learn more deeply. They engage with the material for its own sake rather than strategically studying for the test. Woman: I\\u0027d like to see how it plays out over a few years before making a judgement.",q:"What is the woman\\u0027s final position?",opts:["She is firmly opposed to the new system.","She believes the evidence is already conclusive.","She wants to wait and evaluate the results.","She has been persuaded by the man\\u0027s argument."],ans:2}
]},
// Ex 7 - Listening Part 2
{type:"fl",tl:"Listening",title:"Part 2 - Sentence Completion",ins:"Complete the sentences with a word or short phrase.",
audio:"Good morning. I\\u0027d like to talk to you today about the phenomenon of language death, a topic that has gained increasing urgency as globalisation continues to reshape the linguistic landscape. A language is considered dead when it has no remaining native speakers, and by this definition, the world is losing languages at an alarming rate. Current estimates suggest that approximately one language disappears every two weeks, and linguists predict that by the end of this century, between fifty and ninety percent of the world\\u0027s roughly seven thousand languages will have vanished. The causes of language death are complex and interconnected. Economic pressures often play a decisive role. When a dominant language is the gateway to employment, education, and social mobility, parents may make the pragmatic decision to raise their children in that language rather than their ancestral tongue. Urbanisation amplifies this effect, as young people move to cities where minority languages have little functional value. Government policies have also contributed, sometimes deliberately. Throughout the nineteenth and twentieth centuries, many colonial and post-colonial governments actively suppressed indigenous languages through assimilationist education policies. In Australia, for example, Aboriginal children were forcibly removed from their families and placed in institutions where they were punished for speaking their native languages. The loss of a language has consequences that extend far beyond communication. Each language encodes a unique system of knowledge about the natural world, often accumulated over thousands of years. The Inuit languages, for instance, contain dozens of terms for different types of snow and ice, reflecting an intimate understanding of Arctic environments that has no equivalent in English. When a language dies, this knowledge frequently dies with it. Efforts to preserve endangered languages have intensified in recent decades. Documentation projects use audio and video recording to create permanent archives. Revitalisation programmes, such as the remarkably successful revival of Hebrew and the ongoing efforts to restore Welsh and Maori, demonstrate that language death is not always irreversible.",
items:[
  {pre:"A language is considered dead when it has no remaining",gap:"native speakers",post:"."},
  {pre:"Approximately one language disappears every",gap:"two weeks",post:"."},
  {pre:"Parents may choose a dominant language because it provides access to employment, education, and",gap:"social mobility",post:"."},
  {pre:"In Australia, Aboriginal children were placed in institutions where they were",gap:"punished",post:"for speaking their native languages."},
  {pre:"Each language encodes a unique system of knowledge about the",gap:"natural world",post:"."},
  {pre:"Inuit languages contain dozens of terms for different types of",gap:"snow and ice",post:"."},
  {pre:"Documentation projects use audio and video recording to create permanent",gap:"archives",post:"."},
  {pre:"The revival of Hebrew demonstrates that language death is not always",gap:"irreversible",post:"."}
]},
// Ex 8 - Writing
{type:"wr",tl:"Writing",title:"Part 1 - Essay",ins:"Write your essay (220-260 words).",
prompt:"Your class has been discussing the advantages and disadvantages of living in a globalised world. You have made the notes below.\n\nEffects of globalisation:\n- cultural exchange and diversity\n- economic opportunities and inequality\n- environmental impact\n\nSome opinions expressed in the discussion:\n\"Globalisation has enriched our lives by exposing us to different cultures and ideas.\"\n\"While some people benefit economically, others are left behind and inequality grows.\"\n\"The global supply chain is one of the biggest drivers of environmental degradation.\"\n\nWrite an essay discussing two of the effects listed above, explaining which you think has a more significant impact on people\\u0027s lives. You should use your own words as far as possible.",minWords:220}
]},
// ===== TEST 6 =====
{t:"Practice Test 6",exercises:[
// Ex 1 - MC Cloze
{type:"mc",tl:"Use of English",title:"Part 1 - Multiple-choice Cloze",ins:"Choose the correct word (A-D) for each gap.",
passage:"Archaeology has traditionally been associated with excavation, the painstaking process of (1)_____ layers of soil to reveal the remains of past civilisations. However, advances in remote sensing technology have (2)_____ in a new era of discovery. Satellite imagery and aerial drones can now detect buried structures without a single spade being (3)_____ into the ground. Lidar, a technology that uses laser pulses to map terrain with extraordinary precision, has proved particularly (4)_____. In 2018, researchers using lidar revealed the remains of an enormous Maya city hidden beneath the dense jungle canopy of Guatemala, a discovery that (5)_____ established estimates of the ancient Maya population. These technologies have not rendered traditional excavation obsolete, but they have fundamentally altered the way archaeologists go (6)_____ their work. Sites that might once have taken decades to survey can now be mapped in a (7)_____ of the time. The challenge, as always, is (8)_____ - these technologies are expensive, and many archaeological programmes operate on extremely tight budgets.",
items:[
  {q:"Gap 1",opts:["stripping","peeling","clearing","shedding"],ans:0},
  {q:"Gap 2",opts:["brought","ushered","led","carried"],ans:1},
  {q:"Gap 3",opts:["thrust","pushed","driven","plunged"],ans:0},
  {q:"Gap 4",opts:["groundbreaking","trailblazing","pioneering","leading"],ans:0},
  {q:"Gap 5",opts:["overturned","reversed","upended","inverted"],ans:0},
  {q:"Gap 6",opts:["about","around","over","through"],ans:0},
  {q:"Gap 7",opts:["portion","section","fraction","segment"],ans:2},
  {q:"Gap 8",opts:["funding","spending","financing","budgeting"],ans:0}
]},
// Ex 2 - Open Cloze
{type:"fl",tl:"Use of English",title:"Part 2 - Open Cloze",ins:"Write the word which best fits each gap.",
items:[
  {pre:"The new policy, controversial",gap:"though",post:"it may be, has already produced measurable results."},
  {pre:"He was taken",gap:"aback",post:"by the sheer scale of the opposition to his proposal."},
  {pre:"There is nothing to be gained",gap:"from",post:"dwelling on mistakes that cannot be undone."},
  {pre:"The discovery was made quite",gap:"by",post:"chance while the team was investigating an unrelated phenomenon."},
  {pre:"She has a remarkable gift",gap:"for",post:"putting people at ease in difficult social situations."},
  {pre:"Interesting",gap:"as",post:"the findings were, they fell short of proving the central hypothesis."},
  {pre:"The company is on the",gap:"verge",post:"of announcing a major restructuring programme."},
  {pre:"No sooner had the curtain risen",gap:"than",post:"the audience erupted in spontaneous applause."}
]},
// Ex 3 - Word Formation
{type:"wf",tl:"Use of English",title:"Part 3 - Word Formation",ins:"Use the word given to form a word that fits the gap.",
items:[
  {pre:"The",root:"REVEAL",gap:"revelation",post:"that the company had been falsifying its accounts sent shockwaves through the industry."},
  {pre:"His",root:"APPEAR",gap:"disappearance",post:"without trace baffled investigators for years."},
  {pre:"The",root:"DENY",gap:"undeniable",post:"talent of the young pianist attracted attention from several prestigious conservatoires."},
  {pre:"The scheme was abandoned due to its sheer",root:"PRACTICE",gap:"impracticality",post:"in the current economic climate."},
  {pre:"Her",root:"SPEAK",gap:"outspoken",post:"criticism of the management made her unpopular in certain circles."},
  {pre:"The",root:"COME",gap:"outcome",post:"of the negotiations remained uncertain until the very last moment."},
  {pre:"The documentary offered a",root:"THOUGHT",gap:"thought-provoking",post:"analysis of the ethical dilemmas facing modern agriculture."},
  {pre:"There has been a",root:"STRIKE",gap:"striking",post:"increase in the number of young people volunteering for community service."}
]},
// Ex 4 - Key Word Transformations
{type:"kt",tl:"Use of English",title:"Part 4 - Key Word Transformations",ins:"Use 3-6 words including the word given.",
items:[
  {src:"He never has any intention of paying back the money.",kw:"SLIGHTEST",ans:"he has not the slightest intention of paying back the money",hint:"not the slightest intention"},
  {src:"People say that she turned down the job offer.",kw:"HAVE",ans:"she is said to have turned down the job offer",hint:"is said to have + past participle"},
  {src:"She was so talented that everyone admired her.",kw:"LOOK",ans:"everyone looked up to her because of her talent",hint:"look up to someone"},
  {src:"I started learning the piano when I was six.",kw:"PLAYING",ans:"I have been playing the piano since I was six",hint:"present perfect continuous + since"},
  {src:"He found it impossible to concentrate because of the noise.",kw:"UNABLE",ans:"he was unable to concentrate owing to the noise",hint:"be unable to + owing to"},
  {src:"They demanded that the government take immediate action.",kw:"CALLED",ans:"they called on the government to take immediate action",hint:"call on someone to do"}
]},
// Ex 5 - Reading MC
{type:"mc",tl:"Reading",title:"Part 5 - Multiple Choice",ins:"Choose the best answer (A-D).",
passage:"The economics of attention, a concept first articulated by Herbert Simon in the 1970s, has become one of the defining frameworks of the digital age. Simon observed that in an information-rich world, the wealth of information creates a poverty of something else: the attention needed to process it. What was a theoretical insight half a century ago has become a lived reality for billions of people navigating a digital landscape specifically engineered to capture and hold their gaze.\n\nThe attention economy operates on a simple but powerful principle: human attention is a finite and therefore valuable resource. Technology companies compete ferociously for this resource, deploying sophisticated psychological techniques to maximise the time users spend on their platforms. Infinite scroll, auto-play videos, notification badges, and algorithmically curated feeds are not accidental design choices; they are the products of extensive research into human cognitive vulnerabilities. Former Google design ethicist Tristan Harris has compared the modern smartphone to a slot machine, arguing that the variable reward schedules built into social media apps exploit the same dopamine-driven feedback loops that make gambling addictive.\n\nThe consequences of this attention extraction extend far beyond mere distraction. Research has linked heavy social media use to increased rates of anxiety, depression, and loneliness, particularly among adolescents. The algorithmic amplification of emotionally provocative content has been implicated in the spread of misinformation and the polarisation of public discourse. At a societal level, the commodification of attention raises fundamental questions about autonomy and consent. Users rarely appreciate the extent to which their behaviour is being shaped by invisible algorithms optimised for engagement rather than wellbeing.\n\nSome critics argue that the attention economy represents a market failure that demands regulatory intervention. The European Union\\u0027s Digital Services Act and the proposed Age-Appropriate Design Code in the United Kingdom represent early attempts to impose guardrails on platform design. Others favour individual solutions, advocating digital literacy education and the use of screen time management tools.\n\nHowever, placing the burden of resistance on individual users may be both unfair and ineffective. The asymmetry of resources between a multinational technology corporation and a single user is vast. Expecting individuals to exercise willpower against systems specifically designed to undermine it is, as one commentator put it, like expecting someone to win an arm-wrestling match against a hydraulic press.\n\nA more promising approach may lie in the emerging field of humane technology design, which seeks to align platform incentives with user wellbeing rather than engagement metrics. Whether the industry will voluntarily embrace such a transformation, or whether regulatory compulsion will be necessary, remains an open and urgent question.",
items:[
  {q:"Herbert Simon\\u0027s observation, as described in paragraph 1, was that",opts:["digital technology would eventually dominate human life.","an abundance of information leads to a scarcity of attention.","the internet would create new forms of economic inequality.","information should be made freely available to everyone."],ans:1},
  {q:"What does the comparison to a slot machine in paragraph 2 illustrate?",opts:["Social media is a form of entertainment similar to gambling.","Technology companies deliberately exploit psychological weaknesses.","Smartphones are as expensive as casino equipment.","Users enjoy the unpredictability of social media content."],ans:1},
  {q:"According to paragraph 3, the commodification of attention is problematic because",opts:["it generates excessive profits for technology companies.","users are fully aware of how their behaviour is manipulated.","people\\u0027s behaviour is shaped without their meaningful understanding.","it prevents people from using the internet productively."],ans:2},
  {q:"The writer mentions the EU\\u0027s Digital Services Act as an example of",opts:["a failed attempt to regulate technology companies.","an individual-level approach to digital wellbeing.","early regulatory efforts to control platform design.","a policy that technology companies have welcomed."],ans:2},
  {q:"The metaphor of the hydraulic press in paragraph 5 is used to suggest that",opts:["technology companies are physically threatening their users.","individual resistance to designed addiction is fundamentally unequal.","arm wrestling is a useful way to build digital resilience.","users need to develop greater physical strength."],ans:1},
  {q:"The writer\\u0027s overall stance in the passage can best be described as",opts:["neutral and purely descriptive.","optimistic about the self-regulation of technology companies.","critical of the attention economy while exploring potential solutions.","dismissive of regulatory approaches to the problem."],ans:2}
]},
// Ex 6 - Listening Part 1
{type:"mc",tl:"Listening",title:"Part 1 - Short Extracts",ins:"Listen and choose the correct answer.",
items:[
  {audio:"Extract 1: Man: I\\u0027ve been reading about the concept of universal basic income, and I find myself cautiously supportive. The pilot programmes in Finland and Kenya produced some genuinely encouraging results. Woman: I\\u0027m more sceptical. The Finnish trial was very limited in scope, and the results were mixed at best. People reported higher wellbeing, but there was no significant increase in employment.",q:"What is the woman\\u0027s view of the Finnish UBI trial?",opts:["It conclusively proved the case for universal basic income.","Its results were not as positive as some claim.","It was well designed but poorly implemented.","It should be replicated on a much larger scale."],ans:1},
  {audio:"Extract 1 (continued): Man: But surely improved wellbeing is a significant outcome in itself. Woman: It is, but the political case for UBI rests on economic outcomes. If you can\\u0027t show that it boosts productivity or reduces welfare dependency, it\\u0027s a very hard sell to taxpayers.",q:"What does the woman believe is necessary for UBI to gain political support?",opts:["Evidence of improved mental health outcomes.","Endorsement from leading economists.","Demonstrable economic benefits.","Support from major political parties."],ans:2},
  {audio:"Extract 2: Woman: The museum\\u0027s decision to return the artefacts to their country of origin has been controversial, but I think it\\u0027s the right thing to do. Man: In principle, I agree. But there\\u0027s a practical concern. Do the receiving countries have the infrastructure to preserve and display these objects properly? Some of these artefacts are incredibly fragile. Woman: That\\u0027s a legitimate concern, but it can\\u0027t be used as a permanent excuse for retaining objects that were taken under colonial circumstances.",q:"What is the woman\\u0027s position on returning artefacts?",opts:["Artefacts should only be returned when preservation is guaranteed.","Practical concerns should not override the moral case for repatriation.","Museums should keep all artefacts for the benefit of global audiences.","The decision should be made on a case-by-case basis."],ans:1},
  {audio:"Extract 2 (continued): Man: Fair point. Perhaps the answer is collaboration. The lending institutions could provide technical support and training to help build capacity in the receiving countries. Woman: That would be a much more constructive approach than simply saying no.",q:"What solution does the man propose?",opts:["Building new museums in the countries of origin.","Refusing to return any artefacts until conditions improve.","Providing preservation expertise to receiving countries.","Creating digital replicas of the artefacts instead."],ans:2},
  {audio:"Extract 3: Man: I\\u0027ve noticed a real shift in attitudes toward mental health in the workplace over the past five years. Companies that used to treat it as a taboo subject are now actively promoting wellbeing initiatives. Woman: On the surface, yes. But I wonder how much of it is genuine and how much is performative. You can offer yoga classes and meditation apps, but if the underlying culture of overwork and presenteeism hasn\\u0027t changed, it\\u0027s just window dressing.",q:"What does the woman think about workplace wellbeing initiatives?",opts:["They have been universally effective.","They may be superficial if workplace culture remains unchanged.","They are too expensive for most companies.","They should focus exclusively on physical health."],ans:1},
  {audio:"Extract 3 (continued): Man: So you\\u0027d say the focus should be on structural change rather than individual programmes? Woman: Precisely. Flexible working hours, manageable workloads, and a culture where taking time off isn\\u0027t stigmatised. Those are the things that actually make a difference.",q:"According to the woman, what would genuinely improve workplace wellbeing?",opts:["More investment in mental health apps.","Changes to working conditions and culture.","Mandatory counselling sessions for all staff.","Longer annual leave entitlements."],ans:1}
]},
// Ex 7 - Listening Part 2
{type:"fl",tl:"Listening",title:"Part 2 - Sentence Completion",ins:"Complete the sentences with a word or short phrase.",
audio:"Thank you all for coming. Today I want to explore the history and science of fermentation, a process that has been central to human civilisation for thousands of years. At its most basic, fermentation is a metabolic process in which microorganisms such as bacteria, yeast, or moulds convert sugars into other compounds, typically alcohol or organic acids, in the absence of oxygen. Archaeological evidence suggests that humans have been fermenting foods and beverages for at least nine thousand years. The earliest known fermented beverage is a rice, honey, and fruit wine discovered in pottery jars at a Neolithic site in Henan province, China. The Egyptians were among the first to master the art of bread-making using wild yeast, and their techniques spread throughout the ancient Mediterranean world. But it was not until the nineteenth century that science began to catch up with practice. Louis Pasteur, working in the 1850s and 1860s, was the first to demonstrate that fermentation was caused by living microorganisms rather than by spontaneous chemical decomposition. This insight laid the groundwork for the entire field of microbiology. In recent years, fermented foods have experienced a remarkable resurgence in popularity, driven by growing evidence of their health benefits. The live microorganisms present in foods like yoghurt, kimchi, sauerkraut, and kefir, collectively known as probiotics, appear to play an important role in maintaining a healthy gut microbiome. Research has linked a diverse gut microbiome to improved immune function, better mental health, and reduced risk of chronic diseases including obesity and type two diabetes. The commercial fermentation industry has also expanded dramatically. Precision fermentation, which uses genetically engineered microorganisms to produce specific proteins, is being hailed as a potential game-changer for the food industry, with companies using the technology to create animal-free dairy products, egg proteins, and even collagen.",
items:[
  {pre:"Fermentation is a metabolic process in which microorganisms convert sugars in the absence of",gap:"oxygen",post:"."},
  {pre:"Humans have been fermenting foods for at least",gap:"nine thousand years",post:"."},
  {pre:"The earliest known fermented beverage was found in pottery jars at a site in",gap:"Henan province",post:", China."},
  {pre:"Louis Pasteur demonstrated that fermentation was caused by living",gap:"microorganisms",post:"rather than chemical decomposition."},
  {pre:"Live microorganisms in fermented foods are collectively known as",gap:"probiotics",post:"."},
  {pre:"A diverse gut microbiome has been linked to improved immune function and better",gap:"mental health",post:"."},
  {pre:"Precision fermentation uses genetically engineered microorganisms to produce specific",gap:"proteins",post:"."},
  {pre:"Companies are using precision fermentation to create animal-free dairy products, egg proteins, and",gap:"collagen",post:"."}
]},
// Ex 8 - Writing
{type:"wr",tl:"Writing",title:"Part 1 - Essay",ins:"Write your essay (220-260 words).",
prompt:"Your class has been discussing the role of the arts in society. You have made the notes below.\n\nBenefits of the arts:\n- personal wellbeing and mental health\n- economic contribution and employment\n- social cohesion and community building\n\nSome opinions expressed in the discussion:\n\"Engaging with art, music, and literature reduces stress and improves emotional wellbeing.\"\n\"The creative industries generate billions in revenue and employ millions of people worldwide.\"\n\"Shared cultural experiences bring communities together and foster understanding.\"\n\nWrite an essay discussing two of the benefits listed above, explaining which you think is more important. You should use your own words as far as possible.",minWords:220}
]},
// ===== TEST 7 =====
{t:"Practice Test 7",exercises:[
// Ex 1 - MC Cloze
{type:"mc",tl:"Use of English",title:"Part 1 - Multiple-choice Cloze",ins:"Choose the correct word (A-D) for each gap.",
passage:"The relationship between music and the brain has been the (1)_____ of intensive scientific investigation in recent decades. Research has revealed that musical training can have (2)_____ effects on cognitive development, particularly when begun in childhood. Learning to play an instrument requires the simultaneous coordination of motor, auditory, and visual processing, which (3)_____ the development of robust neural pathways. Studies have shown that children who receive sustained musical education tend to (4)_____ their peers in areas such as verbal memory, spatial reasoning, and reading ability. The benefits are not (5)_____ to children, however. Older adults who take up an instrument for the first time have shown improvements in working memory and processing speed, suggesting that musical engagement offers a measure of protection against age-related cognitive (6)_____. The mechanisms underlying these effects are still being (7)_____ out, but the evidence to date is sufficiently compelling to have (8)_____ calls for music education to be given a more prominent place in school curricula.",
items:[
  {q:"Gap 1",opts:["topic","focus","subject","theme"],ans:2},
  {q:"Gap 2",opts:["profound","intense","acute","extreme"],ans:0},
  {q:"Gap 3",opts:["stimulates","activates","provokes","generates"],ans:0},
  {q:"Gap 4",opts:["outperform","overcome","outnumber","outweigh"],ans:0},
  {q:"Gap 5",opts:["restricted","confined","limited","bound"],ans:1},
  {q:"Gap 6",opts:["decline","descent","decrease","deterioration"],ans:0},
  {q:"Gap 7",opts:["sorted","figured","worked","carried"],ans:2},
  {q:"Gap 8",opts:["prompted","triggered","initiated","sparked"],ans:3}
]},
// Ex 2 - Open Cloze
{type:"fl",tl:"Use of English",title:"Part 2 - Open Cloze",ins:"Write the word which best fits each gap.",
items:[
  {pre:"I couldn\\u0027t help",gap:"but",post:"notice the tension between the two speakers during the panel discussion."},
  {pre:"She has a tendency to take things",gap:"for",post:"granted, which can be frustrating for those around her."},
  {pre:"The regulations came",gap:"into",post:"force at the beginning of the financial year."},
  {pre:"Remarkable",gap:"as",post:"it may seem, the village has survived virtually unchanged for over five hundred years."},
  {pre:"They went ahead with the plan in",gap:"spite",post:"of strong opposition from local residents."},
  {pre:"The book, the title",gap:"of",post:"which I cannot now recall, made a lasting impression on me."},
  {pre:"At no point",gap:"did",post:"the company acknowledge any responsibility for the environmental damage."},
  {pre:"She was",gap:"anything",post:"but pleased when she heard the news."}
]},
// Ex 3 - Word Formation
{type:"wf",tl:"Use of English",title:"Part 3 - Word Formation",ins:"Use the word given to form a word that fits the gap.",
items:[
  {pre:"The",root:"ADMIRE",gap:"admiration",post:"she felt for the artist\\u0027s work was evident in every aspect of her critique."},
  {pre:"The project was abandoned due to",root:"FORESEE",gap:"unforeseen",post:"complications that arose during the initial testing phase."},
  {pre:"His",root:"CONSIDER",gap:"inconsiderate",post:"behaviour towards his colleagues earned him a formal reprimand."},
  {pre:"The city has undergone a remarkable",root:"TRANSFORM",gap:"transformation",post:"in the past two decades."},
  {pre:"The",root:"EMPLOY",gap:"unemployment",post:"rate has fallen to its lowest level in over a decade."},
  {pre:"She demonstrated an",root:"EXCEED",gap:"exceedingly",post:"high level of proficiency in all four language skills."},
  {pre:"The report\\u0027s conclusions were based on",root:"QUESTION",gap:"questionable",post:"methodology and should be treated with caution."},
  {pre:"The museum\\u0027s collection includes several",root:"REPLACE",gap:"irreplaceable",post:"artefacts from the Bronze Age."}
]},
// Ex 4 - Key Word Transformations
{type:"kt",tl:"Use of English",title:"Part 4 - Key Word Transformations",ins:"Use 3-6 words including the word given.",
items:[
  {src:"The report was so complex that nobody could understand it.",kw:"FAR",ans:"the report was far too complex for anyone to understand",hint:"far too + adjective + for"},
  {src:"I strongly advise you to accept the offer.",kw:"WOULD",ans:"if I were you I would accept the offer",hint:"if I were you + would"},
  {src:"They believe the painting was stolen during the war.",kw:"HAVE",ans:"the painting is believed to have been stolen during the war",hint:"is believed to have been"},
  {src:"She always arrives late for meetings.",kw:"HABIT",ans:"she has a habit of arriving late for meetings",hint:"have a habit of + gerund"},
  {src:"He succeeded in spite of all the difficulties.",kw:"AGAINST",ans:"he succeeded against all the odds",hint:"against all the odds"},
  {src:"It is possible that she missed the announcement.",kw:"MAY",ans:"she may not have heard the announcement",hint:"may + not + have + past participle"}
]},
// Ex 5 - Reading MC
{type:"mc",tl:"Reading",title:"Part 5 - Multiple Choice",ins:"Choose the best answer (A-D).",
passage:"The concept of emotional intelligence, popularised by Daniel Goleman in his 1995 bestseller of the same name, has had an extraordinary influence on education, business, and popular psychology. Goleman argued that traditional measures of intelligence, as captured by IQ tests, account for only a fraction of what determines success in life. Equally, if not more, important are abilities such as recognising and managing one\\u0027s own emotions, empathising with others, and navigating social relationships effectively.\n\nThe idea struck a chord with the public, perhaps because it offered a democratic alternative to the somewhat elitist implications of IQ. If intelligence is fixed and largely genetic, then the cards are dealt at birth. Emotional intelligence, by contrast, was presented as something that could be learned, developed, and improved throughout life. Schools developed curricula around it, corporations built training programmes on its principles, and a vast self-help industry sprang up to service the demand.\n\nHowever, the scientific foundations of emotional intelligence have been questioned by a number of psychologists. One fundamental criticism concerns the definition of the concept itself. Goleman\\u0027s popular account blended together a wide range of personality traits, social skills, and motivational characteristics under a single umbrella term, making it difficult to measure or test in any rigorous way. More scientifically grounded models, such as the ability model proposed by Peter Salovey and John Mayer, who actually coined the term before Goleman popularised it, define emotional intelligence more narrowly as the ability to perceive, use, understand, and manage emotions.\n\nEven using these more precise definitions, the evidence that emotional intelligence predicts life outcomes independently of personality and general intelligence is mixed. Some studies have found modest correlations with job performance and relationship quality, but others have failed to replicate these findings. Critics argue that much of what is labelled emotional intelligence is simply a repackaging of well-established personality traits such as agreeableness, conscientiousness, and extraversion.\n\nThere is also a darker side to emotional intelligence that is rarely discussed in the popular literature. The ability to read and manage emotions can be used manipulatively as well as constructively. Research has found correlations between high emotional intelligence and Machiavellian behaviour, suggesting that those who are skilled at reading emotions may sometimes use this ability to deceive, manipulate, or exploit others.\n\nDespite these criticisms, the core insight of emotional intelligence, that social and emotional competencies matter for success and wellbeing, remains valuable, even if the scientific details are more complex and contested than the popular account suggests.",
items:[
  {q:"Why did the concept of emotional intelligence appeal to the public, according to the passage?",opts:["It confirmed what IQ tests had always shown.","It suggested that important life skills could be developed.","It was supported by extensive scientific research.","It focused exclusively on workplace success."],ans:1},
  {q:"What criticism does the writer make of Goleman\\u0027s definition?",opts:["It was too narrow to be practically useful.","It was copied without credit from earlier researchers.","It combined too many different concepts to be measurable.","It ignored the role of emotions entirely."],ans:2},
  {q:"The passage indicates that Peter Salovey and John Mayer",opts:["rejected the concept of emotional intelligence entirely.","developed the term before Goleman made it widely known.","agreed completely with Goleman\\u0027s definition.","conducted research that disproved the concept."],ans:1},
  {q:"What does the evidence say about emotional intelligence and life outcomes?",opts:["Emotional intelligence is the strongest predictor of success.","The research findings are inconsistent.","There is no relationship between emotional intelligence and any outcome.","Emotional intelligence matters only in childhood."],ans:1},
  {q:"The \\u0027darker side\\u0027 of emotional intelligence refers to its potential for",opts:["causing emotional breakdowns.","reducing academic performance.","being used to manipulate others.","creating unrealistic expectations."],ans:2},
  {q:"What is the writer\\u0027s overall conclusion about emotional intelligence?",opts:["It is a completely discredited concept.","Its fundamental insight is sound, though oversimplified in popular accounts.","It should replace IQ as the main measure of intelligence.","It is only relevant in educational contexts."],ans:1}
]},
// Ex 6 - Listening Part 1
{type:"mc",tl:"Listening",title:"Part 1 - Short Extracts",ins:"Listen and choose the correct answer.",
items:[
  {audio:"Extract 1: Woman: I\\u0027ve been experimenting with the four-day working week in my department, and the results have been remarkable. Productivity is up, staff turnover is down, and sickness absence has dropped by nearly thirty percent. Man: Those are impressive figures. But how did you manage the transition? Weren\\u0027t there concerns about service delivery?",q:"What has the woman observed since implementing the four-day week?",opts:["A slight decrease in productivity.","Improvements across several key metrics.","Resistance from the majority of staff.","An increase in customer complaints."],ans:1},
  {audio:"Extract 1 (continued): Woman: Of course. We spent six months planning it, and we were very transparent with clients. The key was redesigning workflows to eliminate inefficiency rather than simply compressing five days of work into four. Man: That\\u0027s the crucial distinction, isn\\u0027t it? It\\u0027s not about working harder in fewer days.",q:"What does the man identify as the key factor?",opts:["Reducing the number of employees.","Increasing working hours per day.","Redesigning work processes rather than compressing hours.","Gaining approval from senior management."],ans:2},
  {audio:"Extract 2: Man: The new climate adaptation report makes for sobering reading. It essentially says that even if we meet our emissions targets, which is far from certain, we\\u0027re still locked into significant warming over the coming decades. Woman: Which is why adaptation has to be given equal priority to mitigation. We\\u0027ve spent so long focused on reducing emissions that we\\u0027ve neglected to prepare for the changes that are already inevitable.",q:"What is the woman\\u0027s argument?",opts:["Emissions reduction should remain the sole priority.","Preparing for climate change impacts is just as important as prevention.","The climate adaptation report is overly pessimistic.","Current emissions targets are too ambitious."],ans:1},
  {audio:"Extract 2 (continued): Man: The report recommends massive investment in flood defences, drought-resistant crops, and heat-resilient urban design. The price tag is enormous, but the cost of inaction would be far greater. Woman: Exactly. It\\u0027s a question of paying now or paying much more later.",q:"What do both speakers agree about the cost of adaptation?",opts:["It is too high to justify.","Investment now would be cheaper than dealing with future damage.","The private sector should bear the full cost.","International aid should fund all adaptation measures."],ans:1},
  {audio:"Extract 3: Woman: I went to see that new immersive theatre production last night. You know, the one where the audience moves through different rooms and interacts with the performers. Man: Oh, I\\u0027ve heard about it. What did you think? Woman: It was unlike anything I\\u0027ve experienced before. There\\u0027s something thrilling about not knowing what\\u0027s going to happen next, about being part of the story rather than just watching it.",q:"How does the woman describe the immersive theatre experience?",opts:["She found it confusing and disorienting.","She was excited by its unpredictability and participation.","She thought it was inferior to traditional theatre.","She felt the performers were poorly trained."],ans:1},
  {audio:"Extract 3 (continued): Man: It\\u0027s not for everyone, though. I know some people who found it quite anxiety-inducing, not knowing where to go or what was expected of them. Woman: I can see that. It requires a willingness to let go of control, which not everyone is comfortable with.",q:"What potential drawback does the man mention?",opts:["The tickets are very expensive.","Some audience members may find the format stressful.","The venues are often too small.","The shows tend to run over time."],ans:1}
]},
// Ex 7 - Listening Part 2
{type:"fl",tl:"Listening",title:"Part 2 - Sentence Completion",ins:"Complete the sentences with a word or short phrase.",
audio:"Welcome to today\\u0027s lecture on the science of habit formation. Why do we develop habits, and how can we change them? These are questions that psychologists and neuroscientists have been investigating with increasing sophistication. The fundamental mechanism is what researchers call the habit loop, which consists of three components: a cue, a routine, and a reward. The cue is a trigger that tells your brain to go into automatic mode. The routine is the behaviour itself, which can be physical, mental, or emotional. And the reward is what your brain gets out of the loop, which helps it decide whether this particular loop is worth remembering. Over time, as the loop is repeated, it becomes increasingly automatic. The neural pathways associated with the behaviour become strengthened through a process called long-term potentiation. Eventually, the behaviour requires almost no conscious effort, which is why habits can be so difficult to break. The basal ganglia, a cluster of structures deep within the brain, appear to play a central role in habit formation. Patients with damage to this region often lose the ability to form new habits while retaining their existing ones, which suggests that the formation and execution of habits involve distinct neural mechanisms. One of the most effective strategies for changing a habit is what Charles Duhigg calls the golden rule of habit change: keep the same cue and the same reward, but insert a new routine. If you habitually eat a biscuit every afternoon at three o\\u0027clock because you need a break from work, you might replace the biscuit with a short walk, which satisfies the same underlying need for a pause. Importantly, research shows that habits are not destiny. Even deeply ingrained behaviours can be modified with sustained effort and the right approach. The key is self-awareness: understanding the cues and rewards that drive your habits is the first step toward changing them.",
items:[
  {pre:"The habit loop consists of three components: a cue, a routine, and a",gap:"reward",post:"."},
  {pre:"The cue is a trigger that tells the brain to go into",gap:"automatic mode",post:"."},
  {pre:"Neural pathways are strengthened through a process called",gap:"long-term potentiation",post:"."},
  {pre:"The brain structure central to habit formation is the",gap:"basal ganglia",post:"."},
  {pre:"Patients with damage to this region lose the ability to form",gap:"new habits",post:"while retaining existing ones."},
  {pre:"The golden rule of habit change involves keeping the same cue and reward but inserting a new",gap:"routine",post:"."},
  {pre:"The underlying need satisfied by eating a biscuit at three o\\u0027clock is a",gap:"break from work",post:"."},
  {pre:"The first step toward changing habits is developing",gap:"self-awareness",post:"."}
]},
// Ex 8 - Writing
{type:"wr",tl:"Writing",title:"Part 1 - Essay",ins:"Write your essay (220-260 words).",
prompt:"Your class has been discussing the challenges facing young people today. You have made the notes below.\n\nChallenges facing young people:\n- housing affordability\n- job market competition\n- mental health pressures\n\nSome opinions expressed in the discussion:\n\"Rising property prices have made home ownership an impossible dream for many young people.\"\n\"The job market is more competitive than ever, with graduates competing for a limited number of positions.\"\n\"Social media and academic pressure are contributing to a mental health crisis among young people.\"\n\nWrite an essay discussing two of the challenges listed above, explaining which you think has a more serious impact on young people. You should use your own words as far as possible.",minWords:220}
]},
// ===== TEST 8 =====
{t:"Practice Test 8",exercises:[
// Ex 1 - MC Cloze
{type:"mc",tl:"Use of English",title:"Part 1 - Multiple-choice Cloze",ins:"Choose the correct word (A-D) for each gap.",
passage:"The science of forensic linguistics, which applies linguistic analysis to legal contexts, has (1)_____ a crucial role in several high-profile criminal cases. At its core, the discipline rests on the premise that every individual\\u0027s use of language is as distinctive as a fingerprint, characterised by unique patterns of vocabulary, grammar, and style that can be used to (2)_____ the authorship of disputed texts. One of the earliest and most celebrated applications involved the identification of the Unabomber, Ted Kaczynski, whose brother recognised the distinctive writing style of a manifesto published in 1995. While the field has made significant (3)_____ since then, it is not without controversy. Critics (4)_____ issue with the reliability of authorship attribution methods, arguing that the statistical techniques employed are not yet sufficiently robust to (5)_____ the burden of proof required in criminal proceedings. The (6)_____ of a particular writing style, they contend, does not necessarily constitute proof of identity, especially when texts are short or when the author may have deliberately (7)_____ their natural style. Nevertheless, forensic linguistics continues to expand its reach, with practitioners increasingly (8)_____ upon to analyse everything from threatening letters and suicide notes to disputed confessions and online harassment.",
items:[
  {q:"Gap 1",opts:["enacted","performed","played","conducted"],ans:2},
  {q:"Gap 2",opts:["allocate","assign","ascertain","attribute"],ans:2},
  {q:"Gap 3",opts:["strides","leaps","bounds","jumps"],ans:0},
  {q:"Gap 4",opts:["raise","take","bring","make"],ans:1},
  {q:"Gap 5",opts:["meet","fill","reach","match"],ans:0},
  {q:"Gap 6",opts:["attendance","appearance","occurrence","presence"],ans:3},
  {q:"Gap 7",opts:["disguised","concealed","hidden","covered"],ans:0},
  {q:"Gap 8",opts:["drawn","relied","counted","called"],ans:3}
]},
// Ex 2 - Open Cloze
{type:"fl",tl:"Use of English",title:"Part 2 - Open Cloze",ins:"Write the word which best fits each gap.",
items:[
  {pre:"The problem is",gap:"far",post:"more complex than anyone initially realised."},
  {pre:"He turned",gap:"down",post:"the opportunity, a decision he would later come to regret."},
  {pre:"Try",gap:"as",post:"she might, she could not find a satisfactory solution to the problem."},
  {pre:"The agreement was reached on",gap:"condition",post:"that both parties would abide by the terms without exception."},
  {pre:"She takes",gap:"after",post:"her mother in both temperament and appearance."},
  {pre:"Hardly had the meeting begun",gap:"when",post:"a fire alarm forced everyone to evacuate the building."},
  {pre:"The scheme was abandoned, not so much because of cost",gap:"as",post:"because of the lack of public support."},
  {pre:"He made",gap:"light",post:"of the difficulty, but everyone could see he was struggling."}
]},
// Ex 3 - Word Formation
{type:"wf",tl:"Use of English",title:"Part 3 - Word Formation",ins:"Use the word given to form a word that fits the gap.",
items:[
  {pre:"The",root:"PROBABLE",gap:"probability",post:"of success was estimated at less than ten percent."},
  {pre:"Her",root:"BREATH",gap:"breathtaking",post:"performance left the audience in stunned silence."},
  {pre:"The government\\u0027s",root:"COMMIT",gap:"commitment",post:"to reducing carbon emissions has been called into question."},
  {pre:"The new measures were introduced as a",root:"PRECAUTION",gap:"precautionary",post:"step to prevent further outbreaks."},
  {pre:"His",root:"SENSE",gap:"insensitivity",post:"to the feelings of others frequently caused unnecessary conflict."},
  {pre:"The",root:"EXTEND",gap:"extensive",post:"renovation of the historic building took nearly three years to complete."},
  {pre:"There was a",root:"MYSTERY",gap:"mysterious",post:"quality about the painting that drew visitors back again and again."},
  {pre:"The politician faced accusations of",root:"REPRESENT",gap:"misrepresentation",post:"of the facts during the parliamentary debate."}
]},
// Ex 4 - Key Word Transformations
{type:"kt",tl:"Use of English",title:"Part 4 - Key Word Transformations",ins:"Use 3-6 words including the word given.",
items:[
  {src:"It is essential that we leave on time.",kw:"IMPERATIVE",ans:"it is imperative that we leave on time",hint:"it is imperative that + subjunctive"},
  {src:"He denied having anything to do with the robbery.",kw:"INVOLVEMENT",ans:"he denied any involvement in the robbery",hint:"deny + involvement in"},
  {src:"She always speaks her mind, regardless of the consequences.",kw:"HOLDS",ans:"she never holds back from speaking her mind",hint:"hold back from + gerund"},
  {src:"We could not have succeeded without your generous support.",kw:"THANKS",ans:"we succeeded thanks to your generous support",hint:"thanks to + noun"},
  {src:"The moment I arrived, the phone started ringing.",kw:"SOONER",ans:"no sooner had I arrived than the phone started ringing",hint:"no sooner + inversion + than"},
  {src:"Her attitude to work has improved significantly.",kw:"MARKED",ans:"there has been a marked improvement in her attitude to work",hint:"marked improvement in"}
]},
// Ex 5 - Reading MC
{type:"mc",tl:"Reading",title:"Part 5 - Multiple Choice",ins:"Choose the best answer (A-D).",
passage:"The octopus has long fascinated scientists, but in recent years it has become the unlikely star of a broader philosophical debate about the nature of consciousness. With approximately 500 million neurons, two-thirds of which are located in its arms rather than its central brain, the octopus possesses a nervous system that is fundamentally different from that of any vertebrate. And yet its behavioural repertoire suggests a level of cognitive sophistication that is difficult to explain without invoking some form of subjective experience.\n\nOctopuses are master problem-solvers. They can navigate complex mazes, open childproof containers, and use tools, behaviours that in mammals would be taken as evidence of intelligence without hesitation. In laboratory settings, they have demonstrated the ability to recognise individual human faces and to behave differently toward people who have treated them well or poorly. Perhaps most remarkably, they engage in play, a behaviour that is widely regarded as a hallmark of advanced cognition because it serves no immediate survival function.\n\nThe philosophical challenge posed by the octopus lies in its evolutionary distance from humans. The last common ancestor of humans and octopuses lived approximately 600 million years ago, meaning that whatever cognitive abilities the octopus possesses evolved entirely independently of our own. This convergent evolution of intelligence raises profound questions. If consciousness can arise in such radically different biological substrates, does this suggest that it is a more fundamental feature of complex nervous systems than previously thought?\n\nPeter Godfrey-Smith, a philosopher of science and avid diver, has explored this question in depth. He argues that the octopus represents an independent experiment in the evolution of large brains and complex behaviour, and that studying it may reveal principles of consciousness that are obscured when we focus exclusively on organisms that share our vertebrate body plan.\n\nThe ethical implications are significant. If octopuses are indeed conscious, then their treatment in research laboratories and commercial fisheries demands serious reconsideration. Several countries have already begun to update their animal welfare legislation to include cephalopods, recognising that the capacity for suffering may extend well beyond the familiar circle of mammals and birds.\n\nWhether octopuses are truly conscious in any sense analogous to human experience remains an open question. But the very fact that we are compelled to ask it reveals the limitations of our current understanding and the urgent need for a more inclusive science of mind.",
items:[
  {q:"What makes the octopus\\u0027s nervous system unusual?",opts:["It has more neurons than any other invertebrate.","Most of its neurons are in its arms rather than its brain.","It is identical in structure to vertebrate nervous systems.","It lacks a central brain entirely."],ans:1},
  {q:"Why does the writer mention the octopus\\u0027s ability to play?",opts:["To show that octopuses have a sense of humour.","To argue that play is essential for survival.","To provide evidence of advanced cognitive abilities.","To compare octopuses unfavourably with mammals."],ans:2},
  {q:"The evolutionary distance between humans and octopuses is significant because",opts:["it means octopuses are less intelligent than mammals.","it suggests their cognitive abilities evolved independently.","it proves that consciousness requires a vertebrate brain.","it explains why octopuses cannot recognise human faces."],ans:1},
  {q:"Peter Godfrey-Smith believes that studying octopuses could",opts:["prove that all invertebrates are conscious.","replace the need for mammalian brain research.","reveal general principles about consciousness.","show that consciousness is unique to vertebrates."],ans:2},
  {q:"The writer mentions changes in animal welfare legislation to illustrate",opts:["that octopuses are already fully protected by law.","the growing recognition that cephalopods may suffer.","that all countries now treat octopuses as conscious beings.","the commercial importance of the fishing industry."],ans:1},
  {q:"What is the writer\\u0027s overall purpose in this passage?",opts:["To argue conclusively that octopuses are conscious.","To promote vegetarianism and animal rights.","To explore what octopus cognition reveals about consciousness.","To compare the intelligence of different marine species."],ans:2}
]},
// Ex 6 - Listening Part 1
{type:"mc",tl:"Listening",title:"Part 1 - Short Extracts",ins:"Listen and choose the correct answer.",
items:[
  {audio:"Extract 1: Man: The gentrification debate is more nuanced than either side acknowledges. Yes, property values rise and long-standing residents get displaced. But it\\u0027s also true that investment brings improved services, better infrastructure, and reduced crime. Woman: I don\\u0027t dispute the material improvements, but the question is: who benefits? If the original community is priced out, they\\u0027re essentially paying for someone else\\u0027s upgrade.",q:"What point does the woman make about gentrification?",opts:["It always leads to increased crime.","Its benefits often go to newcomers rather than existing residents.","It never produces any positive outcomes.","It is entirely driven by government policy."],ans:1},
  {audio:"Extract 1 (continued): Man: That\\u0027s a fair point. Some cities have experimented with community land trusts and rent stabilisation to try to capture the benefits while protecting existing residents. Woman: Those are promising models, but they require political will and significant public investment, which isn\\u0027t always forthcoming.",q:"What does the woman say about protective measures?",opts:["They are unnecessary because the market self-corrects.","They are effective but depend on political commitment.","They have already been widely implemented.","They are too expensive to be worthwhile."],ans:1},
  {audio:"Extract 2: Woman: I\\u0027ve been reading about the concept of circular economy, and it\\u0027s fascinating. Instead of the traditional linear model of take, make, dispose, the idea is to design products and systems so that waste is minimised and materials are continuously recycled. Man: It sounds ideal in theory. My concern is whether consumers are willing to pay the premium that circularity often entails. Sustainable materials and repairable design tend to cost more upfront.",q:"What concern does the man raise about the circular economy?",opts:["It is impossible to implement technologically.","Consumers may not accept higher initial costs.","It would lead to job losses in manufacturing.","Recycled materials are always lower in quality."],ans:1},
  {audio:"Extract 2 (continued): Woman: That\\u0027s true, but the total cost of ownership is often lower. A well-made product that lasts ten years and can be repaired is cheaper in the long run than a disposable one you replace every two years. Man: That\\u0027s a compelling argument, but it requires a fundamental shift in consumer mindset.",q:"How does the woman counter the man\\u0027s concern?",opts:["She argues that quality makes long-term costs lower.","She says sustainable products are already cheaper.","She suggests that consumers do not care about cost.","She recommends government subsidies for all sustainable products."],ans:0},
  {audio:"Extract 3: Man: Have you seen the new proposals for the national curriculum? They want to make coding compulsory from age five. Woman: I have mixed feelings about that. On the one hand, digital literacy is clearly essential in the modern world. On the other, I worry about what gets squeezed out to make room. Arts, music, and physical education are already under pressure. Man: That\\u0027s the perpetual curriculum dilemma, isn\\u0027t it? There\\u0027s only so much time in the school day.",q:"What is the woman\\u0027s concern about compulsory coding?",opts:["Children are too young to learn coding at age five.","It may come at the expense of other important subjects.","Coding skills become obsolete too quickly.","There are not enough qualified teachers."],ans:1},
  {audio:"Extract 3 (continued): Woman: I\\u0027d rather see a broader approach to digital literacy that includes critical thinking about technology, data privacy, and online safety, not just programming. Man: That\\u0027s a much more holistic vision. Programming is just one piece of the puzzle.",q:"What alternative does the woman suggest?",opts:["Removing all technology from schools.","Teaching only traditional academic subjects.","A wider digital literacy curriculum beyond just coding.","Making coding optional rather than compulsory."],ans:2}
]},
// Ex 7 - Listening Part 2
{type:"fl",tl:"Listening",title:"Part 2 - Sentence Completion",ins:"Complete the sentences with a word or short phrase.",
audio:"Good afternoon, everyone. Today\\u0027s topic is the psychology of procrastination, a behaviour that affects the vast majority of people to some degree but is widely misunderstood. Contrary to popular belief, procrastination is not primarily a problem of time management or laziness. Rather, it is fundamentally an emotion regulation problem. When we procrastinate, we are choosing short-term mood repair over long-term goal pursuit. The task we are avoiding typically triggers negative emotions, perhaps anxiety, boredom, frustration, or self-doubt, and procrastination provides temporary relief by allowing us to escape these feelings. The irony, of course, is that procrastination almost always makes things worse. The task doesn\\u0027t go away, and the delay generates additional stress, guilt, and self-criticism, creating a vicious cycle. Research by Timothy Pychyl at Carleton University has identified several task characteristics that make procrastination more likely. Tasks that are perceived as boring, frustrating, difficult, ambiguous, or lacking in personal meaning are the most commonly avoided. Interestingly, the absence of structure appears to be a particularly powerful trigger. When people are given a complex task with no clear starting point, procrastination rates increase dramatically. One of the most effective interventions is what psychologists call implementation intentions, specific if-then plans that link a situational cue to a desired behaviour. For example, rather than setting a vague goal like \\u0027I will work on my essay this weekend,\\u0027 you might specify \\u0027If it is Saturday at nine o\\u0027clock, then I will sit at my desk and write for thirty minutes.\\u0027 Studies have shown that this simple strategy can reduce procrastination by up to forty percent. Self-compassion has also emerged as a surprisingly effective tool. Research shows that people who forgive themselves for past procrastination are less likely to procrastinate on subsequent tasks, whereas those who engage in harsh self-criticism tend to procrastinate more.",
items:[
  {pre:"Procrastination is fundamentally an",gap:"emotion regulation",post:"problem."},
  {pre:"When we procrastinate, we choose short-term mood repair over long-term",gap:"goal pursuit",post:"."},
  {pre:"The delay caused by procrastination generates additional stress, guilt, and",gap:"self-criticism",post:"."},
  {pre:"Timothy Pychyl\\u0027s research was conducted at",gap:"Carleton University",post:"."},
  {pre:"Tasks that lack",gap:"structure",post:"are particularly likely to trigger procrastination."},
  {pre:"The specific if-then plans used to combat procrastination are called",gap:"implementation intentions",post:"."},
  {pre:"Implementation intentions can reduce procrastination by up to",gap:"forty percent",post:"."},
  {pre:"People who practise",gap:"self-compassion",post:"are less likely to procrastinate on future tasks."}
]},
// Ex 8 - Writing
{type:"wr",tl:"Writing",title:"Part 1 - Essay",ins:"Write your essay (220-260 words).",
prompt:"Your class has been discussing the importance of lifelong learning. You have made the notes below.\n\nReasons for lifelong learning:\n- keeping up with technological change\n- personal fulfilment and intellectual growth\n- career adaptability\n\nSome opinions expressed in the discussion:\n\"Technology is evolving so rapidly that the skills you learn today may be obsolete in five years.\"\n\"Learning for its own sake is one of the most rewarding experiences a person can have.\"\n\"In an uncertain job market, the ability to retrain and acquire new skills is essential.\"\n\nWrite an essay discussing two of the reasons listed above, explaining which you think provides a stronger motivation for lifelong learning. You should use your own words as far as possible.",minWords:220}
]},
// ===== TEST 9 =====
{t:"Practice Test 9",exercises:[
// Ex 1 - MC Cloze
{type:"mc",tl:"Use of English",title:"Part 1 - Multiple-choice Cloze",ins:"Choose the correct word (A-D) for each gap.",
passage:"The migration patterns of birds have captivated human observers for millennia, yet it is only in recent decades that technology has allowed scientists to (1)_____ the full complexity of these journeys. The Arctic tern, which holds the record for the longest annual migration, (2)_____ a round trip of approximately 70,000 kilometres between its breeding grounds in the Arctic and its wintering areas in the Antarctic. How such a small creature (3)_____ this extraordinary feat has long been a source of wonder. Research has now (4)_____ light on the navigational mechanisms involved. Birds appear to use a combination of the Earth\\u0027s magnetic field, the position of the sun and stars, and visual landmarks to (5)_____ their bearings. Some species even possess magnetite crystals in their beaks that function as a biological compass. Climate change, however, is beginning to (6)_____ havoc with these ancient patterns. Rising temperatures are causing some species to (7)_____ their migrations earlier, while others are shortening their routes or abandoning them altogether. The consequences for ecosystems that depend on the (8)_____ arrival of migratory species could be severe.",
items:[
  {q:"Gap 1",opts:["appreciate","grasp","comprehend","recognise"],ans:0},
  {q:"Gap 2",opts:["covers","crosses","spans","reaches"],ans:0},
  {q:"Gap 3",opts:["completes","accomplishes","achieves","fulfils"],ans:1},
  {q:"Gap 4",opts:["cast","shed","thrown","brought"],ans:1},
  {q:"Gap 5",opts:["find","get","take","make"],ans:1},
  {q:"Gap 6",opts:["cause","wreak","create","bring"],ans:1},
  {q:"Gap 7",opts:["commence","initiate","begin","undertake"],ans:2},
  {q:"Gap 8",opts:["punctual","timely","prompt","due"],ans:1}
]},
// Ex 2 - Open Cloze
{type:"fl",tl:"Use of English",title:"Part 2 - Open Cloze",ins:"Write the word which best fits each gap.",
items:[
  {pre:"The policy has come",gap:"in",post:"for considerable criticism from both academics and practitioners."},
  {pre:"She was brought",gap:"up",post:"in a small village in the north of Scotland."},
  {pre:"On no",gap:"account",post:"should the emergency exits be blocked during working hours."},
  {pre:"The experiment failed, not for",gap:"want",post:"of effort, but because the underlying hypothesis was flawed."},
  {pre:"He is widely regarded",gap:"as",post:"one of the most influential economists of his generation."},
  {pre:"Strange as it",gap:"may",post:"seem, the most effective solution was also the simplest."},
  {pre:"The project was completed on time, in",gap:"spite",post:"of the numerous setbacks encountered along the way."},
  {pre:"It remains to",gap:"be",post:"seen whether the proposed reforms will have the desired effect."}
]},
// Ex 3 - Word Formation
{type:"wf",tl:"Use of English",title:"Part 3 - Word Formation",ins:"Use the word given to form a word that fits the gap.",
items:[
  {pre:"The",root:"VULNERABLE",gap:"vulnerability",post:"of coastal communities to flooding has increased dramatically."},
  {pre:"His",root:"CAUTION",gap:"cautious",post:"approach to investment has served him well over the years."},
  {pre:"The film offers a",root:"GRIP",gap:"gripping",post:"account of the explorer\\u0027s journey through uncharted territory."},
  {pre:"The",root:"APPLY",gap:"applicants",post:"were asked to submit a portfolio of their recent work."},
  {pre:"She showed remarkable",root:"RESOURCE",gap:"resourcefulness",post:"in finding solutions to the problems they encountered."},
  {pre:"The new legislation has been",root:"UNIVERSE",gap:"universally",post:"welcomed by environmental campaigners."},
  {pre:"His",root:"ABLE",gap:"inability",post:"to accept criticism made him a difficult person to work with."},
  {pre:"The findings were",root:"CONCLUDE",gap:"inconclusive",post:"and further research was recommended."}
]},
// Ex 4 - Key Word Transformations
{type:"kt",tl:"Use of English",title:"Part 4 - Key Word Transformations",ins:"Use 3-6 words including the word given.",
items:[
  {src:"I have never tasted such delicious food.",kw:"MOST",ans:"this is the most delicious food I have ever tasted",hint:"superlative + ever"},
  {src:"He got the job despite his lack of experience.",kw:"EVEN",ans:"he got the job even though he lacked experience",hint:"even though + clause"},
  {src:"They haven\\u0027t made a decision about the proposal yet.",kw:"REACHED",ans:"they have not yet reached a decision about the proposal",hint:"reach a decision"},
  {src:"The teacher made all the students rewrite the essay.",kw:"MADE",ans:"all the students were made to rewrite the essay",hint:"passive: be made to + infinitive"},
  {src:"It is pointless trying to change his mind.",kw:"USE",ans:"it is no use trying to change his mind",hint:"no use + gerund"},
  {src:"She can\\u0027t possibly have forgotten about the meeting.",kw:"WAY",ans:"there is no way she could have forgotten about the meeting",hint:"there is no way + clause"}
]},
// Ex 5 - Reading MC
{type:"mc",tl:"Reading",title:"Part 5 - Multiple Choice",ins:"Choose the best answer (A-D).",
passage:"The discovery of antibiotics is often cited as one of the most important medical advances of the twentieth century. Penicillin, first observed by Alexander Fleming in 1928 and later developed into a viable drug by Howard Florey and Ernst Boris Chain during the 1940s, transformed the treatment of bacterial infections and saved countless millions of lives. For the first time in human history, conditions that had been routinely fatal, from wound infections to pneumonia, could be effectively treated.\n\nHowever, the golden age of antibiotics may be drawing to a close. Antimicrobial resistance, the process by which bacteria evolve to withstand the drugs designed to kill them, has emerged as one of the most pressing public health challenges of our time. The World Health Organisation has described it as a fundamental threat to human health, development, and security, and current projections suggest that by 2050, drug-resistant infections could claim ten million lives annually, surpassing cancer as a global cause of death.\n\nThe mechanisms of resistance are varied and sophisticated. Bacteria can acquire resistance through genetic mutation, which occurs spontaneously and is then selected for by exposure to antibiotics. They can also obtain resistance genes from other bacteria through horizontal gene transfer, a process that allows resistance to spread rapidly across species. Some bacteria produce enzymes that break down antibiotics before they can take effect; others modify the target site that the antibiotic is designed to attack, rendering it ineffective.\n\nThe crisis has been accelerated by human behaviour. The overuse and misuse of antibiotics in human medicine, including the prescription of antibiotics for viral infections against which they are useless, has created intense selective pressure that favours resistant strains. The agricultural sector bears substantial responsibility as well. In many countries, antibiotics are routinely administered to livestock not to treat illness but to promote growth, a practice that creates vast reservoirs of resistant bacteria that can transfer to humans through the food chain.\n\nThe pipeline for new antibiotics has been drying up for decades. The economics of antibiotic development are fundamentally unattractive to pharmaceutical companies: antibiotics are taken for short courses, and any new drug would ideally be held in reserve to preserve its effectiveness, neither of which generates the sustained revenue that makes drug development profitable.\n\nInnovative approaches are being explored. Phage therapy, which uses viruses that specifically target bacteria, is attracting renewed interest after decades of neglect in the West. Researchers are also investigating the potential of antimicrobial peptides, CRISPR-based strategies that selectively destroy resistance genes, and even the use of predatory bacteria that consume pathogenic species.",
items:[
  {q:"What does the writer suggest about the impact of penicillin?",opts:["It was the only significant medical advance of the twentieth century.","It made previously deadly infections treatable.","It immediately eliminated all bacterial diseases.","It was widely available from the moment of its discovery."],ans:1},
  {q:"According to the passage, antimicrobial resistance is",opts:["a minor concern that affects only developing countries.","a problem that has already been largely resolved.","a potentially catastrophic threat to global health.","an inevitable consequence that cannot be addressed."],ans:2},
  {q:"Horizontal gene transfer is significant because it allows",opts:["bacteria to become immune to all known drugs permanently.","resistance to spread between different bacterial species.","scientists to create new antibiotics more easily.","viruses to become resistant to treatment."],ans:1},
  {q:"The writer mentions the use of antibiotics in livestock to illustrate",opts:["how modern farming has improved animal welfare.","that antibiotics are only effective in animals.","how agricultural practices contribute to resistance.","that the food chain is the only route of transmission."],ans:2},
  {q:"Why is antibiotic development unattractive to pharmaceutical companies?",opts:["The science is too complex.","There is no demand for new antibiotics.","Short treatment courses and reserve use limit profitability.","Governments prohibit private companies from developing antibiotics."],ans:2},
  {q:"The passage mentions phage therapy as",opts:["a completely new and untested idea.","a traditional Western medical practice.","an approach being reconsidered after a period of neglect.","the only viable alternative to antibiotics."],ans:2}
]},
// Ex 6 - Listening Part 1
{type:"mc",tl:"Listening",title:"Part 1 - Short Extracts",ins:"Listen and choose the correct answer.",
items:[
  {audio:"Extract 1: Woman: I\\u0027ve been volunteering at a community literacy programme for the past year, and it\\u0027s been an eye-opening experience. The number of adults in this country who struggle with basic reading is much higher than most people realise. Man: It\\u0027s a hidden problem, isn\\u0027t it? People are often ashamed to admit they have difficulty, so they develop elaborate strategies to conceal it.",q:"What has surprised the woman about adult literacy?",opts:["The low quality of teaching in literacy programmes.","The scale of the problem is greater than commonly assumed.","Adults are generally unwilling to seek help.","Literacy programmes receive too much government funding."],ans:1},
  {audio:"Extract 1 (continued): Woman: Exactly. And the consequences go far beyond reading. Low literacy affects employment prospects, health outcomes, and even civic participation. It\\u0027s a social justice issue at its core. Man: Have you seen improvements in the people you\\u0027ve worked with? Woman: Absolutely. The progress some learners make in just a few months is remarkable.",q:"What does the woman say about the effects of low literacy?",opts:["They are limited to educational contexts.","They extend to multiple areas of life.","They only affect elderly people.","They are easily resolved through online courses."],ans:1},
  {audio:"Extract 2: Man: I went to a fascinating talk about the archaeology of food. The speaker argued that studying ancient diets tells us as much about a civilisation as studying its art or architecture. Woman: That\\u0027s an interesting perspective. What kind of evidence do they use? Man: Everything from residue analysis on pottery to stable isotope analysis of bones. You can determine what people ate, where their food came from, and even whether different social classes had different diets.",q:"What does the man find interesting about food archaeology?",opts:["It focuses exclusively on wealthy ancient societies.","It provides insight into civilisations comparable to traditional archaeology.","It proves that ancient diets were healthier than modern ones.","It relies mainly on written records rather than physical evidence."],ans:1},
  {audio:"Extract 2 (continued): Woman: I suppose what appeals to me is that food is universal. Everyone eats, regardless of status or culture. Man: Exactly. And that\\u0027s what makes it such a democratic lens through which to study the past. Traditional archaeology has often focused on elite structures like temples and palaces.",q:"Why does the woman find food archaeology appealing?",opts:["It provides evidence that ancient food tasted better.","It is the only reliable method of archaeological investigation.","Food is a universal human experience that crosses social boundaries.","It is less expensive than traditional archaeological methods."],ans:2},
  {audio:"Extract 3: Woman: The government\\u0027s new scheme to encourage cycling in cities looks promising on paper, but I have reservations about the implementation. Dedicated cycle lanes are useless if they\\u0027re not properly separated from motor traffic. Man: I couldn\\u0027t agree more. Painted lines on roads don\\u0027t make cyclists feel safe. You need physical barriers, and that requires genuine investment.",q:"What do both speakers agree about cycle lanes?",opts:["Painted markings alone are insufficient for cyclist safety.","The government\\u0027s scheme has been well implemented.","Cycling infrastructure is already adequate in most cities.","Cyclists should share lanes with motor vehicles."],ans:0},
  {audio:"Extract 3 (continued): Man: The Dutch model is the gold standard. They\\u0027ve invested consistently for decades, and cycling now accounts for over a quarter of all journeys. Woman: But their cities are flat. That argument is often used here, but I think topography is less of a barrier than people claim. The real barrier is political will.",q:"What does the woman think is the main obstacle to cycling infrastructure?",opts:["The hilly terrain in most cities.","A lack of interest among the public.","Insufficient political commitment.","The expense of Dutch-style infrastructure."],ans:2}
]},
// Ex 7 - Listening Part 2
{type:"fl",tl:"Listening",title:"Part 2 - Sentence Completion",ins:"Complete the sentences with a word or short phrase.",
audio:"Good morning. I\\u0027d like to discuss the fascinating world of biomimicry, the practice of drawing inspiration from nature to solve human design and engineering challenges. The fundamental principle is elegantly simple: after 3.8 billion years of evolution, nature has already solved many of the problems that human engineers are still grappling with. Rather than reinventing the wheel, biomimicry asks us to observe, learn, and adapt. One of the most famous examples is Velcro, invented by Swiss engineer George de Mestral in 1941 after he noticed how burdock burrs clung to his dog\\u0027s fur. Under a microscope, he discovered tiny hooks on the burrs that attached to the loops in the fabric of his trousers, and he replicated this mechanism to create one of the most widely used fastening systems in the world. More recently, the study of the lotus leaf has led to the development of self-cleaning surfaces. The lotus leaf appears perfectly clean despite growing in muddy water. This is because its surface is covered in microscopic bumps that prevent water droplets from spreading. Instead, the droplets roll off, carrying dirt particles with them. Engineers have replicated this effect, known as the lotus effect, to create paints, coatings, and textiles that repel water and resist contamination. The Shinkansen bullet train in Japan provides another remarkable example. Engineers struggled with a problem: every time the train exited a tunnel at high speed, it created a thunderous sonic boom that disturbed residents in nearby areas. The solution came from an engineer who was also a birdwatcher. He redesigned the nose of the train to mimic the beak of the kingfisher, a bird that can dive from air into water with minimal splash. The redesigned nose not only eliminated the sonic boom but also reduced energy consumption by fifteen percent. These examples illustrate a broader truth: the natural world is an extraordinarily rich library of design solutions, and we have barely begun to explore its potential.",
items:[
  {pre:"Biomimicry draws inspiration from nature to solve human",gap:"design and engineering",post:"challenges."},
  {pre:"Nature has been solving problems through",gap:"evolution",post:"for 3.8 billion years."},
  {pre:"George de Mestral invented Velcro after observing how burdock burrs clung to his",gap:"dog\\u0027s fur",post:"."},
  {pre:"The lotus leaf stays clean because microscopic bumps prevent water droplets from",gap:"spreading",post:"."},
  {pre:"The lotus effect has been applied to create paints, coatings, and",gap:"textiles",post:"that repel water."},
  {pre:"The Shinkansen bullet train created a sonic boom when it exited a",gap:"tunnel",post:"at high speed."},
  {pre:"The train\\u0027s nose was redesigned to mimic the beak of the",gap:"kingfisher",post:"."},
  {pre:"The redesigned nose reduced energy consumption by",gap:"fifteen percent",post:"."}
]},
// Ex 8 - Writing
{type:"wr",tl:"Writing",title:"Part 1 - Essay",ins:"Write your essay (220-260 words).",
prompt:"Your class has been discussing the ethical responsibilities of consumers. You have made the notes below.\n\nAreas of ethical consumption:\n- fair trade products\n- reducing plastic use\n- supporting local businesses\n\nSome opinions expressed in the discussion:\n\"Buying fair trade ensures that producers in developing countries receive a fair price for their goods.\"\n\"The amount of plastic waste in our oceans is an environmental catastrophe that consumers can help address.\"\n\"Local businesses are the backbone of communities, and shopping locally keeps money in the local economy.\"\n\nWrite an essay discussing two of the areas listed above, explaining which you think has a more significant positive impact. You should use your own words as far as possible.",minWords:220}
]},
// ===== TEST 10 =====
{t:"Practice Test 10",exercises:[
// Ex 1 - MC Cloze
{type:"mc",tl:"Use of English",title:"Part 1 - Multiple-choice Cloze",ins:"Choose the correct word (A-D) for each gap.",
passage:"The digital revolution has fundamentally (1)_____ the way we consume news, with consequences that are only now beginning to be fully understood. The decline of print journalism has been accompanied by the (2)_____ of online platforms that operate according to very different principles. Traditional newspapers, for all their imperfections, employed editors who (3)_____ as gatekeepers, deciding which stories merited publication and ensuring at least a basic standard of factual accuracy. Social media platforms, by (4)_____, operate largely without editorial oversight, amplifying content on the basis of engagement rather than veracity. The result has been a (5)_____ of the information ecosystem in which reliable reporting competes for attention with deliberate disinformation and sensationalist clickbait. Some commentators have (6)_____ parallels with the era before the professionalisation of journalism, when partisan pamphlets and rumour dominated public discourse. Whether this analogy (7)_____ up to scrutiny is debatable, but there is no denying that the current situation poses a serious (8)_____ to informed democratic participation.",
items:[
  {q:"Gap 1",opts:["converted","altered","modified","varied"],ans:1},
  {q:"Gap 2",opts:["arrival","emergence","appearance","entrance"],ans:1},
  {q:"Gap 3",opts:["served","acted","functioned","worked"],ans:1},
  {q:"Gap 4",opts:["comparison","difference","distinction","contrast"],ans:3},
  {q:"Gap 5",opts:["corruption","degradation","contamination","pollution"],ans:1},
  {q:"Gap 6",opts:["drawn","made","found","seen"],ans:0},
  {q:"Gap 7",opts:["holds","stands","keeps","bears"],ans:1},
  {q:"Gap 8",opts:["danger","hazard","risk","threat"],ans:3}
]},
// Ex 2 - Open Cloze
{type:"fl",tl:"Use of English",title:"Part 2 - Open Cloze",ins:"Write the word which best fits each gap.",
items:[
  {pre:"The decision, taken in",gap:"haste",post:", was one they would come to regret bitterly."},
  {pre:"She took it",gap:"upon",post:"herself to organise the entire event without any assistance."},
  {pre:"Were the government",gap:"to",post:"increase taxes, the public reaction would be swift and hostile."},
  {pre:"The team was made",gap:"up",post:"of specialists drawn from a wide range of disciplines."},
  {pre:"By the time the ambulance arrived, the situation had gone",gap:"beyond",post:"the point where simple first aid could help."},
  {pre:"Not",gap:"once",post:"did she complain about the conditions, despite the obvious hardships."},
  {pre:"The committee met with a",gap:"view",post:"to establishing clearer guidelines for the allocation of funds."},
  {pre:"He put his success down",gap:"to",post:"a combination of hard work and fortunate timing."}
]},
// Ex 3 - Word Formation
{type:"wf",tl:"Use of English",title:"Part 3 - Word Formation",ins:"Use the word given to form a word that fits the gap.",
items:[
  {pre:"The",root:"EFFECT",gap:"effectiveness",post:"of the new treatment has been confirmed by multiple independent studies."},
  {pre:"Her",root:"AMBITION",gap:"ambitious",post:"plans for the company were met with a mixture of excitement and scepticism."},
  {pre:"The",root:"ACQUIRE",gap:"acquisition",post:"of the smaller firm gave the company a dominant market position."},
  {pre:"The documentary provided a",root:"COMPREHEND",gap:"comprehensive",post:"overview of the challenges facing the fishing industry."},
  {pre:"There was",root:"ARGUE",gap:"arguably",post:"no better candidate for the position in the entire department."},
  {pre:"The politician\\u0027s",root:"TRUST",gap:"untrustworthy",post:"reputation made it difficult for him to gain public support."},
  {pre:"The river\\u0027s",root:"ECOLOGY",gap:"ecological",post:"importance has only recently been fully appreciated."},
  {pre:"His",root:"TAKE",gap:"undertaking",post:"to reform the department was widely seen as both necessary and overdue."}
]},
// Ex 4 - Key Word Transformations
{type:"kt",tl:"Use of English",title:"Part 4 - Key Word Transformations",ins:"Use 3-6 words including the word given.",
items:[
  {src:"Nobody told me about the change of plan.",kw:"INFORMED",ans:"I was not informed about the change of plan",hint:"passive: be informed about"},
  {src:"She found the course much harder than she had expected.",kw:"NEARLY",ans:"the course was not nearly as easy as she had expected",hint:"not nearly as + adjective + as"},
  {src:"You are not allowed to use your phone during the exam.",kw:"CIRCUMSTANCES",ans:"under no circumstances are you allowed to use your phone",hint:"under no circumstances + inversion"},
  {src:"We should have booked the tickets earlier.",kw:"TIME",ans:"it is high time we had booked the tickets",hint:"it is high time + past simple"},
  {src:"The company expanded rapidly because of the new investment.",kw:"RESULT",ans:"the company expanded rapidly as a result of the new investment",hint:"as a result of"},
  {src:"He is the only person who can solve this problem.",kw:"APART",ans:"apart from him nobody can solve this problem",hint:"apart from + noun"}
]},
// Ex 5 - Reading MC
{type:"mc",tl:"Reading",title:"Part 5 - Multiple Choice",ins:"Choose the best answer (A-D).",
passage:"The notion that humans use only ten percent of their brains is one of the most persistent myths in popular culture. It appears in self-help books, motivational speeches, and Hollywood films with remarkable regularity, and surveys consistently show that a significant proportion of the public, including a surprising number of educated professionals, believe it to be true. The appeal of the myth is obvious: if we are operating at a mere fraction of our potential, then unlocking the remaining ninety percent could transform us into geniuses, or at least dramatically improve our cognitive abilities.\n\nThe reality, as neuroscience has emphatically demonstrated, is quite different. Brain imaging studies using techniques such as functional magnetic resonance imaging have shown that virtually all areas of the brain are active over the course of a typical day. Different regions are responsible for different functions, and while not every region is active simultaneously, there is no large dormant area waiting to be awakened. Even during sleep, significant brain activity persists.\n\nThe evolutionary argument against the myth is equally compelling. The brain is an enormously expensive organ in metabolic terms. Although it represents only about two percent of total body weight, it consumes approximately twenty percent of the body\\u0027s energy. It would be profoundly wasteful, and evolutionarily inexplicable, for nature to have developed such a costly organ if ninety percent of it served no purpose.\n\nThe origins of the myth are difficult to trace with certainty. Some historians attribute it to a misinterpretation of research by the psychologist William James, who wrote in the early twentieth century that the average person rarely achieves more than a small fraction of their potential. This statement about human achievement was subsequently distorted into a claim about brain anatomy. Others point to early neuroscience research that identified specific functions for only certain brain regions, leaving the purpose of the remainder unclear.\n\nThe myth persists in part because it is commercially useful. It provides a convenient premise for products and programmes that claim to unlock hidden cognitive potential, from brain training apps to dubious nutritional supplements. The promise that you could be smarter, more creative, or more productive if only you could access your untapped brainpower is an irresistibly attractive marketing proposition.\n\nParadoxically, while the ten percent myth is false, the underlying intuition that we could make better use of our cognitive resources contains a kernel of truth. Research into learning, memory, and cognitive enhancement has shown that strategies such as deliberate practice, adequate sleep, regular physical exercise, and effective study techniques can significantly improve cognitive performance. The improvements are real, but they come not from awakening dormant brain tissue, but from optimising the brain that is already fully at work.",
items:[
  {q:"According to the passage, the ten percent myth is appealing because",opts:["it has been confirmed by neuroscientific research.","it suggests that dramatic self-improvement is possible.","it is promoted by the medical profession.","it accurately reflects how the brain functions."],ans:1},
  {q:"Brain imaging studies have shown that",opts:["only ten percent of the brain is active at any time.","the brain is completely inactive during sleep.","essentially all brain regions are used regularly.","some brain areas have no function at all."],ans:2},
  {q:"The evolutionary argument against the myth is based on the fact that",opts:["the brain is metabolically inexpensive.","natural selection would not maintain a largely unused organ.","evolution favours larger brain size.","other organs consume more energy than the brain."],ans:1},
  {q:"The myth may have originated from",opts:["a deliberate hoax by neuroscientists.","a misquotation of William James about human potential.","ancient philosophical texts about the mind.","brain imaging studies conducted in the 1950s."],ans:1},
  {q:"The writer suggests that the myth continues because",opts:["scientists have not made enough effort to correct it.","it supports the marketing of cognitive enhancement products.","new evidence has emerged in its favour.","educational institutions promote it in their curricula."],ans:1},
  {q:"The writer\\u0027s final point is that",opts:["the myth is actually true after all.","there is no way to improve cognitive performance.","real cognitive improvement comes from optimising existing brain function.","brain training apps are the most effective way to enhance cognition."],ans:2}
]},
// Ex 6 - Listening Part 1
{type:"mc",tl:"Listening",title:"Part 1 - Short Extracts",ins:"Listen and choose the correct answer.",
items:[
  {audio:"Extract 1: Man: I\\u0027ve just finished a course on creative writing, and one thing that really struck me was how much of the craft is about revision. We tend to romanticise the idea of inspiration, but the reality is that most good writing comes from rewriting. Woman: That\\u0027s something I wish more people understood. First drafts are supposed to be rough. The magic happens in the editing.",q:"What do both speakers agree about writing?",opts:["Inspiration is the most important element.","First drafts are usually of publishable quality.","The revision process is where quality emerges.","Creative writing cannot be taught effectively."],ans:2},
  {audio:"Extract 1 (continued): Man: The most valuable exercise we did was peer review. Reading other people\\u0027s work critically, and having your own work critiqued, forces you to articulate what works and what doesn\\u0027t. Woman: It can be uncomfortable, but it\\u0027s essential. You can\\u0027t improve in isolation.",q:"Why does the man value peer review?",opts:["It eliminates the need for professional editors.","It helps writers develop critical analytical skills.","It makes the writing process faster.","It ensures that all feedback is positive."],ans:1},
  {audio:"Extract 2: Woman: The proposal to ban cars from the city centre has divided opinion sharply. Businesses are worried about losing customers, while residents are excited about cleaner air and safer streets. Man: It\\u0027s a classic case of short-term pain for long-term gain. Every city that\\u0027s done this has seen businesses flourish after an initial adjustment period. Pedestrianised areas attract more footfall, not less.",q:"What is the man\\u0027s position on banning cars from the city centre?",opts:["It would permanently harm local businesses.","It would benefit the city after an initial transition.","It should only apply to certain streets.","It is unnecessary because air quality is already good."],ans:1},
  {audio:"Extract 2 (continued): Woman: The business owners I\\u0027ve spoken to aren\\u0027t opposed to the principle, they\\u0027re worried about the transition period. If they lose three months of revenue while people adjust their habits, some won\\u0027t survive. Man: That\\u0027s where the council needs to step in with transition support, temporary rate reductions, marketing campaigns, that sort of thing.",q:"What does the man suggest to address business concerns?",opts:["Delaying the car ban indefinitely.","Government financial support during the transition.","Allowing businesses to keep private parking.","Reducing the scope of the ban."],ans:1},
  {audio:"Extract 3: Man: I attended a fascinating workshop on artificial intelligence and its implications for education. The presenter argued that we need to completely rethink assessment if students have access to AI tools that can write essays for them. Woman: It\\u0027s a legitimate concern, but I think the solution lies in redesigning assessments rather than banning AI. We should be testing thinking, not just output.",q:"What does the woman believe about AI in education?",opts:["AI should be completely banned from educational settings.","Assessments should be redesigned to focus on critical thinking.","AI tools are too unreliable to be useful in education.","Traditional essay writing should remain the primary form of assessment."],ans:1},
  {audio:"Extract 3 (continued): Man: So you\\u0027d favour things like oral examinations, project-based assessments, and collaborative tasks? Woman: Exactly. Formats where the process matters as much as the product, and where you can\\u0027t simply delegate the thinking to a machine.",q:"What types of assessment does the woman prefer?",opts:["Standardised multiple-choice examinations.","Take-home essays written over several weeks.","Formats that evaluate the thinking process, not just the final product.","Online assessments monitored by surveillance software."],ans:2}
]},
// Ex 7 - Listening Part 2
{type:"fl",tl:"Listening",title:"Part 2 - Sentence Completion",ins:"Complete the sentences with a word or short phrase.",
audio:"Thank you for being here today. I want to talk about the science of colour and its surprisingly powerful effects on human psychology and behaviour. Colour perception begins with light. What we see as colour is actually electromagnetic radiation of different wavelengths, processed by specialised photoreceptor cells in the retina called cones. Humans typically have three types of cones, sensitive to red, green, and blue light respectively, and it is the combination of signals from these cells that produces our rich experience of colour. People with colour vision deficiency, commonly known as colour blindness, have cones that function atypically, resulting in difficulty distinguishing certain colours. Research into the psychological effects of colour has produced some fascinating and commercially significant findings. Red, for example, has been shown to increase heart rate and stimulate appetite, which is why it is the dominant colour in fast food branding. Blue, by contrast, tends to suppress appetite and promote feelings of calm and trust, making it the preferred colour for corporate logos and social media platforms. Studies have even shown that the colour of a room can influence cognitive performance. Participants in one experiment performed better on creative tasks in blue rooms and better on detail-oriented tasks in red rooms. The influence of colour extends into retail environments, where it is used strategically to guide consumer behaviour. Warm colours like red and orange are typically used near store entrances to create a sense of urgency, while cooler colours are employed in areas where the retailer wants customers to linger and browse. Even pricing is affected: products displayed against blue backgrounds are perceived as better value than identical items shown against red backgrounds, a finding that has significant implications for online retail design. However, it is important to note that colour associations are not entirely universal. While some responses to colour appear to be biologically based, others are heavily influenced by cultural context. White, for example, is associated with purity and weddings in Western cultures but with mourning and funerals in several East Asian traditions.",
items:[
  {pre:"Colour perception is processed by specialised photoreceptor cells called",gap:"cones",post:"."},
  {pre:"Red has been shown to increase heart rate and stimulate",gap:"appetite",post:"."},
  {pre:"Blue is the preferred colour for corporate logos because it promotes feelings of calm and",gap:"trust",post:"."},
  {pre:"Participants performed better on creative tasks in",gap:"blue rooms",post:"."},
  {pre:"Warm colours near store entrances create a sense of",gap:"urgency",post:"."},
  {pre:"Products against blue backgrounds are perceived as better",gap:"value",post:"than those against red backgrounds."},
  {pre:"Some colour responses are biologically based, while others are influenced by",gap:"cultural context",post:"."},
  {pre:"In several East Asian traditions, white is associated with mourning and",gap:"funerals",post:"."}
]},
// Ex 8 - Writing
{type:"wr",tl:"Writing",title:"Part 1 - Essay",ins:"Write your essay (220-260 words).",
prompt:"Your class has been discussing the future of work. You have made the notes below.\n\nChanges affecting the future of work:\n- automation and artificial intelligence\n- remote and flexible working\n- the gig economy\n\nSome opinions expressed in the discussion:\n\"Automation will eliminate millions of jobs but create new ones that we cannot yet imagine.\"\n\"Remote working has given people more freedom but has blurred the boundary between work and personal life.\"\n\"The gig economy offers flexibility but at the cost of job security and workers\\u0027 rights.\"\n\nWrite an essay discussing two of the changes listed above, explaining which you think will have a greater impact on working life. You should use your own words as far as possible.",minWords:220}
]}
]
};


// Exponer en window para que cambridge-runner.html encuentre el dataset.
if (typeof window !== 'undefined') { window.CAM_CAE = CAM_CAE; }
