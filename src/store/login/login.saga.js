import { all, call, put, takeLeading } from 'redux-saga/effects'

import {
  signInSuccess,
  signInFail,
  providerSignInSuccess,
  providerSignInFail,
} from './login.actions'
import { SIGN_IN_PENDING, PROVIDER_SIGN_IN_PENDING } from './login.constants'

import { auth, firestore } from '~/firebase/firebase.utils'
import { signInWithGoogle, signInWithFacebook } from '~/firebase/providers'
import User from '~/classes/user'
import formatError from '~/helpers/formatError'
import { createUserProfileDocument } from '~/store/signup/signup.saga'
import { pageSwitchStart } from '../pageSwitch/pageSwitch.actions'

// SIGN IN
export function* signInAsync({ payload: { username, password } }) {
  try {
    const response = yield auth.signInWithEmailAndPassword(username, password)

    const {
      user: { uid, emailVerified },
    } = response

    const userDocRef = firestore.doc(`users/${uid}`)

    const docSnapshot = yield userDocRef.get()

    const userData = {
      ...(docSnapshot.data() || {}),
      emailVerified,
    }

    yield all([put(pageSwitchStart('/account/area')), put(signInSuccess(new User(userData)))])
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
        case 'facebook':
          return signInWithFacebook()
        default:
          return signInWithGoogle()
      }
    })()

    const {
      user: {
        displayName,
        uid,
        photoURL,
        email,
        // emailVerified, Email will always be "verified" when signing in with a provider, no need to double check that
        phoneNumber,
        metadata: { creationTime: dateCreated, lastSignInTime: dateLastSignedIn },
      },
    } = response
    const userData = {
      dateCreated,
      dateLastSignedIn,
      email,
      displayName,
      emailVerified: true,
      phoneNumber,
      photoURL,
      uid,
    }
    yield createUserProfileDocument(new User(userData), providerSignInSuccess)
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
