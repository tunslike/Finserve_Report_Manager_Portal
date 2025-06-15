import subscriberApi from "../api/SubscriberServiceApi";


// login subscriber
export const loginSubscriber = async (data) => {
    const response = await subscriberApi.post('/report-manager/subscribers/authenticate', data);
    return response.data;
  };
