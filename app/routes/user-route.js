//lib
const express = require("express");
const passport = require("passport");
const path = require('path');
const User = require('../models/user-model');

//init
let router = express.Router();

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

//export
module.exports = router;