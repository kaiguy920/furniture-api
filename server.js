/////////////////////////////////
// import dependencies
/////////////////////////////////
// this allows us to load our env variables
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

// we need to require our routers
const FurnitureRouter = require('./routes/furniture')
const HomeRouter = require('./routes/home')

const clientDevPort = 3000

const db = require('./config/db')

mongoose.connect(db, {
    useNewUrlParser: true,
})
////////////////////////////////////////////
// Create our express application object
////////////////////////////////////////////
const app = express()

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

// old home, now we're using homerouter
// app.get('/', (req, res) => {
//     res.send('your server is running, better go catch it')
// })

// app.post('/furniture', (req, res) => {

//     // Furniture.create(req.body.furniture)
//     console.log('the body', req.body)
//     // .then((furniture) => {
//     //     console.log('this was returned from create', furniture)
//     //     res.status(201).json({ furniture: furniture.toObject() })
//     // })
//     // .catch((err) => {
//     //     console.log(err)
//     //     res.json({ err })
//     // })
// })


////////////////////////////////////////////
// Server Listener
////////////////////////////////////////////
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`app is listening on port: ${PORT}`)
})






