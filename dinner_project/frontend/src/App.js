import React from 'react';
import Page from './components/Page';
import Login from './components/Login';
import Register from './components/Register';

import { Switch, Route, NavLink, Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <nav>
        <ul>
          <li>
            <NavLink to='/register'>Register</NavLink>
          </li>
          <li>
            <NavLink to='/login'>Log In</NavLink>
          </li>
          <li>
            <NavLink to='/'>Home</NavLink>
          </li>
        </ul>
      </nav>
      <Switch>
        <Route path='/register' component={Register} />
        <Route path='/login' component={Login} />
        <Route path='/' component={Page} />
      </Switch>
    </div>
  );
}

export default App;
