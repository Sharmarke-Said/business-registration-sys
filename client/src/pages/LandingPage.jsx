import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Features from "../components/Features";
import businessImage from "../assets/business-reg.jpg";

const LandingPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-white py-16">
          <div className="container mx-auto flex flex-col lg:flex-row items-center px-6">
            <div className="lg:w-1/2 text-center lg:text-left mb-10 lg:mb-0">
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-4">
                Register your business in minutes
              </h1>
              <p className="text-lg text-gray-600 mb-8 max-w-xl">
                Start your business journey today with our simple and
                efficient registration process. Get all the legal
                requirements sorted in one place.
              </p>
              <Link
                to="/signup"
                className="inline-block bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:bg-blue-700 transition duration-300"
              >
                Get Started
              </Link>
            </div>
            <div className="lg:w-1/2">
              <img
                src={businessImage}
                alt="Business team working"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <Features />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
