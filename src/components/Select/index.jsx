import React from 'react';
import './style.css';

export const Select = ({ children, value, onChange, label }) => {
    return (
        <div className='wrapper-select'>
            {label && (
                <label>{label}</label>
            )}
            <select value={value} onChange={onChange} className='select'>
                {children}
            </select>
        </div>
    )
}