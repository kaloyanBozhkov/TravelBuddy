import React from 'react'

import HomePage from '~/pages/Home/Home'

// import assets
import airplaneImg from '~/assets/airplane.png'
import allInOnePlace from '~/assets/allInOnePlace.png'
import cube from '~/assets/cube.png'
import socialSecurity from '~/assets/socialSecurity.png'
import googleLogo from '~/assets/googleLogo.png'
import firebaseLogo from '~/assets/firebaseLogo.png'
import herokuLogo from '~/assets/herokuLogo.png'
import reactLogo from '~/assets/reactLogo.png'

const infoSections = [
  {
    title: 'Complete Travel Solution',
    text:
      'Unpacked now declared put you confined daughter improved. Celebrated imprudence few interested especially reasonable off one. Wonder bed elinor family secure met. It want gave west into high no in. Depend repair met before man admire see and. An he observe be it covered delight hastily message. Margaret no ladyship endeavor ye to settling. ',
    image: cube,
    imageAlt: 'Cube',
    imgFirst: true,
  },
  {
    title: 'All You Need - 1 Place',
    text:
      'Unpacked now declared put you confined daughter improved. Celebrated imprudence few interested especially reasonable off one. Wonder bed elinor family secure met. It want gave west into high no in. Depend repair met before man admire see and. An he observe be it covered delight hastily message. Margaret no ladyship endeavor ye to settling. ',
    image: allInOnePlace,
    imageAlt: 'All you need, from one source',
    imgFirst: false,
    imageWhiteBackground: true,
  },
  {
    title: 'Secure Sources - Rest Assured!',
    text:
      'Unpacked now declared put you confined daughter improved. Celebrated imprudence few interested especially reasonable off one. Wonder bed elinor family secure met. It want gave west into high no in. Depend repair met before man admire see and. An he observe be it covered delight hastily message. Margaret no ladyship endeavor ye to settling. ',
    image: socialSecurity,
    imageAlt: 'Social Security',
    imgFirst: true,
    imageWhiteBackground: true,
  },
  {
    title: 'Safe Travel',
    text:
      'Unpacked now declared put you confined daughter improved. Celebrated imprudence few interested especially reasonable off one. Wonder bed elinor family secure met. It want gave west into high no in. Depend repair met before man admire see and. An he observe be it covered delight hastily message. Margaret no ladyship endeavor ye to settling. ',
    image: airplaneImg,
    imageAlt: 'Airplane',
    imgFirst: false,
  },
]

const logos = [
  {
    image: reactLogo,
    alt: 'React JS Logo',
  },
  {
    image: firebaseLogo,
    alt: 'Firebase Logo',
  },
  {
    image: herokuLogo,
    alt: 'Heroku Logo',
  },
  {
    image: googleLogo,
    alt: 'Google Logo',
  },
]

const Home = () => {
  return <HomePage logos={logos} infoSections={infoSections} />
}

export default Home
