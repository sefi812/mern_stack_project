// Initialize express
const express = require('express')

// Create express router
const router = express.Router()

// Initialize Authentication controllers
const {register, login, forgotpassword, resetpassword} = require('../controllers/auth')

// POST request to /api/register
router.route('/register').post(register)

// POST request to /api/login
router.route('/login').post(login)

// POST request to /api/forgotpassword
router.route('/forgotpassword').post(forgotpassword)

// PUT request to /api/resetpassword
router.route('/resetpassword/:resetToken').put(resetpassword)

module.exports = router

