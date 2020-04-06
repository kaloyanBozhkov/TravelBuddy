import { SWITCH_PAGE_START, SWITCH_PAGE_END } from './pageSwitch.constants'

const initialState = {
  isSwitching: false,
  path: null,
}

const switchPageStart = (state, path) => ({
  ...state,
  isSwitching: true,
  path: path,
})

const switchPageEnd = (state) => ({
  ...state,
  isSwitching: false,
  path: null,
})

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SWITCH_PAGE_START:
      return switchPageStart(state, payload)
    case SWITCH_PAGE_END:
      return switchPageEnd(state)
    default:
      return state
  }
}

export default reducer
