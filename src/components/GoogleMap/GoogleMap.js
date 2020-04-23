import React, { useState, useRef, createRef, useLayoutEffect, useEffect } from 'react'
import { Map, Marker, Polyline } from 'google-maps-react'

import DestinationInfoWindow from './DestinationInfoWindow/DestinationInfoWindow'
import flag from '~/assets/flag.svg'
import styles from './styles.module.scss'
import fitBounds from './mapFunctions/FitBounds'
import getRoutePath from './mapFunctions/GetRoutePath'
import randomColor from '~/helpers/randomColor'

const defaultInitialCenter = {
  lat: 1,
  lng: 1,
}

const GoogleMap = ({
  startingLocation,
  initialCenter = defaultInitialCenter,
  onSelectDestination,
  withRoute = false,
  activeDestination = -1,
  destinations = [],
  isCalculating = false,
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

  // update marker ref for startingLocation before any fitting is done on map
  useLayoutEffect(() => {
    if (!startingLocation && markerRefs.current.hasOwnProperty('startingLocation')) {
      delete markerRefs.current.startingLocation
    }
  }, [startingLocation])

  // update map center location and bounds based on selected destination
  useLayoutEffect(() => {
    // if destination selected to view, zoom on that
    if (destinations[activeDestination]) {
      fitBounds(mapRef, destinations[activeDestination].location, setLocation)
    } else {
      // if nothing selected, make google maps zoom out until it fits all markers
      fitBounds(mapRef, markerRefs, setLocation)
    }
  }, [activeDestination, destinations, startingLocation])

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
      centerAroundCurrentLocation={!~activeDestination && startingLocation === null}
      center={location}
      ref={mapRef}
      mapTypeControl={!withRoute}
    >
      {destinations.map(({ location: { lat, lng }, uid }, key) => {
        // keep track of marker through persisting ref obj
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
          // add to markerRefs
          markerRefs.current.startingLocation = createRef()
          return (
            <Marker
              ref={markerRefs.current.startingLocation}
              icon={flag}
              position={{ lat: startingLocation.lat, lng: startingLocation.lng }}
            />
          )
        })()}
      {withRoute &&
        !isCalculating &&
        [startingLocation, ...destinations].map(({ polylinePaths, uid }) =>
          polylinePaths.length > 0 ? (
            <Polyline
              key={uid}
              path={polylinePaths}
              strokeColor={randomColor()}
              strokeOpacity={0.5}
              strokeWeight={4}
              onMouseover={(e) => {}}
            />
          ) : null
        )}
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

// export default () => <p>repalcement to not spam API calls</p>
export default GoogleMap
