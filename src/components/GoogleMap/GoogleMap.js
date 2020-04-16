import React, { useState, useLayoutEffect } from 'react'
import { Map } from 'google-maps-react'

import Destination from './Destination/Destination'

import style from './styles.module.scss'

const defaultInitialCenter = {
  lat: 1,
  lng: 1,
}

const GoogleMap = ({
  activeDestination = -1,
  destinations = [],
  initialCenter = defaultInitialCenter,
}) => {
  const [location, setLocation] = useState(initialCenter)
  useLayoutEffect(() => {
    if (destinations[activeDestination]) {
      const { lat, lng } = destinations[activeDestination].location
      setLocation({ lat, lng })
    }
  }, [activeDestination])

  return (
    <Map
      google={window.google}
      zoom={14}
      className={style.googleMap}
      centerAroundCurrentLocation={activeDestination === -1}
      center={location}
    >
      {destinations.map(({ location, uid, ...preferences }) => {
        const position = {
          lat: location.lat,
          lng: location.lng,
        }

        return (
          <Destination
            key={uid}
            position={position}
            label={location.label}
            preferences={preferences}
          />
        )
      })}
    </Map>
  )
}

export default GoogleMap
