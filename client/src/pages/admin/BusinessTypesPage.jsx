// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";

// import {
//   fetchBusinessTypes,
//   deleteBusinessType,
// } from "../../features/businessTypes/businessTypeSlice";
// import BusinessTypeForm from "../../components/admin/BusinessTypeForm";
// import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

// const BusinessTypesPage = () => {
//   const dispatch = useDispatch();
//   const { businessTypes, status, error } = useSelector(
//     (state) => state.businessTypes
//   );

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [currentBusinessType, setCurrentBusinessType] =
//     useState(null);

//   useEffect(() => {
//     if (status === "idle") {
//       dispatch(fetchBusinessTypes());
//     }
//   }, [status, dispatch]);

//   const handleDelete = (id) => {
//     if (
//       window.confirm(
//         "Are you sure you want to delete this business type?"
//       )
//     ) {
//       dispatch(deleteBusinessType(id));
//     }
//   };

//   const openCreateModal = () => {
//     setCurrentBusinessType(null);
//     setIsModalOpen(true);
//   };

//   const openUpdateModal = (businessType) => {
//     setCurrentBusinessType(businessType);
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setCurrentBusinessType(null);
//   };

//   let content;

//   if (status === "loading") {
//     content = <p>Loading...</p>;
//   } else if (status === "succeeded") {
//     if (businessTypes && businessTypes.length > 0) {
//       content = (
//         <div className="overflow-x-auto">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Name
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/2">
//                   Description
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {businessTypes.map((type) => (
//                 <tr key={type._id}>
//                   <td className="px-6 py-4">{type.name}</td>
//                   <td className="px-6 py-4 max-w-xs text-sm text-gray-500 break-words">
//                     {type.description}
//                   </td>
//                   <td className="px-6 py-4 text-sm font-medium">
//                     <button
//                       onClick={() => openUpdateModal(type)}
//                       className="text-blue-600 hover:text-blue-900 mr-4"
//                     >
//                       <FaEdit />
//                     </button>
//                     <button
//                       onClick={() => handleDelete(type._id)}
//                       className="text-red-600 hover:text-red-900"
//                     >
//                       <FaTrash />
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       );
//     } else {
//       content = <p>No business types found.</p>;
//     }
//   } else if (status === "failed") {
//     content = <p className="text-red-500">Error: {error.message}</p>;
//   } else {
//     content = <p>Please wait...</p>;
//   }

//   return (
//     <>
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-3xl font-bold text-gray-800">
//           Business Types
//         </h1>
//         <button
//           onClick={openCreateModal}
//           className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700"
//         >
//           <FaPlus />
//           <span>Add New</span>
//         </button>
//       </div>

//       <div className="bg-white p-6 rounded-lg shadow-md">
//         {content}
//       </div>

//       {isModalOpen && (
//         <BusinessTypeForm
//           onClose={closeModal}
//           businessType={currentBusinessType}
//         />
//       )}
//     </>
//   );
// };

// export default BusinessTypesPage;
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBusinessTypes,
  deleteBusinessType,
} from "../../features/businessTypes/businessTypeSlice";
import BusinessTypeForm from "../../components/admin/BusinessTypeForm";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

const BusinessTypesPage = () => {
  const dispatch = useDispatch();
  const { businessTypes, status, error } = useSelector(
    (state) => state.businessTypes
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentBusinessType, setCurrentBusinessType] =
    useState(null);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchBusinessTypes());
    }
  }, [status, dispatch]);

  const handleDelete = (id) => {
    if (
      window.confirm(
        "Are you sure you want to delete this business type?"
      )
    ) {
      dispatch(deleteBusinessType(id));
    }
  };

  const openCreateModal = () => {
    setCurrentBusinessType(null);
    setIsModalOpen(true);
  };

  const openUpdateModal = (businessType) => {
    setCurrentBusinessType(businessType);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentBusinessType(null);
  };

  let content;

  if (status === "loading") {
    content = <p>Loading...</p>;
  } else if (status === "succeeded") {
    if (businessTypes && businessTypes.length > 0) {
      content = (
        <div className="overflow-x-auto">
          {/* Main table for larger screens */}
          <table className="min-w-full divide-y divide-gray-200 hidden md:table">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/2">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {businessTypes.map((type) => (
                <tr key={type._id}>
                  <td className="px-6 py-4">{type.name}</td>
                  <td className="px-6 py-4 max-w-xs text-sm text-gray-500 break-words">
                    {type.description}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => openUpdateModal(type)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(type._id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Card view for smaller screens */}
          <div className="md:hidden">
            {businessTypes.map((type) => (
              <div
                key={type._id}
                className="bg-white shadow-md rounded-lg p-4 mb-4"
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-bold">{type.name}</h3>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => openUpdateModal(type)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(type._id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  {type.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      );
    } else {
      content = <p>No business types found.</p>;
    }
  } else if (status === "failed") {
    content = <p className="text-red-500">Error: {error.message}</p>;
  } else {
    content = <p>Please wait...</p>;
  }

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 sm:mb-0">
          Business Types
        </h1>
        <button
          onClick={openCreateModal}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 w-full sm:w-auto justify-center"
        >
          <FaPlus />
          <span>Add New</span>
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        {content}
      </div>

      {isModalOpen && (
        <BusinessTypeForm
          onClose={closeModal}
          businessType={currentBusinessType}
        />
      )}
    </>
  );
};

export default BusinessTypesPage;
