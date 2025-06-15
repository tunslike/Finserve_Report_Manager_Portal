import axios from 'axios';


const subscriberApi = axios.create({
  baseURL: 'http://localhost:9193/api/v1',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
    Pragma: 'no-cache',
  },

});

// Add token to requests if available
subscriberApi.interceptors.request.use((config) => {

  const token = localStorage.getItem('token');

  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
},(error) => Promise.reject(error));


// Response Interceptor: auto-refresh or redirect
subscriberApi.interceptors.response.use(

  response => response,
  error => {

    if(error.response && (error.response.status === 401 || error.response.status === 403)) {
   
      // local storage
      localStorage.removeItem("token");
      localStorage.removeItem("pass");

      localStorage.setItem('is_expired', 1);

      store.dispatch(logoutSubscriber());

      delete axios.defaults.headers.common["Authorization"];

      window.location.href = '/login';  // Redirect to login
    }

    return Promise.reject(error);
  }
);

export default subscriberApi;
