// Initialize express
const express = require('express')

// Create express router
const router = express.Router()

// Initialize private controller
const { getMovies, createMovie, updateMovie, deleteMovie, getMovie } = require('../controllers/movies')

// Initialize protection middleware
const { protect } = require('../middleware/auth')

// GET request to /api/movies
router.route('/').get(getMovies)

// POST request to /api/movies/create
router.route('/create').post(createMovie)

// PUT request to /api/movies/:name
router.route('/:movieName').put(updateMovie)

// DELETE request to /api/movies/:name
router.route('/:movieName').delete(deleteMovie)

// GET request to /api/movies/:name
router.route('/:movieName').put(getMovie)

module.exports = router