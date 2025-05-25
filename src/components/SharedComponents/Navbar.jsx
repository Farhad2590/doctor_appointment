import { BriefcaseMedical, Menu, X } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-white shadow-lg fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo Section */}
          <Link to="/" className="flex items-center space-x-2">
            <BriefcaseMedical className="h-8 w-8 text-cyan-500" />
            <span className="text-2xl font-bold text-gray-900">DoctorsHub</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-cyan-500 transition-colors">
              Home
            </Link>
            <Link to="/faq" className="text-gray-700 hover:text-cyan-500 transition-colors">
              Faq
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-cyan-500 transition-colors">
              Contact
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-gray-700 focus:outline-none">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white px-4 pt-2 pb-4 space-y-2 shadow-lg">
          <Link to="/" className="block text-gray-700 hover:text-cyan-500" onClick={toggleMenu}>
            Home
          </Link>
          <Link to="/faq" className="block text-gray-700 hover:text-cyan-500" onClick={toggleMenu}>
            Faq
          </Link>
          <Link to="/contact" className="block text-gray-700 hover:text-cyan-500" onClick={toggleMenu}>
            Contact
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
