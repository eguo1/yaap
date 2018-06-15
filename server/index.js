'use strict'

const path = require('path')
const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const { db } = require('./db')
const PORT = process.env.PORT || 3030
const app = express()

const createApp = () => {
  app.use(morgan('dev'))

  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))

  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  })

  app.use('/api', require('./api'))

  app.use(express.static(path.join(__dirname, '..', 'public')))

  app.use((req, res, next) => {
    if (path.extname(req.path).length) {
      const err = new Error('Not found')
      err.status = 404
      next(err)
    } else {
      next()
    }
  })

  app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public/index.html'))
  })

  app.use((err, req, res, next) => {
    console.error(err)
    console.error(err.stack)
    res.status(err.status || 500).send(err.message || 'Internal server error.')
  })
}

const startListening = () => {
  app.listen(PORT, () => console.log(`We're live on port ${PORT}!`))
}

const syncDb = () => db.sync({ force: true })

if (require.main === module) {
  syncDb()
    .then(createApp)
    .then(startListening)
} else {
  createApp()
}

module.exports = app
