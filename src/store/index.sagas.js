import { all, call } from 'redux-saga/effects'

// Load sagas
import { loginSagas } from './login/login.saga'
import { signUpSagas } from './signup/signup.saga'
import { resetPasswordSagas } from './reset/reset.saga'
import { logoutSagas } from './logout/logout.saga'

// channel sagas
import { watchLoginSagas } from './login/loginChannel.saga'

function* rootSaga() {
  yield all([
    call(loginSagas),
    call(signUpSagas),
    call(resetPasswordSagas),
    call(logoutSagas),
    call(watchLoginSagas),
  ])
}

export default rootSaga
