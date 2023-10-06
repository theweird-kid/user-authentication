const jwt = require('jsonwebtoken')
const secretKey = 'afjn2421as'
const User = require('../models/user')


const authenticateUser = (req, res, next) => {
    try {
        //extract token from the Authorization header
        const token = req.headers['authorization'].split('Bearer ')[1]
        //verify the token using the secret key
        const decoded = jwt.verify(token, secretKey)
        //Attach the user ID and email to the request object for further processing
        req.userId = decoded.userId
        req.email = decoded.email
        //check if the user is actually present in the database
        const user = User.findById(req.userId)
        if(user != null) next()

        return res.json({message: "User doesn't Exist"})
        
    } catch (err) {
        return res.status(401).json({ message: err.message })
    }
}


module.exports = { authenticateUser }