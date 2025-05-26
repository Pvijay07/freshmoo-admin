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
    <footer className="bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 border-t border-white/10">
      {/* Mobile Expandable Header */}
      <div className="md:hidden">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-between px-6 py-4 text-white hover:bg-white/5 transition-colors duration-200"
        >
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">G</span>
            </div>
            <span className="font-semibold">Gowmoo Admin</span>
          </div>
          <ChevronUp className={`w-5 h-5 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* Main Footer Content */}
      <div className={`transition-all duration-300 ${isExpanded ? 'block' : 'hidden'} md:block`}>
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-xl">G</span>
                </div>
                <div>
                  <h3 className="text-white text-xl font-bold">Gowmoo Admin</h3>
                  <p className="text-blue-400 text-sm">Milk Delivery Management</p>
                </div>
              </div>
              
              <p className="text-gray-300 mb-6 leading-relaxed max-w-md">
                Streamlining milk delivery operations with advanced management tools. 
                Connecting farmers, distributors, and customers seamlessly.
              </p>

              {/* Contact Info */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors duration-200 group">
                  <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center group-hover:bg-blue-500/20 transition-colors duration-200">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <span>Vijayawada, Andhra Pradesh, India</span>
                </div>
                
                <a 
                  href="mailto:support@freshmoo.in" 
                  className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors duration-200 group"
                >
                  <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center group-hover:bg-blue-500/20 transition-colors duration-200">
                    <Mail className="w-5 h-5" />
                  </div>
                  <span>support@freshmoo.in</span>
                  <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                </a>
                
                <a 
                  href="tel:9392049966" 
                  className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors duration-200 group"
                >
                  <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center group-hover:bg-green-500/20 transition-colors duration-200">
                    <Phone className="w-5 h-5" />
                  </div>
                  <span>+91 9392049966</span>
                  <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                </a>
              </div>

              {/* Social Links */}
              <div className="flex items-center space-x-4 mt-6">
                <span className="text-gray-400 text-sm">Follow us:</span>
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-blue-500/20 transition-all duration-200 hover:scale-110"
                    aria-label={social.name}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-white text-lg font-semibold mb-6">Quick Access</h3>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <button
                      onClick={() => handleLinkClick(link.path)}
                      className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors duration-200 group w-full text-left"
                    >
                      <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center group-hover:bg-blue-500/20 transition-colors duration-200">
                        <link.icon className="w-4 h-4" />
                      </div>
                      <span className="group-hover:translate-x-1 transition-transform duration-200">
                        {link.name}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Privacy & Legal */}
            <div>
              <h3 className="text-white text-lg font-semibold mb-6">Privacy & Legal</h3>
              <ul className="space-y-3">
                {privacyLinks.map((link) => (
                  <li key={link.name}>
                    <button
                      onClick={() => handleLinkClick(link.path)}
                      className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors duration-200 group w-full text-left"
                    >
                      <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center group-hover:bg-purple-500/20 transition-colors duration-200">
                        <Shield className="w-4 h-4" />
                      </div>
                      <span className="group-hover:translate-x-1 transition-transform duration-200 text-sm leading-relaxed">
                        {link.name}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>

              {/* System Info */}
              <div className="mt-8 p-4 bg-white/5 rounded-xl border border-white/10">
                <h4 className="text-white font-medium mb-3">System Information</h4>
                <div className="space-y-2 text-sm">
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
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
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
          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="flex items-center space-x-2 text-gray-400">
                <span>&copy; {currentYear} Gowmoo. All rights reserved.</span>
                <span className="hidden md:inline">•</span>
                <span className="hidden md:inline">Built with</span>
                <Heart className="w-4 h-4 text-red-500 hidden md:inline animate-pulse" />
                <span className="hidden md:inline">in India</span>
              </div>
              
              <div className="flex items-center space-x-6 text-sm">
                <button
                  onClick={() => handleLinkClick('/terms')}
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  Terms of Service
                </button>
                <button
                  onClick={() => handleLinkClick('/cookies')}
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  Cookie Policy
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