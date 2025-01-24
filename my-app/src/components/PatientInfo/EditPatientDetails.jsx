import React from 'react'

function EditPatientDetails() {
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

            <h1 className="text-2xl font-bold text-center my-6">Edit Patient Details</h1>
            <div className="container mx-auto max-w-lg">
                <div className="bg-white shadow-md rounded-lg p-6">
                    <form>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-medium mb-2">Name</label>
                            <input
                                type="text"
                                className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter patient name"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-medium mb-2">Age</label>
                            <input
                                type="number"
                                className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter patient age"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-medium mb-2">Contact</label>
                            <input
                                type="text"
                                className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter contact details"
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            Save Changes
                        </button>
                    </form>
                </div>
            </div>
        </div>

    )
}

export default EditPatientDetails