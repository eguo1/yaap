'use strict'

import React from 'react'
import { Route } from 'react-router-dom'
import { Visualization, BrowserVisual } from './components'

const App = () => {
  return (
    <div>
      <Route exact path='/' component={Visualization} />
      <Route path='/browser' component={BrowserVisual} />
    </div>
  )
}

export default App
