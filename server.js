// Initialize env file
require('dotenv').config({path: "./config.env"})

// Initialize Express
const express = require ('express')

// Initialize DB
const connectDB = require('./config/db')

// Initialize Error Handler
const errorHandler = require('./middleware/error')

// Connect to DB
connectDB()

// Create an express app
const app = express()
app.use(express.json())

// Initialize routers
app.use('/api/auth', require('./routers/auth'))
app.use('/api/private', require('./routers/private'))

// Error Handler (Has to be the last middleware item)
app.use(errorHandler)

// Initialize server port
const PORT = process.env.PORT || 5000;

// Start the server
const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

// Server error handling
process.on("unhandledRejection", (error, promise) => {
    console.log(`Logged Error: ${error}`)
    server.close(() => process.exit(1))
})