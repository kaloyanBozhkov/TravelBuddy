import React, { useState, useRef, createRef, useLayoutEffect, useEffect } from 'react'
import { Map, Marker } from 'google-maps-react'

import DestinationInfoWindow from './DestinationInfoWindow/DestinationInfoWindow'

import styles from './styles.module.scss'
import fitBounds from './mapFunctions/FitBounds'

const defaultInitialCenter = {
  lat: 1,
  lng: 1,
}

const GoogleMap = ({
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

  // update map center location and bounds based on selected destination
  useLayoutEffect(() => {
    if (destinations[activeDestination]) {
      fitBounds(mapRef, destinations[activeDestination].location, setLocation)
    } else {
      fitBounds(mapRef, markerRefs, setLocation)
    }
  }, [activeDestination, destinations])

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
      {destinations.map(({ location: { lat, lng, label }, uid }, key) => {
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
      <DestinationInfoWindow
        marker={infoWindow.marker}
        config={infoWindow.config}
        onCloseDestinationInfoWindow={() => onSelectDestination(-1)}
        isOpen={infoWindow.isOpen}
      />
    </Map>
  )
}

export default GoogleMap
