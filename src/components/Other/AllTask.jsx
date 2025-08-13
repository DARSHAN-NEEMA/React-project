import React, { useContext } from "react";
import { AuthProvider } from "../../context/AuthContext";

const AllTask = () => {
  const authData = useContext(AuthProvider);
  return (
    <div className="bg-[#1c1c1c] p-5  ">
      <div className="bg-gray-800 mb-2  py-2 px-4 justify-between rounded border-[1px] border-separate  flex">
        <h2 className="w-1/5 text-white">Employee Name</h2>
        <h3 className="w-1/5 text-white">New Task </h3>
        <h5 className="w-1/5 text-white">Active </h5>
        <h5 className="w-1/5 text-white">Completed</h5>
        <h5 className="w-1/5 text-white">Failed </h5>
      </div>
      <div className=" ">
        {authData.employees.map((elem, idx) => {
          return (
            <div className="bg-gray-800 mb-2  py-2 px-4 justify-between border-[1px] border-separate rounded flex">
              <h3 key={idx} className="w-1/5 text-blue-400">
                {elem.taskStats.newTask}
              </h3>
              <h3 key={idx} className="w-1/5 text-white">
                {elem.name}
              </h3>
              <h5 key={idx} className="w-1/5 text-yellow-300">
                {elem.taskStats.active}
              </h5>
              <h5 key={idx} className="w-1/5 text-green-600">
                {elem.taskStats.completed}
              </h5>
              <h5 key={idx} className="w-1/5 text-red-600">
                {elem.taskStats.failed}{" "}
              </h5>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AllTask;
