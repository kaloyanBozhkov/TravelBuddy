import React, { useState, useEffect, useLayoutEffect } from 'react'
import {
  addDestination,
  editDestination,
  deleteDestination,
  setTrip,
  setTripStartingLocation,
} from '~/store/trip/trip.actions'

import DestinationPicker from '~/components/Collections/DestinationPicker/DestinationPicker'
import DestinationViewer from '~/components/Collections/DestinationViewer/DestinationViewer'
import DroppingContainer from '~/components/DroppingContainer/DroppingContainer'
import Input from '~/components/UI/Input/Input'
import Button from '~/components/UI/Button/Button'
import ErrorMsg from '~/components/Collections/ErrorMsg/ErrorMsg'

import useInputHandler from '~/hooks/useInputHandler'
import { handleDateChange } from '~/helpers/inputHandlers'
import uid from '~/thirdPartyHelpers/uid'

import styles from './styles.module.scss'

const onCalculateOptimalTrip = (tripInfo, destinations, setErrorMsg, onSetTrip) => {
  const errors = []

  // check start and end date for valid values
  if (!tripInfo.startDate) {
    errors.push({
      field: 'startDate',
      error: 'Make sure start date is set',
    })
  }

  if (!tripInfo.endDate) {
    errors.push({
      field: 'endDate',
      error: 'Make sure end date is set',
    })
  }

  // will implicitly convert null to 0 and compate timestamps
  if (+tripInfo.startDate >= +tripInfo.endDate) {
    errors.push({
      field: 'endDate',
      error: 'Make sure end date is greater than start date',
    })
  }

  // invalid start location chosen, either not set at all or not properly selected from google autocomplete
  if (!tripInfo.startingLoc.label || !tripInfo.startingLoc.lat || !tripInfo.startingLoc.lng) {
    errors.push({
      field: 'startingLoc',
      error: 'Must have provided a valid starting location',
    })
  }

  // check at least two destinations added
  if (destinations.length <= 1) {
    errors.push({
      field: 'destination',
      error: 'Make sure to have added two or more destinations',
    })
  }

  if (errors.length) {
    setErrorMsg(errors)
  } else {
    onSetTrip()
  }
}

const TripSelectContainer = ({
  destinations,
  activeDestination,
  onSelectDestination,
  dispatch,
  startDate,
  endDate,
  startingLocation,
}) => {
  const [tripInfo, onInputChangeHandler] = useInputHandler({
    startDate,
    endDate,
    startingLoc: startingLocation || { lat: null, lng: null, label: '' },
  })
  const [errorMsg, setErrorMsg] = useState([])
  const clearErrorMsg = (removeForField) =>
    setErrorMsg(errorMsg.filter(({ field }) => field !== removeForField))

  const onSetTrip = () =>
    dispatch(setTrip(tripInfo.startDate, tripInfo.endDate, destinations, tripInfo.startingLoc))

  const onAddToTrip = (destination) => {
    // check if destination is new and has not been added previously, otherwise show err
    if (
      destinations.filter(
        ({ location: { lat, lng } }) =>
          lat === destination.location.lat && lng === destination.location.lng
      ).length
    ) {
      setErrorMsg((errors) => [
        ...errors,
        { field: ' destination', error: 'A destination can be added only once' },
      ])
    } else {
      dispatch(addDestination({ ...destination, uid: uid() }))
    }
  }

  const onCancelDestination = () => onSelectDestination(-1)
  const onEditDestination = (newDestinationData) =>
    dispatch(editDestination(activeDestination, newDestinationData))
  const onRemoveDestination = (destinationIndex) => dispatch(deleteDestination(destinationIndex))

  // make sure to trigger the update scroll of the destination picker
  useLayoutEffect(() => {
    window.scrollBy(0, 0)
  }, [destinations])

  // clear error msg for not enough destinations selected
  useEffect(() => {
    if (destinations.length > 1) {
      setErrorMsg((prevErrors) => prevErrors.filter(({ field }) => field !== 'destination'))
    }
  }, [destinations])

  // clear error msg for not having set starting location, also update reducer with new startingLocation
  useEffect(() => {
    if (!tripInfo.startingLoc.label || !tripInfo.startingLoc.lat || !tripInfo.startingLoc.lng) {
      setErrorMsg((prevErrors) => prevErrors.filter(({ field }) => field !== 'startingLoc'))

      // if it was a full clear of text in where from input, reset value in store so maps reflects change
      if (tripInfo.startingLoc.label === '') {
        dispatch(setTripStartingLocation(null))
      }
    } else if (tripInfo.startingLoc.label && tripInfo.startingLoc.lat && tripInfo.startingLoc.lng) {
      dispatch(setTripStartingLocation(tripInfo.startingLoc))
    }
  }, [tripInfo.startingLoc, dispatch])

  return (
    <section className={styles.tripSelectContainer}>
      <DroppingContainer label="Pick your travelling dates!">
        <div className={styles.dateWrapper}>
          <Input
            label="Start Date"
            id="startDate"
            name="startDate"
            comment="When should your trip start?"
            icon="calendar"
            onChange={(value) => handleDateChange(onInputChangeHandler, value, 'startDate')}
            errorMsgHandler={
              errorMsg.filter(({ field }) => field === 'startDate').length > 0 &&
              (() => clearErrorMsg('startDate'))
            }
            selected={tripInfo.startDate && new Date(tripInfo.startDate)}
            type="date"
            minDate={new Date()}
          />
          <Input
            label="End Date"
            id="endDate"
            name="endDate"
            comment="When should your trip end?"
            icon="calendar"
            onChange={(value) => handleDateChange(onInputChangeHandler, value, 'endDate')}
            errorMsgHandler={
              errorMsg.filter(({ field }) => field === 'endDate').length > 0 &&
              (() => clearErrorMsg('endDate'))
            }
            selected={tripInfo.endDate && new Date(tripInfo.endDate)}
            type="date"
            minDate={tripInfo.startDate || new Date()}
          />
        </div>
      </DroppingContainer>

      <DroppingContainer label="Pick starting city!">
        <div className={styles.startingCityWrapper}>
          <Input
            label="Where from?"
            id="startingLoc"
            name="startingLoc"
            comment="Which city are you going to start your trip from?"
            icon="mapMarkerAlt"
            onChange={
              // whilst typing handle setting location, with invalid lat lng
              ({ target }) =>
                onInputChangeHandler({
                  target: {
                    value: {
                      label: target.value,
                      lat: null,
                      lng: null,
                    },
                    getAttribute() {
                      return 'startingLoc'
                    },
                  },
                })
            }
            errorMsgHandler={
              errorMsg.filter(({ field }) => field === 'startingLoc').length > 0 &&
              (() => clearErrorMsg('startingLoc'))
            }
            value={tripInfo.startingLoc.label}
            type="googleAutocomplete"
            onPlaceSelected={(place) => {
              // once place has been selected, handle setting it in state
              onInputChangeHandler({
                target: {
                  value: {
                    label: place.formatted_address,
                    lat: place.geometry.location.lat(),
                    lng: place.geometry.location.lng(),
                  },
                  getAttribute() {
                    return 'startingLoc'
                  },
                },
              })
            }}
          />
        </div>
      </DroppingContainer>

      <DroppingContainer label="Choose the citites you want to visit!">
        <div className={styles.citiesWrapper}>
          <DestinationPicker
            onAddToTrip={onAddToTrip}
            onEditDestination={onEditDestination}
            onCancelDestination={onCancelDestination}
            destinationToEdit={destinations[activeDestination]}
          />
          <DestinationViewer
            destinations={destinations}
            activeDestination={activeDestination}
            onSelectDestination={onSelectDestination}
            onRemoveDestination={onRemoveDestination}
          />
        </div>
      </DroppingContainer>

      <section className={styles.errorMsgArea}>
        <ErrorMsg
          show={errorMsg.length > 0}
          errorMsg={errorMsg}
          isCard
          title="Oops! Cannot continue.."
          onClose={() => setErrorMsg([])}
          unmountOnExit
          mountOnEnter
        />
      </section>

      <Button
        label="Calculate Optimal Trip!"
        icon="calculator"
        iconOnLeftSide
        modifier="filled"
        className={styles.button}
        onClick={() => onCalculateOptimalTrip(tripInfo, destinations, setErrorMsg, onSetTrip)}
      />
    </section>
  )
}

export default TripSelectContainer
