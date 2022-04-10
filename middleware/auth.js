// Initialize jwt
const jwt = require('jsonwebtoken')

// Initialize mongoose User model
const User = require('../models/Users')
const ErrorResponse = require('../utils/errorResponse')

/* Protection function that turns a route into a protected route
   It splits the 'Bearer token' received into the token itself
   Verifies that a token exists
   Decrypts the token using the secret key JWT_SECRET stored in config.env
   Verifies the user ID inside the decoded token against the database
   Passes user back to the request in order to pass the user information to the protected route*/
exports.protect = async (req, res, next) => {
    let token

    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1]
    }

    if(!token) {
        return next(new ErrorResponse("Not Authorized to access this route", 401))
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        const user = await User.findById(decoded.id)

        if(!user) {
            return next(new ErrorResponse("No user found with this id", 404))
        }

        req.user = user
        
        next()
    } catch (error) {
        return next(new ErrorResponse("Not authorized to access this route", 401))
        
    }
}