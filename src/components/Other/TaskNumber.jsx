import React from "react";

const TaskNumber = () => {
  return (
    <div className="flex mt-10 justify-around gap-5 screen">
      <div className="py-6 px-9 w-[45%] rounded-xl  bg-red-300">
        <h2 className="text-3xl font-semibold">0</h2>
        <h3 className="text-xl font-medium">New Task</h3>
      </div>
      <div className="py-6 px-9 w-[45%] rounded-xl  bg-blue-300">
        <h2 className="text-3xl font-semibold">0</h2>
        <h3 className="text-xl font-medium">New Task</h3>
      </div>
      <div className="py-6 px-9 w-[45%] rounded-xl  bg-green-300">
        <h2 className="text-3xl font-semibold">0</h2>
        <h3 className="text-xl font-medium">New Task</h3>
      </div>
      <div className="py-6 px-9 w-[45%] rounded-xl  bg-yellow-300">
        <h2 className="text-3xl font-semibold">0</h2>
        <h3 className="text-xl font-medium">New Task</h3>
      </div>
    </div>
  );
};

export default TaskNumber;
