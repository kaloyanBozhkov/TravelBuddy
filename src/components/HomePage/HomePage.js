import React from 'react'

//improt styles
import styles from './homepage.module.scss'

//import components
import InformationSection from 'components/InformationSection/InformationSection'

//import hooks
import useWindowWidth from 'hooks/useWindowWidth'

//import images
import airplaneImg from 'assets/airplane.png'
import allInOnePlace from 'assets/allInOnePlace.png'
import cube from 'assets/cube.png'
import socialSecurity from 'assets/socialSecurity.png'
import laptop from 'assets/laptop.png'
import laptopAndLine from 'assets/laptopAndLine.png'
import {ReactComponent as Line} from 'assets/line.svg'
import googleLogo from 'assets/googleLogo.png'
import firebaseLogo from 'assets/firebaseLogo.png'
import herokuLogo from 'assets/herokuLogo.png'
import reactLogo from 'assets/reactLogo.png'

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
        imageWhiteBackground: true
    },
    {
        title: 'Secure Sources - Rest Assured!',
        text: 'Unpacked now declared put you confined daughter improved. Celebrated imprudence few interested especially reasonable off one. Wonder bed elinor family secure met. It want gave west into high no in. Depend repair met before man admire see and. An he observe be it covered delight hastily message. Margaret no ladyship endeavor ye to settling. ',
        image: socialSecurity,
        imageAlt: 'Social Security',
        imgFirst: true,
        imageWhiteBackground: true
    },
    {
        title: 'Safe Travel',
        text: 'Unpacked now declared put you confined daughter improved. Celebrated imprudence few interested especially reasonable off one. Wonder bed elinor family secure met. It want gave west into high no in. Depend repair met before man admire see and. An he observe be it covered delight hastily message. Margaret no ladyship endeavor ye to settling. ',
        image: airplaneImg,
        imageAlt: 'Airplane',
        imgFirst: false,
    },
]

const HomePage = () => {
    const windowWidth = useWindowWidth()
    const isDesktop = windowWidth > 991
    return (
        <div className={styles.homePage}>
            {/* Since this is static content, index is enough for React to keep track of the dynamically created components */}
            {infoSections.map((sectionInfo, index) => (<InformationSection key={index} {...sectionInfo} />))}
            <div className={styles.laptopArea}>
                {/* lines connecting laptop orange line to images */}
                {isDesktop && (<>
                    <Line />
                    <Line />
                    <Line />
                    <Line />
                </>)}
                {!isDesktop && <img src={laptop} alt="Laptop with Travel Buddy logo" />}
                {isDesktop && <img src={laptopAndLine} alt="Laptop with Travel Buddy logo" />}
            </div>
            <div className={styles.logoArea}>
                <img src={reactLogo} alt="React JS logo" />
                <img src={firebaseLogo} alt="Firebase Logo" />
                <img src={herokuLogo} alt="Heroku Logo" />
                <img src={googleLogo} alt="Google Logo" />
            </div>
        </div>
    )
}

export default HomePage