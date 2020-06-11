import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { NavLink, useHistory } from 'react-router-dom';
import { AuthContext }from '../_auth/Auth';

export default function Nav() {

    const { isAuthenticated, logout, getUsername }= React.useContext(AuthContext);

    const [currentUser, setCurrentUser] = React.useState('');

    React.useEffect(() => {
        setCurrentUser(getUsername());
        console.log(isAuthenticated);
    }, [isAuthenticated]);

    let history = useHistory();

    const handleLogout = () => {
        logout();
        history.push('/login');
    }

    return (
        <AppBar position='static'>
            <Toolbar>
                <Button component={NavLink} to='/register' color='inherit'>
                    Register
                </Button>

                <Button component={NavLink} to='/' color='inherit'>
                    Home
                </Button>
                
                {isAuthenticated ? (

                    <React.Fragment>
                        <Button onClick={handleLogout} color='inherit'>Log Out</Button>
                        <Button color='inherit'>Hello, {currentUser}!</Button>  
                    </React.Fragment>

                ) : <Button component={NavLink} to='/login' color='inherit'>Log In</Button>}

            </Toolbar>
        </AppBar>
    )
}