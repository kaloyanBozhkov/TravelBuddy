import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

// load reducers
import loginReducer from './login/login.reducer'
import logoutReducer from './logout/logout.reducer'
import signUpReducer from './signup/signup.reducer'
import userReducer from './user/user.reducer'
import resetPasswordReducer from './reset/reset.reducer'
import pageSwitchReducer from './pageSwitch/pageSwitch.reducer'
import tripReducer from './trip/trip.reducer'

// what reducers to persist
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['userReducer', 'tripReducer'],
}

const rootReducer = combineReducers({
  loginReducer,
  logoutReducer,
  signUpReducer,
  userReducer,
  resetPasswordReducer,
  pageSwitchReducer,
  tripReducer,
})

export default persistReducer(persistConfig, rootReducer)
