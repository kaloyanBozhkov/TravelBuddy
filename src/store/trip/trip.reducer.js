import {
  ADD_DESTINATION,
  SET_TRIP,
  SET_TRIP_STARTING_LOCATION,
  LOAD_DESTINATION,
  EDIT_DESTINATION,
  DELETE_DESTINATION,
  START_FETCHING_DISTANCE_MATRIX,
  FINISH_FETCHING_DISTANCE_MATRIX,
  ERROR_FETCHING_DISTANCE_MATRIX,
} from './trip.constants'

const initialState = {
  startDate: null,
  endDate: null,
  destinations: [],
  startingLocation: null,
  // which destinatioin is currently selected (based on index?) for edit and view on maps
  activeDestination: -1,

  isCalculating: false,
  calculatingError: null,

  isFetchingDistanceMatrix: false,
  fetchingDistanceMatrixError: null,

  optimalTrip: [],
}

const setTrip = (state, { startDate, endDate, destinations, startingLocation }) => ({
  ...state,
  startDate,
  endDate,
  destinations,
  startingLocation,
})

const setTripStartingLocation = (state, startingLocation) => ({
  ...state,
  startingLocation,
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

const deleteDestination = (state, destinationIndex) => ({
  ...state,
  // remove the destination
  destinations: state.destinations.filter((d, key) => key !== destinationIndex),

  // unselect if it was selected
  activeDestination: state.activeDestination === destinationIndex ? -1 : state.activeDestination,
})

const loadDeestination = (state, destinationIndex) => ({
  ...state,
  activeDestination: destinationIndex,
})

const startFetchingDistanceMatric = (state) => ({
  ...state,
  isFetchingDistanceMatrix: true,
})

const finishFetchingDistanceMatric = (state) => ({
  ...state,
  isFetchingDistanceMatrix: false,
})

const errorFetchingDistanceMatric = (state, error) => ({
  ...state,
  errorFetchingDistanceMatric: error,
  isFetchingDistanceMatrix: false,
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
    case SET_TRIP_STARTING_LOCATION:
      return setTripStartingLocation(state, action.payload)
    case START_FETCHING_DISTANCE_MATRIX:
      return startFetchingDistanceMatric(state)
    case FINISH_FETCHING_DISTANCE_MATRIX:
      return finishFetchingDistanceMatric(state)
    case ERROR_FETCHING_DISTANCE_MATRIX:
      return errorFetchingDistanceMatric(state, action.payload)
    default:
      return state
  }
}

export default tripReducer
