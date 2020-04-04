import { all, call, put, takeLeading, select } from 'redux-saga/effects'
import {
  signUpFail,
  signUpSuccess,
  signUpProviderFail,
  signUpProviderSuccess,
} from './signup.actions'
import { providerSignInSuccess } from '~/store/login/login.actions'
import { SIGN_UP_PENDING, SIGN_UP_PROVIDER_PENDING } from './signup.constants'
import { setUser } from '../user/user.actions'

import { signInWithGoogle } from '~/firebase/providers'
import { auth, firestore } from '~/firebase/firebase.utils'
import formatError from '~/helpers/formatError'
import User from '~/classes/user'

// create document for user, if not existing
export function* createUserProfileDocument(userData, onSuccess) {
  const userDocRef = firestore.doc(`users/${userData.uid}`)

  const docSnapshot = yield userDocRef.get()

  if (!docSnapshot.exists) {
    // @TODO check return value?
    const data = yield docSnapshot.ref.set(userData.getUser())

    yield put(onSuccess())
    yield put(setUser(userData))
  } else {
    // if user exists already, just sign them in

    const userData = docSnapshot.data()

    yield all([put(onSuccess()), put(providerSignInSuccess()), put(setUser(userData))])
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

    yield call(createUserProfileDocument, new User(userData), signUpSuccess)

    // since this is normal register process, send confirmation email to verify email address
    yield responseUserData.user.sendEmailVerification()
  } catch (err) {
    yield put(signUpFail(formatError(err)))
  }
}

// listener
export function* signUpStart() {
  yield takeLeading(SIGN_UP_PENDING, signUpAsync)
}

// SIGN UP WITH PROVIDER PROVIDER & login
export function* signUpProviderAsync({ payload: provider }) {
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

    yield call(createUserProfileDocument, new User(userData), signUpProviderSuccess)
  } catch (err) {
    yield put(signUpProviderFail({ ...formatError(err), provider }))
  }
}

// listener
export function* signUpProviderStart() {
  yield takeLeading(SIGN_UP_PROVIDER_PENDING, signUpProviderAsync)
}

// export sagas
export function* signUpSagas() {
  yield all([call(signUpStart), call(signUpProviderStart)])
}
