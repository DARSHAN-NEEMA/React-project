import axios from "axios";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    emprole: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/v1/employee/register",
        form,
        { withCredentials: true }
      );

      console.log("Employee registered:", res.data);
      toast.success("Registration successful!");
      setForm({ name: "", emprole: "", email: "", password: "" });
    } catch (err) {
      console.error("Register failed:", err);
      toast.error("Registration failed!");
    }
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="border-2 border-emerald-600 p-20 rounded-xl">
        <form
          onSubmit={submitHandler}
          className="flex flex-col items-center justify-center"
        >
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="border-2 border-emerald-600 py-3 px-5 rounded-full text-xl text-white outline-none bg-transparent placeholder:text-gray-400 mb-3"
            type="text"
            placeholder="Enter your name"
          />
          <input
            name="emprole"
            value={form.emprole}
            onChange={handleChange}
            required
            className="border-2 border-emerald-600 py-3 px-5 rounded-full text-xl text-white outline-none bg-transparent placeholder:text-gray-400 mb-3"
            type="text"
            placeholder="Enter your role (e.g. Driver, Manager)"
          />
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className="border-2 border-emerald-600 py-3 px-5 rounded-full text-xl text-white outline-none bg-transparent placeholder:text-gray-400 mb-3"
            type="email"
            placeholder="Enter your email"
          />
          <input
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            className="border-2 border-emerald-600 py-3 px-5 rounded-full text-xl text-white outline-none bg-transparent placeholder:text-gray-400 mb-3"
            type="password"
            placeholder="Enter your password"
          />
          <button
            type="submit"
            className="mt-5 py-3 px-5 rounded-full text-xl text-white bg-emerald-500 hover:bg-emerald-600 transition-colors"
          >
            Register
          </button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Register;
