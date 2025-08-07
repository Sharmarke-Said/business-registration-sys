import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-700">
          BusinessReg
        </Link>
        <nav className="hidden md:flex space-x-4 items-center">
          <Link
            to="/login"
            className="text-gray-700 hover:text-blue-600 font-medium px-4 py-2 rounded-lg transition duration-300"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="bg-blue-600 text-white font-medium px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Register
          </Link>
        </nav>

        {/* Mobile menu toggle */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? (
              <FaTimes className="text-2xl text-blue-700" />
            ) : (
              <FaBars className="text-2xl text-blue-700" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu content */}
      {isMenuOpen && (
        <div className="md:hidden mt-4 bg-white shadow-lg p-4 rounded-md">
          <Link
            to="/login"
            className="block text-gray-700 hover:text-blue-600 font-medium py-2 transition duration-300"
            onClick={() => setIsMenuOpen(false)}
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="block bg-blue-600 text-white font-medium text-center py-2 rounded-lg hover:bg-blue-700 mt-2 transition duration-300"
            onClick={() => setIsMenuOpen(false)}
          >
            Register
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
