// Initialize express
const express = require('express')

// Create express router
const router = express.Router()

// Initialize private controller
const { getMovies } = require('../controllers/movies')

// Initialize protection middleware
const { protect } = require('../middleware/auth')

// GET request to /api/movies
router.route('/').get(protect, getMovies)

module.exports = router