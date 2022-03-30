import React  from 'react';
import { Route, Redirect } from 'react-router-dom';
import {useAuthStore} from "../../store/authHooks";

const PrivateRoute= ({ component: Component, ...rest }) => {
    const user = useAuthStore(state => state.user)

    return(
        <Route {...rest} render={props => user ? <Component {...props} /> :
            <Redirect to={{pathname:"/signin", state: { next: props.location.pathname } }} />} />
    );
}

export default PrivateRoute;
