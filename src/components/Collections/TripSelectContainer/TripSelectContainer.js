import React, { useState, useEffect, useLayoutEffect } from 'react'

import DestinationPicker from '~/components/Collections/DestinationPicker/DestinationPicker'
import DestinationViewer from '~/components/Collections/DestinationViewer/DestinationViewer'
import DroppingContainer from '~/components/DroppingContainer/DroppingContainer'
import Input from '~/components/UI/Input/Input'
import Button from '~/components/UI/Button/Button'
import ErrorMsg from '~/components/Collections/ErrorMsg/ErrorMsg'

import uid from '~/thirdPartyHelpers/uid'

import styles from './styles.module.scss'

const onCalculateOptimalTrip = (
  startDate,
  endDate,
  startingLoc,
  destinations,
  setErrorMsg,
  onSetTrip
) => {
  const errors = []

  // check start and end date for valid values
  if (!startDate) {
    errors.push({
      field: 'startDate',
      error: 'Make sure start date is set',
    })
  }

  if (!endDate) {
    errors.push({
      field: 'endDate',
      error: 'Make sure end date is set',
    })
  }

  // will implicitly convert null to 0 and compate timestamps
  if (+startDate >= +endDate) {
    errors.push({
      field: 'endDate',
      error: 'Make sure end date is greater than start date',
    })
  }

  // invalid start location chosen, either not set at all or not properly selected from google autocomplete
  if (!startingLoc.label || !startingLoc.lat || !startingLoc.lng) {
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

  // are starting loc's coords in the destinations arr already?
  if (
    startingLoc.label &&
    startingLoc.lat &&
    startingLoc.lng &&
    destinations.filter(
      ({ location: { lat, lng } }) => startingLoc.lat === lat && startingLoc.lng === lng
    ).length
  ) {
    // starting loc is in destinations, will not be set!
    errors.push({
      field: 'startingLoc',
      error:
        'Starting location cannot also be a destination! Must either change the starting location or remove the destination',
    })
  }

  if (errors.length) {
    setErrorMsg(errors)
  } else {
    onSetTrip(startDate, endDate, destinations, startingLoc)
  }
}

const TripSelectContainer = ({
  startDate,
  endDate,
  startingLocation,
  destinations,
  activeDestination,

  tripSelectContainerActions: {
    onAddDestination,
    onEditDestination,
    onDeleteDestination,
    onSetTrip,
    onSetTripStartingLocation,
    onSetTripStartDate,
    onSetTripEndDate,
    onSelectDestination,
  },
}) => {
  const [startingLoc, setStartingLoc] = useState(
    startingLocation || { lat: null, lng: null, label: '' }
  )
  const [errorMsg, setErrorMsg] = useState([])
  const clearErrorMsg = (removeForField) =>
    setErrorMsg(errorMsg.filter(({ field }) => field !== removeForField))

  const onAddToTrip = (destination) => {
    if (
      // check if destination is new and has not been added previously or that it is not the starting location, otherwise show err
      destinations.filter(
        ({ location: { lat, lng } }) =>
          (lat === destination.location.lat && lng === destination.location.lng) ||
          (startingLocation &&
            startingLocation.lat === destination.location.lat &&
            startingLocation.lng === destination.location.lng)
      ).length
    ) {
      setErrorMsg((errors) => [
        ...errors,
        {
          field: ' destination',
          error:
            'A destination can be added only once! Make sure to not have duplicate destinations, or that the starting location is not also in the list of destinations',
        },
      ])
    } else {
      onAddDestination({ ...destination, uid: uid() })
    }
  }

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

  // clear error msg for not having set starting location, also update reducer with new startingLocation if destinations do not include the same coords
  useEffect(() => {
    if (!startingLoc.label || !startingLoc.lat || !startingLoc.lng) {
      // if an update happened to startingLoc but lat and lng still are not set it means still typing in, still have not selected an autocomplete value

      // clear error msg if it is set!
      setErrorMsg((prevErrors) => prevErrors.filter(({ field }) => field !== 'startingLoc'))
    } else if (startingLoc.label === '') {
      // if it was a full clear of text in where from input, reset value in store so maps reflects change
      onSetTripStartingLocation(null)
    } else {
      onSetTripStartingLocation(startingLoc)
    }
  }, [startingLoc, onSetTripStartingLocation])

  useEffect(() => {
    if (!startingLocation && startingLoc.label) {
      setStartingLoc({ lat: null, lng: null, label: '' })
    }
  }, [startingLocation])

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
            onChange={(value) => onSetTripStartDate(value)}
            errorMsgHandler={
              errorMsg.filter(({ field }) => field === 'startDate').length > 0 &&
              (() => clearErrorMsg('startDate'))
            }
            selected={startDate && new Date(startDate)}
            type="date"
            minDate={new Date()}
          />
          <Input
            label="End Date"
            id="endDate"
            name="endDate"
            comment="When should your trip end?"
            icon="calendar"
            onChange={(value) => onSetTripEndDate(value)}
            errorMsgHandler={
              errorMsg.filter(({ field }) => field === 'endDate').length > 0 &&
              (() => clearErrorMsg('endDate'))
            }
            selected={endDate && new Date(endDate)}
            type="date"
            minDate={startDate || new Date()}
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
              ({ target }) => setStartingLoc({ label: target.value, lat: null, lng: null })
            }
            errorMsgHandler={
              errorMsg.filter(({ field }) => field === 'startingLoc').length > 0 &&
              (() => clearErrorMsg('startingLoc'))
            }
            value={startingLoc.label}
            type="googleAutocomplete"
            onPlaceSelected={(place) => {
              // check if selection returned invaliv obj (pressing enter on unfinished typed text)
              !place.hasOwnProperty('name') &&
                // once place has been selected, handle setting it in state
                setStartingLoc({
                  label: place.formatted_address,
                  lat: place.geometry.location.lat(),
                  lng: place.geometry.location.lng(),
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
            onCancelDestination={() => onSelectDestination(-1)}
            destinationToEdit={destinations[activeDestination]}
          />
          <DestinationViewer
            destinations={destinations}
            activeDestination={activeDestination}
            onSelectDestination={onSelectDestination}
            onRemoveDestination={onDeleteDestination}
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
        onClick={() =>
          onCalculateOptimalTrip(
            startDate,
            endDate,
            startingLoc,
            destinations,
            setErrorMsg,
            onSetTrip
          )
        }
      />
    </section>
  )
}

export default TripSelectContainer
