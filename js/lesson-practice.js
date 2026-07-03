const mc = (id, prompt, options, answer, explanation) => ({ id, type: "multiple_choice", prompt, options, answer, explanation });
const tf = (id, prompt, answer, explanation) => ({ id, type: "true_false", prompt, answer, explanation });

const ALPHABET_PRACTICE = {
  1: [
    mc("g1-alpha", "Which Greek letter is Alpha?", ["Α α", "Β β", "Γ γ", "Δ δ"], "Α α", "Α is capital Alpha and α is lowercase Alpha. It usually carries an a sound."),
    mc("g1-beta", "What is the name of Β β?", ["Alpha", "Beta", "Gamma", "Delta"], "Beta", "Β β is Beta, the second Greek letter, and it gives a b sound."),
    mc("g1-gamma", "Which pair is Gamma?", ["Ε ε", "Γ γ", "Κ κ", "Μ μ"], "Γ γ", "Γ is capital Gamma and γ is lowercase Gamma."),
    mc("g1-delta", "What sound does Δ δ represent?", ["d", "g", "th", "m"], "d", "Delta represents the d sound."),
    mc("g1-epsilon", "Which letter is the short e vowel Epsilon?", ["Η η", "Ι ι", "Ε ε", "Α α"], "Ε ε", "Epsilon is Ε ε and gives a short e sound."),
    mc("g1-theta", "Which letter makes the 'th' sound in 'think'?", ["Ζ ζ", "Θ θ", "Κ κ", "Λ λ"], "Θ θ", "Theta, written Θ θ, represents the th sound."),
    mc("g1-iota", "What is the name of Ι ι?", ["Iota", "Eta", "Mu", "Kappa"], "Iota", "Ι ι is Iota and represents an i sound."),
    mc("g1-mu", "Which pair is Mu, the letter with an m sound?", ["Μ μ", "Λ λ", "Η η", "Β β"], "Μ μ", "Μ is capital Mu and μ is lowercase Mu."),
    tf("g1-eta", "Η η is Eta, the long e vowel.", true, "Correct: Η η is Eta. Do not confuse it with short-e Epsilon, Ε ε."),
    mc("g1-lambda", "What is the name of Λ λ?", ["Lambda", "Kappa", "Delta", "Zeta"], "Lambda", "Λ λ is Lambda and represents the l sound.")
  ],
  2: [
    mc("g2-nu", "Which pair is Nu?", ["Ν ν", "Ξ ξ", "Π π", "Ρ ρ"], "Ν ν", "Ν ν is Nu and represents an n sound."),
    mc("g2-xi", "Which Greek letter makes the x or 'ks' sound?", ["Χ χ", "Ξ ξ", "Ψ ψ", "Φ φ"], "Ξ ξ", "Xi, Ξ ξ, represents the combined ks sound often written x."),
    mc("g2-pi", "What is the name of Π π?", ["Pi", "Rho", "Tau", "Phi"], "Pi", "Π π is Pi and gives a p sound."),
    mc("g2-sigma", "Which lowercase Sigma is used at the end of a word?", ["σ", "ς", "Σ", "ζ"], "ς", "Final sigma ς appears only at the end of a word; σ appears elsewhere."),
    mc("g2-phi", "Which pair is Phi and usually represents 'ph' or f?", ["Φ φ", "Ψ ψ", "Χ χ", "Υ υ"], "Φ φ", "Φ φ is Phi."),
    mc("g2-psi", "Which letter makes the 'ps' sound?", ["Ξ ξ", "Ψ ψ", "Χ χ", "Ω ω"], "Ψ ψ", "Psi, Ψ ψ, combines p and s into one Greek letter."),
    mc("g2-omega", "Which pair is Omega, the long o vowel?", ["Ο ο", "Ω ω", "Υ υ", "Ρ ρ"], "Ω ω", "Omega is Ω ω. Its name literally distinguishes it as the large or long o."),
    tf("g2-rho", "Ρ ρ is Rho and represents an r sound.", true, "Correct: Ρ ρ is Rho."),
    mc("g2-tau", "What is the name of Τ τ?", ["Tau", "Upsilon", "Rho", "Nu"], "Tau", "Τ τ is Tau and represents a t sound."),
    mc("g2-chi", "Which pair is Chi?", ["Χ χ", "Κ κ", "Η η", "Θ θ"], "Χ χ", "Χ χ is Chi. Its sound is not the same as English ch in 'chair.'")
  ]
};

const REPLACEMENTS = {
  5: mc("g5-vocative", "Which case is used when directly calling or addressing someone?", ["Vocative", "Genitive", "Dative", "Accusative"], "Vocative", "The Vocative case is used for direct address, as when calling someone by name."),
  6: mc("g6-first-plural", "Which ending marks first person plural: 'we'?", ["-ω", "-εις", "-ομεν", "-ουσι"], "-ομεν", "The ending -ομεν identifies first person plural: we perform the action."),
  12: mc("g12-that", "Which phrase means 'that man'?", ["ἐκεῖνος ὁ ἄνθρωπος", "οὗτος ὁ ἄνθρωπος", "τίς ὁ ἄνθρωπος", "αὐτὸς ὁ ἄνθρωπος"], "ἐκεῖνος ὁ ἄνθρωπος", "The demonstrative ἐκεῖνος points to someone farther away: that man."),
  13: mc("g13-same", "When αὐτός stands between the article and noun, what meaning does it usually add?", ["same", "who?", "this", "someone"], "same", "In the attributive position, αὐτός commonly means 'same.'"),
  16: mc("g16-liquid", "Which set contains only liquid consonants?", ["λ, μ, ν, ρ", "π, β, φ", "κ, γ, χ", "τ, δ, θ"], "λ, μ, ν, ρ", "Liquid verb stems end in λ, μ, ν, or ρ."),
  17: mc("g17-recognize", "Which feature often signals a Greek perfect-tense verb?", ["Reduplication at the beginning", "A final sigma only", "No stem", "A question mark"], "Reduplication at the beginning", "Perfect forms often repeat the opening consonant with a vowel, a feature called reduplication."),
  18: mc("g18-stem", "When analysing a conjugated verb, what should you identify before the ending?", ["The verb stem", "The article", "The noun gender", "The punctuation"], "The verb stem", "The stem carries the verb's central meaning; markers and endings add tense and person."),
  21: mc("g21-dative", "The adjective form δικαίοις is which case and number?", ["Dative plural", "Accusative singular", "Genitive plural", "Nominative singular"], "Dative plural", "The ending -οις identifies dative plural for this adjective pattern."),
  25: mc("g25-aspect", "What kind of action does a present participle normally present?", ["Ongoing action", "Completed prior action", "Future command", "A question"], "Ongoing action", "A present participle normally presents an action in progress or as ongoing.")
};

function getLessonExercises(lesson) {
  if (lesson.lang !== "greek") return lesson.exercises;
  if (ALPHABET_PRACTICE[lesson.lesson]) return ALPHABET_PRACTICE[lesson.lesson];
  const exercises = lesson.exercises.map((exercise) => ({ ...exercise }));
  if (REPLACEMENTS[lesson.lesson]) exercises[exercises.length - 1] = REPLACEMENTS[lesson.lesson];
  return exercises;
}

export { getLessonExercises };
