import React from 'react';
import './style.css';

export const Button = ({ children, onClick, primary, secondary }) => {
    return (
        <button className={primary ? 'primary--button' : secondary ? 'secondary--button' : 'danger--button'} onClick={onClick}>
            {children}
        </button>
    )
}