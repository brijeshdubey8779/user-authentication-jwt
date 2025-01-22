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
        <div className='text-center m-5'>
            <h1>dashboard : {localStorage.getItem("role")}</h1>
            <button className='bg-red-500 text-white hover:bg-red-700 border-r-2 px-4 py-2 rounded-sm' onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default Dashboard