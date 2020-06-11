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

export default function Register() {
  const classes = useStyles();

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

      axiosInstance.post('/user/create/', {
        username: userData.username,
        password: userData.password
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error.response);
        setHelperText({
          usernameHelper: error.response.data.username,
          passwordHelper: error.response.data.password
        });
      })
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Register
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
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Submit
          </Button>
          <Grid container>
            <Grid item>
              <Link href='/login' variant="body2">
                {"Already have an account? Log in."}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}