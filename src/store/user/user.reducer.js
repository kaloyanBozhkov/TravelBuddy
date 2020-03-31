import { SET_USER } from './user.constants'

const initialState = {
  userData: {
    dateCreated: null,
    email: null,
    displayName: null,
    emailVerified: null,
    phoneNumber: null,
    photoURL: null,
    uid: null,
  },
}

const setUser = (state, userData) => ({
  ...state,
  userData,
})

const setUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return setUser(state, action.payload)
    default:
      return state
  }
}

export default setUserReducer
