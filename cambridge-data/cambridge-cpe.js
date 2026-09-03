const CAM_CPE = {
id:"cpe", name:"C2 Proficiency (CPE)", level:"c2",
examInfo:{
  title:"C2 Proficiency (CPE)", level:"C2",
  overview:"C2 Proficiency is the highest-level Cambridge qualification, proving mastery of English at the level of a highly competent speaker.",
  papers:[
    {name:"Reading & Use of English",duration:"90 minutes",parts:7,questions:53},
    {name:"Writing",duration:"90 minutes",parts:2,questions:2},
    {name:"Listening",duration:"40 minutes",parts:4,questions:30},
    {name:"Speaking",duration:"16 minutes",parts:3,questions:null}
  ],
  paperDetails:[
    {paper:"Reading & Use of English",parts:[
      {part:1,name:"Multiple-choice cloze",questions:8,description:"Text with 8 gaps. Choose A-D. Tests advanced vocabulary and complementation."},
      {part:2,name:"Open cloze",questions:8,description:"Text with 8 gaps. Write the missing word. Tests advanced grammar."},
      {part:3,name:"Word formation",questions:8,description:"Form the correct word. May require multiple changes."},
      {part:4,name:"Key word transformations",questions:6,description:"Rewrite using 3-8 words including the key word."},
      {part:5,name:"Multiple choice (text)",questions:6,description:"Read a long text, answer detailed comprehension questions."},
      {part:6,name:"Gapped text",questions:7,description:"Seven paragraphs removed. Choose from eight."},
      {part:7,name:"Multiple matching",questions:10,description:"Match statements to sections of a long text."}
    ]},
    {paper:"Writing",parts:[
      {part:1,name:"Compulsory essay",questions:1,description:"Essay (240-280 words) summarising and evaluating two texts."},
      {part:2,name:"Choice task",questions:1,description:"Article, letter, report, or review (280-320 words)."}
    ]},
    {paper:"Listening",parts:[
      {part:1,name:"Multiple choice (short)",questions:6,description:"Three short extracts, two questions each."},
      {part:2,name:"Sentence completion",questions:9,description:"Monologue, complete sentences."},
      {part:3,name:"Multiple choice (long)",questions:5,description:"Conversation or interview, five four-option questions."},
      {part:4,name:"Multiple matching",questions:10,description:"Five themed monologues, two matching tasks."}
    ]}
  ],
  tips:[
    "Part 1 tests nuances between near-synonyms - study fine distinctions.",
    "Key word transformations at C2 often test idioms and fixed expressions.",
    "In writing, demonstrate sophisticated vocabulary and rhetorical skill.",
    "Listening features complex arguments - focus on speaker attitude and implication.",
    "For gapped text, pay attention to referencing and cohesion across paragraphs."
  ],
  scales:{pass:200,grade_B:213,grade_A:220,maxScore:230}
},
lessons:[
// ==============================
// PRACTICE TEST 1
// ==============================
{t:"Practice Test 1",exercises:[
// --- Exercise 1: MC Cloze ---
{type:"mc",tl:"Use of English",title:"Part 1 - Multiple-choice Cloze",ins:"Choose the best word (A-D) for each gap.",
passage:"The notion that creativity is an exclusively human (1)_____ has been called into question by recent developments in artificial intelligence. While machines can now (2)_____ works of art that appear genuinely original, critics argue that such outputs lack the intentionality that (3)_____ authentic creativity from mere imitation. The debate has (4)_____ longstanding philosophical questions about consciousness and the nature of artistic expression. Some researchers maintain that creativity is fundamentally (5)_____ in embodied experience, making it impossible for a disembodied algorithm to truly create. Others take a more (6)_____ view, suggesting that if the output is indistinguishable from human art, the question of its origins becomes (7)_____. What remains clear is that these technologies have irrevocably altered the cultural landscape, forcing us to (8)_____ our most cherished assumptions about what it means to be creative.",
items:[
{q:"Gap 1",opts:["prerogative","priority","privilege","predominance"],ans:0},
{q:"Gap 2",opts:["engender","generate","fabricate","manufacture"],ans:1},
{q:"Gap 3",opts:["distinguishes","discerns","discriminates","differentiates"],ans:0},
{q:"Gap 4",opts:["rekindled","reinstated","recounted","reclaimed"],ans:0},
{q:"Gap 5",opts:["grounded","founded","based","settled"],ans:0},
{q:"Gap 6",opts:["pragmatic","prosaic","practical","practiced"],ans:0},
{q:"Gap 7",opts:["immaterial","insignificant","irrelevant","inconsequential"],ans:2},
{q:"Gap 8",opts:["reappraise","reconsider","re-examine","reassess"],ans:0}
]},
// --- Exercise 2: Open Cloze ---
{type:"fl",tl:"Use of English",title:"Part 2 - Open Cloze",ins:"Write the word which best fits each gap.",
items:[
{pre:"Seldom",gap:"has",post:"a scientific discovery provoked such widespread controversy."},
{pre:"The theory, elegant",gap:"though",post:"it may be, fails to account for several anomalies."},
{pre:"Not until the final chapter",gap:"does",post:"the author reveal the true significance of the research."},
{pre:"It was the philosopher Kant",gap:"who",post:"first articulated this distinction with rigour."},
{pre:"Under no circumstances",gap:"should",post:"the results be interpreted as definitive proof."},
{pre:"The experiment succeeded, and it did",gap:"so",post:"against all expectations."},
{pre:"Were the funding",gap:"to",post:"be withdrawn, the entire programme would collapse."},
{pre:"Impressive",gap:"as",post:"the findings were, they left many questions unanswered."}
]},
// --- Exercise 3: Word Formation ---
{type:"wf",tl:"Use of English",title:"Part 3 - Word Formation",ins:"Use the word given to form a word that fits the gap.",
items:[
{pre:"The sheer",root:"PREDICT",gap:"unpredictability",post:"of the weather made planning impossible."},
{pre:"Her",root:"PHOTOGRAPH",gap:"photographic",post:"memory allowed her to recall entire pages of text."},
{pre:"The politician was accused of deliberate",root:"REPRESENT",gap:"misrepresentation",post:"of the facts."},
{pre:"They showed remarkable",root:"RESOURCE",gap:"resourcefulness",post:"in overcoming the obstacles."},
{pre:"The",root:"BUREAUCRACY",gap:"bureaucratic",post:"procedures delayed the project by months."},
{pre:"His behaviour was",root:"CHARACTER",gap:"uncharacteristic",post:"of someone usually so reserved."},
{pre:"The company underwent a major",root:"ORGANISE",gap:"reorganisation",post:"following the merger."},
{pre:"The decision was met with",root:"BELIEVE",gap:"disbelief",post:"by all present."}
]},
// --- Exercise 4: Key Word Transformations ---
{type:"kt",tl:"Use of English",title:"Part 4 - Key Word Transformations",ins:"Use 3-8 words including the word given.",
items:[
{src:"The film was so boring that most people left.",kw:"SUCH",ans:"it was such a boring film that",hint:"such + a/an + adj + noun + that"},
{src:"I had no idea the situation was so serious.",kw:"REALISE",ans:"I did not realise how serious the situation was",hint:"negative + realise + how + adj"},
{src:"People say that he embezzled millions from the charity.",kw:"ALLEGED",ans:"he is alleged to have embezzled millions",hint:"passive reporting + perfect infinitive"},
{src:"She started learning the violin when she was four.",kw:"AGE",ans:"she has been learning the violin since the age of",hint:"present perfect continuous + since the age of"},
{src:"We only managed to finish because everyone helped.",kw:"BUT",ans:"we would not have finished but for everyone helping",hint:"but for + -ing = if it had not been for"},
{src:"They regret not investing in the technology sooner.",kw:"WISH",ans:"they wish they had invested in the technology sooner",hint:"wish + past perfect for past regrets"}
]},
// --- Exercise 5: Reading MC ---
{type:"mc",tl:"Reading",title:"Part 5 - Multiple Choice",ins:"Choose the best answer (A-D).",
passage:"The concept of aesthetic autonomy, first articulated systematically during the Enlightenment, holds that art should be evaluated on its own terms rather than by reference to moral, political, or utilitarian criteria. This idea found its most influential expression in Kant\\'s Critique of Judgement, where the philosopher argued that true aesthetic appreciation involves a form of disinterested contemplation, a pleasure taken in the object itself rather than in any advantage it might confer upon the observer.\n\nYet the notion of disinterestedness has always attracted sceptics. Pierre Bourdieu, for instance, argued compellingly that what passes for pure aesthetic judgement is in reality a form of social distinction. In his landmark study, Distinction, Bourdieu demonstrated through extensive empirical research that taste is not a transcendent faculty but a product of class position and cultural capital. Those who claim to appreciate art for its own sake are, on this reading, unconsciously deploying their cultivated sensibility as a marker of social status.\n\nMore recently, a new wave of thinkers has sought to move beyond the Kant-Bourdieu impasse. These scholars argue that both positions contain elements of truth but are ultimately reductive. Art, they suggest, operates simultaneously in multiple registers: it is at once an aesthetic object, a social artefact, and a vehicle for emotional and intellectual exploration. To privilege any one of these dimensions at the expense of the others is to impoverish our understanding of what art does and why it matters.\n\nThis pluralistic approach has particular relevance in an age of digital reproduction and global cultural exchange. When a Japanese teenager encounters a Renaissance painting through a smartphone screen, the experience is manifestly different from that of an eighteenth-century European aristocrat contemplating the same work in a private gallery. Yet both encounters involve genuine aesthetic response, and to dismiss either as inauthentic would be to adopt precisely the kind of exclusionary stance that the pluralists wish to avoid.\n\nThe implications for criticism are profound. If we accept that art operates in multiple registers, then the task of the critic is not to issue definitive verdicts but to illuminate the various dimensions of a work, making visible what might otherwise remain hidden. This conception of criticism as illumination rather than adjudication represents, its proponents argue, a more honest acknowledgment of the complexity of aesthetic experience. Critics, on this view, are not judges but guides, helping audiences navigate the rich and sometimes bewildering terrain of contemporary culture.\n\nNot everyone is persuaded. Traditional aestheticians worry that pluralism risks dissolving the very concept of artistic quality into a morass of equally valid perspectives. If every response is legitimate, they ask, on what grounds can we distinguish a masterpiece from a mediocrity? The pluralists reply that quality is not abolished but reconceived: a great work is one that rewards engagement across multiple registers, offering rich aesthetic form, social insight, and emotional depth simultaneously.",
items:[
{q:"According to the passage, Kant believed that genuine aesthetic appreciation requires",opts:["an understanding of the artist\\'s moral intentions","pleasure derived from the object without ulterior motive","knowledge of the social context in which art was produced","a capacity for emotional rather than intellectual engagement"],ans:1},
{q:"The writer presents Bourdieu\\'s argument as",opts:["a decisive refutation of all aesthetic theory","an empirically supported challenge to disinterestedness","an elitist defence of traditional cultural values","a theoretical framework lacking practical application"],ans:1},
{q:"The phrase \\'Kant-Bourdieu impasse\\' implies that",opts:["neither thinker\\'s position alone adequately explains aesthetic experience","both thinkers reached the same conclusion by different methods","Bourdieu successfully built upon Kant\\'s original framework","the two positions are entirely compatible when properly understood"],ans:0},
{q:"The example of the Japanese teenager is used to illustrate that",opts:["digital technology has diminished the quality of aesthetic experience","authentic appreciation depends on the original context of viewing","meaningful aesthetic encounters can occur across diverse circumstances","Renaissance art is now more accessible than contemporary art"],ans:2},
{q:"The pluralist conception of the critic\\'s role is best described as",opts:["authoritative judge of artistic merit","facilitator of multi-dimensional understanding","defender of traditional aesthetic standards","mediator between artist and commercial interests"],ans:1},
{q:"What concern do traditional aestheticians raise about pluralism?",opts:["It overemphasises the social function of art at the expense of form.","It makes it impossible to evaluate artistic quality meaningfully.","It privileges digital over physical encounters with art.","It ignores the historical development of aesthetic theory."],ans:1}
]},
// --- Exercise 6: Listening Part 1 ---
{type:"mc",tl:"Listening",title:"Part 1 - Short Extracts",ins:"Listen and choose the correct answer.",
items:[
{audio:"Extract 1: Woman: I think the trouble with most sustainability initiatives is that they operate on the assumption that individual behaviour change will somehow aggregate into systemic transformation. Man: That\\'s a rather cynical take, surely? Woman: Not cynical, realistic. The evidence suggests that without structural reform at the policy level, voluntary measures simply cannot achieve the scale of change required.",q:"What point does the woman make about sustainability initiatives?",opts:["They place too much emphasis on personal responsibility.","They are fundamentally misguided in their objectives.","They have been deliberately designed to fail."],ans:0},
{audio:"Extract 1 (continued): Man: But surely raising awareness has value in itself? Woman: Awareness without agency is just anxiety. People need to feel they can actually influence outcomes, not merely observe the problem. Man: I take your point, though I still think grassroots movements have more power than you credit them with.",q:"The man suggests that",opts:["awareness campaigns are more effective than policy changes","community-level action should not be underestimated","structural reform is less important than individual effort"],ans:1},
{audio:"Extract 2: Man: The renovation of the gallery has been controversial, to say the least. The architect chose to juxtapose a radically modern extension with the original Victorian facade. Woman: And the result? Man: Opinions are divided. Purists are horrified, but I have to say the contrast works. It creates a dialogue between past and present that feels genuinely invigorating.",q:"How does the man feel about the gallery renovation?",opts:["He finds the contrast between old and new stimulating.","He believes the original facade should have been preserved.","He thinks the architect was too cautious in the design."],ans:0},
{audio:"Extract 2 (continued): Woman: I wonder whether visitors share your enthusiasm. Man: The visitor numbers speak for themselves - attendance has doubled since reopening. Whether that\\'s due to the architecture or mere curiosity remains to be seen.",q:"What does the man imply about the increased visitor numbers?",opts:["They are entirely attributable to the new design.","Their underlying cause is not yet certain.","They are likely to decline once the novelty fades."],ans:1},
{audio:"Extract 3: Woman: The memoir is extraordinary, partly because it refuses to sentimentalise its subject. Lesser writers would have turned this material into a tear-jerking narrative. Man: Instead? Woman: Instead, she maintains an almost clinical detachment that paradoxically makes the emotional moments far more devastating. It\\'s a masterclass in restraint.",q:"What does the woman admire most about the memoir?",opts:["Its emotionally charged and moving narrative style.","Its ability to generate powerful feeling through understatement.","Its comprehensive coverage of the subject\\'s life events."],ans:1},
{audio:"Extract 3 (continued): Man: Do you think that detachment might alienate some readers? Woman: Possibly, but that\\'s a risk worth taking. Literature that challenges its readers is ultimately more rewarding than work that simply confirms what they already feel.",q:"The woman believes that challenging literature",opts:["appeals only to a narrow readership","offers greater rewards despite potential difficulty","should prioritise accessibility over artistic integrity"],ans:1}
]},
// --- Exercise 7: Listening Part 2 ---
{type:"fl",tl:"Listening",title:"Part 2 - Sentence Completion",ins:"Complete each sentence with a word or short phrase.",
audio:"Good morning. Today I want to explore the remarkable phenomenon of collective memory, that is, how groups of people construct and maintain shared recollections of the past. The term was coined by the French sociologist Maurice Halbwachs in the 1920s, and it has since become one of the most productive concepts in the social sciences. Halbwachs argued that memory is never purely individual. Even our most personal recollections are shaped by the social frameworks within which we live. Consider how a family reunion can trigger memories you thought you had forgotten entirely. The social context literally reactivates dormant neural pathways. What makes collective memory particularly fascinating is its selectivity. Communities do not remember everything. They curate the past, foregrounding certain events while consigning others to oblivion. This process of selection is rarely neutral. It serves particular interests and reinforces specific narratives about identity and belonging. The controversy surrounding Confederate monuments in the American South provides a vivid illustration. These statues were erected not in the immediate aftermath of the Civil War but decades later, during the era of Jim Crow legislation. Their purpose was not to commemorate history but to legitimise a particular racial hierarchy. When communities today debate whether to remove them, they are really debating whose version of the past should occupy public space. Digital technology has introduced new complexities. Social media platforms function as vast archives of collective memory, yet they are governed by algorithms that prioritise engagement over accuracy. The result is what some scholars call a fragmentation of shared memory, as different groups inhabit increasingly incompatible versions of the recent past. The implications for democratic society are troubling. Democracy depends on a minimal degree of shared reality, and when collective memory fragments, the common ground necessary for deliberation erodes.",
items:[
{pre:"The concept of collective memory was first introduced by",gap:"Maurice Halbwachs",post:"in the 1920s."},
{pre:"According to the lecture, even personal memories are influenced by",gap:"social frameworks",post:"in which we live."},
{pre:"A family reunion can reactivate",gap:"dormant neural pathways",post:"associated with forgotten memories."},
{pre:"Communities practise selectivity by foregrounding certain events while others are pushed into",gap:"oblivion",post:"."},
{pre:"The lecturer states that the process of selecting memories usually serves particular",gap:"interests",post:"and reinforces narratives."},
{pre:"Confederate monuments were mostly erected during the era of",gap:"Jim Crow legislation",post:", not immediately after the war."},
{pre:"The statues were intended to legitimise a particular",gap:"racial hierarchy",post:"rather than to preserve historical facts."},
{pre:"On social media, algorithms tend to prioritise",gap:"engagement over accuracy",post:"when curating content."},
{pre:"The fragmentation of shared memory threatens the",gap:"common ground",post:"needed for democratic deliberation."}
]},
// --- Exercise 8: Writing ---
{type:"wr",tl:"Writing",title:"Part 1 - Essay",ins:"Write your essay in 240-280 words.",
prompt:"Write an essay summarising and evaluating the key points from both texts.\n\nText 1: Artificial intelligence will ultimately enhance human creativity by automating routine tasks and freeing people to focus on higher-order thinking. History shows that every major technological advance has expanded rather than diminished the scope of human achievement.\n\nText 2: The rise of AI-generated content threatens to devalue genuine human creativity. When machines can produce passable art, music, and writing at negligible cost, the economic incentive for humans to develop creative skills will erode, leading to a cultural impoverishment.",minWords:240}
]},
// ==============================
// PRACTICE TEST 2
// ==============================
{t:"Practice Test 2",exercises:[
// --- Exercise 1: MC Cloze ---
{type:"mc",tl:"Use of English",title:"Part 1 - Multiple-choice Cloze",ins:"Choose the best word (A-D) for each gap.",
passage:"The archaeological discovery at the remote highland site has (1)_____ a fundamental reassessment of early migration patterns across the continent. The artefacts unearthed there, which (2)_____ from approximately 12,000 years ago, suggest that human settlement occurred considerably earlier than previously (3)_____. What is particularly (4)_____ about the find is the sophistication of the tools, which display a level of craftsmanship that (5)_____ any simplistic narrative of linear technological progress. The research team, led by Professor Haruna, has been (6)_____ in their efforts to document every aspect of the site before the encroaching development renders further excavation impossible. Their findings have already (7)_____ considerable attention in the academic community, and several rival teams have expressed interest in conducting their own investigations in the surrounding area. Whether these subsequent expeditions will (8)_____ the initial conclusions or complicate them further remains to be seen.",
items:[
{q:"Gap 1",opts:["precipitated","instigated","provoked","incited"],ans:0},
{q:"Gap 2",opts:["originate","derive","stem","date"],ans:3},
{q:"Gap 3",opts:["surmised","conjectured","postulated","speculated"],ans:0},
{q:"Gap 4",opts:["striking","startling","staggering","stunning"],ans:0},
{q:"Gap 5",opts:["defies","denies","decries","deflects"],ans:0},
{q:"Gap 6",opts:["meticulous","scrupulous","painstaking","assiduous"],ans:2},
{q:"Gap 7",opts:["attracted","drawn","commanded","garnered"],ans:3},
{q:"Gap 8",opts:["corroborate","substantiate","authenticate","validate"],ans:0}
]},
// --- Exercise 2: Open Cloze ---
{type:"fl",tl:"Use of English",title:"Part 2 - Open Cloze",ins:"Write the word which best fits each gap.",
items:[
{pre:"Only after prolonged negotiation",gap:"did",post:"the two parties reach an agreement."},
{pre:"Remarkable",gap:"as",post:"the achievement was, it received little media coverage."},
{pre:"At no point",gap:"were",post:"the participants informed of the true purpose of the study."},
{pre:"It is widely acknowledged that the crisis could have been averted,",gap:"had",post:"the warnings been heeded."},
{pre:"The results were consistent",gap:"with",post:"what the researchers had predicted."},
{pre:"There is little doubt that this policy will prove effective, much",gap:"as",post:"its predecessor did in the 1990s."},
{pre:"Not only did the novel win the prize,",gap:"but",post:"it also became an international bestseller."},
{pre:"The extent",gap:"to",post:"which climate change will affect agricultural yields remains uncertain."}
]},
// --- Exercise 3: Word Formation ---
{type:"wf",tl:"Use of English",title:"Part 3 - Word Formation",ins:"Use the word given to form a word that fits the gap.",
items:[
{pre:"The",root:"SIGNIFY",gap:"significance",post:"of this discovery cannot be overstated."},
{pre:"Her",root:"SPEAK",gap:"outspokenness",post:"on political matters earned her both admirers and detractors."},
{pre:"The museum\\'s",root:"ACQUIRE",gap:"acquisitions",post:"committee approved the purchase unanimously."},
{pre:"The results were",root:"CONCLUDE",gap:"inconclusive",post:"and further testing was required."},
{pre:"Such",root:"PRECEDE",gap:"unprecedented",post:"levels of cooperation surprised everyone involved."},
{pre:"The",root:"WIDE",gap:"widening",post:"gap between rich and poor has become a pressing concern."},
{pre:"His",root:"DISMISS",gap:"dismissiveness",post:"towards the junior staff was widely resented."},
{pre:"The phenomenon has proven remarkably",root:"RESIST",gap:"resistant",post:"to conventional explanation."}
]},
// --- Exercise 4: Key Word Transformations ---
{type:"kt",tl:"Use of English",title:"Part 4 - Key Word Transformations",ins:"Use 3-8 words including the word given.",
items:[
{src:"He did not realise how much trouble he was causing.",kw:"LITTLE",ans:"little did he realise how much trouble",hint:"inversion with negative adverb"},
{src:"Although the team tried hard, they could not win the match.",kw:"HOWEVER",ans:"however hard the team tried they could not",hint:"however + adj/adv + subject + verb"},
{src:"She is too experienced to be deceived by such a simple trick.",kw:"TAKEN",ans:"she is too experienced to be taken in by",hint:"phrasal verb: taken in = deceived"},
{src:"The meeting was cancelled because not enough people attended.",kw:"OWING",ans:"the meeting was cancelled owing to insufficient attendance",hint:"owing to + noun phrase"},
{src:"It is likely that the cause of the fire was an electrical fault.",kw:"PUT",ans:"the fire can most likely be put down to an electrical fault",hint:"put down to = attribute to"},
{src:"The authorities should have acted more quickly during the crisis.",kw:"HIGH",ans:"it is high time the authorities had acted more quickly",hint:"it is high time + past simple/past perfect"}
]},
// --- Exercise 5: Reading MC ---
{type:"mc",tl:"Reading",title:"Part 5 - Multiple Choice",ins:"Choose the best answer (A-D).",
passage:"The study of language acquisition has long been polarised between nativist and empiricist camps. On one side stand those who, following Noam Chomsky, argue that humans possess an innate language faculty, a genetically encoded blueprint that constrains the possible forms human languages can take. On the other are researchers who maintain that language emerges through the same general learning mechanisms that govern other cognitive skills, with no need to posit a dedicated linguistic module.\n\nFor decades, the nativist position appeared to hold the upper hand. Chomsky\\'s argument from the poverty of the stimulus seemed compelling: children acquire complex grammatical rules with remarkable speed and accuracy despite being exposed to fragmentary and often ungrammatical input. This feat, nativists argued, would be inexplicable without some form of innate grammatical knowledge.\n\nHowever, the empiricist camp has mounted an increasingly sophisticated counterattack. Computational modelling studies have shown that statistical learning algorithms can extract surprisingly complex grammatical patterns from raw linguistic input. These models suggest that the input available to children may be richer and more structured than Chomsky assumed. Moreover, cross-linguistic research has revealed far greater diversity in grammatical structures than universal grammar theory would predict, undermining the claim that all languages share a common deep structure.\n\nPerhaps the most significant challenge to nativism comes from usage-based approaches, which emphasise the role of social interaction in language development. Researchers in this tradition have documented how children\\'s grammatical knowledge emerges gradually through exposure to specific constructions rather than appearing fully formed, as the nativist account would suggest. The child, on this view, is not so much activating a pre-installed programme as constructing a grammar from the ground up, using general cognitive abilities such as pattern recognition, analogy, and categorisation.\n\nThe implications extend well beyond linguistics. If language is not a distinct cognitive module but rather an emergent property of more general learning mechanisms, this has profound consequences for our understanding of the human mind. It suggests that the apparent modularity of cognition may be an illusion, that what looks like a collection of specialised processors is in reality a single, remarkably flexible system that differentiates through experience. This possibility has generated considerable excitement among researchers who study neural plasticity, the brain\\'s capacity to reorganise itself in response to environmental demands.\n\nNevertheless, even sympathetic observers acknowledge that usage-based approaches face formidable challenges. Explaining how children acquire abstract grammatical categories without some form of innate bias remains a significant hurdle. The debate, far from being settled, has entered a new and more nuanced phase, with many researchers advocating hybrid models that incorporate elements of both traditions.",
items:[
{q:"The writer\\'s primary purpose in the opening paragraph is to",opts:["advocate for the nativist position in language acquisition","outline the two main opposing perspectives in the field","demonstrate that the empiricist view has been conclusively proven","criticise Chomsky\\'s contribution to linguistics"],ans:1},
{q:"The phrase \\'poverty of the stimulus\\' refers to the idea that",opts:["children in impoverished families receive less linguistic input","the language children hear is insufficient to explain their grammatical ability","linguists lack adequate data to test their theories","empiricist models fail to generate realistic language output"],ans:1},
{q:"According to the passage, cross-linguistic research has",opts:["confirmed the existence of universal grammatical deep structures","shown that all languages follow identical acquisition patterns","revealed more structural variation than nativists predicted","proven that language learning relies solely on statistical methods"],ans:2},
{q:"The writer characterises usage-based approaches as suggesting that children",opts:["are born with a complete grammatical system that unfolds naturally","build grammatical knowledge incrementally through experience","learn language exclusively through formal instruction","rely primarily on imitation to acquire linguistic competence"],ans:1},
{q:"The broader implication discussed in paragraph five is that",opts:["the brain contains many highly specialised cognitive modules","neural plasticity has no relevance to language acquisition","cognitive modularity may be less fundamental than once thought","language is entirely separate from other mental faculties"],ans:2},
{q:"In the final paragraph, the writer suggests that the current state of the debate is",opts:["decisively resolved in favour of empiricist accounts","increasingly moving towards integrative theoretical frameworks","stagnant due to irreconcilable differences between camps","dominated by usage-based approaches with no serious opposition"],ans:1}
]},
// --- Exercise 6: Listening Part 1 ---
{type:"mc",tl:"Listening",title:"Part 1 - Short Extracts",ins:"Listen and choose the correct answer.",
items:[
{audio:"Extract 1: Man: The problem with interdisciplinary research is that it sounds wonderful in theory but founders on institutional realities. Departments guard their boundaries ferociously. Woman: I think that\\'s changing, slowly. The funding bodies are increasingly insisting on cross-departmental collaboration as a condition of grants.",q:"What is the man\\'s main concern about interdisciplinary research?",opts:["It lacks theoretical coherence.","Institutional structures impede its implementation.","Funding bodies are not supportive enough."],ans:1},
{audio:"Extract 1 (continued): Woman: And frankly, the most exciting work I\\'ve seen in the last decade has come from teams that bridge traditional disciplinary divides. Man: I\\'ll concede that. But we need to be honest about the friction involved. It\\'s not just administrative - there are genuine epistemological differences between fields that cannot be wished away.",q:"The man acknowledges that interdisciplinary work",opts:["is administratively straightforward once begun","has produced noteworthy research outcomes","should replace single-discipline research entirely"],ans:1},
{audio:"Extract 2: Woman: I was struck by the exhibition\\'s refusal to provide interpretive labels. You walk into the space and you\\'re confronted with these objects - no dates, no provenance, no curatorial narrative. Man: Deliberate, presumably? Woman: Entirely. The curator wanted visitors to engage with the aesthetic qualities of the artefacts before being told what to think about them.",q:"The woman regards the absence of labels as",opts:["an oversight that diminishes the visitor experience","an intentional strategy to encourage direct engagement","evidence of insufficient curatorial research"],ans:1},
{audio:"Extract 2 (continued): Man: It\\'s a bold move. I imagine some visitors found it frustrating. Woman: Some did, certainly. But the curator\\'s argument is that context can become a crutch. We default to reading the label instead of actually looking at the object.",q:"The curator believes that providing context can",opts:["enhance the visitor\\'s understanding of art","prevent visitors from engaging authentically with objects","only be effective in certain types of exhibitions"],ans:1},
{audio:"Extract 3: Man: What concerns me about the new urban planning guidelines is the assumption that density automatically equates to sustainability. Woman: You think that\\'s an oversimplification? Man: Profoundly so. Density without adequate infrastructure simply concentrates pollution and exacerbates inequality. You need the transport links, the green spaces, the social services to accompany it.",q:"The man argues that urban density",opts:["is inherently unsustainable regardless of infrastructure","requires supporting infrastructure to deliver sustainability benefits","should be avoided in favour of suburban development"],ans:1},
{audio:"Extract 3 (continued): Woman: So you\\'re not against density per se? Man: Not at all. I\\'m against the naive version of it that treats building upward as a panacea. Done thoughtfully, with genuine investment in public amenities, dense cities can be extraordinary places to live.",q:"The man\\'s overall position on dense urban living is that",opts:["it is only suitable for wealthy communities","it can succeed when accompanied by proper investment","it inevitably leads to reduced quality of life"],ans:1}
]},
// --- Exercise 7: Listening Part 2 ---
{type:"fl",tl:"Listening",title:"Part 2 - Sentence Completion",ins:"Complete each sentence with a word or short phrase.",
audio:"Today I would like to examine the history of public libraries and their evolving role in democratic societies. The modern public library as we know it is largely a product of the nineteenth century, though its roots extend back much further. The ancient Library of Alexandria, founded in the third century BCE, is often cited as an early precursor, though it served scholars rather than the general public. The true democratisation of library access began with the Free Libraries Act of 1850 in Britain, which empowered local authorities to establish libraries funded through taxation. The driving force behind this legislation was a belief that an educated populace was essential to the functioning of democracy. In the United States, the philanthropist Andrew Carnegie played a pivotal role, funding the construction of over 2,500 libraries between 1883 and 1929. Carnegie\\'s motives were complex, combining genuine philanthropic impulse with a desire to promote self-improvement as an alternative to organised labour. In recent decades, public libraries have undergone a dramatic transformation. They have evolved from repositories of books into multifunctional community hubs, offering digital literacy classes, co-working spaces, and social support services. This evolution has provoked debate. Traditionalists argue that libraries should remain focused on their core mission of providing access to knowledge through printed materials. Modernisers counter that adapting to community needs is precisely what libraries have always done. The most compelling research suggests that libraries serve as crucial third spaces, environments distinct from home and work where people of different backgrounds can interact on equal terms. In an era of increasing social fragmentation, this function may be more valuable than ever.",
items:[
{pre:"The Library of Alexandria was founded in the",gap:"third century BCE",post:"but served scholars, not the general public."},
{pre:"The Free Libraries Act was passed in",gap:"1850",post:"in Britain."},
{pre:"The legislation was motivated by the belief that democracy required an",gap:"educated populace",post:"."},
{pre:"Andrew Carnegie funded the construction of over",gap:"2,500 libraries",post:"in the United States."},
{pre:"Carnegie\\'s motives combined philanthropy with promoting self-improvement as an alternative to",gap:"organised labour",post:"."},
{pre:"Modern libraries now offer digital literacy classes, co-working spaces, and",gap:"social support services",post:"."},
{pre:"Traditionalists believe libraries should focus on providing access to knowledge through",gap:"printed materials",post:"."},
{pre:"Research shows that libraries function as important",gap:"third spaces",post:"where diverse people can interact as equals."},
{pre:"In a time of growing social fragmentation, this role may be more",gap:"valuable than ever",post:"."}
]},
// --- Exercise 8: Writing ---
{type:"wr",tl:"Writing",title:"Part 1 - Essay",ins:"Write your essay in 240-280 words.",
prompt:"Write an essay summarising and evaluating the key points from both texts.\n\nText 1: Public libraries remain indispensable institutions. They provide free access to information, serve as community gathering spaces, and offer vital support services to disadvantaged groups. No digital platform can fully replicate these functions.\n\nText 2: In an age of ubiquitous internet access and digital publishing, the traditional library model is increasingly obsolete. The vast sums spent on maintaining library buildings would be better invested in expanding digital access and online educational resources.",minWords:240}
]},
// ==============================
// PRACTICE TEST 3
// ==============================
{t:"Practice Test 3",exercises:[
// --- Exercise 1: MC Cloze ---
{type:"mc",tl:"Use of English",title:"Part 1 - Multiple-choice Cloze",ins:"Choose the best word (A-D) for each gap.",
passage:"The resurgence of interest in ancient philosophical traditions has (1)_____ a generation of thinkers to revisit questions that were once dismissed as hopelessly outdated. Stoicism, in particular, has enjoyed a remarkable (2)_____ in popularity, with bestselling books and podcasts bringing its core tenets to a mass audience. Yet this popularisation has come at a (3)_____. The nuanced ethical framework developed by Marcus Aurelius and Epictetus has been (4)_____ to a set of self-help platitudes that would be scarcely recognisable to its original proponents. The danger is that by (5)_____ Stoicism of its philosophical complexity, we reduce it to little more than a coping mechanism for the anxieties of modern life. Serious scholars have (6)_____ this trend with some alarm, arguing that it represents a fundamental misunderstanding of what the Stoics were attempting to achieve. Their philosophy was not about suppressing emotion or achieving personal tranquillity, but about understanding one\\'s place within a (7)_____ interconnected cosmos. To (8)_____ this dimension is to miss the point entirely.",
items:[
{q:"Gap 1",opts:["prompted","propelled","projected","proffered"],ans:0},
{q:"Gap 2",opts:["resurgence","revival","restoration","renewal"],ans:0},
{q:"Gap 3",opts:["cost","price","expense","charge"],ans:1},
{q:"Gap 4",opts:["compressed","condensed","distilled","reduced"],ans:3},
{q:"Gap 5",opts:["stripping","depriving","divesting","robbing"],ans:0},
{q:"Gap 6",opts:["regarded","observed","viewed","watched"],ans:1},
{q:"Gap 7",opts:["profoundly","deeply","thoroughly","intensely"],ans:0},
{q:"Gap 8",opts:["overlook","overpass","override","overrun"],ans:0}
]},
// --- Exercise 2: Open Cloze ---
{type:"fl",tl:"Use of English",title:"Part 2 - Open Cloze",ins:"Write the word which best fits each gap.",
items:[
{pre:"Had the government acted sooner, the crisis might",gap:"have",post:"been averted altogether."},
{pre:"So pervasive is the influence of social media",gap:"that",post:"it has fundamentally altered how people relate to one another."},
{pre:"The project was ambitious, to say the",gap:"least",post:", but the team remained undaunted."},
{pre:"Little",gap:"did",post:"anyone suspect that the results would prove so controversial."},
{pre:"She completed the marathon in record time and",gap:"in",post:"so doing, inspired a generation of runners."},
{pre:"The theory holds water only in",gap:"so",post:"far as the initial assumptions are valid."},
{pre:"Much",gap:"as",post:"I admire her determination, I question the wisdom of her approach."},
{pre:"It was not until the evidence was re-examined",gap:"that",post:"the true cause of the failure became apparent."}
]},
// --- Exercise 3: Word Formation ---
{type:"wf",tl:"Use of English",title:"Part 3 - Word Formation",ins:"Use the word given to form a word that fits the gap.",
items:[
{pre:"The",root:"PERCEIVE",gap:"misconception",post:"that wealth guarantees happiness persists despite evidence to the contrary."},
{pre:"His",root:"WILLING",gap:"unwillingness",post:"to compromise ultimately led to the collapse of the negotiations."},
{pre:"The",root:"CORRESPOND",gap:"correspondence",post:"between theory and observation was remarkably close."},
{pre:"She displayed",root:"EXCEED",gap:"exceedingly",post:"good judgement under pressure."},
{pre:"The",root:"MAINTAIN",gap:"maintenance",post:"of the building had been neglected for decades."},
{pre:"Their",root:"RELY",gap:"overreliance",post:"on a single data source proved to be their downfall."},
{pre:"The sheer",root:"AUDACIOUS",gap:"audacity",post:"of the proposal took everyone by surprise."},
{pre:"Environmental",root:"DEGRADE",gap:"degradation",post:"has accelerated at an alarming rate in recent years."}
]},
// --- Exercise 4: Key Word Transformations ---
{type:"kt",tl:"Use of English",title:"Part 4 - Key Word Transformations",ins:"Use 3-8 words including the word given.",
items:[
{src:"I am sure she did not do it deliberately.",kw:"INTENTION",ans:"she could not have had any intention of doing",hint:"have no intention of + -ing"},
{src:"The project failed because of poor management.",kw:"DOWN",ans:"the failure of the project was down to poor management",hint:"be down to = be caused by"},
{src:"He suddenly realised that he had made a terrible mistake.",kw:"DAWNED",ans:"it suddenly dawned on him that he had made",hint:"it dawned on someone that"},
{src:"We had to cancel the event because of the storm.",kw:"CALLED",ans:"the event had to be called off because of",hint:"call off = cancel"},
{src:"She has a tendency to exaggerate her achievements.",kw:"PRONE",ans:"she is prone to exaggerating her achievements",hint:"be prone to + -ing"},
{src:"Apparently, the company is about to go bankrupt.",kw:"VERGE",ans:"the company is apparently on the verge of going bankrupt",hint:"on the verge of + -ing"}
]},
// --- Exercise 5: Reading MC ---
{type:"mc",tl:"Reading",title:"Part 5 - Multiple Choice",ins:"Choose the best answer (A-D).",
passage:"The anthropologist Claude Levi-Strauss revolutionised the study of human culture by applying the methods of structural linguistics to the analysis of myth, kinship, and ritual. His central insight was deceptively simple: just as languages are structured by underlying rules that speakers follow unconsciously, so too are cultures organised by deep structures that their members neither perceive nor articulate. These structures, Levi-Strauss argued, are not arbitrary but reflect the fundamental operations of the human mind, particularly its tendency to organise experience through binary oppositions such as nature and culture, raw and cooked, self and other.\n\nThe appeal of structuralism was enormous. It offered a rigorous, quasi-scientific methodology for the study of culture at a time when the humanities were anxious about their intellectual credentials. Levi-Strauss\\'s magisterial four-volume study of South American mythology, the Mythologiques, demonstrated the approach at its most ambitious, revealing intricate networks of logical transformations linking hundreds of apparently unrelated myths into a single coherent system.\n\nYet the very qualities that made structuralism so compelling also contained the seeds of its decline. Critics pointed out that the binary oppositions Levi-Strauss identified were often imposed upon the data rather than discovered within it. The analyst, they suggested, was seeing patterns that reflected his own cognitive habits rather than those of the cultures under study. More fundamentally, structuralism was accused of draining culture of its lived, experiential dimension. By reducing myth to a set of logical operations, Levi-Strauss arguably stripped it of precisely those qualities, its emotional resonance, its capacity to console and inspire, that make it meaningful to the people who tell and retell it.\n\nPost-structuralist thinkers, most notably Jacques Derrida, mounted a devastating philosophical critique. Derrida argued that the binary oppositions upon which structuralism depends are inherently unstable. Each term in a pair, he showed, is defined not by some essential quality but by its difference from the other. This means that meaning is never fixed but perpetually deferred, always sliding along chains of signification that can never be definitively anchored. If Derrida was right, then the stable structures Levi-Strauss claimed to have discovered were illusory, products of a Western metaphysical tradition that has always yearned for fixed foundations but can never truly find them.\n\nThe legacy of structuralism is correspondingly ambivalent. Few scholars today would describe themselves as structuralists in the strict Levi-Straussian sense. Yet the influence of structural thinking pervades contemporary intellectual life. The very idea that culture can be analysed as a system of signs, that meaning is relational rather than inherent, that surface diversity may conceal deep regularities, these insights, which structuralism did more than any other movement to popularise, have become part of the intellectual furniture of the modern academy. In this sense, structuralism succeeded not by surviving as a distinct school of thought but by dissolving into the broader intellectual culture, transforming how we think about thinking itself.",
items:[
{q:"The writer describes Levi-Strauss\\'s central insight as \\'deceptively simple\\' because",opts:["it concealed a profound complexity beneath an apparently straightforward idea","it was an intentional oversimplification designed to attract followers","it proved to be fundamentally flawed upon closer examination","it was too simple to sustain serious academic scrutiny"],ans:0},
{q:"According to the passage, structuralism appealed to humanities scholars because it",opts:["confirmed traditional approaches to cultural analysis","provided a methodology that aspired to scientific rigour","was endorsed by leading figures in the natural sciences","simplified the study of culture by eliminating ambiguity"],ans:1},
{q:"The criticism that Levi-Strauss imposed patterns on data implies that",opts:["his analytical framework was entirely objective","the structures he found were projections of his own thinking","South American myths are too complex for systematic analysis","binary thinking is uniquely Western and absent from other cultures"],ans:1},
{q:"Derrida\\'s critique of structuralism centred on the claim that",opts:["cultural analysis should focus exclusively on individual experience","binary oppositions are the only valid tool for understanding meaning","meaning is inherently unstable and resists permanent fixation","Levi-Strauss deliberately falsified his ethnographic data"],ans:2},
{q:"The phrase \\'intellectual furniture\\' in the final paragraph suggests that structuralist ideas",opts:["are outdated relics that should be discarded","have become so familiar as to seem unremarkable","dominate the academy to the exclusion of other perspectives","are valued primarily for their historical significance"],ans:1},
{q:"The writer\\'s overall assessment of structuralism\\'s legacy is that it",opts:["failed completely and left no lasting influence","survives as a dominant and coherent school of thought","exerted a transformative influence despite its own obsolescence","was superseded by post-structuralism without leaving any trace"],ans:2}
]},
// --- Exercise 6: Listening Part 1 ---
{type:"mc",tl:"Listening",title:"Part 1 - Short Extracts",ins:"Listen and choose the correct answer.",
items:[
{audio:"Extract 1: Woman: The trouble with evidence-based policy is that politicians cherry-pick the evidence. They commission research, then ignore anything that contradicts their pre-existing commitments. Man: That\\'s a criticism of politicians, not of the principle itself. Woman: Fair point. But the principle is meaningless if the institutional incentives work against honest engagement with evidence.",q:"The woman\\'s primary criticism concerns",opts:["the concept of using evidence to inform policy","the way politicians engage with research findings","the quality of research produced for government use"],ans:1},
{audio:"Extract 1 (continued): Man: So what\\'s the alternative? Purely ideological policymaking? Woman: Obviously not. But we need mechanisms, independent bodies, transparency requirements, that force engagement with inconvenient findings rather than just convenient ones.",q:"The woman advocates for",opts:["abandoning evidence-based approaches entirely","structural safeguards to ensure honest use of evidence","giving researchers direct control over policy decisions"],ans:1},
{audio:"Extract 2: Man: I think the concept of cultural appropriation has been stretched beyond its useful limits. There are genuine cases of exploitation, certainly, but the term is now applied so broadly that it risks stifling legitimate cultural exchange. Woman: Where would you draw the line? Man: Power dynamics are key. When a dominant culture profits from the traditions of a marginalised community without acknowledgment or compensation, that\\'s exploitation. When individuals genuinely engage with and learn from another culture, that\\'s enrichment.",q:"The man believes the concept of cultural appropriation",opts:["should be abandoned as it serves no useful purpose","has valid applications but is currently applied too broadly","is always a form of exploitation regardless of context"],ans:1},
{audio:"Extract 2 (continued): Woman: And who decides which category a particular case falls into? Man: That\\'s precisely the difficulty. It requires judgement, not rigid rules. And judgement is messy, which is why people prefer the simplicity of blanket condemnation.",q:"The man suggests that assessing cultural appropriation requires",opts:["strict universal guidelines applied consistently","nuanced individual judgement rather than rigid rules","blanket condemnation of all cross-cultural borrowing"],ans:1},
{audio:"Extract 3: Woman: The orchestra\\'s decision to perform without a conductor was a revelation. You could hear the musicians listening to each other in a way that simply does not happen when someone is standing at the front dictating tempo and dynamics. Man: It must demand extraordinary discipline, though. Woman: Absolutely. And that\\'s what made it so exhilarating. You were witnessing a group of people achieving something genuinely collaborative, not just executing one person\\'s vision.",q:"The woman found the conductor-less performance remarkable because",opts:["the musicians played with greater technical precision","it demonstrated authentic collective musical dialogue","the audience was more engaged without a conductor present"],ans:1},
{audio:"Extract 3 (continued): Man: Do you think it works for all repertoire? Woman: Not necessarily. Something like a Mahler symphony, with its vast forces and complex architecture, probably needs a guiding hand. But for chamber-scale orchestral works, the result was extraordinary.",q:"The woman suggests that performing without a conductor",opts:["is equally effective for all types of orchestral music","works best with smaller-scale orchestral compositions","should be adopted as standard practice by all orchestras"],ans:1}
]},
// --- Exercise 7: Listening Part 2 ---
{type:"fl",tl:"Listening",title:"Part 2 - Sentence Completion",ins:"Complete each sentence with a word or short phrase.",
audio:"In this lecture, I want to consider the fascinating subject of synaesthesia, the neurological condition in which stimulation of one sense triggers an involuntary experience in another. The most common form is grapheme-colour synaesthesia, in which letters or numbers are perceived as having inherent colours. A synaesthete might consistently see the letter A as red or the number five as green. Crucially, these associations are automatic and stable over time. Research conducted at the University of Edinburgh demonstrated that synaesthetes produce identical colour associations when tested years apart, whereas non-synaesthetes asked to assign colours arbitrarily show significant variation when retested. This consistency has helped establish synaesthesia as a genuine perceptual phenomenon rather than mere imagination or learned association. The neurological basis appears to involve increased connectivity between adjacent brain regions. Brain imaging studies reveal heightened cross-activation between areas responsible for processing different sensory modalities. Some researchers hypothesise that all infants are born with this heightened connectivity and that it is normally pruned during development. On this account, synaesthesia represents a retention of connections that most of us lose. Interestingly, synaesthesia appears to be significantly more common among artists and musicians. A study published in the British Journal of Psychology found that the condition was seven times more prevalent in creative professionals than in the general population. This raises intriguing questions about the relationship between cross-sensory experience and creative thinking. Some scholars have speculated that the metaphorical thinking characteristic of artistic creativity may share neural pathways with synesthetic perception.",
items:[
{pre:"The most frequently occurring form of synaesthesia involves perceiving letters or numbers as having inherent",gap:"colours",post:"."},
{pre:"Research at the University of Edinburgh showed that synaesthetic associations remain",gap:"stable over time",post:"when subjects are retested."},
{pre:"Non-synaesthetes assigning colours arbitrarily show significant",gap:"variation",post:"in their responses over time."},
{pre:"The neurological explanation involves increased",gap:"connectivity",post:"between adjacent brain regions."},
{pre:"Brain scans show heightened cross-activation between areas that process different",gap:"sensory modalities",post:"."},
{pre:"One hypothesis suggests that all infants possess this connectivity but it is normally",gap:"pruned",post:"during development."},
{pre:"Synaesthesia is described as a retention of neural connections that most people",gap:"lose",post:"as they grow up."},
{pre:"According to the British Journal of Psychology, the condition is",gap:"seven times",post:"more prevalent among creative professionals."},
{pre:"Some scholars believe that artistic metaphorical thinking may share",gap:"neural pathways",post:"with synesthetic perception."}
]},
// --- Exercise 8: Writing ---
{type:"wr",tl:"Writing",title:"Part 1 - Essay",ins:"Write your essay in 240-280 words.",
prompt:"Write an essay summarising and evaluating the key points from both texts.\n\nText 1: The study of philosophy should be a compulsory component of secondary education. Philosophy teaches critical thinking, ethical reasoning, and the ability to construct and evaluate arguments, skills that are essential for informed citizenship in a democratic society.\n\nText 2: Mandating philosophy in schools is an impractical luxury. School curricula are already overcrowded, and the limited time available would be better spent on subjects with clear vocational relevance, such as digital literacy and financial education.",minWords:240}
]},
// ==============================
// PRACTICE TEST 4
// ==============================
{t:"Practice Test 4",exercises:[
// --- Exercise 1: MC Cloze ---
{type:"mc",tl:"Use of English",title:"Part 1 - Multiple-choice Cloze",ins:"Choose the best word (A-D) for each gap.",
passage:"The relationship between architecture and well-being has (1)_____ considerable scholarly attention in recent years. A growing body of evidence suggests that the built environment exerts a profound, if often (2)_____, influence on mental health, productivity, and social cohesion. The design of hospitals, for instance, can measurably affect patient recovery times, a finding that has (3)_____ a movement towards evidence-based healthcare design. Schools designed with ample natural light and flexible learning spaces have been shown to (4)_____ improved academic outcomes. Yet despite this compelling evidence, much contemporary development continues to (5)_____ basic principles of humane design. The relentless pressure to maximise floor space and minimise costs often (6)_____ environmental considerations to an afterthought. Critics argue that this represents a failure not merely of imagination but of (7)_____: we have the knowledge to build better, but lack the collective will to implement it. Advocates of biophilic design, which seeks to integrate natural elements into the built environment, believe they can (8)_____ this gap between knowledge and practice by demonstrating measurable returns on investment.",
items:[
{q:"Gap 1",opts:["attracted","drawn","captured","commanded"],ans:0},
{q:"Gap 2",opts:["imperceptible","unnoticed","inconspicuous","subliminal"],ans:0},
{q:"Gap 3",opts:["spawned","generated","bred","begotten"],ans:0},
{q:"Gap 4",opts:["yield","produce","bear","render"],ans:0},
{q:"Gap 5",opts:["flout","breach","defy","violate"],ans:0},
{q:"Gap 6",opts:["relegates","demotes","downgrades","subordinates"],ans:0},
{q:"Gap 7",opts:["volition","determination","resolution","aspiration"],ans:0},
{q:"Gap 8",opts:["bridge","span","cross","close"],ans:0}
]},
// --- Exercise 2: Open Cloze ---
{type:"fl",tl:"Use of English",title:"Part 2 - Open Cloze",ins:"Write the word which best fits each gap.",
items:[
{pre:"Never before",gap:"had",post:"the city witnessed such widespread public protest."},
{pre:"Whatever the outcome",gap:"may",post:"be, we must remain committed to the process."},
{pre:"The policy was abandoned, not",gap:"least",post:"because of the public backlash it provoked."},
{pre:"Scarcely had the announcement been made",gap:"when",post:"protests erupted across the capital."},
{pre:"She succeeded by",gap:"dint",post:"of sheer perseverance and determination."},
{pre:"The report made recommendations, the most significant",gap:"of",post:"which concerned funding reform."},
{pre:"They carried on regardless,",gap:"in",post:"spite of the obvious risks involved."},
{pre:"No sooner had the ceasefire been declared",gap:"than",post:"fighting broke out in the eastern provinces."}
]},
// --- Exercise 3: Word Formation ---
{type:"wf",tl:"Use of English",title:"Part 3 - Word Formation",ins:"Use the word given to form a word that fits the gap.",
items:[
{pre:"The",root:"PROPEL",gap:"propulsion",post:"system used in the spacecraft was revolutionary."},
{pre:"His",root:"CONTEMPT",gap:"contemptuous",post:"attitude towards his colleagues alienated everyone."},
{pre:"The report highlighted several",root:"SHORT",gap:"shortcomings",post:"in the current regulatory framework."},
{pre:"The",root:"FERTILE",gap:"infertility",post:"of the soil made agriculture virtually impossible."},
{pre:"She made an",root:"PASSION",gap:"impassioned",post:"plea for clemency on behalf of the defendant."},
{pre:"The",root:"PLACE",gap:"displacement",post:"of thousands of refugees created a humanitarian crisis."},
{pre:"His",root:"FORGE",gap:"unforgettable",post:"performance earned him critical acclaim worldwide."},
{pre:"The government faced accusations of",root:"MANAGE",gap:"mismanagement",post:"over its handling of the crisis."}
]},
// --- Exercise 4: Key Word Transformations ---
{type:"kt",tl:"Use of English",title:"Part 4 - Key Word Transformations",ins:"Use 3-8 words including the word given.",
items:[
{src:"Without his financial support, the charity would have collapsed.",kw:"HAD",ans:"had it not been for his financial support",hint:"had it not been for = without (third conditional inversion)"},
{src:"She is determined to finish the project on time.",kw:"BENT",ans:"she is bent on finishing the project on time",hint:"be bent on + -ing = be determined to"},
{src:"The fact that he lied is what upsets me most.",kw:"EXCEPTION",ans:"what I take exception to is the fact that he lied",hint:"take exception to = object to"},
{src:"They believe the painting was stolen during the war.",kw:"THOUGHT",ans:"the painting is thought to have been stolen during",hint:"passive reporting structure + perfect infinitive"},
{src:"I cannot possibly accept this offer under these conditions.",kw:"QUESTION",ans:"accepting this offer under these conditions is out of the question",hint:"out of the question = impossible"},
{src:"The whole affair started because of a trivial misunderstanding.",kw:"AROSE",ans:"the whole affair arose from a trivial misunderstanding",hint:"arise from = originate from"}
]},
// --- Exercise 5: Reading MC ---
{type:"mc",tl:"Reading",title:"Part 5 - Multiple Choice",ins:"Choose the best answer (A-D).",
passage:"The ethics of memory have become an unexpectedly fertile field of philosophical inquiry. Traditionally, memory has been studied as a cognitive phenomenon, the province of psychologists and neuroscientists concerned with questions of accuracy, encoding, and retrieval. But a new generation of philosophers has begun to ask a different kind of question: not how memory works, but what obligations it imposes. Do we have a duty to remember? And if so, remember what, and for how long?\n\nThe philosopher Avishai Margalit draws a useful distinction between what he calls thick and thin ethical relations. Thick relations are those we have with people to whom we are connected through shared experience, family, friends, fellow citizens. Thin relations are those we bear to all human beings simply by virtue of our common humanity. Each type of relation, Margalit argues, generates its own distinctive memory obligations. We owe it to those with whom we share thick relations to remember them as particular individuals, to honour the specific texture of our shared experience. Our obligations to those with whom we share only thin relations are different: we must remember not the particular individual but the universal human capacity for suffering and dignity that they embody.\n\nThis framework has provocative implications for how we think about collective commemoration. Consider the debate over Holocaust memorials. Margalit\\'s analysis suggests that those with thick connections to the victims, survivors, their families, the Jewish community, have an obligation to remember in a way that preserves the particularity of the suffering. But the rest of humanity also has an obligation, one rooted in thin relations: to remember the Holocaust as a reminder of what human beings are capable of inflicting upon one another, and thus as a spur to vigilance against future atrocities.\n\nThe distinction is not merely academic. It has practical consequences for how memorials are designed, how history is taught, and how societies negotiate the competing demands of remembrance and reconciliation. In post-conflict societies, for instance, the tension between thick and thin memory obligations can become acute. Victims demand that their particular suffering be acknowledged and commemorated. But nation-building often requires a degree of selective forgetting, a willingness to look forward rather than backward. The question of how to balance these competing imperatives has no easy answer, but Margalit\\'s framework at least provides a vocabulary for thinking about it with the seriousness it deserves.\n\nCritics of Margalit have noted that the distinction between thick and thin relations, while illuminating, is not as clear-cut as he suggests. In an increasingly interconnected world, the boundaries between these categories are constantly shifting. The suffering of a stranger on the other side of the planet, witnessed in real time through digital media, can generate obligations that feel anything but thin. Conversely, the passage of time can attenuate even the thickest of relations, as the living memories of shared experience give way to inherited narratives that lack the same emotional force. Memory, these critics suggest, is too fluid and too politically charged to be captured by any single philosophical framework, however elegant.",
items:[
{q:"The writer presents the philosophical study of memory as",opts:["a well-established field with a long academic history","a recently emerging area that asks normative rather than empirical questions","an extension of existing psychological research into cognitive processes","a controversial approach that most scholars have rejected"],ans:1},
{q:"According to Margalit, our memory obligations towards strangers are rooted in",opts:["the specific details of their individual experiences","our shared national or cultural identity with them","the universal human qualities they represent","the likelihood that we will encounter them personally"],ans:2},
{q:"The example of Holocaust memorials is used to illustrate",opts:["the failure of existing memorials to serve their purpose","how different types of ethical relations generate different memory obligations","that only those directly affected should determine how events are commemorated","the superiority of thin ethical relations over thick ones"],ans:1},
{q:"The writer suggests that post-conflict societies face a tension between",opts:["historical accuracy and artistic expression in memorials","international obligations and domestic political priorities","honouring particular suffering and fostering collective reconciliation","thick and thin philosophical frameworks"],ans:2},
{q:"Critics of Margalit argue that",opts:["his framework is too rigid to account for the fluidity of modern ethical relationships","the concept of memory obligations has no practical application","thick relations are always more important than thin ones","digital media have eliminated the distinction between remembering and forgetting"],ans:0},
{q:"The writer\\'s overall tone towards Margalit\\'s framework can best be described as",opts:["dismissive and hostile","wholly uncritical and enthusiastic","appreciative but acknowledging its limitations","indifferent and detached"],ans:2}
]},
// --- Exercise 6: Listening Part 1 ---
{type:"mc",tl:"Listening",title:"Part 1 - Short Extracts",ins:"Listen and choose the correct answer.",
items:[
{audio:"Extract 1: Man: The problem with most leadership training is that it treats leadership as a set of transferable skills, as if you could learn to lead in any context by mastering a fixed repertoire of techniques. Woman: And you disagree? Man: Profoundly. Effective leadership is contextual. What works in a military setting may be catastrophic in a creative agency. The skills are secondary to understanding the specific culture and dynamics of the environment you are operating in.",q:"The man\\'s main objection to conventional leadership training is that it",opts:["focuses too heavily on military-style approaches","underestimates the importance of situational awareness","is prohibitively expensive for most organisations"],ans:1},
{audio:"Extract 1 (continued): Woman: So what would better leadership development look like? Man: It would start with deep immersion in the specific context. You would study the organisation, its history, its culture, its people, before attempting to apply any general principles. The order matters enormously.",q:"The man believes effective leadership training should begin with",opts:["learning a comprehensive set of management techniques","thorough understanding of the particular organisational context","observing successful leaders in similar industries"],ans:1},
{audio:"Extract 2: Woman: What surprised me about the research was the degree to which bilingual children outperformed monolinguals on tasks that had nothing to do with language. Man: Executive function tasks? Woman: Precisely. Cognitive flexibility, inhibitory control, working memory, across the board, the bilingual advantage was striking. Man: Though I should note that more recent studies have struggled to replicate those findings consistently.",q:"The woman highlights that bilingual children showed advantages in",opts:["language acquisition and vocabulary development","non-linguistic cognitive abilities","social interaction and communication skills"],ans:1},
{audio:"Extract 2 (continued): Man: The replication difficulties suggest the picture may be more complicated than the initial studies implied. Woman: Agreed. But even the sceptics acknowledge that managing two languages places unique demands on the brain. Whether that translates into measurable cognitive advantages across all populations is the question.",q:"Both speakers agree that",opts:["the bilingual advantage has been conclusively proven","bilingualism places distinctive cognitive demands on the brain","recent studies have definitively disproved earlier findings"],ans:1},
{audio:"Extract 3: Man: I have always been suspicious of the fetishisation of innovation in corporate culture. Not every problem requires a novel solution. Sometimes the most effective response is to do what already works, only better. Woman: You sound like a traditionalist. Man: I prefer pragmatist. Innovation for its own sake is just fashion masquerading as progress.",q:"The man\\'s attitude towards corporate innovation culture is",opts:["enthusiastically supportive of all novel approaches","critical of innovation pursued without genuine necessity","opposed to any form of organisational change"],ans:1},
{audio:"Extract 3 (continued): Woman: But surely companies that fail to innovate risk obsolescence? Man: Of course. I am not anti-innovation. I am against the assumption that newness automatically equals improvement. The real skill is knowing when innovation is genuinely needed and when it is a distraction.",q:"The man ultimately argues that",opts:["companies should avoid innovation to reduce risk","the value of innovation depends on whether it addresses a real need","traditional methods are always superior to innovative ones"],ans:1}
]},
// --- Exercise 7: Listening Part 2 ---
{type:"fl",tl:"Listening",title:"Part 2 - Sentence Completion",ins:"Complete each sentence with a word or short phrase.",
audio:"This morning I want to talk about the Sapir-Whorf hypothesis, one of the most debated ideas in linguistics. In its strongest form, the hypothesis claims that the language we speak determines how we think, constraining our perception of reality. This version, known as linguistic determinism, has largely been discredited. However, a weaker version, linguistic relativity, has experienced a significant revival. This holds that language influences thought without fully determining it. The evidence comes from several domains. Research on colour perception has shown that speakers of languages with more colour terms can distinguish shades more quickly than speakers of languages with fewer terms. A landmark study compared speakers of Russian, which has separate basic terms for light blue and dark blue, with English speakers who use a single term. Russian speakers were faster at distinguishing shades that fell on different sides of their linguistic boundary. Spatial cognition provides another example. The Kuuk Thaayorre people of Australia use absolute directions, north, south, east, and west, rather than relative terms like left and right. As a result, they maintain a precise awareness of cardinal directions at all times, an ability that speakers of languages using relative spatial terms typically lack. Perhaps most controversially, some researchers have argued that grammatical structures influence how speakers conceptualise time. In Mandarin, vertical metaphors for time are common, with earlier events described as being above later ones. Experimental evidence suggests this may lead Mandarin speakers to think about temporal sequences differently from English speakers, who predominantly use horizontal metaphors.",
items:[
{pre:"The strong form of the hypothesis, known as linguistic determinism, has largely been",gap:"discredited",post:"."},
{pre:"The weaker version claims that language influences thought without fully",gap:"determining",post:"it."},
{pre:"Russian speakers distinguished shades of blue more quickly because their language has separate",gap:"basic terms",post:"for light and dark blue."},
{pre:"The Kuuk Thaayorre people use",gap:"absolute directions",post:"rather than relative spatial terms like left and right."},
{pre:"These speakers maintain a constant awareness of",gap:"cardinal directions",post:"at all times."},
{pre:"In Mandarin, time is expressed through",gap:"vertical metaphors",post:"with earlier events described as above later ones."},
{pre:"English speakers predominantly conceptualise time using",gap:"horizontal metaphors",post:"."},
{pre:"The colour perception research showed that having more colour terms helps speakers",gap:"distinguish shades",post:"more quickly."},
{pre:"The overall evidence supports the weaker version of the hypothesis, known as linguistic",gap:"relativity",post:"."}
]},
// --- Exercise 8: Writing ---
{type:"wr",tl:"Writing",title:"Part 1 - Essay",ins:"Write your essay in 240-280 words.",
prompt:"Write an essay summarising and evaluating the key points from both texts.\n\nText 1: Architecture has a measurable impact on human well-being. Research consistently shows that thoughtfully designed spaces improve mental health, productivity, and social interaction. Investment in good design pays for itself through improved outcomes.\n\nText 2: The emphasis on architectural design as a determinant of well-being is overstated. Socioeconomic factors such as income, education, and access to healthcare are far more significant predictors of quality of life than the aesthetic qualities of the built environment.",minWords:240}
]},
// ==============================
// PRACTICE TEST 5
// ==============================
{t:"Practice Test 5",exercises:[
// --- Exercise 1: MC Cloze ---
{type:"mc",tl:"Use of English",title:"Part 1 - Multiple-choice Cloze",ins:"Choose the best word (A-D) for each gap.",
passage:"The phenomenon of cognitive dissonance, first described by Leon Festinger in the 1950s, continues to (1)_____ our understanding of human decision-making. Festinger observed that when people hold two contradictory beliefs simultaneously, they experience a form of psychological discomfort that (2)_____ them to resolve the inconsistency. What is particularly striking about this process is that it often operates beneath conscious awareness: people (3)_____ elaborate rationalisations for their behaviour without recognising that they are doing so. This has profound (4)_____ for fields ranging from marketing to public health. Advertisers, for instance, have long exploited the tendency for consumers to (5)_____ their purchasing decisions retroactively, convincing themselves that an impulsive buy was in fact a carefully considered choice. In the political (6)_____, cognitive dissonance helps explain why voters remain loyal to candidates whose policies clearly (7)_____ their own interests. The discomfort of admitting one has made a poor choice is so acute that people prefer to adjust their beliefs rather than (8)_____ their error.",
items:[
{q:"Gap 1",opts:["illuminate","elucidate","clarify","enlighten"],ans:0},
{q:"Gap 2",opts:["impels","compels","propels","repels"],ans:1},
{q:"Gap 3",opts:["construct","contrive","conceive","concoct"],ans:0},
{q:"Gap 4",opts:["implications","consequences","repercussions","ramifications"],ans:0},
{q:"Gap 5",opts:["justify","vindicate","warrant","legitimise"],ans:0},
{q:"Gap 6",opts:["arena","sphere","domain","realm"],ans:1},
{q:"Gap 7",opts:["contravene","undermine","contradict","compromise"],ans:1},
{q:"Gap 8",opts:["concede","confess","acknowledge","admit"],ans:2}
]},
// --- Exercise 2: Open Cloze ---
{type:"fl",tl:"Use of English",title:"Part 2 - Open Cloze",ins:"Write the word which best fits each gap.",
items:[
{pre:"Were it not",gap:"for",post:"the intervention of a bystander, the accident could have been fatal."},
{pre:"Hard",gap:"as",post:"it may be to accept, the evidence is overwhelming."},
{pre:"Not a single witness came forward, nor",gap:"was",post:"any physical evidence recovered from the scene."},
{pre:"The success of the venture depends, in no small",gap:"measure",post:", on the commitment of all partners."},
{pre:"It is precisely this quality",gap:"that",post:"sets her apart from her contemporaries."},
{pre:"The report was thorough in",gap:"every",post:"respect and left no question unanswered."},
{pre:"She spoke with such conviction",gap:"as",post:"to persuade even the most sceptical members of the committee."},
{pre:"Far",gap:"from",post:"being a setback, the delay proved to be a blessing in disguise."}
]},
// --- Exercise 3: Word Formation ---
{type:"wf",tl:"Use of English",title:"Part 3 - Word Formation",ins:"Use the word given to form a word that fits the gap.",
items:[
{pre:"The politician\\'s",root:"SINCERE",gap:"insincerity",post:"was apparent to everyone in the room."},
{pre:"This technology has the potential to",root:"REVOLUTION",gap:"revolutionise",post:"the healthcare industry."},
{pre:"Their",root:"SIGHT",gap:"oversight",post:"in failing to check the data proved catastrophic."},
{pre:"The",root:"EXHAUST",gap:"inexhaustible",post:"energy of the children left the teachers drained."},
{pre:"The novel offers a",root:"COMPEL",gap:"compelling",post:"account of life during the occupation."},
{pre:"She displayed remarkable",root:"COMPOSE",gap:"composure",post:"throughout the ordeal."},
{pre:"The",root:"SUSTAIN",gap:"unsustainability",post:"of the current model is now widely recognised."},
{pre:"His contributions to the field were",root:"MATCH",gap:"unmatched",post:"by any of his contemporaries."}
]},
// --- Exercise 4: Key Word Transformations ---
{type:"kt",tl:"Use of English",title:"Part 4 - Key Word Transformations",ins:"Use 3-8 words including the word given.",
items:[
{src:"Nobody expected the new policy to be so controversial.",kw:"BARGAINED",ans:"nobody had bargained for the new policy being so",hint:"bargain for = expect"},
{src:"He made no attempt to conceal his disappointment.",kw:"PAINS",ans:"he took no pains to conceal his disappointment",hint:"take pains to = make an effort to"},
{src:"The chances of finding survivors are very slim now.",kw:"LIKELIHOOD",ans:"there is very little likelihood of finding survivors now",hint:"there is little likelihood of + -ing"},
{src:"You should think carefully before making a final decision.",kw:"WEIGH",ans:"you should weigh up the options before making a final",hint:"weigh up = consider carefully"},
{src:"Everyone admires her dedication to the cause.",kw:"LOOKED",ans:"her dedication to the cause is looked up to by",hint:"look up to = admire"},
{src:"She refused to let the criticism affect her performance.",kw:"RISE",ans:"she rose above the criticism and maintained her performance",hint:"rise above = not be affected by"}
]},
// --- Exercise 5: Reading MC ---
{type:"mc",tl:"Reading",title:"Part 5 - Multiple Choice",ins:"Choose the best answer (A-D).",
passage:"The question of whether animals possess consciousness has moved from the margins of scientific inquiry to its centre. For much of the twentieth century, the topic was considered scientifically intractable, if not disreputable. Behaviourism, which dominated psychology for decades, regarded consciousness as an inherently subjective phenomenon that lay beyond the reach of objective investigation. To speculate about what, if anything, an animal might be experiencing was to commit the cardinal sin of anthropomorphism.\n\nThe tide began to turn in the 1970s with the publication of Donald Griffin\\'s The Question of Animal Awareness. Griffin, a distinguished ethologist best known for his work on bat echolocation, argued that the refusal to consider animal consciousness was not scientific caution but intellectual cowardice. He pointed out that the neurological structures associated with consciousness in humans are widely shared across the mammalian kingdom, and that parsimony actually favours the hypothesis that similar structures produce similar experiences.\n\nThe intervening decades have seen an accumulation of evidence that would have astonished Griffin\\'s critics. We now know that corvids can plan for the future, that elephants mourn their dead, that octopuses exhibit play behaviour, and that rats show signs of what can only be described as empathy. The Cambridge Declaration on Consciousness, signed in 2012 by a prominent group of neuroscientists, formally acknowledged that the neurological substrates generating consciousness are not uniquely human.\n\nYet the philosophical puzzles remain stubbornly intact. The so-called hard problem of consciousness, articulated by David Chalmers, asks why physical processes in the brain give rise to subjective experience at all. This question applies with equal force to human and animal consciousness. We can catalogue the neural correlates of consciousness with ever-increasing precision, but the explanatory gap between objective brain states and subjective experience shows no sign of closing.\n\nFor the practical ethics of our treatment of animals, however, the philosophical uncertainty may be less relevant than it appears. If the evidence strongly suggests that a creature can suffer, that is, that it has subjective experiences of pain and distress, then surely the burden of proof falls on those who would deny it moral consideration. To withhold that consideration on the grounds that consciousness has not been philosophically explained would be, as one commentator memorably put it, to let the perfect be the enemy of the good.\n\nThe implications for policy are considerable. If we accept that a wide range of animals are probably conscious, then many standard practices in agriculture, scientific research, and entertainment become ethically indefensible. This is not a comfortable conclusion, which may explain why it has been so slow to gain traction in public discourse. The economic interests vested in the current treatment of animals are enormous, and acknowledging animal consciousness threatens to unravel arrangements upon which entire industries depend.",
items:[
{q:"The writer suggests that behaviourism\\'s rejection of animal consciousness was motivated by",opts:["genuine concern for scientific objectivity","a fear of the ethical implications of acknowledging it","an ideological commitment to excluding subjective phenomena","insufficient evidence about animal neurological structures"],ans:2},
{q:"Griffin\\'s argument relied on the principle that",opts:["animal behaviour can only be explained through anthropomorphism","similar neural structures likely produce comparable experiences","bat echolocation proves that animals have self-awareness","consciousness is too complex to study scientifically"],ans:1},
{q:"The Cambridge Declaration on Consciousness is presented as",opts:["a controversial document rejected by most neuroscientists","a formal recognition that consciousness-related brain structures exist beyond humans","definitive proof that all animals are fully conscious","a philosophical argument for animal rights"],ans:1},
{q:"The writer\\'s reference to \\'the hard problem of consciousness\\' serves to",opts:["dismiss the significance of neuroscientific evidence","acknowledge a fundamental unresolved question about subjective experience","argue that animal consciousness cannot be scientifically studied","support the behaviourist position on consciousness"],ans:1},
{q:"The phrase \\'let the perfect be the enemy of the good\\' is used to argue that",opts:["perfect understanding of consciousness is achievable with more research","ethical action should not be delayed pending complete philosophical resolution","philosophical perfection is more important than practical ethics","animal welfare policies should only be based on proven scientific facts"],ans:1},
{q:"According to the final paragraph, acknowledgment of animal consciousness has been slow because",opts:["the scientific evidence remains weak and unconvincing","philosophers have successfully argued against it","it threatens significant economic interests","the public lacks access to relevant information"],ans:2}
]},
// --- Exercise 6: Listening Part 1 ---
{type:"mc",tl:"Listening",title:"Part 1 - Short Extracts",ins:"Listen and choose the correct answer.",
items:[
{audio:"Extract 1: Woman: What fascinates me about the restoration is the ethical dimension. The painting had been so heavily overpainted in previous centuries that removing those layers essentially means destroying works of art in their own right. Man: You mean the restorer has to choose which version of the painting to preserve? Woman: Exactly. There is no neutral position. Every decision involves a value judgement about which historical layer matters most.",q:"The woman\\'s main point about art restoration is that it",opts:["always returns the painting to its original state","involves unavoidable subjective judgements about artistic value","should prioritise the most recent modifications to a work"],ans:1},
{audio:"Extract 1 (continued): Man: And how do restorers typically navigate that? Woman: Increasingly, through extensive consultation and documentation. The idea is to make every decision transparent and reversible where possible. But ultimately, someone has to choose, and that choice is irreducibly interpretive.",q:"The woman indicates that modern restoration practice aims to be",opts:["entirely objective and value-free in its methods","transparent in its decision-making while acknowledging subjectivity","focused exclusively on preserving the most ancient layer"],ans:1},
{audio:"Extract 2: Man: The shift from print to digital journalism has had consequences that go far beyond economics. The rhythm of news has fundamentally changed. Print journalists had time to verify, to contextualise, to craft their prose. Digital journalists operate under pressure to publish immediately. Woman: And accuracy suffers as a result? Man: Inevitably. But it is not just accuracy. It is the depth of analysis, the quality of writing, the capacity for sustained investigation, all of those things are harder to maintain when the expectation is instant publication.",q:"The man is most concerned that digital journalism has compromised",opts:["the financial viability of news organisations","the overall quality and depth of journalistic output","the technological skills required of journalists"],ans:1},
{audio:"Extract 2 (continued): Woman: Is there a way back? Man: Not to the old model, no. But I think there is a growing recognition that quality journalism requires time, and some outlets are finding ways to create protected space for longer-form work within the digital environment.",q:"The man believes that high-quality journalism in the digital age",opts:["is no longer possible under any circumstances","can survive if outlets deliberately allocate time for deeper work","will only exist in traditional print formats"],ans:1},
{audio:"Extract 3: Woman: The experiment was deceptively simple. They gave participants a choice between receiving a small sum immediately or a larger sum in a week. Man: And the results? Woman: Predictably, most chose the immediate reward. But here is the interesting part: when the researchers introduced a vivid mental imagery exercise, asking participants to picture themselves enjoying the future reward in detail, the preference shifted dramatically towards waiting.",q:"The experiment showed that mental imagery",opts:["had no effect on participants\\' financial decisions","significantly increased participants\\' willingness to delay gratification","made participants more anxious about future rewards"],ans:1},
{audio:"Extract 3 (continued): Man: That has huge implications for financial education. Woman: Absolutely. It suggests that the problem with saving is not that people do not understand compound interest. It is that the future self who benefits from saving feels abstract and unreal. Make that future self vivid, and behaviour changes.",q:"The woman concludes that people struggle to save primarily because",opts:["they lack basic financial literacy","their future selves feel psychologically distant and abstract","they are inherently incapable of rational financial planning"],ans:1}
]},
// --- Exercise 7: Listening Part 2 ---
{type:"fl",tl:"Listening",title:"Part 2 - Sentence Completion",ins:"Complete each sentence with a word or short phrase.",
audio:"Today we are going to look at the science of sleep and why it matters far more than most people realise. For decades, sleep was something of a scientific mystery. We knew that all animals do it and that prolonged deprivation is fatal, but we had little understanding of what sleep actually accomplishes. That has changed dramatically in the past twenty years. We now know that sleep serves multiple essential functions, and that chronic sleep deprivation is implicated in a startling range of health problems, from cardiovascular disease to Alzheimer\\'s. Perhaps the most remarkable discovery concerns the glymphatic system, a waste clearance mechanism in the brain that operates primarily during deep sleep. The glymphatic system works by flushing cerebrospinal fluid through the brain tissue, removing toxic proteins including beta-amyloid, which is associated with Alzheimer\\'s disease. This process is approximately ten times more active during sleep than during wakefulness. Sleep is also critical for memory consolidation. During the REM stage, the brain replays and reorganises the experiences of the day, strengthening important memories and discarding trivial ones. Experiments have shown that subjects who sleep after learning perform significantly better on memory tests than those who remain awake for the same period. The implications for education are obvious yet routinely ignored: school start times that force adolescents to wake before their natural circadian rhythm permits are directly undermining their capacity to learn. Despite all this evidence, modern societies continue to treat sleep as optional, a luxury to be sacrificed in pursuit of productivity. This is, as the neuroscientist Matthew Walker has argued, a catastrophic error. The irony is that sleep deprivation actually reduces productivity, creativity, and emotional regulation, the very capacities that people sacrifice sleep to preserve.",
items:[
{pre:"Prolonged sleep deprivation in animals is ultimately",gap:"fatal",post:"."},
{pre:"Chronic lack of sleep has been linked to conditions including cardiovascular disease and",gap:"Alzheimer\\'s",post:"."},
{pre:"The glymphatic system removes waste from the brain primarily during",gap:"deep sleep",post:"."},
{pre:"The system works by flushing",gap:"cerebrospinal fluid",post:"through the brain tissue."},
{pre:"The toxic protein removed by this process, associated with Alzheimer\\'s, is called",gap:"beta-amyloid",post:"."},
{pre:"Memory consolidation takes place mainly during the",gap:"REM stage",post:"of sleep."},
{pre:"Students who sleep after learning perform",gap:"significantly better",post:"on memory tests."},
{pre:"Early school start times conflict with adolescents\\'",gap:"natural circadian rhythm",post:"."},
{pre:"Sleep deprivation ironically reduces the very capacities people sacrifice sleep to",gap:"preserve",post:"."}
]},
// --- Exercise 8: Writing ---
{type:"wr",tl:"Writing",title:"Part 1 - Essay",ins:"Write your essay in 240-280 words.",
prompt:"Write an essay summarising and evaluating the key points from both texts.\n\nText 1: The growing body of evidence for animal consciousness demands a fundamental reassessment of how we treat other species. If animals can suffer, then many current practices in farming and research are ethically indefensible, regardless of the economic consequences.\n\nText 2: While animal welfare is important, the concept of animal consciousness remains philosophically unresolved. Policy decisions affecting millions of livelihoods should be based on established science, not on speculative attributions of subjective experience to non-human creatures.",minWords:240}
]},
// ==============================
// PRACTICE TEST 6
// ==============================
{t:"Practice Test 6",exercises:[
// --- Exercise 1: MC Cloze ---
{type:"mc",tl:"Use of English",title:"Part 1 - Multiple-choice Cloze",ins:"Choose the best word (A-D) for each gap.",
passage:"The concept of deep time, the recognition that the Earth is incomprehensibly ancient, represents one of humanity\\'s most (1)_____ intellectual achievements. Before the nineteenth century, most Western thinkers (2)_____ that the planet was merely a few thousand years old. The geological evidence that gradually overturned this assumption did not merely revise an estimate; it (3)_____ transformed humanity\\'s understanding of its own place in the cosmos. The vastness of geological time (4)_____ our usual frameworks of comprehension. To say that the Earth is 4.5 billion years old is to utter a sentence that the human mind can (5)_____ but not truly grasp. Writers and scientists have long struggled to find analogies that make this (6)_____ duration accessible. If the history of the Earth were compressed into a single year, humans would appear only in the final seconds of December 31st. Such analogies are (7)_____ but ultimately inadequate, for the real cognitive challenge is not to visualise the timeline but to internalise its implications: that we are a vanishingly recent (8)_____ to a story that was already unimaginably old before we arrived.",
items:[
{q:"Gap 1",opts:["momentous","monumental","considerable","prodigious"],ans:0},
{q:"Gap 2",opts:["assumed","presumed","supposed","surmised"],ans:0},
{q:"Gap 3",opts:["fundamentally","radically","drastically","extensively"],ans:1},
{q:"Gap 4",opts:["defies","exceeds","surpasses","transcends"],ans:3},
{q:"Gap 5",opts:["articulate","formulate","express","enunciate"],ans:0},
{q:"Gap 6",opts:["vertiginous","cavernous","voluminous","capacious"],ans:0},
{q:"Gap 7",opts:["evocative","provocative","suggestive","indicative"],ans:0},
{q:"Gap 8",opts:["addition","appendage","adjunct","addendum"],ans:0}
]},
// --- Exercise 2: Open Cloze ---
{type:"fl",tl:"Use of English",title:"Part 2 - Open Cloze",ins:"Write the word which best fits each gap.",
items:[
{pre:"Nowhere",gap:"is",post:"this problem more evident than in the developing world."},
{pre:"She made her decision and, right",gap:"or",post:"wrong, she was determined to stand by it."},
{pre:"The phenomenon, fascinating",gap:"in",post:"itself, also has important practical applications."},
{pre:"On no account",gap:"must",post:"this information be disclosed to unauthorised personnel."},
{pre:"The team worked around the clock, thereby",gap:"ensuring",post:"that the deadline was met."},
{pre:"It was",gap:"not",post:"so much the cost as the inconvenience that bothered them."},
{pre:"Eloquent",gap:"though",post:"his speech was, it failed to change a single vote."},
{pre:"The discovery was all the more remarkable",gap:"for",post:"having been made by accident."}
]},
// --- Exercise 3: Word Formation ---
{type:"wf",tl:"Use of English",title:"Part 3 - Word Formation",ins:"Use the word given to form a word that fits the gap.",
items:[
{pre:"The",root:"THINK",gap:"unthinkable",post:"had happened, and no one was prepared for it."},
{pre:"Her",root:"REMARK",gap:"remarkably",post:"composed demeanour concealed deep anxiety."},
{pre:"The treaty represented an",root:"HISTORY",gap:"historic",post:"breakthrough in diplomatic relations."},
{pre:"The government\\'s",root:"DECIDE",gap:"indecisiveness",post:"frustrated both allies and opponents."},
{pre:"Scientists have noted a",root:"PROPORTION",gap:"disproportionate",post:"impact on vulnerable communities."},
{pre:"The",root:"COME",gap:"outcome",post:"of the negotiations exceeded everyone\\'s expectations."},
{pre:"His early work showed extraordinary",root:"PROMISE",gap:"promise",post:"but his later career was disappointing."},
{pre:"The",root:"TURN",gap:"downturn",post:"in the economy caught most analysts by surprise."}
]},
// --- Exercise 4: Key Word Transformations ---
{type:"kt",tl:"Use of English",title:"Part 4 - Key Word Transformations",ins:"Use 3-8 words including the word given.",
items:[
{src:"I can never remember people\\'s names at parties.",kw:"HOPELESS",ans:"I am hopeless at remembering people\\'s names at",hint:"be hopeless at + -ing"},
{src:"The heavy rain prevented them from completing the race.",kw:"PRECLUDED",ans:"the heavy rain precluded them from completing the race",hint:"preclude someone from + -ing"},
{src:"They demolished the old factory without consulting the residents.",kw:"PRIOR",ans:"they demolished the old factory without prior consultation with",hint:"prior + noun = before"},
{src:"His sudden resignation surprised absolutely everyone.",kw:"BLUE",ans:"his resignation came out of the blue for everyone",hint:"out of the blue = unexpectedly"},
{src:"She is not able to tolerate dishonesty of any kind.",kw:"STANDS",ans:"she cannot stand dishonesty of any kind",hint:"cannot stand = cannot tolerate"},
{src:"This problem needs to be addressed immediately.",kw:"CRYING",ans:"there is a crying need to address this problem",hint:"a crying need = an urgent need"}
]},
// --- Exercise 5: Reading MC ---
{type:"mc",tl:"Reading",title:"Part 5 - Multiple Choice",ins:"Choose the best answer (A-D).",
passage:"The relationship between language and thought has captivated philosophers since antiquity, but it was the emergence of cognitive linguistics in the latter decades of the twentieth century that placed the question on a rigorous empirical footing. Among the most influential figures in this field is George Lakoff, whose work on conceptual metaphor has fundamentally altered our understanding of how meaning is constructed.\n\nLakoff\\'s central claim is that abstract thought is largely metaphorical. We understand complex, intangible domains such as time, emotion, and morality by mapping them onto more concrete, bodily experiences. Time, for instance, is routinely conceptualised as space: we speak of looking forward to the future, leaving the past behind us, and approaching a deadline. These are not merely stylistic flourishes. Lakoff argues that they reflect the deep structure of our cognition: we literally think about time in spatial terms, and this shapes not just our language but our reasoning and behaviour.\n\nThe theory has been extraordinarily productive. Researchers have identified hundreds of conceptual metaphors operating across languages and cultures, from ARGUMENT IS WAR to UNDERSTANDING IS SEEING. The ubiquity of these mappings suggests that metaphorical thinking is not a peripheral feature of language but a foundational cognitive mechanism. If Lakoff is right, then much of what we take to be literal thought is in fact metaphorical through and through.\n\nCritics, however, have raised substantive objections. Some linguists argue that Lakoff\\'s methodology is insufficiently rigorous, relying too heavily on the intuitive analysis of linguistic expressions and too little on controlled experimentation. Others contend that the theory overgeneralises, treating as universal what may in fact be culturally specific patterns. The conceptual metaphor TIME IS MONEY, for instance, is deeply embedded in English but far less prominent in languages spoken by cultures with different economic structures.\n\nA more fundamental criticism concerns the direction of the relationship between metaphor and thought. Lakoff assumes that conceptual metaphors shape cognition, but it is equally possible that they merely reflect it. The fact that we talk about arguments in terms of war does not necessarily mean that we think about arguments as wars; it may simply mean that the language of conflict provides a convenient shorthand for describing adversarial exchanges. Disentangling these possibilities requires the kind of experimental evidence that has, until recently, been in short supply.\n\nRecent neuroscientific research has begun to address this gap. Brain imaging studies have shown that processing metaphorical language activates the same neural regions involved in processing the corresponding literal experience. When people read the metaphor \\'she had a rough day,\\' for instance, the areas of the brain associated with tactile perception are activated. This suggests that metaphor is not merely a matter of linguistic convention but is grounded in sensory experience, lending support to Lakoff\\'s embodied cognition thesis. Nevertheless, the debate is far from settled, and the precise relationship between metaphorical language, conceptual structure, and neural activity remains one of the most active frontiers in cognitive science.",
items:[
{q:"The writer characterises Lakoff\\'s view of conceptual metaphor as claiming that",opts:["abstract thinking is fundamentally structured by bodily experience","metaphors are decorative linguistic devices with no cognitive function","spatial language is unique to discussions of time","all languages use identical metaphorical systems"],ans:0},
{q:"The phrase \\'literal thought is in fact metaphorical through and through\\' suggests that",opts:["people are unable to think without using language","what appears to be direct thinking is pervasively shaped by metaphor","metaphorical thinking is inferior to literal reasoning","only abstract concepts rely on metaphorical structure"],ans:1},
{q:"The example of TIME IS MONEY is used to illustrate the criticism that",opts:["Lakoff\\'s theory applies only to English-speaking cultures","conceptual metaphors are never universal","economic metaphors are the most common type","Lakoff ignored the role of culture in shaping metaphor"],ans:0},
{q:"The \\'more fundamental criticism\\' in paragraph five questions whether",opts:["metaphors are found across different languages and cultures","Lakoff\\'s research methods are sufficiently scientific","conceptual metaphors cause or merely describe patterns of thought","language has any relationship to cognition"],ans:2},
{q:"The neuroscientific evidence described in the final paragraph",opts:["conclusively proves that Lakoff\\'s theory is correct","shows that metaphorical and literal processing share brain regions","demonstrates that all metaphors are culturally constructed","undermines the embodied cognition thesis entirely"],ans:1},
{q:"The writer\\'s overall stance on the debate is best described as",opts:["firmly committed to Lakoff\\'s position","dismissive of the relevance of neuroscience","balanced, presenting evidence and reservations without definitive judgement","hostile to the concept of conceptual metaphor"],ans:2}
]},
// --- Exercise 6: Listening Part 1 ---
{type:"mc",tl:"Listening",title:"Part 1 - Short Extracts",ins:"Listen and choose the correct answer.",
items:[
{audio:"Extract 1: Man: The fashion industry\\'s embrace of sustainability always strikes me as paradoxical. The entire business model depends on persuading consumers that last season\\'s clothes are obsolete. Sustainability requires the opposite impulse: buy less, keep longer. Woman: You think it\\'s inherently contradictory? Man: At a fundamental level, yes. You can make individual garments more sustainably, but you cannot make an industry predicated on constant consumption truly sustainable. That requires structural change, not better fabrics.",q:"The man argues that sustainable fashion is problematic because",opts:["sustainable materials are too expensive for mass production","the industry\\'s core business model conflicts with sustainability","consumers are unwilling to pay more for ethical clothing"],ans:1},
{audio:"Extract 1 (continued): Woman: Some brands are experimenting with rental and resale models. Man: Which is promising, but still marginal. Until the dominant model shifts from ownership to access, we are tinkering at the margins. The real revolution will come when wearing the same outfit twice is no longer seen as a failure of self-expression.",q:"The man believes the most important change needed is",opts:["developing new sustainable textile technologies","shifting cultural attitudes towards clothing consumption","increasing government regulation of the fashion industry"],ans:1},
{audio:"Extract 2: Woman: What I find most troubling about the gig economy is the way it transfers risk from corporations to individuals. The language of flexibility and entrepreneurship disguises what is essentially a regression to pre-industrial labour relations. Man: That is a strong claim. Woman: Consider it. No job security, no sick pay, no pension, no collective bargaining power. We spent a century building protections for workers, and the gig economy has dismantled them in a decade.",q:"The woman characterises the gig economy as",opts:["a progressive development that empowers workers","a reversion to exploitative labour conditions","a temporary phase that will naturally self-correct"],ans:1},
{audio:"Extract 2 (continued): Man: But many gig workers say they value the flexibility. Woman: Some do, genuinely. But for many others, the flexibility is illusory. They have no choice but to accept whatever work is available, whenever it is available. That is not freedom; it is precarity dressed up as choice.",q:"The woman suggests that for many workers, gig economy flexibility is",opts:["a genuine benefit that improves quality of life","largely an illusion masking economic insecurity","available only to those with specialised skills"],ans:1},
{audio:"Extract 3: Man: The documentary made a compelling case that our obsession with efficiency is actually making us less productive. The constant optimisation of every minute creates a paradoxical exhaustion. Woman: How so? Man: Because genuine creativity and insight require slack, unstructured time where the mind can wander. When every hour is accounted for, that kind of deep thinking becomes impossible.",q:"The man suggests that excessive focus on efficiency",opts:["has no measurable impact on productivity","actually undermines the conditions necessary for creative thought","primarily affects workers in the technology sector"],ans:1},
{audio:"Extract 3 (continued): Woman: It reminds me of the research on deliberate practice. Even elite performers need recovery time. Man: Exactly. The brain is not a machine that operates at constant capacity. It needs periods of apparent idleness to consolidate learning and generate new connections. Our culture has pathologised rest, and we are paying the price.",q:"The man concludes that modern culture",opts:["correctly values continuous productive activity","needs to recognise rest as cognitively necessary","should eliminate all forms of structured work"],ans:1}
]},
// --- Exercise 7: Listening Part 2 ---
{type:"fl",tl:"Listening",title:"Part 2 - Sentence Completion",ins:"Complete each sentence with a word or short phrase.",
audio:"In today\\'s lecture, I want to examine the concept of epistemic injustice, a term coined by the philosopher Miranda Fricker in her groundbreaking 2007 work. Fricker identifies two principal forms. The first is testimonial injustice, which occurs when a speaker\\'s credibility is deflated due to prejudice on the part of the hearer. For example, when a woman\\'s testimony is given less weight than a man\\'s simply because she is a woman, a testimonial injustice has occurred. The second form is hermeneutical injustice, which arises when gaps in shared interpretive resources put someone at an unfair disadvantage in making sense of their own experience. Fricker\\'s classic example concerns sexual harassment before that term entered common usage. Women experienced this behaviour but lacked the conceptual vocabulary to articulate what was happening to them, rendering their suffering socially invisible. What makes Fricker\\'s analysis so powerful is that it reveals how injustice operates not just through material deprivation or physical coercion but through the distribution of epistemic authority, that is, through who gets to be believed and whose experiences get to count as knowledge. The concept has since been applied far beyond its original philosophical context. Medical researchers have documented how patients from minority ethnic groups frequently report that their symptoms are dismissed or downplayed by healthcare professionals. Legal scholars have examined how the testimony of indigenous communities about environmental damage is systematically devalued in judicial proceedings. In each case, the pattern is the same: prejudice corrupts the process by which knowledge is created and shared, with devastating consequences for those whose voices are excluded.",
items:[
{pre:"The term epistemic injustice was introduced by",gap:"Miranda Fricker",post:"in 2007."},
{pre:"Testimonial injustice occurs when a speaker\\'s credibility is reduced because of the hearer\\'s",gap:"prejudice",post:"."},
{pre:"Hermeneutical injustice involves gaps in shared",gap:"interpretive resources",post:"that disadvantage certain groups."},
{pre:"Before the term existed, women who experienced sexual harassment lacked the",gap:"conceptual vocabulary",post:"to describe it."},
{pre:"This absence of language rendered their suffering",gap:"socially invisible",post:"."},
{pre:"Fricker\\'s analysis shows that injustice can operate through the distribution of",gap:"epistemic authority",post:"."},
{pre:"In healthcare, patients from minority ethnic groups often find their symptoms are",gap:"dismissed or downplayed",post:"."},
{pre:"Legal scholars have noted that indigenous testimony about environmental damage is systematically",gap:"devalued",post:"in court."},
{pre:"The common pattern is that prejudice corrupts the process of",gap:"knowledge creation",post:"with devastating consequences."}
]},
// --- Exercise 8: Writing ---
{type:"wr",tl:"Writing",title:"Part 1 - Essay",ins:"Write your essay in 240-280 words.",
prompt:"Write an essay summarising and evaluating the key points from both texts.\n\nText 1: The gig economy represents a fundamental threat to workers\\' rights. By classifying workers as independent contractors, companies evade their obligations to provide benefits, job security, and fair wages. Regulation is urgently needed to restore basic protections.\n\nText 2: The gig economy offers unprecedented flexibility and opportunity. Many workers prefer the autonomy of freelance arrangements to the rigidity of traditional employment. Excessive regulation would stifle innovation and limit the choices available to workers and consumers alike.",minWords:240}
]},
// ==============================
// PRACTICE TEST 7
// ==============================
{t:"Practice Test 7",exercises:[
// --- Exercise 1: MC Cloze ---
{type:"mc",tl:"Use of English",title:"Part 1 - Multiple-choice Cloze",ins:"Choose the best word (A-D) for each gap.",
passage:"The revival of interest in the philosophy of the Enlightenment has (1)_____ a vigorous debate about the relevance of reason in contemporary public life. For some thinkers, the Enlightenment\\'s commitment to rational inquiry and universal values remains the most (2)_____ intellectual framework available for addressing the challenges of the twenty-first century. For others, this commitment is fatally (3)_____ by its historical association with colonialism, patriarchy, and the exploitation of the natural world. The contest between these positions has (4)_____ new urgency in an era of resurgent populism and systematic disinformation. Those who defend the Enlightenment legacy argue that the very tools needed to (5)_____ injustice, critical thinking, evidence-based argument, commitment to human rights, are products of the rational tradition. Their opponents (6)_____ that this tradition has always been selective in its application of reason, extending its benefits to some while excluding others. Both sides, it must be said, make (7)_____ points. The challenge, as the philosopher Kwame Anthony Appiah has suggested, is not to abandon the Enlightenment project but to (8)_____ it of the biases and exclusions that have historically limited its promise.",
items:[
{q:"Gap 1",opts:["ignited","kindled","sparked","fired"],ans:2},
{q:"Gap 2",opts:["compelling","persuasive","convincing","forceful"],ans:0},
{q:"Gap 3",opts:["compromised","impaired","undermined","tainted"],ans:3},
{q:"Gap 4",opts:["acquired","assumed","adopted","attained"],ans:0},
{q:"Gap 5",opts:["combat","counter","confront","contest"],ans:0},
{q:"Gap 6",opts:["retort","counter","rejoin","rebuff"],ans:1},
{q:"Gap 7",opts:["cogent","eloquent","articulate","fluent"],ans:0},
{q:"Gap 8",opts:["purge","cleanse","purify","sanitise"],ans:0}
]},
// --- Exercise 2: Open Cloze ---
{type:"fl",tl:"Use of English",title:"Part 2 - Open Cloze",ins:"Write the word which best fits each gap.",
items:[
{pre:"Such was the complexity of the problem",gap:"that",post:"even the most experienced engineers were baffled."},
{pre:"The proposal was rejected, and rightly",gap:"so",post:", given the risks involved."},
{pre:"Only by investing in education can a society hope to",gap:"bring",post:"about lasting change."},
{pre:"The painting is attributed",gap:"to",post:"Caravaggio, though some experts dispute this."},
{pre:"Brilliant",gap:"as",post:"the performance was, it could not save the production."},
{pre:"The new law notwithstanding, many employers continue to flout",gap:"the",post:"regulations with impunity."},
{pre:"It was",gap:"with",post:"considerable reluctance that the board approved the merger."},
{pre:"In",gap:"no",post:"way did the outcome reflect the effort invested in the project."}
]},
// --- Exercise 3: Word Formation ---
{type:"wf",tl:"Use of English",title:"Part 3 - Word Formation",ins:"Use the word given to form a word that fits the gap.",
items:[
{pre:"The",root:"PRIVILEGE",gap:"underprivileged",post:"communities bore the brunt of the economic downturn."},
{pre:"Her",root:"PHILANTHROPY",gap:"philanthropic",post:"endeavours earned her widespread admiration."},
{pre:"The negotiations reached an",root:"PASS",gap:"impasse",post:"that lasted several weeks."},
{pre:"Scientists noted the",root:"ANOMALY",gap:"anomalous",post:"behaviour of the particles under extreme conditions."},
{pre:"The sheer",root:"MAGNET",gap:"magnetism",post:"of his personality drew people to him effortlessly."},
{pre:"The team\\'s",root:"PREPARE",gap:"preparedness",post:"for the crisis was exemplary."},
{pre:"The documentary offered an",root:"SPARE",gap:"unsparing",post:"portrayal of life in the conflict zone."},
{pre:"Environmental",root:"ACTIVE",gap:"activists",post:"staged a dramatic protest outside parliament."}
]},
// --- Exercise 4: Key Word Transformations ---
{type:"kt",tl:"Use of English",title:"Part 4 - Key Word Transformations",ins:"Use 3-8 words including the word given.",
items:[
{src:"It was wrong of you to speak to her like that.",kw:"OUGHT",ans:"you ought not to have spoken to her like",hint:"ought not to + perfect infinitive for past criticism"},
{src:"She always manages to remain calm in a crisis.",kw:"LOSES",ans:"she never loses her composure in a crisis",hint:"lose composure = become agitated"},
{src:"The negotiations failed because neither side was willing to compromise.",kw:"GROUND",ans:"neither side was willing to give ground during the",hint:"give ground = make concessions"},
{src:"Everyone says the new restaurant is excellent.",kw:"REPUTED",ans:"the new restaurant is reputed to be excellent",hint:"be reputed to = be said to"},
{src:"He pretended not to notice her arrival.",kw:"BLIND",ans:"he turned a blind eye to her arrival",hint:"turn a blind eye to = deliberately ignore"},
{src:"It is extremely unlikely that they will agree to our terms.",kw:"REMOTE",ans:"there is only a remote possibility that they will agree",hint:"a remote possibility = very unlikely"}
]},
// --- Exercise 5: Reading MC ---
{type:"mc",tl:"Reading",title:"Part 5 - Multiple Choice",ins:"Choose the best answer (A-D).",
passage:"The idea that economic growth is an unqualified good has been a cornerstone of Western political thought since at least the Industrial Revolution. Governments of all political persuasions have pursued growth as the primary measure of national success, and the Gross Domestic Product has become the most widely cited indicator of societal well-being. Yet a growing chorus of economists, philosophers, and environmental scientists is questioning whether this relentless focus on growth is either sustainable or desirable.\n\nThe critique takes several forms. Environmental economists point out that GDP measures economic activity without distinguishing between activities that enhance well-being and those that diminish it. An oil spill, for instance, generates economic activity through the clean-up effort, and thus contributes positively to GDP, even though the underlying event is an ecological catastrophe. Similarly, the GDP of a country increases when its citizens spend more on healthcare, even if the spending reflects a deterioration in public health rather than an improvement.\n\nMore fundamentally, critics argue that beyond a certain threshold of material comfort, additional economic growth contributes little to human happiness. The psychologist Daniel Kahneman has shown that beyond an annual income of approximately $75,000, further increases in wealth yield diminishing returns in terms of day-to-day emotional well-being. If this finding generalises to societies as a whole, it suggests that wealthy nations are pursuing growth not because it will make their citizens happier but because they have become locked into an economic system that requires perpetual expansion to remain stable.\n\nThe degrowth movement, which has gained significant traction in Europe, proposes a radical alternative. Advocates of degrowth argue that wealthy nations should deliberately reduce their economic output, redirecting resources towards activities that genuinely enhance well-being, such as care work, community building, and ecological restoration. This would require a fundamental reimagining of work, consumption, and the distribution of resources.\n\nSceptics, however, warn that degrowth is a utopian fantasy that ignores the realities of global inequality. They point out that billions of people in the developing world urgently need economic growth to escape poverty, and that advocating degrowth from the comfort of affluent Western nations is, at best, tone-deaf. Moreover, they argue that technological innovation, driven by the economic incentives that growth provides, offers the most realistic path to environmental sustainability through efficiency gains and clean energy.\n\nThe debate ultimately turns on a question of values. Is a good society one that maximises material production, or one that ensures its members live meaningful, flourishing lives within ecological limits? The answer may determine the trajectory of human civilisation in the coming century.",
items:[
{q:"The writer\\'s main purpose in paragraph two is to illustrate that",opts:["GDP is an accurate measure of environmental health","economic activity can be harmful yet still boost GDP figures","oil spills are the most significant flaw in GDP measurement","healthcare spending always indicates societal progress"],ans:1},
{q:"Kahneman\\'s research is cited to support the argument that",opts:["all income levels contribute equally to happiness","economic growth invariably improves emotional well-being","beyond a certain income level, more wealth adds little to daily happiness","psychological research is irrelevant to economic policy"],ans:2},
{q:"The degrowth movement proposes that wealthy nations should",opts:["increase economic output to fund environmental programmes","intentionally reduce production and focus on well-being activities","maintain current growth rates while improving efficiency","export their economic models to developing countries"],ans:1},
{q:"Sceptics of degrowth argue that",opts:["developing nations have no need for economic growth","technological innovation is unlikely to improve sustainability","wealthy nations advocating reduced growth may be ignoring global inequality","environmental sustainability is not a realistic goal"],ans:2},
{q:"The phrase \\'locked into an economic system\\' implies that",opts:["wealthy nations have consciously chosen perpetual growth","the economic system operates independently of human agency","growth continues not because it serves well-being but because the system demands it","GDP is the only possible measure of economic success"],ans:2},
{q:"The final paragraph suggests that the growth debate is fundamentally about",opts:["the technical feasibility of reducing economic output","competing visions of what constitutes a good society","the relative importance of European and global perspectives","whether economists or philosophers should guide policy"],ans:1}
]},
// --- Exercise 6: Listening Part 1 ---
{type:"mc",tl:"Listening",title:"Part 1 - Short Extracts",ins:"Listen and choose the correct answer.",
items:[
{audio:"Extract 1: Woman: One of the most pernicious myths about bilingual education is that it confuses children. The evidence is overwhelmingly to the contrary. Children who receive instruction in two languages from an early age develop stronger metalinguistic awareness than their monolingual peers. Man: Yet many school systems still resist implementing it. Woman: Largely for political reasons, not pedagogical ones. Bilingual education gets caught up in debates about national identity and immigration, which have nothing to do with how children actually learn.",q:"The woman attributes resistance to bilingual education primarily to",opts:["legitimate concerns about its educational effectiveness","political considerations unrelated to learning outcomes","a lack of trained bilingual teachers"],ans:1},
{audio:"Extract 1 (continued): Man: Is there any genuine educational concern? Woman: The only valid one I am aware of is the question of resource allocation. Bilingual programmes are more expensive to implement, and in underfunded school systems, that is a real constraint. But it is a practical problem, not a principled objection.",q:"The woman concedes that bilingual education faces one legitimate challenge related to",opts:["the cognitive demands it places on young learners","the difficulty of finding appropriate teaching materials","the financial costs of implementation in underfunded systems"],ans:2},
{audio:"Extract 2: Man: I have become increasingly sceptical about the value of GDP as a measure of national well-being. It tells you how much economic activity is occurring, but nothing about whether people are actually thriving. Woman: What would you replace it with? Man: Something multidimensional. Bhutan\\'s Gross National Happiness index is imperfect, but at least it tries to capture what GDP systematically ignores: health, education, ecological diversity, time use, good governance.",q:"The man believes GDP is inadequate because it",opts:["measures too many aspects of societal well-being","fails to capture important dimensions of human flourishing","is too difficult to calculate accurately"],ans:1},
{audio:"Extract 2 (continued): Woman: Critics would say happiness is too subjective to measure. Man: And GDP is too objective, if by objective you mean indifferent to whether people are miserable or content. The perfect metric probably does not exist, but we should not let the impossibility of perfection prevent us from seeking improvement.",q:"The man\\'s response to critics of happiness metrics is that",opts:["subjective measures are always superior to objective ones","GDP\\'s objectivity makes it indifferent to lived experience","happiness can be measured with complete precision"],ans:1},
{audio:"Extract 3: Woman: The concept of universal basic income keeps returning to the mainstream debate. Man: Because the conditions that generate interest in it, automation anxiety, precarious employment, widening inequality, keep intensifying. Woman: Do you think it is viable? Man: In some form, yes. But the devil is in the details: the level of payment, how it is funded, whether it replaces or supplements existing welfare provision.",q:"The man suggests that interest in universal basic income persists because",opts:["governments have already committed to implementing it","the socioeconomic conditions motivating it continue to worsen","economists have unanimously endorsed the concept"],ans:1},
{audio:"Extract 3 (continued): Woman: What about the objection that it would discourage people from working? Man: The evidence from pilot programmes actually contradicts that. In Finland and Kenya, recipients did not reduce their working hours significantly. What they did do was take better jobs, invest in education, and start small businesses. The freedom from desperation turned out to be productive, not paralysing.",q:"Evidence from pilot programmes suggests that basic income recipients",opts:["stopped working and became dependent on the payments","used the security to make more productive life choices","experienced no measurable change in their behaviour"],ans:1}
]},
// --- Exercise 7: Listening Part 2 ---
{type:"fl",tl:"Listening",title:"Part 2 - Sentence Completion",ins:"Complete each sentence with a word or short phrase.",
audio:"Today I want to discuss the extraordinary phenomenon of ocean acidification and why it has been called climate change\\'s equally evil twin. When carbon dioxide is released into the atmosphere, approximately a quarter of it is absorbed by the oceans. This might initially sound beneficial, as it reduces the concentration of greenhouse gases in the atmosphere. However, when CO2 dissolves in seawater, it forms carbonic acid, which increases the acidity of the ocean. Since the beginning of the Industrial Revolution, ocean acidity has increased by approximately thirty percent. This rate of change is unprecedented in at least the last 300 million years. The consequences for marine life are profound. Many marine organisms, including corals, molluscs, and certain plankton species, build their shells and skeletons from calcium carbonate. As the ocean becomes more acidic, the concentration of carbonate ions decreases, making it increasingly difficult for these organisms to construct and maintain their protective structures. Coral reefs, which support approximately twenty-five percent of all marine species, are particularly vulnerable. Research suggests that if current trends continue, the majority of tropical coral reefs will be in a state of net dissolution by 2050, meaning they will be dissolving faster than they can grow. The economic implications are staggering. Coral reefs provide ecosystem services valued at approximately 375 billion dollars annually, including fisheries, coastal protection, and tourism. Beyond the economic dimension, ocean acidification threatens the base of the marine food web. The pteropod, a tiny sea snail that forms a crucial link in polar food chains, is already showing signs of shell dissolution in Antarctic waters. If these organisms decline, the effects will cascade upward through the entire marine ecosystem.",
items:[
{pre:"Approximately a quarter of atmospheric carbon dioxide is absorbed by",gap:"the oceans",post:"."},
{pre:"Dissolved CO2 forms",gap:"carbonic acid",post:"in seawater, increasing ocean acidity."},
{pre:"Ocean acidity has risen by approximately",gap:"thirty percent",post:"since industrialisation began."},
{pre:"This rate of change has no precedent in at least",gap:"300 million years",post:"."},
{pre:"Organisms that build shells use",gap:"calcium carbonate",post:"as their primary building material."},
{pre:"Coral reefs support approximately",gap:"twenty-five percent",post:"of all marine species."},
{pre:"By 2050, most tropical coral reefs may be in a state of",gap:"net dissolution",post:"."},
{pre:"Reef ecosystem services are valued at approximately",gap:"375 billion dollars",post:"per year."},
{pre:"The pteropod, crucial to polar food chains, is already exhibiting",gap:"shell dissolution",post:"in Antarctic waters."}
]},
// --- Exercise 8: Writing ---
{type:"wr",tl:"Writing",title:"Part 1 - Essay",ins:"Write your essay in 240-280 words.",
prompt:"Write an essay summarising and evaluating the key points from both texts.\n\nText 1: Economic growth remains essential for human progress. It is the engine that drives innovation, reduces poverty, and funds the public services on which societies depend. Abandoning the pursuit of growth would condemn millions to continued deprivation.\n\nText 2: The obsessive pursuit of economic growth is destroying the planet. Beyond a certain level of prosperity, further growth adds little to human well-being while accelerating environmental degradation. Wealthy nations must embrace alternative models that prioritise sustainability over expansion.",minWords:240}
]},
// ==============================
// PRACTICE TEST 8
// ==============================
{t:"Practice Test 8",exercises:[
// --- Exercise 1: MC Cloze ---
{type:"mc",tl:"Use of English",title:"Part 1 - Multiple-choice Cloze",ins:"Choose the best word (A-D) for each gap.",
passage:"The emergence of social media has (1)_____ a transformation in the way political movements organise and mobilise. Where once a protest required months of careful planning, leaflet distribution, and word-of-mouth communication, a demonstration can now be (2)_____ in a matter of hours through a single viral post. This capacity for rapid mobilisation has (3)_____ both democratic activists and authoritarian regimes alike. The Arab Spring of 2011 appeared to (4)_____ the emancipatory potential of digital networks, as protesters in Tunisia, Egypt, and beyond used social media to coordinate their actions and (5)_____ international solidarity. Yet the subsequent trajectory of these movements has (6)_____ a more cautious assessment. Critics now argue that the very features that make social media so effective for mobilisation, its speed, its horizontality, its resistance to hierarchical control, also render the movements it spawns inherently (7)_____. Without durable organisational structures, they argue, digitally mobilised movements tend to (8)_____ as quickly as they arise.",
items:[
{q:"Gap 1",opts:["wrought","enacted","effected","exerted"],ans:0},
{q:"Gap 2",opts:["convened","mustered","marshalled","assembled"],ans:0},
{q:"Gap 3",opts:["galvanised","energised","animated","invigorated"],ans:0},
{q:"Gap 4",opts:["vindicate","corroborate","substantiate","attest"],ans:0},
{q:"Gap 5",opts:["elicit","garner","solicit","muster"],ans:1},
{q:"Gap 6",opts:["prompted","warranted","necessitated","enjoined"],ans:0},
{q:"Gap 7",opts:["fragile","tenuous","precarious","volatile"],ans:0},
{q:"Gap 8",opts:["dissipate","disintegrate","dissolve","disperse"],ans:0}
]},
// --- Exercise 2: Open Cloze ---
{type:"fl",tl:"Use of English",title:"Part 2 - Open Cloze",ins:"Write the word which best fits each gap.",
items:[
{pre:"Hardly had the ink dried on the agreement",gap:"before",post:"both sides began violating its terms."},
{pre:"The policy was effective, albeit",gap:"at",post:"a considerable cost to individual freedoms."},
{pre:"Whether the reforms will succeed depends",gap:"on",post:"a number of factors beyond our control."},
{pre:"Not",gap:"for",post:"nothing has this region been called the cradle of civilisation."},
{pre:"The work, ambitious",gap:"in",post:"scope, was let down by poor execution."},
{pre:"They pressed ahead with the project",gap:"in",post:"the face of fierce opposition from local residents."},
{pre:"It was",gap:"only",post:"when the full extent of the damage became clear that action was taken."},
{pre:"The two explanations are by no",gap:"means",post:"mutually exclusive."}
]},
// --- Exercise 3: Word Formation ---
{type:"wf",tl:"Use of English",title:"Part 3 - Word Formation",ins:"Use the word given to form a word that fits the gap.",
items:[
{pre:"The",root:"ERADICATE",gap:"eradication",post:"of the disease has been one of medicine\\'s greatest triumphs."},
{pre:"Her",root:"BREAK",gap:"groundbreaking",post:"research challenged decades of established orthodoxy."},
{pre:"The witness gave a",root:"CONVINCE",gap:"convincing",post:"account of the events that evening."},
{pre:"The government\\'s",root:"RESPOND",gap:"responsiveness",post:"to public concern was notably lacking."},
{pre:"Such",root:"EXPECT",gap:"unexpectedly",post:"generous terms astonished the negotiating team."},
{pre:"The committee expressed its",root:"APPROVE",gap:"disapproval",post:"in the strongest possible terms."},
{pre:"The",root:"MORTAL",gap:"immortalisation",post:"of the hero in verse ensured his legacy endured."},
{pre:"The speaker delivered an",root:"ELOQUENT",gap:"eloquent",post:"address that moved the entire audience."}
]},
// --- Exercise 4: Key Word Transformations ---
{type:"kt",tl:"Use of English",title:"Part 4 - Key Word Transformations",ins:"Use 3-8 words including the word given.",
items:[
{src:"She did not hesitate to voice her objections.",kw:"QUALMS",ans:"she had no qualms about voicing her objections",hint:"have no qualms about + -ing"},
{src:"The rumours about the company turned out to be true.",kw:"SUBSTANCE",ans:"there was substance to the rumours about the company",hint:"there is substance to = something is true"},
{src:"It is essential that everyone attends the briefing tomorrow.",kw:"IMPERATIVE",ans:"it is imperative that everyone attend the briefing tomorrow",hint:"it is imperative that + subjunctive"},
{src:"She always makes sure her work is perfect before submitting it.",kw:"LENGTHS",ans:"she goes to great lengths to ensure her work is",hint:"go to great lengths = make extreme effort"},
{src:"I do not think he intended to cause offence.",kw:"MEANT",ans:"I do not think he meant any harm by what he",hint:"mean harm = intend to cause offence"},
{src:"The new evidence completely changed the outcome of the trial.",kw:"BEARING",ans:"the new evidence had a decisive bearing on the outcome",hint:"have a bearing on = influence"}
]},
// --- Exercise 5: Reading MC ---
{type:"mc",tl:"Reading",title:"Part 5 - Multiple Choice",ins:"Choose the best answer (A-D).",
passage:"The notion that translation is a straightforward transfer of meaning from one language to another has been thoroughly dismantled by modern translation theory. Since at least the work of Walter Benjamin in the early twentieth century, scholars have recognised that translation involves not merely the substitution of words but the recreation of an entire network of cultural, historical, and aesthetic associations. Every translation is, in this sense, an interpretation, a reading of the source text that inevitably reflects the translator\\'s own understanding, biases, and creative choices.\n\nThis insight has profound implications for how we read translated literature. When an English speaker reads a novel by Dostoevsky, they are reading not Dostoevsky but Dostoevsky as interpreted by Constance Garnett, or Richard Pevear and Larissa Volokhonsky, or any number of other translators whose choices shape the reader\\'s experience in ways that are largely invisible. The tone, the rhythm, the register, the very personality of the prose, all of these are as much the translator\\'s creation as the author\\'s.\n\nThe Italian scholar and novelist Umberto Eco famously described translation as the art of \\'negotiation.\\' By this he meant that the translator must constantly negotiate between fidelity to the source and intelligibility in the target language, between preserving the foreignness of the original and making it accessible to a new readership. These negotiations involve thousands of micro-decisions, each of which forecloses alternative possibilities. Should a joke that depends on wordplay be rendered literally, even if the humour is lost? Or should it be adapted into an equivalent joke in the target language, even if the specific reference changes? There is no objectively correct answer; there are only more and less persuasive strategies, each with its own costs and benefits.\n\nRecent debates have focused on the politics of translation. The scholar Lawrence Venuti has argued influentially that the dominant translation practice in English-speaking countries tends towards what he calls \\'domestication\\': the smoothing out of foreign texts to conform to anglophone literary expectations. This practice, Venuti contends, reinforces the cultural hegemony of English by erasing the linguistic and cultural difference of the source text. He advocates instead for \\'foreignisation,\\' a strategy that deliberately preserves elements of the source language\\'s strangeness, reminding readers that they are encountering a different culture.\n\nThe debate between domestication and foreignisation is ultimately about power. When English-language publishers select which foreign texts to translate and how, they are exercising a form of cultural gatekeeping that shapes what the anglophone world knows and thinks about other cultures. The vast majority of books published in English are originally written in English; translations account for a mere three percent of the market. This imbalance, which Venuti memorably calls the \\'scandal of translation,\\' means that the English-speaking world remains largely monolingual in its literary consumption, even as it congratulates itself on its cosmopolitan tastes.\n\nThe consequences extend beyond literature. In diplomacy, business, and international law, the choice of translation strategy can have material consequences. A diplomatic text that reads smoothly in translation may inadvertently efface crucial nuances of the original, potentially leading to misunderstanding or conflict. The translator, far from being a neutral conduit, is an active agent whose choices shape the way cultures understand one another.",
items:[
{q:"The writer\\'s central argument about translation is that it",opts:["can achieve perfect equivalence between languages with sufficient skill","is fundamentally an act of interpretation rather than simple transfer","has become easier with advances in computational linguistics","should always prioritise the target language over the source"],ans:1},
{q:"The example of reading Dostoevsky in English is used to show that",opts:["Russian literature is inherently untranslatable","all English translations of Russian novels are of poor quality","the translator\\'s choices profoundly shape the reader\\'s experience","Dostoevsky\\'s work loses all meaning when translated"],ans:2},
{q:"Eco\\'s concept of \\'negotiation\\' in translation emphasises",opts:["the financial aspects of publishing translated works","the constant balancing of competing demands faced by translators","the need for translators to negotiate with authors","that translation should always favour the source language"],ans:1},
{q:"Venuti criticises \\'domestication\\' because it",opts:["makes translated texts too difficult for general readers","preserves too much of the source language\\'s foreignness","erases cultural difference to conform to English-language expectations","produces translations that are overly literal and awkward"],ans:2},
{q:"The statistic that translations represent three percent of the English-language market is cited to",opts:["celebrate the diversity of English-language publishing","illustrate the dominance of English in global literary culture","argue that more English-language books should be exported","suggest that translation quality has declined over time"],ans:1},
{q:"In the final paragraph, the writer extends the argument by suggesting that",opts:["translation issues are confined to the literary sphere","diplomatic translators should always use foreignisation","translation choices have real-world consequences beyond literature","business communication does not require skilled translation"],ans:2}
]},
// --- Exercise 6: Listening Part 1 ---
{type:"mc",tl:"Listening",title:"Part 1 - Short Extracts",ins:"Listen and choose the correct answer.",
items:[
{audio:"Extract 1: Man: The problem with most historical documentaries is that they treat the past as a collection of settled facts rather than a terrain of competing interpretations. Woman: You would prefer something more epistemologically honest? Man: Exactly. I want to see the uncertainty, the gaps in the evidence, the moments where historians disagree. That is where the real intellectual excitement lies, not in confident narration over dramatic reconstructions.",q:"The man objects to most historical documentaries because they",opts:["lack dramatic visual reconstructions","present history as more certain than it actually is","focus too much on academic disagreements"],ans:1},
{audio:"Extract 1 (continued): Woman: But audiences expect clear narratives. Ambiguity is uncomfortable. Man: True, but I think we underestimate audiences. People can handle complexity if it is presented well. The best documentaries are the ones that trust the viewer\\'s intelligence rather than spoon-feeding them a simplified story.",q:"The man believes that viewers",opts:["prefer simple narratives without exception","are capable of engaging with complex historical accounts","should not be exposed to competing interpretations"],ans:1},
{audio:"Extract 2: Woman: The clinic has started using AI diagnostic tools as a second opinion, not replacing the doctor but supplementing clinical judgement. Man: And how has that been received? Woman: Cautiously positive. The doctors were initially resistant, understandably. Nobody wants to feel they are being second-guessed by a machine. But when they saw the tool catching things they had missed, specifically rare conditions they might see once in a career, attitudes shifted.",q:"The doctors\\' attitude towards AI diagnostics changed when they",opts:["were required to use it by hospital management","realised it could identify conditions they might overlook","found that it reduced their workload significantly"],ans:1},
{audio:"Extract 2 (continued): Man: Is there a risk of over-reliance? Woman: Potentially. The tool is designed to flag possibilities, not make decisions. But human nature being what it is, there is always a temptation to defer to the machine, especially under time pressure. Maintaining the doctor\\'s role as the ultimate decision-maker is critical.",q:"The woman\\'s concern about AI diagnostic tools is that",opts:["they may lead doctors to depend on them too heavily","they are too inaccurate for clinical use","they will inevitably replace human doctors entirely"],ans:0},
{audio:"Extract 3: Man: I read a fascinating paper on the psychology of nostalgia. It turns out that contrary to the old view that nostalgia is a form of unhealthy dwelling on the past, it actually serves important psychological functions. Woman: Such as? Man: It strengthens social bonds by reminding us of meaningful relationships. It enhances our sense of personal continuity, connecting who we are now with who we were. And it can actually increase our tolerance for physical discomfort.",q:"According to the research, nostalgia",opts:["is a psychologically harmful fixation on the past","performs several beneficial psychological functions","primarily serves to distort our memories of past events"],ans:1},
{audio:"Extract 3 (continued): Woman: The physical discomfort finding is surprising. Man: It is. The researchers had participants hold their hands in ice water. Those who had been primed with nostalgic memories reported less pain. The theory is that nostalgia generates a warm, socially connected feeling that literally buffers against physical distress.",q:"The ice water experiment demonstrated that nostalgia",opts:["has no effect on physical sensations","can reduce the perception of physical pain","increases sensitivity to cold temperatures"],ans:1}
]},
// --- Exercise 7: Listening Part 2 ---
{type:"fl",tl:"Listening",title:"Part 2 - Sentence Completion",ins:"Complete each sentence with a word or short phrase.",
audio:"Good afternoon. Today I would like to talk about the Dunning-Kruger effect, one of the most widely discussed findings in social psychology. First documented by David Dunning and Justin Kruger in 1999, the effect describes a cognitive bias in which people with limited competence in a domain tend to overestimate their own ability, while genuine experts tend to underestimate theirs. The original study asked undergraduate students to assess their performance on tests of logical reasoning, grammar, and humour. Those who scored in the bottom quartile estimated their performance to be well above average, while top performers slightly underrated themselves. Dunning and Kruger proposed that incompetence deprives people of the very skills needed to recognise their own incompetence, a kind of double curse. The effect has since been replicated across numerous domains, from medical diagnosis to chess to financial literacy. However, recent scholarship has introduced important qualifications. Some researchers argue that the effect is partly a statistical artefact, resulting from regression to the mean combined with the bounded nature of the assessment scale. Others contend that the effect is smaller and more context-dependent than the original paper suggested. Cultural factors also appear to play a role. Studies conducted in East Asian countries, where self-effacing norms are stronger, have found weaker effects or even reversals, with low performers being more accurate in their self-assessments. Despite these qualifications, the core insight retains considerable value: metacognition, the ability to accurately assess one\\'s own knowledge, is itself a skill that must be developed, and its absence can have serious consequences in domains ranging from healthcare to politics.",
items:[
{pre:"The Dunning-Kruger effect was first documented in",gap:"1999",post:"by David Dunning and Justin Kruger."},
{pre:"People with limited competence tend to",gap:"overestimate",post:"their own ability in a domain."},
{pre:"Genuine experts, conversely, tend to",gap:"underestimate",post:"their performance."},
{pre:"The original study tested undergraduates on logical reasoning, grammar, and",gap:"humour",post:"."},
{pre:"According to Dunning and Kruger, incompetence prevents people from recognising their own",gap:"incompetence",post:"."},
{pre:"Some researchers claim the effect is partly a",gap:"statistical artefact",post:"caused by regression to the mean."},
{pre:"In East Asian countries, studies found",gap:"weaker effects",post:"or even reversals of the original pattern."},
{pre:"The underlying skill of accurately evaluating one\\'s own knowledge is called",gap:"metacognition",post:"."},
{pre:"Poor metacognitive skills can have serious consequences in areas including healthcare and",gap:"politics",post:"."}
]},
// --- Exercise 8: Writing ---
{type:"wr",tl:"Writing",title:"Part 1 - Essay",ins:"Write your essay in 240-280 words.",
prompt:"Write an essay summarising and evaluating the key points from both texts.\n\nText 1: Translation is an art that enriches world literature by making masterpieces accessible across linguistic boundaries. Great translators are creative artists in their own right, and the translated text, while different from the original, can achieve its own distinctive excellence.\n\nText 2: Something essential is inevitably lost in translation. The music of the original language, its cultural resonances, its untranslatable idioms, these cannot survive the transfer to another tongue. Readers of translated literature are deceiving themselves if they believe they are accessing the original work.",minWords:240}
]},
// ==============================
// PRACTICE TEST 9
// ==============================
{t:"Practice Test 9",exercises:[
// --- Exercise 1: MC Cloze ---
{type:"mc",tl:"Use of English",title:"Part 1 - Multiple-choice Cloze",ins:"Choose the best word (A-D) for each gap.",
passage:"The question of how to preserve cultural heritage in an age of rapid globalisation has (1)_____ urgent practical significance. As indigenous languages disappear at an alarming rate and traditional practices yield to the homogenising forces of global commerce, the world\\'s cultural diversity is being (2)_____ at an unprecedented pace. International organisations such as UNESCO have attempted to (3)_____ this trend through programmes designed to document and protect endangered cultural practices. Yet these efforts, however well-intentioned, face a fundamental (4)_____: the very act of designating a cultural practice as heritage risks transforming it from a living tradition into a museum (5)_____, frozen in time and stripped of the dynamism that once sustained it. The most thoughtful approaches to cultural preservation recognise that traditions must be allowed to (6)_____ if they are to remain meaningful to the communities that practise them. A tradition that cannot adapt to changing circumstances will inevitably become an (7)_____, maintained not because it serves a living purpose but because external authorities have deemed it worthy of preservation. Genuine cultural vitality, these commentators insist, requires not just protection from external threats but the (8)_____ freedom to innovate, reinterpret, and, when necessary, let go.",
items:[
{q:"Gap 1",opts:["acquired","assumed","attained","amassed"],ans:0},
{q:"Gap 2",opts:["depleted","eroded","diminished","attenuated"],ans:1},
{q:"Gap 3",opts:["stem","curb","curtail","suppress"],ans:0},
{q:"Gap 4",opts:["paradox","dilemma","quandary","predicament"],ans:0},
{q:"Gap 5",opts:["exhibit","specimen","artefact","relic"],ans:0},
{q:"Gap 6",opts:["evolve","progress","advance","develop"],ans:0},
{q:"Gap 7",opts:["anachronism","anomaly","aberration","antiquity"],ans:0},
{q:"Gap 8",opts:["attendant","concomitant","accompanying","concurrent"],ans:0}
]},
// --- Exercise 2: Open Cloze ---
{type:"fl",tl:"Use of English",title:"Part 2 - Open Cloze",ins:"Write the word which best fits each gap.",
items:[
{pre:"Compelling",gap:"as",post:"the argument may sound, it rests on questionable assumptions."},
{pre:"They left no stone unturned",gap:"in",post:"their search for the missing document."},
{pre:"The reforms were introduced with a",gap:"view",post:"to reducing inequality."},
{pre:"Not since the founding of the institution",gap:"had",post:"such radical changes been proposed."},
{pre:"The project was completed on time, no small feat",gap:"given",post:"the constraints the team was operating under."},
{pre:"She spoke",gap:"as",post:"if she had witnessed the events herself, though she had not."},
{pre:"The extent of the damage, considerable",gap:"though",post:"it was, could have been far worse."},
{pre:"It remains to",gap:"be",post:"seen whether these measures will have the desired effect."}
]},
// --- Exercise 3: Word Formation ---
{type:"wf",tl:"Use of English",title:"Part 3 - Word Formation",ins:"Use the word given to form a word that fits the gap.",
items:[
{pre:"The",root:"DIVERSE",gap:"diversification",post:"of the economy was a key policy objective."},
{pre:"His behaviour was",root:"CONSCIENCE",gap:"unconscionable",post:"and warranted severe disciplinary action."},
{pre:"The",root:"PERCEIVE",gap:"imperceptible",post:"shift in public opinion went unnoticed by the media."},
{pre:"Their",root:"ACHIEVE",gap:"underachievement",post:"puzzled teachers who knew their potential."},
{pre:"She was",root:"MISTAKE",gap:"unmistakably",post:"the most qualified candidate for the position."},
{pre:"The building\\'s",root:"ARCHITECT",gap:"architectural",post:"significance made it a prime candidate for listing."},
{pre:"His",root:"PERSEVERE",gap:"perseverance",post:"in the face of adversity was truly admirable."},
{pre:"The report catalogued a series of",root:"REGULAR",gap:"irregularities",post:"in the accounting procedures."}
]},
// --- Exercise 4: Key Word Transformations ---
{type:"kt",tl:"Use of English",title:"Part 4 - Key Word Transformations",ins:"Use 3-8 words including the word given.",
items:[
{src:"I am certain that she did not know about the plan.",kw:"IGNORANCE",ans:"she was most certainly in ignorance of the plan",hint:"in ignorance of = not knowing about"},
{src:"The new rules apply to all employees without exception.",kw:"BOARD",ans:"the new rules apply across the board without exception",hint:"across the board = to everyone"},
{src:"We must decide now; there is no more time for discussion.",kw:"RUN",ans:"we have run out of time for discussion",hint:"run out of = exhaust the supply of"},
{src:"He kept his composure even though he was under enormous pressure.",kw:"FACE",ans:"he kept his composure in the face of enormous pressure",hint:"in the face of = despite"},
{src:"The investigation was stopped before it could reach any conclusions.",kw:"CUT",ans:"the investigation was cut short before any conclusions could be",hint:"cut short = end prematurely"},
{src:"Nobody could have predicted how successful the project would become.",kw:"FORESEEN",ans:"the success of the project could not have been foreseen by",hint:"could not have been foreseen = was impossible to predict"}
]},
// --- Exercise 5: Reading MC ---
{type:"mc",tl:"Reading",title:"Part 5 - Multiple Choice",ins:"Choose the best answer (A-D).",
passage:"The relationship between music and mathematics has intrigued thinkers since Pythagoras first demonstrated that musical intervals correspond to simple numerical ratios. A vibrating string divided in half produces a note one octave higher; divided in thirds, it produces a perfect fifth. For Pythagoras, this was evidence of a profound cosmic harmony: mathematics was the hidden language of reality, and music was its audible manifestation.\n\nModern neuroscience has given this ancient intuition a surprising degree of empirical support. Brain imaging studies reveal that musical training produces measurable changes in brain structure, particularly in regions associated with spatial reasoning, pattern recognition, and mathematical thinking. Musicians consistently outperform non-musicians on tests of mathematical ability, and early musical education has been shown to enhance general cognitive development in ways that persist into adulthood.\n\nYet the nature of the relationship remains contested. Some researchers argue for a direct causal connection: musical training literally rewires the brain in ways that enhance mathematical cognition. Others propose that the correlation reflects a common underlying ability, a general capacity for pattern recognition that manifests in both musical and mathematical aptitude. Still others suggest that the apparent connection is largely an artefact of socioeconomic factors. Children from affluent families are more likely to receive both musical instruction and superior mathematical education, creating a spurious correlation between the two.\n\nThe implications for education policy are significant but ambiguous. If musical training genuinely enhances mathematical ability, then the widespread elimination of music programmes from schools in pursuit of narrow academic outcomes is not just culturally impoverishing but cognitively counterproductive. The irony would be rich: by cutting music to make more time for mathematics, schools would actually be undermining mathematical achievement.\n\nHowever, this argument must be treated with caution. The research, while suggestive, does not yet establish a robust causal link. Many of the studies suffer from small sample sizes, inadequate control groups, and the persistent difficulty of disentangling correlation from causation. Moreover, even if a causal link exists, it does not follow that music education should be justified primarily in terms of its mathematical benefits. Music has intrinsic value as a form of human expression and cultural participation. To defend it solely on instrumental grounds is to miss the point and, paradoxically, to reinforce the very utilitarian mindset that led to its marginalisation in the first place.\n\nThe most compelling case for music education draws on both arguments. Music deserves a place in the curriculum because it enriches the human experience, cultivates creativity and empathy, and provides a form of expression that words alone cannot achieve. If it also happens to enhance mathematical and cognitive abilities, so much the better. But the tail should not wag the dog: the primary justification for music education should be musical, not mathematical.",
items:[
{q:"The reference to Pythagoras in the opening paragraph serves to",opts:["prove that mathematics and music are identical disciplines","establish the historical pedigree of the music-mathematics connection","argue that ancient Greek science was superior to modern research","demonstrate that musical intervals are random rather than mathematical"],ans:1},
{q:"The writer presents the neuroscientific evidence as",opts:["conclusive proof that music training causes mathematical improvement","interesting but insufficient to establish definitive causation","entirely irrelevant to the debate about music education","contradictory to the findings of brain imaging studies"],ans:1},
{q:"The socioeconomic argument suggests that the music-mathematics correlation may be",opts:["stronger than researchers have claimed","caused by a shared genetic factor","an illusion produced by wealth-related confounding variables","proof that only affluent children benefit from music"],ans:2},
{q:"The writer describes the cutting of school music programmes as potentially ironic because",opts:["schools that cut music see improved mathematical outcomes","removing music may actually harm the mathematical skills it was sacrificed for","students prefer mathematics to music in most surveys","music programmes are the most expensive part of school budgets"],ans:1},
{q:"The writer argues against defending music education solely on mathematical grounds because",opts:["the mathematical benefits have been conclusively disproven","doing so perpetuates the utilitarian thinking that marginalised music","mathematical education should take priority over all other subjects","music has no measurable cognitive benefits whatsoever"],ans:1},
{q:"The final paragraph\\'s position on music education can best be summarised as",opts:["music should be taught only where mathematical benefits are proven","the primary case for music must rest on its intrinsic value","cognitive benefits are the strongest argument for music in schools","music and mathematics should be taught as a single integrated subject"],ans:1}
]},
// --- Exercise 6: Listening Part 1 ---
{type:"mc",tl:"Listening",title:"Part 1 - Short Extracts",ins:"Listen and choose the correct answer.",
items:[
{audio:"Extract 1: Woman: What struck me about the study was the finding that children who grow up in multilingual environments develop a heightened sensitivity to communicative intent. They become better at reading what people mean as opposed to what they say. Man: Because they have more practice navigating ambiguity? Woman: Precisely. When you are accustomed to switching between linguistic systems, you develop a more flexible interpretive framework. You learn early that meaning is not fixed but context-dependent.",q:"The woman explains that multilingual children develop",opts:["superior vocabulary in all their languages","enhanced ability to interpret communicative intent","a preference for one language over others"],ans:1},
{audio:"Extract 1 (continued): Man: Does this advantage persist into adulthood? Woman: The longitudinal studies suggest it does. Adults who grew up multilingual continue to show superior pragmatic competence, the ability to use language appropriately in social contexts, compared to monolingual peers.",q:"According to the woman, multilingual adults retain",opts:["stronger pragmatic language skills throughout life","an ability to learn new languages more quickly","better grammatical accuracy than monolingual adults"],ans:0},
{audio:"Extract 2: Man: The exhibition raises uncomfortable questions about the ethics of displaying human remains in museums. Woman: It does, and I think the curators were aware of the tension. They included extensive contextual material about the provenance of the remains and the ongoing debates about repatriation. Man: But is contextualisation sufficient? Or does the very act of exhibiting human remains commodify the dead, regardless of the explanatory apparatus surrounding them?",q:"The man questions whether",opts:["museums should include any contextual information about exhibits","displaying human remains can ever be ethically acceptable despite contextualisation","the exhibition\\'s contextual material was factually accurate"],ans:1},
{audio:"Extract 2 (continued): Woman: I think the answer depends on the relationship between the displaying institution and the community of origin. Where there is genuine consent and collaboration, display can be a form of honouring. Where remains were acquired through colonial violence, exhibition perpetuates that violence. Man: The provenance matters more than the presentation, then. Woman: Far more.",q:"The woman argues that the ethics of displaying remains depends primarily on",opts:["the quality of the museum\\'s educational materials","how the remains were originally acquired","the artistic merit of the exhibition design"],ans:1},
{audio:"Extract 3: Man: I was intrigued by the paper on decision fatigue. Apparently, judges are significantly more likely to grant parole early in the morning or just after a food break than late in the afternoon. Woman: The implication being that depleted cognitive resources lead to more conservative decisions? Man: Exactly. When you are mentally exhausted, you default to the status quo. Denying parole requires no justification; granting it requires active reasoning.",q:"The research on decision fatigue suggests that",opts:["judges are consistently fair regardless of time of day","mental exhaustion leads to more cautious default decisions","parole decisions should be made exclusively in the afternoon"],ans:1},
{audio:"Extract 3 (continued): Woman: That has disturbing implications for the justice system. Man: Profoundly disturbing. It suggests that outcomes that we assume are based on the merits of the case are actually influenced by something as arbitrary as when the judge last ate. If that is true, it represents a fundamental challenge to the ideal of equal justice under law.",q:"The man regards the findings as disturbing because they suggest",opts:["all judges are deliberately biased in their decisions","justice outcomes may be influenced by irrelevant physiological factors","the parole system should be entirely abolished"],ans:1}
]},
// --- Exercise 7: Listening Part 2 ---
{type:"fl",tl:"Listening",title:"Part 2 - Sentence Completion",ins:"Complete each sentence with a word or short phrase.",
audio:"I want to discuss today the concept of rewilding, which has emerged as one of the most exciting and contentious ideas in conservation biology. Rewilding, in its simplest definition, involves restoring ecosystems to a more natural state by reintroducing species that have been lost and allowing natural processes to resume. The concept gained mainstream attention through the work of George Monbiot, whose book Feral, published in 2013, argued passionately that much of the European landscape has been impoverished by centuries of intensive agriculture and that returning it to a wilder state would benefit both biodiversity and human well-being. The most celebrated rewilding project in the world is the reintroduction of grey wolves to Yellowstone National Park in 1995. The wolves triggered what ecologists call a trophic cascade, a chain of effects that rippled through the entire ecosystem. By preying on elk, the wolves allowed riverbank vegetation to recover, which stabilised stream banks and altered the physical course of rivers. The example demonstrated that the removal of a single apex predator can impoverish an entire landscape, and that its return can set in motion a remarkable process of ecological recovery. In Europe, rewilding projects are underway in several countries. The Knepp Estate in southern England has become a flagship example, transforming 3,500 acres of former farmland into a haven for rare species including turtle doves, nightingales, and purple emperor butterflies. However, rewilding faces significant opposition from farming communities who fear loss of productive land and from those who argue that managed landscapes have their own ecological value. The debate ultimately concerns what we mean by nature and whether human intervention in landscapes is inherently artificial or simply another form of ecological agency.",
items:[
{pre:"Rewilding involves restoring ecosystems by reintroducing lost species and allowing",gap:"natural processes",post:"to resume."},
{pre:"George Monbiot\\'s influential book on the subject was called",gap:"Feral",post:", published in 2013."},
{pre:"Grey wolves were reintroduced to Yellowstone National Park in",gap:"1995",post:"."},
{pre:"The wolves initiated a chain of ecological effects known as a",gap:"trophic cascade",post:"."},
{pre:"By preying on elk, wolves allowed riverbank vegetation to recover, which",gap:"stabilised stream banks",post:"and changed river courses."},
{pre:"In England, the Knepp Estate converted 3,500 acres of",gap:"former farmland",post:"into a wildlife haven."},
{pre:"Rare species at Knepp include turtle doves, nightingales, and",gap:"purple emperor butterflies",post:"."},
{pre:"Farming communities oppose rewilding because they fear",gap:"loss of productive land",post:"."},
{pre:"The fundamental debate concerns the definition of nature and whether human landscape intervention is inherently",gap:"artificial",post:"."}
]},
// --- Exercise 8: Writing ---
{type:"wr",tl:"Writing",title:"Part 1 - Essay",ins:"Write your essay in 240-280 words.",
prompt:"Write an essay summarising and evaluating the key points from both texts.\n\nText 1: The preservation of cultural heritage is a moral imperative. Indigenous languages, traditional crafts, and ancestral knowledge systems represent irreplaceable repositories of human wisdom. Once lost, they cannot be recovered, and the world is diminished by their absence.\n\nText 2: Cultural preservation efforts can become a form of well-intentioned tyranny. By freezing traditions in their current form, we deny communities the freedom to evolve and adapt. Living cultures are not museum exhibits; they change, and attempts to prevent that change are ultimately paternalistic.",minWords:240}
]},
// ==============================
// PRACTICE TEST 10
// ==============================
{t:"Practice Test 10",exercises:[
// --- Exercise 1: MC Cloze ---
{type:"mc",tl:"Use of English",title:"Part 1 - Multiple-choice Cloze",ins:"Choose the best word (A-D) for each gap.",
passage:"The concept of neuroplasticity has (1)_____ one of the most persistent assumptions in neuroscience: the belief that the adult brain is essentially fixed. For most of the twentieth century, it was (2)_____ that significant neural development ceased after childhood and that the brain\\'s structure was thereafter immutable. This dogma has been comprehensively (3)_____ by research demonstrating that the brain retains a remarkable capacity for reorganisation throughout life. London taxi drivers, for instance, have been shown to possess enlarged hippocampi, the brain region associated with spatial navigation, a difference that (4)_____ with years of experience. Meditation practitioners exhibit measurable increases in cortical thickness. Even learning to juggle produces detectable changes in brain structure within weeks. The implications are (5)_____. If the brain is not fixed but continuously reshaped by experience, then the distinction between nature and nurture becomes far less (6)_____ than traditionally assumed. Our neural architecture is not merely the product of our genes but is perpetually sculpted by what we do, think, and experience. This understanding has already (7)_____ practical applications, from rehabilitation programmes for stroke patients to educational strategies designed to harness the brain\\'s adaptive potential. Yet researchers caution against (8)_____ the findings. Neuroplasticity has limits, and not all brain changes are beneficial; chronic stress, for instance, produces neural changes that are decidedly harmful.",
items:[
{q:"Gap 1",opts:["overturned","overthrown","overridden","overcome"],ans:0},
{q:"Gap 2",opts:["held","maintained","contended","upheld"],ans:0},
{q:"Gap 3",opts:["refuted","rebutted","contradicted","countered"],ans:0},
{q:"Gap 4",opts:["correlates","coincides","corresponds","concurs"],ans:0},
{q:"Gap 5",opts:["far-reaching","wide-ranging","broad-based","all-encompassing"],ans:0},
{q:"Gap 6",opts:["clear-cut","straightforward","uncomplicated","unambiguous"],ans:0},
{q:"Gap 7",opts:["spawned","borne","begotten","fathered"],ans:0},
{q:"Gap 8",opts:["overstating","exaggerating","inflating","magnifying"],ans:0}
]},
// --- Exercise 2: Open Cloze ---
{type:"fl",tl:"Use of English",title:"Part 2 - Open Cloze",ins:"Write the word which best fits each gap.",
items:[
{pre:"Important",gap:"as",post:"these findings are, they must be interpreted with caution."},
{pre:"The research was groundbreaking in",gap:"that",post:"it challenged decades of established orthodoxy."},
{pre:"Were the hypothesis to be confirmed, it",gap:"would",post:"necessitate a complete revision of the theory."},
{pre:"Not only has the programme failed to achieve its objectives,",gap:"but",post:"it has actually made matters worse."},
{pre:"The plan, brilliant",gap:"on",post:"paper, proved impossible to implement in practice."},
{pre:"The government proceeded",gap:"with",post:"the reforms despite widespread public opposition."},
{pre:"So rapidly did the situation deteriorate",gap:"that",post:"emergency measures had to be introduced."},
{pre:"The funding was awarded on",gap:"condition",post:"that the results be made publicly available."}
]},
// --- Exercise 3: Word Formation ---
{type:"wf",tl:"Use of English",title:"Part 3 - Word Formation",ins:"Use the word given to form a word that fits the gap.",
items:[
{pre:"The",root:"CONCEIVE",gap:"misconception",post:"that the brain stops developing after childhood has been disproven."},
{pre:"Her",root:"TIRE",gap:"tireless",post:"advocacy for the cause eventually produced results."},
{pre:"The findings were",root:"CONTROVERSY",gap:"controversial",post:"and sparked a heated academic debate."},
{pre:"The",root:"DENY",gap:"undeniable",post:"truth is that the system needs fundamental reform."},
{pre:"His",root:"FORTH",gap:"forthcoming",post:"book promises to shed new light on the subject."},
{pre:"The",root:"ELUDE",gap:"elusive",post:"nature of consciousness continues to puzzle philosophers."},
{pre:"Their",root:"FORESEE",gap:"unforeseen",post:"departure threw the entire schedule into disarray."},
{pre:"The policy had a number of",root:"INTEND",gap:"unintended",post:"consequences that proved difficult to reverse."}
]},
// --- Exercise 4: Key Word Transformations ---
{type:"kt",tl:"Use of English",title:"Part 4 - Key Word Transformations",ins:"Use 3-8 words including the word given.",
items:[
{src:"The authorities did not manage to find the cause of the explosion.",kw:"BOTTOM",ans:"the authorities failed to get to the bottom of",hint:"get to the bottom of = discover the cause"},
{src:"He spoke so quietly that nobody could hear what he was saying.",kw:"BARELY",ans:"he spoke so quietly that his words were barely audible",hint:"barely audible = almost impossible to hear"},
{src:"I strongly advise you not to sign that contract.",kw:"BETTER",ans:"you had better not sign that contract",hint:"had better not = strong advice against"},
{src:"The success of the event was entirely due to her efforts.",kw:"CREDIT",ans:"the credit for the success of the event goes entirely to",hint:"the credit goes to = recognition of achievement"},
{src:"She did not intend to offend anyone with her remarks.",kw:"MEANT",ans:"her remarks were not meant to cause any offence",hint:"be meant to = be intended to"},
{src:"The discovery altered our understanding of evolution forever.",kw:"IRREVERSIBLY",ans:"the discovery irreversibly altered our understanding of evolution",hint:"irreversibly = in a way that cannot be undone"}
]},
// --- Exercise 5: Reading MC ---
{type:"mc",tl:"Reading",title:"Part 5 - Multiple Choice",ins:"Choose the best answer (A-D).",
passage:"The emergence of behavioural economics has posed a formidable challenge to the rational actor model that has dominated economic theory since the mid-twentieth century. Classical economics assumed that individuals are rational agents who consistently make decisions that maximise their own utility. They have stable preferences, process available information efficiently, and respond predictably to incentives. Behavioural economics, drawing on decades of psychological research, has systematically demonstrated that this model is, at best, an idealisation and, at worst, a fiction.\n\nThe field\\'s intellectual origins are usually traced to the work of Daniel Kahneman and Amos Tversky, whose research in the 1970s and 1980s identified a catalogue of cognitive biases that systematically distort human judgement. Loss aversion, the tendency to feel the pain of a loss more acutely than the pleasure of an equivalent gain, is perhaps the best known. Others include the anchoring effect, in which an initial piece of information disproportionately influences subsequent judgements, and the availability heuristic, in which people estimate probabilities based on how easily examples come to mind rather than on actual statistical frequency.\n\nThe practical applications have been extensive. Richard Thaler and Cass Sunstein\\'s concept of the nudge, a way of structuring choices to steer people towards better decisions without restricting their freedom, has been adopted by governments worldwide. The British Behavioural Insights Team, informally known as the Nudge Unit, has used insights from behavioural economics to increase tax compliance, encourage organ donation, and reduce energy consumption, often with strikingly modest interventions.\n\nYet the field has not been without its critics. Some economists argue that behavioural economics offers a useful corrective to the rational actor model but lacks a coherent theoretical framework of its own. It catalogues the ways in which people deviate from rationality but does not provide a systematic alternative account of how decisions are actually made. Without such an account, critics contend, the field remains a collection of interesting anomalies rather than a genuine paradigm shift.\n\nA more fundamental objection concerns the politics of nudging. While Thaler and Sunstein present nudges as liberty-preserving because they do not restrict choice, critics argue that they represent a form of paternalism that is all the more insidious for being invisible. When a government designs a pension form so that the default option is automatic enrolment, it is making a value judgement about what constitutes a good decision, a judgement that the individual has no opportunity to contest because they may not even be aware that a choice has been made on their behalf.\n\nThe debate raises deeper questions about autonomy and the role of the state. Liberal democratic societies are built on the assumption that citizens are capable of governing themselves. If behavioural economics reveals that we are systematically irrational, what does this imply for the legitimacy of democratic self-governance? It is a question that neither economists nor philosophers have yet answered satisfactorily.",
items:[
{q:"The writer presents the rational actor model as",opts:["a proven and reliable description of human behaviour","an idealised framework that behavioural economics has challenged","the only viable basis for economic theory","a model that behavioural economists have strengthened"],ans:1},
{q:"Loss aversion is described as the tendency to",opts:["avoid making any decisions that involve potential losses","feel losses more intensely than equivalent gains","consistently choose the option with the lowest risk","overestimate the probability of negative outcomes"],ans:1},
{q:"The writer\\'s attitude towards the practical applications of nudging is",opts:["entirely dismissive of their value","acknowledging their effectiveness while noting controversy","convinced they represent the ideal form of governance","sceptical that they have produced any measurable results"],ans:1},
{q:"The criticism that behavioural economics lacks a coherent theoretical framework suggests that",opts:["it has completely replaced classical economics","its findings are unreliable and should be ignored","it identifies problems without offering a systematic alternative theory","cognitive biases do not actually exist"],ans:2},
{q:"The political objection to nudging centres on the claim that it",opts:["restricts individual choice in visible and transparent ways","represents hidden paternalism that undermines genuine autonomy","has been adopted only by authoritarian governments","is too expensive to implement effectively"],ans:1},
{q:"The question raised in the final paragraph concerns",opts:["whether economic growth should remain a policy priority","the technical feasibility of implementing behavioural insights","what systematic irrationality implies for the foundations of democracy","whether Kahneman and Tversky\\'s research methods were sound"],ans:2}
]},
// --- Exercise 6: Listening Part 1 ---
{type:"mc",tl:"Listening",title:"Part 1 - Short Extracts",ins:"Listen and choose the correct answer.",
items:[
{audio:"Extract 1: Man: The concept of emotional intelligence has become ubiquitous in corporate training, but I worry that it has been diluted to the point of meaninglessness. Woman: You think the original concept had more rigour? Man: Considerably. When Peter Salovey and John Mayer first defined it, they were talking about a specific set of cognitive abilities: perceiving emotions accurately, using emotions to facilitate thought, understanding emotional complexity, and managing emotions adaptively. What corporate trainers have turned it into is essentially just being nice to people.",q:"The man is concerned that emotional intelligence has been",opts:["accurately applied in corporate contexts","oversimplified from its original scientific definition","rejected by the business community"],ans:1},
{audio:"Extract 1 (continued): Woman: Is the corporate version completely worthless, though? Man: Not worthless, but misleading. It gives people the impression that emotional intelligence is a soft skill, something you acquire by attending a workshop. The original concept is much more demanding. It involves genuine cognitive sophistication, not just interpersonal pleasantness.",q:"The man distinguishes between emotional intelligence as",opts:["a demanding cognitive ability and a superficial social skill","an innate talent and a learned behaviour","a corporate strategy and an academic theory"],ans:0},
{audio:"Extract 2: Woman: The town\\'s decision to pedestrianise the high street was met with howls of protest from local businesses, who predicted economic catastrophe. Man: And what happened? Woman: Footfall increased by forty percent in the first year. Retail turnover actually went up. It turns out that when you make a place pleasant to walk through, people linger longer and spend more. The businesses that adapted, adding outdoor seating, improving their frontages, thrived.",q:"The pedestrianisation resulted in",opts:["the economic decline that businesses had feared","an unexpected increase in commercial activity","no measurable change in business performance"],ans:1},
{audio:"Extract 2 (continued): Man: So the initial opposition was unfounded? Woman: In retrospect, yes. But I have some sympathy for the businesses. They were making rational predictions based on the assumption that car access equals customers. The evidence was not available until after the change was made. It takes courage to implement a policy when the beneficiaries do not yet know they are beneficiaries.",q:"The woman suggests that implementing transformative urban policies requires",opts:["ignoring all business concerns as inherently self-interested","courage because the benefits are not apparent in advance","waiting until all stakeholders unanimously agree"],ans:1},
{audio:"Extract 3: Man: The paper argues that procrastination is not a time management problem but an emotion regulation problem. People do not procrastinate because they cannot organise their time; they procrastinate because the task generates negative emotions, boredom, anxiety, frustration, and avoidance provides temporary relief. Woman: Which explains why procrastinators often do productive things instead of the task they are avoiding. Man: Exactly. They clean the house, reorganise their files, reply to emails. It is not laziness; it is emotional avoidance disguised as productivity.",q:"According to the research discussed, procrastination is fundamentally caused by",opts:["poor time management and organisational skills","the desire to avoid negative emotions associated with a task","a general tendency towards laziness and inactivity"],ans:1},
{audio:"Extract 3 (continued): Woman: Does the paper suggest solutions? Man: It recommends addressing the emotional root rather than the behavioural symptom. Techniques like self-compassion, reframing the task, and breaking it into less emotionally threatening components. The key insight is that telling a procrastinator to manage their time better is like telling a person with insomnia to just go to sleep. You are addressing the wrong problem.",q:"The man suggests that conventional advice to procrastinators fails because it",opts:["is too emotionally demanding for most people","targets behaviour rather than the underlying emotional cause","assumes procrastinators are aware of their problem"],ans:1}
]},
// --- Exercise 7: Listening Part 2 ---
{type:"fl",tl:"Listening",title:"Part 2 - Sentence Completion",ins:"Complete each sentence with a word or short phrase.",
audio:"In this final lecture of the series, I want to examine the concept of the attention economy, a term that has become central to understanding how digital platforms shape our behaviour and, increasingly, our politics. The phrase was coined by the economist Herbert Simon, who observed as early as 1971 that in an information-rich world, information consumes the attention of its recipients, creating a scarcity of attention. Simon\\'s insight was prescient but abstract. It took the rise of social media to reveal its full implications. The business model of platforms such as Facebook, Instagram, and TikTok depends on capturing and holding user attention, because attention is what they sell to advertisers. Every design decision, from the infinite scroll to the notification system, is optimised not for user well-being but for engagement, which is a euphemism for addictiveness. The consequences for mental health, particularly among young people, are now well documented. A meta-analysis published in the Journal of the American Medical Association found a significant association between social media use exceeding three hours daily and increased risk of anxiety and depression in adolescents. But the effects extend beyond individual well-being. The attention economy also degrades the quality of public discourse. Content that generates strong emotional reactions, outrage, fear, indignation, captures more attention than nuanced analysis. This creates a systematic bias towards sensationalism and polarisation. The philosopher Matthew Crawford has argued that attention is not merely an economic resource but a moral one. How we direct our attention shapes who we become. A culture that systematically fragments and commercialises attention is, on this view, engaged in a form of spiritual impoverishment that no amount of economic growth can compensate for.",
items:[
{pre:"The term attention economy was first used by the economist",gap:"Herbert Simon",post:"in 1971."},
{pre:"Simon observed that abundant information creates a corresponding scarcity of",gap:"attention",post:"."},
{pre:"Social media platforms sell user attention to",gap:"advertisers",post:"as their core business model."},
{pre:"Design features like the infinite scroll are optimised for",gap:"engagement",post:"rather than user well-being."},
{pre:"The JAMA meta-analysis found that using social media for more than",gap:"three hours daily",post:"increases adolescent mental health risks."},
{pre:"Content generating strong emotional reactions such as outrage and fear captures",gap:"more attention",post:"than nuanced analysis."},
{pre:"This creates a systematic bias towards sensationalism and",gap:"polarisation",post:"in public discourse."},
{pre:"The philosopher Matthew Crawford argues that attention is not merely economic but also",gap:"a moral resource",post:"."},
{pre:"Crawford suggests that a culture commercialising attention engages in a form of",gap:"spiritual impoverishment",post:"."}
]},
// --- Exercise 8: Writing ---
{type:"wr",tl:"Writing",title:"Part 1 - Essay",ins:"Write your essay in 240-280 words.",
prompt:"Write an essay summarising and evaluating the key points from both texts.\n\nText 1: Behavioural economics has revealed that human decision-making is systematically irrational. Governments have a responsibility to use this knowledge to design policies that guide citizens towards better choices, even if those citizens are unaware of the guidance.\n\nText 2: The use of behavioural insights by governments to influence citizen behaviour is a dangerous form of manipulation. Democratic societies must respect individual autonomy, even when people make choices that experts consider suboptimal. The alternative is a technocratic paternalism that undermines the foundations of self-governance.",minWords:240}
]}
]
};

if(typeof module!=="undefined") module.exports=CAM_CPE;


// Exponer en window para que cambridge-runner.html encuentre el dataset.
if (typeof window !== 'undefined') { window.CAM_CPE = CAM_CPE; }
