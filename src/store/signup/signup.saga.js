import { all, call, put, takeLeading } from 'redux-saga/effects'
import {
  signUpFail,
  signUpSuccess,
  signUpProviderFail,
  signUpProviderSuccess,
} from './signup.actions'
import { providerSignInSuccess, signInSuccess } from '~/store/login/login.actions'
import { SIGN_UP_PENDING, SIGN_UP_PROVIDER_PENDING } from './signup.constants'

import { signInWithGoogle, signInWithFacebook } from '~/firebase/providers'
import { auth, firestore } from '~/firebase/firebase.utils'
import formatError from '~/helpers/formatError'
import User from '~/classes/user'

// create document for user, if not existing
/**
 * @param  {User class} userData
 * @param  {arr of callback FNs to run before page transition and setting user} onSuccess
 */
export function* createUserProfileDocument(userData, ...onSuccess) {
  const userDocRef = firestore.doc(`users/${userData.uid}`)

  const docSnapshot = yield userDocRef.get()

  let user = userData

  if (!docSnapshot.exists) {
    // if user document never created, create one!
    yield docSnapshot.ref.set(userData.getUser())
  } else {
    // if user exists already, set user to existing user data
    const userData = docSnapshot.data()
    user = new User(userData)
  }

  // run on success functions, pass user object
  if (onSuccess.length > 0) {
    yield all(onSuccess.map((action) => put(action(user))))
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

    yield call(createUserProfileDocument, new User(userData), signUpSuccess, signInSuccess)

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

    yield call(
      createUserProfileDocument,
      new User(userData),
      signUpProviderSuccess,
      providerSignInSuccess
    )
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
