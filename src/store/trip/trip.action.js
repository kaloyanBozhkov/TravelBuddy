import {
  ADD_DESTINATION,
  SET_TRIP,
  LOAD_DESTINATION,
  EDIT_DESTINATION,
  DELETE_DESTINATION,
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

export const setTrip = (startDate, endDate, destinations) => ({
  type: SET_TRIP,
  payload: { startDate, endDate, destinations },
})
