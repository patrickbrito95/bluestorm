import React from 'react';
import './style.css';

export const Card = ({ children }) => {
    return (
        <div className='wrapper-cards'>
            {children}
        </div>
    )
}