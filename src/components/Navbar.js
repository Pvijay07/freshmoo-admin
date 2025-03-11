import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { Bell, Search } from "lucide-react";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/admin/login");
  };

  return (
 
    <nav className="bg-gray-900 text-white p-4 flex justify-between items-center">
    {/* Mobile Menu */}
    <div className="flex items-center w-full md:w-64 rounded-md bg-gray-100 px-3 py-2 max-w-md mx-auto md:mx-0">
      <Search size={18} className="text-gray-500" />
      <input
        type="text"
        placeholder="Search..."
        className="bg-transparent border-none ml-2 focus:outline-none w-full text-gray-900"
      />
    </div>

    <div className="flex items-center space-x-4">
      <button className="p-2 rounded-full hover:bg-gray-100 relative">
        <Bell size={20} />
        <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
      </button>

      {/* User Dropdown */}
      <div className="relative">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center focus:outline-none"
          aria-label="User menu"
        >
          <FaUserCircle size={24} />
          <span className="ml-2 font-medium hidden md:block">Admin User</span>
        </button>
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg text-gray-800 z-50 top-8">
            <div className="p-4 border-b">
              <p className="text-sm">Welcome, Admin</p>
            </div>
            <button
              onClick={handleLogout}
              className="w-full text-left p-2 hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  </nav>
      
  );
};

export default Navbar;
