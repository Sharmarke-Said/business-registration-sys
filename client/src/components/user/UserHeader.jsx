import { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  FaBars,
  FaTimes,
  FaSignOutAlt,
  FaCogs, // Import the settings icon
} from "react-icons/fa";
import { logoutUser } from "../../features/auth/authSlice";
import { getFullPhotoUrl } from "../../utils/utils"; // Import the utility function

const UserHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate("/login");
  };

  const navLinks = [
    { name: "Dashboard", path: "/user/dashboard" },
    { name: "Register Business", path: "/user/register-business" },
    { name: "My Businesses", path: "/user/my-businesses" },
  ];

  // Get the profile photo URL using the utility function
  const photoUrl = getFullPhotoUrl(user?.photo);

  return (
    <header className="bg-white shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          to="/user/dashboard"
          className="text-2xl font-bold text-blue-700"
        >
          BusinessReg
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6 items-center">
          <ul className="flex space-x-6">
            {navLinks.map((link) => (
              <li key={link.name}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    `font-medium transition-colors duration-200 ${
                      isActive
                        ? "text-blue-600 border-b-2 border-blue-600"
                        : "text-gray-700 hover:text-blue-600"
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>
          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="flex flex-col items-center space-y-1 focus:outline-none"
            >
              <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-gray-300">
                <img
                  src={photoUrl}
                  alt={user?.name || "User"}
                  className="object-cover w-full h-full"
                />
              </div>
              <span className="text-gray-600 text-xs">
                {user ? user.name : "User Name"}
              </span>
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                <Link
                  to="/settings"
                  onClick={toggleDropdown}
                  className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <FaCogs />
                  <span>Settings</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <FaSignOutAlt />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </nav>

        {/* Mobile menu toggle and profile */}
        <div className="md:hidden flex items-center space-x-4">
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="flex items-center space-x-2 focus:outline-none"
            >
              <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-gray-300">
                <img
                  src={photoUrl}
                  alt={user?.name || "User"}
                  className="object-cover w-full h-full"
                />
              </div>
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                <Link
                  to="/settings"
                  onClick={toggleDropdown}
                  className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <FaCogs />
                  <span>Settings</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <FaSignOutAlt />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
          <button onClick={toggleMenu}>
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
        <div className="md:hidden bg-white shadow-lg p-4 mt-2">
          <ul className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <li key={link.name}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    `block py-2 px-4 rounded-lg font-medium transition-colors duration-200 ${
                      isActive
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-700 hover:bg-gray-100"
                    }`
                  }
                  onClick={toggleMenu}
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
            <li>
              <Link
                to="/settings"
                onClick={toggleMenu}
                className="flex items-center space-x-2 w-full py-2 px-4 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-200"
              >
                <FaCogs />
                <span>Settings</span>
              </Link>
            </li>
            <li>
              <button
                onClick={() => {
                  handleLogout();
                  toggleMenu();
                }}
                className="flex items-center space-x-2 w-full py-2 px-4 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-200"
              >
                <FaSignOutAlt />
                <span>Logout</span>
              </button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default UserHeader;
