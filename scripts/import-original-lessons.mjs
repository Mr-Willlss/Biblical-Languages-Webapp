import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

const sourceDir = process.argv[2];
if (!sourceDir) throw new Error("Usage: node scripts/import-original-lessons.mjs <extracted-source-directory>");

function evaluate(file, exportName) {
  const sandbox = { window: {} };
  vm.runInNewContext(fs.readFileSync(path.join(sourceDir, file), "utf8"), sandbox, { filename: file });
  return sandbox.window[exportName];
}

function greekVideos() {
  const html = fs.readFileSync(path.join(sourceDir, "lesson-player.html"), "utf8");
  const block = html.match(/const VIDEO_URLS = \{([\s\S]*?)\n\s*\};/);
  if (!block) throw new Error("Greek video map not found");
  const sandbox = {};
  return vm.runInNewContext(`({${block[1]}})`, sandbox);
}

function normalizeExercise(exercise, prefix, index, rtl = false) {
  const types = {
    translate_to_english: "multiple_choice",
    sentence_builder: "ordering"
  };
  return {
    id: `${prefix}-ex${index + 1}`,
    type: types[exercise.type] || exercise.type,
    prompt: exercise.question,
    ...(exercise.options ? { options: exercise.options } : {}),
    ...(exercise.words ? { items: exercise.words } : {}),
    ...(exercise.pairs ? { pairs: exercise.pairs } : {}),
    answer: exercise.answer ?? (exercise.type === "matching" ? true : undefined),
    explanation: exercise.explanation || "Review the lesson note and try the pattern again.",
    ...(rtl ? { rtl: true } : {})
  };
}

function normalizeLesson(source, lang, videos) {
  const prefix = lang === "greek" ? "g" : "h";
  const scriptKey = lang === "greek" ? "greek" : "hebrew";
  const vocabulary = source.vocabulary.map((word, index) => ({
    id: `${prefix}v-${source.id}-${index + 1}`,
    lang,
    lesson: source.id,
    script: word[scriptKey],
    transliteration: word.transliteration || "",
    english: word.english,
    type: "word",
    example: word.example || ""
  }));
  return {
    id: `${prefix}${source.id}`,
    lesson: source.id,
    lang,
    world: source.world,
    track: "beginner",
    title: source.title,
    grammarNote: source.objective,
    description: source.theory.trim(),
    summary: source.objective,
    objectives: [source.objective],
    grammarNotes: [{
      rule: "Lesson focus",
      explanation: source.objective,
      example: vocabulary[0] ? `${vocabulary[0].script} - ${vocabulary[0].english}` : source.title
    }],
    videoUrl: source.videoUrl || videos[source.id] || "",
    xp: source.xpReward,
    vocabulary,
    examples: vocabulary.slice(0, 4).map(({ script, transliteration, english, example }) => ({ script, transliteration, english, example })),
    exercises: source.exercises.map((exercise, index) => normalizeExercise(exercise, `${prefix}${source.id}`, index, lang === "hebrew"))
  };
}

function writeData(name, lessons) {
  const upper = name.toUpperCase();
  const content = `// Generated from the original Learn-koine-Greek curriculum.\nconst ${upper}_LESSONS = ${JSON.stringify(lessons, null, 2)};\n\nwindow.${upper}_LESSONS = ${upper}_LESSONS;\nexport { ${upper}_LESSONS };\n`;
  fs.writeFileSync(path.resolve(`data/${name}-data.js`), content, "utf8");
}

const greekSource = evaluate("game-data.js", "LESSON_DATA");
const hebrewSource = evaluate("hebrew-lesson-data.js", "HEBREW_LESSON_DATA");
const greek = Object.values(greekSource).map((lesson) => normalizeLesson(lesson, "greek", greekVideos()));
const hebrew = Object.values(hebrewSource).map((lesson) => normalizeLesson(lesson, "hebrew", {}));

writeData("greek", greek);
writeData("hebrew", hebrew);
console.log(`Imported ${greek.length} Greek lessons and ${hebrew.length} Hebrew lessons.`);
