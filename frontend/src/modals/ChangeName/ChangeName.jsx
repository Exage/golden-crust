import React, { useEffect, useState } from 'react'
import { ReactSVG } from 'react-svg'
import { useSetName } from '../../hooks/useSetName'

import { Loader } from '../../components/Loader/Loader'

import './ChangeName.scss'

import xmark from '../../assets/icons/xmark.svg'

export const ChangeName = ({ showModal, setShowModal }) => {

    const { setName, isLoading, error } = useSetName()

    const [name, setNameField] = useState('')
    const [lastname, setLastnameField] = useState('')

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
        const response = await setName(name, lastname)

        setNameField('')
        setLastnameField('')

        if (response && response.success) {
            setShowModal(false)
        }
    }

    return (
        <div className={`modal__overlay${showModal ? ' open' : ''}`} onClick={closeWindow}>
            <div className="modal__overflow">
                <div className="container">
                    <div className="modal__content" onClick={stopPropagation}>

                        <button className="modal__close" onClick={closeWindow}>
                            <ReactSVG src={xmark} />
                        </button>

                        <h1 className="modal__title-normal">Set Name & Lastname</h1>

                        <form className="auth__form" onSubmit={handleSubmit}>
                            <div className="auth__form-inputs">
                                <div className="auth__form-row">
                                    <input
                                        type="text"
                                        placeholder='Name'
                                        className="input input__white auth__form-input"

                                        value={name}
                                        onChange={Event => setNameField(Event.target.value)}
                                    />
                                    <input
                                        type="text"
                                        placeholder='Last Name'
                                        className="input input__white auth__form-input"

                                        value={lastname}
                                        onChange={Event => setLastnameField(Event.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="auth__form-error">
                                {error && <div className="error">{error}</div>}
                            </div>
                            <hr className="auth__form-hr" />
                            <div className="auth__form-btns">
                                <button type='submit' className="btn btn__white auth__form-btn" disabled={isLoading}>
                                    {isLoading ? <Loader size={16} /> : 'submit'}
                                </button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </div>
    )
}
