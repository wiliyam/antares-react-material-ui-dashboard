import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  Typography,
  makeStyles,
  TextField
} from '@material-ui/core';

const useStyles = makeStyles(({
  root: {},
  item: {
    display: 'flex',
    flexDirection: 'column'
  }
}));

const Dynamiccreds = ({ className, ...rest }) => {
  const classes = useStyles();

  const [googlemapkey, setGooglemapkey] = useState("dummy key");
  const [jwtsecret, setJwtsecret] = useState("dummy jwtsecret");


  const GetAndSetInitCreds = () => {
    setGooglemapkey("api res key")
  }

  const saveNewCreds = () => {
    let body = {
      googlemapkey,
      jwtsecret
    }
    //api call for update 
    alert("new creds saved ..")
    console.log("body--->>", body)
  }
  return (
    <form
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Card>
        <CardHeader
          subheader="manage dynamic secret key and credentials"
          title="Dynamic secrets"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={6}
            wrap="wrap"
          >
            <Grid
              className={classes.item}
              item
              md={4}
              sm={6}
              xs={12}
            >

              <br></br>
              <TextField id="googlemapkey" label="Google Map Key" variant="outlined"
                value={googlemapkey}
                onChange={(event) => setGooglemapkey(event.target.value)}
              />
              <br></br>
              <TextField id="jwtSecretKey" label="JWT Secret Key" variant="outlined"
                value={jwtsecret}
                onChange={(event) => setJwtsecret(event.target.value)}
              />


            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box
          display="flex"
          justifyContent="flex-end"
          p={2}
        >
          <Button
            color="primary"
            variant="contained"
            onClick={saveNewCreds}
          >
            Save
          </Button>
        </Box>
      </Card>
    </form>
  );
};

Dynamiccreds.propTypes = {
  className: PropTypes.string
};

export default Dynamiccreds;
