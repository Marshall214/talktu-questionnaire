const pool = require('../config/database');

const createTables = async () => {
  const client = await pool.connect();
  
  try {
    await client.query('BEGIN');

    // Create assessments table (main table)
    await client.query(`
      CREATE TABLE IF NOT EXISTS assessments (
        id SERIAL PRIMARY KEY,
        assessment_id VARCHAR(50) UNIQUE NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        
        -- Parent Information
        parent_email VARCHAR(255),
        parent_phone VARCHAR(20),
        parent_relationship VARCHAR(50),
        city VARCHAR(100),
        country VARCHAR(100),
        
        -- Child Information (Anonymous but useful for analysis)
        child_age_years INTEGER NOT NULL,
        child_age_months INTEGER,
        child_gender VARCHAR(20),
        primary_language VARCHAR(50),
        concerns TEXT,
        
        -- Metadata
        completed BOOLEAN DEFAULT FALSE,
        completed_at TIMESTAMP,
        platform_interest BOOLEAN DEFAULT FALSE
      );
    `);

    // Create responses table
    await client.query(`
      CREATE TABLE IF NOT EXISTS responses (
        id SERIAL PRIMARY KEY,
        assessment_id VARCHAR(50) REFERENCES assessments(assessment_id) ON DELETE CASCADE,
        question_number INTEGER NOT NULL,
        question_text TEXT NOT NULL,
        selected_option VARCHAR(50) NOT NULL,
        points INTEGER NOT NULL,
        domain VARCHAR(50) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Create results table
    await client.query(`
      CREATE TABLE IF NOT EXISTS results (
        id SERIAL PRIMARY KEY,
        assessment_id VARCHAR(50) UNIQUE REFERENCES assessments(assessment_id) ON DELETE CASCADE,
        
        -- Age Group Tracking
        age_group VARCHAR(10),
        
        -- Overall Score
        total_score INTEGER NOT NULL,
        max_score INTEGER NOT NULL,
        overall_percentage DECIMAL(5,2),
        overall_level VARCHAR(50),
        
        -- Domain Scores
        speech_language_score INTEGER,
        speech_language_max INTEGER,
        speech_language_percentage DECIMAL(5,2),
        speech_language_level VARCHAR(20),
        
        literacy_score INTEGER,
        literacy_max INTEGER,
        literacy_percentage DECIMAL(5,2),
        literacy_level VARCHAR(20),
        
        numeracy_score INTEGER,
        numeracy_max INTEGER,
        numeracy_percentage DECIMAL(5,2),
        numeracy_level VARCHAR(20),
        
        cognitive_score INTEGER,
        cognitive_max INTEGER,
        cognitive_percentage DECIMAL(5,2),
        cognitive_level VARCHAR(20),
        
        -- Pricing Metric (not scored) - changed to store numeric amount
        pricing_preference INTEGER,
        
        -- Red Flags
        red_flags TEXT[],
        
        -- Recommendations
        recommendations TEXT[],
        
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Create indexes for better query performance
    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_assessment_id ON responses(assessment_id);
      CREATE INDEX IF NOT EXISTS idx_created_at ON assessments(created_at);
      CREATE INDEX IF NOT EXISTS idx_child_age ON assessments(child_age_years);
    `);

    await client.query('COMMIT');
    console.log('✅ Database tables created successfully!');
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('❌ Error creating tables:', error);
    throw error;
  } finally {
    client.release();
    pool.end();
  }
};

createTables().catch(console.error);
