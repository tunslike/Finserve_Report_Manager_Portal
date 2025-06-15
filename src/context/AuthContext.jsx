import { createContext, useContext, useState, useEffect } from "react";
import { loginSubscriber } from "../services/SubscriberService";
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
    
            // update store
            dispatch(updateSubscriberData(response));
    
            const authToken = response.token;
            const refreshToken = response.refreshToken;

            localStorage.setItem("token", authToken);
            localStorage.setItem('pass', refreshToken);
    
            setSubscriberId(response.subscriberId);
    
            setToken(authToken);
    
            setUser(response);
    
            return true;
    
        } catch (error) {
          console.error("Login failed", error);
          return false;
        }
    }


    // return function
    return (
        <AuthContext.Provider value={{login, user, subscriberId}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);