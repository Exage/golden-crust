import React from 'react'

import { Loader } from '../../components/Loader/Loader'

import './Menu.scss'

import { Title } from '../../components/Title/Title'

export const Menu = () => {
    return (
        <div className="menu page__padding">
            <Title>Menu</Title>
            <button type='submit' className="btn auth__form-btn">
                {true ? <Loader size={16} /> : 'Sign In'}
            </button>
        </div>
    )
}
