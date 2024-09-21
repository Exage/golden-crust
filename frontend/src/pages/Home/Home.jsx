import React, { useEffect, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'

import './Home.scss'

import { Intro } from './components/Intro'
import { Menu } from './components/Menu'
import { History } from './components/History'

export const Home = () => {

    const menuRef = useRef(null)
    const [searchParams] = useSearchParams()

    useEffect(() => {
        if (searchParams.get('section')) {
            const target = document.querySelector(`[data-section="${searchParams.get('section')}"]`)

            if (target) {
                const top = target.getBoundingClientRect().top - 120
                const behavior = 'smooth'

                window.scrollBy({ top, behavior })
            }
        }
    }, [searchParams])

    return (
        <div className="home">
            <Intro menuRef={menuRef} />
            <History />
            <Menu menuRef={menuRef} />
        </div>
    )
}
