
const localStrategy = require("passport-local").Strategy
const User = require('../models/user-model')
const bcrypt = require ('bcrypt')

module.exports = function initialize(passport){

    passport.use(new localStrategy({ usernameField: 'email' }, (email, password, done) => {
            // Match user
            User.findOne({email: email}).then(user => {
                if (!user) {
                    return done(null, false, { message: 'That email is not registered' })
                }
                bcrypt.compare(password, user.password, function(err, result) {
                    if (result) {
                        return done(null, user)
                    }
                    else {
                        return done(null, false, { message: 'Password incorrect' })
                    }
                })
            })
        })
    )

    passport.serializeUser((user , next)=>{return next(null,user.id)})
    passport.deserializeUser((id , next)=>{return next(null,User.findById(id))})
}
