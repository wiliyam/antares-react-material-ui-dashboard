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
import { toast } from 'react-toastify';

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


  // useEffect(() => {
  //   // toast.dark(' 🧑🏼‍🚀  Welcome To Anatres...', {
  //   //   position: "top-right",
  //   //   autoClose: 3000,
  //   //   hideProgressBar: false,
  //   //   closeOnClick: true,
  //   //   pauseOnHover: true,
  //   //   draggable: true,
  //   //   progress: undefined,
  //   // });

  //   // setMsg('logged in...');
  //   if (localStorage.getItem("auth") == "false") {
  //     // setMsg('logged in...');
  //     // const navigate = useNavigate()
  //     // return navigate('/auth', { replace: true });
  //   }
  // });

  const headers = {
    "accept": "application/json",
    'authorization': localStorage.getItem("token"),
    'language': "en"
  }
  const getConfigData = () => new Promise((resolve, reject) => {
    setIsLoading(true)
    const apiurl = API_BASE_URL + "/appConfig?type=0"
    console.log('apiurl---->>', apiurl)

    console.log("headers--->>", headers)
    axios.get(apiurl, { headers: headers }).then((response) => {
      // console.log("res-->>", response)

      resolve(response.data);
      setGooglemapkey(response.data.data.keyAndSecrets.googleMapKey)
      setJwtsecret(response.data.data.keyAndSecrets.jwtSecretKey)
      setConfigId(response.data.data._id)
      console.log("state updated", response.data.data)
      setIsLoading(false)

    })
      .catch((error) => {
        console.log('error-->', error.response);
        reject(error.response);
        setIsLoading(false)
        if (error.response.status == 500) {
          error.data.message = "Internal server error.."
        }
        if (error.response.status == 401) {
          error.data.message = "Session Expire.."
          toast.error(error.response.data.message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          localStorage.setItem('auth', "false");
        }
        setIsLoading(false)
        toast.error(error.response.data.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

      });
  })

  const setConfigData = (body) => new Promise((resolve, reject) => {
    const apiurl = API_BASE_URL + "/appConfig"
    console.log('apiurl---->>', apiurl)
    console.log('headers---->>', headers)
    axios.patch(apiurl, body, { headers }).then((response) => {
      // console.log("res-->>", response)

      resolve(response.data);
      console.log("state updated", response.data)
      setIsLoading(false)
      toast.success('Data updated...!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      getConfigData()
      // alert("data uodated..");


    })
      .catch((error) => {
        console.log('error-->', error.response);
        reject(error.response);
        setIsLoading(false)
        if (error.response.status == 500) {
          error.data = {}
          error.data.message = "Internal server error.."
        }
        if (error.response.status == 401) {
          error.data = {}
          error.data.message = "Session Expire.."
          toast.error(error.response.data.message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          localStorage.setItem('auth', "false");
        }
        setIsLoading(false)
        toast.error(error.response.data.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
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
      :
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
