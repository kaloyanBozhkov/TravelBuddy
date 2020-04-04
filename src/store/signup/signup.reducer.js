import {
  SIGN_UP_PENDING,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAIL,
  SIGN_UP_PROVIDER_FAIL,
  SIGN_UP_PROVIDER_PENDING,
  SIGN_UP_PROVIDER_SUCCESS,
  SIGN_UP_CLEAR_ERROR_MSG,
} from './signup.constants'

const initialState = {
  isPending: false,
  error: null,
  providerPending: null,
}

const signUpPending = (state) => ({
  ...state,
  error: null,
  isPending: true,
})

const signUpSuccess = (state) => ({
  ...state,
  error: null,
  isPending: false,
})

const signUpFail = (state, error) => ({
  ...state,
  isPending: false,
  error,
})

const signUpProviderPending = (state, provider) => ({
  ...state,
  isPending: true,
  providerPending: provider,
})
const signUpProviderSuccess = (state) => ({
  ...state,
  error: null,
  isPending: false,
  providerPending: null,
})

const signUpProviderFail = (state, error) => ({
  ...state,
  isPending: false,
  providerPending: null,
  error,
})
const signUpClearErrorMsg = (state) => ({
  ...state,
  isPending: false,
  error: null,
})

const signUpReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_UP_PENDING:
      return signUpPending(state, action.payload)
    case SIGN_UP_SUCCESS:
      return signUpSuccess(state, action.payload)
    case SIGN_UP_FAIL:
      return signUpFail(state, action.payload)
    case SIGN_UP_PROVIDER_PENDING:
      return signUpProviderPending(state, action.payload)
    case SIGN_UP_PROVIDER_SUCCESS:
      return signUpProviderSuccess(state)
    case SIGN_UP_PROVIDER_FAIL:
      return signUpProviderFail(state, action.payload)
    case SIGN_UP_CLEAR_ERROR_MSG:
      return signUpClearErrorMsg(state)
    default:
      return state
  }
}

export default signUpReducer
