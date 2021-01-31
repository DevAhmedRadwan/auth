const {ensureAuthenticated} = require("../config/auth.config.js")

const main = require("./main-routes")
const auth = require("./user-route")

module.exports = function(app){
    app.use("/",main)
    app.use("/auth",ensureAuthenticated,auth)
    return app
}