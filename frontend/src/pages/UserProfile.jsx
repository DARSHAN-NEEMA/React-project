import React, { useEffect, useState } from "react";
import { RiArrowLeftDoubleFill } from "@remixicon/react";
import axios from "axios";

const UserProfile = ({ elem, setToggle, setElem }) => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log("Fetching tasks for employee ID:", elem);

  useEffect(() => {
    if (!elem) return; 

    const fetchEmployees = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/v1/admin/employees/${elem}/tasks`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            withCredentials: true,
          }
        );

        setEmployees(res.data.data || []);
        console.log("UserProfile employees:", res.data.data);
      } catch (err) {
        console.error("Failed to fetch employees in UserProfile:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, [elem]); 

  if (loading) {
    return <div className="text-white text-center mt-10">Loading...</div>;
  }

  if (!employees || employees.length === 0) {
    return <div className="text-white text-center mt-10">No data available</div>;
  }

  const headerStyle = "text-left px-3 py-2 border-b border-gray-600";
  const cellStyle = "px-3 py-2 border-b border-gray-700 text-left";

  return (
    <div className="bg-[#1c1c1c] p-5 rounded">
      <div className="grid grid-cols-6 gap-2 bg-gray-800 rounded mb-2">
        <div className={headerStyle}>Employee Name</div>
        <div className={headerStyle}>Email</div>
        <div className={headerStyle}>New Task</div>
        <div className={headerStyle}>Active</div>
        <div className={headerStyle}>Completed</div>
        <div className={headerStyle}></div>
      </div>

      {employees.map((emp) => (
        <div
          key={emp._id}
          className="grid grid-cols-6 gap-2 bg-gray-800 rounded mb-2 items-center"
        >
          <div className={cellStyle}>{emp.name}</div>
          <div className={cellStyle}>{emp.email}</div>
          <div className={`${cellStyle} text-blue-400`}>{emp.newTask}</div>
          <div className={`${cellStyle} text-yellow-300`}>{emp.active}</div>
          <div className={`${cellStyle} text-green-600`}>{emp.completed}</div>
          <div className={cellStyle}>
            <button
              onClick={() => {
                setToggle(true); // go back to AllTask
              }}
            >
              <RiArrowLeftDoubleFill color="white" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserProfile;
