/////////////////////////////////
// import dependencies
/////////////////////////////////
const mongoose = require('mongoose')

/////////////////////////////////
// define our furniture model
/////////////////////////////////
// pull the schema and model constructors from mongoose
// we're going to use something called destructuring to accomplish this
const { Schema, model } = mongoose

// make our furniture schema
const furnitureSchema = new Schema({
    type: { type: String },
    roomLocation: { type: String, enum: ["living room", "bedroom", "kitchen", "bathroom", "dining room", "office", "library", "spare room"] },
    material: { type: String },
    accomodates: { type: Number }
})

// make our furniture model
const Furniture = model("Furniture", furnitureSchema)

/////////////////////////////////
// Export our Model
/////////////////////////////////
module.exports = Furniture