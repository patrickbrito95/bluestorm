import React, { useState } from 'react';
import Icon from '../Icon';
import './style.css';


export const Input = ({ password, placeholder, value, onChange, label, type }) => {
    const [showPassword, setShowPassword] = useState(false)

    return (
        <div>
            {password ? (<>
                <label>{label}</label>
                <div className='wrapper-password--input'>
                    <input
                        className='password--input'
                        type={showPassword ? "text" : "password"}
                        placeholder={placeholder}
                        value={value}
                        onChange={onChange}
                    />
                    <button className='showpassword--button' onClick={() => setShowPassword(!showPassword)}><Icon name={showPassword ? "eye-close" : "eye-open"} /></button>
                </div>
            </>
            ) : (
                <div className='wrapper-text--input'>
                    <label>{label}</label>
                    <input
                        className='text--input'
                        type={type || "text"}
                        placeholder={placeholder}
                        value={value}
                        onChange={onChange}
                    />
                </div>
            )}
        </div>
    )
}