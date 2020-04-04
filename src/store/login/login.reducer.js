import { SIGN_IN_PENDING, SIGN_IN_SUCCESS, SIGN_IN_FAIL } from './login.constants'

const initialState = {
  isPending: false,
  error: null,
}

const signInPending = () => ({
  error: null,
  isPending: true,
})

const signInSuccess = () => ({
  error: null,
  isPending: false,
})

const signInFail = (err) => ({
  error: err,
  isPending: false,
})

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SIGN_IN_PENDING:
      return signInPending()
    case SIGN_IN_SUCCESS:
      return signInSuccess()
    case SIGN_IN_FAIL:
      return signInFail()
    default:
      return state
  }
}

export default reducer
