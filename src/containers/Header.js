import React from 'react'

import Header from 'components/Header/Header'
const buttonDefinitions = [
  {
    label: 'Home',
    icon: 'home',
    path: '/home',
  },
  {
    label: 'New Trip',
    icon: 'plane',
    path: '/new',
  },
  {
    label: 'Account',
    icon: 'userCircle',
    path: '/account',
  },
]

const HeaderContainer = () => {
  return <Header buttonDefinitions={buttonDefinitions} />
}

export default HeaderContainer
