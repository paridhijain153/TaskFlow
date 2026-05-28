const express = require("express");
const cors = require("cors");

const app = express();

const taskRoutes = require("./routes/taskRoutes");
const authRoutes = require("./routes/authRoutes");

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

// Test Route
app.get("/", (req, res) => {
  res.json({
    message: "TaskFlow API is running",
  });
});

module.exports = app;