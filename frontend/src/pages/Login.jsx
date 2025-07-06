// src/pages/Login.jsx
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post("/auth/login", formData);
      localStorage.setItem("token", res.data.token);
      toast.success("Logged in Successfully")
      setTimeout(()=>navigate("/"),1000);
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-b from-orange-100 to-orange-50">
      <form onSubmit={handleSubmit} className="bg-orange-100 p-8 shadow-xl rounded w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        <input
          className="w-full p-2 mb-4 border rounded"
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          className="w-full p-2 mb-4 border rounded"
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button className="w-full bg-orange-300 text-white py-2 rounded hover:bg-orange-600">
          Login
        </button>
      <p>Don't have an account ?<Link className="text-green-500"  to="/register"> Sign Up</Link></p>
      </form>
    </div>
  );
}
