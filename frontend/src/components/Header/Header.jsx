import React, { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { ReactSVG } from 'react-svg'

import { useAuthContext } from '../../hooks/useAuthContext'
import { useCategoriesContext } from '../../hooks/useCategoriesContext'

import './Header.scss'

import { Loader } from '../Loader/Loader'

import logo from '../../assets/logo-white.svg'
import bars from '../../assets/icons/bars.svg'
import xmark from '../../assets/icons/xmark.svg'

export const Header = ({ setShowSignInModal, setShowSignUpModal }) => {

    const { user } = useAuthContext()
    const { categories, loading } = useCategoriesContext()

    const location = useLocation()

    const [burgerOpen, setBurgerOpen] = useState(false)

    useEffect(() => {
        setBurgerOpen(false)
    }, [location])

    useEffect(() => {
        if (burgerOpen) {
            document.body.classList.add('noscroll')
        } else {
            document.body.classList.remove('noscroll')
        }
    }, [burgerOpen])

    const handleMenuToggle = () => {
        setBurgerOpen(!burgerOpen)
    }

    const handleMenuClose = () => {
        setBurgerOpen(false)
    }

    const handleOpenSignInModal = () => {
        setShowSignInModal(true)
        setBurgerOpen(false)
    }

    const handleOpenSignUpModal = () => {
        setShowSignUpModal(true)
        setBurgerOpen(false)
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

                                                {loading && <Loader white={true} size={24} />}

                                                {categories && categories.map(item => (
                                                    <li key={item._id}>
                                                        <NavLink
                                                            to={`/category/${item.name}`}
                                                            className="header__nav-link__dropdown-menu__link"
                                                        >
                                                            {item.title}
                                                        </NavLink>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>

                                    <NavLink to='/location' className="header__nav-link">Location</NavLink>

                                </div>
                                <div className="header__nav-right">

                                    <NavLink to='/myorders' className="header__nav-link">My Orders</NavLink>
                                    <NavLink to='/bag' className="header__nav-link">Bag</NavLink>

                                    {user === 'guest' && (
                                        <div className="header__nav-link header__nav-link__dropdown">
                                            Account
                                            <div className="header__nav-link__dropdown-menu__wrapper">
                                                <ul className="header__nav-link__dropdown-menu">
                                                    <li>
                                                        <button
                                                            onClick={handleOpenSignInModal}
                                                            className="header__nav-link__dropdown-menu__link"
                                                        >
                                                            Sign In
                                                        </button>
                                                    </li>
                                                    <li>
                                                        <button
                                                            onClick={handleOpenSignUpModal}
                                                            className="header__nav-link__dropdown-menu__link"
                                                        >
                                                            Sign Up
                                                        </button>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    )}

                                    {user !== 'guest' && <NavLink to='/account' className="header__nav-link">Account</NavLink>}

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

            </div >
        </header >
    )
}
