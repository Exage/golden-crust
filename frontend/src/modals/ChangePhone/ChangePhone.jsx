import React, { useEffect, useState } from 'react'
import { ReactSVG } from 'react-svg'

import { Title } from '../../components/Title/Title'
import { Loader } from '../../components/Loader/Loader'

import './ChangePhone.scss'

import xmark from '../../assets/icons/xmark.svg'

export const ChangePhone = ({ showChangePhone, setShowChangePhone }) => {

    const [phone, setPhone] = useState('')

    const closeWindow = (Event) => {
        Event.preventDefault()
        setShowChangePhone(false)
    }

    const stopPropagation = (Event) => {
        Event.stopPropagation()
    }

    useEffect(() => {
        if (showChangePhone) {
            document.body.classList.add('noscroll')
        } else {
            document.body.classList.remove('noscroll')
        }
    }, [showChangePhone])

    const handleSubmit = async (Event) => {
        Event.preventDefault()
    }

    return (
        <div className={`modal__overlay${showChangePhone ? ' open' : ''}`} onClick={closeWindow}>
            <div className="modal__overflow">
                <div className="container">
                    <div className="modal__content" onClick={stopPropagation}>

                        <button className="modal__close" onClick={closeWindow}>
                            <ReactSVG src={xmark} />
                        </button>

                        <h1 className="modal__title-normal">Change Phone</h1>

                        <form className="auth__form" onSubmit={handleSubmit}>
                            <div className="auth__form-inputs">
                                <input
                                    type="text"
                                    placeholder='Name'
                                    className="input input__white auth__form-input"

                                    value={phone}
                                    onChange={Event => setPhone(Event.target.value)}
                                />
                            </div>
                            {/* <div className="auth__form-error">
                                {error && <div className="error">{error}</div>}
                            </div>
                            <hr className="auth__form-hr" />
                            <div className="auth__form-btns">
                                <button type='submit' className="btn btn__white auth__form-btn" disabled={isLoading}>
                                    {isLoading ? <Loader size={16} /> : 'Sign Up'}
                                </button>
                                <button type='button' className="btn btn__white auth__form-btn auth__form-btn__google" disabled={isLoading}>
                                    <ReactSVG src={google} className="auth__form-btn__icon" />
                                    Continue with google
                                </button>
                            </div> */}
                        </form>

                    </div>
                </div>
            </div>
        </div>
    )
}
