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

const signUpPending = (state) => ({
  ...state,
  isPending: true,
})

const signUpSuccess = (state) => ({
  ...state,
  isPending: false,
})

const signUpFail = (state, error) => ({
  ...state,
  isPending: false,
  error,
})

const signUpClearErrorMsg = (state) => ({
  ...state,
  error: null,
})

const signUpReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_UP_PENDING || SIGN_UP_GOOGLE_PENDING:
      return signUpPending(state)
    case SIGN_UP_SUCCESS || SIGN_UP_GOOGLE_SUCCESS:
      return signUpSuccess(state, action.payload)
    case SIGN_UP_FAIL || SIGN_UP_GOOGLE_FAIL:
      return signUpFail(state, action.payload)
    case SIGN_UP_CLEAR_ERROR_MSG:
      return signUpClearErrorMsg(state)
    default:
      return state
  }
}

export default signUpReducer
