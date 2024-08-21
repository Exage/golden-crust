import React, { useState } from 'react'
import { ReactSVG } from 'react-svg'

import './InputPassword.scss'

import eye from '../../assets/icons/eye.svg'
import eyeSlash from '../../assets/icons/eye-slash.svg'

export const InputPassword = ({ placeholder, value, onChange, className, disabled=false }) => {

    const [showPassword, setShowPassword] = useState(false)

    const toggleShow = () => setShowPassword(!showPassword)

    return (
        <div className={`input__password-wrapper${className ? ` ${className}` : ''}`}>
            <input
                className='input input__password'
                
                type={showPassword ? 'text' : 'password'}
                
                placeholder={placeholder}

                value={value}
                onChange={onChange}
                
                disabled={disabled}
            />
            <button className='input__password-icon' onClick={toggleShow}>
                {showPassword ? <ReactSVG src={eye} /> : <ReactSVG src={eyeSlash} />}
            </button>
        </div>
    )
}