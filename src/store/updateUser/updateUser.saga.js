import { all, put, call, takeLeading } from 'redux-saga/effects'
import { firestore } from '~/firebase/firebase.utils'
import { updateUserSuccess } from './updateUser.actions'
import { UPDATE_USER_PENDING } from './updateUser.constants'

function* handleUpdate({ payload: { updateID, updateData: userData } }) {
  try {
    const userDocRef = firestore.doc(`users/${userData.uid}`)

    const docSnapshot = yield userDocRef.get()

    if (updateID === 'lastSignedIn') {
      yield updateLastSignedIn(docSnapshot, userData)
    }

    yield put(updateUserSuccess())
  } catch (err) {
    console.log(err)
  }
}

function* updateLastSignedIn(docSnapshot, userData) {
  // login.channel.saga handles the local update in handlePageTransitionAndUserSet, before setting user data
  // userData.dateLastSignedIn = new Date().toGMTString()

  yield docSnapshot.ref.set(userData.getUser())
}

// listener
export function* updateUserStart() {
  yield takeLeading(UPDATE_USER_PENDING, handleUpdate)
}

// export sagas
export function* updateUserSagas() {
  yield all([call(updateUserStart)])
}
