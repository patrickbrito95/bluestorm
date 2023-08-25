import React from 'react';

export const Select = ({ children, value, onChange }) => {
    return (
        <select value={value} onChange={onChange} className='wrapper--select'>
            {children}
        </select>
    )
}