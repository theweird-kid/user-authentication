const express = require('express')
const router = express.Router()

//importing encryption library
const bcrypt = require('bcrypt')

//importing jsonwebtoken for authorisation
const jwt = require('jsonwebtoken')
const secretKey = 'afjn2421as'

//importing User Schema from models
const User = require('../models/user')

//Signup function
router.post('/signup', async (req, res) => {
    try{
        const { name, email, password } = req.body
        //checking if the user already exists
        const existingUser = await User.findOne({ email })
        if(existingUser) {
            return res.status(400).json({ message: 'User already exists'})
        }
        //Hashing the password using bcrypt
        const hashedPassword = await bcrypt.hash(password, 10)
        //Creating new user in the database
        const newUser = new User({
            name,
            email,
            password: hashedPassword
        })
        await newUser.save()
        return res.status(201).json({message: 'User Registerd Successfully'})
    } catch (err) {
        return res.status(500).json({ message: err.message})
    }
})

//login function with authorisation
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body
        //check if the user exists in database
        const user = await user.findOne({ email })
        if(!user) {
            return res.status(401).json({message: 'Invalid Credentials'})
        } 
        //comapring the provided password with hashed password using bcrypt
        const passwordMatch = await bcrypt.compare(password, user.password)
        if(!passwordMatch) {
            return res.status(401).json({message: 'Invalid Credentials'})
        }
        //generating a JWT for authorized user
        const token = jwt.sign({ userId: uswer._id, email: user.email }, secretKey, {
            expiresIn: '2h'
        })
        return res.status(200).json({ token })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
})

module.exports = router
