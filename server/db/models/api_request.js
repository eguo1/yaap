'use strict'

const Sequelize = require('sequelize')
const { db } = require('../db')

const APIRequest = db.define('api_request', {
  type: {
    type: Sequelize.ENUM('GET', 'POST', 'PUT', 'DELETE'),
  },
  endpoint: {
    type: Sequelize.STRING
  },
  body: {
    type: Sequelize.STRING
  },
  time: {
    type: Sequelize.DATE
  },
  IP: {
    type: Sequelize.STRING
  },
})

module.exports.APIRequest = APIRequest
