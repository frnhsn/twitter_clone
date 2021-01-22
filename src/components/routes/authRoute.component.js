import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthService from '../../services/auth.service.js'

const AuthRoute = ({ component: Component, ...rest }) => {
    const isAuthenticated = AuthService.isAuthenticated();
    
    return (
        <Route {...rest} render={
        props => {
            if (isAuthenticated) {
                return (<Redirect to={{pathname: '/home', state: {from: props.location}}}></Redirect>) 
            } else {
                return (<Component {...rest} {...props} />)
            } 
        }} />
    )
}

export default AuthRoute;