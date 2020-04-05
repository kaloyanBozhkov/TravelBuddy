import {
  SIGN_IN_PENDING,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAIL,
  SIGN_IN_CLEAR_ERORR,
  PROVIDER_SIGN_IN_PENDING,
  PROVIDER_SIGN_IN_SUCCESS,
  PROVIDER_SIGN_IN_FAIL,
  SIGN_OUT,
} from './login.constants'

const initialState = {
  isPending: false,
  error: null,
  providerPending: false,
}

const signInPending = (state) => ({
  ...state,
  error: null,
  isPending: true,
})

const signInProviderPending = (state, provider) => ({
  ...state,
  isPending: true,
  providerPending: provider,
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

const signInProviderFail = (state, error) => ({
  ...state,
  providerPending: null,
  isPending: false,
  error,
})

const signInProviderSuccess = (state) => ({
  ...state,
  providerPending: null,
  isPending: false,
})

const clearError = () => initialState

const signOut = () => initialState

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SIGN_IN_PENDING:
      return signInPending(state)
    case SIGN_IN_SUCCESS:
      return signInSuccess(state)
    case SIGN_IN_FAIL:
      return signInFail(state, payload)
    case PROVIDER_SIGN_IN_PENDING:
      return signInProviderPending(state, payload)
    case PROVIDER_SIGN_IN_SUCCESS:
      return signInProviderSuccess(state)
    case PROVIDER_SIGN_IN_FAIL:
      return signInProviderFail(state, payload)
    case SIGN_IN_CLEAR_ERORR:
      return clearError()
    case SIGN_OUT:
      return signOut()
    default:
      return state
  }
}

export default reducer
