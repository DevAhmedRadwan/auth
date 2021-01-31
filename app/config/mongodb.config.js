const mongoose = require('mongoose')
const config = require('./config.json')

module.exports = async function (){

    try {
        await mongoose.connect(config.DB_URL,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })
        console.log('connected to MongoDB');
    } catch(error) {
        console.log('error connection to MongoDB:', error.message);
    }
    
    return mongoose.connection
}
