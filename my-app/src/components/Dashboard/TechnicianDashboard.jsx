import React from 'react'

function TechnicianDashboard() {
    return (
        <div class="container mx-auto p-4">
            <h4 className='text-4xl text-center font-bold bg-blue-100 w-full'>Technician Dashboard</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">

                <div class="bg-white rounded-lg shadow-lg">
                    <div class="p-6">
                        <h5 class="text-xl font-semibold text-gray-800">Add New Report</h5>
                        <p class="text-gray-600">Add a new report to the system</p>
                        <a href="/technician" class="mt-4 inline-block bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">Add Report</a>
                    </div>
                </div>
                <div class="bg-white rounded-lg shadow-lg">
                    <div class="p-6">
                        <h5 class="text-xl font-semibold text-gray-800">View Reports</h5>
                        <p class="text-gray-600">View all reports in the system</p>
                        <a href="#" class="mt-4 inline-block bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">View Reports</a>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default TechnicianDashboard