// src/utils/axiosInstance.js
import axios from "axios";

const base = import.meta.env.REACT_APP_API_URL || "https://pern-expense-tracker-bvv9.onrender.com";

const axiosInstance = axios.create({
  baseURL: `${base}/api`
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
