import React, { useState, useLayoutEffect } from 'react'
import { addDestination, editDestination, deleteDestination } from '~/store/trip/trip.action'

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

const TripSelectContainer = ({
  destinations,
  activeDestination,
  onSelectDestination,
  dispatch,
}) => {
  const [dates, onDateInputChangeHandler] = useInputHandler({
    startDate: null,
    endDate: null,
  })
  const [errorMsg, setErrorMsg] = useState([])
  const clearErrorMsg = (removeForField) =>
    setErrorMsg(errorMsg.filter(({ field }) => field !== removeForField))

  const onAddToTrip = (destination) => dispatch(addDestination({ ...destination, uid: uid() }))
  const onCancelDestination = () => onSelectDestination(-1)
  const onEditDestination = (newDestinationData) =>
    dispatch(editDestination(activeDestination, newDestinationData))
  const onRemoveDestination = (destinationIndex) => dispatch(deleteDestination(destinationIndex))

  const onCalculateOptimalTrip = () => {
    const errors = []

    // check start and end date for valid values
    if (!dates.startDate) {
      errors.push({
        field: 'startDate',
        error: 'Make sure start date is set',
      })
    }

    if (!dates.endDate) {
      errors.push({
        field: 'endDate',
        error: 'Make sure end date is set',
      })
    }

    // will implicitly convert null to 0 and compate timestamps
    if (+dates.startDate >= +dates.endDate) {
      errors.push({
        field: 'endDate',
        error: 'Make sure end date is greater than start date',
      })
    }

    if (destinations.length <= 1) {
      errors.push({
        field: 'destination',
        error: 'Make sure to have added two or more destinations',
      })
    }

    // check at least two destinations added
    if (errors.length) {
      setErrorMsg(errors)
    } else {
    }
  }

  // make sure to trigger the update scroll of
  useLayoutEffect(() => {
    window.scrollBy(0, 0)
  }, [destinations])

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
            errorMsgHandler={
              errorMsg.filter(({ field }) => field === 'startDate').length > 0 &&
              (() => clearErrorMsg('startDate'))
            }
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
            errorMsgHandler={
              errorMsg.filter(({ field }) => field === 'endDate').length > 0 &&
              (() => clearErrorMsg('endDate'))
            }
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
        onClick={onCalculateOptimalTrip}
      />
    </section>
  )
}

export default TripSelectContainer
