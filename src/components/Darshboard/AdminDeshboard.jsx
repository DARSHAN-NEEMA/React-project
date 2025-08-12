import React from "react";
import Header from "../other/Header";
import CreateTask from "../Other/CreateTask";
import AllTask from "../Other/AllTask";

const AdminDeshboard = () => {
  return (
    <div className="w-full h-screen p-10">
      <Header />
      <CreateTask/>
      <AllTask/>
      
    </div>
  );
};

export default AdminDeshboard;
