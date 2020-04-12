import React from 'react'
import styles from './styles.module.scss'
import Label from '~/components/UI/Label/Label'
import DestinationCard from '~/components/DestinationCard/DestinationCard'

const DestinationViewer = ({ updateDestinations, destinations = [] }) => {
  return (
    <div className={styles.viewer}>
      <Label text="Your Trip" withRibbon />

      {destinations.length > 0 ? (
        destinations.map((destination, key) => (
          <DestinationCard
            key={`${destination.location}-${key}`}
            location={destination.location}
            beHereOn={destination.beHereOn}
            stays={destination.stays}
            weatherPref={destination.weatherPref}
            selected={destination.selected}
            onClose={(f) => f}
            onSelect={(f) => f}
          />
        ))
      ) : (
        <p className={styles.noDestinationsMsg}>No destinations added to your trip yet.</p>
      )}
    </div>
  )
}

export default DestinationViewer
