'use strict'

const Sequelize = require('sequelize')
const { db } = require('../db')

const ClientEvent = db.define('client_event', {
  type: {
    type: Sequelize.STRING
  },
  page: {
    type: Sequelize.STRING
  },
  target: {
    type: Sequelize.STRING
  },
  time: {
    type: Sequelize.DATE
  },
  userAgent: {
    type: Sequelize.TEXT
  },
  userId: {
    type: Sequelize.INTEGER
  }
}, {
  getterMethods: {
    browser() {
      if (this.userAgent.includes('Firefox')) {
        return 'Firefox'
      }
    }
  }
})

module.exports.ClientEvent = ClientEvent
