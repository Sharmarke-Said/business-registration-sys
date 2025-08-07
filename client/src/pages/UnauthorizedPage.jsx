import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const UnauthorizedPage = () => {
  const user = useSelector((state) => state.auth.user);
  const homeLink =
    user?.role === "admin" ? "/admin/dashboard" : "/user/dashboard";

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center">
        <h2 className="text-6xl font-bold text-red-700 mb-4">403</h2>
        <h3 className="text-2xl font-semibold text-gray-800 mb-2">
          Unauthorized Access
        </h3>
        <p className="text-gray-600 mb-6">
          You do not have permission to view this page.
        </p>
        <Link
          to={homeLink}
          className="inline-block bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Go to your Dashboard
        </Link>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
