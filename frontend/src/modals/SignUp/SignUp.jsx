import React, { useEffect, useState } from 'react'
import { ReactSVG } from 'react-svg'
import { useGoogleLogin } from '@react-oauth/google'

import './SignUp.scss'

import { useGoogleAuth } from '../../hooks/useGoogleAuth'
import { useSignup } from '../../hooks/useSignup'
import { Loader } from '../../components/Loader/Loader'

import xmark from '../../assets/icons/xmark.svg'
import google from '../../assets/icons/google.svg'

import { Title } from '../../components/Title/Title'
import { InputPassword } from '../../components/InputPassword/InputPassword'

export const SignUp = ({ showModal, setShowModal }) => {

    const { signup, error: signupError, isLoading: signupLoading } = useSignup()
    const { googleAuth, error: googleError, isLoading: googleLoading } = useGoogleAuth()

    const [name, setName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [error, setError] = useState('')

    useEffect(() => {
        if (signupError || googleError) {
            setError(signupError || googleError)
        }
    }, [signupError, googleError])

    // Handle Google
    const loginWithGoogle = useGoogleLogin({
        onSuccess: async tokenResponse => {
            try {
                const { access_token } = tokenResponse
                const data = await googleAuth(access_token)

                if (data && data.success) {
                    setShowModal(false)
                }
            } catch (error) {
                setError(error.message)
                console.error('Error fetching user info:', error)
            }
        },
        onError: error => {
            setError(error)
            console.error('Login Failed:', error)
        }
    })

    const handleGoogleAuth = () => {
        setError('')
        loginWithGoogle()
    }

    // Handle modal interaction
    useEffect(() => {
        if (showModal) {
            document.body.classList.add('noscroll')
        } else {
            document.body.classList.remove('noscroll')
        }
    }, [showModal])

    const closeWindow = (Event) => {
        Event.preventDefault()
        setShowModal(false)
        setError('')
    }

    const stopPropagation = (Event) => {
        Event.stopPropagation()
    }

    const handleSubmit = async (Event) => {
        Event.preventDefault()

        const data = await signup(name.trim(), lastName.trim(), email.trim(), password.trim())

        if (data && data.success) {
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

                        <Title className="title__white modal__title">Sign Up</Title>

                        <form className="auth__form" onSubmit={handleSubmit}>
                            <div className="auth__form-inputs">
                                <div className="auth__form-row">
                                    <input
                                        type="text"
                                        placeholder='Name'
                                        className="input input__white auth__form-input"

                                        disabled={signupLoading}

                                        value={name}
                                        onChange={Event => setName(Event.target.value)}
                                    />
                                    <input
                                        type="text"
                                        placeholder='Last Name'
                                        className="input input__white auth__form-input"

                                        disabled={signupLoading}

                                        value={lastName}
                                        onChange={Event => setLastName(Event.target.value)}
                                    />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Email"
                                    className="input input__white auth__form-input"

                                    disabled={signupLoading}

                                    value={email}
                                    onChange={Event => setEmail(Event.target.value)}
                                />
                                <InputPassword
                                    white={true}
                                    placeholder='Password'

                                    disabled={signupLoading}

                                    value={password}
                                    onChange={Event => setPassword(Event.target.value)}
                                />
                            </div>
                            <div className="auth__form-error">
                                {error && <div className="error">{error}</div>}
                            </div>
                            <hr className="auth__form-hr" />
                            <div className="auth__form-btns">

                                <button type='submit' className="btn btn__white auth__form-btn" disabled={signupLoading}>
                                    {signupLoading ? <Loader size={16} /> : 'Sign Up'}
                                </button>

                                <button 
                                    type='button' 
                                    className="btn btn__white auth__form-btn auth__form-btn__google" 
                                    disabled={signupLoading}
                                    onClick={handleGoogleAuth}
                                >
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
