const express = require('express');
const cors = require('cors');
require('dotenv').config();

const assessmentRoutes = require('./routes/assessment');

const app = express();
const PORT = process.env.PORT || 5000;

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

app.listen(PORT, () => {
  console.log(`
  ╔════════════════════════════════════════════╗
  ║   TalkTu Questionnaire API Server         ║
  ║   Running on: http://localhost:${PORT}      ║
  ╚════════════════════════════════════════════╝
  `);
});

module.exports = app;
