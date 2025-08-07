import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaBuilding,
  FaUsers,
  FaChartBar,
  FaTasks,
  FaTimes,
} from "react-icons/fa";

// Add `onClose` prop to handle closing the sidebar on mobile
const Sidebar = ({ onClose }) => {
  const navLinks = [
    {
      name: "Dashboard",
      icon: <FaTachometerAlt />,
      path: "/admin/dashboard",
    },
    {
      name: "Business Types",
      icon: <FaTasks />,
      path: "/admin/businesstypes",
    },
    {
      name: "Businesses",
      icon: <FaBuilding />,
      path: "/admin/businesses",
    },
    { name: "Users", icon: <FaUsers />, path: "/admin/users" },
    { name: "Reports", icon: <FaChartBar />, path: "/admin/reports" },
  ];

  return (
    // Add conditional classes for mobile
    <div className="w-64 bg-white min-h-screen p-4 shadow-lg flex flex-col">
      <div className="flex items-center justify-between p-2 mb-6">
        <span className="text-2xl font-bold text-blue-700">
          BusinessReg Admin
        </span>
        <button onClick={onClose} className="md:hidden text-gray-600">
          <FaTimes /> {/* Close button for mobile */}
        </button>
      </div>
      <nav className="flex-grow">
        <ul>
          {navLinks.map((link, index) => (
            <li key={index} className="mb-2">
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `flex items-center space-x-3 p-3 rounded-lg transition-colors duration-200 ${
                    isActive
                      ? "bg-blue-100 text-blue-700"
                      : "text-gray-600 hover:bg-gray-100"
                  }`
                }
                onClick={onClose} // Close sidebar when a link is clicked on mobile
              >
                {link.icon}
                <span>{link.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
