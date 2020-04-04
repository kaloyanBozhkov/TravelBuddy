import {
  SIGN_UP_PENDING,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAIL,
  SIGN_UP_CLEAR_ERROR_MSG,
  SIGN_UP_GOOGLE_FAIL,
  SIGN_UP_GOOGLE_SUCCESS,
  SIGN_UP_GOOGLE_PENDING,
} from './signup.constants'

export const signUpPending = (email, password, firstName, lastName, phone) => ({
  type: SIGN_UP_PENDING,
  payload: { email, password, firstName, lastName, phone },
})

export const signUpSuccess = () => ({
  type: SIGN_UP_SUCCESS,
})

export const signUpFail = (err) => ({
  type: SIGN_UP_FAIL,
  payload: err,
})

export const signUpClearErrorMsg = () => ({
  type: SIGN_UP_CLEAR_ERROR_MSG,
})

export const signUpGooglePending = (email, password, firstName, lastName, phone) => ({
  type: SIGN_UP_GOOGLE_PENDING,
  payload: { email, password, firstName, lastName, phone },
})

export const signUpGoogleSuccess = () => ({
  type: SIGN_UP_GOOGLE_SUCCESS,
})

export const signUpGoogleFail = (err) => ({
  type: SIGN_UP_GOOGLE_FAIL,
  payload: err,
})
