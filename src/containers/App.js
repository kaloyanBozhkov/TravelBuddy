import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { Switch } from 'react-router'
import { GoogleApiWrapper } from 'react-google-maps'

//import containers
import Header from './Header'
import Home from './Home'
import NewTrip from './NewTrip'
import Account from './Account'
import Footer from './Footer'

function App() {
  return (
    <div className="App">
      <Header />

      <Switch>
        <Route path="/home" exact component={Home} />
        <Route path="/new-trip" exact component={NewTrip} />

        <Route path="/account/signin" exact component={() => <Account page="signin" />} />
        <Route path="/account/register" exact component={() => <Account page="register" />} />
        <Route path="/account/recovery" exact component={() => <Account page="recovery" />} />
        <Route path="/account/area" exact component={() => <Account page="area" />} />
        <Redirect from="/account/" to="/account/signin" />

        {/* redirect to /home if user navigates to any other page */}
        <Route path="/" render={() => <Redirect to="/home" />} />
      </Switch>

      <Footer />
    </div>
  )
}
export default App
