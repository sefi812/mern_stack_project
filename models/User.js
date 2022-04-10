// Initialize mongoose
const mongoose = require('mongoose')

// Initialize bcrypt
const bcrypt = require('bcryptjs')

// Initialize jwt
const jwt = require('jsonwebtoken')

// Initialize crypto
const crypto = require('crypto')

// Create User schema
const UserSchema = new mongoose.Schema({
        username: {
            type: String,
            required: [true, "Please provide a username"]
        },
        email: {
            type:String,
            requied: [true, "Please provide an email"],
            unique: true,
            match: [
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                "Please provide a valid email",
              ],
            },
        password: {
          type: String,
          required: [true, "Please add a password"],
          minlength: 6,
          select: false,
        },
        permissions: {
          type: [String]
        },
        resetPasswordToken: {
          type: String
        },
        resetPasswordExpire: {
          type: Date
        },
      })

      /*  A function that runs before a mongoose 'save' action
          If the password is not modified it does not get rehashed
          Otherwise, the password will be encrypted using bcrypt

      */
      UserSchema.pre("save", async function(next) {
        if(!this.isModified("password")) {
          next()
        }

        const salt = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password, salt)
        next()

      })

      // A function that compares input password with stored password
      UserSchema.methods.matchPasswords = async function(password) {
        return await bcrypt.compare(password, this.password)
      }

      /* A functions that generates a signed token using these parameters:
        - id: user database ID
        - JWT_SECRET: Secret key stored in config.env
        - expiresIn: token life time, stored in config.env as JWT_EXPIRE*/
      UserSchema.methods.getSignedToken = function () {
        return jwt.sign({ id: this._id}, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE })
      }

      UserSchema.methods.getResetPasswordToken = function () {
        const resetToken = crypto.randomBytes(20).toString("hex")

        this.resetPasswordToken = crypto
          .createHash("sha256")
          .update(resetToken)
          .digest("hex")

        this.resetPasswordExpire = Date.now() + 10 * (60 * 1000)

        return resetToken
      }

      // Assigning User schema to a User model
      const User = mongoose.model("User", UserSchema)

      module.exports = User