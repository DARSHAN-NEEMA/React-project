import React, { useContext, useEffect } from "react";
import Login from "./components/Auth/Login";
import EmployeeDashboard from "./components/Darshboard/EmployeeDashboard";
import AdminDeshboard from "./components/Darshboard/AdminDeshboard";
import { AuthContext } from "./context/AuthContext";
import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const { userData, setUserData } = useContext(AuthContext);

  
  useEffect(() => {
    const savedUser = localStorage.getItem("userData");
    if (savedUser) {
      setUserData(JSON.parse(savedUser));
    }
  }, [setUserData]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userData"); // ✅ clear saved user
    setUserData(null);
  };

  return (
    <>
      {!userData ? (
        <Login setUserData={setUserData} />
      ) : userData.role === "admin" ? (
        <AdminDeshboard changeUser={handleLogout} />
      ) : (
        <EmployeeDashboard changeUser={handleLogout} data={userData} />
      )}

      <ToastContainer
        position="top-right"
        autoClose={2000}
        theme="dark"
        transition={Bounce}
      />
    </>
  );
};

export default App;
