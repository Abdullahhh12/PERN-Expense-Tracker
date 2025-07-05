import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { PlusCircle, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState({ balance: 0, income: 0, expense: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserAndTransactions = async () => {
      try {
        const userRes = await axiosInstance.get("/auth/me");
        setUser(userRes.data.user);
        setUserId(userRes.data.user.id);

        const [txRes, sumRes] = await Promise.all([
          axiosInstance.get(`/transactions/${userRes.data.user.id}`),
          axiosInstance.get(`/transactions/summary/${userRes.data.user.id}`),
        ]);

        setTransactions(txRes.data);
        setSummary(sumRes.data);
      } catch (err) {
        console.error(err);
        localStorage.removeItem("token");
        navigate("/login");
      }
    };

    fetchUserAndTransactions();
  }, [navigate]);

  const fetchSummary = async () => {
    if (!userId) return;
    try {
      const sumRes = await axiosInstance.get(`/transactions/summary/${userId}`);
      setSummary(sumRes.data);
    } catch (err) {
      console.error("Summary fetch error", err);
    }
  };

  const deleteTransaction = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await axiosInstance.delete(`/transactions/${id}`);
      setTransactions((prev) => prev.filter((t) => t.id !== id));
      fetchSummary(); // ✅ refresh summary after delete
    } catch (err) {
      console.error("Delete error", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-100 to-orange-50 p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold">Hello, {user?.name} 👋</h1>
        <button
          onClick={() => navigate("/create")}
          className="flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded shadow"
        >
          <PlusCircle size={18} /> Add
        </button>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-md mb-6">
        <h2 className="text-lg font-semibold mb-2">Total Balance</h2>
        <p className="text-3xl font-bold">${summary.balance}</p>
        <div className="flex justify-between mt-4">
          <p className="text-green-600">Income: +${summary.income}</p>
          <p className="text-red-500">Expenses: -${Math.abs(summary.expense)}</p>
        </div>
      </div>

      <h3 className="text-lg font-semibold mb-2">Recent Transactions</h3>
      <div className="space-y-3">
        {transactions.map((tx) => (
          <div
            key={tx.id}
            className="bg-white rounded-lg shadow flex justify-between items-center px-4 py-3"
          >
            <div>
              <p className="font-medium">{tx.title}</p>
              <p className="text-sm text-gray-500">
                {new Date(tx.created_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <p
                className={`font-semibold ${
                  tx.amount > 0 ? "text-green-600" : "text-red-500"
                }`}
              >
                {tx.amount > 0 ? `+$${tx.amount}` : `-$${Math.abs(tx.amount)}`}
              </p>
              <button onClick={() => deleteTransaction(tx.id)}>
                <Trash2 size={18} className="text-red-400 hover:text-red-600" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
