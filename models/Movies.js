// Initialize mongoose
const mongoose = require('mongoose')

// Create Movies schema
const MoviesSchema = new mongoose.Schema({
        name: {
            type: String
        },
        genres: {
            type:[String]
            },
        image: {
            type: String
            },
        premiered: {
          type: Date
          },
        
      })

      // Assigning Movies schema to a Movies model
      const Movies = mongoose.model("Movies", MoviesSchema)

      module.exports = Movies