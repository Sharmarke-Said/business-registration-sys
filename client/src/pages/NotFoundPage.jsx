import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center">
        <h2 className="text-6xl font-bold text-blue-700 mb-4">404</h2>
        <h3 className="text-2xl font-semibold text-gray-800 mb-2">
          Page Not Found
        </h3>
        <p className="text-gray-600 mb-6">
          The page you are looking for does not exist or has been
          moved.
        </p>
        <Link
          to="/"
          className="inline-block bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Go to Home Page
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
