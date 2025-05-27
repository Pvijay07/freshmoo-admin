import React, { useState, useEffect, useMemo } from "react";
import {
  ShoppingCart,
  Package,
  Users,
  TrendingUp,
  TrendingDown,
  Calendar,
  Clock,
  Eye,
  ChevronDown,
  ChevronUp,
  MoreVertical,
  Star,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { getOrders, getProducts, getUsers } from "../api";

const fetchOrders = async () => {
  return await getOrders(); // Return the result
};

const fetchProducts = async () => {
 return await getProducts(); // Return the result
};

const fetchUsers = async () => {
 return await getUsers();
};

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState("7days");
  const [expandedCards, setExpandedCards] = useState({
    overview: true,
    orders: false,
    customers: false,
    products: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [ordersData, productsData, usersData] = await Promise.all([
          fetchOrders(),
          fetchProducts(),
          fetchUsers(),
        ]);
        setOrders(ordersData.orders);
        setProducts(productsData.products);
        setUsers(usersData.customers);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Calculate analytics data
  const analytics = useMemo(() => {
    const totalRevenue = orders.reduce(
      (sum, order) => sum + parseFloat(order.total_amount || 0),
      0
    );
    const completedOrders = orders.filter(
      (order) => order.status === "Delivered"
    ).length;
    const pendingOrders = orders.filter(
      (order) => order.status === "Pending" || order.status === "Processing"
    ).length;
    const cancelledOrders = orders.filter(
      (order) => order.status === "Cancelled"
    ).length;

    // Calculate growth (mock data for demo)
    const previousRevenue = totalRevenue * 0.85;
    const revenueGrowth =
      ((totalRevenue - previousRevenue) / previousRevenue) * 100;

    const avgOrderValue = orders.length > 0 ? totalRevenue / orders.length : 0;

    // Daily revenue for chart
    const dailyRevenue = orders.reduce((acc, order) => {
      const date = new Date(order.order_date).toLocaleDateString();
      acc[date] = (acc[date] || 0) + parseFloat(order.total_amount);
      return acc;
    }, {});

    const chartData = Object.entries(dailyRevenue).map(([date, revenue]) => ({
      date: new Date(date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      revenue,
    }));

    // Order status distribution
    const statusData = [
      { name: "Delivered", value: completedOrders, color: "#10B981" },
      {
        name: "Processing",
        value: orders.filter((o) => o.status === "Processing").length,
        color: "#3B82F6",
      },
      {
        name: "Shipped",
        value: orders.filter((o) => o.status === "Shipped").length,
        color: "#8B5CF6",
      },
      { name: "Pending", value: pendingOrders, color: "#F59E0B" },
      { name: "Cancelled", value: cancelledOrders, color: "#EF4444" },
    ].filter((item) => item.value > 0);

    return {
      totalRevenue,
      revenueGrowth,
      completedOrders,
      pendingOrders,
      cancelledOrders,
      avgOrderValue,
      chartData,
      statusData,
    };
  }, [orders]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const toggleCard = (cardName) => {
    setExpandedCards((prev) => ({
      ...prev,
      [cardName]: !prev[cardName],
    }));
  };

  const StatCard = ({
    title,
    value,
    icon: Icon,
    growth,
    color,
    description,
  }) => (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className={`p-3 rounded-xl ${color}`}>
            <Icon size={24} className="text-white" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
            {description && (
              <p className="text-xs text-gray-500 mt-1">{description}</p>
            )}
          </div>
        </div>
        {growth !== undefined && (
          <div
            className={`flex items-center space-x-1 ${
              growth >= 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {growth >= 0 ? (
              <TrendingUp size={16} />
            ) : (
              <TrendingDown size={16} />
            )}
            <span className="text-sm font-medium">
              {Math.abs(growth).toFixed(1)}%
            </span>
          </div>
        )}
      </div>
    </div>
  );

  const CollapsibleSection = ({
    title,
    children,
    isExpanded,
    onToggle,
    count,
  }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <button
        onClick={onToggle}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center space-x-3">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          {count !== undefined && (
            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
              {count}
            </span>
          )}
        </div>
        {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>

      {isExpanded && <div className="border-t border-gray-100">{children}</div>}
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded-xl"></div>
            ))}
          </div>
          <div className="h-64 bg-gray-200 rounded-xl"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-4 lg:p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
                Dashboard
              </h1>
              <p className="text-gray-600 mt-1">
                Welcome back! Here's what's happening with your store.
              </p>
            </div>

            <div className="flex items-center space-x-3">
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              >
                <option value="7days">Last 7 days</option>
                <option value="30days">Last 30 days</option>
                <option value="90days">Last 3 months</option>
              </select>
            </div>
          </div>
        </div>

        {/* Overview Stats */}
        <CollapsibleSection
          title="Overview"
          isExpanded={expandedCards.overview}
          onToggle={() => toggleCard("overview")}
        >
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                title="Total Revenue"
                value={formatCurrency(analytics.totalRevenue)}
                icon={TrendingUp}
                growth={analytics.revenueGrowth}
                color="bg-gradient-to-r from-blue-500 to-blue-600"
                description="All time earnings"
              />

              <StatCard
                title="Total Orders"
                value={orders.length.toLocaleString()}
                icon={ShoppingCart}
                color="bg-gradient-to-r from-green-500 to-green-600"
                description={`${analytics.completedOrders} completed`}
              />

              <StatCard
                title="Products"
                value={products.length.toLocaleString()}
                icon={Package}
                color="bg-gradient-to-r from-purple-500 to-purple-600"
                description="Active inventory"
              />

              <StatCard
                title="Customers"
                value={users.length.toLocaleString()}
                icon={Users}
                color="bg-gradient-to-r from-orange-500 to-orange-600"
                description="Registered users"
              />
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Revenue Chart */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">
                  Revenue Trend
                </h4>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={analytics.chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                      <YAxis tick={{ fontSize: 12 }} />
                      <Tooltip
                        formatter={(value) => [
                          formatCurrency(value),
                          "Revenue",
                        ]}
                      />
                      <Line
                        type="monotone"
                        dataKey="revenue"
                        stroke="#3B82F6"
                        strokeWidth={3}
                        dot={{ fill: "#3B82F6", strokeWidth: 2, r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Order Status Distribution */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">
                  Order Status
                </h4>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={analytics.statusData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {analytics.statusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex flex-wrap gap-3 mt-4">
                  {analytics.statusData.map((item, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: item.color }}
                      ></div>
                      <span className="text-sm text-gray-600">
                        {item.name} ({item.value})
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </CollapsibleSection>

        {/* Recent Orders */}
        <div className="mt-6">
          <CollapsibleSection
            title="Recent Orders"
            count={orders.length}
            isExpanded={expandedCards.orders}
            onToggle={() => toggleCard("orders")}
          >
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Order
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Items
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {orders.slice(0, 10).map((order) => (
                    <tr
                      key={order.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div>
                            <div className="text-sm font-medium text-blue-600">
                              #{order.id.toString().padStart(4, "0")}
                            </div>
                            <div className="text-xs text-gray-500">
                              <MapPin size={12} className="inline mr-1" />
                              {order.delivery_address}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center">
                              <span className="text-sm font-medium text-white">
                                {order.customer.charAt(0)}
                              </span>
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {order.customer}
                            </div>
                            <div className="text-xs text-gray-500 flex items-center">
                              <Mail size={12} className="mr-1" />
                              {order.customer_email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {new Date(order.order_date).toLocaleDateString()}
                        </div>
                        <div className="text-xs text-gray-500 flex items-center">
                          <Clock size={12} className="mr-1" />
                          {new Date(order.order_date).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            order.status === "Delivered"
                              ? "bg-green-100 text-green-800"
                              : order.status === "Processing"
                              ? "bg-blue-100 text-blue-800"
                              : order.status === "Shipped"
                              ? "bg-purple-100 text-purple-800"
                              : order.status === "Cancelled"
                              ? "bg-red-100 text-red-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-semibold text-gray-900">
                          {formatCurrency(order.total_amount)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {order.items_count} items
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CollapsibleSection>
        </div>
        {/* Customer Activity */}
        <div className="mt-6">
          <CollapsibleSection
            title="Customer Activity"
            count={users.length}
            isExpanded={expandedCards.customers}
            onToggle={() => toggleCard("customers")}
          >
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {users.slice(0, 6).map((customer) => (
                  <div key={customer.id} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0">
                        <div className="h-12 w-12 rounded-full bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-center">
                          <span className="text-lg font-semibold text-white">
                            {customer?.name?.charAt(0)}
                          </span>
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {customer.name ?? "Unknown User"}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {customer.email ?? customer.phone}
                        </p>
                        <div className="flex items-center mt-1">
                          <Star size={12} className="text-yellow-400 mr-1" />
                          <span className="text-xs text-gray-600">
                            {customer.totalOrders} orders
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CollapsibleSection>
        </div>

        {/* Product Summary */}
        <div className="mt-6">
          <CollapsibleSection
            title="Product Inventory"
            count={products.length}
            isExpanded={expandedCards.products}
            onToggle={() => toggleCard("products")}
          >
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.slice(0, 6).map((product) => (
                  <div key={product.id} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 truncate">
                          {product.name}
                        </h4>
                        <p className="text-xs text-gray-500">
                          {product.category}
                        </p>
                        <p className="text-sm font-semibold text-green-600 mt-1">
                          {formatCurrency(product.price)}
                        </p>
                      </div>
                      <div className="text-right">
                        <div
                          className={`text-xs font-medium ${
                            product.stock < 30
                              ? "text-red-600"
                              : "text-green-600"
                          }`}
                        >
                          {product.stock} in stock
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CollapsibleSection>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
