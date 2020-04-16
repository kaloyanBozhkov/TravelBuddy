// fits map to contain all markers with some padding
const fitBounds = (mapRef, larLngSource, centerCallback, padding = 50) => {
  // create a LatLngBounds instance represents a rectangle in geographical coordinates
  const bounds = new window.google.maps.LatLngBounds()

  // passed obj with coords
  if (larLngSource.hasOwnProperty('lat') && larLngSource.hasOwnProperty('lng')) {
    bounds.extend({
      lat: larLngSource.lat,
      lng: larLngSource.lng,
    })

    //console.log(mapRef.current.map)
  } else {
    const markerRefs = larLngSource
    // passed markerRefs, obj with various refs to markers
    Object.values(markerRefs.current).forEach((singleMarkerRef) => {
      const { lat, lng } = singleMarkerRef.current.marker.getPosition()
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
}

export default fitBounds
