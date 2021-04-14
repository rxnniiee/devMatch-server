// modules
const express = require('express')

// variables & setup
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// the main function of this server
// connects everything together
// listens to ports etc
async function init() {
  console.info('[System] -- Starting --')

  // todo: make sure database is reachable, then set it up

  // make express listen on port defined in the environment variable 'EXPRESS_PORT'
  app.listen(process.env.EXPRESS_PORT, () => console.info(`[System] Running @ http://localhost:${process.env.EXPRESS_PORT}`))
}

init() // invoke the main function to start everything up

// might get moved to a separate module later
async function gracefulStop(reason) {
  console.info('[System] -- Stopping --')
  reason && console.info(`[System] Reason: ${reason}`)

  // todo: await pool end

  console.info('[System] Bye!')
  process.exit()
}

// handle interrupts to stop the server gracefully
process.on('SIGINT', () => gracefulStop('SIGINT'))    // CTRL + C
process.on('SIGTERM', () => gracefulStop('SIGTERM'))
process.on('SIGUSR2', () => gracefulStop('SIGUSR2'))  // nodemon's default restart signal
