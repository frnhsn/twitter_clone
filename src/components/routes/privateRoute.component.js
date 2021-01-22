import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthService from '../../services/auth.service.js'

const PrivateRoute = ({ component: Component, ...rest }) => {
    const isAuthenticated = AuthService.isAuthenticated();

    return (
        <Route {...rest} render={
        props => {
            if (isAuthenticated) {
                return (<Component {...rest} {...props} />)
            } else {
                return (<Redirect to={{pathname: '/login', state: {from: props.location}}}></Redirect>)
            } 
        }} />
    )
}

export default PrivateRoute;