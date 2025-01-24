import React from 'react'
// import { use } from 'react'
import { useNavigate, Link, Outlet } from 'react-router-dom'
import { logout } from '../../api/auth'

function DoctorDashboard() {
    const navigat = useNavigate()
    const handleLogout = () => {
        logout();
        window.location.href = "/login";
    };
    if (localStorage.getItem('role') == "doctor") {
        return (
            <div>
                <h1 className="text-2xl font-bold text-center my-6">Doctor Dashboard</h1>
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Card 1 */}
                        <div className="bg-white shadow-md rounded-lg overflow-hidden">
                            <div className="p-6">
                                <h5 className="text-lg font-semibold mb-2">Patient Information</h5>
                                <p className="text-gray-600 mb-4">View patient information and edit patient details</p>
                                <Link
                                    to="/doctordashboard/patient-info"
                                    className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                >
                                    View Patient Information
                                </Link>
                            </div>
                        </div>
                        {/* Card 2 */}
                        <div className="bg-white shadow-md rounded-lg overflow-hidden">
                            <div className="p-6">
                                <h5 className="text-lg font-semibold mb-2">Reports</h5>
                                <p className="text-gray-600 mb-4">View patient reports and edit them</p>
                                <Link
                                    to="/doctordashboard/reports"
                                    className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                >
                                    View Reports
                                </Link>
                            </div>
                        </div>
                        {/* Card 3 */}
                        <div className="bg-white shadow-md rounded-lg overflow-hidden">
                            <div className="p-6">
                                <h5 className="text-lg font-semibold mb-2">Edit Patient Details</h5>
                                <p className="text-gray-600 mb-4">Edit patient details and save changes</p>
                                <Link
                                    to="/doctordashboard/edit-patient"
                                    className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                >
                                    Edit Patient Details
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <button
                    className="bg-red-500 text-white px-4 py-2 mb-6 rounded fixed right-20"
                    onClick={handleLogout}
                >
                    Logout
                </button>
                {/* <Outlet /> */}
            </div>

        )
    }
    else {
        alert(`You are not authorized to access this page.`);
        handleLogout()
    }
}

export default DoctorDashboard