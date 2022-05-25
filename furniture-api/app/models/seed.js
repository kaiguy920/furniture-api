//=======================================================
//                  IMPORT DEPENDENCIES
//=======================================================
const mongoose = require("mongoose");
const Furniture = require("./furniture");

//=======================================================
//                      SEED CODE
//=======================================================

// save the connection in a variable
const db = require('../../config/db')

const startFurniture = [
    { type: "couch", roomLocation: "living room", material: 'satin', accomodates: 4 },
    { type: "table", roomLocation: "kitchen", material: 'wood', accomodates: 6 },
    { type: "dresser", roomLocation: "bedroom", material: 'wood', accomodates: 2 },
    { type: "tv stand", roomLocation: "living room", material: 'wood', accomodates: 1 },
    { type: "nightstand", roomLocation: "bedroom", material: 'wood', accomodates: 1 },
    { type: "bookcase", roomLocation: "office", material: 'plywood', accomodates: 2 },
]

mongoose.connect(db, {
    useNewUrlParser: true,
})
    .then(() => {
        // then we remove all the pets, excepts the ones that have an owner
        Furniture.deleteMany({})
            .then(deletedFurniture => {
                console.log('deleted furniture', deletedFurniture)
                // then we create using the startPets array
                // we'll use console logs to check if it's working or if there are errors
                Furniture.create(startFurniture)
                    .then(newFurniture => {
                        console.log('the new furniture', newFurniture)
                        mongoose.connection.close()
                    })
                    .catch(err => {
                        console.log(err)
                        mongoose.connection.close()
                    })
            })
            .catch(error => {
                console.log(error)
                mongoose.connection.close()
            })
    })
    // then at the end, we close our connection to the db
    .catch(error => {
        console.log(error)
        mongoose.connection.close()
    })

