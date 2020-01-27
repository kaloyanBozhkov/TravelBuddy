import React from 'react';
import { BrowserRouter, Redirect, Route } from 'react-router-dom'
import { Switch } from 'react-router'

import Header from './Header'
import Home from './Home'
import New from './New'
import Account from './Account'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />

        <Switch>
          <Route path='/home' exact component={Home} />
          <Route path='/new' exact component={New} />
          <Route path='/account' exact component={Account} />
          {/* redirect to /home if user navigates to / */}
          <Route path='/' exact render={() => <Redirect to="/home" />} />
        </Switch>

     
      </div>
    </BrowserRouter>
  );
}

export default App;
