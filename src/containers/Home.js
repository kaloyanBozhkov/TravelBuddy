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
    text: `Through the power of the Google Maps API, we transform complex road trip planning into a breeze. Our system analyzes all possible routes, leveraging Google's technology to select the absolute best path for your adventure. Say goodbye to uncertainty – with Travel Buddy, every mile is maximized for an unforgettable journey.`,
    image: cube,
    imageAlt: 'Cube',
    imgFirst: true,
  },
  {
    title: 'All You Need - 1 Place',
    text: `Plan a trip while signed in, and we'll store it securely in your Account. Effortlessly track, access, and relive your adventures, complete with start and end dates, checkpoints, and optimized routes. Travel smart, with all your trips in one place.`,
    image: allInOnePlace,
    imageAlt: 'All you need, from one source',
    imgFirst: false,
    imageWhiteBackground: true,
  },
  {
    title: 'Reliable Data, Optimal Routes!',
    text: `Travel Buddy guarantees accuracy by using the trusted Google Maps API for city distances. Our secret to finding the best routes? The OSPF algorithm. Your journeys are secured with dependable data and the smartest paths, all in one package.`,
    image: socialSecurity,
    imageAlt: 'Social Security',
    imgFirst: true,
    imageWhiteBackground: true,
  },
  {
    title: 'Safe Travel',
    text: `While Travel Buddy provides optimal routes for your journeys, safety remains paramount. We're here to enhance your experience, but remember, road conditions and unexpected events can arise. Always prioritize safety when making travel decisions. Our routes are guides, not absolutes. Your well-being comes first on every adventure.`,
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
