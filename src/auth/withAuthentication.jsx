import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

const withAuthentication = (Component) => {

    const WrapperComponent = (props) => {
        const [isLogged, setIsLogged] = useState(false)
        const isAuthenticated = localStorage.getItem('token');
        const navigate = useNavigate();

        useEffect(() => {
            const checkToken = async () => {
                try {
                    const token = localStorage.getItem('token');

                    const response = await axios.get('https://djbnrrib9e.execute-api.us-east-2.amazonaws.com/v1/token-check', {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });

                    if (response.data) {
                        setIsLogged(true)
                    }
                } catch (error) {
                    console.log(error)
                }
            };

            checkToken()
        }, [isAuthenticated])

        if (isAuthenticated) {
            return <Component {...props} />;
        }

        useEffect(() => {
            if (!isAuthenticated && !isLogged) {
                return navigate('/login')
            }
        }, [isAuthenticated, isLogged])

    };

    return WrapperComponent;
};

export default withAuthentication;
