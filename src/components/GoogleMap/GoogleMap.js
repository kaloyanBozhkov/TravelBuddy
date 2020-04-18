import React, { useState, useRef, createRef, useLayoutEffect } from 'react'
import { Map, Marker } from 'google-maps-react'

import DestinationInfoWindow from './DestinationInfoWindow/DestinationInfoWindow'
import flag from '~/assets/flag.svg'
import styles from './styles.module.scss'
import fitBounds from './mapFunctions/FitBounds'

const defaultInitialCenter = {
  lat: 1,
  lng: 1,
}

const GoogleMap = ({
  startingLocation,
  activeDestination = -1,
  destinations = [],
  initialCenter = defaultInitialCenter,
  onSelectDestination,
}) => {
  const [location, setLocation] = useState(initialCenter)
  const [infoWindow, setInfoWindow] = useState({
    isOpen: false,
    marker: {},
    config: {},
  })
  const markerRefs = useRef({})
  const mapRef = useRef()

  // when destinations arr changes (destination added/removed), delete markers no longer needed
  useLayoutEffect(() => {
    const previousDestinations = Object.keys(markerRefs.current)

    // if first destination was added, dont do anything
    if (previousDestinations.length > 0) {
      // arr of uid's of removed destinations
      const removedDestinations = previousDestinations.filter(
        (uid) => !~destinations.map((dest) => dest.uid).indexOf(uid)
      )

      // for each removed destination's uid
      removedDestinations.forEach((uid) => {
        // delete the persisting ref to the unset marker
        delete markerRefs.current[uid]
      })
    }
  }, [destinations])

  // update map center location and bounds based on selected destination
  useLayoutEffect(() => {
    if (destinations[activeDestination]) {
      fitBounds(mapRef, destinations[activeDestination].location, setLocation)
    } else {
      fitBounds(mapRef, markerRefs, setLocation)
    }
  }, [activeDestination, destinations])

  // when active destiantion changes, show/hide infoWindow according to destination's marker on map
  useLayoutEffect(() => {
    if (destinations[activeDestination]) {
      setInfoWindow({
        isOpen: true,
        marker:
          markerRefs.current[destinations[activeDestination].uid].current &&
          markerRefs.current[destinations[activeDestination].uid].current.marker,
        config: destinations[activeDestination],
      })
    } else {
      setInfoWindow({
        isOpen: false,
        marker: {},
        config: {},
      })
    }
  }, [activeDestination, destinations])

  return (
    <Map
      google={window.google}
      zoom={14}
      className={styles.googleMap}
      centerAroundCurrentLocation={!~activeDestination}
      center={location}
      ref={mapRef}
    >
      {destinations.map(({ location: { lat, lng }, uid }, key) => {
        markerRefs.current[uid] = createRef()
        return (
          <Marker
            key={uid}
            position={{ lat, lng }}
            animation={activeDestination === key ? undefined : window.google.maps.Animation.DROP}
            // no need to use props and marker from here since ref has access to
            onClick={(props, marker) => onSelectDestination(activeDestination === key ? -1 : key)}
            ref={markerRefs.current[uid]}
          />
        )
      })}
      {startingLocation &&
        (() => {
          return (
            <Marker
              icon={flag}
              position={{ lat: startingLocation.lat, lng: startingLocation.lng }}
            />
          )
        })()}
      <DestinationInfoWindow
        marker={infoWindow.marker}
        config={infoWindow.config}
        onCloseDestinationInfoWindow={() => onSelectDestination(-1)}
        isOpen={infoWindow.isOpen}
        stopNumber={activeDestination}
      />
    </Map>
  )
}

export default GoogleMap
