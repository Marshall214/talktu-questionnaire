const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const pool = require('../config/database');
const { calculateResults, DOMAIN_MAPPING, POINTS_MAPPING } = require('../utils/scoring');
const { getQuestionsByAge } = require('../utils/questionsByAge');
const { Parser } = require('json2csv');

/**
 * POST /api/assessment/start
 * Create a new assessment with parent and child info
 */
router.post('/start', async (req, res) => {
  try {
    const {
      parentEmail,
      parentPhone,
      parentRelationship,
      city,
      country,
      childAgeYears,
      childAgeMonths,
      childGender,
      primaryLanguage,
      concerns
    } = req.body;

    // Validate required fields
    if (!childAgeYears) {
      return res.status(400).json({ error: 'Child age is required' });
    }

    const assessmentId = uuidv4();

    const query = `
      INSERT INTO assessments (
        assessment_id, parent_email, parent_phone, parent_relationship,
        city, country, child_age_years, child_age_months, child_gender,
        primary_language, concerns
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      RETURNING assessment_id, created_at
    `;

    const values = [
      assessmentId,
      parentEmail || null,
      parentPhone || null,
      parentRelationship || null,
      city || null,
      country || null,
      childAgeYears,
      childAgeMonths || 0,
      childGender || null,
      primaryLanguage || null,
      concerns || null
    ];

    const result = await pool.query(query, values);

    res.status(201).json({
      success: true,
      assessmentId: result.rows[0].assessment_id,
      createdAt: result.rows[0].created_at
    });

  } catch (error) {
    console.error('Error starting assessment:', error);
    res.status(500).json({ error: 'Failed to start assessment' });
  }
});

/**
 * POST /api/assessment/:assessmentId/submit
 * Submit questionnaire responses and calculate results
 */
router.post('/:assessmentId/submit', async (req, res) => {
  const client = await pool.connect();
  
  try {
    const { assessmentId } = req.params;
    const { responses } = req.body;

    if (!responses || !Array.isArray(responses) || responses.length === 0) {
      return res.status(400).json({ error: 'Invalid responses data' });
    }

    await client.query('BEGIN');

    // Get child age for scoring
    const assessmentQuery = await client.query(
      'SELECT child_age_years FROM assessments WHERE assessment_id = $1',
      [assessmentId]
    );

    if (assessmentQuery.rows.length === 0) {
      await client.query('ROLLBACK');
      return res.status(404).json({ error: 'Assessment not found' });
    }

    const childAge = assessmentQuery.rows[0].child_age_years;

    // Get age-appropriate questions to determine domains and points
    const { questions: ageQuestions } = getQuestionsByAge(childAge);

    // Save responses
    for (const response of responses) {
      // Find the question from age-appropriate set
      const question = ageQuestions.find(q => q.id === response.questionNumber);
      const domain = question ? question.domain : 'unknown';
      const points = question ? (question.points[response.selectedOption] || 0) : 0;

      await client.query(
        `INSERT INTO responses (assessment_id, question_number, question_text, selected_option, points, domain)
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [assessmentId, response.questionNumber, response.questionText, response.selectedOption, points, domain]
      );
    }

    // Calculate results using hybrid scoring system
    const scoringData = responses.map(r => ({
      question_number: r.questionNumber,
      selected_option: r.selectedOption
    }));

    const results = calculateResults(scoringData, childAge);

    // Extract pricing preference (question 11) - now a numeric value
    const pricingResponse = responses.find(r => r.questionNumber === 11);
    const pricingPreference = pricingResponse ? parseInt(pricingResponse.selectedOption) || null : null;

    // Save results to database
    await client.query(
      `INSERT INTO results (
        assessment_id, age_group, total_score, max_score, overall_percentage, overall_level,
        speech_language_score, speech_language_max, speech_language_percentage, speech_language_level,
        literacy_score, literacy_max, literacy_percentage, literacy_level,
        numeracy_score, numeracy_max, numeracy_percentage, numeracy_level,
        cognitive_score, cognitive_max, cognitive_percentage, cognitive_level,
        pricing_preference, red_flags, recommendations
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25)`,
      [
        assessmentId,
        results.metadata.ageGroup,
        results.overall.totalScore,
        results.overall.maxScore,
        results.overall.percentage,
        results.overall.level,
        results.domains.speech_language.score,
        results.domains.speech_language.max,
        results.domains.speech_language.percentage,
        results.domains.speech_language.level,
        results.domains.literacy.score,
        results.domains.literacy.max,
        results.domains.literacy.percentage,
        results.domains.literacy.level,
        results.domains.numeracy.score,
        results.domains.numeracy.max,
        results.domains.numeracy.percentage,
        results.domains.numeracy.level,
        results.domains.cognitive.score,
        results.domains.cognitive.max,
        results.domains.cognitive.percentage,
        results.domains.cognitive.level,
        pricingPreference,
        results.redFlags,
        results.recommendations
      ]
    );

    // Mark assessment as completed
    await client.query(
      'UPDATE assessments SET completed = true, completed_at = CURRENT_TIMESTAMP WHERE assessment_id = $1',
      [assessmentId]
    );

    await client.query('COMMIT');

    res.json({
      success: true,
      assessmentId,
      results
    });

  } catch (error) {
    await client.query('ROLLBACK');
    console.error('❌ Error submitting assessment:', error);
    console.error('Error details:', {
      message: error.message,
      stack: error.stack,
      detail: error.detail,
      code: error.code
    });
    res.status(500).json({ 
      error: 'Failed to submit assessment',
      details: error.message 
    });
  } finally {
    client.release();
  }
});

/**
 * GET /api/assessment/:assessmentId/results
 * Get results for a specific assessment
 */
router.get('/:assessmentId/results', async (req, res) => {
  try {
    const { assessmentId } = req.params;

    const query = `
      SELECT r.*, a.child_age_years, a.child_gender, a.created_at as assessment_date
      FROM results r
      JOIN assessments a ON r.assessment_id = a.assessment_id
      WHERE r.assessment_id = $1
    `;

    const result = await pool.query(query, [assessmentId]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Results not found' });
    }

    const data = result.rows[0];

    // PostgreSQL arrays are already parsed by node-postgres
    // No need for JSON.parse - they come as arrays already
    data.red_flags = data.red_flags || [];
    data.recommendations = data.recommendations || [];

    res.json({
      success: true,
      results: data
    });

  } catch (error) {
    console.error('Error fetching results:', error);
    res.status(500).json({ error: 'Failed to fetch results' });
  }
});

/**
 * GET /api/assessment/export/csv
 * Export all assessments to CSV
 */
router.get('/export/csv', async (req, res) => {
  try {
    const query = `
      SELECT 
        a.assessment_id,
        a.created_at,
        a.parent_email,
        a.parent_phone,
        a.parent_relationship,
        a.city,
        a.country,
        a.child_age_years,
        a.child_age_months,
        a.child_gender,
        a.primary_language,
        a.concerns,
        a.platform_interest,
        r.age_group,
        r.total_score,
        r.overall_percentage,
        r.overall_level,
        r.speech_language_percentage,
        r.literacy_percentage,
        r.numeracy_percentage,
        r.cognitive_percentage,
        r.pricing_preference
      FROM assessments a
      LEFT JOIN results r ON a.assessment_id = r.assessment_id
      WHERE a.completed = true
      ORDER BY a.created_at DESC
    `;

    const result = await pool.query(query);

    const parser = new Parser();
    const csv = parser.parse(result.rows);

    res.header('Content-Type', 'text/csv');
    res.header('Content-Disposition', 'attachment; filename=talktu_assessments.csv');
    res.send(csv);

  } catch (error) {
    console.error('Error exporting CSV:', error);
    res.status(500).json({ error: 'Failed to export data' });
  }
});

/**
 * PUT /api/assessment/:assessmentId/platform-interest
 * Update user's interest in the TalkTu platform
 */
router.put('/:assessmentId/platform-interest', async (req, res) => {
  try {
    const { assessmentId } = req.params;
    const { interested } = req.body;

    await pool.query(
      'UPDATE assessments SET platform_interest = $1 WHERE assessment_id = $2',
      [interested, assessmentId]
    );

    res.json({
      success: true,
      message: 'Platform interest updated'
    });

  } catch (error) {
    console.error('Error updating platform interest:', error);
    res.status(500).json({ error: 'Failed to update platform interest' });
  }
});

/**
 * GET /api/assessment/stats
 * Get overall statistics
 */
router.get('/stats', async (req, res) => {
  try {
    const stats = await pool.query(`
      SELECT 
        COUNT(*) as total_assessments,
        COUNT(CASE WHEN completed = true THEN 1 END) as completed_assessments,
        COUNT(CASE WHEN platform_interest = true THEN 1 END) as platform_interest_count,
        AVG(child_age_years) as avg_child_age,
        COUNT(CASE WHEN child_gender = 'male' THEN 1 END) as male_count,
        COUNT(CASE WHEN child_gender = 'female' THEN 1 END) as female_count
      FROM assessments
    `);

    const domainStats = await pool.query(`
      SELECT 
        AVG(speech_language_percentage) as avg_speech_language,
        AVG(literacy_percentage) as avg_literacy,
        AVG(numeracy_percentage) as avg_numeracy,
        AVG(cognitive_percentage) as avg_cognitive,
        AVG(overall_percentage) as avg_overall
      FROM results
    `);

    // Get pricing preferences statistics
    const pricingStats = await pool.query(`
      SELECT 
        COUNT(*) as total_responses,
        AVG(pricing_preference) as avg_price,
        MIN(pricing_preference) as min_price,
        MAX(pricing_preference) as max_price,
        PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY pricing_preference) as median_price
      FROM results
      WHERE pricing_preference IS NOT NULL AND pricing_preference > 0
    `);

    res.json({
      success: true,
      statistics: {
        ...stats.rows[0],
        domain_averages: domainStats.rows[0],
        pricing_statistics: pricingStats.rows[0]
      }
    });

  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ error: 'Failed to fetch statistics' });
  }
});

module.exports = router;
