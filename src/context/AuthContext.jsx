import { createContext, useContext, useState, useEffect } from "react";
import { loginSubscriber, logoutSubscriberBackend, resetPassword, changePasswordSubscriber } from "../services/SubscriberService";
import { useDispatch } from "react-redux";
import { updateSubscriberData, logoutSubscriber } from "../store/subscriberSlice";
import { persistor } from "../store/store";

const AuthContext = createContext();

// auth provider function
export const AuthProvider = ({ children }) => {

    const dispatch = useDispatch();
    const [user, setUser] = useState(localStorage.getItem("token") || null);
    const [token, setToken] = useState(localStorage.getItem("token") || null);
    const [subscriberId, setSubscriberId] = useState('');

    // login function
    const login = async (credentials) => {

        try {
    
            // Call subscriber Service
            const response = await loginSubscriber(credentials);

            if(response.changePwd == 0 && response.token != '') {

                   // update store
                    dispatch(updateSubscriberData(response));
            
                    const authToken = response.token;
                    const refreshToken = response.refreshToken;

                    localStorage.setItem("token", authToken);
                    localStorage.setItem('pass', refreshToken);
            
                    setSubscriberId(response.subscriberId);
            
                    setToken(authToken);
            
                    setUser(response);
            
                    return 1;

            }else if(response.changePwd == 1 && response.token == '') {

                    // store local storage
                    localStorage.setItem("subscriberId", response.subscriberId)
                    setSubscriberId(response.subscriberId);

                    // return
                    return 2;

            }else{
                return 3;
            }
    
        
        } catch (error) {

          console.error("Login failed", error);
          return 3;
        }
    } // end of function

    // function to change password
    const changeSubscriberAccountPwd = async (values) => {

        try {

            const subscriberId = localStorage.getItem("subscriberId");

            const data = {
                subscriberId: subscriberId,
                newPassword: values.accessCode
            }

            const response = await changePasswordSubscriber(data);

            if(response == 'Password has been changed successfully!') {
                return true;
            }else{
                return false;
            }

        }catch(e) {
            console.error(e)
            return false;
        }
    }
    // end of function

    // RESET PASSWORD
    const resetSubscriberPassword = async (username) => {

        try {
    
            // Call subscriber Service
            const response = await resetPassword(username)  

            if(response.responseCode == 200) {
                return true;
            }else {
                return false;
            }

    
        } catch (error) {
          console.error("Reset password failed", error);
          return false;
        }
    } // end of function

      // LOGOUT FUNCTION
  const logout = async () => {

    try {

      //logout function 
      const response = await logoutSubscriberBackend();

      dispatch(logoutSubscriber());
      persistor.purge();
   
      // local storage
      localStorage.removeItem("token");
      localStorage.removeItem("pass");

      setToken(null);
      setUser(null);

      delete axios.defaults.headers.common["Authorization"];

    }catch(error) {
      console.error('Unable to logout subcriber: ', error);
    }

  };


    // return function
    return (
        <AuthContext.Provider value={{login, user, subscriberId, logout, resetSubscriberPassword, changeSubscriberAccountPwd}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);