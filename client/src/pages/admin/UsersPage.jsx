// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// // Sidebar is no longer needed here
// import UserForm from "../../components/admin/UserForm";
// import {
//   fetchAllUsers,
//   deleteUser,
// } from "../../features/users/userSlice";
// import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

// const UsersPage = () => {
//   const dispatch = useDispatch();
//   const { users, status, error } = useSelector(
//     (state) => state.users
//   );

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [currentUser, setCurrentUser] = useState(null);

//   useEffect(() => {
//     if (status === "idle") {
//       dispatch(fetchAllUsers());
//     }
//   }, [status, dispatch]);

//   const handleDelete = (id) => {
//     if (
//       window.confirm("Are you sure you want to delete this user?")
//     ) {
//       dispatch(deleteUser(id));
//     }
//   };

//   const openCreateModal = () => {
//     setCurrentUser(null);
//     setIsModalOpen(true);
//   };

//   const openUpdateModal = (user) => {
//     setCurrentUser(user);
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setCurrentUser(null);
//   };

//   let content;

//   if (status === "loading") {
//     content = <p>Loading users...</p>;
//   } else if (status === "succeeded") {
//     if (users && users.length > 0) {
//       content = (
//         <div className="overflow-x-auto">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Name
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Email
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Role
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {users.map((user) => (
//                 <tr key={user._id}>
//                   <td className="px-6 py-4">{user.name}</td>
//                   <td className="px-6 py-4">{user.email}</td>
//                   <td className="px-6 py-4">
//                     <span
//                       className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
//                         user.role === "admin"
//                           ? "bg-purple-100 text-purple-800"
//                           : "bg-gray-100 text-gray-800"
//                       }`}
//                     >
//                       {user.role}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 text-sm font-medium flex items-center space-x-2">
//                     <button
//                       onClick={() => openUpdateModal(user)}
//                       className="text-blue-600 hover:text-blue-900"
//                     >
//                       <FaEdit />
//                     </button>
//                     <button
//                       onClick={() => handleDelete(user._id)}
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
//       content = <p>No users found.</p>;
//     }
//   } else if (status === "failed") {
//     content = <p className="text-red-500">Error: {error.message}</p>;
//   } else {
//     content = <p>Please wait...</p>;
//   }

//   return (
//     <>
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-3xl font-bold text-gray-800">Users</h1>
//         <button
//           onClick={openCreateModal}
//           className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700"
//         >
//           <FaPlus />
//           <span>Add New User</span>
//         </button>
//       </div>

//       <div className="bg-white p-6 rounded-lg shadow-md">
//         {content}
//       </div>

//       {isModalOpen && (
//         <UserForm onClose={closeModal} user={currentUser} />
//       )}
//     </>
//   );
// };

// export default UsersPage;
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserForm from "../../components/admin/UserForm";
import {
  fetchAllUsers,
  deleteUser,
} from "../../features/users/userSlice";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

const UsersPage = () => {
  const dispatch = useDispatch();
  const { users, status, error } = useSelector(
    (state) => state.users
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchAllUsers());
    }
  }, [status, dispatch]);

  const handleDelete = (id) => {
    if (
      window.confirm("Are you sure you want to delete this user?")
    ) {
      dispatch(deleteUser(id));
    }
  };

  const openCreateModal = () => {
    setCurrentUser(null);
    setIsModalOpen(true);
  };

  const openUpdateModal = (user) => {
    setCurrentUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentUser(null);
  };

  let content;

  if (status === "loading") {
    content = <p>Loading users...</p>;
  } else if (status === "succeeded") {
    if (users && users.length > 0) {
      content = (
        <div className="overflow-x-auto">
          {/* Main table for larger screens */}
          <table className="min-w-full divide-y divide-gray-200 hidden md:table">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user._id}>
                  <td className="px-6 py-4">{user.name}</td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        user.role === "admin"
                          ? "bg-purple-100 text-purple-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium flex items-center space-x-2">
                    <button
                      onClick={() => openUpdateModal(user)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Card view for smaller screens */}
          <div className="md:hidden">
            {users.map((user) => (
              <div
                key={user._id}
                className="bg-white shadow-md rounded-lg p-4 mb-4"
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-bold">{user.name}</h3>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => openUpdateModal(user)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Email:</span>{" "}
                  {user.email}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  <span className="font-semibold">Role:</span>{" "}
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      user.role === "admin"
                        ? "bg-purple-100 text-purple-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {user.role}
                  </span>
                </p>
              </div>
            ))}
          </div>
        </div>
      );
    } else {
      content = <p>No users found.</p>;
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
          Users
        </h1>
        <button
          onClick={openCreateModal}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 w-full sm:w-auto justify-center"
        >
          <FaPlus />
          <span>Add New User</span>
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        {content}
      </div>

      {isModalOpen && (
        <UserForm onClose={closeModal} user={currentUser} />
      )}
    </>
  );
};

export default UsersPage;
