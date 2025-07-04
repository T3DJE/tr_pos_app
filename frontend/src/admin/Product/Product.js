import React, { useEffect, useState } from 'react'
import { readProduct, readSupplier, readCategory, createProduct, updateProduct, deleteProduct, readIdProduct, categoryIdProduct } from '../../axios'

function Product() {
    const [form, setForm] = useState({
        id_category: "",
        id_supplier: "",
        harga_produk: "",
        image: ""
    })
    const [product, setProduct] = useState([])
    const [idEdit, setIdEdit] = useState(null)
    const [supplier, setSupplier] = useState([])
    const [categories, setCategories] = useState([])

    const viewproduct = async () => {
        const dataproduct = await readProduct()
        setProduct(dataproduct.data.Data)
    }

    const fetchSupplier = async () => {
        const datasupplier = await readSupplier()
        setSupplier(datasupplier.data.Data)
    }

    const fetchCategory = async () => {
        const datacategory = await readCategory()
        setCategories(datacategory.data.Data)
    }

    useEffect(() => {
        viewproduct()
        fetchSupplier()
        fetchCategory()
    }, [])

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const formData = new FormData()
            formData.append("id_category", form.id_category)
            formData.append("id_supplier", form.id_supplier)
            formData.append("harga_produk", form.harga_produk)
            if (form.image) {
                formData.append("image", form.image)
            }
            if (idEdit) {
                await updateProduct(idEdit, formData)
            } else {
                await createProduct(formData)
            }
            setForm({
                id_category: "",
                id_supplier: "",
                harga_produk: "",
                image: ""
            })
            setIdEdit(null)
            viewproduct()
        } catch (error) {
            console.log(error)
        }
    }

    const handleFile = async (e) => {
        setForm({ ...form, [e.target.name]: e.target.files[0] })
    }

    const handleDelete = async (id) => {
        await deleteProduct(id)
        viewproduct()
    }

    const handleUpdate = async (id) => {
        try {
            const dataprductid = await readIdProduct(id)
            setForm({
                id_category: dataprductid.data.JSON.id_category,
                id_supplier: dataprductid.data.JSON.id_supplier,
                harga_produk: dataprductid.data.JSON.harga_produk,
                image: ""
            })
            setIdEdit(id)
        } catch (error) {
            console.log(error)
        }
    }

    const handleViewCategory = async (id) => {
        try {
            const datacatproid = await categoryIdProduct(id)
            setProduct(datacatproid.data.JSON)
            setIdEdit(id)
        } catch (error) {
            console.log(error)
        }
    }

    const handleAllCategory = async () => {
        const dataproduct = await readProduct()
        setProduct(dataproduct.data.Data)
    }


    return (
        <div>
            <h1>Product</h1>
            <a href='/admindashboard'>Back</a>
            <p>Lihat By Category: </p>
            <button onClick={() => handleAllCategory()}>All</button>
            {categories.map((item) => (
                <div key={item.id}>
                    <button onClick={() => handleViewCategory(item.id)}>{item.nama_category}</button>
                </div>
            ))}
            {product.map((item) => (
                <div key={item.id}>
                    <p>Nama Produk: {item.supplier.nama_produk}</p>
                    <p>Stok: {item.supplier.stok_produk}</p>
                    <p>Kategori: {item.category.nama_category}</p>
                    <p>{item.harga_produk}</p>
                    <img src={`http://127.0.0.1:8000/images/${item.image}`} alt={item.image} width={100} />
                    <br></br>
                    <button onClick={() => handleUpdate(item.id)}>Update</button>
                    <button onClick={() => handleDelete(item.id)}>Delete</button>
                </div>
            ))}
            <h3>Input Product</h3>
            <form onSubmit={handleSubmit}>
                <select name='id_supplier' value={form.id_supplier} onChange={handleChange} required>
                    <option value="">-- Pilih Supplier --</option>
                    {supplier.map((item) => (
                        <option key={item.id} value={item.id}>
                            {item.nama_produk} - Stok: {item.stok_produk}
                        </option>
                    ))}
                </select>
                <select name='id_category' value={form.id_category} onChange={handleChange} required>
                    <option value="">-- Pilih Category --</option>
                    {categories.map((item) => (
                        <option key={item.id} value={item.id}>
                            {item.nama_category}
                        </option>
                    ))}
                </select>
                <input
                    type='number'
                    name='harga_produk'
                    value={form.harga_produk}
                    placeholder='Harga Produk'
                    onChange={handleChange}
                    required
                />
                <input
                    type='file'
                    name='image'
                    onChange={handleFile}
                />
                <button>{idEdit ? "Update" : "Create"}</button>
            </form>
        </div>
    )
}

export default Product
