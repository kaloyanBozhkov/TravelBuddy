import { combineReducers } from 'redux'
import loginReducer from './login/login.reducer'
import signUpReducer from './signup/signup.reducer'
import userReducer from './user/user.reducer'
import resetPasswordReducer from './reset/reset.reducer'

export default combineReducers({
  loginReducer,
  signUpReducer,
  userReducer,
  resetPasswordReducer,
})
