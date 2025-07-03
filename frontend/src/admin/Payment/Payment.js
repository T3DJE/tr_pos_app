import React, { useEffect, useState } from 'react'
import { readPayment, createPayment, deletePayment, readIdPayment, updatePayment } from '../../axios'

function Payment() {
    const [form, setForm] = useState({
        nama_payment: ""
    })
    const [payment, setPayment] = useState([])
    const [idEdit, setIdEdit] = useState(null)

    useEffect(() => {
        viewPayment()
    }, [])

    const viewPayment = async () => {
        const datapayment = await readPayment()
        setPayment(datapayment.data.Data)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const formData = new FormData()
            formData.append("nama_payment", form.nama_payment)
            if (idEdit) {
                await updatePayment(idEdit, formData)
            } else {
                await createPayment(formData)
            }
            setForm({
                nama_payment: ""
            })
            setIdEdit(null)
            viewPayment()
        } catch (error) {
            console.log(error)
        }
    }

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleDelete = async (id) => {
        await deletePayment(id)
        viewPayment()
    }

    const handleUpdate = async (id) => {
        try {
            const datapaymentid = await readIdPayment(id)
            setForm({
                nama_payment: datapaymentid.data.Data.nama_payment
            })
            setIdEdit(id)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <h1>Payment</h1>
            <a href='/admindashboard'>Back</a>
            {payment.map((item, index) => (
                <div key={item.id}>
                    <p>{++index}. {item.nama_payment}</p>
                    <button onClick={() => handleUpdate(item.id)}>Update</button>
                    <button onClick={() => handleDelete(item.id)}>Delete</button>
                </div>
            ))}

            <h3>Input Payment</h3>
            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    name='nama_payment'
                    placeholder='Nama Payment'
                    value={form.nama_payment}
                    onChange={handleChange}
                    required
                />
                <button type='submit'>{idEdit ? "Update" : "Create"}</button>
            </form>
        </div>
    )
}

export default Payment
