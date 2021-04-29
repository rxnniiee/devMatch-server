// modules
const express = require('express')
const Database = require('./services/database/DatabaseService')

// variables & setup
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// import routes
const helloRoute = require('./routes/hello')
const authRoute = require('./routes/auth')

// the main function of this server
// connects everything together
// listens to ports etc
async function init() {
  console.info('[System] -- Starting --')

  // todo: make sure database is reachable, then set it up

  // route middlewares
  app.use('/', helloRoute)
  app.use('/auth', authRoute)

  // make express listen on port defined in the environment variable 'EXPRESS_PORT'
  app.listen(process.env.PORT || process.env.EXPRESS_PORT, () =>
    console.info(
      `[System] Running @ http://localhost:${(process.env.PORT || process.env.EXPRESS_PORT)}`
    )
  )
}

// init() // invoke the main function to start everything up
Database.once('connected', init)

// handle database errors
Database.on('error', (err) => {
  console.error(
    `[Database] Error: code: '${err.code}' errno: ${err.errno} // (${Database.config.host}:${Database.config.port}/${Database.config.database})`
  )
  gracefulStop(`Unable to connect to the database! [${err.code}]`)
})

// might get moved to a separate module later
async function gracefulStop(reason) {
  console.info('[System] -- Stopping --')
  reason && console.info(`[System] Reason: ${reason}`)

  // todo: await pool end

  console.info('[System] Bye!')
  process.exit()
}

// handle interrupts to stop the server gracefully
process.on('SIGINT', () => gracefulStop('SIGINT')) // CTRL + C
process.on('SIGTERM', () => gracefulStop('SIGTERM'))
process.on('SIGUSR2', () => gracefulStop('SIGUSR2')) // nodemon's default restart signal
