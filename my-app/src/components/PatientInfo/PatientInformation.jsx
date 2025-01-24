import React from 'react'

function PatientInformation() {
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

            <h1 className="text-2xl font-bold text-center my-6">Patient Information</h1>
            <div className="container mx-auto">
                <div className="bg-white shadow-md rounded-lg p-6">
                    <h2 className="text-lg font-semibold mb-4">Patient Details</h2>
                    <table className="table-auto w-full border-collapse border border-gray-300">
                        <thead>
                            <tr>
                                <th className="border border-gray-300 px-4 py-2">Name</th>
                                <th className="border border-gray-300 px-4 py-2">Age</th>
                                <th className="border border-gray-300 px-4 py-2">Contact</th>
                                <th className="border border-gray-300 px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="border border-gray-300 px-4 py-2">John Doe</td>
                                <td className="border border-gray-300 px-4 py-2">34</td>
                                <td className="border border-gray-300 px-4 py-2">123-456-7890</td>
                                <td className="border border-gray-300 px-4 py-2">
                                    <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
                                        Edit
                                    </button>
                                </td>
                            </tr>
                            {/* Repeat rows */}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    )
}

export default PatientInformation