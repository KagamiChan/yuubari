import React, { Component } from 'react'

import Header from './views/header'
import MainView from './views/main'

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <MainView />
      </div>
    )
  }
}

export default App
