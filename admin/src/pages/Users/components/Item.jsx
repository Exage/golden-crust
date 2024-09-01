import React, { useState } from 'react'
import { ReactSVG } from 'react-svg'

import trash from '../../../assets/icons/trash.svg'

import './Item.scss'

export const Item = ({ data }) => {

    const deleteError = false
    const patchError = false
    const deleteLoading = false
    const patchLoading = false

    const [name, setName] = useState(data.name)
    const [lastName, setLastName] = useState(data.lastName)

    const [showEdit, setShowEdit] = useState(false)
    const [deleteConfirmation, setDeleteConfirmation] = useState(false)

    const handleSubmit = (Event) => {
        Event.preventDefault()
    }

    const handlePatchProduct = async () => {
         
    }

    const handleDeleteCategory = async () => {
        await deleteCategory(data._id)
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
        <div className="page__item">
            {deleteConfirmation && (
                <div className="page__item-delete__confirm">
                    <button className='btn btn__white' onClick={handleDeleteCategory}>
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
                <form className={`page__item-columns${showEdit ? ' isedit' : ''}`} onSubmit={handleSubmit}>
                    <div className="page__item-column page__item-column__name">
                        <input
                            type="text"

                            value={name}
                            onChange={Event => setName(Event.target.value)}

                            disabled={!showEdit}
                        />
                    </div>
                    <div className="page__item-column page__item-column__name">
                        <input
                            type="text"

                            value={lastName}
                            onChange={Event => setLastName(Event.target.value)}

                            disabled={!showEdit}
                        />
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
