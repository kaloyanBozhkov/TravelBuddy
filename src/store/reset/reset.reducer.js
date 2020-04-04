import {
  RESET_PASSWORD_PENDING,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
  RESET_PASSWORD_CLEAR_ERROR,
} from './reset.constants'

const initialState = {
  isPending: false,
  error: null,
}

const setPending = () => ({
  isPending: true,
  error: null,
})

const setSuccess = () => ({
  isPending: false,
  erorr: null,
})

const setFail = (error) => ({
  isPending: false,
  error,
})

const clearError = () => initialState

const resetPasswordReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case RESET_PASSWORD_PENDING:
      return setPending()
    case RESET_PASSWORD_SUCCESS:
      return setSuccess()
    case RESET_PASSWORD_FAIL:
      return setFail(action.payload)
    case RESET_PASSWORD_CLEAR_ERROR:
      return clearError()
    default:
      return state
  }
}

export default resetPasswordReducer
