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
  Calendar,
  MapPin,
  Package,
} from "lucide-react";
import { getDeliveryPartners, getOrders } from "../api";
import { BsQuestionCircle } from "react-icons/bs";
import AssigneeDropdown from "./AssignOrderModal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const OrdersTable = () => {
  const [sortField, setSortField] = useState("order_date");
  const [sortDirection, setSortDirection] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [filterLocation, setFilterLocation] = useState("All");
  const [orders, setOrders] = useState([]);
  const [assignees, setAssignees] = useState([]);
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [productStats, setProductStats] = useState({});
  const ordersPerPage = 10;

  React.useEffect(() => {
    const fetchOrders = async () => {
      const data = await getOrders();
      setOrders(data.orders);
      calculateProductStats(data.orders);
    };
    fetchOrders();
  }, []);

  const calculateProductStats = (orders) => {
    const stats = {};
    orders.forEach(order => {
      order?.items?.split(',').forEach(item => {
        const product = item.trim();
        stats[product] = (stats[product] || 0) + 1;
      });
    });
    setProductStats(stats);
  };

  const statusOptions = [
    "All",
    "Pending",
    "Processing",
    "Out for Delivery",
    "Delivered",
    "Missed",
    "Cancelled",
  ];

  const locationOptions = ["All", "North", "South", "East", "West", "Central"];

  const handleSort = (field) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const handleSelectOrder = (orderId) => {
    setSelectedOrders(prev =>
      prev.includes(orderId)
        ? prev.filter(id => id !== orderId)
        : [...prev, orderId]
    );
  };

  const handleSelectAll = () => {
    if (selectedOrders.length === currentOrders.length) {
      setSelectedOrders([]);
    } else {
      setSelectedOrders(currentOrders.map(order => order.id));
    }
  };

  const handleBulkAssign = (assigneeId) => {
    // Implement bulk assignment logic
    console.log(`Assigning orders ${selectedOrders.join(', ')} to ${assigneeId}`);
    // Reset selection
    setSelectedOrders([]);
  };

  const filteredOrders = orders
    .filter((order) => {
      const matchesSearch =
        order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.email.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        filterStatus === "All" || order.status === filterStatus;

      const matchesDateRange =
        (!startDate || new Date(order.order_date) >= startDate) &&
        (!endDate || new Date(order.order_date) <= endDate);

      const matchesLocation =
        filterLocation === "All" || order.location === filterLocation;

      return matchesSearch && matchesStatus && matchesDateRange && matchesLocation;
    })
    .sort((a, b) => {
      let compareA = a[sortField];
      let compareB = b[sortField];

      if (sortField === "order_date") {
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
      "Out for Delivery": {
        bg: "bg-purple-100",
        text: "text-purple-800",
        icon: <Truck size={14} className="mr-1" />,
      },
      Pending: {
        bg: "bg-yellow-100",
        text: "text-yellow-800",
        icon: <Clock size={14} className="mr-1" />,
      },
      Missed: {
        bg: "bg-orange-100",
        text: "text-orange-800",
        icon: <XCircle size={14} className="mr-1" />,
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
        <div>
          <p className="text-gray-500">Location</p>
          <p>{order.location ?? "-"}</p>
        </div>
      </div>
      
      <div className="mt-2 flex justify-between items-center">
        <AssigneeDropdown assignees={assignees} orderId={order.id} />
        <input
          type="checkbox"
          checked={selectedOrders.includes(order.id)}
          onChange={() => handleSelectOrder(order.id)}
          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
        />
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
          <h1 className="text-xl font-semibold text-gray-800">Orders Management</h1>
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
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-4">
          <div className="flex items-center gap-2">
            <Filter size={18} className="text-gray-500" />
            <select
              className="w-full border rounded-md p-2 text-sm focus:ring-2 focus:ring-indigo-500"
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

          <div className="flex items-center gap-2">
            <MapPin size={18} className="text-gray-500" />
            <select
              className="w-full border rounded-md p-2 text-sm focus:ring-2 focus:ring-indigo-500"
              value={filterLocation}
              onChange={(e) => setFilterLocation(e.target.value)}
            >
              {locationOptions.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <Calendar size={18} className="text-gray-500" />
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              placeholderText="Start Date"
              className="w-full border rounded-md p-2 text-sm focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex items-center gap-2">
            <Calendar size={18} className="text-gray-500" />
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              placeholderText="End Date"
              className="w-full border rounded-md p-2 text-sm focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {selectedOrders.length > 0 && (
            <div className="flex items-center">
              <AssigneeDropdown 
                assignees={assignees} 
                onSelect={handleBulkAssign}
                buttonText={`Assign ${selectedOrders.length} Orders`}
              />
            </div>
          )}
        </div>

        {/* Product Statistics */}
        <div className="bg-gray-50 p-3 rounded-md mb-4">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Orders by Product</h3>
          <div className="flex flex-wrap gap-2">
            {Object.entries(productStats).map(([product, count]) => (
              <div key={product} className="flex items-center bg-white px-3 py-1 rounded-full shadow-xs">
                <Package size={14} className="text-indigo-500 mr-1" />
                <span className="text-xs font-medium">{product}:</span>
                <span className="text-xs ml-1 font-bold">{count}</span>
              </div>
            ))}
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
              <th className="px-4 py-2 w-8">
                <input
                  type="checkbox"
                  checked={selectedOrders.length === currentOrders.length && currentOrders.length > 0}
                  onChange={handleSelectAll}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
              </th>
              {["id", "customer", "order_date", "status", "payment", "amount", "items", "location"].map((field) => (
                <th
                  key={field}
                  className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort(field)}
                >
                  <div className="flex items-center">
                    {field === "order_date" ? "Date" : 
                     field === "order_date" ? "Date" : 
                     field.charAt(0).toUpperCase() + field.slice(1).replace('_', ' ')}
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
                <td className="px-4 py-2">
                  <input
                    type="checkbox"
                    checked={selectedOrders.includes(order.id)}
                    onChange={() => handleSelectOrder(order.id)}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                </td>
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
                  {order.location ?? "-"}
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