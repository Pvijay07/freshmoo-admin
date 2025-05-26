import React, { useState, useEffect, useRef } from "react";
import { Bell, Search, Menu, X, User, LogOut, Settings, ChevronDown } from "lucide-react";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close mobile menu on window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = () => {
    // Note: localStorage is not available in Claude.ai artifacts
    // In a real app, you would use: localStorage.removeItem("isLoggedIn");
    console.log("Logout clicked");
    setIsDropdownOpen(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log("Searching for:", searchQuery);
      // Implement search functionality here
    }
  };

  return (
    <>
      <nav className="bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 backdrop-blur-sm border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            {/* Logo/Brand - Left */}
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="text-white font-bold text-xl bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Gowmoo
                </div>
              </div>
            </div>

            {/* Desktop Search - Center */}
            <div className="hidden md:flex flex-1 max-w-lg mx-8">
              <div className="w-full">
                <div className={`relative transition-all duration-300 ${isSearchFocused ? 'scale-105' : ''}`}>
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className={`h-5 w-5 transition-colors duration-200 ${isSearchFocused ? 'text-purple-400' : 'text-gray-400'}`} />
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setIsSearchFocused(false)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch(e)}
                    className="block w-full pl-10 pr-3 py-2 border border-white/20 rounded-xl bg-white/10 backdrop-blur-sm text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                    placeholder="Search anything..."
                  />
                </div>
              </div>
            </div>

            {/* Desktop Right Side */}
            <div className="hidden md:flex items-center space-x-4">
              
              {/* Notifications */}
              <button className="relative p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 group">
                <Bell className="h-6 w-6" />
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center">
                  <span className="text-xs text-white font-bold">3</span>
                </span>
                <div className="absolute top-0 left-0 w-full h-full rounded-lg bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
              </button>

              {/* User Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center space-x-3 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg px-3 py-2 transition-all duration-200 group"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <User className="h-5 w-5 text-white" />
                  </div>
                  <span className="font-medium">Admin User</span>
                  <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white/95 backdrop-blur-sm rounded-xl shadow-xl border border-white/20 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="px-4 py-3 border-b border-gray-200">
                      <p className="text-sm font-medium text-gray-900">Welcome back!</p>
                      <p className="text-sm text-gray-500">admin</p>
                    </div>
                    <div className="py-2">
                      <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-150">
                        <Settings className="h-4 w-4 mr-2" />
                        Settings
                      </button>
                      <button 
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-150"
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Sign out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-300 hover:text-white hover:bg-white/10 p-2 rounded-lg transition-all duration-200"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div ref={mobileMenuRef} className="md:hidden border-t border-white/10 bg-slate-900/95 backdrop-blur-sm">
            <div className="px-4 py-4 space-y-4">
              
              {/* Mobile Search */}
              <div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch(e)}
                    className="block w-full pl-10 pr-3 py-3 border border-white/20 rounded-xl bg-white/10 backdrop-blur-sm text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Search anything..."
                  />
                </div>
              </div>

              {/* Mobile Navigation Items */}
              <div className="space-y-2">
                <button className="flex items-center justify-between w-full p-3 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200">
                  <div className="flex items-center">
                    <Bell className="h-5 w-5 mr-3" />
                    <span>Notifications</span>
                  </div>
                  <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-2 py-1 rounded-full">3</span>
                </button>

                <button className="flex items-center w-full p-3 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200">
                  <Settings className="h-5 w-5 mr-3" />
                  <span>Settings</span>
                </button>

                <button 
                  onClick={handleLogout}
                  className="flex items-center w-full p-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all duration-200"
                >
                  <LogOut className="h-5 w-5 mr-3" />
                  <span>Sign out</span>
                </button>
              </div>

              {/* Mobile User Info */}
              <div className="pt-4 border-t border-white/10">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <User className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Admin User</p>
                    <p className="text-gray-400 text-sm">admin@yourapp.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Overlay for mobile menu */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Navbar;