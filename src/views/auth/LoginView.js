import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { Formik } from 'formik';
import Snackbar from '@material-ui/core/Snackbar';
import Logo from 'src/components/Logo';
import { API_BASE_URL } from "src/variable"

import { useDispatch, connect } from 'react-redux';

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
import store from '../../redux-store';
import { authEnable } from '../../redux-store/actions';
// import { auth } from '../../redux-store/reducers';
import PositionedSnackbar from '../../components/toast';

import postReq from "src/apiCall/post"


// store.subscribe(getStoreData);

// function getStoreData() {
//   const data = store.getState();
//   console.log('store data---->>', data);
//   return data;
// }

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));


const authApi = (loginType, email, password, phone, countryCode) => new Promise(async (resolve, reject) => {


  let url = `/admin/login`
  console.log('----', url);

  let body = {
    email,
    password
  }
  if (loginType == 2) {
    body = {
      phone,
      countryCode,
      password
    }
  }
  try {
    let resData = await postReq(url, body)
    console.log('resData.data.tokens.accessToken----', resData.data.tokens.accessToken);
    console.log("setting up token")
    localStorage.setItem('auth', true);
    localStorage.setItem('token', resData.data.tokens.accessToken);
    localStorage.setItem('reftoken', resData.data.tokens.refreshToken);

    resolve(resData);
  } catch (error) {
    reject(error);
  }

});

//redux
const mapStateToProps = (state) => {
  return {
    isLoading: state.data.isLoading
  }
}
const mapDispatchProps = (dispacth) => {
  return {
    loadingEnable: () => dispacth({ type: "LOADING_ENABLE" }),
    loadinggDisable: () => dispacth({ type: "LOADING_DISABLE" })
  }
}

const LoginView = (props) => {


  let [logedIn, setLogedIn] = useState(false)

  useEffect(() => {
    // toast.dark(' 🧑🏼‍🚀  Welcome To Anatres...', {
    //   position: "top-right",
    //   autoClose: 3000,
    //   hideProgressBar: false,
    //   closeOnClick: true,
    //   pauseOnHover: true,
    //   draggable: true,
    //   progress: undefined,
    // });
    console.log("component updated", props);
    // setMsg('logged in...');
    if (logedIn) {
      // setMsg('logged in...');
      // localStorage.setItem('auth', "true");
      return navigate('/app/dashboard', { replace: true });
    }
  }, [logedIn]);

  const classes = useStyles();
  const navigate = useNavigate();
  const login = async (...params) => {
    // console.log(params);
    const data = params[0];
    // console.log('----getStoreData----->>', getStoreData());
    // await useDispatch(authEnable);
    // console.log('----getStoreData----->>', getStoreData());
    // return navigate('/app/dashboard', { replace: true });
    // await setUser(data.user);
    // await setPass(data.password);
    try {
      props.loadingEnable()
      const res = await authApi(1, data.email, data.password);
      console.log('res--->', res);
      setLogedIn(true)
      toast.dark('🧑🏼‍🚀 Now you login into anatres world!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      props.loadinggDisable()

      // setMsg(res.data.message);
      // } 
    } catch (error) {
      // setMsg(error);
      toast.error(error, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      props.loadinggDisable()
      console.log('error-->', error);
    }

    console.log('---');
  };

  return (

    <Page
      className={classes.root}
      title="Login"
    >
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="sm">
          <Formik
            initialValues={{
              email: 'wiliyam@gmail.com',
              password: '3embed'
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
                {/* <Logo logocolor="black" style={{ width: '150px', height: '90px' }} /> */}
                <Box mb={3}>
                  <Typography
                    color="textPrimary"
                    align="center"
                    variant="h2"
                  >
                    Welcome to the Antares
                  </Typography>
                  {/* <Typography
                      color="textSecondary"
                      gutterBottom
                      variant="body2"
                    >
                      Welcome to exwhere superadmin nice to see you back!
                  </Typography> */}
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
                  {/* <Typography
                      align="center"
                      color="textSecondary"
                      variant="body1"
                    >
                      Welcome to the Antares
                  </Typography> */}
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

export default connect(mapStateToProps, mapDispatchProps)(LoginView);
