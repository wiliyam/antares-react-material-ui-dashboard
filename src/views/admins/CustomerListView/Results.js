import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Search as SearchIcon, Edit as EditIcons } from 'react-feather';
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  makeStyles,
  Button,
  SvgIcon
} from '@material-ui/core';
import getInitials from 'src/utils/getInitials';
import CustomizedDialogs from 'src/components/CustomeModalAdmin'

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  }
}));

const Results = ({ className, customers, onModalClose, onSelectId, ...rest }) => {
  const classes = useStyles();
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [adminData, setAdminData] = React.useState({});
  const [isModalEdit, setIsModalEdit] = React.useState(false);

  const idOpen = true
  const handleClick = (data) => {
    console.log("-----------------------------------------------------------", data)
    setAdminData(data)
    setIsModalEdit(true)
    // return < FullScreenDialog isOpen={true} data={adminData} />
  };

  useEffect(() => {
    console.log("-----------------------------------------------------------", isModalEdit)
    // setIsModalEdit(false)
  }, [isModalEdit])

  const modalClose = (status) => {
    setIsModalEdit(false)
    onModalClose(status)

  }


  const handleSelectAll = (event) => {
    let newSelectedCustomerIds;

    if (event.target.checked) {
      newSelectedCustomerIds = customers.map((customer) => customer._id);
    } else {
      newSelectedCustomerIds = [];
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
    console.log("-------->>", newSelectedCustomerIds)
    onSelectId(newSelectedCustomerIds)
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedCustomerIds.indexOf(id);
    let newSelectedCustomerIds = [];

    if (selectedIndex === -1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds, id);
    } else if (selectedIndex === 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds.slice(1));
    } else if (selectedIndex === selectedCustomerIds.length - 1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds.slice(0, selectedIndex),
        selectedCustomerIds.slice(selectedIndex + 1)
      );
    }
    // console.log("newSelectedCustomerIds->", newSelectedCustomerIds)
    setSelectedCustomerIds(newSelectedCustomerIds);
    onSelectId(newSelectedCustomerIds)
  };




  return (
    isModalEdit ? <CustomizedDialogs isOpen={true} data={adminData} modalCloseAct={(status) => modalClose(status)} /> :
      <Card
        className={clsx(classes.root, className)}
        {...rest}
      >

        <PerfectScrollbar>
          <Box minWidth={1050}>
            <Table>

              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedCustomerIds.length === customers.length}
                      color="primary"
                      indeterminate={
                        selectedCustomerIds.length > 0
                        && selectedCustomerIds.length < customers.length
                      }
                      onChange={handleSelectAll}
                    />
                  </TableCell>
                  <TableCell>

                  </TableCell>
                  <TableCell>
                    Name
                </TableCell>
                  <TableCell>
                    Email
                </TableCell>
                  <TableCell>
                    Phone
                </TableCell>
                  <TableCell>
                    status
                </TableCell>
                  <TableCell>
                    admin Type
                </TableCell>
                  <TableCell>
                    Registration date
                </TableCell>
                  <TableCell>
                    cityId
                </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {customers.map((customer) => (
                  <TableRow
                    hover
                    key={customer._id}
                    selected={selectedCustomerIds.indexOf(customer._id) !== -1}
                  // onClick={() => handleClick(customer)}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedCustomerIds.indexOf(customer._id) !== -1}
                        onChange={(event) => handleSelectOne(event, customer._id)}
                        value="true"
                      />
                      {/* <Menu
                      id="simple-menu"
                      anchorEl={anchorEl}
                      keepMounted
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                    >
                      {
                        customer.status == 0 || customer.status == 2 || customer.status == 3 || customer.status == 4 ?
                          <MenuItem onClick={handleClose}>Activate</MenuItem> : <> <MenuItem onClick={handleClose}>Detivate</MenuItem> : <></>
                            <MenuItem onClick={handleClose}>Ban</MenuItem> : <></></>


                      }
                      <MenuItem onClick={handleClose}>View</MenuItem>
                      <MenuItem onClick={handleClose}>Edit</MenuItem>
                      <MenuItem onClick={handleClose}>Delete</MenuItem>
                    </Menu> */}

                    </TableCell>
                    <TableCell>
                      <Button onClick={() => handleClick(customer)}>
                        <SvgIcon
                          fontSize="small"
                          color="action"
                        >
                          <EditIcons />
                        </SvgIcon>
                      </Button>

                    </TableCell>
                    <TableCell>
                      <Box
                        alignItems="center"
                        display="flex"
                      >
                        {/* <Avatar
                          className={classes.avatar}
                          src={customer.profileImg || "https://via.placeholder.com/150"}
                        >
                          {getInitials(customer.name)}
                        </Avatar> */}
                        <Typography
                          color="textPrimary"
                          variant="body1"
                        >
                          {customer.firstName}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      {customer.email}
                    </TableCell>

                    <TableCell>
                      {customer.phone}
                    </TableCell>
                    <TableCell>
                      {customer.statusMsg}
                    </TableCell>
                    <TableCell>
                      {customer.adminTypeMsg || ""}
                    </TableCell>
                    <TableCell>
                      {moment(customer.createdAt).format('DD/MM/YYYY') || "not specify"}
                    </TableCell>
                    <TableCell>
                      {`${customer.cityId || ""}`}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </PerfectScrollbar>
      </Card >
  );
};

Results.propTypes = {
  className: PropTypes.string,
  customers: PropTypes.array.isRequired
};

export default Results;
