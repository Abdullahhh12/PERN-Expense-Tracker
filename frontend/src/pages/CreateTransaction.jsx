// src/pages/CreateTransaction.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

export default function CreateTransaction() {
  const [type, setType] = useState("expense");
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const user = await axiosInstance.get("/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = {
      title,
      amount: type === "expense" ? -Math.abs(amount) : Math.abs(amount),
      category: type,
      user_id: user.data.user.id,
    };

    await axiosInstance.post("/transactions", data, {
      headers: { Authorization: `Bearer ${token}` },
    });

    navigate("/");
  };

  return (
    <div className="min-h-screen bg-orange-50 p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md max-w-md mx-auto"
      >
        <h2 className="text-xl font-semibold mb-4">New Transaction</h2>

        <div className="flex gap-4 mb-4">
          <button
            type="button"
            onClick={() => setType("expense")}
            className={`px-4 py-2 rounded-full ${
              type === "expense" ? "bg-red-200" : "bg-gray-200"
            }`}
          >
            Expense
          </button>
          <button
            type="button"
            onClick={() => setType("income")}
            className={`px-4 py-2 rounded-full ${
              type === "income" ? "bg-green-200" : "bg-gray-200"
            }`}
          >
            Income
          </button>
        </div>

        <input
          className="w-full mb-4 p-2 border rounded"
          placeholder="Amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <input
          className="w-full mb-4 p-2 border rounded"
          placeholder="Title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
          Save Transaction
        </button>
      </form>
    </div>
  );
}
