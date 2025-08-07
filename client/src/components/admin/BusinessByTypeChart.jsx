// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";

// const BusinessByTypeChart = ({ data }) => {
//   return (
//     <div className="bg-white p-6 rounded-lg shadow">
//       <h3 className="text-lg font-semibold text-gray-800 mb-4">
//         Businesses by Type
//       </h3>
//       <ResponsiveContainer width="100%" height={256}>
//         <BarChart data={data}>
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="name" />
//           <YAxis />
//           <Tooltip />
//           <Legend />
//           <Bar
//             dataKey="count"
//             fill="#8884d8"
//             name="Number of Businesses"
//           />
//         </BarChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// export default BusinessByTypeChart;
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell, // Import Cell to color individual bars
} from "recharts";

const BusinessByTypeChart = ({ data }) => {
  // Define a color map for each business type
  const COLORS = {
    "Sole Proprietorship": "#1a73e8",
    LLC: "#34a853", // Green
    Corporation: "#fbbc05", // Orange
    Partnership: "#8e44ad", // Purple
    "Non-Profit Organization": "#ea4335", // Red
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Businesses by Type
      </h3>
      <ResponsiveContainer width="100%" height={256}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" name="Number of Businesses">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[entry.name]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BusinessByTypeChart;
