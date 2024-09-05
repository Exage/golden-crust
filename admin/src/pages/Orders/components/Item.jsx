import React, { useState, useEffect } from 'react'
import { usePatchStatus } from '../../../hooks/usePatchStatus'

const deliveryStatuses = {
    delivery: [
        'preparing for deliver',
        'on the way',
        'ready to receive',
    ]
}

export const Item = ({ data }) => {

    const [status, setStatus] = useState(data.status)

    const [showEdit, setShowEdit] = useState(false)
    const [showMore, setShowMore] = useState(false)
    const [showPatchInfo, setShowPatchInfo] = useState(false)

    const { patchStatus, isLoading: patchLoading, error: patchError, success } = usePatchStatus()

    useEffect(() => {
        if (success) {
            setTimeout(() => {
                setShowPatchInfo(false)
            }, 2000)
        }
    }, [success])

    const handleSubmit = (Event) => {
        Event.preventDefault()
    }

    const handlePatchOrder = async () => {
        await patchStatus(data._id, status)
        setShowEdit(false)
        setShowMore(false)
        setShowPatchInfo(true)
    }

    const handleToggleEdit = () => {
        setShowEdit(!showEdit)
    }

    return (
        <div className="page__item" data-id={data._id}>
            <div className="page__item-preview">
                <form className={`page__item-columns orders${showEdit ? ' isedit' : ''}`} onSubmit={handleSubmit}>

                    <div className="page__item-column page__item-column__user">
                        <div className='user__info'>{data.name} {data.lastname}</div>
                        <div className='user__info'>
                            phone: &nbsp;
                            <a href={`tel:${data.phone}`}>{data.phone}</a>
                        </div>
                        <div className='user__info'>
                            st. {data.address.street},
                            house: {data.address.house}
                            {data.address.flat ? `, flat: ${data.address.flat}` : ''}
                        </div>
                        <div className='user__info'>
                            type: &nbsp;
                            {data.type}
                        </div>
                    </div>
                    <div className="page__item-column page__item-column__products">
                        {data.items.slice(0, 2).map(item => (
                            <div key={item._id} className='product'>
                                <span className='product__name'>
                                    {item.name}{item.quantity > 1 ? ` x ${item.quantity}` : ''}
                                </span>
                                <span className='product__price'>
                                    {item.price * item.quantity}$
                                </span>
                            </div>
                        ))}
                        {showMore && data.items.slice(2).map(item => (
                            <div key={item._id} className='product'>
                                <span className='product__name'>
                                    {item.name}{item.quantity > 1 ? ` x ${item.quantity}` : ''}
                                </span>
                                <span className='product__price'>
                                    {item.price * item.quantity}$
                                </span>
                            </div>
                        ))}
                        {data.items.length > 2 && (
                            <button onClick={() => setShowMore(!showMore)}>
                                show {showMore ? 'less' : 'more'}
                            </button>
                        )}
                        <div className="product__amount">
                            <div>
                                delivery fee: {data.deliveryFee}$
                            </div>
                            <div>
                                total: {data.amount + data.deliveryFee}$
                            </div>
                        </div>
                    </div>
                    <div className="page__item-column page__item-column__status">
                        <select
                            disabled={!showEdit}
                            value={status}
                            onChange={Event => setStatus(Event.target.value)}
                        >
                            {deliveryStatuses[data.type].map((item, index) => (
                                <option key={index} value={item}>{item}</option>
                            ))}
                        </select>
                    </div>

                    <div className="page__item-column page__item-buttons">
                        <button className="btn" onClick={handleToggleEdit}>
                            {showEdit ? "Close Edit" : "Show Edit"}
                        </button>
                    </div>
                </form>
            </div>
            <div className="page__item-bottom">
                {showEdit && (
                    <div className="page__item-bottom__buttons">
                        <button
                            className='btn page__item-bottom__btn'
                            onClick={handlePatchOrder}
                            disabled={patchLoading}
                        >
                            {patchLoading ? 'loading...' : 'save'}
                        </button>
                    </div>
                )}
            </div>
            {showPatchInfo && (
                <>
                    {patchError && <div className="error">{patchError}</div>}
                    {success && <div className="success">{success}</div>}
                </>
            )}
        </div>
    )
}
