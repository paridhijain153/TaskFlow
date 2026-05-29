const taskService = require("../services/taskService");
const { taskSchema } = require("../validators/taskValidator");
const { ZodError } = require("zod");

const createTask = async (req, res) => {
  try {
    const validatedData = taskSchema.parse(req.body);

    const {
      title,
      description,
      status,
      progress,
      dueDate,
    } = validatedData;

    const newTask = await taskService.createTask({
      title,
      description,
      status,
      progress,
      dueDate: dueDate ? new Date(dueDate) : null,
      userId: req.user.userId,
    });

    res.status(201).json({
      success: true,
      data: newTask,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: error.errors,
      });
    }

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllTasks = async (req, res) => {
  try {
    const tasks = await taskService.getAllTasks(
      req.user.userId
    );

    res.status(200).json({
      success: true,
      data: tasks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await taskService.getTaskById(
      id,
      req.user.userId
    );

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
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateTask = async (req, res) => {
  try {
    const validatedData = taskSchema.parse(req.body);

    const { id } = req.params;

    const {
      title,
      description,
      status,
      progress,
      dueDate,
    } = validatedData;

    const updatedTask = await taskService.updateTask(
      id,
      req.user.userId,
      {
        title,
        description,
        status,
        progress,
        dueDate: dueDate ? new Date(dueDate) : null,
      }
    );

    res.status(200).json({
      success: true,
      data: updatedTask,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: error.errors,
      });
    }

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    await taskService.deleteTask(
      id,
      req.user.userId
    );

    res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
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