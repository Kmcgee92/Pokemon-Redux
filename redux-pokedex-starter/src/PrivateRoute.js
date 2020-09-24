import { Redirect, Route} from 'react-router-dom';
import React from 'react';


export const PrivateRoute = ({ component: Component, cProps, ...rest }) => (
    <Route {...rest} render={(props) => (
        rest.needLogin === true
            ? <Redirect to='/login' />
            : <Component {...props} {...cProps} />
    )} />
)