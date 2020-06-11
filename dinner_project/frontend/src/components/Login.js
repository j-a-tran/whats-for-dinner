import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import { useHistory } from 'react-router-dom';

import { AuthContext } from '../_auth/Auth';


import axios from 'axios';
import { API_URL, axiosInstance } from '../_auth/axiosConfig';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login() {
    const classes = useStyles();

    const { login } = React.useContext(AuthContext);

    let history = useHistory();

    const [userData, setUserData] = React.useState({
        username: '',
        password: ''
    });
    
    const [helperText, setHelperText] = React.useState({
      usernameHelper: '',
      passwordHelper: ''
    })

    const onChange = (event) => {
        userData[event.target.name] = event.target.value

        setHelperText({
          usernameHelper: '',
          passwordHelper: ''
        });
    };

    const onSubmit = (event) => {
        event.preventDefault();

        login(userData.username, userData.password)
        .then(function(response) {
          history.push('/');
        })
        .catch(function(error) {
          console.log(error.response);

          if(error.response.data.detail) {
            setHelperText({
              usernameHelper: error.response.data.detail,
              passwordHelper: error.response.data.detail
            });
          } else {
            setHelperText({
              usernameHelper: error.response.data.username,
              passwordHelper: error.response.data.password
            });
          };
          
        })
    };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Log In
        </Typography>
        <form className={classes.form} noValidate onSubmit={onSubmit}>
          <TextField
            onChange={onChange}
            error={helperText.usernameHelper}
            helperText={helperText.usernameHelper}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoFocus
          />
          <TextField
            onChange={onChange}
            error={helperText.passwordHelper}
            helperText={helperText.passwordHelper}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Log In
          </Button>
          <Grid container>
            <Grid item>
              <Link href='/register' variant="body2">
                {"Don't have an account? Sign Up."}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}