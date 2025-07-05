import React, { useState } from 'react'
import { register } from '../axios'
import { useNavigate } from 'react-router-dom'
import LogoKasirKu from '../images/LogoKasirKu.svg'
import Eye from '../images/Eye.svg'
import styles from '../css/Login.module.css'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { Helmet } from 'react-helmet'

function Register() {
    const [form, setForm] = useState({ name: "", email: "", password: "", password_confirmation: "" })
    const navigate = useNavigate()
    const [type, setType] = useState(false)
    const [type2, setType2] = useState(false)

    const changeVisible = () => {
        setType(!type)
    }

    const changeVisible2 = () => {
        setType2(!type2)
    }

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await register(form)
            navigate('/')
        } catch (error) {
            console.log(error)
            toast.error('Register gagal! Input salah', {
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
                <title>Register</title>
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
                <p className={styles.loginp}>Register</p>
                <form onSubmit={handleSubmit}>
                    <input type='text' name='name' placeholder='Nama' onChange={handleChange} required />
                    <input type='email' name='email' placeholder='Email' onChange={handleChange} required />
                    <input type={type ? "text" : "password"} name='password' placeholder='Password' onChange={handleChange} required />
                    <input type={type2 ? "text" : "password"} name='password_confirmation' placeholder='Password Confirmation' onChange={handleChange} required />
                    <img src={Eye} onClick={changeVisible} className={styles.changeVisibleRegister} width={23} />
                    <img src={Eye} onClick={changeVisible2} className={styles.changeVisibleRegister2} width={23} />
                    <button type="submit" className={styles.btnLogin}>Register</button>
                </form>
            </div>
        </div>
    )
}

export default Register

