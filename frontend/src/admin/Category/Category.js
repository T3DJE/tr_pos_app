import React, { useEffect, useState } from 'react'
import { readCategory, createCategory, deleteCategory, readIdCategory, updateCategory } from '../../axios'
import AdminProtect from '../../AdminProtect'
import LogoKasirKu from '../../images/LogoKasirKu.svg'
import CashierProfile from '../../images/CashierProfile.svg'
import Exit from '../../images/Exit.svg'
import { FiEdit, FiTrash2 } from 'react-icons/fi'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import styles from '../../css/Category.module.css'

function Category() {
    const user = JSON.parse(localStorage.getItem("user"))
    const [form, setForm] = useState({ nama_category: "" })
    const [category, setCategory] = useState([])
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
        if (user && user.role === "admin") viewCategory()
    }, [])

    const viewCategory = async () => {
        const datacategory = await readCategory()
        setCategory(datacategory.data.Data)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const alreadyExists = category.some(
            (item) =>
                item.nama_category.toLowerCase().trim() === form.nama_category.toLowerCase().trim()
                && item.id !== idEdit
        )

        if (alreadyExists) {
            toast.error('Kategori sudah ada!.', {
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
            formData.append("nama_category", form.nama_category)
            if (idEdit) {
                await updateCategory(idEdit, formData)
            } else {
                await createCategory(formData)
            }
            setForm({ nama_category: "" })
            setIdEdit(null)
            viewCategory()
        } catch (error) {
            console.log(error)
        }
    }

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleDelete = async (id) => {
        await deleteCategory(id)
        viewCategory()
    }

    const handleUpdate = async (id) => {
        try {
            const datacatergoryid = await readIdCategory(id)
            setForm({
                nama_category: datacatergoryid.data.Data.nama_category
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
                    <a href='/category' className={styles.active}>Category</a>
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
                            <p className={styles.dashboard}>Category</p>

                            <div className={styles.formcac}>
                                <form onSubmit={handleSubmit} className={styles.editform}>
                                    <input
                                        type='text'
                                        name='nama_category'
                                        placeholder='Nama Category'
                                        value={form.nama_category}
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
                                            <th>Nama Category</th>
                                            <th></th>
                                            <th></th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {category.map((item, index) => (
                                            <tr key={item.id}>
                                                <td>{index + 1}</td>
                                                <td>{item.nama_category}</td>
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

export default Category
