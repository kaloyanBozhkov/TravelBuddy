import { SIGN_OUT_PENDING, SIGN_OUT_SUCCESS, SIGN_OUT_FAIL } from './logout.constants'

export const signOutPending = () => ({
  type: SIGN_OUT_PENDING,
})
export const signOutSuccess = () => ({
  type: SIGN_OUT_SUCCESS,
})
export const signOutFail = () => ({
  type: SIGN_OUT_FAIL,
})
