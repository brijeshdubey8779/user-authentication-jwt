import React, { useState } from "react";
import { registerUser } from "../api/auth";
import { Link, useNavigate } from "react-router-dom";

function Register() {
    const navigate = useNavigate
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
            navigate("/login")
        } catch (error) {
            alert("Error: " + error);
        }
    };

    return (
        <div className="w-full bg-gray-600 h-screen flex items-center justify-center">
            <div className="min-w-[25%] min-h-[50%] rounded-sm  bg-slate-100 flex justify-center items-center">
                <form className="flex-1 p-4 max-w-md mx-auto text-center" onSubmit={handleSubmit}>
                    <h2 className="text-2xl font-bold mb-4">Register</h2>
                    <input
                        className="block w-full mb-5 p-2 border-2 border-blue-100 hover:border-blue-200 rounded-sm"
                        type="text"
                        name="username"
                        placeholder="Username"
                        onChange={handleChange}
                    />
                    <input
                        className="block w-full mb-5 p-2 border-2 border-blue-100 hover:border-blue-200 rounded-sm"
                        type="email"
                        name="email"
                        placeholder="Email"
                        onChange={handleChange}
                    />
                    <input
                        className="block w-full mb-5 p-2 border-2 border-blue-100 hover:border-blue-200 rounded-sm"
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={handleChange}
                    />
                    <select
                        className="block w-full mb-5 p-2 border"
                        name="role"
                        onChange={handleChange}
                    >
                        <option value="technician">Technician</option>
                        <option value="doctor">Doctor</option>
                        <option value="admin">Admin</option>
                    </select>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-md" type="submit">
                        Register
                    </button>
                    <Link to="/login">
                        <p className="text-blue-400 hover:text-blue-500 m-5 cursor-pointer">Alredy have an account? Login</p>
                    </Link>
                </form>
            </div>
        </div>
    );
}

export default Register;
