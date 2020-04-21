// fits map to contain all markers with some padding
const fitBounds = (mapRef, latlngSource, centerCallback, padding = 50) => {
  // create a LatLngBounds instance represents a rectangle in geographical coordinates
  const bounds = new window.google.maps.LatLngBounds()

  // passed obj with coords
  if (latlngSource.hasOwnProperty('lat') && latlngSource.hasOwnProperty('lng')) {
    bounds.extend({
      lat: latlngSource.lat,
      lng: latlngSource.lng,
    })
  } else {
    const markerRefs = latlngSource
    // passed markerRefs, obj with various refs to markers
    Object.values(markerRefs.current).forEach((singleMarkerRef) => {
      console.log('singleMarkerRef', singleMarkerRef)
      const { lat, lng } = singleMarkerRef.current.marker.getPosition()
      console.log({ lat, lng })
      bounds.extend({
        lat: lat(),
        lng: lng(),
      })
    })
  }

  // set map center to be bounds' center
  centerCallback(bounds.getCenter())

  // confine map to fit all markers
  mapRef.current.map.fitBounds(bounds, {
    top: padding,
    right: padding,
    left: padding,
    bottom: padding,
  })

  // make sure to set zoom to 14 if map zoom changed to lower due to bounds update
  window.google.maps.event.addListenerOnce(mapRef.current.map, 'bounds_changed', function () {
    if (this.getZoom() > 14) {
      this.setZoom(14)
    }
  })
}

export default fitBounds
