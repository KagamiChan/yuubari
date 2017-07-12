import React from 'react'
import ReactDOM from 'react-dom'

import 'typeface-roboto/index.css'
import 'material-design-icons-iconfont-only/iconfont/material-icons.css'

import './index.css'
import App from './app'
import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(<App />, document.getElementById('root'))
registerServiceWorker()
