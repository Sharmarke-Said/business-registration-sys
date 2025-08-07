// import { useEffect } from "react";
// import { useDispatch } from "react-redux";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
// } from "react-router-dom";
// import LandingPage from "./pages/LandingPage";
// import LoginPage from "./pages/LoginPage";
// import SignUpPage from "./pages/SignUpPage";

// // Admin Imports
// import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
// import BusinessTypesPage from "./pages/admin/BusinessTypesPage";
// import BusinessesPage from "./pages/admin/BusinessesPage";
// import UsersPage from "./pages/admin/UsersPage";
// import ReportsPage from "./pages/admin/ReportsPage";
// import AdminLayout from "./components/admin/AdminLayout"; // Import the new layout component

// // User Imports
// import UserDashboardPage from "./pages/user/UserDashboardPage";
// import RegisterBusinessPage from "./pages/user/RegisterBusinessPage";
// import MyBusinessesPage from "./pages/user/MyBusinessesPage";
// import EditBusinessPage from "./pages/user/EditBusinessPage";
// import ViewBusinessPage from "./pages/user/ViewBusinessPage";

// // Shared Imports
// import SettingsPage from "./pages/SettingsPage";
// import ProtectedRoute from "./components/ProtectedRoute";
// import NotFoundPage from "./pages/NotFoundPage";
// import UnauthorizedPage from "./pages/UnauthorizedPage";

// import { fetchCurrentUser } from "./features/auth/authSlice";
// import "./print.css";

// const App = () => {
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(fetchCurrentUser());
//   }, [dispatch]);

//   return (
//     <Router>
//       <Routes>
//         {/* Public Routes */}
//         <Route path="/" element={<LandingPage />} />
//         <Route path="/login" element={<LoginPage />} />
//         <Route path="/signup" element={<SignUpPage />} />

//         {/* Protected Routes for both users and admins */}
//         <Route
//           path="/settings"
//           element={
//             <ProtectedRoute allowedRoles={["user", "admin"]}>
//               <SettingsPage />
//             </ProtectedRoute>
//           }
//         />

//         {/* User Routes (Protected) */}
//         <Route element={<ProtectedRoute allowedRoles={["user"]} />}>
//           <Route
//             path="/user/dashboard"
//             element={<UserDashboardPage />}
//           />
//           <Route
//             path="/user/register-business"
//             element={<RegisterBusinessPage />}
//           />
//           <Route
//             path="/user/my-businesses"
//             element={<MyBusinessesPage />}
//           />
//           <Route
//             path="/user/my-businesses/edit/:id"
//             element={<EditBusinessPage />}
//           />
//           <Route
//             path="/user/my-businesses/:id"
//             element={<ViewBusinessPage />}
//           />
//         </Route>

//         {/* Admin Routes (Nested and Protected) */}
//         <Route
//           path="/admin"
//           element={
//             <ProtectedRoute allowedRoles={["admin"]}>
//               <AdminLayout />
//             </ProtectedRoute>
//           }
//         >
//           <Route path="dashboard" element={<AdminDashboardPage />} />
//           <Route
//             path="businesstypes"
//             element={<BusinessTypesPage />}
//           />
//           <Route path="businesses" element={<BusinessesPage />} />
//           <Route path="users" element={<UsersPage />} />
//           <Route path="reports" element={<ReportsPage />} />
//         </Route>

//         {/* Unauthorized Route */}
//         <Route path="/unauthorized" element={<UnauthorizedPage />} />

//         {/* Catch-all route for 404 Not Found */}
//         <Route path="*" element={<NotFoundPage />} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";

// Admin Imports
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import BusinessTypesPage from "./pages/admin/BusinessTypesPage";
import BusinessesPage from "./pages/admin/BusinessesPage";
import UsersPage from "./pages/admin/UsersPage";
import ReportsPage from "./pages/admin/ReportsPage";
import AdminLayout from "./components/admin/AdminLayout";

// User Imports
import UserDashboardPage from "./pages/user/UserDashboardPage";
import RegisterBusinessPage from "./pages/user/RegisterBusinessPage";
import MyBusinessesPage from "./pages/user/MyBusinessesPage";
import EditBusinessPage from "./pages/user/EditBusinessPage";
import ViewBusinessPage from "./pages/user/ViewBusinessPage";
import UserLayout from "./components/user/UserLayout"; // Import the new user layout

// Shared Imports
import SettingsPage from "./pages/SettingsPage";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFoundPage from "./pages/NotFoundPage";
import UnauthorizedPage from "./pages/UnauthorizedPage";

import { fetchCurrentUser } from "./features/auth/authSlice";
import "./print.css";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />

        {/* Protected Routes for both users and admins */}
        <Route
          path="/settings"
          element={
            <ProtectedRoute allowedRoles={["user", "admin"]}>
              <SettingsPage />
            </ProtectedRoute>
          }
        />

        {/* User Routes (Protected and Nested) */}
        <Route
          path="/user"
          element={
            <ProtectedRoute allowedRoles={["user"]}>
              <UserLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<UserDashboardPage />} />
          <Route
            path="register-business"
            element={<RegisterBusinessPage />}
          />
          <Route
            path="my-businesses"
            element={<MyBusinessesPage />}
          />
          <Route
            path="my-businesses/edit/:id"
            element={<EditBusinessPage />}
          />
          <Route
            path="my-businesses/:id"
            element={<ViewBusinessPage />}
          />
        </Route>

        {/* Admin Routes (Nested and Protected) */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<AdminDashboardPage />} />
          <Route
            path="businesstypes"
            element={<BusinessTypesPage />}
          />
          <Route path="businesses" element={<BusinessesPage />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="reports" element={<ReportsPage />} />
        </Route>

        {/* Unauthorized Route */}
        <Route path="/unauthorized" element={<UnauthorizedPage />} />

        {/* Catch-all route for 404 Not Found */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default App;
