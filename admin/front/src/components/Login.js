import React, { useState, useEffect} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import { Alert, AlertTitle } from '@material-ui/lab';
import { Redirect } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';



function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Cyberdome
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
     

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    // backgroundColor: theme.palette.grey.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const classes = useStyles();
  const [userDetails, setUserDetails] = useState({
    userEmail: '',
    userPassword: '',
    message: '',
    uname: '',
  });

  const formValues = (event) => {
    setUserDetails({
      ...userDetails,
      [event.target.name]: event.target.value
    })
  }
//sending form values to backend to verify login details with database
  const login = async (event) => {
    event.preventDefault();

    const body = JSON.stringify({
      userEmail: userDetails.userEmail,
      userPassword: userDetails.userPassword
    });

    const response = await axios.post("/api/", body, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    
   setUserDetails({
     ...userDetails,
     message: response.data.message,
     uname: response.data.uname
   })

  }

  
    const id = userDetails.userEmail.substring(0, userDetails.userEmail.indexOf('@'));
 

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate onSubmit={login}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="userEmail"
            label="Email Address"
            name="userEmail"
            autoComplete="email"
            autoFocus
            onChange={formValues}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="userPassword"
            label="Password"
            type="password"
            id="userPassword"
            autoComplete="current-password"
            onChange={formValues}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
          
            <Grid container justify="center">
                  <Grid item>
                    {     userDetails.message ==="Login Successful" 
                          ? <Redirect to = {`/home/${id}`} />
                          : <Alert severity="info" justify="flex-left">
                            <AlertTitle></AlertTitle>
                            <strong>{userDetails.message}</strong>
                            </Alert>
                      }
                  </Grid>
            </Grid>

       </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}