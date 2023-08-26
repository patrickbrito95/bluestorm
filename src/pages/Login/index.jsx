import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Header } from '../../components/Header';
import './style.css';
import { Card } from '../../components/Cards';
import { Input } from '../../components/Inputs';
import { Button } from '../../components/Button';
import { CircularProgress } from '@mui/material';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [loginError, setLoginError] = useState('');
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();

    const isAuthenticated = window.localStorage.getItem('token');

    const handleLogin = async () => {
        setUsernameError('');
        setPasswordError('');

        if (!username) {
            setUsernameError('O campo de usuário é obrigatório.');
        }
        if (!password) {
            setPasswordError('O campo de senha é obrigatório.');
        }

        if (username.length > 15) {
            setUsernameError('O campo de usuário deve ter no máximo 15 caracteres.');
        }
        if (password.length > 15) {
            setPasswordError('O campo de senha deve ter no máximo 15 caracteres.');
        }

        if (username && password && username.length <= 15 && password.length <= 15) {
            try {
                setLoading(true)
                const response = await axios.post('https://djbnrrib9e.execute-api.us-east-2.amazonaws.com/v1/login', {
                    username,
                    password,
                });

                if (response.data) {
                    console.log(response.data)
                    window.localStorage.setItem('token', response.data.token)
                    setLoading(false)
                    navigate('/medication-list');

                } else {
                    setLoading(false)
                    console.log('Login failed');
                }
            } catch (error) {
                console.error('An error occurred:', error);
                setLoginError('Credenciais inválidas, tente novamente!')
            }
        }
    };

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/medication-list')
        }
    }, [isAuthenticated])


    return (
        <>
            <Header />
            <div className='wrapper--login'>
                <Card>
                    <div className='wrapper-title--login'>
                        Entrar
                    </div>
                    <div className='wrapper--username-input'>
                        <Input
                            label="Usuário"
                            placeholder="Digite o nome de usuário"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        {usernameError && <div className="error-text">{usernameError}</div>}
                    </div>
                    <div className='wrapper--password-input'>
                        <Input
                            label="Senha"
                            password
                            placeholder="Digite sua senha"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {passwordError && <div className="error-text">{passwordError}</div>}
                        {loginError && <div className="error-login">{loginError}</div>}
                    </div>
                    <Button primary onClick={handleLogin}>{loading ? (<CircularProgress color="inherit" size={16} />) : "Login"}</Button>
                </Card>
            </div>
        </>
    );
};

export default Login;
