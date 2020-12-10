import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import { API_BASE_URL } from "src/variable"
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
  TextField,
  Snackbar
} from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';

import LoaderCom from 'src/components/Loader'

const axios = require('axios');

const useStyles = makeStyles(({
  root: {},
  item: {
    display: 'flex',
    flexDirection: 'column'
  }
}));



const Dynamiccreds = ({ className, ...rest }) => {
  const classes = useStyles();



  const [googlemapkey, setGooglemapkey] = useState("");
  const [jwtsecret, setJwtsecret] = useState("");
  const [configId, setConfigId] = useState("");
  const [isLoading, setIsLoading] = useState(false);


  const getConfigData = () => new Promise((resolve, reject) => {
    setIsLoading(true)
    const apiurl = API_BASE_URL + "/appConfig?type=0"
    console.log('apiurl---->>', apiurl)
    axios.get(apiurl).then((response) => {
      // console.log("res-->>", response)
      if (response.status == 200) {
        resolve(response.data);
        setGooglemapkey(response.data.data.keyAndSecrets.googleMapKey)
        setJwtsecret(response.data.data.keyAndSecrets.jwtSecretKey)
        setConfigId(response.data.data._id)
        console.log("state updated", response.data.data)
        setIsLoading(false)
      } else {
        alert(response.status);
        reject(response);
        setIsLoading(false)
      }

    })
      .catch((error) => {
        alert(error);
        reject(error);
        setIsLoading(false)
      });
  })

  const setConfigData = (body) => new Promise((resolve, reject) => {
    const apiurl = API_BASE_URL + "/appConfig"
    console.log('apiurl---->>', apiurl)
    axios.patch(apiurl, body).then((response) => {
      // console.log("res-->>", response)
      if (response.status == 200) {
        resolve(response.data);
        console.log("state updated", response.data)
        setIsLoading(false)
        getConfigData()
        // alert("data uodated..");
      } else {
        alert(response.status);
        setIsLoading(false)
        getConfigData()
        reject(response);
      }

    })
      .catch((error) => {
        alert(error);
        setIsLoading(false)
        getConfigData()
        reject(error);
      });
  })


  useEffect(() => {
    console.log('Inside the useEffect function');
    getConfigData()
  }, []);

  const saveNewCreds = async () => {
    let body = {
      "id": configId,
      "type": 0,
      "googleMapKey": googlemapkey,
      "jwtSecretKey": jwtsecret
    }
    //api call for update 
    // alert("new creds saved ..")
    setIsLoading(true)
    console.log("body--->>", body)
    setConfigData(body)
  }
  return (
    isLoading ? <LoaderCom visible={true} />
      : <form
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
