const BusinessTable = ({ businesses }) => {
  return (
    <table className="min-w-full table-auto">
      <thead className="bg-gray-200">
        <tr>
          <th className="px-4 py-2 text-left">Business Name</th>
          <th className="px-4 py-2 text-left">Registration Number</th>
          <th className="px-4 py-2 text-left">Status</th>
          <th className="px-4 py-2 text-left">Owner</th>
          <th className="px-4 py-2 text-left">Type</th>
        </tr>
      </thead>
      <tbody>
        {businesses.map((business, index) => (
          <tr
            key={index}
            className="border-b border-gray-200 hover:bg-gray-100"
          >
            <td className="px-4 py-2">{business.businessName}</td>
            <td className="px-4 py-2">
              {business.registrationNumber}
            </td>
            <td className="px-4 py-2">
              <span
                className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
                  business.status === "approved"
                    ? "bg-green-100 text-green-800"
                    : business.status === "pending"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {business.status}
              </span>
            </td>
            {/* Add a defensive check for business.user */}
            <td className="px-4 py-2">
              {business.user ? business.user.name : "N/A"}
            </td>
            {/* Add a defensive check for business.businessType */}
            <td className="px-4 py-2">
              {business.businessType
                ? business.businessType.name
                : "N/A"}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BusinessTable;
