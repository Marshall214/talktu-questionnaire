/**
 * Age-Based Questionnaire Data for Frontend
 * Matches backend questionsByAge.js structure
 */

// Age group definitions
export const AGE_GROUPS = {
  TODDLER: '2-3',    // 24-47 months
  PRESCHOOL: '4-5',  // 48-71 months
  SCHOOL: '6-8'      // 72-107 months
};

// Determine age group from child's age in years
export function getAgeGroup(ageYears) {
  if (ageYears >= 2 && ageYears <= 3) return AGE_GROUPS.TODDLER;
  if (ageYears >= 4 && ageYears <= 5) return AGE_GROUPS.PRESCHOOL;
  if (ageYears >= 6 && ageYears <= 8) return AGE_GROUPS.SCHOOL;
  
  // Default fallback
  if (ageYears < 2) return AGE_GROUPS.TODDLER;
  return AGE_GROUPS.SCHOOL;
}

// Ages 2-3 Questions
export const QUESTIONS_2_3 = [
  {
    id: 1,
    text: 'When shown four items and asked, "Which one do we use for eating?", your child:',
    options: [
      { value: 'A', label: 'Picks the spoon' },
      { value: 'B', label: 'Hesitates, then guesses' },
      { value: 'C', label: 'Picks randomly or doesn\'t respond' }
    ],
    domain: 'speech_language'
  },
  {
    id: 2,
    text: 'Your child is asked to complete this sentence: "The cow says…"',
    options: [
      { value: 'A', label: '"Moo" or similar sound' },
      { value: 'B', label: 'Looks confused' },
      { value: 'C', label: 'Repeats "cow" or is silent' }
    ],
    domain: 'speech_language'
  },
  {
    id: 3,
    text: 'When you change one detail in a routine (e.g., wear shoes before trousers), your child:',
    options: [
      { value: 'A', label: 'Notices and comments/questions' },
      { value: 'B', label: 'Doesn\'t notice' },
      { value: 'C', label: 'Gets upset or confused' }
    ],
    domain: 'cognitive'
  },
  {
    id: 4,
    text: 'If you say: "Touch your head, then clap your hands," your child:',
    options: [
      { value: 'A', label: 'Does both correctly' },
      { value: 'B', label: 'Does only one' },
      { value: 'C', label: 'Doesn\'t respond' }
    ],
    domain: 'speech_language'
  },
  {
    id: 5,
    text: 'You show your child a banana and an orange and ask: "Which one do you peel?"',
    options: [
      { value: 'A', label: 'Selects banana' },
      { value: 'B', label: 'Confused or silent' },
      { value: 'C', label: 'Picks randomly' }
    ],
    domain: 'cognitive'
  },
  {
    id: 6,
    text: 'Which best describes your child\'s pretend play?',
    options: [
      { value: 'A', label: 'Imitates adults (e.g., feeding doll)' },
      { value: 'B', label: 'Only mimics real activities (e.g., sweeping)' },
      { value: 'C', label: 'Doesn\'t engage in pretend play' }
    ],
    domain: 'cognitive'
  },
  {
    id: 7,
    text: 'If shown a ball, a spoon, a plate, and a shoe and asked, "Which one is not like the others?", your child:',
    options: [
      { value: 'A', label: 'Points to the ball (not for eating/wearing)' },
      { value: 'B', label: 'Guesses' },
      { value: 'C', label: 'Doesn\'t understand' }
    ],
    domain: 'cognitive'
  },
  {
    id: 8,
    text: 'Can your child recognize and say their name when asked: "What\'s your name?"',
    options: [
      { value: 'A', label: 'Yes' },
      { value: 'B', label: 'Sometimes' },
      { value: 'C', label: 'No' }
    ],
    domain: 'speech_language'
  },
  {
    id: 9,
    text: 'When asked, "Where do you sleep?" your child says or points to:',
    options: [
      { value: 'A', label: 'Bed or bedroom' },
      { value: 'B', label: 'Any unrelated item' },
      { value: 'C', label: 'Doesn\'t respond' }
    ],
    domain: 'speech_language'
  },
  {
    id: 10,
    text: 'If you sing the beginning of a song your child knows (e.g., "Twinkle twinkle…"), they:',
    options: [
      { value: 'A', label: 'Continue the next part' },
      { value: 'B', label: 'Smile but don\'t continue' },
      { value: 'C', label: 'Uninterested or silent' }
    ],
    domain: 'speech_language'
  },
  {
    id: 11,
    text: 'If Talktu offered a personalized platform with AI-powered learning tools, progress tracking, and expert support for your child, how much would you be willing to pay per month (in Naira)?',
    domain: 'pricing',
    isTextInput: true,
    inputType: 'number',
    placeholder: 'Enter amount in Naira (e.g., 10000)',
    options: []
  }
];

// Ages 4-5 Questions
export const QUESTIONS_4_5 = [
  {
    id: 1,
    text: 'When shown 4 words: "dog, door, sun, doll" — and asked "Which 2 start with the same sound?", your child:',
    options: [
      { value: 'A', label: 'Says "dog and doll"' },
      { value: 'B', label: 'Needs help' },
      { value: 'C', label: 'Can\'t identify' }
    ],
    domain: 'literacy'
  },
  {
    id: 2,
    text: 'If you ask your child to explain why we wear raincoats when it rains, they:',
    options: [
      { value: 'A', label: 'Say, "So we don\'t get wet" or similar' },
      { value: 'B', label: 'Give a vague answer' },
      { value: 'C', label: 'Say, "I don\'t know"' }
    ],
    domain: 'speech_language'
  },
  {
    id: 3,
    text: 'When given a basic pattern (e.g., red, blue, red, blue...), your child can:',
    options: [
      { value: 'A', label: 'Continue the pattern' },
      { value: 'B', label: 'Needs help' },
      { value: 'C', label: 'Struggles completely' }
    ],
    domain: 'numeracy'
  },
  {
    id: 4,
    text: 'When told: "Draw a picture of your house and family," your child:',
    options: [
      { value: 'A', label: 'Draws identifiable figures/details' },
      { value: 'B', label: 'Draws scribbles with some attempt' },
      { value: 'C', label: 'Avoids or doesn\'t try' }
    ],
    domain: 'cognitive'
  },
  {
    id: 5,
    text: 'You ask: "Which is heavier: a feather or a rock?" Your child:',
    options: [
      { value: 'A', label: 'Says "rock"' },
      { value: 'B', label: 'Guesses' },
      { value: 'C', label: 'Doesn\'t understand the question' }
    ],
    domain: 'cognitive'
  },
  {
    id: 6,
    text: 'Can your child rhyme words (e.g., "cat" and "hat")?',
    options: [
      { value: 'A', label: 'Yes' },
      { value: 'B', label: 'Sometimes' },
      { value: 'C', label: 'No' }
    ],
    domain: 'literacy'
  },
  {
    id: 7,
    text: 'When asked to clap out syllables in "butterfly," your child:',
    options: [
      { value: 'A', label: 'Claps 3 times' },
      { value: 'B', label: 'Claps incorrectly' },
      { value: 'C', label: 'Doesn\'t understand' }
    ],
    domain: 'literacy'
  },
  {
    id: 8,
    text: 'Your child is shown 4 pictures: "dog, cat, bus, goat." Asked, "Which one is used for transport?", they:',
    options: [
      { value: 'A', label: 'Pick "bus"' },
      { value: 'B', label: 'Guess randomly' },
      { value: 'C', label: 'Pick an animal' }
    ],
    domain: 'cognitive'
  },
  {
    id: 9,
    text: 'Asked to solve: "You have 2 sweets, your friend gives you 2 more, how many now?"',
    options: [
      { value: 'A', label: 'Says "4"' },
      { value: 'B', label: 'Counts slowly' },
      { value: 'C', label: 'Doesn\'t know' }
    ],
    domain: 'numeracy'
  },
  {
    id: 10,
    text: 'When looking at a storybook, your child:',
    options: [
      { value: 'A', label: 'Describes what\'s happening using details' },
      { value: 'B', label: 'Names objects' },
      { value: 'C', label: 'Silent or uninterested' }
    ],
    domain: 'speech_language'
  },
  {
    id: 11,
    text: 'If Talktu offered a personalized platform with AI-powered learning tools, progress tracking, and expert support for your child, how much would you be willing to pay per month (in Naira)?',
    domain: 'pricing',
    isTextInput: true,
    inputType: 'number',
    placeholder: 'Enter amount in Naira (e.g., 10000)',
    options: []
  }
];

// Ages 6-8 Questions
export const QUESTIONS_6_8 = [
  {
    id: 1,
    text: 'Your child is told: "If all apples are red, and this is an apple, what color is it?"',
    options: [
      { value: 'A', label: 'Says "Red"' },
      { value: 'B', label: 'Hesitates' },
      { value: 'C', label: 'Gets confused' }
    ],
    domain: 'cognitive'
  },
  {
    id: 2,
    text: 'If given a passage like: "Tayo forgot his umbrella. It rained. He got wet." Asked: "Why did Tayo get wet?"',
    options: [
      { value: 'A', label: 'Says, "Because he forgot umbrella"' },
      { value: 'B', label: 'Says "It rained"' },
      { value: 'C', label: 'Doesn\'t connect the ideas' }
    ],
    domain: 'literacy'
  },
  {
    id: 3,
    text: 'Which sentence is grammatically correct?',
    options: [
      { value: 'A', label: 'He runned fast' },
      { value: 'B', label: 'He ran fast' },
      { value: 'C', label: 'Him fast run' }
    ],
    domain: 'speech_language'
  },
  {
    id: 4,
    text: 'Which best describes your child\'s reading ability?',
    options: [
      { value: 'A', label: 'Reads fluently with understanding' },
      { value: 'B', label: 'Can read but skips or guesses' },
      { value: 'C', label: 'Struggles with full sentences' }
    ],
    domain: 'literacy'
  },
  {
    id: 5,
    text: 'Asked to solve: "Amaka has 5 pencils. She gives 2 away. How many left?"',
    options: [
      { value: 'A', label: 'Says "3"' },
      { value: 'B', label: 'Guesses' },
      { value: 'C', label: 'Struggles' }
    ],
    domain: 'numeracy'
  },
  {
    id: 6,
    text: 'You say: "Tell me 3 things that are round." Your child says:',
    options: [
      { value: 'A', label: 'Ball, orange, wheel' },
      { value: 'B', label: 'Two items' },
      { value: 'C', label: 'Cannot name any' }
    ],
    domain: 'speech_language'
  },
  {
    id: 7,
    text: 'If shown the word "big" and asked for the opposite, your child says:',
    options: [
      { value: 'A', label: 'Small' },
      { value: 'B', label: 'Another unrelated word' },
      { value: 'C', label: 'Doesn\'t answer' }
    ],
    domain: 'literacy'
  },
  {
    id: 8,
    text: 'You say: "The boy is taller than the girl. The girl is taller than the baby. Who is the shortest?"',
    options: [
      { value: 'A', label: 'Says "The baby"' },
      { value: 'B', label: 'Guesses incorrectly' },
      { value: 'C', label: 'Doesn\'t answer' }
    ],
    domain: 'cognitive'
  },
  {
    id: 9,
    text: 'How does your child write a short story prompt like: "The day I lost my shoe…"?',
    options: [
      { value: 'A', label: 'Writes 3–5 well-structured sentences' },
      { value: 'B', label: 'Writes a few phrases' },
      { value: 'C', label: 'Doesn\'t know what to write' }
    ],
    domain: 'literacy'
  },
  {
    id: 10,
    text: 'When you say: "After you finish eating, go wash your hands and pack your plate," your child:',
    options: [
      { value: 'A', label: 'Follows the full instruction' },
      { value: 'B', label: 'Needs reminding' },
      { value: 'C', label: 'Forgets or does only one' }
    ],
    domain: 'cognitive'
  },
  {
    id: 11,
    text: 'If Talktu offered a personalized platform with AI-powered learning tools, progress tracking, and expert support for your child, how much would you be willing to pay per month (in Naira)?',
    domain: 'pricing',
    isTextInput: true,
    inputType: 'number',
    placeholder: 'Enter amount in Naira (e.g., 10000)',
    options: []
  }
];

// Get questions for specific age group
export function getQuestionsByAge(ageYears) {
  const ageGroup = getAgeGroup(ageYears);
  
  switch (ageGroup) {
    case AGE_GROUPS.TODDLER:
      return { 
        ageGroup, 
        questions: QUESTIONS_2_3, 
        title: '👶 Ages 2–3 Years: Emerging Comprehension & Early Expression',
        subtitle: 'Focus: Expressive language, auditory memory, symbolic thinking, categorization'
      };
    case AGE_GROUPS.PRESCHOOL:
      return { 
        ageGroup, 
        questions: QUESTIONS_4_5, 
        title: '👧🏽 Ages 4–5 Years: Pre-Academic Readiness & Verbal Reasoning',
        subtitle: 'Focus: Letter-sound awareness, storytelling, math concepts, logic, attention'
      };
    case AGE_GROUPS.SCHOOL:
      return { 
        ageGroup, 
        questions: QUESTIONS_6_8, 
        title: '👦🏿 Ages 6–8 Years: Literacy, Math Reasoning, Comprehension',
        subtitle: 'Focus: Reading fluency, problem-solving, logical inferences, self-expression, memory'
      };
    default:
      return { 
        ageGroup: AGE_GROUPS.SCHOOL, 
        questions: QUESTIONS_6_8, 
        title: '👦🏿 Ages 6–8 Years: Literacy, Math Reasoning, Comprehension',
        subtitle: 'Focus: Reading fluency, problem-solving, logical inferences, self-expression, memory'
      };
  }
}
