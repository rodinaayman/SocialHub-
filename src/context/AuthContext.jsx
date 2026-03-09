import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { getUserData } from "../Service/Proflie.service";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {

  const [userToken, setUserToken] = useState(localStorage.getItem('user_token'));
  const [userId, setUserId] = useState(null);
  const [userData, setUserData] = useState(null); 

  function saveUserToken(token) {
    setUserToken(token);
    localStorage.setItem('user_token', token);
  }

  function removeUserToken() {
    setUserToken(null);
    setUserId(null);
    setUserData(null);
    localStorage.removeItem('user_token');
  }

useEffect(() => {
  if (userToken) {
    try {
      const decoded = jwtDecode(userToken);
      setUserId(decoded?.user || null);

      const loadUserData = async () => {
        const data = await getUserData(); 
        if (data) setUserData(data);
      };

      loadUserData();

    } catch (error) {
      console.error("Invalid Token", error);
      removeUserToken();
    }
  }
}, [userToken]);
  return (
    <AuthContext.Provider value={{ userToken, userId, userData, saveUserToken, removeUserToken }}>
      {children}
    </AuthContext.Provider>
  );
}