import React from "react";
import AcceptTask from "./AcceptTask";
import NewTask from "./NewTask";
import CompleteTask from "./CompleteTask";
import FaildTask from "./FaildTask";

const TaskList = ({ data }) => {
  if (!data || !Array.isArray(data.tasks)) {
    return (
      <div className="text-white p-4">
        No tasks available.
      </div>
    );
  }

  return (
    <div
      id="tasklist"
      className="h-auto overflow-x-auto flex items-center justify-start gap-5 flex-nowrap w-full py-5 mt-10"
    >
      {data.tasks.map((elem, idx) => {
  if (elem.active) {
    return <AcceptTask key={idx} data={elem} employeeId={data._id} />;
  }
  if (elem.newTask) {
    return <NewTask key={idx} data={elem} employeeId={data._id} />;
  }
  if (elem.completed) {
    return <CompleteTask key={idx} data={elem} employeeId={data._id} />;
  }
  if (elem.failed) {
    return <FaildTask key={idx} data={elem} employeeId={data._id} />;
  }
  return null;
})}

    </div>
  );
};

export default TaskList;
