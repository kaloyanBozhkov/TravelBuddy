import React, { useEffect, useState } from 'react'

import Input from '~/components/UI/Input/Input'
import Label from '~/components/UI/Label/Label'
import Button from '~/components/UI/Button/Button'

import dateDisplay from '~/helpers/date'
import { handleDateChange } from '~/helpers/inputHandlers'
import useInputHandler from '~/hooks/useInputHandler'

import styles from './styles.module.scss'

const DestinationPicker = ({ onAddToTrip, initialDestination = {} }) => {
  const [destination, onDestinationInputChangeHandler] = useInputHandler({
    location: initialDestination.location || '',
    stays: initialDestination.stays || '',
    beHereOn: initialDestination.beHereOn || '',
    weatherPref: initialDestination.weatherPref || '',
  })
  const [locationError, setLocationError] = useState(false)

  const cannotAddTrip = !destination.location
  const clearLocationError = () => setLocationError(false)
  const onAddToTripHandler = () =>
    cannotAddTrip ? setLocationError(true) : onAddToTrip(destination)

  return (
    <div className={styles.picker}>
      <Input
        label="Where to?"
        id="location"
        name="location"
        comment="Which place to visit next?"
        icon="mapMarkerAlt"
        onChange={onDestinationInputChangeHandler}
        errorMsgHandler={clearLocationError}
        invalidInputHandler={locationError}
        value={destination.location}
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
        value={destination.beHereOn && dateDisplay(destination.beHereOn).format()}
        type="date"
      />
      <Input
        label="Weather"
        id="weatherPref"
        name="weatherPref"
        comment="Weather preference during stay"
        icon="sun"
        onChange={onDestinationInputChangeHandler}
        value={destination.weatherPref}
      />

      <Button
        label="Add To Trip"
        icon="plus"
        iconOnLeftSide
        modifier="filled"
        className={styles.button}
        onClick={onAddToTripHandler}
        disabled={cannotAddTrip}
      />
    </div>
  )
}

export default DestinationPicker
