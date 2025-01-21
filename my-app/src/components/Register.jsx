import React, { useState } from "react";
import { registerUser } from "../api/auth";

function Register() {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        role: "technician",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await registerUser(formData);
            alert("User registered: " + response.message);
        } catch (error) {
            alert("Error: " + error);
        }
    };

    return (
        <form className="p-4 max-w-md mx-auto" onSubmit={handleSubmit}>
            <h2 className="text-2xl font-bold mb-4">Register</h2>
            <input
                className="block w-full mb-3 p-2 border"
                type="text"
                name="username"
                placeholder="Username"
                onChange={handleChange}
            />
            <input
                className="block w-full mb-3 p-2 border"
                type="email"
                name="email"
                placeholder="Email"
                onChange={handleChange}
            />
            <input
                className="block w-full mb-3 p-2 border"
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
            />
            <select
                className="block w-full mb-3 p-2 border"
                name="role"
                onChange={handleChange}
            >
                <option value="technician">Technician</option>
                <option value="doctor">Doctor</option>
                <option value="admin">Admin</option>
            </select>
            <button className="bg-blue-500 text-white px-4 py-2" type="submit">
                Register
            </button>
        </form>
    );
}

export default Register;
