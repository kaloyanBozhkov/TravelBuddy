import React, { useState } from 'react'
import Script from 'react-load-script'

import Strip from '~/components/UI/Strip/Strip'
import NewTripPage from '~/pages/NewTrip/NewTrip'

const NewTrip = () => {
  const [googleScriptLoaded, setGoogleScriptLoaded] = useState(false)

  // if google maps script not loaded, load it. Do so here instead of GoogleApiWrapper since on the same page there is google maps and autocomplete input, which would complain that the same script is imported twice and is conflicting
  if (!googleScriptLoaded) {
    return (
      <Script
        url={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=places`}
        onLoad={() => setGoogleScriptLoaded(true)}
      />
    )
  }

  return (
    <>
      <NewTripPage />
      <Strip />
    </>
  )
}

export default NewTrip
