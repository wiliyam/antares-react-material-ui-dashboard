import React from 'react';
import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import Dynamiccreds from './dynamiccreds';
import Password from './Password';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const AppSettingsView = () => {
  const classes = useStyles();

  return (
    <Page
      className={classes.root}
      title="App Configuration"
    >
      <Container maxWidth="lg">
        <Dynamiccreds />
        <Box mt={3}>
          <Password />
        </Box>
      </Container>
    </Page>
  );
};

export default AppSettingsView;
