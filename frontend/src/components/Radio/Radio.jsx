import React from 'react'

import './Radio.scss'

export const Radio = ({ name, index, children, className = '', onChange, defaultValue, value }) => {
    return (
        <div className={`input__radio${className ? ` ${className}` : ''}`}>

            <input
                hidden
                type='radio'
                name={name}

                id={`radio-input-${index}`}
                checked={value === defaultValue ? true : false}

                value={defaultValue}
                onChange={onChange}
            />
            <div className="input__radio-label__wrapper">
                <label className="input__radio-label" htmlFor={`radio-input-${index}`}>
                    <div className="input__radio-icon"></div>
                    {children && <span className="input__radio-span">{children}</span>}
                </label>
            </div>

        </div>
    )
}
