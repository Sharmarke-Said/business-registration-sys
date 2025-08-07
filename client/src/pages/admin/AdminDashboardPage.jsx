import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchDashboardStats } from "../../features/dashboard/dashboardSlice";
import DashboardStatsCard from "../../components/admin/DashboardStatsCard";
import BusinessByTypeChart from "../../components/admin/BusinessByTypeChart";
import BusinessStatusChart from "../../components/admin/BusinessStatusChart";
import RecentApprovalsTable from "../../components/admin/RecentApprovalsTable";

const AdminDashboardPage = () => {
  const dispatch = useDispatch();
  const { stats, status, error } = useSelector(
    (state) => state.dashboard
  );

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchDashboardStats());
    }
  }, [status, dispatch]);

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-full">
        Loading dashboard...
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="flex justify-center items-center h-full text-red-500">
        Error: {error?.message || "Failed to fetch dashboard data."}
      </div>
    );
  }

  // Use a conditional check to make sure `stats` and its nested data are available before preparing the chart data.
  const businessTypeData = stats?.businessByType
    ? stats.businessByType.map((item) => ({
        name:
          item.businessType === "Limited Liability Company (LLC)"
            ? "LLC"
            : item.businessType,
        count: item.count,
      }))
    : [];

  const businessStatusData = stats?.totals
    ? [
        {
          name: "Approved",
          value: stats.totals.totalApprovedBusinesses ?? 0,
        },
        {
          name: "Rejected",
          value: stats.totals.totalRejectedBusinesses ?? 0,
        },
        {
          name: "Pending",
          value: stats.totals.totalPendingBusinesses ?? 0,
        },
      ]
    : [];

  if (!stats || Object.keys(stats).length === 0) {
    return (
      <div className="flex-grow flex flex-col p-6 items-center justify-center">
        <p className="text-gray-500 text-xl">
          No dashboard data available.
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Page Title */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Dashboard
        </h1>
      </div>

      {/* Main Content Area */}
      {/* We remove the `flex-grow` and `p-6` from the main tag here, and also the outer div, as AdminLayout handles it */}
      <main>
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-6">
          <DashboardStatsCard
            title="Total Users"
            value={stats.totals?.totalUsers ?? 0}
            textColorClass="text-gray-800"
          />
          <DashboardStatsCard
            title="Total Businesses"
            value={stats.totals?.totalBusinesses ?? 0}
            textColorClass="text-gray-800"
          />
          <DashboardStatsCard
            title="Business Types"
            value={stats.totals?.totalBusinessTypes ?? 0}
            textColorClass="text-gray-800"
          />
          <DashboardStatsCard
            title="Approved Businesses"
            value={stats.totals?.totalApprovedBusinesses ?? 0}
            bgColorClass="bg-green-50"
            textColorClass="text-green-600"
          />
          <DashboardStatsCard
            title="Rejected Businesses"
            value={stats.totals?.totalRejectedBusinesses ?? 0}
            bgColorClass="bg-red-50"
            textColorClass="text-red-600"
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <BusinessByTypeChart data={businessTypeData} />
          <BusinessStatusChart data={businessStatusData} />
        </div>

        {/* Recent Approvals Table */}
        <RecentApprovalsTable
          businesses={stats.recentApprovedBusinesses}
        />
      </main>
    </>
  );
};

export default AdminDashboardPage;
