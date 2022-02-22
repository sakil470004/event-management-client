import { CircularProgress } from '@mui/material';
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({user, children, ...rest }) => {

    let location = useLocation();
    // if (isLoading) { return <CircularProgress /> }

    if (user) {
        return children
    }
    return (<Navigate to="/login" state={{ from: location }} replace />
    )
};

export default PrivateRoute;