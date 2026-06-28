// data/greek-vocab.js
// Flat vocabulary list extracted from all 25 Greek lessons

const GREEK_VOCAB = [
  // --- Lesson 1 ---
  {id:"gv-1-1",lang:"greek",lesson:1,script:"ἀδελφός",transliteration:"adelphos",english:"brother",type:"noun"},
  {id:"gv-1-2",lang:"greek",lesson:1,script:"ἄνθρωπος",transliteration:"anthropos",english:"man / human being",type:"noun"},
  {id:"gv-1-3",lang:"greek",lesson:1,script:"βλέπω",transliteration:"blepo",english:"I see / I look",type:"verb"},
  // --- Lesson 2 ---
  {id:"gv-2-1",lang:"greek",lesson:2,script:"ἔχω",transliteration:"echo",english:"I have",type:"verb"},
  {id:"gv-2-2",lang:"greek",lesson:2,script:"καί",transliteration:"kai",english:"and / also / even",type:"conjunction"},
  {id:"gv-2-3",lang:"greek",lesson:2,script:"λέγω",transliteration:"lego",english:"I say / I speak",type:"verb"},
  {id:"gv-2-4",lang:"greek",lesson:2,script:"χαῖρε",transliteration:"chaire",english:"rejoice / greetings",type:"verb"},
  // --- Lesson 3 ---
  {id:"gv-3-1",lang:"greek",lesson:3,script:"ἄρτος",transliteration:"artos",english:"bread",type:"noun"},
  {id:"gv-3-2",lang:"greek",lesson:3,script:"ἐσθίω",transliteration:"esthio",english:"I eat",type:"verb"},
  {id:"gv-3-3",lang:"greek",lesson:3,script:"καρπός",transliteration:"karpos",english:"fruit",type:"noun"},
  {id:"gv-3-4",lang:"greek",lesson:3,script:"πιστεύω",transliteration:"pisteuo",english:"I believe",type:"verb"},
  // --- Lesson 4 ---
  {id:"gv-4-1",lang:"greek",lesson:4,script:"δοῦλος",transliteration:"doulos",english:"slave / servant",type:"noun"},
  {id:"gv-4-2",lang:"greek",lesson:4,script:"κόσμος",transliteration:"kosmos",english:"world",type:"noun"},
  {id:"gv-4-3",lang:"greek",lesson:4,script:"θεός",transliteration:"theos",english:"God",type:"noun"},
  {id:"gv-4-4",lang:"greek",lesson:4,script:"υἱός",transliteration:"huios",english:"son",type:"noun"},
  {id:"gv-4-5",lang:"greek",lesson:4,script:"καρδία",transliteration:"kardia",english:"heart",type:"noun"},
  {id:"gv-4-6",lang:"greek",lesson:4,script:"ἀλήθεια",transliteration:"aletheia",english:"truth",type:"noun"},
  {id:"gv-4-7",lang:"greek",lesson:4,script:"ἄγγελος",transliteration:"angelos",english:"angel / messenger",type:"noun"},
  // --- Lesson 5 ---
  {id:"gv-5-1",lang:"greek",lesson:5,script:"ἐλεύθερος",transliteration:"eleutheros",english:"free",type:"adjective"},
  {id:"gv-5-2",lang:"greek",lesson:5,script:"καλός",transliteration:"kalos",english:"good / beautiful",type:"adjective"},
  {id:"gv-5-3",lang:"greek",lesson:5,script:"δίκαιος",transliteration:"dikaios",english:"righteous / just",type:"adjective"},
  {id:"gv-5-4",lang:"greek",lesson:5,script:"μακάριος",transliteration:"makarios",english:"blessed / happy",type:"adjective"},
  {id:"gv-5-5",lang:"greek",lesson:5,script:"κακός",transliteration:"kakos",english:"bad / evil",type:"adjective"},
  // --- Lesson 6 ---
  {id:"gv-6-1",lang:"greek",lesson:6,script:"φόβος",transliteration:"phobos",english:"fear",type:"noun"},
  {id:"gv-6-2",lang:"greek",lesson:6,script:"εἰμί",transliteration:"eimi",english:"I am",type:"verb"},
  {id:"gv-6-3",lang:"greek",lesson:6,script:"ἐλπίζω",transliteration:"elpizo",english:"I hope",type:"verb"},
  {id:"gv-6-4",lang:"greek",lesson:6,script:"θέλω",transliteration:"thelo",english:"I wish / I want",type:"verb"},
  {id:"gv-6-5",lang:"greek",lesson:6,script:"ἀκούω",transliteration:"akouo",english:"I hear",type:"verb"},
  // --- Lesson 7 ---
  {id:"gv-7-1",lang:"greek",lesson:7,script:"τέκνον",transliteration:"teknon",english:"child",type:"noun"},
  {id:"gv-7-2",lang:"greek",lesson:7,script:"οἶκος",transliteration:"oikos",english:"house",type:"noun"},
  {id:"gv-7-3",lang:"greek",lesson:7,script:"γλῶσσα",transliteration:"glossa",english:"tongue / language",type:"noun"},
  {id:"gv-7-4",lang:"greek",lesson:7,script:"κώμη",transliteration:"kome",english:"village",type:"noun"},
  {id:"gv-7-5",lang:"greek",lesson:7,script:"σκοτία",transliteration:"skotia",english:"darkness",type:"noun"},
  // --- Lesson 8 ---
  {id:"gv-8-1",lang:"greek",lesson:8,script:"ἀπό",transliteration:"apo",english:"from / away from",type:"preposition"},
  {id:"gv-8-2",lang:"greek",lesson:8,script:"εἰς",transliteration:"eis",english:"into / to",type:"preposition"},
  {id:"gv-8-3",lang:"greek",lesson:8,script:"ἐκ",transliteration:"ek",english:"out of / from",type:"preposition"},
  {id:"gv-8-4",lang:"greek",lesson:8,script:"ἐν",transliteration:"en",english:"in / among",type:"preposition"},
  {id:"gv-8-5",lang:"greek",lesson:8,script:"σύν",transliteration:"syn",english:"with",type:"preposition"},
  {id:"gv-8-6",lang:"greek",lesson:8,script:"διά",transliteration:"dia",english:"through / because of",type:"preposition"},
  {id:"gv-8-7",lang:"greek",lesson:8,script:"μετά",transliteration:"meta",english:"with / after",type:"preposition"},
  {id:"gv-8-8",lang:"greek",lesson:8,script:"περί",transliteration:"peri",english:"about / concerning",type:"preposition"},
  // --- Lesson 9 ---
  {id:"gv-9-1",lang:"greek",lesson:9,script:"μένω",transliteration:"meno",english:"I remain / I stay",type:"verb"},
  {id:"gv-9-2",lang:"greek",lesson:9,script:"κρίνω",transliteration:"krino",english:"I judge",type:"verb"},
  {id:"gv-9-3",lang:"greek",lesson:9,script:"αἴρω",transliteration:"airo",english:"I take up / I raise",type:"verb"},
  {id:"gv-9-4",lang:"greek",lesson:9,script:"πέμπω",transliteration:"pempo",english:"I send",type:"verb"},
  {id:"gv-9-5",lang:"greek",lesson:9,script:"ἄγω",transliteration:"ago",english:"I lead / I bring",type:"verb"},
  // --- Lesson 10 ---
  {id:"gv-10-1",lang:"greek",lesson:10,script:"διδάσκω",transliteration:"didasko",english:"I teach",type:"verb"},
  {id:"gv-10-2",lang:"greek",lesson:10,script:"μανθάνω",transliteration:"manthano",english:"I learn",type:"verb"},
  {id:"gv-10-3",lang:"greek",lesson:10,script:"λαμβάνω",transliteration:"lambano",english:"I take / I receive",type:"verb"},
  {id:"gv-10-4",lang:"greek",lesson:10,script:"ἀποθνήσκω",transliteration:"apothnesko",english:"I die",type:"verb"},
  {id:"gv-10-5",lang:"greek",lesson:10,script:"συνάγω",transliteration:"sunago",english:"I gather together",type:"verb"},
  // --- Lesson 11 ---
  {id:"gv-11-1",lang:"greek",lesson:11,script:"μικρός",transliteration:"mikros",english:"small / little",type:"adjective"},
  {id:"gv-11-2",lang:"greek",lesson:11,script:"ἴδιος",transliteration:"idios",english:"one's own",type:"adjective"},
  {id:"gv-11-3",lang:"greek",lesson:11,script:"νεώτερος",transliteration:"neoteros",english:"younger",type:"adjective"},
  {id:"gv-11-4",lang:"greek",lesson:11,script:"πλοῦτος",transliteration:"ploutos",english:"wealth / riches",type:"noun"},
  {id:"gv-11-5",lang:"greek",lesson:11,script:"χρεία",transliteration:"chreia",english:"need / necessity",type:"noun"},
  // --- Lesson 12 ---
  {id:"gv-12-1",lang:"greek",lesson:12,script:"νῦν",transliteration:"nyn",english:"now",type:"adverb"},
  {id:"gv-12-2",lang:"greek",lesson:12,script:"πάντοτε",transliteration:"pantote",english:"always",type:"adverb"},
  {id:"gv-12-3",lang:"greek",lesson:12,script:"οὐκέτι",transliteration:"ouketi",english:"no longer",type:"adverb"},
  {id:"gv-12-4",lang:"greek",lesson:12,script:"πάλιν",transliteration:"palin",english:"again",type:"adverb"},
  {id:"gv-12-5",lang:"greek",lesson:12,script:"τότε",transliteration:"tote",english:"then",type:"adverb"},
  // --- Lesson 13 ---
  {id:"gv-13-1",lang:"greek",lesson:13,script:"γεωργός",transliteration:"georgos",english:"farmer",type:"noun"},
  {id:"gv-13-2",lang:"greek",lesson:13,script:"σήμερον",transliteration:"semeron",english:"today",type:"adverb"},
  {id:"gv-13-3",lang:"greek",lesson:13,script:"αὔριον",transliteration:"aurion",english:"tomorrow",type:"adverb"},
  {id:"gv-13-4",lang:"greek",lesson:13,script:"ἐχθές",transliteration:"echthes",english:"yesterday",type:"adverb"},
  {id:"gv-13-5",lang:"greek",lesson:13,script:"ὅτε",transliteration:"hote",english:"when",type:"conjunction"},
  // --- Lesson 14 ---
  {id:"gv-14-1",lang:"greek",lesson:14,script:"ἔρχομαι",transliteration:"erchomai",english:"I come / I go",type:"verb"},
  {id:"gv-14-2",lang:"greek",lesson:14,script:"γίνομαι",transliteration:"ginomai",english:"I become / I am",type:"verb"},
  {id:"gv-14-3",lang:"greek",lesson:14,script:"δύναμαι",transliteration:"dynamai",english:"I am able / I can",type:"verb"},
  {id:"gv-14-4",lang:"greek",lesson:14,script:"ἀποκρίνομαι",transliteration:"apokrinomai",english:"I answer",type:"verb"},
  {id:"gv-14-5",lang:"greek",lesson:14,script:"πορεύομαι",transliteration:"poreuomai",english:"I go / I travel",type:"verb"},
  // --- Lesson 15 ---
  {id:"gv-15-1",lang:"greek",lesson:15,script:"τίς / τί",transliteration:"tis / ti",english:"who? / what? (interrogative)",type:"pronoun"},
  {id:"gv-15-2",lang:"greek",lesson:15,script:"τις / τι",transliteration:"tis / ti",english:"someone / something (indefinite)",type:"pronoun"},
  {id:"gv-15-3",lang:"greek",lesson:15,script:"ποῦ",transliteration:"pou",english:"where?",type:"adverb"},
  {id:"gv-15-4",lang:"greek",lesson:15,script:"ἐκεῖ",transliteration:"ekei",english:"there",type:"adverb"},
  {id:"gv-15-5",lang:"greek",lesson:15,script:"ὧδε",transliteration:"hode",english:"here",type:"adverb"},
  // --- Lesson 16 ---
  {id:"gv-16-1",lang:"greek",lesson:16,script:"μνημονεύω",transliteration:"mnemoneuo",english:"I remember",type:"verb"},
  {id:"gv-16-2",lang:"greek",lesson:16,script:"ὁμοῦ",transliteration:"homou",english:"together",type:"adverb"},
  {id:"gv-16-3",lang:"greek",lesson:16,script:"λίαν",transliteration:"lian",english:"very much / greatly",type:"adverb"},
  {id:"gv-16-4",lang:"greek",lesson:16,script:"φέρω",transliteration:"phero",english:"I carry / I bear",type:"verb"},
  // --- Lesson 17 ---
  {id:"gv-17-1",lang:"greek",lesson:17,script:"ἀπολύω",transliteration:"apoluo",english:"I release / dismiss",type:"verb"},
  {id:"gv-17-2",lang:"greek",lesson:17,script:"δουλεύω",transliteration:"douleuo",english:"I serve",type:"verb"},
  {id:"gv-17-3",lang:"greek",lesson:17,script:"θεραπεύω",transliteration:"therapeuo",english:"I heal",type:"verb"},
  {id:"gv-17-4",lang:"greek",lesson:17,script:"ἰσχύω",transliteration:"ischuo",english:"I am strong / able",type:"verb"},
  {id:"gv-17-5",lang:"greek",lesson:17,script:"ἀποστέλλω",transliteration:"apostello",english:"I send forth",type:"verb"},
  // --- Lesson 18 ---
  {id:"gv-18-1",lang:"greek",lesson:18,script:"ὅτι",transliteration:"hoti",english:"that / because",type:"conjunction"},
  {id:"gv-18-2",lang:"greek",lesson:18,script:"ἀλλά",transliteration:"alla",english:"but",type:"conjunction"},
  {id:"gv-18-3",lang:"greek",lesson:18,script:"γάρ",transliteration:"gar",english:"for / because",type:"conjunction"},
  {id:"gv-18-4",lang:"greek",lesson:18,script:"ἑπτά",transliteration:"hepta",english:"seven",type:"numeral"},
  // --- Lesson 19 ---
  {id:"gv-19-1",lang:"greek",lesson:19,script:"σῖτος",transliteration:"sitos",english:"grain / wheat",type:"noun"},
  {id:"gv-19-2",lang:"greek",lesson:19,script:"κῆπος",transliteration:"kepos",english:"garden",type:"noun"},
  {id:"gv-19-3",lang:"greek",lesson:19,script:"οἶνος",transliteration:"oinos",english:"wine",type:"noun"},
  {id:"gv-19-4",lang:"greek",lesson:19,script:"ποτήριον",transliteration:"poterion",english:"cup",type:"noun"},
  {id:"gv-19-5",lang:"greek",lesson:19,script:"δεῖπνον",transliteration:"deipnon",english:"supper / dinner",type:"noun"},
  {id:"gv-19-6",lang:"greek",lesson:19,script:"ἀρνίον",transliteration:"arnion",english:"lamb",type:"noun"},
  {id:"gv-19-7",lang:"greek",lesson:19,script:"σπήλαιον",transliteration:"spelaion",english:"cave / den",type:"noun"},
  // --- Lesson 20 ---
  {id:"gv-20-1",lang:"greek",lesson:20,script:"διδάσκαλος",transliteration:"didaskalos",english:"teacher / Rabbi",type:"noun"},
  {id:"gv-20-2",lang:"greek",lesson:20,script:"συναγωγή",transliteration:"synagoge",english:"synagogue",type:"noun"},
  {id:"gv-20-3",lang:"greek",lesson:20,script:"ἀπέρχομαι",transliteration:"aperchomai",english:"I go away / depart",type:"verb"},
  {id:"gv-20-4",lang:"greek",lesson:20,script:"πάλαι",transliteration:"palai",english:"long ago / formerly",type:"adverb"},
  {id:"gv-20-5",lang:"greek",lesson:20,script:"ὁράω",transliteration:"horao",english:"I see",type:"verb"},
  // --- Lesson 21 ---
  {id:"gv-21-1",lang:"greek",lesson:21,script:"διά",transliteration:"dia",english:"through / because of",type:"preposition"},
  {id:"gv-21-2",lang:"greek",lesson:21,script:"ἐπιθυμία",transliteration:"epithumia",english:"desire / lust",type:"noun"},
  {id:"gv-21-3",lang:"greek",lesson:21,script:"συναγωγή",transliteration:"synagoge2",english:"synagogue",type:"noun"},
  // --- Lesson 22 ---
  {id:"gv-22-1",lang:"greek",lesson:22,script:"πίνω",transliteration:"pino",english:"I drink",type:"verb"},
  {id:"gv-22-2",lang:"greek",lesson:22,script:"ἄγε",transliteration:"age",english:"Come! / Lead! (imperative)",type:"verb"},
  {id:"gv-22-3",lang:"greek",lesson:22,script:"μένε",transliteration:"mene",english:"Stay! / Remain! (imperative)",type:"verb"},
  {id:"gv-22-4",lang:"greek",lesson:22,script:"χαῖρε",transliteration:"chaire2",english:"Rejoice! / Greetings!",type:"verb"},
  // --- Lesson 23 ---
  {id:"gv-23-1",lang:"greek",lesson:23,script:"ἀγαπάω",transliteration:"agapao",english:"I love",type:"verb"},
  {id:"gv-23-2",lang:"greek",lesson:23,script:"γινώσκω",transliteration:"ginosko",english:"I know",type:"verb"},
  {id:"gv-23-3",lang:"greek",lesson:23,script:"ζωή",transliteration:"zoe",english:"life",type:"noun"},
  {id:"gv-23-4",lang:"greek",lesson:23,script:"λόγος",transliteration:"logos",english:"word",type:"noun"},
  {id:"gv-23-5",lang:"greek",lesson:23,script:"ὁδός",transliteration:"hodos",english:"way / road",type:"noun"},
  // --- Lesson 24 ---
  {id:"gv-24-1",lang:"greek",lesson:24,script:"ἀγάπη",transliteration:"agape",english:"love",type:"noun"},
  {id:"gv-24-2",lang:"greek",lesson:24,script:"πίστις",transliteration:"pistis",english:"faith / belief",type:"noun"},
  {id:"gv-24-3",lang:"greek",lesson:24,script:"χάρις",transliteration:"charis",english:"grace",type:"noun"},
  {id:"gv-24-4",lang:"greek",lesson:24,script:"εἰρήνη",transliteration:"eirene",english:"peace",type:"noun"},
  {id:"gv-24-5",lang:"greek",lesson:24,script:"δόξα",transliteration:"doxa",english:"glory",type:"noun"},
  // --- Lesson 25 ---
  {id:"gv-25-1",lang:"greek",lesson:25,script:"πιστεύων",transliteration:"pisteuon",english:"the one believing / believer",type:"verb"},
  {id:"gv-25-2",lang:"greek",lesson:25,script:"λύων",transliteration:"luon",english:"loosing / releasing (present participle)",type:"verb"},
  {id:"gv-25-3",lang:"greek",lesson:25,script:"γράφω",transliteration:"grapho",english:"I write",type:"verb"},
  {id:"gv-25-4",lang:"greek",lesson:25,script:"σῴζω",transliteration:"sozo",english:"I save",type:"verb"},
  {id:"gv-25-5",lang:"greek",lesson:25,script:"πνεῦμα",transliteration:"pneuma",english:"spirit / wind / breath",type:"noun"}
];

window.GREEK_VOCAB = GREEK_VOCAB;
export { GREEK_VOCAB };
