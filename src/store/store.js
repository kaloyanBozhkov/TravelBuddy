import { createStore, applyMiddleware } from 'redux'
import { persistStore } from 'redux-persist'
import logger from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './index.sagas'
import reducer from './index.reducer'

const sagaMiddleware = createSagaMiddleware()
const middlewares = [sagaMiddleware]

// Run logger in dev mode only
if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger)
}

export const store = createStore(reducer, applyMiddleware(...middlewares))

sagaMiddleware.run(rootSaga)

export const persistor = persistStore(store)
