import React, { useState } from "react";

const Header = () => {
  // const [useName, setUserName] = useState("");
  // if (!data) {
  //   setUserName('Admin');
  // } else {
  //   setUserName(data.name);
  // }

  const logOutUser =()=>{
    localStorage.setItem('logInUser','')
    window.location.reload()
  }
  return (
    <div className="flex items-center justify-between ">
      <h1 className="text-2xl font-semibold">
        Hello <br />
        <span className="text-3xl font-semibold">useName✌️</span>
      </h1>
      <button onClick={logOutUser}className="bg-red-400 h-15 text-white w-40 py-5 px-3 rounded-sm text-xl font-medium">
        Log Out
      </button>
    </div>
  );
};

export default Header;
