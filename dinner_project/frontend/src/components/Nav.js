import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Link, NavLink, useHistory } from 'react-router-dom';
import { AuthContext }from '../_auth/Auth';

const useStyles = makeStyles((theme) => ({
    title: {
        flexGrow: 1,
        textDecoration: 'none'
    },
    greeting: {
        fontStyle: 'italic',
        marginRight: theme.spacing(6)
    }
}))

export default function Nav() {

    const classes = useStyles();

    const { isAuthenticated, logout, getUsername }= React.useContext(AuthContext);

    const [currentUser, setCurrentUser] = React.useState('');

    React.useEffect(() => {
        setCurrentUser(getUsername());
        console.log(isAuthenticated);
    }, [isAuthenticated, getUsername]);

    let history = useHistory();

    const handleLogout = () => {
        logout();
        history.push('/login');
    }

    return (
        <AppBar position='static'>
            <Toolbar>
                <Typography component={Link} to='/' color='inherit' variant='h6' className={classes.title}>
                    What's for Dinner?
                </Typography>
                {isAuthenticated ? (
                    <React.Fragment>
                        <Typography color='inherit' className={classes.greeting}>Hello, {currentUser}!</Typography>  
                        <Button onClick={handleLogout} color='inherit'>Log Out</Button>                        
                    </React.Fragment>

                ) : <Button component={NavLink} to='/login' color='inherit'>Log In</Button>}

            </Toolbar>
        </AppBar>
    )
}