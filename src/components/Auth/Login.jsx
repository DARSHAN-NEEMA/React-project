import React, { useState } from "react";
import { ToastContainer } from "react-toastify";

const Login = ({ handleLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const submtHandler = (e) => {
    e.preventDefault();
    handleLogin(email, password);
    // console.log("email is ",email);
    // console.log("Password is ",password);
    setEmail("");
    setPassword("");
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="border-2 border-emerald-600 p-20 rounded-xl ">
        <form
          action=""
          onSubmit={(e) => {
            submtHandler(e);
          }}
          className="flex flex-col items-center justify-center"
        >
          <input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
            className="border-2 border-emerald-600 py-3 px-5 rounded-full text-xl text-white outline-none bg-transparent placeholder:text-gray-400"
            type="email"
            placeholder="Enter your email"
          />
          <input
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
            className="border-2 border-emerald-600 py-3 px-5 rounded-full text-xl text-white outline-none bg-transparent placeholder:text-gray-400 mt-3"
            type="password"
            placeholder="Enter your password"
          />
          <button className=" mt-5 border-2 border-emerald-600 py-3 px-5 rounded-full text-xl text-white outline-none bg-emerald-500 border-none ">
            Log in{" "}
          </button>
          
        </form>
      </div>
    </div>
  );
};

export default Login;
