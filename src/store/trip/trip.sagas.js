import { all, call, put, takeLeading } from 'redux-saga/effects'
import { SET_TRIP } from './trip.constants'
import { startFetchingDistanceMatrix, errorFetchingDistanceMatrix } from './trip.actions'

export function* calculateOptimalTrip({ payload: trip }) {
  try {
    const { destinations, startingLocation } = trip
    yield put(startFetchingDistanceMatrix({ destinations, startingLocation }))
  } catch (err) {
    yield put(errorFetchingDistanceMatrix(err))
  }
}

// listener
export function* calculateOptimalTripStart() {
  yield takeLeading(SET_TRIP, calculateOptimalTrip)
}

// export sagas
export function* tripSagas() {
  yield all([call(calculateOptimalTripStart)])
}
