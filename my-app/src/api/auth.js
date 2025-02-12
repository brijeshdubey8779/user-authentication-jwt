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
                Authorization: `Bearer ${token.toString()}`,
            },
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};


export const getUsers = async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_BASE_URL}/admin/users`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data.users;
};

export const updateUserRole = async (userId, role) => {
    const token = localStorage.getItem("token");
    await axios.put(
        `${API_BASE_URL}/admin/users/${userId}`,
        { role },
        {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        }
    );
};


export const logout = async () => {
    try {
        const token = localStorage.getItem("token");
        if (!token) {
            throw new Error("No token found");
        }

        const response = await axios.post(
            `${API_BASE_URL}/logout`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        localStorage.removeItem("token");
        localStorage.removeItem("role");

        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};


// export const genrateReports= async (data)=> {
//     const token = localStorage.getItem("token");
//     const response = await axios.get(`${API_BASE_URL}/add_new_report`, {
//         headers: {
//             Authorization: `Bearer ${token}`,
//         },
//     });
//     return response.data.reports;
// }

// A asyncronus fucntion that submits the data comming from multistep form to /add_new_report
export const submitReport = async (data) => {
    const token = localStorage.getItem("token");
    const response = await axios.post(`${API_BASE_URL}/add_new_report`, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};