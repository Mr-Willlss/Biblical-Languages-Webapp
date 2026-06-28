// data/greek-quests.js

const GREEK_QUESTS = [
  {
    id:"gq-daily-vocab", lang:"greek", category:"Daily",
    title:"Daily Vocabulary", icon:"📚",
    description:"Match 10 Greek words to their English meanings.",
    xpReward:30, badgeReward:null, requiredLesson:4, oneTimeXP:false,
    questions:[
      {type:"multiple_choice",prompt:"What does θεός mean?",options:["Angel","Lord","God","Son"],answer:"God"},
      {type:"multiple_choice",prompt:"What does ἀλήθεια mean?",options:["Love","Truth","World","Heart"],answer:"Truth"},
      {type:"multiple_choice",prompt:"What does κόσμος mean?",options:["Heart","God","World","Son"],answer:"World"},
      {type:"multiple_choice",prompt:"What does ζωή mean?",options:["Death","Life","Light","World"],answer:"Life"},
      {type:"multiple_choice",prompt:"What does λόγος mean?",options:["Word","Work","Law","Love"],answer:"Word"},
      {type:"multiple_choice",prompt:"What does εἰρήνη mean?",options:["War","Peace","Grace","Truth"],answer:"Peace"},
      {type:"multiple_choice",prompt:"What does ἀγάπη mean?",options:["Faith","Hope","Love","Grace"],answer:"Love"},
      {type:"multiple_choice",prompt:"What does χάρις mean?",options:["Peace","Grace","Glory","Truth"],answer:"Grace"},
      {type:"multiple_choice",prompt:"What does δόξα mean?",options:["Peace","Grace","Glory","Power"],answer:"Glory"},
      {type:"multiple_choice",prompt:"What does πίστις mean?",options:["Hope","Love","Faith","Grace"],answer:"Faith"}
    ]
  },
  {
    id:"gq-daily-alphabet", lang:"greek", category:"Daily",
    title:"Daily Alphabet", icon:"🔤",
    description:"Identify Greek letters by name and sound.",
    xpReward:30, badgeReward:null, requiredLesson:2, oneTimeXP:false,
    questions:[
      {type:"multiple_choice",prompt:"What is the name of: Γ",options:["Alpha","Gamma","Delta","Beta"],answer:"Gamma"},
      {type:"multiple_choice",prompt:"What is the name of: Θ",options:["Tau","Phi","Theta","Chi"],answer:"Theta"},
      {type:"multiple_choice",prompt:"What is the name of: Ψ",options:["Phi","Xi","Psi","Chi"],answer:"Psi"},
      {type:"multiple_choice",prompt:"Which letter makes the 'ps' sound?",options:["Ξ ξ","Φ φ","Ψ ψ","Χ χ"],answer:"Ψ ψ"},
      {type:"multiple_choice",prompt:"Which letter is ALWAYS a long 'ō'?",options:["Ο ο (Omicron)","Ω ω (Omega)","Η η (Eta)","Υ υ (Upsilon)"],answer:"Ω ω (Omega)"},
      {type:"multiple_choice",prompt:"Sigma at the END of a word is written as:",options:["σ","ς","Σ","Both are fine"],answer:"ς"},
      {type:"multiple_choice",prompt:"Which letter is transliterated 'th'?",options:["Τ τ","Θ θ","Φ φ","Χ χ"],answer:"Θ θ"},
      {type:"multiple_choice",prompt:"How many letters in the Greek alphabet?",options:["22","24","26","28"],answer:"24"}
    ]
  },
  {
    id:"gq-lesson-alphabet-master", lang:"greek", category:"Lesson",
    title:"Alphabet Master", icon:"⚔️",
    description:"Name and identify all 24 Greek letters.",
    xpReward:150, badgeReward:"gk_alphabet_master", requiredLesson:2, oneTimeXP:true,
    questions:[
      {type:"multiple_choice",prompt:"Name this letter: Α",options:["Alpha","Eta","Epsilon","Iota"],answer:"Alpha"},
      {type:"multiple_choice",prompt:"Name this letter: Β",options:["Pi","Beta","Rho","Mu"],answer:"Beta"},
      {type:"multiple_choice",prompt:"Name this letter: Δ",options:["Rho","Dalet","Delta","Lambda"],answer:"Delta"},
      {type:"multiple_choice",prompt:"Name this letter: Ζ",options:["Zeta","Xi","Nu","Eta"],answer:"Zeta"},
      {type:"multiple_choice",prompt:"Name this letter: Λ",options:["Lambda","Mu","Nu","Kappa"],answer:"Lambda"},
      {type:"multiple_choice",prompt:"Name this letter: Ξ",options:["Xi","Nu","Mu","Pi"],answer:"Xi"},
      {type:"multiple_choice",prompt:"Name this letter: Ρ",options:["Pi","Rho","Sigma","Tau"],answer:"Rho"},
      {type:"multiple_choice",prompt:"Name this letter: Ψ",options:["Chi","Phi","Psi","Omega"],answer:"Psi"},
      {type:"multiple_choice",prompt:"Name this letter: Ω",options:["Omicron","Omega","Upsilon","Sigma"],answer:"Omega"},
      {type:"multiple_choice",prompt:"Omega is always:",options:["Short 'o'","Long 'ō'","Sometimes short","The same as Omicron"],answer:"Long 'ō'"},
      {type:"true_false",prompt:"The Greek alphabet has 24 letters.",answer:true},
      {type:"true_false",prompt:"Sigma has only one lowercase form.",answer:false},
      {type:"multiple_choice",prompt:"The diphthong ου sounds like:",options:["oil","aisle","food","feud"],answer:"food"},
      {type:"multiple_choice",prompt:"Which accent appears ONLY on long syllables?",options:["Acute","Grave","Circumflex","All three"],answer:"Circumflex"},
      {type:"multiple_choice",prompt:"How many vowels does Greek have?",options:["5","6","7","8"],answer:"7"}
    ]
  },
  {
    id:"gq-lesson-verb-master", lang:"greek", category:"Lesson",
    title:"Verb Master", icon:"✍️",
    description:"Conjugate and parse Greek verbs across present, aorist, and perfect tenses.",
    xpReward:200, badgeReward:null, requiredLesson:9, oneTimeXP:true,
    questions:[
      {type:"multiple_choice",prompt:"What is the 3rd person plural of πιστεύω?",options:["πιστεύει","πιστεύομεν","πιστεύουσι","πιστεύετε"],answer:"πιστεύουσι"},
      {type:"multiple_choice",prompt:"The First Aorist of πιστεύω is:",options:["πιστεύσω","ἐπίστευσα","πεπίστευκα","πιστεύσεις"],answer:"ἐπίστευσα"},
      {type:"multiple_choice",prompt:"The Perfect of πιστεύω is:",options:["ἐπίστευσα","πιστεύσω","πεπίστευκα","πιστευθήσομαι"],answer:"πεπίστευκα"},
      {type:"multiple_choice",prompt:"The Future of μένω (a liquid verb) is:",options:["μένσω","μενῶ","ἔμεινα","μενήσω"],answer:"μενῶ"},
      {type:"multiple_choice",prompt:"Parse ἐδουλεύσαμεν: What is the tense?",options:["Present","Imperfect","1st Aorist","Perfect"],answer:"1st Aorist"},
      {type:"multiple_choice",prompt:"Parse λαμβάνειν: What is the mood?",options:["Indicative","Imperative","Subjunctive","Infinitive"],answer:"Infinitive"},
      {type:"multiple_choice",prompt:"εἶπον is the 2nd Aorist of:",options:["εἰμί","λέγω","ἄγω","ὁράω"],answer:"λέγω"},
      {type:"multiple_choice",prompt:"The Aorist of ἄγω is:",options:["ἦξα","ἤγαγον","ἦγον","ἄξω"],answer:"ἤγαγον"},
      {type:"multiple_choice",prompt:"The Perfect of ἀκούω is:",options:["ἤκουσα","ἀκούσω","ἀκήκοα","ἠκούθην"],answer:"ἀκήκοα"},
      {type:"true_false",prompt:"Liquid verbs add σ to form their future tense.",answer:false},
      {type:"multiple_choice",prompt:"How is reduplication formed in the Perfect?",options:["Add ε- to the beginning","Double the first consonant + add ε","Add -κ-","Lengthen the stem vowel"],answer:"Double the first consonant + add ε"},
      {type:"multiple_choice",prompt:"A deponent verb has ___ forms but ___ meaning:",options:["Active, passive","Passive/Middle, active","All forms, no meaning","Middle, future"],answer:"Passive/Middle, active"}
    ]
  },
  {
    id:"gq-mastery-beginner-exam", lang:"greek", category:"Mastery",
    title:"Koine Greek Beginner Exam", icon:"🌟",
    description:"25-question comprehensive exam covering all beginner lessons.",
    xpReward:500, badgeReward:"gk_initiate", requiredLesson:25, oneTimeXP:true,
    questions:[
      {type:"multiple_choice",prompt:"How many letters in the Greek alphabet?",options:["22","24","26","28"],answer:"24"},
      {type:"multiple_choice",prompt:"Omega is always:",options:["Short 'o'","Long 'ō'","Either","Same as Omicron"],answer:"Long 'ō'"},
      {type:"multiple_choice",prompt:"The diphthong ου sounds like:",options:["oil","aisle","food","feud"],answer:"food"},
      {type:"multiple_choice",prompt:"Greek has how many cases?",options:["3","4","5","6"],answer:"5"},
      {type:"multiple_choice",prompt:"The Genitive case shows:",options:["The subject","Possession","The direct object","Indirect object"],answer:"Possession"},
      {type:"multiple_choice",prompt:"Greek has how many genders?",options:["2","3","4","1"],answer:"3"},
      {type:"multiple_choice",prompt:"ἡ is the article for which gender?",options:["Masculine","Feminine","Neuter","All"],answer:"Feminine"},
      {type:"multiple_choice",prompt:"The Present Active 1st plural ending is:",options:["-εις","-ει","-ομεν","-ετε"],answer:"-ομεν"},
      {type:"multiple_choice",prompt:"The Aorist is formed by adding:",options:["σ to future","ε- augment + σα","κ- + perfect endings","Doubling first consonant"],answer:"ε- augment + σα"},
      {type:"multiple_choice",prompt:"What does εἰμί mean?",options:["I see","I am","I have","I believe"],answer:"I am"},
      {type:"multiple_choice",prompt:"What does θεός mean?",options:["Angel","Lord","God","Son"],answer:"God"},
      {type:"multiple_choice",prompt:"What does ἀλήθεια mean?",options:["Love","Truth","World","Heart"],answer:"Truth"},
      {type:"multiple_choice",prompt:"The preposition εἰς takes:",options:["Genitive","Dative","Accusative","Nominative"],answer:"Accusative"},
      {type:"multiple_choice",prompt:"What does ζωή mean?",options:["Death","Life","Light","World"],answer:"Life"},
      {type:"multiple_choice",prompt:"A deponent verb has:",options:["Active forms, passive meaning","Passive/Middle forms, active meaning","No forms","Middle forms only"],answer:"Passive/Middle forms, active meaning"},
      {type:"multiple_choice",prompt:"The Perfect tense describes:",options:["A future action","A completed action with ongoing results","A simple past action","An ongoing present action"],answer:"A completed action with ongoing results"},
      {type:"multiple_choice",prompt:"Reduplication involves:",options:["Adding ε- to the beginning","Doubling the first consonant + ε","Adding -κ-","Lengthening stem vowel"],answer:"Doubling the first consonant + ε"},
      {type:"multiple_choice",prompt:"What does λόγος mean?",options:["Word","Work","Law","Love"],answer:"Word"},
      {type:"multiple_choice",prompt:"What does χάρις mean?",options:["Peace","Grace","Glory","Truth"],answer:"Grace"},
      {type:"multiple_choice",prompt:"The Accusative case marks:",options:["The subject","Possession","The indirect object","The direct object"],answer:"The direct object"},
      {type:"multiple_choice",prompt:"ὁ αὐτὸς ἄνθρωπος means:",options:["The man himself","The same man","That man","This man"],answer:"The same man"},
      {type:"multiple_choice",prompt:"What does πνεῦμα mean?",options:["Spirit / wind / breath","Word","Truth","Heart"],answer:"Spirit / wind / breath"},
      {type:"multiple_choice",prompt:"A participle is a verbal:",options:["Noun","Adjective","Pronoun","Preposition"],answer:"Adjective"},
      {type:"multiple_choice",prompt:"The Present Active Infinitive of πιστεύω is:",options:["πιστεύειν","πιστεῦσαι","πεπιστευκέναι","πιστεύων"],answer:"πιστεύειν"},
      {type:"true_false",prompt:"In Greek, word order (not case endings) shows the subject.",answer:false}
    ]
  },
  {
    id:"gq-special-john1", lang:"greek", category:"Special",
    title:"John 1:1–5 Challenge", icon:"✨",
    description:"Translate and analyse key words in John 1:1–5 in Greek.",
    xpReward:600, badgeReward:"gk_scripture_reader", requiredLesson:25, oneTimeXP:true,
    questions:[
      {type:"multiple_choice",prompt:"John 1:1 begins: Ἐν ἀρχῇ ἦν ὁ λόγος. λόγος means:",options:["Light","Life","Word","Truth"],answer:"Word"},
      {type:"multiple_choice",prompt:"In John 1:1, ἦν is the Imperfect of εἰμί. It means:",options:["He was","He will be","He became","He is"],answer:"He was"},
      {type:"multiple_choice",prompt:"John 1:4: ἐν αὐτῷ ζωὴ ἦν. ζωή means:",options:["Death","Life","Light","World"],answer:"Life"},
      {type:"multiple_choice",prompt:"John 1:5: σκοτία means:",options:["Light","Life","Darkness","World"],answer:"Darkness"},
      {type:"multiple_choice",prompt:"John 1:1: καὶ θεὸς ἦν ὁ λόγος means:",options:["And the word was God","And God was a word","And God created the word","And the word became God"],answer:"And the word was God"},
      {type:"multiple_choice",prompt:"ἐν τῇ ἀρχῇ: what case is ἀρχῇ?",options:["Nominative","Genitive","Dative","Accusative"],answer:"Dative"},
      {type:"multiple_choice",prompt:"John 1:4: τὸ φῶς means:",options:["The life","The word","The way","The light"],answer:"The light"},
      {type:"true_false",prompt:"John 1:1 begins with 'Ἐν ἀρχῇ' which echoes Genesis 1:1 in the Greek Old Testament.",answer:true},
      {type:"multiple_choice",prompt:"The article ὁ with λόγος in John 1:1 indicates λόγος is:",options:["Feminine","Neuter","Masculine","No gender"],answer:"Masculine"},
      {type:"multiple_choice",prompt:"John 3:16 says: θεὸς ἠγάπησεν τὸν κόσμον. ἠγάπησεν is:",options:["Present","1st Aorist","Perfect","Imperfect"],answer:"1st Aorist"}
    ]
  }
];

window.GREEK_QUESTS = GREEK_QUESTS;
export { GREEK_QUESTS };
