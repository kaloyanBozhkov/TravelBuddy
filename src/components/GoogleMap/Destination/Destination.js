import React, { useState } from 'react'
import { Marker, InfoWindow } from 'google-maps-react'

import Label from '~/components/UI/Label/Label'
import dateDisplay from '~/helpers/date'

import styles from './styles.module.scss'

const Destination = ({ position, label, preferences }) => {
  console.log(position, label, preferences)
  const [marker, setMarker] = useState({
    selectedPlace: {},
    activeMarker: {},
    showingInfoWindow: true,
  })

  const onMarkerClick = (props, marker, e) => {
    setMarker({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
    })
  }

  const onCloseMarker = (props) => {
    if (marker.showingInfoWindow) {
      setMarker({
        ...marker,
        showingInfoWindow: false,
        activeMarker: null,
      })
    }
  }

  return (
    <React.Fragment>
      <Marker
        onClick={onMarkerClick}
        name={label}
        label={label}
        position={position}
        animation={window.google.maps.Animation.DROP}
      />
      <InfoWindow
        marker={marker.activeMarker}
        visible={marker.showingInfoWindow}
        onClose={onCloseMarker}
      >
        <div className={styles.destinationInfo}>
          <Label text={label} withRibbon />
          <div className={styles.content}>
            <div>
              <h1>Location</h1>
              <p>{preferences.location}</p>
            </div>

            <div>
              <h1>Minimum days to stay</h1>
              <p>{preferences.stays || 'Any'}</p>
            </div>

            <div>
              <h1>Exact date to be here on</h1>
              <p>
                {(preferences.beHereOn && dateDisplay(preferences.beHereOn).format()) || 'None'}
              </p>
            </div>

            <div>
              <h1>Desired weather during stay</h1>
              <p>{preferences.weatherPref || 'Any'}</p>
            </div>
          </div>
        </div>
      </InfoWindow>
    </React.Fragment>
  )
}

export default Destination
