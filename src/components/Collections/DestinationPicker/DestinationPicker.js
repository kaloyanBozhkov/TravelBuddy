import React, { useState, useRef, useEffect } from 'react'

import Input from '~/components/UI/Input/Input'
import Label from '~/components/UI/Label/Label'
import Button from '~/components/UI/Button/Button'

import fetchWeather from '~/helpers/fetchWeather'
import { handleDateChange } from '~/helpers/inputHandlers'

import useInputHandler from '~/hooks/useInputHandler'
import useTransalteDivWithScroll from '~/hooks/useTranslateDivWithScroll'

import styles from './styles.module.scss'

const newDestination = {
  location: { label: '', lat: null, lng: null },
  stays: '',
  beHereOn: '',
  weatherPref: '',
  uid: '',
}
/**
 * @param  {} {onAddToTrip
 * @param  {} onEditDestination
 * @param  {} onCancelDestination
 * @param  {} destinationToEdit=null
 * @param  {bool} withAutocompleteGoogleMapsScript=false => if GoogleMap is loaded on same page, there will be two script tags importing google maps api, this controls autocomplete input's script tag
 */
const DestinationPicker = ({
  onAddToTrip,
  onEditDestination,
  onCancelDestination,
  destinationToEdit = null,
}) => {
  const [destination, onDestinationInputChangeHandler, setEntireState] = useInputHandler(
    destinationToEdit || newDestination
  )
  const [locationError, setLocationError] = useState(false)

  // ref to dom elements for picker and its content wrapper, for scroll solution!
  const pickerRef = useRef()
  const pickerWrapperRef = useRef()

  useTransalteDivWithScroll({ parentRef: pickerRef, childRef: pickerWrapperRef, margin: 50 })

  const cannotAddTrip =
    !destination.location.label || !destination.location.lat || !destination.location.lng

  const clearLocationError = () => setLocationError(false)

  const onAddToTripHandler = () => {
    if (cannotAddTrip) {
      setLocationError(true)
    } else {
      onAddToTrip(destination)

      // reset values after adding to trip
      setEntireState(newDestination)
    }
  }
  const onEditDestinationHandler = () => onEditDestination(destination)

  // when destination to edit is set/unset, re-set inputs and vice-versa
  useEffect(() => {
    if (destinationToEdit && destination.uid !== destinationToEdit.uid) {
      setEntireState(destinationToEdit)
    } else if (!destinationToEdit && destination.uid !== '') {
      setEntireState(newDestination)
    }
  }, [destinationToEdit, destination, setEntireState])

  return (
    <div className={styles.picker} ref={pickerRef}>
      <div className={styles.pickerWrapper} ref={pickerWrapperRef}>
        <Input
          label="Where to?"
          id="location"
          name="location"
          comment="Which place to visit next?"
          icon="mapMarkerAlt"
          onChange={
            // whilst typing handle setting location
            ({ target }) =>
              onDestinationInputChangeHandler({
                target: {
                  value: {
                    label: target.value,
                    lat: null,
                    lng: null,
                  },
                  getAttribute() {
                    return 'location'
                  },
                },
              })
          }
          errorMsgHandler={locationError && clearLocationError}
          value={destination.location.label}
          type="googleAutocomplete"
          onPlaceSelected={(place) => {
            // once place has been selected, handle setting it in state
            onDestinationInputChangeHandler({
              target: {
                value: {
                  label: place.formatted_address,
                  lat: place.geometry.location.lat(),
                  lng: place.geometry.location.lng(),
                },
                getAttribute() {
                  return 'location'
                },
              },
            })

            const lat = place.geometry.location.lat()
            const lng = place.geometry.location.lng()
            const date = '2020-04-10'

            console.log(lat, lng)

            fetchWeather(date, lat, lng).then(console.log).catch(console.log)
          }}
        />

        <Label text="Preferences" withRibbon className={styles.preferencesLabel} />

        <Input
          label="Stays"
          id="stays"
          name="stays"
          comment="Minimum days to stay here"
          icon="clock"
          onChange={onDestinationInputChangeHandler}
          value={destination.stays}
          type="number"
        />
        <Input
          label="Be here on.."
          id="beHereOn"
          name="beHereOn"
          comment="Any exact date to be here on?"
          icon="calendar"
          onChange={(value) => handleDateChange(onDestinationInputChangeHandler, value, 'beHereOn')}
          selected={destination.beHereOn && new Date(destination.beHereOn)}
          type="date"
        />
        <Input
          label="Weather"
          id="weatherPref"
          name="weatherPref"
          comment="Weather preference during stay"
          icon="sun"
          onChange={onDestinationInputChangeHandler}
          type="select"
          selected={destination.weatherPref}
          options={['Sunny', 'Rainy', 'Cloudy', 'Stormy', '']}
        />

        {destinationToEdit ? (
          <div className={styles.button} editmode="true">
            <Button
              label="Save"
              modifier="filled"
              onClick={() => onEditDestinationHandler() && onCancelDestination()}
            />
            <Button label="Cancel" modifier="filled" onClick={onCancelDestination} />
          </div>
        ) : (
          <Button
            label="Add To Trip"
            icon="plus"
            iconOnLeftSide
            modifier="filled"
            className={styles.button}
            onClick={onAddToTripHandler}
          />
        )}
      </div>
    </div>
  )
}

export default DestinationPicker
