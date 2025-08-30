import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const { Schema } = mongoose;

const taskSchema = new Schema({
  taskNumber: { type: Number, required: true },
  title: { type: String, required: true },
  description: { type: String },
  date: { type: String }, // can be Date if needed
  category: { type: String },
  active: { type: Boolean, default: false },
  newTask: { type: Boolean, default: false },
  completed: { type: Boolean, default: false },
  failed: { type: Boolean, default: false },
});

const taskStatsSchema = new Schema({
  active: { type: Number, default: 0 },
  newTask: { type: Number, default: 0 },
  completed: { type: Number, default: 0 },
  failed: { type: Number, default: 0 },
});

const employeeSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    emprole: { type:String, required: true },
    refreshToken: { type: String },
    tasks: [taskSchema],
    taskStats: {
      type: taskStatsSchema,
      default: () => ({ active: 0, newTask: 0, completed: 0, failed: 0 }),
    },
  },
  { timestamps: true }
);

// Hash password before saving
employeeSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Password check
employeeSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Access Token
employeeSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    { _id: this._id, name: this.name, email: this.email },
    process.env.ACCESS_TOKEN_SECRET ,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY  || "15m"}
  );
};

// Refresh Token
employeeSchema.methods.generateRefreshToken = function () {
  return jwt.sign({ _id: this._id }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
  });
};

export const Employee = mongoose.model("Employee", employeeSchema);
