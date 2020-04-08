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
  const isLogoutPending = useSelector(({ logoutReducer: { isPending } }) => isPending)

  // handles redirect at end of exiting animation for pages
  const onExitedHandler = () => {
    // scroll to top
    scrollIt(0, 400, 'easeInOutQuad')

    history.push(path)
    dispatch(pageSwitchEnd())
  }

  const animationConfig = { isSwitching, onExitedHandler }
  const pageConfig = { ...animationConfig, dispatch }

  // if user signed in, show account area. Make sure to keep account area rendered while switching pages
  if (userData && userData.emailVerified && (!isSwitching || isLogoutPending)) {
    if (page === 'area') {
      return <Area userData={userData} {...pageConfig} />
    }

    // user is signed in
    return <Redirect to="/account/area" />
  }

  switch (page) {
    case 'signin':
      return (
        <SignIn
          isSignedInButNotVerifiedEmail={userData && !userData.emailVerified}
          {...pageConfig}
        />
      )
    case 'register':
      return <Register {...pageConfig} />
    case 'recovery':
      return <Recovery {...pageConfig} />
    default:
      return <Redirect to="/account/signin" />
  }
}

export default Account
