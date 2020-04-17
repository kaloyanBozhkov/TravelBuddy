import React, { useState } from 'react'
import { addDestination, editDestination, deleteDestination } from '~/store/trip/trip.action'

import DestinationPicker from '~/components/Collections/DestinationPicker/DestinationPicker'
import DestinationViewer from '~/components/Collections/DestinationViewer/DestinationViewer'
import DroppingContainer from '~/components/DroppingContainer/DroppingContainer'
import Input from '~/components/UI/Input/Input'
import Button from '~/components/UI/Button/Button'

import { handleDateChange } from '~/helpers/inputHandlers'
import useInputHandler from '~/hooks/useInputHandler'
import uid from '~/thirdPartyHelpers/uid'

import styles from './styles.module.scss'

const TripSelectContainer = ({
  destinations,
  activeDestination,
  onSelectDestination,
  dispatch,
}) => {
  const [dates, onDateInputChangeHandler] = useInputHandler({
    startDate: '',
    endDate: '',
  })
  const [errorMsg, setErrorMsg] = useState([])
  const clearErrorMsg = (errMsg) => setErrorMsg(errorMsg.filter((msg) => msg !== errMsg))

  const onAddToTrip = (destination) => dispatch(addDestination({ ...destination, uid: uid() }))
  const onCancelDestination = () => onSelectDestination(-1)
  const onEditDestination = (newDestinationData) =>
    dispatch(editDestination(activeDestination, newDestinationData))
  const onRemoveDestination = (destinationIndex) => dispatch(deleteDestination(destinationIndex))

  const onCalculateOptimalTrip = () => {
    const canProceed = (() => {
      // check start and end date for valid values
      if (dates.startDate === '' || dates.endDate === '') {
        return 'Make sure start date is set'
      } else if (dates.endDate === '') {
        return 'Make sure end date is set'
      } else if (+dates.startDate <= +dates.endDate) {
        return 'Make sure end date is greater than start date'
      }

      return true
    })()

    // check at least two destinations added

    if (canProceed === true) {
    }
  }

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
            onChange={(value) => handleDateChange(onDateInputChangeHandler, value, 'startDate')}
            errorMsgHandler={() => clearErrorMsg('startDate')}
            invalidInputHandler={errorMsg && !!~errorMsg.indexOf('email')}
            selected={dates.startDate && new Date(dates.startDate)}
            type="date"
            minDate={new Date()}
          />
          <Input
            label="End Date"
            id="endDate"
            name="endDate"
            comment="When should your trip end?"
            icon="calendar"
            onChange={(value) => handleDateChange(onDateInputChangeHandler, value, 'endDate')}
            errorMsgHandler={() => clearErrorMsg('endDate')}
            invalidInputHandler={errorMsg && !!~errorMsg.indexOf('endDate')}
            selected={dates.endDate && new Date(dates.endDate)}
            type="date"
            minDate={dates.startDate || new Date()}
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

      <Button
        label="Calculate Optimal Trip!"
        icon="calculator"
        iconOnLeftSide
        modifier="filled"
        className={styles.button}
        onClick={onCalculateOptimalTrip}
      />
    </section>
  )
}

export default TripSelectContainer
