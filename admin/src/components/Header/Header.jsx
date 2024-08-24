import React, { useState, useEffect, useRef } from 'react'
import { NavLink } from 'react-router-dom'
import { ReactSVG } from 'react-svg'

import './Header.scss'

import logo from '../../assets/logo-white.svg'
import logout from '../../assets/icons/logout.svg'

export const Header = () => {

    const [showConfirmation, setShowConfirmation] = useState(false)

    return (
        <header className="header">
            <div className="container">
                <div className="header__inner">
                    <div className="header__top">
                        <div className="header__logo">
                            <a href={import.meta.env.VITE_HOME_URL} target='_blank'>
                                <img src={logo} alt="Golden Crust" className="header__logo-icon" />
                            </a>
                            <h1 className="header__logo-label">Admin Panel</h1>
                        </div>

                        <div className="header__user">
                            <h1 className="header__user-label">User 111</h1>
                            <button className="header__user-icon">
                                <ReactSVG src={logout} onClick={() => setShowConfirmation(!showConfirmation)} />

                                {showConfirmation && (
                                    <div className="header__user-confirmation">
                                        <button className='btn btn__white header__user-confirmation__btn'>
                                            Yes
                                        </button>
                                        <button className='btn btn__white header__user-confirmation__btn' onClick={() => setShowConfirmation(false)}>
                                            No
                                        </button>
                                    </div>
                                )}

                            </button>
                        </div>
                    </div>
                    <div className="header__nav">
                        <div className="header__nav-links">
                            <NavLink to='/' className='header__nav-link'>users</NavLink>
                            <NavLink to='/orders' className='header__nav-link'>orders</NavLink>
                            <NavLink to='/categories' className='header__nav-link'>categories</NavLink>
                            <NavLink to='/products' className='header__nav-link'>products</NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}
