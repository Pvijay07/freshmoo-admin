import React from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import OrdersTable from '../components/OrdersTable';
import UsersTable from '../components/UsersTable';
import DeliveryPartnersTable from '../components/DeliveryPartnersTable';

const Dashboard = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <div className="p-6">
          <OrdersTable />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;