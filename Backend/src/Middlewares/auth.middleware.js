import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { Employee } from "../model/employee.model.js";
import jwt from "jsonwebtoken";
import { Admin } from "../model/admin.model.js";

const verifyJwt = asyncHandler(async (req, res, next) => {
  const token =
    req.cookies?.accessToken ||
    req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    throw new ApiError(401, "Authentication failed. Please log in again.");
  }

  try {
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const employee = await Employee.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );

    if (!employee) {
      throw new ApiError(404, "Invalid token. Employee not found.");
    }

    req.employee = employee;
    next();
  } catch (error) {
    throw new ApiError(401, "Invalid or expired token.");
  }
});


//for Admin verfiyAdminJwt 
const verifyAdminJwt = asyncHandler(async (req, res, next) => {
  const token =
    req.cookies?.accessToken ||
    req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    throw new ApiError(401, "Authentication failed. Please log in again.");
  }

  try {
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const admin = await Admin.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );

    if (!admin) {
      throw new ApiError(404, "Invalid token. Employee not found.");
    }

    req.admin = admin;
    next();
  } catch (error) {
    throw new ApiError(401, "Invalid or expired token.");
  }
});

export { verifyJwt,verifyAdminJwt };
