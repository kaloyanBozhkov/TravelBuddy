import React from 'react'
import styles from './styles.module.scss'
import Label from '~/components/UI/Label/Label'
import DestinationCard from '~/components/DestinationCard/DestinationCard'

const DestinationViewer = ({
  onSelectDestination,
  onRemoveDestination,
  activeDestination,
  destinations = [],
}) => {
  return (
    <div className={styles.viewer}>
      <Label text="Your Trip" withRibbon />

      <div className={styles.cardsContainer}>
        {destinations.length > 0 ? (
          destinations.map((destination, key) => (
            <DestinationCard
              key={`${destination.uid}`}
              location={destination.location.label}
              beHereOn={destination.beHereOn}
              stays={destination.stays}
              weatherPref={destination.weatherPref}
              selected={activeDestination === key}
              onClose={() => onRemoveDestination(key)}
              onSelect={() => onSelectDestination(activeDestination === key ? -1 : key)}
            />
          ))
        ) : (
          <p className={styles.noDestinationsMsg}>No destinations added to your trip yet.</p>
        )}
      </div>
    </div>
  )
}

export default DestinationViewer
