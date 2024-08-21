import React, { useContext } from 'react'
import { ReactSVG } from 'react-svg'
import { StoreContext } from '../../../context/StoreContext'

import './Menu.scss'

import decorationLeft from '../../../assets/home/menu/home-menu-decoration-left.svg'
import decorationRight from '../../../assets/home/menu/home-menu-decoration-right.svg'

import { MenuCategory } from './MenuCategory'

export const Menu = ({ menuRef }) => {

    const { categories } = useContext(StoreContext)

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

            <div className="home__menu-categories">
                {categories.map(category => (
                    <MenuCategory
                        key={category._id}
                        title={category.title}
                        name={category.name}
                        subtitle={category.description}
                        primaryColor={category.primaryColor}
                        secondaryColor={category.secondaryColor}
                    />
                ))}
            </div>

        </div>
    )
}
