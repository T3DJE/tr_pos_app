import React, { use, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function AdminProtect({ children }) {
    const [isAdmin, setIsAdmin] = useState(false)
    const navigate = useNavigate()
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"))
        if (user && user.role === 'admin') setIsAdmin(true)
        else navigate("/")
    }, [navigate])
    if (!isAdmin) {
        return null
    }
    return <>{children}</>
}
export default AdminProtect
