import React from 'react'
import { useRemoveAddress } from '../../../../hooks/useRemoveAddress'
import { ReactSVG } from 'react-svg'
import xmark from '../../../../assets/icons/xmark.svg'

import './Address.scss'

import { Loader } from '../../../../components/Loader/Loader'

export const Address = ({ data }) => {

    const { removeAddress, isLoading } = useRemoveAddress()
    const { street, flat, house } = data

    const handleRemoveAddress = async () => {
        await removeAddress(data._id)
    }

    return (
        <div className={`account__address${isLoading ? ' disabled' : ''}`}>

            <button
                className="account__address-delete"
                onClick={handleRemoveAddress}
            >
                {isLoading ? <Loader size={15} /> : <ReactSVG src={xmark} />}
            </button>

            <div className="account__address-main">
                <div className="account__address-main__item">
                    st. {street} {flat ? `${house}, flat ${flat}` : `${house}`}
                </div>
            </div>

        </div>
    )
}
