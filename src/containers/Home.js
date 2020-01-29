import React from 'react'

import WorldArea from 'components/WorldArea/WorldArea'
import Strip from 'components/Strip/Strip'
import BottomArea from 'components/BottomArea/BottomArea'

const Home = () => {
    return (
        <>
            <WorldArea />
            <Strip label="Welcome To TravelBuddy!" />
            <BottomArea />
        </>
    )
}

export default Home