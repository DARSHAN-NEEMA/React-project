import React, { useContext, useEffect, useState } from "react";
import Login from "./components/Auth/Login";
import EmployeeDashboard from "./components/Darshboard/EmployeeDashboard";
import AdminDeshboard from "./components/Darshboard/AdminDeshboard";
import { getLocalStorage, setLocalStorage } from "./utils/localStorage";
import { AuthProvider } from "./context/AuthContext";

const App = () => {
  const [user, setUser] = useState(null);
  const [logInUser, setLogInUser] = useState(null);

  const authData = useContext(AuthProvider);

  useEffect(() => {
    try {
      const logInUser = localStorage.getItem("logInUser");
      if (logInUser) {
        const userData = JSON.parse(logInUser);
        setUser(userData.role);
        setLogInUser(userData.data);
      }
    } catch (e) {
      console.log(e);
    }
  }, []);

  const handleLogin = (email, password) => {
    if (email == "admin@me.com" && password == "123") {
      setUser("admin");
      localStorage.setItem("logInUser", JSON.stringify({ role: "admin" }));
    } else if (authData) {
      const emp = authData.employees.find(
        (e) => email == e.email && e.password == password
      );
      if (emp) {
        setUser("employee");
        setLogInUser(emp);
        localStorage.setItem(
          "logInUser",
          JSON.stringify({ role: "employee", data: emp })
        );
      }
    } else {
      alert("Invalid credentials");
    }
  };

  // handleLogin("admin@me.com",123);
  return (
    <>
      {!user ? <Login handleLogin={handleLogin} /> : ""}
      {user == "admin" ? (
        <AdminDeshboard />
      ) : user == "employee" ? (
        <EmployeeDashboard data={logInUser} />
      ) : null}
      {/* <EmployeeDashboard/> */}
      {/* <AdminDeshboard/> */}
    </>
  );
};

export default App;
