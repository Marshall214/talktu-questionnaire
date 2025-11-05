import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const assessmentAPI = {
  // Start new assessment
  startAssessment: async (data) => {
    const response = await api.post('/assessment/start', data);
    return response.data;
  },

  // Submit questionnaire responses
  submitResponses: async (assessmentId, responses) => {
    const response = await api.post(`/assessment/${assessmentId}/submit`, { responses });
    return response.data;
  },

  // Get results
  getResults: async (assessmentId) => {
    const response = await api.get(`/assessment/${assessmentId}/results`);
    return response.data;
  },

  // Update platform interest
  updatePlatformInterest: async (assessmentId, interested) => {
    const response = await api.put(`/assessment/${assessmentId}/platform-interest`, { interested });
    return response.data;
  },

  // Get statistics (admin)
  getStats: async () => {
    const response = await api.get('/assessment/stats');
    return response.data;
  }
};

export default api;
