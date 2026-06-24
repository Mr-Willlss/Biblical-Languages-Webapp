const HEBREW_VOCAB = [
  ["דָּבָר", "davar", "word, matter", "noun"], ["אֱלֹהִים", "elohim", "God", "noun"], ["שָׁלוֹם", "shalom", "peace", "noun"],
  ["מֶלֶךְ", "melekh", "king", "noun"], ["תּוֹרָה", "torah", "instruction", "noun"], ["אָרֶץ", "erets", "land", "noun"],
  ["בְּ", "be", "in, with", "preposition"], ["וְ", "ve", "and", "conjunction"], ["אָמַר", "amar", "he said", "verb"],
  ["כָּתַב", "katav", "he wrote", "verb"], ["רָאָה", "raah", "he saw", "verb"], ["טוֹב", "tov", "good", "adjective"],
  ["רִאשׁוֹן", "rishon", "first", "adjective"], ["אָדָם", "adam", "human", "noun"], ["בַּיִת", "bayit", "house", "noun"],
  ["תַּלְמִיד", "talmid", "student", "noun"], ["חָכְמָה", "chokhmah", "wisdom", "noun"], ["חַיִּים", "chayyim", "life", "noun"],
  ["אוֹר", "or", "light", "noun"], ["אֱמֶת", "emet", "truth", "noun"], ["יָשַׁב", "yashav", "he sat", "verb"],
  ["לָקַח", "laqach", "he took", "verb"], ["עָשָׂה", "asah", "he made", "verb"], ["בְּרִית", "berit", "covenant", "noun"],
  ["חֶסֶד", "chesed", "steadfast love", "noun"]
].map(([script, transliteration, english, type], index) => ({
  id: `h-vocab-${index + 1}`,
  lang: "hebrew",
  lesson: (index % 25) + 1,
  script,
  transliteration,
  english,
  type
}));

window.HEBREW_VOCAB = HEBREW_VOCAB;
export { HEBREW_VOCAB };
