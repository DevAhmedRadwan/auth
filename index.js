//env configuration
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

async function start(){
  const express = require('express')
  let app = express()
  await require('./app/app.js')(app)

  //Listen to Port
  const port = process.env.port;
  app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
  })
}

start();