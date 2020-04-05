import { all, call, put, takeLeading } from 'redux-saga/effects'
import {
  signUpFail,
  signUpSuccess,
  signUpProviderFail,
  signUpProviderSuccess,
} from './signup.actions'
import { providerSignInSuccess } from '~/store/login/login.actions'
import { SIGN_UP_PENDING, SIGN_UP_PROVIDER_PENDING } from './signup.constants'
import { setUser } from '../user/user.actions'

import { signInWithGoogle, signInWithFacebook } from '~/firebase/providers'
import { auth, firestore } from '~/firebase/firebase.utils'
import formatError from '~/helpers/formatError'
import User from '~/classes/user'

// create document for user, if not existing
/**
 * @param  {User class} userData
 * @param  {callback fn to run before setting user} onSuccess
 */
export function* createUserProfileDocumentAndSignIn(userData, onSuccess) {
  const userDocRef = firestore.doc(`users/${userData.uid}`)

  const docSnapshot = yield userDocRef.get()
  const puts = [put(setUser(userData))]

  if (!docSnapshot.exists) {
    // if user document never created, create one!
    yield docSnapshot.ref.set(userData.getUser())
  } else {
    puts.unshift(put(providerSignInSuccess()))
    // if user exists already, just sign them in
    const userData = docSnapshot.data()

    // do this by replacing serData with new userData fetched
    puts[puts.length - 1] = put(setUser(new User(userData)))
  }

  // if success fn is passed, then run it first
  if (onSuccess) {
    puts.unshift(put(onSuccess()))
  }

  yield all(puts)
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

    yield call(createUserProfileDocumentAndSignIn, new User(userData), signUpSuccess)

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

    yield call(createUserProfileDocumentAndSignIn, new User(userData), signUpProviderSuccess)
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
