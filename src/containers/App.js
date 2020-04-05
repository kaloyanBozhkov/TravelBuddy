import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { Switch } from 'react-router'

import useResumeSession from '~/hooks/useResumeSession'

//import containers
import Header from './Header'
import Home from './Home'
import NewTrip from './NewTrip'
import Account from './Account'
import Footer from './Footer'

function App() {
  useResumeSession()

  return (
    <div className="App">
      <Header />

      <Switch>
        <Route path="/home" exact component={Home} />
        <Route path="/new" exact component={NewTrip} />

        <Route path="/account/signin" exact component={() => <Account page="signin" />} />
        <Route path="/account/register" exact component={() => <Account page="register" />} />
        <Route path="/account/recovery" exact component={() => <Account page="recovery" />} />
        <Route path="/account" exact component={Account} />

        {/* redirect to /home if user navigates to any other page */}
        <Route path="/" render={() => <Redirect to="/home" />} />
      </Switch>

      <Footer />
    </div>
  )
}

export default App
