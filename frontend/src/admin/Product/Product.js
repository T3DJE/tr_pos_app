import React, { useEffect, useState } from 'react'
import {
    readProduct,
    readSupplier,
    readCategory,
    createProduct,
    updateProduct,
    deleteProduct,
    readIdProduct
} from '../../axios'
import AdminProtect from '../../AdminProtect'
import LogoKasirKu from '../../images/LogoKasirKu.svg'
import CashierProfile from '../../images/CashierProfile.svg'
import Exit from '../../images/Exit.svg'
import { FiEdit, FiTrash2 } from 'react-icons/fi'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import styles from '../../css/Product.module.css'

function Product() {
    const user = JSON.parse(localStorage.getItem('user'))
    const [form, setForm] = useState({
        id_category: '',
        id_supplier: '',
        harga_produk: '',
        image: ''
    })
    const [product, setProduct] = useState([])
    const [supplier, setSupplier] = useState([])
    const [categories, setCategories] = useState([])
    const [idEdit, setIdEdit] = useState(null)

    const today = new Date()
    const formattedDate = today.toLocaleDateString('en-US', {
        weekday: 'short',
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    })

    const logout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        window.location.href = '/'
    }

    useEffect(() => {
        if (user && user.role === 'admin') {
            fetchAll()
        }
    }, [])

    const fetchAll = async () => {
        const prod = await readProduct()
        const supp = await readSupplier()
        const cat = await readCategory()
        setProduct(prod.data.Data)
        setSupplier(supp.data.Data)
        setCategories(cat.data.Data)
    }

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleFile = (e) => {
        setForm({ ...form, [e.target.name]: e.target.files[0] })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const formData = new FormData()
            formData.append('id_category', form.id_category)
            formData.append('id_supplier', form.id_supplier)
            formData.append('harga_produk', form.harga_produk)
            if (form.image) {
                formData.append('image', form.image)
            }

            if (idEdit) {
                await updateProduct(idEdit, formData)
            } else {
                await createProduct(formData)
            }

            setForm({
                id_category: '',
                id_supplier: '',
                harga_produk: '',
                image: ''
            })
            setIdEdit(null)
            fetchAll()
        } catch (error) {
            console.log(error)
            toast.error('Terjadi kesalahan saat menyimpan data.')
        }
    }

    const handleUpdate = async (id) => {
        const data = await readIdProduct(id)
        const json = data.data.JSON
        setForm({
            id_category: json.id_category,
            id_supplier: json.id_supplier,
            harga_produk: json.harga_produk,
            image: ''
        })
        setIdEdit(id)
    }

    const handleDelete = async (id) => {
        await deleteProduct(id)
        fetchAll()
    }

    return (
        <AdminProtect>
            <div className={styles.container}>
                <div className={styles.part_top}>
                    <div className={styles.logo}>
                        <img src={LogoKasirKu} width={35} />
                        <div className={styles['logo-font']}>
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
                    <a href='/payment'>Payment</a>
                    <a href='/member'>Member</a>
                    <a href='/product' className={styles.active}>Product</a>
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
                            <p className={styles.dashboard}>Product</p>
                            <form onSubmit={handleSubmit} className={styles.editform}>
                                <select name='id_supplier' value={form.id_supplier} onChange={handleChange} required>
                                    <option value=''>-- Pilih Supplier --</option>
                                    {supplier.map((item) => (
                                        <option key={item.id} value={item.id}>
                                            {item.nama_produk} - Stok: {item.stok_produk}
                                        </option>
                                    ))}
                                </select>

                                <select name='id_category' value={form.id_category} onChange={handleChange} required>
                                    <option value=''>-- Pilih Category --</option>
                                    {categories.map((item) => (
                                        <option key={item.id} value={item.id}>
                                            {item.nama_category}
                                        </option>
                                    ))}
                                </select>

                                <input
                                    type='number'
                                    name='harga_produk'
                                    value={form.harga_produk}
                                    placeholder='Harga Produk'
                                    onChange={handleChange}
                                    required
                                    className={styles.hp}
                                />

                                <input
                                    type='file'
                                    name='image'
                                    onChange={handleFile}
                                />

                                <button type='submit' className={styles.registerc}>
                                    {idEdit ? 'Update' : 'Create'}
                                </button>
                            </form>

                            <div className={styles.tableWrapper}>
                                <table className={styles.tables}>
                                    <thead>
                                        <tr>
                                            <th>No</th>
                                            <th>Nama Produk</th>
                                            <th>Stok</th>
                                            <th>Kategori</th>
                                            <th>Harga</th>
                                            <th>Image</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {product.map((item, index) => (
                                            <tr key={item.id}>
                                                <td>{index + 1}</td>
                                                <td>{item.supplier.nama_produk}</td>
                                                <td>{item.supplier.stok_produk}</td>
                                                <td>{item.category.nama_category}</td>
                                                <td>{item.harga_produk}</td>
                                                <td>
                                                    <img
                                                        src={`http://127.0.0.1:8000/images/${item.image}`}
                                                        alt={item.image}
                                                        width={70}
                                                    />
                                                </td>
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

export default Product
