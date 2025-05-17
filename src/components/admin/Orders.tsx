import React, { useState } from "react";

const mockOrders = [
  {
    id: "#001",
    user: "John Doe",
    items: "Pizza x1, Coke x2",
    amount: "$18",
    status: "Confirmed",
    date: "2025-05-12",
  },
  {
    id: "#002",
    user: "Jane Smith",
    items: "Burger x2",
    amount: "$12",
    status: "Pending",
    date: "2025-05-13",
  },
  {
    id: "#003",
    user: "Alice Johnson",
    items: "Pasta x1",
    amount: "$9",
    status: "Cancelled",
    date: "2025-05-10",
  },
  {
    id: "#004",
    user: "Bob Brown",
    items: "Pizza x1, Salad x1",
    amount: "$15",
    status: "Confirmed",
    date: "2025-05-14",
  },
  {
    id: "#005",
    user: "Emily White",
    items: "Pasta x2",
    amount: "$18",
    status: "Confirmed",
    date: "2025-05-14",
  },
];

const statusTabs = ["All", "Confirmed", "Pending", "Cancelled"];

export default function Orders() {
  const [filter, setFilter] = useState("Confirmed");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;

  const filteredOrders =
    filter === "All"
      ? mockOrders
      : mockOrders.filter((order) => order.status === filter);

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredOrders.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Orders</h2>
      </div>

      {/* Tabs */}
      <div className="flex space-x-4 mb-4 border-b pb-2">
        {statusTabs.map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setFilter(tab);
              setCurrentPage(1);
            }}
            className={`px-3 py-1 rounded-md font-medium ${
              filter === tab
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-800 hover:bg-gray-200"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm border rounded">
          <thead className="bg-gray-100">
            <tr>
              {[
                "S.NO",
                "Order ID",
                "User Name",
                "Items",
                "Total Amount",
                "Order Status",
                "Order Date",
              ].map((h) => (
                <th
                  key={h}
                  className="px-4 py-3 text-left font-semibold text-gray-700"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentItems.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center px-4 py-6 text-gray-500">
                  No orders found.
                </td>
              </tr>
            ) : (
              currentItems.map((order, index) => (
                <tr key={order.id} className="border-t">
                  <td className="px-4 py-2">{startIndex + index + 1}</td>
                  <td className="px-4 py-2">{order.id}</td>
                  <td className="px-4 py-2">{order.user}</td>
                  <td className="px-4 py-2">{order.items}</td>
                  <td className="px-4 py-2">{order.amount}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        order.status === "Confirmed"
                          ? "bg-green-100 text-green-700"
                          : order.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-4 py-2">{order.date}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-end items-center mt-4 space-x-2">
        <button
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          Prev
        </button>
        <span className="text-sm font-medium text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
