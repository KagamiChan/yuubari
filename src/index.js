import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import { MuiThemeProvider, createMuiTheme, createPalette } from 'material-ui/styles'
import lightGreen from 'material-ui/colors/lightGreen'
import amber from 'material-ui/colors/amber'

import { Yuubari } from './redux'

import 'typeface-roboto/index.css'
import 'material-design-icons-iconfont-only/iconfont/material-icons.css'

import './index.css'
import App from './app'
import registerServiceWorker from './registerServiceWorker'

const theme = createMuiTheme({
  palette: createPalette({
    primary: lightGreen,
    accent: amber,
  }),
})

const store = createStore(
  Yuubari,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
)

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <App />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root'),
)
registerServiceWorker()
