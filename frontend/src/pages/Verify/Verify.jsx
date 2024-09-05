import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSearchParams } from 'react-router-dom'
import { useVerifyPayment } from '../../hooks/useVerifyPayment'
import { useOrdersContext } from '../../hooks/useOrdersContext'

import './Verify.scss'
import { Loader } from '../../components/Loader/Loader'

import { Success } from './components/Success'
import { Failed } from './components/Failed'

export const Verify = () => {
    const [searchParams, _] = useSearchParams()
    const { verifyPayment, isLoading } = useVerifyPayment()
    const { dispatch } = useOrdersContext()

    const success = searchParams.get('success')
    const orderId = searchParams.get('orderId')

    const navigate = useNavigate()

    const handleVerifyPayment = async () => {
        const response = await verifyPayment(orderId, success)

        if (response.success) {
            navigate('/myorders')
        } else {
            navigate('/')
        }
    }

    useEffect(() => {
        handleVerifyPayment()
    }, [])

    if (isLoading) {
        return (
            <div className="page__padding page__loading">
                <div className="verify__loader">
                    <Loader />
                    <h1 className='verify__loader-title'>Your order is being processed</h1>
                </div>
            </div>
        )
    }

    return (
        <div className="page__padding">
            <div className="page verifyorder">
                {success === 'true' ? <Success /> : <Failed />}
            </div>
        </div>
    )
}

