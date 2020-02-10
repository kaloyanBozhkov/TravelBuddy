import React, { useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom'
import { Switch, useRouteMatch } from 'react-router'
import { useDispatch } from 'react-redux'

import { auth, createUserProfileDocument } from '~/firebase/firebase.utils'

//import actions
import { googleSignIn } from '~/store/actions/account'

//import containers
import Header from './Header'
import Home from './Home'
import NewTrip from './NewTrip'
import Account from './Account'
import Footer from './Footer'

function App() {
  const dispatch = useDispatch()

  //if signed in already, resume session 
  useEffect(() => {
    const unsubscribeFromAuth = auth.onAuthStateChanged((userAuth) => {
      console.log('userAuth', userAuth)
      const userDocRef = createUserProfileDocument(userAuth)
      console.log('userDocRef', userDocRef)

      if (userDocRef) {
        userDocRef.onSnapshot((snapshot) => {
          const { email, firstName, lastName, photoURL, phoneNumber, emailVerified, uid } = snapshot.data()
          //set user details in store
          dispatch(googleSignIn({ uid, email, firstName, lastName, photoURL, phoneNumber, emailVerified }))
        })
      } else {
        //user null so userDocRef is undefined, sign out if signed in

      }
    })

    //on unmount unsubscribe from firebase's auth service
    return () => unsubscribeFromAuth()
  }, [dispatch])

  return (
      <div className="App">
        <Header />

        <Switch>
          <Route path="/home" exact component={Home} />
          <Route path="/new" exact component={NewTrip} />
          
          
          <Route path="/account/signin" exact component={() => <Account page="signin" />} />
          <Route path="/account/register" exact component={() => <Account page="register" />} />
          <Route path="/account/recovery" exact component={() => <Account page="recovery" />} />
          <Route path="/account" exact componen t={Account} />

          {/* redirect to /home if user navigates to any other page */}
          <Route path="/" render={() => <Redirect to="/home" />} />
        </Switch>

        <Footer/>
     
      </div>
  );
}

export default App;
