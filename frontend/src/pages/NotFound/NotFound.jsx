import React from 'react'
import { Link } from 'react-router-dom'

import './NotFound.scss'

export const NotFound = () => {
    return (
        <div className="notfound page__padding">
            <div className="container">
                <div className="notfound__text">
                    <h1 className="notfound__text-title">
                        Oops!
                    </h1>
                    <p className="notfound__text-paragraph">
                        The page you are looking for was not found.
                    </p>
                    <div className="notfound__text-btns">
                        <Link to='/' className='btn'>to home</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
