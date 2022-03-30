//=======================================================
//                  IMPORT DEPENDENCIES
//=======================================================
const mongoose = require("./connection");
const Fruit = require("./fruit");

//=======================================================
//                      SEED CODE
//=======================================================

// save the connection in a variable
const db = mongoose.connection;

db.on('open', () => {
    console.log('hittt')
    const startFruits = [
        { name: "Orange", color: "orange", readyToEat: false },
        { name: "Grape", color: "purple", readyToEat: false },
        { name: "Banana", color: "orange", readyToEat: false },
        { name: "Strawberry", color: "red", readyToEat: false },
        { name: "Coconut", color: "brown", readyToEat: false },
    ]

    Fruit.remove({})
        .then(deletedFruits => {
            console.log("this is what remove returns", deletedFruits)
            // then we create with our seed data
            Fruit.create(startFruits)
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
