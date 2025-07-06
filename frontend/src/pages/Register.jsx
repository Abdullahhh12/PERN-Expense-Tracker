import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { toast } from "react-hot-toast"; // ✅ hot toast

export default function Register() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post("/auth/register", formData);
      localStorage.setItem("token", res.data.token);
      toast.success("Registered successfully!");
      setTimeout(() => navigate("/"), 1000); // delay so toast shows
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-b from-orange-100 to-orange-50">
      <form onSubmit={handleSubmit} className="bg-orange-100 p-8 shadow-xl rounded w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

        <input
          className="w-full p-2 mb-4 border rounded"
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
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
        <button className="w-full bg-orange-300 text-white py-2 rounded hover:bg-orange-500">
          Register
        </button>
        <p>Already have an account ? <Link className="text-blue-500" to="/login">Log in</Link></p>
      </form>
    </div>
  );
}
