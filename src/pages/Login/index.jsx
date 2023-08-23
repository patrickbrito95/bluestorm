import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const isAuthenticated = window.localStorage.getItem('token');

    const handleLogin = async () => {
        try {
            const response = await axios.post('https://djbnrrib9e.execute-api.us-east-2.amazonaws.com/v1/login', {
                username,
                password,
            });

            if (response.data) {
                console.log(response.data)
                window.localStorage.setItem('token', response.data.token)
                navigate('/medication-list');
            } else {
                console.log('Login failed');
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/medication-list')
        }
    }, [isAuthenticated])


    console.log('Login:', "bluestorm-api",)
    console.log("Password", "apipassword123")

    return (
        <div>
            <h2>Login Page</h2>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default Login;
