import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import AuthContext from "./context/AuthContext.jsx";
import TaskContext from "./context/TaskContext.jsx";
import { BrowserRouter } from "react-router-dom";
// localStorage.clear()
createRoot(document.getElementById("root")).render(
<BrowserRouter>
    <AuthContext>
      <TaskContext>
        <App />
      </TaskContext>
    </AuthContext>
</BrowserRouter>
  
);
