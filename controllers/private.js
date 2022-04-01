// Returns protected data to an authenticated user
exports.getPrivateData = (req, res, next) => {
    res.status(200).json({
        success: true,
        data: "You have access"
    })
}