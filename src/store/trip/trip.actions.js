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
  START_CALCULATING_OPTIMAL_TRIP,
  ERROR_FETCHING_DISTANCE_MATRIX,
  FINISH_CALCULATING_OPTIMAL_TRIP,
  ERROR_CALCULATING_OPTIMAL_TRIP,
  SET_OPTIMAL_TRIP,
  UNSET_OPTIMAL_TRIP,
  ERROR_FETCHING_ROUTE_PATHS,
  FINISH_FETCHING_ROUTE_PATHS,
  START_FETCHING_ROUTE_PATHS,
  SAVE_TRIP,
  RESET_TRIP,
  LOAD_TRIP,
} from './trip.constants'

export const addDestination = (destination) => ({
  type: ADD_DESTINATION,
  payload: destination,
})

export const editDestination = (newDestinationData) => ({
  type: EDIT_DESTINATION,
  payload: newDestinationData,
})

export const deleteDestination = (destinationIndex) => ({
  type: DELETE_DESTINATION,
  payload: destinationIndex,
})

export const loadDestination = (destinationIndex) => ({
  type: LOAD_DESTINATION,
  payload: destinationIndex,
})

// payload intercepted by the trip saga "onSetTripStartFetchDistanceMatrix", as well as used by the reducer
export const setTrip = (startDate, endDate, destinations, startingLocation) => ({
  type: SET_TRIP,
  payload: { startDate, endDate, destinations, startingLocation },
})

export const setTripStartingLocation = (startingLocation) => ({
  type: SET_TRIP_STARTING_LOCATION,
  payload: startingLocation,
})

export const setTripStartDate = (startDate) => ({
  type: SET_TRIP_START_DATE,
  payload: startDate,
})

export const setTripEndDate = (endDate) => ({
  type: SET_TRIP_END_DATE,
  payload: endDate,
})

export const loadTrip = (trip) => ({
  type: LOAD_TRIP,
  payload: trip,
})

export const startFetchingDistanceMatrix = (destinations, startingLocation) => ({
  type: START_FETCHING_DISTANCE_MATRIX,
  payload: { startingLocation, destinations },
})

// payload intercepted by trip saga "onFinishFetchingDistanceMatrixStartCalculatingOptimalTrip"
export const finishFetchingDistanceMatrix = (formattedResponse) => ({
  type: FINISH_FETCHING_DISTANCE_MATRIX,
  payload: formattedResponse,
})

export const errorFetchingDistanceMatrix = (error) => ({
  type: ERROR_FETCHING_DISTANCE_MATRIX,
  payload: error,
})

export const startCalculatingOptimalTrip = (formattedResponse) => ({
  type: START_CALCULATING_OPTIMAL_TRIP,
  payload: formattedResponse,
})

export const finishCalculatingOptimalTrip = (optimalTrip) => ({
  type: FINISH_CALCULATING_OPTIMAL_TRIP,
  payload: optimalTrip,
})

export const errorCalculatingOptimalTrip = (error) => ({
  type: ERROR_CALCULATING_OPTIMAL_TRIP,
  payload: error,
})

export const startFetchingRoutePaths = (optimalTrip) => ({
  type: START_FETCHING_ROUTE_PATHS,
  payload: optimalTrip,
})

export const finishFetchingRoutePaths = (optimalTripWithPaths) => ({
  type: FINISH_FETCHING_ROUTE_PATHS,
  payload: optimalTripWithPaths,
})

export const errorFetchingRoutePaths = (error) => ({
  type: ERROR_FETCHING_ROUTE_PATHS,
  payload: error,
})

export const saveTrip = () => ({
  type: SAVE_TRIP,
})

export const resetTrip = () => ({
  type: RESET_TRIP,
})

export const setOptimalTrip = (optimalTrip) => ({
  type: SET_OPTIMAL_TRIP,
  payload: optimalTrip,
})

export const unsetOptimalTrip = () => ({
  type: UNSET_OPTIMAL_TRIP,
})
