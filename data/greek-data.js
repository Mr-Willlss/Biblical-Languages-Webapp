// data/greek-data.js
// Koine Greek — Beginner Track — Lessons 1–25
// Source: Learn-koine-Greek original curriculum

const GREEK_LESSONS = [
  {
    id:"g1", lesson:1, lang:"greek", world:1, track:"beginner",
    title:"The Greek Alphabet — Part 1 (α to μ)",
    grammarNote:"Learn the first 12 letters of the Greek alphabet.",
    description:`The Greek alphabet has 24 letters. Each has an uppercase form, a lowercase form, a name, and a transliteration sound.\nLetters 1–12: Α α (Alpha/a), Β β (Beta/b), Γ γ (Gamma/g),\nΔ δ (Delta/d), Ε ε (Epsilon/e short), Ζ ζ (Zeta/z),\nΗ η (Eta/ē long), Θ θ (Theta/th), Ι ι (Iota/i),\nΚ κ (Kappa/k), Λ λ (Lambda/l), Μ μ (Mu/m)\n\nEvery letter has a name, shape, and sound. Greek is phonetic — once you know the letters you can read any Greek word aloud. Take time with each one and say them out loud.`,
    videoUrl:"https://youtu.be/NdG0XKcsOGA",
    xp:15,
    vocabulary:[
      {id:"gv-1-1",lang:"greek",lesson:1,script:"ἀδελφός",transliteration:"adelphos",english:"brother",type:"noun"},
      {id:"gv-1-2",lang:"greek",lesson:1,script:"ἄνθρωπος",transliteration:"anthropos",english:"man / human being",type:"noun"},
      {id:"gv-1-3",lang:"greek",lesson:1,script:"βλέπω",transliteration:"blepo",english:"I see / I look",type:"verb"}
    ],
    exercises:[
      {id:"g1-ex1",type:"multiple_choice",prompt:"What is the name of the Greek letter: Γ",options:["Alpha","Gamma","Delta","Beta"],answer:"Gamma"},
      {id:"g1-ex2",type:"multiple_choice",prompt:"Which letter is transliterated as 'th'?",options:["Τ τ (Tau)","Θ θ (Theta)","Φ φ (Phi)","Χ χ (Chi)"],answer:"Θ θ (Theta)"},
      {id:"g1-ex3",type:"multiple_choice",prompt:"What does ἀδελφός mean?",options:["Father","Brother","Son","Friend"],answer:"Brother"},
      {id:"g1-ex4",type:"ordering",prompt:"Arrange these words to say 'I see the man'",items:["βλέπω","τὸν","ἄνθρωπον"],answer:["βλέπω","τὸν","ἄνθρωπον"]},
      {id:"g1-ex5",type:"multiple_choice",prompt:"Which letter makes the long ē sound?",options:["Ε ε","Η η","Ι ι","Α α"],answer:"Η η"},
      {id:"g1-ex6",type:"true_false",prompt:"Greek is a phonetic language — letters always represent the same sounds.",answer:true},
      {id:"g1-ex7",type:"multiple_choice",prompt:"What does βλέπω mean?",options:["I hear","I speak","I see / I look","I believe"],answer:"I see / I look"}
    ]
  },
  {
    id:"g2", lesson:2, lang:"greek", world:1, track:"beginner",
    title:"The Greek Alphabet — Part 2 (ν to ω)",
    grammarNote:"Learn the remaining 12 letters and the two forms of Sigma.",
    description:`Letters 13–24: Ν ν (Nu/n), Ξ ξ (Xi/x), Ο ο (Omicron/o short),\nΠ π (Pi/p), Ρ ρ (Rho/r), Σ σ/ς (Sigma/s),\nΤ τ (Tau/t), Υ υ (Upsilon/u-y), Φ φ (Phi/ph),\nΧ χ (Chi/ch), Ψ ψ (Psi/ps), Ω ω (Omega/ō long).\n\nNote: Sigma has two lowercase forms — σ is used in the middle of words, and ς (final sigma) is used at the END of a word only. Also note that Omega (long ō) and Omicron (short o) are entirely different letters — never confuse them.`,
    videoUrl:"https://youtu.be/x2ybZ7D1FUY",
    xp:15,
    vocabulary:[
      {id:"gv-2-1",lang:"greek",lesson:2,script:"ἔχω",transliteration:"echo",english:"I have",type:"verb"},
      {id:"gv-2-2",lang:"greek",lesson:2,script:"καί",transliteration:"kai",english:"and / also / even",type:"conjunction"},
      {id:"gv-2-3",lang:"greek",lesson:2,script:"λέγω",transliteration:"lego",english:"I say / I speak",type:"verb"},
      {id:"gv-2-4",lang:"greek",lesson:2,script:"χαῖρε",transliteration:"chaire",english:"rejoice / greetings",type:"verb"}
    ],
    exercises:[
      {id:"g2-ex1",type:"multiple_choice",prompt:"Which letter makes the 'ps' sound?",options:["Ξ ξ","Φ φ","Ψ ψ","Χ χ"],answer:"Ψ ψ"},
      {id:"g2-ex2",type:"multiple_choice",prompt:"Sigma has two lowercase forms. Which is used at the END of a word?",options:["σ","ς","Σ","Both work"],answer:"ς"},
      {id:"g2-ex3",type:"multiple_choice",prompt:"What does καί mean?",options:["But","From","And / also","In"],answer:"And / also"},
      {id:"g2-ex4",type:"multiple_choice",prompt:"Omega (Ω ω) is transliterated as:",options:["o (short)","u","ō (long)","w"],answer:"ō (long)"},
      {id:"g2-ex5",type:"true_false",prompt:"Omega and Omicron represent the same sound.",answer:false},
      {id:"g2-ex6",type:"multiple_choice",prompt:"What does χαῖρε mean?",options:["Believe!","I have","Rejoice / Greetings","I say"],answer:"Rejoice / Greetings"}
    ]
  },
  {
    id:"g3", lesson:3, lang:"greek", world:1, track:"beginner",
    title:"Vowels, Diphthongs & Accents",
    grammarNote:"Master Greek vowels, diphthong combinations, and the three accent marks.",
    description:`VOWELS (7): α, ε, η, ι, ο, υ, ω\nShort vowels: ε, ο (always short); α, ι, υ (can be short or long)\nLong vowels: η, ω (always long); α, ι, υ (can be long)\n\nDIPHTHONGS — two vowels pronounced as one sound:\nαι (like 'aisle') | ει (like 'eight') | οι (like 'oil')\nαυ (like 'now') | ευ (like 'feud') | ου (like 'food')\nυι (like 'we')\n\nACCENTS (3):\nAcute (΄) — can appear on any of last 3 syllables: ἄνθρωπος\nGrave (\`) — replaces acute on final syllable before another word\nCircumflex (͂) — only on long syllables, last 2 syllables: δοῦλος`,
    videoUrl:"https://youtu.be/FFe4hrH-U9U",
    xp:20,
    vocabulary:[
      {id:"gv-3-1",lang:"greek",lesson:3,script:"ἄρτος",transliteration:"artos",english:"bread",type:"noun"},
      {id:"gv-3-2",lang:"greek",lesson:3,script:"ἐσθίω",transliteration:"esthio",english:"I eat",type:"verb"},
      {id:"gv-3-3",lang:"greek",lesson:3,script:"καρπός",transliteration:"karpos",english:"fruit",type:"noun"},
      {id:"gv-3-4",lang:"greek",lesson:3,script:"πιστεύω",transliteration:"pisteuo",english:"I believe",type:"verb"}
    ],
    exercises:[
      {id:"g3-ex1",type:"multiple_choice",prompt:"How many vowels does Greek have?",options:["5","6","7","8"],answer:"7"},
      {id:"g3-ex2",type:"multiple_choice",prompt:"The diphthong 'ου' sounds like:",options:["oil","aisle","food","feud"],answer:"food"},
      {id:"g3-ex3",type:"multiple_choice",prompt:"Which accent appears ONLY on long syllables?",options:["Acute","Grave","Circumflex","All three"],answer:"Circumflex"},
      {id:"g3-ex4",type:"multiple_choice",prompt:"Which vowels are ALWAYS short?",options:["α and ι","ε and ο","η and ω","υ and ω"],answer:"ε and ο"},
      {id:"g3-ex5",type:"true_false",prompt:"The diphthong 'αι' sounds like 'aisle'.",answer:true},
      {id:"g3-ex6",type:"multiple_choice",prompt:"What does πιστεύω mean?",options:["I see","I eat","I believe","I speak"],answer:"I believe"}
    ]
  },
  {
    id:"g4", lesson:4, lang:"greek", world:1, track:"beginner",
    title:"First Greek Words — Nouns & Basic Vocabulary",
    grammarNote:"Learn essential Koine Greek nouns and their English connections.",
    description:`Greek nouns have GENDER (masculine, feminine, neuter), NUMBER (singular, plural), and CASE (how the word functions in a sentence). In a dictionary, nouns appear in the NOMINATIVE SINGULAR form.\n\nToday's words are all from the New Testament — some of the most frequent words you will encounter when reading Greek Scripture. Notice how many English words come from Greek roots: θεός → theology, ἄγγελος → angel, κόσμος → cosmos.`,
    videoUrl:"https://youtu.be/kOBQY72TDgs",
    xp:20,
    vocabulary:[
      {id:"gv-4-1",lang:"greek",lesson:4,script:"δοῦλος",transliteration:"doulos",english:"slave / servant",type:"noun"},
      {id:"gv-4-2",lang:"greek",lesson:4,script:"κόσμος",transliteration:"kosmos",english:"world",type:"noun"},
      {id:"gv-4-3",lang:"greek",lesson:4,script:"θεός",transliteration:"theos",english:"God",type:"noun"},
      {id:"gv-4-4",lang:"greek",lesson:4,script:"υἱός",transliteration:"huios",english:"son",type:"noun"},
      {id:"gv-4-5",lang:"greek",lesson:4,script:"καρδία",transliteration:"kardia",english:"heart",type:"noun"},
      {id:"gv-4-6",lang:"greek",lesson:4,script:"ἀλήθεια",transliteration:"aletheia",english:"truth",type:"noun"},
      {id:"gv-4-7",lang:"greek",lesson:4,script:"ἄγγελος",transliteration:"angelos",english:"angel / messenger",type:"noun"}
    ],
    exercises:[
      {id:"g4-ex1",type:"multiple_choice",prompt:"What does θεός mean?",options:["Angel","Lord","God","Son"],answer:"God"},
      {id:"g4-ex2",type:"multiple_choice",prompt:"What does ἀλήθεια mean?",options:["Love","Truth","World","Heart"],answer:"Truth"},
      {id:"g4-ex3",type:"multiple_choice",prompt:"ἄγγελος means:",options:["King","Prophet","Angel / Messenger","Servant"],answer:"Angel / Messenger"},
      {id:"g4-ex4",type:"multiple_choice",prompt:"Which is the Greek word for 'world'?",options:["κόσμος","καρδία","δοῦλος","υἱός"],answer:"κόσμος"},
      {id:"g4-ex5",type:"multiple_choice",prompt:"What does καρδία mean?",options:["Soul","Mind","Heart","Body"],answer:"Heart"},
      {id:"g4-ex6",type:"true_false",prompt:"The Greek word 'κόσμος' is the root of the English word 'cosmos'.",answer:true}
    ]
  },
  {
    id:"g5", lesson:5, lang:"greek", world:1, track:"beginner",
    title:"Cases in Greek — The 5 Cases",
    grammarNote:"Understand the five Greek noun cases and the function each one serves.",
    description:`Greek has FIVE CASES. The case of a noun tells you its FUNCTION in the sentence — not word order.\n\n1. NOMINATIVE — the SUBJECT\n2. GENITIVE — POSSESSION ('of')\n3. DATIVE — INDIRECT OBJECT ('to/for')\n4. ACCUSATIVE — DIRECT OBJECT\n5. VOCATIVE — DIRECT ADDRESS\n\nIn English, word order determines meaning: 'The dog bit the man' vs 'The man bit the dog.' In Greek, the ENDINGS on the words tell you who did what — so word order can be flexible.`,
    videoUrl:"https://youtu.be/312B-629lEU",
    xp:25,
    vocabulary:[
      {id:"gv-5-1",lang:"greek",lesson:5,script:"ἐλεύθερος",transliteration:"eleutheros",english:"free",type:"adjective"},
      {id:"gv-5-2",lang:"greek",lesson:5,script:"καλός",transliteration:"kalos",english:"good / beautiful",type:"adjective"},
      {id:"gv-5-3",lang:"greek",lesson:5,script:"δίκαιος",transliteration:"dikaios",english:"righteous / just",type:"adjective"},
      {id:"gv-5-4",lang:"greek",lesson:5,script:"μακάριος",transliteration:"makarios",english:"blessed / happy",type:"adjective"},
      {id:"gv-5-5",lang:"greek",lesson:5,script:"κακός",transliteration:"kakos",english:"bad / evil",type:"adjective"}
    ],
    exercises:[
      {id:"g5-ex1",type:"multiple_choice",prompt:"How many cases does Greek have?",options:["3","4","5","6"],answer:"5"},
      {id:"g5-ex2",type:"multiple_choice",prompt:"Which case shows POSSESSION ('of')?",options:["Nominative","Genitive","Dative","Accusative"],answer:"Genitive"},
      {id:"g5-ex3",type:"multiple_choice",prompt:"Which case is the DIRECT OBJECT?",options:["Vocative","Nominative","Dative","Accusative"],answer:"Accusative"},
      {id:"g5-ex4",type:"multiple_choice",prompt:"What does μακάριος mean?",options:["Holy","Righteous","Blessed / Happy","Free"],answer:"Blessed / Happy"},
      {id:"g5-ex5",type:"true_false",prompt:"In Greek, word order determines the subject of a sentence.",answer:false},
      {id:"g5-ex6",type:"multiple_choice",prompt:"The Vocative case is used for:",options:["Possession","Direct address","The subject","The direct object"],answer:"Direct address"}
    ]
  },
  {
    id:"g6", lesson:6, lang:"greek", world:2, track:"beginner",
    title:"Verbs — Present Active Indicative",
    grammarNote:"Learn to conjugate Greek verbs in the present tense using personal endings.",
    description:`Greek verbs change their ENDINGS to show person and number.\n\nPresent Active Indicative of πιστεύω (I believe):\n1st Sg: πιστεύω — I believe\n2nd Sg: πιστεύεις — you believe\n3rd Sg: πιστεύει — he/she/it believes\n1st Pl: πιστεύομεν — we believe\n2nd Pl: πιστεύετε — you all believe\n3rd Pl: πιστεύουσι — they believe\n\nKEY PERSONAL ENDINGS: -ω, -εις, -ει, -ομεν, -ετε, -ουσι\nOnce you know these, you can conjugate any regular present active verb.`,
    videoUrl:"https://youtu.be/E7ESBqWT-sA",
    xp:25,
    vocabulary:[
      {id:"gv-6-1",lang:"greek",lesson:6,script:"φόβος",transliteration:"phobos",english:"fear",type:"noun"},
      {id:"gv-6-2",lang:"greek",lesson:6,script:"εἰμί",transliteration:"eimi",english:"I am",type:"verb"},
      {id:"gv-6-3",lang:"greek",lesson:6,script:"ἐλπίζω",transliteration:"elpizo",english:"I hope",type:"verb"},
      {id:"gv-6-4",lang:"greek",lesson:6,script:"θέλω",transliteration:"thelo",english:"I wish / I want",type:"verb"},
      {id:"gv-6-5",lang:"greek",lesson:6,script:"ἀκούω",transliteration:"akouo",english:"I hear",type:"verb"}
    ],
    exercises:[
      {id:"g6-ex1",type:"multiple_choice",prompt:"What is the 3rd person plural of πιστεύω?",options:["πιστεύει","πιστεύομεν","πιστεύουσι","πιστεύετε"],answer:"πιστεύουσι"},
      {id:"g6-ex2",type:"multiple_choice",prompt:"The ending -εις means:",options:["I (1st sg)","You (2nd sg)","He/She (3rd sg)","We (1st pl)"],answer:"You (2nd sg)"},
      {id:"g6-ex3",type:"multiple_choice",prompt:"What does εἰμί mean?",options:["I see","I am","I have","I believe"],answer:"I am"},
      {id:"g6-ex4",type:"multiple_choice",prompt:"Translate: πιστεύομεν",options:["I believe","You believe","We believe","They believe"],answer:"We believe"},
      {id:"g6-ex5",type:"multiple_choice",prompt:"What does ἀκούω mean?",options:["I see","I speak","I hear","I believe"],answer:"I hear"},
      {id:"g6-ex6",type:"true_false",prompt:"The ending -ω marks the 1st person singular in Greek.",answer:true}
    ]
  },
  {
    id:"g7", lesson:7, lang:"greek", world:2, track:"beginner",
    title:"Genders & Articles",
    grammarNote:"Master the three Greek genders and the definite article.",
    description:`Greek has THREE GENDERS: Masculine, Feminine, Neuter.\n\nTHE DEFINITE ARTICLE ('the') changes with gender, number, and case:\nMasculine: ὁ (nom sg) | οἱ (nom pl)\nFeminine: ἡ (nom sg) | αἱ (nom pl)\nNeuter: τό (nom sg) | τά (nom pl)\n\nThe article is your BEST CLUE to a noun's gender and case. When you learn a new noun, always learn it with its article: ὁ λόγος (the word), ἡ καρδία (the heart), τό τέκνον (the child).`,
    videoUrl:"https://youtu.be/292Tk2Gy15I",
    xp:25,
    vocabulary:[
      {id:"gv-7-1",lang:"greek",lesson:7,script:"τέκνον",transliteration:"teknon",english:"child",type:"noun"},
      {id:"gv-7-2",lang:"greek",lesson:7,script:"οἶκος",transliteration:"oikos",english:"house",type:"noun"},
      {id:"gv-7-3",lang:"greek",lesson:7,script:"γλῶσσα",transliteration:"glossa",english:"tongue / language",type:"noun"},
      {id:"gv-7-4",lang:"greek",lesson:7,script:"κώμη",transliteration:"kome",english:"village",type:"noun"},
      {id:"gv-7-5",lang:"greek",lesson:7,script:"σκοτία",transliteration:"skotia",english:"darkness",type:"noun"}
    ],
    exercises:[
      {id:"g7-ex1",type:"multiple_choice",prompt:"How many genders does Greek have?",options:["2","3","4","1"],answer:"3"},
      {id:"g7-ex2",type:"multiple_choice",prompt:"The article ἡ indicates which gender?",options:["Masculine","Feminine","Neuter","All genders"],answer:"Feminine"},
      {id:"g7-ex3",type:"multiple_choice",prompt:"What does τέκνον mean?",options:["Father","Mother","Child","Brother"],answer:"Child"},
      {id:"g7-ex4",type:"ordering",prompt:"Build the phrase: 'the house'",items:["ὁ","οἶκος","ἡ","τό"],answer:["ὁ","οἶκος"]},
      {id:"g7-ex5",type:"true_false",prompt:"The article τό is used with neuter nouns.",answer:true},
      {id:"g7-ex6",type:"multiple_choice",prompt:"What does σκοτία mean?",options:["Light","Truth","Darkness","Grace"],answer:"Darkness"}
    ]
  },
  {
    id:"g8", lesson:8, lang:"greek", world:2, track:"beginner",
    title:"Prepositions & Basic Sentences",
    grammarNote:"Learn Greek prepositions and which grammatical cases they govern.",
    description:`Greek prepositions govern specific CASES:\n\nἐν (in/among) → DATIVE\nεἰς (into/to) → ACCUSATIVE\nἐκ (out of/from) → GENITIVE\nἀπό (from) → GENITIVE\nσύν (with) → DATIVE\nμετά (with/after) → GENITIVE/ACCUSATIVE\nπερί (about) → GEN/ACC\nδιά (through/because) → GEN/ACC\n\nThe preposition + case combination gives the precise meaning. 'ἐν τῷ κόσμῳ' = 'in the world' (dative). 'εἰς τὸν κόσμον' = 'into the world' (accusative).`,
    videoUrl:"https://youtu.be/LZP_1coTrJM",
    xp:30,
    vocabulary:[
      {id:"gv-8-1",lang:"greek",lesson:8,script:"ἀπό",transliteration:"apo",english:"from / away from",type:"preposition"},
      {id:"gv-8-2",lang:"greek",lesson:8,script:"εἰς",transliteration:"eis",english:"into / to",type:"preposition"},
      {id:"gv-8-3",lang:"greek",lesson:8,script:"ἐκ",transliteration:"ek",english:"out of / from",type:"preposition"},
      {id:"gv-8-4",lang:"greek",lesson:8,script:"ἐν",transliteration:"en",english:"in / among",type:"preposition"},
      {id:"gv-8-5",lang:"greek",lesson:8,script:"σύν",transliteration:"syn",english:"with",type:"preposition"},
      {id:"gv-8-6",lang:"greek",lesson:8,script:"διά",transliteration:"dia",english:"through / because of",type:"preposition"},
      {id:"gv-8-7",lang:"greek",lesson:8,script:"μετά",transliteration:"meta",english:"with / after",type:"preposition"},
      {id:"gv-8-8",lang:"greek",lesson:8,script:"περί",transliteration:"peri",english:"about / concerning",type:"preposition"}
    ],
    exercises:[
      {id:"g8-ex1",type:"multiple_choice",prompt:"The preposition εἰς takes which case?",options:["Genitive","Dative","Accusative","Nominative"],answer:"Accusative"},
      {id:"g8-ex2",type:"multiple_choice",prompt:"What does ἐν mean?",options:["Out of","Into","From","In / among"],answer:"In / among"},
      {id:"g8-ex3",type:"multiple_choice",prompt:"Which preposition means 'out of' or 'from'?",options:["εἰς","ἐν","ἐκ","σύν"],answer:"ἐκ"},
      {id:"g8-ex4",type:"multiple_choice",prompt:"ἐν τῷ κόσμῳ means:",options:["Into the world","From the world","In the world","About the world"],answer:"In the world"},
      {id:"g8-ex5",type:"matching",prompt:"Match the prepositions to their meanings",pairs:[["ἐν","in / among"],["εἰς","into / to"],["ἐκ","out of / from"],["ἀπό","from / away from"]],answer:true},
      {id:"g8-ex6",type:"true_false",prompt:"The preposition ἐν governs the Dative case.",answer:true}
    ]
  },
  {
    id:"g9", lesson:9, lang:"greek", world:2, track:"beginner",
    title:"Future & Aorist Tenses",
    grammarNote:"Learn the Future (σ infix) and First Aorist (augment + σα) verb forms.",
    description:`FUTURE TENSE: Formed by inserting σ before the personal endings.\nπιστεύω → πιστεύσω (I will believe)\n\nFIRST AORIST: A past tense. Formed by:\n1) Adding augment ε- to the beginning\n2) Inserting σα before the endings\nπιστεύω → ἐπίστευσα (I believed)\n\nLIQUID VERBS (stems ending in λ/μ/ν/ρ) form the FUTURE differently by dropping σ and contracting: μένω → μενῶ (I will remain)`,
    videoUrl:"https://youtu.be/bL2jCAa78e4",
    xp:30,
    vocabulary:[
      {id:"gv-9-1",lang:"greek",lesson:9,script:"μένω",transliteration:"meno",english:"I remain / I stay",type:"verb"},
      {id:"gv-9-2",lang:"greek",lesson:9,script:"κρίνω",transliteration:"krino",english:"I judge",type:"verb"},
      {id:"gv-9-3",lang:"greek",lesson:9,script:"αἴρω",transliteration:"airo",english:"I take up / I raise",type:"verb"},
      {id:"gv-9-4",lang:"greek",lesson:9,script:"πέμπω",transliteration:"pempo",english:"I send",type:"verb"},
      {id:"gv-9-5",lang:"greek",lesson:9,script:"ἄγω",transliteration:"ago",english:"I lead / I bring",type:"verb"}
    ],
    exercises:[
      {id:"g9-ex1",type:"multiple_choice",prompt:"The First Aorist of πιστεύω (I believe) is:",options:["πιστεύσω","ἐπίστευσα","πεπίστευκα","πιστεύσεις"],answer:"ἐπίστευσα"},
      {id:"g9-ex2",type:"multiple_choice",prompt:"Liquid verbs form their future WITHOUT:",options:["Any suffix","The σ (sigma) suffix","Personal endings","The augment"],answer:"The σ (sigma) suffix"},
      {id:"g9-ex3",type:"multiple_choice",prompt:"What does μένω mean?",options:["I send","I judge","I remain / I stay","I raise"],answer:"I remain / I stay"},
      {id:"g9-ex4",type:"multiple_choice",prompt:"The Future of πιστεύω is:",options:["ἐπίστευσα","πεπίστευκα","πιστεύσω","πιστεύσεις"],answer:"πιστεύσω"},
      {id:"g9-ex5",type:"true_false",prompt:"The First Aorist is formed by adding ε- (augment) to the front of the verb.",answer:true}
    ]
  },
  {
    id:"g10", lesson:10, lang:"greek", world:2, track:"beginner",
    title:"Verb Analysis — The 5 Things to Know",
    grammarNote:"Parse any Greek verb by identifying Person, Number, Tense, Voice, and Mood.",
    description:`When you see a Greek verb, identify FIVE things:\n1. PERSON (1st/2nd/3rd)\n2. NUMBER (Singular/Plural)\n3. TENSE (Present/Imperfect/Future/Aorist/Perfect)\n4. VOICE (Active/Middle/Passive)\n5. MOOD (Indicative/Subjunctive/Imperative/Infinitive/Participle)\n\nEXAMPLE: ἠσθίετε\nLexical form: ἐσθίω | Imperfect | Active | Indicative | 2nd Plural\n= "You (all) were eating"`,
    videoUrl:"https://youtu.be/_jt8WWH7Lyw",
    xp:35,
    vocabulary:[
      {id:"gv-10-1",lang:"greek",lesson:10,script:"διδάσκω",transliteration:"didasko",english:"I teach",type:"verb"},
      {id:"gv-10-2",lang:"greek",lesson:10,script:"μανθάνω",transliteration:"manthano",english:"I learn",type:"verb"},
      {id:"gv-10-3",lang:"greek",lesson:10,script:"λαμβάνω",transliteration:"lambano",english:"I take / I receive",type:"verb"},
      {id:"gv-10-4",lang:"greek",lesson:10,script:"ἀποθνήσκω",transliteration:"apothnesko",english:"I die",type:"verb"},
      {id:"gv-10-5",lang:"greek",lesson:10,script:"συνάγω",transliteration:"sunago",english:"I gather together",type:"verb"}
    ],
    exercises:[
      {id:"g10-ex1",type:"multiple_choice",prompt:"How many properties must you identify when parsing a Greek verb?",options:["3","4","5","6"],answer:"5"},
      {id:"g10-ex2",type:"multiple_choice",prompt:"ἠσθίετε: What is the PERSON and NUMBER?",options:["1st Singular","3rd Plural","2nd Plural","1st Plural"],answer:"2nd Plural"},
      {id:"g10-ex3",type:"multiple_choice",prompt:"A verb in the PASSIVE VOICE means:",options:["The subject is doing the action","The subject is receiving the action","The subject acts on itself","It is a command"],answer:"The subject is receiving the action"},
      {id:"g10-ex4",type:"multiple_choice",prompt:"What does the INDICATIVE mood express?",options:["A wish","A command","A statement of fact","A possibility"],answer:"A statement of fact"},
      {id:"g10-ex5",type:"multiple_choice",prompt:"What does λαμβάνω mean?",options:["I teach","I die","I take / I receive","I gather"],answer:"I take / I receive"}
    ]
  },
  {
    id:"g11", lesson:11, lang:"greek", world:3, track:"beginner",
    title:"Adjectives & Agreement",
    grammarNote:"Greek adjectives must agree with their noun in gender, number, and case.",
    description:`Greek ADJECTIVES must AGREE with their noun in GENDER, NUMBER, and CASE (this is called concord).\n\nATTRIBUTIVE position — inside the article-noun group:\nὁ δίκαιος ἄνθρωπος = 'the righteous man'\n\nPREDICATE position — outside the article-noun group:\nὁ ἄνθρωπος δίκαιος = 'the man is righteous'\n\nIf a noun is feminine plural genitive, every adjective describing it must also be feminine plural genitive.`,
    videoUrl:"https://youtu.be/EAgSB9XI-p8",
    xp:35,
    vocabulary:[
      {id:"gv-11-1",lang:"greek",lesson:11,script:"μικρός",transliteration:"mikros",english:"small / little",type:"adjective"},
      {id:"gv-11-2",lang:"greek",lesson:11,script:"ἴδιος",transliteration:"idios",english:"one's own",type:"adjective"},
      {id:"gv-11-3",lang:"greek",lesson:11,script:"νεώτερος",transliteration:"neoteros",english:"younger",type:"adjective"},
      {id:"gv-11-4",lang:"greek",lesson:11,script:"πλοῦτος",transliteration:"ploutos",english:"wealth / riches",type:"noun"},
      {id:"gv-11-5",lang:"greek",lesson:11,script:"χρεία",transliteration:"chreia",english:"need / necessity",type:"noun"}
    ],
    exercises:[
      {id:"g11-ex1",type:"multiple_choice",prompt:"Greek adjectives must agree with their noun in:",options:["Only gender","Gender and number only","Gender, number, and case","Case only"],answer:"Gender, number, and case"},
      {id:"g11-ex2",type:"multiple_choice",prompt:"ὁ δίκαιος ἄνθρωπος — the adjective is in:",options:["Predicate position","Attributive position","No position — wrong Greek","Vocative use"],answer:"Attributive position"},
      {id:"g11-ex3",type:"multiple_choice",prompt:"What does μικρός mean?",options:["Great","Holy","Small / Little","Old"],answer:"Small / Little"},
      {id:"g11-ex4",type:"multiple_choice",prompt:"The feminine nominative singular of δίκαιος is:",options:["δίκαιοι","δικαία","δίκαιον","δικαίου"],answer:"δικαία"},
      {id:"g11-ex5",type:"true_false",prompt:"In predicate position, the adjective is inside the article-noun group.",answer:false}
    ]
  },
  {
    id:"g12", lesson:12, lang:"greek", world:3, track:"beginner",
    title:"Demonstrative Pronouns — This & That",
    grammarNote:"Learn οὗτος ('this') and ἐκεῖνος ('that') in all three genders.",
    description:`οὗτος — THIS (near): masculine = οὗτος, feminine = αὕτη, neuter = τοῦτο\nἐκεῖνος — THAT (far): masculine = ἐκεῖνος, feminine = ἐκείνη, neuter = ἐκεῖνο\n\nDemonstratives often appear OUTSIDE the article-noun group:\nοὗτος ὁ ἄνθρωπος = 'this man'\nὁ ἄνθρωπος οὗτος = 'this man' (same meaning, both correct)\n\nNote: the same words (οὗτος, ἐκεῖνος) can also serve as pronouns meaning 'he/she/that one'.`,
    videoUrl:"https://youtu.be/SnBzcffcOGg",
    xp:35,
    vocabulary:[
      {id:"gv-12-1",lang:"greek",lesson:12,script:"νῦν",transliteration:"nyn",english:"now",type:"adverb"},
      {id:"gv-12-2",lang:"greek",lesson:12,script:"πάντοτε",transliteration:"pantote",english:"always",type:"adverb"},
      {id:"gv-12-3",lang:"greek",lesson:12,script:"οὐκέτι",transliteration:"ouketi",english:"no longer",type:"adverb"},
      {id:"gv-12-4",lang:"greek",lesson:12,script:"πάλιν",transliteration:"palin",english:"again",type:"adverb"},
      {id:"gv-12-5",lang:"greek",lesson:12,script:"τότε",transliteration:"tote",english:"then",type:"adverb"}
    ],
    exercises:[
      {id:"g12-ex1",type:"multiple_choice",prompt:"The neuter nominative singular of οὗτος is:",options:["οὗτος","αὕτη","τοῦτο","ταῦτα"],answer:"τοῦτο"},
      {id:"g12-ex2",type:"multiple_choice",prompt:"ἐκεῖνος means:",options:["This","That","Which","Who"],answer:"That"},
      {id:"g12-ex3",type:"multiple_choice",prompt:"How do you say 'this man' in Greek?",options:["ὁ ἄνθρωπος οὗτος","οὗτος ὁ ἄνθρωπος","Either of the above","Neither — οὗτος can't modify nouns"],answer:"Either of the above"},
      {id:"g12-ex4",type:"multiple_choice",prompt:"What does οὐκέτι mean?",options:["Not yet","No longer","Never","Not here"],answer:"No longer"},
      {id:"g12-ex5",type:"true_false",prompt:"οὗτος and ἐκεῖνος both decline to match their noun's gender and case.",answer:true}
    ]
  },
  {
    id:"g13", lesson:13, lang:"greek", world:3, track:"beginner",
    title:"αὐτός — He / She / It / Same",
    grammarNote:"Master the three uses of αὐτός: personal pronoun, intensive, and 'same'.",
    description:`αὐτός has THREE distinct uses depending on its position:\n\n1) PERSONAL PRONOUN (no article): αὐτόν εἶδον = 'I saw him'\n2) INTENSIVE (predicate position): αὐτὸς ὁ ἄνθρωπος = 'the man HIMSELF'\n3) SAME (attributive position): ὁ αὐτὸς ἄνθρωπος = 'the SAME man'\n\nThe difference between uses 2 and 3 is entirely in the placement relative to the article — an important and frequently tested distinction.`,
    videoUrl:"https://youtu.be/Fq8EhgttClo",
    xp:40,
    vocabulary:[
      {id:"gv-13-1",lang:"greek",lesson:13,script:"γεωργός",transliteration:"georgos",english:"farmer",type:"noun"},
      {id:"gv-13-2",lang:"greek",lesson:13,script:"σήμερον",transliteration:"semeron",english:"today",type:"adverb"},
      {id:"gv-13-3",lang:"greek",lesson:13,script:"αὔριον",transliteration:"aurion",english:"tomorrow",type:"adverb"},
      {id:"gv-13-4",lang:"greek",lesson:13,script:"ἐχθές",transliteration:"echthes",english:"yesterday",type:"adverb"},
      {id:"gv-13-5",lang:"greek",lesson:13,script:"ὅτε",transliteration:"hote",english:"when",type:"conjunction"}
    ],
    exercises:[
      {id:"g13-ex1",type:"multiple_choice",prompt:"αὐτόν is which form?",options:["Nominative Masculine","Accusative Masculine","Dative Masculine","Genitive Masculine"],answer:"Accusative Masculine"},
      {id:"g13-ex2",type:"multiple_choice",prompt:"ὁ αὐτὸς ἄνθρωπος means:",options:["The man himself","The same man","That man","This man"],answer:"The same man"},
      {id:"g13-ex3",type:"multiple_choice",prompt:"αὐτὸς ὁ ἄνθρωπος means:",options:["The man himself","The same man","That man","This man"],answer:"The man himself"},
      {id:"g13-ex4",type:"multiple_choice",prompt:"σήμερον means:",options:["Yesterday","Tomorrow","Today","Always"],answer:"Today"}
    ]
  },
  {
    id:"g14", lesson:14, lang:"greek", world:3, track:"beginner",
    title:"Deponent Verbs",
    grammarNote:"Recognise deponent verbs — passive/middle forms with active meanings.",
    description:`DEPONENT VERBS have MIDDLE/PASSIVE FORMS but ACTIVE MEANINGS. They have no active voice forms, yet they translate actively in English.\n\nKey deponents you must know:\nἔρχομαι — I come / I go\nγίνομαι — I become / I am\nδύναμαι — I am able / I can\nἀποκρίνομαι — I answer\nπορεύομαι — I go / I travel\n\nThese five appear thousands of times in the New Testament combined. Recognise them by their -ομαι ending in the dictionary form.`,
    videoUrl:"https://youtu.be/lesz6Yz9P2I",
    xp:40,
    vocabulary:[
      {id:"gv-14-1",lang:"greek",lesson:14,script:"ἔρχομαι",transliteration:"erchomai",english:"I come / I go",type:"verb"},
      {id:"gv-14-2",lang:"greek",lesson:14,script:"γίνομαι",transliteration:"ginomai",english:"I become / I am",type:"verb"},
      {id:"gv-14-3",lang:"greek",lesson:14,script:"δύναμαι",transliteration:"dynamai",english:"I am able / I can",type:"verb"},
      {id:"gv-14-4",lang:"greek",lesson:14,script:"ἀποκρίνομαι",transliteration:"apokrinomai",english:"I answer",type:"verb"},
      {id:"gv-14-5",lang:"greek",lesson:14,script:"πορεύομαι",transliteration:"poreuomai",english:"I go / I travel",type:"verb"}
    ],
    exercises:[
      {id:"g14-ex1",type:"multiple_choice",prompt:"A deponent verb has ___ forms but ___ meaning:",options:["Active forms, passive meaning","Passive/Middle forms, active meaning","Active forms, middle meaning","No forms at all"],answer:"Passive/Middle forms, active meaning"},
      {id:"g14-ex2",type:"multiple_choice",prompt:"The 3rd person singular of ἔρχομαι is:",options:["ἔρχομαι","ἔρχῃ","ἔρχεται","ἔρχονται"],answer:"ἔρχεται"},
      {id:"g14-ex3",type:"multiple_choice",prompt:"δύναμαι means:",options:["I go","I become","I answer","I am able / I can"],answer:"I am able / I can"},
      {id:"g14-ex4",type:"true_false",prompt:"Deponent verbs are listed in the dictionary with a -ομαι ending.",answer:true}
    ]
  },
  {
    id:"g15", lesson:15, lang:"greek", world:3, track:"beginner",
    title:"Interrogative & Indefinite Pronouns",
    grammarNote:"Distinguish τίς (who?/what?) from τις (someone/something) by their accent.",
    description:`τίς/τί (WITH accent) = WHO? / WHAT? (interrogative)\nτις/τι (WITHOUT accent or different accent) = SOMEONE / SOMETHING (indefinite)\n\nThe difference is entirely in the accent. This is a critical distinction:\n- τίς εἶ σύ; = 'Who are you?' (question)\n- εἶδόν τινα = 'I saw someone' (indefinite)\n\nOther important interrogative adverbs:\nποῦ = where? | ἐκεῖ = there | ὧδε = here`,
    videoUrl:"https://youtu.be/pARvCS10jbM",
    xp:40,
    vocabulary:[
      {id:"gv-15-1",lang:"greek",lesson:15,script:"τίς / τί",transliteration:"tis / ti",english:"who? / what? (interrogative)",type:"pronoun"},
      {id:"gv-15-2",lang:"greek",lesson:15,script:"τις / τι",transliteration:"tis / ti",english:"someone / something (indefinite)",type:"pronoun"},
      {id:"gv-15-3",lang:"greek",lesson:15,script:"ποῦ",transliteration:"pou",english:"where?",type:"adverb"},
      {id:"gv-15-4",lang:"greek",lesson:15,script:"ἐκεῖ",transliteration:"ekei",english:"there",type:"adverb"},
      {id:"gv-15-5",lang:"greek",lesson:15,script:"ὧδε",transliteration:"hode",english:"here",type:"adverb"}
    ],
    exercises:[
      {id:"g15-ex1",type:"multiple_choice",prompt:"τίς (with accent) means:",options:["Someone (indefinite)","Who? / What? (interrogative)","That (demonstrative)","He/She"],answer:"Who? / What? (interrogative)"},
      {id:"g15-ex2",type:"multiple_choice",prompt:"The accusative singular of τίς (masc/fem) is:",options:["τίνος","τίνι","τίνα","τίνες"],answer:"τίνα"},
      {id:"g15-ex3",type:"multiple_choice",prompt:"εἶδόν τινα means:",options:["I saw who?","I saw someone","I saw that","I saw him"],answer:"I saw someone"},
      {id:"g15-ex4",type:"multiple_choice",prompt:"ποῦ means:",options:["When?","How?","Where?","Why?"],answer:"Where?"}
    ]
  },
  {
    id:"g16", lesson:16, lang:"greek", world:4, track:"beginner",
    title:"Liquid Verbs — μένω, κρίνω, αἴρω",
    grammarNote:"Master the special future and aorist of liquid verbs — no σ, use contraction.",
    description:`LIQUID VERBS have stems ending in λ, μ, ν, or ρ. They behave differently in FUTURE and AORIST:\n\nFUTURE: Use -εσ- which contracts, dropping σ:\nμένω → μενῶ, μενεῖς, μενεῖ, μενοῦμεν, μενεῖτε, μενοῦσι\n\nAORIST: No σ suffix; instead LENGTHEN the stem vowel:\nκρίνω → ἔκρινα | αἴρω → ἦρα\n\nIMPERATIVES:\nμένε (sg), μένετε (pl) | κρῖνε (sg), κρίνετε (pl) | αἶρε (sg), αἴρετε (pl)`,
    videoUrl:"https://youtu.be/iOYSIhnRYBM",
    xp:45,
    vocabulary:[
      {id:"gv-16-1",lang:"greek",lesson:16,script:"μνημονεύω",transliteration:"mnemoneuo",english:"I remember",type:"verb"},
      {id:"gv-16-2",lang:"greek",lesson:16,script:"ὁμοῦ",transliteration:"homou",english:"together",type:"adverb"},
      {id:"gv-16-3",lang:"greek",lesson:16,script:"λίαν",transliteration:"lian",english:"very much / greatly",type:"adverb"},
      {id:"gv-16-4",lang:"greek",lesson:16,script:"φέρω",transliteration:"phero",english:"I carry / I bear",type:"verb"}
    ],
    exercises:[
      {id:"g16-ex1",type:"multiple_choice",prompt:"Liquid verbs form the future by:",options:["Adding -σ- before endings","Using -εσ- which contracts, dropping σ","Adding -κ- before endings","Doubling the first consonant"],answer:"Using -εσ- which contracts, dropping σ"},
      {id:"g16-ex2",type:"multiple_choice",prompt:"The future of μένω is:",options:["μένσω","μενῶ","ἔμεινα","μείνω"],answer:"μενῶ"},
      {id:"g16-ex3",type:"multiple_choice",prompt:"The Aorist of αἴρω is:",options:["ἤρσα","ἦρα","αἰρῶ","ᾖρα"],answer:"ἦρα"},
      {id:"g16-ex4",type:"multiple_choice",prompt:"What does μνημονεύω mean?",options:["I forget","I remember","I meditate","I know"],answer:"I remember"}
    ]
  },
  {
    id:"g17", lesson:17, lang:"greek", world:4, track:"beginner",
    title:"Perfect Tense",
    grammarNote:"The Perfect = completed action with ongoing results. Formed by reduplication + -κ-.",
    description:`The PERFECT TENSE describes a COMPLETED action in the past whose RESULTS still exist NOW.\n\nFORMATION:\n1. REDUPLICATION: Double the first consonant + add ε\n   πιστεύω → πε-πίστευ-κα\n2. PERFECT STEM: usually ends in -κ-\n3. PERFECT ENDINGS: -κα, -κας, -κε, -καμεν, -κατε, -κασι\n\nEXAMPLES:\nπεπίστευκα — I have believed (and still believe)\nἀκήκοα — I have heard (note the double reduplication)\nγέγραφα — I have written`,
    videoUrl:"https://youtu.be/2n0ISWtv7-8",
    xp:45,
    vocabulary:[
      {id:"gv-17-1",lang:"greek",lesson:17,script:"ἀπολύω",transliteration:"apoluo",english:"I release / dismiss",type:"verb"},
      {id:"gv-17-2",lang:"greek",lesson:17,script:"δουλεύω",transliteration:"douleuo",english:"I serve",type:"verb"},
      {id:"gv-17-3",lang:"greek",lesson:17,script:"θεραπεύω",transliteration:"therapeuo",english:"I heal",type:"verb"},
      {id:"gv-17-4",lang:"greek",lesson:17,script:"ἰσχύω",transliteration:"ischuo",english:"I am strong / able",type:"verb"},
      {id:"gv-17-5",lang:"greek",lesson:17,script:"ἀποστέλλω",transliteration:"apostello",english:"I send forth",type:"verb"}
    ],
    exercises:[
      {id:"g17-ex1",type:"multiple_choice",prompt:"The Greek Perfect tense expresses:",options:["A simple past action","A completed action with ongoing results","A future action","A repeated past action"],answer:"A completed action with ongoing results"},
      {id:"g17-ex2",type:"multiple_choice",prompt:"The Perfect of πιστεύω is:",options:["ἐπίστευσα","πιστεύσω","πεπίστευκα","ἐπιστεύθην"],answer:"πεπίστευκα"},
      {id:"g17-ex3",type:"multiple_choice",prompt:"How is reduplication formed?",options:["Add ε- to the beginning","Double the first consonant + add ε","Add -κ- before endings","Lengthen the stem vowel"],answer:"Double the first consonant + add ε"},
      {id:"g17-ex4",type:"multiple_choice",prompt:"θεραπεύω means:",options:["I teach","I heal","I serve","I send"],answer:"I heal"}
    ]
  },
  {
    id:"g18", lesson:18, lang:"greek", world:4, track:"beginner",
    title:"Verb Conjugation — Send, Lead, Hear",
    grammarNote:"Master the four principal parts of send, lead/carry, and hear verbs.",
    description:`PRINCIPAL PARTS — the key forms you must memorise:\n\nSEND:\nπέμπω | πέμψω | ἔπεμψα | πέπομφα\nἀπολύω | ἀπολύσω | ἀπέλυσα | ἀπολέλυκα\nἀποστέλλω | ἀποστελῶ | ἀπέστειλα | ἀπέσταλκα\n\nLEAD/CARRY:\nἄγω | ἄξω | ἤγαγον | ἦχα\nφέρω | οἴσω | ἤνεγκα | ἐνήνοχα (SUPPLETIVE — different stems)\n\nHEAR:\nἀκούω | ἀκούσω | ἤκουσα | ἀκήκοα`,
    videoUrl:"https://youtu.be/U8mldB4EHUE",
    xp:45,
    vocabulary:[
      {id:"gv-18-1",lang:"greek",lesson:18,script:"ὅτι",transliteration:"hoti",english:"that / because",type:"conjunction"},
      {id:"gv-18-2",lang:"greek",lesson:18,script:"ἀλλά",transliteration:"alla",english:"but",type:"conjunction"},
      {id:"gv-18-3",lang:"greek",lesson:18,script:"γάρ",transliteration:"gar",english:"for / because",type:"conjunction"},
      {id:"gv-18-4",lang:"greek",lesson:18,script:"ἑπτά",transliteration:"hepta",english:"seven",type:"numeral"}
    ],
    exercises:[
      {id:"g18-ex1",type:"multiple_choice",prompt:"The Aorist of ἄγω (I lead) is:",options:["ἦξα","ἤγαγον","ἦγον","ἄξω"],answer:"ἤγαγον"},
      {id:"g18-ex2",type:"multiple_choice",prompt:"φέρω uses _____ forms — different stems for different tenses:",options:["Regular","Suppletive","Deponent","Liquid"],answer:"Suppletive"},
      {id:"g18-ex3",type:"multiple_choice",prompt:"The Perfect of ἀκούω is:",options:["ἤκουσα","ἀκούσω","ἀκήκοα","ἠκούθην"],answer:"ἀκήκοα"},
      {id:"g18-ex4",type:"multiple_choice",prompt:"ὅτι means:",options:["When","Where","That / Because","But"],answer:"That / Because"}
    ]
  },
  {
    id:"g19", lesson:19, lang:"greek", world:4, track:"beginner",
    title:"Reading Greek — The Joseph Story",
    grammarNote:"Apply all learned grammar to read a connected Greek narrative.",
    description:`In this lesson we read a simplified version of the Joseph story using vocabulary from our course.\n\nKEY WORDS:\nἸωσήφ = Joseph | Ἰακώβ = Jacob | Ἰούδας = Judah\nΒενιαμίν = Benjamin | Ῥαχήλ = Rachel\nσῖτος = grain/wheat | κῆπος = garden | οἶνος = wine\nὀψάριον = fish | ποτήριον = cup | δεῖπνον = supper\nνεώτερος = younger | ἔτη = years | ἑπτά = seven\n\nGRAMMAR FOCUS: Notice how verbs agree with their subjects, and how word order can vary while meaning stays clear through case endings.`,
    videoUrl:"https://youtu.be/Yw6-ZTzE_5A",
    xp:45,
    vocabulary:[
      {id:"gv-19-1",lang:"greek",lesson:19,script:"σῖτος",transliteration:"sitos",english:"grain / wheat",type:"noun"},
      {id:"gv-19-2",lang:"greek",lesson:19,script:"κῆπος",transliteration:"kepos",english:"garden",type:"noun"},
      {id:"gv-19-3",lang:"greek",lesson:19,script:"οἶνος",transliteration:"oinos",english:"wine",type:"noun"},
      {id:"gv-19-4",lang:"greek",lesson:19,script:"ποτήριον",transliteration:"poterion",english:"cup",type:"noun"},
      {id:"gv-19-5",lang:"greek",lesson:19,script:"δεῖπνον",transliteration:"deipnon",english:"supper / dinner",type:"noun"},
      {id:"gv-19-6",lang:"greek",lesson:19,script:"ἀρνίον",transliteration:"arnion",english:"lamb",type:"noun"},
      {id:"gv-19-7",lang:"greek",lesson:19,script:"σπήλαιον",transliteration:"spelaion",english:"cave / den",type:"noun"}
    ],
    exercises:[
      {id:"g19-ex1",type:"multiple_choice",prompt:"What does σῖτος mean?",options:["Salt","Oil","Grain / Wheat","Water"],answer:"Grain / Wheat"},
      {id:"g19-ex2",type:"multiple_choice",prompt:"What does ποτήριον mean?",options:["Plate","Cup","Table","Bread"],answer:"Cup"},
      {id:"g19-ex3",type:"multiple_choice",prompt:"ἔτη means:",options:["Days","Months","Years","Hours"],answer:"Years"},
      {id:"g19-ex4",type:"multiple_choice",prompt:"What does δεῖπνον mean?",options:["Breakfast","Lunch","Supper / Dinner","Snack"],answer:"Supper / Dinner"}
    ]
  },
  {
    id:"g20", lesson:20, lang:"greek", world:4, track:"beginner",
    title:"Verb Analysis Practice",
    grammarNote:"Practice parsing all five properties of Greek verbs on real forms.",
    description:`COMPLETE VERB ANALYSIS — Practice these five forms:\n\nἠσθίετε:\n  Lexical: ἐσθίω | Imperfect Active Indicative | 2nd Plural\n  = "You (pl.) were eating"\n\nἐδουλεύσαμεν:\n  Lexical: δουλεύω | 1st Aorist Active Indicative | 1st Plural\n  = "We served"\n\nἤγαγον:\n  Lexical: ἄγω | 2nd Aorist Active Indicative | 3rd Plural or 1st Sg\n  = "They led" or "I led"\n\nλαμβάνειν:\n  Lexical: λαμβάνω | Present Active Infinitive\n  = "To take / to receive"\n\nεἶπον:\n  Lexical: λέγω | 2nd Aorist Active Indicative | 3rd Plural or 1st Sg\n  = "They said" or "I said"`,
    videoUrl:"https://youtu.be/YAPazT_NYE4",
    xp:50,
    vocabulary:[
      {id:"gv-20-1",lang:"greek",lesson:20,script:"διδάσκαλος",transliteration:"didaskalos",english:"teacher / Rabbi",type:"noun"},
      {id:"gv-20-2",lang:"greek",lesson:20,script:"συναγωγή",transliteration:"synagoge",english:"synagogue",type:"noun"},
      {id:"gv-20-3",lang:"greek",lesson:20,script:"ἀπέρχομαι",transliteration:"aperchomai",english:"I go away / depart",type:"verb"},
      {id:"gv-20-4",lang:"greek",lesson:20,script:"πάλαι",transliteration:"palai",english:"long ago / formerly",type:"adverb"},
      {id:"gv-20-5",lang:"greek",lesson:20,script:"ὁράω",transliteration:"horao",english:"I see",type:"verb"}
    ],
    exercises:[
      {id:"g20-ex1",type:"multiple_choice",prompt:"Parse ἐδουλεύσαμεν: What is the TENSE?",options:["Present","Imperfect","1st Aorist","Perfect"],answer:"1st Aorist"},
      {id:"g20-ex2",type:"multiple_choice",prompt:"λαμβάνειν is in which MOOD?",options:["Indicative","Imperative","Subjunctive","Infinitive"],answer:"Infinitive"},
      {id:"g20-ex3",type:"multiple_choice",prompt:"εἶπον is the 2nd Aorist of which verb?",options:["εἰμί","λέγω","ἄγω","ὁράω"],answer:"λέγω"},
      {id:"g20-ex4",type:"multiple_choice",prompt:"ὁράω means:",options:["I hear","I speak","I see","I know"],answer:"I see"}
    ]
  },
  {
    id:"g21", lesson:21, lang:"greek", world:5, track:"beginner",
    title:"Declension of Adjectives — Full Tables",
    grammarNote:"Decline δίκαιος across all genders, numbers, and cases.",
    description:`FULL DECLENSION OF δίκαιος (righteous/just):\n\nMASCULINE:\nNom: δίκαιος / δίκαιοι\nGen: δικαίου / δικαίων\nDat: δικαίῳ / δικαίοις\nAcc: δίκαιον / δικαίους\n\nFEMININE:\nNom: δικαία / δίκαιαι\nGen: δικαίας / δικαίων\nDat: δικαίᾳ / δικαίαις\nAcc: δικαίαν / δικαίας\n\nNEUTER:\nNom: δίκαιον / δίκαια\nGen: δικαίου / δικαίων\nDat: δικαίῳ / δικαίοις\nAcc: δίκαιον / δίκαια`,
    videoUrl:"https://youtu.be/Dowz5JcV8WI",
    xp:50,
    vocabulary:[
      {id:"gv-21-1",lang:"greek",lesson:21,script:"διά",transliteration:"dia",english:"through / because of",type:"preposition"},
      {id:"gv-21-2",lang:"greek",lesson:21,script:"ἐπιθυμία",transliteration:"epithumia",english:"desire / lust",type:"noun"},
      {id:"gv-21-3",lang:"greek",lesson:21,script:"συναγωγή",transliteration:"synagoge",english:"synagogue",type:"noun"},
      {id:"gv-21-4",lang:"greek",lesson:21,script:"πέμπω",transliteration:"pempo",english:"I send",type:"verb"},
      {id:"gv-21-5",lang:"greek",lesson:21,script:"φέρω",transliteration:"phero",english:"I carry / I bear",type:"verb"}
    ],
    exercises:[
      {id:"g21-ex1",type:"multiple_choice",prompt:"The MASCULINE ACCUSATIVE PLURAL of δίκαιος is:",options:["δίκαιοι","δίκαιον","δικαίους","δικαίοις"],answer:"δικαίους"},
      {id:"g21-ex2",type:"multiple_choice",prompt:"The FEMININE DATIVE SINGULAR of δίκαιος is:",options:["δικαίᾳ","δικαίας","δικαίαν","δίκαιαι"],answer:"δικαίᾳ"},
      {id:"g21-ex3",type:"multiple_choice",prompt:"The NEUTER NOMINATIVE PLURAL of δίκαιος is:",options:["δίκαια","δίκαιον","δικαίων","δίκαιοι"],answer:"δίκαια"},
      {id:"g21-ex4",type:"true_false",prompt:"The neuter nominative and accusative plural forms are identical.",answer:true}
    ]
  },
  {
    id:"g22", lesson:22, lang:"greek", world:5, track:"beginner",
    title:"Imperative Mood — Commands",
    grammarNote:"Form Present and Aorist imperatives — continuous vs. urgent commands.",
    description:`The IMPERATIVE MOOD gives COMMANDS.\n\nPRESENT ACTIVE IMPERATIVE of πιστεύω:\n2nd Sg: πίστευε | 3rd Sg: πιστευέτω\n2nd Pl: πιστεύετε | 3rd Pl: πιστευέτωσαν\n\nFIRST AORIST ACTIVE IMPERATIVE:\n2nd Sg: πίστευσον | 3rd Sg: πιστευσάτω\n2nd Pl: πιστεύσατε | 3rd Pl: πιστευσάτωσαν\n\nKEY DISTINCTION:\nPresent Imperative = CONTINUOUS command (keep doing it)\nAorist Imperative = SIMPLE/URGENT command (do it now, once)`,
    videoUrl:"https://youtu.be/UTFA4PlTQKs",
    xp:50,
    vocabulary:[
      {id:"gv-22-1",lang:"greek",lesson:22,script:"πίνω",transliteration:"pino",english:"I drink",type:"verb"},
      {id:"gv-22-2",lang:"greek",lesson:22,script:"πέμπω",transliteration:"pempo",english:"I send",type:"verb"},
      {id:"gv-22-3",lang:"greek",lesson:22,script:"ἄγε",transliteration:"age",english:"Come! / Lead! (imperative)",type:"verb"},
      {id:"gv-22-4",lang:"greek",lesson:22,script:"μένε",transliteration:"mene",english:"Stay! / Remain! (imperative)",type:"verb"},
      {id:"gv-22-5",lang:"greek",lesson:22,script:"χαῖρε",transliteration:"chaire",english:"Rejoice! / Greetings! (imperative)",type:"verb"}
    ],
    exercises:[
      {id:"g22-ex1",type:"multiple_choice",prompt:"The Present Imperative implies:",options:["A one-time urgent action","A continuous / ongoing command","A past action","A possibility"],answer:"A continuous / ongoing command"},
      {id:"g22-ex2",type:"multiple_choice",prompt:"2nd Person Plural Present Imperative of πιστεύω:",options:["πίστευε","πιστευέτω","πιστεύετε","πίστευσον"],answer:"πιστεύετε"},
      {id:"g22-ex3",type:"multiple_choice",prompt:"πίστευσον is the ___ Aorist ___ Singular Imperative:",options:["2nd Aorist / 2nd Person","1st Aorist / 2nd Person","Present / 3rd Person","Perfect / 2nd Person"],answer:"1st Aorist / 2nd Person"},
      {id:"g22-ex4",type:"multiple_choice",prompt:"χαῖρε means:",options:["Believe!","Remain!","Rejoice! / Greetings!","Go!"],answer:"Rejoice! / Greetings!"}
    ]
  },
  {
    id:"g23", lesson:23, lang:"greek", world:5, track:"beginner",
    title:"Vocabulary Mastery — 100 Essential Words",
    grammarNote:"Consolidate the most important Koine Greek vocabulary for New Testament reading.",
    description:`This lesson consolidates high-frequency vocabulary that appears thousands of times in the Greek New Testament.\n\nVERBS: εἰμί (I am) | ἔχω (I have) | λέγω (I say) | βλέπω (I see) | ἔρχομαι (I come) | ποιέω (I do/make) | ἀκούω (I hear) | πιστεύω (I believe) | ἀγαπάω (I love) | γινώσκω (I know) | ὁράω (I see) | λαμβάνω (I take)\n\nNOUNS: θεός | κύριος | Ἰησοῦς | Χριστός | ἄνθρωπος | υἱός | πνεῦμα | πατήρ | λόγος | ὁδός | ζωή | κόσμος\n\nPARTICLES: καί | δέ | ἀλλά | γάρ | ὅτι | εἰ | ἐάν | ἵνα | ὅτε | οὖν`,
    videoUrl:"https://youtu.be/TCxCXlGFGaU",
    xp:55,
    vocabulary:[
      {id:"gv-23-1",lang:"greek",lesson:23,script:"ἀγαπάω",transliteration:"agapao",english:"I love",type:"verb"},
      {id:"gv-23-2",lang:"greek",lesson:23,script:"γινώσκω",transliteration:"ginosko",english:"I know",type:"verb"},
      {id:"gv-23-3",lang:"greek",lesson:23,script:"ζωή",transliteration:"zoe",english:"life",type:"noun"},
      {id:"gv-23-4",lang:"greek",lesson:23,script:"λόγος",transliteration:"logos",english:"word",type:"noun"},
      {id:"gv-23-5",lang:"greek",lesson:23,script:"ὁδός",transliteration:"hodos",english:"way / road",type:"noun"}
    ],
    exercises:[
      {id:"g23-ex1",type:"multiple_choice",prompt:"ζωή means:",options:["Death","Life","Light","World"],answer:"Life"},
      {id:"g23-ex2",type:"multiple_choice",prompt:"λόγος means:",options:["Word","Work","Law","Love"],answer:"Word"},
      {id:"g23-ex3",type:"multiple_choice",prompt:"γινώσκω means:",options:["I believe","I hope","I know","I see"],answer:"I know"},
      {id:"g23-ex4",type:"multiple_choice",prompt:"ὁδός means:",options:["Truth","Life","Light","Way / Road"],answer:"Way / Road"}
    ]
  },
  {
    id:"g24", lesson:24, lang:"greek", world:5, track:"beginner",
    title:"Bringing It All Together — Reading Greek Texts",
    grammarNote:"Apply all learned grammar to analyse complete New Testament sentences.",
    description:`You have now learned:\n✓ The complete Greek alphabet (24 letters)\n✓ All 5 cases and their functions\n✓ All 3 genders and the definite article\n✓ 7 vowels, 8 diphthongs, 3 accent marks\n✓ Present, Future, Imperfect, Aorist, Perfect tenses\n✓ Active, Middle, and Passive voices\n✓ All key moods (Indicative, Imperative)\n✓ Regular, Liquid, Deponent, and Suppletive verbs\n✓ Adjective declension and agreement rules\n✓ Pronouns: Personal, Demonstrative, Interrogative, Indefinite\n✓ Key prepositions and their cases\n✓ 100+ essential vocabulary words\n\nFINAL CHALLENGE: Analyse complete sentences from the New Testament.`,
    videoUrl:"https://youtu.be/6sRVTHE6TJk",
    xp:60,
    vocabulary:[
      {id:"gv-24-1",lang:"greek",lesson:24,script:"ἀγάπη",transliteration:"agape",english:"love",type:"noun"},
      {id:"gv-24-2",lang:"greek",lesson:24,script:"πίστις",transliteration:"pistis",english:"faith / belief",type:"noun"},
      {id:"gv-24-3",lang:"greek",lesson:24,script:"χάρις",transliteration:"charis",english:"grace",type:"noun"},
      {id:"gv-24-4",lang:"greek",lesson:24,script:"εἰρήνη",transliteration:"eirene",english:"peace",type:"noun"},
      {id:"gv-24-5",lang:"greek",lesson:24,script:"δόξα",transliteration:"doxa",english:"glory",type:"noun"}
    ],
    exercises:[
      {id:"g24-ex1",type:"multiple_choice",prompt:"ἀγάπη means:",options:["Faith","Hope","Love","Grace"],answer:"Love"},
      {id:"g24-ex2",type:"multiple_choice",prompt:"χάρις means:",options:["Peace","Grace","Glory","Truth"],answer:"Grace"},
      {id:"g24-ex3",type:"multiple_choice",prompt:"How many tenses have you studied in this course?",options:["3","4","5","6 (incl. Perfect)"],answer:"6 (incl. Perfect)"},
      {id:"g24-ex4",type:"multiple_choice",prompt:"The Accusative case is used for:",options:["The subject","Possession","Indirect object","Direct object"],answer:"Direct object"}
    ]
  },
  {
    id:"g25", lesson:25, lang:"greek", world:5, track:"beginner",
    title:"Participles & Infinitives — Verbal Adjectives & Nouns",
    grammarNote:"Participles are verbal adjectives. Infinitives are verbal nouns. Both are extremely common.",
    description:`PARTICIPLES are VERBAL ADJECTIVES — they decline like adjectives but carry tense and voice.\n\nPresent Active Participle of πιστεύω:\nMasculine: πιστεύων | Feminine: πιστεύουσα | Neuter: πιστεῦον\n\nAorist Active Participle:\nMasculine: πιστεύσας | Feminine: πιστεύσασα | Neuter: πιστεῦσαν\n\nINFINITIVES are VERBAL NOUNS — they translate as "to…":\nPresent: πιστεύειν = "to believe" (ongoing)\nAorist: πιστεῦσαι = "to believe" (simple action)\nPerfect: πεπιστευκέναι = "to have believed"\n\nKEY USAGE: ὁ πιστεύων εἰς αὐτόν ἔχει ζωὴν αἰώνιον = "the one believing in him has eternal life"`,
    videoUrl:"",
    xp:65,
    vocabulary:[
      {id:"gv-25-1",lang:"greek",lesson:25,script:"πιστεύων",transliteration:"pisteuon",english:"the one believing / believer (participle)",type:"verb"},
      {id:"gv-25-2",lang:"greek",lesson:25,script:"λύων",transliteration:"luon",english:"loosing / releasing (present participle)",type:"verb"},
      {id:"gv-25-3",lang:"greek",lesson:25,script:"γράφω",transliteration:"grapho",english:"I write",type:"verb"},
      {id:"gv-25-4",lang:"greek",lesson:25,script:"σῴζω",transliteration:"sozo",english:"I save",type:"verb"},
      {id:"gv-25-5",lang:"greek",lesson:25,script:"πνεῦμα",transliteration:"pneuma",english:"spirit / wind / breath",type:"noun"}
    ],
    exercises:[
      {id:"g25-ex1",type:"multiple_choice",prompt:"A Greek participle functions primarily as a:",options:["verbal adjective","pure noun with no verbal force","preposition","main finite verb"],answer:"verbal adjective"},
      {id:"g25-ex2",type:"multiple_choice",prompt:"The Present Active Infinitive of πιστεύω is:",options:["πιστεύειν","πιστεῦσαι","πεπιστευκέναι","πιστεύων"],answer:"πιστεύειν"},
      {id:"g25-ex3",type:"multiple_choice",prompt:"ὁ πιστεύων most naturally means:",options:["the one who is believing / the believer","the one who will believe","the one who is believed (passive)","the same believer"],answer:"the one who is believing / the believer"},
      {id:"g25-ex4",type:"multiple_choice",prompt:"πνεῦμα means:",options:["spirit / wind / breath","word / message","truth","heart"],answer:"spirit / wind / breath"},
      {id:"g25-ex5",type:"true_false",prompt:"The Present participle describes ongoing action.",answer:true}
    ]
  }
];

// Keep the complete imported schema while supplying the richer fields used by
// the current bilingual lesson player.
GREEK_LESSONS.forEach((lesson) => {
  lesson.summary = lesson.description;
  lesson.objectives = [
    lesson.grammarNote,
    "Read the lesson forms aloud and connect them to their meanings.",
    "Complete the practice set before advancing to the next lesson."
  ];
  lesson.grammarNotes = [{
    rule: "Lesson focus",
    explanation: lesson.grammarNote,
    example: lesson.vocabulary[0]
      ? `${lesson.vocabulary[0].script} — ${lesson.vocabulary[0].english}`
      : lesson.title
  }];
  lesson.examples = lesson.vocabulary.slice(0, 3).map((word) => ({
    script: word.script,
    transliteration: word.transliteration,
    english: word.english
  }));
});

window.GREEK_LESSONS = GREEK_LESSONS;
export { GREEK_LESSONS };
