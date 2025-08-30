import express from "express";
import {
  registerAdmin,
  loginAdmin,
  logoutAdmin,
  refreshAccessToken,
  changeCurrentPassword,
  getCurrentAdmin,
  assignTask,
  getEmployeesTaskStatus,
  getEmployeeTasks,
  updateEmployeeTask,
  deleteEmployeeTask,
  getAllEmployeeName
} from "../controllers/admin.controller.js";
import { verifyAdminJwt } from "../Middlewares/auth.middleware.js";

const router = express.Router();

// Auth
router.post("/register", registerAdmin);
router.post("/login", loginAdmin);
router.post("/logout", verifyAdminJwt, logoutAdmin);
router.post("/refresh-token", refreshAccessToken);
router.post("/change-password", verifyAdminJwt, changeCurrentPassword);
router.get("/me", verifyAdminJwt, getCurrentAdmin);

// Task Management
router.post("/employees/:employeeId/tasks", verifyAdminJwt, assignTask);
router.get("/employees/tasks/status", verifyAdminJwt, getEmployeesTaskStatus);
router.get("/employees/:employeeId/tasks", verifyAdminJwt, getEmployeeTasks);
router.put("/employees/:employeeId/tasks/:taskId", verifyAdminJwt, updateEmployeeTask);
router.delete("/employees/:employeeId/tasks/:taskId", verifyAdminJwt, deleteEmployeeTask);
router.get("/employees/name",verifyAdminJwt,getAllEmployeeName)

export default router;
