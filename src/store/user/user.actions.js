import { SET_USER } from './user.constants'

export const setUser = (userData) => ({
  type: SET_USER,
  payload: userData,
})
