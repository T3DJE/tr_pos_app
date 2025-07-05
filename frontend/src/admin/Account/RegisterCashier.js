import React, { useState } from 'react'
import { registercashier } from '../../axios'
import AdminProtect from '../../AdminProtect'

function RegisterCashier() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: ""
  })
  const [type, setType] = useState(true)

  const changeVisible = () => {
    setType(!type)
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await registercashier(form)
      setForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: ""
      })
    } catch (error) {
      console.log("Crashing App: " + error)
    }
  }
  return (
    <AdminProtect>
      <div>
        <h1>Register Cashier</h1>
        <a href='/admindashboard'>Back</a>
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            name='name'
            placeholder='Nama'
            onChange={handleChange}
            value={form.name}
            required
          />
          <input
            type='email'
            name='email'
            placeholder='Email'
            onChange={handleChange}
            value={form.email}
            required
          />
          <input
            type={type ? "text" : "password"}
            name='password'
            placeholder='Password'
            onChange={handleChange}
            value={form.password}
            required
          />
          <input
            type={type ? "text" : "password"}
            name='password_confirmation'
            placeholder='Password Confirmation'
            onChange={handleChange}
            value={form.password_confirmation}
            required
          />
          <input
            type='checkbox'
            onClick={changeVisible}
          />
          <button type='submit'>Register</button>
        </form>
      </div>
    </AdminProtect>
  )
}

export default RegisterCashier
