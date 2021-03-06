import {
  SIGN_UP_PENDING,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAIL,
  SIGN_UP_CLEAR_ERROR_MSG,
  SIGN_UP_PROVIDER_FAIL,
  SIGN_UP_PROVIDER_SUCCESS,
  SIGN_UP_PROVIDER_PENDING,
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

export const signUpProviderPending = (provider) => ({
  type: SIGN_UP_PROVIDER_PENDING,
  payload: provider,
})

export const signUpProviderSuccess = () => ({
  type: SIGN_UP_PROVIDER_SUCCESS,
})

export const signUpProviderFail = (err) => ({
  type: SIGN_UP_PROVIDER_FAIL,
  payload: err,
})
