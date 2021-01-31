//liberary
const path = require("path")
//body parser
const bodyParser = require("body-parser")
//favicon
const favicon = require('serve-favicon')
//passport
const passport = require("passport")
require('./passport.config.js')(passport)
//session
const session = require('express-session')
//express
const express = require('express')



module.exports = function(app){
    //body parser middleware
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({extended: true}))
    //favicon middleware
    app.use(favicon(path.join(__dirname,'../','public','img','favicon.png')))
    //express middleware
    app.use(express.static(path.join(__dirname,'../','public')))
    //session middleware
    app.use(session({secret: 'secret',resave: true,saveUninitialized: true}))
    //passport middleware
    app.use(passport.initialize())
    app.use(passport.session())
    return app
}