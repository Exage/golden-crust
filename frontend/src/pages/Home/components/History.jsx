import React from 'react'
import { Link } from 'react-router-dom'

import './History.scss'
import { Title } from '../../../components/Title/Title'

import photo from '../../../assets/home/history.jpg'

export const History = () => {
    return (
        <div className="home__history-wrapper">
            <div className='container'>
                <div className="home__history">
                    <div className="home__history-photo">
                        <img src={photo} alt="" />
                    </div>
                    <div className="home__history-text">

                        <Title>Our History</Title>

                        <p className='home__history-text__paragraph'>
                            Welcome to Golden Crust Bakery, where since 1976 we have been creating baked goods that bring warmth and comfort to every home. Our recipes are passed down from generation to generation, preserving the true taste of homemade pies, buns and desserts. We are proud to use only the best ingredients and delight you with fresh and aromatic products every day. Join our story, where tradition and quality come first.
                        </p>

                        <div className="home__history-text__btns">
                            <Link to='/aboutus' className="btn home__history-text__btn">
                                Learn More
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
