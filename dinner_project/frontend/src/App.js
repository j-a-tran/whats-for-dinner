import React from 'react';
import Page from './components/Page';
import Login from './components/Login';
import Register from './components/Register';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

import { Switch, Route, NavLink, Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <nav>
        <AppBar position='static'>
          <Toolbar>
            <Button component={NavLink} to='/register' color='inherit'>
              Register
            </Button>
            <Button component={NavLink} to='/login' color='inherit'>
              Log In
            </Button>
            <Button component={NavLink} to='/' color='inherit'>
              Home
            </Button>   
          </Toolbar>
        </AppBar>
      </nav>
      <main>
        <Switch>
          <Route path='/register' component={Register} />
          <Route path='/login' component={Login} />
          <Route path='/' component={Page} />
        </Switch>
      </main>
    </div>
  );
}

export default App;
