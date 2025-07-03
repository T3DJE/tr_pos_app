import React, { useState } from 'react'
import { login } from '../axios'
import { useNavigate } from 'react-router-dom'

function Login() {
    const [form, setForm] = useState({
        email: "", password: ""
    })
    const navigate = useNavigate()

    const [type, setType] = useState(false)

    const changeVisible = () => {
        setType(!type)
    }

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { data } = await login(form)
            console.log("Response:", data)
            const { access_token, user } = data
            localStorage.setItem('token', access_token)
            localStorage.setItem('user', JSON.stringify(user))
            if (user.role === "admin") {
                navigate('/admindashboard')
            } else {
                navigate('/poscashier')
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div>
            <h2>Login Page</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type='email'
                    name='email'
                    placeholder='Email'
                    onChange={handleChange}
                    required
                />
                <input
                    type={type ? 'text' : 'password'}
                    name='password'
                    placeholder='Password'
                    onChange={handleChange}
                    required
                />
                <input
                    type='checkbox'
                    onClick={changeVisible}
                />
                <button type="submit">Login</button>
            </form>
        </div >
    )
}

export default Login
