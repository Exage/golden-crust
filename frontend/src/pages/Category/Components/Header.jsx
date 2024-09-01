import React from 'react'
import { Link } from 'react-router-dom'

import { Loader } from '../../../components/Loader/Loader'
import { useCategoriesContext } from '../../../hooks/useCategoriesContext'

import './Header.scss'

export const Header = ({ category }) => {

    const { loading } = useCategoriesContext()

    return (
        <div className="category__header page__padding" style={{ backgroundColor: category && category.primaryColor }}>
            <div className="container">
                <div className="category__header-title">
                    {loading ? <Loader white={true} size={41} /> : category.title}
                </div>
                <div className="category__header-path">
                    {category && (
                        <>
                            <Link to='/'>home</Link> &nbsp;/&nbsp;<Link to='/menu'>menu</Link>&nbsp;/&nbsp;{category.name}
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}
