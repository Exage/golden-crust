import React from 'react'

import { Loader } from '../../components/Loader/Loader'

import './Menu.scss'

import { Title } from '../../components/Title/Title'

export const Menu = () => {
    return (
        <div className="page__padding">
            <div className="page menu">
                <div className="container">
                    <Title>Menu</Title>
                </div>
            </div>
        </div>
    )
}
