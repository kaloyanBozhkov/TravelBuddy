import React from 'react'
import { Redirect } from 'react-router'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { pageSwitchEnd } from '~/store/pageSwitch/pageSwitch.actions'

import SignIn from '~/components/Account/SignIn/SignIn'
import Register from '~/components/Account/Register/Register'
import Recovery from '~/components/Account/Recovery/Recovery'
import Area from '~/components/Account/Area/Area'

import scrollIt from '~/thirdPartyHelpers/scrollIt'

const Account = ({ page }) => {
  const userData = useSelector(({ userReducer: { userData } }) => userData)
  const history = useHistory()
  const dispatch = useDispatch()

  // logic for page switching, to control exiting animation between pages
  const { isSwitching, path } = useSelector(({ pageSwitchReducer: { isSwitching, path } }) => ({
    isSwitching,
    path,
  }))

  // handles redirect at end of exiting animation for pages
  const onExitedHandler = () => {
    //scroll to top
    scrollIt(0, 400, 'easeInOutQuad')

    history.push(path)

    dispatch(pageSwitchEnd())
  }

  const animationConfig = { isSwitching, onExitedHandler }

  if (userData && userData.emailVerified) {
    return <Area userData={userData} {...animationConfig} />
  } else if (userData && !userData.emailVerified) {
    return <SignIn isSignedInButNotVerifiedEmail {...animationConfig} />
  } else {
    switch (page) {
      case 'signin':
        return <SignIn {...animationConfig} />
      case 'register':
        return <Register {...animationConfig} />
      case 'recovery':
        return <Recovery {...animationConfig} />
      default:
        return <Redirect to="/account/signin" />
    }
  }
}

export default Account
