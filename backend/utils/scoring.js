/**
 * Age-Based Hybrid Scoring System
 * Supports 3 age groups with domain-based scoring and pattern recognition
 */

const { getQuestionsByAge, getAgeGroup, THRESHOLDS } = require('./questionsByAge');

// Points mapping for age-based questions (A=2, B=1, C=0)
const POINTS_MAPPING = {
  'A': 2,
  'B': 1,
  'C': 0
};

// Legacy mapping for backward compatibility (if needed)
const DOMAIN_MAPPING = {
  1: 'speech_language',
  2: 'speech_language', 
  3: 'speech_language',
  4: 'literacy',
  5: 'literacy',
  6: 'numeracy',
  7: 'numeracy',
  8: 'cognitive',
  9: 'cognitive',
  10: 'cognitive',
  11: 'pricing'
};

/**
 * Calculate domain scores from responses with age awareness
 */
function calculateDomainScores(responses, ageYears) {
  const { questions: ageQuestions } = getQuestionsByAge(ageYears);
  
  const domains = {
    speech_language: { score: 0, max: 0, questions: [] },
    literacy: { score: 0, max: 0, questions: [] },
    numeracy: { score: 0, max: 0, questions: [] },
    cognitive: { score: 0, max: 0, questions: [] }
  };

  responses.forEach(response => {
    // Find the question from age-appropriate set
    const question = ageQuestions.find(q => q.id === response.question_number);
    
    // Exclude pricing question from domain scoring
    if (question && question.domain !== 'pricing' && domains[question.domain]) {
      const points = question.points[response.selected_option] || 0;
      
      domains[question.domain].score += points;
      domains[question.domain].max += 2; // Max 2 points per question
      domains[question.domain].questions.push({
        number: response.question_number,
        points: points,
        option: response.selected_option
      });
    }
  });

  // Calculate percentages and levels
  Object.keys(domains).forEach(key => {
    const domain = domains[key];
    domain.percentage = domain.max > 0 ? (domain.score / domain.max) * 100 : 0;
    domain.level = getDomainLevel(domain.percentage);
    domain.color = getDomainColor(domain.percentage);
  });

  return domains;
}

/**
 * Get domain level based on percentage
 */
function getDomainLevel(percentage) {
  if (percentage >= 75) return 'strong';
  if (percentage >= 50) return 'developing';
  if (percentage >= 25) return 'needs_support';
  return 'urgent';
}

/**
 * Get color code for domain
 */
function getDomainColor(percentage) {
  if (percentage >= 75) return 'green';
  if (percentage >= 50) return 'yellow';
  if (percentage >= 25) return 'orange';
  return 'red';
}

/**
 * Calculate overall score and level with age-based thresholds
 */
function calculateOverallScore(responses, ageYears) {
  let totalScore = 0;
  const { questions: ageQuestions } = getQuestionsByAge(ageYears);
  
  // Filter out pricing question (question 11) from scoring
  const scorableResponses = responses.filter(r => r.question_number !== 11);
  
  scorableResponses.forEach(response => {
    const question = ageQuestions.find(q => q.id === response.question_number);
    if (question && question.domain !== 'pricing') {
      totalScore += question.points[response.selected_option] || 0;
    }
  });

  const maxScore = scorableResponses.length * 2; // Max 2 points per question (excluding pricing)
  const percentage = maxScore > 0 ? (totalScore / maxScore) * 100 : 0;
  
  // Get age-appropriate thresholds
  const ageGroup = getAgeGroup(ageYears);
  const thresholds = THRESHOLDS[ageGroup];
  
  let level;
  if (totalScore >= thresholds.excellent.min) {
    level = thresholds.excellent.level;
  } else if (totalScore >= thresholds.moderate.min) {
    level = thresholds.moderate.level;
  } else {
    level = thresholds.concern.level;
  }

  return {
    totalScore,
    maxScore,
    percentage: Math.round(percentage * 100) / 100,
    level,
    ageGroup
  };
}

/**
 * Detect red flags (critical concerns) with age-based patterns
 */
function detectRedFlags(responses, domains, childAge) {
  const redFlags = [];
  const ageGroup = getAgeGroup(childAge);
  const { questions: ageQuestions } = getQuestionsByAge(childAge);

  // Check for C answers (0 points) - critical indicators
  const criticalAnswers = responses.filter(r => r.selected_option === 'C');
  
  // Age-specific red flag patterns
  if (ageGroup === '2-3') {
    // Ages 2-3 red flags
    if (criticalAnswers.some(a => a.question_number === 6)) {
      redFlags.push('Lack of pretend play - possible early autism indicator');
    }
    if (criticalAnswers.some(a => [4, 10].includes(a.question_number))) {
      redFlags.push('Auditory processing concern - difficulty following instructions');
    }
    if (criticalAnswers.filter(a => [1, 2, 5, 8, 9].includes(a.question_number)).length >= 3) {
      redFlags.push('Significant expressive language delay');
    }
  } else if (ageGroup === '4-5') {
    // Ages 4-5 red flags
    if (criticalAnswers.some(a => [1, 6, 7].includes(a.question_number))) {
      redFlags.push('Phonological awareness deficit - dyslexia risk indicator');
    }
    if (criticalAnswers.filter(a => [3, 9].includes(a.question_number)).length >= 2) {
      redFlags.push('Math concept delays - dyscalculia risk');
    }
    if (criticalAnswers.some(a => a.question_number === 10)) {
      redFlags.push('Narrative skills deficit - language development concern');
    }
  } else if (ageGroup === '6-8') {
    // Ages 6-8 red flags
    if (criticalAnswers.some(a => [2, 8].includes(a.question_number))) {
      redFlags.push('Reading comprehension below grade level');
    }
    if (criticalAnswers.filter(a => [5, 8, 9].includes(a.question_number)).length >= 2) {
      redFlags.push('Math reasoning significantly below grade level');
    }
    if (criticalAnswers.some(a => a.question_number === 10)) {
      redFlags.push('Executive function/working memory concern');
    }
  }

  // Domain-level red flags (universal)
  if (domains.speech_language.percentage < 30) {
    redFlags.push('Critical speech and language development delay');
  }
  if (domains.cognitive.percentage < 30) {
    redFlags.push('Significant cognitive processing concerns');
  }
  if (ageGroup !== '2-3' && domains.literacy && domains.literacy.percentage < 30) {
    redFlags.push('Severe literacy readiness concern for age group');
  }

  return redFlags;
}

/**
 * Generate personalized recommendations
 */
function generateRecommendations(domains, overall, childAge, redFlags) {
  const recommendations = [];

  // Priority 1: Address red flags first
  if (redFlags.length > 0) {
    recommendations.push({
      priority: 'urgent',
      title: 'Immediate Action Recommended',
      description: 'Consider consulting with a speech-language pathologist or child development specialist for a comprehensive evaluation.',
      icon: '🚨'
    });
  }

  // Priority 2: Domain-specific recommendations (lowest scoring first)
  const sortedDomains = Object.entries(domains).sort((a, b) => 
    a[1].percentage - b[1].percentage
  );

  sortedDomains.forEach(([key, domain]) => {
    if (domain.level === 'urgent' || domain.level === 'needs_support') {
      recommendations.push(getDomainRecommendation(key, domain, childAge));
    }
  });

  // Priority 3: Strengths to build on
  const strengths = sortedDomains.filter(([_, domain]) => domain.level === 'strong');
  if (strengths.length > 0) {
    const [strongestDomain, _] = strengths[strengths.length - 1];
    recommendations.push({
      priority: 'strength',
      title: `Excellent ${formatDomainName(strongestDomain)} Skills! 🌟`,
      description: `Your child is thriving in this area. Continue to encourage their ${formatDomainName(strongestDomain)} development through regular practice and positive reinforcement.`,
      icon: '✨'
    });
  }

  // Priority 4: General developmental tips
  if (overall.level === 'on_track' || overall.level === 'advanced') {
    recommendations.push({
      priority: 'maintain',
      title: 'Keep Up the Great Work!',
      description: 'Your child is developing well. Continue engaging in daily conversations, reading together, and playing educational games.',
      icon: '📚'
    });
  }

  return recommendations;
}

/**
 * Get domain-specific recommendation
 */
function getDomainRecommendation(domainKey, domain, childAge) {
  const recommendations = {
    speech_language: {
      urgent: {
        title: 'Speech Therapy Recommended',
        description: `Your child's speech development is significantly below expected milestones for age ${childAge}. Early intervention is crucial - children who receive speech therapy before age 5 show 70% better outcomes.`,
        icon: '🗣️',
        whatThisMeans: 'Your child may struggle to express needs, form friendships, or succeed in school without support.',
        nextSteps: 'Book a professional speech assessment with Talktu within 2 weeks. We offer affordable pediatric speech therapy (₦5,000-15,000/session).',
        activities: [
          '✓ Daily 15-min conversation practice (builds vocabulary by 30%)',
          '✓ Picture book discussions (improves sentence structure)',
          '✓ Simple question-answer games (enhances comprehension)',
          '✓ Singing songs and rhymes (strengthens pronunciation)'
        ]
      },
      needs_support: {
        title: 'Speech Practice Recommended',
        description: `Your child's language skills are developing but need focused attention. With consistent practice (3-4 sessions weekly), most children catch up within 3-6 months.`,
        icon: '🗣️',
        whatThisMeans: 'Your child can communicate but may have limited vocabulary or unclear speech, affecting confidence.',
        nextSteps: 'Try Talktu\'s guided speech exercises (free for first month) or book a consultation (₦3,000).',
        activities: [
          '✓ Name and describe objects during play (expands vocabulary)',
          '✓ Practice 2-step instructions daily (improves listening)',
          '✓ Expand on their sentences (models proper grammar)',
          '✓ Read interactive books together (builds comprehension)'
        ]
      }
    },
    literacy: {
      urgent: {
        title: childAge >= 5 ? 'Reading Support Urgently Needed' : 'Pre-Reading Skills Need Attention',
        description: childAge >= 5 
          ? `At age ${childAge}, your child should recognize letters and sounds. Without intervention, they may fall 1-2 years behind peers by Grade 2, affecting all subjects.`
          : `Building pre-literacy skills now prevents reading difficulties later. Children with strong early literacy are 85% more likely to read at grade level.`,
        icon: '📖',
        whatThisMeans: childAge >= 5 
          ? 'Risk of reading difficulties, lower confidence, and academic struggles across all subjects.'
          : 'Your child isn\'t building the foundation needed for reading success in school.',
        nextSteps: childAge >= 5
          ? 'Book a reading assessment with Talktu (₦5,000). We offer specialized literacy programs.'
          : 'Start Talktu\'s pre-reading games (free trial available).',
        activities: [
          '✓ Daily alphabet practice - 10 min (letter recognition)',
          '✓ Rhyming games during car rides (phonemic awareness)',
          '✓ Point to words while reading (print awareness)',
          '✓ Letter tracing with sand/play-doh (motor + visual)'
        ]
      },
      needs_support: {
        title: 'Reading Skills Need Strengthening',
        description: 'Your child has some literacy skills but needs more practice to become a confident reader. Daily 20-minute reading sessions can improve skills by 40% in 8 weeks.',
        icon: '📖',
        whatThisMeans: 'Your child may read slowly, avoid reading tasks, or struggle with new words.',
        nextSteps: 'Use Talktu\'s interactive reading app (₦2,000/month) or book group literacy sessions (₦8,000/month).',
        activities: [
          '✓ Read aloud 20 min daily (improves fluency & comprehension)',
          '✓ Letter-sound games with household items (phonics)',
          '✓ "I Spy" with beginning sounds (sound awareness)',
          '✓ Label items at home (environmental print)'
        ]
      }
    },
    numeracy: {
      urgent: {
        title: 'Math Skills Need Immediate Support',
        description: `Your child is struggling with basic number concepts expected at age ${childAge}. Early math skills predict future academic success more than reading skills.`,
        icon: '🔢',
        whatThisMeans: 'Difficulty with counting, quantity, and number recognition will impact all math learning and daily life skills.',
        nextSteps: 'Book a math readiness assessment (₦4,000). Talktu offers playful math tutoring (₦6,000-12,000/month).',
        activities: [
          '✓ Count everything daily - stairs, toys, food (builds number sense)',
          '✓ Compare quantities: more/less/same (critical math concept)',
          '✓ Sorting games by color/size (categorization skills)',
          '✓ Number songs & finger counting (makes math fun)'
        ]
      },
      needs_support: {
        title: 'Build Stronger Number Skills',
        description: 'Your child understands basic numbers but needs more practice for confidence. Daily number activities make math feel natural and fun.',
        icon: '🔢',
        whatThisMeans: 'Your child may count incorrectly, struggle with simple addition, or avoid number tasks.',
        nextSteps: 'Try Talktu\'s number games app (₦1,500/month) or join our math playgroup (₦10,000/month, 4 kids max).',
        activities: [
          '✓ Count objects up to 20 together (strengthens counting)',
          '✓ Number recognition games 1-10 (visual-number connection)',
          '✓ Simple addition with toys/snacks (makes math concrete)',
          '✓ Cooking & building projects (practical math skills)'
        ]
      }
    },
    cognitive: {
      urgent: {
        title: 'Attention & Focus Need Professional Evaluation',
        description: `Short attention span at age ${childAge} may indicate underlying issues. Early assessment can identify ADHD, sensory processing issues, or other needs requiring specialized support.`,
        icon: '🧠',
        whatThisMeans: 'Your child may have tantrums, difficulty following instructions, forget tasks, or struggle in structured environments like school.',
        nextSteps: 'Book a developmental assessment with Talktu\'s child psychologist (₦8,000). We also offer parent coaching (₦5,000/session).',
        activities: [
          '✓ Very short activities (2-3 min) with praise (builds stamina)',
          '✓ Memory games with 2-3 items (strengthens working memory)',
          '✓ Visual schedules with pictures (reduces anxiety)',
          '✓ Calm environment during tasks (minimizes distractions)'
        ]
      },
      needs_support: {
        title: 'Strengthen Focus & Self-Control',
        description: 'Your child has short attention span typical for age but can benefit from activities that build focus gradually. Most children show 50% improvement in 6-8 weeks.',
        icon: '🧠',
        whatThisMeans: 'Your child may lose interest quickly, have trouble waiting, or need many reminders to complete tasks.',
        nextSteps: 'Try Talktu\'s attention-building games (₦2,000/month) or book a focus skills workshop (₦7,000 one-time).',
        activities: [
          '✓ Simple puzzles 5-10 min daily (builds sustained attention)',
          '✓ Memory games starting with 3 items (working memory)',
          '✓ Finish one task before starting another (task completion)',
          '✓ Turn-taking games (impulse control & patience)'
        ]
      }
    }
  };

  const level = domain.level === 'urgent' ? 'urgent' : 'needs_support';
  const rec = recommendations[domainKey][level];

  return {
    priority: level,
    ...rec,
    domain: domainKey
  };
}

/**
 * Format domain name for display
 */
function formatDomainName(domain) {
  const names = {
    speech_language: 'Speech & Language',
    literacy: 'Literacy',
    numeracy: 'Numeracy',
    cognitive: 'Focus & Memory'
  };
  return names[domain] || domain;
}

/**
 * Main scoring function with age-based logic
 */
function calculateResults(responses, childAge) {
  const domains = calculateDomainScores(responses, childAge);
  const overall = calculateOverallScore(responses, childAge);
  const redFlags = detectRedFlags(responses, domains, childAge);
  const recommendations = generateRecommendations(domains, overall, childAge, redFlags);
  const ageGroup = getAgeGroup(childAge);

  return {
    overall,
    domains,
    redFlags,
    recommendations,
    metadata: {
      totalQuestions: responses.length,
      completedAt: new Date(),
      childAge,
      ageGroup
    }
  };
}

module.exports = {
  calculateResults,
  DOMAIN_MAPPING,
  POINTS_MAPPING,
  formatDomainName,
  getAgeGroup
};
