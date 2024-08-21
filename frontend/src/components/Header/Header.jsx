import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { ReactSVG } from 'react-svg'

import './Header.scss'

import logo from '../../assets/logo-white.svg'
import bars from '../../assets/icons/bars.svg'
import xmark from '../../assets/icons/xmark.svg'

export const Header = ({ setShowSignInModal, setShowSignUpModal }) => {

    const [burgerOpen, setBurgerOpen] = useState(false)

    const handleMenuToggle = () => {
        setBurgerOpen(!burgerOpen)
    }

    const handleMenuClose = () => {
        setBurgerOpen(false)
    }

    const handleOpenSignInModal = () => {
        setShowSignInModal(true)
    }

    const handleOpenSignUpModal = () => {
        setShowSignUpModal(true)
    }

    return (
        <header className="header">
            <div className={`header__overlay${burgerOpen ? ' active' : ''}`} onClick={handleMenuClose}></div>
            <div className="header__wrapper">

                <div className="header__logo">
                    {/* <img src={logo} alt="Logo" /> */}
                    <ReactSVG src={logo} />
                </div>
                <div className="header__nav-wrapper">
                    <div className="header__nav-bg">
                        <div className={`header__nav-overflow${burgerOpen ? ' active' : ''}`}>
                            <nav className={`header__nav${burgerOpen ? ' active' : ''}`}>
                                <div className="header__nav-left">

                                    <NavLink to='/' className="header__nav-link">Home</NavLink>

                                    <div className="header__nav-link header__nav-link__dropdown">
                                        Menu
                                        <div className="header__nav-link__dropdown-menu__wrapper">
                                            <ul className="header__nav-link__dropdown-menu">
                                                <li>
                                                    <NavLink to='/menu/cookies' className="header__nav-link__dropdown-menu__link">Cookies</NavLink>
                                                </li>
                                                <li>
                                                    <NavLink to='/menu/donuts' className="header__nav-link__dropdown-menu__link">Donuts</NavLink>
                                                </li>
                                                <li>
                                                    <NavLink to='/menu/pizza' className="header__nav-link__dropdown-menu__link">Pizza</NavLink>
                                                </li>
                                                <li>
                                                    <NavLink to='/menu/cakes' className="header__nav-link__dropdown-menu__link">Cakes</NavLink>
                                                </li>
                                                <li>
                                                    <NavLink to='/menu' className="header__nav-link__dropdown-menu__link">Explore All</NavLink>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>

                                    <NavLink to='/location' className="header__nav-link">Location</NavLink>

                                </div>
                                <div className="header__nav-right">

                                    <NavLink to='/aboutus' className="header__nav-link">About Us</NavLink>
                                    <NavLink to='/bag' className="header__nav-link">Bag</NavLink>

                                    <div className="header__nav-link header__nav-link__dropdown">
                                        Account
                                        <div className="header__nav-link__dropdown-menu__wrapper">
                                            <ul className="header__nav-link__dropdown-menu">
                                                <li>
                                                    <button onClick={handleOpenSignInModal} className="header__nav-link__dropdown-menu__link">Sign&nbsp;In</button>
                                                </li>
                                                <li>
                                                    <button onClick={handleOpenSignUpModal} className="header__nav-link__dropdown-menu__link">Sign&nbsp;Up</button>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </nav>
                        </div>
                        <div className="header__nav-bars">
                            <div className="header__nav-link__icon" onClick={handleMenuToggle}>
                                {burgerOpen ? <ReactSVG src={xmark} /> : <ReactSVG src={bars} />}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </header>
    )
}
