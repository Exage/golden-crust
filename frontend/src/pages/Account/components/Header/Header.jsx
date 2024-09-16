import React from 'react'
import { ReactSVG } from 'react-svg'
import { useAuthContext } from '../../../../hooks/useAuthContext'

import './Header.scss'

import logoutIcon from '../../../../assets/icons/logout.svg'
import edit from '../../../../assets/icons/edit.svg'
import phone from '../../../../assets/icons/phone.svg'

export const Header = ({ setShowChangePhone, setShowLogout, setShowChangeName }) => {

    const { user } = useAuthContext()

    const handleOpenSetPhoneModal = () => {
        setShowChangePhone(true)
    }

    const handleOpenShowLogoutModal = () => {
        setShowLogout(true)
    }

    const handleOpenSetChangeName = () => {
        setShowChangeName(true)
    }

    return (
        <>
            <div className="account__header">

                <div className="account__header-item">
                    <h1 className="account__header-title">{user.name} {user.lastName}</h1>
                    <div className="account__header-btns">
                        <button className='account__header-btn' onClick={handleOpenSetChangeName}>
                            <ReactSVG src={edit} className='icon' />
                        </button>
                    </div>
                </div>

                <div className="account__header-item account__header-logout">
                    <button className='account__header-btn' onClick={handleOpenShowLogoutModal}>
                        Log out
                        <ReactSVG src={logoutIcon} className='icon' />
                    </button>
                </div>

            </div>
            <div className="account__header-item">
                {!user.phone && (
                    <span>
                        <button
                            className='link'
                            onClick={handleOpenSetPhoneModal}
                        >
                            Enter
                        </button>
                        &nbsp;your phone number for further purchases
                    </span>
                )}
                {user.phone && (
                    <>
                        <h1 className="account__header-title account__header-title-phone icon">
                            <ReactSVG src={phone} className='icon' />
                            {user.phone}
                        </h1>
                        <div className="account__header-btns">
                            <button className='account__header-btn' onClick={handleOpenSetPhoneModal}>
                                <ReactSVG src={edit} className='icon' />
                            </button>
                        </div>
                    </>
                )}
            </div>

            <div className="account__header-item account__header-logout__response">
                <button className='account__header-btn' onClick={handleOpenShowLogoutModal}>
                    Log out
                    <ReactSVG src={logoutIcon} className='icon' />
                </button>
            </div>
        </>
    )
}
