import { all, call, put, takeLeading, takeLatest, select } from 'redux-saga/effects'

import { signInSuccess, signInFail, googleSignInSuccess, googleSignInFail } from './login.actions'
import { SIGN_IN_PENDING, GOOGLE_SIGN_IN_PENDING } from './login.constants'

// SIGN IN
export function* signInAsync({ payload: { username, password } }) {
  try {
    yield put(signInSuccess({ username, password }))
  } catch (err) {
    yield put(signInFail(err))
  }
}

// listener
export function* signInStart() {
  yield takeLeading(SIGN_IN_PENDING, signInAsync)
}

// GOOGLE SIGN IN
export function* googleSignInAsync(user) {
  try {
    yield put(googleSignInSuccess(user))
  } catch (err) {
    yield put(googleSignInFail(err))
  }
}

// listener
export function* googleSignInStart() {
  yield takeLeading(GOOGLE_SIGN_IN_PENDING, signInAsync)
}

// export sagas
export function* loginSagas() {
  yield all([call(signInStart), call(googleSignInStart)])
}
