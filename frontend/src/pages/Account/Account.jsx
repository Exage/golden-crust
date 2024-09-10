import React, { useState } from 'react'
import { ReactSVG } from 'react-svg'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useLogout } from '../../hooks/useLogout'
import './Account.scss'

import { Title } from '../../components/Title/Title'
import { Loader } from '../../components/Loader/Loader'

import { ChangePhone } from '../../modals/ChangePhone/ChangePhone'

import logoutIcon from '../../assets/icons/logout.svg'
import edit from '../../assets/icons/edit.svg'

export const Account = () => {

    const [showChangePhone, setShowChangePhone] = useState(true)

    const { user, loading } = useAuthContext()
    const { logout } = useLogout()

    if (loading) {
        return (
            <div className="page__padding">
                <div className="account page">
                    <div className="container">

                        <Loader />

                    </div>
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
                        <div className="account__header">
                            <div className="account__item">
                                <h1 className="account__title">{user.name} {user.lastName}</h1>
                                <div className="account__btns">
                                    <button className='account__btn'>
                                        <ReactSVG src={edit} className='icon' />
                                    </button>
                                </div>
                            </div>
                            <div className="account__item">
                                <button className='account__btn' onClick={logout}>
                                    <ReactSVG src={logoutIcon} className='icon' />
                                </button>
                            </div>
                        </div>
                        <div className="account__item">
                            {!user.phone && (
                                <>
                                    <button className='btn'>Set your phone</button>
                                </>
                            )}
                            {user.phone && (
                                <>
                                    <h1 className="account__title">{user.name} {user.lastName}</h1>
                                    <div className="account__btns">
                                        <button className='account__btn'>
                                            <ReactSVG src={edit} className='icon' />
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                        <div className="account__addresses">
                            <div className="account__address"></div>
                        </div>
                    </div>

                </div>

                {user && <ChangePhone showChangePhone={showChangePhone} setShowChangePhone={setShowChangePhone} />}

            </div>
        </div>
    )
}
