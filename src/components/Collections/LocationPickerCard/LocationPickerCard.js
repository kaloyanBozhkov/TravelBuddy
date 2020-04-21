import React from 'react'
import { CSSTransition } from 'react-transition-group'

import Card from '~/components/Collections/Card/Card'
import Input from '~/components/UI/Input/Input'
import Button from '~/components/UI/Button/Button'

import styles from './styles.module.scss'

const LocatioinPickerCard = ({
  setStartingLoc,
  startingLoc,
  onClose,
  onBtnClick,

  // limit search to specific country?
  selectedCountry = null,
}) => {
  return (
    <Card
      show={!!selectedCountry}
      title={`Selected "${selectedCountry && selectedCountry.name}"`}
      onClose={onClose}
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
            // check if selection returned invaliv obj (pressing enter on unfinished typed text)
            !place.hasOwnProperty('name') &&
              // once place has been selected, handle setting it in state
              setStartingLoc({
                label: place.formatted_address,
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng(),
              })
          }}
          componentRestrictions={
            selectedCountry
              ? {
                  country: selectedCountry && selectedCountry.abbrv.toLowerCase(),
                }
              : undefined
          }
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
              onClick={onBtnClick}
            />
          </div>
        </CSSTransition>
      </div>
    </Card>
  )
}

export default LocatioinPickerCard
