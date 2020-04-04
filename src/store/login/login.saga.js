import { all, call, put, takeLeading } from 'redux-saga/effects'

import {
  signInSuccess,
  signInFail,
  providerSignInSuccess,
  providerSignInFail,
} from './login.actions'
import { SIGN_IN_PENDING, PROVIDER_SIGN_IN_PENDING } from './login.constants'
import { setUser } from '../user/user.actions'

import { auth, firestore } from '~/firebase/firebase.utils'
import { signInWithGoogle } from '~/firebase/providers'
import User from '~/classes/user'
import formatError from '~/helpers/formatError'

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
    yield put(setUser(new User(userData)))
  } catch (err) {
    yield put(signInFail(formatError(err)))
  }
}

// listener
export function* signInStart() {
  yield takeLeading(SIGN_IN_PENDING, signInAsync)
}

// PROVIDER SIGN IN
export function* providerSignInAsync({ payload: provider }) {
  try {
    const response = yield (() => {
      switch (provider) {
        case 'google':
          return signInWithGoogle()
        default:
          return signInWithGoogle()
      }
    })()

    const {
      user: { uid },
    } = response

    const userDocRef = firestore.doc(`users/${uid}`)

    const docSnapshot = yield userDocRef.get()

    const userData = docSnapshot.data()

    yield put(providerSignInSuccess())
    yield put(setUser(new User(userData)))
  } catch (err) {
    yield put(providerSignInFail({ ...formatError(err), provider }))
  }
}

// listener
export function* providerSignInStart() {
  yield takeLeading(PROVIDER_SIGN_IN_PENDING, providerSignInAsync)
}

// export sagas
export function* loginSagas() {
  yield all([call(signInStart), call(providerSignInStart)])
}
