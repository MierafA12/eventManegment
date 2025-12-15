import { createContext, useContext, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

const login = async (email, password) => {
  try {
    const { data } = await axios.post(
      "http://localhost/EthioEvents/Backend/public/login",
      { email, password },
      {
        headers: { "Content-Type": "application/json" }
      }
    );

    // success response (200)
    if (!data.success) {
      return data;
    }

    setUser({
      id: data.user.id,
      email: data.user.email,
      role: data.user.role,
      status: data.user.status,
      jwt: data.jwt
    });

    return data;

  } catch (error) {
    // ✅ IMPORTANT PART
    if (error.response && error.response.data) {
      // 401, 403, 400 messages from backend
      return error.response.data;
    }

    // network / server down
    return {
      success: false,
      message: "Server error. Please try again later."
    };
  }
};


  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
