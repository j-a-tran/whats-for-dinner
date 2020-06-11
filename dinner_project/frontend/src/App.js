import React from 'react';
import Page from './components/Page';
import Login from './components/Login';
import Register from './components/Register';
import Nav from './components/Nav';

import Auth from './_auth/Auth';

import { Switch, Route } from "react-router-dom";
import { axiosInstance } from './_auth/axiosConfig';

function App() {

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
    <Auth>
      <div className="App">
        <nav>
          <Nav />
        </nav>
        <main>
          <Switch>
            <Route path='/register' component={Register} />
            <Route path='/login' component={Login} />
            <Route path='/' component={Page} />
          </Switch>
        </main>
      </div>
    </Auth>
  );
}

export default App;
