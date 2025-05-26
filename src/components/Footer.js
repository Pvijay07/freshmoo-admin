// components/Footer.js
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-blue-400 text-lg font-semibold mb-4">Gowmoo Admin</h3>
            <p className="mb-2">Milk Delivery Management System</p>
            <p className="mb-2">Vijayawada, India</p>
            <div className="mt-4">
              <a href="mailto:support@freshmoo.in" className="text-gray-300 hover:text-white mr-4">
                support@freshmoo.in
              </a>
              <a href="tel:9392049966" className="text-gray-300 hover:text-white">
                9392049966
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-blue-400 text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/dashboard" className="text-gray-300 hover:text-white">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/dashboard/orders" className="text-gray-300 hover:text-white">
                  Orders
                </Link>
              </li>
              <li>
                <Link to="/dashboard/users" className="text-gray-300 hover:text-white">
                  Users
                </Link>
              </li>
              <li>
                <Link to="/privacy/customer" className="text-gray-300 hover:text-white">
                  Customer Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/privacy/delivery-partner" className="text-gray-300 hover:text-white">
                  Delivery Partner Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* System Info */}
          <div>
            <h3 className="text-blue-400 text-lg font-semibold mb-4">System</h3>
            <p className="text-gray-300 mb-2">Version: 1.0.0</p>
            <p className="text-gray-300">Last updated: April 15, 2025</p>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Gowmoo. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;