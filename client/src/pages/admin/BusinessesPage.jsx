import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// Sidebar is no longer needed here
import BusinessDetailsModal from "../../components/admin/BusinessDetailsModal";
import {
  fetchAllBusinesses,
  approveOrRejectBusiness,
  deleteBusiness,
} from "../../features/businesses/businessSlice";
import { FaEye, FaCheck, FaTimes, FaTrash } from "react-icons/fa";

const BusinessesPage = () => {
  const dispatch = useDispatch();
  const { businesses, status, error } = useSelector(
    (state) => state.businesses
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBusiness, setSelectedBusiness] = useState(null);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchAllBusinesses());
    }
  }, [status, dispatch]);

  const handleApproval = (id, newStatus) => {
    if (
      window.confirm(
        `Are you sure you want to ${newStatus} this business?`
      )
    ) {
      dispatch(approveOrRejectBusiness({ id, status: newStatus }));
    }
  };

  const handleDelete = (id) => {
    if (
      window.confirm("Are you sure you want to delete this business?")
    ) {
      dispatch(deleteBusiness(id));
    }
  };

  const openDetailsModal = (business) => {
    setSelectedBusiness(business);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBusiness(null);
  };

  let content;

  if (status === "loading") {
    content = <p>Loading businesses...</p>;
  } else if (status === "succeeded") {
    if (businesses && businesses.length > 0) {
      content = (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Business Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {businesses.map((business) => (
                <tr key={business._id}>
                  <td className="px-6 py-4">
                    {business.businessName}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        business.status === "approved"
                          ? "bg-green-100 text-green-800"
                          : business.status === "rejected"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {business.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex items-center space-x-2">
                    {/* View Details button with tooltip */}
                    <div className="relative group">
                      <button
                        onClick={() => openDetailsModal(business)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <FaEye />
                      </button>
                      <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-800 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        View Details
                      </span>
                    </div>
                    {/* Approve button with tooltip (conditionally rendered) */}
                    {business.status !== "approved" && (
                      <div className="relative group">
                        <button
                          onClick={() =>
                            handleApproval(business._id, "approved")
                          }
                          className="text-green-600 hover:text-green-900"
                        >
                          <FaCheck />
                        </button>
                        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-800 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                          Approve
                        </span>
                      </div>
                    )}
                    {/* Reject button with tooltip (conditionally rendered) */}
                    {business.status !== "rejected" && (
                      <div className="relative group">
                        <button
                          onClick={() =>
                            handleApproval(business._id, "rejected")
                          }
                          className="text-red-600 hover:text-red-900"
                        >
                          <FaTimes />
                        </button>
                        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-800 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                          Reject
                        </span>
                      </div>
                    )}
                    {/* Delete button with tooltip */}
                    <div className="relative group">
                      <button
                        onClick={() => handleDelete(business._id)}
                        className="text-gray-600 hover:text-gray-900"
                      >
                        <FaTrash />
                      </button>
                      <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-800 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        Delete
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    } else {
      content = <p>No businesses found.</p>;
    }
  } else if (status === "failed") {
    content = <p className="text-red-500">Error: {error.message}</p>;
  }

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Businesses
        </h1>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        {content}
      </div>
      {isModalOpen && (
        <BusinessDetailsModal
          onClose={closeModal}
          business={selectedBusiness}
        />
      )}
    </>
  );
};

export default BusinessesPage;
