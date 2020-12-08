import { TrainRounded } from '@material-ui/icons';
import React from 'react'
import { Navigate } from 'react-router-dom'

import { useDispatch, connect } from 'react-redux';
//redux
const mapStateToProps = (state) => {
    return {
        auth: state.auth.auth
    }
}
const mapDispatchProps = (dispacth) => {
    return {
        authEnable: () => dispacth({ type: "ENABLE" }),
        authDisable: () => dispacth({ type: "DISABLE" })
    }
}

class ProtectedRoute extends React.Component {

    render() {
        const Component = this.props.component;
        const isAuthenticated = localStorage.getItem('auth');
        console.log("isAuthenticated*********************->>", isAuthenticated)
        if (isAuthenticated == "true") {
            console.log("trueeeeeeeeeeeeeeeeeeeeee-")
            return (
                <Component />
            )
        } else {
            console.log("faaaaaaaaaaaaaaaaaaaaaaaaaalse-")
            return (
                <Navigate to='/auth' />
            );
        }

    }
}

export default connect(mapStateToProps)(ProtectedRoute);