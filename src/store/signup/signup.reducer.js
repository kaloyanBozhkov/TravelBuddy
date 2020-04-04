import {
  SIGN_UP_PENDING,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAIL,
  SIGN_UP_GOOGLE_FAIL,
  SIGN_UP_GOOGLE_PENDING,
  SIGN_UP_GOOGLE_SUCCESS,
  SIGN_UP_CLEAR_ERROR_MSG,
} from './signup.constants'

const initialState = {
  isPending: false,
  error: null,
}

const signUpPending = () => ({
  error: null,
  isPending: true,
})

const signUpSuccess = () => ({
  error: null,
  isPending: false,
})

const signUpFail = (error) => ({
  isPending: false,
  error,
})

const signUpClearErrorMsg = () => ({
  isPending: false,
  error: null,
})

const signUpReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_UP_PENDING || SIGN_UP_GOOGLE_PENDING:
      return signUpPending()
    case SIGN_UP_SUCCESS || SIGN_UP_GOOGLE_SUCCESS:
      return signUpSuccess(action.payload)
    case SIGN_UP_FAIL || SIGN_UP_GOOGLE_FAIL:
      return signUpFail(action.payload)
    case SIGN_UP_CLEAR_ERROR_MSG:
      return signUpClearErrorMsg()
    default:
      return state
  }
}

export default signUpReducer
