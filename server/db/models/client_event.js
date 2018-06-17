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
  },
  ip: {
    type: Sequelize.STRING
  }
}, {
  getterMethods: {
    browser () {
      if (this.userAgent.includes('Firefox/')) {
        return 'Firefox'
      } else if (this.userAgent.includes('Chrome/') && !this.userAgent.includes('OPR')) {
        return 'Chrome'
      } else if (this.userAgent.includes('OPR/')) {
        return 'Opera'
      } else if (this.userAgent.includes('Safari/') && !this.userAgent.includes('Chrome')) {
        return 'Safari'
      } else if (this.userAgent.includes('MSIE')) {
        return 'Internet Explorer'
      } else if (this.userAgent.includes('bot')) {
        return 'Bot'
      } else return 'Unknown'
    }
  }
})

ClientEvent.hook('beforeValidate', (clientEvent) => {
  const reformattedIp = clientEvent.ip.slice(7)
  clientEvent.ip = reformattedIp
})

ClientEvent.prototype.timeData = function (timestamp) {
  return Math.floor(
    Number(timestamp.slice(14, 19).replace(':', '.')) -
    Number(this.createdAt.toISOString().slice(14, 19).replace(':', '.'))
  )
}

module.exports.ClientEvent = ClientEvent
