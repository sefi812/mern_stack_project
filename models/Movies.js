// Initialize mongoose
const mongoose = require('mongoose')

// Create Movies schema
const MoviesSchema = new mongoose.Schema({
        name: {
            type: String,
            required: [true, "Please provide a movie name"]
        },
        genres: {
            type:[String],
            required: [true, "Please enter at least one  movie genre"]
            },
        image: {
            type: String,
            required: [true, "Please enter a movie image url"]
            },
        premiered: {
          type: Date,
          required: [true, "Please enter a premiere date for the movie"]
          },
        
      })

      // Assigning Movies schema to a Movies model
      const Movies = mongoose.model("Movies", MoviesSchema)

      module.exports = Movies