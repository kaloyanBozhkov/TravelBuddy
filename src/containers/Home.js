import React from 'react'

//import components
import WorldArea from 'components/WorldArea/WorldArea'
import Strip from 'components/Strip/Strip'
import WelcomeArea from 'components/WelcomeArea/WelcomeArea'
import InformationSection from 'components/InformationSection/InformationSection'

//import images
import airplaneImg from 'assets/airplane.png'
import allInOnePlace from 'assets/allInOnePlace.png'
import cube from 'assets/cube.png'
import socialSecurity from 'assets/socialSecurity.png'

const Home = () => {

    const infoSections = [
        {
            title: 'Complete Travel Solution',
            text: 'Unpacked now declared put you confined daughter improved. Celebrated imprudence few interested especially reasonable off one. Wonder bed elinor family secure met. It want gave west into high no in. Depend repair met before man admire see and. An he observe be it covered delight hastily message. Margaret no ladyship endeavor ye to settling. ',
            image: cube,
            imageAlt: 'Cube',
            imgFirst: true,
        },
        {
            title: 'All You Need - 1 Place',
            text: 'Unpacked now declared put you confined daughter improved. Celebrated imprudence few interested especially reasonable off one. Wonder bed elinor family secure met. It want gave west into high no in. Depend repair met before man admire see and. An he observe be it covered delight hastily message. Margaret no ladyship endeavor ye to settling. ',
            image: allInOnePlace,
            imageAlt: 'All you need, from one source',
            imgFirst: false,
        },
        {
            title: 'Secure Sources - Rest Assured!',
            text: 'Unpacked now declared put you confined daughter improved. Celebrated imprudence few interested especially reasonable off one. Wonder bed elinor family secure met. It want gave west into high no in. Depend repair met before man admire see and. An he observe be it covered delight hastily message. Margaret no ladyship endeavor ye to settling. ',
            image: socialSecurity,
            imageAlt: 'Social Security',
            imgFirst: true,
        },
        {
            title: 'Safe Travel',
            text: 'Unpacked now declared put you confined daughter improved. Celebrated imprudence few interested especially reasonable off one. Wonder bed elinor family secure met. It want gave west into high no in. Depend repair met before man admire see and. An he observe be it covered delight hastily message. Margaret no ladyship endeavor ye to settling. ',
            image: airplaneImg,
            imageAlt: 'Airplane',
            imgFirst: false,
        },
    ]

    return (
        <>
            <WorldArea />
            <Strip label="Welcome To TravelBuddy!" />
            <WelcomeArea />
            {/* Since this is static content, index is enough for React to keep track of the dynamically created components */}
            {infoSections.map((sectionInfo, index) => (<InformationSection key={index} {...sectionInfo} />))}
            
        </>
    )
}

export default Home