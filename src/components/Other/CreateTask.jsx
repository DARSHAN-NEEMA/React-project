import React, { useState } from "react";

const CreateTask = () => {
  const [TaskTitle, setTaskTitle] = useState("");
  const [description, setDescription] = useState("");
  const [taskDate, setTaskDate] = useState("");
  const [assinTo, setAssignTo] = useState("");
  const [category, setCategory] = useState("");
  const [task,setTask]=useState([])

  const submitHandleter = (e) => {
    e.preventDefault();
    setAssignTo("");
    setTaskDate("");
    setDescription("");
    setCategory("");
    setTaskTitle("");
    setTask([])
  };

  return (
    <div>
      <div className="p-5 bg-[#1c1c1c] mt-7 rounded">
        <form
          onSubmit={(e) => {
            submitHandleter(e);
          }}
          className=" flex w-full  items-start justify-between "
        >
          <div className="w-1/2">
            <div>
              <h3 className="text-sm text-gray-300 mb-0.5">Task tile</h3>
              <input
                value={TaskTitle}
                onChange={(e) => {
                  setTaskTitle(e.target.value);
                }}
                className="text-sm py-1 px-2 w-4/5 rounded outline-none bg-transparent border-gray-400 border-[1px]"
                type="text"
                placeholder="Task Title"
              />
            </div>
            <div>
              <h3 className="text-sm text-gray-300 mb-0.5">Date</h3>
              <input
                value={taskDate}
                onChange={(e) => {
                  setTaskDate(e.target.valueAsDate);
                }}
                className="text-sm py-1 px-2 w-4/5 rounded outline-none bg-transparent border-gray-400 border-[1px]"
                type="date"
                placeholder="Date"
              />
            </div>
            <div>
              <h3 className="text-sm text-gray-300 mb-0.5">Assign To</h3>
              <input
                value={assinTo}
                onChange={(e) => {
                  setAssignTo(e.target.value);
                }}
                className="text-sm py-1 px-2 w-4/5 rounded outline-none bg-transparent border-gray-400 border-[1px]"
                type="text"
                placeholder="Name of Employee name"
              />
            </div>
            <div>
              <h3 className="text-sm text-gray-300 mb-0.5">category</h3>
              <input
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
                className="text-sm py-1 px-2 w-4/5 rounded outline-none bg-transparent border-gray-400 border-[1px]"
                type="text"
                placeholder="dev, design, etc"
              />
            </div>
          </div>

          <div className="w-1/2">
            <h3 className="text-sm text-gray-300 mb-0.5">Description</h3>
            <textarea
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              className="w-full h-44 text-sm py-2 px-2 rounded outline-none bg-transparent border-[1px] border-gray-400"
              name=""
              id=""
            ></textarea>
            <button
              className="bg-emerald-500 hover:bg-emerald-600 px-5 rounded text-sm mt-4 w-full h-10"
              type="submit"
            >
              Create Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTask;
