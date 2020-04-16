import React from 'react'
import { InfoWindow } from 'google-maps-react'

import Label from '~/components/UI/Label/Label'
import dateDisplay from '~/helpers/date'

import styles from './styles.module.scss'
import './overwrite.module.scss'

const DestinationInfoWindow = ({
  config,
  marker,
  isOpen,
  onCloseDestinationInfoWindow,
  map,
  google,
}) => {
  const label = config.location && config.location.label

  return (
    <InfoWindow
      marker={marker}
      visible={isOpen}
      position={config.location}
      onClose={onCloseDestinationInfoWindow}
      google={google}
      map={map}
    >
      <div className={styles.destinationInfo}>
        <Label text={`Stop #1`} withRibbon />
        <div className={styles.content}>
          <div>
            <h1>Location</h1>
            <p>{label}</p>
          </div>

          <div>
            <h1>Minimum days to stay</h1>
            <p>{config.stays || 'Any'}</p>
          </div>

          <div>
            <h1>Exact date to be here on</h1>
            <p>{(config.beHereOn && dateDisplay(config.beHereOn).format()) || 'None'}</p>
          </div>

          <div>
            <h1>Desired weather during stay</h1>
            <p>{config.weatherPref || 'Any'}</p>
          </div>
        </div>
      </div>
    </InfoWindow>
  )
}

export default DestinationInfoWindow
