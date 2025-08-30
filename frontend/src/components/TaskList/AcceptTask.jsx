import React from "react";
import axios from "axios";

const AcceptTask = ({ data, employeeId }) => {
  console.log("taskId", data._id);
  console.log("employeeId", employeeId);

  const handleUpdateStatus = async (action) => {
    try {
      const res = await axios.patch(
        `http://localhost:5000/api/v1/employee/${employeeId}/tasks/${data._id}/status`,
        { action }, // must be "accept", "complete", or "fail"
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: true,
        }
      );
      console.log("Task updated:", res.data);
    } catch (err) {
      console.error("Error updating task status:", err);
    }
  };

  return (
    <div className="flex-shrink-0 h-full w-[300px] p-5 bg-red-300 rounded-xl">
      <div className="flex justify-between items-center">
        <h3 className="bg-red-400 text-sm px-3 py-1 rounded">{data.category}</h3>
        <h4 className="text-sm">{data.taskDate || data.date}</h4>
      </div>

      <h2 className="mt-5 text-2xl font-semibold">
        {data.title || data.TaskTitle}
      </h2>
      <p className="text-sm mt-2">{data.description}</p>

      <div className="mt-4 flex justify-between relative bottom-0">
        <button
          className="bg-green-500 py-1 px-2 text-sm rounded-xl w-full"
          onClick={() => handleUpdateStatus("accept")}
        >
          Accept Task
        </button>
      </div>
    </div>
  );
};

export default AcceptTask;
