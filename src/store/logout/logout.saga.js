import { all, call, put, takeLeading } from 'redux-saga/effects'

import { signOutSuccess, signOutFail } from './logout.actions'
import { SIGN_OUT_PENDING } from './logout.constants'
import { setUser } from '../user/user.actions'

// SIGN IN
export function* signOut() {
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
