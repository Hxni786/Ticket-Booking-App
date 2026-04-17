import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
});

export const ticketAPI = {
  getAll: () => api.get('/movies'),
  getById: (id) => api.get(`/movies/${id}`),
  search: (query) => api.get(`/movies/search?q=${encodeURIComponent(query)}`),
  getByCategory: (category) => api.get(`/movies/category/${category}`),
  getPopular: () => api.get('/movies/popular'),
};

export default api;
