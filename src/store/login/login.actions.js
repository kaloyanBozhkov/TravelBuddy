import {
  SIGN_IN_PENDING,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAIL,
  GOOGLE_SIGN_IN_PENDING,
  GOOGLE_SIGN_IN_SUCCESS,
  GOOGLE_SIGN_IN_FAIL,
  SIGN_OUT,
} from './login.constants'

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

export const googleSignInPending = () => ({
  type: GOOGLE_SIGN_IN_PENDING,
})

export const googleSignInSuccess = (user) => ({
  type: GOOGLE_SIGN_IN_SUCCESS,
  payload: user,
})

export const googleSignInFail = (error) => ({
  type: GOOGLE_SIGN_IN_FAIL,
  payload: error,
})

export const signOut = () => ({
  type: SIGN_OUT,
})
