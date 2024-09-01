import React from 'react'

import './Loader.scss'

export const Loader = ({ white = false, size = '' }) => {
    return (
        <div 
            className={`loader${white ? ' loader__white' : ''}`}
            style={{
                width: size,
                height: size
            }}
        ></div>
    )
}
