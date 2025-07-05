import React, { useEffect, useState } from 'react'
import AdminProtect from './../../AdminProtect'
import LogoKasirKu from '../../images/LogoKasirKu.svg'
import CashierProfile from '../../images/CashierProfile.svg'
import Exit from '../../images/Exit.svg'
import styles from '../../css/Admin.module.css'
import CashierImage from '../../images/Cashierimage.svg'
import { readMember, readProduct, readHistory, readCashierAcc, registercashier } from '../../axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Eye from '../../images/Eye.svg'

function AdminDashboard() {
    const user = JSON.parse(localStorage.getItem("user"))
    const logout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        window.location.href = '/'
    }
    const today = new Date()
    const formattedDate = today.toLocaleDateString('en-US', {
        weekday: 'short',
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    })

    const [member, setMember] = useState([])
    const [product, setProduct] = useState([])
    const [history, setHistory] = useState([])
    const [cashierAcc, setCashierAcc] = useState([])

    const viewneeded = async () => {
        const datamember = await readMember()
        setMember(datamember.data.Data)
        const dataproduct = await readProduct()
        setProduct(dataproduct.data.Data)
        const datahistory = await readHistory()
        setHistory(datahistory.data.Data)
        const datacashieracc = await readCashierAcc()
        setCashierAcc(datacashieracc.data.Data)
    }

    useEffect(() => {
        viewneeded()
    }, [])

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: ""
    })
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
            await registercashier(form)
            setForm({
                name: "",
                email: "",
                password: "",
                password_confirmation: ""
            })
            toast.success('Berhasil Register Cashier Account!', {
                style: {
                    fontSize: '12px',
                    backgroundColor: '#f0fff0',
                    color: '#0a0',
                },
            });
            setTimeout(() => window.location.reload(), 3000);
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <AdminProtect>
            <ToastContainer position="top-right" autoClose={3000} newestOnTop={true} />
            <div className={styles.container}>
                <div className={styles.part_top}>
                    <div className={styles.logo}>
                        <img src={LogoKasirKu} width={35} />
                        <div className={styles["logo-font"]}>
                            <p>Kasirku</p>
                            <p>Pos</p>
                        </div>
                    </div>
                    <p className={styles.date}>{formattedDate}</p>
                </div>
                <div className={styles.a_link}>
                    <a href='/admindashboard' className={styles.active}>Dashboard</a>
                    <a href='/category'>Category</a>
                    <a href='/supplier'>Supplier</a>
                    <a href='/payment'>Payment</a>
                    <a href='/member'>Member</a>
                    <a href='/product'>Product</a>
                    <a href='/historytransaction'>History Transaction</a>
                </div>
                <div className={styles.hr}></div>
                <div className={styles.bottom}>
                    <div className={styles.bottom_left}>
                        <div className={styles.profile}>
                            <img src={CashierProfile} width={35} />
                            <div className={styles.acc}>
                                <p>{user.name}</p>
                                <p>{user.role}</p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.bottom_right}>
                        <div className={styles.move}>
                            <p className={styles.dashboard}>Dashboard</p>
                            <div className={styles.boxes}>
                                <div className={styles.box}>
                                    <img src={CashierImage} width={45} />
                                    <div className={styles.boxp}>
                                        <p>Cashier Account</p>
                                        <p>{cashierAcc.length}</p>
                                    </div>
                                </div>
                                <div className={styles.box}>
                                    <img src={CashierImage} width={45} />
                                    <div className={styles.boxp}>
                                        <p>Membership</p>
                                        <p>{member.length}</p>
                                    </div>
                                </div>
                                <div className={styles.box}>
                                    <img src={CashierImage} width={45} />
                                    <div className={styles.boxp}>
                                        <p>Product</p>
                                        <p>{product.length}</p>
                                    </div>
                                </div>
                                <div className={styles.box}>
                                    <img src={CashierImage} width={45} />
                                    <div className={styles.boxp}>
                                        <p>Transaction</p>
                                        <p>{history.length}</p>
                                    </div>
                                </div>
                            </div>
                            <p className={styles.cac}>Create Account Cashier</p>
                            <div className={styles.formcac}>
                                <form onSubmit={handleSubmit} className={styles.editform}>
                                    <input type='text' name='name' placeholder='Nama' onChange={handleChange} value={form.name} required style={{ width: 400 }} />
                                    <input type='email' name='email' placeholder='Email' onChange={handleChange} value={form.email} required style={{ width: 400 }} />
                                    <input type={type ? "text" : "password"} name='password' placeholder='Password' onChange={handleChange} value={form.password} required style={{ width: 400 }} />
                                    <input type={type2 ? "text" : "password"} name='password_confirmation' placeholder='Password Confirmation' onChange={handleChange} value={form.password_confirmation} required style={{ width: 400 }} />
                                    <img src={Eye} onClick={changeVisible} className={styles.changeVisible} width={23} />
                                    <img src={Eye} onClick={changeVisible2} className={styles.changeVisible2} width={23} />
                                    <button type='submit' className={styles.registerc}>Create Account</button>
                                </form>
                            </div>
                            <div className={styles.tableWrapper}>
                                <table className={styles.tables}>
                                    <thead>
                                        <tr>
                                            <th>No</th>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Role</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cashierAcc.map((item, index) => (
                                            <tr key={item.id}>
                                                <td>{index + 1}</td>
                                                <td>{item.name}</td>
                                                <td>{item.email}</td>
                                                <td>{item.role}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                        </div>
                    </div>
                </div>
                <div className={styles.btnLogout}>
                    <img src={Exit} />
                    <button onClick={logout} >Logout</button>
                </div>
            </div>
        </AdminProtect>
    )
}

export default AdminDashboard
