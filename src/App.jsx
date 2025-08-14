import React, { useContext, useEffect, useState } from "react";
import Login from "./components/Auth/Login";
import EmployeeDashboard from "./components/Darshboard/EmployeeDashboard";
import AdminDeshboard from "./components/Darshboard/AdminDeshboard";
import { getLocalStorage, setLocalStorage } from "./utils/localStorage";
import { AuthProvider } from "./context/AuthContext";
import { Bounce, toast, ToastContainer } from "react-toastify";

const App = () => {
  const [user, setUser] = useState(null);
  const [logInUser, setLogInUser] = useState(null);

  const [userData, setUserData] = useContext(AuthProvider);

  useEffect(() => {
    try {
      const logInUser = localStorage.getItem("logInUser");
      if (logInUser) {
        const userDatas = JSON.parse(logInUser);
        setUser(userDatas.role);
        setLogInUser(userDatas.data);
      }
    } catch (e) {
      console.log(e);
    }
  }, []);
  const handleLogin = (email, password) => {
    if (email == "admin@me.com" && password == "123") {
      setUser("admin");
      localStorage.setItem("logInUser", JSON.stringify({ role: "admin" }));
    } else if (userData && Array.isArray(userData.employees)) {
      const emp = userData.employees.find(
        (e) => email == e.email && e.password == password
      );
      if (emp) {
        setUser("employee");
        setLogInUser(emp);
        localStorage.setItem(
          "logInUser",
          JSON.stringify({ role: "employee", data: emp })
        );
      } else {
        try{

          toast.error("InValid Credentials", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
          });
        }catch(e){
          console.log(e)
        }
      }
    } else {
      alert("Invalid credentials");
    }
  };

  // const handleLogin = (email, password) => {
  //   if (email == "admin@me.com" && password == "123") {
  //     setUser("admin");
  //     localStorage.setItem("logInUser", JSON.stringify({ role: "admin" }));
  //   } else if (userData) {
  //     const emp = userData.find(
  //       (e) => email == e.email && e.password == password
  //     );
  //     if (emp) {
  //       setUser("employee");
  //       setLogInUser(emp);
  //       localStorage.setItem(
  //         "logInUser",
  //         JSON.stringify({ role: "employee", data: emp })
  //       );
  //     }
  //   } else {
  //     alert("Invalid credentials");
  //   }
  // };

  // handleLogin("admin@me.com",123);
  return (
    <>
      {!user ? <Login handleLogin={handleLogin} /> : ""}
      {user == "admin" ? (
        <AdminDeshboard changeUser={setUser} />
      ) : user == "employee" ? (
        <EmployeeDashboard changeUser={setUser} data={logInUser} />
      ) : null}
      <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
            transition={Bounce}
          />
      {/* <EmployeeDashboard/> */}
      {/* <AdminDeshboard/> */}
    </>
  );
};

export default App;
