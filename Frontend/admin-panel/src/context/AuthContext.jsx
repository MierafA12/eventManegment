import { createContext, useContext, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

const login = async (username, password) => {
  try {
    const { data } = await axios.post(
      "http://localhost/EthioEvents/Backend/public/login",
      { username, password },
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" }
      }
    );

    if (!data.success) {
      alert(data.message || "Invalid username or password");
      return null;
    }

    setUser({
      id: data.user.id,
      username: data.user.username,
      role: data.user.role,
      jwt: data.jwt
    });

    return data.user.role;
  } catch (error) {
    console.log("AXIOS LOGIN ERROR:", error);
    alert("Server error");
    return null;
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
