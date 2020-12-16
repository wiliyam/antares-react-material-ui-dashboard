import { TrainRounded } from '@material-ui/icons';
import React from 'react'
import { Navigate } from 'react-router-dom'

import { useDispatch, connect } from 'react-redux';
//redux

class ProtectedRoute extends React.Component {

    render() {
        const Component = this.props.component;
        const isAuthenticated = localStorage.getItem('auth');
        console.log("isAuthenticated*********************->>", isAuthenticated)
        if (isAuthenticated == "true") {
            console.log("trueeeeeeeeeeeeeeeeeeeeee-")
            // if (this.props.isAuthcomp) {
            //     return (
            //         <Navigate to='/app/dashboard' />
            //     )
            // }
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

export default ProtectedRoute;