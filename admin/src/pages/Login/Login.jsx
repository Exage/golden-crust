import React, { useState } from 'react'
import { useLogin } from '../../hooks/useLogin'

import { InputPassword } from '../../components/UI/InputPassword/InputPassword'

export const Login = () => {
    
    const { login, error, isLoading } = useLogin()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (Event) => {
        Event.preventDefault()
        await login(email, password)
    }

    return (
        <div className="auth__page">
            <div className="auth">
                <div className="auth__title">Sign In</div>
                <form className="auth__form" onSubmit={handleSubmit}>
                    <div className="auth__form-inputs">
                        <input 
                            type="text" 
                            placeholder='Email' 
                            className="input auth__form-input"
                            
                            value={email}
                            onChange={Event => setEmail(Event.target.value)}
                        />
                        <InputPassword 
                            placeholder='Password'
                            
                            value={password}
                            onChange={Event => setPassword(Event.target.value)}
                        />
                    </div>
                    <hr className="auth__form-hr" />
                    <div className="auth__form-btns">
                        <button className="btn auth__form-btn">
                            {isLoading ? 'Loading...' : "Sign In"}
                        </button>
                    </div>
                    {error && <div className="error">{error}</div>}
                </form>
            </div>
        </div>
    )
}
