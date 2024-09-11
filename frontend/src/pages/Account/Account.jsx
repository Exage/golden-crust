import React, { useState } from 'react'
import { useAuthContext } from '../../hooks/useAuthContext'
import './Account.scss'

import { Title } from '../../components/Title/Title'
import { Loader } from '../../components/Loader/Loader'
import { Header } from './components/Header/Header'

import { ChangePhone } from '../../modals/ChangePhone/ChangePhone'
import { ConfirmLogout } from '../../modals/ConfirmLogout/ConfirmLogout'

export const Account = () => {

    const [showChangePhone, setShowChangePhone] = useState(false)
    const [showLogout, setShowLogout] = useState(false)

    const { user, loading } = useAuthContext()

    if (loading) {
        return (
            <div className="page__padding">
                <div className="account page loading">

                    <Loader />

                </div>
            </div>
        )
    }

    return (
        <div className="page__padding">
            <div className="account page">
                <div className="container">

                    <Title>Account</Title>

                    <div className="account__wrapper">

                        <Header
                            setShowChangePhone={setShowChangePhone}
                            setShowLogout={setShowLogout}
                        />

                        <div className="account__addresses">
                            <div className="account__address"></div>
                        </div>
                    </div>

                </div>

                {user && <ChangePhone showChangePhone={showChangePhone} setShowChangePhone={setShowChangePhone} />}
                {user && <ConfirmLogout showLogout={showLogout} setShowLogout={setShowLogout} />}

            </div>
        </div>
    )
}
