import React from 'react';
import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import { toast } from 'react-toastify';

import { Navigate, useNavigate } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const Logout = () => {
  const classes = useStyles();


  const handleLogout = async () => {
    console.log("handleLogout--->>")
    await localStorage.setItem('auth', "false");
    toast.warn('🦄 Logout successfully...!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
  handleLogout()
  return (
    <Page
      className={classes.root}
      title="Logout"
    >

      {/* hello */}
      <Navigate to='/auth' />
    </Page>
  );
};

export default Logout;
