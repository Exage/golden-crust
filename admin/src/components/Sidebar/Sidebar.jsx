import React from 'react'
import { NavLink } from 'react-router-dom'

import './Sidebar.scss'

export const Sidebar = () => {
    return (
        <div className="sidebar">
            <NavLink to='/' className='sidebar__link'>Users</NavLink>
            <NavLink to='/categories' className='sidebar__link'>Categories</NavLink>
            <NavLink to='/products' className='sidebar__link'>Products</NavLink>
        </div>
    )
}
