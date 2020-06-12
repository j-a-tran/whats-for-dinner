import React from 'react';
import Page from './components/Page';
import Login from './components/Login';
import Register from './components/Register';
import Nav from './components/Nav';
import ProtectedRoute from './components/ProtectedRoute';
import CssBaseline from '@material-ui/core/CssBaseline';
import Auth from './_auth/Auth';

import { Switch, Route } from 'react-router-dom';

function App() {
  
  return (
    
      <Auth>
        <CssBaseline />
        <div className="App">
          <nav>
            <Nav />
          </nav>
          <main>
            <Switch>
              <Route path='/register' component={Register} />
              <Route path='/login' component={Login} />
              <ProtectedRoute path='/' component={Page} />
            </Switch>
          </main>
        </div>
      </Auth>

  );
}

export default App;
