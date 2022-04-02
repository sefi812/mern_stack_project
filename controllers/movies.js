// Returns all movies
exports.getMovies = (req, res, next) => {
    
    
    res.status(200).json({
        success: true,
        data: "You have access"
    })
}