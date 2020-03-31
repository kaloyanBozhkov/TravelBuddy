import { all, call, put, takeLeading, select } from 'redux-saga/effects'
import { signUpFail, signUpSuccess } from './signup.actions'
import { SIGN_UP_PENDING } from './signup.constants'
import { setUser } from '../user/user.actions'

import { auth, firestore } from '~/firebase/firebase.utils'

// SIGN IN
export function* signUpAsync({
  payload: { email, password, firstName, lastName, phone: phoneNumber },
}) {
  try {
    const responseUserData = yield auth.createUserWithEmailAndPassword(email, password)

    const { photoURL, uid, emailVerified } = responseUserData.user

    const userDocRef = firestore.doc(`users/${uid}`)

    const docSnapshot = yield userDocRef.get()

    if (!docSnapshot.exists) {
      const userData = {
        dateCreated: new Date(),
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

// export sagas
export function* signUpSagas() {
  yield all([call(signUpStart)])
}
