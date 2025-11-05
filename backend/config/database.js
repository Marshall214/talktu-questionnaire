const { Pool } = require('pg');
require('dotenv').config();

// Log environment for debugging
console.log('🔍 Database Configuration:');
console.log('  NODE_ENV:', process.env.NODE_ENV);
console.log('  DATABASE_URL exists:', !!process.env.DATABASE_URL);
console.log('  DB_HOST:', process.env.DB_HOST || 'not set');
console.log('  DB_PORT:', process.env.DB_PORT || 'not set');
console.log('  DB_NAME:', process.env.DB_NAME || 'not set');
console.log('  DB_USER:', process.env.DB_USER || 'not set');

// Support both DATABASE_URL (Render, Railway) and individual variables (local)
const pool = process.env.DATABASE_URL 
  ? new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
    })
  : new Pool({
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT) || 5432,
      database: process.env.DB_NAME || 'talktu_questionnaire',
      user: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD,
      max: 20,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000,
    });

pool.on('connect', () => {
  console.log('✅ Database connected successfully');
});

pool.on('error', (err) => {
  console.error('❌ Unexpected database error:', err);
  // Don't exit immediately in production, let the app try to recover
  if (process.env.NODE_ENV !== 'production') {
    process.exit(-1);
  }
});

module.exports = pool;
