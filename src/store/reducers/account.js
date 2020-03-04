import {
    SIGN_IN
} from '../constants/account'

const initialState = {
    currentUser: null,
}

const signIn = (state, user) => ({ ...state, currentUser: user }) 

const reducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case SIGN_IN:
            return signIn(state, payload)
        default:
            return state
    }
}

export default reducer