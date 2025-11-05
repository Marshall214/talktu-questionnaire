const express = require('express');
const cors = require('cors');
require('dotenv').config();

const assessmentRoutes = require('./routes/assessment');

const app = express();
const PORT = process.env.PORT || 5000;

console.log('🚀 Starting TalkTu Questionnaire API...');
console.log('📝 Environment:', process.env.NODE_ENV || 'development');
console.log('🔌 Port:', PORT);
console.log('🌐 CORS Origin:', process.env.FRONTEND_URL || 'http://localhost:3000');

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/assessment', assessmentRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'TalkTu Questionnaire API is running' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`
  ╔════════════════════════════════════════════╗
  ║   TalkTu Questionnaire API Server         ║
  ║   Running on: http://0.0.0.0:${PORT}        ║
  ╚════════════════════════════════════════════╝
  `);
});

module.exports = app;
