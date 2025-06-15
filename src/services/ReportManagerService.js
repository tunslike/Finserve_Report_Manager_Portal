import reportManagerApi from "../api/ReportManagerApi";

// login subscriber
export const loadDashboardSummary = async (data) => {
    const response = await reportManagerApi.get('/report-manager/dashboardData');
    return response.data;
  };