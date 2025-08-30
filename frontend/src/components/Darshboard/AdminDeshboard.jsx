import React, { useContext, useEffect, useState } from "react";
import Header from "../other/Header";
import CreateTask from "../Other/CreateTask";
import AllTask from "../Other/AllTask";
import UserProfile from "../../pages/UserProfile";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

const AdminDeshboard = (props) => {
  const { userData, setUserData } = useContext(AuthContext);
  const [employees, setEmployees] = useState([]);
  const [toggle, setToggle] = useState(true);
  const [elem,setElem] =useState(null)

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
         setUserData(prev => ({
        ...prev,
        employees: res.data.data,  
      }));

      console.log(res.data.data); 
      } catch (err) {
        console.error("Failed to fetch employees:", err);
      }
    };

    fetchEmployees();
  }, []);
  
  return (
    <div className="w-full h-screen p-10">
      <Header changeUser={props.changeUser} />
      <CreateTask />
      {toggle ? <AllTask employees={userData?.employees || []} setToggle={setToggle} setElem ={setElem}/> : <UserProfile employees={userData?.employee|| [] } setToggle={setToggle}  setElem={setElem}/>}
    </div>
  );
};

export default AdminDeshboard;
