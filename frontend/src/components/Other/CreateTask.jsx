import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

const CreateTask = () => {
  const { userData } = useContext(AuthContext);

  const [TaskTitle, setTaskTitle] = useState("");
  const [description, setDescription] = useState("");
  const [taskDate, setTaskDate] = useState("");
  const [assignTo, setAssignTo] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("new");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [employees, setEmployees] = useState([]); 

  
 useEffect(() => {
  const fetchEmployees = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/v1/admin/employees/name", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });


      setEmployees(res.data.data); 
    } catch (err) {
      console.error("Error fetching employees:", err);
    }
  };

  fetchEmployees();
}, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const employee = employees.find(
        (emp) => emp.name.toLowerCase() === assignTo.toLowerCase()
      );

      if (!employee) {
        setMessage("❌ Employee not found!");
        setLoading(false);
        return;
      }

        const res = await axios.post(
  `http://localhost:5000/api/v1/admin/employees/${employee._id}/tasks`,
  {
    title: TaskTitle,
    description,
    date: taskDate,
    category,
    status,
  },
  {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    withCredentials: true,
  }
);


      setMessage("Task created successfully!");
      console.log(res.data);

      // reset form
      setTaskTitle("");
      setTaskDate("");
      setAssignTo("");
      setCategory("");
      setDescription("");
      setStatus("new");
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to create task.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="p-5 bg-[#1c1c1c] mt-7 rounded">
        <form
          onSubmit={submitHandler}
          className="flex w-full items-start justify-between"
        >
          {/* Left Side */}
          <div className="w-1/2">
            {/* Task Title */}
            <div>
              <h3 className="text-sm text-gray-300 mb-0.5">Task Title</h3>
              <input
                value={TaskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
                className="text-sm py-1 px-2 w-4/5 rounded outline-none bg-transparent border-gray-400 border-[1px]"
                type="text"
                placeholder="Task Title"
                required
              />
            </div>

            {/* Deadline */}
            <div>
              <h3 className="text-sm text-gray-300 mb-0.5">Deadline</h3>
              <input
                value={taskDate}
                onChange={(e) => setTaskDate(e.target.value)}
                className="text-sm py-1 px-2 w-4/5 rounded outline-none bg-transparent border-gray-400 border-[1px]"
                type="date"
                required
              />
            </div>

            {/* Assign To with autocomplete */}
            <div>
              <h3 className="text-sm text-gray-300 mb-0.5">Assign To</h3>
              <input
                list="employeeList"
                value={assignTo}
                onChange={(e) => setAssignTo(e.target.value)}
                className="text-sm py-1 px-2 w-4/5 rounded outline-none bg-transparent border-gray-400 border-[1px]"
                type="text"
                placeholder="Employee Name"
                required
              />
              <datalist id="employeeList">
                {employees.map((emp) => (
                  <option key={emp._id} value={emp.name} />
                ))}
              </datalist>
            </div>

            {/* Category */}
            <div>
              <h3 className="text-sm text-gray-300 mb-0.5">Category</h3>
              <input
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="text-sm py-1 px-2 w-4/5 rounded outline-none bg-transparent border-gray-400 border-[1px]"
                type="text"
                placeholder="dev, design, etc"
              />
            </div>

            {/* Status */}
            <div>
              <h3 className="text-sm text-gray-300 mb-0.5">Status</h3>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="text-sm py-1 px-2 w-4/5 rounded outline-none bg-[#1c1c1c] border-gray-400 border-[1px]"
              >
                <option className="bg-gray-800" value="new">
                  New
                </option>
                <option className="bg-gray-800" value="active">
                  Active
                </option>
                <option className="bg-gray-800" value="completed">
                  Completed
                </option>
                <option className="bg-gray-800" value="failed">
                  Failed
                </option>
              </select>
            </div>
          </div>

          {/* Right Side */}
          <div className="w-1/2">
            <h3 className="text-sm text-gray-300 mb-0.5">Description</h3>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full h-44 text-sm py-2 px-2 rounded outline-none bg-transparent border-[1px] border-gray-400"
              required
            ></textarea>
            <button
              className="bg-emerald-500 hover:bg-emerald-600 px-5 rounded text-sm mt-4 w-full h-10"
              type="submit"
              disabled={loading}
            >
              {loading ? "Creating..." : "Create Task"}
            </button>
            {message && (
              <p className="mt-2 text-sm text-center text-gray-300">
                {message}
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTask;
