// data/hebrew-data.js
// Biblical Hebrew beginner track, lessons 1-21.

const LESSON_BLUEPRINTS = [
  {
    title: "A Brief Survey of the Semitic Languages",
    world: 1,
    focus: "the Semitic language family and Hebrew's root-based structure",
    objectives: ["Name the main Semitic language branches", "Explain the three-consonant root idea", "Recognize why Hebrew words cluster in families", "Read a few foundational Hebrew words"],
    grammarNotes: [
      { rule: "Three-consonant roots", explanation: "Hebrew words usually grow from three consonants that carry the basic meaning. Vowels and added letters shape that root into nouns, verbs, and related forms.", example: "כתב gives the idea of writing: כָּתַב means 'he wrote'." },
      { rule: "Semitic language family", explanation: "Hebrew, Aramaic, Arabic, Akkadian, and Ethiopic share patterns of roots, consonants, and word formation.", example: "שָׁלוֹם and Arabic salaam are related words for peace." },
      { rule: "Consonants carry meaning", explanation: "In Hebrew, consonants often hold the central meaning while vowels mark grammar and pronunciation.", example: "מלך relates to king, ruling, and kingdom." }
    ],
    examples: [
      ["שָׁלוֹם", "shalom", "peace / hello"],
      ["עִבְרִית", "ivrit", "Hebrew language"],
      ["שֹׁרֶשׁ", "shoresh", "root"],
      ["שָׂפָה", "safah", "language"],
      ["אוֹת", "ot", "letter / sign"]
    ],
    vocabulary: [
      ["עִבְרִית", "ivrit", "Hebrew language", "noun"],
      ["שָׁמִי", "shami", "Semitic", "adjective"],
      ["שָׂפָה", "safah", "language", "noun"],
      ["שֵׁם", "shem", "name", "noun"],
      ["שֹׁרֶשׁ", "shoresh", "root", "noun"],
      ["אוֹת", "ot", "letter / sign", "noun"],
      ["כָּתַב", "katav", "he wrote", "verb"],
      ["מֶלֶךְ", "melekh", "king", "noun"]
    ]
  },
  {
    title: "The Alphabet Part 1: Aleph to Yod",
    world: 1,
    focus: "the first ten Hebrew consonants and right-to-left reading",
    objectives: ["Recognize א through י", "Read Hebrew from right to left", "Distinguish bet with and without dagesh", "Connect letter names to simple words"],
    grammarNotes: [
      { rule: "Right-to-left reading", explanation: "Hebrew words and sentences begin on the right and move left. The first letter of a Hebrew word is the rightmost letter.", example: "שָׁלוֹם begins with ש on the right." },
      { rule: "Consonantal alphabet", explanation: "The Hebrew alphabet has twenty-two consonants. Vowel signs are added around consonants and are studied later.", example: "בַּיִת has consonants בית plus vowel marks." },
      { rule: "Dagesh in bet", explanation: "A dot inside ב changes its sound from v to b.", example: "בַּיִת begins with b; אָב ends with v." }
    ],
    examples: [
      ["אָב", "av", "father"],
      ["בַּיִת", "bayit", "house"],
      ["גָּדוֹל", "gadol", "great / large"],
      ["דָּוִד", "david", "David"],
      ["יָד", "yad", "hand"]
    ],
    vocabulary: [
      ["א", "aleph", "first letter / glottal stop", "letter"],
      ["בּ", "bet", "b sound", "letter"],
      ["ב", "vet", "v sound", "letter"],
      ["ג", "gimel", "g sound", "letter"],
      ["ד", "dalet", "d sound", "letter"],
      ["ה", "he", "h sound", "letter"],
      ["ו", "vav", "v / w sound", "letter"],
      ["י", "yod", "y sound", "letter"]
    ]
  },
  {
    title: "The Alphabet Part 2: Kaf to Tav",
    world: 1,
    focus: "the remaining consonants and final letter forms",
    objectives: ["Recognize כ through ת", "Identify five final forms", "Read common final letters in words", "Name the BeGaDKePhaT letters"],
    grammarNotes: [
      { rule: "Final forms", explanation: "Five Hebrew letters change shape when they appear at the end of a word.", example: "כ becomes ך in מֶלֶךְ." },
      { rule: "BeGaDKePhaT letters", explanation: "ב ג ד כ פ ת may take a dagesh and sometimes shift pronunciation.", example: "כּ is k, while כ can be kh." },
      { rule: "Letter shape discipline", explanation: "Some letters look similar, so careful visual memory matters from the beginning.", example: "ד and ר differ by a small corner." }
    ],
    examples: [
      ["מֶלֶךְ", "melekh", "king"],
      ["סֵפֶר", "sefer", "book"],
      ["עַם", "am", "people"],
      ["פֶּה", "peh", "mouth"],
      ["תּוֹרָה", "torah", "instruction"]
    ],
    vocabulary: [
      ["כּ", "kaf", "k sound", "letter"],
      ["ך", "final kaf", "final k/kh form", "letter"],
      ["ל", "lamed", "l sound", "letter"],
      ["מ", "mem", "m sound", "letter"],
      ["ם", "final mem", "final m form", "letter"],
      ["נ", "nun", "n sound", "letter"],
      ["ס", "samekh", "s sound", "letter"],
      ["ת", "tav", "t sound", "letter"]
    ]
  },
  {
    title: "Guttural Letters and Careful Pronunciation",
    world: 1,
    focus: "guttural consonants and sounds made in the throat",
    objectives: ["Identify א ה ח ע as gutturals", "Pronounce ח and ע carefully", "Notice gutturals in common words", "Understand why gutturals affect vowels later"],
    grammarNotes: [
      { rule: "Guttural letters", explanation: "Gutturals are pronounced in the throat or back of the mouth. They often prefer open vowel sounds.", example: "חַי begins with ח, a strong throat sound." },
      { rule: "Aleph and ayin", explanation: "א and ע may feel silent to English speakers, but they still count as consonants in Hebrew spelling.", example: "אֶרֶץ begins with א." },
      { rule: "He at word endings", explanation: "ה often marks a final ah sound and can help signal feminine nouns.", example: "תּוֹרָה ends with ה." }
    ],
    examples: [
      ["חַי", "chai", "living"],
      ["עַם", "am", "people"],
      ["אֶרֶץ", "erets", "land"],
      ["הַר", "har", "mountain"],
      ["רוּחַ", "ruach", "spirit / wind"]
    ],
    vocabulary: [
      ["א", "aleph", "guttural glottal consonant", "letter"],
      ["ה", "he", "h guttural", "letter"],
      ["ח", "chet", "strong kh guttural", "letter"],
      ["ע", "ayin", "deep throat consonant", "letter"],
      ["חַי", "chai", "living", "adjective"],
      ["עַם", "am", "people", "noun"],
      ["הַר", "har", "mountain", "noun"],
      ["רוּחַ", "ruach", "spirit / wind", "noun"]
    ]
  },
  {
    title: "Reading Whole Words",
    world: 1,
    focus: "combining consonants into readable Hebrew words",
    objectives: ["Read short Hebrew words smoothly", "Recognize word-final forms in context", "Connect script, transliteration, and meaning", "Build confidence before vowel study"],
    grammarNotes: [
      { rule: "Words are built from consonant frames", explanation: "Even before mastering every vowel, you can learn to recognize the consonant skeleton of common words.", example: "מלך points to m-l-k and the idea of kingship." },
      { rule: "Final forms only close words", explanation: "Final forms appear only at the end of words and help your eye recognize word boundaries.", example: "דֶּרֶךְ ends with final kaf ך." },
      { rule: "Transliteration is a bridge", explanation: "Transliteration helps at first, but the goal is to read the Hebrew script directly.", example: "shalom should eventually be recognized as שָׁלוֹם." }
    ],
    examples: [
      ["דָּבָר", "davar", "word / matter"],
      ["דֶּרֶךְ", "derekh", "way / road"],
      ["קוֹל", "qol", "voice / sound"],
      ["לֵב", "lev", "heart"],
      ["יוֹם", "yom", "day"]
    ],
    vocabulary: [
      ["דָּבָר", "davar", "word / matter", "noun"],
      ["דֶּרֶךְ", "derekh", "way / road", "noun"],
      ["קוֹל", "qol", "voice / sound", "noun"],
      ["לֵב", "lev", "heart", "noun"],
      ["יוֹם", "yom", "day", "noun"],
      ["לַיְלָה", "laylah", "night", "noun"],
      ["שָׁנָה", "shanah", "year", "noun"],
      ["עִיר", "ir", "city", "noun"]
    ]
  },
  {
    title: "Vowel Signs and the Masoretic Points",
    world: 2,
    focus: "the major Hebrew vowel signs and their sounds",
    objectives: ["Identify common vowel points", "Read patach, qamets, hiriq, tsere, segol, holem, and shureq", "Understand why vowels are dots and dashes", "Transliterate pointed words"],
    grammarNotes: [
      { rule: "Niqqud", explanation: "Hebrew vowel signs are called niqqud. They were added by scribes to preserve pronunciation.", example: "בַּ has patach, giving ba." },
      { rule: "Vowels sit around consonants", explanation: "Most vowel marks appear below a consonant, though some appear above or inside a ו.", example: "שׁוּ has shureq for u." },
      { rule: "Consonant first, vowel second", explanation: "When reading, pronounce the consonant together with its vowel mark.", example: "מֶ is read me, not em." }
    ],
    examples: [
      ["טוֹב", "tov", "good"],
      ["שׁוּב", "shuv", "return"],
      ["אִישׁ", "ish", "man"],
      ["סֵפֶר", "sefer", "book"],
      ["בָּרָא", "bara", "he created"]
    ],
    vocabulary: [
      ["פַּתַח", "patach", "a vowel sign", "vowel"],
      ["קָמֶץ", "qamets", "a vowel sign", "vowel"],
      ["חִירִיק", "hiriq", "i vowel sign", "vowel"],
      ["צֵירֵי", "tsere", "e vowel sign", "vowel"],
      ["סֶגוֹל", "segol", "short e vowel sign", "vowel"],
      ["חוֹלֶם", "holem", "o vowel sign", "vowel"],
      ["שׁוּרֶק", "shureq", "u vowel sign", "vowel"],
      ["טוֹב", "tov", "good", "adjective"]
    ]
  },
  {
    title: "Shewa, Syllables, and Word Stress",
    world: 2,
    focus: "basic Hebrew syllables and the shewa sign",
    objectives: ["Tell vocal shewa from silent shewa in simple cases", "Divide short words into syllables", "Read two-syllable words aloud", "Notice stress near the end of many words"],
    grammarNotes: [
      { rule: "Shewa can be vocal or silent", explanation: "The shewa sign may sound like a very short e, or it may close a syllable without a vowel sound.", example: "בְּרֵאשִׁית begins with vocal shewa." },
      { rule: "Open and closed syllables", explanation: "An open syllable ends in a vowel sound; a closed syllable ends in a consonant.", example: "דָּ-בָר has two simple syllables." },
      { rule: "Stress often falls late", explanation: "Many Hebrew words stress the final syllable, though not all.", example: "sha-LOM stresses the final syllable." }
    ],
    examples: [
      ["בְּרֵאשִׁית", "bereshit", "in the beginning"],
      ["שְׁמוּאֵל", "shemuel", "Samuel"],
      ["מִדְבָּר", "midbar", "wilderness"],
      ["מַלְכָּה", "malkah", "queen"],
      ["דָּבָר", "davar", "word"]
    ],
    vocabulary: [
      ["שְׁוָא", "shewa", "very short vowel / absence marker", "vowel"],
      ["בְּרֵאשִׁית", "bereshit", "in the beginning", "adverb"],
      ["מִדְבָּר", "midbar", "wilderness", "noun"],
      ["מַלְכָּה", "malkah", "queen", "noun"],
      ["שְׁמוּאֵל", "shemuel", "Samuel", "proper noun"],
      ["קָטֹן", "qaton", "small", "adjective"],
      ["גָּדוֹל", "gadol", "great / large", "adjective"],
      ["נָבִיא", "navi", "prophet", "noun"]
    ]
  },
  {
    title: "The Definite Article",
    world: 2,
    focus: "the prefix הַ meaning the",
    objectives: ["Recognize the Hebrew definite article", "Attach הַ to nouns", "Explain the dagesh after the article", "Translate definite and indefinite nouns"],
    grammarNotes: [
      { rule: "The article is a prefix", explanation: "Hebrew does not use a separate word for 'the.' It adds הַ directly to the beginning of the noun.", example: "מֶלֶךְ means a king; הַמֶּלֶךְ means the king." },
      { rule: "Dagesh after the article", explanation: "The consonant after הַ often receives a dagesh, showing a strengthened sound.", example: "סֵפֶר becomes הַסֵּפֶר." },
      { rule: "No indefinite article", explanation: "Hebrew has no word for 'a' or 'an.' A noun without הַ may be translated 'a' or simply as a noun.", example: "בַּיִת can mean house or a house." }
    ],
    examples: [
      ["הַמֶּלֶךְ", "hammelekh", "the king"],
      ["הַסֵּפֶר", "hassefer", "the book"],
      ["הָאָרֶץ", "haarets", "the land"],
      ["הַבַּיִת", "habbayit", "the house"],
      ["הַדָּבָר", "haddavar", "the word"]
    ],
    vocabulary: [
      ["הַ", "ha", "the", "article"],
      ["מֶלֶךְ", "melekh", "king", "noun"],
      ["סֵפֶר", "sefer", "book", "noun"],
      ["אֶרֶץ", "erets", "land", "noun"],
      ["בַּיִת", "bayit", "house", "noun"],
      ["דָּבָר", "davar", "word / matter", "noun"],
      ["אִישׁ", "ish", "man", "noun"],
      ["אִשָּׁה", "ishshah", "woman", "noun"]
    ]
  },
  {
    title: "Gender and Number",
    world: 2,
    focus: "masculine and feminine nouns, singular and plural",
    objectives: ["Recognize common feminine endings", "Form simple masculine plurals", "Form simple feminine plurals", "Translate gendered nouns accurately"],
    grammarNotes: [
      { rule: "Hebrew nouns have gender", explanation: "Most Hebrew nouns are masculine or feminine. This matters because adjectives and some verbs must agree with nouns.", example: "מֶלֶךְ is masculine; תּוֹרָה is feminine." },
      { rule: "Feminine endings", explanation: "Many feminine nouns end in הָ or ת.", example: "מַלְכָּה means queen." },
      { rule: "Plural endings", explanation: "Masculine plurals often end in ים, while feminine plurals often end in ות.", example: "מְלָכִים means kings; תּוֹרוֹת means instructions." }
    ],
    examples: [
      ["מֶלֶךְ טוֹב", "melekh tov", "a good king"],
      ["מַלְכָּה טוֹבָה", "malkah tovah", "a good queen"],
      ["סְפָרִים", "sefarim", "books"],
      ["תּוֹרוֹת", "torot", "instructions"],
      ["עִיר גְּדוֹלָה", "ir gedolah", "a great city"]
    ],
    vocabulary: [
      ["זָכָר", "zakhar", "masculine / male", "noun"],
      ["נְקֵבָה", "neqevah", "feminine / female", "noun"],
      ["מַלְכָּה", "malkah", "queen", "noun"],
      ["טוֹבָה", "tovah", "good (feminine)", "adjective"],
      ["מְלָכִים", "melakhim", "kings", "noun"],
      ["תּוֹרוֹת", "torot", "instructions", "noun"],
      ["עִיר", "ir", "city", "noun"],
      ["גְּדוֹלָה", "gedolah", "great (feminine)", "adjective"]
    ]
  },
  {
    title: "Adjectives and Agreement",
    world: 2,
    focus: "adjectives after nouns and agreement in gender, number, and definiteness",
    objectives: ["Place adjectives after nouns", "Make adjectives agree with nouns", "Distinguish attributive and predicate adjective patterns", "Translate noun-adjective phrases"],
    grammarNotes: [
      { rule: "Adjectives follow nouns", explanation: "Hebrew adjectives normally come after the nouns they describe.", example: "מֶלֶךְ טוֹב means a good king." },
      { rule: "Agreement", explanation: "An adjective agrees with its noun in gender and number.", example: "אִשָּׁה טוֹבָה uses the feminine adjective." },
      { rule: "Definiteness agreement", explanation: "For 'the good king,' both noun and adjective take the article.", example: "הַמֶּלֶךְ הַטּוֹב." }
    ],
    examples: [
      ["הַמֶּלֶךְ הַטּוֹב", "hammelekh hattov", "the good king"],
      ["הַמֶּלֶךְ טוֹב", "hammelekh tov", "the king is good"],
      ["אִשָּׁה חֲכָמָה", "ishshah chakhamah", "a wise woman"],
      ["סֵפֶר קָטֹן", "sefer qaton", "a small book"],
      ["עִיר גְּדוֹלָה", "ir gedolah", "a great city"]
    ],
    vocabulary: [
      ["חָכָם", "chakham", "wise (masculine)", "adjective"],
      ["חֲכָמָה", "chakhamah", "wise (feminine)", "adjective"],
      ["קָטֹן", "qaton", "small (masculine)", "adjective"],
      ["קְטַנָּה", "qetannah", "small (feminine)", "adjective"],
      ["יָשָׁר", "yashar", "upright", "adjective"],
      ["רַב", "rav", "many / great", "adjective"],
      ["רָע", "ra", "evil / bad", "adjective"],
      ["יָפֶה", "yafeh", "beautiful", "adjective"]
    ]
  },
  {
    title: "Pronouns and Simple Sentences",
    world: 3,
    focus: "independent pronouns and verbless clauses",
    objectives: ["Recognize independent pronouns", "Translate simple nominal sentences", "Understand implied 'to be' in Hebrew", "Build short identity statements"],
    grammarNotes: [
      { rule: "No present tense 'to be'", explanation: "Hebrew often omits 'is' and 'are' in present-time noun sentences.", example: "יְהוָה מֶלֶךְ means 'The LORD is king.'" },
      { rule: "Independent pronouns", explanation: "Pronouns can stand alone as subjects.", example: "אֲנִי means I; אַתָּה means you (masculine)." },
      { rule: "Pronoun gender", explanation: "Second and third person pronouns have masculine and feminine forms.", example: "הוּא means he; הִיא means she." }
    ],
    examples: [
      ["אֲנִי תַּלְמִיד", "ani talmid", "I am a student"],
      ["אַתָּה מֶלֶךְ", "attah melekh", "you are a king"],
      ["הוּא נָבִיא", "hu navi", "he is a prophet"],
      ["הִיא חֲכָמָה", "hi chakhamah", "she is wise"],
      ["יְהוָה מֶלֶךְ", "adonai melekh", "the LORD is king"]
    ],
    vocabulary: [
      ["אֲנִי", "ani", "I", "pronoun"],
      ["אַתָּה", "attah", "you (masculine singular)", "pronoun"],
      ["אַתְּ", "at", "you (feminine singular)", "pronoun"],
      ["הוּא", "hu", "he", "pronoun"],
      ["הִיא", "hi", "she", "pronoun"],
      ["אֲנַחְנוּ", "anachnu", "we", "pronoun"],
      ["תַּלְמִיד", "talmid", "student / disciple", "noun"],
      ["נָבִיא", "navi", "prophet", "noun"]
    ]
  },
  {
    title: "Qal Perfect: Completed Action",
    world: 3,
    focus: "the Qal perfect verb pattern for completed actions",
    objectives: ["Recognize Qal as the simple verbal stem", "Translate perfect verbs as completed action", "Identify common perfect suffixes", "Conjugate basic strong verbs"],
    grammarNotes: [
      { rule: "Qal stem", explanation: "Qal means light or simple. It is the basic verbal stem for many Hebrew verbs.", example: "כָּתַב means he wrote." },
      { rule: "Perfect aspect", explanation: "The perfect commonly presents action as complete. In narrative it is often translated as past tense.", example: "שָׁמַע means he heard." },
      { rule: "Suffixes mark person", explanation: "Perfect verbs add endings to mark I, you, we, and they.", example: "כָּתַבְתִּי means I wrote." }
    ],
    examples: [
      ["כָּתַב", "katav", "he wrote"],
      ["שָׁמַע", "shama", "he heard"],
      ["אָמַר", "amar", "he said"],
      ["כָּתַבְתִּי", "katavti", "I wrote"],
      ["שָׁמַרְנוּ", "shamarnu", "we kept"]
    ],
    vocabulary: [
      ["כָּתַב", "katav", "he wrote", "verb"],
      ["שָׁמַע", "shama", "he heard", "verb"],
      ["אָמַר", "amar", "he said", "verb"],
      ["שָׁמַר", "shamar", "he kept / guarded", "verb"],
      ["זָכַר", "zakhar", "he remembered", "verb"],
      ["פָּקַד", "paqad", "he visited / appointed", "verb"],
      ["כָּתַבְתִּי", "katavti", "I wrote", "verb"],
      ["שָׁמַרְנוּ", "shamarnu", "we kept", "verb"]
    ]
  },
  {
    title: "Qal Perfect Persons",
    world: 3,
    focus: "person, gender, and number in perfect verb endings",
    objectives: ["Identify first, second, and third person endings", "Translate masculine and feminine second person forms", "Recognize plural perfect endings", "Practice strong verb paradigms"],
    grammarNotes: [
      { rule: "Third person base forms", explanation: "The dictionary form is usually third masculine singular perfect.", example: "לָמַד means he learned." },
      { rule: "Second person endings", explanation: "Second person forms use ת endings, with different vowels for masculine and feminine.", example: "לָמַדְתָּ means you learned (m.)." },
      { rule: "First person endings", explanation: "First person singular ends in תִּי and first plural ends in נוּ.", example: "לָמַדְתִּי means I learned; לָמַדְנוּ means we learned." }
    ],
    examples: [
      ["לָמַדְתִּי", "lamadti", "I learned"],
      ["לָמַדְתָּ", "lamadta", "you learned (m.)"],
      ["לָמַדְתְּ", "lamadt", "you learned (f.)"],
      ["לָמְדוּ", "lamdu", "they learned"],
      ["לָמַדְנוּ", "lamadnu", "we learned"]
    ],
    vocabulary: [
      ["לָמַד", "lamad", "he learned", "verb"],
      ["עָבַד", "avad", "he served / worked", "verb"],
      ["מָלַךְ", "malakh", "he reigned", "verb"],
      ["דָּרַשׁ", "darash", "he sought", "verb"],
      ["קָרָא", "qara", "he called / read", "verb"],
      ["הָלַךְ", "halakh", "he went", "verb"],
      ["לָמַדְתִּי", "lamadti", "I learned", "verb"],
      ["לָמְדוּ", "lamdu", "they learned", "verb"]
    ]
  },
  {
    title: "The Qal Imperfect",
    world: 3,
    focus: "incomplete, future, habitual, and modal action",
    objectives: ["Recognize imperfect prefixes", "Translate imperfect verbs in context", "Distinguish perfect from imperfect forms", "Practice common yiqtol forms"],
    grammarNotes: [
      { rule: "Imperfect prefixes", explanation: "Imperfect verbs usually add prefixes such as י, ת, א, or נ.", example: "יִשְׁמֹר means he will keep." },
      { rule: "Incomplete action", explanation: "The imperfect presents action as not complete: future, ongoing, repeated, or desired.", example: "אֶכְתֹּב can mean I will write." },
      { rule: "Context guides translation", explanation: "Hebrew aspect is broader than English tense, so context helps decide future, habitual, or modal meaning.", example: "יִלְמַד may be he will learn or he learns." }
    ],
    examples: [
      ["יִשְׁמֹר", "yishmor", "he will keep"],
      ["תִּכְתֹּב", "tikhtov", "you/she will write"],
      ["אֶשְׁמַע", "eshma", "I will hear"],
      ["נִלְמַד", "nilmad", "we will learn"],
      ["יִקְרָא", "yiqra", "he will call / read"]
    ],
    vocabulary: [
      ["יִשְׁמֹר", "yishmor", "he will keep", "verb"],
      ["תִּכְתֹּב", "tikhtov", "you/she will write", "verb"],
      ["אֶשְׁמַע", "eshma", "I will hear", "verb"],
      ["נִלְמַד", "nilmad", "we will learn", "verb"],
      ["יִקְרָא", "yiqra", "he will call / read", "verb"],
      ["יִתֵּן", "yitten", "he will give", "verb"],
      ["יֵלֵךְ", "yelekh", "he will go", "verb"],
      ["יֹאמַר", "yomar", "he will say", "verb"]
    ]
  },
  {
    title: "Pronominal Suffixes",
    world: 3,
    focus: "possessive suffixes on nouns and object suffixes",
    objectives: ["Recognize my, your, his, and our suffixes", "Translate possessed nouns", "Connect suffixes to pronouns", "Read common covenant phrases"],
    grammarNotes: [
      { rule: "Suffixes can show possession", explanation: "Hebrew often attaches possessive pronouns to the end of nouns.", example: "סִפְרִי means my book." },
      { rule: "His and her", explanation: "The suffix ו often means his, while הּ can mean her.", example: "בֵּיתוֹ means his house." },
      { rule: "Our suffix", explanation: "The suffix נוּ means our or us depending on context.", example: "אֱלֹהֵינוּ means our God." }
    ],
    examples: [
      ["סִפְרִי", "sifri", "my book"],
      ["בֵּיתְךָ", "betekha", "your house (m.)"],
      ["עַמּוֹ", "ammo", "his people"],
      ["תּוֹרָתָהּ", "toratah", "her instruction"],
      ["אֱלֹהֵינוּ", "eloheinu", "our God"]
    ],
    vocabulary: [
      ["סִפְרִי", "sifri", "my book", "noun"],
      ["בֵּיתְךָ", "betekha", "your house", "noun"],
      ["עַמּוֹ", "ammo", "his people", "noun"],
      ["תּוֹרָתָהּ", "toratah", "her instruction", "noun"],
      ["אֱלֹהֵינוּ", "eloheinu", "our God", "noun"],
      ["יָדוֹ", "yado", "his hand", "noun"],
      ["שְׁמִי", "shemi", "my name", "noun"],
      ["קֹלְךָ", "qolekha", "your voice", "noun"]
    ]
  },
  {
    title: "Prepositions and Their Contractions",
    world: 3,
    focus: "inseparable prepositions and article contractions",
    objectives: ["Recognize ב, ל, כ, and מ", "Translate prepositional prefixes", "Explain contraction with the article", "Read common prepositional phrases"],
    grammarNotes: [
      { rule: "Inseparable prepositions", explanation: "Some prepositions attach directly to the word that follows.", example: "בְּ means in or with." },
      { rule: "Article contraction", explanation: "When ב, ל, or כ meet הַ, they often absorb the article vowel.", example: "בְּ + הַבַּיִת becomes בַּבַּיִת." },
      { rule: "Min means from", explanation: "The preposition מִן means from and often appears as a prefixed מ.", example: "מֵאֶרֶץ means from a land." }
    ],
    examples: [
      ["בַּבַּיִת", "babbayit", "in the house"],
      ["לַמֶּלֶךְ", "lammelekh", "to the king"],
      ["כַּדָּבָר", "kaddavar", "like the word"],
      ["מֵאֶרֶץ", "meerets", "from a land"],
      ["בְּשָׁלוֹם", "beshalom", "in peace"]
    ],
    vocabulary: [
      ["בְּ", "be", "in / with / by", "preposition"],
      ["לְ", "le", "to / for", "preposition"],
      ["כְּ", "ke", "like / as", "preposition"],
      ["מִן", "min", "from", "preposition"],
      ["בַּבַּיִת", "babbayit", "in the house", "phrase"],
      ["לַמֶּלֶךְ", "lammelekh", "to the king", "phrase"],
      ["מֵאֶרֶץ", "meerets", "from a land", "phrase"],
      ["בְּשָׁלוֹם", "beshalom", "in peace", "phrase"]
    ]
  },
  {
    title: "Direct Object Marker and Word Order",
    world: 3,
    focus: "the marker אֵת and basic clause order",
    objectives: ["Recognize אֵת before definite direct objects", "Translate simple verb-subject-object clauses", "Understand common Hebrew word order", "Read Genesis-style short clauses"],
    grammarNotes: [
      { rule: "Definite direct object marker", explanation: "אֵת marks a definite direct object. It is usually not translated into English.", example: "בָּרָא אֱלֹהִים אֵת הַשָּׁמַיִם." },
      { rule: "Verb often comes first", explanation: "Biblical Hebrew narrative often places the verb before the subject.", example: "אָמַר מֹשֶׁה means Moses said." },
      { rule: "Definite objects", explanation: "The marker אֵת appears with definite objects, especially names and nouns with the article.", example: "שָׁמַר אֵת הַדָּבָר means he kept the word." }
    ],
    examples: [
      ["בָּרָא אֱלֹהִים אֵת הַשָּׁמַיִם", "bara elohim et hashamayim", "God created the heavens"],
      ["שָׁמַר אֵת הַדָּבָר", "shamar et haddavar", "he kept the word"],
      ["אָמַר מֹשֶׁה", "amar mosheh", "Moses said"],
      ["כָּתַב אֵת הַסֵּפֶר", "katav et hassefer", "he wrote the book"],
      ["רָאָה אֵת הָאִישׁ", "raah et haish", "he saw the man"]
    ],
    vocabulary: [
      ["אֵת", "et", "direct object marker", "particle"],
      ["בָּרָא", "bara", "he created", "verb"],
      ["אֱלֹהִים", "elohim", "God", "noun"],
      ["שָׁמַיִם", "shamayim", "heavens", "noun"],
      ["מֹשֶׁה", "mosheh", "Moses", "proper noun"],
      ["רָאָה", "raah", "he saw", "verb"],
      ["הָאִישׁ", "haish", "the man", "noun"],
      ["הַסֵּפֶר", "hassefer", "the book", "noun"]
    ]
  },
  {
    title: "The Waw Conjunction",
    world: 4,
    focus: "the prefix ו meaning and, but, or now",
    objectives: ["Recognize ו as a conjunction", "Read ו with common vowel changes", "Translate connected words and clauses", "Notice narrative chaining"],
    grammarNotes: [
      { rule: "Waw means and", explanation: "The conjunction ו attaches to the front of a word and usually means and.", example: "מֶלֶךְ וְנָבִיא means a king and a prophet." },
      { rule: "Pronunciation changes", explanation: "Before some letters, ו may sound like u instead of ve.", example: "וּמֶלֶךְ means and a king." },
      { rule: "Narrative connection", explanation: "Biblical Hebrew frequently links clauses with ו, giving narrative a flowing chain.", example: "וַיֹּאמֶר often means and he said." }
    ],
    examples: [
      ["מֶלֶךְ וְנָבִיא", "melekh venavi", "a king and a prophet"],
      ["טוֹב וְיָשָׁר", "tov veyashar", "good and upright"],
      ["וּמֶלֶךְ", "umelekh", "and a king"],
      ["וַיֹּאמֶר", "vayyomer", "and he said"],
      ["וְהָאָרֶץ", "vehaarets", "and the land"]
    ],
    vocabulary: [
      ["וְ", "ve", "and", "conjunction"],
      ["וּ", "u", "and (before some sounds)", "conjunction"],
      ["וַיֹּאמֶר", "vayyomer", "and he said", "verb"],
      ["נָבִיא", "navi", "prophet", "noun"],
      ["יָשָׁר", "yashar", "upright", "adjective"],
      ["צַדִּיק", "tsaddiq", "righteous", "adjective"],
      ["חָכְמָה", "chokhmah", "wisdom", "noun"],
      ["בִּינָה", "binah", "understanding", "noun"]
    ]
  },
  {
    title: "Commands and Prohibitions",
    world: 4,
    focus: "imperatives and negative commands",
    objectives: ["Recognize simple imperatives", "Translate positive commands", "Translate negative commands with אַל", "Read common worship and obedience commands"],
    grammarNotes: [
      { rule: "Imperative", explanation: "The imperative gives a direct command, usually to a second person.", example: "שְׁמַע means hear! or listen!" },
      { rule: "Negative command", explanation: "The word אַל is used for many immediate negative commands.", example: "אַל תִּירָא means do not fear." },
      { rule: "Commands can be worship language", explanation: "Many Psalms use imperatives to call people to praise, hear, and remember.", example: "זְכֹר means remember!" }
    ],
    examples: [
      ["שְׁמַע", "shema", "hear!"],
      ["זְכֹר", "zekhor", "remember!"],
      ["שְׁמֹר", "shemor", "keep!"],
      ["אַל תִּירָא", "al tira", "do not fear"],
      ["לֵךְ", "lekh", "go!"]
    ],
    vocabulary: [
      ["שְׁמַע", "shema", "hear! / listen!", "verb"],
      ["זְכֹר", "zekhor", "remember!", "verb"],
      ["שְׁמֹר", "shemor", "keep! / guard!", "verb"],
      ["אַל", "al", "do not", "particle"],
      ["תִּירָא", "tira", "you will fear / fear", "verb"],
      ["לֵךְ", "lekh", "go!", "verb"],
      ["קוּם", "qum", "rise!", "verb"],
      ["שׁוּב", "shuv", "return!", "verb"]
    ]
  },
  {
    title: "Construct State",
    world: 4,
    focus: "linked nouns such as king of Israel",
    objectives: ["Recognize construct chains", "Translate 'of' relationships", "Explain why the first noun changes", "Read biblical title phrases"],
    grammarNotes: [
      { rule: "Construct chain", explanation: "Hebrew often links two nouns directly to express possession or relationship.", example: "מֶלֶךְ יִשְׂרָאֵל means king of Israel." },
      { rule: "The first noun is bound", explanation: "The first noun in the chain is in construct state and depends on the following noun.", example: "דְּבַר יְהוָה means word of the LORD." },
      { rule: "Definiteness comes from the end", explanation: "A construct chain is definite if the final noun is definite.", example: "בֵּית הַמֶּלֶךְ means the house of the king." }
    ],
    examples: [
      ["מֶלֶךְ יִשְׂרָאֵל", "melekh yisrael", "king of Israel"],
      ["דְּבַר יְהוָה", "devar adonai", "word of the LORD"],
      ["בֵּית הַמֶּלֶךְ", "bet hammelekh", "house of the king"],
      ["אִישׁ אֱלֹהִים", "ish elohim", "man of God"],
      ["סֵפֶר תּוֹרָה", "sefer torah", "book of instruction"]
    ],
    vocabulary: [
      ["יִשְׂרָאֵל", "yisrael", "Israel", "proper noun"],
      ["יְהוָה", "adonai", "the LORD", "proper noun"],
      ["דְּבַר", "devar", "word of", "noun"],
      ["בֵּית", "bet", "house of", "noun"],
      ["אִישׁ", "ish", "man", "noun"],
      ["סֵפֶר", "sefer", "book", "noun"],
      ["תּוֹרָה", "torah", "instruction / law", "noun"],
      ["כֹּהֵן", "kohen", "priest", "noun"]
    ]
  },
  {
    title: "Demonstratives and Questions",
    world: 4,
    focus: "this, these, who, and what",
    objectives: ["Recognize demonstratives", "Ask who and what questions", "Translate simple question clauses", "Distinguish masculine and feminine this"],
    grammarNotes: [
      { rule: "This and these", explanation: "Hebrew demonstratives point to people or things and agree in gender and number.", example: "זֶה means this (masculine); זֹאת means this (feminine)." },
      { rule: "Who and what", explanation: "מִי asks who, and מָה asks what.", example: "מִי הוּא means who is he?" },
      { rule: "Questions may use normal word order", explanation: "Hebrew can form questions with question words without changing all the word order.", example: "מָה זֶה means what is this?" }
    ],
    examples: [
      ["זֶה סֵפֶר", "zeh sefer", "this is a book"],
      ["זֹאת תּוֹרָה", "zot torah", "this is instruction"],
      ["אֵלֶּה דְּבָרִים", "elleh devarim", "these are words"],
      ["מִי הוּא", "mi hu", "who is he?"],
      ["מָה זֶה", "mah zeh", "what is this?"]
    ],
    vocabulary: [
      ["זֶה", "zeh", "this (masculine)", "demonstrative"],
      ["זֹאת", "zot", "this (feminine)", "demonstrative"],
      ["אֵלֶּה", "elleh", "these", "demonstrative"],
      ["מִי", "mi", "who?", "question"],
      ["מָה", "mah", "what?", "question"],
      ["אֵיפֹה", "efoh", "where?", "question"],
      ["לָמָּה", "lammah", "why?", "question"],
      ["אֵיךְ", "ekh", "how?", "question"]
    ]
  },
  {
    title: "Reading Narrative Clauses",
    world: 4,
    focus: "short biblical narrative chains",
    objectives: ["Follow short narrative sequences", "Recognize common narrative verbs", "Translate linked clauses with ו", "Read simple biblical prose aloud"],
    grammarNotes: [
      { rule: "Narrative verbs move the story", explanation: "Biblical narrative often uses repeated verbs such as said, went, saw, took, and gave.", example: "וַיֵּלֶךְ means and he went." },
      { rule: "Clause chains", explanation: "Hebrew stories often connect action after action with ו.", example: "וַיֹּאמֶר ... וַיֵּלֶךְ ... וַיִּקַּח." },
      { rule: "Context supplies smooth English", explanation: "A literal 'and...and...and' may become smoother English while preserving the sequence.", example: "Then he said, went, and took." }
    ],
    examples: [
      ["וַיֹּאמֶר הָאִישׁ", "vayyomer haish", "and the man said"],
      ["וַיֵּלֶךְ הַמֶּלֶךְ", "vayyelekh hammelekh", "and the king went"],
      ["וַיִּקַּח אֵת הַסֵּפֶר", "vayyiqqach et hassefer", "and he took the book"],
      ["וַיִּתֵּן לַנָּבִיא", "vayyitten lannavi", "and he gave to the prophet"],
      ["וַיַּרְא הָעָם", "vayyar haam", "and the people saw"]
    ],
    vocabulary: [
      ["וַיֵּלֶךְ", "vayyelekh", "and he went", "verb"],
      ["וַיִּקַּח", "vayyiqqach", "and he took", "verb"],
      ["וַיִּתֵּן", "vayyitten", "and he gave", "verb"],
      ["וַיַּרְא", "vayyar", "and he saw", "verb"],
      ["הָעָם", "haam", "the people", "noun"],
      ["הַנָּבִיא", "hannavi", "the prophet", "noun"],
      ["לַנָּבִיא", "lannavi", "to the prophet", "phrase"],
      ["הָאִישׁ", "haish", "the man", "noun"]
    ]
  },
  {
    title: "Psalms Vocabulary",
    world: 4,
    focus: "worship, praise, trust, and covenant language",
    objectives: ["Read core Psalms vocabulary", "Recognize praise and trust words", "Translate short worship phrases", "Connect vocabulary to devotional texts"],
    grammarNotes: [
      { rule: "Poetic vocabulary is compact", explanation: "Hebrew poetry often uses short, powerful words with rich associations.", example: "חֶסֶד means loyal covenant love." },
      { rule: "Parallel ideas", explanation: "Psalms often repeat or balance ideas across two lines.", example: "light and salvation may stand together." },
      { rule: "Names and titles matter", explanation: "Words such as LORD, king, refuge, and rock carry theological weight.", example: "יְהוָה צוּרִי means the LORD is my rock." }
    ],
    examples: [
      ["יְהוָה רֹעִי", "adonai roi", "the LORD is my shepherd"],
      ["יְהוָה אוֹרִי", "adonai ori", "the LORD is my light"],
      ["חֶסֶד וֶאֱמֶת", "chesed veemet", "steadfast love and truth"],
      ["קוֹלִי אֶקְרָא", "qoli eqra", "I call with my voice"],
      ["בְּךָ בָטַחְתִּי", "bekha batachti", "in you I trusted"]
    ],
    vocabulary: [
      ["חֶסֶד", "chesed", "steadfast love", "noun"],
      ["אֱמֶת", "emet", "truth / faithfulness", "noun"],
      ["אוֹר", "or", "light", "noun"],
      ["יֵשַׁע", "yesha", "salvation", "noun"],
      ["רֹעִי", "roi", "my shepherd", "noun"],
      ["צוּר", "tsur", "rock", "noun"],
      ["בָּטַח", "batach", "he trusted", "verb"],
      ["הָלַל", "halal", "he praised", "verb"]
    ]
  },
  {
    title: "Negation",
    world: 5,
    focus: "negating verbs and noun clauses",
    objectives: ["Use לֹא to negate verbs", "Recognize אַיִן for absence", "Translate negative clauses", "Distinguish command prohibition from statement negation"],
    grammarNotes: [
      { rule: "לֹא negates verbs", explanation: "The word לֹא usually means not and commonly negates verbal statements.", example: "לֹא שָׁמַע means he did not hear." },
      { rule: "אַיִן means there is not", explanation: "אַיִן expresses absence or nonexistence in noun clauses.", example: "אֵין מֶלֶךְ means there is no king." },
      { rule: "אַל for negative commands", explanation: "Do not confuse לֹא statements with אַל commands.", example: "אַל תִּירָא means do not fear." }
    ],
    examples: [
      ["לֹא שָׁמַע", "lo shama", "he did not hear"],
      ["לֹא כָתַב", "lo khatav", "he did not write"],
      ["אֵין מֶלֶךְ", "ein melekh", "there is no king"],
      ["אֵין דָּבָר", "ein davar", "there is no word / matter"],
      ["אַל תִּירָא", "al tira", "do not fear"]
    ],
    vocabulary: [
      ["לֹא", "lo", "not", "particle"],
      ["אַיִן", "ayin", "there is not", "particle"],
      ["אֵין", "ein", "there is no", "particle"],
      ["פָּחַד", "pachad", "he feared", "verb"],
      ["יָדַע", "yada", "he knew", "verb"],
      ["מָצָא", "matsa", "he found", "verb"],
      ["חָפֵץ", "chafets", "he delighted", "verb"],
      ["תִּירָא", "tira", "you fear / will fear", "verb"]
    ]
  },
  {
    title: "Numbers and Dual Forms",
    world: 5,
    focus: "basic numbers and forms that naturally come in pairs",
    objectives: ["Recognize numbers one through five", "Understand the dual ending", "Read common paired body-part nouns", "Translate simple counted phrases"],
    grammarNotes: [
      { rule: "Dual ending", explanation: "Hebrew uses a special dual ending for some things that naturally come in pairs.", example: "עֵינַיִם means eyes." },
      { rule: "Numbers have gender", explanation: "Hebrew numbers interact with noun gender, though full number grammar develops gradually.", example: "שְׁנַיִם is masculine two." },
      { rule: "Common body pairs", explanation: "Hands, eyes, ears, and feet often use dual forms.", example: "יָדַיִם means hands." }
    ],
    examples: [
      ["יָדַיִם", "yadayim", "hands"],
      ["עֵינַיִם", "einayim", "eyes"],
      ["אָזְנַיִם", "oznayim", "ears"],
      ["רַגְלַיִם", "raglayim", "feet"],
      ["שְׁנֵי סְפָרִים", "shene sefarim", "two books"]
    ],
    vocabulary: [
      ["אֶחָד", "echad", "one", "number"],
      ["שְׁנַיִם", "shenayim", "two", "number"],
      ["שָׁלוֹשׁ", "shalosh", "three", "number"],
      ["אַרְבַּע", "arba", "four", "number"],
      ["חָמֵשׁ", "chamesh", "five", "number"],
      ["יָדַיִם", "yadayim", "hands", "noun"],
      ["עֵינַיִם", "einayim", "eyes", "noun"],
      ["רַגְלַיִם", "raglayim", "feet", "noun"]
    ]
  },
  {
    title: "Genesis 1:1 Reading Workshop",
    world: 5,
    focus: "reading and parsing Genesis 1:1",
    objectives: ["Read Genesis 1:1 word by word", "Identify the direct object marker twice", "Translate key creation vocabulary", "See how grammar supports interpretation"],
    grammarNotes: [
      { rule: "בְּרֵאשִׁית", explanation: "The first word combines a preposition with a noun related to beginning or firstness.", example: "בְּרֵאשִׁית means in the beginning." },
      { rule: "Two definite objects", explanation: "Genesis 1:1 marks both the heavens and the earth with אֵת.", example: "אֵת הַשָּׁמַיִם וְאֵת הָאָרֶץ." },
      { rule: "Created is singular", explanation: "בָּרָא is masculine singular, while אֱלֹהִים is grammatically plural in form but often singular in meaning for Israel's God.", example: "בָּרָא אֱלֹהִים means God created." }
    ],
    examples: [
      ["בְּרֵאשִׁית", "bereshit", "in the beginning"],
      ["בָּרָא אֱלֹהִים", "bara elohim", "God created"],
      ["אֵת הַשָּׁמַיִם", "et hashamayim", "the heavens"],
      ["וְאֵת הָאָרֶץ", "veet haarets", "and the earth"],
      ["בְּרֵאשִׁית בָּרָא", "bereshit bara", "in the beginning he created"]
    ],
    vocabulary: [
      ["בְּרֵאשִׁית", "bereshit", "in the beginning", "phrase"],
      ["בָּרָא", "bara", "he created", "verb"],
      ["אֱלֹהִים", "elohim", "God", "noun"],
      ["הַשָּׁמַיִם", "hashamayim", "the heavens", "noun"],
      ["וְאֵת", "veet", "and the direct object marker", "particle"],
      ["הָאָרֶץ", "haarets", "the earth", "noun"],
      ["רֵאשִׁית", "reshit", "beginning", "noun"],
      ["שָׁמַיִם", "shamayim", "heavens", "noun"]
    ]
  },
  {
    title: "The Shema: Deuteronomy 6:4",
    world: 5,
    focus: "reading the Shema word by word",
    objectives: ["Read Deuteronomy 6:4 aloud", "Translate each major word", "Recognize the imperative שְׁמַע", "Explain the confession in simple grammar terms"],
    grammarNotes: [
      { rule: "שְׁמַע is an imperative", explanation: "The opening word is a command: hear, listen, or pay attention.", example: "שְׁמַע יִשְׂרָאֵל means Hear, Israel." },
      { rule: "Suffix in אֱלֹהֵינוּ", explanation: "The נוּ ending means our.", example: "אֱלֹהֵינוּ means our God." },
      { rule: "Nominal confession", explanation: "The verse confesses identity without needing an explicit present-tense verb.", example: "יְהוָה אֶחָד means the LORD is one." }
    ],
    examples: [
      ["שְׁמַע יִשְׂרָאֵל", "shema yisrael", "Hear, Israel"],
      ["יְהוָה אֱלֹהֵינוּ", "adonai eloheinu", "the LORD our God"],
      ["יְהוָה אֶחָד", "adonai echad", "the LORD is one"],
      ["אֱלֹהֵינוּ", "eloheinu", "our God"],
      ["אֶחָד", "echad", "one"]
    ],
    vocabulary: [
      ["שְׁמַע", "shema", "hear! / listen!", "verb"],
      ["יִשְׂרָאֵל", "yisrael", "Israel", "proper noun"],
      ["יְהוָה", "adonai", "the LORD", "proper noun"],
      ["אֱלֹהֵינוּ", "eloheinu", "our God", "noun"],
      ["אֶחָד", "echad", "one", "number"],
      ["לֵבָב", "levav", "heart", "noun"],
      ["נֶפֶשׁ", "nefesh", "life / soul", "noun"],
      ["מְאֹד", "meod", "strength / very", "noun"]
    ]
  },
  {
    title: "Beginner Capstone Review",
    world: 5,
    focus: "integrating alphabet, vowels, nouns, verbs, and short readings",
    objectives: ["Review the beginner grammar system", "Read short pointed Hebrew phrases", "Identify noun, verb, adjective, and particle forms", "Prepare for continued biblical reading"],
    grammarNotes: [
      { rule: "Read in layers", explanation: "Start with consonants, add vowels, identify the word type, then translate the phrase.", example: "הַמֶּלֶךְ הַטּוֹב: article + noun + article + adjective." },
      { rule: "Grammar serves reading", explanation: "Every rule exists to help you read real texts with more care and less guessing.", example: "אֵת tells you to expect a definite direct object." },
      { rule: "Roots build memory", explanation: "When a word is unfamiliar, look for its root or a known related form.", example: "שָׁמַר and שְׁמֹר both carry the idea of keeping." }
    ],
    examples: [
      ["הַמֶּלֶךְ הַטּוֹב", "hammelekh hattov", "the good king"],
      ["שָׁמַר אֵת הַדָּבָר", "shamar et haddavar", "he kept the word"],
      ["בְּרֵאשִׁית בָּרָא אֱלֹהִים", "bereshit bara elohim", "in the beginning God created"],
      ["שְׁמַע יִשְׂרָאֵל", "shema yisrael", "Hear, Israel"],
      ["יְהוָה מֶלֶךְ", "adonai melekh", "the LORD is king"]
    ],
    vocabulary: [
      ["קָרָא", "qara", "he called / read", "verb"],
      ["נָתַן", "natan", "he gave", "verb"],
      ["לָקַח", "laqach", "he took", "verb"],
      ["שָׁפַט", "shafat", "he judged", "verb"],
      ["דִּבֶּר", "dibber", "he spoke", "verb"],
      ["בְּרִית", "berit", "covenant", "noun"],
      ["מִצְוָה", "mitsvah", "commandment", "noun"],
      ["קָדוֹשׁ", "qadosh", "holy", "adjective"]
    ]
  }
];

function paragraphSummary(lesson) {
  return `This lesson introduces ${lesson.focus}. You are not expected to master every detail at once. Read the Hebrew aloud slowly, notice the shapes of the words, and let the patterns become familiar through repeated practice.

Biblical Hebrew is learned best in layers. First you observe the script, then you connect the transliteration, then you attach meaning, and finally you ask how the grammar works inside a phrase or verse. This lesson follows that rhythm so that new material feels ordered rather than overwhelming.

The examples are intentionally short because short phrases train the eye. When you can read a small phrase with care, a full verse becomes less intimidating. Pay attention to repeated words, endings, prefixes, and small particles because Hebrew often places important meaning in compact forms.

By the end of the lesson, you should be able to explain the main grammar point in ordinary English, recognize the key vocabulary, and answer practice questions without treating the forms as random marks on a page. The ancient scribes wrote it; now you are learning to read it.`;
}

function lessonWorld(lessonNumber) {
  if (lessonNumber <= 5) return 1;
  if (lessonNumber <= 10) return 2;
  if (lessonNumber <= 15) return 3;
  if (lessonNumber <= 20) return 4;
  return 5;
}

function makePoolExercise(id, type, pool) {
  return { id, type, rtl: true, pool };
}

function buildLessonExercises(lessonNumber, lesson) {
  const vocab = lesson.vocabulary;
  const examples = lesson.examples;
  const first = vocab[0];
  const second = vocab[1];
  const third = vocab[2];
  const fourth = vocab[3];
  const distractors = vocab.slice(4).map((word) => word.english);

  return [
    makePoolExercise(`h${lessonNumber}-ex1`, "multiple_choice", [
      { prompt: `What does ${first.script} mean?`, options: [first.english, ...distractors.slice(0, 3)], answer: first.english },
      { prompt: `Choose the best meaning for ${second.script}.`, options: [second.english, first.english, third.english, fourth.english], answer: second.english },
      { prompt: `Which word means "${third.english}"?`, options: [third.script, first.script, second.script, fourth.script], answer: third.script }
    ]),
    makePoolExercise(`h${lessonNumber}-ex2`, "transliterate", [
      { prompt: `Transliterate: ${first.script}`, answer: first.transliteration },
      { prompt: `Transliterate: ${second.script}`, answer: second.transliteration },
      { prompt: `Transliterate: ${third.script}`, answer: third.transliteration }
    ]),
    makePoolExercise(`h${lessonNumber}-ex3`, "matching", [
      { pairs: vocab.slice(0, 4).map((word) => [word.script, word.english]), answer: true },
      { pairs: vocab.slice(4, 8).map((word) => [word.script, word.english]), answer: true }
    ]),
    makePoolExercise(`h${lessonNumber}-ex4`, "fill_blank", [
      { prompt: `Type the Hebrew for "${first.english}".`, answer: first.script },
      { prompt: `Type the Hebrew for "${second.english}".`, answer: second.script },
      { prompt: `Type the Hebrew for "${third.english}".`, answer: third.script }
    ]),
    makePoolExercise(`h${lessonNumber}-ex5`, "true_false", [
      { prompt: `${first.script} means "${first.english}".`, answer: true },
      { prompt: `${second.script} means "${fourth.english}".`, answer: false },
      { prompt: `This lesson focuses on ${lesson.focus}.`, answer: true }
    ]),
    makePoolExercise(`h${lessonNumber}-ex6`, "ordering", [
      { prompt: "Arrange the phrase in the order shown in the lesson example.", items: examples[0].script.split(" "), answer: examples[0].script.split(" ") },
      { prompt: "Arrange the phrase in the order shown in the lesson example.", items: examples[1].script.split(" "), answer: examples[1].script.split(" ") }
    ]),
    makePoolExercise(`h${lessonNumber}-ex7`, "multiple_choice", lesson.grammarNotes.map((note) => ({
      prompt: note.rule,
      options: [note.explanation, "A rule about Greek accent marks", "A rule about English punctuation", "A rule about Latin noun cases"],
      answer: note.explanation
    }))),
    makePoolExercise(`h${lessonNumber}-ex8`, "identify_letter", [
      { prompt: `Which form appears at the start of ${first.script}?`, options: [first.script[0], second.script[0], third.script[0], fourth.script[0]], answer: first.script[0] },
      { prompt: `Which form appears at the start of ${second.script}?`, options: [second.script[0], first.script[0], third.script[0], fourth.script[0]], answer: second.script[0] }
    ]),
    makePoolExercise(`h${lessonNumber}-ex9`, "multiple_choice", [
      { prompt: `Translate: ${examples[0].script}`, options: [examples[0].english, examples[1].english, examples[2].english, examples[3].english], answer: examples[0].english },
      { prompt: `Translate: ${examples[1].script}`, options: [examples[1].english, examples[0].english, examples[2].english, examples[3].english], answer: examples[1].english }
    ]),
    makePoolExercise(`h${lessonNumber}-ex10`, "true_false", [
      { prompt: `The word ${fourth.script} is a ${fourth.type}.`, answer: true },
      { prompt: `The word ${first.script} is best ignored when reading this lesson.`, answer: false },
      { prompt: "Hebrew grammar is easier when vocabulary and examples are studied together.", answer: true }
    ])
  ];
}

const HEBREW_LESSONS = LESSON_BLUEPRINTS.slice(0, 21).map((blueprint, index) => {
  const lesson = index + 1;
  const lessonData = {
    id: `h${lesson}`,
    lesson,
    lang: "hebrew",
    world: blueprint.world || lessonWorld(lesson),
    track: "beginner",
    title: blueprint.title,
    xp: 22 + Math.floor(index / 5) * 5,
    videoUrl: [
      "",
      "https://youtu.be/Q2Rx5eI8wOg",
      "https://youtu.be/OdC8FS2KRQI",
      "https://www.youtube.com/watch?v=MQmIaVsQT4k",
      "https://www.youtube.com/watch?v=zKrh87nOl0g",
      "https://www.youtube.com/watch?v=OKPfEeHdkqk",
      "https://www.youtube.com/watch?v=DbcKhPWwi_s",
      "https://www.youtube.com/watch?v=FmqKiBQRR0E",
      "https://www.youtube.com/watch?v=NwTvzXv2K44",
      "https://www.youtube.com/watch?v=RSwwKVdWfj4",
      "https://www.youtube.com/watch?v=7F-cDmKmQyE",
      "https://www.youtube.com/watch?v=x5bJnkc2v3E",
      "https://www.youtube.com/watch?v=q8KLpPr6_jc",
      "https://www.youtube.com/watch?v=NxmL7kyY9qM",
      "https://www.youtube.com/watch?v=lT4vC_w8r_k",
      "https://www.youtube.com/watch?v=AgO_x2Jz5QM",
      "https://www.youtube.com/watch?v=Ub9kyAKPrqQ",
      "https://www.youtube.com/watch?v=vjOpI5_w1jU",
      "https://www.youtube.com/watch?v=aL6Bq7d7xMo",
      "https://www.youtube.com/watch?v=7BmYvDO2dHc",
      "https://www.youtube.com/watch?v=PnzLwvLdL5s",
      "https://www.youtube.com/watch?v=A2ePk_8nBH0"
    ][lesson] || "",
    summary: paragraphSummary(blueprint),
    objectives: blueprint.objectives,
    grammarNotes: blueprint.grammarNotes,
    examples: blueprint.examples.map(([script, transliteration, english]) => ({ script, transliteration, english })),
    vocabulary: blueprint.vocabulary.map(([script, transliteration, english, type]) => ({ script, transliteration, english, type }))
  };
  lessonData.exercises = buildLessonExercises(lesson, lessonData);
  return lessonData;
});

window.HEBREW_LESSONS = HEBREW_LESSONS;
export { HEBREW_LESSONS };
