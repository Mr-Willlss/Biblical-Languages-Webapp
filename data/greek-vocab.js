const GREEK_VOCAB = [
  ["λόγος", "logos", "word, matter", "noun"], ["θεός", "theos", "God", "noun"], ["χάρις", "charis", "grace", "noun"],
  ["πίστις", "pistis", "faith", "noun"], ["ἀγάπη", "agape", "love", "noun"], ["κύριος", "kyrios", "Lord", "noun"],
  ["καί", "kai", "and", "conjunction"], ["ἐν", "en", "in", "preposition"], ["γράφω", "grapho", "I write", "verb"],
  ["λέγω", "lego", "I say", "verb"], ["βλέπω", "blepo", "I see", "verb"], ["καλός", "kalos", "good", "adjective"],
  ["πρῶτος", "protos", "first", "adjective"], ["ἄνθρωπος", "anthropos", "human", "noun"], ["οἶκος", "oikos", "house", "noun"],
  ["μαθητής", "mathetes", "disciple", "noun"], ["σοφία", "sophia", "wisdom", "noun"], ["ζωή", "zoe", "life", "noun"],
  ["φῶς", "phos", "light", "noun"], ["ἀλήθεια", "aletheia", "truth", "noun"], ["μένω", "meno", "I remain", "verb"],
  ["λαμβάνω", "lambano", "I receive", "verb"], ["ποιέω", "poieo", "I do", "verb"], ["εἰρήνη", "eirene", "peace", "noun"],
  ["ἁμαρτία", "hamartia", "sin", "noun"]
].map(([script, transliteration, english, type], index) => ({
  id: `g-vocab-${index + 1}`,
  lang: "greek",
  lesson: (index % 25) + 1,
  script,
  transliteration,
  english,
  type
}));

window.GREEK_VOCAB = GREEK_VOCAB;
export { GREEK_VOCAB };
