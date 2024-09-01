import React, { useContext } from 'react'
import { ReactSVG } from 'react-svg'

import { useCategoriesContext } from '../../../hooks/useCategoriesContext'

import { Loader } from '../../../components/Loader/Loader'

import './Menu.scss'

import decorationLeft from '../../../assets/home/menu/home-menu-decoration-left.svg'
import decorationRight from '../../../assets/home/menu/home-menu-decoration-right.svg'

import { MenuCategory } from './MenuCategory'

export const Menu = ({ menuRef }) => {

    const { categories, loading } = useCategoriesContext()

    return (
        <div className="home__menu" ref={menuRef}>

            <div className="container">
                <div className="home__menu-header">
                    <h1 className="home__menu-header__title">
                        <ReactSVG src={decorationLeft} className="decoration" />
                        Menu
                        <ReactSVG src={decorationRight} className="decoration" />
                    </h1>
                </div>
            </div>

            {loading && (
                <div className="container">
                    <div className="home__menu-loader">
                        <Loader />
                    </div>
                </div>
            )}

            <div className="home__menu-categories">
                {categories && categories.map(category => (
                    <MenuCategory
                        key={category._id}
                        category={category}
                    />
                ))}
            </div>

        </div>
    )
}
