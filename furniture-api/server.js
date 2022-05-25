/////////////////////////////////
// import dependencies
/////////////////////////////////
// this allows us to load our env variables
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

// we need to require our routers
const FurnitureRouter = require('./app/routes/furniture')
const HomeRouter = require('./app/routes/home')

// clientDevPort is where client application is (front end)
const clientDevPort = 3000

const db = require('./config/db')

mongoose.connect(db, {
    useNewUrlParser: true,
})
////////////////////////////////////////////
// Create our express application object
////////////////////////////////////////////
const app = express()
// this allows our back end to talk to our front end & vice versa
app.use(
    cors({
        origin: process.env.CLIENT_ORIGIN || `http://localhost:${clientDevPort}`,
    })
)

app.use(express.json())
// this parses requests sent by `$.ajax`, which use a different content type
app.use(express.urlencoded({ extended: true }))
////////////////////////////////////////////
// Routes
////////////////////////////////////////////
// register our routes here
// send all '/furniture' routes to the Furniture Router
app.use('/furniture', FurnitureRouter)
app.use('/', HomeRouter)


////////////////////////////////////////////
// Server Listener
////////////////////////////////////////////
// this port is going to be the port for the backend
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`app is listening on port: ${PORT}`)
})






