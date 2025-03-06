import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Orders from "./components/OrdersTable";
import Users from "./components/UsersTable";
import DeliveryPartners from "./components/DeliveryPartnersTable";
import Products from "./components/Products";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import AdminDashboard from "./components/AdminDashboard";

const App = () => {
  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <div className="flex-1">
          <Routes>
            <Route path="/dashboard/orders" element={<Orders />} />
            <Route path="/dashboard/users" element={<Users />} />
            <Route
              path="/dashboard/delivery-partners"
              element={<DeliveryPartners />}
            />
            <Route path="/dashboard/products" element={<Products />} />
            <Route path="/" element={<Navigate to="/dashboard/orders" />} />
            <Route path="/login" element={<Login />} />
            <Route element={<ProtectedRoute />}>
              <Route
                path="/dashboard"
                element={
                  <>
                    <Navbar />
                    <AdminDashboard />
                  </>
                }
              />
            </Route>
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
