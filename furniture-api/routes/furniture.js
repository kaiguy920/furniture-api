////////////////////////////////////////////
// Import Dependencies
////////////////////////////////////////////
const express = require('express')
const Furniture = require('../models/furniture')

////////////////////////////////////////////
// Create router
////////////////////////////////////////////
const router = express.Router()


////////////////////////////////////////////
// Routes
////////////////////////////////////////////

// INDEX
// GET /furniture
router.get('/', (req, res) => {
    // find the furniture
    Furniture.find({})
        // then render a template AFTER they're found
        .then((furniture) => {
            // console.log(furniture)
            return furniture.map(furniture => furniture.toObject())
        })
        .then(furniture => res.status(200).json({ furniture: furniture }))
        // show an error if there is one
        .catch((error) => {
            console.log(error)
            res.json({ error })
        })
})

// SHOW
// GET /furniture/624470c12ed7079ead53d4df

router.get('/:id', (req, res) => {
    // first, we need to get the id
    const furnitureId = req.params.id
    // then we can find furniture by its id
    Furniture.findById(furnitureId)
        .then(furniture => res.status(200).json({ furniture: furniture.toObject() }))
        // if there is an error, show that instead
        .catch((err) => {
            console.log(err)
            res.json({ err })
        })
})


// CREATE
// POST /furniture
router.post('/', (req, res) => {
    Furniture.create(req.body)
        .then((furniture) => {
            console.log('this was returned from create', furniture)
            res.status(201).json({ furniture: furniture.toObject() })
        })
        .catch((err) => {
            console.log(err)
            res.json({ err })
        })
})


// edit route -> GET that takes us to the edit form view
// router.get('/:id/edit', (req, res) => {
//     // we need to get the id
//     const fruitId = req.params.id
//     // find the fruit
//     Fruit.findById(fruitId)
//         // -->render if there is a fruit
//         .then((fruit) => {
//             console.log('edit froot', fruit)
//             const username = req.session.username
//             const loggedIn = req.session.loggedIn
//             res.render('fruits/edit', { fruit, username, loggedIn })
//         })
//         // -->error if no fruit
//         .catch((err) => {
//             console.log(err)
//             res.json(err)
//         })
// })

// UPDATE
// PATCH /furniture/624470c12ed7079ead53d4df

router.patch('/:id', (req, res) => {
    const furnitureId = req.params.id
    Furniture.findByIdAndUpdate(furnitureId, req.body, { new: true })
        .then(() => res.sendStatus(204))
        .catch((error) => res.json(error))
})



// REMOVE
// DELETE /furniture/624470c12ed7079ead53d4df

router.delete('/:id', (req, res) => {
    // get the furniture id
    const furnitureId = req.params.id
    // delete the furniture
    Furniture.findByIdAndRemove(furnitureId)
        .then(() => res.sendStatus(204))
        .catch((error) => {
            console.log(error)
            res.json({ error })
        })
})
////////////////////////////////////////////
// Export the Router
////////////////////////////////////////////
module.exports = router