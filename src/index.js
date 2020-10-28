import React from 'react'
import ReactDOM from 'react-dom'
import App from './containers/App'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import 'scss/general.scss'
import 'scss/overwrite.scss'
import { store, persistor } from '~/store/store'
import { PersistGate } from 'redux-persist/integration/react'

ReactDOM.render(
  <BrowserRouter basename="/travelbuddy">
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
)
