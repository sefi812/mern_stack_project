// Initialize express
const express = require('express')

// Create express router
const router = express.Router()

// Initialize private controller
const { getMovies, createMovie, updateMovie, deleteMovie, getMovie } = require('../controllers/movies')

// Initialize protection middleware
const { protect } = require('../middleware/auth')

// GET request to /api/movies
router.route('/').get(protect, getMovies)

// POST request to /api/movies/create
router.route('/create').post(protect, createMovie)

// PUT request to /api/movies/:name
router.route('/:movieName').put(protect, updateMovie)

// DELETE request to /api/movies/:name
router.route('/:movieName').delete(protect, deleteMovie)

// GET request to /api/movies/:name
router.route('/:movieName').put(protect, getMovie)

module.exports = router