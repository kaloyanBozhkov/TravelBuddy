import {
  RESET_PASSWORD_PENDING,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
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

const resetPasswordReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case RESET_PASSWORD_PENDING:
      return setPending()
    case RESET_PASSWORD_SUCCESS:
      return setSuccess()
    case RESET_PASSWORD_FAIL:
      return setFail(action.payload)
    default:
      return state
  }
}

export default resetPasswordReducer
