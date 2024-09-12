import React, { useEffect, useState } from 'react'
import { ReactSVG } from 'react-svg'
import { useAddAddress } from '../../hooks/useAddAddress'

import { Loader } from '../../components/Loader/Loader'

import './SetAddress.scss'

import xmark from '../../assets/icons/xmark.svg'

export const SetAddress = ({ showModal, setShowModal }) => {

    const { addAddress, isLoading, error } = useAddAddress()

    const [streetField, setStreetField] = useState('')
    const [houseField, setHouseField] = useState('')
    const [flatField, setFlatField] = useState('')

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
        const response = await addAddress({ 
            street: streetField, 
            house: houseField, 
            flat: flatField
        })

        setStreetField('')
        setHouseField('')
        setFlatField('')

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

                        <h1 className="modal__title-normal">Add Address</h1>

                        <form className="auth__form" onSubmit={handleSubmit}>
                            <div className="auth__form-inputs">
                                <input
                                    type="text"
                                    placeholder='Street *'
                                    className="input input__white auth__form-input"

                                    value={streetField}
                                    onChange={Event => setStreetField(Event.target.value)}
                                    required
                                />
                                <input
                                    type="text"
                                    placeholder='House *'
                                    className="input input__white auth__form-input"

                                    value={houseField}
                                    onChange={Event => setHouseField(Event.target.value)}
                                    required
                                />
                                <input
                                    type="text"
                                    placeholder='Flat'
                                    className="input input__white auth__form-input"

                                    value={flatField}
                                    onChange={Event => setFlatField(Event.target.value)}
                                />
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
                            <div className="auth__form-bottom">
                                <p className='auth__form-paragraph'>
                                    * - required
                                </p>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </div>
    )
}
