// Initialize express
const express = require('express')

// Create express router
const router = express.Router()

// Initialize private controller
const { getUsers, createUser, updateUser, deleteUser, getUser } = require('../controllers/users')

// Initialize protection middleware
const { protect } = require('../middleware/auth')

// GET request to /api/users
router.route('/').get(protect, getUsers)

// POST request to /api/users/create
router.route('/create').post(protect, createUser)

// PUT request to /api/users/:name
router.route('/:userName').put(protect, updateUser)

// DELETE request to /api/users/:name
router.route('/:userName').delete(protect, deleteUser)

// GET request to /api/users/:name
router.route('/:userName').get(protect, getUser)

module.exports = router