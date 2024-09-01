import React from 'react'
import { Link } from 'react-router-dom'
import { contacts } from '../../config/contacts'

import './Footer.scss'

import logo from '../../assets/logo-white.svg'
import telegram from '../../assets/icons/telegram.svg'
import facebook from '../../assets/icons/facebook.svg'
import instagram from '../../assets/icons/instagram.svg'

export const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer__inner">

                    <div className="footer__inner-columns">
                        <div className="footer__inner-column">
                            <h1 className="footer__inner-column__title">Company</h1>
                            <Link to='/' className="footer__inner-column__link">Home</Link>
                            <Link to='/menu' className="footer__inner-column__link">Menu</Link>
                            <Link to='/aboutus' className="footer__inner-column__link">About Us</Link>
                            <Link to='/location' className="footer__inner-column__link">Location</Link>
                            <Link to='/privacypolicy' className="footer__inner-column__link">Privacy Policy</Link>
                        </div>
                        <div className="footer__inner-column">
                            <h1 className="footer__inner-column__title">Get in touch</h1>

                            {contacts.map((item, index) => {
                                let data = item.link.trim()
                                let type = ''

                                if (item.type === 'email') {
                                    type = 'mailto:'
                                } else if (item.type === 'phone') {
                                    type = 'tel:'
                                    data = `${data.slice(0, 4)} (${data.slice(4, 6)}) ${data.slice(6, 9)}-${data.slice(9, 11)}-${data.slice(11)}`
                                } else {
                                    type = ''
                                }

                                return (
                                    <a 
                                        key={index}
                                        href={`${type}${item.link}`} 
                                        className="footer__inner-column__link"
                                        target={`${item.blank ? '_blank' : '_self'}`}
                                    >
                                        {item.display ? item.display : data}
                                    </a>
                                )
                            })}
                        </div>
                    </div>

                    <div className="footer__inner-info">
                        <div className="footer__inner-logo">
                            <img src={logo} alt="Golden Crust" />
                        </div>
                        <div className="footer__inner-social">
                            <a href="#" className="footer__inner-social__link" target='_blank'>
                                <img src={telegram} alt="telegram" />
                            </a>
                            <a href="#" className="footer__inner-social__link" target='_blank'>
                                <img src={facebook} alt="telegram" />
                            </a>
                            <a href="#" className="footer__inner-social__link" target='_blank'>
                                <img src={instagram} alt="telegram" />
                            </a>
                        </div>
                    </div>

                </div>

                <div className="footer__bottom">
                    Copyright 2024 © All Right Reserved.
                </div>

            </div>
        </footer>
    )
}
