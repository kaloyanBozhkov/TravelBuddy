import { SIGN_OUT_PENDING, SIGN_OUT_SUCCESS, SIGN_OUT_FAIL } from './logout.constants'

const initialState = {
  isPending: false,
  error: null,
}

const signInPending = (state) => ({
  ...state,
  error: null,
  isPending: true,
})

const signInSuccess = (state) => ({
  ...state,
  error: null,
  isPending: false,
})

const signInFail = (state, error) => ({
  ...state,
  isPending: false,
  error,
})

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SIGN_OUT_PENDING:
      return signInPending(state)
    case SIGN_OUT_SUCCESS:
      return signInSuccess(state)
    case SIGN_OUT_FAIL:
      return signInFail(state, payload)
    default:
      return state
  }
}

export default reducer
