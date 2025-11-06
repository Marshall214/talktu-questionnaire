const pool = require('../config/database');

const addAgeGroupColumn = async () => {
  const client = await pool.connect();
  
  try {
    console.log('🔄 Starting migration: Add age_group column to results table...');
    
    // Check if column already exists
    const checkColumn = await client.query(`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name='results' AND column_name='age_group';
    `);
    
    if (checkColumn.rows.length > 0) {
      console.log('ℹ️  Column age_group already exists in results table');
    } else {
      // Add the column
      await client.query(`
        ALTER TABLE results 
        ADD COLUMN age_group VARCHAR(10);
      `);
      console.log('✅ Successfully added age_group column to results table');
    }
    
    // Verify the column was added
    const verify = await client.query(`
      SELECT column_name, data_type, character_maximum_length
      FROM information_schema.columns 
      WHERE table_name='results' AND column_name='age_group';
    `);
    
    if (verify.rows.length > 0) {
      console.log('✅ Migration verified successfully');
      console.log('   Column details:', verify.rows[0]);
    } else {
      console.log('❌ Migration verification failed');
    }
    
  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    throw error;
  } finally {
    client.release();
    pool.end();
  }
};

addAgeGroupColumn().catch(console.error);
