import React from 'react'
import ReactDOM from 'react-dom'

import { MuiThemeProvider, createMuiTheme, createPalette, withStyles, createStyleSheet } from 'material-ui/styles'
import lightGreen from 'material-ui/colors/lightGreen'
import amber from 'material-ui/colors/amber'

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

ReactDOM.render(<MuiThemeProvider theme={theme}><App /></MuiThemeProvider>, document.getElementById('root'))
registerServiceWorker()
