import axios from "axios";

const API_BASE_URL = "http://localhost:5000/auth";

export const registerUser = async (userData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/register`, userData);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const loginUser = async (credentials) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/login`, credentials);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const getProtectedData = async () => {
    const token = localStorage.getItem("token");
    try {
        const response = await axios.get("http://localhost:5000/protected", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};