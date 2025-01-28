import React from 'react'

function TechnicianDashboard() {
    return (
        <div className="container mx-auto p-4">
            <h4 className='text-4xl text-center font-bold bg-blue-100 w-full'>Technician Dashboard</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <div className="bg-white rounded-lg shadow-lg">
                    <div className="p-6">
                        <h5 className="text-xl font-semibold text-gray-800">Add New Report</h5>
                        <p className="text-gray-600">Add a new report to the system</p>
                        <a href="/technician" className="mt-4 inline-block bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">Add Report</a>
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow-lg">
                    <div className="p-6">
                        <h5 className="text-xl font-semibold text-gray-800">View Reports</h5>
                        <p className="text-gray-600">View all reports in the system</p>
                        <a href="/reports" className="mt-4 inline-block bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">View Reports</a>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default TechnicianDashboard