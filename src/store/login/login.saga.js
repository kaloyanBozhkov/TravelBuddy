import { all, call, put, takeLeading, takeLatest, select } from 'redux-saga/effects'

import { signInSuccess, signInFail, googleSignInSuccess, googleSignInFail } from './login.actions'
import { SIGN_IN_PENDING, GOOGLE_SIGN_IN_PENDING } from './login.constants'
import { setUser } from '../user/user.actions'

import { auth, firestore } from '~/firebase/firebase.utils'
import user from '~/classes/user'

// SIGN IN
export function* signInAsync({ payload: { username, password } }) {
  try {
    const response = yield auth.signInWithEmailAndPassword(username, password)

    const {
      user: { uid },
    } = response

    const userDocRef = firestore.doc(`users/${uid}`)

    const docSnapshot = yield userDocRef.get()

    const userData = docSnapshot.data()

    yield put(signInSuccess())
    yield put(setUser(new user(userData)))
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
