import React, { useState } from "react";
import Header from "../other/Header";
import CreateTask from "../Other/CreateTask";
import AllTask from "../Other/AllTask";

import UserProfile from "../../pages/UserProfile";

const AdminDeshboard = (props) => {
  const [toggle, setToggle] =useState(true);
  return (
    <div className="w-full h-screen p-10">
      <Header changeUser={props.changeUser} />
      <CreateTask/>
      {toggle ? <AllTask setToggle = {setToggle} /> : <UserProfile />}
    </div>
  );
};

export default AdminDeshboard;
