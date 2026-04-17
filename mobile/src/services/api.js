import mockMovies from './mockData';

// Simulated delay to mimic network latency for UI animations
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const ticketAPI = {
  getAll: async () => {
    await delay(500); 
    return { data: { success: true, data: mockMovies } };
  },
  getById: async (id) => {
    await delay(300);
    const movie = mockMovies.find(m => m.id === parseInt(id));
    return { data: { success: true, data: movie } };
  },
  search: async (query) => {
    await delay(400);
    const lowerQuery = query.toLowerCase();
    const results = mockMovies.filter(m => 
      m.title.toLowerCase().includes(lowerQuery) || 
      m.genre.toLowerCase().includes(lowerQuery)
    );
    return { data: { success: true, data: results } };
  },
  getByCategory: async (category) => {
    await delay(400);
    const results = mockMovies.filter(m => m.category === category);
    return { data: { success: true, data: results } };
  },
  getPopular: async () => {
    await delay(500);
    // Sort by rating descending and return top 5
    const popular = [...mockMovies].sort((a, b) => b.rating - a.rating).slice(0, 5);
    return { data: { success: true, data: popular } };
  },
};

export default ticketAPI;
