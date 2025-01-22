import React, { useState, useEffect } from "react";
import { getUsers, updateUserRole, logout } from "../../api/auth"; // API calls to Flask

function AdminDashboard() {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState("");

    // Fetch users on component mount
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await getUsers();
                setUsers(data);
            } catch (err) {
                setError(err.message || "Failed to fetch users.");
            }
        };
        fetchUsers();
    }, []);

    // Handle role update
    const handleRoleChange = async (userId, newRole) => {
        try {
            await updateUserRole(userId, newRole);
            setUsers((prevUsers) =>
                prevUsers.map((user) =>
                    user.id === userId ? { ...user, role: newRole } : user
                )
            );
            alert("Role updated successfully!");
        } catch (err) {
            setError(err.message || "Failed to update role.");
        }
    };

    // Logout admin
    const handleLogout = () => {
        logout();
        window.location.href = "/login"; // Redirect to login page
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
            {error && <div className="text-red-500">{error}</div>}
            <button
                className="bg-red-500 text-white px-4 py-2 mb-6 rounded"
                onClick={handleLogout}
            >
                Logout
            </button>
            <div className="overflow-x-auto">
                <table className="table-auto w-full border-collapse border border-gray-200">
                    <thead>
                        <tr>
                            <th className="border border-gray-300 px-4 py-2">ID</th>
                            <th className="border border-gray-300 px-4 py-2">Username</th>
                            <th className="border border-gray-300 px-4 py-2">Email</th>
                            <th className="border border-gray-300 px-4 py-2">Role</th>
                            <th className="border border-gray-300 px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td className="border border-gray-300 px-4 py-2">{user.id}</td>
                                <td className="border border-gray-300 px-4 py-2">{user.username}</td>
                                <td className="border border-gray-300 px-4 py-2">{user.email}</td>
                                <td className="border border-gray-300 px-4 py-2">{user.role}</td>
                                <td className="border border-gray-300 px-4 py-2">
                                    <select
                                        value={user.role}
                                        onChange={(e) => handleRoleChange(user.id, e.target.value)}
                                        className="p-2 border rounded"
                                    >
                                        <option value="admin">Admin</option>
                                        <option value="doctor">Doctor</option>
                                        <option value="technician">Technician</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default AdminDashboard;
