const express = require("express");
const cors = require("cors");

const app = express();
const taskRoutes = require("./routes/taskRoutes");
app.use(cors());
app.use(express.json());
app.use("/api/tasks", taskRoutes);
app.get("/", (req, res) => {
  res.json({
    message: "TaskFlow API is running",
  });
});

module.exports = app;