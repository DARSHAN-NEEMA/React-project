import React from "react";
import Header from "../other/Header";
import CreateTask from "../Other/CreateTask";
import AllTask from "../Other/AllTask";

const AdminDeshboard = (props) => {
  return (
    <div className="w-full h-screen p-10">
      <Header changeUser={props.changeUser} />
      <CreateTask/>
      <AllTask/>
      
    </div>
  );
};

export default AdminDeshboard;
