const getRoutePath = (origin, destination, callback) => {
  const directionsService = new window.google.maps.DirectionsService()

  directionsService.route(
    {
      origin,
      destination,

      // @TODO maybe add alternative travel modes?
      travelMode: 'DRIVING',
    },
    (response) => {
      callback(response.routes[0].overview_path)
    }
  )
}

export default getRoutePath
