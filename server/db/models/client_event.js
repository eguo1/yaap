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
  const timeToCheck = new Date(timestamp).getTime()
  const createdTime = new Date(this.createdAt).getTime()
  return Math.floor(
    ( timeToCheck - createdTime ) / 1000
  )
}

ClientEvent.returnData = function (timestamp) {
  const sixtySecCheck = () => {
    const time = new Date(timestamp)
    const convertedTime = new Date(time.getTime() - 60000)
    return convertedTime.toISOString().replace('T', ' ').replace('Z', '') + '+00'
  }
  return ClientEvent.findAll({
    where: {
      createdAt: {
        [Sequelize.Op.lte]: timestamp,
        [Sequelize.Op.gt]: sixtySecCheck()
      }
    }
  }).then(events => {
    return events.map(event => {
      const timeElapsed = event.timeData(timestamp)
      return {
        id: event.id,
        type: event.type,
        timeElapsed
      }
    })
  }).then(events => {
    const frequencyObj = events.reduce((result, event) => {
      if (result[event.timeElapsed]) {
        result[event.timeElapsed]++
      } else {
        result[event.timeElapsed] = 1
      }
      return result
    }, {})
    const resultArr = []
    for (let i = 0; i < 60; i++) {
      if (frequencyObj.hasOwnProperty(i+'')) {
        resultArr.push({ seconds: i, events: frequencyObj[i+''] })
      } else {
        resultArr.push({ seconds: i, events: 0 })
      }
    }
    return resultArr
  }).then(eventData => {
    const response = { eventData }
    const lastTime = (new Date(timestamp)).getTime()
    const updatedTime = (new Date(lastTime + 1000)).toISOString()
    response.latestFetch = updatedTime.replace('T', ' ').replace('Z', '') + '+00'
    return response
  })
}

module.exports.ClientEvent = ClientEvent
