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
import CustomBadge from 'src/components/CustomBadge'
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
  const [refresh, setrefresh] = useState(1);
  const [statusWiseCount, setStatusWiseCount] = useState({ pending: 0, all: 0, active: 0, deactive: 0, ban: 0, deleted: 0 });
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
      setStatusWiseCount(response.data.statusWiseCount)
      console.log("state totalCount", response.data.totalCount)

      switch (status) {
        case -1:
          setTotalCount(response.data.statusWiseCount.all)
          break;
        case 0:
          setTotalCount(response.data.statusWiseCount.pending)
          break;
        case 1:
          setTotalCount(response.data.statusWiseCount.active)
          break;
        case 2:
          setTotalCount(response.data.statusWiseCount.deactive)
          break;
        case 3:
          setTotalCount(response.data.statusWiseCount.ban)
          break;
        case 4:
          setTotalCount(response.data.statusWiseCount.deleted)
          break;
        default:
          setTotalCount(response.data.totalCount)
          break;

      }
      console.log("state statusWiseCount", response.data.statusWiseCount)
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
    // console.log('Inside the useEffect function page', page);
    // console.log('Inside the useEffect function limit', limit);
    console.log('Inside the useEffect function statusWiseCount', statusWiseCount);
    getAdminsData(page, limit, status)

  }, [limit, page, status, setrefresh]);

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

  const onModalClose = () => {
    getAdminsData()
    setrefresh(1)
  }

  return (
    <Page
      className={classes.root}
      title="Customers"
    >
      <Container maxWidth={false}>
        {/* <Toolbar /> */}



        <Box
          display="flex"
          justifyContent="flex-center"
          m={3}
        >
          <Button color="primary" mr={3} onClick={() => hadlestatusChange(0)} variant={status == 0 ? "contained" : ""} >
            <CustomBadge color="#f34f4f" text=" Pending Approval" count={statusWiseCount.pending.toString()} />
          </Button>
          <Button color="primary" variant={status == -1 ? "contained" : ""} onClick={() => hadlestatusChange(-1)}>
            <CustomBadge color="#24dce8" text="All" count={statusWiseCount.all.toString()} />
          </Button>
          <Button color="primary" onClick={() => hadlestatusChange(1)} variant={status == 1 ? "contained" : ""}>
            <CustomBadge color="#45b034" text="Active" count={statusWiseCount.active.toString()} />
          </Button>
          <Button color="primary" onClick={() => hadlestatusChange(2)} variant={status == 2 ? "contained" : ""} >
            <CustomBadge color="#2f48dc" text="Deactive" count={statusWiseCount.deactive.toString()} />
          </Button>
          <Button color="primary" onClick={() => hadlestatusChange(3)} variant={status == 3 ? "contained" : ""} >
            <CustomBadge color="#81137b" text="ban" count={statusWiseCount.ban.toString()} />
          </Button>
          <Button color="primary" onClick={() => hadlestatusChange(4)} variant={status == 4 ? "contained" : ""} >
            <CustomBadge color="#bc0404" text="Deleted" count={statusWiseCount.deleted.toString()} />
          </Button>
        </Box>
        <Box mt={3}>
          <Results customers={customers} onModalClose={onModalClose} />
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
