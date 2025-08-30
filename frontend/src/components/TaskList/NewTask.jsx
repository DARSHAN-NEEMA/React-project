import React, { useState } from "react";
import axios from "axios";

const NewTask = ({ data, employeeId, onUpdate }) => {
  const [loading, setLoading] = useState(false);

  const handleUpdateStatus = async (action) => {
    try {
      setLoading(true);
      const res = await axios.patch(
        `http://localhost:5000/api/v1/employee/${employeeId}/tasks/${data._id}/status`,
        { action },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: true,
        }
      );

      console.log("Updated Task:", res.data.data);
      console.log("Message:", res.data.message);

      // pass updated task to parent
      onUpdate(res.data.data);
    } catch (err) {
      console.error("Error updating status:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-shrink-0 h-full w-[300px] p-5 bg-blue-300 rounded-xl">
      <div className="flex justify-between items-center">
        <h3 className="bg-red-400 text-sm px-3 py-1 rounded">{data.category}</h3>
        <h4 className="text-sm">{data.taskDate}</h4>
      </div>

      <h2 className="mt-5 text-2xl font-semibold">{data.title}</h2>
      <p className="text-sm mt-2">{data.description}</p>

      <div className="flex flex-col justify-between mt-4">
        {data.completed ? (
          <p className="text-green-600 font-semibold">✅ Completed</p>
        ) : data.failed ? (
          <p className="text-red-600 font-semibold">❌ Failed</p>
        ) : (
          <>
            <button
              className="bg-green-500 py-1 px-2 text-sm rounded-xl w-full mb-1 disabled:opacity-50"
              disabled={loading}
              onClick={() => handleUpdateStatus("complete")}
            >
              {loading ? "Updating..." : "Mark as Complete"}
            </button>

            <button
              className="bg-red-500 py-1 px-2 text-sm rounded-xl w-full disabled:opacity-50"
              disabled={loading}
              onClick={() => handleUpdateStatus("fail")}
            >
              {loading ? "Updating..." : "Mark as Failed"}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default NewTask;
