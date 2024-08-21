import React from 'react'
import { Link } from 'react-router-dom'

import './Header.scss'

export const Header = ({ primaryColor, title, name }) => {
    return (
        <div className="category__header" style={{ backgroundColor: primaryColor }}>
            <div className="container">
                <div className="category__header-title">{title}</div>
                <div className="category__header-path">
                    <Link to='/'>home</Link>&nbsp;/&nbsp;<Link to='/menu'>menu</Link>&nbsp;/&nbsp;{name}
                </div>
            </div>
        </div>
    )
}
