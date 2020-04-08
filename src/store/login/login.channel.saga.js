import { all, take, actionChannel, call, put } from 'redux-saga/effects'
import { SIGN_IN_SUCCESS, PROVIDER_SIGN_IN_SUCCESS } from './login.constants'
import { setUser } from '../user/user.actions'
import { pageSwitchStart } from '../pageSwitch/pageSwitch.actions'

// watches signIn success (normal or provider), then switches page with animation and sets user

function* watchSignInSuccess() {
  // Listen for an update success
  const signInChannel = yield actionChannel(SIGN_IN_SUCCESS)
  while (true) {
    // not passing anything so no need to take payload
    const { payload: userData } = yield take(signInChannel)

    yield call(handlePageTransitionAndUserSet, userData)
  }
}

function* watchProviderSignInSuccess() {
  // Listen for an update success
  const signInChannel = yield actionChannel(PROVIDER_SIGN_IN_SUCCESS)
  while (true) {
    // not passing anything so no need to take payload
    const { payload: userData } = yield take(signInChannel)

    yield call(handlePageTransitionAndUserSet, userData)
  }
}

function* handlePageTransitionAndUserSet(userData) {
  // update lastSignedIn locally, user.channel.saga will update db
  userData.dateLastSignedIn = new Date().toGMTString()

  // user is sisnged in so let's redirect to account area, with animated transition! & set user into userReducer
  yield all([put(pageSwitchStart('/account/area')), put(setUser(userData))])
}

export function* watchLoginSagas() {
  yield all([call(watchSignInSuccess), call(watchProviderSignInSuccess)])
}
