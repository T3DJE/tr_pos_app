import React, { useEffect, useState } from 'react'
import { readHistory } from '../../axios'
import AdminProtect from '../../AdminProtect'
import LogoKasirKu from '../../images/LogoKasirKu.svg'
import CashierProfile from '../../images/CashierProfile.svg'
import Exit from '../../images/Exit.svg'
import styles from '../../css/Product.module.css'

function HistoryTransaction() {
    const user = JSON.parse(localStorage.getItem('user'))
    const [history, setHistory] = useState([])

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
            fetchHistory()
        }
        
    }, [])

    const fetchHistory = async () => {
    const res = await readHistory()
    console.log('DATA DARI API:', res.data.Data) 
    setHistory(res.data.Data)
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
                    <a href='/product'>Product</a>
                    <a href='/historytransaction' className={styles.active}>History Transaction</a>
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
                            <p className={styles.dashboard}>Riwayat Transaksi</p>
                            <div className={styles.tableWrapper}>
                                <table className={styles.tables}>
                                    <thead>
                                        <tr>
                                            <th>No</th>
                                            <th>Customer</th>
                                            <th>Barang & Qty</th>
                                            <th>Member</th>
                                            <th>Total</th>
                                            <th>Pembayaran</th>
                                            <th>Link Pembayaran</th>
                                            <th>Kembalian</th>
                                            <th>Status</th>
                                            <th>Tanggal</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {history.map((item, index) => {
                                            const order = item.order
                                            return (
                                                <tr key={item.id}>
                                                    <td>{index + 1}</td>
                                                    <td>{order?.customer_name || '-'}</td>
                                                    <td>
                                                        {order?.items?.map((it, idx) => (
                                                            <div key={idx}>
                                                                {it.produks?.nama_produk || 'Produk'} x {it.quantity}
                                                            </div>
                                                        ))}
                                                    </td>
                                                    <td>{order?.member ? 'Member' : 'Non-member'}</td>
                                                    <td>Rp {parseFloat(order?.total_harga || 0).toLocaleString('id-ID')}</td>
                                                    <td>
                                                        {order?.pembayaran
                                                            ? `Rp ${parseFloat(order.pembayaran).toLocaleString('id-ID')}`
                                                            : '-'}
                                                    </td>
                                                    <td>
                                                        {order?.payment_link
                                                            ? <a href={order.payment_link} target='_blank' rel='noreferrer'>Link</a>
                                                            : '-'}
                                                    </td>
                                                    <td>
                                                        {order?.payment?.name === 'Online'
                                                            ? '-'
                                                            : `Rp ${parseFloat(item.kembalian || 0).toLocaleString('id-ID')}`}
                                                    </td>
                                                    <td>{item.status}</td>
                                                    <td>{new Date(item.created_at).toLocaleString('id-ID')}</td>
                                                </tr>
                                            )
                                        })}
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
        </AdminProtect>
    )
}

export default HistoryTransaction
