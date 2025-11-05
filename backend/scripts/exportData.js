/**
 * Export all assessment data from database
 * Run with: node scripts/exportData.js
 */

const pool = require('../config/database');
const fs = require('fs');
const path = require('path');

async function exportAllData() {
  try {
    console.log('📊 Exporting all assessment data...\n');

    // Get all assessments with results
    const query = `
      SELECT 
        a.assessment_id,
        a.created_at,
        a.completed_at,
        
        -- Parent Info
        a.parent_email,
        a.parent_phone,
        a.parent_relationship,
        a.city,
        a.country,
        
        -- Child Info
        a.child_age_years,
        a.child_age_months,
        a.child_gender,
        a.primary_language,
        a.concerns,
        
        -- Overall Scores
        r.total_score,
        r.max_score,
        r.overall_percentage,
        r.overall_level,
        
        -- Domain Scores
        r.speech_language_score,
        r.speech_language_percentage,
        r.speech_language_level,
        r.literacy_score,
        r.literacy_percentage,
        r.literacy_level,
        r.numeracy_score,
        r.numeracy_percentage,
        r.numeracy_level,
        r.cognitive_score,
        r.cognitive_percentage,
        r.cognitive_level,
        
        -- Pricing
        r.pricing_preference,
        
        -- Flags & Recommendations
        r.red_flags,
        r.recommendations
        
      FROM assessments a
      LEFT JOIN results r ON a.assessment_id = r.assessment_id
      WHERE a.completed = true
      ORDER BY a.created_at DESC
    `;

    const result = await pool.query(query);

    console.log(`✅ Found ${result.rows.length} completed assessments\n`);

    // Get all responses for each assessment
    for (const assessment of result.rows) {
      const responsesQuery = `
        SELECT question_number, question_text, selected_option, points, domain
        FROM responses
        WHERE assessment_id = $1
        ORDER BY question_number
      `;
      const responses = await pool.query(responsesQuery, [assessment.assessment_id]);
      assessment.responses = responses.rows;
    }

    // Save to JSON file
    const outputPath = path.join(__dirname, '..', 'exports');
    if (!fs.existsSync(outputPath)) {
      fs.mkdirSync(outputPath, { recursive: true });
    }

    const timestamp = new Date().toISOString().replace(/:/g, '-').split('.')[0];
    const filename = `talktu_data_${timestamp}.json`;
    const filepath = path.join(outputPath, filename);

    fs.writeFileSync(filepath, JSON.stringify(result.rows, null, 2));

    console.log('📁 Data exported to:', filepath);
    console.log('\n📊 Summary:');
    console.log(`   Total Assessments: ${result.rows.length}`);
    console.log(`   Average Overall Score: ${(result.rows.reduce((sum, r) => sum + (r.overall_percentage || 0), 0) / result.rows.length).toFixed(2)}%`);
    
    // Pricing distribution
    const pricingCounts = {};
    result.rows.forEach(r => {
      if (r.pricing_preference) {
        pricingCounts[r.pricing_preference] = (pricingCounts[r.pricing_preference] || 0) + 1;
      }
    });
    
    console.log('\n💰 Pricing Preferences:');
    Object.entries(pricingCounts).forEach(([option, count]) => {
      const labels = {
        'E': '₦0-5k (Free/Very Low)',
        'F': '₦5k-15k (Low)',
        'G': '₦15k-25k (Medium)',
        'H': '₦25k-50k (High)',
        'I': 'Above ₦50k (Premium)'
      };
      console.log(`   ${labels[option]}: ${count} (${(count/result.rows.length*100).toFixed(1)}%)`);
    });

    console.log('\n✅ Export complete!\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error exporting data:', error);
    process.exit(1);
  }
}

exportAllData();
