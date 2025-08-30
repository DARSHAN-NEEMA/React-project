import React from "react";
import { RiArrowRightDoubleFill } from "@remixicon/react";

const AllTask = ({ employees , setToggle,setElem}) => {
  console.log(employees)

  if (!employees || employees.length === 0) {
    return <div className="text-white">No employee data available.</div>;
  }

  const headerStyle = "text-left px-3 py-2 border-b border-gray-600";
  const cellStyle = "px-3 py-2 border-b border-gray-700 text-left";

  return (
    <div className="bg-[#1c1c1c] p-5 rounded">
     
      <div className="grid grid-cols-6 gap-2 bg-gray-800 rounded mb-2">
        <div className={headerStyle}>Employee Name</div>
        <div className={headerStyle}>New Task</div>
        <div className={headerStyle}>Active</div>
        <div className={headerStyle}>Completed</div>
        <div className={headerStyle}>Failed</div>
        <div className={headerStyle}></div>
      </div>

      {employees.map((emp, idx) => (
        
        <div
          key={idx}
          className="grid grid-cols-6 gap-2 bg-gray-800 rounded mb-2 items-center"
        >
          <div className={cellStyle}>{emp.name}</div>
          <div className={`${cellStyle} text-blue-400`}>{emp.newTask}</div>
          <div className={`${cellStyle} text-yellow-300`}>{emp.active}</div>
          <div className={`${cellStyle} text-green-600`}>{emp.completed}</div>
          <div className={`${cellStyle} text-red-600`}>{emp.failed}</div>
          <div className={cellStyle}>
            <button onClick={()=>{
              setToggle(false);
              setElem(emp._id)
            }}>
              <RiArrowRightDoubleFill color="white" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllTask;
