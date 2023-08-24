import React from 'react';
import './style.css';
import { useNavigate } from "react-router-dom";
import Icon from '../Icon';

export const Header = ({ isLogged }) => {
    const navigate = useNavigate();


    const logout = () => {
        window.localStorage.removeItem('token');
        navigate('/login')
        return
    }

    return (
        <div className='wrapper--header'>
            <div className='wrapper-left--header'>Bluestorm</div>
            <div className="wrapper-right--header">
                <div className='wrapper-logout--header'>
                    {isLogged && (
                        <button className='button-logout--header' onClick={logout}>
                            <Icon name="logout" />
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}