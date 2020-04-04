import { all, put, call, takeLeading } from 'redux-saga/effects'

import { RESET_PASSWORD_PENDING } from './reset.constants'
import { resetPasswordSuccess, resetPasswordFail } from './reset.actions'

import { auth } from '~/firebase/firebase.utils'

function* resetPassword({ payload: emailAddress }) {
  try {
    // send password reset email!
    yield auth.sendPasswordResetEmail(emailAddress)
    yield put(resetPasswordSuccess())
  } catch (error) {
    yield put(resetPasswordFail(error))
  }
}

// listener
export function* resetPasswordStart() {
  yield takeLeading(RESET_PASSWORD_PENDING, resetPassword)
}

// export sagas
export function* resetPasswordSagas() {
  yield all([call(resetPasswordStart)])
}
