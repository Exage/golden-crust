import React from 'react'
import { ReactSVG } from 'react-svg'

import './Title.scss'

import decorationLeft from '../../assets/title/title-decoration-left.svg'
import decorationRight from '../../assets/title/title-decoration-right.svg'

export const Title = ({ children, className = '' }) => {
    return (
        <div className={`title${className ? ' ' + className : ''}`}>
            <div className="title__decoration title__decoration-left">
                <ReactSVG src={decorationLeft} />
            </div>
            <div className="title__text">
                {children}
                <div className="title__text-stroke">
                    {children}
                </div>
            </div>
            <div className="title__decoration title__decoration-right">
                <ReactSVG src={decorationRight} />
            </div>
        </div>
    )
}
