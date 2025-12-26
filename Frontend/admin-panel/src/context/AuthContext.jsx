import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // 🔹 important

  // 🔹 Verify auth on app load
  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      setLoading(false);
      return;
    }

    const parsedUser = JSON.parse(storedUser);

    // 🔹 Verify token with backend
    axios
      .get("http://localhost/EthioEvents/Backend/public/me", {
        headers: {
          Authorization: `Bearer ${parsedUser.jwt}`,
        },
        withCredentials: true,
      })
      .then(() => {
        setUser(parsedUser); // token valid
      })
      .catch(() => {
        // ❌ invalid or expired token
        localStorage.removeItem("user");
        setUser(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const login = async (email, password) => {
    try {
      const { data } = await axios.post(
        "http://localhost/EthioEvents/Backend/public/login",
        { email, password },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!data.success) {
        alert(data.message || "Invalid email or password");
        return null;
      }

      const userData = {
        id: data.user.id,
        email: data.user.email,
        role: data.user.role,
        name: data.user.full_name || data.user.username,
        jwt: data.jwt,
      };

      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));

      return data.user.role;
    } catch (error) {
      console.log("LOGIN ERROR:", error);
      alert("Server error");
      return null;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
