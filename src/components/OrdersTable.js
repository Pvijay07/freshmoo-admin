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
  Users,
  X,
  Check,
  MoreHorizontal,
} from "lucide-react";
import { getDeliveryPartners, getOrders, assignOrder } from "../api";

const AssigneeDropdown = ({
  assignees,
  orderId,
  onSelect,
  buttonText,
  selectedAssignee,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (assignee) => {
    if (onSelect) {
      onSelect(assignee.id, orderId);
    } else {
      console.log(`Assigning order ${orderId} to ${assignee.name}`);
    }
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`inline-flex items-center px-3 py-2 border shadow-sm text-sm leading-4 font-medium rounded-md ${
          selectedAssignee
            ? "border-green-300 bg-green-50 text-green-700"
            : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
        } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
      >
        {selectedAssignee?.name || buttonText || "Assign"}
        <ChevronDown className="ml-2 -mr-0.5 h-4 w-4" />
      </button>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
          <div className="py-1">
            {assignees.map((assignee) => (
              <button
                key={assignee.id}
                onClick={() => handleSelect(assignee)}
                className="w-full flex justify-between items-center text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <span>{assignee.name}</span>
                {selectedAssignee?.id === assignee.id && (
                  <Check size={16} className="text-green-500" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

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
  const [assignments, setAssignments] = useState({}); // { orderId: assignee }
  const [bulkAssignMode, setBulkAssignMode] = useState(false);
  const [bulkAssignee, setBulkAssignee] = useState(null);
  const ordersPerPage = 10;

  React.useEffect(() => {
    const fetchOrders = async () => {
      const data = await getOrders();
      setOrders(data.orders);
      calculateProductStats(data.orders);

      // Initialize assignments from localStorage
      const initialAssignments = {};
      data.orders.forEach((order) => {
        const savedAssignee = localStorage.getItem(`assignee-${order.id}`);
        if (savedAssignee) {
          initialAssignments[order.id] = JSON.parse(savedAssignee);
        }
      });
      setAssignments(initialAssignments);
    };
    fetchOrders();
  }, []);

  const calculateProductStats = (orders) => {
    const stats = {};
    orders.forEach((order) => {
      order?.items?.split(",").forEach((item) => {
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

  const locationOptions = [...new Set(orders.map(p => p.address))];

  const handleSort = (field) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const handleSelectOrder = (orderId) => {
    setSelectedOrders((prev) =>
      prev.includes(orderId)
        ? prev.filter((id) => id !== orderId)
        : [...prev, orderId]
    );
  };

  const handleSelectAll = () => {
    if (selectedOrders.length === currentOrders.length) {
      setSelectedOrders([]);
    } else {
      setSelectedOrders(currentOrders.map((order) => order.id));
    }
  };

  const handleAssign = async (assigneeId, orderId = null) => {
    const assignee = assignees.find((a) => a.id === assigneeId);
    if (!assignee) return;

    try {
      // If bulk assigning
      if (bulkAssignMode && orderId === null) {
        const orderIds = selectedOrders;
        const results = await Promise.allSettled(
          orderIds.map((id) => assignOrder({ id: assigneeId }, id))
        );

        // Process results
        const successfulAssignments = [];
        const failedAssignments = [];

        results.forEach((result, index) => {
          if (result.status === "fulfilled") {
            successfulAssignments.push(orderIds[index]);
          } else {
            failedAssignments.push(orderIds[index]);
          }
        });

        // Update local state for successful assignments
        const newAssignments = { ...assignments };
        successfulAssignments.forEach((id) => {
          newAssignments[id] = assignee;
          localStorage.setItem(`assignee-${id}`, JSON.stringify(assignee));
        });
        setAssignments(newAssignments);

        // Show summary alert
        if (failedAssignments.length === 0) {
          alert(
            `Successfully assigned ${successfulAssignments.length} orders to ${assignee.name}`
          );
        } else {
          alert(
            `Assigned ${successfulAssignments.length} orders successfully.\n` +
              `Failed to assign ${failedAssignments.length} orders.`
          );
        }

        setSelectedOrders([]);
        setBulkAssignMode(false);
        setBulkAssignee(null);
      }
      // If assigning single order
      else if (orderId) {
        const response = await assignOrder({ id: assigneeId }, orderId);

        // Update local state
        const newAssignments = { ...assignments, [orderId]: assignee };
        setAssignments(newAssignments);
        localStorage.setItem(`assignee-${orderId}`, JSON.stringify(assignee));

        console.log(`Assigned order ${orderId} to ${assignee.name}`);
      }
    } catch (error) {
      console.error("Assignment error:", error);
      if (bulkAssignMode) {
        alert("An error occurred during bulk assignment");
      }
    }
  };
  const startBulkAssign = () => {
    setBulkAssignMode(true);
  };

  const cancelBulkAssign = () => {
    setBulkAssignMode(false);
    setBulkAssignee(null);
    setSelectedOrders([]);
  };

  const clearSelection = () => {
    setSelectedOrders([]);
  };

  const filteredOrders = orders
    .filter((order) => {
      const matchesSearch =
        order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.email.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        filterStatus === "All" || order.status === filterStatus;

      const matchesDateRange = true; // Simplified for demo

      const matchesLocation =
        filterLocation === "All" || order.address === filterLocation;

      return (
        matchesSearch && matchesStatus && matchesDateRange && matchesLocation
      );
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
  const currentOrders = filteredOrders.slice(
    indexOfFirstOrder,
    indexOfLastOrder
  );

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
      icon: <Clock size={14} className="mr-1" />,
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
          <p>{order.total_amount}</p>
        </div>
        <div>
          <p className="text-gray-500">Payment</p>
          <p>{order.payment ?? "-"}</p>
        </div>
        <div>
          <p className="text-gray-500">Items</p>
          <p>{order.item_count}</p>
        </div>
        <div>
          <p className="text-gray-500">Location</p>
          <p>{order.address ?? "-"}</p>
        </div>
      </div>

      <div className="mt-2 flex justify-between items-center">
        <AssigneeDropdown
          assignees={assignees}
          orderId={order.id}
          onSelect={handleAssign}
          selectedAssignee={assignments[order.id]}
        />
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
          <h1 className="text-xl font-semibold text-gray-800">
            Orders Management
          </h1>
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

        {/* Bulk Assignment Bar - Shows when orders are selected */}
        {selectedOrders.length > 0 && (
          <div className="mb-4 p-3 bg-indigo-50 border border-indigo-200 rounded-lg">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div className="flex items-center gap-3">
                <div className="flex items-center text-indigo-700">
                  <Users size={18} className="mr-2" />
                  <span className="font-medium">
                    {selectedOrders.length} order
                    {selectedOrders.length > 1 ? "s" : ""} selected
                  </span>
                </div>
                <button
                  onClick={clearSelection}
                  className="text-indigo-600 hover:text-indigo-800 text-sm flex items-center"
                >
                  <X size={16} className="mr-1" />
                  Clear selection
                </button>
              </div>

              {bulkAssignMode ? (
                <div className="flex items-center gap-2">
                  <AssigneeDropdown
                    assignees={assignees}
                    onSelect={(assigneeId) => {
                      setBulkAssignee(
                        assignees.find((a) => a.id === assigneeId)
                      );
                      handleAssign(assigneeId);
                    }}
                    buttonText={
                      bulkAssignee ? bulkAssignee.name : "Select Assignee"
                    }
                    selectedAssignee={bulkAssignee}
                  />
                  <button
                    onClick={cancelBulkAssign}
                    className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  onClick={startBulkAssign}
                  className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  Bulk Assign
                </button>
              )}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
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
            <input
              type="date"
              value={startDate || ""}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full border rounded-md p-2 text-sm focus:ring-2 focus:ring-indigo-500"
              placeholder="Start Date"
            />
          </div>

          <div className="flex items-center gap-2">
            <Calendar size={18} className="text-gray-500" />
            <input
              type="date"
              value={endDate || ""}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full border rounded-md p-2 text-sm focus:ring-2 focus:ring-indigo-500"
              placeholder="End Date"
            />
          </div>
        </div>

        {/* Product Statistics */}
        <div className="bg-gray-50 p-3 rounded-md mb-4">
          <h3 className="text-sm font-medium text-gray-700 mb-2">
            Orders by Product
          </h3>
          <div className="flex flex-wrap gap-2">
            {Object.entries(productStats).map(([product, count]) => (
              <div
                key={product}
                className="flex items-center bg-white px-3 py-1 rounded-full shadow-xs"
              >
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
                  checked={
                    selectedOrders.length === currentOrders.length &&
                    currentOrders.length > 0
                  }
                  onChange={handleSelectAll}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
              </th>
              {[
                "id",
                "customer",
                "order_date",
                "status",
                "payment",
                "total_amount",
                "item_count",
                "location",
              ].map((field) => (
                <th
                  key={field}
                  className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort(field)}
                >
                  <div className="flex items-center">
                    {field === "order_date"
                      ? "Date"
                      : field === "total_amount"
                      ? "Amount"
                      : field === "item_count"
                      ? "Items"
                      : field.charAt(0).toUpperCase() +
                        field.slice(1).replace("_", " ")}
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
                  {order.payment ?? "Done"}
                </td>
                <td className="px-4 py-2 text-sm font-medium text-gray-900">
                  {order.total_amount}
                </td>
                <td className="px-4 py-2 text-sm text-gray-500">
                  {order.item_count}
                </td>
                <td className="px-4 py-2 text-sm text-gray-500">
                  {order.address ?? "-"}
                </td>
                <td className="px-4 py-2 text-sm text-gray-500">
                  <AssigneeDropdown
                    assignees={assignees}
                    orderId={order.id}
                    onSelect={handleAssign}
                    selectedAssignee={assignments[order.id]}
                  />
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
            onClick={() =>
              setCurrentPage(Math.min(totalPages, currentPage + 1))
            }
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
