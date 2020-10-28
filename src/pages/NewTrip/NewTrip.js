import React, { useRef } from 'react'
import { CSSTransition } from 'react-transition-group'

import GoogleMap from '~/components/GoogleMap/GoogleMap'
import ScrollingClouds from '~/components/ScrollingClouds/ScrollingClouds'
import Loading from '~/components/UI/Loading/Loading'
import TripSelectContainer from '~/components/Collections/TripSelectContainer/TripSelectContainer'
import OptimalTripDisplayContainer from '~/components/Collections/OptimalTripDisplayContainer/OptimalTripDisplayContainer'

import useWindowWidth from '~/hooks/useWindowWidth'
import useTransalteDivWithScroll from '~/hooks/useTranslateDivWithScroll'

import styles from './styles.module.scss'

const NewTrip = ({
  startDate,
  endDate,
  startingLocation,
  destinations,
  activeDestination,
  isCalculating,
  optimalTrip,
  showOptimalTrip,

  onCloseOptimalTripDisplay,

  onSelectDestination,
  ...tripSelectContainerActions
}) => {
  const windowWidth = useWindowWidth()

  // ref to dom elements for picker and its content wrapper, for scroll solution!
  const googleMapsRef = useRef()
  const googleMapsWrapperRef = useRef()

  useTransalteDivWithScroll({ parentRef: googleMapsWrapperRef, childRef: googleMapsRef })

  // toggle if clouds can be killable by changing z-index through css, based on if anything is selected yet
  const googleMapsAreaClasses = [
    styles.googleMapsArea,
    destinations.length || showOptimalTrip ? '' : styles.empty,
  ]
    .join(' ')
    .trim()

    return (
    <div className={styles.newTrip} ref={googleMapsWrapperRef}>
      <CSSTransition in={isCalculating} appear mountOnEnter unmountOnExit timeout={400}>
        <div className={styles.calculatingOverlay}>
          <Loading msg="Calculating optimal trip..." />
        </div>
      </CSSTransition>

      <section className={styles.leftSideWrapper}>
        <CSSTransition in={!showOptimalTrip} timeout={450} mountOnEnter unmountOnExit>
          <TripSelectContainer
            startDate={startDate}
            endDate={endDate}
            startingLocation={startingLocation}
            destinations={destinations}
            activeDestination={activeDestination}
            tripSelectContainerActions={{
              onSelectDestination,
              ...tripSelectContainerActions,
            }}
          />
        </CSSTransition>

        <CSSTransition in={showOptimalTrip} timeout={400} appear mountOnEnter unmountOnExit>
          <OptimalTripDisplayContainer
            optimalTrip={optimalTrip}
            onClose={onCloseOptimalTripDisplay}
          />
        </CSSTransition>
      </section>

      <section className={googleMapsAreaClasses} ref={googleMapsRef}>
        {!isCalculating && (
          <CSSTransition
            in={!!destinations.length || !!startingLocation}
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
              optimalTrip={optimalTrip}
              activeDestination={activeDestination}
              startingLocation={startingLocation}
              onCloseDestination={onSelectDestination}
              onSelectDestination={onSelectDestination}
              withRoute={showOptimalTrip}
              isCalculating={isCalculating}
            />
          </CSSTransition>
        )}
      </section>

      <CSSTransition
        in={(!destinations.length && !optimalTrip.length) || windowWidth < 576}
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
          className={[
            styles.background,
            windowWidth < 576 && (destinations.length || showOptimalTrip) ? styles.halfSize : '',
          ]
            .join(' ')
            .trim()}
        >
          <ScrollingClouds reverseCounter />
        </div>
      </CSSTransition>
    </div>
  )
}

export default NewTrip
