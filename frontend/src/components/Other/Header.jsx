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
    <div className="flex items-center justify-between bg-[#1c1c1c] shadow-md p-6 rounded-lg">
  <h1 className="text-2xl font-semibold leading-snug">
    Hello 👋
    <br />
    <span className="text-3xl font-bold text-blue-600">{useName}</span>
  </h1>
  
  <button
    onClick={logOutUser}
    className="bg-red-500 hover:bg-red-600 transition-colors duration-300 text-white py-3 px-6 rounded-md text-lg font-medium shadow-md"
  >
    Log Out
  </button>
</div>

  );
};

export default Header;
