// Initialize env file
require('dotenv').config({path: "./config.env"})

// Initialize Express
const express = require ('express')

// Initialize CORS
const cors = require('cors')

// Initialize DB
const connectDB = require('./config/db')

// Initialize Error Handler
const errorHandler = require('./middleware/error')

// Initialize Axios
const axios = require ('axios')

// Connect to DB
connectDB()

// Intialize Movies model
const Movies = require('./models/Movies')

// Create an express app and initialize cors
const app = express()
app.use(
    cors({
        origin: "http://localhost:3000",
    }))
app.use(express.json())

// Initialize routers
app.use('/api/auth', require('./routers/auth'))
app.use('/api/private', require('./routers/private'))
app.use('/api/movies', require('./routers/movies'))

// Error Handler (Has to be the last middleware item)
app.use(errorHandler)

// Initialize server port
const PORT = process.env.PORT || 5000;

// Push movies from API to DB
const pushMovies = async () => {
    const movies = await Movies.find({})
    if(movies.length == 0) {
        const apiMovies = await axios.get('https://api.tvmaze.com/shows')
        let parsedMovies = apiMovies.data.map(movie => {
            let name = movie.name
            let genres = movie.genres
            let image = movie.image.original
            let premiered = movie.premiered
            return {name, genres, image, premiered}
        })
        const movieInsertResponse = await Movies.insertMany(parsedMovies)
        console.log ("Movies pushed into DB")
    }
    else {
        console.log("Movies are up to date")
    }
}
// Start the server
const server = app.listen(PORT, async () => {
    console.log(`Server running on port ${PORT}`)
    await pushMovies()
})

// Server error handling
process.on("unhandledRejection", (error, promise) => {
    console.log(`Logged Error: ${error}`)
    server.close(() => process.exit(1))
})