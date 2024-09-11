import React, { useEffect, useState } from 'react'
import { ReactSVG } from 'react-svg'
import { useSetPhone } from '../../hooks/useSetPhone' 

import { Loader } from '../../components/Loader/Loader'

import './ChangePhone.scss'

import xmark from '../../assets/icons/xmark.svg'

export const ChangePhone = ({ showChangePhone, setShowChangePhone }) => {

    const { setPhone, isLoading, error } = useSetPhone()

    const [phoneField, setPhoneField] = useState('')

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
        const response = await setPhone(phoneField)

        if (response && response.success) {
            setShowChangePhone(false)
            setPhoneField('')
        }
    }

    return (
        <div className={`modal__overlay${showChangePhone ? ' open' : ''}`} onClick={closeWindow}>
            <div className="modal__overflow">
                <div className="container">
                    <div className="modal__content" onClick={stopPropagation}>

                        <button className="modal__close" onClick={closeWindow}>
                            <ReactSVG src={xmark} />
                        </button>

                        <h1 className="modal__title-normal">Set New Phone</h1>

                        <form className="auth__form" onSubmit={handleSubmit}>
                            <div className="auth__form-inputs">
                                <input
                                    type="text"
                                    placeholder='New Phone Number'
                                    className="input input__white auth__form-input"

                                    value={phoneField}
                                    onChange={Event => setPhoneField(Event.target.value)}
                                />
                            </div>
                            <div className="auth__form-error">
                                {error && <div className="error">{error}</div>}
                            </div>
                            <hr className="auth__form-hr" />
                            <div className="auth__form-btns">
                                <button type='submit' className="btn btn__white auth__form-btn" disabled={isLoading}>
                                    {isLoading ? <Loader size={16} /> : 'Update phone number'}
                                </button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </div>
    )
}
