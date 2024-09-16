import React from 'react'

import './PrivacyPolicy.scss'

import { Title } from '../../components/Title/Title'

export const PrivacyPolicy = () => {
    return (
        <div className="page__padding">
            <div className="privacy page">
                <div className="container">

                    <Title>Privacy Policy</Title>

                    <div className="privacy__wrapper">

                        <p>Welcome to Golden Crust Bakery. This privacy policy explains how we collect, use, and protect your personal data.</p>

                        <div className="privacy__block">
                            <h3 className='privacy__title'>1. Information Collection</h3>
                            <p className='privacy__paragraph'>
                                We collect information that you provide when placing an order, subscribing to our newsletter, or otherwise interacting with our site. This information may include your name, email address, delivery address, and phone number.
                            </p>
                        </div>

                        <div className="privacy__block">
                            <h3 className='privacy__title'>2. Use of Information</h3>
                            <p className='privacy__paragraph'>
                                We use the collected data to process your orders, improve our services, and send you information about new products and promotions. We may also use your data for statistical research to better understand our customers' needs.
                            </p>
                        </div>

                        <div className="privacy__block">
                            <h3 className='privacy__title'>3. Information Protection</h3>
                            <p className='privacy__paragraph'>
                                We take all necessary measures to protect your personal data from unauthorized access, use, or disclosure. We use modern technology and secure servers to store and process your data.
                            </p>
                        </div>

                        <div className="privacy__block">
                            <h3 className='privacy__title'>4. Disclosure of Information</h3>
                            <p className='privacy__paragraph'>
                                We will not disclose your personal data to third parties without your consent, except as required by law or necessary to fulfill your orders (e.g., providing data to a courier service).
                            </p>
                        </div>

                        <div className="privacy__block">
                            <h3 className='privacy__title'>5. Changes to the Policy</h3>
                            <p className='privacy__paragraph'>
                                We reserve the right to make changes to our privacy policy at any time. Any changes will be posted on this page, and we encourage you to check this page periodically for updates.
                            </p>
                        </div>

                        <div className="privacy__block">
                            <h3 className='privacy__title'>6. Contact Information</h3>
                            <p className='privacy__paragraph'>
                            If you have any questions or comments about our privacy policy, please contact us at <a className='link' href="mailto:goldencrust@gmail.com">goldencrust@gmail.com</a>
                            </p>
                        </div>

                    </div>

                </div>

            </div>
        </div>
    )
}
