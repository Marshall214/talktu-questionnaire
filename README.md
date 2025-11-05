# TalkTu Questionnaire - Child Development Assessment Platform

A comprehensive full-stack application for assessing child development across multiple domains with personalized recommendations.

## 🌟 Features

- **Multi-step Form Flow**: Parent Info → Child Info → Questionnaire → Results
- **Hybrid Scoring System**: Domain-based analysis + overall assessment
- **Color-Coded Reports**: Visual representation of development levels
- **Personalized Recommendations**: Tailored advice based on assessment results
- **Privacy-First**: Anonymous child assessment with optional parent contact info
- **Data Export**: CSV export capability for analysis
- **Professional UI**: Elegant, responsive design with Tailwind CSS

## 📊 Assessment Domains

1. **Speech & Language** 🗣️ - Communication and expression skills
2. **Literacy** 📖 - Reading and phonics awareness  
3. **Numeracy** 🔢 - Number and math concepts
4. **Focus & Memory** 🧠 - Attention and cognitive skills

## 🛠️ Tech Stack

### Frontend
- React 18
- React Router v6
- Tailwind CSS
- Axios
- Lucide Icons
- Vite

### Backend
- Node.js
- Express
- PostgreSQL
- JSON2CSV

## 📁 Project Structure

```
talktu-questionnaire/
├── backend/
│   ├── config/
│   │   └── database.js
│   ├── routes/
│   │   └── assessment.js
│   ├── scripts/
│   │   └── initDb.js
│   ├── utils/
│   │   └── scoring.js
│   ├── .env.example
│   ├── server.js
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── DomainCard.jsx
    │   │   ├── OverallScore.jsx
    │   │   └── RecommendationCard.jsx
    │   ├── pages/
    │   │   ├── Home.jsx
    │   │   ├── ParentInfo.jsx
    │   │   ├── ChildInfo.jsx
    │   │   ├── Questionnaire.jsx
    │   │   └── Results.jsx
    │   ├── services/
    │   │   └── api.js
    │   ├── data/
    │   │   └── questions.js
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── index.html
    ├── vite.config.js
    ├── tailwind.config.js
    └── package.json
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

### Installation

#### 1. Clone the repository
```bash
cd "c:\Users\HP\work projects\talktu questionnaire"
```

#### 2. Set up PostgreSQL Database

Create a new database:
```sql
CREATE DATABASE talktu_questionnaire;
```

#### 3. Backend Setup

```bash
cd backend
npm install

# Create .env file
cp .env.example .env

# Edit .env with your database credentials
# Then initialize the database
npm run init-db

# Start the backend server
npm run dev
```

The backend will run on `http://localhost:5000`

#### 4. Frontend Setup

```bash
cd ../frontend
npm install

# Start the development server
npm run dev
```

The frontend will run on `http://localhost:3000`

## 🔧 Environment Variables

### Backend (.env)
```env
PORT=5000
NODE_ENV=development

DB_HOST=localhost
DB_PORT=5432
DB_NAME=talktu_questionnaire
DB_USER=postgres
DB_PASSWORD=your_password_here

FRONTEND_URL=http://localhost:3000
```

### Frontend (.env - optional)
```env
VITE_API_URL=http://localhost:5000/api
```

## 📡 API Endpoints

### Assessment Routes

- `POST /api/assessment/start` - Create new assessment
- `POST /api/assessment/:assessmentId/submit` - Submit responses
- `GET /api/assessment/:assessmentId/results` - Get results
- `GET /api/assessment/export/csv` - Export all data to CSV
- `GET /api/assessment/stats` - Get overall statistics

## 🎨 Scoring System

### Domain Levels
- 🟢 **Green (Strong)**: 75-100%
- 🟡 **Yellow (Developing)**: 50-74%
- 🟠 **Orange (Needs Support)**: 25-49%
- 🔴 **Red (Urgent)**: 0-24%

### Overall Levels
- **Advanced**: 87-100%
- **On Track**: 63-86%
- **Needs Support**: 37-62%
- **Needs Intensive Support**: 0-36%

## 🚢 Deployment

### Option 1: Traditional Hosting

#### Frontend (Vercel/Netlify)
```bash
cd frontend
npm run build
# Deploy the 'dist' folder
```

#### Backend (Heroku/Railway/Render)
```bash
cd backend
# Set environment variables on hosting platform
# Deploy using platform's CLI or Git integration
```

### Option 2: Docker Deployment
See Docker configuration files for containerized deployment.

### Database Hosting
- **Heroku Postgres**
- **Supabase**
- **AWS RDS**
- **Railway**

## 📊 Data Export

Export all assessment data to CSV:
```
GET http://localhost:5000/api/assessment/export/csv
```

## 🔐 Privacy & Security

- Child's name is never collected
- Parent contact information is optional
- All data encrypted in transit (HTTPS in production)
- Database credentials stored in environment variables
- Anonymous assessment IDs for tracking

## 🤝 Contributing

This is a private project for TalkTu. For questions or modifications, contact the development team.

## 📄 License

Proprietary - TalkTu © 2025

## ⚠️ Disclaimer

This assessment tool is for screening purposes only and does not replace professional evaluation. Results should be discussed with qualified healthcare providers for any developmental concerns.

## 🐛 Troubleshooting

### Database Connection Issues
```bash
# Check PostgreSQL is running
# Windows:
services.msc  # Look for PostgreSQL service

# Verify credentials in .env match your database
```

### Port Already in Use
```bash
# Change PORT in backend/.env
# Change port in frontend/vite.config.js
```

### Module Not Found Errors
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

## 📞 Support

For technical support or questions about the assessment, contact: support@talktu.com

---

**Built with ❤️ for better child development outcomes**
