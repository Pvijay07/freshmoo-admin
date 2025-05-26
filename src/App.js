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
import Categories from "./components/CategoriesTable";
import Offers from "./components/OffersTable";
import Coupons from "./components/CouponsTable";
import Banners from "./components/BannersTable";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import AdminDashboard from "./components/AdminDashboard";
import Footer from "./components/Footer"; // Adjust the import path as needed
import CustomerPrivacyPolicy from "./components/CustomerPrivacyPolicy";
import DeliveryPartnerPrivacyPolicy from "./components/DeliveryPartnerPrivacyPolicy";
import TransactionsTable from "./components/TransactionsTable";
import ReportsDashboard from "./components/ReportsDashboard";
const App = () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  return (
    <Router>
      {isLoggedIn && <Navbar />}
      <div className="flex min-h-screen bg-gray-100">
        {isLoggedIn && <Sidebar />}
        <div className="flex-1 p-6">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<AdminDashboard />} />
              <Route path="/dashboard/orders" element={<Orders />} />
              <Route path="/dashboard/users" element={<Users />} />
              <Route
                path="/dashboard/delivery-partners"
                element={<DeliveryPartners />}
              />
              <Route path="/dashboard/products" element={<Products />} />
              <Route path="/dashboard/categories" element={<Categories />} />
              <Route path="/dashboard/offers" element={<Offers />} />
              <Route path="/dashboard/coupons" element={<Coupons />} />
              <Route path="/dashboard/banners" element={<Banners />} />
              <Route path="/dashboard/transactions" element={<TransactionsTable />} />
              <Route path="/dashboard/reports" element={<ReportsDashboard />} />

            </Route>
             <Route
              path="/privacy/customer"
              element={<CustomerPrivacyPolicy />}
            />
            <Route
              path="/privacy/delivery-partner"
              element={<DeliveryPartnerPrivacyPolicy />}
            />
            <Route path="*" element={<Navigate to="/login" />} />
           
          </Routes>
        </div>
      </div>
      <Footer />
    </Router>
  );
};

export default App;
