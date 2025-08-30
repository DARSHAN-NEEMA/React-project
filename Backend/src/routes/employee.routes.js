// src/routes/employee.routes.js
import { Router } from "express";
import {
  registerEmployee,
  loginEmployee,
  logOutEmployee,
  refreshAccessToken,
  changeCurrentPassword,
  getCurrentemployee,
  addTask,
  getMyTasks,
  updateMyTaskStatus,
  getPendingTasks,
} from "../controllers/employee.controller.js";

import { verifyJwt } from "../Middlewares/auth.middleware.js";

const router = Router();

router.post("/register", registerEmployee);
router.post("/login", loginEmployee);
router.post("/logout", verifyJwt, logOutEmployee);

router.post("/refresh-token", refreshAccessToken);
router.post("/change-password", verifyJwt, changeCurrentPassword);
router.get("/me", verifyJwt, getCurrentemployee); 

router.post("/:employeeId/addtasks", verifyJwt, addTask);

router.get("/:employeeId/tasks", verifyJwt, getMyTasks);

router.patch(
  "/:employeeId/tasks/:taskId/status",
  verifyJwt,
  updateMyTaskStatus
);

router.get("/:employeeId/tasks/pending", verifyJwt, getPendingTasks);

export default router;
