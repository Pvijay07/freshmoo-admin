import React, { useEffect, useState } from "react";
import {
  Search,
  Filter,
  ChevronDown,
  ChevronUp,
  Download,
  MoreHorizontal,
  CheckCircle,
  Clock,
  Truck,
  XCircle,
} from "lucide-react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

import { getDeliveryPartners, getOrders } from "../api";
import { BsQuestionCircle } from "react-icons/bs";
import AssigneeDropdown from "./AssignOrderModal";
import axios from "axios";
const OrdersTable = () => {
  const [sortField, setSortField] = useState("date");
  const [sortDirection, setSortDirection] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [orders, setOrders] = useState([]);
const [assignees,setAssignees]=useState([])
  const ordersPerPage = 10;
  React.useEffect(() => {
    // Mock data for the orders
    const fetchOrders = async () => {
      const data = await getOrders();
      console.log(data.orders);
      setOrders(data.orders);
    };
    fetchOrders();
  }, []);

  // const orders=[]
  // Status options for filtering
  const statusOptions = [
    "All",
    "Pending",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancelled",
  ];

  // Sorting function
  const handleSort = (field) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // Sort and filter orders
  const filteredOrders = orders
    .filter((order) => {
      const matchesSearch =
        order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.email.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        filterStatus === "All" || order.status === filterStatus;

      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      let compareA = a[sortField];
      let compareB = b[sortField];

      // Convert string dates to Date objects for comparison
      if (sortField === "date") {
        compareA = new Date(compareA);
        compareB = new Date(compareB);
      }

      // Convert string amounts to numbers for comparison
      if (sortField === "amount") {
        compareA = parseFloat(compareA.replace("$", ""));
        compareB = parseFloat(compareB.replace("$", ""));
      }

      if (compareA < compareB) {
        return sortDirection === "asc" ? -1 : 1;
      }
      if (compareA > compareB) {
        return sortDirection === "asc" ? 1 : -1;
      }
      return 0;
    });

  // Pagination
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(
    indexOfFirstOrder,
    indexOfLastOrder
  );

  // Status badge component
  const StatusBadge = ({ status }) => {
    const statusConfig = {
      Delivered: {
        bg: "bg-green-100",
        text: "text-green-800",
        icon: <CheckCircle size={14} className="mr-1" />,
      },
      Processing: {
        bg: "bg-blue-100",
        text: "text-blue-800",
        icon: <Clock size={14} className="mr-1" />,
      },
      Shipped: {
        bg: "bg-purple-100",
        text: "text-purple-800",
        icon: <Truck size={14} className="mr-1" />,
      },
      Pending: {
        bg: "bg-yellow-100",
        text: "text-yellow-800",
        icon: <Clock size={14} className="mr-1" />,
      },
      Cancelled: {
        bg: "bg-red-100",
        text: "text-red-800",
        icon: <XCircle size={14} className="mr-1" />,
      },
    };

    // Ensure the status exists in the config, otherwise use a default fallback
    const config = statusConfig[status] || {
      bg: "bg-gray-100",
      text: "text-gray-800",
      icon: <BsQuestionCircle size={14} className="mr-1" />, // Use a default icon
    };

    return (
      <span
        className={`px-2 py-1 inline-flex items-center text-xs leading-5 font-semibold rounded-full ${config.bg} ${config.text}`}
      >
        {config.icon}
        {status || "Unknown"}
      </span>
    );
  };

  const generateRandomId = (orderId) => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    return `#FrMo${orderId}${randomNum}`;
  };
 

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await getDeliveryPartners();
      console.log(data)
      setAssignees(data.partners);
    };
    fetchUsers();
  }, []);

  return (
    <div className="bg-white rounded-lg shadow">
      {/* Header section */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-xl font-semibold text-gray-800">Orders</h1>
          {/* <div className="flex gap-2">
            <button className="px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 text-sm font-medium flex items-center hover:bg-gray-50">
              <Download size={16} className="mr-2" />
              Export
            </button>
            <button className="px-4 py-2 bg-indigo-600 rounded-md text-white text-sm font-medium hover:bg-indigo-700">
              Create Order
            </button>
          </div> */}
        </div>
      </div>

      {/* Filters section */}
      <div className="p-4 border-b border-gray-200 bg-gray-50">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-grow max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Search orders..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter size={18} className="text-gray-500" />
            <select
              className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Table section */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort("id")}
              >
                <div className="flex items-center">
                  Order ID
                  {sortField === "id" &&
                    (sortDirection === "asc" ? (
                      <ChevronUp size={16} className="ml-1" />
                    ) : (
                      <ChevronDown size={16} className="ml-1" />
                    ))}
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort("customer")}
              >
                <div className="flex items-center">
                  Customer
                  {sortField === "customer" &&
                    (sortDirection === "asc" ? (
                      <ChevronUp size={16} className="ml-1" />
                    ) : (
                      <ChevronDown size={16} className="ml-1" />
                    ))}
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort("date")}
              >
                <div className="flex items-center">
                  Date
                  {sortField === "date" &&
                    (sortDirection === "asc" ? (
                      <ChevronUp size={16} className="ml-1" />
                    ) : (
                      <ChevronDown size={16} className="ml-1" />
                    ))}
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort("status")}
              >
                <div className="flex items-center">
                  Status
                  {sortField === "status" &&
                    (sortDirection === "asc" ? (
                      <ChevronUp size={16} className="ml-1" />
                    ) : (
                      <ChevronDown size={16} className="ml-1" />
                    ))}
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort("payment")}
              >
                <div className="flex items-center">
                  Payment
                  {sortField === "payment" &&
                    (sortDirection === "asc" ? (
                      <ChevronUp size={16} className="ml-1" />
                    ) : (
                      <ChevronDown size={16} className="ml-1" />
                    ))}
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort("amount")}
              >
                <div className="flex items-center">
                  Amount
                  {sortField === "amount" &&
                    (sortDirection === "asc" ? (
                      <ChevronUp size={16} className="ml-1" />
                    ) : (
                      <ChevronDown size={16} className="ml-1" />
                    ))}
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort("items")}
              >
                <div className="flex items-center">
                  Items
                  {sortField === "items" &&
                    (sortDirection === "asc" ? (
                      <ChevronUp size={16} className="ml-1" />
                    ) : (
                      <ChevronDown size={16} className="ml-1" />
                    ))}
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
              >
                <div className="flex items-center">Assignee</div>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentOrders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">
                  {generateRandomId(order.id)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {order.customer}
                  </div>
                  <div className="text-sm text-gray-500">{order.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(order.order_date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <StatusBadge status={order.status} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {order.payment ?? ""}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {order.total_amount}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {order.item_count}
                </td>
                <AssigneeDropdown
                  assignees={assignees}
                  orderId={order.id}
                />
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination section */}
      <div className="px-6 py-4 bg-white border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Showing <span className="font-medium">{indexOfFirstOrder + 1}</span>{" "}
            to{" "}
            <span className="font-medium">
              {Math.min(indexOfLastOrder, filteredOrders.length)}
            </span>{" "}
            of <span className="font-medium">{filteredOrders.length}</span>{" "}
            orders
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className={`px-3 py-1 border rounded-md text-sm ${
                currentPage === 1
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              Previous
            </button>
            <button
              onClick={() =>
                setCurrentPage(Math.min(totalPages, currentPage + 1))
              }
              disabled={currentPage === totalPages}
              className={`px-3 py-1 border rounded-md text-sm ${
                currentPage === totalPages
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersTable;
