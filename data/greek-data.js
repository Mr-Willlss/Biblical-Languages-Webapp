const exerciseTypes = ["multiple_choice", "fill_blank", "matching", "ordering", "identify_letter", "transliterate", "true_false"];

const greekTopics = [
  "Greek alphabet orientation", "Vowels and breathing marks", "Diphthongs", "Consonant families", "Syllables and accents",
  "First nouns", "Articles", "Basic verbs", "Prepositions", "Simple clauses",
  "Nominative and accusative", "Genitive and dative", "Present active indicative", "Adjectives", "Pronouns",
  "Imperfect tense", "Aorist overview", "Participles", "Infinitives", "Conjunctions",
  "Middle and passive voice", "Subjunctive mood", "Imperatives", "Reading John 1", "Capstone exegesis"
];

function buildGreekExercise(lesson, index) {
  const type = exerciseTypes[index % exerciseTypes.length];
  const word = ["λόγος", "θεός", "χάρις", "πίστις", "ἀγάπη", "κύριος"][index % 6];
  const base = { id: `g${lesson}-${index + 1}`, type, prompt: `Lesson ${lesson}: work with ${word}` };
  if (type === "multiple_choice") return { ...base, prompt: `What is the best gloss for ${word}?`, options: ["word / matter", "river", "stone", "house"], answer: "word / matter" };
  if (type === "fill_blank") return { ...base, prompt: "ὁ ___ means the word.", answer: "λόγος" };
  if (type === "matching") return { ...base, pairs: [["θεός", "God"], ["χάρις", "grace"], ["πίστις", "faith"]] };
  if (type === "ordering") return { ...base, prompt: "Order the phrase.", items: ["ὁ", "λόγος", "καλός"], answer: ["ὁ", "λόγος", "καλός"] };
  if (type === "identify_letter") return { ...base, prompt: "Identify the letter Ω.", options: ["omega", "alpha", "sigma", "theta"], answer: "omega" };
  if (type === "transliterate") return { ...base, prompt: "Transliterate λόγος.", answer: "logos" };
  return { ...base, prompt: "Greek nouns can show case by their endings.", answer: true };
}

const GREEK_LESSONS = greekTopics.map((topic, index) => {
  const lesson = index + 1;
  return {
    id: `g${lesson}`,
    lesson,
    lang: "greek",
    title: topic,
    world: Math.ceil(lesson / 5),
    xp: 20 + Math.floor(index / 5) * 5,
    videoUrl: "",
    summary: `A focused seminary-paced lesson on ${topic.toLowerCase()}, with script recognition, grammar notes, and guided practice.`,
    objectives: [
      `Recognize the core forms in ${topic.toLowerCase()}.`,
      "Read examples aloud with careful pronunciation.",
      "Apply the form in a short biblical-language exercise."
    ],
    examples: [
      { script: "Ἐν ἀρχῇ ἦν ὁ λόγος", transliteration: "En arche en ho logos", english: "In the beginning was the Word." },
      { script: "χάρις ὑμῖν καὶ εἰρήνη", transliteration: "charis hymin kai eirene", english: "Grace to you and peace." }
    ],
    exercises: Array.from({ length: 7 }, (_, i) => buildGreekExercise(lesson, i))
  };
});

window.GREEK_LESSONS = GREEK_LESSONS;
export { GREEK_LESSONS };
