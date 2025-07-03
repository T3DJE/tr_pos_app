import React, { useEffect, useState } from 'react'
import { readSupplier, readIdSupplier, createSupplier, deleteSupplier, updateSupplier } from '../../axios'

function Supplier() {
    const [form, setForm] = useState({
        nama_supplier: "",
        alamat_supplier: "",
        nama_produk: "",
        stok_produk: ""
    })
    const [idEdit, setIdEdit] = useState(null)
    const [supplier, setSupplier] = useState([])

    const viewsupplier = async () => {
        const datasupplier = await readSupplier()
        setSupplier(datasupplier.data.Data)
    }
    useEffect(() => {
        viewsupplier()
    }, [])

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const formdata = new FormData()
            formdata.append("nama_supplier", form.nama_supplier)
            formdata.append("alamat_supplier", form.alamat_supplier)
            formdata.append("nama_produk", form.nama_produk)
            formdata.append("stok_produk", form.stok_produk)
            if (idEdit) {
                await updateSupplier(idEdit, formdata)
            } else {
                await createSupplier(formdata)
            }
            setForm({
                nama_supplier: "",
                alamat_supplier: "",
                nama_produk: "",
                stok_produk: ""
            })
            setIdEdit(null)
            viewsupplier()
        } catch (error) {
            console.log(error)
        }
    }

    const handleDelete = async (id) => {
        await deleteSupplier(id)
        viewsupplier()
    }

    const handleUpdate = async (id) => {
        try {
            const datasupplierid = await readIdSupplier(id)
            setForm({
                nama_supplier: datasupplierid.data.Data.nama_supplier,
                alamat_supplier: datasupplierid.data.Data.alamat_supplier,
                nama_produk: datasupplierid.data.Data.nama_produk,
                stok_produk: datasupplierid.data.Data.stok_produk
            })
            setIdEdit(id)
        } catch (error) {
            console.log(error)
        }

    }

    return (
        <div>
            <h1>Supplier Page</h1>
            <a href='/admindashboard'>Back</a>
            {supplier.map((item, index) => (
                <div key={item.id}>
                    <p>{++index}. {item.nama_supplier} || {item.alamat_supplier} || {item.nama_produk} || {item.stok_produk}</p>
                    <button onClick={() => handleUpdate(item.id)}>Update</button>
                    <button onClick={() => handleDelete(item.id)}>Delete</button>
                </div>
            ))}
            <h3>Input Supplier</h3>
            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    name='nama_supplier'
                    placeholder='Nama Supplier'
                    value={form.nama_supplier}
                    onChange={handleChange}
                />
                <input
                    type='text'
                    name='alamat_supplier'
                    placeholder='Alamat Supplier'
                    value={form.alamat_supplier}
                    onChange={handleChange}
                />
                <input
                    type='text'
                    name='nama_produk'
                    placeholder='Nama Produk'
                    value={form.nama_produk}
                    onChange={handleChange}
                />
                <input
                    type='number'
                    name='stok_produk'
                    placeholder='Stok Produk'
                    value={form.stok_produk}
                    onChange={handleChange}
                />
                <button type='submit'>{idEdit ? "Update" : "Create"}</button>
            </form>
        </div>
    )
}

export default Supplier
