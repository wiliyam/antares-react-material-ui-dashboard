import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  makeStyles,
  TablePagination,
  Tab,
  Badge,
  Button
} from '@material-ui/core';

import Page from 'src/components/Page';
import Results from './Results';
import Toolbar from './Toolbar';
import data from './data';

import { toast } from 'react-toastify';
import { API_BASE_URL } from "src/variable"
const axios = require('axios');


const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));



const AdminsListView = () => {
  const classes = useStyles();
  const [customers, setCustomers] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [status, setStatus] = useState(-1);
  const headers = {
    // "accept": "application/json",
    'authorization': localStorage.getItem("token"),
    'language': "en"
  }
  const getAdminsData = (pageNum = 0, pageSize = 10, status = -1) => new Promise((resolve, reject) => {
    // setIsLoading(true)
    const apiurl = API_BASE_URL + `/admin?pageNum=${pageNum}&pageSize=${pageSize}&status=${status}`
    console.log('apiurl---->>', apiurl)

    console.log("headers--->>", headers)
    axios.get(apiurl, { headers: headers }).then((response) => {
      // console.log("res-->>", response)

      resolve(response.data);
      setCustomers(response.data.data)
      setTotalCount(response.data.totalCount)
      console.log("state totalCount", response.data.totalCount)
      console.log("state updated", response.data.data)
      // setIsLoading(false)

    })
      .catch((error) => {
        console.log('error-->', error.response);
        reject(error.response);
        // setIsLoading(false)
        if (error.response) {
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
        } else {
          error.response = { data: {} }
          error.response.data.message = "Internal server error.."
        }

        // setIsLoading(false)
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

  const setAdminsData = (body) => new Promise((resolve, reject) => {
    const apiurl = API_BASE_URL + "/appConfig"
    console.log('apiurl---->>', apiurl)
    console.log('headers---->>', headers)
    axios.patch(apiurl, body, { headers }).then((response) => {
      // console.log("res-->>", response)

      resolve(response.data);
      console.log("state updated", response.data)
      // setIsLoading(false)
      toast.success('Data updated...!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      getAdminsData()
      // alert("data uodated..");


    })
      .catch((error) => {
        console.log('error-->', error.response);
        reject(error.response);
        // setIsLoading(false)
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
        // setIsLoading(false)
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
    console.log('Inside the useEffect function page', page);
    console.log('Inside the useEffect function limit', limit);
    getAdminsData(page, limit, status)
  }, [limit, page, status]);

  const hadlePageChange = (event, newPage) => {
    // console.log("event.target.value-->>", event.target.value)
    setPage(newPage)
    // getAdminsData(page, limit)
  }
  const hadlestatusChange = (st) => {
    // console.log("event.target.value-->>", event.target.value)
    setStatus(st)
    // getAdminsData(page, limit)
  }

  return (
    <Page
      className={classes.root}
      title="Customers"
    >
      <Container maxWidth={false}>
        <Toolbar />

        <Box
          display="flex"
          justifyContent="flex-center"
          m={3}
        >
          {/* <Tab label={<Badge badgeContent={totalCount} color="error">
          
            </Badge>} value="bxsshbx" />
          <Tab label={<Badge badgeContent={totalCount} color="primary">
            Active
            </Badge>} value="bxsshbx" /> */}
          <Button color="primary" onClick={() => hadlestatusChange(-1)}>
            <Tab label={<Badge badgeContent={totalCount} color="primary">
              All
          </Badge>
            } value="bxsshbx" />
          </Button>
          <Button color="primary" onClick={() => hadlestatusChange(0)}>
            <Tab label={<Badge badgeContent={totalCount} color="primary">
              Pending Approval
          </Badge>
            } value="bxsshbx" disabled={true} />
          </Button>
          <Button color="primary" onClick={() => hadlestatusChange(1)}>
            <Tab label={<Badge badgeContent={totalCount} color="primary">
              Active
          </Badge>
            } value="bxsshbx" />
          </Button>
          <Button color="primary" onClick={() => hadlestatusChange(2)}>
            <Tab label={<Badge badgeContent={totalCount} color="primary">
              Deactived
          </Badge>
            } value="bxsshbx" />
          </Button>
          <Button color="primary" onClick={() => hadlestatusChange(3)}>
            <Tab label={<Badge badgeContent={totalCount} color="primary">
              ban
          </Badge>
            } value="bxsshbx" />
          </Button>
          <Button color="primary" onClick={() => hadlestatusChange(4)}>
            <Tab label={<Badge badgeContent={totalCount} color="primary">
              Deleted
          </Badge>
            } value="bxsshbx" />
          </Button>
        </Box>
        <Box mt={3}>
          <Results customers={customers} />
        </Box>
      </Container>
      <TablePagination
        component="div"
        count={totalCount}
        onChangePage={hadlePageChange}
        onChangeRowsPerPage={(event) => setLimit(event.target.value)}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[1, 2, 5, 10, 25]}
      />
    </Page>
  );
};

export default AdminsListView;
