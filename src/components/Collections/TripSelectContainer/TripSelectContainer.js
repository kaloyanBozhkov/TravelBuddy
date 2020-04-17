import React from 'react'
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

  const onAddToTrip = (destination) => dispatch(addDestination({ ...destination, uid: uid() }))
  const onCancelDestination = () => onSelectDestination(-1)
  const onEditDestination = (newDestinationData) =>
    dispatch(editDestination(activeDestination, newDestinationData))
  const onRemoveDestination = (destinationIndex) => dispatch(deleteDestination(destinationIndex))

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
            // errorMsgHandler={clearError}
            // invalidInputHandler={errorMsg && !!~errorMsg.indexOf('email')}
            selected={dates.startDate && new Date(dates.startDate)}
            type="date"
          />
          <Input
            label="End Date"
            id="endDate"
            name="endDate"
            comment="When should your trip end?"
            icon="calendar"
            onChange={(value) => handleDateChange(onDateInputChangeHandler, value, 'endDate')}
            // errorMsgHandler={clearError}
            // invalidInputHandler={errorMsg && !!~errorMsg.indexOf('email')}
            selected={dates.endDate && new Date(dates.endDate)}
            type="date"
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
        onClick={(f) => f}
      />
    </section>
  )
}

export default TripSelectContainer
