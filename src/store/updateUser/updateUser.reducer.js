import {
  UPDATE_USER_PENDING,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  UPDATE_USER_PROVIDER_FAIL,
  UPDATE_USER_PROVIDER_PENDING,
  UPDATE_USER_PROVIDER_SUCCESS,
  UPDATE_USER_CLEAR_ERROR_MSG,
} from './updateUser.constants'

const initialState = {
  isPending: false,
  error: null,
  update: null,
}

const updateUserPending = (state, { updateId, updateData }) => ({
  ...state,
  error: null,
  isPending: true,
  update: { updateId, updateData },
})

const updateUserSuccess = (state) => ({
  ...state,
  error: null,
  isPending: false,
})

const updateUserFail = (state, error) => ({
  ...state,
  isPending: false,
  error,
})

const updateUserClearErrorMsg = (state) => ({
  ...state,
  isPending: false,
  error: null,
})

const updateUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_USER_PENDING:
      return updateUserPending(state, action.payload)
    case UPDATE_USER_SUCCESS:
      return updateUserSuccess(state, action.payload)
    case UPDATE_USER_FAIL:
      return updateUserFail(state, action.payload)
    case UPDATE_USER_PROVIDER_PENDING:
      return updateUserProviderPending(state, action.payload)
    case UPDATE_USER_PROVIDER_SUCCESS:
      return updateUserProviderSuccess(state)
    case UPDATE_USER_PROVIDER_FAIL:
      return updateUserProviderFail(state, action.payload)
    case UPDATE_USER_CLEAR_ERROR_MSG:
      return updateUserClearErrorMsg(state)
    default:
      return state
  }
}

export default updateUserReducer
