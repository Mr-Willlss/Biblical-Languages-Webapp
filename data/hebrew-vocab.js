import { HEBREW_LESSONS } from "./hebrew-data.js";

const HEBREW_VOCAB = HEBREW_LESSONS.flatMap((lesson) => lesson.vocabulary);

window.HEBREW_VOCAB = HEBREW_VOCAB;
export { HEBREW_VOCAB };
