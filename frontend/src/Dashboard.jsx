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

  //zap logic:
  const triggerZap = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/exezap",
        {},
        {
          withCredentials: true,
        }
      );
      alert(response.data.message || "Zap triggered successfully!");
    } catch (error) {
      console.error("Error triggering Zap:", error);
      alert("Failed to trigger Zap. Check console for details.");
    }
  };

  return (
    <>
      <h1 className="text-3xl font-bold text-teal-600 mb-2">
        Welcome {userInfo?.name}
      </h1>
      <h3 className="text-lg text-teal-500">{userInfo?.email}</h3>
      <img
        className="rounded-full border-4 border-teal-200 mb-4"
        src={userInfo?.image}
        alt={userInfo?.name}
      />
      <div className="mb-4">
        <button
          className="px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600 mr-2"
          onClick={triggerZap}
        >
          Send Due Alert
        </button>
        <button
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>

      <div className="container mx-auto p-6 bg-gray-50 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4 text-teal-600">Invoices</h1>

        <div className="mb-4">
          <button
            className={`px-4 py-2 mr-2 rounded ${
              filter === "all"
                ? "bg-teal-500 text-white"
                : "bg-gray-200 text-teal-700"
            }`}
            onClick={() => handleFilter("all")}
          >
            All
          </button>
          <button
            className={`px-4 py-2 mr-2 rounded ${
              filter === "due"
                ? "bg-teal-500 text-white"
                : "bg-gray-200 text-teal-700"
            }`}
            onClick={() => handleFilter("due")}
          >
            Due
          </button>
          <button
            className={`px-4 py-2 rounded ${
              filter === "paid"
                ? "bg-teal-500 text-white"
                : "bg-gray-200 text-teal-700"
            }`}
            onClick={() => handleFilter("paid")}
          >
            Paid
          </button>
        </div>

        <table className="table-auto w-full border border-teal-300 rounded-lg shadow-md">
          <thead>
            <tr className="bg-teal-100">
              <th className="border border-teal-300 px-4 py-2 text-teal-700">
                Invoice ID
              </th>
              <th className="border border-teal-300 px-4 py-2 text-teal-700">
                Amount
              </th>
              <th className="border border-teal-300 px-4 py-2 text-teal-700">
                Purchase Date
              </th>
              <th className="border border-teal-300 px-4 py-2 text-teal-700">
                Due Date
              </th>
              <th className="border border-teal-300 px-4 py-2 text-teal-700">
                Name
              </th>
              <th className="border border-teal-300 px-4 py-2 text-teal-700">
                Email
              </th>
              <th className="border border-teal-300 px-4 py-2 text-teal-700">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredInvoices.map((invoice) => {
              const formatDate = (date) => {
                if (!date) return "N/A";
                const formattedDate = new Date(date).toLocaleString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                });
                return formattedDate;
              };

              return (
                <tr
                  key={`${invoice.id}-${invoice.dueDate}`}
                  className="text-center hover:bg-teal-50"
                >
                  <td className="border border-teal-300 px-4 py-2">
                    {invoice.id}
                  </td>
                  <td className="border border-teal-300 px-4 py-2">
                    ${invoice.amount?.toFixed(2) || "0.00"}
                  </td>
                  <td className="border border-teal-300 px-4 py-2">
                    {formatDate(invoice.purchaseDate)}
                  </td>
                  <td className="border border-teal-300 px-4 py-2">
                    {formatDate(invoice.dueDate)}
                  </td>
                  <td className="border border-teal-300 px-4 py-2">
                    {invoice.recipientName || "N/A"}
                  </td>
                  <td className="border border-teal-300 px-4 py-2">
                    {invoice.recipientEmail || "N/A"}
                  </td>
                  <td
                    className={`border border-teal-300 px-4 py-2 ${
                      invoice.status === "due"
                        ? "text-red-500"
                        : "text-green-500"
                    }`}
                  >
                    {invoice.status}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Dashboard;
