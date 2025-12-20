import { createContext, useContext, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [jwt, setJwt] = useState(null);

  const login = async (email, password) => {
    try {
      // 1️⃣ login request
      const { data: loginData } = await axios.post(
        "http://localhost/EthioEvents/Backend/public/login",
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      if (!loginData.success) return loginData;

      setJwt(loginData.jwt);

      // 2️⃣ fetch profile
      const { data: profileData } = await axios.get(
        "http://localhost/EthioEvents/Backend/public/profile",
        {
          headers: { Authorization: `Bearer ${loginData.jwt}` },
        }
      );

      if (!profileData.success) {
        return { success: false, message: "Profile fetch failed" };
      }

      setUser({ ...profileData.profile, jwt: loginData.jwt });

      return { success: true, user: profileData.profile, jwt: loginData.jwt };
    } catch (err) {
      if (err.response && err.response.data) return err.response.data;
      return { success: false, message: "Server error" };
    }
  };

  const logout = () => {
    setUser(null);
    setJwt(null);
  };

  return (
    <AuthContext.Provider value={{ user, jwt, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
