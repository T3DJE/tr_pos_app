import React, { useEffect, useState } from 'react'
import { readPayment, createPayment, deletePayment, readIdPayment, updatePayment } from '../../axios'
import AdminProtect from './../../AdminProtect'
import LogoKasirKu from '../../images/LogoKasirKu.svg'
import CashierProfile from '../../images/CashierProfile.svg'
import Exit from '../../images/Exit.svg'
import { FiEdit, FiTrash2 } from 'react-icons/fi'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import styles from '../../css/Category.module.css'

function Payment() {
    const user = JSON.parse(localStorage.getItem("user"))
    const [form, setForm] = useState({ nama_payment: "" })
    const [payment, setPayment] = useState([])
    const [idEdit, setIdEdit] = useState(null)

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

    useEffect(() => {
        if (user && user.role === "admin") viewPayment()
    }, [])

    const viewPayment = async () => {
        const datapayment = await readPayment()
        setPayment(datapayment.data.Data)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const alreadyExists = payment.some(
            (item) =>
                item.nama_payment.toLowerCase().trim() === form.nama_payment.toLowerCase().trim()
                && item.id !== idEdit
        )

        if (alreadyExists) {
            toast.error('Payment sudah ada!', {
                style: {
                    fontSize: '12px',
                    backgroundColor: '#fff0f0',
                    color: '#d00',
                },
            })
            return
        }

        try {
            const formData = new FormData()
            formData.append("nama_payment", form.nama_payment)
            if (idEdit) {
                await updatePayment(idEdit, formData)
            } else {
                await createPayment(formData)
            }
            setForm({ nama_payment: "" })
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
        <AdminProtect>
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
                    <a href='/admindashboard'>Dashboard</a>
                    <a href='/category'>Category</a>
                    <a href='/supplier'>Supplier</a>
                    <a href='/payment' className={styles.active}>Payment</a>
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
                            <p className={styles.dashboard}>Payment</p>

                            <div className={styles.formcac}>
                                <form onSubmit={handleSubmit} className={styles.editform}>
                                    <input
                                        type='text'
                                        name='nama_payment'
                                        placeholder='Nama Payment'
                                        value={form.nama_payment}
                                        onChange={handleChange}
                                        required
                                        style={{ width: 1100 }}
                                    />
                                    <button type='submit' className={styles.registerc}>
                                        {idEdit ? "Update" : "Create"}
                                    </button>
                                </form>
                            </div>

                            <div className={styles.tableWrapper}>
                                <table className={styles.tables}>
                                    <thead>
                                        <tr>
                                            <th>No</th>
                                            <th>Nama Payment</th>
                                            <th></th>
                                            <th></th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {payment.map((item, index) => (
                                            <tr key={item.id}>
                                                <td>{index + 1}</td>
                                                <td>{item.nama_payment}</td>
                                                <td></td>
                                                <td></td>
                                                <td>
                                                    <FiEdit
                                                        onClick={() => handleUpdate(item.id)}
                                                        size={18}
                                                        style={{ cursor: 'pointer', marginRight: '10px', color: '#28c76f' }}
                                                        title="Edit"
                                                    />
                                                    <FiTrash2
                                                        onClick={() => handleDelete(item.id)}
                                                        size={18}
                                                        style={{ cursor: 'pointer', color: 'red' }}
                                                        title="Delete"
                                                    />
                                                </td>
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
                    <button onClick={logout}>Logout</button>
                </div>
            </div>

            <ToastContainer position="top-right" autoClose={3000} newestOnTop={true} />
        </AdminProtect>
    )
}

export default Payment
