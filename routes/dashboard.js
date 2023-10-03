const express = require('express')
const router = express.Router()

router.post('/', (req, res) => {
    res.json({message: 'You can access the dashboard'})
})
module.exports = router