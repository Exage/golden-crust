import React, { useRef } from 'react'

import './Home.scss'

import { Intro } from './components/Intro'
import { Menu } from './components/Menu'

export const Home = () => {

    const menuRef = useRef(null)

    return (
        <div className="home">
            <Intro menuRef={menuRef} />
            <Menu menuRef={menuRef} />
        </div>
    )
}
