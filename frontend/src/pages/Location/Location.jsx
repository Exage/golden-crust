import React from 'react'

import './Location.scss'

import { Title } from '../../components/Title/Title'
import { Map } from './components/Map/Map'

export const Location = () => {
    return (
        <div className="page__padding">
            <div className="page location">
                <div className="container">
                    
                    <Title>
                        Our Location
                    </Title>

                    <div className="location__wrapper">

                        <Map />

                    </div>

                </div>
            </div>
        </div>
    )
}
