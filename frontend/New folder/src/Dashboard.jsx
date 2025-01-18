import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [invoices, setInvoices] = useState([]);
  const [filteredInvoices, setFilteredInvoices] = useState([]);
  const [filter, setFilter] = useState("all");
  const navigate = useNavigate();

  useEffect(() => {
    const data = localStorage.getItem("user-info");
    const userData = data ? JSON.parse(data) : null;
    setUserInfo(userData);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user-info");
    navigate("/login");
  };

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await axios.get("http://localhost:5000/invoices", {
          withCredentials: true,
        });
        console.log("Got the invoices: ", response);

        setInvoices(response.data);
        setFilteredInvoices(response.data);
      } catch (error) {
        console.error("Error fetching invoices:", error);
      }
    };
    fetchInvoices();
  }, []);

  const handleFilter = (status) => {
    setFilter(status);
    if (status === "all") {
      setFilteredInvoices(invoices);
    } else {
      const filtered = invoices.filter((invoice) => invoice.status === status);
      setFilteredInvoices(filtered);
    }
  };

  return (
    <>
      <h1>Welcome {userInfo?.name}</h1>
      <h3>{userInfo?.email}</h3>
      <img src={userInfo?.image} alt={userInfo?.name} />
      <button onClick={handleLogout}>Logout</button>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Invoices</h1>

        <div className="mb-4">
          <button
            className={`px-4 py-2 mr-2 rounded ${
              filter === "all" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => handleFilter("all")}
          >
            All
          </button>
          <button
            className={`px-4 py-2 mr-2 rounded ${
              filter === "due" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => handleFilter("due")}
          >
            Due
          </button>
          <button
            className={`px-4 py-2 rounded ${
              filter === "paid" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => handleFilter("paid")}
          >
            Paid
          </button>
        </div>

        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">Invoice ID</th>
              <th className="border border-gray-300 px-4 py-2">Amount</th>
              <th className="border border-gray-300 px-4 py-2">
                Purchase Date
              </th>
              <th className="border border-gray-300 px-4 py-2">Due Date</th>
              <th className="border border-gray-300 px-4 py-2">Recipient</th>
              <th className="border border-gray-300 px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredInvoices.map((invoice) => (
              <tr
                key={`${invoice.id}-${invoice.dueDate}`}
                className="text-center"
              >
                <td className="border border-gray-300 px-4 py-2">
                  {invoice.id}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  ${invoice.amount?.toFixed(2) || "0.00"}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {invoice.purchaseDate || "N/A"}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {invoice.dueDate || "N/A"}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {invoice.recipientName || "N/A"}
                </td>
                <td
                  className={`border border-gray-300 px-4 py-2 ${
                    invoice.status === "due" ? "text-red-500" : "text-green-500"
                  }`}
                >
                  {invoice.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Dashboard;
