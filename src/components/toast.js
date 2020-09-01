import React from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function PositionedSnackbar(props) {
    const [state, setState] = React.useState({
        open: false,
        vertical: 'top',
        horizontal: 'center',
    });

    const { vertical, horizontal, open } = state;

    const handleClick = (newState) => () => {
        setState({ open: true, ...newState });
    };

    const handleClose = () => {
        setState({ ...state, open: false });
    };

    return (
        <div>
            <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                open={props.isOpen}
                onClose={handleClose}
                message={props.msg}
                key={vertical + horizontal}
            />
            {/* <Alert
                open={props.isOpen}
                onClose={handleClose}
                severity="error"
            > */}
            {/* This is an error message! */}

            {/* </Alert> */}
        </div>
    );
}
