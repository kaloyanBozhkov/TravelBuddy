import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import Globe from '~/components/Globe/Globe'
import ExpandButton from '~/components/UI/ExpandButton/ExpandButton'
import Input from '~/components/UI/Input/Input'

import styles from './worldarea.module.scss'
import ScrollingClouds from '~/components/ScrollingClouds/ScrollingClouds'
import Card from '../Card/Card'
import Button from '~/components/UI/Button/Button'
import { CSSTransition } from 'react-transition-group'
import { setTripStartingLocation } from '~/store/trip/trip.actions'

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

      <Card
        show={!!selectedCountry}
        title={`Selected "${selectedCountry && selectedCountry.name}"`}
        onClose={onCloseStartingLocSelector}
        mountOnEnter
        unmountOnExit
        startinglocationselector="true"
        withoutDefaultAnimation
      >
        <div className={styles.selectStartingLocationContent}>
          <Input
            label="Where from?"
            id="startingLoc"
            name="startingLoc"
            comment="Which city are you going to start your trip from?"
            icon="mapMarkerAlt"
            onChange={
              // whilst typing handle setting location, with invalid lat lng
              ({ target }) =>
                setStartingLoc({
                  label: target.value,
                  lat: null,
                  lng: null,
                })
            }
            value={startingLoc.label}
            type="googleAutocomplete"
            onPlaceSelected={(place) => {
              // once place has been selected, handle setting it in state
              setStartingLoc({
                label: place.formatted_address,
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng(),
              })
            }}
            componentRestrictions={{
              country: selectedCountry && selectedCountry.abbrv.toLowerCase(),
            }}
          />

          <CSSTransition
            in={!!(startingLoc.lat && startingLoc.lng && startingLoc.label)}
            timeout={400}
            mountOnEnter
            unmountOnExit
          >
            <div className={styles.btnArea}>
              <Button
                label="Set as Starting Location"
                modifier="filled"
                icon="forward"
                iconOnRightSide
                onClick={onSetStartingLocation}
              />
            </div>
          </CSSTransition>
        </div>
      </Card>

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
