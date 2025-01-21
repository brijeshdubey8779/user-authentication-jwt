import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

function Dashboard() {
    const navigate = useNavigate()
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
        }
    }, [])

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role")
        navigate("/login");
    }

    return (
        <div>
            <h1>dashboard : {localStorage.getItem("role")}</h1>
            <button className='bg-blue-800 text-white hover:bg-blue-700 border-r-2' onClick={handleLogout}>Logout</button>

        </div>
    )
}

export default Dashboard