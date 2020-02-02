import React from 'react'

//import components
import WorldArea from 'components/WorldArea/WorldArea'
import Strip from 'components/Strip/Strip'
import WelcomeArea from 'components/WelcomeArea/WelcomeArea'
import HomePage from 'components/HomePage/HomePage'


const Home = () => {

    return (
        <>
            <WorldArea />
            <Strip label="Welcome To TravelBuddy!" />
            <WelcomeArea />
            <Strip />
            <HomePage />
            <Strip />
        </>
    )
}

export default Home