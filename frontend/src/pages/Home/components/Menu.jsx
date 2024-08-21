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
        <div className="menu" ref={menuRef}>

            <div className="container">
                <div className="menu__header">
                    <h1 className="menu__header-title">
                        <ReactSVG src={decorationLeft} className="menu__header-title__decoration menu__header-title__decoration-left" />
                        Menu
                        <ReactSVG src={decorationRight} className="menu__header-title__decoration menu__header-title__decoration-right" />
                    </h1>
                </div>
            </div>

            <div className="menu__categories">
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
