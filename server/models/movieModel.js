const db = require('../config/db');

const MovieModel = {
  async getAll() {
    const [rows] = await db.query(
      `SELECT * FROM movies WHERE id IN (
        SELECT MIN(id) FROM movies GROUP BY title
      ) ORDER BY release_date DESC`
    );
    return rows;
  },

  async getById(id) {
    const [rows] = await db.query('SELECT * FROM movies WHERE id = ?', [id]);
    return rows[0];
  },

  async search(query) {
    const [rows] = await db.query(
      `SELECT * FROM movies WHERE id IN (
        SELECT MIN(id) FROM movies GROUP BY title
      ) AND LOWER(title) LIKE LOWER(?) ORDER BY rating DESC`,
      [`%${query}%`]
    );
    return rows;
  },

  async getByCategory(category) {
    const [rows] = await db.query(
      `SELECT * FROM movies WHERE id IN (
        SELECT MIN(id) FROM movies GROUP BY title
      ) AND category = ? ORDER BY release_date DESC`,
      [category]
    );
    return rows;
  },

  async getPopular() {
    const [rows] = await db.query(
      `SELECT * FROM movies WHERE id IN (
        SELECT MIN(id) FROM movies GROUP BY title
      ) ORDER BY rating DESC LIMIT 6`
    );
    return rows;
  }
};

module.exports = MovieModel;
