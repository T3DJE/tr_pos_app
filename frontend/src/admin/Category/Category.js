import React, { useEffect, useState } from 'react'
import { readCategory, createCategory, deleteCategory, readIdCategory, updateCategory } from '../../axios'

function Category() {
    const [form, setForm] = useState({
        nama_category: ""
    })
    const [category, setCategory] = useState([])
    const [idEdit, setIdEdit] = useState(null)

    useEffect(() => {
        viewCategory()
    }, [])

    const viewCategory = async () => {
        const datacategory = await readCategory()
        setCategory(datacategory.data.Data)
    }

    const logout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        window.location.href = '/login'
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            const formData = new FormData()
            formData.append("nama_category", form.nama_category)
            if(idEdit){
                await updateCategory(idEdit, formData)
            }else{
                await createCategory(formData)
            }
            setForm({
                nama_category: ""
            })
            setIdEdit(null)
            viewCategory()
        }catch(error){
            console.log(error)
        }
    }

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name] : e.target.value})
    }

    const handleDelete = (id) => {
        deleteCategory(id)
        viewCategory()
    }

    const handleUpdate = async (id) => {
        try{
            const datacatergoryid = await readIdCategory(id)
            setForm({
                nama_category: datacatergoryid.data.Data.nama_category
            })
            setIdEdit(id)
        }catch(error){
            console.log(error)
        }
    }


    return (
        <div>
            <h1>Category</h1>
            <button onClick={logout}>Logout</button>
            {category.map((item, index) => (
                <div key={item.id}>
                    <p>{++index}. {item.nama_category}</p>
                    <button onClick={() => handleUpdate(item.id)}>Update</button> 
                    <button onClick={() => handleDelete(item.id)}>Delete</button> 
                </div>
            ))}

            <h3>Input Category</h3>
            <form onSubmit={handleSubmit}>
                <input 
                    type='text'
                    name='nama_category'
                    placeholder='Nama Category'
                    value={form.nama_category}
                    onChange={handleChange}
                    required
                />
                <button type='submit'>{idEdit ? "Update" : "Create"}</button>
            </form>
        </div>
    )
}

export default Category
