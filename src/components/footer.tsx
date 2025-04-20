
import React from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and tagline */}
          <div className="md:col-span-1">
            <Link to="/" className="text-2xl font-bold mb-4 flex items-center">
              <svg 
                viewBox="0 0 24 24" 
                className="w-8 h-8 mr-2"
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
              >
                <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                <path d="M14.5 4H9.5a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1Z" />
                <path d="M12 11h4" />
                <path d="M12 16h4" />
                <path d="M8 11h.01" />
                <path d="M8 16h.01" />
              </svg>
              DocSync
            </Link>
            <p className="text-gray-400 mt-4">
              Streamlining doctor's practices with intelligent management tools
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-gray-400 hover:text-white transition-colors">
                  Log In
                </Link>
              </li>
            </ul>
          </div>

          {/* Features */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Features</h3>
            <ul className="space-y-2">
              <li className="text-gray-400">Appointment Scheduling</li>
              <li className="text-gray-400">Patient Management</li>
              <li className="text-gray-400">Role-based Access</li>
              <li className="text-gray-400">Secure Data Storage</li>
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="text-gray-400">
                <span className="block">Email:</span>
                <a href="mailto:support@docsync.com" className="text-docsync-blue hover:underline">
                  support@docsync.com
                </a>
              </li>
              <li className="text-gray-400">
                <span className="block">Phone:</span>
                <a href="tel:+1234567890" className="hover:text-white">
                  (123) 456-7890
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} DocSync. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
