// // src/pages/SettingsPage.jsx

// import { useEffect, useState, useRef } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// import { useNavigate } from "react-router-dom";
// import { FaUserCircle, FaArrowLeft } from "react-icons/fa";
// import Input from "../components/ui/Input";
// import {
//   updateMe,
//   updateMyPassword,
// } from "../features/auth/authSlice";
// import { toast } from "react-toastify";

// // Define the path for the default user photo
// const DEFAULT_PHOTO_PATH = "/img/users/default.jpg";

// // Zod schemas for validation
// const accountSettingsSchema = z.object({
//   name: z.string().min(1, "Name is required"),
//   email: z.string().email("Invalid email address"),
// });

// const passwordChangeSchema = z
//   .object({
//     passwordCurrent: z
//       .string()
//       .min(1, "Current password is required"),
//     password: z
//       .string()
//       .min(8, "New password must be at least 8 characters long"),
//     passwordConfirm: z
//       .string()
//       .min(1, "Confirm password is required"),
//   })
//   .refine((data) => data.password === data.passwordConfirm, {
//     message: "Passwords do not match",
//     path: ["passwordConfirm"],
//   });

// function SettingsPage() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { user, isUpdating, error } = useSelector(
//     (state) => state.auth
//   );

//   // Set the initial photo preview based on the user's current photo
//   const initialPhotoPath =
//     user?.photo && user.photo !== "default.jpg"
//       ? `/img/users/${user.photo}`
//       : DEFAULT_PHOTO_PATH;

//   const [photoFile, setPhotoFile] = useState(null);
//   const [photoPreview, setPhotoPreview] = useState(initialPhotoPath);
//   const fileInputRef = useRef(null);

//   // Form handling for account settings
//   const {
//     register: registerAccount,
//     handleSubmit: handleAccountSubmit,
//     reset: resetAccount,
//     formState: { errors: accountErrors },
//   } = useForm({
//     resolver: zodResolver(accountSettingsSchema),
//     defaultValues: {
//       name: user?.name || "",
//       email: user?.email || "",
//     },
//   });

//   // Form handling for password change
//   const {
//     register: registerPassword,
//     handleSubmit: handlePasswordSubmit,
//     reset: resetPassword,
//     formState: { errors: passwordErrors },
//   } = useForm({
//     resolver: zodResolver(passwordChangeSchema),
//   });

//   // Reset account form with user data on load or user change
//   useEffect(() => {
//     if (user) {
//       resetAccount({
//         name: user.name,
//         email: user.email,
//       });
//       // Update photo preview on user change
//       const newPhotoPath =
//         user.photo && user.photo !== "default.jpg"
//           ? `/img/users/${user.photo}`
//           : DEFAULT_PHOTO_PATH;
//       setPhotoPreview(newPhotoPath);
//     }
//   }, [user, resetAccount]);

//   const onAccountSubmit = (data) => {
//     const formData = new FormData();
//     formData.append("name", data.name);
//     formData.append("email", data.email);
//     if (photoFile) {
//       formData.append("photo", photoFile);
//     }

//     dispatch(updateMe(formData))
//       .unwrap()
//       .then(() => {
//         toast.success("Account settings updated successfully!");
//       })
//       .catch((err) => {
//         toast.error(err);
//       });
//   };

//   const onPasswordSubmit = (data) => {
//     dispatch(updateMyPassword(data))
//       .unwrap()
//       .then(() => {
//         toast.success("Password updated successfully!");
//         resetPassword();
//       })
//       .catch((err) => {
//         toast.error(err);
//       });
//   };

//   const handlePhotoChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       setPhotoFile(file);
//       setPhotoPreview(URL.createObjectURL(file));
//     }
//   };

//   const handleBack = () => {
//     navigate(-1); // Navigates back to the previous page
//   };

//   return (
//     <div className="p-6">
//       <div className="flex items-center mb-6">
//         <button
//           onClick={handleBack}
//           className="flex items-center text-blue-600 hover:underline"
//         >
//           <FaArrowLeft className="mr-2" /> Back
//         </button>
//         <h1 className="text-2xl font-bold ml-4 text-gray-800">
//           Settings
//         </h1>
//       </div>

//       {/* Account Settings Section */}
//       <div className="bg-white p-6 rounded-lg shadow-md mb-8">
//         <h2 className="text-xl font-semibold mb-4 text-blue-700">
//           YOUR ACCOUNT SETTINGS
//         </h2>
//         {error && <p className="text-red-500 mb-4">{error}</p>}
//         <form
//           onSubmit={handleAccountSubmit(onAccountSubmit)}
//           className="space-y-4"
//         >
//           <div>
//             <label
//               htmlFor="name"
//               className="block text-sm font-medium text-gray-700"
//             >
//               Name
//             </label>
//             <Input
//               id="name"
//               type="text"
//               placeholder="Enter your name"
//               {...registerAccount("name")}
//             />
//             {accountErrors.name && (
//               <p className="text-red-500 text-sm mt-1">
//                 {accountErrors.name.message}
//               </p>
//             )}
//           </div>
//           <div>
//             <label
//               htmlFor="email"
//               className="block text-sm font-medium text-gray-700"
//             >
//               Email address
//             </label>
//             <Input
//               id="email"
//               type="email"
//               placeholder="Enter your email"
//               {...registerAccount("email")}
//             />
//             {accountErrors.email && (
//               <p className="text-red-500 text-sm mt-1">
//                 {accountErrors.email.message}
//               </p>
//             )}
//           </div>
//           <div className="flex items-center space-x-4">
//             <div className="relative w-16 h-16 rounded-full overflow-hidden">
//               <img
//                 src={photoPreview}
//                 alt="User"
//                 className="object-cover w-full h-full"
//               />
//             </div>
//             <input
//               type="file"
//               id="photo-upload"
//               ref={fileInputRef}
//               onChange={handlePhotoChange}
//               className="hidden"
//               accept="image/*"
//             />
//             <button
//               type="button"
//               onClick={() => fileInputRef.current.click()}
//               className="text-sm font-medium text-blue-600 hover:underline"
//             >
//               Choose new photo
//             </button>
//           </div>
//           <button
//             type="submit"
//             className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
//             disabled={isUpdating}
//           >
//             {isUpdating ? "SAVING..." : "SAVE SETTINGS"}
//           </button>
//         </form>
//       </div>

//       {/* Password Change Section */}
//       <div className="bg-white p-6 rounded-lg shadow-md">
//         <h2 className="text-xl font-semibold mb-4 text-blue-700">
//           PASSWORD CHANGE
//         </h2>
//         <form
//           onSubmit={handlePasswordSubmit(onPasswordSubmit)}
//           className="space-y-4"
//         >
//           <div>
//             <label
//               htmlFor="passwordCurrent"
//               className="block text-sm font-medium text-gray-700"
//             >
//               Current password
//             </label>
//             <Input
//               id="passwordCurrent"
//               type="password"
//               placeholder="Current password"
//               {...registerPassword("passwordCurrent")}
//             />
//             {passwordErrors.passwordCurrent && (
//               <p className="text-red-500 text-sm mt-1">
//                 {passwordErrors.passwordCurrent.message}
//               </p>
//             )}
//           </div>
//           <div>
//             <label
//               htmlFor="password"
//               className="block text-sm font-medium text-gray-700"
//             >
//               New password
//             </label>
//             <Input
//               id="password"
//               type="password"
//               placeholder="New password"
//               {...registerPassword("password")}
//             />
//             {passwordErrors.password && (
//               <p className="text-red-500 text-sm mt-1">
//                 {passwordErrors.password.message}
//               </p>
//             )}
//           </div>
//           <div>
//             <label
//               htmlFor="passwordConfirm"
//               className="block text-sm font-medium text-gray-700"
//             >
//               Confirm password
//             </label>
//             <Input
//               id="passwordConfirm"
//               type="password"
//               placeholder="Confirm password"
//               {...registerPassword("passwordConfirm")}
//             />
//             {passwordErrors.passwordConfirm && (
//               <p className="text-red-500 text-sm mt-1">
//                 {passwordErrors.passwordConfirm.message}
//               </p>
//             )}
//           </div>
//           <button
//             type="submit"
//             className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
//             disabled={isUpdating}
//           >
//             {isUpdating ? "SAVING..." : "SAVE PASSWORD"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default SettingsPage;
// src/pages/SettingsPage.jsx

import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { FaUserCircle, FaArrowLeft } from "react-icons/fa";
import Input from "../components/ui/Input";
import {
  updateMe,
  updateMyPassword,
} from "../features/auth/authSlice";
import { toast } from "react-toastify";

// Define the base URL for the backend API and static files
const BACKEND_URL = "http://localhost:5000";
// Define the path for the default user photo
const DEFAULT_PHOTO_PATH = `${BACKEND_URL}/img/users/default.jpg`;

// Zod schemas for validation
const accountSettingsSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
});

const passwordChangeSchema = z
  .object({
    passwordCurrent: z
      .string()
      .min(1, "Current password is required"),
    password: z
      .string()
      .min(8, "New password must be at least 8 characters long"),
    passwordConfirm: z
      .string()
      .min(1, "Confirm password is required"),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords do not match",
    path: ["passwordConfirm"],
  });

function SettingsPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isUpdating, error } = useSelector(
    (state) => state.auth
  );

  // Helper function to create the full image URL
  const getFullPhotoUrl = (photoName) => {
    // Log the photo name to check if it's correct
    console.log("Photo name from user object:", photoName);

    if (!photoName || photoName === "default.jpg") {
      // Log when using the default photo path
      console.log("Using default photo path:", DEFAULT_PHOTO_PATH);
      return DEFAULT_PHOTO_PATH;
    }
    // Create the full URL by prepending the backend base URL
    const fullUrl = `${BACKEND_URL}/img/users/${photoName}`;
    // Log the final URL to be used
    console.log("Using full photo URL:", fullUrl);
    return fullUrl;
  };

  // Set the initial photo preview based on the user's current photo
  const initialPhotoPath = getFullPhotoUrl(user?.photo);

  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(initialPhotoPath);
  const fileInputRef = useRef(null);

  // Form handling for account settings
  const {
    register: registerAccount,
    handleSubmit: handleAccountSubmit,
    reset: resetAccount,
    formState: { errors: accountErrors },
  } = useForm({
    resolver: zodResolver(accountSettingsSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
    },
  });

  // Form handling for password change
  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    reset: resetPassword,
    formState: { errors: passwordErrors },
  } = useForm({
    resolver: zodResolver(passwordChangeSchema),
  });

  // Reset account form with user data on load or user change
  useEffect(() => {
    if (user) {
      resetAccount({
        name: user.name,
        email: user.email,
      });
      // Update photo preview on user change
      const newPhotoPath = getFullPhotoUrl(user.photo);
      setPhotoPreview(newPhotoPath);
    }
  }, [user, resetAccount]);

  const onAccountSubmit = (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    if (photoFile) {
      formData.append("photo", photoFile);
    }

    dispatch(updateMe(formData))
      .unwrap()
      .then(() => {
        toast.success("Account settings updated successfully!");
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  const onPasswordSubmit = (data) => {
    dispatch(updateMyPassword(data))
      .unwrap()
      .then(() => {
        toast.success("Password updated successfully!");
        resetPassword();
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPhotoFile(file);
      // For immediate preview, use URL.createObjectURL
      setPhotoPreview(URL.createObjectURL(file));
      console.log("New photo selected:", file.name);
    }
  };

  const handleBack = () => {
    navigate(-1); // Navigates back to the previous page
  };

  return (
    <div className="p-6">
      <div className="flex items-center mb-6">
        <button
          onClick={handleBack}
          className="flex items-center text-blue-600 hover:underline"
        >
          <FaArrowLeft className="mr-2" /> Back
        </button>
        <h1 className="text-2xl font-bold ml-4 text-gray-800">
          Settings
        </h1>
      </div>

      {/* Account Settings Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4 text-blue-700">
          YOUR ACCOUNT SETTINGS
        </h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form
          onSubmit={handleAccountSubmit(onAccountSubmit)}
          className="space-y-4"
        >
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <Input
              id="name"
              type="text"
              placeholder="Enter your name"
              {...registerAccount("name")}
            />
            {accountErrors.name && (
              <p className="text-red-500 text-sm mt-1">
                {accountErrors.name.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email address
            </label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              {...registerAccount("email")}
            />
            {accountErrors.email && (
              <p className="text-red-500 text-sm mt-1">
                {accountErrors.email.message}
              </p>
            )}
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative w-16 h-16 rounded-full overflow-hidden">
              <img
                src={photoPreview}
                alt="User"
                className="object-cover w-full h-full"
              />
            </div>
            <input
              type="file"
              id="photo-upload"
              ref={fileInputRef}
              onChange={handlePhotoChange}
              className="hidden"
              accept="image/*"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current.click()}
              className="text-sm font-medium text-blue-600 hover:underline"
            >
              Choose new photo
            </button>
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
            disabled={isUpdating}
          >
            {isUpdating ? "SAVING..." : "SAVE SETTINGS"}
          </button>
        </form>
      </div>

      {/* Password Change Section */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-blue-700">
          PASSWORD CHANGE
        </h2>
        <form
          onSubmit={handlePasswordSubmit(onPasswordSubmit)}
          className="space-y-4"
        >
          <div>
            <label
              htmlFor="passwordCurrent"
              className="block text-sm font-medium text-gray-700"
            >
              Current password
            </label>
            <Input
              id="passwordCurrent"
              type="password"
              placeholder="Current password"
              {...registerPassword("passwordCurrent")}
            />
            {passwordErrors.passwordCurrent && (
              <p className="text-red-500 text-sm mt-1">
                {passwordErrors.passwordCurrent.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              New password
            </label>
            <Input
              id="password"
              type="password"
              placeholder="New password"
              {...registerPassword("password")}
            />
            {passwordErrors.password && (
              <p className="text-red-500 text-sm mt-1">
                {passwordErrors.password.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="passwordConfirm"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm password
            </label>
            <Input
              id="passwordConfirm"
              type="password"
              placeholder="Confirm password"
              {...registerPassword("passwordConfirm")}
            />
            {passwordErrors.passwordConfirm && (
              <p className="text-red-500 text-sm mt-1">
                {passwordErrors.passwordConfirm.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
            disabled={isUpdating}
          >
            {isUpdating ? "SAVING..." : "SAVE PASSWORD"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default SettingsPage;
