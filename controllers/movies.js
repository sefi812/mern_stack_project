const Movies = require("../models/Movies")

// Get all movies
exports.getMovies = async (req, res, next) => {
    try {
        const movies = await Movies.find({})
        res.status(200).json(movies)
    } catch (error) {
        next(error)
    }
}

// Create a movie
exports.createMovie = async (req, res, next) => {
    const movie = req.body
    const movies = await Movies.find({name: req.body.name})
    if (movies.length == 0) {
        const newMovie = new Movies(movie)
        try {
            await newMovie.save()
            res.status(201).json(newMovie)
        } catch (error) {
            next(error)
        }
    }
}

// Update a movie
exports.updateMovie = async (req, res, next) => {
    try {
        const movieResponse = await Movies.findOne({name: req.params.movieName})
        if(movieResponse) {
            const updatedMovie = await Movies.findByIdAndUpdate(movieResponse._id, {
                    name: req.body.name,
                    genres: req.body.genres,
                    image: req.body.image,
                    premiered: req.body.premiered
                })
                res.status(200).json(updatedMovie)         
        }
    } catch (error) {
        next(error)
    }
}

// Delete a movie
exports.deleteMovie = async (req, res, next) => {
    try {
        const deletedMovie = await Movies.findOneAndDelete({name: req.params.movieName})
        res.status(200).json(deletedMovie)
    } catch (error) {
        next(error)
    }
}

//Get a movie by name
exports.getMovie = async (req, res, next) => {
    try {
        const movie = await Movies.find({name: req.params.movieName})
        res.status(200).json(movie)
    } catch (error) {
        next(error)
    }
}