import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../_auth/Auth';

export default function ProtectedRoute ({component: Component, ...rest}) {

    const { isAuthenticated } = React.useContext(AuthContext);

    return (
        <Route
            {...rest}
            render={(props) =>
                isAuthenticated ? (
                    <Component {...props} />
                ) : (
                    <Redirect to='/login' />
                )
            }
        />
    );
}