import React from 'react'

// import components
import WorldArea from '~/components/Collections/WorldArea/WorldArea'
import Strip from '~/components/UI/Strip/Strip'
import WelcomeArea from '~/components/Collections/WelcomeArea/WelcomeArea'
import AboutArea from '~/components/Collections/AboutArea/AboutArea'

const HomePage = ({ logos, infoSections }) => {
  return (
    <>
      <WorldArea />
      <Strip label="Welcome To TravelBuddy!" />
      <WelcomeArea />
      <Strip />
      <AboutArea logos={logos} infoSections={infoSections} />
      <Strip />
    </>
  )
}

export default HomePage
