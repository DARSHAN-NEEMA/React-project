import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import TaskContext from "./context/TaskContext.jsx";
import { BrowserRouter } from "react-router-dom";
import AppLayer from "./AppLayer.jsx";
// localStorage.clear()
createRoot(document.getElementById("root")).render(
<BrowserRouter>
    <AuthProvider>
      <TaskContext>
        <AppLayer />
      </TaskContext>
    </AuthProvider>
</BrowserRouter>
  
);
