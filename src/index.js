import React from 'react'
import ReactDOM from 'react-dom'
import App from './containers/App'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import 'scss/general.scss'
import store from '~/store/store'

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
)
