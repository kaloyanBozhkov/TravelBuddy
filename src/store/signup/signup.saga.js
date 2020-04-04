import { all, call, put, takeLeading, select } from 'redux-saga/effects'
import { signUpFail, signUpSuccess, signUpGoogleFail, signUpGoogleSuccess } from './signup.actions'
import { SIGN_UP_PENDING, SIGN_UP_GOOGLE_PENDING } from './signup.constants'
import { setUser } from '../user/user.actions'

import { signInWithGoogle } from '~/firebase/providers'
import { auth, firestore } from '~/firebase/firebase.utils'

import user from '~/classes/user'

// create document for user, if not existing
export function* createUserProfileDocument(userData, onSuccess) {
  const userDocRef = firestore.doc(`users/${userData.uid}`)

  const docSnapshot = yield userDocRef.get()

  if (!docSnapshot.exists) {
    // @TODO check return value?
    const data = yield docSnapshot.ref.set(userData.getUser())

    yield put(onSuccess())
    yield put(setUser(userData))
  }
}

// SIGN UP & login
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

    yield call(createUserProfileDocument, new user(userData), signUpSuccess)

    // since this is normal register process, send confirmation email to verify email address
    yield responseUserData.user.sendEmailVerification()
  } catch (err) {
    const error =
      typeof err === 'object' && err.hasOwnProperty('message')
        ? err
        : { message: 'Oops, something went wrong!' }

    if (process.env.NODE_ENV === 'development') {
      console.log(error)
    }

    yield put(signUpFail(error))
  }
}

// listener
export function* signUpStart() {
  yield takeLeading(SIGN_UP_PENDING, signUpAsync)
}

// SIGN UP WITH GOOGLE PROVIDER & login
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

    yield call(createUserProfileDocument, new user(userData), signUpGoogleSuccess)
  } catch (err) {
    const error =
      typeof err === 'object' && err.hasOwnProperty('message')
        ? err
        : { message: 'Oops, something went wrong!' }

    if (process.env.NODE_ENV === 'development') {
      console.log(error)
    }
    yield put(signUpGoogleFail(error))
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
