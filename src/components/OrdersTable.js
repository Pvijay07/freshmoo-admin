import React, { useEffect, useState } from "react";
import {
  Search,
  Filter,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  Clock,
  Truck,
  XCircle,
  MoreHorizontal,
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
  const [assignees, setAssignees] = useState([]);
  const ordersPerPage = 10;

  React.useEffect(() => {
    const fetchOrders = async () => {
      const data = await getOrders();
      setOrders(data.orders);
    };
    fetchOrders();
  }, []);

  const statusOptions = [
    "All",
    "Pending",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancelled",
  ];

  const handleSort = (field) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

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

      if (sortField === "date") {
        compareA = new Date(compareA);
        compareB = new Date(compareB);
      }

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

  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);

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

    const config = statusConfig[status] || {
      bg: "bg-gray-100",
      text: "text-gray-800",
      icon: <BsQuestionCircle size={14} className="mr-1" />,
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

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await getDeliveryPartners();
      setAssignees(data.partners);
    };
    fetchUsers();
  }, []);

  // Mobile view row component
  const MobileOrderRow = ({ order }) => (
    <div className="p-3 border-b">
      <div className="flex justify-between items-start">
        <div>
          <p className="font-medium text-indigo-600">#{order.id}</p>
          <p className="font-medium">{order.customer}</p>
        </div>
        <StatusBadge status={order.status} />
      </div>
      
      <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
        <div>
          <p className="text-gray-500">Date</p>
          <p>
            {new Date(order.order_date).toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </p>
        </div>
        <div>
          <p className="text-gray-500">Amount</p>
          <p>{order.amount}</p>
        </div>
        <div>
          <p className="text-gray-500">Payment</p>
          <p>{order.payment ?? "-"}</p>
        </div>
        <div>
          <p className="text-gray-500">Items</p>
          <p>{order.items}</p>
        </div>
      </div>
      
      <div className="mt-2">
        <AssigneeDropdown assignees={assignees} orderId={order.id} />
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-4 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4">
        <h1 className="text-xl font-semibold text-gray-800">Orders</h1>
        <div className="w-full sm:w-auto flex gap-2">
          <div className="relative flex-grow sm:max-w-xs">
            <Search
              size={18}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              className="w-full pl-10 pr-3 py-2 border rounded-md text-sm placeholder-gray-400 focus:ring-2 focus:ring-indigo-500"
              placeholder="Search orders..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter size={18} className="text-gray-500 hidden sm:block" />
            <select
              className="border rounded-md p-2 text-sm focus:ring-2 focus:ring-indigo-500"
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

      {/* Mobile View */}
      <div className="sm:hidden">
        {currentOrders.map((order) => (
          <MobileOrderRow key={order.id} order={order} />
        ))}
      </div>

      {/* Desktop View */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {["id", "customer", "date", "status", "payment", "amount", "items"].map((field) => (
                <th
                  key={field}
                  className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort(field)}
                >
                  <div className="flex items-center">
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                    {sortField === field &&
                      (sortDirection === "asc" ? (
                        <ChevronUp size={16} />
                      ) : (
                        <ChevronDown size={16} />
                      ))}
                  </div>
                </th>
              ))}
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Assignee
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentOrders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 text-sm font-medium text-indigo-600">
                  #{order.id}
                </td>
                <td className="px-4 py-2 text-sm font-medium text-gray-900">
                  {order.customer}
                </td>
                <td className="px-4 py-2 text-sm text-gray-500">
                  {new Date(order.order_date).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </td>
                <td className="px-4 py-2 text-sm">
                  <StatusBadge status={order.status} />
                </td>
                <td className="px-4 py-2 text-sm text-gray-500">
                  {order.payment ?? "-"}
                </td>
                <td className="px-4 py-2 text-sm font-medium text-gray-900">
                  {order.amount}
                </td>
                <td className="px-4 py-2 text-sm text-gray-500">
                  {order.items}
                </td>
                <td className="px-4 py-2 text-sm text-gray-500">
                  {assignees[order.id]?.name ? (
                    assignees[order.id].name
                  ) : (
                    <AssigneeDropdown assignees={assignees} orderId={order.id} />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-4 bg-white border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center">
        <div className="text-sm text-gray-700 mb-2 sm:mb-0">
          Showing {indexOfFirstOrder + 1} to{" "}
          {Math.min(indexOfLastOrder, filteredOrders.length)} of{" "}
          {filteredOrders.length} orders
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className={`px-3 py-1 border rounded-md text-sm ${
              currentPage === 1
                ? "bg-gray-100 text-gray-400"
                : "bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            Previous
          </button>
          <button
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 border rounded-md text-sm ${
              currentPage === totalPages
                ? "bg-gray-100 text-gray-400"
                : "bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrdersTable;