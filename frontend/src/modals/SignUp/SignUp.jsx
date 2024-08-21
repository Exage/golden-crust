import React from 'react'
import { ReactSVG } from 'react-svg'

import './SignUp.scss'

import xmark from '../../assets/icons/xmark.svg'
import google from '../../assets/icons/google.svg'

import { Title } from '../../components/Title/Title'
import { InputPassword } from '../../components/UI/InputPassword'

export const SignUp = ({ showSignUpModal, setShowSignUpModal }) => {

    const closeWindow = (Event) => {
        Event.preventDefault()
        setShowSignUpModal(false)
    }

    const stopPropagation = (Event) => {
        Event.stopPropagation()
    }

    const handleSubmit = (Event) => {
        Event.preventDefault()
    }

    return (
        <div className={`modal__overlay${showSignUpModal ? ' open' : ''}`} onClick={closeWindow}>
            <div className="modal__overflow">
                <div className="container">
                    <div className="modal__content" onClick={stopPropagation}>

                        <button className="modal__close" onClick={closeWindow}>
                            <ReactSVG src={xmark} />
                        </button>

                        <Title className="title__white modal__title">Sign Up</Title>

                        <form className="auth__form" onSubmit={handleSubmit}>
                            <div className="auth__form-inputs">
                                <div className="auth__form-row">
                                    <input type="text" placeholder='Name' className="input auth__form-input" />
                                    <input type="text" placeholder='Last Name' className="input auth__form-input" />
                                </div>
                                <input type="text" placeholder='Email' className="input auth__form-input" />
                                {/* <input type="text" placeholder='Password' className="input auth__form-input" /> */}
                                <InputPassword placeholder='Password' />
                            </div>
                            <hr className="auth__form-hr" />
                            <div className="auth__form-btns">
                                <button className="btn btn__white auth__form-btn">Sign Up</button>
                                <button className="btn btn__white auth__form-btn auth__form-btn__google">
                                    <ReactSVG src={google} className="auth__form-btn__icon" />
                                    Continue with google
                                </button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </div>
    )
}
