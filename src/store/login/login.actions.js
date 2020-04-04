import {
  SIGN_IN_PENDING,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAIL,
  PROVIDER_SIGN_IN_PENDING,
  PROVIDER_SIGN_IN_SUCCESS,
  PROVIDER_SIGN_IN_FAIL,
  SIGN_OUT,
  SIGN_IN_CLEAR_ERORR,
} from './login.constants'

export const signInPending = (username, password) => ({
  type: SIGN_IN_PENDING,
  payload: { username, password },
})

export const signInSuccess = () => ({
  type: SIGN_IN_SUCCESS,
})

export const signInFail = (error) => ({
  type: SIGN_IN_FAIL,
  payload: error,
})

export const providerSignInPending = (provider) => ({
  type: PROVIDER_SIGN_IN_PENDING,
  payload: provider,
})

export const providerSignInSuccess = () => ({
  type: PROVIDER_SIGN_IN_SUCCESS,
})

export const providerSignInFail = (error) => ({
  type: PROVIDER_SIGN_IN_FAIL,
  payload: error,
})

export const clearErrorMsg = () => ({
  type: SIGN_IN_CLEAR_ERORR,
})
