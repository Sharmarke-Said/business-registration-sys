// src/components/admin/BusinessTypeTable.jsx

import React from "react";

const BusinessTypeTable = ({ businessTypes }) => {
  return (
    <table className="min-w-full table-auto">
      <thead className="bg-gray-200">
        <tr>
          <th className="px-4 py-2 text-left">Business Type Name</th>
        </tr>
      </thead>
      <tbody>
        {businessTypes.map((type, index) => (
          <tr
            key={index}
            className="border-b border-gray-200 hover:bg-gray-100"
          >
            <td className="px-4 py-2">{type.name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BusinessTypeTable;
