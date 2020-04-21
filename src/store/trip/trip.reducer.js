import {
  ADD_DESTINATION,
  SET_TRIP,
  SET_TRIP_STARTING_LOCATION,
  SET_TRIP_END_DATE,
  SET_TRIP_START_DATE,
  LOAD_DESTINATION,
  EDIT_DESTINATION,
  DELETE_DESTINATION,
  START_FETCHING_DISTANCE_MATRIX,
  FINISH_FETCHING_DISTANCE_MATRIX,
  ERROR_FETCHING_DISTANCE_MATRIX,
  START_CALCULATING_OPTIMAL_TRIP,
  FINISH_CALCULATING_OPTIMAL_TRIP,
  ERROR_CALCULATING_OPTIMAL_TRIP,
  SAVE_AND_RESET_TRIP,
  SET_OPTIMAL_TRIP,
  UNSET_OPTIMAL_TRIP,
} from './trip.constants'

const initialState = {
  startDate: null,
  endDate: null,
  destinations: [],
  startingLocation: null,
  // which destinatioin is currently selected (based on index?) for edit and view on maps
  activeDestination: -1,

  isCalculatingOptimalTrip: false,
  calculatingOptimalTripError: null,

  isFetchingDistanceMatrix: false,
  fetchingDistanceMatrixError: null,

  optimalTrip: [],
  pastTrips: [],
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
const setTripStartDate = (state, startDate) => ({
  ...state,
  startDate,
})
const setTripEndDate = (state, endDate) => ({
  ...state,
  endDate,
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
const startCalculatingOptimalTrip = (state) => ({
  ...state,
  isCalculatingOptimalTrip: true,
})

const finishCalculatingOptimalTrip = (state, optimalTrip) => ({
  ...state,
  isCalculatingOptimalTrip: false,
  optimalTrip,
})

const errorCalculatingOptimalTrip = (state, error) => ({
  ...state,
  calculatingOptimalTripError: error,
  isCalculatingOptimalTrip: false,
})

const saveTripAndReset = (state) => ({
  ...state,
  // reset and save
  activeDestination: -1,
  startDate: null,
  endDate: null,
  startingLocation: null,
  destinations: [],
  optimalTrip: [],
  pastTrips: [
    ...state.pastTrips,
    {
      startDate: state.startDate,
      endDate: state.endDate,
      startingLocation: state.startingLocation,
      destinations: state.destinations,
      optimalTrip: state.optimalTrip,
    },
  ],
})

const setOptimalTrip = (state, tripIndex) => ({
  ...state,
  optimalTrip: state.pastTrips[tripIndex],
})

const unsetOptimalTrip = (state) => ({
  ...state,
  optimalTrip: [],
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
    case SET_TRIP_START_DATE:
      return setTripStartDate(state, action.payload)
    case SET_TRIP_END_DATE:
      return setTripEndDate(state, action.payload)
    case START_FETCHING_DISTANCE_MATRIX:
      return startFetchingDistanceMatric(state)
    case FINISH_FETCHING_DISTANCE_MATRIX:
      return finishFetchingDistanceMatric(state)
    case ERROR_FETCHING_DISTANCE_MATRIX:
      return errorFetchingDistanceMatric(state, action.payload)
    case START_CALCULATING_OPTIMAL_TRIP:
      return startCalculatingOptimalTrip(state)
    case FINISH_CALCULATING_OPTIMAL_TRIP:
      return finishCalculatingOptimalTrip(state, action.payload)
    case ERROR_CALCULATING_OPTIMAL_TRIP:
      return errorCalculatingOptimalTrip(state, action.payload)
    case SAVE_AND_RESET_TRIP:
      return saveTripAndReset(state)
    case SET_OPTIMAL_TRIP:
      return setOptimalTrip(state, action.payload)
    case UNSET_OPTIMAL_TRIP:
      return unsetOptimalTrip(state)
    default:
      return state
  }
}

export default tripReducer
