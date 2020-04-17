import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { loadDestination } from '~/store/trip/trip.action'

import GoogleMap from '~/components/GoogleMap/GoogleMap'
import ScrollingClouds from '~/components/ScrollingClouds/ScrollingClouds'

import styles from './styles.module.scss'
import { CSSTransition } from 'react-transition-group'
import useWindowWidth from '~/hooks/useWindowWidth'
import TripSelectContainer from '~/components/Collections/TripSelectContainer/TripSelectContainer'

const NewTrip = () => {
  const dispatch = useDispatch()
  const windowWidth = useWindowWidth()
  const { destinations, activeDestination } = useSelector(({ tripReducer }) => tripReducer)
  const onSelectDestination = (destinationIndex) => dispatch(loadDestination(destinationIndex))

  // toggle if clouds can be killable by changing z-index through css, based on if anything is selected yet
  const googleMapsAreaClasses = [styles.googleMapsArea, destinations.length ? '' : styles.empty]
    .join(' ')
    .trim()

  return (
    <div className={styles.newTrip}>
      <TripSelectContainer
        onSelectDestination={onSelectDestination}
        destinations={destinations}
        activeDestination={activeDestination}
        dispatch={dispatch}
      />

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
