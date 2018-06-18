'use strict'

import React from 'react'
import { connect } from 'react-redux'
import { fetchEventData } from '../store/client_events'

class Visualization extends React.Component {
  render () {
    return (
      <div>
        <h1>Yet Another Analytics Platform</h1>
        <hr />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    eventData: state.eventData,
    latestFetch: state.latestFetch
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchEventData: timestamp => dispatch(fetchEventData(timestamp))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Visualization)
