import subscriberApi from "../api/SubscriberServiceApi";


// logout subscriber
export const logoutSubscriberBackend = async () => {
  const response = await subscriberApi.post('/report-manager/subscribers/logout-subscriber');
  return response.data;
}
// end of function

// reset subscriber password
export const resetPassword = async (username) => {
  const response = await subscriberApi.get(`/report-manager/subscribers/reset-password?username=${username}`)
  return response.data;
}
// end of function

// change login subscriber
export const changePasswordSubscriber = async (data) => {
  const response = await subscriberApi.post('/report-manager/subscribers/change-password', data);
  return response.data;
};

// login subscriber
export const loginSubscriber = async (data) => {
    const response = await subscriberApi.post('/report-manager/subscribers/authenticate', data);
    return response.data;
  };

// function to fetch all subscribers
export const fetchSubscribers = async () => {
  const response = await subscriberApi.get('/report-manager/subscribers/fetch-subscribers');
  return response.data;
};

// function to create new subscriber
export const createNewSubscriber = async (data) => {
  const response = await subscriberApi.post('/report-manager/subscribers/new-subscriber', data);
  return response.data;
}
// end of function

// function to update and manager subscriber profile
export const updateSubscriberProfile = async (data) => {
  const response = await subscriberApi.post('/report-manager/subscribers/update-subscriber-profile', data);
  return response.data;
}
// end of function