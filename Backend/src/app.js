import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// Middleware
app.use(
  cors({
    origin:process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

// Routes
import employeeRoutes from "./routes/employee.routes.js"; 
import adminRoutes from "./routes/admin.routes.js"
app.use("/api/v1/employee", employeeRoutes);
app.use("/api/v1/admin",adminRoutes,employeeRoutes)

// Default route
app.get("/", (req, res) => {
  res.send("API is running!");
});

export { app };
