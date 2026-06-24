const hebrewTypes = ["multiple_choice", "fill_blank", "matching", "ordering", "identify_letter", "transliterate", "true_false"];
const hebrewTopics = [
  "Aleph and consonant orientation", "Beth through He", "Vav through Yod", "Kaph through Nun", "Samekh through Tav",
  "Vowel signs", "Syllables and shewa", "Definite article", "Gender and number", "Basic noun phrases",
  "Qal perfect verbs", "Qal imperfect verbs", "Pronominal suffixes", "Prepositions", "Simple clauses",
  "Wayyiqtol introduction", "Imperatives", "Construct state", "Reading narrative", "Psalm vocabulary", "Beginner capstone",
  "Imperfect patterns", "Jussive and cohortative", "Commands", "Weak verbs survey", "Narrative sequencing",
  "Construct chains", "Possession", "Names and titles", "Numbers", "Syntax review",
  "Genesis reading", "Exodus reading", "Psalm reading", "Prophets reading", "Ruth reading",
  "Discourse markers", "Poetic parallelism", "Text-critical awareness", "Translation workshop", "Mastery review"
];

function buildHebrewExercise(lesson, index) {
  const type = hebrewTypes[index % hebrewTypes.length];
  const word = ["דָּבָר", "אֱלֹהִים", "שָׁלוֹם", "מֶלֶךְ", "תּוֹרָה", "אָרֶץ"][index % 6];
  const base = { id: `h${lesson}-${index + 1}`, type, prompt: `Lesson ${lesson}: work with ${word}`, rtl: true };
  if (type === "multiple_choice") return { ...base, prompt: `Choose the gloss for ${word}.`, options: ["word / matter", "vineyard", "tent", "sea"], answer: "word / matter" };
  if (type === "fill_blank") return { ...base, prompt: "הַ___ means the word.", answer: "דָּבָר" };
  if (type === "matching") return { ...base, pairs: [["אֱלֹהִים", "God"], ["שָׁלוֹם", "peace"], ["מֶלֶךְ", "king"]] };
  if (type === "ordering") return { ...base, prompt: "Order the phrase.", items: ["הַ", "דָּבָר", "טוֹב"], answer: ["הַ", "דָּבָר", "טוֹב"] };
  if (type === "identify_letter") return { ...base, prompt: "Identify the letter א.", options: ["aleph", "beth", "mem", "shin"], answer: "aleph" };
  if (type === "transliterate") return { ...base, prompt: "Transliterate שָׁלוֹם.", answer: "shalom" };
  return { ...base, prompt: "Hebrew script should be read right to left.", answer: true };
}

const HEBREW_LESSONS = hebrewTopics.map((topic, index) => {
  const lesson = index + 1;
  return {
    id: `h${lesson}`,
    lesson,
    lang: "hebrew",
    title: topic,
    world: lesson <= 21 ? Math.ceil(lesson / 5) : 5 + Math.ceil((lesson - 21) / 5),
    xp: lesson <= 21 ? 22 + Math.floor(index / 5) * 5 : 35,
    videoUrl: "",
    scaffold: lesson > 21,
    summary: lesson > 21
      ? `Further-study lesson scaffold for ${topic.toLowerCase()}, ready for instructor video and expanded school content.`
      : `A guided Biblical Hebrew lesson on ${topic.toLowerCase()}, with contained RTL text, pronunciation, and practice.`,
    objectives: [
      `Recognize forms connected to ${topic.toLowerCase()}.`,
      "Read Hebrew examples in a contained RTL text area.",
      "Practise recall with typed and selected answers."
    ],
    examples: [
      { script: "בְּרֵאשִׁית בָּרָא אֱלֹהִים", transliteration: "bereshit bara elohim", english: "In the beginning God created." },
      { script: "שָׁלוֹם לָכֶם", transliteration: "shalom lakhem", english: "Peace to you." }
    ],
    exercises: Array.from({ length: 7 }, (_, i) => buildHebrewExercise(lesson, i))
  };
});

window.HEBREW_LESSONS = HEBREW_LESSONS;
export { HEBREW_LESSONS };
