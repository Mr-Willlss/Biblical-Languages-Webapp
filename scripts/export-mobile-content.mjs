import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

globalThis.window = {};

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const outputDirectory = resolve(root, "data");
const [{ GREEK_LESSONS }, { HEBREW_LESSONS }, { getLessonExercises }, { buildLessonGuide }] = await Promise.all([
  import("../data/greek-data.js"),
  import("../data/hebrew-data.js"),
  import("../js/lesson-practice.js"),
  import("../js/lesson-guides.js")
]);

function compactLesson(lesson) {
  return {
    id: lesson.id,
    lesson: lesson.lesson,
    lang: lesson.lang,
    world: lesson.world,
    track: lesson.track,
    title: lesson.title,
    grammarNote: lesson.grammarNote,
    description: lesson.description,
    summary: lesson.summary,
    objectives: lesson.objectives || [],
    videoUrl: lesson.videoUrl || "",
    xp: lesson.xp || 20,
    vocabulary: lesson.vocabulary || [],
    exercises: getLessonExercises(lesson),
    guideSections: buildLessonGuide(lesson)
  };
}

const curriculum = {
  version: 1,
  generatedAt: new Date().toISOString(),
  greek: GREEK_LESSONS.map(compactLesson),
  hebrew: HEBREW_LESSONS.map(compactLesson)
};

await mkdir(outputDirectory, { recursive: true });
await writeFile(resolve(outputDirectory, "mobile-curriculum.json"), `${JSON.stringify(curriculum, null, 2)}\n`, "utf8");
console.log(`Exported ${curriculum.greek.length} Greek and ${curriculum.hebrew.length} Hebrew lessons.`);
