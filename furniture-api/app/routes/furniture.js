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
    console.log('req.body.furniture', req.body.furniture)
    Furniture.create(req.body.furniture)
        .then((furniture) => {
            console.log('this was returned from create', furniture)
            res.status(201).json({ furniture: furniture.toObject() })
        })
        .catch((err) => {
            console.log(err)
            res.json({ err })
        })
})

// UPDATE
// PATCH /furniture/624470c12ed7079ead53d4df

router.patch('/:id', (req, res) => {
    console.log("update req.body", req.body);
    const furnitureId = req.body.furniture._id
    console.log("furniture id", furnitureId);
    const { type, roomLocation, material, accomodates } = req.body.furniture
    Furniture.findByIdAndUpdate(furnitureId, { type, roomLocation, material, accomodates }, { new: true })
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