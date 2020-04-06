import { SWITCH_PAGE_START, SWITCH_PAGE_END } from './pageSwitch.constants'

export const pageSwitchStart = (path) => ({
  type: SWITCH_PAGE_START,
  payload: path,
})

export const pageSwitchEnd = () => ({
  type: SWITCH_PAGE_END,
})
