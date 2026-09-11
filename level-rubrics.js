/* Rúbricas por habilidad y por nivel CEFR (A2·B1·B2·C1). A = lo esperado en
   ese nivel (banda 3 de Cambridge), AD = por encima (banda 5), B = se acerca
   (banda 2), C = todavía no (banda 1). Fuentes: las escalas de evaluación
   públicas de A2 Key, B1 Preliminary, B2 First y C1 Advanced. */
window.LEVEL_RUBRICS = {
  levels: ['A2','B1','B2','C1'],

  writing: {
    criteria: [
      { k:'content',      text:'Content — I do what the task asks, fully and relevantly.' },
      { k:'organisation', text:'Organisation — paragraphs, linking words and a clear order.' },
      { k:'range',        text:'Language range — the grammar and vocabulary I use.' },
      { k:'accuracy',     text:'Accuracy — how many errors, and whether they block the meaning.' },
      { k:'register',     text:'Register and effect — the right tone for the reader and the text type.' }
    ],
    expect: {
      A2: { length:'25–35 words (email) · 35+ (story)',
            structures:'present and past simple, going to, can/must, because/and/but',
            linkers:'and, but, because, then, so',
            accuracy:'errors are fine if the message is clear',
            summary:'A strong A2 writing answers every point of the task in short, clear sentences that any reader can follow, even with small mistakes.' },
      B1: { length:'about 100 words',
            structures:'past continuous vs past simple, present perfect, first conditional, modals of obligation and advice',
            linkers:'because, so, although, however, when, after, before',
            accuracy:'errors do not usually block understanding, though they are noticeable',
            summary:'A strong B1 writing develops each point of the task in linked paragraphs that a reader follows without effort.' },
      B2: { length:'140–190 words',
            structures:'a full range of tenses, all conditional forms, the passive voice, relative clauses, modals of deduction and speculation',
            linkers:'furthermore, in addition, on the other hand, despite, whereas, provided that',
            accuracy:'few errors, and none of them affect the message',
            summary:'A strong B2 writing argues or narrates through organised paragraphs, with a good range of language and very few errors.' },
      C1: { length:'220–260 words',
            structures:'complex and compound sentences, inversion for emphasis, a wide range of hedging and speculative language',
            linkers:'a wide, varied range used naturally: notwithstanding, whereas, given that, insofar as',
            accuracy:'errors are rare and do not affect how easily the reader follows me',
            summary:'A strong C1 writing reads as a genuinely developed, precise piece, close in fluency to competent adult writing.' }
    },
    levels: {
      A2: {
        content: {
          AD:'I answer every point of the task and add one extra true detail of my own that still fits the topic.',
          A: 'I answer all the points the task asks for, in a way a reader can follow without guessing.',
          B: 'I answer only some of the points the task asks for, or the reader has to guess part of my message.',
          C: 'My text does not answer what the task asks, or there is not enough to tell what I mean.'
        },
        organisation: {
          AD:'My ideas follow a clear order and I connect more than one of them with the same linking word.',
          A: 'My ideas follow a logical order, joined with simple linking words like and, but and because.',
          B: 'My ideas are mostly in order, but some sentences stand alone with no linking word.',
          C: 'My sentences do not follow an order that the reader can trace.'
        },
        range: {
          AD:'I use some words beyond the most frequent classroom vocabulary, and my sentences are not all the same shape.',
          A: 'I use everyday vocabulary and simple sentence patterns that fit the topic.',
          B: 'I repeat the same few words and sentence patterns throughout my text.',
          C: 'My vocabulary is too limited to say what the task asks.'
        },
        accuracy: {
          AD:'My simple sentences are consistently correct, and a mistake only appears in something more ambitious I try.',
          A: 'My simple present and past forms are mostly correct, and any mistake still lets the reader understand me.',
          B: 'My basic forms are often wrong, and the reader has to work to follow some sentences.',
          C: 'Mistakes are so frequent that the reader cannot follow what I mean.'
        },
        register: {
          AD:'I choose the right greeting and closing for the person I am writing to, without being told to.',
          A: 'I use a greeting and closing that fit an email to a friend or classmate.',
          B: 'I write with no greeting or closing, or I use one that does not fit the person.',
          C: 'My text does not read like a message to another person at all.'
        }
      },
      B1: {
        content: {
          AD:'I answer every part of the task and develop one point with a reason or a personal example.',
          A: 'I answer every part of the task with relevant ideas that a reader can follow easily.',
          B: 'I answer most of the task, but one part is thin or only half developed.',
          C: 'I miss a part of the task, or my ideas do not match what was asked.'
        },
        organisation: {
          AD:'My paragraphs each carry one idea, and I use a variety of linking words to move between them.',
          A: 'I organise my text into paragraphs and link my ideas with words like because, although and however.',
          B: 'I use paragraphs, but the link between one idea and the next is not always clear.',
          C: 'My text has no clear paragraphs, or the ideas jump without connection.'
        },
        range: {
          AD:'I use some less common words and more than one way of saying the same thing.',
          A: 'I use a reasonable range of everyday vocabulary and simple joined sentences.',
          B: 'My vocabulary and sentence patterns are narrow, and I repeat the same phrasing often.',
          C: 'My range of language is too limited for a reader to follow the topic.'
        },
        accuracy: {
          AD:'I use a wider range of tenses correctly, and my few mistakes never confuse the reader.',
          A: 'My grammar is generally accurate, though mistakes appear when I try something more complex.',
          B: 'Mistakes are frequent enough that the reader sometimes has to reread a sentence.',
          C: 'Mistakes make several sentences hard to understand.'
        },
        register: {
          AD:'I keep a consistent tone across the whole text, matched to the reader and the text type.',
          A: 'My tone fits the text type and the person I am writing to.',
          B: 'My tone fits in parts, but slips into a style that does not match the task.',
          C: 'My tone does not fit the text type or the reader at all.'
        }
      },
      B2: {
        content: {
          AD:'I develop every point with a reason, an example or a consequence, and nothing feels like padding.',
          A: 'I cover all the points the task asks for, with ideas relevant to the topic and the reader.',
          B: 'I cover the points asked for, but one idea is undeveloped or slightly off topic.',
          C: 'I leave out a required point, or my ideas do not answer what was asked.'
        },
        organisation: {
          AD:'My paragraphs build on each other so the whole text reads as a single connected piece.',
          A: 'My text is organised into clear paragraphs, linked with a variety of cohesive devices.',
          B: 'My paragraphs are mostly clear, but a linking word is missing or used incorrectly.',
          C: 'My text lacks paragraphing, or the connection between ideas is unclear.'
        },
        range: {
          AD:'I choose precise vocabulary and vary my sentence structures so nothing feels repeated.',
          A: 'I use a good range of vocabulary and grammatical structures, including some less common language.',
          B: 'My range of vocabulary and structures is adequate but noticeably repetitive.',
          C: 'My limited range of language does not let me express the ideas the task needs.'
        },
        accuracy: {
          AD:'I control a wide range of structures with very few errors, none of which affect meaning.',
          A: 'I control a range of structures with good accuracy, and my errors do not affect communication.',
          B: 'I make errors that a reader notices, though the overall message still comes through.',
          C: 'My errors are frequent enough to distract the reader from what I mean.'
        },
        register: {
          AD:'I adapt register with control, for example turning more formal or more personal when the task calls for it.',
          A: 'I use a register and tone consistently appropriate for the task and the target reader.',
          B: 'My register mostly fits, but shifts once into a tone that does not suit the text type.',
          C: 'My register does not suit the text type or the reader.'
        }
      },
      C1: {
        content: {
          AD:'Every idea is developed with precision and nuance, and I anticipate what the reader still needs to know.',
          A: 'I develop all the points fully and relevantly, with ideas that show genuine understanding of the topic.',
          B: 'I develop most points, but one remains general where the task asked for more depth.',
          C: 'My content does not fulfil the task, or key points are missing.'
        },
        organisation: {
          AD:'My whole text reads as a coherent argument or narrative, and no linking device draws attention to itself.',
          A: 'My text is organised effectively, using a wide range of cohesive devices with control.',
          B: 'My organisation is mostly effective, but a paragraph could be placed more logically.',
          C: 'My text lacks the organisation a reader needs to follow an extended piece.'
        },
        range: {
          AD:'I use precise, idiomatic language naturally, choosing exactly the word or phrase the moment needs.',
          A: 'I use a wide range of vocabulary and grammatical structures with flexibility and precision.',
          B: 'My range is good but relies on safer, more common choices than the task invites.',
          C: 'My range of language does not match what an extended, developed text needs.'
        },
        accuracy: {
          AD:'My control of grammar and vocabulary is consistent even in complex, extended sentences.',
          A: 'I control a wide range of grammatical structures, with only rare and unobtrusive errors.',
          B: 'My structures are mostly correct, but errors appear when the sentence grows more complex.',
          C: 'Errors are frequent enough to undermine an otherwise developed text.'
        },
        register: {
          AD:'I adjust register within the text for effect, and the shift itself serves my purpose as a writer.',
          A: 'I hold a consistently appropriate register throughout, matched with precision to the text type and reader.',
          B: 'My register is appropriate overall, but a section drifts into a tone that does not fit.',
          C: 'My register does not suit the text type or is inconsistent throughout.'
        }
      }
    }
  },

  speaking: {
    criteria: [
      { k:'grammar_vocab', text:'Grammar and vocabulary — range and control of what I say.' },
      { k:'discourse',     text:'Discourse — I keep going, link my ideas and answer at the right length.' },
      { k:'pronunciation', text:'Pronunciation — sounds, stress and intonation that the listener follows.' },
      { k:'interaction',   text:'Interaction — I start, respond and keep the conversation going.' },
      { k:'content',       text:'Content — I say what the task asks, with detail that fits my level.' }
    ],
    expect: {
      A2: { length:'short answers, one or two sentences per turn',
            structures:'present simple, past simple, can and cannot for ability',
            linkers:'and, but, because',
            accuracy:'simple, familiar patterns are correct; new attempts may slip',
            summary:'A strong A2 speaker answers personal questions clearly in short, simple sentences with everyday vocabulary.' },
      B1: { length:'turns of several sentences, with an opinion and a reason',
            structures:'present perfect, comparatives, first conditional, modals of opinion',
            linkers:'because, so, although, but also',
            accuracy:'generally accurate in familiar structures, with occasional slips under pressure',
            summary:'A strong B1 speaker gives an opinion with a reason, compares photos and keeps a short conversation going.' },
      B2: { length:'extended turns of about a minute, developed with more than one idea',
            structures:'speculation and deduction (might, must have), a range of tenses used flexibly',
            linkers:'on the other hand, whereas, in addition, provided that',
            accuracy:'good control across a range of structures, with rare errors that do not affect meaning',
            summary:'A strong B2 speaker speculates, compares and negotiates with a partner, sustaining an extended turn with a good range of language.' },
      C1: { length:'extended, well-developed turns on abstract topics, with natural pausing only to think, not to search for language',
            structures:'a wide range of complex structures used spontaneously, including hedging and nuanced modality',
            linkers:'a wide range used naturally, without sounding rehearsed',
            accuracy:'high accuracy across complex structures, with rare, unobtrusive errors',
            summary:'A strong C1 speaker discusses abstract ideas fluently, negotiates an outcome with a partner and adapts language with precision.' }
    },
    levels: {
      A2: {
        grammar_vocab: {
          AD:'I use some structures beyond the basics, like a simple past narrative, without being asked to.',
          A: 'I use simple present and past forms and everyday vocabulary correctly enough to be understood.',
          B: 'I use basic forms, but mistakes sometimes stop the listener from understanding me.',
          C: 'My grammar and vocabulary are too limited to answer the questions asked.'
        },
        discourse: {
          AD:'I add an extra sentence of my own without being prompted, and my answers connect naturally.',
          A: 'I answer in more than one sentence and use simple linking words like and and because.',
          B: 'I answer mostly in single words or very short phrases.',
          C: 'I cannot produce enough language to build an answer.'
        },
        pronunciation: {
          AD:'My pronunciation is clear enough that the listener never needs to ask me to repeat.',
          A: 'My pronunciation is clear enough for a patient listener to understand me.',
          B: 'Some sounds or word stress are unclear, and the listener sometimes has to guess.',
          C: 'My pronunciation makes it hard for the listener to understand most of what I say.'
        },
        interaction: {
          AD:'I ask my partner a question back, without being told to.',
          A: 'I respond to what I am asked and take my turn at the right moment.',
          B: 'I respond, but I need the question repeated or simplified before I understand it.',
          C: 'I cannot keep the exchange going without constant help.'
        },
        content: {
          AD:'I add a personal detail that goes beyond the question asked.',
          A: 'I say what the question asks about myself or my daily life.',
          B: 'I say something related to the topic, but not what the question actually asks.',
          C: 'I cannot produce content that answers the question.'
        }
      },
      B1: {
        grammar_vocab: {
          AD:'I use a wider range of tenses and vocabulary accurately, including some less common words.',
          A: 'I use a range of everyday structures and vocabulary with reasonable accuracy for my level.',
          B: 'My range of structures and vocabulary is narrow, and mistakes are frequent.',
          C: 'My grammar and vocabulary do not let me express what the task asks.'
        },
        discourse: {
          AD:'I develop my answer with more than one linked idea before my partner or the examiner responds.',
          A: 'I give an opinion and a reason, linked with words like because and although.',
          B: 'I answer briefly, without developing my idea or explaining my reason.',
          C: 'I cannot produce a connected answer of more than a phrase.'
        },
        pronunciation: {
          AD:'My intonation and stress support my meaning, not just individual sounds.',
          A: 'My pronunciation is clear, and occasional mispronunciations do not affect understanding.',
          B: 'My pronunciation causes the listener to lose parts of what I say.',
          C: 'My pronunciation makes most of my answer difficult to follow.'
        },
        interaction: {
          AD:'I react to what my partner says and build on it, not only on my own idea.',
          A: 'I respond appropriately and take initiative sometimes, without needing constant prompts.',
          B: 'I respond only when directly asked, and I do not develop the exchange.',
          C: 'I cannot sustain an exchange without frequent help from the examiner.'
        },
        content: {
          AD:'I compare and contrast with a personal reaction the task did not explicitly ask for.',
          A: 'I compare the photos or ideas asked for, with relevant detail.',
          B: 'I describe rather than compare, or my detail is only loosely relevant.',
          C: 'My content does not match what the task asks for.'
        }
      },
      B2: {
        grammar_vocab: {
          AD:'I use a wide range of structures, including speculation and deduction, with very few errors.',
          A: 'I use a good range of structures and vocabulary flexibly, including some idiomatic language.',
          B: 'My range is adequate, but I repeat the same structures instead of varying them.',
          C: 'My grammar and vocabulary are too limited for the abstract ideas the task asks about.'
        },
        discourse: {
          AD:'I organise an extended turn clearly, signalling when I move from one idea to the next.',
          A: 'I produce an extended turn of about a minute, with more than one developed idea.',
          B: 'My turn is shorter than expected, or one idea repeats instead of developing.',
          C: 'I cannot sustain an extended turn without long pauses or repetition.'
        },
        pronunciation: {
          AD:'My pronunciation and intonation are natural enough that the listener forgets to notice them.',
          A: 'My pronunciation is clear and natural, with intonation that supports my meaning.',
          B: 'My pronunciation is generally clear, but occasional patterns strain the listener.',
          C: 'My pronunciation regularly makes it an effort to follow me.'
        },
        interaction: {
          AD:'I negotiate with my partner toward an agreement, inviting their view and responding to it.',
          A: 'I interact readily, responding to my partner and developing the discussion together.',
          B: 'I interact, but mostly wait for my partner to lead the discussion.',
          C: 'I struggle to interact beyond short, disconnected responses.'
        },
        content: {
          AD:'I weigh the options asked about and justify a clear preference with more than one reason.',
          A: 'I speculate and compare the options asked about, with content that fits the task.',
          B: 'My content addresses the topic in general, without engaging with what the task specifically asks.',
          C: 'My content does not answer the task set.'
        }
      },
      C1: {
        grammar_vocab: {
          AD:'I use complex structures and precise, idiomatic vocabulary with a near-native naturalness.',
          A: 'I use a wide range of complex structures and precise vocabulary with control and flexibility.',
          B: 'My range is good but relies on safer structures instead of the complexity the task invites.',
          C: 'My grammar and vocabulary do not support the abstract, nuanced discussion the task asks for.'
        },
        discourse: {
          AD:'My extended turns flow as naturally structured argument, with no loss of coherence under pressure.',
          A: 'I structure extended, coherent turns on abstract topics, developing more than one related idea.',
          B: 'My turns are coherent but shorter or less developed than the topic invites.',
          C: 'I cannot organise an extended turn on an abstract topic.'
        },
        pronunciation: {
          AD:'My pronunciation, stress and intonation are close to a fluent adult speaker in this exchange.',
          A: 'My pronunciation is clear and natural throughout, even in longer, more complex turns.',
          B: 'My pronunciation is clear overall but occasionally strains the listener in longer turns.',
          C: 'My pronunciation makes an extended turn difficult to follow.'
        },
        interaction: {
          AD:'I steer the conversation toward a resolution, managing turns tactfully and drawing my partner in.',
          A: 'I negotiate with my partner, responding to their points and moving the discussion toward an outcome.',
          B: 'I interact adequately but do not actively negotiate toward the outcome the task asks for.',
          C: 'I do not negotiate or build meaningfully on what my partner says.'
        },
        content: {
          AD:'I bring a genuinely original angle to an abstract issue, and justify it under challenge.',
          A: 'I discuss abstract or hypothetical ideas with content that shows real engagement with the topic.',
          B: 'My content stays general where the task asks for a considered, personal position.',
          C: 'My content does not engage with the abstract issue the task raises.'
        }
      }
    }
  },

  reading: {
    criteria: [
      { k:'gist',       text:'Main idea — I get the overall meaning and purpose of a text.' },
      { k:'detail',     text:'Detail — I find specific information and check it against the text.' },
      { k:'inference',  text:'Inference — I understand what is implied: attitude, opinion, purpose.' },
      { k:'vocabulary', text:'Vocabulary in context — I work out unknown words and expressions from what surrounds them.' },
      { k:'structure',  text:'Text organisation — I follow reference words, linkers and the order of ideas.' }
    ],
    expect: {
      A2: { texts:'very short notices, signs, messages and simple stories, up to about 150 words',
            tasks:'matching a text to its purpose or to a picture, and multiple-choice questions on plain factual detail',
            summary:'I understand short, simple, clearly signposted texts about familiar topics, matching them to short factual questions.' },
      B1: { texts:'short texts of about 100–120 words, and one longer article or blog of around 450 words',
            tasks:'multiple matching across several short texts, multiple choice, and choosing which sentence completes a gapped text',
            summary:'I understand the main points and some detail in longer texts on familiar and semi-familiar topics, including some inference.' },
      B2: { texts:'longer magazine and newspaper articles of about 550–700 words, sometimes spread across four short texts',
            tasks:'multiple choice on detail, opinion and attitude, a gapped text with sentences removed, and multiple matching across texts',
            summary:'I understand the main ideas, detail, opinion and attitude in longer texts, including topics I do not know well, and follow the writer’s argument.' },
      C1: { texts:'long, complex texts of about 700–850 words, including literary extracts and journalistic or academic writing',
            tasks:'multiple choice on nuanced meaning, a gapped text with complex logical links, and multiple matching of opinions across several short texts',
            summary:'I follow implicit meaning, tone and argument structure across long, complex texts on abstract or unfamiliar topics, including literary and journalistic style.' }
    },
    levels: {
      A2: {
        gist: {
          AD:'I identify the overall message of a short text even when it is not stated in the first line.',
          A: 'I identify the main point of a short, simple text about a familiar topic.',
          B: 'I get part of the general idea, but I confuse it with a secondary detail.',
          C: 'I cannot say what a short, simple text is mainly about.'
        },
        detail: {
          AD:'I find a specific detail even when it is expressed with different words than the question.',
          A: 'I find specific factual information in a short text when the wording matches closely.',
          B: 'I find a detail only when it appears in the same words as the question.',
          C: 'I cannot locate specific information in a short text.'
        },
        inference: {
          AD:'I notice a simple feeling or opinion even when it is not stated directly.',
          A: 'I understand a clearly signalled feeling, like happy or angry, from an obvious clue.',
          B: 'I only notice a feeling or opinion when it is named with the exact word.',
          C: 'I do not go beyond the literal words of the text.'
        },
        vocabulary: {
          AD:'I work out an unfamiliar everyday word from a picture or a very clear context clue.',
          A: 'I understand everyday, high-frequency vocabulary without needing to guess.',
          B: 'An unfamiliar word stops me from understanding the sentence around it.',
          C: 'Too many unfamiliar words block my understanding of the whole text.'
        },
        structure: {
          AD:'I follow a short text even when a sentence changes the order of events.',
          A: 'I follow a short text organised in a simple, chronological order.',
          B: 'I lose the order of events when the text is longer than a few lines.',
          C: 'I cannot follow the sequence of a short text at all.'
        }
      },
      B1: {
        gist: {
          AD:'I identify the overall purpose of a text, not only its topic.',
          A: 'I identify the main idea and the writer’s general purpose in a text on a familiar or semi-familiar topic.',
          B: 'I identify the topic, but not what the writer’s purpose is.',
          C: 'I cannot identify the main idea of a text longer than a few lines.'
        },
        detail: {
          AD:'I find and cross-check a detail against a second part of the text before answering.',
          A: 'I find specific information across a longer text, even when the wording differs from the question.',
          B: 'I find a detail only when I read past the paragraph where it appears.',
          C: 'I cannot locate specific information reliably in a longer text.'
        },
        inference: {
          AD:'I infer a writer’s opinion even when it is expressed indirectly, through examples rather than a direct statement.',
          A: 'I infer a simple opinion or feeling that the writer implies rather than states directly.',
          B: 'I only recognise an opinion when the writer states it directly.',
          C: 'I do not notice implied meaning at all.'
        },
        vocabulary: {
          AD:'I work out a less common word from context even when the surrounding clues are indirect.',
          A: 'I work out an unfamiliar word from the context of the sentence around it.',
          B: 'I need most words to be familiar already, or I lose the meaning of the sentence.',
          C: 'Unfamiliar vocabulary blocks my understanding of much of the text.'
        },
        structure: {
          AD:'I follow reference words like it, this or one across more than one sentence without losing the thread.',
          A: 'I follow how ideas connect from one sentence to the next, including simple reference words.',
          B: 'I lose track of what a reference word like it or this refers to.',
          C: 'I cannot follow how the ideas in the text connect.'
        }
      },
      B2: {
        gist: {
          AD:'I identify the overall argument of a text and how each part serves it.',
          A: 'I identify the main idea, tone and purpose of a text on a topic I do not know well.',
          B: 'I identify the main idea, but not the tone or the writer’s attitude behind it.',
          C: 'I cannot reliably identify the main idea of a longer text.'
        },
        detail: {
          AD:'I distinguish a detail from a similar but incorrect option designed to mislead.',
          A: 'I find and confirm specific detail, opinion and attitude across a longer text.',
          B: 'I find some detail, but I am misled by an option that looks similar to the correct one.',
          C: 'I cannot reliably distinguish correct detail from a similar, incorrect option.'
        },
        inference: {
          AD:'I infer the writer’s attitude even when it shifts or is qualified within the same text.',
          A: 'I infer the writer’s attitude, opinion or purpose from indirect clues in the text.',
          B: 'I infer an attitude only when the language is strongly obvious.',
          C: 'I do not go beyond the literal meaning of what is stated.'
        },
        vocabulary: {
          AD:'I work out the precise meaning of an idiomatic expression from how it is used.',
          A: 'I work out the meaning of less frequent vocabulary and expressions from context.',
          B: 'I understand most vocabulary, but an idiomatic expression or collocation stops me.',
          C: 'Unfamiliar vocabulary and expressions block my understanding of key parts of the text.'
        },
        structure: {
          AD:'I follow cohesion across a whole text, including a paragraph moved out of its original place.',
          A: 'I follow cohesion across paragraphs, including reference chains that span several sentences.',
          B: 'I follow cohesion within a paragraph, but lose it across paragraph breaks.',
          C: 'I cannot follow how paragraphs relate to each other in a longer text.'
        }
      },
      C1: {
        gist: {
          AD:'I identify a subtle shift in the writer’s stance across a long, complex text.',
          A: 'I identify the overall argument and stance of a long, complex text on an abstract or unfamiliar topic.',
          B: 'I identify the general topic, but the precise stance or argument escapes me.',
          C: 'I cannot identify the overall argument of a long, complex text.'
        },
        detail: {
          AD:'I trace a detail across a text where it is developed, qualified or later reconsidered.',
          A: 'I find and interpret precise detail in a long, complex text, including detail stated with nuance.',
          B: 'I find obvious detail, but not detail that is qualified or stated with nuance.',
          C: 'I cannot reliably locate detail in a long, complex text.'
        },
        inference: {
          AD:'I recognise irony or understatement, and what the writer implies without stating it.',
          A: 'I infer implicit meaning, tone and authorial stance in a long, complex text.',
          B: 'I infer only the most explicit attitudes, missing subtler or indirect ones.',
          C: 'I do not access implicit meaning in a long, complex text.'
        },
        vocabulary: {
          AD:'I distinguish between two close shades of meaning conveyed by different word choices.',
          A: 'I work out precise, abstract or literary vocabulary from context, including subtle shades of meaning.',
          B: 'I understand common vocabulary, but abstract or literary language stops me.',
          C: 'Unfamiliar abstract or literary vocabulary blocks my understanding of the text.'
        },
        structure: {
          AD:'I follow the logical architecture of a complex argument across an entire long text.',
          A: 'I follow complex cohesion and long-range reference across an entire long text.',
          B: 'I follow local cohesion, but lose the overall structure of a long, complex text.',
          C: 'I cannot follow the organisation of a long, complex text.'
        }
      }
    }
  },

  listening: {
    criteria: [
      { k:'gist',      text:'Main idea — I get what the speakers are talking about and why.' },
      { k:'detail',    text:'Detail — I catch names, numbers, times and facts, and complete notes or gaps accurately.' },
      { k:'inference', text:'Attitude and opinion — I understand feelings, agreement and what is implied.' },
      { k:'speed',     text:'Speed and voices — I keep up with natural speed, different accents and background noise.' },
      { k:'following', text:'Following longer recordings — I hold the thread of a longer talk or conversation to the end.' }
    ],
    expect: {
      A2: { sources:'short dialogues, announcements and simple phone messages',
            speed:'slow, clearly articulated, in one standard accent, with pauses',
            summary:'I understand the main point and simple factual detail in short, slow, clearly articulated recordings on familiar topics.' },
      B1: { sources:'longer dialogues, interviews and short talks',
            speed:'near-natural speed, in a couple of standard accents',
            summary:'I understand the main points and specific detail in longer recordings at natural speed, on familiar and some unfamiliar topics.' },
      B2: { sources:'interviews, discussions and monologues, including five short extracts on a shared theme',
            speed:'natural speed, across a range of standard accents',
            summary:'I understand detailed information, opinion and attitude in extended recordings at natural speed, including some unfamiliar topics and speakers.' },
      C1: { sources:'extended talks, lectures and multi-speaker discussions on abstract or specialised topics',
            speed:'fast, natural speech with connected speech and a wide range of accents',
            summary:'I follow extended, fast, natural speech on abstract or unfamiliar topics, including implied meaning, attitude and the relationship between speakers.' }
    },
    levels: {
      A2: {
        gist: {
          AD:'I identify the topic of a short recording even when it is only mentioned once, in passing.',
          A: 'I identify what a short, slow, clearly articulated recording is about.',
          B: 'I identify the general topic, but I lose it if the speaker changes subject briefly.',
          C: 'I cannot say what a short recording is about.'
        },
        detail: {
          AD:'I catch a specific detail even when a number or a name is said quickly.',
          A: 'I catch simple factual detail, like a time, a place or a name, in a slow, clear recording.',
          B: 'I catch a detail only when it is repeated or spelled out.',
          C: 'I cannot reliably catch specific factual detail in a recording.'
        },
        inference: {
          AD:'I notice a simple feeling in a speaker’s voice even without an obvious clue word.',
          A: 'I understand an obvious feeling, like being happy or annoyed, from a clear clue in what is said.',
          B: 'I only notice a feeling when the speaker names it directly.',
          C: 'I do not go beyond the literal words a speaker uses.'
        },
        speed: {
          AD:'I follow a recording even when the speaker briefly speeds up or hesitates.',
          A: 'I follow speech that is slow, clear and in one standard accent.',
          B: 'I lose the meaning as soon as the speaker speaks a little faster than expected.',
          C: 'I cannot follow speech at anything above a very slow, deliberate pace.'
        },
        following: {
          AD:'I follow a short recording and still remember detail from its very beginning by the end.',
          A: 'I follow a single short exchange between one or two speakers to the end.',
          B: 'I follow the start of a short recording, but lose the thread before the end.',
          C: 'I cannot follow a short recording from beginning to end.'
        }
      },
      B1: {
        gist: {
          AD:'I identify the purpose of a conversation, not only its topic.',
          A: 'I identify the main idea of a longer dialogue or monologue at near-natural speed.',
          B: 'I identify the topic, but not what the speakers are trying to achieve.',
          C: 'I cannot identify the main idea of a longer recording.'
        },
        detail: {
          AD:'I complete notes accurately even when the answer is reworded rather than said directly.',
          A: 'I complete notes or answer questions with specific detail from a longer recording.',
          B: 'I complete notes only when the wording matches the recording closely.',
          C: 'I cannot reliably extract specific detail from a longer recording.'
        },
        inference: {
          AD:'I infer agreement or disagreement between speakers even when it is not stated directly.',
          A: 'I infer a speaker’s simple opinion or feeling that is implied rather than stated.',
          B: 'I only recognise an opinion when a speaker states it directly.',
          C: 'I do not notice implied attitude in a recording.'
        },
        speed: {
          AD:'I follow speech at natural speed even with some background noise or overlap.',
          A: 'I follow speech at near-natural speed, in a couple of standard accents.',
          B: 'I lose parts of the meaning when the speed feels natural rather than careful.',
          C: 'I cannot follow speech at anything close to natural speed.'
        },
        following: {
          AD:'I hold the thread of a longer conversation between several speakers to the end.',
          A: 'I hold the thread of a longer conversation or talk of a few minutes.',
          B: 'I hold the thread for part of a longer recording, then lose it.',
          C: 'I cannot follow a recording longer than a short exchange.'
        }
      },
      B2: {
        gist: {
          AD:'I identify the overall stance of a speaker across an extended talk.',
          A: 'I identify the main idea and gist of an interview or discussion at natural speed.',
          B: 'I identify the topic, but not the speaker’s overall stance.',
          C: 'I cannot reliably identify the main idea of an extended recording.'
        },
        detail: {
          AD:'I complete a sentence with the precise words used, distinguishing it from a similar but wrong detail.',
          A: 'I complete sentences with specific information from an extended recording at natural speed.',
          B: 'I complete some sentences, but I am misled by similar-sounding but incorrect detail.',
          C: 'I cannot reliably complete sentences with detail from an extended recording.'
        },
        inference: {
          AD:'I infer a speaker’s attitude even when it is qualified or changes during the recording.',
          A: 'I infer opinion and attitude from tone and word choice, not only from direct statements.',
          B: 'I infer an attitude only when it is expressed very clearly.',
          C: 'I do not go beyond the literal content of what speakers say.'
        },
        speed: {
          AD:'I follow several different accents and speeds without needing repetition.',
          A: 'I follow natural speed and a range of standard accents.',
          B: 'I follow one familiar accent well, but a different accent slows my understanding.',
          C: 'I cannot follow natural-speed speech reliably.'
        },
        following: {
          AD:'I keep track of five or more short extracts on the same theme and match each one correctly.',
          A: 'I keep track of several speakers or short extracts on a related theme.',
          B: 'I follow one extract at a time, but lose track when several extracts follow quickly.',
          C: 'I cannot keep track of more than one speaker or extract at a time.'
        }
      },
      C1: {
        gist: {
          AD:'I identify a shift in a speaker’s position over the course of an extended, abstract talk.',
          A: 'I identify the overall argument and stance in an extended, abstract talk or discussion.',
          B: 'I identify the topic, but the precise argument or stance escapes me.',
          C: 'I cannot identify the overall argument of an extended, abstract talk.'
        },
        detail: {
          AD:'I capture a precise detail even when it is stated once, quickly, inside a longer explanation.',
          A: 'I capture precise detail from fast, natural speech, including detail stated only once.',
          B: 'I capture detail only when it is stated clearly and given time to register.',
          C: 'I cannot reliably capture detail from fast, natural speech.'
        },
        inference: {
          AD:'I recognise irony, hesitation or understatement in what a speaker implies but does not say.',
          A: 'I infer implied attitude, agreement and nuance across an extended, abstract discussion.',
          B: 'I infer only the most direct attitudes, missing subtler or indirect ones.',
          C: 'I do not access implied meaning in an extended discussion.'
        },
        speed: {
          AD:'I follow overlapping, fast speech across a wide range of accents without losing meaning.',
          A: 'I follow fast, natural speech with connected speech and a wide range of accents.',
          B: 'I follow natural speed in a familiar accent, but fast or unfamiliar speech loses me.',
          C: 'I cannot follow fast, natural speech reliably.'
        },
        following: {
          AD:'I hold the thread of a long, complex talk even when the argument shifts direction more than once.',
          A: 'I hold the thread of a long, complex talk or discussion through shifts in the argument.',
          B: 'I hold the thread of a long talk in parts, but lose it when the argument shifts.',
          C: 'I cannot hold the thread of a long, complex talk to the end.'
        }
      }
    }
  }
};
