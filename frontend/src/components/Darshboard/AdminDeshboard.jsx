import React, { useContext, useEffect, useState } from "react";
import Header from "../other/Header";
import CreateTask from "../Other/CreateTask";
import AllTask from "../Other/AllTask";
import UserProfile from "../../pages/UserProfile";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

const AdminDashboard = (props) => {
  const { userData, setUserData } = useContext(AuthContext);
  const [employees, setEmployees] = useState([]);
  const [toggle, setToggle] = useState(true); // true = AllTask, false = UserProfile
  const [elem, setElem] = useState(null);     // selected employee ID
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/v1/admin/employees/tasks/status",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            withCredentials: true,
          }
        );

        setUserData((prev) => ({
          ...prev,
          employees: res.data.data,
        }));

        console.log("Employees fetched:", res.data.data);
      } catch (err) {
        console.error("Failed to fetch employees:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, [setUserData]);

  if (loading) {
    return <div className="text-white text-center mt-20">Loading employees...</div>;
  }

  // Always use the employees from context if available
  const employeesArray = userData?.employees || [];

  return (
    <div className="w-full h-screen p-10">
      <Header changeUser={props.changeUser} />
      <CreateTask />

      {toggle ? (
        <AllTask
          employees={employeesArray}
          setToggle={setToggle}
          setElem={setElem}
        />
      ) : (
        <UserProfile
          elem={elem}         
          setToggle={setToggle} 
          setElem={setElem}   
        />
      )}
    </div>
  );
};

export default AdminDashboard;
