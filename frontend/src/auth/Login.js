import React, { useState } from 'react'
import { login } from '../axios'
import { useNavigate } from 'react-router-dom'
import LogoKasirKu from '../images/LogoKasirKu.svg'
import Eye from '../images/Eye.svg'
import styles from '../css/Login.module.css'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { Helmet } from 'react-helmet';

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
            toast.error('Login gagal! Email atau password salah.', {
                style: {
                    fontSize: '12px',
                    backgroundColor: '#fff0f0',
                    color: '#d00',
                },
            });
        }
    }
    return (
        <div>
            <Helmet>
                <title>Login</title>
            </Helmet>
            <ToastContainer position="top-right" autoClose={3000} />
            <div className={styles.logo}>
                <img src={LogoKasirKu} width={35} />
                <div className={styles["logo-font"]}>
                    <p>Kasirku</p>
                    <p>Pos</p>
                </div>
            </div>
            <div className={styles.login}>
                <p className={styles.loginp}>Login</p>
                <form onSubmit={handleSubmit}>
                    <input type='email' name='email' placeholder='Email' onChange={handleChange} required />
                    <input type={type ? 'text' : 'password'} name='password' placeholder='Password' onChange={handleChange} required />
                    <img src={Eye} onClick={changeVisible} className={styles.changeVisible} width={23} />
                    <button type="submit" className={styles.btnLogin}>Login</button>
                </form>
            </div>
        </div>
    )
}

export default Login
