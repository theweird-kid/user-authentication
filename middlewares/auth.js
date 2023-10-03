const authenticateUser = (req, res, next) => {
    try {
        //extract token from the Authorization header
        const token = req.header['Authorization'].split('Bearer')[1]
        //verify the token using the secret key
        const decoded = jwtt.verify(token, secretKey)
        //Attach the user ID and email to the request object for further processing
        req.userId = decoded.userId
        req.email = decode.email
        next()
    } catch (err) {
        return res.status(401).json({ message: err.message})
    }
}

module.exports = { authenticateUser }