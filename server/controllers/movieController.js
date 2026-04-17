const MovieModel = require('../models/movieModel');

const movieController = {
  async getAll(req, res) {
    try {
      const movies = await MovieModel.getAll();
      res.json({ success: true, data: movies });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Failed to fetch tickets', error: error.message });
    }
  },

  async getById(req, res) {
    try {
      const movie = await MovieModel.getById(req.params.id);
      if (!movie) return res.status(404).json({ success: false, message: 'Ticket not found' });
      res.json({ success: true, data: movie });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Failed to fetch ticket', error: error.message });
    }
  },

  async search(req, res) {
    try {
      const { q } = req.query;
      if (!q) return res.json({ success: true, data: [] });
      const results = await MovieModel.search(q);
      res.json({ success: true, data: results, count: results.length });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Search failed', error: error.message });
    }
  },

  async getByCategory(req, res) {
    try {
      const { category } = req.params;
      const movies = await MovieModel.getByCategory(category);
      res.json({ success: true, data: movies });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Failed to filter', error: error.message });
    }
  },

  async getPopular(req, res) {
    try {
      const movies = await MovieModel.getPopular();
      res.json({ success: true, data: movies });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Failed to fetch popular', error: error.message });
    }
  }
};

module.exports = movieController;
