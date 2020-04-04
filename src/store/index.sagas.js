import { all, call } from 'redux-saga/effects'

// Load sagas
import { loginSagas } from './login/login.saga'
import { signUpSagas } from './signup/signup.saga'
import { resetPasswordSagas } from './reset/reset.saga'

function* rootSaga() {
  yield all([call(loginSagas), call(signUpSagas), call(resetPasswordSagas)])
}

export default rootSaga
