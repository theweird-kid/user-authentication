const express = require('express')
const router = express.Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

//getting the user details on successful login
router.get('/', getUser, (req, res) => {
    res.json({message: 'You can access the dashboard', userDetails: res.user})
})

//update user details
router.patch('/updateDetails', getUser, async (req, res) => {
    if(req.body.name != null) {
        res.user.name = req.body.name
    } 
    if(req.body.email != null) {
        res.user.email = req.body.email
    }
    if(req.body.password != null) {
        const encryptedPassword = await bcrypt.hash(req.body.password, 10)
        res.user.password = encryptedPassword
    }

    try {
        const updatedUser = await res.user.save()
        res.json({message: "updated details", updatedUser})
    } catch (err) {
        res.status(500).json({message: err.message})
    }
 })

//delete User from the database 
router.delete('/deleteAccount', getUser, async (req, res) => {
    try {
        const deleteUser = res.user
        await deleteUser.deleteOne()
        res.json({ message: 'Deleted User', deleteUser})
    } catch(err) {
        res.status(500).json({ message: err.message})
    }
})

 //Get user by unique Id
async function getUser(req, res, next) {
    let user = await User.findById(req.userId)
    //console.log(user.name)
    res.user = user
    next()
}

module.exports = router