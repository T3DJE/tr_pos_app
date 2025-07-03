import React from 'react'
import { data } from 'react-router-dom'

function AdminDashboard() {
    const logout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        window.location.href = '/login'
    }
    return (
        <div>
            <h1>Selamat Datang Admin!</h1>
            <button onClick={logout}>Logout</button>
            <br></br>
            <a href='/category'>Category</a>
            <br></br>
            <a href='/member'>Member</a>
            <br></br>
            <a href='/product'>Product</a>
            <br></br>
            <a href='/payment'>Payment</a>
            <br></br>
            <a href='/supplier'>Supplier</a>
            <br></br>
            <a href='/historytransaction'>History Transaction</a>
            <br></br>
        </div>
    )
}

export default AdminDashboard
