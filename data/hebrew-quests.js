const HEBREW_QUESTS = [
  {
    id: "hq-daily-script",
    lang: "hebrew",
    category: "Daily",
    title: "Script Recognition",
    icon: "scan-text",
    description: "Review core letters and reading direction.",
    xpReward: 25,
    requiredLesson: 2,
    oneTimeXP: false,
    questions: [
      { type: "multiple_choice", prompt: "Which direction is Hebrew read?", options: ["Right to left", "Left to right", "Top to bottom", "Bottom to top"], answer: "Right to left" },
      { type: "identify_letter", prompt: "Name this letter: א", options: ["Aleph", "Bet", "Mem", "Tav"], answer: "Aleph" },
      { type: "identify_letter", prompt: "Name this final form: ם", options: ["Final Mem", "Final Nun", "Final Kaf", "Final Pe"], answer: "Final Mem" }
    ]
  },
  {
    id: "hq-daily-vowels",
    lang: "hebrew",
    category: "Daily",
    title: "Vowel Points",
    icon: "circle-dot",
    description: "Identify common vowel signs and pointed words.",
    xpReward: 25,
    requiredLesson: 6,
    oneTimeXP: false,
    questions: [
      { type: "multiple_choice", prompt: "What sound does חִירִיק usually mark?", options: ["i", "a", "o", "u"], answer: "i" },
      { type: "transliterate", prompt: "Transliterate: טוֹב", answer: "tov" },
      { type: "true_false", prompt: "Vowel points are written around Hebrew consonants.", answer: true }
    ]
  },
  {
    id: "hq-lesson-article",
    lang: "hebrew",
    category: "Lesson",
    title: "Article Builder",
    icon: "badge-check",
    description: "Practice the prefix הַ and definite nouns.",
    xpReward: 50,
    requiredLesson: 8,
    oneTimeXP: true,
    questions: [
      { type: "multiple_choice", prompt: "What does הַ mean?", options: ["the", "and", "from", "to"], answer: "the" },
      { type: "multiple_choice", prompt: "Translate הַמֶּלֶךְ.", options: ["the king", "a king", "to a king", "and a king"], answer: "the king" },
      { type: "true_false", prompt: "Hebrew has a separate word for the indefinite article 'a'.", answer: false }
    ]
  },
  {
    id: "hq-lesson-agreement",
    lang: "hebrew",
    category: "Lesson",
    title: "Agreement Drill",
    icon: "repeat",
    description: "Practice noun and adjective agreement.",
    xpReward: 60,
    requiredLesson: 10,
    oneTimeXP: true,
    questions: [
      { type: "multiple_choice", prompt: "Where does a Hebrew adjective normally stand?", options: ["After the noun", "Before the noun", "Inside the noun", "Only at sentence end"], answer: "After the noun" },
      { type: "multiple_choice", prompt: "Translate מַלְכָּה טוֹבָה.", options: ["a good queen", "a good king", "the good king", "a small book"], answer: "a good queen" },
      { type: "true_false", prompt: "An adjective agrees with its noun in gender and number.", answer: true }
    ]
  },
  {
    id: "hq-lesson-perfect",
    lang: "hebrew",
    category: "Lesson",
    title: "Qal Perfect Master",
    icon: "pencil",
    description: "Translate completed-action verb forms.",
    xpReward: 75,
    requiredLesson: 11,
    oneTimeXP: true,
    questions: [
      { type: "multiple_choice", prompt: "What does כָּתַב mean?", options: ["he wrote", "he heard", "he kept", "he went"], answer: "he wrote" },
      { type: "multiple_choice", prompt: "What does כָּתַבְתִּי mean?", options: ["I wrote", "he wrote", "they wrote", "you wrote"], answer: "I wrote" },
      { type: "true_false", prompt: "The Qal perfect commonly presents action as complete.", answer: true }
    ]
  },
  {
    id: "hq-lesson-imperfect",
    lang: "hebrew",
    category: "Lesson",
    title: "Imperfect Forms",
    icon: "arrow-right",
    description: "Recognize incomplete, future, or habitual action.",
    xpReward: 75,
    requiredLesson: 13,
    oneTimeXP: true,
    questions: [
      { type: "multiple_choice", prompt: "What does יִשְׁמֹר mean?", options: ["he will keep", "he kept", "I kept", "keep!"], answer: "he will keep" },
      { type: "multiple_choice", prompt: "Which letters commonly prefix imperfect verbs?", options: ["י ת א נ", "ב כ ל מ", "א ה ח ע", "ם ן ף ץ"], answer: "י ת א נ" },
      { type: "true_false", prompt: "Context helps translate the Hebrew imperfect.", answer: true }
    ]
  },
  {
    id: "hq-lesson-prepositions",
    lang: "hebrew",
    category: "Lesson",
    title: "Preposition Paths",
    icon: "route",
    description: "Read inseparable prepositions and contractions.",
    xpReward: 75,
    requiredLesson: 14,
    oneTimeXP: true,
    questions: [
      { type: "multiple_choice", prompt: "What does בְּ usually mean?", options: ["in / with", "to / for", "like / as", "from"], answer: "in / with" },
      { type: "multiple_choice", prompt: "Translate לַמֶּלֶךְ.", options: ["to the king", "from the king", "like a king", "the king"], answer: "to the king" },
      { type: "true_false", prompt: "ב, ל, and כ can contract with the definite article.", answer: true }
    ]
  },
  {
    id: "hq-mastery-genesis",
    lang: "hebrew",
    category: "Mastery",
    title: "Genesis 1:1 Reader",
    icon: "book-open",
    description: "Parse the opening words of Genesis.",
    xpReward: 120,
    requiredLesson: 20,
    oneTimeXP: true,
    questions: [
      { type: "multiple_choice", prompt: "Translate בְּרֵאשִׁית.", options: ["in the beginning", "and the earth", "God", "he created"], answer: "in the beginning" },
      { type: "multiple_choice", prompt: "What does אֵת mark?", options: ["a definite direct object", "a subject", "a question", "a plural noun"], answer: "a definite direct object" },
      { type: "transliterate", prompt: "Transliterate: אֱלֹהִים", answer: "elohim" }
    ]
  },
  {
    id: "hq-mastery-shema",
    lang: "hebrew",
    category: "Mastery",
    title: "The Shema Challenge",
    icon: "sparkles",
    description: "Read and translate Deuteronomy 6:4.",
    xpReward: 150,
    requiredLesson: 21,
    oneTimeXP: true,
    questions: [
      { type: "multiple_choice", prompt: "What does שְׁמַע mean?", options: ["Hear! / Listen!", "Write!", "Go!", "Remember!"], answer: "Hear! / Listen!" },
      { type: "multiple_choice", prompt: "What does אֱלֹהֵינוּ mean?", options: ["our God", "his God", "the king", "one"], answer: "our God" },
      { type: "ordering", prompt: "Arrange the first two words of the Shema.", items: ["שְׁמַע", "יִשְׂרָאֵל"], answer: ["שְׁמַע", "יִשְׂרָאֵל"] }
    ]
  },
  {
    id: "hq-special-capstone",
    lang: "hebrew",
    category: "Special",
    title: "Beginner Capstone",
    icon: "trophy",
    description: "A mixed review across all beginner lessons.",
    xpReward: 200,
    requiredLesson: 21,
    oneTimeXP: true,
    questions: [
      { type: "multiple_choice", prompt: "Which word means covenant?", options: ["בְּרִית", "מֶלֶךְ", "סֵפֶר", "אוֹר"], answer: "בְּרִית" },
      { type: "multiple_choice", prompt: "Which particle negates verbs?", options: ["לֹא", "אֵת", "הַ", "וְ"], answer: "לֹא" },
      { type: "multiple_choice", prompt: "Which word means holy?", options: ["קָדוֹשׁ", "חָכָם", "קָטֹן", "רָע"], answer: "קָדוֹשׁ" },
      { type: "true_false", prompt: "Roots, prefixes, suffixes, and context all help Hebrew reading.", answer: true }
    ]
  }
];

window.HEBREW_QUESTS = HEBREW_QUESTS;
export { HEBREW_QUESTS };
