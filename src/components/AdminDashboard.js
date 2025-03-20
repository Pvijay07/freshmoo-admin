import { ShoppingCart, Package, Users, TrendingUp } from "lucide-react";
import { FaRupeeSign } from "react-icons/fa";
import { getOrders, getProducts, getUsers } from "../api";
import React from "react";

const AdminDashboard = () => {
  const [orders, setOrders] = React.useState([]);
  const [products, setProducts] = React.useState([]);
  const [users, setUsers] = React.useState([]);

  React.useEffect(() => {
    // Mock data for the orders
    const fetchOrders = async () => {
      const data = await getOrders();
      console.log(data.orders);
      setOrders(data.orders);
    };
    fetchOrders();
  }, []);
  React.useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProducts();
      setProducts(data.products);
      // Set the first product as the selected product
      // setSelectedProduct(products[0]);
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
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Topbar */}

        {/* Dashboard Content */}
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-6">Dashboard Overview</h2>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div className="bg-white rounded-lg shadow p-4 flex items-center">
              <div className="rounded-full bg-blue-100 p-3 mr-4">
                <FaRupeeSign size={24} className="text-blue-600" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Total Revenue</p>
                <p className="text-2xl font-bold">
                  ₹ 
                  {orders.reduce(
                    (acc, order) => acc + parseFloat(order.total_amount || 0),
                    0
                  )}
                </p>{" "}
                <p className="text-green-500 text-sm flex items-center">
                  {/* <TrendingUp size={16} className="mr-1" /> +12.4% */}
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-4 flex items-center">
              <div className="rounded-full bg-green-100 p-3 mr-4">
                <ShoppingCart size={24} className="text-green-600" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Total Orders</p>
                <p className="text-2xl font-bold">
                  {orders ? orders.length : 0}
                </p>
                <p className="text-green-500 text-sm flex items-center">
                  {/* <TrendingUp size={16} className="mr-1" /> +8.2% */}
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-4 flex items-center">
              <div className="rounded-full bg-purple-100 p-3 mr-4">
                <Package size={24} className="text-purple-600" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Products</p>
                <p className="text-2xl font-bold">
                  {products ? products.length : 0}
                </p>
                <p className="text-green-500 text-sm flex items-center">
                  {/* <TrendingUp size={16} className="mr-1" /> +4.7% */}
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-4 flex items-center">
              <div className="rounded-full bg-yellow-100 p-3 mr-4">
                <Users size={24} className="text-yellow-600" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Customers</p>
                <p className="text-2xl font-bold">{users ? users.length : 0}</p>
                <p className="text-green-500 text-sm flex items-center">
                  {/* <TrendingUp size={16} className="mr-1" /> +14.6% */}
                </p>
              </div>
            </div>
          </div>
          {/* Recent Orders */}
          <div className="mt-6 bg-white rounded-lg shadow overflow-hidden">
            <div className="p-4 border-b">
              <h3 className="font-semibold">Recent Orders</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Order ID
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
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {orders.map((order, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-blue-600">
                          #FrMo{order.id}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {order.customer}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {order.order_date}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
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
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {order.total_amount}
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
