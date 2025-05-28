import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  ExternalLink, 
  ChevronUp, 
  Shield, 
  Users, 
  Package, 
  BarChart3,
  Heart,
  Github,
  Twitter,
  Linkedin
} from 'lucide-react';

const Footer = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Dashboard', path: '/dashboard', icon: BarChart3 },
    { name: 'Orders', path: '/dashboard/orders', icon: Package },
    { name: 'Users', path: '/dashboard/users', icon: Users },
  ];

  const privacyLinks = [
    { name: 'Customer Privacy Policy', path: '/privacy/customer' },
    { name: 'Delivery Partner Privacy Policy', path: '/privacy/delivery-partner' },
  ];

  const socialLinks = [
    { name: 'GitHub', icon: Github, href: '#' },
    { name: 'Twitter', icon: Twitter, href: '#' },
    { name: 'LinkedIn', icon: Linkedin, href: '#' },
  ];

  const handleLinkClick = (path) => {
    // In a real app, you would use navigate(path) from react-router-dom
    console.log('Navigating to:', path);
  };

  return (
    <footer className="bg-indigo-900 text-white backdrop-blur-sm">
  {/* Mobile Expandable Header */}
  <div className="md:hidden">
    <button
      onClick={() => setIsExpanded(!isExpanded)}
      className="w-full flex items-center justify-between px-4 py-3 text-white hover:bg-white/5 transition-colors duration-200"
    >
      <div className="flex items-center space-x-2">
        <div className="w-6 h-5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-xs">G</span>
        </div>
        <span className="font-semibold text-sm">Gowmoo Admin</span>
      </div>
      <ChevronUp className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
    </button>
  </div>

  {/* Main Footer Content */}
  <div className={`transition-all duration-300 ${isExpanded ? 'block' : 'hidden'} md:block`}>
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
        
        {/* Company Info */}
        <div className="lg:col-span-2">
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">G</span>
            </div>
            <div>
              <h3 className="text-white text-lg font-bold">Gowmoo Admin</h3>
              <p className="text-blue-400 text-xs">Milk Delivery Management</p>
            </div>
          </div>
          
          <p className="text-gray-300 mb-4 text-sm leading-relaxed max-w-md">
            Streamlining milk delivery operations with advanced management tools. 
            Connecting farmers, distributors, and customers seamlessly.
          </p>

          {/* Contact Info */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-200 group">
              <div className="w-8 h-8 bg-white/10 rounded flex items-center justify-center group-hover:bg-blue-500/20 transition-colors duration-200">
                <MapPin className="w-4 h-4" />
              </div>
              <span className="text-sm">Vijayawada, Andhra Pradesh, India</span>
            </div>
            
            <a 
              href="mailto:support@freshmoo.in" 
              className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-200 group"
            >
              <div className="w-8 h-8 bg-white/10 rounded flex items-center justify-center group-hover:bg-blue-500/20 transition-colors duration-200">
                <Mail className="w-4 h-4" />
              </div>
              <span className="text-sm">support@freshmoo.in</span>
            </a>
            
            <a 
              href="tel:9392049966" 
              className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-200 group"
            >
              <div className="w-8 h-8 bg-white/10 rounded flex items-center justify-center group-hover:bg-green-500/20 transition-colors duration-200">
                <Phone className="w-4 h-4" />
              </div>
              <span className="text-sm">+91 9392049966</span>
            </a>
          </div>

          {/* Social Links */}
          <div className="flex items-center space-x-3 mt-4">
            <span className="text-gray-400 text-xs">Follow us:</span>
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                className="w-8 h-8 bg-white/10 rounded flex items-center justify-center text-gray-400 hover:text-white hover:bg-blue-500/20 transition-all duration-200"
                aria-label={social.name}
              >
                <social.icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white text-base font-semibold mb-4">Quick Access</h3>
          <ul className="space-y-2">
            {quickLinks.map((link) => (
              <li key={link.name}>
                <button
                  onClick={() => handleLinkClick(link.path)}
                  className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-200 group w-full text-left"
                >
                  <div className="w-7 h-7 bg-white/10 rounded flex items-center justify-center group-hover:bg-blue-500/20 transition-colors duration-200">
                    <link.icon className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-sm group-hover:translate-x-1 transition-transform duration-200">
                    {link.name}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Privacy & Legal */}
        <div>
          <h3 className="text-white text-base font-semibold mb-4">Privacy & Legal</h3>
          <ul className="space-y-2">
            {privacyLinks.map((link) => (
              <li key={link.name}>
                <button
                  onClick={() => handleLinkClick(link.path)}
                  className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-200 group w-full text-left"
                >
                  <div className="w-7 h-7 bg-white/10 rounded flex items-center justify-center group-hover:bg-purple-500/20 transition-colors duration-200">
                    <Shield className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs group-hover:translate-x-1 transition-transform duration-200">
                    {link.name}
                  </span>
                </button>
              </li>
            ))}
          </ul>

          {/* System Info */}
          <div className="mt-6 p-3 bg-white/5 rounded-lg border border-white/10">
            <h4 className="text-white text-sm font-medium mb-2">System Information</h4>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Version:</span>
                <span className="text-green-400 font-mono">v1.0.0</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Updated:</span>
                <span className="text-blue-400">April 15, 2025</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Status:</span>
                <span className="flex items-center space-x-1">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-green-400">Operational</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Bottom Copyright Bar */}
    <div className="border-t border-white/10 bg-black/20">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
          <div className="flex items-center space-x-1 text-gray-400 text-xs">
            <span>&copy; {currentYear} Gowmoo.</span>
            <span className="hidden md:inline">All rights reserved.</span>
          </div>
          
          <div className="flex items-center space-x-4 text-xs">
            <button
              onClick={() => handleLinkClick('/terms')}
              className="text-gray-400 hover:text-white transition-colors duration-200"
            >
              Terms
            </button>
            <button
              onClick={() => handleLinkClick('/cookies')}
              className="text-gray-400 hover:text-white transition-colors duration-200"
            >
              Cookies
            </button>
            <button
              onClick={() => handleLinkClick('/sitemap')}
              className="text-gray-400 hover:text-white transition-colors duration-200"
            >
              Sitemap
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</footer>
  );
};

export default Footer;