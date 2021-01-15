import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';

export const PrivateRoutes = ({
    isLoggedIn,
    component: Component,
    ...rest
}) => {

    return (
        <Route {...rest}
            component={ (props) =>(
                (isLoggedIn)
                    ? (<Component { ...props }/>)
                    : (<Redirect to="/auth/login"/>)

            )}
        />
    )
}

PrivateRoutes.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired
}
