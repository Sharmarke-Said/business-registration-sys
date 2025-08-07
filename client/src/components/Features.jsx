import {
  FaEdit,
  FaClock,
  FaShieldAlt,
  FaUserTie,
} from "react-icons/fa";

const featuresData = [
  {
    icon: <FaEdit size={24} />,
    title: "Easy Registration",
    description:
      "Complete your business registration in a few simple steps.",
  },
  {
    icon: <FaClock size={24} />,
    title: "Quick Process",
    description: "Get your registration processed within 24 hours.",
  },
  {
    icon: <FaShieldAlt size={24} />,
    title: "Secure Platform",
    description:
      "Your data is protected with enterprise-grade security.",
  },
  {
    icon: <FaUserTie size={24} />,
    title: "Expert Support",
    description:
      "Get help from our team of business registration experts.",
  },
];

const Features = () => {
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Why Choose BusinessReg?
        </h2>
        <p className="text-gray-600 mb-12">
          We make business registration simple, fast, and hassle-free.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuresData.map((feature, index) => (
            <div
              key={index}
              className="p-6 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition duration-300"
            >
              <div className="flex justify-center items-center text-blue-600 mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-500">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
