import {
  SIGN_IN_PENDING,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAIL,
  PROVIDER_SIGN_IN_PENDING,
  PROVIDER_SIGN_IN_SUCCESS,
  PROVIDER_SIGN_IN_FAIL,
  SIGN_IN_CLEAR_ERORR,
} from './login.constants'

// callBack is function to run
export const signInPending = (username, password) => ({
  type: SIGN_IN_PENDING,
  payload: { username, password },
})

export const signInSuccess = (user) => ({
  type: SIGN_IN_SUCCESS,
  payload: user,
})

export const signInFail = (error) => ({
  type: SIGN_IN_FAIL,
  payload: error,
})

export const providerSignInPending = (provider) => ({
  type: PROVIDER_SIGN_IN_PENDING,
  payload: provider,
})

export const providerSignInSuccess = (user) => ({
  type: PROVIDER_SIGN_IN_SUCCESS,
  payload: user,
})

export const providerSignInFail = (error) => ({
  type: PROVIDER_SIGN_IN_FAIL,
  payload: error,
})

export const clearErrorMsg = () => ({
  type: SIGN_IN_CLEAR_ERORR,
})
