const taskService = require("../services/taskService");

const createTask = async (req, res) => {
  try {
  const {
    title,
    description,
    status,
    progress,
    dueDate,
  } = req.body;

    const newTask = await taskService.createTask({
      title,
      description,
      status,
      progress,
      dueDate: new Date(dueDate),
    });

    res.status(201).json({
      success: true,
      data: newTask,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const getAllTasks = async (req, res) => {
  try {
    const tasks = await taskService.getAllTasks();

    res.status(200).json({
      success: true,
      data: tasks,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await taskService.getTaskById(id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    res.status(200).json({
      success: true,
      data: task,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id } = req.params;

    const {
    title,
    description,
    status,
    progress,
    dueDate,
      } = req.body;

    const updatedTask = await taskService.updateTask(id, {
      title,
      description,
      status,
      progress,
      dueDate: new Date(dueDate),
    });

    res.status(200).json({
      success: true,
      data: updatedTask,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    await taskService.deleteTask(id);

    res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
};