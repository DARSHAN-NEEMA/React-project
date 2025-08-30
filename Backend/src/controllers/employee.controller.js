import mongoose from "mongoose";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { Employee } from "../model/employee.model.js";
import { verifyJwt } from "../Middlewares/auth.middleware.js";
import  jwt  from "jsonwebtoken";

const generateAccessAndRefreshToken = async (employeeId) => {
  try {
    const employee = await Employee.findById(employeeId);
    const accessToken = employee.generateAccessToken();
    const refreshToken = employee.generateRefreshToken();

    employee.refreshToken = refreshToken;
    await employee.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      400,
      "Something went wrong with Generating AccessAndRefreshToken"
    );
  }
};

const registerEmployee = asyncHandler(async (req, res) => {
  const { name, emprole, email, password } = req.body;

  // 1. validation
  if (!name || !email || !password || !emprole) {
    throw new ApiError(400, "All fields are required");
  }

  if (password.length < 6) {
    throw new ApiError(400, "Password must be at least 6 characters");
  }

  // 2. check if employee already exists (only by email)
  const existedEmp = await Employee.findOne({ email });
  if (existedEmp) {
    throw new ApiError(400, "Employee with this email already exists");
  }

  // 3. create employee
  const employee = await Employee.create({ name, emprole, email, password });
  if (!employee) {
    throw new ApiError(400, "Something went wrong while creating employee");
  }

  // 4. remove sensitive fields
  const createdEmployee = await Employee.findById(employee._id).select(
    "-password -refreshToken"
  );

  // 5. consistent response
  return res.status(201).json(
    new ApiResponse(
      201,
      {
        user: {
          _id: createdEmployee._id,
          name: createdEmployee.name,
          email: createdEmployee.email,
          role: "employee",   // ✅ keep consistent
          emprole: createdEmployee.emprole,
        },
      },
      "Employee registered successfully"
    )
  );
});

const loginEmployee = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "Email and password are required");
  }

  const employee = await Employee.findOne({ email });
  if (!employee) {
    throw new ApiError(404, "Employee not found");
  }

  const isPasswordValid = await employee.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid credentials");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    employee._id
  );

 res.cookie("accessToken", accessToken, {
  httpOnly: true,
  secure: false,       
  sameSite: "lax",     
  path: "/",           
});

res.cookie("refreshToken", refreshToken, {
  httpOnly: true,
  secure: false,
  sameSite: "lax",
  path: "/",
});


  return res.status(200).json({
    success: true,
    message: "Login successful",
    employee: {
      _id: employee._id,
      name: employee.name,
      email: employee.email,
      role:"employee",
    },
    accessToken,
    refreshToken,
  });
});

const logOutEmployee = asyncHandler(async (req, res) => {
  await Employee.findByIdAndUpdate(
    req.employee._id,
    {
      $unset: { refreshToken: 1 },
    },
    {
      new: true,
    }
  );
  const option = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  };
  return res
    .status(200)
    .clearCookie("accessToken", option)
    .clearCookie("refreshToken", option)
    .json(new ApiResponse(200, {}, "Employee logged out successfully"));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const inCommingRefreshToken =
    req.cookies?.refreshToken || req.body.refreshToken;
  if (!inCommingRefreshToken) {
    throw new ApiError(401, "unauthorized request");
  }
  try {
    const decodedToken = jwt.verify(
      inCommingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );
    const employee = await Employee.findById(decodedToken?._id);
    if (!employee) {
      throw new ApiError(401, "Invalid Token");
    }
    if (inCommingRefreshToken !== employee?.refreshToken) {
      throw new ApiError(401, "Refresh token is experied or used");
    }
    const options = {
      httpOnly: true,
      secure: true,
    };
    const { accessToken, newRefreshToken } =
      await generateAccessAndRefreshToken(employee._id);
    return res
      .status(200)
      .cookie("accessToken", accessToken)
      .cookie("refreshToken", newRefreshToken)
      .json(
        new ApiResponse(
          200,
          { accessToken, refreshToken: newRefreshToken },
          "AccessToken refreshed succfully"
        )
      );
  } catch (error) {
    throw new ApiError(401, error?.message || "invalid Refresh token");
  }
});

const changeCurrentPassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  const employee = await Employee.findById(req.employee?._id);
  const isPasswordCorrect = await employee.isPasswordCorrect(oldPassword);
  if (!isPasswordCorrect) {
    throw new ApiError(400, "password is incorrect ");
  }
  employee.password = newPassword;
  await employee.save({ validateBeforeSave: false });
  return res
    .status(200)
    .json(new ApiResponse(200, "password change successfully"));
});



const getCurrentemployee = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, req.employee, "user fetched successfully"));
});

const addTask = asyncHandler(async (req, res) => {
  const { employeeId } = req.params;
  const { title, description, status } = req.body;

  const employee = await Employee.findById(employeeId);
  if (!employee) {
    throw new ApiError(404, "Employee not Found");
  }

  // Push new task with status
  const newTask = {
    title,
    description,
    status
  };
  employee.tasks.push(newTask);

  // Update stats
  if (status === "active") employee.taskStats.active++;
  if (status === "new") employee.taskStats.newTask++;
  if (status === "completed") employee.taskStats.completed++;
  if (status === "failed") employee.taskStats.failed++;

  await employee.save({ validateBeforeSave: false });

  return res
    .status(201)
    .json(new ApiResponse(200, employee, "Task assigned successfully"));
});


const getMyTasks = asyncHandler(async (req, res) => {
  const { employeeId } = req.params;

  const employee = await Employee.findById(employeeId).select(
    "tasks taskStats name email"
  );
  if (!employee) throw new ApiError(404, "Employee not found");

  return res
    .status(200)
    .json(new ApiResponse(200, employee, "Tasks fetched successfully"));
});

const updateMyTaskStatus = asyncHandler(async (req, res) => {
  const { employeeId, taskId } = req.params;
  const { action } = req.body; // "accept" | "complete" | "fail" | "newTask"

  const employee = await Employee.findById(employeeId);
  if (!employee) throw new ApiError(404, "Employee not found");

  const task = employee.tasks.id(taskId);
  if (!task) throw new ApiError(404, "Task not found");

  // Decrement old status counters
  if (task.active) employee.taskStats.active--;
  if (task.newTask) employee.taskStats.newTask--;
  if (task.completed) employee.taskStats.completed--;
  if (task.failed) employee.taskStats.failed--;

  // Update task based on action
  if (action === "accept") {
    task.newTask = false;
    task.active = true;
    task.completed = false;
    task.failed = false;
  } else if (action === "complete") {
    task.newTask = false;
    task.active = false;
    task.completed = true;
    task.failed = false;
  } else if (action === "fail") {
    task.newTask = false;
    task.active = false;
    task.completed = false;
    task.failed = true;
  } else if (action === "newTask") {
    task.newTask = true;
    task.active = false;
    task.completed = false;
    task.failed = false;
  } else {
    throw new ApiError(400, "Invalid action");
  }

  // Increment new status counters
  if (task.active) employee.taskStats.active++;
  if (task.newTask) employee.taskStats.newTask++;
  if (task.completed) employee.taskStats.completed++;
  if (task.failed) employee.taskStats.failed++;

  await employee.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(200, task, "Task status updated successfully"));
});


const getPendingTasks = asyncHandler(async (req, res) => {
  const { employeeId } = req.params;

  const employee = await Employee.findById(employeeId).select("tasks");
  if (!employee) throw new ApiError(404, "Employee not found");

  const pending = employee.tasks.filter(
    (t) => t.newTask === true || t.active === true
  );

  return res
    .status(200)
    .json(new ApiResponse(200, pending, "Pending tasks fetched successfully"));
});

export {
  generateAccessAndRefreshToken,
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
};
