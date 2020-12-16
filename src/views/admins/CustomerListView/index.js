import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  makeStyles,
  TablePagination,
  Tab,
  Badge,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  Grid
} from '@material-ui/core';

import { Search as SearchIcon, Edit as EditIcons } from 'react-feather';

import Page from 'src/components/Page';
import Results from './Results';
import Toolbar from './Toolbar';
import data from './data';

import { toast } from 'react-toastify';
import { API_BASE_URL } from "src/variable"
import getReq from "src/apiCall/get"
import patchReq from "src/apiCall/patch"
import CustomBadge from 'src/components/CustomBadge'


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
  const [q, setQ] = useState("");
  const [refresh, setrefresh] = useState(1);
  const [sIds, setSIds] = useState([]);
  const [statusWiseCount, setStatusWiseCount] = useState({ pending: 0, all: 0, active: 0, deactive: 0, ban: 0, deleted: 0 });
  const headers = {
    // "accept": "application/json",
    'authorization': localStorage.getItem("token"),
    'language': "en"
  }
  const getAdminsData = (pageNum = 0, pageSize = 10, status = -1, q = "") => new Promise(async (resolve, reject) => {
    // setIsLoading(true)
    let apiurl = `/admin?pageNum=${pageNum}&pageSize=${pageSize}&status=${status}`

    if (q != "") {
      apiurl = apiurl + `&q=${q}`
    }
    console.log('apiurl---->>', apiurl)

    console.log("headers--->>", headers)

    let resData = await getReq(apiurl)

    resolve(resData);
    setCustomers(resData.data)
    setStatusWiseCount(resData.statusWiseCount)
    console.log("state totalCount", resData.totalCount)

    switch (status) {
      case -1:
        setTotalCount(resData.statusWiseCount.all)
        break;
      case 0:
        setTotalCount(resData.statusWiseCount.pending)
        break;
      case 1:
        setTotalCount(resData.statusWiseCount.active)
        break;
      case 2:
        setTotalCount(resData.statusWiseCount.deactive)
        break;
      case 3:
        setTotalCount(resData.statusWiseCount.ban)
        break;
      case 4:
        setTotalCount(resData.statusWiseCount.deleted)
        break;
      default:
        setTotalCount(resData.totalCount)
        break;

    }
    console.log("state statusWiseCount", resData.statusWiseCount)
    console.log("state updated", resData.data)
  })
  const setAdminsStatusData = (body) => new Promise(async (resolve, reject) => {
    const apiurl = "/admin/status"
    console.log('apiurl---->>', apiurl)
    console.log('headers---->>', headers)

    await patchReq(apiurl, body)
    setStatus(body.status)
  })



  useEffect(() => {
    // console.log('Inside the useEffect function page', page);
    // console.log('Inside the useEffect function limit', limit);
    console.log('Inside the useEffect function statusWiseCount', statusWiseCount);
    getAdminsData(page, limit, status, q)

  }, [limit, page, status, refresh, q]);

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


  const handleSearch = (event) => {
    console.log("event.target.value-->>", event.target.value)
    setQ(event.target.value)
    // getAdminsData(page, limit)
  }

  const onModalClose = (status) => {
    getAdminsData()
    setrefresh(1)
    console.log("setting statuus -1 default")
    setStatus(-1)
  }


  const setNewSelectedCustomerIds = (idArr) => {
    console.log("setNewSelectedCustomerIds--->>", idArr)
    setSIds(idArr)
  }

  const handlestatusChangeSelect = (status) => {


    let body = {
      ids: sIds,
      status: status
    }
    console.log("handlestatusChangeSelect--->>", body)
    setAdminsStatusData(body)

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
        <Box mt={3} display="flex" flexDirection="row">
          {/* <Card>
            <CardContent> */}
          <Box >
            <TextField
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SvgIcon
                      fontSize="small"
                      color="action"
                    >
                      <SearchIcon />
                    </SvgIcon>
                  </InputAdornment>
                )
              }}
              placeholder="Search here"
              // variant="outlined"
              onChange={(event) => handleSearch(event)}
            />
          </Box>
          {/* <Grid container className={classes.root} spacing={1}> */}
          {/* <Grid item xs={12}> */}
          <Grid container justify="center" spacing={3}>

            {status != 1 ? <Grid key={"Active"} item>
              <Button
                style={{
                  // borderRadius: 35,
                  backgroundColor: "#45b034",
                  // padding: "18px 36px",
                  // fontSize: "18px"
                }}
                color="primary"

                fullWidth
                size="large"
                onClick={() => handlestatusChangeSelect(1)}
                variant="contained"
              >
                Active
                                             </Button>  </Grid> : ""}


            {status == 1 || status == 0 || status == -1 ? <Grid key={"Deactive"} item>
              <Button
                style={{
                  // borderRadius: 35,
                  backgroundColor: "#2f48dc",
                  // padding: "18px 36px",
                  // fontSize: "18px"
                }}
                color="primary"

                fullWidth
                size="large"
                onClick={() => handlestatusChangeSelect(2)}
                variant="contained"
              >
                Deactive
                                             </Button> </Grid> : ""}



            {status == 1 || status == 0 || status == 2 || status == -1 ? <Grid key={"Ban"} item>
              <Button
                style={{
                  // borderRadius: 35,
                  backgroundColor: "#81137b",
                  // padding: "18px 36px",
                  // fontSize: "18px"
                }}
                color="primary"

                fullWidth
                size="large"
                onClick={() => handlestatusChangeSelect(3)}
                variant="contained"
              >
                Ban
                                             </Button>
            </Grid> : ""}


            {status != 4 ? <Grid key={"Delete"} item>
              <Button
                style={{
                  // borderRadius: 35,
                  backgroundColor: "#bc0404",
                  // padding: "18px 36px",
                  // fontSize: "18px"
                }}
                color="primary"

                fullWidth
                size="large"
                onClick={() => handlestatusChangeSelect(4)}
                variant="contained"
              >
                Delete
                                             </Button>
            </Grid> : ""}






          </Grid >
          {/* </Grid > */}
          {/* </Grid > */}

        </Box>
        <Box mt={3}>
          <Results customers={customers} onModalClose={onModalClose} onSelectId={setNewSelectedCustomerIds} />
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
    </Page >
  );
};

export default AdminsListView;
