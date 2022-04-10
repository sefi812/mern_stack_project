const Users = require("../models/Users")

// Get all users
exports.getUsers = async (req, res, next) => {
    try {
        const users = await Users.find({})
        res.status(200).json(users)
    } catch (error) {
        next(error)
    }
}

// Create a user
exports.createUser = async (req, res, next) => {
    const user = req.body
    const users = await Users.find({name: req.body.email})
    if (users.length == 0) {
        const newUser = new Users(user)
        try {
            await newUser.save()
            res.status(201).json(newUser)
        } catch (error) {
            next(error)
        }
    }
}

// Update a user
exports.updateUser = async (req, res, next) => {
    try {
        const userResponse = await Users.findOne({name: req.params.userName})
        if(userResponse) {
            const updatedUser = await Users.findByIdAndUpdate(userResponse._id, {
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password,
                    permissions: req.body.permissions
                })
                res.status(200).json(updatedUser)         
        }
    } catch (error) {
        next(error)
    }
}

// Delete a user
exports.deleteUser = async (req, res, next) => {
    try {
        const deletedUser = await Users.findOneAndDelete({name: req.params.userName})
        res.status(200).json(deletedUser)
    } catch (error) {
        next(error)
    }
}

//Get a user by name
exports.getUser = async (req, res, next) => {
    try {
        const user = await Users.findOne({name: req.params.userName})
        res.status(200).json(user)
    } catch (error) {
        next(error)
    }
}