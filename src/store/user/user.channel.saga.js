import { all, take, actionChannel, call, put } from 'redux-saga/effects'
import { SET_USER } from './user.constants'
import { updateUserPending } from '../updateUser/updateUser.actions'

// watches signIn success (normal or provider), then switches page with animation and sets user

function* watchSetUser() {
  // Listen for an update success
  const setUserChannel = yield actionChannel(SET_USER)
  while (true) {
    // not passing anything so no need to take payload
    const { payload: userData } = yield take(setUserChannel)
    yield put(updateUserPending('lastSignedIn', userData))
  }
}

export function* watchUserSagas() {
  yield all([call(watchSetUser)])
}
