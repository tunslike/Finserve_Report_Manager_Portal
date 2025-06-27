import reportManagerApi from "../api/ReportManagerApi";

// login subscriber
export const loadDashboardSummary = async (data) => {
    const response = await reportManagerApi.get('/report-manager/dashboardData');
    return response.data;
  };

  // create portfolio report with uploads
  export const createPortfolioReport = async (data, headers) => {
    const response = await reportManagerApi.post('/report-manager/upload', data, headers);
    return response.data;
  };

  // download portfolio report
  export const downloadPortfolioReport = async (reportGroupId) => {
    const response = await reportManagerApi.get(`/report-manager/download-portfolioReport?reportGroupId=${reportGroupId}`)
    return response.data;
  }

  // get portfolio list
  export const fetchAllPortfolioList = async () => {
    const response = await reportManagerApi.get('/report-manager/portfolioList')
    return response.data;
  }
  // end of function

  // get portfolio Report List
  export const loadPortfolioReportList = async () => {
    const response = await reportManagerApi.get('/report-manager/portfolioReportList')
    return response.data;
  }
  // end of function

  // fetch the list of notification setup
export const loadNotificationSetups = async () => {
  const response = await reportManagerApi.get('/report-manager/notification-setups')
  return response.data;
}
  // end of notification setup

  // fcreate new notification setup
export const createNewNotificationSetup = async (data) => {
  const response = await reportManagerApi.post('/report-manager/new-notification-setup', data)
  return response.data;
}
  // end of notification setup

  // function to update notification setup
export const updateNotificationSetup = async (data) => {
  const response = await reportManagerApi.post('/report-manager/update-notificationSetup', data)
  return response.data;
}
  // end of function

  // function to update notification setup status
export const updateNotificationSetupStatus = async (data) => {
  const response = await reportManagerApi.post('/report-manager/update-notificationSetup-status', data)
  return response.data;
}
  // end of function