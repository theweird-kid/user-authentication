require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')

//connecting to the database
mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
db.on('error', (error) => console.log(error))
db.once('open', () => console.log('Connected to Database'))

//parsing requests from client
app.use(express.json())

//routing requests to users
const UserRouter = require('./routes/user')
app.use('/user', UserRouter)

//importing authentication middleware
const { authenticateUser } = require('./middlewares/auth')

const dashboardRouter = require('./routes/dashboard')
app.use('/dashboard', authenticateUser, dashboardRouter)

app.listen(process.env.PORT, () => console.log("Server Started at PORT:", process.env.PORT))