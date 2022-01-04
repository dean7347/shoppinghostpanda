import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute= ({ component: Component, ...rest }) => {
    const { loggedIn } = useSelector((state) => state.auth);

    return(
        <Route {...rest} render={props => loggedIn ? <Component {...props} /> :
            <Redirect to={{pathname:"/signin", state: { next: props.location.pathname } }} />} />
    );
}

export default PrivateRoute;
