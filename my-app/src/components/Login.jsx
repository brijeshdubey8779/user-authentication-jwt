import React, { useState, useEffect } from "react";
import { loginUser } from "../api/auth";
import { useNavigate } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(formData);
      console.log(response)
      alert(`Logged in as ${response.role}`);
      localStorage.setItem("token", response.token);
      localStorage.setItem("role", response.role);
      console.log(access_token)
    } catch (error) {
      alert("Error: " + error);
    }
  };

  // redireting user to dashboard if acces token is available and if not redirecting to log in page but lets do this using useEffect 
  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (token) {
      navigate("/dashboard");
    }
  }, []);

  return (
    <form className="p-4 max-w-md mx-auto" onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold mb-4">Login</h2>
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
      <button className="bg-blue-500 text-white px-4 py-2" type="submit">
        Login
      </button>
    </form>
  );
}

export default Login;
