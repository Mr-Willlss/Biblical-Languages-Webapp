import { HEBREW_LESSONS } from "./hebrew-data.js";

const HEBREW_VOCAB = HEBREW_LESSONS.flatMap((lesson) =>
  lesson.vocabulary.map((word, index) => ({
    id: `h${lesson.lesson}-vocab-${index + 1}`,
    lang: "hebrew",
    lesson: lesson.lesson,
    script: word.script,
    transliteration: word.transliteration,
    english: word.english,
    type: word.type
  }))
);

window.HEBREW_VOCAB = HEBREW_VOCAB;
export { HEBREW_VOCAB };
