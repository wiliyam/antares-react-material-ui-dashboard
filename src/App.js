import 'react-perfect-scrollbar/dist/css/styles.css';
import React from 'react';
import { useRoutes } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from 'src/components/GlobalStyles';
import 'src/mixins/chartjs';
import theme from 'src/theme';
import routes from 'src/routes';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { connect } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

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

const App = (props) => {
  const routing = useRoutes(routes);
  const classes = useStyles();


  return (

    <ThemeProvider theme={theme}>

      <GlobalStyles />
      <Backdrop className={classes.backdrop} open={props.isLoading} onClick={() => { }}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      {routing}

    </ThemeProvider>
  );
};

export default connect(mapStateToProps, mapDispatchProps)(App);
