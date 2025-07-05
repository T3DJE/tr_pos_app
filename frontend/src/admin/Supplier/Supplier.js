import React, { useEffect, useState } from 'react'
import { readSupplier, readIdSupplier, createSupplier, deleteSupplier, updateSupplier } from '../../axios'
import AdminProtect from '../../AdminProtect'
import LogoKasirKu from '../../images/LogoKasirKu.svg'
import CashierProfile from '../../images/CashierProfile.svg'
import Exit from '../../images/Exit.svg'
import { FiEdit, FiTrash2 } from 'react-icons/fi'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import styles from '../../css/Category.module.css'

function Supplier() {
    const user = JSON.parse(localStorage.getItem("user"))
    const [form, setForm] = useState({
        nama_supplier: "",
        alamat_supplier: "",
        nama_produk: "",
        stok_produk: ""
    })
    const [idEdit, setIdEdit] = useState(null)
    const [supplier, setSupplier] = useState([])

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
        if (user && user.role === "admin") viewsupplier()
    }, [])

    const viewsupplier = async () => {
        const datasupplier = await readSupplier()
        setSupplier(datasupplier.data.Data)
    }

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
                    <a href='/supplier' className={styles.active}>Supplier</a>
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
                            <p className={styles.dashboard}>Supplier</p>

                            <div className={styles.formcac}>
                                <form onSubmit={handleSubmit} className={styles.editform}>
                                    <input
                                        type='text'
                                        name='nama_supplier'
                                        placeholder='Nama Supplier'
                                        value={form.nama_supplier}
                                        onChange={handleChange}
                                        required
                                        style={{ width: 400 }}
                                    />
                                    <input
                                        type='text'
                                        name='alamat_supplier'
                                        placeholder='Alamat Supplier'
                                        value={form.alamat_supplier}
                                        onChange={handleChange}
                                        required
                                        style={{ width: 400 }}
                                    />
                                    <input
                                        type='text'
                                        name='nama_produk'
                                        placeholder='Nama Produk'
                                        value={form.nama_produk}
                                        onChange={handleChange}
                                        required
                                        style={{ width: 400 }}
                                    />
                                    <input
                                        type='number'
                                        name='stok_produk'
                                        placeholder='Stok Produk'
                                        value={form.stok_produk}
                                        onChange={handleChange}
                                        required
                                        style={{ width: 400 }}
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
                                            <th>Nama Supplier</th>
                                            <th>Alamat</th>
                                            <th>Nama Produk</th>
                                            <th>Stok</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {supplier.map((item, index) => (
                                            <tr key={item.id}>
                                                <td>{index + 1}</td>
                                                <td>{item.nama_supplier}</td>
                                                <td>{item.alamat_supplier}</td>
                                                <td>{item.nama_produk}</td>
                                                <td>{item.stok_produk}</td>
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

export default Supplier
