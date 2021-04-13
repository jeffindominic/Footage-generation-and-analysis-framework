import React from 'react';
import './App.css';

import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import Calendar from './components/Calendar';
import Train from './components/Train';
import Crimimallist from './components/Criminallist'
import Station from './components/Station'
import { useHistory } from "react-router-dom";
function App() {
  const history = useHistory();
  return (
    <BrowserRouter>
      <div className="App">
        {/* Defining routes */}
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/home/:uid" component={Home} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/calendar/:uid" component={Calendar} />
          <Route exact path="/criminallist/:uid" component={Crimimallist} />
          <Route exact path="/train/:uid/" component={Train} />
          <Route exact path="/station/:uid/" component={Station} />
          <Route exact path="/face" render={() => {window.location.href="face.html"}} />
          
        </Switch>
        
      </div>
    </BrowserRouter>
  );
}

export default App;
