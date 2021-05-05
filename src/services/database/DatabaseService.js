// modules
const mysql = require('mysql2/promise')
const EventEmitter = require('events')
const DB_QUERIES = require('./queries')

class DatabaseService extends EventEmitter {
  connection = null

  constructor() {
    super()
    this.config = {
      database: process.env.DB,
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
    }
    this.connect()

    this.once('connected', this.setup)
  }

  /**
   * Attempts to connect to the database,
   * will emit 'connected' or 'error'
   * @returns {Promise<void>}
   */
  async connect() {
    if (this.connection) {
      return // we already have a connection, don't bother
    }
    await mysql
      .createConnection(this.config)
      .then(async (connection) => {
        this.connection = connection
        this.emit('connected')
      })
      .catch((err) => {
        // console.error(err)
        this.emit('error', err)
      })
  }

  /**
   * Query the database
   * @param {String} query query string
   * @param {Array<String|Number>} parameters query parameters
   * @returns {Promise<Array>} result
   */
  async query(query, parameters) {
    const [result] = await this.connection.query(query, parameters)
    return result
  }

  /**
   * Destroys the connection
   * @returns {Promise<void>} promise
   */
  async destroy() {
    if (!this.connection) {
      return
    }
    await this.connection.destroy()
  }

  /**
   * Create application tables
   * @returns {Promise<void>} promise
   */
  async setup() {
    // nuke tables when requested
    if (process.env.DB_NUKE) {
      await this.nuke()
    }
    for (const key in DB_QUERIES) {
      const createTableQuery = DB_QUERIES[key]?.create_table
      if (!createTableQuery) {
        continue
      }
      await this.query(createTableQuery)
        .then((result) => {
          if (result.warningStatus) {
            return // no warnings, table already created
          }
          console.info(`[Database] Created table '${key}'`)
        })
        .catch((err) => {
          console.error(`[Database] Error creating table '${key}'`)
          console.error(err)
        })
    }
    this.emit('ready')
  }

  /**
   * Nuke (drop) all tables from the database
   * @returns {Promise<void>} promise
   */
  async nuke() {
    console.info('[Database] ! Nuking tables...')
    for (const key of Object.keys(DB_QUERIES).reverse()) {
      const nukeTableQuery = DB_QUERIES[key]?.delete_table
      if (!nukeTableQuery) {
        continue
      }
      await this.query(nukeTableQuery)
        .then((result) => {
          if (result.warningStatus) {
            return
          }
          console.info(`[Database - Nuke] Dropped table '${key}'`)
        })
        .catch((err) => {
          console.error(
            `[Database - Nuke] Failed to drop table '${key}' [${err.message}]`
          )
        })
    }
  }
}

module.exports = new DatabaseService()
