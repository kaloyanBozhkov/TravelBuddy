import React from 'react';
import { BrowserRouter, Redirect } from 'react-router-dom'

import Header from './Header'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />

        {/* redirect to /home if user navigates to / */}
        <Redirect from="/" to="/home" />
      </div>
    </BrowserRouter>
  );
}

export default App;
