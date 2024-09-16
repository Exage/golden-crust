import React, { useEffect, useState } from 'react'
import { ReactSVG } from 'react-svg'
import { useGoogleLogin } from '@react-oauth/google'

import './SignIn.scss'

import { useGoogleAuth } from '../../hooks/useGoogleAuth'
import { useLogin } from '../../hooks/useLogin'
import { Loader } from '../../components/Loader/Loader'

import xmark from '../../assets/icons/xmark.svg'
import google from '../../assets/icons/google.svg'

import { Title } from '../../components/Title/Title'
import { InputPassword } from '../../components/InputPassword/InputPassword'

export const SignIn = ({ showModal, setShowModal }) => {

    const { login, error: loginError, isLoading: loginLoading } = useLogin()
    const { googleAuth, error: googleError, isLoading: googleLoading } = useGoogleAuth()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [error, setError] = useState('')

    useEffect(() => {
        if (loginError || googleError) {
            setError(loginError || googleError)
        }
    }, [loginError, googleError])

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
        setError('')

        const data = await login(email.trim(), password.trim())

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

                        <Title className="title__white modal__title">Sign In</Title>

                        <form className="auth__form" onSubmit={handleSubmit}>
                            <div className="auth__form-inputs">
                                <input
                                    type="email"
                                    placeholder='Email'
                                    className="input input__white auth__form-input"

                                    disabled={loginLoading}

                                    value={email}
                                    onChange={Event => setEmail(Event.target.value)}
                                />
                                <InputPassword
                                    white={true}
                                    placeholder='Password'

                                    disabled={loginLoading}

                                    value={password}
                                    onChange={Event => setPassword(Event.target.value)}
                                />
                            </div>
                            <div className="auth__form-error">
                                {error && <div className="error">{error}</div>}
                            </div>
                            <hr className={`auth__form-hr${error ? " auth__form-hr__error" : ''}`} />
                            <div className="auth__form-btns">

                                <button
                                    type='submit'
                                    className="btn btn__white auth__form-btn"
                                    disabled={loginLoading}
                                >
                                    {loginLoading ? <Loader size={16} /> : 'Sign In'}
                                </button>

                                <button
                                    type='button'
                                    className="btn btn__white auth__form-btn auth__form-btn__google"
                                    onClick={handleGoogleAuth}
                                    disabled={loginLoading}
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
