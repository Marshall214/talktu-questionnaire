export const QUESTIONS = [
  {
    number: 1,
    domain: 'speech_language',
    question: 'When you ask your child a simple question (e.g., "What is your name?" or "What are you doing?"), they usually:',
    options: [
      { value: 'A', label: 'Answer clearly with full sentences', emoji: '✅' },
      { value: 'B', label: 'Give short or unclear answers', emoji: '🤔' },
      { value: 'C', label: 'Repeat the question or stay silent', emoji: '😶' },
      { value: 'D', label: 'Say unrelated words', emoji: '❓' }
    ]
  },
  {
    number: 2,
    domain: 'speech_language',
    question: 'How many words does your child use regularly in conversation?',
    options: [
      { value: 'A', label: 'Over 200 words and growing', emoji: '📚' },
      { value: 'B', label: '50–200 words', emoji: '📖' },
      { value: 'C', label: 'Less than 50 words', emoji: '📝' },
      { value: 'D', label: 'Mostly babbles or gestures', emoji: '👶' }
    ]
  },
  {
    number: 3,
    domain: 'speech_language',
    question: 'When you give a two-step instruction like "Pick up your book and sit down," your child:',
    options: [
      { value: 'A', label: 'Follows both steps correctly', emoji: '✅' },
      { value: 'B', label: 'Follows one step only', emoji: '½' },
      { value: 'C', label: 'Needs prompting or repetition', emoji: '🔁' },
      { value: 'D', label: "Doesn't understand the instruction", emoji: '❓' }
    ]
  },
  {
    number: 4,
    domain: 'cognitive',
    question: 'When faced with a simple challenge (e.g., a puzzle or toy that\'s stuck), your child:',
    options: [
      { value: 'A', label: 'Tries different ways until it works', emoji: '🧩' },
      { value: 'B', label: 'Waits for help', emoji: '🙋' },
      { value: 'C', label: 'Gives up quickly', emoji: '😔' },
      { value: 'D', label: 'Ignores the task', emoji: '🚫' }
    ]
  },
  {
    number: 5,
    domain: 'literacy',
    question: 'When shown letters or words, your child:',
    options: [
      { value: 'A', label: 'Recognizes many letters and can read some short words', emoji: '📖' },
      { value: 'B', label: 'Knows a few letters or sounds', emoji: '�' },
      { value: 'C', label: 'Only recognizes pictures', emoji: '🖼️' },
      { value: 'D', label: 'Shows no interest', emoji: '😐' }
    ]
  },
  {
    number: 6,
    domain: 'numeracy',
    question: 'Your child can comfortably:',
    options: [
      { value: 'A', label: 'Count to 20 or beyond and compare quantities', emoji: '🔢' },
      { value: 'B', label: 'Count to 10 with help', emoji: '🔟' },
      { value: 'C', label: 'Count to 5 or fewer', emoji: '5️⃣' },
      { value: 'D', label: 'Cannot count yet', emoji: '❌' }
    ]
  },
  {
    number: 7,
    domain: 'numeracy',
    question: 'If you show two groups (e.g., 3 apples and 5 apples), can your child tell which one has more?',
    options: [
      { value: 'A', label: 'Yes, always', emoji: '✅' },
      { value: 'B', label: 'Sometimes', emoji: '🤷' },
      { value: 'C', label: 'Rarely', emoji: '😕' },
      { value: 'D', label: 'Not yet', emoji: '❌' }
    ]
  },
  {
    number: 8,
    domain: 'cognitive',
    question: 'When given crayons or scissors, your child:',
    options: [
      { value: 'A', label: 'Draws shapes or cuts neatly', emoji: '✂️' },
      { value: 'B', label: 'Scribbles or cuts roughly', emoji: '✏️' },
      { value: 'C', label: 'Holds tools awkwardly', emoji: '🖍️' },
      { value: 'D', label: 'Avoids using them', emoji: '🚫' }
    ]
  },
  {
    number: 9,
    domain: 'speech_language',
    question: 'When talking to someone new, your child\'s speech is:',
    options: [
      { value: 'A', label: 'Easy to understand', emoji: '🗣️' },
      { value: 'B', label: 'Understandable only by family', emoji: '👨‍👩‍👧' },
      { value: 'C', label: 'Often unclear or mumbled', emoji: '🤐' },
      { value: 'D', label: 'Mostly gestures or single sounds', emoji: '🤲' }
    ]
  },
  {
    number: 10,
    domain: 'cognitive',
    question: 'When doing a short task (e.g., listening to a story or completing an activity), your child:',
    options: [
      { value: 'A', label: 'Focuses for 10 minutes or more', emoji: '⏱️' },
      { value: 'B', label: 'Focuses 3–5 minutes', emoji: '⏳' },
      { value: 'C', label: 'Gets distracted quickly', emoji: '👀' },
      { value: 'D', label: 'Cannot sit still', emoji: '🏃' }
    ]
  },
  {
    number: 11,
    domain: 'pricing',
    question: 'If TalkTu offered a personalized platform with AI-powered learning tools, progress tracking, and expert support for your child, how much would you be willing to pay per month (in Naira)?',
    isTextInput: true,
    inputType: 'number',
    placeholder: 'Enter amount in Naira (e.g., 10000)',
    options: [] // Empty for text input
  }
];

export const INTRO_MESSAGES = [
  {
    title: "Is your child's speech, learning, and attention developing as expected?",
    subtitle: "Every child learns differently, some through listening, others by doing or talking.",
    description: "Take this 2-minute Talktu Quick Check to discover how your child is learning, communicating, and growing — and find out if they might need a little extra support along the way.",
    icon: "🟣"
  },
  {
    title: "Strong speech and listening skills are the foundation of all learning",
    subtitle: "From counting to reading, everything starts with how children understand and use language.",
    description: "Take this short Talktu Parent Check to see how your child is doing across key learning areas — speech, literacy, numeracy, and focus — and get personalized insights right after.",
    icon: "🟢"
  },
  {
    title: "Do you sometimes wonder if your child is learning at the right pace?",
    subtitle: "Maybe they talk less than others, find reading tricky, or lose focus quickly.",
    description: "This quick Talktu Check helps you understand your child's learning strengths and what might need extra attention, in just 10 simple questions.",
    icon: "🔵"
  }
];

export const DOMAIN_INFO = {
  speech_language: {
    name: 'Speech & Language',
    icon: '🗣️',
    description: 'Communication and expression skills'
  },
  literacy: {
    name: 'Literacy',
    icon: '📖',
    description: 'Reading and phonics awareness'
  },
  numeracy: {
    name: 'Numeracy',
    icon: '🔢',
    description: 'Number and math concepts'
  },
  cognitive: {
    name: 'Focus & Memory',
    icon: '🧠',
    description: 'Attention, memory, and problem-solving'
  }
};
