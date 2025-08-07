import React from "react";
import UserHeader from "../components/user/UserHeader";
import AdminSidebar from "../components/admin/Sidebar";
import { useSelector } from "react-redux";

const MainLayout = ({ children }) => {
  const user = useSelector((state) => state.auth.user);

  // You can conditionally render different layouts based on user roles if needed
  const renderLayout = () => {
    if (user?.role === "admin") {
      return (
        <div className="flex bg-gray-100 min-h-screen">
          <AdminSidebar />
          <div className="flex-grow p-6">
            {/* The UserHeader for admin's profile dropdown is already in AdminDashboardPage, so we'll just render the content here */}
            {children}
          </div>
        </div>
      );
    } else {
      // Default layout for user and other roles
      return (
        <div className="bg-gray-100 min-h-screen">
          <UserHeader />
          <main className="p-6">{children}</main>
        </div>
      );
    }
  };

  return <>{renderLayout()}</>;
};

export default MainLayout;
