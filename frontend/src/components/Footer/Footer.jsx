import React from 'react'
import { Link } from 'react-router-dom'

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
                            <a href="tel:+123456789" className="footer__inner-column__link">+123 456 789</a>
                            <a href="tel:+123456789" className="footer__inner-column__link">+123 456 789</a>
                            <a href="https://maps.app.goo.gl/S7D1tZYZ3eEmKBbr6" className="footer__inner-column__link" target='_blank'>st. Molodogvardeyskaya 1</a>
                            <a href="mailto:goldencrust@gmail.com" className="footer__inner-column__link">goldencrust@gmail.com</a>
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
