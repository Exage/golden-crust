import React, { useEffect, useState } from 'react'
import { ReactSVG } from 'react-svg'
import { GoogleLogin } from '@react-oauth/google'
import { useGoogleLogin } from '@react-oauth/google'

import { useAuthContext } from '../../hooks/useAuthContext'
import { useLogin } from '../../hooks/useLogin'
import { Loader } from '../../components/Loader/Loader'

import './SignIn.scss'

import xmark from '../../assets/icons/xmark.svg'
import google from '../../assets/icons/google.svg'

import { Title } from '../../components/Title/Title'
import { InputPassword } from '../../components/InputPassword/InputPassword'

export const SignIn = ({ showModal, setShowModal }) => {

    const { login, error, isLoading } = useLogin()
    const { user } = useAuthContext()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => {
        if (showModal) {
            document.body.classList.add('noscroll')
        } else {
            document.body.classList.remove('noscroll')
        }
    }, [showModal])

    // const googleAuth = useGoogleLogin({
    //     onSuccess: async (response) => {

    //         console.log(response)

    //         const data = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo`, {
    //             headers: {
    //                 'Authorization': `Bearer ${response.access_token}`
    //             }
    //         })
    //         const json = await data.json()

    //         console.log(json)
    //     }
    // })
    // const googleAuth = () => {
    //     const clientId = import.meta.env.VITE_API_URL
    //     const redirectUri = import.meta.env.VITE_REDIRECT_URI
    //     const scope = 'https://www.googleapis.com/auth/userinfo.profile'
    //     const responseType = 'code'

    //     const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?response_type=${responseType}&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`

    //     window.location.href = authUrl
    // }

    const closeWindow = (Event) => {
        Event.preventDefault()
        setShowModal(false)
    }

    const stopPropagation = (Event) => {
        Event.stopPropagation()
    }

    const handleSubmit = async (Event) => {
        Event.preventDefault()

        const data = await login(email.trim(), password.trim())

        if (data) {
            if (data.success) {
                setShowModal(false)
            }
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

                                    value={email}
                                    onChange={Event => setEmail(Event.target.value)}
                                />
                                <InputPassword
                                    white={true}
                                    placeholder='Password'

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
                                    disabled={isLoading}
                                >
                                    {isLoading ? <Loader size={16} /> : 'Sign In'}
                                </button>

                                <button
                                    type='button'
                                    className="btn btn__white auth__form-btn auth__form-btn__google"
                                    disabled={isLoading}
                                    onClick={() => console.log('Google Auth!')}
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
