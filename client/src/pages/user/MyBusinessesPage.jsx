import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchMyBusinesses,
  deleteBusiness,
} from "../../features/user/userSlice";
import axios from "axios";

// Create a custom axios instance with a base URL
const api = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  withCredentials: true,
});

const MyBusinessesPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { businesses, status, error } = useSelector(
    (state) => state.user
  );
  const [businessTypes, setBusinessTypes] = useState({});
  const [loadingTypes, setLoadingTypes] = useState(true);

  useEffect(() => {
    // Fetch all business types to map IDs to names
    const fetchBusinessTypes = async () => {
      try {
        const res = await api.get("/business-types");
        const typesArray = res.data?.data ?? [];

        if (Array.isArray(typesArray)) {
          const typesMap = typesArray.reduce((acc, type) => {
            acc[type._id] = type.name;
            return acc;
          }, {});
          setBusinessTypes(typesMap);
        } else {
          console.error(
            "API response did not contain an array of business types."
          );
        }
      } catch (err) {
        console.error("Failed to fetch business types:", err);
      } finally {
        setLoadingTypes(false);
      }
    };

    dispatch(fetchMyBusinesses());
    fetchBusinessTypes();
  }, [dispatch]);

  const handleView = (businessId) => {
    navigate(`/user/my-businesses/${businessId}`);
  };

  const handleEdit = (businessId) => {
    navigate(`/user/my-businesses/edit/${businessId}`);
  };

  const handleDelete = (businessId) => {
    if (
      window.confirm("Are you sure you want to delete this business?")
    ) {
      dispatch(deleteBusiness(businessId))
        .unwrap()
        .then(() => {
          alert("Business deleted successfully.");
        })
        .catch((err) => {
          alert(`Error deleting business: ${err.message}`);
        });
    }
  };

  const renderStatusBadge = (status) => {
    const statusClasses = {
      Approved: "bg-green-100 text-green-800",
      Rejected: "bg-red-100 text-red-800",
      Pending: "bg-yellow-100 text-yellow-800",
    };
    const defaultClass = "bg-gray-100 text-gray-800";
    const className = statusClasses[status] || defaultClass;

    return (
      <span
        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${className}`}
      >
        {status}
      </span>
    );
  };

  return (
    // Remove the wrapping <div> and <UserHeader />
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        My Registered Businesses
      </h1>
      {(status === "loading" || loadingTypes) && (
        <p>Loading businesses...</p>
      )}
      {status === "failed" && (
        <p>Error: {error?.message || "Something went wrong."}</p>
      )}
      {status === "succeeded" &&
        !loadingTypes &&
        businesses.length === 0 && (
          <p className="text-gray-600">
            You have not registered any businesses yet.
          </p>
        )}

      {status === "succeeded" &&
        !loadingTypes &&
        businesses.length > 0 && (
          <>
            {/* Desktop and larger screens table view */}
            <div className="hidden md:block overflow-x-auto bg-white rounded-lg shadow-md">
              <table className="min-w-full table-auto">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Business Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Business Type
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
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {business.businessName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {businessTypes[business.businessTypeId] ||
                          "N/A"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {renderStatusBadge(business.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                        <button
                          onClick={() => handleView(business._id)}
                          className="text-indigo-600 hover:text-indigo-900 font-medium"
                        >
                          View
                        </button>
                        <button
                          onClick={() => handleEdit(business._id)}
                          className="text-blue-600 hover:text-blue-900 font-medium"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(business._id)}
                          className="text-red-600 hover:text-red-900 font-medium"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile and smaller screens card view */}
            <div className="md:hidden space-y-4">
              {businesses.map((business) => (
                <div
                  key={business._id}
                  className="bg-white p-4 rounded-lg shadow-md border border-gray-200"
                >
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-lg font-bold text-gray-900">
                      {business.businessName}
                    </p>
                    {renderStatusBadge(business.status)}
                  </div>
                  <div className="text-sm text-gray-600 mb-4">
                    <p>
                      <span className="font-semibold">Type:</span>{" "}
                      {businessTypes[business.businessTypeId] ||
                        "N/A"}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleView(business._id)}
                      className="flex-1 py-2 px-4 bg-gray-100 text-indigo-600 rounded-md font-medium hover:bg-gray-200"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleEdit(business._id)}
                      className="flex-1 py-2 px-4 bg-gray-100 text-blue-600 rounded-md font-medium hover:bg-gray-200"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(business._id)}
                      className="flex-1 py-2 px-4 bg-gray-100 text-red-600 rounded-md font-medium hover:bg-gray-200"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
    </div>
  );
};

export default MyBusinessesPage;
