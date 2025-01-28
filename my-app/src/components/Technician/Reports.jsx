import React from 'react'

function Reports() {
    return (
        <div>
            {/* A section for reports where technician can view all reports in a tabular format and a call to action button to show complete report */}
            <nav className="bg-blue-500 text-white px-4 py-3">
                <ul className="flex justify-around">
                    <li>
                        <a href="/techniciandashboard" className="hover:underline">Dashboard</a>
                    </li>
                    <li>
                        <a href="#" className="hover:underline">Reports</a>
                    </li>
                </ul>
            </nav>
            <div className="reports-section p-6 bg-white rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold mb-4">Reports</h2>
                <table className="min-w-full table-auto border-collapse">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="py-2 px-4 text-left text-sm font-medium text-gray-700">Report ID</th>
                            <th className="py-2 px-4 text-left text-sm font-medium text-gray-700">Patient Name</th>
                            <th className="py-2 px-4 text-left text-sm font-medium text-gray-700">Report Date</th>
                            <th className="py-2 px-4 text-left text-sm font-medium text-gray-700">Clinical Details</th>
                            <th className="py-2 px-4 text-left text-sm font-medium text-gray-700">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-b hover:bg-gray-50">
                            <td className="py-2 px-4 text-sm text-gray-700">Report 1</td>
                            <td className="py-2 px-4 text-sm text-gray-700">Brijesh</td>
                            <td className="py-2 px-4 text-sm text-gray-700">2022-01-02</td>
                            <td className="py-2 px-4 text-sm text-gray-700">Report details 1</td>
                            <td className="py-2 px-4">
                                <button className="view-btn bg-blue-500 text-white py-1 px-3 rounded-md hover:bg-blue-600 transition duration-300">View</button>
                                <button className="download-btn bg-green-500 text-white py-1 px-3 rounded-md hover:bg-green-600 transition duration-300 ml-2">Download</button>
                            </td>
                        </tr>
                        <tr className="border-b hover:bg-gray-50">
                            <td className="py-2 px-4 text-sm text-gray-700">Report 2</td>
                            <td className="py-2 px-4 text-sm text-gray-700">Luffy</td>
                            <td className="py-2 px-4 text-sm text-gray-700">2022-01-02</td>
                            <td className="py-2 px-4 text-sm text-gray-700">Report details 2</td>
                            <td className="py-2 px-4">
                                <button className="view-btn bg-blue-500 text-white py-1 px-3 rounded-md hover:bg-blue-600 transition duration-300">View</button>
                                <button className="download-btn bg-green-500 text-white py-1 px-3 rounded-md hover:bg-green-600 transition duration-300 ml-2">Download</button>
                            </td>
                        </tr>
                        <tr className="border-b hover:bg-gray-50">
                            <td className="py-2 px-4 text-sm text-gray-700">Report 3</td>
                            <td className="py-2 px-4 text-sm text-gray-700">Sanju
                            </td>
                            <td className="py-2 px-4 text-sm text-gray-700">2022-01-03</td>
                            <td className="py-2 px-4 text-sm text-gray-700">Report details 3</td>
                            <td className="py-2 px-4">
                                <button className="view-btn bg-blue-500 text-white py-1 px-3 rounded-md hover:bg-blue-600 transition duration-300">View</button>
                                <button className="download-btn bg-green-500 text-white py-1 px-3 rounded-md hover:bg-green-600 transition duration-300 ml-2">Download</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <button className="mt-4 bg-indigo-600 text-white py-2 px-6 rounded-md hover:bg-indigo-700 transition duration-300">Show More Report</button>
            </div>
        </div>
    )
}

export default Reports