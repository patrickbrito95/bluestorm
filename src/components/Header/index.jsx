import React from 'react';
import './style.css';
import { useNavigate } from "react-router-dom";
import Icon from '../Icon';
import logoImage from '../../assets/bluestorm.png'

export const Header = ({ isLogged }) => {
    const navigate = useNavigate();


    const logout = () => {
        window.localStorage.removeItem('token');
        navigate('/login')
        return
    }

    return (
        <div className='wrapper--header'>
            <div className='wrapper-left--header' onClick={() => navigate('/home')}><img src={logoImage} /></div>
            <div className="wrapper-right--header">
                <div className='wrapper-logout--header'>
                    {isLogged && (
                        <button className='button-logout--header' onClick={logout}>
                            <div className='text-logout--header'>
                                Sair
                            </div>
                            <Icon name="logout" />
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}