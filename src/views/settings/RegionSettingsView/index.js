import React from 'react';
import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import MapView from './MapView';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const RegionSettingsView = () => {
  const classes = useStyles();

  return (
    <Page
      className={classes.root}
      title="Region Settings"
    >
      <Container maxWidth="lg">

        <Box mt={3}>
          <MapView />
        </Box>
      </Container>
    </Page>
  );
};

export default RegionSettingsView;
