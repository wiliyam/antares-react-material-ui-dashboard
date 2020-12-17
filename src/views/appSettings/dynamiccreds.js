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
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import patchReq from "src/apiCall/patch"
import getReq from "src/apiCall/get"
import { toast } from 'react-toastify';

import { useDispatch, connect } from 'react-redux';

import LoaderCom from 'src/components/Loader'

const axios = require('axios');

const useStyles = makeStyles(({
  root: {},
  item: {
    display: 'flex',
    flexDirection: 'column'
  }
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
    loadingDisable: () => dispacth({ type: "LOADING_DISABLE" })
  }
}

const Dynamiccreds = ({ className, isLoading, loadingEnable, loadingDisable, ...rest }) => {
  const classes = useStyles();



  const [googlemapkey, setGooglemapkey] = useState("");
  const [jwtsecret, setJwtsecret] = useState("");
  const [configId, setConfigId] = useState("");

  const getConfigData = () => new Promise(async (resolve, reject) => {
    const apiurl = "/appConfig?type=0"

    try {
      loadingEnable()
      let resData = await getReq(apiurl)
      resolve(resData);
      setGooglemapkey(resData.data.keyAndSecrets.googleMapKey)
      setJwtsecret(resData.data.keyAndSecrets.jwtSecretKey)
      setConfigId(resData.data._id)
      loadingDisable()

    } catch (error) {
      loadingDisable()
    }

  })

  const setConfigData = (body) => new Promise(async (resolve, reject) => {


    try {
      loadingEnable()
      const apiurl = "/appConfig"
      console.log('apiurl---->>', apiurl)
      let resData = await patchReq(apiurl, body)
      resolve(resData);
      console.log("state updated", resData)
      loadingDisable()

    } catch (error) {
      loadingDisable()
    }
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
    console.log("body--->>", body)
    setConfigData(body)
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

export default connect(mapStateToProps, mapDispatchProps)(Dynamiccreds);
