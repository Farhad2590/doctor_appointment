import { BriefcaseMedical } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <nav className="bg-white shadow-lg fixed w-full top-0 z-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <BriefcaseMedical className="h-8 w-8 text-cyan-500" />
              <span className="text-2xl font-bold text-gray-900">DoctorsHub</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-gray-700 hover:text-cyan-500 transition-colors"
            >
              Home
            </Link>
            <Link
              to="/faq"
              className="text-gray-700 hover:text-cyan-500 transition-colors"
            >
             Faq
            </Link>
            <Link
              to="/contact"
              className="text-gray-700 hover:text-cyan-500 transition-colors"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
