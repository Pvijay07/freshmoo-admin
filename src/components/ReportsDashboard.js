import React, { useState, useEffect } from "react";
import { 
  TrendingUp, 
  ShoppingCart, 
  Package, 
  DollarSign, 
  Calendar,
  Download,
  Filter,
  Eye,
  BarChart3,
  PieChart
} from "lucide-react";
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  PieChart as RechartsPieChart, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  Area,
  AreaChart,
  Pie
} from "recharts";

const ReportsDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [selectedDateRange, setSelectedDateRange] = useState("7d");
  const [selectedReportType, setSelectedReportType] = useState("overview");
  const [showFilters, setShowFilters] = useState(false);
  
  const [filters, setFilters] = useState({
    dateFrom: "",
    dateTo: "",
    productCategory: "all",
    orderStatus: "all"
  });

  // Mock data for different report types
  const mockData = {
    overview: {
      totalRevenue: 125000,
      totalOrders: 1250,
      totalProducts: 45,
      avgOrderValue: 100,
      revenueGrowth: 12.5,
      ordersGrowth: 8.3,
      productsGrowth: 15.2,
      avgOrderGrowth: 4.1
    },
    
    dailyRevenue: [
      { date: "Jan 01", revenue: 12000, orders: 120, avgOrder: 100 },
      { date: "Jan 02", revenue: 15000, orders: 140, avgOrder: 107 },
      { date: "Jan 03", revenue: 18000, orders: 160, avgOrder: 113 },
      { date: "Jan 04", revenue: 14000, orders: 130, avgOrder: 108 },
      { date: "Jan 05", revenue: 20000, orders: 180, avgOrder: 111 },
      { date: "Jan 06", revenue: 22000, orders: 190, avgOrder: 116 },
      { date: "Jan 07", revenue: 25000, orders: 200, avgOrder: 125 }
    ],
    
    productTypes: [
      { name: "Vegetables", value: 35, revenue: 43750, orders: 437, color: "#22C55E" },
      { name: "Fruits", value: 28, revenue: 35000, orders: 350, color: "#F59E0B" },
      { name: "Dairy", value: 20, revenue: 25000, orders: 250, color: "#3B82F6" },
      { name: "Meat", value: 12, revenue: 15000, orders: 150, color: "#EF4444" },
      { name: "Bakery", value: 5, revenue: 6250, orders: 63, color: "#8B5CF6" }
    ],
    
    topProducts: [
      { name: "Organic Tomatoes", sales: 450, revenue: 9000, category: "Vegetables" },
      { name: "Fresh Apples", sales: 380, revenue: 7600, category: "Fruits" },
      { name: "Whole Milk", sales: 320, revenue: 6400, category: "Dairy" },
      { name: "Chicken Breast", sales: 280, revenue: 8400, category: "Meat" },
      { name: "Bananas", sales: 250, revenue: 3750, category: "Fruits" }
    ],
    
    orderStatus: [
      { status: "Delivered", count: 890, percentage: 71.2, color: "#22C55E" },
      { status: "Processing", count: 180, percentage: 14.4, color: "#F59E0B" },
      { status: "Shipped", count: 120, percentage: 9.6, color: "#3B82F6" },
      { status: "Cancelled", count: 60, percentage: 4.8, color: "#EF4444" }
    ],
    
    salesTrends: [
      { month: "Jul", sales: 85000, target: 80000 },
      { month: "Aug", sales: 92000, target: 85000 },
      { month: "Sep", sales: 98000, target: 90000 },
      { month: "Oct", sales: 105000, target: 95000 },
      { month: "Nov", sales: 115000, target: 100000 },
      { month: "Dec", sales: 125000, target: 110000 }
    ]
  };

  useEffect(() => {
    // Simulate API loading
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const StatCard = ({ title, value, growth, icon: Icon, color }) => (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {growth && (
            <div className={`flex items-center mt-1 ${growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              <TrendingUp size={16} className="mr-1" />
              <span className="text-sm font-medium">
                {growth >= 0 ? '+' : ''}{growth}%
              </span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          <Icon size={24} className="text-white" />
        </div>
      </div>
    </div>
  );

  const exportReport = () => {
    const reportData = [];
    
    if (selectedReportType === "revenue") {
      reportData.push(['Date', 'Revenue', 'Orders', 'Avg Order Value']);
      mockData.dailyRevenue.forEach(item => {
        reportData.push([item.date, item.revenue, item.orders, item.avgOrder]);
      });
    } else if (selectedReportType === "products") {
      reportData.push(['Product Type', 'Revenue', 'Orders', 'Percentage']);
      mockData.productTypes.forEach(item => {
        reportData.push([item.name, item.revenue, item.orders, item.value + '%']);
      });
    }
    
    const csvContent = reportData.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedReportType}-report.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-600">Track your business performance and insights</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <select
            value={selectedDateRange}
            onChange={(e) => setSelectedDateRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 3 Months</option>
            <option value="1y">Last Year</option>
          </select>
          
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            <Filter size={16} />
            Filters
          </button>
          
          <button
            onClick={exportReport}
            className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            <Download size={16} />
            Export
          </button>
        </div>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date From</label>
              <input
                type="date"
                value={filters.dateFrom}
                onChange={(e) => setFilters(prev => ({ ...prev, dateFrom: e.target.value }))}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date To</label>
              <input
                type="date"
                value={filters.dateTo}  
                onChange={(e) => setFilters(prev => ({ ...prev, dateTo: e.target.value }))}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Product Category</label>
              <select
                value={filters.productCategory}
                onChange={(e) => setFilters(prev => ({ ...prev, productCategory: e.target.value }))}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
              >
                <option value="all">All Categories</option>
                <option value="vegetables">Vegetables</option>
                <option value="fruits">Fruits</option>
                <option value="dairy">Dairy</option>
                <option value="meat">Meat</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Order Status</label>
              <select
                value={filters.orderStatus}
                onChange={(e) => setFilters(prev => ({ ...prev, orderStatus: e.target.value }))}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
              >
                <option value="all">All Status</option>
                <option value="delivered">Delivered</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Report Type Navigation */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="flex flex-wrap border-b">
          {[
            { id: "overview", label: "Overview", icon: BarChart3 },
            { id: "revenue", label: "Revenue", icon: DollarSign },
            { id: "orders", label: "Orders", icon: ShoppingCart },
            { id: "products", label: "Products", icon: Package }
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setSelectedReportType(id)}
              className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors ${
                selectedReportType === id
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <Icon size={16} />
              {label}
            </button>
          ))}
        </div>

        <div className="p-6">
          {/* Overview Tab */}
          {selectedReportType === "overview" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                  title="Total Revenue"
                  value={`₹${mockData.overview.totalRevenue.toLocaleString()}`}
                  growth={mockData.overview.revenueGrowth}
                  icon={DollarSign}
                  color="bg-green-500"
                />
                <StatCard
                  title="Total Orders"
                  value={mockData.overview.totalOrders.toLocaleString()}
                  growth={mockData.overview.ordersGrowth}
                  icon={ShoppingCart}
                  color="bg-blue-500"
                />
                <StatCard
                  title="Products Sold"
                  value={mockData.overview.totalProducts.toLocaleString()}
                  growth={mockData.overview.productsGrowth}
                  icon={Package}
                  color="bg-purple-500"
                />
                <StatCard
                  title="Avg Order Value"
                  value={`₹${mockData.overview.avgOrderValue}`}
                  growth={mockData.overview.avgOrderGrowth}
                  icon={TrendingUp}
                  color="bg-orange-500"
                />
              </div>

              {/* Sales vs Target Chart */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">Sales vs Target</h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={mockData.salesTrends}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`₹${value.toLocaleString()}`, '']} />
                      <Legend />
                      <Bar dataKey="sales" fill="#3B82F6" name="Actual Sales" />
                      <Bar dataKey="target" fill="#94A3B8" name="Target" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          {/* Revenue Tab */}
          {selectedReportType === "revenue" && (
            <div className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">Daily Revenue Trend</h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={mockData.dailyRevenue}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`₹${value.toLocaleString()}`, '']} />
                      <Area 
                        type="monotone" 
                        dataKey="revenue" 
                        stroke="#3B82F6" 
                        fill="#3B82F6" 
                        fillOpacity={0.3}
                        name="Revenue"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4">Revenue Breakdown</h3>
                  <div className="space-y-3">
                    {mockData.productTypes.map((type, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-4 h-4 rounded-full" 
                            style={{ backgroundColor: type.color }}
                          ></div>
                          <span className="font-medium">{type.name}</span>
                        </div>
                        <span className="text-gray-600">₹{type.revenue.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4">Top Revenue Days</h3>
                  <div className="space-y-3">
                    {mockData.dailyRevenue
                      .sort((a, b) => b.revenue - a.revenue)
                      .slice(0, 5)
                      .map((day, index) => (
                        <div key={index} className="flex justify-between items-center">
                          <span className="font-medium">{day.date}</span>
                          <span className="text-green-600 font-medium">
                            ₹{day.revenue.toLocaleString()}
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Orders Tab */}
          {selectedReportType === "orders" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4">Order Status Distribution</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <Pie
                          data={mockData.orderStatus}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          dataKey="count"
                        >
                          {mockData.orderStatus.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => [value, 'Orders']} />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4">Order Status Details</h3>
                  <div className="space-y-4">
                    {mockData.orderStatus.map((status, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-4 h-4 rounded-full" 
                            style={{ backgroundColor: status.color }}
                          ></div>
                          <span className="font-medium">{status.status}</span>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold">{status.count}</div>
                          <div className="text-sm text-gray-500">{status.percentage}%</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">Daily Orders Trend</h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={mockData.dailyRevenue}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey="orders" 
                        stroke="#3B82F6" 
                        strokeWidth={3}
                        name="Orders"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          {/* Products Tab */}
          {selectedReportType === "products" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4">Product Category Performance</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <Pie
                          data={mockData.productTypes}
                          cx="50%"
                          cy="50%"
                          outerRadius={100}
                          dataKey="value"
                        >
                          {mockData.productTypes.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => [`${value}%`, 'Share']} />
                        <Legend />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4">Category Revenue</h3>
                  <div className="space-y-4">
                    {mockData.productTypes.map((type, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-4 h-4 rounded-full" 
                            style={{ backgroundColor: type.color }}
                          ></div>
                          <span className="font-medium">{type.name}</span>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold">₹{type.revenue.toLocaleString()}</div>
                          <div className="text-sm text-gray-500">{type.orders} orders</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">Top Selling Products</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-semibold">Product</th>
                        <th className="text-left py-3 px-4 font-semibold">Category</th>
                        <th className="text-left py-3 px-4 font-semibold">Sales</th>
                        <th className="text-left py-3 px-4 font-semibold">Revenue</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockData.topProducts.map((product, index) => (
                        <tr key={index} className="border-b hover:bg-white">
                          <td className="py-3 px-4 font-medium">{product.name}</td>
                          <td className="py-3 px-4 text-gray-600">{product.category}</td>
                          <td className="py-3 px-4">{product.sales}</td>
                          <td className="py-3 px-4 font-semibold text-green-600">
                            ₹{product.revenue.toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReportsDashboard;