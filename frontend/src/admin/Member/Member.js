import React, { useEffect, useState } from 'react'
import { readMember, readIdMember, createMember, updateMember, deleteMember } from '../../axios'

function Member() {
    const [form, setForm] = useState({
        nama_member: "",
        no_telpon: ""
    })
    const [member, setMember] = useState([])
    const [idEdit, setIdEdit] = useState(null)

    const viewMember = async () => {
        const datamember = await readMember()
        setMember(datamember.data.Data)
    }

    useEffect(() => {
        viewMember()
    }, [])

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const formData = new FormData()
            formData.append("nama_member", form.nama_member)
            formData.append("no_telpon", form.no_telpon)
            if (idEdit) {
                await updateMember(idEdit, formData)
            } else {
                await createMember(formData)
            }
            setForm({
                nama_member: "",
                no_telpon: ""
            })
            setIdEdit(null)
            viewMember()
        } catch (error) {
            console.log(error)
        }
    }

    const handleUpdate = async (id) => {
        try {
            const datamemberid = await readIdMember(id)
            setForm({
                nama_member: datamemberid.data.JSON.nama_member,
                no_telpon: datamemberid.data.JSON.no_telpon
            })
            setIdEdit(id)
        } catch (error) {
            console.log(error)
        }
    }

    const handleDelete = async (id) => {
        await deleteMember(id)
        viewMember()
    }

    return (
        <div>
            <h2>Member Page</h2>
            <a href='/admindashboard'>Back</a>
            {member.map((item, index) => (
                <div key={item.id}>
                    <p>{++index}. {item.nama_member} || {item.no_telpon}</p>
                    <button onClick={() => handleUpdate(item.id)}>Update</button>
                    <button onClick={() => handleDelete(item.id)}>Delete</button>
                </div>
            ))}

            <h3>Input Category</h3>
            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    name='nama_member'
                    placeholder='Nama Member'
                    value={form.nama_member}
                    onChange={handleChange}
                    required
                />
                <input
                    type='text'
                    name='no_telpon'
                    placeholder='No Telpon'
                    value={form.no_telpon}
                    onChange={handleChange}
                    required
                />
                <button type='submit'>{idEdit ? "Update" : "Create"}</button>
            </form>
        </div>
    )
}

export default Member
