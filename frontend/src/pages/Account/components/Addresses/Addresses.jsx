import React from 'react'
import { useAddressesContext } from '../../../../hooks/useAddressesContext'

import { Address } from '../Address/Address'
import { AddAddress } from '../AddAddress/AddAddress'

import './Addresses.scss'
import { Loader } from '../../../../components/Loader/Loader'

export const Addresses = ({ setShowSetAddress }) => {

    const { addresses, loading } = useAddressesContext()

    if (loading) {
        return (
            <div className="account__addresses">
                <div className="account__addresses-header">
                    <div className="account__addresses-title">My addresses</div>
                </div>
                <div className='account__addresses-items loading'>

                    <Loader />

                </div>
            </div>
        )
    }

    return (
        <div className="account__addresses">
            <div className="account__addresses-header">
                <div className="account__addresses-title">My addresses</div>
            </div>
            <div className={`account__addresses-items${addresses && addresses.length === 0 ? ' noitems' : ''}`}>

                {addresses && addresses.map(item => <Address key={item._id} data={item} />)}

                <AddAddress
                    setShowSetAddress={setShowSetAddress}
                />

            </div>
        </div>
    )
}
