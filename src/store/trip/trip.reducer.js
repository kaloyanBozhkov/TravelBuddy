import {
  ADD_DESTINATION,
  SET_TRIP,
  LOAD_DESTINATION,
  EDIT_DESTINATION,
  DELETE_DESTINATION,
} from './trip.constants'

const initialState = {
  startDate: null,
  endDate: null,
  destinations: [],

  // which destinatioin is currently selected (based on index?) for edit and view on maps
  activeDestination: -1,
  hasError: null,
}

const setTrip = (state, { startDate, endDate, destinations }) => ({
  ...state,
  startDate,
  endDate,
  destinations,
})

const addDestination = (state, destination) => ({
  ...state,
  destinations: [...state.destinations, destination],
})

const editDestination = (state, { destinationIndex, newDestinationData }) => {
  const copy = [...state.destinations]

  copy[destinationIndex] = newDestinationData

  return {
    ...state,
    destinations: copy,
  }
}

const deleteDestination = (state, destinationIndex) => {
  const copy = [...state.destinations]

  copy.splice(destinationIndex, 1)

  return {
    ...state,
    destinations: copy,
  }
}

const loadDeestination = (state, destinationIndex) => ({
  ...state,
  activeDestination: destinationIndex,
})

const tripReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_DESTINATION:
      return addDestination(state, action.payload)
    case EDIT_DESTINATION:
      return editDestination(state, action.payload)
    case DELETE_DESTINATION:
      return deleteDestination(state, action.payload)
    case LOAD_DESTINATION:
      return loadDeestination(state, action.payload)
    case SET_TRIP:
      return setTrip(state, action.payload)
    default:
      return state
  }
}

export default tripReducer
