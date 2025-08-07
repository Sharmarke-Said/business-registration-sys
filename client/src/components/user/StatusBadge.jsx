import {
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
} from "react-icons/fa";

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

export default StatusBadge;
