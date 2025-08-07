import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerBusiness } from "../../features/user/userSlice";
import axios from "axios";

// Create a custom axios instance with a base URL
const api = axios.create({
  baseURL: "http://localhost:5000/api/v1", // Ensure this matches your backend API URL
  withCredentials: true,
});

const RegisterBusinessPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status } = useSelector((state) => state.user);
  const [businessTypes, setBusinessTypes] = useState([]);
  const [loadingTypes, setLoadingTypes] = useState(true);

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

  // Use an array to store files for easier handling
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    const fetchBusinessTypes = async () => {
      try {
        const res = await api.get("/business-types");
        setBusinessTypes(res.data?.data ?? []);
      } catch (err) {
        console.error("Failed to fetch business types:", err);
      } finally {
        setLoadingTypes(false);
      }
    };
    fetchBusinessTypes();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setDocuments(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    for (const key in formData) {
      form.append(key, formData[key]);
    }

    // Append each document with the key "documents" as the backend expects
    for (const file of documents) {
      form.append("documents", file);
    }

    try {
      await dispatch(registerBusiness(form)).unwrap();
      navigate("/user/my-businesses");
    } catch (error) {
      alert(error.message || "Business registration failed.");
    }
  };

  return (
    // Remove the wrapping <div> and <UserHeader />
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Register a New Business
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
              {loadingTypes ? (
                <p className="mt-1 text-gray-500">
                  Loading business types...
                </p>
              ) : (
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
              )}
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

          <hr className="my-6" />
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Required Documents (PDFs only - Exactly 4 files)
          </h2>
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-gray-700">
                Upload all 4 documents at once
              </label>
              <input
                type="file"
                name="documents"
                accept="application/pdf"
                onChange={handleFileChange}
                multiple
                className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="mt-6 w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
            disabled={status === "loading"}
          >
            {status === "loading"
              ? "Registering..."
              : "Register Business"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterBusinessPage;
