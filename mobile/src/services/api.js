import axios from 'axios';

// Machine Local IP for physical device connectivity
const BASE_URL = 'http://192.168.100.55:5000/api';

const api = axios.create({
  baseURL: BASE_URL,
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

