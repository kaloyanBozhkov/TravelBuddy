import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  addDestination,
  loadDestination,
  editDestination,
  deleteDestination,
} from '~/store/trip/trip.action'

import DestinationPicker from '~/components/Collections/DestinationPicker/DestinationPicker'
import DestinationViewer from '~/components/Collections/DestinationViewer/DestinationViewer'
import DroppingContainer from '~/components/DroppingContainer/DroppingContainer'
import Input from '~/components/UI/Input/Input'
import Button from '~/components/UI/Button/Button'

import { handleDateChange } from '~/helpers/inputHandlers'
import useInputHandler from '~/hooks/useInputHandler'

import styles from './styles.module.scss'
import ScrollingClouds from '~/components/ScrollingClouds/ScrollingClouds'

const NewTrip = () => {
  const dispatch = useDispatch()

  const [dates, onDateInputChangeHandler] = useInputHandler({
    startDate: '',
    endDate: '',
  })
  const { destinations, activeDestination } = useSelector(({ tripReducer }) => tripReducer)

  const onAddToTrip = (destination) => dispatch(addDestination(destination))
  const onSelectDestination = (destinationIndex) => dispatch(loadDestination(destinationIndex))
  const onCancelDestination = () => onSelectDestination(-1)
  const onEditDestination = (newDestinationData) =>
    dispatch(editDestination(activeDestination, newDestinationData))
  const onRemoveDestination = (destinationIndex) => dispatch(deleteDestination(destinationIndex))

  // toggle if clouds can be killable, based on if anything is selected yet
  const googleMapsAreaClasses = [styles.googleMapsArea, styles.empty].join(' ')

  return (
    <div className={styles.newTrip}>
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
      </section>

      <section className={googleMapsAreaClasses}>
        <p>CONTENT</p>
      </section>

      <div className={styles.background}>
        <ScrollingClouds reverseCounter />
      </div>
    </div>
  )
}

export default NewTrip