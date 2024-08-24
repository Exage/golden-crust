import React, { useState } from 'react'
import { usePatchProduct } from '../../../hooks/usePatchProduct'
import { useDeleteProduct } from '../../../hooks/useDeleteProduct'
import TextareaAutosize from 'react-textarea-autosize'

import './Item.scss'

export const Item = ({ data }) => {

    const { patchProduct, isLoading: patchLoading, error: patchError } = usePatchProduct()
    const { delteProduct, isLoading: deleteLoading, error: deleteError } = useDeleteProduct()

    const [image, setImage] = useState(false)
    const [name, setName] = useState(data.name)
    const [description, setDescription] = useState(data.description)
    const [price, setPrice] = useState(data.price)
    const [category, setCategory] = useState(data.category)

    const [showEdit, setShowEdit] = useState(false)
    const [deleteConfirmation, setDeleteConfirmation] = useState(false)

    const handleSubmit = (Event) => {
        Event.preventDefault()
    }

    const handlePatchProduct = async () => {

        const patchedProduct = { _id: data._id, name, description, price, category, image }

        await patchProduct(patchedProduct)
        setShowEdit(false)
    }

    const handleDeleteProduct = async () => {
        await delteProduct(data._id)
        setDeleteConfirmation(false)
    }

    const handleToggleEdit = () => {
        setShowEdit(!showEdit)
        setDeleteConfirmation(false)
    }

    const handleToggleDeleteConfirmation = (Event) => {
        Event.preventDefault()
        setDeleteConfirmation(!deleteConfirmation)
    }

    const handleCloseDeleteConfirmation = (Event) => {
        Event.preventDefault()
        setDeleteConfirmation(false)
    }

    return (
        <div className="page__item" data-id={data._id}>
            <div className="page__item-preview">
                <div className="page__item-photo">

                    <label htmlFor={`page__item-photo__${data._id}`} className={`page__item-photo__label${showEdit ? ' isedit' : ''}`}>
                        <img src={image ? URL.createObjectURL(image) : `${import.meta.env.VITE_API_URL}/images/${data.image}`} alt="" />
                        {/* <img src={URL.createObjectURL(image)} alt="" /> */}
                    </label>

                    <input type="file" id={`page__item-photo__${data._id}`} hidden disabled={!showEdit} onChange={Event => setImage(Event.target.files[0])} />
                </div>
                <form className={`page__item-columns${showEdit ? ' isedit' : ''}`} onSubmit={handleSubmit}>
                    <div className="page__item-column page__item-name">
                        <input
                            type="text"

                            value={name}
                            onChange={Event => setName(Event.target.value)}

                            disabled={!showEdit}
                        />
                    </div>
                    <div className="page__item-column page__item-description">
                        <TextareaAutosize

                            value={description}
                            onChange={Event => setDescription(Event.target.value)}

                            disabled={!showEdit}
                        />
                    </div>
                    <div className="page__item-column page__item-price">
                        <input
                            type="number"

                            value={price}
                            onChange={Event => setPrice(Event.target.value)}

                            disabled={!showEdit}
                        />
                    </div>
                    <div className="page__item-column page__item-category">
                        <select
                            value={category}
                            onChange={Event => setCategory(Event.target.value)}
                            disabled={!showEdit}
                        >
                            <option value="cookies">Cookies</option>
                            <option value="donuts">Donuts</option>
                            <option value="pizza">Pizza</option>
                            <option value="cakes">Cakes</option>
                        </select>
                    </div>
                    <div className="page__item-column page__item-buttons" onClick={handleToggleEdit}>
                        <button className="btn">{showEdit ? "Close Edit" : "Show Edit"}</button>
                    </div>
                </form>
            </div>
            <div className="page__item-bottom">
                {showEdit && (
                    <div className="page__item-bottom__buttons">
                        <button className='btn page__item-bottom__btn' onClick={handlePatchProduct} disabled={patchLoading}>
                            {patchLoading ? 'loading...' : 'save'}
                        </button>
                        <div className="btn__confirmation-wrapper">
                            <button className='btn page__item-bottom__btn' onClick={handleToggleDeleteConfirmation} disabled={deleteLoading}>
                                {deleteLoading ? 'loading...' : 'delete'}
                            </button>
                            {deleteConfirmation && (
                                <div className="btn__confirmation">
                                    <button className='btn btn__white' onClick={handleDeleteProduct}>Yes</button>
                                    <button
                                        className='btn btn__white'
                                        onClick={handleCloseDeleteConfirmation}
                                    >
                                        No
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
            {deleteError && <div className="error">{deleteError}</div>}
        </div>
    )
}
