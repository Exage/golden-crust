import React, { useEffect, useState } from 'react'
import TextareaAutosize from 'react-textarea-autosize'
import { useAddCategory } from '../../../hooks/useAddCategory'

import { ColorPicker } from '../../../components/UI/ColorPicker/ColorPicker'

export const Sidebar = () => {

    const { addCategory, isLoading, error, success } = useAddCategory()

    const [name, setName] = useState('')
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [primaryColor, setPrimaryColor] = useState('')
    const [secondaryColor, setSecondaryColor] = useState('')

    const handleSubmitForm = async (Event) => {
        Event.preventDefault()
        await addCategory(name, title, description, primaryColor, secondaryColor)

        setTitle('')
        setName('')
        setDescription('')
        setPrimaryColor('')
        setSecondaryColor('')
    }

    return (
        <div className="page__sidebar-sticky">
            <div className="page__sidebar">
                <h1 className="page__sidebar-title">Add Category</h1>
                <form className="page__sidebar-form" onSubmit={handleSubmitForm}>
                    
                    <input
                        type="text"
                        className="input"
                        placeholder="Name"
                        required
                        value={name}
                        onChange={Event => setName(Event.target.value)}
                    />
                    <input
                        type="text"
                        className="input"
                        placeholder="Title"
                        required
                        value={title}
                        onChange={Event => setTitle(Event.target.value)}
                    />
                    <TextareaAutosize
                        className="input"
                        placeholder="Description"
                        required
                        value={description}
                        onChange={Event => setDescription(Event.target.value)}
                    />

                    <ColorPicker label={'Primary Color'} value={primaryColor} onChange={setPrimaryColor} />
                    <ColorPicker label={'Secondary Color'} value={secondaryColor} onChange={setSecondaryColor} />

                    <button type='submit' className='btn' disabled={isLoading}>
                        {isLoading ? 'Loading...' : 'Add category'}
                    </button>

                    {error && <div className="error">{error}</div>}
                    {success && <div className="success">{success}</div>}
                </form>
            </div>
        </div>
    )
}
