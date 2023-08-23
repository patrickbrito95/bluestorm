import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const withAuthentication = (Component) => {
    const WrapperComponent = (props) => {
        const isAuthenticated = localStorage.getItem('token');
        const navigate = useNavigate();

        if (isAuthenticated) {
            return <Component {...props} />;
        }

        useEffect(() => {
            if (!isAuthenticated) {
                return navigate('/login')
            }
        }, [isAuthenticated])

    };

    return WrapperComponent;
};

export default withAuthentication;
