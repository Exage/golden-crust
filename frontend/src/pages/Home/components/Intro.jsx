import React from 'react'
import { useSearchParams } from 'react-router-dom'

import './Intro.scss'

import logo from '../../../assets/logo-white.svg'

export const Intro = ({ menuRef }) => {

    const handleExploreMenu = () => {
        if (menuRef) {
            const menuTop = menuRef.current.getBoundingClientRect().top - 140
            window.scrollBy({ top: menuTop, behavior: 'smooth' })
        }
    }

    return (
        <div className="intro">
            <div className="container">
                <div className="intro__wrapper">

                    <div className="intro__wrapper-logo">
                        <img src={logo} alt="Logo" />
                    </div>
                    <h1 className="intro__wrapper-title">
                        Welcome to Golden Crust Bakery!
                    </h1>
                    <p className="intro__wrapper-text">
                        Discover the warmth of freshly baked bread, the richness of buttery pastries, and the joy of handmade treats. Every bite tells a story of tradition, crafted with love and the finest ingredients. Come in, savor the flavors, and feel at home.
                    </p>
                    <div className="intro__wrapper-btn">
                        <button className="btn btn__white" onClick={handleExploreMenu}>Explore our menu</button>
                    </div>

                </div>
            </div>
        </div>
    )
}
