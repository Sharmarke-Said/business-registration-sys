import {
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaCalendarAlt,
} from "react-icons/fa";

const RecentApprovalsTable = ({ businesses }) => {
  // Helper function to format date
  // const formatDate = (dateString) => {
  //   const options = {
  //     year: "numeric",
  //     month: "long",
  //     day: "numeric",
  //   };
  //   return new Date(dateString).toLocaleDateString(
  //     undefined,
  //     options
  //   );
  // };

  // Component to render a status badge
  const StatusBadge = ({ status }) => {
    let badgeClass = "";
    let icon = null;
    let statusText = status;

    switch (status) {
      case "approved":
        badgeClass = "bg-green-100 text-green-800";
        icon = <FaCheckCircle className="text-green-500 mr-1" />;
        statusText = "Approved";
        break;
      case "rejected":
        badgeClass = "bg-red-100 text-red-800";
        icon = <FaTimesCircle className="text-red-500 mr-1" />;
        statusText = "Rejected";
        break;
      case "pending":
        badgeClass = "bg-yellow-100 text-yellow-800";
        icon = <FaClock className="text-yellow-500 mr-1" />;
        statusText = "Pending";
        break;
      default:
        badgeClass = "bg-gray-100 text-gray-800";
        break;
    }

    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${badgeClass}`}
      >
        {icon}
        {statusText}
      </span>
    );
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Recent Approvals
      </h3>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Business Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Owner
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="flex items-center">
                  <FaCalendarAlt className="mr-2" />
                  Approval Date
                </div>
              </th> */}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {businesses?.map((business) => (
              <tr key={business._id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {business.businessName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {business.userId?.name || "N/A"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {business.businessTypeId?.name || "N/A"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <StatusBadge status={business.status} />
                </td>
                {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDate(business.createdAt)}
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentApprovalsTable;
