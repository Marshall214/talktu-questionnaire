/**
 * Age-Based Questionnaire Data
 * Organized by age groups: 2-3, 4-5, 6-8 years
 */

// Age group definitions
const AGE_GROUPS = {
  TODDLER: '2-3',    // 24-47 months
  PRESCHOOL: '4-5',  // 48-71 months
  SCHOOL: '6-8'      // 72-107 months
};

// Determine age group from child's age in years
function getAgeGroup(ageYears) {
  if (ageYears >= 2 && ageYears <= 3) return AGE_GROUPS.TODDLER;
  if (ageYears >= 4 && ageYears <= 5) return AGE_GROUPS.PRESCHOOL;
  if (ageYears >= 6 && ageYears <= 8) return AGE_GROUPS.SCHOOL;
  
  // Default fallback
  if (ageYears < 2) return AGE_GROUPS.TODDLER;
  return AGE_GROUPS.SCHOOL;
}

// Ages 2-3 Questions
const QUESTIONS_2_3 = [
  {
    id: 1,
    text: 'When shown four items and asked, "Which one do we use for eating?", your child:',
    options: {
      A: 'Picks the spoon',
      B: 'Hesitates, then guesses',
      C: 'Picks randomly or doesn\'t respond'
    },
    domain: 'speech_language',
    points: { A: 2, B: 1, C: 0 }
  },
  {
    id: 2,
    text: 'Your child is asked to complete this sentence: "The cow says…"',
    options: {
      A: '"Moo" or similar sound',
      B: 'Looks confused',
      C: 'Repeats "cow" or is silent'
    },
    domain: 'speech_language',
    points: { A: 2, B: 1, C: 0 }
  },
  {
    id: 3,
    text: 'When you change one detail in a routine (e.g., wear shoes before trousers), your child:',
    options: {
      A: 'Notices and comments/questions',
      B: 'Doesn\'t notice',
      C: 'Gets upset or confused'
    },
    domain: 'cognitive',
    points: { A: 2, B: 1, C: 0 }
  },
  {
    id: 4,
    text: 'If you say: "Touch your head, then clap your hands," your child:',
    options: {
      A: 'Does both correctly',
      B: 'Does only one',
      C: 'Doesn\'t respond'
    },
    domain: 'speech_language',
    points: { A: 2, B: 1, C: 0 }
  },
  {
    id: 5,
    text: 'You show your child a banana and an orange and ask: "Which one do you peel?"',
    options: {
      A: 'Selects banana',
      B: 'Confused or silent',
      C: 'Picks randomly'
    },
    domain: 'cognitive',
    points: { A: 2, B: 1, C: 0 }
  },
  {
    id: 6,
    text: 'Which best describes your child\'s pretend play?',
    options: {
      A: 'Imitates adults (e.g., feeding doll)',
      B: 'Only mimics real activities (e.g., sweeping)',
      C: 'Doesn\'t engage in pretend play'
    },
    domain: 'cognitive',
    points: { A: 2, B: 1, C: 0 }
  },
  {
    id: 7,
    text: 'If shown a ball, a spoon, a plate, and a shoe and asked, "Which one is not like the others?", your child:',
    options: {
      A: 'Points to the ball (not for eating/wearing)',
      B: 'Guesses',
      C: 'Doesn\'t understand'
    },
    domain: 'cognitive',
    points: { A: 2, B: 1, C: 0 }
  },
  {
    id: 8,
    text: 'Can your child recognize and say their name when asked: "What\'s your name?"',
    options: {
      A: 'Yes',
      B: 'Sometimes',
      C: 'No'
    },
    domain: 'speech_language',
    points: { A: 2, B: 1, C: 0 }
  },
  {
    id: 9,
    text: 'When asked, "Where do you sleep?" your child says or points to:',
    options: {
      A: 'Bed or bedroom',
      B: 'Any unrelated item',
      C: 'Doesn\'t respond'
    },
    domain: 'speech_language',
    points: { A: 2, B: 1, C: 0 }
  },
  {
    id: 10,
    text: 'If you sing the beginning of a song your child knows (e.g., "Twinkle twinkle…"), they:',
    options: {
      A: 'Continue the next part',
      B: 'Smile but don\'t continue',
      C: 'Uninterested or silent'
    },
    domain: 'speech_language',
    points: { A: 2, B: 1, C: 0 }
  },
  {
    id: 11,
    text: 'If Talktu offered a personalized platform with AI-powered learning tools, progress tracking, and expert support for your child, how much would you be willing to pay per month (in Naira)?',
    domain: 'pricing',
    isTextInput: true,
    inputType: 'number',
    placeholder: 'Enter amount in Naira (e.g., 10000)',
    options: {},
    points: { A: 0, B: 0, C: 0 } // Does not affect scoring
  }
];

// Ages 4-5 Questions
const QUESTIONS_4_5 = [
  {
    id: 1,
    text: 'When shown 4 words: "dog, door, sun, doll" — and asked "Which 2 start with the same sound?", your child:',
    options: {
      A: 'Says "dog and doll"',
      B: 'Needs help',
      C: 'Can\'t identify'
    },
    domain: 'literacy',
    points: { A: 2, B: 1, C: 0 }
  },
  {
    id: 2,
    text: 'If you ask your child to explain why we wear raincoats when it rains, they:',
    options: {
      A: 'Say, "So we don\'t get wet" or similar',
      B: 'Give a vague answer',
      C: 'Say, "I don\'t know"'
    },
    domain: 'speech_language',
    points: { A: 2, B: 1, C: 0 }
  },
  {
    id: 3,
    text: 'When given a basic pattern (e.g., red, blue, red, blue...), your child can:',
    options: {
      A: 'Continue the pattern',
      B: 'Needs help',
      C: 'Struggles completely'
    },
    domain: 'numeracy',
    points: { A: 2, B: 1, C: 0 }
  },
  {
    id: 4,
    text: 'When told: "Draw a picture of your house and family," your child:',
    options: {
      A: 'Draws identifiable figures/details',
      B: 'Draws scribbles with some attempt',
      C: 'Avoids or doesn\'t try'
    },
    domain: 'cognitive',
    points: { A: 2, B: 1, C: 0 }
  },
  {
    id: 5,
    text: 'You ask: "Which is heavier: a feather or a rock?" Your child:',
    options: {
      A: 'Says "rock"',
      B: 'Guesses',
      C: 'Doesn\'t understand the question'
    },
    domain: 'cognitive',
    points: { A: 2, B: 1, C: 0 }
  },
  {
    id: 6,
    text: 'Can your child rhyme words (e.g., "cat" and "hat")?',
    options: {
      A: 'Yes',
      B: 'Sometimes',
      C: 'No'
    },
    domain: 'literacy',
    points: { A: 2, B: 1, C: 0 }
  },
  {
    id: 7,
    text: 'When asked to clap out syllables in "butterfly," your child:',
    options: {
      A: 'Claps 3 times',
      B: 'Claps incorrectly',
      C: 'Doesn\'t understand'
    },
    domain: 'literacy',
    points: { A: 2, B: 1, C: 0 }
  },
  {
    id: 8,
    text: 'Your child is shown 4 pictures: "dog, cat, bus, goat." Asked, "Which one is used for transport?", they:',
    options: {
      A: 'Pick "bus"',
      B: 'Guess randomly',
      C: 'Pick an animal'
    },
    domain: 'cognitive',
    points: { A: 2, B: 1, C: 0 }
  },
  {
    id: 9,
    text: 'Asked to solve: "You have 2 sweets, your friend gives you 2 more, how many now?"',
    options: {
      A: 'Says "4"',
      B: 'Counts slowly',
      C: 'Doesn\'t know'
    },
    domain: 'numeracy',
    points: { A: 2, B: 1, C: 0 }
  },
  {
    id: 10,
    text: 'When looking at a storybook, your child:',
    options: {
      A: 'Describes what\'s happening using details',
      B: 'Names objects',
      C: 'Silent or uninterested'
    },
    domain: 'speech_language',
    points: { A: 2, B: 1, C: 0 }
  },
  {
    id: 11,
    text: 'If Talktu offered a personalized platform with AI-powered learning tools, progress tracking, and expert support for your child, how much would you be willing to pay per month (in Naira)?',
    domain: 'pricing',
    isTextInput: true,
    inputType: 'number',
    placeholder: 'Enter amount in Naira (e.g., 10000)',
    options: {},
    points: { A: 0, B: 0, C: 0 } // Does not affect scoring
  }
];

// Ages 6-8 Questions
const QUESTIONS_6_8 = [
  {
    id: 1,
    text: 'Your child is told: "If all apples are red, and this is an apple, what color is it?"',
    options: {
      A: 'Says "Red"',
      B: 'Hesitates',
      C: 'Gets confused'
    },
    domain: 'cognitive',
    points: { A: 2, B: 1, C: 0 }
  },
  {
    id: 2,
    text: 'If given a passage like: "Tayo forgot his umbrella. It rained. He got wet." Asked: "Why did Tayo get wet?"',
    options: {
      A: 'Says, "Because he forgot umbrella"',
      B: 'Says "It rained"',
      C: 'Doesn\'t connect the ideas'
    },
    domain: 'literacy',
    points: { A: 2, B: 1, C: 0 }
  },
  {
    id: 3,
    text: 'Which sentence is grammatically correct?',
    options: {
      A: 'He runned fast',
      B: 'He ran fast',
      C: 'Him fast run'
    },
    domain: 'speech_language',
    points: { A: 0, B: 2, C: 0 } // Note: B is correct here
  },
  {
    id: 4,
    text: 'Which best describes your child\'s reading ability?',
    options: {
      A: 'Reads fluently with understanding',
      B: 'Can read but skips or guesses',
      C: 'Struggles with full sentences'
    },
    domain: 'literacy',
    points: { A: 2, B: 1, C: 0 }
  },
  {
    id: 5,
    text: 'Asked to solve: "Amaka has 5 pencils. She gives 2 away. How many left?"',
    options: {
      A: 'Says "3"',
      B: 'Guesses',
      C: 'Struggles'
    },
    domain: 'numeracy',
    points: { A: 2, B: 1, C: 0 }
  },
  {
    id: 6,
    text: 'You say: "Tell me 3 things that are round." Your child says:',
    options: {
      A: 'Ball, orange, wheel',
      B: 'Two items',
      C: 'Cannot name any'
    },
    domain: 'speech_language',
    points: { A: 2, B: 1, C: 0 }
  },
  {
    id: 7,
    text: 'If shown the word "big" and asked for the opposite, your child says:',
    options: {
      A: 'Small',
      B: 'Another unrelated word',
      C: 'Doesn\'t answer'
    },
    domain: 'literacy',
    points: { A: 2, B: 1, C: 0 }
  },
  {
    id: 8,
    text: 'You say: "The boy is taller than the girl. The girl is taller than the baby. Who is the shortest?"',
    options: {
      A: 'Says "The baby"',
      B: 'Guesses incorrectly',
      C: 'Doesn\'t answer'
    },
    domain: 'cognitive',
    points: { A: 2, B: 1, C: 0 }
  },
  {
    id: 9,
    text: 'How does your child write a short story prompt like: "The day I lost my shoe…"?',
    options: {
      A: 'Writes 3–5 well-structured sentences',
      B: 'Writes a few phrases',
      C: 'Doesn\'t know what to write'
    },
    domain: 'literacy',
    points: { A: 2, B: 1, C: 0 }
  },
  {
    id: 10,
    text: 'When you say: "After you finish eating, go wash your hands and pack your plate," your child:',
    options: {
      A: 'Follows the full instruction',
      B: 'Needs reminding',
      C: 'Forgets or does only one'
    },
    domain: 'cognitive',
    points: { A: 2, B: 1, C: 0 }
  },
  {
    id: 11,
    text: 'If Talktu offered a personalized platform with AI-powered learning tools, progress tracking, and expert support for your child, how much would you be willing to pay per month (in Naira)?',
    domain: 'pricing',
    isTextInput: true,
    inputType: 'number',
    placeholder: 'Enter amount in Naira (e.g., 10000)',
    options: {},
    points: { A: 0, B: 0, C: 0 } // Does not affect scoring
  }
];

// Get questions for specific age group
function getQuestionsByAge(ageYears) {
  const ageGroup = getAgeGroup(ageYears);
  
  switch (ageGroup) {
    case AGE_GROUPS.TODDLER:
      return { ageGroup, questions: QUESTIONS_2_3, title: '👶 Ages 2–3 Years: Emerging Comprehension & Early Expression' };
    case AGE_GROUPS.PRESCHOOL:
      return { ageGroup, questions: QUESTIONS_4_5, title: '👧🏽 Ages 4–5 Years: Pre-Academic Readiness & Verbal Reasoning' };
    case AGE_GROUPS.SCHOOL:
      return { ageGroup, questions: QUESTIONS_6_8, title: '👦🏿 Ages 6–8 Years: Literacy, Math Reasoning, Comprehension' };
    default:
      return { ageGroup: AGE_GROUPS.SCHOOL, questions: QUESTIONS_6_8, title: '👦🏿 Ages 6–8 Years: Literacy, Math Reasoning, Comprehension' };
  }
}

// Age-specific scoring thresholds
const THRESHOLDS = {
  '2-3': {
    maxScore: 20,
    excellent: { min: 16, max: 20, level: 'Age-Appropriate Development' },
    moderate: { min: 10, max: 15, level: 'Some Delays - Monitor Closely' },
    concern: { min: 0, max: 9, level: 'Significant Delays - Assessment Recommended' }
  },
  '4-5': {
    maxScore: 20,
    excellent: { min: 16, max: 20, level: 'School-Ready' },
    moderate: { min: 10, max: 15, level: 'Needs Support in Some Areas' },
    concern: { min: 0, max: 9, level: 'Pre-Literacy/Numeracy Intervention Needed' }
  },
  '6-8': {
    maxScore: 20,
    excellent: { min: 16, max: 20, level: 'Grade-Level Proficiency' },
    moderate: { min: 10, max: 15, level: 'Below Grade Level - Tutoring Recommended' },
    concern: { min: 0, max: 9, level: 'Significant Learning Gaps - Intervention Required' }
  }
};

module.exports = {
  AGE_GROUPS,
  getAgeGroup,
  getQuestionsByAge,
  QUESTIONS_2_3,
  QUESTIONS_4_5,
  QUESTIONS_6_8,
  THRESHOLDS
};
