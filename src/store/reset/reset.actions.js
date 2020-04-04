import {
  RESET_PASSWORD_PENDING,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
  RESET_PASSWORD_CLEAR_ERROR,
} from './reset.constants'

export const resetPasswordPending = (emailAddress) => ({
  type: RESET_PASSWORD_PENDING,
  payload: emailAddress,
})

export const resetPasswordSuccess = () => ({
  type: RESET_PASSWORD_SUCCESS,
})

export const resetPasswordFail = (error) => ({
  type: RESET_PASSWORD_FAIL,
  payload: error,
})

export const clearErrorMsg = () => ({
  type: RESET_PASSWORD_CLEAR_ERROR,
})
