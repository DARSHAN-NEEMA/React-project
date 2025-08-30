import React, { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUserData } = useContext(AuthContext);

 const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const route = email.includes("admin")
      ? "/api/v1/admin/login"
      : "/api/v1/employee/login";

    const res = await axios.post(`http://localhost:5000${route}`, {
      email,
      password,
    });

    console.log("Login response:", res.data);

    let accessToken, refreshToken, user;

    if (route.includes("admin")) {
      accessToken = res.data.data?.accessToken || res.data.accessToken;
      refreshToken = res.data.data?.refreshToken || res.data.refreshToken;
      user = { ...res.data.data?.admin, role: "admin" };
      localStorage.setItem("role", "admin");
    } else {
      accessToken = res.data.accessToken;
      refreshToken = res.data.refreshToken;
      user = { ...res.data.employee, role: "employee" };
      localStorage.setItem("role", "employee");
    }

    // Save tokens
    localStorage.setItem("token", accessToken);
    localStorage.setItem("refreshToken", refreshToken);

    setUserData(user);

    toast.success("Login successful!");
  } catch (err) {
    console.error("Login error:", err.response?.data || err.message);
    toast.error("Login failed. Check credentials.");
  }

  setEmail("");
  setPassword("");
};





  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="border-2 border-emerald-600 p-20 rounded-xl">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center justify-center"
        >
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            type="email"
            placeholder="Enter your email"
            className="border-2 border-emerald-600 py-3 px-5 rounded-full text-xl text-white outline-none bg-transparent placeholder:text-gray-400 mb-3"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            type="password"
            placeholder="Enter your password"
            className="border-2 border-emerald-600 py-3 px-5 rounded-full text-xl text-white outline-none bg-transparent placeholder:text-gray-400 mb-3"
          />
          <button
            type="submit"
            className="mt-5 py-3 px-5 rounded-full text-xl text-white bg-emerald-500 border-none"
          >
            Login
          </button>

          <Link to="/register" className="mt-3 text-emerald-400 underline">
            Don’t have an account? Register here
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
