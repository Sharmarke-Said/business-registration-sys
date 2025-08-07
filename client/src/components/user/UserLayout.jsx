import { Outlet } from "react-router-dom";
import UserHeader from "./UserHeader";

const UserLayout = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <UserHeader />
      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default UserLayout;
