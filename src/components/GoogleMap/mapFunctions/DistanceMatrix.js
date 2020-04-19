const getDistnaceMatrix = (
  {
    origins,
    destinations,
    travelMode = 'DRIVING',
    transitOptions = {
      mode: ['TRAIN'], // BUS, RAIL, SUBWAY, TRAIN, TRAM
      // arrivalTime => specifies the desired time of arrival as a Date object, If specified, departure time is ignored
      // departureTime => ignored if arrivalTime is specified, Defaults to now
      // routingPreference => FEWER_TRANSFERS || LESS_WALKING
    },
  },
  callBack
) => {
  if (!window.google) {
    throw Error('Google maps API not found')
  }

  // the limit is 100 elements in response, origins * destinations <= 100
  if (origins.length * destinations.length > 100) {
    throw Error('Too many locations to check! Make sure origins * destinations <= 100')
  }

  // setup the travel mode + tansit mode @TODO consider adding checkboxes for desired travel mode DRIVING | WALKING | TRAIN ...
  let transit = {}
  if (travelMode === 'DRIVING') {
    transit = {
      travelMode,
    }
  } else if (travelMode === 'TRANSIT') {
    transit = {
      travelMode,
      transitOptions,
    }
  }

  const service = new window.google.maps.DistanceMatrixService()

  service.getDistanceMatrix(
    {
      origins,
      destinations,
      ...transit,
    },
    callBack
  )
}

export default getDistnaceMatrix
