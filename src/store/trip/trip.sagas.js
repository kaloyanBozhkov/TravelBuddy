import { all, call, put, takeLeading } from 'redux-saga/effects'
import {
  SET_TRIP,
  START_FETCHING_DISTANCE_MATRIX,
  START_CALCULATING_OPTIMAL_TRIP,
  START_FETCHING_ROUTE_PATHS,
} from './trip.constants'
import {
  startFetchingDistanceMatrix,
  errorFetchingDistanceMatrix,
  finishFetchingDistanceMatrix,
  startCalculatingOptimalTrip,
  errorCalculatingOptimalTrip,
  finishCalculatingOptimalTrip,
  startFetchingRoutePaths,
  finishFetchingRoutePaths,
  errorFetchingRoutePaths,
  saveTrip,
  resetTrip,
  setOptimalTrip,
} from './trip.actions'
import getDistnaceMatrix from '~/components/GoogleMap/mapFunctions/DistanceMatrix'
import formatDistanceMatrixResponse from '~/store/trip/pureFunctions/formatDistanceMatrixResponse'
import calculateOptimalTrip from '~/store/trip/pureFunctions/calculateOptimalTrip'
import getRoutePath from '~/components/GoogleMap/mapFunctions/GetRoutePath'

export function* startTheFetchDistanceMatrix({ payload: { destinations, startingLocation } }) {
  yield put(startFetchingDistanceMatrix(destinations, startingLocation))
}

// listener
export function* onSetTripStartFetchDistanceMatrix() {
  yield takeLeading(SET_TRIP, startTheFetchDistanceMatrix)
}

// listener
export function* fetchDistnaceMtrixStart() {
  yield takeLeading(START_FETCHING_DISTANCE_MATRIX, fetchDestinationMatrixAsync)
}

export function* fetchDestinationMatrixAsync({ payload: { destinations, startingLocation } }) {
  try {
    // check if google is defined on global scope, if not error out!
    if (!window.google) {
      throw Error('Google Maps API not found')
    }

    // format a nodes array that will be fed into Distance Matrix call
    const nodes = destinations.map(
      ({ location: { lat, lng } }) => new window.google.maps.LatLng(lat, lng)
    )
    // add starting Loc coords
    nodes.push(new window.google.maps.LatLng(startingLocation.lat, startingLocation.lng))

    // call the distance matrix API through the JavaScript API
    const response = yield new Promise((res, rej) => {
      getDistnaceMatrix(
        {
          origins: nodes,
          destinations: nodes,
        },
        function (response, status) {
          if (status !== window.google.maps.DistanceMatrixStatus.OK) {
            rej(status)
          } else {
            res(response)
          }
        }
      )
    })

    // format resposne to fit TrabelBuddy's needs and be more human friendly
    const formattedResponse = yield formatDistanceMatrixResponse(
      response,
      destinations,
      startingLocation
    )
    // @TODO add logic to handle more than 100 elements, the API has a limit of 100 elements (origins * destinations <= 100) per request, a loop and multiple requests may be good to add

    // Successfully got the distance matrix data and formatted!
    yield all([
      put(finishFetchingDistanceMatrix(formattedResponse)),
      put(startCalculatingOptimalTrip(formattedResponse)),
    ])
  } catch (err) {
    yield put(errorFetchingDistanceMatrix(err))
  }
}

// listener
export function* startDijkstraAlgorithmToCalculateOptimalTrip() {
  yield takeLeading(START_CALCULATING_OPTIMAL_TRIP, calculateOptimalTripAsync)
}

export function* calculateOptimalTripAsync({ payload: formattedResponse }) {
  try {
    const optimalTrip = yield calculateOptimalTrip(formattedResponse)

    yield all([
      put(finishCalculatingOptimalTrip(optimalTrip)),
      put(startFetchingRoutePaths(optimalTrip)),
    ])
  } catch (err) {
    yield put(errorCalculatingOptimalTrip(err))
  }
}

export function* startRoutePathsFetch() {
  yield takeLeading(START_FETCHING_ROUTE_PATHS, startFetchingRoutePathsAsync)
}

export function* startFetchingRoutePathsAsync({ payload: optimalTrip }) {
  try {
    const formattedPoints = optimalTrip
      .map(({ lat, lng }) => ({ lat, lng }))
      .reduce(
        (couples, dest, index, dests) => [
          ...couples,
          ...(index === dests.length - 1 ? [] : [{ start: dest, end: dests[index + 1] }]),
        ],
        []
      )

    const pathsArr = yield new Promise((res, rej) => {
      const paths = []
      formattedPoints.forEach(({ start, end }) => {
        getRoutePath(start, end, (path) => {
          paths.push(path)

          // if callback completes and it is the last one, complete the promise
          if (paths.length === formattedPoints.length) {
            res(paths)
          }
        })
      })
    })

    const optimalTripWithPaths = optimalTrip.map((stop, index) => ({
      ...stop,
      polylinePaths: pathsArr[index] || [],
    }))

    yield all([
      put(saveTrip()),
      put(resetTrip()),
      put(setOptimalTrip(optimalTripWithPaths)),
      put(finishFetchingRoutePaths(optimalTripWithPaths)),
    ])
  } catch (err) {
    yield put(errorFetchingRoutePaths(err))
  }
}

// export sagas
export function* tripSagas() {
  yield all([
    call(onSetTripStartFetchDistanceMatrix),
    call(fetchDistnaceMtrixStart),
    call(startDijkstraAlgorithmToCalculateOptimalTrip),
    call(startRoutePathsFetch),
  ])
}
