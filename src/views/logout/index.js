import React from 'react';
import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';

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


  const handleLogout = () => {
    console.log("handleLogout--->>")
    localStorage.setItem('auth', "false");
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
