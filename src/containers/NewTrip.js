import React, { useState } from 'react'
import Script from 'react-load-script'
import { connect } from 'react-redux'
import {
  loadDestination,
  addDestination,
  editDestination,
  deleteDestination,
  setTrip,
  setTripStartingLocation,
  setTripStartDate,
  setTripEndDate,
  unsetOptimalTrip,
} from '~/store/trip/trip.actions'

import Loading from '~/components/UI/Loading/Loading'
import Strip from '~/components/UI/Strip/Strip'
import NewTripPage from '~/pages/NewTrip/NewTrip'

const NewTrip = ({
  destinations,
  activeDestination,
  startDate,
  endDate,
  startingLocation,
  isCalculating,
  optimalTrip,
  showOptimalTrip,

  ...actions
}) => {
  const [googleScriptLoaded, setGoogleScriptLoaded] = useState(false)

  // if google maps script not loaded, load it. Do so here instead of GoogleApiWrapper since on the same page there is google maps and autocomplete input, which would complain that the same script is imported twice and is conflicting
  if (!googleScriptLoaded) {
    return (
      <>
        <Loading msg="Loading google maps script.." />
        <Script
          url={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=places`}
          onLoad={() => setGoogleScriptLoaded(true)}
        />
      </>
    )
  }

  return (
    <>
      <NewTripPage
        startDate={startDate}
        endDate={endDate}
        startingLocation={startingLocation}
        destinations={destinations}
        activeDestination={activeDestination}
        isCalculating={isCalculating}
        optimalTrip={optimalTrip}
        showOptimalTrip={showOptimalTrip}
        {...actions}
      />
      <Strip />
    </>
  )
}

const mapStateToProps = (state) => ({
  destinations: state.tripReducer.destinations,
  activeDestination: state.tripReducer.activeDestination,
  startDate: state.tripReducer.startDate,
  endDate: state.tripReducer.endDate,
  startingLocation: state.tripReducer.startingLocation,
  isCalculating:
    state.tripReducer.isCalculatingOptimalTrip ||
    state.tripReducer.isFetchingDistanceMatrix ||
    state.tripReducer.isFetchingRoutePaths,
  optimalTrip: state.tripReducer.optimalTrip,
  showOptimalTrip: state.tripReducer.optimalTrip.length > 0,
})
const mapDispatchToProps = (dispatch) => ({
  onAddDestination: (destination) => dispatch(addDestination(destination)),
  onEditDestination: (destinationIndex, newDestinationData) =>
    dispatch(editDestination(destinationIndex, newDestinationData)),
  onDeleteDestination: (destinationIndex) => dispatch(deleteDestination(destinationIndex)),
  onSetTrip: (startDate, endDate, destinations, startingLoc) =>
    dispatch(setTrip(startDate, endDate, destinations, startingLoc)),
  onSetTripStartingLocation: (startingLocation) =>
    dispatch(setTripStartingLocation(startingLocation)),
  onSetTripStartDate: (startDate) => dispatch(setTripStartDate(startDate)),
  onSetTripEndDate: (endDate) => dispatch(setTripEndDate(endDate)),
  onSelectDestination: (destinationIndex) => dispatch(loadDestination(destinationIndex)),
  onCloseOptimalTripDisplay: () => dispatch(unsetOptimalTrip()),
})

export default connect(mapStateToProps, mapDispatchToProps)(NewTrip)
