import {
  SIGN_IN_PENDING,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAIL,
  GOOGLE_SIGN_IN_FAIL,
  GOOGLE_SIGN_IN_SUCCESS,
  GOOGLE_SIGN_IN_PENDING,
} from './login.constants'

const initialState = {
  currentUser: null,
  isPending: false,
  error: null,
}

const signInPending = (state) => ({
  ...state,
  isPending: true,
})

const signInSuccess = (state, user) => ({
  ...state,
  currentUser: user,
  isPending: false,
})

const signInFail = (state, err) => ({
  ...state,
  error: err,
  isPending: false,
})

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SIGN_IN_PENDING:
      return signInPending(state, payload)
    case SIGN_IN_SUCCESS:
      return signInSuccess(state, payload)
    case SIGN_IN_FAIL:
      return signInFail(state, payload)
    case GOOGLE_SIGN_IN_PENDING:
      return signInPending(state, payload)
    case GOOGLE_SIGN_IN_SUCCESS:
      return signInSuccess(state, payload)
    case GOOGLE_SIGN_IN_FAIL:
      return signInFail(state, payload)
    default:
      return state
  }
}

export default reducer
