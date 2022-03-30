// =============================================================
//                      IMPORT DEPENDENCIES
// =============================================================
require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const methodOverride = require('method-override')
const FruitRouter = require('../controllers/fruit')
const UserRouter = require('../controllers/user')
const session = require('express-session')
const MongoStore = require('connect-mongo')

// =============================================================
//                        MIDDLEWARE FUNCTION
// =============================================================
const middleware = (app) => {
    app.use(morgan('tiny'))
    app.use(methodOverride('_method'))
    app.use(express.urlencoded({ extended: true }))
    app.use(express.static('public'))
    app.use(
        session({
            secret: process.env.SECRET,
            store: MongoStore.create({ mongoUrl: process.env.DATABASE_URL }),
            saveUninitialized: true,
            resave: false,
        })
    )
}

// =============================================================
//                       EXPORT MIDDLEWARE FUNCTION
// =============================================================
module.exports = middleware