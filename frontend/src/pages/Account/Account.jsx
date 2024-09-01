import React from 'react'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useLogout } from '../../hooks/useLogout'
import './Account.scss'

import { Title } from '../../components/Title/Title'
import { Loader } from '../../components/Loader/Loader'

export const Account = () => {

    const { user, loading } = useAuthContext()
    const { logout } = useLogout()

    return (
        <div className="page__padding">
            <div className="account page">
                <div className="container">
                    <div className="account__loader">
                        {loading && <Loader />}
                    </div>
                    {user && (
                        <Title>
                            Hi, {user.name}
                        </Title>
                    )}
                    <div className="account__bottom">
                        <button className="btn" onClick={logout}>Log out</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
