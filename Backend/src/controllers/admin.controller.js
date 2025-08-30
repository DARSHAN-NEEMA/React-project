import { Employee } from "../model/employee.model.js";
import { Admin } from "../model/admin.model.js"; 
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import jwt from "jsonwebtoken";

// Helpers
const generateAccessAndRefreshToken = async (adminId) => {
  try {
    const admin = await Admin.findById(adminId);
    const accessToken = admin.generateAccessToken();
    const refreshToken = admin.generateRefreshToken();

    admin.refreshToken = refreshToken;
    await admin.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(400, "Error generating access/refresh token");
  }
};

// Auth Controllers
export const registerAdmin = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;


  if (!name || !email || !password) {
    throw new ApiError(400, "All fields are required");
  }

  if (password.length < 6) {
    throw new ApiError(400, "Password must be at least 6 characters");
  }

 
  const existedAdmin = await Admin.findOne({ email });
  if (existedAdmin) {
    throw new ApiError(400, "Admin with this email already exists");
  }

 
  const admin = await Admin.create({ name, email, password });
  if (!admin) {
    throw new ApiError(400, "Failed to create admin");
  }

  const createdAdmin = await Admin.findById(admin._id).select(
    "-password -refreshToken"
  );

  
  return res.status(201).json(
    new ApiResponse(201, {
      user: {
        _id: createdAdmin._id,
        name: createdAdmin.name,
        email: createdAdmin.email,
        role: "admin",
      },
    }, "Admin registered successfully")
  );
});

export const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) throw new ApiError(400, "Email and password required");

  const admin = await Admin.findOne({ email });
  if (!admin) throw new ApiError(404, "Admin not found");

  const isPasswordValid = await admin.isPasswordCorrect(password);
  if (!isPasswordValid) throw new ApiError(401, "invalid password");

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(admin);

  res.cookie("accessToken", accessToken, { httpOnly: true, secure: true });
  res.cookie("refreshToken", refreshToken, { httpOnly: true, secure: true });

  return res.status(200).json(
    new ApiResponse(200, {
      admin: { _id: admin._id, name: admin.name, email: admin.email,role:"admin" },
      accessToken,
      refreshToken,
    }, "Login successful")
  );
});

export const logoutAdmin = asyncHandler(async (req, res) => {
  await Admin.findByIdAndUpdate(req.admin._id, { $unset: { refreshToken: 1 } });

  const options = { httpOnly: true, secure: process.env.NODE_ENV === "production" };
  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "Admin logged out successfully"));
});

export const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken = req.cookies?.refreshToken || req.body.refreshToken;
  if (!incomingRefreshToken) throw new ApiError(401, "Unauthorized");

  try {
    const decoded = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);
    const admin = await Admin.findById(decoded?._id);
    if (!admin) throw new ApiError(401, "Invalid token");

    if (incomingRefreshToken !== admin.refreshToken) {
      throw new ApiError(401, "Refresh token expired or used");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(admin._id);

    res
      .cookie("accessToken", accessToken, { httpOnly: true, secure: true })
      .cookie("refreshToken", refreshToken, { httpOnly: true, secure: true })
      .json(new ApiResponse(200, { accessToken, refreshToken }, "Access token refreshed"));
  } catch (err) {
    throw new ApiError(401, "Invalid refresh token");
  }
});

//  Admin Profile
export const changeCurrentPassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const admin = await Admin.findById(req.admin._id);

  const isPasswordCorrect = await admin.isPasswordCorrect(oldPassword);
  if (!isPasswordCorrect) throw new ApiError(400, "Old password is incorrect");

  admin.password = newPassword;
  await admin.save({ validateBeforeSave: false });

  return res.status(200).json(new ApiResponse(200, {}, "Password changed"));
});

export const getCurrentAdmin = asyncHandler(async (req, res) => {
  return res.status(200).json(new ApiResponse(200, req.admin, "Admin profile fetched"));
});

export const getAllEmployeeName = asyncHandler(async (req, res) => {
  const employees = await Employee.find({}, "name"); 

  return res
    .status(200)
    .json(new ApiResponse(200, employees, "All employee names fetched"));
});
// Task Management
export const assignTask = asyncHandler(async (req, res) => {
  const { employeeId } = req.params;
  const { title, description, date, category, status } = req.body;

  const employee = await Employee.findById(employeeId);
  if (!employee) throw new ApiError(404, "Employee not found");

  const taskNumber = employee.tasks.length + 1;
  const newTask = {
    taskNumber,
    title,
    description,
    date,
    category,
    active: status === "active",
    newTask: status === "new",
    completed: status === "completed",
    failed: status === "failed",
  };

  employee.tasks.push(newTask);
  if (status === "active") employee.taskStats.active++;
  if (status === "new") employee.taskStats.newTask++;
  if (status === "completed") employee.taskStats.completed++;
  if (status === "failed") employee.taskStats.failed++;

  await employee.save({ validateBeforeSave: false });
  return res.status(201).json(new ApiResponse(201, newTask, "Task assigned"));
});

export const getEmployeesTaskStatus = asyncHandler(async (req, res) => {
  const stats = await Employee.aggregate([
    { $unwind: "$tasks" },
    {
      $group: {
        _id: "$_id",
        name: { $first: "$name" },
        email: { $first: "$email" },
        active: { $sum: { $cond: ["$tasks.active", 1, 0] } },
        newTask: { $sum: { $cond: ["$tasks.newTask", 1, 0] } },
        completed: { $sum: { $cond: ["$tasks.completed", 1, 0] } },
        failed: { $sum: { $cond: ["$tasks.failed", 1, 0] } },
        totalTasks: { $sum: 1 },
      },
    },
    { $sort: { name: 1 } },
  ]);

  return res.status(200).json(new ApiResponse(200, stats, "Task status fetched"));
});

export const getEmployeeTasks = asyncHandler(async (req, res) => {
  const { employeeId } = req.params;
  const { status } = req.query;

  const employee = await Employee.findById(employeeId);
  if (!employee) throw new ApiError(404, "Employee not found");

  let tasks = employee.tasks;
  if (status) {
    tasks = tasks.filter((task) => {
      if (status === "active") return task.active;
      if (status === "new") return task.newTask;
      if (status === "completed") return task.completed;
      if (status === "failed") return task.failed;
      return true;
    });
  }

  return res.status(200).json(new ApiResponse(200, tasks, "Employee tasks fetched"));
});

export const updateEmployeeTask = asyncHandler(async (req, res) => {
  const { employeeId, taskId } = req.params;
  const updates = req.body;

  const employee = await Employee.findById(employeeId);
  if (!employee) throw new ApiError(404, "Employee not found");

  const task = employee.tasks.id(taskId);
  if (!task) throw new ApiError(404, "Task not found");

  // adjust stats
  if (task.active) employee.taskStats.active--;
  if (task.newTask) employee.taskStats.newTask--;
  if (task.completed) employee.taskStats.completed--;
  if (task.failed) employee.taskStats.failed--;

  Object.assign(task, updates);

  if (task.active) employee.taskStats.active++;
  if (task.newTask) employee.taskStats.newTask++;
  if (task.completed) employee.taskStats.completed++;
  if (task.failed) employee.taskStats.failed++;

  await employee.save({ validateBeforeSave: false });

  return res.status(200).json(new ApiResponse(200, task, "Task updated"));
});

export const deleteEmployeeTask = asyncHandler(async (req, res) => {
  const { employeeId, taskId } = req.params;

  const employee = await Employee.findById(employeeId);
  if (!employee) throw new ApiError(404, "Employee not found");

  const task = employee.tasks.id(taskId);
  if (!task) throw new ApiError(404, "Task not found");

  if (task.active) employee.taskStats.active--;
  if (task.newTask) employee.taskStats.newTask--;
  if (task.completed) employee.taskStats.completed--;
  if (task.failed) employee.taskStats.failed--;

  task.remove();
  await employee.save({ validateBeforeSave: false });

  return res.status(200).json(new ApiResponse(200, {}, "Task deleted"));
});
