import { all, call, put, takeLeading, select } from 'redux-saga/effects'
import { signUpFail, signUpSuccess, signUpGoogleFail, signUpGoogleSuccess } from './signup.actions'
import { SIGN_UP_PENDING, SIGN_UP_GOOGLE_PENDING } from './signup.constants'
import { setUser } from '../user/user.actions'

import { signInWithGoogle } from '~/firebase/providers'
import { auth, firestore } from '~/firebase/firebase.utils'

// SIGN IN
export function* signUpAsync({
  payload: { email, password, firstName, lastName, phone: phoneNumber },
}) {
  try {
    const responseUserData = yield auth.createUserWithEmailAndPassword(email, password)

    const {
      photoURL,
      uid,
      emailVerified,
      metadata: { creationTime: dateCreated, lastSignInTime: dateLastSignedIn },
    } = responseUserData.user

    const userDocRef = firestore.doc(`users/${uid}`)

    const docSnapshot = yield userDocRef.get()

    if (!docSnapshot.exists) {
      const userData = {
        dateCreated,
        dateLastSignedIn,
        email,
        displayName: `${firstName} ${lastName}`,
        emailVerified,
        phoneNumber,
        photoURL,
        uid,
      }

      // @TODO check return value?
      const data = yield docSnapshot.ref.set(userData)

      yield put(signUpSuccess())
      yield put(setUser(userData))
    }
  } catch (err) {
    yield put(signUpFail(err))
  }
}

// listener
export function* signUpStart() {
  yield takeLeading(SIGN_UP_PENDING, signUpAsync)
}

// SIGN IN WITH GOOGLE PROVIDER
export function* signUpGoogleAsync() {
  try {
    const response = yield signInWithGoogle()

    const {
      user: {
        displayName,
        uid,
        photoURL,
        email,
        emailVerified,
        phoneNumber,
        metadata: { creationTime: dateCreated, lastSignInTime: dateLastSignedIn },
      },
    } = response

    const userData = {
      dateCreated,
      dateLastSignedIn,
      email,
      displayName,
      emailVerified,
      phoneNumber,
      photoURL,
      uid,
    }

    // create document for user, if does not exist
    const userDocRef = firestore.doc(`users/${uid}`)

    const docSnapshot = yield userDocRef.get()

    if (!docSnapshot.exists) {
      const userData = {
        dateCreated,
        dateLastSignedIn,
        email,
        displayName,
        emailVerified,
        phoneNumber,
        photoURL,
        uid,
      }

      // @TODO check return value?
      const data = yield docSnapshot.ref.set(userData)
    }

    yield put(signUpGoogleSuccess())
    yield put(setUser(userData))
  } catch (err) {
    yield put(signUpGoogleFail(err))
  }
}

// listener
export function* signUpGoogleStart() {
  yield takeLeading(SIGN_UP_GOOGLE_PENDING, signUpGoogleAsync)
}

// export sagas
export function* signUpSagas() {
  yield all([call(signUpStart), call(signUpGoogleStart)])
}
