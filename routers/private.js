// Initialize express
const express = require('express')

// Create express router
const router = express.Router()

// Initialize private controller
const { getPrivateData } = require('../controllers/private')

// Initialize protection middleware
const { protect } = require('../middleware/auth')

// GET request to /api/private
router.route('/').get(protect, getPrivateData)

module.exports = router