import { all, call } from 'redux-saga/effects'

// Load sagas
import { loginSagas } from './login/login.saga'
import { signUpSagas } from './signup/signup.saga'

function* rootSaga() {
  yield all([call(loginSagas), call(signUpSagas)])
}

export default rootSaga
