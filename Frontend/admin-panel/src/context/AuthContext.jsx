import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (username, password) => {
    /**
     * TODO: Replace with PHP API
     * const res = await fetch("http://localhost/api/login.php", {...})
     * const data = await res.json();
     * setUser(data)
     */

    // MOCK LOGIN FOR NOW
    if (username === "admin" && password === "123") {
      setUser({ username, role: "admin" });
      return "admin";
    } else if (username === "super" && password === "123") {
      setUser({ username, role: "superadmin" });
      return "superadmin";
    } else {
      setUser({ username, role: "user" });
      return "user";
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
