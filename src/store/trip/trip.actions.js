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
} from './trip.constants'

export const addDestination = (destination) => ({
  type: ADD_DESTINATION,
  payload: destination,
})

export const editDestination = (destinationIndex, newDestinationData) => ({
  type: EDIT_DESTINATION,
  payload: { destinationIndex, newDestinationData },
})

export const deleteDestination = (destinationIndex) => ({
  type: DELETE_DESTINATION,
  payload: destinationIndex,
})

export const loadDestination = (destinationIndex) => ({
  type: LOAD_DESTINATION,
  payload: destinationIndex,
})

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

export const startFetchingDistanceMatrix = (startingLocation, destinations) => ({
  type: START_FETCHING_DISTANCE_MATRIX,
  payload: { startingLocation, destinations },
})

export const finishFetchingDistanceMatrix = ({ rows }) => ({
  type: FINISH_FETCHING_DISTANCE_MATRIX,
  payload: rows,
})

export const errorFetchingDistanceMatrix = (error) => ({
  type: ERROR_FETCHING_DISTANCE_MATRIX,
  payload: error,
})

// export const startCalculating = () => ({
//   type: START_CALCULATING_OPTIMAL_TRIP,
//   payload: { startDate, endDate, destinations, startingLocation },
// })

// export const finishCalculating = () => ({
//   type: SET_TRIP,
//   payload: { startDate, endDate, destinations, startingLocation },
// })
