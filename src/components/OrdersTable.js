import React, { useState } from "react";
import AssignOrderModal from "./AssignOrderModal";
import { MdDelete, MdEdit } from "react-icons/md";
import { FaBox, FaUserCheck } from "react-icons/fa";

const OrdersTable = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const orders = [
    { id: 1, customer: "John Doe", amount: 1000, status: "Pending" },
    { id: 2, customer: "Jane Smith", amount: 1500, status: "Shipped" },
  ];

  const handleAssignOrder = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  return (
    <div className="flex-1 p-6">
      <h2 className="text-xl font-bold mb-4 flex items-center">
        <FaBox className="mr-2" />
        Orders
      </h2>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Order ID</th>
            <th className="py-2 px-4 border-b">Customer</th>
            <th className="py-2 px-4 border-b">Amount</th>
            <th className="py-2 px-4 border-b">Status</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td className="py-2 px-4 border-b">{order.id}</td>
              <td className="py-2 px-4 border-b">{order.customer}</td>
              <td className="py-2 px-4 border-b">₹{order.amount}</td>
              <td className="py-2 px-4 border-b">{order.status}</td>
              <td className="py-2 px-4 border-b">
                <button
                  className="text-green-500 hover:text-green-700 mr-2"
                  onClick={() => handleAssignOrder(order.id)} // Replace with your function
                >
                  <FaUserCheck />
                </button>
                <button className="text-blue-500 hover:text-blue-700 mr-2">
                  <MdEdit />
                </button>
                <button className="text-red-500 hover:text-red-700">
                  <MdDelete />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <AssignOrderModal
          order={selectedOrder}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default OrdersTable;
