import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  withCredentials: true,
});

const ViewBusinessPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [business, setBusiness] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [businessTypes, setBusinessTypes] = useState({});

  useEffect(() => {
    const fetchBusinessDetails = async () => {
      try {
        const businessRes = await api.get(
          `/businesses/me/my-business/${id}`
        );
        setBusiness(businessRes.data.data.business);

        const typesRes = await api.get("/business-types");
        const typesArray = typesRes.data.data ?? [];
        const typesMap = typesArray.reduce((acc, type) => {
          acc[type._id] = type.name;
          return acc;
        }, {});
        setBusinessTypes(typesMap);

        setLoading(false);
      } catch (err) {
        setError(
          err.response?.data?.message ||
            "Failed to fetch business details."
        );
        setLoading(false);
      }
    };
    fetchBusinessDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <p>Loading business details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <p className="text-red-600">{error}</p>
        <button
          onClick={() => navigate("/user/my-businesses")}
          className="mt-4 py-2 px-4 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
        >
          Back to My Businesses
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        {business.businessName} Details
      </h1>
      <div className="bg-white p-8 rounded-lg shadow-xl border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
          <div className="flex items-center">
            <p className="text-gray-700 font-semibold w-1/2 md:w-1/3">
              Business Name:
            </p>
            <p className="text-gray-900 font-medium">
              {business.businessName}
            </p>
          </div>
          <div className="flex items-center">
            <p className="text-gray-700 font-semibold w-1/2 md:w-1/3">
              Business Type:
            </p>
            <p className="text-gray-900 font-medium">
              {businessTypes[business.businessTypeId] || "N/A"}
            </p>
          </div>
          <div className="flex items-center">
            <p className="text-gray-700 font-semibold w-1/2 md:w-1/3">
              Owner Name:
            </p>
            <p className="text-gray-900 font-medium">
              {business.ownerName}
            </p>
          </div>
          <div className="flex items-center">
            <p className="text-gray-700 font-semibold w-1/2 md:w-1/3">
              Contact Email:
            </p>
            <p className="text-gray-900 font-medium">
              {business.contactEmail}
            </p>
          </div>
          <div className="flex items-center">
            <p className="text-gray-700 font-semibold w-1/2 md:w-1/3">
              Contact Phone:
            </p>
            <p className="text-gray-900 font-medium">
              {business.contactPhone}
            </p>
          </div>
          <div className="flex items-center">
            <p className="text-gray-700 font-semibold w-1/2 md:w-1/3">
              Business Address:
            </p>
            <p className="text-gray-900 font-medium">
              {business.businessAddress}
            </p>
          </div>
          <div className="flex items-center">
            <p className="text-gray-700 font-semibold w-1/2 md:w-1/3">
              Registration Number:
            </p>
            <p className="text-gray-900 font-medium">
              {business.registrationNumber}
            </p>
          </div>
          <div className="flex items-center">
            <p className="text-gray-700 font-semibold w-1/2 md:w-1/3">
              Status:
            </p>
            <span
              className={`px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full ${
                business.status === "Approved"
                  ? "bg-green-100 text-green-800"
                  : business.status === "Rejected"
                  ? "bg-red-100 text-red-800"
                  : "bg-yellow-100 text-yellow-800"
              }`}
            >
              {business.status}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
        <button
          onClick={() => navigate("/user/my-businesses")}
          className="w-full sm:w-auto py-3 px-6 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300 transition duration-150 ease-in-out"
        >
          Back to My Businesses
        </button>
        <button
          onClick={() =>
            navigate(`/user/my-businesses/edit/${business._id}`)
          }
          className="w-full sm:w-auto py-3 px-6 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition duration-150 ease-in-out"
        >
          Edit Business
        </button>
      </div>
    </div>
  );
};

export default ViewBusinessPage;
