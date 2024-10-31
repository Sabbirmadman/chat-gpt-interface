import axios from "axios";

export const API_BASE_URL = "http://localhost:9292/api";

export const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        // Handle errors here (e.g., showing notifications)
        console.error("API Error:", error.response?.data || error.message);
        return Promise.reject(error);
    }
);
