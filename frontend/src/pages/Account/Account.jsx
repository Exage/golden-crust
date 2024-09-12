import React, { useState } from 'react'
import { useAuthContext } from '../../hooks/useAuthContext'
import './Account.scss'

import { Title } from '../../components/Title/Title'
import { Loader } from '../../components/Loader/Loader'
import { Header } from './components/Header/Header'
import { Addresses } from './components/Addresses/Addresses'

import { ChangePhone } from '../../modals/ChangePhone/ChangePhone'
import { ConfirmLogout } from '../../modals/ConfirmLogout/ConfirmLogout'
import { ChangeName } from '../../modals/ChangeName/ChangeName'
import { SetAddress } from '../../modals/SetAddress/SetAddress'

export const Account = () => {

    const [showChangePhone, setShowChangePhone] = useState(false)
    const [showLogout, setShowLogout] = useState(false)
    const [showChangeName, setShowChangeName] = useState(false)
    const [showSetAddress, setShowSetAddress] = useState(false)

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
                            setShowChangeName={setShowChangeName}
                        />

                        <Addresses 
                            setShowSetAddress={setShowSetAddress}
                        />
                        
                    </div>

                </div>

                {user && <ChangePhone showModal={showChangePhone} setShowModal={setShowChangePhone} />}
                {user && <ConfirmLogout showModal={showLogout} setShowModal={setShowLogout} />}
                {user && <ChangeName showModal={showChangeName} setShowModal={setShowChangeName} />}
                {user && <SetAddress showModal={showSetAddress} setShowModal={setShowSetAddress} />}

            </div>
        </div>
    )
}
