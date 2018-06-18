'use strict'

import React from 'react'
import { connect } from 'react-redux'
import { fetchEventData } from '../store/client_events'
import {
  VictoryBar,
  VictoryChart,
  VictoryAxis,
  VictoryTheme
} from 'victory'

class Visualization extends React.Component {
  constructor (props) {
    super(props)
    this.props.fetchEventData(this.props.latestFetch)
    this.state = {
      timer: null
    }
  }

  componentDidMount () {
    const timer = setInterval(this.tick, 1000)
    this.setState({ timer })
  }

  componentWillUnmount () {
    this.clearInterval(this.state.timer)
  }

  tick = () => {
    this.props.fetchEventData(this.props.latestFetch)
  }

  render () {
    return (
      <div style={{ maxWidth: '30%' }}>
        <h1>Yet Another Analytics Platform</h1>
        <hr />
        <VictoryChart
          theme={VictoryTheme.material}
          domainPadding={20}
          animate={{ duration: 2000 }}
        >
          <VictoryAxis
            tickValues={[0, 15, 30, 45, 60]}
          />
          <VictoryAxis
            dependentAxis
            tickValues={[0, 4, 8, 12]}
          />
          <VictoryBar
            data={this.props.eventData}
            barRatio={1.0}
            height={400}
            x='seconds'
            y='events'
          />
        </VictoryChart>
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
