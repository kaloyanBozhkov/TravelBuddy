import React, { useEffect, useState, useLayoutEffect } from 'react'

import DestinationPicker from '~/components/Collections/DestinationPicker/DestinationPicker'
import DestinationViewer from '~/components/Collections/DestinationViewer/DestinationViewer'
import DroppingContainer from '~/components/DroppingContainer/DroppingContainer'
import Input from '~/components/UI/Input/Input'
import Button from '~/components/UI/Button/Button'
import ErrorMsg from '~/components/Collections/ErrorMsg/ErrorMsg'

import { handleGoogleAutocompleteChange } from '~/helpers/inputHandlers'
import useInputHandler from '~/hooks/useInputHandler'

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
  const errors = {}

  // check start and end date for valid values
  if (!startDate) errors['startDate'] = 'Make sure start date is set'

  if (!endDate) errors['endDate1'] = 'Make sure end date is set'

  // will implicitly convert null to 0 and compate timestamps
  if (+startDate >= +endDate) errors['endDate2'] = 'Make sure end date is greater than start date'

  // check at least two destinations added
  if (destinations.length <= 1) errors['destination1'] = 'Make sure to have added two or more destinations'

  // invalid start location chosen, either not set at all or not properly selected from google autocomplete
  if (!startingLoc.label || !startingLoc.lat || !startingLoc.lng) errors['startingLoc1'] = 'Must have provided a valid starting location'

  // are starting loc's coords in the destinations arr already?
  if (
    startingLoc.label &&
    startingLoc.lat &&
    startingLoc.lng &&
    destinations.filter(
      ({ location: { lat, lng } }) => startingLoc.lat === lat && startingLoc.lng === lng
    ).length
  ) errors['startingLoc2'] = 'Starting location cannot also be a destination! Must either change the starting location or remove the destination'

  if (Object.values(errors).length) {
    setErrorMsg(errors)
  } else {
    onSetTrip(startDate, endDate, destinations, startingLoc)
  }
}

// remove specified prop from given obj
const removePropFromObj = (removeForField, obj) => {
  const newObj = {}
  for (let key in obj) {
    // if key is not same or not almost same (destinatio1, destination2 but key is destination)
    if (key !== removeForField && key.indexOf(removeForField) !== 0) {
      newObj[key] = obj[key]
    } 
  }
  return newObj
}

// find a key with matching substr
const objHasSubstrProp = (prop, obj) => !!Object.keys(obj).find((property) => property.indexOf(prop) === 0)

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
  const [inputs, onSetInputsHandler, setDefaultInputs] = useInputHandler({
    startingLoc: startingLocation || { lat: null, lng: null, label: '' },
  })

  const [errorMsg, setErrorMsg] = useState({})

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
      setErrorMsg(({
        ...errorMsg,
        destination3: 'A destination can be added only once! Make sure to not have duplicate destinations, or that the starting location is not also in the list of destinations'
      }))
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
    if (destinations.length > 1 && objHasSubstrProp('destination', errorMsg)) {
      setErrorMsg(removePropFromObj('destination', errorMsg))
    }
  }, [destinations, inputs, setDefaultInputs, errorMsg])

  // clear error msg for not having set starting location, also update reducer with new startingLocation if destinations do not include the same coords
  useEffect(() => {
    // if an update happened to startingLoc but lat and lng still are not set it means still typing in, still have not selected an autocomplete value
    if (!inputs.startingLoc.label || !inputs.startingLoc.lat || !inputs.startingLoc.lng) {

      // if it was a full clear of text in where from input, reset value in store so maps reflects change
      onSetTripStartingLocation(null)
    } else {
      onSetTripStartingLocation(inputs.startingLoc)
    }
  }, [onSetTripStartingLocation, inputs, setDefaultInputs, errorMsg])

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
              objHasSubstrProp('startDate', errorMsg) &&
              (() => setErrorMsg(removePropFromObj('startDate', errorMsg)))
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
              objHasSubstrProp('endDate', errorMsg) &&
              (() => setErrorMsg(removePropFromObj('endDate', errorMsg)))
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
              // whilst typing handle setting location
              ({ target }) =>
                handleGoogleAutocompleteChange(onSetInputsHandler, target.value, 'startingLoc')
            }
            errorMsgHandler={
              objHasSubstrProp('startingLoc', errorMsg) &&
              (() => setErrorMsg(removePropFromObj('startingLoc', errorMsg)))
            }
            value={inputs.startingLoc.label}
            type="googleAutocomplete"
            onPlaceSelected={(place) => {
              // check if selection returned invaliv obj (pressing enter on unfinished typed text)
              !place.hasOwnProperty('name') &&
                // once place has been selected, handle setting it in state
                setDefaultInputs({
                  startingLoc: {
                    label: place.formatted_address,
                    lat: place.geometry.location.lat(),
                    lng: place.geometry.location.lng(),
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
          show={Object.values(errorMsg).length > 0}
          errorMsg={Object.values(errorMsg)}
          isCard
          title="Oops! Cannot continue.."
          onClose={() => setErrorMsg({})}
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
            inputs.startingLoc,
            destinations,
            (errors) => setErrorMsg({ ...errorMsg, ...errors }),
            onSetTrip
          )
        }
      />
    </section>
  )
}

export default TripSelectContainer
