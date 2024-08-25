import React, { useEffect, useState } from 'react'
import { useCategoriesContext } from '../../../hooks/useCategoriesContext'
import { useAddProduct } from '../../../hooks/useAddProduct'

import { Title } from '../../../components/Title/Title'
import TextareaAutosize from 'react-textarea-autosize'

export const Sidebar = () => {

    const [image, setImage] = useState(false)
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [category, setCategory] = useState('') 

    const { addProduct, error, success, isLoading } = useAddProduct()
    const { categories } = useCategoriesContext()

    const handleSubmitForm = async (Event) => {
        Event.preventDefault()
        await addProduct(image, name.trim(), description.trim(), price, category)

        setImage(false)
        setName('')
        setDescription('')
        setPrice('')
        setCategory('')
    }

    return (
        <div className="page__sidebar-sticky">
            <div className="page__sidebar">
                {/* <Title decorations={false}>Add Product</Title> */}
                <h1 className="page__sidebar-title">Add Product</h1>
                <form className="page__sidebar-form" onSubmit={handleSubmitForm}>
                    {image && <img className="page__sidebar-form__img" src={URL.createObjectURL(image)} />}
                    <input type="file" onChange={Event => setImage(Event.target.files[0])} required />
                    <input
                        type="text"
                        className="input"
                        placeholder="Name"
                        required
                        value={name}
                        onChange={Event => setName(Event.target.value)}
                    />
                    <TextareaAutosize
                        className="input"
                        placeholder="Description"
                        required
                        value={description}
                        onChange={Event => setDescription(Event.target.value)}
                    />
                    <input
                        type="number"
                        className="input"
                        placeholder="Price"
                        required
                        value={price}
                        onChange={Event => setPrice(Event.target.value)}
                    />
                    <select
                        className="input"
                        onChange={Event => setCategory(Event.target.value)}
                        value={category}
                    >
                        <option value="" disabled>Category</option>
                        
                        {categories && categories.map(item => <option key={item._id} value={item.name}>{item.name}</option>)}
                        
                        {/* <option value="cookies">Cookies</option>
                        <option value="donuts">Donuts</option>
                        <option value="pizza">Pizza</option>
                        <option value="cakes">Cakes</option> */}
                    </select>
                    <hr className='page__sidebar-hr' />

                    <button type='submit' className='btn' disabled={isLoading}>
                        {isLoading ? 'Loading...' : 'Add product'}
                    </button>

                    {error && <div className="error">{error}</div>}
                    {success && <div className="success">{success}</div>}
                </form>
            </div>
        </div>
    )
}
