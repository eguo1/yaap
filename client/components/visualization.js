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
      <div style={{ maxWidth: '80%' }}>
        <h1>Yet Another Analytics Platform</h1>
        <hr />
        <VictoryChart
          theme={VictoryTheme.material}
          height={400}
          width={1000}
          domainPadding={50}
          animate={{ duration: 400 }}
        >
          <VictoryAxis
            tickValues={[0, 15, 30, 45, 60]}
            tickFormat={['', '', '', '', '']}
          />
          <VictoryAxis
            dependentAxis
            tickValues={[0, 2, 4, 6, 8]}
          />
          <VictoryBar
            data={this.props.eventData}
            barRatio={1.0}
            alignment='start'
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
