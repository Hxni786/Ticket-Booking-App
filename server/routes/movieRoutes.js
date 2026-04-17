const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');

router.get('/', movieController.getAll);
router.get('/search', movieController.search);
router.get('/popular', movieController.getPopular);
router.get('/category/:category', movieController.getByCategory);
router.get('/:id', movieController.getById);

module.exports = router;
