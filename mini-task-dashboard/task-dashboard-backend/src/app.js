const express = require("express");
const app = express();

const taskRoutes = require("./routes/taskRoutes");
const authRoutes = require("./routes/authRoutes");

// Middleware
const cors = require("cors");

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
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