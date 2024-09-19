import React, { useState } from 'react'
import { usePatchProduct } from '../../../hooks/usePatchProduct'
import { useDeleteProduct } from '../../../hooks/useDeleteProduct'
import { useCategoriesContext } from '../../../hooks/useCategoriesContext'
import TextareaAutosize from 'react-textarea-autosize'

import trash from '../../../assets/icons/trash.svg'
import { ReactSVG } from 'react-svg'

import camera from '../../../assets/icons/camera.svg'

import './Item.scss'

export const Item = ({ data }) => {

    const { patchProduct, isLoading: patchLoading, error: patchError } = usePatchProduct()
    const { delteProduct, isLoading: deleteLoading, error: deleteError } = useDeleteProduct()
    const { categories } = useCategoriesContext()

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

        const patchedProduct = { _id: data._id, name, description, price, category }

        if (image) {
            patchedProduct.image = image
        }

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
            {deleteConfirmation && (
                <div className="page__item-delete__confirm">
                    <button className='btn btn__white' onClick={handleDeleteProduct}>
                        {deleteLoading ? 'Loading...' : 'Delete'}
                    </button>
                    <button className='btn btn__white' onClick={handleCloseDeleteConfirmation}>
                        Cancel
                    </button>
                </div>
            )}
            {showEdit && (
                <button className="page__item-delete" onClick={handleToggleDeleteConfirmation}>
                    <ReactSVG className='icon' src={trash} />
                </button>
            )}
            <div className="page__item-preview">
                <div className="page__item-photo">

                    <label htmlFor={`page__item-photo__${data._id}`} className="page__item-photo__label">
                        <img src={image ? URL.createObjectURL(image) : `https://${import.meta.env.VITE_AWS_BUCKET_NAME}.s3.${import.meta.env.VITE_AWS_REGION}.amazonaws.com/uploads/${data.image}`} alt="" />
                        {showEdit && (
                            <div className="page__item-photo__label-overlay">
                                <img src={camera} alt="" />
                            </div>
                        )}
                    </label>

                    <input
                        type="file"
                        id={`page__item-photo__${data._id}`}

                        hidden
                        disabled={!showEdit}
                        onChange={Event => setImage(Event.target.files[0])}
                    />
                </div>
                <form className={`page__item-columns${showEdit ? ' isedit' : ''}`} onSubmit={handleSubmit}>
                    <div className="page__item-column page__item-column__name">
                        <input
                            type="text"

                            value={name}
                            onChange={Event => setName(Event.target.value)}

                            disabled={!showEdit}
                        />
                    </div>
                    <div className="page__item-column page__item-column__description">
                        <TextareaAutosize

                            value={description}
                            onChange={Event => setDescription(Event.target.value)}

                            disabled={!showEdit}
                        />
                    </div>
                    <div className="page__item-column page__item-column__price">
                        <input
                            type="number"

                            value={price}
                            onChange={Event => setPrice(Event.target.value)}

                            disabled={!showEdit}
                        />
                    </div>
                    <div className="page__item-column page__item-column__category">
                        <select
                            value={category}
                            onChange={Event => setCategory(Event.target.value)}
                            disabled={!showEdit}
                        >
                            {categories && categories.map(item => <option key={item._id} value={item.name}>{item.name}</option>)}
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
                    </div>
                )}
            </div>
            {deleteError && <div className="error">{deleteError}</div>}
            {patchError && <div className="error">{patchError}</div>}
        </div>
    )
}
