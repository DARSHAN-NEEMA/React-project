import React, { useEffect, useState } from "react";

const Header = (props) => {
  const [useName, setUserName] = useState("");
  console.log(props.data);


     useEffect(() => {
    if (props.data && props.data.name) {
      setUserName(props.data.name);
    } else {
      setUserName('Admin');
    }
  }, [props.data]);


  const logOutUser = () => {
    localStorage.removeItem("logInUser"); // Better to remove the item
    props.changeUser(null);

    // window.location.reload()
  };
  return (
    <div className="flex items-center justify-between ">
      <h1 className="text-2xl font-semibold">
        Hello <br />
        <span className="text-3xl font-semibold">{useName}✌️</span>
      </h1>
      <button
        onClick={logOutUser}
        className="bg-red-400 h-15 text-white w-40 py-5 px-3 rounded-sm text-xl font-medium"
      >
        Log Out
      </button>
    </div>
  );
};

export default Header;
