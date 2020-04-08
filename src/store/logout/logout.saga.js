import { all, call, put, takeLeading, delay } from 'redux-saga/effects'

import { signOutSuccess } from './logout.actions'
import { SIGN_OUT_PENDING } from './logout.constants'
import { setUser } from '../user/user.actions'
import { pageSwitchStart } from '../pageSwitch/pageSwitch.actions'

// SIGN IN
export function* signOut() {
  // start page switch for signout process
  yield put(pageSwitchStart('/account/signin'))

  // wait for switch to end
  yield delay(450)

  yield all([put(setUser(null)), put(signOutSuccess())])
}

// listener
export function* signOutStart() {
  yield takeLeading(SIGN_OUT_PENDING, signOut)
}

// export sagas
export function* logoutSagas() {
  yield all([call(signOutStart)])
}
