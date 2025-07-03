import React from 'react'

function PointOfSale() {

    const logout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        window.location.href = '/login'
    }
    return (
        <div>
            <h3>Cashier</h3>
            <button onClick={logout}>Logout</button>
        </div>
    )
}

export default PointOfSale
