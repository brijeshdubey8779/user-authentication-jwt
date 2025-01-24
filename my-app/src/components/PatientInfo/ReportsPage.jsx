import React from 'react'

function ReportsPage() {
    return (
        <div>
            <nav className="bg-blue-500 text-white px-4 py-3">
                <ul className="flex justify-around">
                    <li>
                        <a href="/doctordashboard" className="hover:underline">Dashboard</a>
                    </li>
                    <li>
                        <a href="/doctordashboard/patient-info" className="hover:underline">Patient Info</a>
                    </li>
                    <li>
                        <a href="/doctordashboard/reports" className="hover:underline">Reports</a>
                    </li>
                    <li>
                        <a href="/doctordashboard/edit-patient" className="hover:underline">Edit Patient</a>
                    </li>
                </ul>
            </nav>

            <h1 className="text-2xl font-bold text-center my-6">Patient Reports</h1>
            <div className="container mx-auto">
                <div className="bg-white shadow-md rounded-lg p-6">
                    <h2 className="text-lg font-semibold mb-4">Reports</h2>
                    <ul className="list-disc pl-5">
                        <li className="mb-2">
                            <span className="font-medium">Report 1:</span> Blood Test - 12/01/2025
                            <a href="#" className="ml-4 text-blue-500 hover:underline">View</a>
                            <a href="#" className="ml-4 text-green-500 hover:underline">Edit</a>
                        </li>
                        <li className="mb-2">
                            <span className="font-medium">Report 2:</span> X-Ray - 10/12/2024
                            <a href="#" className="ml-4 text-blue-500 hover:underline">View</a>
                            <a href="#" className="ml-4 text-green-500 hover:underline">Edit</a>
                        </li>
                        {/* Add more reports */}
                    </ul>
                </div>
            </div>
        </div>

    )
}

export default ReportsPage