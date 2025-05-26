import React, { useEffect, useState } from "react";
import { ChevronDown, ChevronUp, Search, Filter, X, Calendar } from "lucide-react";

const UsersTable = () => {
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortDirection, setSortDirection] = useState("desc");
  const [sortField, setSortField] = useState("created_at");
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const usersPerPage = 10;

  // Filter states
  const [filters, setFilters] = useState({
    status: "",
    gender: "",
    subscriptionStatus: "",
    walletBalance: { min: "", max: "" },
    deliveryStatus: "",
    dateRange: { start: "", end: "" }
  });

  // Mock data - replace with actual API call
  useEffect(() => {
    const mockUsers = [
      {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        number: "+1-555-0123",
        gender: "Male",
        status: "active",
        subscriptionStatus: "premium",
        walletBalance: 150.75,
        deliveryStatus: "delivered",
        created_at: "2024-01-15T10:30:00Z",
        totalOrders: 5
      },
      {
        id: 2,
        name: "Jane Smith",
        email: "jane@example.com",
        number: "+1-555-0124",
        gender: "Female",
        status: "active",
        subscriptionStatus: "basic",
        walletBalance: 45.20,
        deliveryStatus: "pending",
        created_at: "2024-02-20T14:15:00Z",
        totalOrders: 2
      },
      {
        id: 3,
        name: "Bob Johnson",
        email: "bob@example.com",
        number: "+1-555-0125",
        gender: "Male",
        status: "inactive",
        subscriptionStatus: "none",
        walletBalance: 0,
        deliveryStatus: "failed",
        created_at: "2024-01-10T09:45:00Z",
        totalOrders: 0
      },
      {
        id: 4,
        name: "Alice Brown",
        email: "alice@example.com",
        number: "+1-555-0126",
        gender: "Female",
        status: "pending",
        subscriptionStatus: "premium",
        walletBalance: 320.50,
        deliveryStatus: "delivered",
        created_at: "2024-03-05T16:20:00Z",
        totalOrders: 8
      },
      {
        id: 5,
        name: "Charlie Wilson",
        email: "charlie@example.com",
        number: "+1-555-0127",
        gender: "Male",
        status: "active",
        subscriptionStatus: "premium",
        walletBalance: 89.99,
        deliveryStatus: "in_transit",
        created_at: "2024-02-28T11:00:00Z",
        totalOrders: 3
      }
    ];
    setUsers(mockUsers);
  }, []);

  // Apply filters
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.number?.includes(searchQuery);

    const matchesStatus = !filters.status || user.status === filters.status;
    const matchesGender = !filters.gender || user.gender === filters.gender;
    const matchesSubscription = !filters.subscriptionStatus || user.subscriptionStatus === filters.subscriptionStatus;
    const matchesDelivery = !filters.deliveryStatus || user.deliveryStatus === filters.deliveryStatus;

    // Wallet balance filter
    const matchesWalletMin = !filters.walletBalance.min || user.walletBalance >= parseFloat(filters.walletBalance.min);
    const matchesWalletMax = !filters.walletBalance.max || user.walletBalance <= parseFloat(filters.walletBalance.max);

    // Date range filter
    const userDate = new Date(user.created_at);
    const matchesDateStart = !filters.dateRange.start || userDate >= new Date(filters.dateRange.start);
    const matchesDateEnd = !filters.dateRange.end || userDate <= new Date(filters.dateRange.end);

    return matchesSearch && matchesStatus && matchesGender && matchesSubscription && 
           matchesDelivery && matchesWalletMin && matchesWalletMax && 
           matchesDateStart && matchesDateEnd;
  });

  // Sorting function
  const handleSort = (field) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // Sort users
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    let aValue = a[sortField];
    let bValue = b[sortField];
    
    // Handle date sorting
    if (sortField === "created_at") {
      aValue = new Date(aValue);
      bValue = new Date(bValue);
    }
    
    if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
    if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  // Pagination
  const totalPages = Math.ceil(sortedUsers.length / usersPerPage);
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = sortedUsers.slice(indexOfFirstUser, indexOfLastUser);

  // Filter handlers
  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
    setCurrentPage(1);
  };

  const handleWalletBalanceChange = (type, value) => {
    setFilters(prev => ({
      ...prev,
      walletBalance: {
        ...prev.walletBalance,
        [type]: value
      }
    }));
    setCurrentPage(1);
  };

  const handleDateRangeChange = (type, value) => {
    setFilters(prev => ({
      ...prev,
      dateRange: {
        ...prev.dateRange,
        [type]: value
      }
    }));
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setFilters({
      status: "",
      gender: "",
      subscriptionStatus: "",
      walletBalance: { min: "", max: "" },
      deliveryStatus: "",
      dateRange: { start: "", end: "" }
    });
    setCurrentPage(1);
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.status) count++;
    if (filters.gender) count++;
    if (filters.subscriptionStatus) count++;
    if (filters.deliveryStatus) count++;
    if (filters.walletBalance.min || filters.walletBalance.max) count++;
    if (filters.dateRange.start || filters.dateRange.end) count++;
    return count;
  };

  // Status Badge Component
  const StatusBadge = ({ status, type = "status" }) => {
    const statusString = String(status || '').toLowerCase();

    const statusConfigs = {
      status: {
        active: { bg: "bg-green-100", text: "text-green-800" },
        inactive: { bg: "bg-red-100", text: "text-red-800" },
        pending: { bg: "bg-yellow-100", text: "text-yellow-800" },
      },
      subscription: {
        premium: { bg: "bg-purple-100", text: "text-purple-800" },
        basic: { bg: "bg-blue-100", text: "text-blue-800" },
        none: { bg: "bg-gray-100", text: "text-gray-800" },
      },
      delivery: {
        delivered: { bg: "bg-green-100", text: "text-green-800" },
        pending: { bg: "bg-yellow-100", text: "text-yellow-800" },
        in_transit: { bg: "bg-blue-100", text: "text-blue-800" },
        failed: { bg: "bg-red-100", text: "text-red-800" },
      }
    };

    const config = statusConfigs[type]?.[statusString] || {
      bg: "bg-gray-100",
      text: "text-gray-800",
    };

    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${config.bg} ${config.text}`}>
        {status || "Unknown"}
      </span>
    );
  };

  // Mobile User Card
  const MobileUserCard = ({ user }) => (
    <div className="p-4 border-b">
      <div className="flex justify-between items-start mb-3">
        <div>
          <p className="font-medium text-indigo-600">#{user.id}</p>
          <p className="font-medium">{user.name}</p>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>
        <StatusBadge status={user.status} type="status" />
      </div>
      
      <div className="grid grid-cols-2 gap-3 text-sm mb-3">
        <div>
          <p className="text-gray-500">Phone</p>
          <p>{user.number || "-"}</p>
        </div>
        <div>
          <p className="text-gray-500">Gender</p>
          <p>{user.gender || "-"}</p>
        </div>
        <div>
          <p className="text-gray-500">Subscription</p>
          <StatusBadge status={user.subscriptionStatus} type="subscription" />
        </div>
        <div>
          <p className="text-gray-500">Wallet Balance</p>
          <p className="font-medium">${user.walletBalance?.toFixed(2) || "0.00"}</p>
        </div>
        <div>
          <p className="text-gray-500">Delivery Status</p>
          <StatusBadge status={user.deliveryStatus} type="delivery" />
        </div>
        <div>
          <p className="text-gray-500">Total Orders</p>
          <p>{user.totalOrders || 0}</p>
        </div>
      </div>
      
      <div className="text-sm">
        <p className="text-gray-500">Joined</p>
        <p>
          {new Date(user.created_at).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </p>
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow">
      {/* Header section */}
      <div className="p-4 sm:p-6 border-b border-gray-200">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h1 className="text-xl font-semibold text-gray-800">Customer Management</h1>
            <div className="flex gap-2">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-2 px-3 py-2 border rounded-md text-sm font-medium transition-colors ${
                  showFilters || getActiveFilterCount() > 0
                    ? "bg-indigo-50 border-indigo-200 text-indigo-700"
                    : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}
              >
                <Filter size={16} />
                Filters
                {getActiveFilterCount() > 0 && (
                  <span className="bg-indigo-600 text-white text-xs rounded-full px-2 py-0.5">
                    {getActiveFilterCount()}
                  </span>
                )}
              </button>
            </div>
          </div>
          
          <div className="w-full sm:w-96">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Search by name, email, or phone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-medium text-gray-700">Filters</h3>
              <div className="flex gap-2">
                <button
                  onClick={clearFilters}
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  Clear All
                </button>
                <button
                  onClick={() => setShowFilters(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Status Filter */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={filters.status}
                  onChange={(e) => handleFilterChange("status", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">All Statuses</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="pending">Pending</option>
                </select>
              </div>

              {/* Gender Filter */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Gender</label>
                <select
                  value={filters.gender}
                  onChange={(e) => handleFilterChange("gender", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">All Genders</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Subscription Status Filter */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Subscription</label>
                <select
                  value={filters.subscriptionStatus}
                  onChange={(e) => handleFilterChange("subscriptionStatus", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">All Subscriptions</option>
                  <option value="premium">Premium</option>
                  <option value="basic">Basic</option>
                  <option value="none">None</option>
                </select>
              </div>

              {/* Delivery Status Filter */}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Delivery Status</label>
                <select
                  value={filters.deliveryStatus}
                  onChange={(e) => handleFilterChange("deliveryStatus", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">All Delivery Status</option>
                  <option value="delivered">Delivered</option>
                  <option value="pending">Pending</option>
                  <option value="in_transit">In Transit</option>
                  <option value="failed">Failed</option>
                </select>
              </div>

              {/* Wallet Balance Range */}
              <div className="sm:col-span-2 lg:col-span-1">
                <label className="block text-xs font-medium text-gray-700 mb-1">Wallet Balance Range</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={filters.walletBalance.min}
                    onChange={(e) => handleWalletBalanceChange("min", e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={filters.walletBalance.max}
                    onChange={(e) => handleWalletBalanceChange("max", e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              {/* Date Range Filter */}
              <div className="sm:col-span-2 lg:col-span-2">
                <label className="block text-xs font-medium text-gray-700 mb-1">Join Date Range</label>
                <div className="flex gap-2">
                  <input
                    type="date"
                    value={filters.dateRange.start}
                    onChange={(e) => handleDateRangeChange("start", e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <input
                    type="date"
                    value={filters.dateRange.end}
                    onChange={(e) => handleDateRangeChange("end", e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mobile View */}
      <div className="lg:hidden">
        {loading ? (
          <div className="p-4 text-center">Loading customers...</div>
        ) : currentUsers.length > 0 ? (
          currentUsers.map((user) => (
            <MobileUserCard key={user.id} user={user} />
          ))
        ) : (
          <div className="p-4 text-center text-gray-500">No customers found</div>
        )}
      </div>

      {/* Desktop View */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort("id")}
              >
                <div className="flex items-center">
                  ID
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
                onClick={() => handleSort("name")}
              >
                <div className="flex items-center">
                  Customer
                  {sortField === "name" &&
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
                onClick={() => handleSort("subscriptionStatus")}
              >
                <div className="flex items-center">
                  Subscription
                  {sortField === "subscriptionStatus" &&
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
                onClick={() => handleSort("walletBalance")}
              >
                <div className="flex items-center">
                  Wallet Balance
                  {sortField === "walletBalance" &&
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
                onClick={() => handleSort("deliveryStatus")}
              >
                <div className="flex items-center">
                  Delivery Status
                  {sortField === "deliveryStatus" &&
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
                onClick={() => handleSort("totalOrders")}
              >
                <div className="flex items-center">
                  Orders
                  {sortField === "totalOrders" &&
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
                onClick={() => handleSort("created_at")}
              >
                <div className="flex items-center">
                  Joined
                  {sortField === "created_at" &&
                    (sortDirection === "asc" ? (
                      <ChevronUp size={16} className="ml-1" />
                    ) : (
                      <ChevronDown size={16} className="ml-1" />
                    ))}
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan="8" className="px-6 py-4 text-center">
                  Loading customers...
                </td>
              </tr>
            ) : currentUsers.length > 0 ? (
              currentUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">
                    #{user.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{user.name}</div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                      <div className="text-xs text-gray-400">{user.number}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge status={user.status} type="status" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge status={user.subscriptionStatus} type="subscription" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    ${user.walletBalance?.toFixed(2) || "0.00"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge status={user.deliveryStatus} type="delivery" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.totalOrders || 0}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(user.created_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="px-6 py-4 text-center text-gray-500">
                  No customers found matching your criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination section */}
      <div className="px-4 py-3 sm:px-6 sm:py-4 bg-white border-t border-gray-200">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-sm text-gray-700">
            Showing <span className="font-medium">{indexOfFirstUser + 1}</span>{" "}
            to{" "}
            <span className="font-medium">
              {Math.min(indexOfLastUser, sortedUsers.length)}
            </span>{" "}
            of <span className="font-medium">{sortedUsers.length}</span> customers
            {getActiveFilterCount() > 0 && (
              <span className="text-indigo-600"> (filtered)</span>
            )}
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
            <span className="px-3 py-1 text-sm text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
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

export default UsersTable;