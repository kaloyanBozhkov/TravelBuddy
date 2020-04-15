import React from 'react'
import { Map } from 'google-maps-react'

import style from './styles.module.scss'

const GoogleMap = () => {
  return (
    <Map
      google={window.google}
      zoom={14}
      className={style.googleMap}
      initialCenter={{
        lat: -1.2884,
        lng: 36.8233,
      }}
    />
  )
}

export default GoogleMap
