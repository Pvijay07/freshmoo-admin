import React from "react";
import { Link } from "react-router-dom";
import { FaBox, FaUsers, FaTruck, FaShoppingCart } from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className="bg-gray-800 text-white w-64 min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <ul>
        <li className="mb-4">
          <Link
            to="/dashboard/orders"
            className="flex items-center hover:text-gray-400"
          >
            <FaBox className="mr-2" /> Orders
          </Link>
        </li>
        <li className="mb-4">
          <Link
            to="/dashboard/users"
            className="flex items-center hover:text-gray-400"
          >
            <FaUsers className="mr-2" /> Users
          </Link>
        </li>
        <li className="mb-4">
          <Link
            to="/dashboard/delivery-partners"
            className="flex items-center hover:text-gray-400"
          >
            <FaTruck className="mr-2" /> Delivery Partners
          </Link>
        </li>
        <li className="mb-4">
          <Link
            to="/dashboard/products"
            className="flex items-center hover:text-gray-400"
          >
            <FaShoppingCart className="mr-2" /> Products
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
