import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  addDestination,
  loadDestination,
  editDestination,
  deleteDestination,
} from '~/store/trip/trip.action'

import GoogleMap from '~/components/GoogleMap/GoogleMap'
import ScrollingClouds from '~/components/ScrollingClouds/ScrollingClouds'
import DestinationPicker from '~/components/Collections/DestinationPicker/DestinationPicker'
import DestinationViewer from '~/components/Collections/DestinationViewer/DestinationViewer'
import DroppingContainer from '~/components/DroppingContainer/DroppingContainer'
import Input from '~/components/UI/Input/Input'
import Button from '~/components/UI/Button/Button'

import { handleDateChange } from '~/helpers/inputHandlers'
import useInputHandler from '~/hooks/useInputHandler'
import uid from '~/thirdPartyHelpers/uid'

import styles from './styles.module.scss'
import { CSSTransition } from 'react-transition-group'
import useWindowWidth from '~/hooks/useWindowWidth'

const NewTrip = () => {
  const dispatch = useDispatch()
  const windowWidth = useWindowWidth()

  const [dates, onDateInputChangeHandler] = useInputHandler({
    startDate: '',
    endDate: '',
  })
  const { destinations, activeDestination } = useSelector(({ tripReducer }) => tripReducer)

  const onAddToTrip = (destination) => dispatch(addDestination({ ...destination, uid: uid() }))
  const onSelectDestination = (destinationIndex) => dispatch(loadDestination(destinationIndex))
  const onCancelDestination = () => onSelectDestination(-1)
  const onEditDestination = (newDestinationData) =>
    dispatch(editDestination(activeDestination, newDestinationData))
  const onRemoveDestination = (destinationIndex) => dispatch(deleteDestination(destinationIndex))

  // toggle if clouds can be killable by changing z-index through css, based on if anything is selected yet
  const googleMapsAreaClasses = [styles.googleMapsArea, destinations.length ? '' : styles.empty]
    .join(' ')
    .trim()

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

      <section className={googleMapsAreaClasses}>
        <CSSTransition
          in={!!destinations.length}
          mountOnEnter
          unmountOnExit
          timeout={2000}
          classNames={{
            appearActive: styles.entering,
            enterActive: styles.entering,
            exitActive: styles.exiting,
          }}
        >
          <GoogleMap
            destinations={destinations}
            activeDestination={activeDestination}
            onCloseDestination={onSelectDestination}
            onSelectDestination={onSelectDestination}
          />
        </CSSTransition>
      </section>

      <CSSTransition
        in={!destinations.length || windowWidth < 576}
        mountOnEnter
        unmountOnExit
        timeout={1000}
        appear
        classNames={{
          appearActive: styles.entering,
          enterActive: styles.entering,
          exitActive: styles.exiting,
        }}
      >
        <div
          className={[styles.background, windowWidth < 576 ? styles.halfSize : ''].join(' ').trim()}
        >
          <ScrollingClouds reverseCounter />
        </div>
      </CSSTransition>
    </div>
  )
}

export default NewTrip
