import React, { useState } from 'react';
import { BarChart, LineChart, PieChart, Bell, ShoppingCart, Package, Users, DollarSign, TrendingUp, Search, Menu, X } from 'lucide-react';

const EcommerceDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  // Mock data for the dashboard
  const salesData = [
    { name: 'Jan', value: 4000 },
    { name: 'Feb', value: 3000 },
    { name: 'Mar', value: 5000 },
    { name: 'Apr', value: 7000 },
    { name: 'May', value: 6000 },
    { name: 'Jun', value: 8000 },
  ];
  
  const recentOrders = [
    { id: '#ORD-001', customer: 'John Doe', date: '2025-03-05', status: 'Delivered', amount: '$120.00' },
    { id: '#ORD-002', customer: 'Jane Smith', date: '2025-03-04', status: 'Processing', amount: '$85.50' },
    { id: '#ORD-003', customer: 'Mike Johnson', date: '2025-03-03', status: 'Shipped', amount: '$210.75' },
    { id: '#ORD-004', customer: 'Sarah Williams', date: '2025-03-02', status: 'Pending', amount: '$65.25' },
  ];
  
  const topProducts = [
    { name: 'Wireless Earbuds', sales: 324, stock: 45 },
    { name: 'Smart Watch', sales: 276, stock: 18 },
    { name: 'Bluetooth Speaker', sales: 253, stock: 32 },
    { name: 'Phone Case', sales: 198, stock: 112 },
  ];
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`bg-indigo-800 text-white ${isSidebarOpen ? 'w-64' : 'w-20'} transition-all duration-300 flex-shrink-0 md:block`}>
        <div className="p-4 flex items-center justify-between">
          {isSidebarOpen && <h1 className="text-xl font-bold">ShopDash</h1>}
          <button onClick={toggleSidebar} className="p-1 rounded-md hover:bg-indigo-700">
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        
        <nav className="mt-8">
          <div className="px-4 py-3 flex items-center text-indigo-300 hover:bg-indigo-700 hover:text-white cursor-pointer transition-colors">
            <BarChart size={20} />
            {isSidebarOpen && <span className="ml-4">Dashboard</span>}
          </div>
          <div className="px-4 py-3 flex items-center text-indigo-300 hover:bg-indigo-700 hover:text-white cursor-pointer transition-colors">
            <ShoppingCart size={20} />
            {isSidebarOpen && <span className="ml-4">Orders</span>}
          </div>
          <div className="px-4 py-3 flex items-center text-indigo-300 hover:bg-indigo-700 hover:text-white cursor-pointer transition-colors">
            <Package size={20} />
            {isSidebarOpen && <span className="ml-4">Products</span>}
          </div>
          <div className="px-4 py-3 flex items-center text-indigo-300 hover:bg-indigo-700 hover:text-white cursor-pointer transition-colors">
            <Users size={20} />
            {isSidebarOpen && <span className="ml-4">Customers</span>}
          </div>
        </nav>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Topbar */}
        <div className="bg-white shadow-sm p-4 flex justify-between items-center">
          <div className="flex items-center w-64 rounded-md bg-gray-100 px-3 py-2">
            <Search size={18} className="text-gray-500" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent border-none ml-2 focus:outline-none w-full"
            />
          </div>
          <div className="flex items-center">
            <button className="p-2 rounded-full hover:bg-gray-100 relative">
              <Bell size={20} />
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
            </button>
            <div className="ml-4 flex items-center">
              <img
                src="/api/placeholder/32/32"
                alt="User avatar"
                className="w-8 h-8 rounded-full"
              />
              <span className="ml-2 font-medium hidden md:block">Admin User</span>
            </div>
          </div>
        </div>
        
        {/* Dashboard Content */}
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-6">Dashboard Overview</h2>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div className="bg-white rounded-lg shadow p-4 flex items-center">
              <div className="rounded-full bg-blue-100 p-3 mr-4">
                <DollarSign size={24} className="text-blue-600" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Total Revenue</p>
                <p className="text-2xl font-bold">$24,780</p>
                <p className="text-green-500 text-sm flex items-center">
                  <TrendingUp size={16} className="mr-1" /> +12.4%
                </p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-4 flex items-center">
              <div className="rounded-full bg-green-100 p-3 mr-4">
                <ShoppingCart size={24} className="text-green-600" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Total Orders</p>
                <p className="text-2xl font-bold">1,482</p>
                <p className="text-green-500 text-sm flex items-center">
                  <TrendingUp size={16} className="mr-1" /> +8.2%
                </p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-4 flex items-center">
              <div className="rounded-full bg-purple-100 p-3 mr-4">
                <Package size={24} className="text-purple-600" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Products</p>
                <p className="text-2xl font-bold">432</p>
                <p className="text-green-500 text-sm flex items-center">
                  <TrendingUp size={16} className="mr-1" /> +4.7%
                </p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-4 flex items-center">
              <div className="rounded-full bg-yellow-100 p-3 mr-4">
                <Users size={24} className="text-yellow-600" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Customers</p>
                <p className="text-2xl font-bold">3,254</p>
                <p className="text-green-500 text-sm flex items-center">
                  <TrendingUp size={16} className="mr-1" /> +14.6%
                </p>
              </div>
            </div>
          </div>
          
          {/* Charts and Tables */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Sales Trend */}
            <div className="bg-white rounded-lg shadow p-4 lg:col-span-2">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold">Sales Trend</h3>
                <select className="border rounded-md px-2 py-1 text-sm">
                  <option>Last 6 Months</option>
                  <option>Last 3 Months</option>
                  <option>Last 30 Days</option>
                </select>
              </div>
              <div className="h-64 flex items-end">
                {salesData.map((item, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div 
                      className="w-4/5 bg-blue-500 rounded-t-md hover:bg-blue-600 transition-colors" 
                      style={{ height: `${(item.value / 10000) * 100}%` }}
                    ></div>
                    <p className="text-xs mt-2">{item.name}</p>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Top Products */}
            <div className="bg-white rounded-lg shadow p-4">
              <h3 className="font-semibold mb-4">Top Products</h3>
              <div className="space-y-4">
                {topProducts.map((product, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-gray-500">{product.sales} sales</p>
                    </div>
                    <div className={`text-sm px-2 py-1 rounded ${product.stock < 20 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                      {product.stock < 20 ? 'Low Stock' : 'In Stock'}
                    </div>
                  </div>
                ))}
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
                  {recentOrders.map((order, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-blue-600">{order.id}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{order.customer}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{order.date}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 
                            order.status === 'Processing' ? 'bg-blue-100 text-blue-800' : 
                            order.status === 'Shipped' ? 'bg-purple-100 text-purple-800' : 
                            'bg-yellow-100 text-yellow-800'}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {order.amount}
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

export default EcommerceDashboard;