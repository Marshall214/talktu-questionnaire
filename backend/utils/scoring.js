/**
 * Hybrid Scoring System
 * Combines domain-based scoring with overall assessment
 * and pattern recognition for personalized recommendations
 */

// Domain mapping for questions
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
  11: 'pricing' // Not scored - just for metrics
};

// Points mapping (pricing question not scored)
const POINTS_MAPPING = {
  'A': 3,
  'B': 2,
  'C': 1,
  'D': 0,
  'E': 0, // Pricing options don't contribute to score
  'F': 0,
  'G': 0,
  'H': 0,
  'I': 0
};

/**
 * Calculate domain scores from responses
 */
function calculateDomainScores(responses) {
  const domains = {
    speech_language: { score: 0, max: 0, questions: [] },
    literacy: { score: 0, max: 0, questions: [] },
    numeracy: { score: 0, max: 0, questions: [] },
    cognitive: { score: 0, max: 0, questions: [] }
  };

  responses.forEach(response => {
    const domain = DOMAIN_MAPPING[response.question_number];
    
    // Skip pricing question (domain: 'pricing') from scoring
    if (domain && domains[domain] && domain !== 'pricing') {
      // Handle numeric values (for pricing) vs letter options (A/B/C/D)
      const points = POINTS_MAPPING[response.selected_option] !== undefined 
        ? POINTS_MAPPING[response.selected_option] 
        : 0;
      
      domains[domain].score += points;
      domains[domain].max += 3; // Max points per question
      domains[domain].questions.push({
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
 * Calculate overall score and level
 */
function calculateOverallScore(responses) {
  let totalScore = 0;
  // Only count the 10 assessment questions (exclude pricing question)
  const assessmentResponses = responses.filter(r => r.question_number <= 10);
  let maxScore = assessmentResponses.length * 3;

  assessmentResponses.forEach(response => {
    totalScore += POINTS_MAPPING[response.selected_option];
  });

  const percentage = (totalScore / maxScore) * 100;
  
  let level;
  if (percentage >= 87) level = 'advanced';
  else if (percentage >= 63) level = 'on_track';
  else if (percentage >= 37) level = 'needs_support';
  else level = 'needs_intensive_support';

  return {
    totalScore,
    maxScore,
    percentage: Math.round(percentage * 100) / 100,
    level
  };
}

/**
 * Detect red flags (critical concerns)
 */
function detectRedFlags(responses, domains, childAge) {
  const redFlags = [];

  // Check for D answers (0 points) - critical indicators
  const criticalAnswers = responses.filter(r => r.selected_option === 'D');
  
  if (criticalAnswers.length > 0) {
    criticalAnswers.forEach(answer => {
      if (answer.question_number === 1) {
        redFlags.push('Severe difficulty understanding basic instructions');
      } else if (answer.question_number === 2) {
        redFlags.push('Significant speech and expression challenges');
      } else if (answer.question_number === 9) {
        redFlags.push('Speech clarity concerns - may need speech therapy evaluation');
      } else if (answer.question_number === 8) {
        redFlags.push('Attention span concern - difficulty focusing on tasks');
      }
    });
  }

  // Domain-level red flags
  if (domains.speech_language.percentage < 25) {
    redFlags.push('Critical speech and language development delay');
  }
  if (domains.cognitive.percentage < 25 && childAge >= 4) {
    redFlags.push('Significant attention and memory concerns');
  }

  // Age-specific red flags
  if (childAge >= 5) {
    const literacyScore = domains.literacy.percentage;
    if (literacyScore < 33) {
      redFlags.push('Literacy readiness concern for age group');
    }
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
        nextSteps: 'Book a professional speech assessment with TalkTu within 2 weeks. We offer affordable pediatric speech therapy (₦5,000-15,000/session).',
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
        nextSteps: 'Try TalkTu\'s guided speech exercises (free for first month) or book a consultation (₦3,000).',
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
          ? 'Book a reading assessment with TalkTu (₦5,000). We offer specialized literacy programs.'
          : 'Start TalkTu\'s pre-reading games (free trial available).',
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
        nextSteps: 'Use TalkTu\'s interactive reading app (₦2,000/month) or book group literacy sessions (₦8,000/month).',
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
        nextSteps: 'Book a math readiness assessment (₦4,000). TalkTu offers playful math tutoring (₦6,000-12,000/month).',
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
        nextSteps: 'Try TalkTu\'s number games app (₦1,500/month) or join our math playgroup (₦10,000/month, 4 kids max).',
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
        nextSteps: 'Book a developmental assessment with TalkTu\'s child psychologist (₦8,000). We also offer parent coaching (₦5,000/session).',
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
        nextSteps: 'Try TalkTu\'s attention-building games (₦2,000/month) or book a focus skills workshop (₦7,000 one-time).',
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
 * Main scoring function
 */
function calculateResults(responses, childAge) {
  const domains = calculateDomainScores(responses);
  const overall = calculateOverallScore(responses);
  const redFlags = detectRedFlags(responses, domains, childAge);
  const recommendations = generateRecommendations(domains, overall, childAge, redFlags);

  return {
    overall,
    domains,
    redFlags,
    recommendations,
    metadata: {
      totalQuestions: responses.length,
      completedAt: new Date(),
      childAge
    }
  };
}

module.exports = {
  calculateResults,
  DOMAIN_MAPPING,
  POINTS_MAPPING,
  formatDomainName
};
