import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function CashierProtect({ children }) {
    const [isAdmin, setIsAdmin] = useState(false)
    const navigate = useNavigate()
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"))
        if (user && user.role === 'cashier') setIsAdmin(true)
        else navigate("/")
    }, [navigate])
    if (!isAdmin) {
        return null
    }
    return <>{children}</>
}
export default CashierProtect