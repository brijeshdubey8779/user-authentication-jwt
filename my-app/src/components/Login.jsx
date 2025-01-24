import React, { useState, useEffect } from "react";
import { loginUser } from "../api/auth";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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
      alert(`Logged in as ${response.role}`);
      localStorage.setItem("token", response.token);
      localStorage.setItem("role", response.role);
      setIsLoggedIn(true)
    } catch (error) {
      alert("Error: " + error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    console.log(role);

    if (token) {
      if (role == "admin") {
        navigate("/admindashboard");
      }
      else if (role == "doctor") {
        navigate("/doctordashboard");
      }
      else {
        navigate("/dashboard");
      }
    }
    // else {
    //   alert(`Please login to access dashboard`)
    // }
  }, [isLoggedIn]);

  return (
    <div className="w-full bg-gray-600 h-screen flex items-center justify-center">
      <div className="min-w-[25%] min-h-[50%] rounded-sm  bg-slate-100 flex justify-center items-center">
        <form className="flex-1 p-4 max-w-md mx-auto text-center" onSubmit={handleSubmit}>
          <h2 className="text-2xl font-bold mb-4">Login</h2>
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
          <p className="text-blue-400 hover:text-blue-500 m-5 cursor-pointer">Forgot password? Click here to reset</p>
          <button className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-md" type="submit">
            Login
          </button>
          <Link to="/register">
            <p className="text-blue-400 hover:text-blue-500 m-5 cursor-pointer">Don't have an account? Click here to Register</p>
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Login;
