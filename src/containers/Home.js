import React from 'react'

//import components
import WorldArea from '~/components/Home/WorldArea/WorldArea'
import Strip from '~/components/UI/Strip/Strip'
import WelcomeArea from '~/components/Home/WelcomeArea/WelcomeArea'
import HomePage from '~/components/Home/HomePage/HomePage'


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