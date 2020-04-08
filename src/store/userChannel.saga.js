import { all, take, actionChannel, call, put, fork } from 'redux-saga/effects'

import { SIGN_IN_SUCCESS, PROVIDER_SIGN_IN_SUCCESS } from './login/login.constants'

function* watchSignInSuccess() {
  // Listen for an update success
  const signInChannel = yield actionChannel(SIGN_IN_SUCCESS)
  while (true) {
    // 2- take from the channel
    const { payload } = yield take(signInChannel)
    // 3- Note that we're using a blocking call
    yield call(handleLastSignedInUpdate, payload)
  }
}

function* watchSignInProviderSuccess() {
  // Listen for an update success
  const signInChannel = yield actionChannel(PROVIDER_SIGN_IN_SUCCESS)
  while (true) {
    // 2- take from the channel
    const { payload } = yield take(signInChannel)
    // 3- Note that we're using a blocking call
    yield call(handleLastSignedInUpdate, payload)
  }
}
function* handleLastSignedInUpdate(payload) {
  alert(payload)
}

export function* watchUserChannelSaga() {
  yield all([call(watchSignInSuccess), call(watchSignInProviderSuccess)])
}
