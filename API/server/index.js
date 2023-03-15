const express = require('express')
const cors = require('cors')
const db = require('../database/db')

class Server {
  constructor() {
    this.app = express()
    this.port = process.env.PORT
    this.clientsPath = '/api/clients'
    this.dbConnection();
    // Middlewares
    this.middlewares()
    // Rutas de mi aplicación
    this.routes()
  }

  middlewares() {
    // CORS
    this.app.use(cors())

    // Lectura y parseo del body
    this.app.use(express.json())

    // Directorio Público
    this.app.use(express.static('public'))
  }
  dbConnection = async () => {
    try {
      await db.authenticate();
      console.log('Connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  }
  routes() {
    this.app.use(this.clientsPath, require('../routes/clients'))
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log('Servidor corriendo en puerto', this.port)
    })
  }
}

module.exports = Server
