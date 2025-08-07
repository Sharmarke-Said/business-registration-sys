/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

const BusinessDetailsModal = ({ onClose, business }) => {
  if (!business) return null;

  // Use useEffect to handle closing with the 'Escape' key
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="relative p-8 border w-full max-w-xl shadow-lg rounded-md bg-white mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-bold">Business Details</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800"
          >
            <FaTimes size={20} />
          </button>
        </div>

        <div className="space-y-4">
          <p>
            <strong className="font-semibold">Business Name:</strong>{" "}
            {business.businessName}
          </p>
          <p>
            <strong className="font-semibold">Owner Name:</strong>{" "}
            {business.ownerName}
          </p>
          <p>
            <strong className="font-semibold">Status:</strong>{" "}
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
          </p>
          <p>
            <strong className="font-semibold">Contact Email:</strong>{" "}
            {business.contactEmail}
          </p>
          <p>
            <strong className="font-semibold">Contact Phone:</strong>{" "}
            {business.contactPhone}
          </p>
          <p>
            <strong className="font-semibold">
              Contact Address:
            </strong>{" "}
            {business.contactAddress}
          </p>
          <p>
            <strong className="font-semibold">
              Business Address:
            </strong>{" "}
            {business.businessAddress}
          </p>
          <p>
            <strong className="font-semibold">
              Registration No:
            </strong>{" "}
            {business.registrationNumber}
          </p>
          <div className="mt-6">
            <h4 className="text-xl font-bold mb-2">Documents:</h4>
            {business.documents && business.documents.length > 0 ? (
              <ul className="list-disc list-inside space-y-1">
                {business.documents.map((doc, index) => (
                  <li key={index}>
                    <span className="font-medium">{doc.name}:</span>{" "}
                    <Link
                      to={doc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      View Document
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No documents submitted.</p>
            )}
          </div>
        </div>

        <div className="mt-6 text-right">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default BusinessDetailsModal;
