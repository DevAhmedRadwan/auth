const middleware = require('./config/middleware.config.js')
const routes = require('./routes/routes.js')

module.exports = async function(app){
    app = middleware(app)
    app = routes(app)
    await require('./config/mongodb.config.js')()
}

