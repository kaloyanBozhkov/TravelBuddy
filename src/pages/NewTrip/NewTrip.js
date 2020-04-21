import React, { useRef } from 'react'
import { CSSTransition } from 'react-transition-group'

import GoogleMap from '~/components/GoogleMap/GoogleMap'
import ScrollingClouds from '~/components/ScrollingClouds/ScrollingClouds'
import Loading from '~/components/UI/Loading/Loading'
import TripSelectContainer from '~/components/Collections/TripSelectContainer/TripSelectContainer'

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
    destinations.length || optimalTrip.length ? '' : styles.empty,
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

      <CSSTransition in={!!optimalTrip.length} timeout={5000} mountOnEnter unmountOnExit>
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

      <section className={googleMapsAreaClasses} ref={googleMapsRef}>
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
            startingLocation={startingLocation}
            onCloseDestination={onSelectDestination}
            onSelectDestination={onSelectDestination}
            withRoute={!!optimalTrip.length}
          />
        </CSSTransition>
        {/* {((dests, actvDest, strtLoc, optTrip) => {
          const [startingLoc, ...optDests] = optTrip
          const formatedDestinations =
            optDests &&
            optDests.map((dest) => ({
              location: {
                label: dest.label,
                lat: dest.lat,
                lng: dest.lng,
              },
              preferences: dest.preferences,
              uid: dest.uid,
              // costToHere
            }))

          const destinations = optTrip.length ? formatedDestinations : dests
          const activeDestination = optTrip.length ? -1 : actvDest
          const startingLocation = optTrip.length ? startingLoc : strtLoc

          return (
            
          )
        })(destinations, activeDestination, startingLocation, optimalTrip)} */}
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
          className={[styles.background, windowWidth < 576 ? styles.halfSize : ''].join(' ').trim()}
        >
          <ScrollingClouds reverseCounter />
        </div>
      </CSSTransition>
    </div>
  )
}

export default NewTrip
