import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import 'antd/dist/antd.css'

import { Yuubari } from './redux'

import './index.css'
import App from './app'
import registerServiceWorker from './registerServiceWorker'

const store = createStore(
  Yuubari,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
)
registerServiceWorker()
