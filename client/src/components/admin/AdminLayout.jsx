import { useState } from "react";
import { Outlet, useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  FaBars,
  FaSearch,
  FaBell,
  FaSignOutAlt,
  FaCogs,
} from "react-icons/fa";
import { getFullPhotoUrl } from "../../utils/utils";
import { logoutUser } from "../../features/auth/authSlice";
import Sidebar from "./Sidebar";

const AdminLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const photoUrl = getFullPhotoUrl(user?.photo);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Sidebar for Desktop */}
      <div className="hidden md:block flex-shrink-0">
        <Sidebar />
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 transform bg-white shadow-lg transition-transform duration-300 ease-in-out md:hidden ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar onClose={() => setIsSidebarOpen(false)} />
      </div>

      {/* Main content area */}
      <div className="flex-grow flex flex-col overflow-y-auto">
        {/* Admin Header */}
        <header className="sticky top-0 z-40 flex items-center justify-between p-4 bg-white shadow-md">
          {/* Mobile menu button and Title */}
          <div className="flex items-center">
            <button
              onClick={toggleSidebar}
              className="mr-4 text-gray-600 md:hidden"
            >
              <FaBars className="text-xl" />
            </button>
            <h1 className="text-xl font-bold text-gray-800">
              BusinessReg Admin
            </h1>
          </div>

          {/* Search, Notifications, and User Dropdown */}
          <div className="flex items-center space-x-4">
            <div className="relative hidden md:block">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="w-48 pl-10 p-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <FaBell className="text-gray-600 text-xl cursor-pointer" />
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="flex items-center space-x-2 focus:outline-none"
              >
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-300">
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
          </div>
        </header>

        {/* The main content for the specific admin page */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
