import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import axios from 'axios';
import { API_URL, axiosInstance } from '../constants/index';

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

    const [userData, setUserData] = React.useState({
        username: '',
        password: ''
    });  

    const onChange = (event) => {
        userData[event.target.name] = event.target.value
    };

    const onSubmit = (event) => {
        event.preventDefault();

        axiosInstance.post('/token/obtain/', {
            username: userData.username,
            password: userData.password
        })
        .then(function (response) {
            
            axiosInstance.defaults.headers['Authorization'] = "JWT " + response.data.access;
            localStorage.setItem('access_token', response.data.access);
            localStorage.setItem('refresh_token', response.data.refresh);

            console.log(response);
            console.log(localStorage);
            console.log(axiosInstance.defaults.headers);
        })
        .catch(function (error) {
            console.log(error);
        });
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