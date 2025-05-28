import React, { useEffect, useState } from "react";
import { Search, Filter, Download, Eye, X } from "lucide-react";
import { getTransactions } from "../api";

const TransactionsTable = () => {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const [filters, setFilters] = useState({
    dateFrom: "",
    dateTo: "",
    transactionType: "all",
    paymentStatus: "all",
    paymentMethod: "all",
    customerSearch: "",
  });

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setLoading(true);
        const data = await getTransactions();
        setTransactions(data.transactions);
        setFilteredTransactions(data.transactions);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  // Filter logic
  useEffect(() => {
    let filtered = transactions;

    // Date range filter
    if (filters.dateFrom) {
      filtered = filtered.filter((txn) => txn.date >= filters.dateFrom);
    }
    if (filters.dateTo) {
      filtered = filtered.filter((txn) => txn.date <= filters.dateTo);
    }

    // Transaction type filter
    if (filters.transactionType !== "all") {
      filtered = filtered.filter(
        (txn) => txn.transactionType === filters.transactionType
      );
    }

    // Payment status filter
    if (filters.paymentStatus !== "all") {
      filtered = filtered.filter(
        (txn) => txn.paymentStatus === filters.paymentStatus
      );
    }

    // Payment method filter
    if (filters.paymentMethod !== "all") {
      filtered = filtered.filter(
        (txn) => txn.paymentMethod === filters.paymentMethod
      );
    }

    // Customer search filter
    if (filters.customerSearch) {
      const searchLower = filters.customerSearch.toLowerCase();
      filtered = filtered.filter(
        (txn) =>
          txn.customerName.toLowerCase().includes(searchLower) ||
          txn.customerPhone.includes(filters.customerSearch)
      );
    }

    // General search
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (txn) =>
          txn.id.toLowerCase().includes(searchLower) ||
          txn.customerName.toLowerCase().includes(searchLower) ||
          txn.transactionType.toLowerCase().includes(searchLower) ||
          txn.orderId.toLowerCase().includes(searchLower)
      );
    }

    setFilteredTransactions(filtered);
  }, [filters, transactions, searchTerm]);

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  const clearFilters = () => {
    setFilters({
      dateFrom: "",
      dateTo: "",
      transactionType: "all",
      paymentStatus: "all",
      paymentMethod: "all",
      customerSearch: "",
    });
    setSearchTerm("");
  };

  const getStatusBadge = (status) => {
    const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
    switch (status) {
      case "Success":
        return `${baseClasses} bg-green-100 text-green-800`;
      case "Failed":
        return `${baseClasses} bg-red-100 text-red-800`;
      case "Refunded":
        return `${baseClasses} bg-blue-100 text-blue-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  const getTransactionTypeBadge = (type) => {
    const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
    switch (type) {
      case "Wallet Top-up":
        return `${baseClasses} bg-purple-100 text-purple-800`;
      case "Subscription payment":
        return `${baseClasses} bg-blue-100 text-blue-800`;
      case "Refund":
        return `${baseClasses} bg-orange-100 text-orange-800`;
      case "Cashback":
        return `${baseClasses} bg-green-100 text-green-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  const getAmountColor = (amount, type) => {
    if (type === "Refund" || amount < 0) return "text-red-600";
    if (type === "Cashback" || type === "Wallet Top-up")
      return "text-green-600";
    return "text-gray-900";
  };

  const formatAmount = (amount) => {
    return `₹${Math.abs(amount).toLocaleString("en-IN")}`;
  };

  const exportTransactions = () => {
    // Simple CSV export
    const headers = [
      "Transaction ID",
      "Date",
      "Customer Name",
      "Phone",
      "Type",
      "Amount",
      "Status",
      "Method",
    ];
    const csvContent = [
      headers.join(","),
      ...filteredTransactions.map((txn) =>
        [
          txn.id,
          `${txn.date} ${txn.time}`,
          txn.customerName,
          txn.customerPhone,
          txn.transactionType,
          txn.amount,
          txn.paymentStatus,
          txn.paymentMethod,
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "transactions.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-8 text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
        <p className="mt-2 text-gray-600">Loading transactions...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow">
      {/* Header */}
      <div className="p-4 md:p-6 border-b border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h1 className="text-lg md:text-xl font-semibold text-gray-800">
            Transactions ({filteredTransactions.length})
          </h1>

          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search Bar */}
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={16}
              />
              <input
                type="text"
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full sm:w-64"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                <Filter size={16} />
                Filters
              </button>

              <button
                onClick={exportTransactions}
                className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                <Download size={16} />
                Export
              </button>
            </div>
          </div>
        </div>

        {/* Filters Section */}
        {showFilters && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Date Range */}
              <div className="lg:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date From
                </label>
                <input
                  type="date"
                  value={filters.dateFrom}
                  onChange={(e) =>
                    handleFilterChange("dateFrom", e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                />
              </div>

              <div className="lg:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date To
                </label>
                <input
                  type="date"
                  value={filters.dateTo}
                  onChange={(e) => handleFilterChange("dateTo", e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                />
              </div>

              {/* Customer Search */}
              <div className="lg:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Customer Name/Phone
                </label>
                <input
                  type="text"
                  placeholder="Enter name or phone"
                  value={filters.customerSearch}
                  onChange={(e) =>
                    handleFilterChange("customerSearch", e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                />
              </div>

              {/* Transaction Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Transaction Type
                </label>
                <select
                  value={filters.transactionType}
                  onChange={(e) =>
                    handleFilterChange("transactionType", e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                >
                  <option value="all">All Types</option>
                  <option value="Wallet Top-up">Wallet Top-up</option>
                  <option value="Order Payment">Order Payment</option>
                  <option value="Refund">Refund</option>
                  <option value="Cashback">Cashback</option>
                </select>
              </div>

              {/* Payment Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Payment Status
                </label>
                <select
                  value={filters.paymentStatus}
                  onChange={(e) =>
                    handleFilterChange("paymentStatus", e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                >
                  <option value="all">All Status</option>
                  <option value="Success">Success</option>
                  <option value="Failed">Failed</option>
                  <option value="Refunded">Refunded</option>
                </select>
              </div>

              {/* Payment Method */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Payment Method
                </label>
                <select
                  value={filters.paymentMethod}
                  onChange={(e) =>
                    handleFilterChange("paymentMethod", e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                >
                  <option value="all">All Methods</option>
                  <option value="UPI">UPI</option>
                  <option value="Card">Card</option>
                  <option value="Razorpay">Razorpay</option>
                  <option value="COD">COD</option>
                  <option value="Wallet">Wallet</option>
                </select>
              </div>
            </div>

            <div className="mt-4 flex justify-end">
              <button
                onClick={clearFilters}
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Clear All Filters
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50 hidden md:table-header-group">
            <tr>
              {[
                "Transaction ID",
                "Date & Time",
                "Customer",
                "Type",
                "Amount",
                "Status",
                "Method",
                "Actions",
              ].map((header) => (
                <th
                  key={header}
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((transaction) => (
                <tr
                  key={transaction.id}
                  className="hover:bg-gray-50 flex flex-col md:table-row border-b md:border-0 px-4 py-4 md:px-0 md:py-0"
                >
                  <td className="md:table-cell px-4 py-3 text-sm font-medium text-gray-900">
                    <span className="block md:hidden font-semibold text-gray-600">
                      Transaction ID:
                    </span>
                    {transaction.id}
                  </td>

                  <td className="md:table-cell px-4 py-3 text-sm text-gray-500">
                    <span className="block md:hidden font-semibold text-gray-600">
                      Date & Time:
                    </span>
                    <div className="font-medium">
                      {new Date(transaction.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </div>
                    <div className="text-xs text-gray-400">
                      {new Date(transaction.date).toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })}
                    </div>
                  </td>

                  <td className="md:table-cell px-4 py-3 text-sm">
                    <span className="block md:hidden font-semibold text-gray-600">
                      Customer:
                    </span>
                    <div>
                      <div className="font-medium text-gray-900">
                        {transaction.customerName}
                      </div>
                      <div className="text-xs text-gray-500">
                        {transaction.customerPhone}
                      </div>
                    </div>
                  </td>

                  <td className="md:table-cell px-4 py-3">
                    <span className="block md:hidden font-semibold text-gray-600">
                      Type:
                    </span>
                    <span
                      className={getTransactionTypeBadge(
                        transaction.transactionType
                      )}
                    >
                      {transaction.transactionType}
                    </span>
                  </td>

                  <td className="md:table-cell px-4 py-3 text-sm">
                    <span className="block md:hidden font-semibold text-gray-600">
                      Amount:
                    </span>
                    <span
                      className={`font-medium ${getAmountColor(
                        transaction.amount,
                        transaction.transactionType
                      )}`}
                    >
                      {transaction.amount < 0 ? "-" : ""}
                      {formatAmount(transaction.amount)}
                    </span>
                  </td>

                  <td className="md:table-cell px-4 py-3">
                    <span className="block md:hidden font-semibold text-gray-600">
                      Status:
                    </span>
                    <span className={getStatusBadge(transaction.paymentStatus)}>
                      {transaction.paymentStatus}
                    </span>
                  </td>

                  <td className="md:table-cell px-4 py-3 text-sm text-gray-500">
                    <span className="block md:hidden font-semibold text-gray-600">
                      Method:
                    </span>
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                      {transaction.paymentMethod}
                    </span>
                  </td>

                  <td className="md:table-cell px-4 py-3">
                    <button
                      onClick={() => setSelectedTransaction(transaction)}
                      className="text-blue-500 hover:text-blue-700 flex items-center gap-1"
                    >
                      <Eye size={16} />
                      <span className="md:hidden">View Details</span>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="px-6 py-8 text-center text-gray-500">
                  <div className="flex flex-col items-center">
                    <Search className="h-12 w-12 text-gray-300 mb-2" />
                    <p>No transactions found matching your criteria</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Transaction Details Modal */}
      {selectedTransaction && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-lg w-full max-h-90vh overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Transaction Details</h3>
                <button
                  onClick={() => setSelectedTransaction(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600">
                      Transaction ID
                    </label>
                    <p className="text-sm text-gray-900">
                      {selectedTransaction.id}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">
                      Order ID
                    </label>
                    <p className="text-sm text-gray-900">
                      {selectedTransaction.orderId}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600">
                      Date
                    </label>
                    <p className="text-sm text-gray-900">
                      {new Date(selectedTransaction.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">
                      Time
                    </label>
                    <p className="text-sm text-gray-900">
                      {new Date(selectedTransaction.date).toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })}
                    </p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600">
                    Customer
                  </label>
                  <p className="text-sm text-gray-900">
                    {selectedTransaction.customerName}
                  </p>
                  <p className="text-sm text-gray-500">
                    {selectedTransaction.customerPhone}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600">
                      Type
                    </label>
                    <span
                      className={getTransactionTypeBadge(
                        selectedTransaction.transactionType
                      )}
                    >
                      {selectedTransaction.transactionType}
                    </span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">
                      Amount
                    </label>
                    <p
                      className={`text-sm font-medium ${getAmountColor(
                        selectedTransaction.amount,
                        selectedTransaction.transactionType
                      )}`}
                    >
                      {selectedTransaction.amount < 0 ? "-" : ""}
                      {formatAmount(selectedTransaction.amount)}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600">
                      Status
                    </label>
                    <span
                      className={getStatusBadge(
                        selectedTransaction.paymentStatus
                      )}
                    >
                      {selectedTransaction.paymentStatus}
                    </span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">
                      Payment Method
                    </label>
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                      {selectedTransaction.paymentMethod}
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600">
                    Reference ID
                  </label>
                  <p className="text-sm text-gray-900 font-mono">
                    {selectedTransaction.referenceId}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600">
                    Description
                  </label>
                  <p className="text-sm text-gray-900">
                    {selectedTransaction.transactionType}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionsTable;
