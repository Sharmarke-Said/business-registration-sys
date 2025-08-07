import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  withCredentials: true,
});

const EditBusinessPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    businessName: "",
    businessTypeId: "",
    ownerName: "",
    contactEmail: "",
    contactPhone: "",
    contactAddress: "",
    businessAddress: "",
    registrationNumber: "",
  });
  const [businessTypes, setBusinessTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [businessRes, typesRes] = await Promise.all([
          api.get(`/businesses/me/my-business/${id}`),
          api.get("/business-types"),
        ]);

        const businessData = businessRes.data.data.business;
        setFormData({
          businessName: businessData.businessName,
          businessTypeId: businessData.businessTypeId,
          ownerName: businessData.ownerName,
          contactEmail: businessData.contactEmail,
          contactPhone: businessData.contactPhone,
          contactAddress: businessData.contactAddress,
          businessAddress: businessData.businessAddress,
          registrationNumber: businessData.registrationNumber,
        });

        setBusinessTypes(typesRes.data.data ?? []);
        setLoading(false);
      } catch (err) {
        setError(
          err.response?.data?.message || "Failed to fetch data."
        );
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.patch(
        `/businesses/me/update-my-business/${id}`,
        formData
      );
      alert("Business updated successfully!");
      navigate("/user/my-businesses");
    } catch (err) {
      alert(
        `Error updating business: ${
          err.response?.data?.message || "Something went wrong."
        }`
      );
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <p>Loading business data...</p>
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
        Edit Business Details
      </h1>
      <div className="bg-white p-8 rounded-lg shadow-md">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700">
                Business Name
              </label>
              <input
                type="text"
                name="businessName"
                value={formData.businessName}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">
                Business Type
              </label>
              <select
                name="businessTypeId"
                value={formData.businessTypeId}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                required
              >
                <option value="">Select a type</option>
                {businessTypes.map((type) => (
                  <option key={type._id} value={type._id}>
                    {type.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-gray-700">
                Owner Name
              </label>
              <input
                type="text"
                name="ownerName"
                value={formData.ownerName}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">
                Contact Email
              </label>
              <input
                type="email"
                name="contactEmail"
                value={formData.contactEmail}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">
                Contact Phone
              </label>
              <input
                type="tel"
                name="contactPhone"
                value={formData.contactPhone}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">
                Contact Address
              </label>
              <input
                type="text"
                name="contactAddress"
                value={formData.contactAddress}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">
                Business Address
              </label>
              <input
                type="text"
                name="businessAddress"
                value={formData.businessAddress}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">
                Registration Number
              </label>
              <input
                type="text"
                name="registrationNumber"
                value={formData.registrationNumber}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
          </div>

          <div className="mt-6 flex space-x-2">
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={() => navigate("/user/my-businesses")}
              className="w-full py-2 px-4 bg-gray-200 text-gray-800 font-semibold rounded-md hover:bg-gray-300"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBusinessPage;
