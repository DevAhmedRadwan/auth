const path = require('path')
const express = require("express")
const passport = require("passport")
const User = require('../models/user-model')
const {forwardAuthenticated} = require("../config/auth.config")
const config = require("../config/config.json")
const bcrypt = require ('bcrypt')

let router = express.Router()

//Home
router.get("/",(req,res)=>{
    res.status(200).sendFile(path.join(__dirname , '../html/index.html'))
});

//Login
router.get("/login",forwardAuthenticated,(req,res)=>{
    res.status(200).sendFile(path.join(__dirname , '../html/login.html'))
});

router.post("/login",forwardAuthenticated,(req,res)=>{
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: false
    })(req, res);
});

//register
router.get("/register",forwardAuthenticated,(req,res)=>{ 
    res.status(200).sendFile(path.join(__dirname , '../html/register.html'))
});

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return email.match(re)
}

function validateUserName(user_name){
    const re = /^[A-Za-z]+$/
    return user_name.match(re)
}

async function hashingPassword(password){
    const salt = await bcrypt.genSalt(config.HASH_SALT)
    hash = await bcrypt.hash(password, salt)
    return hash
}

router.post("/register",forwardAuthenticated,async (req,res)=>{
    const { userName:user_name, email, password, password_confirm } = req.body
    if(validateUserName(user_name) && validateEmail(email) && password === password_confirm){
        hashed_password = await hashingPassword(password)
        let new_user = new User({
            userName : user_name,
            email : email,
            password : hashed_password
        })
        await new_user.save()
        res.redirect("/login")
        return 
    }
    res.redirect("/register")
});

module.exports = router;