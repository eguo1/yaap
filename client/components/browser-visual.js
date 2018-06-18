'use strict'

import React from 'react'
import { connect } from 'react-redux'
import { fetchBrowserData } from '../store/client_events'
import {
  VictoryBar,
  VictoryChart,
  VictoryAxis,
  VictoryTheme,
  VictoryStack
} from 'victory'

class BrowserVisual extends React.Component {
  constructor (props) {
    super(props)
    this.props.fetchBrowserData(this.props.latestFetch)
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
    this.props.fetchBrowserData(this.props.latestFetch)
  }

  render () {
    return (
      <div style={{ maxWidth: '80%' }}>
        <h1>YAAP - Browser Beta Version</h1>
        <hr />
        <VictoryChart
          theme={VictoryTheme.material}
          height={600}
          width={1000}
          domainPadding={50}
        >
          <VictoryAxis
            tickValues={[0, 15, 30, 45, 60]}
            tickFormat={['', '', '', '', '']}
          />
          <VictoryAxis
            dependentAxis
            tickValues={[0, 4, 8, 12, 16, 20]}
          />
          <VictoryStack>
            <VictoryBar
              data={this.props.browserData.chrome}
              barRatio={1.0}
              alignment='start'
              x='seconds'
              y='events'
            />
            <VictoryBar
              data={this.props.browserData.firefox}
              barRatio={1.0}
              alignment='start'
              x='seconds'
              y='events'
            />
            <VictoryBar
              data={this.props.browserData.opera}
              barRatio={1.0}
              alignment='start'
              x='seconds'
              y='events'
            />
            <VictoryBar
              data={this.props.browserData.safari}
              barRatio={1.0}
              alignment='start'
              x='seconds'
              y='events'
            />
            <VictoryBar
              data={this.props.browserData.ie}
              barRatio={1.0}
              alignment='start'
              x='seconds'
              y='events'
            />
            <VictoryBar
              data={this.props.browserData.bot}
              barRatio={1.0}
              alignment='start'
              x='seconds'
              y='events'
            />
            <VictoryBar
              data={this.props.browserData.unknown}
              barRatio={1.0}
              alignment='start'
              x='seconds'
              y='events'
            />
          </VictoryStack>
        </VictoryChart>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    browserData: state.browserData,
    latestFetch: state.latestFetch
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchBrowserData: timestamp => dispatch(fetchBrowserData(timestamp))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BrowserVisual)
