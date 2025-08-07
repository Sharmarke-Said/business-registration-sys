import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaArrowLeft } from "react-icons/fa";
import { toast } from "react-toastify";
import { utils, writeFile } from "xlsx";
import axios from "axios";
import { useState, useEffect } from "react";
import BusinessTable from "../../components/admin/BusinessTable";
import UserTable from "../../components/admin/UserTable";
import BusinessTypeTable from "../../components/admin/BusinessTypeTable";

// Configure a custom axios instance to handle credentials (cookies)
const api = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  withCredentials: true,
});

const ReportsPage = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [reportType, setReportType] = useState("businesses");
  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [businessStatus, setBusinessStatus] = useState("approved");

  const fetchReportData = async () => {
    setLoading(true);
    setReportData([]);
    try {
      let endpoint;
      let response;
      if (reportType === "users") {
        endpoint = "/reports/users";
        response = await api.get(endpoint);
        setReportData(response.data.data.users);
      } else if (reportType === "businesses") {
        endpoint = `/reports/businesses?status=${businessStatus}`;
        response = await api.get(endpoint);
        setReportData(response.data.data.businesses);
      } else if (reportType === "business-types") {
        endpoint = "/reports/business-types";
        response = await api.get(endpoint);
        setReportData(response.data.data.businessTypes);
      }
    } catch (err) {
      toast.error("Failed to fetch report data. Please try again.");
      console.error("Error fetching report data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReportData();
  }, [reportType, businessStatus]);

  const handleDownload = () => {
    if (reportData.length === 0) {
      toast.warn("No data available to download.");
      return;
    }

    const reportName =
      reportType === "businesses"
        ? `${businessStatus}-businesses-report`
        : `${reportType}-report`;

    try {
      const worksheet = utils.json_to_sheet(reportData);
      const workbook = utils.book_new();
      utils.book_append_sheet(workbook, worksheet, "Report");
      writeFile(workbook, `${reportName}.xlsx`);
      toast.success("Report downloaded successfully!");
    } catch (err) {
      toast.error("Failed to download report. Please try again.");
      console.error("Error downloading report:", err);
    }
  };

  const handlePrint = () => {
    if (reportData.length === 0) {
      toast.warn("No data available to print.");
      return;
    }
    window.print();
  };

  const handleBack = () => {
    navigate(-1);
  };

  if (!user || user.role !== "admin") {
    navigate("/login");
    return null;
  }

  const renderTable = () => {
    if (loading) {
      return <div className="text-center py-8">Loading data...</div>;
    }
    if (reportData.length === 0) {
      return (
        <div className="text-center py-8">
          No data found for this report.
        </div>
      );
    }

    if (reportType === "users") {
      return <UserTable users={reportData} />;
    }
    if (reportType === "businesses") {
      return <BusinessTable businesses={reportData} />;
    }
    if (reportType === "business-types") {
      return <BusinessTypeTable businessTypes={reportData} />;
    }
    return null;
  };

  return (
    <>
      <div className="print-hide">
        <div className="flex items-center mb-6">
          <button
            onClick={handleBack}
            className="flex items-center text-blue-600 hover:underline"
          >
            <FaArrowLeft className="mr-2" /> Back
          </button>
          <h1 className="text-2xl font-bold ml-4 text-gray-800">
            Reports Dashboard
          </h1>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md flex flex-col space-y-4">
        <div className="print-hide">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
            <div className="flex flex-wrap sm:flex-nowrap space-x-0 sm:space-x-2 border-b-2 border-gray-200">
              <button
                onClick={() => setReportType("businesses")}
                className={`py-2 px-4 font-medium transition-colors w-full sm:w-auto text-center ${
                  reportType === "businesses"
                    ? "border-b-2 border-blue-600 text-blue-600"
                    : "text-gray-500 hover:text-blue-600"
                }`}
              >
                Businesses
              </button>
              <button
                onClick={() => setReportType("users")}
                className={`py-2 px-4 font-medium transition-colors w-full sm:w-auto text-center ${
                  reportType === "users"
                    ? "border-b-2 border-blue-600 text-blue-600"
                    : "text-gray-500 hover:text-blue-600"
                }`}
              >
                Users
              </button>
              <button
                onClick={() => setReportType("business-types")}
                className={`py-2 px-4 font-medium transition-colors w-full sm:w-auto text-center ${
                  reportType === "business-types"
                    ? "border-b-2 border-blue-600 text-blue-600"
                    : "text-gray-500 hover:text-blue-600"
                }`}
              >
                Business Types
              </button>
            </div>
            {reportType === "businesses" && (
              <div className="mt-4 md:mt-0 w-full sm:w-auto">
                <label htmlFor="business-status" className="sr-only">
                  Business Status
                </label>
                <select
                  id="business-status"
                  value={businessStatus}
                  onChange={(e) => setBusinessStatus(e.target.value)}
                  className="p-2 border rounded-md w-full"
                >
                  <option value="approved">Approved</option>
                  <option value="pending">Pending</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
            )}
          </div>
        </div>

        <div
          id="report-table-container"
          className="overflow-x-auto bg-gray-50 p-4 rounded-lg"
        >
          {renderTable()}
        </div>

        <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4 mt-4 print-hide">
          <button
            onClick={handleDownload}
            className="bg-green-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-600 transition-colors"
          >
            Download
          </button>
          <button
            onClick={handlePrint}
            className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Print
          </button>
        </div>
      </div>
    </>
  );
};

export default ReportsPage;
