// Initialize crypto
const crypto = require('crypto')

// Initialize user model
const User = require('../models/Users')

// Initialize error handler
const ErrorResponse = require('../utils/errorResponse')

// Initialize send email
const sendEmail = require('../utils/sendEmail')

// Register controller
exports.register = async (req, res, next) => {
    const {username, email, password} = req.body

    try {
        const user = await User.create({
            username,
            email,
            password,
        })

        sendToken(user, 201, res)
    } catch (error) {
        next(error)
    }
    
}

/* Login controller
   Checks that both email and password exist
   Brings the user password from the database and makes sure a user with the email exists
   Compares the database password with the user inputted password
   Sends a token back to the user */
exports.login = async (req, res, next) => {
    const { email, password } = req.body

    if(!email || !password) {
        return next(new ErrorResponse("Please provide an email and password", 400))
    }

    try {
        const user = await User.findOne({ email }).select("+password")

        if(!user) {
            return next(new ErrorResponse("Invalid credentials", 401))
        }

        const isMatch = await user.matchPasswords(password)

        if(!isMatch) {
            return next(new ErrorResponse("Invalid credentials", 401))
        }

        sendToken(user, 200, res)
    } catch (error) {
        next(error)
    }
}

// Forgot Password controller
exports.forgotpassword = async (req, res, next) => {
    const {email} = req.body

    try {
        const user = await User.findOne({email})

        if(!user) {
            return next(new ErrorResponse("Email could not be sent"), 404)
        }

        const resetToken = user.getResetPasswordToken()

        await user.save()

        const resetUrl = `${process.env.CLIENT_URL}passwordreset/${resetToken}`

        const message = `
        <h1>You have requested a password reset</h1>
        <p>Please go to this link to reset your password</p>
        <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
        `

    try {
        await sendEmail({
            to: user.email,
            subject: "Password Reset Request",
            text: message
        })

        res.status(200).json({ success: true, data: "Email sent" })
    } catch (error) {
        user.resetPasswordToken = undefined
        user.resetPasswordExpire = undefined

        await user.save()

        return next(new ErrorResponse("Email could not be sent"), 500)
    }
    } catch (error) {
        next(error)   
    }
}

// Forgot password controller
exports.resetpassword = async (req, res, next) => {
    const resetPasswordToken = crypto
        .createHash("sha256")
        .update(req.params.resetToken)
        .digest("hex")
        
        console.log(resetPasswordToken)
        try {
            const user = await User.findOne({
                resetPasswordToken,
                resetPasswordExpire: { $gt: Date.now()}
            })
            console.log(user)
            if(!user){
                return next(new ErrorResponse("Invalid Token", 400))
            }

            user.password = req.body.password
            user.resetPasswordToken = undefined
            user.resetPasswordExpire = undefined

            await user.save()

            res.status(201).json({
                success: true,
                data: "Password reset success"
            })
        } catch (error) {
            next(error)
        }
}

// A function that handles signing and sending a token back to a user
const sendToken = (user, statusCode, res) => {
    const token = user.getSignedToken()
    res.status(statusCode).json({ success: true, token})
}