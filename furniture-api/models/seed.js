//=======================================================
//                  IMPORT DEPENDENCIES
//=======================================================
const mongoose = require("./connection");
const Furniture = require("./furniture");

//=======================================================
//                      SEED CODE
//=======================================================

// save the connection in a variable
const db = mongoose.connection;

db.on('open', () => {
    const startFurniture = [
        { type: "couch", roomLocation: "living room", material: 'satin', accomodates: 4 },
        { type: "table", roomLocation: "kitchen", material: 'wood', accomodates: 6 },
        { type: "dresser", roomLocation: "bedroom", material: 'wood', accomodates: 2 },
        { type: "tv stand", roomLocation: "living room", material: 'wood', accomodates: 1 },
        { type: "nightstand", roomLocation: "bedroom", material: 'wood', accomodates: 1 },
        { type: "bookcase", roomLocation: "office", material: 'plywood', accomodates: 2 },
    ]

    Furniture.remove({})
        .then(deletedFurniture => {
            console.log("this is what remove returns", deletedFurniture)
            // then we create with our seed data
            Furniture.create(startFurniture)
                .then(data => {
                    console.log('here are the new seed fruits', data);
                    db.close()
                })
                .catch(error => {
                    console.log(error)
                    db.close()
                })
        })
        .catch(error => {
            console.log(error)
            db.close()
        })


    // then we can send if we want to see that data
})
