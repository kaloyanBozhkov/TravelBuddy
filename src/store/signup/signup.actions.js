import {
  SIGN_UP_PENDING,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAIL,
  SIGN_UP_CLEAR_ERROR_MSG,
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
