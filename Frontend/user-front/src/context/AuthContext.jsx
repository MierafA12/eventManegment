import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [jwt, setJwt] = useState(null);
  const [loading, setLoading] = useState(true);

  // Restore session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        if (parsedUser.jwt) setJwt(parsedUser.jwt);
      } catch (e) {
        console.error("Failed to parse stored user", e);
        localStorage.removeItem("user");
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const { data: loginData } = await axios.post(
        "http://localhost/EthioEvents/Backend/public/login",
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      if (!loginData.success) return loginData;

      setJwt(loginData.jwt);

      const { data: profileData } = await axios.get(
        "http://localhost/EthioEvents/Backend/public/profile",
        {
          headers: { Authorization: `Bearer ${loginData.jwt}` },
        }
      );

      if (!profileData.success) {
        return { success: false, message: "Profile fetch failed" };
      }

      const userData = { ...profileData.profile, jwt: loginData.jwt };
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));

      return { success: true, user: profileData.profile, jwt: loginData.jwt };
    } catch (err) {
      if (err.response && err.response.data) return err.response.data;
      return { success: false, message: "Server error" };
    }
  };

  const logout = () => {
    setUser(null);
    setJwt(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        jwt,
        login,
        logout,
        setUser,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
