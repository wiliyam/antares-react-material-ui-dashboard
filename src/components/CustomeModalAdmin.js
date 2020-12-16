

import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Button, TextField, form, Container, Box, Grid, Paper } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

import * as Yup from 'yup';
import { Formik } from 'formik';

import { toast } from 'react-toastify';
import { API_BASE_URL } from "src/variable"
import CustomBadge from 'src/components/CustomBadge'
const axios = require('axios');

const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        height: 140,
        width: 100,
    },
    control: {
        padding: theme.spacing(2),
    },
}));
const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);



export default function CustomizedDialogs(props) {
    const [open, setOpen] = React.useState(props.isOpen);
    const [data, setData] = React.useState(props.data);
    const [editEnable, setEditEnable] = React.useState(false);
    const classes = useStyles();

    const handleClose = () => {
        setOpen(false);
        props.modalCloseAct(data.status)
    };
    const headers = {
        // "accept": "application/json",
        'authorization': localStorage.getItem("token"),
        'language': "en"
    }

    const setAdminsData = (body) => new Promise((resolve, reject) => {
        const apiurl = API_BASE_URL + "/admin"
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

            // getAdminsData()
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

    const handleUpdate = async (...params) => {
        const resDataForm = params[0]
        console.log("resDataForm->", resDataForm)
        let dataToUpdate = {
            id: resDataForm._id.toString(),
            email: resDataForm.email,
            firstName: resDataForm.firstName,
            lastName: resDataForm.lastName,
            phone: resDataForm.phone,
            countryCode: resDataForm.countryCode
        }
        console.log("dataToUpdate->", dataToUpdate)
        setAdminsData(dataToUpdate)
        handleClose()
    }

    const handlestatusChange = async (id, status) => {
        await setAdminsData({ id, status })
        handleClose()
    }

    return (
        <div>
            <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                    {data.firstName + ` (${data._id})`}
                </DialogTitle>
                <DialogContent dividers>
                    <Container maxWidth="sm">

                        <Formik
                            initialValues={data}
                            // validationSchema={Yup.object().shape({
                            //     email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                            //     password: Yup.string().max(255).required('Password is required')
                            // })}
                            onSubmit={handleUpdate}
                        >
                            {({
                                errors,
                                handleBlur,
                                handleChange,
                                handleSubmit,
                                isSubmitting,
                                touched,
                                values
                            }) => (
                                <form onSubmit={handleSubmit}>
                                    {/* <Logo logocolor="black" style={{ width: '150px', height: '90px' }} /> */}
                                    <Grid container className={classes.root} spacing={1}>
                                        <Grid item xs={12}>
                                            <Grid container justify="center" spacing={3}>

                                                {data.status != 1 ? <Grid key={"Active"} item>
                                                    <Button
                                                        style={{
                                                            // borderRadius: 35,
                                                            backgroundColor: "#45b034",
                                                            // padding: "18px 36px",
                                                            // fontSize: "18px"
                                                        }}
                                                        color="primary"
                                                        disabled={isSubmitting}
                                                        fullWidth
                                                        size="large"
                                                        onClick={() => handlestatusChange(values._id.toString(), 1)}
                                                        variant="contained"
                                                    >
                                                        Active
                                             </Button>  </Grid> : ""}


                                                {data.status == 1 || data.status == 0 ? <Grid key={"Deactive"} item>
                                                    <Button
                                                        style={{
                                                            // borderRadius: 35,
                                                            backgroundColor: "#2f48dc",
                                                            // padding: "18px 36px",
                                                            // fontSize: "18px"
                                                        }}
                                                        color="primary"
                                                        disabled={isSubmitting}
                                                        fullWidth
                                                        size="large"
                                                        onClick={() => handlestatusChange(values._id.toString(), 2)}
                                                        variant="contained"
                                                    >
                                                        Deactive
                                             </Button> </Grid> : ""}



                                                {data.status == 1 || data.status == 0 || data.status == 2 ? <Grid key={"Ban"} item>
                                                    <Button
                                                        style={{
                                                            // borderRadius: 35,
                                                            backgroundColor: "#81137b",
                                                            // padding: "18px 36px",
                                                            // fontSize: "18px"
                                                        }}
                                                        color="primary"
                                                        disabled={isSubmitting}
                                                        fullWidth
                                                        size="large"
                                                        onClick={() => handlestatusChange(values._id.toString(), 3)}
                                                        variant="contained"
                                                    >
                                                        Ban
                                             </Button>
                                                </Grid> : ""}


                                                {data.status != 4 ? <Grid key={"Delete"} item>
                                                    <Button
                                                        style={{
                                                            // borderRadius: 35,
                                                            backgroundColor: "#bc0404",
                                                            // padding: "18px 36px",
                                                            // fontSize: "18px"
                                                        }}
                                                        color="primary"
                                                        disabled={isSubmitting}
                                                        fullWidth
                                                        size="large"
                                                        onClick={() => handlestatusChange(values._id.toString(), 4)}
                                                        variant="contained"
                                                    >
                                                        Delete
                                             </Button>
                                                </Grid> : ""}






                                            </Grid >
                                        </Grid >
                                    </Grid >
                                    <br />

                                    <TextField
                                        error={Boolean(touched.email && errors.email)}
                                        fullWidth
                                        helperText={touched.email && errors.email}
                                        label="Email Address"
                                        margin="normal"
                                        name="email"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        type="email"
                                        defaultValue={values.email}
                                        variant="outlined"
                                    />
                                    <TextField
                                        error={Boolean(touched.firstName && errors.firstName)}
                                        fullWidth
                                        helperText={touched.firstName && errors.firstName}
                                        label="First Name"
                                        margin="normal"
                                        name="firstName"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        // type="password"
                                        defaultValue={values.firstName}
                                        variant="outlined"
                                    />
                                    <TextField
                                        error={Boolean(touched.lastName && errors.lastName)}
                                        fullWidth
                                        helperText={touched.lastName && errors.lastName}
                                        label="Last Name"
                                        margin="normal"
                                        name="lastName"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        // type="password"
                                        defaultValue={values.lastName}
                                        variant="outlined"
                                    />
                                    <TextField
                                        error={Boolean(touched.phone && errors.phone)}
                                        fullWidth
                                        helperText={touched.phone && errors.phone}
                                        label="Phone"
                                        margin="normal"
                                        name="Phone"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        // type="password"
                                        defaultValue={values.phone}
                                        variant="outlined"
                                    />
                                    <TextField
                                        error={Boolean(touched.countryCode && errors.countryCode)}
                                        fullWidth
                                        helperText={touched.countryCode && errors.countryCode}
                                        label="Country Code"
                                        margin="normal"
                                        name="countryCode"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        // type="password"
                                        defaultValue={values.countryCode}
                                        variant="outlined"
                                    />
                                    <TextField
                                        error={Boolean(touched.status && errors.status)}
                                        fullWidth
                                        helperText={touched.status && errors.status}
                                        label="Status"
                                        margin="normal"
                                        name="status"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        // type="password"
                                        defaultValue={values.status}
                                        variant="outlined"
                                        disabled={true}
                                    />
                                    <TextField
                                        error={Boolean(touched.statusMsg && errors.statusMsg)}
                                        fullWidth
                                        helperText={touched.statusMsg && errors.statusMsg}
                                        label="Status"
                                        margin="normal"
                                        name="statusMsg"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        // type="password"
                                        defaultValue={values.statusMsg}
                                        variant="outlined"
                                        disabled={true}
                                    />
                                    <TextField
                                        error={Boolean(touched.adminType && errors.adminType)}
                                        fullWidth
                                        helperText={touched.adminType && errors.adminType}
                                        label="Admin Type"
                                        margin="normal"
                                        name="adminType"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        // type="password"
                                        defaultValue={values.adminType || 0}
                                        variant="outlined"
                                        disabled={true}
                                    />

                                    <TextField
                                        error={Boolean(touched.adminTypeMsg && errors.adminTypeMsg)}
                                        fullWidth
                                        helperText={touched.adminTypeMsg && errors.adminTypeMsg}
                                        label="Admin Type Msg"
                                        margin="normal"
                                        name="adminTypeMsg"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        // type="password"
                                        defaultValue={values.adminTypeMsg || "App Manager"}
                                        variant="outlined"
                                        disabled={true}
                                    />

                                    <br />
                                    <Button
                                        color="primary"
                                        disabled={isSubmitting}
                                        fullWidth
                                        size="large"
                                        type="submit"
                                        variant="contained"
                                    >
                                        Update
                                             </Button>
                                </form>
                            )}
                        </Formik>
                    </Container>
                </DialogContent>
            </Dialog>
        </div>
    );
}