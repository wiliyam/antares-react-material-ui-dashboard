import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import Snackbar from '@material-ui/core/Snackbar';

import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
  makeStyles
} from '@material-ui/core';
import FacebookIcon from 'src/icons/Facebook';
import GoogleIcon from 'src/icons/Google';
import Page from 'src/components/Page';
import PositionedSnackbar from '../../components/toast';

const axios = require('axios');

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const API_URL = 'http://localhost:8000';
const authApi = () => new Promise((res, rej) => {
  console.log('----', `${API_URL}/auth/`);
  axios.post(`${API_URL}/auth/`, {
    email: 'email',
    loginType: 1,
    phone: 9664593109,
    userType: 1
  }).then((response) => {
    res(response);
  })
    .catch((error) => {
      console.log(error);
      rej(error);
    });
});

const LoginView = () => {
  const [isToast, setToast] = useState(false);
  const [msg, setMsg] = useState('..');

  const classes = useStyles();
  const navigate = useNavigate();

  const login = async (...params) => {
    // console.log(params);
    const data = params[0];
    // await setUser(data.user);
    // await setPass(data.password);
    try {
      setToast(true);
      let isAuth = false;
      const res = await authApi();
      console.log('res--->', res);
      if (res.status == 200) {
        setMsg('login called-....', JSON.stringify(res));
        console.log('<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<');
        if (data.email === 'wiliyam@gmail.com' && data.password === '3embed') {
          console.log('====================================');
          isAuth = true;
        }

        if (isAuth) { return navigate('/app/dashboard', { replace: true }); }
        setMsg('maniya jevo no tha pass sacho nakh....');
      }
    } catch (error) {
      setMsg('maniya lund....');
      console.log('error-->', error);
    }

    console.log('---');
  };

  return (
    <Page
      className={classes.root}
      title="Login"
    >
      <PositionedSnackbar isOpen={isToast} msg={msg} />
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="sm">
          <Formik
            initialValues={{
              email: 'demo@devias.io',
              password: 'Password123'
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
              password: Yup.string().max(255).required('Password is required')
            })}
            onSubmit={login}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              values
            }) => (
                <form onSubmit={handleSubmit}>
                  <Box mb={3}>
                    <Typography
                      color="textPrimary"
                      variant="h2"
                    >
                      Sign in
                  </Typography>
                    <Typography
                      color="textSecondary"
                      gutterBottom
                      variant="body2"
                    >
                      Sign in on the internal platform
                  </Typography>
                  </Box>
                  {/* <Grid
                    container
                    spacing={3}
                  >
                    <Grid
                      item
                      xs={12}
                      md={6}
                    >
                      <Button
                        color="primary"
                        fullWidth
                        startIcon={<FacebookIcon />}
                        onClick={handleSubmit}
                        size="large"
                        variant="contained"
                      >
                        Login with Facebook
                    </Button>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      md={6}
                    >
                      <Button
                        fullWidth
                        startIcon={<GoogleIcon />}
                        onClick={handleSubmit}
                        size="large"
                        variant="contained"
                      >
                        Login with Google
                    </Button>
                    </Grid>
                  </Grid> */}
                  <Box
                    mt={3}
                    mb={1}
                  >
                    <Typography
                      align="center"
                      color="textSecondary"
                      variant="body1"
                    >
                      Login with email address
                  </Typography>
                  </Box>
                  <TextField
                    error={Boolean(touched.email && errors.email)}
                    fullWidth
                    helperText={touched.email && errors.email}
                    label="Email Address"
                    margin="normal"
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="email"
                    value={values.email}
                    variant="outlined"
                  />
                  <TextField
                    error={Boolean(touched.password && errors.password)}
                    fullWidth
                    helperText={touched.password && errors.password}
                    label="Password"
                    margin="normal"
                    name="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="password"
                    value={values.password}
                    variant="outlined"
                  />
                  <Box my={2}>
                    <Button
                      color="primary"
                      disabled={isSubmitting}
                      fullWidth
                      size="large"
                      type="submit"
                      variant="contained"
                    >
                      Sign in now
                  </Button>
                  </Box>
                  {/* <Typography
                    color="textSecondary"
                    variant="body1"
                  >
                    Don&apos;t have an account?
                  {' '}
                    <Link
                      component={RouterLink}
                      to="/register"
                      variant="h6"
                    >
                      Sign up
                  </Link>
                  </Typography> */}
                </form>
              )}
          </Formik>
        </Container>
      </Box>
    </Page>
  );
};

export default LoginView;
