import React, { useEffect, useState } from 'react'
import { ReactSVG } from 'react-svg'
import { useLogout } from '../../hooks/useLogout'

import { Loader } from '../../components/Loader/Loader'

import './ConfirmLogout.scss'

import xmark from '../../assets/icons/xmark.svg'

export const ConfirmLogout = ({ showModal, setShowModal }) => {

    const { logout } = useLogout()

    const closeWindow = (Event) => {
        Event.preventDefault()
        setShowModal(false)
    }

    const stopPropagation = (Event) => {
        Event.stopPropagation()
    }

    useEffect(() => {
        if (showModal) {
            document.body.classList.add('noscroll')
        } else {
            document.body.classList.remove('noscroll')
        }
    }, [showModal])

    const handleSubmit = async (Event) => {
        Event.preventDefault()
        logout()
    }

    return (
        <div className={`modal__overlay${showModal ? ' open' : ''}`} onClick={closeWindow}>
            <div className="modal__overflow">
                <div className="container">
                    <div className="modal__content" onClick={stopPropagation}>

                        <button className="modal__close" onClick={closeWindow}>
                            <ReactSVG src={xmark} />
                        </button>

                        <h1 className="modal__title-normal">Log out?</h1>

                        <form className="auth__form" onSubmit={handleSubmit}>
                            <p className='auth__form-paragraph'>
                                Are you sure you want to log out of your account?
                            </p>
                            <div className="auth__form-btns">
                                <button type='submit' className="btn btn__red auth__form-btn">
                                    yes
                                </button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </div>
    )
}
