import {
  UPDATE_USER_PENDING,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  UPDATE_USER_CLEAR_ERROR_MSG,
} from './updateUser.constants'

export const updateUserPending = (updateID, updateData) => ({
  type: UPDATE_USER_PENDING,
  payload: {
    updateID,
    updateData,
  },
})

export const updateUserSuccess = () => ({
  type: UPDATE_USER_SUCCESS,
})

export const updateUserFail = (err) => ({
  type: UPDATE_USER_FAIL,
  payload: err,
})

export const updateUserClearErrorMsg = () => ({
  type: UPDATE_USER_CLEAR_ERROR_MSG,
})
