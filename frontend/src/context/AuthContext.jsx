import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMe = async () => {
      const token = localStorage.getItem("token");
      const role = localStorage.getItem("role");

      if (!token || !role) {
        setLoading(false);
        return;
      }

      try {
        const url =
          role === "admin"
            ? "http://localhost:5000/api/v1/admin/me"
            : "http://localhost:5000/api/v1/employee/me";

        const res = await axios.get(url, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data.success) {
          const user =
            role === "admin"
              ? res.data.admin || res.data.data
              : res.data.employee || res.data.data;

          if (user) {
            setUserData({ ...user, role });
          } else {
            console.error("Unexpected API response:", res.data);
          }
        }
      } catch (err) {
        console.error("Error fetching user:", err.response?.data || err.message);
        setUserData(null);
        localStorage.removeItem("token");
        localStorage.removeItem("role");
      } finally {
        setLoading(false);
      }
    };

    fetchMe();
  }, []);

  return (
    <AuthContext.Provider value={{ userData, setUserData, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
