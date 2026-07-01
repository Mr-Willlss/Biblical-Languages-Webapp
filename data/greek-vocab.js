import { GREEK_LESSONS } from "./greek-data.js";

const GREEK_VOCAB = GREEK_LESSONS.flatMap((lesson) => lesson.vocabulary);

window.GREEK_VOCAB = GREEK_VOCAB;
export { GREEK_VOCAB };
