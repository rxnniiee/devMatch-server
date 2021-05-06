const fs = require('fs/promises')

// I'm aware we're loading the data from disc all over again on each request, that's
// done because I cba to reload the server on each update to the file,
// plus it isn't something you should do anyway

const profile = async (req, res, next) => {
  res
    .status(200)
    .json(JSON.parse(await fs.readFile('src/mock/profile.json', 'utf-8')))
  next()
}

const queue = async (req, res, next) => {
  res
    .status(200)
    .json(JSON.parse(await fs.readFile('src/mock/queue.json', 'utf-8')))
  next()
}

const matches = async (req, res, next) => {
  res
    .status(200)
    .json(JSON.parse(await fs.readFile('src/mock/matches.json', 'utf-8')))
  next()
}

module.exports = {
  profile,
  queue,
  matches,
}
