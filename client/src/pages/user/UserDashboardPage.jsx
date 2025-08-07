import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserStatsCard from "../../components/user/UserStatsCard";
import { fetchUserDashboardStats } from "../../features/user/userSlice";

const UserDashboardPage = () => {
  const dispatch = useDispatch();
  const { stats, status, error } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUserDashboardStats());
  }, [dispatch]);

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading dashboard...
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        Error: {error.message || "Failed to fetch dashboard data."}
      </div>
    );
  }

  return (
    // Remove the wrapping <div> and <UserHeader />
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        User Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <UserStatsCard
          title="Total Businesses"
          value={stats?.totalBusinesses ?? 0}
          textColorClass="text-gray-800"
        />
        <UserStatsCard
          title="Approved"
          value={stats?.totalApproved ?? 0}
          bgColorClass="bg-green-50"
          textColorClass="text-green-600"
        />
        <UserStatsCard
          title="Pending"
          value={stats?.totalPending ?? 0}
          bgColorClass="bg-yellow-50"
          textColorClass="text-yellow-600"
        />
      </div>

      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Recent Activity
        </h2>
        <p className="text-gray-600">
          You can view your registered businesses and their current
          status on the "My Businesses" page.
        </p>
      </div>
    </div>
  );
};

export default UserDashboardPage;
