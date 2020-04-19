import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import Globe from '~/components/Globe/Globe'
import ExpandButton from '~/components/UI/ExpandButton/ExpandButton'
import LocationPickerCard from '~/components/Collections/LocationPickerCard/LocationPickerCard'

import ScrollingClouds from '~/components/ScrollingClouds/ScrollingClouds'
import { setTripStartingLocation } from '~/store/trip/trip.actions'

import styles from './worldarea.module.scss'

const newStartingLoc = { lat: null, lng: null, label: '' }

const WorldArea = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [expanded, setExpanded] = useState(null)
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [startingLoc, setStartingLoc] = useState(newStartingLoc)
  const worldAreaClasses = [
    styles.worldArea,
    ...(expanded ? [styles.expanded] : expanded === false ? [styles.compressed] : []),
  ].join(' ')

  useEffect(() => {
    //when initial animation finished, toggl ethe compressed state
    const timeoutId = window.setTimeout(() => setExpanded(false), 4000)

    return () => window.clearTimeout(timeoutId)
  }, [])

  const onCountryClicked = ({ properties: { name, brk_a3: abbrv } }) =>
    setSelectedCountry({ name, abbrv })

  const onCloseStartingLocSelector = () => {
    setSelectedCountry(null)
    setStartingLoc(newStartingLoc)
  }

  const onSetStartingLocation = () => {
    dispatch(setTripStartingLocation(startingLoc))
    history.push('/new-trip')
  }

  return (
    <div className={worldAreaClasses}>
      {/* If country is clicked on globe, show Google Autocomplete input for city choosing  */}
      <LocationPickerCard
        startingLoc={startingLoc}
        setStartingLoc={setStartingLoc}
        onBtnClick={onSetStartingLocation}
        onClose={onCloseStartingLocSelector}
        selectedCountry={selectedCountry}
      />
      <div className={styles.content}>
        {/* if still animating entrance (expanded === null), do now show expanded button */}
        {expanded !== null && (
          <ExpandButton expanded={expanded} onClick={() => setExpanded(!expanded)} />
        )}
        <Globe onCountryClicked={onCountryClicked} />
      </div>
      <ScrollingClouds />
    </div>
  )
}

export default WorldArea
