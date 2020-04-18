import { all, call } from 'redux-saga/effects'

// Load sagas
import { loginSagas } from './login/login.saga'
import { signUpSagas } from './signup/signup.saga'
import { resetPasswordSagas } from './reset/reset.saga'
import { logoutSagas } from './logout/logout.saga'
import { updateUserSagas } from './updateUser/updateUser.saga'
import { tripSagas } from './trip/trip.sagas'

// channel sagas
import { watchLoginSagas } from './login/login.channel.saga'
import { watchUserSagas } from './user/user.channel.saga'

function* rootSaga() {
  yield all([
    call(loginSagas),
    call(signUpSagas),
    call(resetPasswordSagas),
    call(logoutSagas),
    call(watchLoginSagas),
    call(updateUserSagas),
    call(watchUserSagas),
    call(tripSagas),
  ])
}

export default rootSaga
