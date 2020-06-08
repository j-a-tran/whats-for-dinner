import React from 'react';
import Page from './components/Page';
import Login from './components/Login';
import Register from './components/Register';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

import { Switch, Route, NavLink, Link } from "react-router-dom";
import { axiosInstance } from './constants';

function App() {

  const handleLogout = () => {

    axiosInstance.post('/token/blacklist/', {
      refresh_token: localStorage.getItem('refresh_token')
    })
    .then(function (response) {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      axiosInstance.defaults.headers['Authorization'] = null;
      return response;
    })
    .catch(function (error) {
      console.log(error.response);
    });   
  }

  const [currentUser, setUser] = React.useState({
    username: ''
  });
  
  React.useEffect(() => {
  
    const refreshToken = localStorage.getItem('refresh_token');

    if (refreshToken === null)  {
      setUser({
        username: ''
      });
    }
    else {
      const parseToken = JSON.parse(atob(refreshToken.split('.')[1]));
  
      setUser({
        username: parseToken.username
      });
    }    
  }, []);
  
  return (
    <div className="App">
      <nav>
        <AppBar position='static'>
          <Toolbar>
            <Button component={NavLink} to='/register' color='inherit'>
              Register
            </Button>

            <Button component={NavLink} to='/' color='inherit'>
              Home
            </Button>
            {localStorage.getItem('access_token') === null ? 
              <Button component={NavLink} to='/login' color='inherit'>
                  Log In
              </Button> :
              <Button onClick={handleLogout} color='inherit'>Log Out</Button> 
            }
            <Button color='inherit'>Hello, {currentUser.username}!</Button> 
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
