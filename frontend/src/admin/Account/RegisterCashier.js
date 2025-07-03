import React, { useState } from 'react'
import { registercashier } from '../../axios'
import { useNavigate } from 'react-router-dom'

function RegisterCashier() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: ""
  })
  const navigate = useNavigate()
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
    } catch (error) {
      console.log("Crashing App: " + error)
    }
  }
  return (
    <>
      <h1>Register Cashier</h1>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          name='name'
          placeholder='Nama'
          onChange={handleChange}
          required
        />
        <input
          type='email'
          name='email'
          placeholder='Email'
          onChange={handleChange}
          required
        />
        <input
          type={type ? "text" : "password"}
          name='password'
          placeholder='Password'
          onChange={handleChange}
          required
        />
        <input
          type={type ? "text" : "password"}
          name='password_confirmation'
          placeholder='Password Confirmation'
          onChange={handleChange}
          required
        />
        <input
          type='checkbox'
          onClick={changeVisible}
        />
        <button type='submit'>Register</button>
      </form>
    </>
  )
}

export default RegisterCashier
