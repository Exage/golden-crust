import React from 'react'
import { ReactSVG } from 'react-svg'
import { useAuthContext } from '../../../../hooks/useAuthContext'

import logoutIcon from '../../../../assets/icons/logout.svg'
import edit from '../../../../assets/icons/edit.svg'
import phone from '../../../../assets/icons/phone.svg'

export const Header = ({ setShowChangePhone, setShowLogout }) => {

    const { user } = useAuthContext()

    const handleOpenSetPhoneModal = () => {
        setShowChangePhone(true)
    }

    const handleOpenShowLogoutModal = () => {
        setShowLogout(true)
    }

    return (
        <>
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
                    <button className='account__btn' onClick={handleOpenShowLogoutModal}>
                        logout
                        <ReactSVG src={logoutIcon} className='icon' />
                    </button>
                </div>

            </div>
            <div className="account__item">
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
                        <h1 className="account__title account__title-phone icon">
                            <ReactSVG src={phone} className='icon' />
                            {user.phone}
                        </h1>
                        <div className="account__btns">
                            <button className='account__btn' onClick={handleOpenSetPhoneModal}>
                                <ReactSVG src={edit} className='icon' />
                            </button>
                        </div>
                    </>
                )}
            </div>
        </>
    )
}
