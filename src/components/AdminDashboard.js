import { ShoppingCart, Package, Users, ChevronDown } from "lucide-react";
import { FaRupeeSign } from "react-icons/fa";
import { getOrders, getProducts, getUsers } from "../api";
import React, { useState } from "react";

const AdminDashboard = () => {
  const [orders, setOrders] = React.useState([]);
  const [products, setProducts] = React.useState([]);
  const [users, setUsers] = React.useState([]);
  const [showMobileStats, setShowMobileStats] = useState(false);

  React.useEffect(() => {
    const fetchOrders = async () => {
      const data = await getOrders();
      setOrders(data.orders);
    };
    fetchOrders();
  }, []);

  React.useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProducts();
      setProducts(data.products);
    };
    fetchProducts();
  }, []);

  React.useEffect(() => {
    const fetchUsers = async () => {
      const data = await getUsers();
      setUsers(data.customers);
    };
    fetchUsers();
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(amount).replace('₹', '₹ ');
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Dashboard Content */}
        <div className="p-4 md:p-6">
          <h2 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6">Dashboard Overview</h2>

          {/* Mobile Stats Toggle */}
          <button 
            onClick={() => setShowMobileStats(!showMobileStats)}
            className="md:hidden flex items-center justify-between w-full bg-white p-3 rounded-lg shadow mb-4"
          >
            <span>View Stats</span>
            <ChevronDown className={`transition-transform ${showMobileStats ? 'rotate-180' : ''}`} />
          </button>

          {/* Stats Cards */}
          <div className={`${showMobileStats ? 'block' : 'hidden'} md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6`}>
            <div className="bg-white rounded-lg shadow p-3 md:p-4 flex items-center">
              <div className="rounded-full bg-blue-100 p-2 md:p-3 mr-3 md:mr-4">
                <FaRupeeSign size={20} className="text-blue-600" />
              </div>
              <div>
                <p className="text-gray-500 text-xs md:text-sm">Total Revenue</p>
                <p className="text-lg md:text-2xl font-bold">
                  {formatCurrency(orders.reduce(
                    (acc, order) => acc + parseFloat(order.total_amount || 0),
                    0
                  ))}
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-3 md:p-4 flex items-center">
              <div className="rounded-full bg-green-100 p-2 md:p-3 mr-3 md:mr-4">
                <ShoppingCart size={20} className="text-green-600" />
              </div>
              <div>
                <p className="text-gray-500 text-xs md:text-sm">Total Orders</p>
                <p className="text-lg md:text-2xl font-bold">
                  {orders ? orders.length : 0}
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-3 md:p-4 flex items-center">
              <div className="rounded-full bg-purple-100 p-2 md:p-3 mr-3 md:mr-4">
                <Package size={20} className="text-purple-600" />
              </div>
              <div>
                <p className="text-gray-500 text-xs md:text-sm">Products</p>
                <p className="text-lg md:text-2xl font-bold">
                  {products ? products.length : 0}
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-3 md:p-4 flex items-center">
              <div className="rounded-full bg-yellow-100 p-2 md:p-3 mr-3 md:mr-4">
                <Users size={20} className="text-yellow-600" />
              </div>
              <div>
                <p className="text-gray-500 text-xs md:text-sm">Customers</p>
                <p className="text-lg md:text-2xl font-bold">
                  {users ? users.length : 0}
                </p>
              </div>
            </div>
          </div>

          {/* Recent Orders */}
          <div className="mt-4 md:mt-6 bg-white rounded-lg shadow overflow-hidden">
            <div className="p-3 md:p-4 border-b">
              <h3 className="font-semibold text-lg">Recent Orders</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 py-2 md:px-6 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Order ID
                    </th>
                    <th className="px-3 py-2 md:px-6 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-3 py-2 md:px-6 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-3 py-2 md:px-6 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-3 py-2 md:px-6 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {orders.slice(0, 5).map((order, index) => (
                    <tr key={index}>
                      <td className="px-3 py-2 md:px-6 md:py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-blue-600">
                          #{order.id.toString().padStart(4, '0')}
                        </div>
                      </td>
                      <td className="px-3 py-2 md:px-6 md:py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 truncate max-w-[100px] md:max-w-none">
                          {order.customer}
                        </div>
                      </td>
                      <td className="px-3 py-2 md:px-6 md:py-4 whitespace-nowrap">
                        <div className="text-xs md:text-sm text-gray-500">
                          {new Date(order.order_date).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-3 py-2 md:px-6 md:py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${
                            order.status === "Delivered"
                              ? "bg-green-100 text-green-800"
                              : order.status === "Processing"
                              ? "bg-blue-100 text-blue-800"
                              : order.status === "Shipped"
                              ? "bg-purple-100 text-purple-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="px-3 py-2 md:px-6 md:py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatCurrency(order.total_amount)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;