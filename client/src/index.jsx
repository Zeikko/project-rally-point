import React from 'react'
import ReactDOM from 'react-dom'
import 'babel-polyfill'
import { Provider } from 'react-redux'
import store from './store'
import App from './components/App/App'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.getElementById('app'),
)
